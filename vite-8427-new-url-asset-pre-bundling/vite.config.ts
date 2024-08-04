import { defineConfig } from "vite";
import fs from "node:fs";

export default defineConfig({
	clearScreen: false,
	optimizeDeps: {
		esbuildOptions: {
			plugins: [
				{
					name: "debug",
					setup(build) {
						build.onLoad({ filter: /\.js$/ }, async (args) => {
							const data = await fs.promises.readFile(args.path, "utf-8");
							if (
								data.includes("new URL") &&
								data.includes("import.meta.url")
							) {
								args.path;
								data;
								return {
									loader: "js",
									contents: data,
								};
							}
							return null;
						});
					},
				},
			],
		},
	},
});
