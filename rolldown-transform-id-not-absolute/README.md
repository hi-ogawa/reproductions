- https://github.com/hi-ogawa/rollup-plugin-module-federation/pull/1

When a virtual module includes a relative import e.g.

```ts
// virtual:entry
import * as lib from "./src/index.js";
console.log(lib);
```

Rollup provides a resolved absolute path in `transform(code, id)` hook:

```sh
$ pnpm build-rollup

[debug:transform] {
  id: '/home/hiroshi/code/personal/reproductions/rolldown-transform-id-not-absolute/src/index.js',
  code: 'console.log("test");\n'
}
```

On the other hand, Rolldown provides a relative path:

```sh
$ pnpm build-rolldown

[debug:transform] { id: 'src/index.js', code: 'console.log("test");\n' }
```
