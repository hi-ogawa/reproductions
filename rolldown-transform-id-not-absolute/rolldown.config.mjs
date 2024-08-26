import { defineConfig } from "rolldown";

export default defineConfig({
	input: {
		main: "virtual:entry",
	},
	output: {
		dir: "dist/rolldown",
	},
	plugins: [
		{
			name: "repro",
			resolveId(source) {
				if (source === "virtual:entry") {
					return "\0" + source;
				}
			},
			load(id) {
				if (id === "\0virtual:entry") {
					return `
						import * as lib from "./src/index.js";
						console.log(lib);
					`;
				}
			},
			transform(code, id) {
				if (id.includes("src/index.js")) {
					console.log("[debug:transform]", { id, code });
				}
			},
		},
	],
});
