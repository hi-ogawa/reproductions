import React from "react";
import ReactDOMClient from "react-dom/client";

function App() {
	return React.createElement("div", null, "hello");
}

function main() {
	const el = document.getElementById("root");
	const root = ReactDOMClient.createRoot(el);
	root.render(React.createElement(App));
}

main();
