import { hydrateRoot } from "hono/jsx/dom/client";
import { App } from "./app";

function main() {
	const el = document.getElementById("root");
	hydrateRoot(el!, <App />);
}

main();
