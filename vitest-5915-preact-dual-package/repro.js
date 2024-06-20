import { render } from "preact-render-to-string";
import { h } from "preact";
import { useSyncExternalStore } from "use-sync-external-store";

function Test() {
	useSyncExternalStore(
		() => () => {},
		() => true,
		() => false,
	);
	return null;
}

function main() {
	const root = h(Test, null);
	render(root);
}

main();
