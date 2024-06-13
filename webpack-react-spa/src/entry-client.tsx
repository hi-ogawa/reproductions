import "./index.css";
import React from "react";
import ReactDOMClient from "react-dom/client";
import { App } from "./App.tsx"; // TODO: how to resolve extension less?

function main() {
	const el = document.getElementById("root");
	const root = ReactDOMClient.createRoot(el!);
	root.render(
		<React.StrictMode>
			<App />
		</React.StrictMode>,
	);
}

main();
