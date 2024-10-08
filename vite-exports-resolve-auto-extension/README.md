- https://github.com/vitejs/vite/discussions/18290

```sh
$ node repro.js
[Module: null prototype] { default: 'bad.js' }
```

```sh
$ node ./src/entry.js
node:internal/modules/esm/resolve:265
    throw new ERR_MODULE_NOT_FOUND(
          ^

Error [ERR_MODULE_NOT_FOUND]: Cannot find module '/xxx/node_modules/test-dep/bad' imported from /xxx/src/entry.js
    at finalizeResolution (node:internal/modules/esm/resolve:265:11)
    at moduleResolve (node:internal/modules/esm/resolve:933:10)
    at defaultResolve (node:internal/modules/esm/resolve:1169:11)
    at ModuleLoader.defaultResolve (node:internal/modules/esm/loader:542:12)
    at ModuleLoader.resolve (node:internal/modules/esm/loader:510:25)
    at ModuleLoader.getModuleJob (node:internal/modules/esm/loader:239:38)
    at ModuleLoader.import (node:internal/modules/esm/loader:472:34)
    at defaultImportModuleDynamicallyForModule (node:internal/modules/esm/utils:214:31)
    at importModuleDynamicallyCallback (node:internal/modules/esm/utils:253:12)
    at file:///xxx/src/entry.js:1:13 {
  code: 'ERR_MODULE_NOT_FOUND',
  url: 'file:///xxx/node_modules/test-dep/bad'
}

Node.js v20.18.0
```
