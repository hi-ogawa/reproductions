import { expect, test, type Page } from '@playwright/test'
import { resetState as resetFileState } from '../app/file/state'
import { resetState as resetInlineState } from '../app/inline/state'

const examples = [
  {
    linkName: 'Inline directive',
    path: '/inline',
    resetState: resetInlineState,
    result: 'captured + hello',
    secondExecutionCount: 2,
  },
  {
    linkName: 'File directive',
    path: '/file',
    resetState: resetFileState,
    result: 'file + hello',
    secondExecutionCount: 1,
  },
] as const

for (const example of examples) {
  test(`${example.path}: submit, reload, submit`, async ({ page }) => {
    await page.goto(example.path)
    await waitForHydration(page)
    await page.getByRole('button', { name: 'Reset cache' }).click()
    await expect(page.getByTestId('execution-count')).toHaveText('0')

    // hello (cache miss from an SSR-rendered hydrated form)
    await submitHydrated(page)
    await expect(page.getByTestId('submission-count')).toHaveText('1')
    await page.getByRole('button', { name: 'Re-render page' }).click()
    await expect(page.getByTestId('execution-count')).toHaveText('1')
    await expect(page.getByTestId('result')).toHaveText(example.result)

    await page.reload()
    await waitForHydration(page)
    await expect(page.getByTestId('execution-count')).toHaveText('1')
    await expect(page.getByTestId('result')).toHaveText(example.result)

    // hello (Next.js baseline after hydrating a freshly SSR-rendered form)
    await submitHydrated(page)
    await expect(page.getByTestId('submission-count')).toHaveText('1')
    await page.getByRole('button', { name: 'Re-render page' }).click()
    await expect(page.getByTestId('execution-count')).toHaveText(
      String(example.secondExecutionCount),
    )
  })
}

for (const example of examples) {
  test(
    `${example.path}: client navigation, submit, reload, submit`,
    async ({ page }) => {
      const message = `hello-${Date.now()}`
      example.resetState()

      await page.goto('/')
      await waitForHydration(page)
      await page
        .locator('nav')
        .getByRole('link', { name: example.linkName })
        .click()
      await expect(page).toHaveURL(new RegExp(`${example.path}$`))

      // The client action transport passes only the application fields.
      await page.getByRole('textbox', { name: 'Message' }).fill(message)
      await submitHydrated(page)
      await page.getByRole('button', { name: 'Re-render page' }).click()
      await expect(page.getByTestId('execution-count')).toHaveText('1')

      await page.reload()
      await waitForHydration(page)

      // The hydrated SSR form retains action controls, changing the FormData cache argument.
      await page.getByRole('textbox', { name: 'Message' }).fill(message)
      await submitHydrated(page)
      await page.getByRole('button', { name: 'Re-render page' }).click()
      await expect(page.getByTestId('execution-count')).toHaveText('2')
    },
  )
}

const testNoJs = test.extend({
  javaScriptEnabled: ({}, use) => use(false),
})

for (const example of examples) {
  testNoJs(
    `${example.path}: native submit, reload, submit`,
    async ({ page }) => {
      await page.goto(example.path)
      await page.getByRole('button', { name: 'Reset cache' }).click()
      await expect(page.getByTestId('execution-count')).toHaveText('0')

      await page.reload()

      // Native form submissions decode a clean FormData cache argument.
      // hello (cache miss)
      await page.getByRole('button', { name: 'Call cached function' }).click()
      await expect(page.getByTestId('submission-count')).toHaveText('0')
      await expect(page.getByTestId('execution-count')).toHaveText('1')
      await expect(page.getByTestId('result')).toHaveText(example.result)

      await page.reload()

      // hello (cache hit after reload)
      await page.getByRole('button', { name: 'Call cached function' }).click()
      await expect(page.getByTestId('submission-count')).toHaveText('0')
      await expect(page.getByTestId('execution-count')).toHaveText('1')
      await expect(page.getByTestId('result')).toHaveText(example.result)
    },
  )
}

async function waitForHydration(page: Page) {
  await expect
    .poll(() =>
      page
        .locator('body')
        .evaluate((element) =>
          Object.keys(element).some((key) => key.startsWith('__reactFiber')),
        ),
    )
    .toBeTruthy()
}

async function submitHydrated(page: Page) {
  await Promise.all([
    page.waitForResponse((response) => response.request().method() === 'POST'),
    page.getByRole('button', { name: 'Call cached function' }).click(),
  ])
}
