## context

- https://github.com/vitest-dev/vitest/pull/7071

## reproduction

```sh
# with Vite 6
$ pnpm test
stdout | src/basic.test.ts > repro
@vitejs/test-dep => index.import-node.js

# with Vite 5 (need to cleanup node_modules and pnpm-lock.yaml)
$ pnpm test
stdout | src/basic.test.ts > repro
@vitejs/test-dep => index.module.js
```
