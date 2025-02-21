import { defineConfig } from "rollup";
import { dts } from "rollup-plugin-dts";

export default defineConfig({
	input: "./src/index.ts",
	output: {
		dir: "dist/rollup",
	},
	plugins: [
		dts({
			compilerOptions: {
				// tsc's default is false => works
				// tsup overwrite to false => works
				// rollup-plugin-dts defaults to true => breaks
				// preserveSymlinks: false,
			},
		}),
	],
});
