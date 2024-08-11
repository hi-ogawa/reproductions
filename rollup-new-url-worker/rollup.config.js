// @ts-check
import { defineConfig } from "rollup";

export default defineConfig({
	input: "./src/index.js",
	output: {
		dir: "dist",
	},
	plugins: [
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
					source: `<script type="module" src="/index.js"></script>`,
				});
			},
		},
	],
});
