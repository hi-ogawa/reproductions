import ReactDOMServer from "react-dom/server.edge";
import { App } from "./App";
import css from "./index.css?raw";

export async function handler(_request: Request) {
	const htmlStream = await ReactDOMServer.renderToReadableStream(<Root />, {
		// TODO: hashed assets for prod
		bootstrapScripts: ["/client.js"],
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
