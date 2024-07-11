- https://github.com/hi-ogawa/vite-plugins/pull/523

Hmm, I thought deployed one should be okay, but it doesn't seem so.

- https://repro-wrangler-stream-response.hiro18181.workers.dev

```sh
# ok (<= 3.49.0), not ok (> 3.49.0)
pnpm dev

# not ok
pnpm release

# ok
deno run --allow-net index-deno.js
```
