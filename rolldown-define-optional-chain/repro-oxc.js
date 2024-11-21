import oxc from "oxc-transform";
import fs from "node:fs";

const input = fs.readFileSync('./src/entry.js', 'utf-8')

const result = oxc.transform(
	"test.ts",
	input,
	{
		define: {
			'globalThis.process.env': '{}'
		},
	},
);
console.log(result);
