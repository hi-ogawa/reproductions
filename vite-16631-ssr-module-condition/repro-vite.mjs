import { createServer } from "vite";

const server = await createServer({
	clearScreen: false,
	configFile: false,
	ssr: {
		noExternal: process.env.TEST_INLINE ? ["test-dep"] : undefined,
	},
});
await server.pluginContainer.buildStart({});
const mod = await server.ssrLoadModule("/repro-node.mjs");
console.log([mod.default]);

await server.close();
