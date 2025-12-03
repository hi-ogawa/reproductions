## Context

- https://github.com/vitest-dev/vitest/issues/9003

## Node

```sh
$ node repro.js
file:///xxx/repro.js:11
  throw new Error("boom");
        ^

Error: boom
    at x.HelloWorld [as constructor] (file:///xxx/repro.js:11:9)
    at x.E [as render] (file:///xxx/node_modules/.pnpm/preact@10.28.0/node_modules/preact/dist/preact.mjs:1:9276)
    at O (file:///xxx/node_modules/.pnpm/preact@10.28.0/node_modules/preact/dist/preact.mjs:1:6218)
    at I (file:///xxx/node_modules/.pnpm/preact@10.28.0/node_modules/preact/dist/preact.mjs:1:1839)
    at O (file:///xxx/node_modules/.pnpm/preact@10.28.0/node_modules/preact/dist/preact.mjs:1:6500)
    at G (file:///xxx/node_modules/.pnpm/preact@10.28.0/node_modules/preact/dist/preact.mjs:1:9439)
    at file:///xxx/repro.js:15:1
    at ModuleJob.run (node:internal/modules/esm/module_job:377:25)
    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:671:26)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:101:5)

Node.js v24.11.1
```

## Node --enable-source-maps

```sh
$ node --enable-source-maps repro.js
file:///xxx/repro.js:11
  throw new Error("boom");
        ^

Error: boom
    at x.HelloWorld [as constructor] (file:///xxx/repro.js:11:9)
    at x.render (/xxx/node_modules/.pnpm/preact@10.28.0/node_modules/preact/src/diff/index.js:683:14)
    at diff (/xxx/node_modules/.pnpm/preact@10.28.0/node_modules/preact/src/diff/index.js:239:14)
    at diffChildren (/xxx/node_modules/.pnpm/preact@10.28.0/node_modules/preact/src/diff/children.js:97:16)
    at diff (/xxx/node_modules/.pnpm/preact@10.28.0/node_modules/preact/src/diff/index.js:265:13)
    at G (/xxx/node_modules/.pnpm/preact@10.28.0/node_modules/preact/src/render.js:42:2)
    at file:///xxx/repro.js:15:1
    at ModuleJob.run (node:internal/modules/esm/module_job:377:25)
    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:671:26)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:101:5)

Node.js v24.11.1
```

## Vitest v4.0.15

```
 FAIL  tests/HelloWorld.test.js > renders name
Error: boom
 ❯ x.HelloWorld [as constructor] tests/HelloWorld.test.js:5:9
      3| 
      4| function HelloWorld({ name }) {
      5|   throw new Error("boom");
       |         ^
      6| }
      7| 
 ❯ x.E [as render] node_modules/.pnpm/preact@10.28.0/node_modules/preact/dist/preact.mjs:1:9214
 ❯ O node_modules/.pnpm/preact@10.28.0/node_modules/preact/dist/preact.mjs:1:6156
 ❯ I node_modules/.pnpm/preact@10.28.0/node_modules/preact/dist/preact.mjs:1:1777
 ❯ O node_modules/.pnpm/preact@10.28.0/node_modules/preact/dist/preact.mjs:1:6438
 ❯ G node_modules/.pnpm/preact@10.28.0/node_modules/preact/dist/preact.mjs:1:9377
 ❯ tests/HelloWorld.test.js:9:9
```

## Vitest https://github.com/vitest-dev/vitest/pull/9152

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
 ❯ vnode node_modules/.pnpm/preact@10.28.0/node_modules/preact/src/diff/index.js:675:13
 ❯ i node_modules/.pnpm/preact@10.28.0/node_modules/preact/src/diff/index.js:230:50
 ❯ i node_modules/.pnpm/preact@10.28.0/node_modules/preact/src/diff/children.js:81:36
 ❯ tmp node_modules/.pnpm/preact@10.28.0/node_modules/preact/src/diff/index.js:259:22
 ❯ parentDom node_modules/.pnpm/preact@10.28.0/node_modules/preact/src/render.js:20:41
 ❯ tests/HelloWorld.test.js:9:9
```
