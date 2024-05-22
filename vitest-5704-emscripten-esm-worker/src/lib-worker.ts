import Module from "../dist/lib.js";

const lib = await Module();

self.onmessage = () => {
	self.postMessage(lib.hello("world"));
};
