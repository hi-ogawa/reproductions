- related https://github.com/vitejs/vite/pull/18361

## client dev

```sh
$ pnpm dev
...
1:17:19 PM [vite] Internal server error: Failed to resolve import "file:///home/hiroshi/code/personal/reproductions/vite-18361-resolve-file-url/src/dep.js" from "virtual:test-dep". Does the file exist?
  Plugin: vite:import-analysis
  File: virtual:test-dep:2:34
  1  |
  2  |              import testDep from "file:///home/hiroshi/code/personal/reproductions/vite-18361-resolve-file-url/src/dep.js";
     |                                   ^
  3  |              export default testDep
  4  |

# ok
$ RESOLVE_FILE_URL=1 pnpm dev
```

## client build

```sh
$ pnpm build
...
error during build:
[vite]: Rollup failed to resolve import "file:///home/hiroshi/code/personal/reproductions/vite-18361-resolve-file-url/src/dep.js" from "virtual:test-dep".
".

$ RESOLVE_FILE_URL=1 pnpm build
```

## ssr dev

```sh
$ node ssr.js dev
[ok] dep.js

$ RESOLVE_FILE_URL=1 node ssr.js dev
```

## ssr build

```sh
$ node ssr.js build
...
x Build failed in 29ms
node:internal/process/promises:394
    triggerUncaughtException(err, true /* fromPromise */);
    ^

[vite]: Rollup failed to resolve import "file:///home/hiroshi/code/personal/reproductions/vite-18361-resolve-file-url/src/dep.js" from "virtual:test-dep".

$ RESOLVE_FILE_URL=1 node ssr.js build
```
