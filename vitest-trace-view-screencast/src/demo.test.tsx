import type { PropsWithChildren } from "react";
import { expect, test } from "vitest";
import { page } from "vitest/browser";
import { DateRangePicker } from "./demo";

function DarkTheme({ children }: PropsWithChildren) {
  return <div className="dark">{children}</div>;
}

test("saves a valid date range", async () => {
  const screen = await page.render(<DateRangePicker />);

  await screen.getByRole("button", { name: "Choose check in" }).click();
  await screen.getByRole("button", { name: "Next month" }).click();
  await screen.getByRole("button", { name: "18" }).click();
  await screen.getByRole("button", { name: "22" }).click();
  await screen.getByRole("button", { name: "Save dates" }).click();

  await expect.element(screen.getByText("Dates saved"), { timeout: 1200 }).toBeVisible();
});

test("rejects checkout before check-in", async () => {
  const screen = await page.render(<DateRangePicker />);

  await screen.getByRole("button", { name: "Choose check in" }).click();
  await screen.getByRole("button", { name: "Next month" }).click();
  await screen.getByRole("button", { name: "18" }).click();
  await screen.getByRole("button", { name: "14" }).click();
  await screen.getByRole("button", { name: "Save dates" }).click();

  await expect.element(screen.getByText("Choose a date after check-in"), { timeout: 1200 }).toBeVisible();
});

test("reviews the dark theme", async () => {
  const screen = await page.render(<DateRangePicker />, { wrapper: DarkTheme });

  await screen.getByRole("region", { name: "Choose travel dates" }).mark("Initial dark theme");
  await screen.getByRole("button", { name: "Choose check in" }).click();

  await expect.element(screen.getByText("Select check-in and check-out dates")).toBeVisible();
});
