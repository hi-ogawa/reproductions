import { defineConfig } from "vitest/config";
import MagicString from "magic-string";

export default defineConfig({
	test: {
		coverage: {
			enabled: true,
			include: ["src"],
			reporter: ["html", "text-summary"]
		},
	},
	plugins: [
		!process.env.NO_TRANSFORM && {
			name: "prepend-before-function",
			transform(code, id) {
				if (id.endsWith("/basic.ts")) {
					const output = new MagicString(code);
					output.prepend(`Object.defineProperty(__vite_ssr_exports__, "__anything_here__", { value: 1234 });`)
					return {
						code: output.toString(),
						map: output.generateMap({ hires: "boundary" }),
					};
				}
			},
		},
	],
});
