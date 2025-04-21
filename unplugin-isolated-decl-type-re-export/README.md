minimal repro of https://github.com/vitest-dev/vitest/pull/7867

```sh
$ pnpm build

$ ls dist
index.d.ts  index.js

$ cat dist/index.d.ts
export { Dep } from "./dep.js";
export declare const main = "main";
```

Downgrade to `"unplugin-isolated-decl": "0.13.6"`

```sh
$ pnpm build
$ ls dist
dep.d.ts  index.d.ts  index.js
```
