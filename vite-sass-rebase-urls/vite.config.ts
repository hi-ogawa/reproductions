import { defineConfig } from "vite";
import path from "node:path";

export default defineConfig({
	resolve: {
		alias: {
			"#": path.join(import.meta.dirname, "src/"),
		},
	},
});
