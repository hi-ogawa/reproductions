import { defineConfig } from "rolldown";

export default defineConfig({
	input: ["./src/main.js"],
	output: {
		sourcemap: "inline",
	},
	plugins: [
		{
			name: 'repro',
			transform(_code, id) {
				if (id.includes("dep2")) {
					return {
						code: 'export default "generated!"',
						map: { mappings: '' }
					}
				}
			}
		}
	]
});
