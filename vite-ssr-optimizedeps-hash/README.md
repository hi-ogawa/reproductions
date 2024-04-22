ssr deps optimization hash

Q1. when does Vite strip off hash for inlined deps?
Q2. no hash for external?

```sh
$ DEBUG=vite:resolve,vite:resolve-details node repro.mjs
  vite:resolve-details [url] /repro-entry -> /home/hiroshi/code/personal/reproductions/vite-ssr-optimizedeps-hash/repro-entry.mjs +0ms
  vite:resolve 3.52ms /repro-entry -> /home/hiroshi/code/personal/reproductions/vite-ssr-optimizedeps-hash/repro-entry.mjs +0ms
  vite:resolve-details [package entry] semver -> /home/hiroshi/code/personal/reproductions/vite-ssr-optimizedeps-hash/node_modules/semver/index.js +39ms
  vite:resolve-details [package entry] @hiogawa/utils -> /home/hiroshi/code/personal/reproductions/vite-ssr-optimizedeps-hash/node_modules/@hiogawa/utils/dist/index.js +2ms
  vite:resolve 3.59ms cookie -> /home/hiroshi/code/personal/reproductions/vite-ssr-optimizedeps-hash/node_modules/.vite/deps_ssr/cookie.js?v=4cb996df +39ms
  vite:resolve 1.95ms @hiogawa/utils -> /home/hiroshi/code/personal/reproductions/vite-ssr-optimizedeps-hash/node_modules/@hiogawa/utils/dist/index.js?v=4cb996df +1ms
  vite:resolve-details [url] /node_modules/@hiogawa/utils/dist/index.js?v=4cb996df -> /home/hiroshi/code/personal/reproductions/vite-ssr-optimizedeps-hash/node_modules/@hiogawa/utils/dist/index.js?v=4cb996df +8ms
  vite:resolve-details [url] /node_modules/@hiogawa/utils/dist/index.js?v=4cb996df -> /home/hiroshi/code/personal/reproductions/vite-ssr-optimizedeps-hash/node_modules/@hiogawa/utils/dist/index.js?v=4cb996df +1ms
  vite:resolve 1.18ms /node_modules/@hiogawa/utils/dist/index.js?v=4cb996df -> /home/hiroshi/code/personal/reproductions/vite-ssr-optimizedeps-hash/node_modules/@hiogawa/utils/dist/index.js?v=4cb996df +8ms
  vite:resolve 1.28ms /node_modules/.vite/deps_ssr/cookie.js?v=4cb996df -> /home/hiroshi/code/personal/reproductions/vite-ssr-optimizedeps-hash/node_modules/.vite/deps_ssr/cookie.js?v=4cb996df +0ms
  vite:resolve-details [url] /node_modules/@hiogawa/utils/dist/index.js?v=4cb996df -> /home/hiroshi/code/personal/reproductions/vite-ssr-optimizedeps-hash/node_modules/@hiogawa/utils/dist/index.js?v=4cb996df +0ms
  vite:resolve-details [package entry] semver -> /home/hiroshi/code/personal/reproductions/vite-ssr-optimizedeps-hash/node_modules/semver/index.js +31ms
{ parse: [Function: parse], serialize: [Function: serialize] }
SemVer {
  options: {},
  loose: false,
  includePrerelease: false,
  raw: '1.2.3',
  major: 1,
  minor: 2,
  patch: 3,
  prerelease: [],
  build: [],
  version: '1.2.3'
}
[Function: sleep]
```
