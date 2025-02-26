import { defineConfig } from "rollup";
import dts from "rollup-plugin-dts";
import * as esrap from "esrap";
import path from "node:path";

// debug rollup-plugin-dts's internal transform
const dtsPlugin = dts();
const original = dtsPlugin.transform;
dtsPlugin.transform = async function (...args) {
	const result = await original.apply(this, args);
	if (result && typeof result === "object" && "ast" in result) {
		const [input, id] = args;
		const { code } = esrap.print(result.ast);
		const debugOutput = `\
// @ts-nocheck

////
//// input
////
${input}

////
//// dts + pre-process
////
${result.code}

////
//// proxy ast
////
${code}
`;
		this.emitFile({
			type: "asset",
			fileName:
				"debug-dts/" +
				path.relative(path.resolve(), id).replace(/[./]/g, "_") +
				".ts",
			source: debugOutput,
		});
	}
	return result;
};

export default defineConfig({
	input: ["./src/entry.ts"],
	output: {
		dir: "dist/rollup",
	},
	plugins: [dtsPlugin],
});
