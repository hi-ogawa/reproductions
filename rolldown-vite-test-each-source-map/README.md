## context

https://github.com/vitest-dev/vitest/pull/7509#discussion_r1964728043

## reproduction

```sh
$ node repro.js
Trace: __DEBUG__
    at file:////xxx/repro.js:10:11
    at file:////xxx/repro.js:4:7
    at file:////xxx/repro.js:9:18  👈👈👈
    at ModuleJob.run (node:internal/modules/esm/module_job:271:25)
    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:578:26)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:116:5)

$ node --experimental-strip-types repro.ts
Trace: __DEBUG__
    at file:////xxx/repro.ts:10:11
    at file:////xxx/repro.ts:4:7
    at file:////xxx/repro.ts:9:18  👈👈👈
    at ModuleJob.run (node:internal/modules/esm/module_job:271:25)
    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:578:26)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:116:5)
(node:49728) ExperimentalWarning: Type Stripping is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)

$ node --import tsx/esm repro.ts
Trace: __DEBUG__
    at <anonymous> (//xxx/repro.ts:10:11)
    at <anonymous> (//xxx/repro.ts:4:7)
    at <anonymous> (//xxx/repro.ts:9:17)  👈👈👈
    at ModuleJob.run (node:internal/modules/esm/module_job:271:25)
    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:578:26)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:116:5)
```
