function customElement(name: string) {
	return (
		_value: unknown,
		ctx: ClassDecoratorContext<CustomElementConstructor>,
	) => {
		ctx.addInitializer(function () {
			window.customElements.define(name, this);
		});
	};
}

@customElement("my-element")
export class MyElement extends HTMLElement {
	constructor() {
		super();
		const shadow = this.attachShadow({ mode: "open" });
		shadow.innerHTML = `<p>hello</p>`;
	}
}

if (import.meta.vitest) {
	const { test, expect } = import.meta.vitest;

	test(customElement, () => {
		const el = document.createElement("my-element");
		expect(el.shadowRoot?.textContent).toEqual("hello");
	});
}
