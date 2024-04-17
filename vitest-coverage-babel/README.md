https://github.com/vitest-dev/vitest/issues/5537

```sh
$ npm run test -- --coverage

> @vitest/example-test@ test /home/hiroshi/code/personal/reproductions/vitest-coverage-babel
> vitest "--coverage"


 DEV  v1.5.0 /home/hiroshi/code/personal/reproductions/vitest-coverage-babel
      Coverage enabled with istanbul

 ❯ src/repro.test.ts (0)

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Suites 1 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/repro.test.ts [ src/repro.test.ts ]
SyntaxError: /home/hiroshi/code/personal/reproductions/vitest-coverage-babel/src/repro-ts.ts: Support for the experimental syntax 'importAttributes' isn't currently enabled (1:43):

> 1 | import reproJson from "./repro-json.json" assert { type: "json" };
    |                                           ^
  2 | export const reproTsReExport = reproJson;
  3 |

Add @babel/plugin-syntax-import-attributes (https://github.com/babel/babel/tree/main/packages/babel-plugin-syntax-import-attributes) to the 'plugins' section of your Babel config to enable parsing.

If you already added the plugin for this syntax to your config, it's possible that your config isn't being loaded.
You can re-run Babel with the BABEL_SHOW_CONFIG_FOR environment variable to show the loaded configuration:
        npx cross-env BABEL_SHOW_CONFIG_FOR=/home/hiroshi/code/personal/reproductions/vitest-coverage-babel/src/repro-ts.ts <your build command>
See https://babeljs.io/docs/configuration#print-effective-configs for more info.

 ❯ constructor node_modules/.pnpm/@babel+parser@7.24.4/node_modules/@babel/parser/lib/index.js:353:19
 ❯ Parser.raise node_modules/.pnpm/@babel+parser@7.24.4/node_modules/@babel/parser/lib/index.js:3277:19
 ❯ Parser.expectOnePlugin node_modules/.pnpm/@babel+parser@7.24.4/node_modules/@babel/parser/lib/index.js:3311:18
 ❯ Parser.maybeParseImportAttributes node_modules/.pnpm/@babel+parser@7.24.4/node_modules/@babel/parser/lib/index.js:13804:14
 ❯ Parser.parseImportSourceAndAttributes node_modules/.pnpm/@babel+parser@7.24.4/node_modules/@babel/parser/lib/index.js:13702:10
 ❯ Parser.parseImportSpecifiersAndAfter node_modules/.pnpm/@babel+parser@7.24.4/node_modules/@babel/parser/lib/index.js:13696:17
 ❯ Parser.parseImport node_modules/.pnpm/@babel+parser@7.24.4/node_modules/@babel/parser/lib/index.js:13687:17
 ❯ Parser.parseStatementContent node_modules/.pnpm/@babel+parser@7.24.4/node_modules/@babel/parser/lib/index.js:12347:27
 ❯ Parser.parseStatementLike node_modules/.pnpm/@babel+parser@7.24.4/node_modules/@babel/parser/lib/index.js:12239:17
 ❯ Parser.parseModuleItem node_modules/.pnpm/@babel+parser@7.24.4/node_modules/@babel/parser/lib/index.js:12216:17
 ❯ Parser.parseBlockOrModuleBlockBody node_modules/.pnpm/@babel+parser@7.24.4/node_modules/@babel/parser/lib/index.js:12796:36
 ❯ Parser.parseBlockBody node_modules/.pnpm/@babel+parser@7.24.4/node_modules/@babel/parser/lib/index.js:12789:10
 ❯ Parser.parseProgram node_modules/.pnpm/@babel+parser@7.24.4/node_modules/@babel/parser/lib/index.js:12116:10
 ❯ Parser.parseTopLevel node_modules/.pnpm/@babel+parser@7.24.4/node_modules/@babel/parser/lib/index.js:12106:25
 ❯ Parser.parse node_modules/.pnpm/@babel+parser@7.24.4/node_modules/@babel/parser/lib/index.js:13905:10
 ❯ parse node_modules/.pnpm/@babel+parser@7.24.4/node_modules/@babel/parser/lib/index.js:13947:38
 ❯ parser node_modules/.pnpm/@babel+core@7.24.4/node_modules/@babel/core/lib/parser/index.js:41:34
 ❯ normalizeFile node_modules/.pnpm/@babel+core@7.24.4/node_modules/@babel/core/lib/transformation/normalize-file.js:64:37
 ❯ run node_modules/.pnpm/@babel+core@7.24.4/node_modules/@babel/core/lib/transformation/index.js:21:50
 ❯ transform node_modules/.pnpm/@babel+core@7.24.4/node_modules/@babel/core/lib/transform.js:22:33
 ❯ evaluateSync node_modules/.pnpm/gensync@1.0.0-beta.2/node_modules/gensync/index.js:251:28
 ❯ sync node_modules/.pnpm/gensync@1.0.0-beta.2/node_modules/gensync/index.js:89:14
 ❯ stopHiding - secret - don't use this - v1 node_modules/.pnpm/@babel+core@7.24.4/node_modules/@babel/core/lib/errors/rewrite-stack-trace.js:47:12
 ❯ transformSync node_modules/.pnpm/@babel+core@7.24.4/node_modules/@babel/core/lib/transform.js:42:76
 ❯ Instrumenter.instrumentSync node_modules/.pnpm/istanbul-lib-instrument@6.0.2/node_modules/istanbul-lib-instrument/src/instrumenter.js:102:25
 ❯ IstanbulCoverageProvider.onFileTransform node_modules/.pnpm/@vitest+coverage-istanbul@1.5.0_vitest@1.5.0/node_modules/@vitest/coverage-istanbul/dist/provider.js:172:36
 ❯ Object.transform node_modules/.pnpm/vite@5.2.8/node_modules/vite/dist/node/chunks/dep-whKeNLxG.js:51172:62
 ❯ loadAndTransform node_modules/.pnpm/vite@5.2.8/node_modules/vite/dist/node/chunks/dep-whKeNLxG.js:53923:29

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯

 Test Files  1 failed (1)
      Tests  no tests
   Start at  09:01:59
   Duration  212ms (transform 22ms, setup 0ms, collect 0ms, tests 0ms, environment 0ms, prepare 50ms)
```
