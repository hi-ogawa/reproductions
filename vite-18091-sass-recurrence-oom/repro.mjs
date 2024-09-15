async function main() {
	const sass =
		process.argv[2] === "sass"
			? await import("sass")
			: await import("sass-embedded");
	const code = `
		@mixin test {
			@include test();
		}
		body {
			@include test();
		}
	`;
	const res = await sass.compileStringAsync(code, {
		url: new URL("file:///test.scss"),
	});
	console.log(res);
}

main();
