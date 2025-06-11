import { defineConfig } from "vite";
import rolldownConfig from "./rolldown.config.js";

export default defineConfig({
	plugins: rolldownConfig.plugins as any,
	build: {
		minify: false,
		rollupOptions: {
			input: {
				index: "./src/entry.js",
			},
		},
	},
});
