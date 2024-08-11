// @ts-check
import { defineConfig } from "rollup";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default defineConfig({
	input: "./src/index.js",
	output: {
		dir: "dist/rollup",
	},
	plugins: [
		nodeResolve({
			exportConditions: ["browser", "default"],
		}),
		{
			name: "asset-import-meta-url",
			transform() {},
			renderChunk() {},
		},
		{
			name: "index-html",
			buildStart() {
				this.emitFile({
					type: "asset",
					fileName: "index.html",
					source: `<body><script type="module" src="/index.js"></script></body>`,
				});
			},
		},
	],
});
