import { hydrateRoot } from "react-dom/client";
import { App } from "./app";

console.log("[import]", import.meta.url);

function main() {
  hydrateRoot(document.getElementById("root")!, <App />);
}

main();
