import { defineConfig } from "vite";

export default defineConfig({
	build: {
		outDir: "dist/vite",
		minify: false,
		rollupOptions: {
			output: {
				entryFileNames: "js/[name]-[hash].js",
				chunkFileNames: "js/[name]-[hash].js",
				manualChunks(id) {
					if (id.includes("node_modules")) {
						return id
							.toString()
							.split("node_modules/")[1]
							.split("/")[0]
							.toString();
					}
				},
			},
		},
	},
});
