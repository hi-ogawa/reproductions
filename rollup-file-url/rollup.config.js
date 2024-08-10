// @ts-check
import { defineConfig } from "rollup";
import path from "node:path";
import fs from "node:fs";

export default defineConfig({
	input: "./src/test.js",
	output: {
		dir: "dist",
	},
	plugins: [
		{
			name: "svg-resolver",
			resolveId(source, importer) {
				if (!importer) return;
				if (source.endsWith(".svg")) {
					return path.resolve(path.dirname(importer), source);
				}
			},
			load(id) {
				if (id.endsWith(".svg")) {
					const referenceId = this.emitFile({
						type: "asset",
						name: path.basename(id),
						source: fs.readFileSync(id),
					});
					return `export default import.meta.ROLLUP_FILE_URL_${referenceId};`;
				}
			},
		},
	],
});
