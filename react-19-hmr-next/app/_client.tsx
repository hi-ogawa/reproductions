"use client";

import React from "react";

export function Counter() {
	const [count, setCount] = React.useState(0);

	React.useEffect(() => {
		console.log("[effect setup]");
		return () => {
			console.log("[effect teardown]");
		};
	}, []);

	return (
		<div>
			<p>({React.version})</p>
			<p>Count: {count}</p>
			<button onClick={() => setCount((c) => c - 1)}>-1</button>
			<button onClick={() => setCount((c) => c + 1)}>+1</button>
		</div>
	);
}
