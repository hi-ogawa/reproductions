## context

- https://github.com/hi-ogawa/vite-plugins/pull/931

## example

```js
$ pnpm build
[renderChunk] {
  code: 'import dep from "\x00virtual:test-dep";\n' +
    '\n' +
    '//#region src/entry.js\n' +
    'console.log(dep);\n' +
    'console.log(import("\\0virtual:test-dep"));\n' +
    '\n' +
    '//#endregion'
}
<DIR>/entry.js  chunk │ size: 0.13 kB

✔ Finished in 24.94 ms
$ pnpm build-rollup
./src/entry.js → dist...
[renderChunk] {
  code: "import dep from '\x00virtual:test-dep';\n" +
    '\n' +
    'console.log(dep);\n' +
    "console.log(import('\x00virtual:test-dep'));"
}
created dist in 14ms
```
