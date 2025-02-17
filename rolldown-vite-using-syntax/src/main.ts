function test() {
	using _ = {
		[Symbol.dispose]: () => {
			document.querySelector("#app")!.innerHTML =
				`<div><h4>Disposed!</h4></div>`;
		},
	};
	document.querySelector("#app")!.innerHTML = `<div><h4>Created!</h4></div>`;
}

test();
