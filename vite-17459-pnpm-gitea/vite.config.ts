import { defineConfig } from "vite";

export default defineConfig({
	optimizeDeps: {
		// works if optimized by scan
		exclude: ["test-vite-17459"],
	},
});
