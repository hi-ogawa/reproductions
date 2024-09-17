- https://github.com/vitest-dev/vitest/issues/6519

```sh
$ node repro.mjs 1
//// [transformRequest during configureServer] ////
import repro from "./repro-importee.js";
console.log(repro);

$ node repro.mjs 2
//// [transformRequest after createServer] ////
import repro from "/repro-importee.ts";
console.log(repro);
```
