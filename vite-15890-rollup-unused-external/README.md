https://github.com/vitejs/vite/issues/15890

```sh
#
# warning on ssr build
#
$ pnpm build --ssr
...
vite v5.1.1 building SSR bundle for production...
"omit" is imported from external module "lodash-es" but never used in "src/svelte/app2.svelte" and "src/svelte/app1.svelte".
✓ 23 modules transformed.
dist/vite/app1.js                 0.21 kB
dist/vite/app2.js                 0.25 kB
dist/vite/assets/ssr-hCmxaejy.js  1.43 kB
✓ built in 175ms

#
# warning on client build
#
$ pnpm build
...
vite v5.1.1 building for production...
✓ 664 modules transformed.
dist/vite/assets/app2-in1TljnR.js  0.03 kB │ gzip: 0.05 kB
dist/vite/assets/app1-IHki7fMi.js  0.09 kB │ gzip: 0.09 kB
✓ built in 598ms
```
