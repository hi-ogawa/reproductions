import path from "node:path";
import {
	vitePluginLogger,
	vitePluginSsrMiddleware,
} from "@hiogawa/vite-plugin-ssr-middleware";
import { defineConfig } from "vite";

export default defineConfig((env) => ({
	clearScreen: false,
	define: {
		"import.meta.env.VITE_BUILD_CF": !!process.env["VITE_BUILD_CF"],
	},
	plugins: [
		vitePluginLogger(),
		vitePluginSsrMiddleware({
			entry: process.env["VITE_BUILD_CF"]
				? "/src/adapters/cloudflare-workers"
				: "/src/adapters/node",
			preview: path.resolve("./dist/server/index.js"),
		}),
		{
			name: "wrangler-wasm",
			apply: (_config, env) => !!env.isSsrBuild,
			config() {
				return {
					resolve: {
						alias: {
							"shiki/wasm": "shiki/onig.wasm",
						},
					},
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
