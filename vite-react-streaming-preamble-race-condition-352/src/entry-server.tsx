import type { IncomingMessage, ServerResponse } from "node:http";
import ReactDOMServer from "react-dom/server";
import { App } from "./app";

export default async function handler(
	_req: IncomingMessage,
	res: ServerResponse,
) {
	const htmlStream = ReactDOMServer.renderToPipeableStream(<Root />, {
		bootstrapModules: ["/src/entry-client"],
		onShellReady() {
			res.setHeader("content-type", "text/html");
			htmlStream.pipe(res);
		},
		onShellError() {
			res.statusCode = 500;
			res.setHeader("content-type", "text/html");
			res.end("<h1>Something went wrong</h1>");
		},
	});
}

function Root() {
	return (
		<html>
			<head>
				<meta charSet="utf-8" />
				<title>test</title>
				{import.meta.env.DEV && (
					<>
						<script type="module" src="/@vite/client" />
						<script
							type="module"
							dangerouslySetInnerHTML={{
								__html: `
									import RefreshRuntime from '/@react-refresh'
									RefreshRuntime.injectIntoGlobalHook(window)
									window.$RefreshReg$ = () => {}
									window.$RefreshSig$ = () => (type) => type
									window.__vite_plugin_react_preamble_installed__ = true
							  `,
							}}
						></script>
					</>
				)}
			</head>
			<body>
				<App />
			</body>
		</html>
	);
}
