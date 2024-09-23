```sh
pnpm build

./src/main.js → dist...
(!) src/main.js (2:0): Module "src/main.js" tried to import "./repro.js" with "custom": "y" attributes, but it was already imported elsewhere with "custom": "x" attributes. Please ensure that import attributes for the same module are always consistent.
/home/hiroshi/code/personal/reproductions/rollup-import-attributes/src/main.js:2:0
1: import repro1 from "./repro.js" with { custom: "x" }
2: import repro2 from "./repro.js" with { custom: "y" }
```
