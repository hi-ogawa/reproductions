import { tinyassert } from "@hiogawa/utils";
import ReactDOMServer from "react-dom/server.edge";
import type { StatsCompilation } from "webpack";
import { App } from "./App";
import css from "./index.css?raw";

export async function handler(_request: Request) {
	let scripts: string[];
	if (__define.DEV) {
		scripts = ["/assets/client.js"];
	} else {
		// https://webpack.js.org/api/module-methods/#magic-comments
		const mod = await import(
			/* webpackMode: "eager" */
			"../dist/client/__stats.js" as string
		);
		const stats = mod.default as StatsCompilation;
		const files = stats.assetsByChunkName?.["client"];
		tinyassert(files);
		scripts = files
			.filter((f) => f.endsWith(".js"))
			.map((file) => `/assets/${file}`);
	}

	const htmlStream = await ReactDOMServer.renderToReadableStream(<Root />, {
		bootstrapScripts: scripts,
	});
	return new Response(htmlStream, {
		headers: {
			"content-type": "text/html",
		},
	});
}

function Root() {
	return (
		<html>
			<head>
				<meta charSet="utf-8" />
				<title>Webpack React SSR</title>
				<link rel="icon" href="/favicon.ico" />
				<style>{css}</style>
			</head>
			<body>
				<App />
			</body>
		</html>
	);
}
