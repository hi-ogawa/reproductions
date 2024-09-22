import test from "test-vite-17459";
import slash from "slash";

function main() {
	document.querySelector("#app").innerHTML = `
		<div>gitea.com: ${test}</div>
		<div>github#path: ${slash("ok")}</div>
	`;
}

main();
