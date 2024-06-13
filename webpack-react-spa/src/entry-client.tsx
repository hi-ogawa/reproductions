import ReactDOMClient from "react-dom/client";

// TODO: how to resolve extension less
import { App } from "./app.tsx";

function main() {
	const el = document.getElementById("root");
	const root = ReactDOMClient.createRoot(el!);
	root.render(<App />);
}

main();
