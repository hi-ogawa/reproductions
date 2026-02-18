import { join } from "node:path";
import { chromium } from "playwright";

async function main() {
  console.log("Starting the browser...");
  const browser = await chromium.launch({});
  const context = await browser.newContext({});

  console.log("Starting tracing...");
  await context.tracing.start({ screenshots: true, snapshots: true, sources: true });

  console.log("Navigating to the page...");
  const page = await context.newPage();
  await page.goto("https://playwright.dev");

  await context.tracing.group("Test group", {
    location: {
      file: join(import.meta.dirname, "dummy.js"),
      line: 1,
      column: 1,
    },
  });
  await page.getByText("Get Started").click();
  await context.tracing.groupEnd();

  console.log("Stopping tracing and saving to trace.zip...");
  await context.tracing.stop({ path: "trace.zip" });

  console.log("Closing the browser...");
  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
