import Module from "../dist/lib.js";

const lib = await Module();
console.log(lib.hello("foo"));
