## context

- https://github.com/vitejs/vite/issues/19218#issuecomment-2599519200

## reproductions

```sh
$ node repro.js
[ssr.transformRequest] {
  code: 'const __vite_ssr_import_0__ = await __vite_ssr_import__("node:path", {"importedNames":["default"]});\n' +
    'const __vite_ssr_import_1__ = await __vite_ssr_import__("node:fs", {"importedNames":["default"]});\n' +
    '__vite_ssr_exports__.default = __vite_ssr_import_0__.default;\n' +
    '\n' +
    'Object.defineProperty(__vite_ssr_exports__, "fs", { enumerable: true, configurable: true, get(){ return __vite_ssr_import_1__.default }});\n',
  map: SourceMap {
    version: 3,
    file: undefined,
    sources: [ 'virtual:repro' ],
    sourcesContent: [
      'import path from "node:path";\n' +
        'import fs from "node:fs";\n' +
        'export default path;\n' +
        'export { fs };\n'
    ],
    names: [],
    mappings: 'AAAA;AACA;AACA,8BAAc,CAAC,6BAAI;;;'
  },
  ssr: true,
  deps: [ 'node:path', 'node:fs' ],
  dynamicDeps: []
}
[client.transformRequest] {
  code: 'import path from "/@id/__vite-browser-external:node:path";\n' +
    'import fs from "/@id/__vite-browser-external:node:fs";\n' +
    'export default path;\n' +
    'export { fs };\n',
  map: { mappings: '' },
  etag: 'W/"96-TH013B+vb0SGS/zpkBvSyZqsp8E"'
}
```
