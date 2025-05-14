context https://github.com/hi-ogawa/vite-plugins/pull/851

```js
$ node repro.js
=========== runnerImport =============
{
  module: [Object: null prototype] [Module] { default: [Getter] },
  dependencies: []
}
=========== node import =============
node:internal/modules/esm/resolve:332
  throw new ERR_INVALID_MODULE_SPECIFIER(request, reason,
        ^

TypeError [ERR_INVALID_MODULE_SPECIFIER]: Invalid module "./vendor/node_modules/test.js" request is not a valid match in pattern "./*" for the "exports" resolution of /home/hiroshi/code/personal/reproductions/vite-internal-node-modules-resolution/node_modules/@vitejs/test-dep/package.json imported from /home/hiroshi/code/personal/reproductions/vite-internal-node-modules-resolution/repro.js
    at throwInvalidSubpath (node:internal/modules/esm/resolve:332:9)
    at resolvePackageTargetString (node:internal/modules/esm/resolve:444:7)
    at resolvePackageTarget (node:internal/modules/esm/resolve:484:12)
    at packageExportsResolve (node:internal/modules/esm/resolve:644:27)
    at packageResolve (node:internal/modules/esm/resolve:774:12)
    at moduleResolve (node:internal/modules/esm/resolve:854:18)
    at defaultResolve (node:internal/modules/esm/resolve:984:11)
    at ModuleLoader.defaultResolve (node:internal/modules/esm/loader:685:12)
    at #cachedDefaultResolve (node:internal/modules/esm/loader:634:25)
    at ModuleLoader.resolve (node:internal/modules/esm/loader:617:38) {
  code: 'ERR_INVALID_MODULE_SPECIFIER'
}

Node.js v22.14.0
```
