https://github.com/cloudflare/workers-sdk/issues/5646

deps optimization on vitest workers

```sh
#
# without deps.optimizer
#
$ npm run test

 FAIL  test/repro.test.ts [ test/repro.test.ts ]
Error: Module cannot be synchronously required while it is being instantiated or evaluated. This error typically means that a CommonJS or NodeJS-Compat type module has a circular dependency on itself, and that a synchronous require() is being called while the module is being loaded.
 ❯ home/hiroshi/code/personal/reproductions/workers-sdk-5646-cjs/node_modules/semver/classes/range.js?mf_vitest_no_cjs_esm_shim:205:20
 ❯ home/hiroshi/code/personal/reproductions/workers-sdk-5646-cjs/node_modules/semver/classes/comparator.js?mf_vitest_no_cjs_esm_shim:141:15
 ❯ home/hiroshi/code/personal/reproductions/workers-sdk-5646-cjs/node_modules/semver/index.js?mf_vitest_no_cjs_esm_shim:29:20

#⎯⎯⎯⎯⎯⎯
# with deps.optimizer
#
$ npm run test

> clean-project@0.0.1 test
> vitest


 DEV  v1.3.0 /home/hiroshi/code/personal/reproductions/workers-sdk-5646-cjs

[vpw:inf] Starting isolated runtimes for vitest.config.ts...
workerd/server/server.c++:2802: error: Fallback service failed to fetch module; payload = ; spec = /?specifier=%2Fhome%2Fhiroshi%2Fcode%2Fpersonal%2Freproductions%2Fworkers-sdk-5646-cjs%2Fnode_modules%2Fvitest%2Fdist%2Fspy.js%3Fv%3Dc78d233e&referrer=%2Fhome%2Fhiroshi%2Fcode%2Fpersonal%2Freproductions%2Fworkers-sdk-5646-cjs%2Fnode_modules%2Fvite-node%2Fdist%2Fclient.mjs
Error running worker: Error: No such module "home/hiroshi/code/personal/reproductions/workers-sdk-5646-cjs/node_modules/vite-node/dist/file:/home/hiroshi/code/personal/reproductions/workers-sdk-5646-cjs/node_modules/vitest/dist/spy.js".
    at VitestExecutor.importExternalModule (file:///home/hiroshi/code/personal/reproductions/workers-sdk-5646-cjs/node_modules/vite-node/dist/client.mjs:377:5)
    at VitestExecutor.importExternalModule (file:///home/hiroshi/code/personal/reproductions/workers-sdk-5646-cjs/node_modules/vitest/dist/vendor/execute.aFSzc0Da.js:568:18)
    at VitestExecutor.interopedImport (file:///home/hiroshi/code/personal/reproductions/workers-sdk-5646-cjs/node_modules/vite-node/dist/client.mjs:383:39)
    at VitestExecutor.directRequest (file:///home/hiroshi/code/personal/reproductions/workers-sdk-5646-cjs/node_modules/vite-node/dist/client.mjs:253:35)
    at async VitestExecutor.cachedRequest (file:///home/hiroshi/code/personal/reproductions/workers-sdk-5646-cjs/node_modules/vite-node/dist/client.mjs:189:14)
    at async VitestExecutor.executeId (file:///home/hiroshi/code/personal/reproductions/workers-sdk-5646-cjs/node_modules/vite-node/dist/client.mjs:165:12)
    at async VitestMocker.initializeSpyModule (file:///home/hiroshi/code/personal/reproductions/workers-sdk-5646-cjs/node_modules/vitest/dist/vendor/execute.aFSzc0Da.js:64:22)
    at async createVitestExecutor (file:///home/hiroshi/code/personal/reproductions/workers-sdk-5646-cjs/node_modules/vitest/dist/vendor/execute.aFSzc0Da.js:367:3)
    at async startVitestExecutor (file:///home/hiroshi/code/personal/reproductions/workers-sdk-5646-cjs/node_modules/vitest/dist/vendor/execute.aFSzc0Da.js:407:10)
    at async startViteNode (file:///home/hiroshi/code/personal/reproductions/workers-sdk-5646-cjs/node_modules/vitest/dist/vendor/base.RpormaJz.js:11:15)

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Unhandled Errors ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

Vitest caught 1 unhandled error during the test run.
This might cause false positive tests. Resolve unhandled errors to make sure your tests are not affected.

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Unhandled Error ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯
Error: No such module "home/hiroshi/code/personal/reproductions/workers-sdk-5646-cjs/node_modules/vite-node/dist/file:/home/hiroshi/code/personal/reproductions/workers-sdk-5646-cjs/node_modules/vitest/dist/spy.js".
 ❯ VitestExecutor.importExternalModule node_modules/vite-node/dist/client.mjs:377:5
 ❯ VitestExecutor.importExternalModule node_modules/vitest/dist/vendor/execute.aFSzc0Da.js:568:18
 ❯ VitestExecutor.interopedImport node_modules/vite-node/dist/client.mjs:383:39
 ❯ VitestExecutor.directRequest node_modules/vite-node/dist/client.mjs:253:35
 ❯ VitestExecutor.cachedRequest node_modules/vite-node/dist/client.mjs:189:14
 ❯ VitestExecutor.executeId node_modules/vite-node/dist/client.mjs:165:12
 ❯ VitestMocker.initializeSpyModule node_modules/vitest/dist/vendor/execute.aFSzc0Da.js:64:22
 ❯ createVitestExecutor node_modules/vitest/dist/vendor/execute.aFSzc0Da.js:367:3
 ❯ startVitestExecutor node_modules/vitest/dist/vendor/execute.aFSzc0Da.js:407:10
 ❯ startViteNode node_modules/vitest/dist/vendor/base.RpormaJz.js:11:15

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 Test Files  no tests
      Tests  no tests
     Errors  1 error
   Start at  17:05:28
   Duration  554ms (transform 12ms, setup 0ms, collect 0ms, tests 0ms, environment 0ms, prepare 0ms)

#
# after patching
#   resolved.id.split("v=")[0]
#
$ npm run test
...
stdout | test/repro.test.ts > repro
_SemVer {
  options: {},
  loose: false,
  includePrerelease: false,
  raw: 'v1.2.3',
  major: 1,
  minor: 2,
  patch: 3,
  prerelease: [],
  build: [],
  version: '1.2.3'
}
file:///home/hiroshi/code/personal/reproductions/workers-sdk-5646-cjs/node_modules/.vitest/deps_ssr/test-optimized.js
```
