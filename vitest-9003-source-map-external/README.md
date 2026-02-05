## Context

- https://github.com/vitest-dev/vitest/issues/9003

## Node ❌

```sh
$ node repro.js
file:///home/hiroshi/code/personal/reproductions/vitest-9003-source-map-external/repro.js:11
  throw new Error("boom");
        ^

Error: boom
    at x.HelloWorld [as constructor] (file:///home/hiroshi/code/personal/reproductions/vitest-9003-source-map-external/repro.js:11:9)
    at x.E [as render] (file:///home/hiroshi/code/personal/reproductions/vitest-9003-source-map-external/node_modules/.pnpm/preact@10.28.3/node_modules/preact/dist/preact.mjs:1:9289)
    at O (file:///home/hiroshi/code/personal/reproductions/vitest-9003-source-map-external/node_modules/.pnpm/preact@10.28.3/node_modules/preact/dist/preact.mjs:1:6231)
    at I (file:///home/hiroshi/code/personal/reproductions/vitest-9003-source-map-external/node_modules/.pnpm/preact@10.28.3/node_modules/preact/dist/preact.mjs:1:1839)
    at O (file:///home/hiroshi/code/personal/reproductions/vitest-9003-source-map-external/node_modules/.pnpm/preact@10.28.3/node_modules/preact/dist/preact.mjs:1:6513)
    at G (file:///home/hiroshi/code/personal/reproductions/vitest-9003-source-map-external/node_modules/.pnpm/preact@10.28.3/node_modules/preact/dist/preact.mjs:1:9452)
    at file:///home/hiroshi/code/personal/reproductions/vitest-9003-source-map-external/repro.js:15:1
    at ModuleJob.run (node:internal/modules/esm/module_job:413:25)
    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:660:26)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:101:5)

Node.js v24.13.0
```

The code at `preact/dist/preact.mjs:1:9289` is

```
function E(n,l,u){return this.constructor(n,u)}
                              ^ 1:9289
```

## Node --enable-source-maps ✅

```sh
$ node --enable-source-maps repro.js
file:///home/hiroshi/code/personal/reproductions/vitest-9003-source-map-external/repro.js:11
  throw new Error("boom");
        ^

Error: boom
    at x.HelloWorld [as constructor] (file:///home/hiroshi/code/personal/reproductions/vitest-9003-source-map-external/repro.js:11:9)
    at x.render (/home/hiroshi/code/personal/reproductions/vitest-9003-source-map-external/node_modules/.pnpm/preact@10.28.3/node_modules/preact/src/diff/index.js:683:14)
    at diff (/home/hiroshi/code/personal/reproductions/vitest-9003-source-map-external/node_modules/.pnpm/preact@10.28.3/node_modules/preact/src/diff/index.js:239:14)
    at diffChildren (/home/hiroshi/code/personal/reproductions/vitest-9003-source-map-external/node_modules/.pnpm/preact@10.28.3/node_modules/preact/src/diff/children.js:97:16)
    at diff (/home/hiroshi/code/personal/reproductions/vitest-9003-source-map-external/node_modules/.pnpm/preact@10.28.3/node_modules/preact/src/diff/index.js:265:13)
    at G (/home/hiroshi/code/personal/reproductions/vitest-9003-source-map-external/node_modules/.pnpm/preact@10.28.3/node_modules/preact/src/render.js:42:2)
    at file:///home/hiroshi/code/personal/reproductions/vitest-9003-source-map-external/repro.js:15:1
    at ModuleJob.run (node:internal/modules/esm/module_job:413:25)
    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:660:26)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:101:5)

Node.js v24.13.0
```

## Vitest v4.1.0-beta.3 ❌

```
$ pnpm vitest

 FAIL  tests/HelloWorld.test.js > renders name
Error: boom
 ❯ x.HelloWorld [as constructor] tests/HelloWorld.test.js:5:9
      3|
      4| function HelloWorld({ name }) {
      5|   throw new Error("boom");
       |         ^
      6| }
      7|
 ❯ x.E [as render] node_modules/.pnpm/preact@10.28.3/node_modules/preact/dist/preact.mjs:1:9227
 ❯ O node_modules/.pnpm/preact@10.28.3/node_modules/preact/dist/preact.mjs:1:6169
 ❯ I node_modules/.pnpm/preact@10.28.3/node_modules/preact/dist/preact.mjs:1:1777
 ❯ O node_modules/.pnpm/preact@10.28.3/node_modules/preact/dist/preact.mjs:1:6451
 ❯ G node_modules/.pnpm/preact@10.28.3/node_modules/preact/dist/preact.mjs:1:9390
 ❯ tests/HelloWorld.test.js:9:9
```

Here `preact/dist/preact.mjs:1:9227` isn't a render function.

The difference `62` from `1:9289` in node native case is likely Vite issue:
- https://github.com/vitejs/vite/blob/84079a84ad94de4c1ef4f1bdb2ab448ff2c01196/packages/vite/src/module-runner/sourcemap/interceptor.ts#L364-L371

## Vitest https://github.com/vitest-dev/vitest/pull/9152 ❌

