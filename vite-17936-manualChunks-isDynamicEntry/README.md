- https://github.com/vitejs/vite/issues/17936

## main entry

```js
// main.js
console.log(import('firebase/firestore'))
```

Here is a log of `console.log(chunk.name, chunk.moduleIds)` during `renderChunk`.

## Rollup 4.8

`firebase/firestore/dist/esm/index.esm.js` is included in `main` chunk.

```js
$ pnpm build-rollup

vendor_firebase_app [
  '/xxx/node_modules/.pnpm/@firebase+util@1.9.7/node_modules/@firebase/util/dist/index.esm2017.js',
  '/xxx/node_modules/.pnpm/@firebase+component@0.6.8/node_modules/@firebase/component/dist/esm/index.esm2017.js',
  '/xxx/node_modules/.pnpm/@firebase+logger@0.4.2/node_modules/@firebase/logger/dist/esm/index.esm2017.js',
  '/xxx/node_modules/.pnpm/idb@7.1.1/node_modules/idb/build/wrap-idb-value.js',
  '/xxx/node_modules/.pnpm/idb@7.1.1/node_modules/idb/build/index.js',
  '/xxx/node_modules/.pnpm/@firebase+app@0.10.9/node_modules/@firebase/app/dist/esm/index.esm2017.js'
]
vendor_firebase_firestore [
  '/xxx/node_modules/.pnpm/@firebase+webchannel-wrapper@1.0.1/node_modules/@firebase/webchannel-wrapper/dist/bloom-blob/esm/bloom_blob_es2018.js',
  '/xxx/node_modules/.pnpm/@firebase+webchannel-wrapper@1.0.1/node_modules/@firebase/webchannel-wrapper/dist/webchannel-blob/esm/webchannel_blob_es2018.js',
  '/xxx/node_modules/.pnpm/@firebase+firestore@4.7.0_@firebase+app@0.10.9/node_modules/@firebase/firestore/dist/index.esm2017.js'
]
main [
  '/xxx/src/main.js',
  '/xxx/node_modules/.pnpm/firebase@10.13.0/node_modules/firebase/firestore/dist/esm/index.esm.js'
]
```

## Rollup 4.7

`firebase/firestore/dist/esm/index.esm.js` is split in a dedicated chunk `index.esm`.

```js
$ pnpm build-rollup

vendor_firebase_app [
  '/xxx/node_modules/.pnpm/@firebase+util@1.9.7/node_modules/@firebase/util/dist/index.esm2017.js',
  '/xxx/node_modules/.pnpm/@firebase+component@0.6.8/node_modules/@firebase/component/dist/esm/index.esm2017.js',
  '/xxx/node_modules/.pnpm/@firebase+logger@0.4.2/node_modules/@firebase/logger/dist/esm/index.esm2017.js',
  '/xxx/node_modules/.pnpm/idb@7.1.1/node_modules/idb/build/wrap-idb-value.js',
  '/xxx/node_modules/.pnpm/idb@7.1.1/node_modules/idb/build/index.js',
  '/xxx/node_modules/.pnpm/@firebase+app@0.10.9/node_modules/@firebase/app/dist/esm/index.esm2017.js'
]
vendor_firebase_firestore [
  '/xxx/node_modules/.pnpm/@firebase+webchannel-wrapper@1.0.1/node_modules/@firebase/webchannel-wrapper/dist/bloom-blob/esm/bloom_blob_es2018.js',
  '/xxx/node_modules/.pnpm/@firebase+webchannel-wrapper@1.0.1/node_modules/@firebase/webchannel-wrapper/dist/webchannel-blob/esm/webchannel_blob_es2018.js',
  '/xxx/node_modules/.pnpm/@firebase+firestore@4.7.0_@firebase+app@0.10.9/node_modules/@firebase/firestore/dist/index.esm2017.js'
]
main [
  '/xxx/src/main.js'
]
index.esm [
  '/xxx/node_modules/.pnpm/firebase@10.13.0/node_modules/firebase/firestore/dist/esm/index.esm.js'
]
```
