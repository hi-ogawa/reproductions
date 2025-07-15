Comparing `response.body` cancellation behaviors of various "Web -> Node" handler implementations.

Run a server in one terminal and then run `client-abort.js` in another terminal.

```js
$ node src/client-abort.js
```

- `@hono/node-server`

```sh
$ node src/server-hono.js
[start:in]
[cancel!]
[enqueue:error] TypeError [ERR_INVALID_STATE]: Invalid state: Controller is already closed
    at ReadableStreamDefaultController.enqueue (node:internal/webstreams/readablestream:1077:13)
    at Object.start (file:///home/hiroshi/code/personal/reproductions/web-to-node-handler-body-cancel/src/handler.js:7:20) {
  code: 'ERR_INVALID_STATE'
}
```

- `@mjackson/node-fetch-server`

```sh
$ node src/server-remix.js
[start:in]
[enqueue:ok]
[start:out]
```
