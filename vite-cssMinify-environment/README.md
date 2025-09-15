`environments.ssr.build.emitAssets` and `cssMinify` are not working when `builder.sharedConfigBuild: true`.

```sh
$ pnpm build
> vite build

[client/emitAssets] true
vite v7.1.5 building for production...
✓ 2 modules transformed.
dist/client/assets/client-BaiKPFAq.css  1.20 kB │ gzip: 0.62 kB
dist/client/assets/client-CDmogNEK.js   0.02 kB │ gzip: 0.04 kB
✓ built in 29ms
[ssr/emitAssets] false
vite v7.1.5 building SSR bundle for production...
✓ 2 modules transformed.
dist/ssr/ssr.js  0.02 kB
✓ built in 11ms
```
