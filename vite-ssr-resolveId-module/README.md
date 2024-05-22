similar to https://github.com/vitejs/vite/issues/16631 but with `"main"` and `"module"` top-level fields.

```sh
$ NODE_DEBUG=esm node repro-entry.mjs
ESM 30362: Storing file://(my-dir)/repro-entry.mjs (implicit type) in ModuleLoadMap
ESM 30362: Translating StandardModule file://(my-dir)/repro-entry.mjs
ESM 30362: Storing file://(my-dir)/node_modules/.pnpm/file+fixtures+test-dep/node_modules/test-dep/dist/main.js (implicit type) in ModuleLoadMap
ESM 30362: Translating CJSModule file://(my-dir)/node_modules/.pnpm/file+fixtures+test-dep/node_modules/test-dep/dist/main.js
ESM 30362: Loading CJSModule file://(my-dir)/node_modules/.pnpm/file+fixtures+test-dep/node_modules/test-dep/dist/main.js
[loading main.js]

$ node repro-vite.mjs ssrLoadModule
[loading main.js]

$ node repro-vite.mjs ssrLoadModule-direct
[loading module.js]

$ node repro-vite.mjs resolveId
{
  id: '(my-dir)/node_modules/.pnpm/file+fixtures+test-dep/node_modules/test-dep/dist/module.js'
}
```
