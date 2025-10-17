## context

https://github.com/vitejs/vite/pull/20609

## example

```sh
$ pnpm dev
> vite --force

6:20:51 PM [vite] (client) Forced re-optimization of dependencies

  VITE v7.1.10  ready in 99 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
6:20:53 PM [vite] (client) ✨ new dependencies optimized: preact/hooks
6:20:53 PM [vite] (client) ✨ optimized dependencies changed. reloading
```

Upon late optimize deps discovery, client fails with an error like below by loading such as `.vite/deps/chunk-P3L2S7HS.js?v=463a5874` and `vite/deps/chunk-P3L2S7HS.js?v=1e877ca8`:

```
[vite] connecting...
preact_hooks.js?v=1446baa0:21 Uncaught (in promise) TypeError: Cannot read properties of undefined (reading '__H')
    at p (preact_hooks.js?v=1446baa0:21:14)
    at h (preact_hooks.js?v=1446baa0:28:12)
    at d (preact_hooks.js?v=1446baa0:25:17)
    ...
[vite] connected.
```

In this situation, Vite server triggers full reload, but `@vite/client` hasn't initialized properly yet at that point and misses the event and manual reload is required to recover.
