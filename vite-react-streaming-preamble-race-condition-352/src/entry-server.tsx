import type { IncomingMessage, OutgoingMessage } from "node:http";
import ReactDOMServer from "react-dom/server"
import { App } from "./app";

export default async function handler(
	_req: IncomingMessage,
	res: OutgoingMessage,
) {
  const htmlStream = ReactDOMServer.renderToPipeableStream(<Root />, {
    bootstrapModules: ["/src/entry-client"]
  })
	res.setHeader("content-type", "text/html")
  htmlStream.pipe(res)
}

function Root() {
	return (
		<html>
			<head>
				<meta charSet="utf-8" />
				<title>test</title>
				<script type="module" src="/@vite/client" />
			</head>
			<body>
				<div id="root">
					<App />
				</div>
			</body>
		</html>
	);
}
