import path from "node:path";
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

	// [not ok]
	// vite:resolve 0.92ms /src/repro.js -> /home/hiroshi/code/personal/reproductions/vitest-plugin-react-v2/src/repro.js +0ms
	// vite:resolve 0.23ms ./generated.js -> null +6ms
	// vite:resolve 0.19ms /src/generated.js -> null +5ms
	await server.ssrLoadModule("/src/repro.js");

	// [ok]
	// vite:resolve 0.24ms ./generated.js -> null +0ms
	// vite:resolve 0.21ms /home/hiroshi/code/personal/reproductions/vitest-plugin-react-v2/src/generated.js -> null +6ms
	// await server.ssrLoadModule(path.resolve("src/repro.js"));

	await server.close();
}

main();
