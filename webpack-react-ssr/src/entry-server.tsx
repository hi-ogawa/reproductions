import React from "react";
import ReactDOMServer from "react-dom/server.edge";

export async function handler(_request: Request) {
	const htmlStream = await ReactDOMServer.renderToReadableStream(<Root />, {
		// TODO: switch on build
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
			</head>
			<body>
				<div>React ({React.version})</div>
				<div>Hello SSR</div>
			</body>
		</html>
	);
}
