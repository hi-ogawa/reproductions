https://github.com/vitejs/rolldown-vite/pull/85

## (Micro) benchmark

```sh
$ pnpm vitest bench
 ✓ ssrTransform.bench.ts > ssrTransform 1261ms
     name         hz     min     max    mean     p75     p99    p995    p999     rme  samples
   · old    9,111.87  0.0663  2.5361  0.1097  0.1211  0.2742  0.3600  0.9050  ±1.98%     4556
   · oxc   95,281.90  0.0096  0.3184  0.0105  0.0105  0.0124  0.0137  0.0336  ±0.26%    47641   fastest

 BENCH  Summary

  oxc - ssrTransform.bench.ts > ssrTransform
    10.46x faster than old
```

```sh
# rollup's internal `jsonParseAst` (buffer ast deserialization taking time)
$ node --cpu-prof --cpu-prof-dir=./bench-profile bench.js
$ ROLLDOWN_VITE_OLD_MODULE_RUNNER_TRANSFORM=1 node --cpu-prof --cpu-prof-dir=./bench-profile bench.js
```

## Vitest transform duration

Generate test files

```sh
# test/generated/100-js/001.test.js .. 100.test.js
# test/generated/100-ts/001.test.ts .. 100.test.ts
# ...
node generate.js
```

```sh
$ pnpm vitest run test/generated/100-js/ --fileParallelism=false
 Test Files  100 passed (100)
      Tests  100 passed (100)
   Start at  12:23:31
   Duration  10.14s (transform 97ms, setup 0ms, collect 455ms, tests 94ms, environment 10ms, prepare 3.58s)

$ ROLLDOWN_VITE_OLD_MODULE_RUNNER_TRANSFORM=1 pnpm vitest run test/generated/100-js/ --fileParallelism=false
Test Files  100 passed (100)
      Tests  100 passed (100)
   Start at  12:24:08
   Duration  10.18s (transform 112ms, setup 0ms, collect 456ms, tests 95ms, environment 10ms, prepare 3.64s)

$ pnpm vitest run test/generated/100-ts/ --fileParallelism=false
 Test Files  100 passed (100)
      Tests  100 passed (100)
   Start at  12:26:15
   Duration  10.01s (transform 104ms, setup 0ms, collect 444ms, tests 94ms, environment 10ms, prepare 3.59s)

$ ROLLDOWN_VITE_OLD_MODULE_RUNNER_TRANSFORM=1 pnpm vitest run test/generated/100-ts/ --fileParallelism=false
Test Files  100 passed (100)
      Tests  100 passed (100)
   Start at  12:26:39
   Duration  10.12s (transform 141ms, setup 0ms, collect 494ms, tests 95ms, environment 9ms, prepare 3.57s)
```
