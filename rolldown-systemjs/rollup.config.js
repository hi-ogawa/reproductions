import { defineConfig } from "rollup";

export default defineConfig({
	input: ["./dist/entry.js"],
	output: {
		dir: "dist/system",
		format: "system",
	},
});
