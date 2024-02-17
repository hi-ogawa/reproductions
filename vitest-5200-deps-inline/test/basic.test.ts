import { expect, test } from 'vitest'
import { GridModule } from '../src/basic.js'

test('GridModule', () => {
  expect(GridModule).toMatchInlineSnapshot(`
    {
      "__init__": [
        "grid",
      ],
      "grid": [
        "type",
        [Function],
      ],
    }
  `);
})
