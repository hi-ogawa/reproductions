- https://github.com/napi-rs/napi-rs/issues/2206

Is it possible to force cjs linked deps as external for astro config ssrLoadModule?

```sh
$ pnpm dev
...

11:49:06 AM [vite] Error when evaluating SSR module /fixtures/test-dep-cjs/index.js:
|- ReferenceError: require is not defined
    at /home/hiroshi/code/personal/reproductions/vite-ssr-cjs-astro-napi-rs-2206/fixtures/test-dep-cjs/index.js:2:1
    at instantiateModule (file:///home/hiroshi/code/personal/reproductions/vite-ssr-cjs-astro-napi-rs-2206/node_modules/.pnpm/vite@5.3.5/node_modules/vite/dist/node/chunks/dep-mCdpKltl.js:52650:11)

11:49:06 AM [vite] Error when evaluating SSR module /home/hiroshi/code/personal/reproductions/vite-ssr-cjs-astro-napi-rs-2206/astro.config.ts:
|- ReferenceError: require is not defined
    at /home/hiroshi/code/personal/reproductions/vite-ssr-cjs-astro-napi-rs-2206/fixtures/test-dep-cjs/index.js:2:1
    at instantiateModule (file:///home/hiroshi/code/personal/reproductions/vite-ssr-cjs-astro-napi-rs-2206/node_modules/.pnpm/vite@5.3.5/node_modules/vite/dist/node/chunks/dep-mCdpKltl.js:52650:11)

[astro] Unable to load your Astro config
```
