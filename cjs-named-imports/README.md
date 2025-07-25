# context

- https://github.com/rolldown/rolldown/issues/5429#issuecomment-3116201404

# examples

```sh
$ node src/index.js 
file:///home/hiroshi/code/personal/reproductions/cjs-named-imports/src/index.js:1
import { bad } from './test.cjs';
         ^^^
SyntaxError: Named export 'bad' not found. The requested module './test.cjs' is a CommonJS module, which may not support all module.exports as named exports.
CommonJS modules can always be imported via the default export, for example using:

import pkg from './test.cjs';
const { bad } = pkg;

    at ModuleJob._instantiate (node:internal/modules/esm/module_job:180:21)
    at async ModuleJob.run (node:internal/modules/esm/module_job:263:5)
    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:578:26)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:116:5)

Node.js v22.14.0
```

```sh
$ pnpm rolldown -c
<DIR>/index.js  chunk │ size: 1.38 kB                                                                                                       
                                                                                                                                            
✔ rolldown v1.0.0-beta.29 Finished in 4.13 ms 
```

```sh
$ pnpm rsbuild build

  Rsbuild v1.4.10

info    build started...
error   Build error: 
File: /home/hiroshi/code/personal/reproductions/cjs-named-imports/src/index.js:1:1
  × ESModulesLinkingError: export 'bad' (imported as 'bad') was not found in './test.cjs' (possible exports: ok)
   ╭─[3:4]
 1 │ import { bad } from './test.cjs';
 2 │ console.log({
 3 │     bad
   ·     ───
 4 │ });
   ╰────

error   Rspack build failed.
```

```sh
$ pnpm parcel build src/index.js
✨ Built in 346ms

dist/index.js    61 B    40ms
````
