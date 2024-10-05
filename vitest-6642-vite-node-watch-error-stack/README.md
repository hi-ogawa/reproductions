- https://github.com/vitest-dev/vitest/issues/6642

# steps

- run `pnpm exec vite-node --watch src/repro.ts` and see error logs

```
Error: boom
    at main (xxx/src/repro.ts:8:11)
    at xxx/src/repro.ts:14:1
```

- modify `src/repro.ts` to move some lines and still see the same error stack

```
Error: boom
    at main (xxx/src/repro.ts:8:11)
    at xxx/src/repro.ts:14:1
```
