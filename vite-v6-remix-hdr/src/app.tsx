import { useState } from "hono/jsx";

export function App() {
	const [count, setCount] = useState(0);
	return (
		<div>
			<h3>Test</h3>
			<button onClick={() => setCount((v) => v + 1)}>count is {count}</button>
		</div>
	);
}
