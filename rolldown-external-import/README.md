https://github.com/users/hi-ogawa/projects/4/views/1?pane=issue&itemId=90149585

## esm

```sh
$ node src/entry.js
[importing dep.js]
[importing test-dep-external]
```

## ✅ same (webpack, rspack, vite ssr)

```sh
# webpack
$ pnpm build-webpack
$ node dist-webpack/entry.js
[importing dep.js]
[importing test-dep-external]

# rspack
$ pnpm build-rspack
$ node dist-rspack/entry.js
[importing dep.js]
[importing test-dep-external]

# vite ssr
$ node ./vite-ssr.js
[importing dep.js]
[importing test-dep-external]
```

## 🚫 different (rolldown, rollup, esbuild)

```sh
# rolldown
$ pnpm build
$ node dist/entry.js
[importing test-dep-external]
[importing dep.js]

# rollup
$ pnpm build-rollup
$ node dist-rollup/entry.js
[importing test-dep-external]
[importing dep.js]

# esbuild
$ pnpm build-esbuild
$ node dist-esbuild/entry.js
[importing test-dep-external]
[importing dep.js]
```
