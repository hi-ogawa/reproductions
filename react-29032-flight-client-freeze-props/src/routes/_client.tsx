"use client";

import React from "react";

export function Counter() {
	const [v, setV] = React.useState(0);
	return <button onClick={() => setV((v) => v + 1)}>client: {v}</button>;
}
