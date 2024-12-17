import path from "node:path";

/**
 * @type {import("webpack").Configuration}
 */
export default {
	mode: "development",
	devtool: false,
	entry: "./src/entry.js",
	output: {
		filename: "entry.js",
		path: path.resolve("./dist-webpack"),
	},
	target: "node",
	// externalsType: "import",
	// externals: ["@rolldown/test-dep-external"],
	// experiments: {
	// 	outputModule: true,
	// },
};
