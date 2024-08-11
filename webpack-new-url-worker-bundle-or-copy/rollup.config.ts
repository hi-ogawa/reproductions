import { defineConfig, type Plugin } from "rollup";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import fs from "node:fs";
import path from "node:path";
import MagicString from "magic-string";

export default defineConfig({
	input: "./src/index.js",
	output: {
		dir: "dist/rollup",
	},
	plugins: [
		nodeResolve({
			exportConditions: ["browser", "default"],
		}),
		workerImportMetaUrlPlugin(),
		assetImportMetaUrlPlugin(),
		{
			name: "index-html",
			buildStart() {
				this.emitFile({
					type: "asset",
					fileName: "index.html",
					source: `<body><script type="module" src="/index.js"></script></body>`,
				});
			},
		},
	],
});

// TODO: implement it without `import.meta.ROLLUP_FILE_URL_xxx`
// https://github.com/rolldown/rolldown/pull/1928

function assetImportMetaUrlPlugin(): Plugin {
	// https://github.com/vitejs/vite/blob/0f56e1724162df76fffd5508148db118767ebe32/packages/vite/src/node/plugins/assetImportMetaUrl.ts#L51-L52
	const assetImportMetaUrlRE =
		/\bnew\s+URL\s*\(\s*('[^']+'|"[^"]+"|`[^`]+`)\s*,\s*import\.meta\.url\s*(?:,\s*)?\)/dg;

	return {
		name: assetImportMetaUrlPlugin.name,
		transform(code, id) {
			if (code.includes("import.meta.url")) {
				// replace
				//   new URL("./asset.svg", import.meta.url)
				// with
				//   new URL(import.meta.ROLLUP_FILE_URL_xxx)
				// which in turn rollup repalces with
				//   new URL(new URL("...", import.meta.url).href)
				const output = new MagicString(code);
				const matches = code.matchAll(assetImportMetaUrlRE);
				for (const match of matches) {
					const url = match[1]!.slice(1, -1);
					if (url[0] !== "/") {
						const absUrl = path.resolve(path.dirname(id), url);
						if (fs.existsSync(absUrl)) {
							const referenceId = this.emitFile({
								type: "asset",
								name: path.basename(absUrl),
								source: fs.readFileSync(absUrl),
							});
							const [start, end] = match.indices![0]!;
							output.update(
								start,
								end,
								`new URL(import.meta.ROLLUP_FILE_URL_${referenceId})`,
							);
						}
					}
				}
				if (output.hasChanged()) {
					return {
						code: output.toString(),
						map: output.generateMap(),
					};
				}
			}
		},
	};
}

function workerImportMetaUrlPlugin(): Plugin {
	// https://github.com/vitejs/vite/blob/0f56e1724162df76fffd5508148db118767ebe32/packages/vite/src/node/plugins/workerImportMetaUrl.ts#L133-L134
	const workerImportMetaUrlRE =
		/\bnew\s+(?:Worker|SharedWorker)\s*\(\s*(new\s+URL\s*\(\s*('[^']+'|"[^"]+"|`[^`]+`)\s*,\s*import\.meta\.url\s*\))/dg;

	return {
		name: assetImportMetaUrlPlugin.name,
		transform(code, id) {
			if (code.includes("import.meta.url")) {
				// replace
				//   new Worker(new URL("./worker.js", import.meta.url))
				// with
				//   new Worker(import.meta.ROLLUP_FILE_URL_xxx)
				const output = new MagicString(code);
				const matches = code.matchAll(workerImportMetaUrlRE);
				for (const match of matches) {
					const url = match[2]!.slice(1, -1);
					if (url[0] !== "/") {
						const absUrl = path.resolve(path.dirname(id), url);
						if (fs.existsSync(absUrl)) {
							const referenceId = this.emitFile({
								type: "chunk",
								id: absUrl,
							});
							const [start, end] = match.indices![1]!;
							output.update(
								start,
								end,
								`import.meta.ROLLUP_FILE_URL_${referenceId}`,
							);
						}
					}
				}
				if (output.hasChanged()) {
					return {
						code: output.toString(),
						map: output.generateMap(),
					};
				}
			}
		},
	};
}
