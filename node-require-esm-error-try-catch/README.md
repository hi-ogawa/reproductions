https://github.com/vitejs/vite/pull/18969#issuecomment-2544503227

```sh
$ node -v
v22.12.0

$ node src/require-esm.cjs
[try/catch require(esm)] Error: boom
    at file:///home/hiroshi/code/personal/reproductions/node-require-esm-error-try-catch/src/error.mjs:1:7
    at ModuleJobSync.runSync (node:internal/modules/esm/module_job:395:35)
    at ModuleLoader.importSyncForRequire (node:internal/modules/esm/loader:329:47)
    at Object.loadESMFromCJS [as .mjs] (node:internal/modules/cjs/loader:1414:24)
    at Module.load (node:internal/modules/cjs/loader:1318:32)
    at Function._load (node:internal/modules/cjs/loader:1128:12)
    at TracingChannel.traceSync (node:diagnostics_channel:322:14)
    at wrapModuleLoad (node:internal/modules/cjs/loader:219:24)
    at Module.require (node:internal/modules/cjs/loader:1340:12)
    at require (node:internal/modules/helpers:138:16)
(node:76690) ExperimentalWarning: CommonJS module /home/hiroshi/code/personal/reproductions/node-require-esm-error-try-catch/src/require-esm.cjs is loading ES Module /home/hiroshi/code/personal/reproductions/node-require-esm-error-try-catch/src/error.mjs using require().
Support for loading ES Module in require() is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
[unhandledRejection] Error: boom
    at file:///home/hiroshi/code/personal/reproductions/node-require-esm-error-try-catch/src/error.mjs:1:7
    at ModuleJobSync.runSync (node:internal/modules/esm/module_job:395:35)
    at ModuleLoader.importSyncForRequire (node:internal/modules/esm/loader:329:47)
    at Object.loadESMFromCJS [as .mjs] (node:internal/modules/cjs/loader:1414:24)
    at Module.load (node:internal/modules/cjs/loader:1318:32)
    at Function._load (node:internal/modules/cjs/loader:1128:12)
    at TracingChannel.traceSync (node:diagnostics_channel:322:14)
    at wrapModuleLoad (node:internal/modules/cjs/loader:219:24)
    at Module.require (node:internal/modules/cjs/loader:1340:12)
    at require (node:internal/modules/helpers:138:16)
```
