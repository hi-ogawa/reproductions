- https://github.com/vitejs/vite/issues/17483

```sh
$ npm run build
...
vite v5.4.7 building for production...
✓ 2 modules transformed.
x Build failed in 37ms
error during build:
[vite:worker-import-meta-url] Invalid value "iife" for option "output.format" - UMD and IIFE output formats are not supported for code-splitting builds.
file: /home/hiroshi/code/personal/reproductions/vite-17483-worker-format-error/src/main.js
    at getRollupError (file:///home/hiroshi/code/personal/reproductions/vite-17483-worker-format-error/node_modules/rollup/dist/es/shared/parseAst.js:392:41)
...
```
