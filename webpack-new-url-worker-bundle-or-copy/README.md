https://github.com/users/hi-ogawa/projects/4/views/1?pane=issue&itemId=73410910

`new URL(..., import.meta.url)` alone triggers asset copy while `new Worker(new URL(..., import.meta.url))` triggers a separate worker entry bundle.

```sh
pnpm dev
pnpm bulid
pnpm preview

# implementing something similar on rollup using plugins
pnpm build-rollup
pnpm preview-rollup
```

- https://webpack.js.org/guides/asset-modules/#url-assets
- https://webpack.js.org/guides/web-workers/
- https://github.com/webpack/webpack/issues/14681
- https://github.com/hi-ogawa/vite-plugins/tree/main/packages/pre-bundle-new-url
