https://github.com/vitest-dev/vitest/issues/5616

Vitest buildStart and resolveId

```sh
$ node repro.mjs
@resolveId(pre) { source: '/package.json' }
@transform(pre) {
  id: '/home/hiroshi/code/personal/reproductions/vitest-5616-plugin-build-start/package.json'
}
@transform(normal) {
  id: '/home/hiroshi/code/personal/reproductions/vitest-5616-plugin-build-start/package.json'
}
@buildStart(pre)
@buildStart(normal)
```

```sh
$ npm run test

@resolveId(pre) { source: 'vitest' }
@resolveId(pre) { source: 'vitest' }
@buildStart(pre)
@buildStart(normal)

 DEV  v1.5.1 /home/hiroshi/code/personal/reproductions/vitest-5616-plugin-build-start

@resolveId(pre) {
  source: '/@fs/home/hiroshi/code/personal/reproductions/vitest-5616-plugin-build-start/node_modules/vite/dist/client/env.mjs'
}
@resolveId(pre) {
  source: '/@fs/home/hiroshi/code/personal/reproductions/vitest-5616-plugin-build-start/node_modules/vite/dist/client/env.mjs'
}
@transform(pre) {
  id: '/home/hiroshi/code/personal/reproductions/vitest-5616-plugin-build-start/node_modules/vite/dist/client/env.mjs'
}
@transform(normal) {
  id: '/home/hiroshi/code/personal/reproductions/vitest-5616-plugin-build-start/node_modules/vite/dist/client/env.mjs'
}
@resolveId(pre) {
  source: '/home/hiroshi/code/personal/reproductions/vitest-5616-plugin-build-start/src/basic.test.ts'
}
@resolveId(pre) {
  source: '/home/hiroshi/code/personal/reproductions/vitest-5616-plugin-build-start/src/basic.test.ts'
}
@transform(pre) {
  id: '/home/hiroshi/code/personal/reproductions/vitest-5616-plugin-build-start/src/basic.test.ts'
}
@transform(normal) {
  id: '/home/hiroshi/code/personal/reproductions/vitest-5616-plugin-build-start/src/basic.test.ts'
}
@resolveId(pre) { source: 'vitest' }
@resolveId(pre) { source: 'vitest' }
```
