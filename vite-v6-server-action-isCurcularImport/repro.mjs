import { createServer } from "vite";

const server = await createServer({
	clearScreen: false,
	configFile: false,
	server: {
		middlewareMode: true,
		ws: false,
	},
});
const mod = await server.ssrLoadModule("/src/entry");
await mod.setupCyclic();
await mod.importAction("/src/action.js");
await server.close();
