import { defineConfig } from "rolldown";
import dts from "rollup-plugin-dts";

export default defineConfig({
	input: ["./src/entry.ts"],
	output: {
		dir: "dist/rolldown-dts",
	},
	plugins: [dts()]
});
