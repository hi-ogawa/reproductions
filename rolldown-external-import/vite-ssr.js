import { createServer } from "vite";

async function main() {
	const server = await createServer({
		configFile: false,
		ssr: {
			external: true,
		},
	});
	await server.ssrLoadModule("./src/entry.js");
	await server.close();
}

main();
