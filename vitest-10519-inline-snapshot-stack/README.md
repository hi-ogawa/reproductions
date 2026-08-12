# Inline Snapshot Stack Probing

This repository investigates [Vitest PR #10519](https://github.com/vitest-dev/vitest/pull/10519), which defers inline-snapshot stack parsing until Vitest needs a source location.

## Conclusion

The original Angular/browser/V8-coverage reproduction exposes a real pathological case: the first relevant stack access can take hundreds of milliseconds. Plain Vitest browser benchmarks do not reproduce that spike. They show a saving of about `0.1-0.4 ms` per inline-snapshot call, which is generally lost among browser setup, collection, real test work, concurrency, and run-to-run noise.

The change is therefore best justified as defensive work against pathological stack behavior, not as a generally observable browser-test speedup. It is structurally reasonable because passing snapshots do not need a source location, but it changes duplicate-callsite diagnostics on ordinary non-update runs.

## Context

- PR: https://github.com/vitest-dev/vitest/pull/10519
- Issue: https://github.com/vitest-dev/vitest/issues/10436
- Original reproduction: https://github.com/uneknown/vitest-browser-v8-coverage-inline-snapshot-repro
- Investigated PR head: `08e05f39117285f44890f52dbec6c4b27df02e6c`
- Local source branch: `snapshot-csp-server-eval` at original commit `9ac9d432d99f9759a1a6fce39d50c470dc41223f`

## Reported Pathology

The issue reports a large delay on the first `toMatchInlineSnapshot()` in an Angular 21 project using the Angular `unit-test` builder, Vitest browser mode, Playwright with Chromium, and V8 coverage. The confirmed slow measurements remain specific to that integration; plain Vitest has not reproduced a comparable spike.

Reducing the Angular test body to direct error construction and stack access isolated the expensive operation:

```ts
const error = new Error('repro')       // about 0.5-1 ms
error.stack?.length                    // about 180-200 ms on first access

const error2 = new Error('repro2')     // about 0.1-1 ms
error2.stack?.length                   // about 0.4-1 ms
```

`new Error()` was cheap. Formatting or otherwise reading the first relevant `Error.stack` was expensive, while the next access through the same path was fast. The corresponding inline-snapshot test showed the same shape:

```ts
error.stack?.length                              // fast after this path was warmed
expect(1234).toMatchInlineSnapshot(`1234`)       // about 500 ms
expect(123).toMatchInlineSnapshot(`123`)         // about 1 ms
```

The manual error and inline-snapshot error follow different stack-producing code paths, so warming one does not necessarily warm the other. A plausible model is that V8 lazily prepares source-position or stack metadata for functions or scripts encountered by each path. The exact cache boundary was not established.

### Headless Versus Headed

The original roughly 200 ms headless result versus roughly 1 ms headed result is not evidence of an independent rendering-mode effect. Vitest defaults browser UI on in headed mode, and browser UI defaults `includeTaskLocation` on. See [`resolveConfig.ts`](https://github.com/vitest-dev/vitest/blob/08e05f39117285f44890f52dbec6c4b27df02e6c/packages/vitest/src/node/config/resolveConfig.ts#L864-L923). Task-location collection reads a captured stack in [`suite.ts`](https://github.com/vitest-dev/vitest/blob/08e05f39117285f44890f52dbec6c4b27df02e6c/packages/vitest/src/runtime/runner/suite.ts#L420), which warms stack machinery before the measured assertion.

Explicitly enabling `includeTaskLocation` in headless mode also made the later direct stack access fast, supporting this explanation.

## Proposed Change

Vitest currently resolves every inline-snapshot stack eagerly in [`state.ts`](https://github.com/vitest-dev/vitest/blob/08e05f39117285f44890f52dbec6c4b27df02e6c/packages/snapshot/src/port/state.ts#L538). Resolution reads and parses the error stack, infers the user callsite, applies environment stack processing, and records a source position.

Source positions are needed to:

- Insert or update inline snapshots in source text.
- Reject different snapshot values produced at the same callsite, including loops and parameterized tests.

PR #10519 still captures the error at assertion time but defers stack access and parsing until reconciliation needs a source location. Passing snapshots and non-update mismatches consequently avoid `_resolveInlineStack()`, while update paths continue to resolve locations.

The behavioral tradeoff is limited to ordinary non-update diagnostics. For example, one parameterized case can report a normal mismatch while another matching case passes instead of both cases being reported through the same-location invariant. Differing exact values still imply at least one mismatch, so this generally changes diagnostics and failure counts rather than turning the complete suite green.

## Benchmark Design

The standalone benchmark uses published Vitest `4.1.10` and Playwright `1.62.1`, with the PR applied as a pnpm patch to `@vitest/snapshot`.

- `eager` forces stack resolution at the original point and represents behavior before the PR.
- `lazy` leaves stack resolution deferred and represents the PR's passing non-update path.
- `control` replaces each inline snapshot with `expect(value).toBe(value)` while preserving file and test shape.

Generated workloads contain 100 independent tests and 100 distinct assertion callsites in three shapes: one file with 100 tests, ten files with ten tests, and 100 files with one test. This avoids the unrealistic repeated-callsite behavior of a runtime loop and exposes both per-call and per-file costs.

Each sample starts a fresh Vitest process. Variant order alternates or rotates within each sample set. The built-in JSON reporter records test results, while a custom reporter records `testModule.diagnostic()` and individual test diagnostics. Raw artifacts and input manifests are stored under [`results/`](results/).

Reported test totals sum `TestDiagnostic.duration` across all 100 tests. They are not elapsed wall time; concurrent file durations are still added together. Per-file figures are total divided by file count, not measured file wall time.

## Results

### V8 Coverage With Control

Five-sample browser runs with V8 coverage provide the primary reference:

| Shape | Control `toBe`, total / per test / per file | Lazy snapshot, total / per test / per file | Eager snapshot, total / per test / per file | Saving per snapshot call |
| --- | ---: | ---: | ---: | ---: |
| 1 file x 100 tests | 2.7 / 0.027 / 2.7 ms | 4.8 / 0.048 / 4.8 ms | 15.0 / 0.150 / 15.0 ms | 0.101 ms |
| 10 files x 10 tests | 11.5 / 0.115 / 1.15 ms | 21.5 / 0.215 / 2.15 ms | 44.8 / 0.448 / 4.48 ms | 0.234 ms |
| 100 files x 1 test | 25.0 / 0.250 / 0.250 ms | 42.2 / 0.422 / 0.422 ms | 82.4 / 0.824 / 0.824 ms | 0.406 ms |

Lazy snapshot matching and serialization add `2.1`, `10.1`, and `16.8 ms` over the control across the full 100-test workloads. Eager stack probing adds another `10.1`, `23.4`, and `40.6 ms`, accounting for roughly 70-82% of synthetic inline-snapshot assertion overhead.

The relative percentages are intentionally an upper bound because these tests do almost nothing except assert. The absolute scale is the important result: every measured saving remains below one millisecond per snapshot call.

### Coverage Effect

Separate three-sample runs compare eager-minus-lazy stack savings with and without V8 coverage:

| Shape | Stack saving without coverage, total / per call / per file | Stack saving with V8 coverage, total / per call / per file |
| --- | ---: | ---: |
| 1 file x 100 tests | 5.7 / 0.057 / 5.7 ms | 10.5 / 0.105 / 10.5 ms |
| 10 files x 10 tests | 17.6 / 0.176 / 1.76 ms | 23.2 / 0.232 / 2.32 ms |
| 100 files x 1 test | 34.5 / 0.345 / 0.345 ms | 39.7 / 0.397 / 0.397 ms |

These columns contain differences, not absolute durations. The V8 per-call column is the earlier three-sample equivalent of `Saving per snapshot call` in the primary table, which explains the small numerical differences. Coverage adds roughly 5 ms of stack cost per 100 snapshots in each shape. File isolation has a larger effect than coverage.

### Surrounding Scale

The earlier V8 runs provide ballpark worker-time and reporter-span anchors:

| Shape | Eager tests | Test saving | Module-work scale | Reporter span, not full wall time | Eager - lazy reporter span |
| --- | ---: | ---: | ---: | ---: | ---: |
| 1x100 | 15.3 ms | 10.5 ms, 68% | ~21.7 ms | ~479 ms | -4.9 ms, -1% |
| 10x10 | 45.1 ms | 23.2 ms, 51% | ~188 ms | ~1,145 ms | 2.1 ms, 0.2% |
| 100x1 | 81.7 ms | 39.7 ms, 49% | ~2,777 ms | ~2,461 ms | -36.8 ms, -1.5% |

Module work sums setup, collection, tests, and hooks. It is shown only as a scale reference; multi-file values overlap under concurrency and can exceed elapsed wall time. Setup and collection execute the same logic in both variants, so their deltas should not be attributed to stack probing.

The reporter span runs from the JSON reporter's `startTime` through the last test result. It excludes process startup and post-test coverage reporting or finalization, so it is the closest available end-to-end reference but not full command wall time. Wrapper-process elapsed time was not recorded. Reporter-span deltas change sign across shapes and do not demonstrate a reliable end-to-end improvement.

### Per-File Behavior

First-test diagnostics suggest both a cold-per-file component and a smaller steady parsing component under V8 coverage:

- In `1x100`, the first test saves about 1.6 ms and the other 99 tests save about 8.9 ms combined.
- In `10x10`, each file's first test saves about 12.7 ms combined and the other 90 tests save about 11.4 ms combined.
- In `100x1`, every test is a first test and saves about 39.7 ms combined.

Browser tester preparation also occurs for every isolated file in this configuration. Summed preparation time grows far beyond wall time because files execute concurrently and contend for resources.

## Reproducing

Install dependencies and Chromium:

```sh
pnpm install
pnpm exec playwright install chromium
```

Run smoke samples:

```sh
pnpm run-results smoke-node node off 10 test/smoke.test.ts
pnpm run-results smoke-browser-v8 browser on 10 test/smoke.test.ts
```

Run a matched control/eager/lazy workload:

```sh
pnpm run-results reference-1x100 browser on 5 workloads/generated/1x100/*.test.ts --control workloads/generated/control-1x100/*.test.ts
```

Existing result directories are never overwritten. Analyze a saved result set separately:

```sh
pnpm analyze results/reference-1x100/browser-on
pnpm analyze results/reference-1x100/browser-on results/reference-1x100/browser-on.analysis.json
```

Generate additional immutable snapshot or control workloads:

```sh
pnpm generate-workload <name> <file-count> <cases-per-file>
pnpm generate-workload <name> <file-count> <cases-per-file> control
```

## Open Questions

- Can the 100+ ms behavior be reproduced with plain Vitest browser mode and V8 coverage outside Angular's test builder?
- Which Angular build or source-map characteristic triggers the large first-path stack cost?
- What is the recurrence boundary for the engine cost: function, generated script, realm, iframe, worker, or another unit?
- How much end-to-end time does PR #10519 save in the original Angular reproduction after its current rebase?
- Are there domain snapshot matchers where skipping same-location validation on passing snapshots can make semantically different values all pass?
- Should the PR tests and description explicitly characterize the diagnostic tradeoff as limited to non-update paths?
