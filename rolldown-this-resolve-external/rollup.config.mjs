import { defineConfig } from "rollup";

export default defineConfig({
	input: "./src/index.js",
	external: ["this-is-external"],
	output: {
		dir: "dist/rollup",
	},
	plugins: [
		{
			name: "repro",
			async transform(_code, id) {
				if (id.includes("src/index.js")) {
					const resolvedId = await this.resolve("this-is-external");
					console.log(`[debug] this.resolve("this-is-external") =`, {
						resolvedId,
					});
				}
			},
		},
	],
});
