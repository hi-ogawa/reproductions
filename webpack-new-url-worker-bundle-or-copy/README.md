https://github.com/users/hi-ogawa/projects/4/views/1?pane=issue&itemId=73410910

`new URL(..., import.meta.url)` alone triggers asset copy while `new Worker(new URL(..., import.meta.url))` triggers a separate worker entry bundle.

```sh
pnpm dev
pnpm bulid
pnpm preview

# implementing something similar on rollup using plugins
pnpm build-rollup
pnpm preview-rollup

# comparing with parcel
pnpm dev-parcel
pnpm build-parcel
pnpm preview-parcel

# no bundler
pnpm dev-no-bundler
```

- https://webpack.js.org/guides/asset-modules/#url-assets
- https://webpack.js.org/guides/web-workers/
- https://github.com/webpack/webpack/issues/14681
- https://github.com/vitejs/vite/pull/17837
- https://github.com/hi-ogawa/vite-plugins/tree/main/packages/pre-bundle-new-url
- https://parceljs.org/languages/javascript/#url-dependencies
- https://parceljs.org/languages/javascript/#web-workers
- https://github.com/parcel-bundler/parcel/issues/8924#issuecomment-1494488167
- https://github.com/evanw/esbuild/pull/2508
- https://github.com/lgarron/loadeverything.net

## bundler comparison

TODO: native, vite dev, vite build, webpack, rspack, parcel, esbuild PR, vite dev PR

- `new URL`
- `new Worker(new URL)`
- worker exports condition / environment separation
- "ignore"-ability. how to fallback when asset not found
- `import.meta.resolve` like feature to reference assets from node_modules
- self reference worker handling

|                                                   | vite dev | vite dev (pre-bundle) | vite build | webpack    | parcel     | esbuild (PR-2508) | vite dev (pre-bundle PR-17837) |
|---------------------------------------------------|----------|-----------------------|------------|------------|------------|-------------------|--------------------------------|
| new URL("./test.svg", import.meta.url)            | ✅        | ❌                     | ✅          | ✅          | ✅          | ❓                 | ✅                              |
| new URL("./test.js", import.meta.url)             | ✅        | ❌                     | ✅          | ✅          | ✅ (bundle) | ✅ (bundle)        | ✅                              |
| new URL("some-dep/test.svg", import.meta.url)     | ❌        | ❌                     | ❌          | ✅          | ❌          | ❓                 | ❌                              |
| new Worker(new URL("./test.js", import.meta.url)) | ✅        | ❌                     | ✅ (bundle) | ✅ (bundle) | ✅ (bundle) | ✅ (bundle)        | ✅ (bundle)                     |
