import { expect, test } from '@playwright/test'

async function saveActionAAndNavigateToB(page: import('@playwright/test').Page) {
  await page.goto('/a')
  await page.getByRole('button', { name: 'Save action A' }).click()
  await page.getByRole('link', { name: 'Page B' }).click()
  await expect(page.getByRole('heading', { name: 'Page B' })).toBeVisible()
}

test('calls retained action A directly after navigating to page B', async ({
  page,
}) => {
  await saveActionAAndNavigateToB(page)

  await page.getByRole('button', { name: 'Run saved action A directly' }).click()
  await expect(page.getByTestId('direct-result')).toHaveText('ACTION_A_OK')
})

test('fails to decode retained action A as an argument on page B', async ({
  page,
}) => {
  await saveActionAAndNavigateToB(page)

  const button = page.getByRole('button', {
    name: 'Run action B with saved action A',
  })
  await expect(button).toBeEnabled()
  await button.click()

  await expect(page.getByTestId('nested-result')).toContainText('ERROR:')
})

test('decodes a nested server reference reachable from the current page', async ({
  page,
}) => {
  await page.goto('/nested')
  await page
    .getByRole('button', { name: 'Run outer action with inner action' })
    .click()
  await expect(page.getByTestId('nested-control-result')).toHaveText(
    'OUTER_OK(INNER_OK)',
  )
})
