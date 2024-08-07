import { defineConfig } from "vite";
import fs from "node:fs";
import MagicString from "magic-string";
import path from "node:path";
import crypto from "node:crypto";
import * as esbuild from "esbuild";

export default defineConfig({
	clearScreen: false,
	optimizeDeps: {
		esbuildOptions: {
			plugins: [workerNewUrlAssetPlugin(), newUrlAssetPlugin()],
		},
	},
});

// replace
//   new URL("./asset.svg", import.meta.url)
//   new URL("asset.svg", import.meta.url)
// with
//   new URL("/(absolute-path-to)/asset.svg", import.meta.url)
function newUrlAssetPlugin(): esbuild.Plugin {
	// https://github.com/vitejs/vite/blob/0f56e1724162df76fffd5508148db118767ebe32/packages/vite/src/node/plugins/assetImportMetaUrl.ts#L51-L52
	const assetImportMetaUrlRE =
		/\bnew\s+URL\s*\(\s*('[^']+'|"[^"]+"|`[^`]+`)\s*,\s*import\.meta\.url\s*(?:,\s*)?\)/dg;

	return {
		name: newUrlAssetPlugin.name,
		setup(build) {
			build.onLoad({ filter: /\.js$/, namespace: "file" }, async (args) => {
				const data = await fs.promises.readFile(args.path, "utf-8");
				if (data.includes("import.meta.url")) {
					const matches = data.matchAll(assetImportMetaUrlRE);
					const output = new MagicString(data);
					for (const match of matches) {
						const rawUrl = match[1]!;
						const url = rawUrl.slice(1, -1);
						if (url[0] !== "/") {
							const absUrl = path.resolve(path.dirname(args.path), url);
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
	};
}

// replace
//   new URL("./worker.js", import.meta.url)
// with
//   new URL("/(absolute-path-to)/bundled-worker.js", import.meta.url)
function workerNewUrlAssetPlugin(): esbuild.Plugin {
	// https://github.com/vitejs/vite/blob/0f56e1724162df76fffd5508148db118767ebe32/packages/vite/src/node/plugins/workerImportMetaUrl.ts#L133-L134
	const workerImportMetaUrlRE =
		/\bnew\s+(?:Worker|SharedWorker)\s*\(\s*(new\s+URL\s*\(\s*('[^']+'|"[^"]+"|`[^`]+`)\s*,\s*import\.meta\.url\s*\))/dg;

	return {
		name: workerNewUrlAssetPlugin.name,
		setup(build) {
			build.onLoad({ filter: /\.js$/, namespace: "file" }, async (args) => {
				const data = await fs.promises.readFile(args.path, "utf-8");
				if (data.includes("import.meta.url")) {
					const matches = data.matchAll(workerImportMetaUrlRE);
					const output = new MagicString(data);
					for (const match of matches) {
						const rawUrl = match[2]!;
						const url = rawUrl.slice(1, -1);
						if (url[0] !== "/") {
							const absUrl = path.resolve(path.dirname(args.path), url);
							if (fs.existsSync(absUrl)) {
								const outfile = path.resolve(
									"node_modules/.vite/.worker",
									hashString(absUrl) + ".js",
								);
								// bundle worker if not exist
								if (!fs.existsSync(outfile)) {
									await esbuild.build({
										outfile,
										entryPoints: [absUrl],
										bundle: true,
										plugins: [newUrlAssetPlugin()],
										banner: {
											// without this separator, Vite breaks the code by
											//   importScripts("/@vite/env")(() => ...)()
											js: ";\n",
										},
									});
								}
								const [start, end] = match.indices![2]!;
								output.update(start, end, JSON.stringify(outfile));
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
	};
}

function hashString(s: string) {
	return crypto
		.createHash("sha256")
		.update(s)
		.digest()
		.toString("hex")
		.slice(0, 10);
}
