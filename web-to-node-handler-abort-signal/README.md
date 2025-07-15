Comparing `Request.signal` and `ReadableStream.cancel` behaviors of various "fetch handler server" implementations.

Run a server in one terminal and then run `pnpm test` in another terminal, which requests two endpoints `/api/simple` and `/api/stream`.

```sh
$ node --version
v22.14.0
```

```sh
$ node src/hono.js
[pathname] /api/simple
[pathname] /api/stream
sending i = 0
sending i = 1
abort!
cancel!
```

```sh
$ node src/srvx.js
[pathname] /api/simple
abort!
[pathname] /api/stream
sending i = 0
sending i = 1
cancel!
abort!
```

```sh
$ node src/mjackson.js
[pathname] /api/simple
abort!
[pathname] /api/stream
sending i = 0
sending i = 1
sending i = 2
abort!
```

```sh
$ bun --version
1.2.18

$ bun run src/bun.js
[pathname] /api/simple
[pathname] /api/stream
sending i = 0
sending i = 1
abort!
cancel!
```

```sh
$ deno --version
deno 2.4.1 (stable, release, x86_64-unknown-linux-gnu)
v8 13.7.152.6-rusty
typescript 5.8.3

$ deno run --allow-net src/deno.js
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
- https://github.com/mjackson/remix-the-web/pull/74
