import { defineConfig } from "vite";

export default defineConfig({
	css: {
		preprocessorOptions: {
			scss: {
				api: "modern-compiler",
			},
		},
	},
	build: {
		minify: false,
	}
});
