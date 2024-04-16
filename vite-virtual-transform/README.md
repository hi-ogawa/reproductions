```sh
npm i
node repro.mjs
[transformRequest] {
  code: 'export default 0 as any;',
  map: null,
  etag: 'W/"18-5qr8vfaJC+mN+A9Vy0tmBt0Xw8k"'
}
[transformWithEsbuild] {
  warnings: [],
  code: 'export default 0;\n',
  map: {
    version: 3,
    sources: [ 'virtual:test.tsx' ],
    sourcesContent: [ 'export default 0 as any;' ],
    mappings: 'AAAA,eAAe;',
    names: []
  },
  mangleCache: undefined,
  legalComments: undefined
}
[createFilter]
true
false
```
