import { defineConfig } from "rolldown";

export default defineConfig({
	input: ["./src/entry.js"],
	output: {
		dir: "dist",
	},
});