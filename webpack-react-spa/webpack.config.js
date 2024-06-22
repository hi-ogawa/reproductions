import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";

/**
 * @type {import("webpack").Configuration}
 */
export default {
	mode: "development",
	devtool: "source-map",
	entry: "./src/index.tsx",
	plugins: [
		new HtmlWebpackPlugin({
			template: "index.html",
		}),
	],
	output: {
		filename: "[name].bundle.js",
		path: path.resolve("./dist"),
		clean: true,
	},
	resolve: {
		extensions: [".tsx", ".ts", "..."],
	},
	module: {
		rules: [
			// https://webpack.js.org/contribute/writing-a-loader/
			{
				test: /\.[jt]sx$/,
				use: [
					"@hiogawa/tiny-refresh/webpack",
					path.resolve("./extra/esbuild-loader.js"),
				],
			},
			// https://webpack.js.org/guides/asset-management/#loading-css
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
			// https://webpack.js.org/guides/asset-management/#loading-images
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: "asset/resource",
			},
		],
	},
};
