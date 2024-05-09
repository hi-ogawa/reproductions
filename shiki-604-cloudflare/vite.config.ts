import path from "node:path";
import {
	vitePluginLogger,
	vitePluginSsrMiddleware,
} from "@hiogawa/vite-plugin-ssr-middleware";
import { defineConfig } from "vite";

export default defineConfig((env) => ({
	clearScreen: false,
	plugins: [
		vitePluginLogger(),
		vitePluginSsrMiddleware({
			entry: process.env["SERVER_ENTRY"] || "/src/adapters/node",
			preview: path.resolve("./dist/server/index.js"),
		}),
		!!process.env["SERVER_ENTRY"] && {
			name: "wrangler-wasm",
			apply: (_config, env) => !!env.isSsrBuild,
			config() {
				return {
					build: {
						rollupOptions: {
							external: [/\.wasm$/],
						},
					},
				};
			},
			configResolved(config) {
				// disable Vite's wasm integration since it doesn't allow wrangler's wasm bundling
				// https://github.com/vitejs/vite/blob/f71ba5b94a6e862460a96c7bf5e16d8ae66f9fe7/packages/vite/src/node/plugins/wasm.ts#L78
				for (const plugin of config.plugins) {
					if (plugin.name === "vite:wasm-fallback") {
						delete plugin.load;
					}
				}
			},
		},
	],
	build: {
		outDir: env.isSsrBuild ? "dist/server" : "dist/client",
	},
}));
