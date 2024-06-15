import { tinyassert } from "@hiogawa/utils";
import ReactDOMServer from "react-dom/server.edge";
import type { StatsCompilation } from "webpack";
import { App } from "./App";
import css from "./index.css?raw";

// TODO: virtual module?
export type Manifest = {
	stats: StatsCompilation;
};

export async function handler(_request: Request, manifest: Manifest) {
	const clientStats = manifest.stats.children?.find((s) => s.name === "client");
	tinyassert(clientStats?.assetsByChunkName);

	const htmlStream = await ReactDOMServer.renderToReadableStream(<Root />, {
		bootstrapScripts: clientStats.assetsByChunkName["client"],
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
