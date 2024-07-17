import { createServer } from "vite";

async function main() {
	const server = await createServer({
		configFile: false,
		server: {
			fs: {
				// works when disabling cache
				// cachedChecks: false,
			},
		},
	});
	await server.ssrLoadModule("/src/repro.js");
	await server.close();
}

main();
