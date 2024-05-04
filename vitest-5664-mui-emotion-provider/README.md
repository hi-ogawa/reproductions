https://github.com/vitest-dev/vitest/issues/5664

```sh
DEBUG=vite:resolve npm run test
```

```sh
NODE_DEBUG=esm node repro-node.mjs
ESM 33115: Storing file:///home/hiroshi/code/personal/reproductions/vitest-5664-mui-emotion-provider/repro-node.mjs (implicit type) in ModuleLoadMap
ESM 33115: Translating StandardModule file:///home/hiroshi/code/personal/reproductions/vitest-5664-mui-emotion-provider/repro-node.mjs
ESM 33115: Storing file:///home/hiroshi/code/personal/reproductions/vitest-5664-mui-emotion-provider/node_modules/@mui/material/node/styles/index.js (implicit type) in ModuleLoadMap
ESM 33115: Storing file:///home/hiroshi/code/personal/reproductions/vitest-5664-mui-emotion-provider/node_modules/@emotion/react/dist/emotion-react.cjs.mjs (implicit type) in ModuleLoadMap
ESM 33115: Translating StandardModule file:///home/hiroshi/code/personal/reproductions/vitest-5664-mui-emotion-provider/node_modules/@emotion/react/dist/emotion-react.cjs.mjs
ESM 33115: Storing file:///home/hiroshi/code/personal/reproductions/vitest-5664-mui-emotion-provider/node_modules/@emotion/react/dist/emotion-react.cjs.js (implicit type) in ModuleLoadMap
ESM 33115: Translating CJSModule file:///home/hiroshi/code/personal/reproductions/vitest-5664-mui-emotion-provider/node_modules/@mui/material/node/styles/index.js
ESM 33115: Translating CJSModule file:///home/hiroshi/code/personal/reproductions/vitest-5664-mui-emotion-provider/node_modules/@emotion/react/dist/emotion-react.cjs.js
ESM 33115: Loading CJSModule file:///home/hiroshi/code/personal/reproductions/vitest-5664-mui-emotion-provider/node_modules/@mui/material/node/styles/index.js
ESM 33115: Loading CJSModule file:///home/hiroshi/code/personal/reproductions/vitest-5664-mui-emotion-provider/node_modules/@emotion/react/dist/emotion-react.cjs.js
```

```sh
DEBUG=vite:resolve,vite:resolve-details node repro-vite.mjs
  vite:resolve-details [url] /repro-node.mjs -> /home/hiroshi/code/personal/reproductions/vitest-5664-mui-emotion-provider/repro-node.mjs +0ms
  vite:resolve 3.49ms /repro-node.mjs -> /home/hiroshi/code/personal/reproductions/vitest-5664-mui-emotion-provider/repro-node.mjs +0ms
  vite:resolve-details [node/deep-import] ./node/styles/index.js -> /home/hiroshi/code/personal/reproductions/vitest-5664-mui-emotion-provider/node_modules/@mui/material/node/styles/index.js +12ms
  vite:resolve-details [package entry] @emotion/react -> /home/hiroshi/code/personal/reproductions/vitest-5664-mui-emotion-provider/node_modules/@emotion/react/dist/emotion-react.esm.js +1ms
  vite:resolve-details [node/deep-import] ./node/styles/index.js -> /home/hiroshi/code/personal/reproductions/vitest-5664-mui-emotion-provider/node_modules/@mui/material/node/styles/index.js +6ms
  vite:resolve-details [package entry] @emotion/react -> /home/hiroshi/code/personal/reproductions/vitest-5664-mui-emotion-provider/node_modules/@emotion/react/dist/emotion-react.cjs.mjs +183ms
[Function: ThemeProvider] {
  propTypes: {
    children: [Function: bound checkType] {
      isRequired: [Function: bound checkType]
    },
    theme: [Function: bound checkType]
  }
}
[Function: ThemeProvider]
```
