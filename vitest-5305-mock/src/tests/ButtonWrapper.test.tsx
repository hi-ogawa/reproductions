import { ButtonWrapper } from "./../components/ButtonWrapper";
import { render, act, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

vi.mock("./../api/officeApi", () => {
  class OfficeApi {
    getHost() {
      return "SomeHost";
    }
  }
  return { OfficeApi }
});

describe("ButtonWrapper component test suit", () => {
  it("Should show host name on click", async () => {
    const root = render(<ButtonWrapper />);
    const btn = await root.findByRole("button");
    act(() => {
      fireEvent.click(btn);
    });
    const div = await root.findByText("SomeHost");
    expect(div).not.toBeNull();
  });
});
