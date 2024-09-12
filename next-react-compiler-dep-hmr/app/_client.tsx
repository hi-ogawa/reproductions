"use client";

import React from "react";
import { dep } from "./_client-dep";

export function TestComponent() {
	const [count, setCount] = React.useState(0);
	return (
		<>
			<p>dep: {dep}</p>
			<button onClick={() => setCount((c) => c + 1)}>count: {count}</button>
		</>
	);
}
