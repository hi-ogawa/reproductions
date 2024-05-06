// @vitest-environment jsdom
import { expect, test } from "vitest";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material";
import { useTheme } from "@emotion/react";
import { render } from "@testing-library/react";

test("repro", async () => {
	const theme = createTheme({ hello: "world" } as any);

	function Debug() {
		const theme = useTheme() as any;
		expect(theme.hello).toBe("world");
		return <div></div>;
	}

	render(
		<ThemeProvider theme={theme}>
			<Debug />
		</ThemeProvider>,
	);
});
