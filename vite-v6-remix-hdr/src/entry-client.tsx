import { hydrateRoot } from "hono/jsx/dom/client";
import { App } from "./app";

function main() {
	hydrateRoot(document.body, <App />);
}

main();
