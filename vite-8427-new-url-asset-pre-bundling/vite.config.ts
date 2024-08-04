import { defineConfig } from "vite";
import fs from "node:fs";
import MagicString from "magic-string";
import path from "node:path";

export default defineConfig({
	clearScreen: false,
	optimizeDeps: {
		esbuildOptions: {
			plugins: [
				{
					// replace
					//   new URL("./vite.svg", import.meta.url)
					// with
					//   new URL("/(absolute-path-to)/vite.svg", import.meta.url)
					name: "new-url-import-meta-url-replace",
					setup(build) {
						build.onLoad({ filter: /\.js$/ }, async (args) => {
							const data = await fs.promises.readFile(args.path, "utf-8");
							if (data.includes("import.meta.url")) {
								// https://github.com/vitejs/vite/blob/0f56e1724162df76fffd5508148db118767ebe32/packages/vite/src/node/plugins/assetImportMetaUrl.ts#L51-L52
								const assetImportMetaUrlRE =
									/\bnew\s+URL\s*\(\s*('[^']+'|"[^"]+"|`[^`]+`)\s*,\s*import\.meta\.url\s*(?:,\s*)?\)/dg;
								const matches = data.matchAll(assetImportMetaUrlRE);
								const output = new MagicString(data);
								for (const match of matches) {
									const rawUrl = match[1]!;
									const url = rawUrl.slice(1, -1);
									if (url[0] === ".") {
										const absUrl = path.resolve(args.path, "..", url);
										if (fs.existsSync(absUrl)) {
											const [start, end] = match.indices![1]!;
											output.update(start, end, JSON.stringify(absUrl));
										}
									}
								}
								if (output.hasChanged()) {
									return {
										loader: "js",
										contents: output.toString(),
									};
								}
							}
							return null;
						});
					},
				},
			],
		},
	},
});
