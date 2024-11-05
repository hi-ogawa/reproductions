- https://github.com/vitest-dev/vitest/issues/5857
- `attest` snapshot via custom Vitest serializer
- custom Attest alias (this approach allows incorporating `skipTypes` easily)
- using `onWatcherRerun` from https://github.com/vitest-dev/vitest/pull/6803

```sh
pnpm test
ATTEST_skipTypes=1 pnpm test
```

## todo

- faster re-run by keeping ts server and invalidate changed files?
- `attest` requires fs access. how to support it in browser mode?
- how to implement `skipTypes` for vitest file snapshot? (how to avoid getting removed as "obsolete"?)
