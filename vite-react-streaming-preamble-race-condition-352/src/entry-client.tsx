import ReactDOMClient from "react-dom/client"
import { App } from "./app";

function main() {
	const el = document.getElementById("root");
	ReactDOMClient.hydrateRoot(el!, <App />);
}

main();
