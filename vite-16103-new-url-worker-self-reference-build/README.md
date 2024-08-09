- https://github.com/vitejs/vite/pull/16103
- https://github.com/vitejs/vite/pull/17837

```sh
# works
$ pnpm dev

# error
$ pnpm build
vite v5.4.0 building for production...
✓ 3 modules transformed.
x Build failed in 30ms
error during build:
[commonjs--resolver] Circular worker imports detected. Vite does not support it. Import chain: node_modules/.pnpm/test-dep-new-url-worker@file+dep-new-url-worker/node_modules/test-dep-new-url-worker/worker-recursive.js -> node_modules/.pnpm/test-dep-new-url-worker@file+dep-new-url-worker/node_modules/test-dep-new-url-worker/worker-recursive.js
file: /home/hiroshi/code/personal/reproductions/vite-16103-new-url-worker-self-reference-build/node_modules/.pnpm/test-dep-new-url-worker@file+dep-new-url-worker/node_modules/test-dep-new-url-worker/index.js
    at bundleWorkerEntry (file:///home/hiroshi/code/personal/reproductions/vite-16103-new-url-worker-self-reference-build/node_modules/.pnpm/vite@5.4.0/node_modules/vite/dist/node/chunks/dep-NjL7WTE1.js:47492:11)
    at workerFileToUrl (file:///home/hiroshi/code/personal/reproductions/vite-16103-new-url-worker-self-reference-build/node_modules/.pnpm/vite@5.4.0/node_modules/vite/dist/node/chunks/dep-NjL7WTE1.js:47573:31)
    at Object.transform (file:///home/hiroshi/code/personal/reproductions/vite-16103-new-url-worker-self-reference-build/node_modules/.pnpm/vite@5.4.0/node_modules/vite/dist/node/chunks/dep-NjL7WTE1.js:48008:32)
    at file:///home/hiroshi/code/personal/reproductions/vite-16103-new-url-worker-self-reference-build/node_modules/.pnpm/rollup@4.20.0/node_modules/rollup/dist/es/shared/node-entry.js:19892:40
 ELIFECYCLE  Command failed with exit code 1.
```
