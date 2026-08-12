import { expect, test } from 'vitest'

test('passing inline snapshot', () => {
  expect({ answer: 42 }).toMatchInlineSnapshot(`
    {
      "answer": 42,
    }
  `)
})
