- https://github.com/vitest-dev/vitest/issues/6483

```sh
$ pnpm test
 FAIL  |browser| components/repro.test.ts [ components/repro.test.ts ]
SyntaxError: The requested module '/node_modules/.vite/deps/date-fns_parse.js?v=aeeecc0d' does not provide an export named 'parse'
```
