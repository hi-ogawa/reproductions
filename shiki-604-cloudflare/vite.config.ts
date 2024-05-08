import path from "node:path";
import {
	vitePluginLogger,
	vitePluginSsrMiddleware,
} from "@hiogawa/vite-plugin-ssr-middleware";
import { defineConfig } from "vite";
import fs from "node:fs";
import { createRequire } from "node:module";

export default defineConfig((env) => ({
	clearScreen: false,
	plugins: [
		vitePluginLogger(),
		vitePluginSsrMiddleware({
			entry: process.env["SERVER_ENTRY"] || "/src/adapters/node",
			preview: path.resolve("./dist/server/index.js"),
		}),
		{
			name: "replace-shiki-wasm",
			apply: (_config, env) =>
				Boolean(env.isSsrBuild && process.env["SERVER_ENTRY"]),
			config() {
				return {
					build: {
						ssrEmitAssets: true,
					},
				};
			},
			async generateBundle(_options, bundle) {
				for (const [_k, v] of Object.entries(bundle)) {
					if (v.type === "chunk" && v.code.includes(`import("shiki/wasm")`)) {
						const require = createRequire(import.meta.url);
						const shikiWasmPath = require.resolve("shiki/onig.wasm");
						this.emitFile({
							fileName: "shiki.wasm",
							type: "asset",
							source: await fs.promises.readFile(shikiWasmPath),
						});
						// TODO: relative from v.fileName
						v.code = v.code.replace(
							`import("shiki/wasm")`,
							`import("./shiki.wasm")`,
						);
					}
				}
			},
		},
	],
	build: {
		outDir: env.isSsrBuild ? "dist/server" : "dist/client",
	},
}));
