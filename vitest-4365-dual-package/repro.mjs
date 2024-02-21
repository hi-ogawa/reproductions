//
// hypothetical old cjs dependency which uses `require`
//
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const cjs = require("preact");

//
// your esm code base
//
import * as esm from "preact";

console.log({ cjs, esm })
console.log(cjs.Component === esm.Component);
