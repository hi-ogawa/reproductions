/// <reference types="@vitest/browser/providers/playwright" />
import { it } from "vitest";
import { userEvent, page } from "@vitest/browser/context"

it("basic", async () => {
  document.body.innerHTML = `<button>hello</button>`;
  await userEvent.click(page.getByRole('button'), { force: true });
});
