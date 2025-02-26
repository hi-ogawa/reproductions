import { defineConfig } from "rollup";
import dts from "rollup-plugin-dts";
import * as esrap from "esrap"

// debug dts proxy ast
const dtsPlugin = dts();
const original = dtsPlugin.transform
dtsPlugin.transform = async function (...args) {
	const result = await original.apply(this, args)
	if (result && typeof result === "object" && "ast" in result) {
		const ___ = "```";
		console.log(`
### ${args[1]}

- input

${___}ts
${args[0]}
${___}

- dts emit + pre-process

${___}ts
${result.code}
${___}

- proxy ast

${___}ts
${esrap.print(result.ast).code}
${___}

`);
	}
	return result;
}


export default defineConfig({
	input: ["./src/entry.ts"],
	output: {
		dir: "dist/rollup-dts",
	},
	plugins: [dtsPlugin]
});
