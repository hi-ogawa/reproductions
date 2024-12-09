import { defineConfig } from "rolldown";

export default defineConfig({
	input: ["./src/main.js"],
	output: {
		dir: "dist",
		sourcemap: "inline",
	},
	plugins: [
		{
			name: 'repro',
			transform(code) {
				return {
					code: code + '\nconsole.log("injected!!")',
					map: null
				}
			}
		}
	]
});
