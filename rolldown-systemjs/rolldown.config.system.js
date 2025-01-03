import { defineConfig } from "rolldown";
import babel from "@babel/core";
import babelSystemjs from "@babel/plugin-transform-modules-systemjs";
import babelDynamicImport from "@babel/plugin-transform-dynamic-import";

export default defineConfig({
	input: ["./src/entry.js"],
	output: {
		dir: "dist",
		format: "esm",
		sourcemap: true,
	},
	plugins: [
		{
			name: "transform-chunk-systemjs",
			async renderChunk(code, _chunk) {
				const result = await babel.transformAsync(code, {
					babelrc: false,
					configFile: false,
					sourceMaps: true,
					plugins: [babelDynamicImport, babelSystemjs],
				});
				return { code: result.code, map: result.map };
			},
		},
	],
});
