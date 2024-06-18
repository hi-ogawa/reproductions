- https://github.com/vitest-dev/vitest/issues/5911

```sh
$ node repro-vite-ssr.js
{ pkg: 'test' }

$ pnpm test
 FAIL  test/repro.test.ts [ test/repro.test.ts ]
TypeError: Unknown file extension ".ts" for /home/hiroshi/code/personal/reproductions/vitest-5911-deps-inline-glob/node_modules/.pnpm/@test-pkg+pkg@file+deps+test/node_modules/@test-pkg/pkg/test.ts
```
