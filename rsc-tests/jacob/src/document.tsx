export function Document({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<nav>
					<ul>
						<li>
							<a href="/">Home</a>
						</li>
						<li>
							<a href="/cjs">/cjs</a>
						</li>
						<li>
							<a href="/cjs2">/cjs2</a>
						</li>
						<li>
							<a href="/context">/context</a>
						</li>
						<li>
							<a href="/context2">/context2</a>
						</li>
						<li>
							<a href="/context3">/context3</a>
						</li>
					</ul>
				</nav>
				{children}
			</body>
		</html>
	);
}
