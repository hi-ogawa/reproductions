minimal repro for https://github.com/hi-ogawa/vite-plugins/issues/742

```sh
$ node repro.js
[vite] connected.
[TEST] file:///home/hiroshi/code/personal/reproductions/vite-ssr-node-module-entry/test-dep/index.js
[vite] program reload
[vite] An error happened during full reload
Failed to load url test-dep.js (resolved id: test-dep.js). Does the file exist?
Error: Failed to load url test-dep.js (resolved id: test-dep.js). Does the file exist?
    at loadAndTransform (file:///home/hiroshi/code/personal/reproductions/vite-ssr-node-module-entry/node_modules/.pnpm/vite@6.3.4/node_modules/vite/dist/node/chunks/dep-Bn81Esdm.js:35725:17)
```
