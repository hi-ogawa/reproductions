- https://github.com/hi-ogawa/vite-plugins/pull/198
- https://github.com/vitejs/vite/issues/16178

```sh
$ node repro.mjs
...
Cannot optimize dependency: @remix-run/server-runtime > cookie, present in 'ssr.optimizeDeps.include'
...
11:44:44 [vite] Error when evaluating SSR module /node_modules/.pnpm/cookie@0.6.0/node_modules/cookie/index.js?v=d28f1a6d:
|- ReferenceError: exports is not defined
...
```
