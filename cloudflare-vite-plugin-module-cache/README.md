## context

- https://github.com/vitejs/vite/issues/20283

## example

```sh
pnpm dev

# call two requests in parallel
curl http://localhost:5173/ & curl http://localhost:5173/
```

```sh
[main] slow transform...
[main] slow transform... done!
[worker] run entry.js

[worker] run fetch (instantiate Response)

[worker] run fetch (instantiate Response)
```

With https://github.com/cloudflare/workers-sdk/pull/9693

```sh
[main] slow transform...
[main] slow transform... done!
[worker] run entry.js
[worker] run fetch (instantiate Response)

[worker] run entry.js
[worker] run fetch (instantiate Response)
```
