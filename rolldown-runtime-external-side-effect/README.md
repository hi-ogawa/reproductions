## context

- https://github.com/hi-ogawa/vite-plugins/pull/931

## example

```sh
$ ./node_modules/rolldown-vite/bin/vite.js build
rolldown-vite v6.3.18 building SSR bundle for production...
[resolveId] { source: 'node:module', importer: 'rolldown:runtime' }
✓ 7 modules transformed.
dist/index.js  72.72 kB

$ grep 'node:module' dist/index.js
import "node:module";

$ ./node_modules/vite/bin/vite.js build
vite v6.3.5 building SSR bundle for production...
✓ 16 modules transformed.
dist/index.js  84.39 kB
✓ built in 155ms

$ grep 'node:module' dist/index.js
```
