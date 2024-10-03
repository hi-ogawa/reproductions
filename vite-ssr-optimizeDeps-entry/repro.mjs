import { createServer } from "vite";

const server = await createServer({
	clearScreen: false,
	configFile: false,
	server: {
		middlewareMode: true,
	},
	optimizeDeps: {
		force: true,
		include: []
	},
	ssr: {
		noExternal: true,
		optimizeDeps: {
			include: ["react"]
		},
	}
});

// [not ok]
const mod = await server.ssrLoadModule("react");

// [ok]
// const mod = await server.ssrLoadModule("/src/react.js");

console.log(mod);

await server.close();