```sh
$ pnpm vitest
...
 FAIL  tests/HelloWorld.test.js > renders name
Error: boom
 ❯ x.HelloWorld [as constructor] tests/HelloWorld.test.js:5:9
      3|
      4| function HelloWorld({ name }) {
      5|   throw new Error("boom");
       |         ^
      6| }
      7|
 ❯ vnode node_modules/.pnpm/preact@10.28.3/node_modules/preact/src/diff/index.js:675:13
 ❯ i node_modules/.pnpm/preact@10.28.3/node_modules/preact/src/diff/index.js:230:50
 ❯ i node_modules/.pnpm/preact@10.28.3/node_modules/preact/src/diff/children.js:81:36
 ❯ tmp node_modules/.pnpm/preact@10.28.3/node_modules/preact/src/diff/index.js:259:22
 ❯ parentDom node_modules/.pnpm/preact@10.28.3/node_modules/preact/src/render.js:20:41
 ❯ tests/HelloWorld.test.js:9:9
```

---

# Vite issue

Vite's `prepareStackTrace` interceptor unconditionally subtracts 62 from column positions on line 1:

https://github.com/vitejs/vite/blob/84079a84ad94de4c1ef4f1bdb2ab448ff2c01196/packages/vite/src/module-runner/sourcemap/interceptor.ts#L369-L371

```javascript
const headerLength = 62
if (line === 1 && column > headerLength && !frame.isEval())
  column -= headerLength
```

This was meant to compensate for Node's CJS wrapper (`(function (exports, require, module, __filename, __dirname) {` = 62 chars), but:
1. This CJS wrapper was removed in Node 10.16+ (as the comment above states)
2. ESM modules (`.mjs`) never had this wrapper

**Result**: For ESM external modules, stack trace columns on line 1 are incorrectly reported as `actual_column - 62`.

## Minimal repro

### Current behavior

```bash
$ node repro-vite.js
/home/hiroshi/code/personal/reproductions/vitest-9003-source-map-external/repro-vite-entry.js:7
  throw new Error("boom");
        ^

Error: boom
    at userFn (/home/hiroshi/code/personal/reproductions/vitest-9003-source-map-external/repro-vite-entry.js:4:9)
    at inner (file:///home/hiroshi/code/personal/reproductions/vitest-9003-source-map-external/node_modules/.pnpm/test-esm-external@file+fixtures+esm-external/node_modules/test-esm-external/index.js:1:52)
    at outer (file:///home/hiroshi/code/personal/reproductions/vitest-9003-source-map-external/node_modules/.pnpm/test-esm-external@file+fixtures+esm-external/node_modules/test-esm-external/index.js:1:11)
    at /home/hiroshi/code/personal/reproductions/vitest-9003-source-map-external/repro-vite-entry.js:7:6
    at ESModulesEvaluator.runInlinedModule (file:///home/hiroshi/code/personal/reproductions/vitest-9003-source-map-external/node_modules/.pnpm/vite@7.3.1_@types+node@25.2.0_tsx@4.21.0/node_modules/vite/dist/node/module-runner.js:913:3)
    at ModuleRunner.directRequest (file:///home/hiroshi/code/personal/reproductions/vitest-9003-source-map-external/node_modules/.pnpm/vite@7.3.1_@types+node@25.2.0_tsx@4.21.0/node_modules/vite/dist/node/module-runner.js:1146:59)
    at ModuleRunner.cachedRequest (file:///home/hiroshi/code/personal/reproductions/vitest-9003-source-map-external/node_modules/.pnpm/vite@7.3.1_@types+node@25.2.0_tsx@4.21.0/node_modules/vite/dist/node/module-runner.js:1053:73)
    at ModuleRunner.import (file:///home/hiroshi/code/personal/reproductions/vitest-9003-source-map-external/node_modules/.pnpm/vite@7.3.1_@types+node@25.2.0_tsx@4.21.0/node_modules/vite/dist/node/module-runner.js:1014:10)
    at main (file:///home/hiroshi/code/personal/reproductions/vitest-9003-source-map-external/repro-vite.js:13:3)

Node.js v24.13.0
```

### Expected behavior

```bash
$ node repro-vite-entry.js
file:///home/hiroshi/code/personal/reproductions/vitest-9003-source-map-external/repro-vite-entry.js:4
  throw new Error("boom");
        ^

Error: boom
    at userFn (file:///home/hiroshi/code/personal/reproductions/vitest-9003-source-map-external/repro-vite-entry.js:4:9)
    at inner (file:///home/hiroshi/code/personal/reproductions/vitest-9003-source-map-external/node_modules/.pnpm/test-esm-external@file+fixtures+esm-external/node_modules/test-esm-external/index.js:1:114)
    at outer (file:///home/hiroshi/code/personal/reproductions/vitest-9003-source-map-external/node_modules/.pnpm/test-esm-external@file+fixtures+esm-external/node_modules/test-esm-external/index.js:1:73)
    at file:///home/hiroshi/code/personal/reproductions/vitest-9003-source-map-external/repro-vite-entry.js:7:1
    at ModuleJob.run (node:internal/modules/esm/module_job:413:25)
    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:660:26)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:101:5)

Node.js v24.13.0
```

**fixtures/esm-external/index.js** (single line):
```javascript
var _padding_______________________; export function outer(fn) { return inner(fn); } function inner(fn) { return fn(); }
```

**Expected columns** (what Node reports):
- `inner` (the `fn()` call): column **114**
- `outer` (the `inner(fn)` call): column **73**

**Actual columns** (what Vite reports):
- `inner`: column **52** (114 - 62)
- `outer`: column **11** (73 - 62)

When source maps are then applied to these wrong positions, they map to incorrect locations in the original source.
