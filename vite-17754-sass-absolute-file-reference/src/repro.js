// @ts-check

import * as sass from "sass";
import path from "node:path";
import { pathToFileURL } from "node:url";

async function main() {
	const importeePath = path.resolve(import.meta.dirname, "importee.scss");
	const importGood = `@import "${importeePath}"`;
	const importBad = `@import "${pathToFileURL(importeePath)}"`;
	const file = "/test.scss";

	await new Promise((resolve) => {
		sass.render({ file, data: importGood }, (error, result) => {
			console.log(`@@@@`);
			console.log(`@@@@ [legacy] ${importGood}`);
			console.log(`@@@@`);
			console.log(error ?? result);
			resolve(null);
		});
	});

	await new Promise((resolve) => {
		sass.render({ file, data: importBad }, (error, result) => {
			console.log(``);
			console.log(`@@@@`);
			console.log(`@@@@ [legacy] ${importBad}`);
			console.log(`@@@@`);
			console.log(error ?? result);
			resolve(null);
		});
	});

	console.log(``);
	console.log(`@@@@`);
	console.log(`@@@@ [modern] ${importGood}`);
	console.log(`@@@@`);
	await sass
		.compileStringAsync(importGood, { url: pathToFileURL(file) })
		.then(console.log, console.log);

	console.log(``);
	console.log(`@@@@`);
	console.log(`@@@@ [modern] ${importBad}`);
	console.log(`@@@@`);
	await sass
		.compileStringAsync(importBad, { url: pathToFileURL(file) })
		.then(console.log, console.log);
}

main();
