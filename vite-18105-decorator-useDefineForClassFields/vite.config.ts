import { defineConfig } from "vitest/config";

export default defineConfig({
	clearScreen: false,
	esbuild: {
		target: 'es2020',
		// supported: {
		// 	decorators: false,
		// },
	},
});
