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
