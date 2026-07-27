import { expect, test } from 'vitest'

test('reports locator resource URLs', async () => {
  const urls = performance
    .getEntriesByType('resource')
    .map(entry => entry.name)
    .filter(url => /(?:\/|_)locators(?:[.-]|\.js)/.test(new URL(url).pathname))

  const resources = await Promise.all(urls.map(async (url) => {
    const response = await fetch(url)
    return {
      url,
      cacheControl: response.headers.get('cache-control'),
    }
  }))

  console.log(JSON.stringify(resources, null, 2))
  expect(resources.length).toBeGreaterThan(0)
})
