// @ts-check

import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import fs from "node:fs";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

async function main() {
	const sass =
		process.argv[2] === "sass"
			? await import("sass")
			: await import("sass-embedded");

	const result = await sass.compileStringAsync(`@import "virtual-entry";`, {
		importers: [
			{
				async canonicalize(url, context) {
					console.log("[debug:canonicalize]", {
						url,
						importer: context.containingUrl?.href,
					});
					if (url === "virtual-entry") {
						return pathToFileURL(path.join(__dirname, "./styles/main.scss"));
					}
					return null;
				},
				async load(canonicalUrl) {
					console.log("[debug:load]", { url: canonicalUrl.href });
					const contents = await fs.promises.readFile(canonicalUrl, "utf-8");
					return { contents, syntax: "scss" };
				},
			},
		],
	});
	console.log(result);
}

main();
