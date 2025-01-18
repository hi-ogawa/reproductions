## context

- https://github.com/lukeed/resolve.exports/issues/35
- https://github.com/vitest-dev/vitest/issues/7277
- https://publint.dev/@neodrag/react@2.3.0

## reproductions

```sh
$ node repro.js
{ testDep: 'default.js' }

$ node --conditions custom repro.js
{ testDep: 'import-custom.js' }

$ node repro-vite.js
2:22:21 PM [vite] (ssr) Error when evaluating SSR module ./repro.js:
|- Error: Failed to resolve entry for package "@vitest/test-dep". The package may have incorrect main/module/exports specified in its package.json: No known conditions for "." specifier in "@vitest/test-dep" package
...
```
