import { useState } from "react";
import "./App.css";
import cssModule from "./test.module.css";

export default function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<div className="card">
				<button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
				<p className={cssModule.test}>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
		</>
	);
}
