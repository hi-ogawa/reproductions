import { defineConfig } from "rolldown";

export default defineConfig({
	input: ["./src/entry.js"],
	output: {
		dir: "dist",
		format: "esm",
	},
	plugins: [
		{
			name: "repro",
			resolveId(id) {
				if (id === "virtual:test-dep") {
					return { id: "\0" + id, external: true };
				}
			},
			renderChunk(code) {
				console.log("[renderChunk]", { code });
				return code.replaceAll("\0virtual:test-dep", "./test-dep.js");
			},
		},
	],
});
