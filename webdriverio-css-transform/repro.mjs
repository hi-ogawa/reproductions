import * as wdio from "webdriverio";

async function main() {
  const browser = await wdio.remote({
    logLevel: "error",
    capabilities: {
      browserName: "chrome",
    },
  });
  await browser.url("http://localhost:8080/");
  Object.assign(globalThis, { browser });

  const $ = browser.$.bind(browser);
  browser.on("log.entryAdded", (e) => {
    console.log("[log.entryAdded]", e.text);
  });

  // not working
  {
    await browser.switchToFrame(await $("iframe#scaled"));
    await $("button").click();
    await browser.switchToParentFrame();
  }

  // working
  {
    await browser.switchToFrame(await $("iframe#normal"));
    await $("button").click();
    await browser.switchToParentFrame();
  }

  // working
  await $("button#normal").click();
  await $("button#scaled").click();

  await browser.deleteSession();
}

main();
