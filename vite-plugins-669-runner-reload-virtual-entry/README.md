## context

- https://github.com/hi-ogawa/vite-plugins/issues/669

## reproductions

```sh
$ node repro.js
[vite] connected.
>>> importing 'virtual:entry' { hello: 'hello-1737703807341' }
>>> editing 'src/hello.js'
4:30:21 PM [vite] (ssr) page reload src/hello.js
[vite] program reload
[vite] An error happened during full reload
[vite] cannot find entry point module 'virtual:entry'.
Error: [vite] cannot find entry point module 'virtual:entry'.
    at fetchModule (file:///xxx/node_modules/.pnpm/vite@6.0.11/node_modules/vite/dist/node/chunks/dep-M1IYMR16.js:51654:13)
    at async handleInvoke (file:///xxx/node_modules/.pnpm/vite@6.0.11/node_modules/vite/dist/node/chunks/dep-M1IYMR16.js:44342:22)
    at async EventEmitter.listenerForInvokeHandler (file:///xxx/node_modules/.pnpm/vite@6.0.11/node_modules/vite/dist/node/chunks/dep-M1IYMR16.js:44415:19)
>>> importing 'virtual:entry' { hello: 'hello-1737703821279' }
```
