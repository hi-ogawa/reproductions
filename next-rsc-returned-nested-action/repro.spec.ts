import { expect, test } from '@playwright/test'

for (const testCase of [
  {
    name: 'client import',
    path: '/imported',
    expected:
      /inner-error:UnrecognizedActionError:Server Action ".+" was not found/,
  },
  {
    name: 'Server Component prop',
    path: '/prop',
    expected: 'result:captured:client',
  },
]) {
  test(`${testCase.name}: client stores and invokes nested action`, async ({
    page,
  }) => {
    await page.goto(`http://localhost:3210${testCase.path}`)

    await page.locator('#get-inner').click()
    await expect(page.locator('#status')).toHaveText('stored:function')

    await page.locator('#call-inner').click()
    await expect(page.locator('#status')).toHaveText(testCase.expected)
  })
}
