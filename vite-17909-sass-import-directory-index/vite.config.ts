import { defineConfig } from "vite";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

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
