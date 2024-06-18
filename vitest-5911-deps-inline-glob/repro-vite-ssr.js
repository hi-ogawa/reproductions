import { createServer } from "vite";

const server = await createServer({
	root: import.meta.dirname,
});

try {
	await server.ssrLoadModule("/repro-vite-ssr-entry.js");
} finally {
	await server.close();
}
