// @vitest-environment jsdom
import { test } from "vitest";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "@emotion/react";

test("jsdom", async () => {
	ThemeProvider;
	useTheme;
});
