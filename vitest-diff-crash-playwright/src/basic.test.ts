import { expect, test } from "vitest";
import { chromium } from "@playwright/test"

test("basic", async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("https://vitest.dev/");
  expect(await page.$("h1")).toBeNull();
});
