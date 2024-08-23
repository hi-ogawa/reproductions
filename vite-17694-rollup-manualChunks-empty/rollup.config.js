import { defineConfig } from "rollup";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default defineConfig({
	input: ["./src/main.js"],
	output: {
		dir: "dist/rollup",
		chunkFileNames: "chunks/[name]-[hash].js",
		manualChunks(id) {
			if (id.includes("node_modules")) {
				return id.toString().split("node_modules/")[1].split("/")[0].toString();
			}
		},
	},
	plugins: [nodeResolve(), commonjs()],
});
