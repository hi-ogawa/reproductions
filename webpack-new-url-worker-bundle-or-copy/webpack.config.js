import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";

/**
 * @type {import("webpack").Configuration}
 */
export default {
	mode: "development",
	devtool: "source-map",
	entry: "./src/index.js",
	plugins: [
		new HtmlWebpackPlugin({
			template: "index.html",
		}),
	],
	output: {
		path: path.resolve("./dist"),
		clean: true,
	},
};
