import ReactDOMServer from "react-dom/server";

export function handler(_request: Request) {
	const html = ReactDOMServer.renderToString(<Root />);
	return new Response(html, {
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
				<div>Hello</div>
			</body>
		</html>
	);
}
