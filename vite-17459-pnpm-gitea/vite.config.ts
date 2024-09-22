import { defineConfig } from "vite";

export default defineConfig({
	optimizeDeps: {
		// works if optimized by scan
		noDiscovery: true,
	},
});
