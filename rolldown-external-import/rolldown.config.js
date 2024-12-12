import { defineConfig } from "rolldown";

export default defineConfig({
	input: ["./src/entry.js"],
	output: {
		dir: "dist",
	},
	external: ["@rolldown/test-dep-external"],
	experimental: {
		strictExecutionOrder: true,
	},
});
