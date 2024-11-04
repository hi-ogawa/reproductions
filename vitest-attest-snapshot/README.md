- https://github.com/vitest-dev/vitest/issues/5857
- `attest` snapshot via custom snapshot serializer
- using `onWatcherRerun` from https://github.com/vitest-dev/vitest/pull/6803

```sh
pnpm test
ATTEST_skipTypes=1 pnpm test
```

## todo

- faster re-run by keeping ts server and invalidate changed files?
- how to `skipTypes` for vitest snapshot?
  - might need to change core to allow skpping snapshot assertion conditionally.
    (see `vitest-attest-snapshot/patches/vitest.patch`)
- `attest` requires fs access. how to support it in browser mode?
