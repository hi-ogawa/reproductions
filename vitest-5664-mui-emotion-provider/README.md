https://github.com/vitest-dev/vitest/issues/5664

```sh
pnpm test

# ok
NO_ALIAS=1 pnpm test node.test.tsx

# not ok
NO_ALIAS=1 pnpm test jsdom.test.tsx
stderr | node_modules/.pnpm/@emotion+react@11.11.4_@types+react@18.3.1_react@18.3.1/node_modules/@emotion/react/dist/emotion-react.esm.js:472:15
You are loading @emotion/react when it is already loaded. Running multiple instances may cause problems. This can happen if multiple versions are used, or if multiple builds of the same version are used.
```

```sh
$ NODE_DEBUG=esm node repro-node.mjs
ESM 78515: Storing file://(... root dir ...)/repro-node.mjs (implicit type) in ModuleLoadMap
ESM 78515: Translating StandardModule file://(... root dir ...)/repro-node.mjs
ESM 78515: Storing file://(... root dir ...)/node_modules/.pnpm/test-dep@file+fixtures+test-dep/node_modules/test-dep/dist/emotion-react.cjs.mjs (implicit type) in ModuleLoadMap
ESM 78515: Translating StandardModule file://(... root dir ...)/node_modules/.pnpm/test-dep@file+fixtures+test-dep/node_modules/test-dep/dist/emotion-react.cjs.mjs
dist/emotion-react.cjs.mjs
[Module: null prototype] {  }
```

```sh
$ DEBUG=vite:resolve,vite:resolve-details node repro-vite.mjs
######
###### server.ssrLoadModule
######
  vite:resolve-details [url] /repro-node.mjs -> (... root dir ...)/repro-node.mjs +0ms
  vite:resolve 2.54ms /repro-node.mjs -> (... root dir ...)/repro-node.mjs +0ms
  vite:resolve-details [package entry] test-dep -> (... root dir ...)/node_modules/.pnpm/test-dep@file+fixtures+test-dep/node_modules/test-dep/dist/emotion-react.esm.js +15ms
  vite:resolve-details [package entry] test-dep -> (... root dir ...)/node_modules/.pnpm/test-dep@file+fixtures+test-dep/node_modules/test-dep/dist/emotion-react.cjs.mjs +11ms
dist/emotion-react.cjs.mjs
[Module: null prototype] {  }
######
###### server.pluginContainer.resolveId
######
  vite:resolve 0.59ms test-dep -> (... root dir ...)/node_modules/.pnpm/test-dep@file+fixtures+test-dep/node_modules/test-dep/dist/emotion-react.cjs.mjs +42ms
{
  id: '(... root dir ...)/node_modules/.pnpm/test-dep@file+fixtures+test-dep/node_modules/test-dep/dist/emotion-react.cjs.mjs'
}
```

```sh
$ DEBUG=vite:resolve,vite:resolve-details node repro-vite.mjs reverse
######
###### server.pluginContainer.resolveId
######
  vite:resolve-details [package entry] test-dep -> (... root dir ...)/node_modules/.pnpm/test-dep@file+fixtures+test-dep/node_modules/test-dep/dist/emotion-react.esm.js +0ms
  vite:resolve 3.77ms test-dep -> (... root dir ...)/node_modules/.pnpm/test-dep@file+fixtures+test-dep/node_modules/test-dep/dist/emotion-react.esm.js +0ms
{
  id: '(... root dir ...)/node_modules/.pnpm/test-dep@file+fixtures+test-dep/node_modules/test-dep/dist/emotion-react.esm.js'
}
######
###### server.ssrLoadModule
######
  vite:resolve-details [url] /repro-node.mjs -> (... root dir ...)/repro-node.mjs +3ms
  vite:resolve 0.37ms /repro-node.mjs -> (... root dir ...)/repro-node.mjs +4ms
  vite:resolve-details [package entry] test-dep -> (... root dir ...)/node_modules/.pnpm/test-dep@file+fixtures+test-dep/node_modules/test-dep/dist/emotion-react.esm.js +11ms
dist/emotion-react.esm.js
[Module: null prototype] { default: {} }
```
