Rolldown type issue when `skipLibCheck: false`

```sh
$ npx tsc -b
node_modules/.pnpm/rolldown@0.12.1/node_modules/rolldown/dist/types/binding.d.ts:250:19 - error TS2552: Cannot find name 'BindingJSONSourcemap'. Did you mean 'BindingJsonSourcemap'?

250   inner: string | BindingJSONSourcemap
                      ~~~~~~~~~~~~~~~~~~~~

node_modules/.pnpm/rolldown@0.12.1/node_modules/rolldown/dist/types/options/normalized-input-options.d.ts:5:46 - error TS2307: Cannot find module '../../src/treeshake' or its corresponding type declarations.

5 import { NormalizedTreeshakingOptions } from '../../src/treeshake';
                                               ~~~~~~~~~~~~~~~~~~~~~


Found 2 errors.
```
