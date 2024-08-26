import { defineConfig } from "rollup";
import path from "node:path";

export default defineConfig({
	input: ["./src/main.js"],
	output: {
		// experimentalMinChunkSize: 0,
		dir: "dist",
		chunkFileNames: "_chunk-[name].js",
		manualChunks: (id) => {
			if (id.includes("dep2.js")) {
				return "manual-dep2";
			}
		},
	},
	plugins: [
		{
			name: "debug-chunk",
			renderChunk(_code, chunk) {
				console.log({
					chunkName: chunk.name,
					moduleIds: chunk.moduleIds.map(id => path.basename(id)),
				})
			},
		},
	],
});
