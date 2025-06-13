import { defineConfig } from "vite";

export default defineConfig({
	environments: {
		ssr: {
			build: {
				rollupOptions: {
					input: "./src/entry.js",
				}
			}
		}
	},
	builder: {
		async buildApp(builder) {
			await builder.build(builder.environments.ssr)
		},
	},
});
