async function main() {
  //
  // hypothetical old cjs dependency which uses `require`
  //
  const cjs = require("preact");

  //
  // your cjs code base
  // which happens to use dynamic import for lazy loading
  //
  const esm = await import("preact");

  console.log({ cjs, esm })
  console.log(cjs.Component === esm.Component);
}

main();
