// @vitest-environment node
import { test } from "vitest";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "@emotion/react";

test("node", async () => {
	ThemeProvider;
	useTheme;
});
