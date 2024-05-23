https://github.com/vitest-dev/vitest/issues/5757
https://github.com/privatenumber/tsx/issues/354

```sh
node ./src/ts-worker/demo.mjs
npm test

# not working still in 22.2.0
# https://github.com/nodejs/node/issues/47747#issuecomment-2110589610
node --import tsx/esm ./src/ts-worker/demo-node-22.2.0.ts
```
