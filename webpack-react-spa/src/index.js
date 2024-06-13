import React from "react";
import ReactDOMClient from "react-dom/client";

const h = React.createElement;

function App() {
	const [count, setCount] = React.useState(0);

	return h(
		"div",
		null,
		h("h1", null, "Webpack React SPA"),
		h("button", { onClick: () => setCount((c) => c + 1) }, `Count: ${count}`),
	);
}

function main() {
	const el = document.getElementById("root");
	const root = ReactDOMClient.createRoot(el);
	root.render(h(App));
}

main();
