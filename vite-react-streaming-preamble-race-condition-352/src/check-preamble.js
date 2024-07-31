// likely undefined
console.log(
	"[__vite_plugin_react_preamble_installed__]",
	window.__vite_plugin_react_preamble_installed__,
);

await new Promise((r) => setTimeout(r, 10));

// likely true
console.log(
	"[__vite_plugin_react_preamble_installed__]",
	window.__vite_plugin_react_preamble_installed__,
);
