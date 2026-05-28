import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });

// test('header', async ({ page }) => {
//   await page.setContent(`
// <h1>Hello, World!</h1>
// `);
//   await expect(page.locator('body')).toMatchAriaSnapshot(`
//     - heading "Hello, World!" [level=1]
//   `)
// })

// test('br', async ({ page }) => {
//   await page.setContent(`
// <p>Hello, <br/> World!</p>
// `);
//   await expect(page.locator('body')).toMatchAriaSnapshot(`
//     - paragraph: Hello, World!
//   `)
// })

// test('empty', async ({ page }) => {
//   await page.setContent(`
// <main>
//   <button hidden="true">Hidden</button>
// </main>
// `);
//   await expect(page.locator('body')).toMatchAriaSnapshot(`
//     - main
//   `)
// })

// TODO: this shouldn't technically fail as per partial matching behavior?
// test('empty -> not empty', async ({ page }) => {
//   await page.setContent(`
// <button not-hidden="true">Hidden</button>
// `);
//   await expect(page.locator('body')).toMatchAriaSnapshot(`

//   `)
// })
