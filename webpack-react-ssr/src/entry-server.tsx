import ReactDOMServer from "react-dom/server";

export default function handler(_request: Request) {
	const html = ReactDOMServer.renderToString(<App />);
	return new Response(html, {
		headers: {
			"content-type": "text/html",
		},
	});
}

function App() {
	return (
		<html>
			<head>
				<meta charSet="utf-8" />
				<title>Webpack React SSR</title>
				<link
					rel="icon"
					type="image/x-icon"
					href="https://webpack.js.org/favicon.a3dd58d3142f7566.ico"
				/>
			</head>
			<body>
				<div>Hello</div>
			</body>
		</html>
	);
}
