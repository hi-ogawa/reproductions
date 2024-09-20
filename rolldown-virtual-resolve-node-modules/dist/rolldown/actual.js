
//#region node_modules/.pnpm/slash@5.1.0/node_modules/slash/index.js
function slash(path) {
	const isExtendedLengthPath = path.startsWith("\\\\?\\");
	if (isExtendedLengthPath) {
		return path;
	}
	return path.replace(/\\/g, "/");
}

//#endregion
//#region src/actual.js
console.log(slash);

//#endregion