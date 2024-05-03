https://github.com/vitest-dev/vitest/issues/5655

```sh
pnpm test
```

- run `pnpm test`
- wait for first run to finish
- rerun with "r"
- browser hits breakpoint

## note

- `providerOptions.launch.devtools: true` sometimes misses breakpoints on first run.
  some race condition?
