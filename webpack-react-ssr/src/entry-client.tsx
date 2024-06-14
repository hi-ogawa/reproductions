// import "./index.css";
import React from "react";
import ReactDOMClient from "react-dom/client";
import { App } from "./App";

function main() {
	React.startTransition(() => {
		ReactDOMClient.hydrateRoot(
			document.body,
			<React.StrictMode>
				<App />
			</React.StrictMode>,
		);
	});
}

main();
