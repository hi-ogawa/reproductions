https://github.com/remix-run/remix/issues/9438
https://github.com/hi-ogawa/js-utils/pull/252

Each tested with `pnpm test` which calls `/api/simple` and `/api/stream`.

```sh
$ SERVER_ENTRY=/src/hono pnpm dev
[pathname] /api/simple
[pathname] /api/stream
sending i = 0
sending i = 1
abort!
cancel!

# mine mostly copied from hono, remix, hydrogen, hattip to bahave similar to hono
$ SERVER_ENTRY=/src/mine pnpm dev
[pathname] /api/simple
[pathname] /api/stream
sending i = 0
sending i = 1
abort!
cancel!

# doesn't terminate stream
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

$ deno run --allow-net src/deno.ts
[pathname] /api/simple
abort!
[pathname] /api/stream
sending i = 0
sending i = 1
abort!
cancel!
```
