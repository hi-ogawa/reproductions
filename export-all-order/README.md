https://github.com/vitejs/vite/blob/83a7a1fc8c2744a5a5ce51f10569078bf5cc0087/packages/vite/src/node/ssr/__tests__/ssrTransform.spec.ts#L1167

```js
// ESM
$ node src/entry.js
[a.js]
[b.js]
[c.js]
[index.js] { b: 'b' }
[entry.js] [Module: null prototype] { a: 'a', c: 'c' }

// [ok] webpack
$ node
$ node dist-webpack/entry.js
[a.js]
[b.js]
[c.js]
[index.js] { b: 'b' }
[entry.js] Object [Module] { a: [Getter], c: [Getter] }

// [ok] rolldown
$ pnpm build
$ node dist/entry.js
[a.js]
[b.js]
[c.js]
[index.js] { b: 'b' }
[entry.js] { a: [Getter], c: [Getter] }

// [not ok] Vite SSR
$ node vite-ssr.js
[b.js]
[index.js] { b: 'b' }
[a.js]
[c.js]
[entry.js] [Object: null prototype] [Module] { a: [Getter], c: [Getter] }
```
