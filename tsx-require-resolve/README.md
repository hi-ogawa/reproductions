## context

- https://github.com/vitejs/vite/issues/19052

## ~reproduction~ non reproduction

```js
$ node test.js
[require.resolve("test-dep1")] /xxx/node_modules/.pnpm/@vitejs+test-dep1@file+test-dep1/node_modules/@vitejs/test-dep1/index.cjs
[require.resolve("test-dep2")] /xxx/node_modules/.pnpm/@vitejs+test-dep2@file+test-dep2/node_modules/@vitejs/test-dep2/index.cjs
[test-mod.cjs] [Module: null prototype] {
  default: { hello: 'world' },
  hello: 'world'
}

$ npx tsx test.js
[require.resolve("test-dep1")] /xxx/node_modules/.pnpm/@vitejs+test-dep1@file+test-dep1/node_modules/@vitejs/test-dep1/index.cjs
[require.resolve("test-dep2")] /xxx/node_modules/.pnpm/@vitejs+test-dep2@file+test-dep2/node_modules/@vitejs/test-dep2/index.cjs
[test-mod.cjs] [Module: null prototype] {
  default: { hello: 'world' },
  hello: 'world'
}
```
