import { defineConfig } from "vite";

export default defineConfig({
	build: {
		minify: false,
	},
	worker: {
		// need either of two options
		// format: "es",
		// rollupOptions: {
		// 	output: {
		// 		inlineDynamicImports: true,
		// 	},
		// },
	},
});
