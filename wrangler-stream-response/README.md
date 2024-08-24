Streaming compressed response inconsistency between `wrangler dev` and deployed workers.

- http://localhost:8787

[Screencast from 2024-08-24 19-16-18.webm](https://github.com/user-attachments/assets/4db9367d-f4c2-4e76-8ddf-ccc444b13ca3)

- https://repro-wrangler-stream-response.hiro18181.workers.dev

[Screencast from 2024-08-24 19-18-00.webm](https://github.com/user-attachments/assets/9ebd006d-8181-48dd-8954-74c3e5e0ff4e)

```sh
# ok (<= 3.49.0), not ok (> 3.49.0)
pnpm dev

# ok (after adding more dummy data to payload)
pnpm release

# ok
deno run --allow-net index-deno.js
```

## links

- https://github.com/hi-ogawa/vite-plugins/pull/629
- https://github.com/hi-ogawa/vite-plugins/pull/523
