https://github.com/vitejs/vite/issues/15890

- Svelte ssr event handler elimination issue?

```sh
# warning on vite ssr build
$ pnpm build --ssr
vite v5.1.1 building SSR bundle for production...
"omit" is imported from external module "lodash-es" but never used in "src/svelte/app.svelte".
✓ 22 modules transformed.
dist/vite/server/app.js  1.53 kB
✓ built in 148ms

# ok on vite client build
$ pnpm build
...
vite v5.1.1 building for production...
✓ 663 modules transformed.
dist/vite/client/assets/app-IHki7fMi.js  0.09 kB │ gzip: 0.09 kB
✓ built in 645ms
```

- Rollup issue 1
  - warning should not include `src/rollup1/app2.js`

```sh
$ pnpm build-rollup1
...
./src/rollup1/app1.js, ./src/rollup1/app2.js → dist/rollup1...
(!) Unused external imports
omit imported from external module "lodash-es" but never used in "src/rollup1/app1.js" and "src/rollup1/app2.js".
created dist/rollup1 in 23ms
```

- Rollup issue 2
  - there should be a warning for unused `omit` in `src/rollup2/app1.js`

```sh
$ pnpm build-rollup2
...
./src/rollup2/app1.js, ./src/rollup2/app2.js → dist/rollup2...
created dist/rollup2 in 18ms
```
