import { defineConfig } from "vite";

export default defineConfig({
	environments: {
		ssr: {
			resolve: {
				noExternal: true,
			},
			build: {
				rollupOptions: {
					input: {
						index: "./src/entry.js",
					},
				}
			},
		}
	},
	builder: {
		async buildApp(builder) {
			await builder.build(builder.environments.ssr)
		},
	},
	plugins: [
		// mini version of
		// https://github.com/cloudflare/workers-sdk/blob/f45208ca588d0565fa4e3abcee7be3974a1ef85d/packages/vite-plugin-cloudflare/src/index.ts#L799
		{
			name: 'repro',
			enforce: 'pre',
			resolveId(source, importer, options) {
				if (source === 'node:module') {
					console.log("[resolveId]", { source, importer });
					return {
						id: source,
						external: true,
						// should we suggest cloudlfare to add this?
						// moduleSideEffects: false
					};
				}
			},
		}
	]
});
