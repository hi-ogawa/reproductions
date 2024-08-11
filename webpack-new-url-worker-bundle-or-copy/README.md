https://github.com/users/hi-ogawa/projects/4/views/1?pane=issue&itemId=73410910

`new URL(..., import.meta.url)` alone triggers asset copy while `new Worker(new URL(..., import.meta.url))` triggers a separate worker entry bundle.

```sh
pnpm dev
pnpm bulid
pnpm preview
```

- https://webpack.js.org/guides/asset-modules/#url-assets
- https://webpack.js.org/guides/web-workers/
