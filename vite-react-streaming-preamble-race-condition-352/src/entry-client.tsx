import ReactDOMClient from "react-dom/client";
import { App } from "./app";

function main() {
	ReactDOMClient.hydrateRoot(document.body, <App />);
}

main();
