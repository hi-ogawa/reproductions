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

// TODO: also implement it without `import.meta.ROLLUP_FILE_URL_xxx`
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
