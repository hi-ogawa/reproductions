import { defineConfig } from "vitest/config";

export default defineConfig({
	clearScreen: false,
	esbuild: {
		target: "es2022",
	},
	test: {
		includeSource: ["src/*.ts"],
		environment: "happy-dom",
	},
});
