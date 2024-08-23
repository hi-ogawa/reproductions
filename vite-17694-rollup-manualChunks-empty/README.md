- https://github.com/vitejs/vite/issues/17694

```js
// src/main.js
console.log("hello");

if (0) {
	console.log(import("lodash"));
}
```

```sh
$ npx vite build
vite v5.4.2 building for production...
✓ 7 modules transformed.
Generated an empty chunk: "lodash".
dist/vite/index.html             0.38 kB │ gzip: 0.26 kB
dist/vite/js/lodash-l0sNRNKZ.js  0.00 kB │ gzip: 0.02 kB
dist/vite/js/index-Bg9QWlBW.js   1.28 kB │ gzip: 0.53 kB
✓ built in 201ms

$ npx rollup -c rollup.config.js
./src/main.js → dist/rollup...
(!) Generated an empty chunk
"lodash"
created dist/rollup in 173ms
```
