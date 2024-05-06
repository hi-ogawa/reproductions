import { createServer } from "vite";

const server = await createServer({
	clearScreen: false,
	configFile: false,
});

await server.ssrLoadModule("/repro-node.mjs");
await server.close();
