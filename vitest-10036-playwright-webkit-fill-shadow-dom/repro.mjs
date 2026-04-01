import * as playwright from "playwright";

async function main() {
  const browserName = process.argv[2];

  if (!browserName || !(browserName in playwright)) {
    console.error(`Usage: node repro.mjs <browser>`);
    process.exitCode = 1;
    return;
  }

  const browserType = playwright[browserName];
  const wsEndpoint = process.env.PLAYWRIGHT_WS_ENDPOINT || "ws://127.0.0.1:6677/";
  const browser = await browserType.connect(wsEndpoint, { exposeNetwork: "<loopback>" });
  const page = await browser.newPage();

  await page.setContent(`
    <div id="host"></div>
    <script>
      const host = document.getElementById('host')
      const root = host.attachShadow({ mode: 'open' })
      const editor = document.createElement('div')
      editor.contentEditable = 'true'
      root.appendChild(editor)
      window.__editor = editor
    </script>
  `);

  const locator = page.locator('div[contenteditable="true"]');

  await locator.fill("Hello");

  const fillResult = await page.evaluate(() => ({
    textContent: window.__editor.textContent,
    innerText: window.__editor.innerText,
  }));

  await page.evaluate(() => {
    window.__editor.textContent = "";
  });

  await locator.click();
  await page.keyboard.type("Hello");

  const keyboardTypeResult = await page.evaluate(() => ({
    textContent: window.__editor.textContent,
    innerText: window.__editor.innerText,
  }));

  await browser.close();

  console.log({
    fillResult,
    keyboardTypeResult,
  });
}

await main();
