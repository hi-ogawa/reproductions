import { defineConfig } from "vite";
import path from "node:path";

export default defineConfig({
	plugins: [
		{
			name: "test",
			configureServer(server) {
				// transform with absolute path before browser loads it with /src/app.js
				server.transformRequest(path.resolve("src/app.js"));
			},
		},
	],
});
