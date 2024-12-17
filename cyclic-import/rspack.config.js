import { defineConfig } from "@rspack/cli";
import path from "node:path";

// how to specify module is slightly different from webpack?
export default defineConfig({
	mode: "development",
	devtool: false,
	entry: "./src/entry.js",
	output: {
		filename: "entry.js",
		path: path.resolve("./dist-rspack"),
		chunkFormat: "module",
	},
	target: "node",
});
