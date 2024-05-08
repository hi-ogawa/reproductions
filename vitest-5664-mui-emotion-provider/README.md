https://github.com/vitest-dev/vitest/issues/5664

```sh
npm run test

# ok
NO_ALIAS=1 npm run test node.test.tsx

# not ok
NO_ALIAS=1 npm run test jsdom.test.tsx
stderr | node_modules/@emotion/react/dist/emotion-react.esm.js:472:15
You are loading @emotion/react when it is already loaded. Running multiple instances may cause problems. This can happen if multiple versions are used, or if multiple builds of the same version are used.
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
$ DEBUG=vite:resolve,vite:resolve-details node repro-vite.mjs
######
###### server.ssrLoadModule
######
  vite:resolve-details [url] /repro-node.mjs -> /home/hiroshi/code/personal/reproductions/vitest-5664-mui-emotion-provider/repro-node.mjs +0ms
  vite:resolve 2.63ms /repro-node.mjs -> /home/hiroshi/code/personal/reproductions/vitest-5664-mui-emotion-provider/repro-node.mjs +0ms
  vite:resolve-details [node/deep-import] ./node/styles/index.js -> /home/hiroshi/code/personal/reproductions/vitest-5664-mui-emotion-provider/node_modules/@mui/material/node/styles/index.js +10ms
  vite:resolve-details [package entry] @emotion/react -> /home/hiroshi/code/personal/reproductions/vitest-5664-mui-emotion-provider/node_modules/@emotion/react/dist/emotion-react.esm.js +2ms
  vite:resolve-details [node/deep-import] ./node/styles/index.js -> /home/hiroshi/code/personal/reproductions/vitest-5664-mui-emotion-provider/node_modules/@mui/material/node/styles/index.js +11ms
  vite:resolve-details [package entry] @emotion/react -> /home/hiroshi/code/personal/reproductions/vitest-5664-mui-emotion-provider/node_modules/@emotion/react/dist/emotion-react.cjs.mjs +207ms
[Function: ThemeProvider] {
  propTypes: {
    children: [Function: bound checkType] {
      isRequired: [Function: bound checkType]
    },
    theme: [Function: bound checkType]
  }
}
[Function: ThemeProvider]
######
###### server.pluginContainer.resolveId
######
  vite:resolve 0.56ms @emotion/react -> /home/hiroshi/code/personal/reproductions/vitest-5664-mui-emotion-provider/node_modules/@emotion/react/dist/emotion-react.cjs.mjs +248ms
{
  id: '/home/hiroshi/code/personal/reproductions/vitest-5664-mui-emotion-provider/node_modules/@emotion/react/dist/emotion-react.cjs.mjs'
}
```

```sh
$ DEBUG=vite:resolve,vite:resolve-details node repro-vite.mjs reverse
######
###### server.pluginContainer.resolveId
######
  vite:resolve-details [package entry] @emotion/react -> /home/hiroshi/code/personal/reproductions/vitest-5664-mui-emotion-provider/node_modules/@emotion/react/dist/emotion-react.esm.js +0ms
  vite:resolve 3.74ms @emotion/react -> /home/hiroshi/code/personal/reproductions/vitest-5664-mui-emotion-provider/node_modules/@emotion/react/dist/emotion-react.esm.js +0ms
{
  id: '/home/hiroshi/code/personal/reproductions/vitest-5664-mui-emotion-provider/node_modules/@emotion/react/dist/emotion-react.esm.js'
}
######
###### server.ssrLoadModule
######
  vite:resolve-details [url] /repro-node.mjs -> /home/hiroshi/code/personal/reproductions/vitest-5664-mui-emotion-provider/repro-node.mjs +5ms
  vite:resolve 0.93ms /repro-node.mjs -> /home/hiroshi/code/personal/reproductions/vitest-5664-mui-emotion-provider/repro-node.mjs +4ms
  vite:resolve-details [node/deep-import] ./node/styles/index.js -> /home/hiroshi/code/personal/reproductions/vitest-5664-mui-emotion-provider/node_modules/@mui/material/node/styles/index.js +11ms
  vite:resolve-details [package entry] @emotion/react -> /home/hiroshi/code/personal/reproductions/vitest-5664-mui-emotion-provider/node_modules/@emotion/react/dist/emotion-react.esm.js +1ms
  vite:resolve-details [node/deep-import] ./node/styles/index.js -> /home/hiroshi/code/personal/reproductions/vitest-5664-mui-emotion-provider/node_modules/@mui/material/node/styles/index.js +9ms
(node:76228) Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.
(Use `node --trace-warnings ...` to show where the warning was created)
4:44:52 PM [vite] Error when evaluating SSR module /repro-node.mjs: failed to import "@emotion/react"
|- /home/hiroshi/code/personal/reproductions/vitest-5664-mui-emotion-provider/node_modules/@emotion/react/dist/emotion-react.esm.js:1
import { h as hasOwn, E as Emotion, c as createEmotionProps, w as withEmotionCache, T as ThemeContext, i as isBrowser$1 } from './emotion-element-c16c303e.esm.js';
^^^^^^

SyntaxError: Cannot use import statement outside a module
    at internalCompileFunction (node:internal/vm:128:18)
    at wrapSafe (node:internal/modules/cjs/loader:1280:20)
    at Module._compile (node:internal/modules/cjs/loader:1332:27)
    at Module._extensions..js (node:internal/modules/cjs/loader:1427:10)
    at Module.load (node:internal/modules/cjs/loader:1206:32)
    at Module._load (node:internal/modules/cjs/loader:1022:12)
    at cjsLoader (node:internal/modules/esm/translators:366:17)
    at ModuleWrap.<anonymous> (node:internal/modules/esm/translators:315:7)
    at ModuleJob.run (node:internal/modules/esm/module_job:222:25)
    at async ModuleLoader.import (node:internal/modules/esm/loader:323:24)
```
