import { defineConfig } from "vite";

export default defineConfig({
	optimizeDeps: {
		exclude: ["test-dep-new-url-worker"],
	},
	worker: {
		format: "es",
	},
});
