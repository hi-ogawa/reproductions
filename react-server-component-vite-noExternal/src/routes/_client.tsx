"use client";

import React from "react";

export function Counter() {
	const [count, setCount] = React.useState(0);
	return (
		<button onClick={() => setCount((v) => v + 1)}>client: {count}</button>
	);
}
