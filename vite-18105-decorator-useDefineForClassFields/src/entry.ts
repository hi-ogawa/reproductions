function testDecorator(_value: unknown, context: DecoratorContext) {
	if (context.kind === "field") {
		return () => "dec-ok";
	}
}

class DecClass {
	@testDecorator
	decInit = "init";

	@testDecorator
	decNoInit: any;

	noDecNoInit: any;
}

class NoDecClass {
	noDecNoInit: any;
}

const decInstance = new DecClass();
const noDecInstance = new NoDecClass();

console.log({
	decInstance,
	noDecInstance,
});

if (typeof document !== "undefined") {
	document.getElementById("root")!.innerHTML = `
		<div>instance.decInit: ${decInstance.decInit}</div>
		<div>instance.decNoInit: ${decInstance.decNoInit}</div>
	`;
}
