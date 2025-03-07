https://github.com/users/hi-ogawa/projects/4/views/1?pane=issue&itemId=100033805

- run `pnpm dev`
- open dev tools and find `file://.../app/_client.js` in `Sources` tab.
- generated code is in `.next/static/chunks/app_86fb0a17._.js` with index source map in `app_86fb0a17._.js.map`
- `console.log(new Error(...))` is formatted properly on ssr (node). this is done by patching `nodejs.util.inspect.custom`. (see `patch-error-inspect.ts`).
- `console.trace` in client component works on browser (chromium), but not on ssr (node). this is because Next.js doesn't fix stack from `Error.prepareStackTrace`.
- `--enable-source-maps` is automatically enabled https://github.com/vercel/next.js/pull/71820

---

Node

```js
$ pnpm dev
...
Trace: __client_dep_trace__
    at console.trace (/xxx/node_modules/.pnpm/next@15.2.2-canary.3_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/compiled/next-server/app-page.runtime.dev.js:23:12057)
    at console.trace (/xxx/node_modules/.pnpm/next@15.2.2-canary.3_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/compiled/next-server/app-page.runtime.dev.js:33:12719)
    at clientDep (file:///xxx/.next/server/chunks/ssr/%5Broot%20of%20the%20server%5D__e4b4e301._.js:20:13)
    at TestClient (file:///xxx/.next/server/chunks/ssr/%5Broot%20of%20the%20server%5D__e4b4e301._.js:37:138)
    at react-stack-bottom-frame (/xxx/node_modules/.pnpm/next@15.2.2-canary.3_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/compiled/next-server

Error: __client_dep_error__
    at clientDep (app/_client-dep.js:3:14)
    at TestClient (app/_client.js:6:10)
  1 | export default function clientDep() {
  2 |   console.trace('__client_dep_trace__')
> 3 |   console.log(new Error("__client_dep_error__"))
    |              ^
  4 | }
  5 |
```

Chromium

```js
_client-dep.js:2 __client_dep_trace__
clientDep	@	_client-dep.js:2
TestClient	@	_client.js:6
```
