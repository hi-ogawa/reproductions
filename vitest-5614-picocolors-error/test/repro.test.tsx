import { test } from "vitest";
import { render, screen } from "@testing-library/react";

test("Link changes the state when hovered", async () => {
	const node = (
		<div id="hey">
			{[...Array(1000)].map((i) => (
				<div key={i} id={i} style={{ color: "red" }}>
					<span />
				</div>
			))}
		</div>
	);
	render(node);
	screen.getByRole("no-such-thing");
});
