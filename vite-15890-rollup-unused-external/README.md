https://github.com/vitejs/vite/issues/15890

- Svelte ssr event handler elimination issue?

```sh
# warning on vite ssr build
$ pnpm build --ssr
...
vite v5.1.1 building for production...
✓ 663 modules transformed.
dist/vite/assets/app-IHki7fMi.js  0.09 kB │ gzip: 0.09 kB
✓ built in 560ms

# ok on vite client build
$ pnpm build
...
vite v5.1.1 building SSR bundle for production...
"omit" is imported from external module "lodash-es" but never used in "src/svelte/app.svelte".
✓ 22 modules transformed.
dist/vite/app.js  1.53 kB
✓ built in 147ms
```

- Rollup bug

```sh
$ pnpm build-rollup
...
./src/rollup/app1.js, ./src/rollup/app2.js → dist/rollup...
(!) Unused external imports
omit imported from external module "lodash-es" but never used in "src/rollup/app1.js" and "src/rollup/app2.js".
created dist/rollup in 17ms
```
