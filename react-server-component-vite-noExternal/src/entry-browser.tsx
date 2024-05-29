import React from "react";
import ReactDOMClient from "react-dom/client";
import type { StreamData } from "./entry-server";
import { createMemoImport } from "./runtime-client";

async function main() {
	const flightStream = (globalThis as any).__flightStreamScript;

	// react client (flight -> react node)
	(globalThis as any).__webpack_require__ = createMemoImport();
	const { default: ReactClient } = await import(
		"react-server-dom-webpack/client.browser"
	);
	const node =
		await ReactClient.createFromReadableStream<StreamData>(flightStream);

	// react dom browser (react node -> html)
	React.startTransition(() => {
		ReactDOMClient.hydrateRoot(document, node);
	});
}

main();
