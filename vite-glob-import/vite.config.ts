import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	clearScreen: false,
	plugins: [
		react(),
		{
			name: "virtual-glob",
			resolveId(source, importer, options) {
				if (source === "virtual:test-glob") {
					return "\0" + source;
				}
			},
			load(id, options) {
				if (id === "\0virtual:test-glob") {
					return `export default import.meta.glob("/src/test-glob/**/*.tsx")`;
				}
			},
		},
	],
});
