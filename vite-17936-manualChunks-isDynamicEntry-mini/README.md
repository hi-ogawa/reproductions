- https://github.com/vitejs/vite/issues/17936#issuecomment-2308143634

Simpler reproduction of [`../vite-17936-manualChunks-isDynamicEntry`](../vite-17936-manualChunks-isDynamicEntry)

## Rollup 4.21.0

```js
$ npm run build
...
{ chunkName: 'manual-dep2', moduleIds: [ 'dep2.js' ] }
{ chunkName: 'main', moduleIds: [ 'main.js', 'dep1.js' ] }
```

## set `experimentalMinChunkSize: 0` or back to Rollup 4.7.0

```js
$ npm run build
...
{ chunkName: 'manual-dep2', moduleIds: [ 'dep2.js' ] }
{ chunkName: 'main', moduleIds: [ 'main.js' ] }
{ chunkName: 'dep1', moduleIds: [ 'dep1.js' ] }
```
