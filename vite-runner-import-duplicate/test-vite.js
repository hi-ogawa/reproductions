import { fileURLToPath } from "node:url";
import { createServer, createServerModuleRunner } from "vite";

const server = await createServer({
	clearScreen: false,
	configFile: false,
	root: fileURLToPath(new URL(".", import.meta.url)),
	environments: {
		custom: {},
	},
});
const environment = server.environments.custom;
const runner = createServerModuleRunner(environment);

const { getDep, customImport } = await runner.import("/src/entry.js");
const mod = await customImport(
	fileURLToPath(new URL("./src/dep.js", import.meta.url)),
);
console.log(mod.dep === getDep());

await server.close();
