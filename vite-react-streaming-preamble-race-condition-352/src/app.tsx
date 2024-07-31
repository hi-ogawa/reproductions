import React from "react";

export function App() {
	const [count, setCount] = React.useState(0);
	return (
		<div>
			<h3>Test</h3>
			<Hydrated />
			<button onClick={() => setCount((v) => v + 1)}>count is {count}</button>
		</div>
	);
}

function Hydrated() {
	const hydrated = React.useSyncExternalStore(
		React.useCallback(() => () => {}, []),
		() => true,
		() => false,
	);
	return <pre>[hydrated: {Number(hydrated)}]</pre>;
}
