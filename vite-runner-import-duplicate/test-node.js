import { fileURLToPath } from "node:url";

const { getDep, customImport } = await import("./src/entry.js");
const mod = await customImport(
	fileURLToPath(new URL("./src/dep.js", import.meta.url)),
);
console.log(mod.dep === getDep());
