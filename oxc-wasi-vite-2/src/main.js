// NOTE
// this uses top-level-await of full wasm binary,
// so static import should be probably avoided in practice.
import { parseSync, parseAsync } from "oxc-parser";

async function main() {
  const parse = window.location.search.includes("async")
    ? parseAsync
    : parseSync;
  const result = await parse("test.js", `let foo;`);
  const astJson = JSON.stringify(result.program, null, 2);
  document.querySelector("#app").innerHTML = `<pre>${astJson}</pre>`;
}

main();
