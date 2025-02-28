Stackblitz fails both probably because `rollup` is automatically replaced with `@rollup/wasm-node`

```sh
$ ./node_modules/rollup/dist/bin/rollup -c
./src/main.jsx → dist...
created dist in 14ms

$ ./node_modules/@rollup/wasm-node/dist/bin/rollup -c
./src/main.jsx → dist...
[!] RollupError: src/main.jsx (2:8): Expression expected (Note that you need plugins to import files that are not JavaScript)
src/main.jsx (2:8)
1: export const Test = () => {
2:   return <div>Hello World!</div>;
            ^
3: };
```
