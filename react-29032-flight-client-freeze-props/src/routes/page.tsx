import { Counter } from "./_client.ref";

export default function Page() {
	return (
		<html>
			<head>
				<meta charSet="UTF-8" />
				<title>react-server</title>
				<meta
					name="viewport"
					content="width=device-width, height=device-height, initial-scale=1.0"
				/>
			</head>
			<body>
				<div>
					<div>Server: {Math.random().toString(36).slice(2)}</div>
					<Counter />
				</div>
			</body>
		</html>
	);
}
