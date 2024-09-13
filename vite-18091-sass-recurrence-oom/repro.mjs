async function main() {
	const sass =
		process.argv[2] === "sass"
			? await import("sass")
			: await import("sass-embedded");
	const url = new URL("./test.scss", import.meta.url);
	const code = `
		@mixin test {
			@include test();
		}
		body {
			@include test();
		}
	`;
	const res = await sass.compileStringAsync(code, { url });
	console.log(res);
}

main();
