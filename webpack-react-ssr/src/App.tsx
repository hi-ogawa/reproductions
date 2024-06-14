import "./App.css";
import React from "react";
import reactLogo from "./assets/react.svg";
import webpackLogo from "./assets/webpack.svg";

export function App() {
	const [count, setCount] = React.useState(0);

	return (
		<div id="root">
			<div>
				<a href="https://webpack.js.org" target="_blank">
					{/* TODO: how to match same asset url between server and client? */}
					<img
						suppressHydrationWarning
						src={webpackLogo}
						className="logo"
						alt="Vite logo"
					/>
				</a>
				<a href="https://react.dev" target="_blank">
					<img
						suppressHydrationWarning
						src={reactLogo}
						className="logo react"
						alt="React logo"
					/>
				</a>
			</div>
			<h1>Webpack + React</h1>
			<div className="card">
				<button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
				{/* TODO: HMR */}
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">
				Click on Webpack and React logos to learn more
			</p>
		</div>
	);
}
