import { Counter } from "./_client";
import { Client1, Client2 } from "./_repro";

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

					{/* TypeError: Cannot assign to read only property 'SomeComp' of object '#<Object>' */}
					<Client1 SomeComp={Client2} />
				</div>
			</body>
		</html>
	);
}
