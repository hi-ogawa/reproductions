# context

- https://github.com/vitejs/vite-plugin-react/pull/851

# reproduction

When building the same environment twice

```js
builder: {
  async buildApp(builder) {
    await builder.build(builder.environments.ssr!);
    await builder.build(builder.environments.ssr!);
  }
}
```

the second build fails by:

```sh
$ pnpm build
> vite build

vite v7.1.5 building SSR bundle for production...
✓ 2 modules transformed.
dist/ssr/.vite/manifest.json  0.16 kB
dist/ssr/wrangler.json        1.26 kB
dist/ssr/index.js             0.32 kB
✓ built in 33ms
vite v7.1.5 building SSR bundle for production...
✓ 1 modules transformed.
✗ Build failed in 9ms
error during build:
[vite]: Rollup failed to resolve import "virtual:cloudflare/user-entry" from "virtual:cloudflare/worker-entry".
This is most likely unintended because it can break your application at runtime.
If you do want to externalize this module explicitly add it to
`build.rollupOptions.external`
    at viteLog (file:///home/hiroshi/code/personal/reproductions/vite-rsc-851-cloudflare-entry-virtual/node_modules/.pnpm/vite@7.1.5/node_modules/vite/dist/node/chunks/dep-M_KD0XSK.js:34340:57)
    at onRollupLog (file:///home/hiroshi/code/personal/reproductions/vite-rsc-851-cloudflare-entry-virtual/node_modules/.pnpm/vite@7.1.5/node_modules/vite/dist/node/chunks/dep-M_KD0XSK.js:34374:9)
    at onLog (file:///home/hiroshi/code/personal/reproductions/vite-rsc-851-cloudflare-entry-virtual/node_modules/.pnpm/vite@7.1.5/node_modules/vite/dist/node/chunks/dep-M_KD0XSK.js:34169:4)
    at file:///home/hiroshi/code/personal/reproductions/vite-rsc-851-cloudflare-entry-virtual/node_modules/.pnpm/rollup@4.50.2/node_modules/rollup/dist/es/shared/node-entry.js:20939:32
    at Object.logger [as onLog] (file:///home/hiroshi/code/personal/reproductions/vite-rsc-851-cloudflare-entry-virtual/node_modules/.pnpm/rollup@4.50.2/node_modules/rollup/dist/es/shared/node-entry.js:22825:9)
    at ModuleLoader.handleInvalidResolvedId (file:///home/hiroshi/code/personal/reproductions/vite-rsc-851-cloudflare-entry-virtual/node_modules/.pnpm/rollup@4.50.2/node_modules/rollup/dist/es/shared/node-entry.js:21569:26)
    at file:///home/hiroshi/code/personal/reproductions/vite-rsc-851-cloudflare-entry-virtual/node_modules/.pnpm/rollup@4.50.2/node_modules/rollup/dist/es/shared/node-entry.js:21527:26
 ELIFECYCLE  Command failed with exit code 1.
```
