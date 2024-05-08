import type { ViteDevServer } from "vite";
import { App } from "./app";
import { renderToString } from "vue/server-renderer";

declare let __vite_server: ViteDevServer;

export async function handler(_request: Request) {
	let html: string;
	if (import.meta.env.DEV) {
		html = (await import("/index.html?raw")).default;
		html = await __vite_server.transformIndexHtml("/", html);
	} else {
		html = (await import("/dist/client/index.html?raw")).default;
	}

	const ssrHtml = await renderToString(<App />);
	html = html.replace("<body>", () => `<body><div id="root">${ssrHtml}</div>`);
	return new Response(html, {
		headers: {
			"content-type": "text/html",
		},
	});
}
