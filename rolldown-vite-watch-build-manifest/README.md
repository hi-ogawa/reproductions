# context

- https://github.com/hi-ogawa/vite-environment-examples/pull/154

# reproduction

- run `pnpm build --watch`
- see `dist/.vite/manifest.json` includes `src/dep.js`
- edit `src/main.js` to remove `import("./dep.js")`
- see `dist/.vite/manifest.json` still includes `src/dep.js`


```sh
$ pnpm build --watch
vite v6.0.11 building for production...

watching for file changes...

--- 1st build ---
build started...
✓ 5 modules transformed.
dist/.vite/manifest.json       0.31 kB │ gzip: 0.18 kB
dist/index.html                0.32 kB │ gzip: 0.23 kB
dist/assets/dep-D1M531Dn.js    0.02 kB │ gzip: 0.04 kB
dist/assets/index-6lgMnd3v.js  3.35 kB │ gzip: 1.25 kB
built in 61ms.

--- 2nd build ---
build started...
✓ 1 modules transformed.
dist/.vite/manifest.json       0.26 kB │ gzip: 0.16 kB
dist/index.html                0.32 kB │ gzip: 0.23 kB
dist/assets/index-X0jGllOl.js  1.29 kB │ gzip: 0.53 kB
built in 21ms.
```
