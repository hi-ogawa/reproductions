Response stream error causes uncaught exception in Node.js and crashes server.

Try `curl http://localhost:3000/error`.

# Node

```sh
$ node server.mjs
➜ Listening on: http://localhost:3000/ (all interfaces)
node:internal/process/promises:394
    triggerUncaughtException(err, true /* fromPromise */);
    ^

Error: boom
    at Object.start (file:///home/hiroshi/code/personal/reproductions/srvx-response-stream-error/server.mjs:14:17)

Node.js v22.20.0
```

# Bun

```sh
$ bun server.mjs
➜ Listening on: http://localhost:3000/ (all interfaces)
 9 |       async start(controller) {
10 |         await new Promise((r) => setTimeout(r, 100));
11 |         controller.enqueue('hello\n');
12 |         await new Promise((r) => setTimeout(r, 100));
13 |         if (req.url.includes("error")) {
14 |           throw new Error('boom');
                     ^
error: boom
      at start (/home/hiroshi/code/personal/reproductions/srvx-response-stream-error/server.mjs:14:17)
... server is still alive ...     
```
