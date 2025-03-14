async function main() {
  /** @type {import("oxc-parser")} */
  const lib = await import(
    "@oxc-parser/binding-wasm32-wasi/parser.wasi-browser.js"
  );
  const result = lib.parseSync("test.js", `let foo`);
  const program = result.program;
  console.log(program);
  document.querySelector("#app").innerHTML = `\
<div>
  <h3>@oxc-parser/binding-wasm32-wasi example</h3>
  <pre>${JSON.stringify(JSON.parse(program), null, 2)}</pre>
</div>
`;
}

main();
