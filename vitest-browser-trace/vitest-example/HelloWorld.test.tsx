import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import HelloWorld from "./HelloWorld.jsx";

test("renders name", async () => {
  const { getByText, getByTestId } = render(<HelloWorld name="Vitest" />);
  await expect.element(getByText("Hello Vitest!")).toBeInTheDocument();
  await expect.element(getByTestId("counter")).toHaveTextContent("Count: 0");
  await getByTestId("counter").click();
  await expect.element(getByTestId("counter")).toHaveTextContent("Count: 1");
  await getByTestId("counter").click();
  await expect.element(getByTestId("counter")).toHaveTextContent("Count: 2");
  await expect
    .element(getByTestId("counter"), { timeout: 100 })
    .toHaveTextContent("Count: 3");
});
