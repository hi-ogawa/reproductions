import { defineConfig } from "rolldown";

export default defineConfig({
	input: ["./src/entry.js"],
	output: {
		dir: "dist",
		entryFileNames: "[name]-[hash].js"
	},
	plugins: [
		{
			name: 'repro',
			augmentChunkHash(chunk) {
				if (chunk.name === 'dep2') {
					return Date.now().toString();
				}
			},
			generateBundle(options, bundle) {
				console.log("[debug]", Object.keys(bundle))
			}
		}
	],
});
