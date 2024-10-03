Deps optimization is not applied when loading a dependency directly as `ssrLoadModule("react")`.

```sh
$ DEBUG=vite:resolve node repro.mjs
  vite:resolve 1.76ms react -> /home/hiroshi/code/personal/reproductions/vite-ssr-optimizeDeps-entry/node_modules/.pnpm/react@18.3.1/node_modules/react/index.js +0ms
11:48:42 PM [vite] Error when evaluating SSR module react:
|- ReferenceError: module is not defined
    at eval (/home/hiroshi/code/personal/reproductions/vite-ssr-optimizeDeps-entry/node_modules/.pnpm/react@18.3.1/node_modules/react/index.js:8:3)
    at instantiateModule (file:///home/hiroshi/code/personal/reproductions/vite-ssr-optimizeDeps-entry/node_modules/.pnpm/vite@5.4.8/node_modules/vite/dist/node/chunks/dep-CDnG8rE7.js:52915:11)
```
