## context

- https://github.com/hi-ogawa/vite-plugins/pull/931

## example

```sh
$ pnpm build

> @example/basic@ build /home/hiroshi/code/personal/reproductions/rolldown-runtime-external-side-effect-cf
> vite build

You or a plugin you are using have set `optimizeDeps.esbuildOptions` but this option is now deprecated. Vite now uses Rolldown to optimize the dependencies. Please use `optimizeDeps.rollupOptions` instead.
You or a plugin you are using have set `optimizeDeps.esbuildOptions` but this option is now deprecated. Vite now uses Rolldown to optimize the dependencies. Please use `optimizeDeps.rollupOptions` instead. (x2)
You or a plugin you are using have set `optimizeDeps.esbuildOptions` but this option is now deprecated. Vite now uses Rolldown to optimize the dependencies. Please use `optimizeDeps.rollupOptions` instead. (x3)
rolldown-vite v6.3.18 building SSR bundle for production...
✓ 5 modules transformed.
dist/ssr/wrangler.json   1.06 kB
dist/ssr/entry.js       22.39 kB
✓ built in 20ms
11:16:55 AM [vite] Unexpected Node.js imports for environment "ssr". Do you need to enable the "nodejs_compat" compatibility flag? Refer to https://developers.cloudflare.com/workers/runtime-apis/nodejs/ for more details.
 - "node:module" imported from "rolldown:runtime"

$ head dist/ssr/entry.js
import "node:module";
```
