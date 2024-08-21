- https://github.com/hi-ogawa/vite-plugins/pull/619

While Cloudflare supports binary assets via `import("xxx.bin")`, Vercel Edge doesn't seem to support the same thing.

It's not documented anywhere, but it looks like `vercel` CLI goes through a different way. Let's see if it's possible to do it from our custom `.vc-config.json`.

## links

- https://github.com/vercel/vercel/blob/1a56d079466e07d6d98a5a2a91f8a060132dbc75/packages/build-utils/src/edge-function.ts#L31-L39
- https://github.com/vercel/vercel/blob/1a56d079466e07d6d98a5a2a91f8a060132dbc75/packages/cli/src/util/build/write-build-result.ts#L381-L427
- https://github.com/vercel/vercel/pull/11060
- https://vercel.com/docs/build-output-api/v3/primitives#edge-functions

## example

- https://test-edge-fs.vercel.app/

```sh
vercel projects add test-edge-fs
vercel link -p test-edge-fs
vercel deploy --prebuilt --prod
```
