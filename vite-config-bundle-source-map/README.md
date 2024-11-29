
On Vite 5

```sh
$ NODE_OPTIONS=--enable-source-maps npx vite
Trace: test
    at f2 (/my/cwd/vite.config.ts:10:11)
    at f1 (/my/cwd/vite.config.ts:6:3)
    at <anonymous> (/my/cwd/vite.config.ts:13:1)
```

On Vite 6

```sh
$ NODE_OPTIONS=--enable-source-maps npx vite
Trace: test
    at f2 (/my/cwd/node_modules/.vite-temp/vite.config.ts:10:11)
    at f1 (/my/cwd/node_modules/.vite-temp/vite.config.ts:6:3)
    at <anonymous> (/my/cwd/node_modules/.vite-temp/vite.config.ts:13:1)
```
