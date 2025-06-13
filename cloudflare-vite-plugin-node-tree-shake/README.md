## context

- https://github.com/vitejs/rolldown-vite/issues/256

## example

```sh
$ pnpm build
vite v6.3.5 building SSR bundle for production...
✓ 1 modules transformed.
dist/entry.js  0.10 kB
✓ built in 25ms

$ grep -r 'node:crypto' dist/ssr/entry.js

$ pnpm build -c vite.config.cf.ts
vite v6.3.5 building SSR bundle for production...
✓ 22 modules transformed.
dist/ssr/.vite/manifest.json   0.12 kB
dist/ssr/wrangler.json         1.15 kB
dist/ssr/entry.js             19.07 kB
✓ built in 95ms

$ grep -r 'node:crypto' dist/ssr/entry.js
const workerdCrypto = process.getBuiltinModule("node:crypto");
```
