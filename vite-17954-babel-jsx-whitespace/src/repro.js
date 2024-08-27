import * as babel from "@babel/core";

async function main() {
	const input = `\
export const test = <div>{
  "Lorem"
} ispum </div>;
`;
	console.log("// input");
	console.log(input);

	const result = await babel.transformAsync(input, {
		parserOpts: {
			plugins: ["jsx"],
		},
		retainLines: true,
		configFile: false,
		babelrc: false,
	});
	console.log("// output ");
	console.log(result?.code);
}

main();
