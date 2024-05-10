import { createServer } from "vite";

const server = await createServer({
	clearScreen: false,
	configFile: false,
	resolve: {
		conditions: [],
	},
	ssr: {
		resolve: {
			conditions: [],
			externalConditions: [],
		},
		noExternal: process.env.TEST_NO_EXTERNAL ? ["test-dep"] : undefined,
		external: process.env.TEST_EXTERNAL ? ["test-dep"] : undefined,
	},
});
await server.pluginContainer.buildStart({});
const mod = await server.ssrLoadModule("test-dep");
// const mod = await server.ssrLoadModule("/repro-node.mjs");
console.log([mod.default]);

await server.close();
