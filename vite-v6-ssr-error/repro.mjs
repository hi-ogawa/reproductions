import { createServer } from "vite";

const server = await createServer({
	clearScreen: false,
	configFile: false,
	server: {
		middlewareMode: true,
		ws: false,
	},
	optimizeDeps: {
		noDiscovery: true,
	},
});
await server.ssrLoadModule("/src/entry");
