## context

- https://github.com/hi-ogawa/vite-plugins/pull/926

## example

```sh
$ pnpm dev
...
error when starting dev server:
Error: The following environment configurations are incompatible with the Cloudflare Vite plugin:
        - "ssr" environment: `optimizeDeps.exclude`: ["@vitejs/test-dep"]
To resolve this issue, avoid setting `optimizeDeps.exclude` and `resolve.external` in your Cloudflare Worker environments.

# patch @cloudflare/vite-plugin to silence validation
$ TEST_WORKAROUND=1 pnpm dev
$ curl http://localhost:5173/
{"testDep":"ok"}
```
