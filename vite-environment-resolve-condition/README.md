- https://github.com/hi-ogawa/vite-environment-examples/pull/115

```sh
pnpm dev
```

---

Reroduction on Vite 5 with `ssr.target: "webworker"`

- run `node repro-v5.js`
- open `http://localhost:5173/` and see `client: index.browser.js`
- open `http://localhost:5173/ssr` and see `ssr: index.browser.js`
- kill and start `node repro-v5.js`
- open `http://localhost:5173/ssr` and see `ssr: index.worker.js`
- open `http://localhost:5173` and see `ssr: index.worker.js`

```sh
node repro-v5.js
```
