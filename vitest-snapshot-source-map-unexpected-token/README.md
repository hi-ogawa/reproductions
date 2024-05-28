```sh
npm test

 DEV  v1.6.0 ((my-dir))

stderr | src/repro.test.ts > repro
SyntaxError: Unexpected token 'z', "zw(u�" is not valid JSON
    at JSON.parse (<anonymous>)
    at extractSourceMap (file://((my-dir))/node_modules/vite-node/dist/source-map.mjs:896:17)
    at ModuleCacheMap.getSourceMap (file://((my-dir))/node_modules/vite-node/dist/client.mjs:137:31)
    at Object.getSourceMap (file://((my-dir))/node_modules/vitest/dist/chunks/runtime-runBaseTests.oAvMKtQC.js:67:49)
    at Array.retrieveSourceMap (file://((my-dir))/node_modules/vite-node/dist/source-map.mjs:902:27)
    at file://((my-dir))/node_modules/vite-node/dist/source-map.mjs:575:26
    at mapSourcePosition (file://((my-dir))/node_modules/vite-node/dist/source-map.mjs:652:23)
    at wrapCallSite (file://((my-dir))/node_modules/vite-node/dist/source-map.mjs:784:22)
    at Function.prepareStackTrace (file://((my-dir))/node_modules/vite-node/dist/source-map.mjs:831:10)
    at prepareStackTraceCallback (node:internal/errors:145:29)

 ❯ src/repro.test.ts (1)
   × repro

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/repro.test.ts > repro
SyntaxError: Unexpected token 'z', "zw(u�" is not valid JSON
```
