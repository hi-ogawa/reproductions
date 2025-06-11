import { defineConfig } from "vite";

export default defineConfig({
	environments: {
		ssr: {
			resolve: {
				noExternal: [
					"@vitejs/test-cjs-peer-react",
				],
			},
			build: {
				rollupOptions: {
					input: {
						index: "./src/entry.js",
					},
				},
			},
		},
	},
	builder: {
		async buildApp(builder) {
			await builder.build(builder.environments.ssr);
		},
	},
});
