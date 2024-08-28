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
	plugins: [
		{
			name: "tmp",
			async buildStart(options) {
				const test1 = path.join(
					import.meta.dirname,
					"node_modules/.cache/test1.scss",
				);
				const test2 = path.join(
					import.meta.dirname,
					"node_modules/.cache/test2.scss",
				);
				await fs.promises.mkdir(path.dirname(test1), { recursive: true });
				await fs.promises.writeFile(
					test1,
					// [not ok]
					`@import "${pathToFileURL(test2).href}";`,
					// [ok]
					// `@import "${test2}";`,
				);
				await fs.promises.writeFile(
					test2,
					`
					.test {
						color: orange;
					}
				`,
				);
			},
		},
	],
});
