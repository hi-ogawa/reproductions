## context

- https://github.com/vitejs/rolldown-vite/issues/256

## example

`strictExecutionOrder` + `nodejs_compat`

```sh
$ pnpm build
$ node dist/ssr/entry.js
file:///home/hiroshi/code/personal/reproductions/rolldown-vite-256-cloudflare/dist/ssr/entry.js:23
var init_utils = __esmMin(() => {});
                 ^

TypeError: __esmMin is not a function
    at file:///home/hiroshi/code/personal/reproductions/rolldown-vite-256-cloudflare/dist/ssr/entry.js:23:18
    at ModuleJob.run (node:internal/modules/esm/module_job:271:25)
    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:578:26)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:116:5)
```
