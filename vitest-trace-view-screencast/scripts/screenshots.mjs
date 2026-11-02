// Takes the trace view guide screenshots from the HTML report in `.vitest`.
// Run `pnpm test` first, then `pnpm screenshots [outDir]`.
// Set DPR=2 for retina captures.
import { mkdirSync } from 'node:fs'
import { chromium } from 'playwright'
import { preview } from 'vite'

const outDir = process.argv[2] ?? '.vitest/screenshots'
const testName = 'saves a valid date range'
const stepIndex = 3
const dpr = Number(process.env.DPR ?? 1)

const PAD = 36
const WIDTH = 1120
const BAR = 44
const HEIGHT = 780

const themes = {
  light: { bar: '#e9e9ec', pill: '#ffffff', text: '#5f6368', border: 'rgba(0,0,0,0.14)', shadow: 'rgba(0,0,0,0.28)', page: '#ffffff' },
  dark: { bar: '#2b2b2f', pill: '#1c1c1f', text: '#bdc1c6', border: 'rgba(255,255,255,0.12)', shadow: 'rgba(0,0,0,0.55)', page: '#121212' },
}

function frameHtml(t, url) {
  return `<!doctype html><html><head><style>
  html, body { margin: 0; background: transparent; }
  body { padding: ${PAD}px; }
  .win { width: ${WIDTH}px; border-radius: 10px; overflow: hidden;
    box-shadow: 0 0 0 1px ${t.border}, 0 14px 36px ${t.shadow}, 0 2px 8px ${t.shadow}; }
  .bar { height: ${BAR}px; background: ${t.bar}; display: flex; align-items: center; gap: 14px; padding: 0 14px; box-sizing: border-box;
    font: 13px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: ${t.text}; }
  .dots { display: flex; gap: 8px; }
  .dots i { width: 12px; height: 12px; border-radius: 50%; display: block; }
  .url { flex: 1; height: 28px; border-radius: 14px; background: ${t.pill}; display: flex; align-items: center; padding: 0 14px; }
  iframe { display: block; width: ${WIDTH}px; height: ${HEIGHT}px; border: 0; background: ${t.page}; }
  </style></head><body><div class="win">
  <div class="bar"><div class="dots"><i style="background:#ff5f57"></i><i style="background:#febc2e"></i><i style="background:#28c840"></i></div>
  <div class="url">localhost:4173</div></div>
  <iframe src="${url}"></iframe></div></body></html>`
}

const server = await preview({ configFile: false, preview: { open: false }, build: { outDir: '.vitest' } })
const url = server.resolvedUrls.local[0]
mkdirSync(outDir, { recursive: true })
const browser = await chromium.launch()
try {
  for (const scheme of ['light', 'dark']) {
    const page = await browser.newPage({
      viewport: { width: WIDTH + PAD * 2, height: BAR + HEIGHT + PAD * 2 },
      colorScheme: scheme,
      deviceScaleFactor: dpr,
    })
    await page.addInitScript(s => localStorage.setItem('vueuse-color-scheme', s), scheme)
    await page.setContent(frameHtml(themes[scheme], url))
    const app = page.frameLocator('iframe')
    await app.getByLabel(testName, { exact: true }).click()
    await app.getByTestId('trace-view').waitFor()
    // give the trace pane more room than the report tabs below it
    const box = await app.locator('.splitpanes--horizontal > .splitpanes__splitter').first().boundingBox()
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
      await page.mouse.down()
      await page.mouse.move(box.x + box.width / 2, PAD + BAR + 560, { steps: 5 })
      await page.mouse.up()
    }
    await app.getByTestId('trace-step').nth(stepIndex).click()
    await page.waitForTimeout(500)
    for (const view of ['dom', 'aria']) {
      await app.getByLabel('Trace snapshot view').selectOption(view)
      await page.waitForTimeout(500)
      const name = view === 'dom' ? `trace-view-${scheme}` : `trace-view-aria-${scheme}`
      await page.screenshot({ path: `${outDir}/${name}.png`, omitBackground: true })
    }
    await page.close()
  }
}
finally {
  await browser.close()
  await server.close()
}
