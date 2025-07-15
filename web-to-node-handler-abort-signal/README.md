Comparing `request.signal` abort behaviors of various "Web -> Node" handler implementations.

Run a server in one terminal and then run `pnpm test` in another terminal, which requests two endpoints `/api/simple` and `/api/stream`.

```sh
$ SERVER_ENTRY=/src/hono pnpm dev
[pathname] /api/simple
[pathname] /api/stream
sending i = 0
sending i = 1
abort!
cancel!
```

```sh
$ SERVER_ENTRY=/src/hattip pnpm dev
$ SERVER_ENTRY=/src/h3 pnpm dev
[pathname] /api/simple
[pathname] /api/stream
sending i = 0
sending i = 1
sending i = 2
...
```

```sh
$ bun run src/bun.ts
[pathname] /api/simple
[pathname] /api/stream
sending i = 0
sending i = 1
abort!
```

```sh
$ deno run --allow-net src/deno.ts
[pathname] /api/simple
abort!
[pathname] /api/stream
sending i = 0
sending i = 1
abort!
cancel!
```

## context

- https://github.com/remix-run/remix/issues/9438
- https://github.com/hi-ogawa/js-utils/pull/252
