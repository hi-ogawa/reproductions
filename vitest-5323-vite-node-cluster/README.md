https://github.com/vitest-dev/vitest/issues/5323

```sh
npx ts-node index.ts
[isPrimary] {
  args: [],
  exec: '/home/hiroshi/code/personal/reproductions/vitest-5323-vite-node-cluster/index.ts',
  execArgv: [
    '/home/hiroshi/code/personal/reproductions/vitest-5323-vite-node-cluster/node_modules/ts-node/dist/bin.js'
  ],
  silent: false
}
[isWorker]
[isWorker.msg] 0
```

```sh
npx vite-node index.ts
[isPrimary] {
  args: [],
  exec: '/home/hiroshi/code/personal/reproductions/vitest-5323-vite-node-cluster/node_modules/.bin/vite-node',
  execArgv: [],
  silent: false
}
No files specified.
vite-node/1.3.1
...
```

```sh
npx tsx
isPrimary] {
  args: [],
  exec: '/home/hiroshi/code/personal/reproductions/vitest-5323-vite-node-cluster/index.ts',
  execArgv: [
    '--require',
    '/home/hiroshi/code/personal/reproductions/vitest-5323-vite-node-cluster/node_modules/tsx/dist/preflight.cjs',
    '--import',
    'file:///home/hiroshi/code/personal/reproductions/vitest-5323-vite-node-cluster/node_modules/tsx/dist/loader.mjs'
  ],
  silent: false
}
[isWorker]
```
