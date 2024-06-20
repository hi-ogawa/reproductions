async function main() {
	const testMod = await import("test-esm-dynamic-import-cjs");
	const cjsMod = await testMod.testImport();
	console.log(cjsMod);
	if (typeof document === "undefined") {
		return;
	}

	const el = document.createElement("pre");
	el.textContent = JSON.stringify(
		cjsMod,
		(_k, v) => {
			if (typeof v === "function") {
				return `[function]`;
			}
			return v;
		},
		2,
	);
	document.body.appendChild(el);
}

main();
