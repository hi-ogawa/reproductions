- https://github.com/hi-ogawa/vite-environment-examples/pull/130

```sh
$ node repro.mjs
Error: boom
    at throwError2 (/xxx/repro-entry.ts:10:9)
    at throwError (/xxx/repro-entry.ts:6:3)
    at main (/xxx/repro-entry.ts:15:5)
    at /xxx/repro-entry.ts:21:1
    at ESModulesEvaluator.runInlinedModule (file:///xxx/node_modules/.pnpm/vite@https+++pkg.pr.new+vite@87949fe/node_modules/vite/dist/node/module-runner.js:1065:6)
    at ModuleRunner.directRequest (file:///xxx/node_modules/.pnpm/vite@https+++pkg.pr.new+vite@87949fe/node_modules/vite/dist/node/module-runner.js:1037:82)
    at ModuleRunner.cachedRequest (file:///xxx/node_modules/.pnpm/vite@https+++pkg.pr.new+vite@87949fe/node_modules/vite/dist/node/module-runner.js:935:28)
    at ModuleRunner.import (file:///xxx/node_modules/.pnpm/vite@https+++pkg.pr.new+vite@87949fe/node_modules/vite/dist/node/module-runner.js:873:23)
    at file:///xxx/repro.mjs:19:1
```

```sh
$ bun run repro.mjs
1060 |       ssrImportKey,
1061 |       ssrDynamicImportKey,
1062 |       ssrExportAllKey,
1063 |       // source map should already be inlined by Vite
1064 |       '"use strict";' + code
1065 |     )(
               ^
error: boom
      at throwError2 (7:9)
      at throwError (4:14)
      at main (11:15)
      at anonymous (1:26)
      at /xxx/node_modules/.pnpm/vite@https+++pkg.pr.new+vite@87949fe/node_modules/vite/dist/node/module-runner.js:1065:5
      at runInlinedModule (/xxx/node_modules/.pnpm/vite@https+++pkg.pr.new+vite@87949fe/node_modules/vite/dist/node/module-runner.js:1056:26)
      at /xxx/node_modules/.pnpm/vite@https+++pkg.pr.new+vite@87949fe/node_modules/vite/dist/node/module-runner.js:1037:82
      at directRequest (/xxx/node_modules/.pnpm/vite@https+++pkg.pr.new+vite@87949fe/node_modules/vite/dist/node/module-runner.js:978:23)
      at /xxx/node_modules/.pnpm/vite@https+++pkg.pr.new+vite@87949fe/node_modules/vite/dist/node/module-runner.js:935:28
```
