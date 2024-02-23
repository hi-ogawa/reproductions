https://github.com/vitest-dev/vitest/issues/5261

```sh
$ node main-ssr.js
!!!!!! transformRequest("/dir2/file.js", { ssr: true })
{
  code: 'const __vite_ssr_import_0__ = await __vite_ssr_import__("./dir1/file.js");\n' +
    'const __vite_ssr_import_1__ = await __vite_ssr_import__("/dir1/file.js");\n' +
    '\n' +
    'console.log({ "./dir1/file.js": __vite_ssr_import_0__ });\n' +
    '\n' +
    '\n' +
    'console.log({ "../dir1/file.js": __vite_ssr_import_1__ });\n',
  map: SourceMap {
    version: 3,
    file: undefined,
    sources: [ 'file.js' ],
    sourcesContent: [
      'import * as dot from "./dir1/file.js";\n' +
        'console.log({ "./dir1/file.js": dot });\n' +
        '\n' +
        'import * as dot2 from "../dir1/file.js"\n' +
        'console.log({ "../dir1/file.js": dot2 });\n'
    ],
    names: [],
    mappings: ';;AAAsC;AACtC,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,IAAI,CAAC,EAAE,CAAC,CAAC,CAAC,qBAAG,CAAC,CAAC,CAAC,CAAC;AACvC;AACqC;AACrC,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,IAAI,CAAC,EAAE,CAAC,CAAC,CAAC,qBAAI,CAAC,CAAC,CAAC,CAAC;'
  },
  deps: [ './dir1/file.js', '/dir1/file.js' ],
  dynamicDeps: []
}

!!!!!! ssrLoadModule("/dir2/file.js")
{
  './dir1/file.js': { hey: [Getter], [Symbol(Symbol.toStringTag)]: 'Module' }
}
{
  '../dir1/file.js': { hey: [Getter], [Symbol(Symbol.toStringTag)]: 'Module' }
}
```

```sh
$ node main.js
file:///home/hiroshi/code/personal/reproductions/vitest-5261-wrong-relative/node_modules/.pnpm/vite@5.1.4/node_modules/vite/dist/node/chunks/dep-jDlpJiMN.js:50529
        const err = (typeof e === 'string' ? new Error(e) : e);
                                             ^

Error: Failed to resolve import "./dir1/file.js" from "dir2/file.js". Does the file exist?
    at formatError (file:///home/hiroshi/code/personal/reproductions/vitest-5261-wrong-relative/node_modules/.pnpm/vite@5.1.4/node_modules/vite/dist/node/chunks/dep-jDlpJiMN.js:50529:46)
    at TransformContext.error (file:///home/hiroshi/code/personal/reproductions/vitest-5261-wrong-relative/node_modules/.pnpm/vite@5.1.4/node_modules/vite/dist/node/chunks/dep-jDlpJiMN.js:50523:19)
    at normalizeUrl (file:///home/hiroshi/code/personal/reproductions/vitest-5261-wrong-relative/node_modules/.pnpm/vite@5.1.4/node_modules/vite/dist/node/chunks/dep-jDlpJiMN.js:65594:33)
    at async file:///home/hiroshi/code/personal/reproductions/vitest-5261-wrong-relative/node_modules/.pnpm/vite@5.1.4/node_modules/vite/dist/node/chunks/dep-jDlpJiMN.js:65749:47
    at async Promise.all (index 0)
    at async TransformContext.transform (file:///home/hiroshi/code/personal/reproductions/vitest-5261-wrong-relative/node_modules/.pnpm/vite@5.1.4/node_modules/vite/dist/node/chunks/dep-jDlpJiMN.js:65670:13)
    at async Object.transform (file:///home/hiroshi/code/personal/reproductions/vitest-5261-wrong-relative/node_modules/.pnpm/vite@5.1.4/node_modules/vite/dist/node/chunks/dep-jDlpJiMN.js:50838:30)
    at async loadAndTransform (file:///home/hiroshi/code/personal/reproductions/vitest-5261-wrong-relative/node_modules/.pnpm/vite@5.1.4/node_modules/vite/dist/node/chunks/dep-jDlpJiMN.js:53611:29)
    at async file:///home/hiroshi/code/personal/reproductions/vitest-5261-wrong-relative/main.js:8:13 {
  plugin: 'vite:import-analysis',
  id: '/home/hiroshi/code/personal/reproductions/vitest-5261-wrong-relative/dir2/file.js',
  pluginCode: 'import * as dot from "./dir1/file.js";\n' +
    'console.log({ "./dir1/file.js": dot });\n' +
    '\n' +
    'import * as dot2 from "../dir1/file.js"\n' +
    'console.log({ "../dir1/file.js": dot2 });\n',
  loc: {
    file: '/home/hiroshi/code/personal/reproductions/vitest-5261-wrong-relative/dir2/file.js',
    line: 1,
    column: 23
  },
  frame: '1  |  import * as dot from "./dir1/file.js";\n' +
    '   |                        ^\n' +
    '2  |  console.log({ "./dir1/file.js": dot });\n' +
    '3  |  '
}
```
