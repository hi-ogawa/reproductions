https://github.com/users/hi-ogawa/projects/4/views/1?pane=issue&itemId=73410910

`new URL(..., import.meta.url)` alone triggers only asset copy while `new Worker(new URL(..., import.meta.url))` triggers a dedicated worker entry bundle.

```sh
pnpm dev
pnpm bulid
pnpm preview
```
