- https://github.com/hi-ogawa/vite-plugins/pull/198
- https://github.com/vitejs/vite/issues/16178

```sh
# node
node ./repro-entry.mjs
...
Error: crash ssr
    at crash (.../repro-entry.mjs:2:9)
    at main (.../repro-entry.mjs:6:3)
    ...


# vite + js
node run.mjs ./repro-entry.mjs
...
Error: crash ssr
    at crash (.../repro-entry.mjs:2:9)
    at main (.../repro-entry.mjs:6:3)
    ...


# vite 5.1.4 + ts
node run.mjs ./repro-entry.ts
...
Error: crash ssr
    at crash (.../repro-entry.ts:2:9)
    at main (.../repro-entry.ts:6:3)
    ...


# vite 5.1.5 + ts
node run.mjs ./repro-entry.ts
...
Error: crash ssr
    at crash (.../repro-entry.ts:2:9)
    at main (.../repro-entry.ts:6:9)  <---- 6:3 became 6:9
```
