// @ts-check

import { parse } from "@babel/parser";
import generate_ from "@babel/generator";
import { Buffer } from "node:buffer";
import assert from "node:assert";
import { writeFileSync } from "node:fs";

/** @type {typeof generate_} */
// @ts-ignore cjs/esm compat
const generate = generate_.default;

function main() {
	const input = `
export function f() {
    let x = 1;
    let y = 2;
    return x + y;
}
export function g() {
    let a = 3;
    let b = 4;
    return a + b;
}
`;
	const ast = parse(input, { sourceType: "module", sourceFilename: "test.js" });

	// swap two statements
	ast.program.body.reverse();

	const { code, map } = generate(ast, { sourceMaps: true });
	assert(map);
	map.sourcesContent = [input];

	const mapJson = JSON.stringify(map);
	const evanwHash = Buffer.from(
		`${code.length}\0${code}${mapJson.length}\0${mapJson}`,
	).toString("base64");
	const evnawUrl = `https://evanw.github.io/source-map-visualization/#${evanwHash}`;
	console.log("==== source map viz url");
	console.log(evnawUrl);

	const mapBase64 = Buffer.from(mapJson, "utf-8").toString("base64");
	const output = `${code}\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,${mapBase64}\n`;
	writeFileSync("output.js", output);
}

main();
