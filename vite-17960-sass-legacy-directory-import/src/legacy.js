// @ts-check

import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

async function main() {
	const sass =
		process.argv[2] === "sass"
			? await import("sass")
			: await import("sass-embedded");

	function testImporter(url, prev) {
		console.log("[debug] custom importer args: ", { url, prev });

		if (url === "virtual:entry") {
			const file = path.join(__dirname, "styles/main.scss");
			return {
				file,
			};
		}
		return null;
	}

	await new Promise((resolve) => {
		sass.render(
			{
				data: `@import "virtual:entry";`,
				importer: [testImporter],
			},
			(error, result) => {
				console.log(`[output]`);
				console.log(result?.css.toString());
				console.log(error ?? result);
				resolve(null);
			},
		);
	});
}

main();
