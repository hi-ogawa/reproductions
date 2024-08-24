`wrangler dev` streaming issue

- https://github.com/hi-ogawa/vite-plugins/pull/629
- https://github.com/hi-ogawa/vite-plugins/pull/523

Deployed app

https://repro-wrangler-stream-response.hiro18181.workers.dev

```sh
# ok (<= 3.49.0), not ok (> 3.49.0)
pnpm dev

# ok (after adding dummy data to streaming payload)
pnpm release

# ok
deno run --allow-net index-deno.js
```
