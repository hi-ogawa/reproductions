import { ButtonWrapper } from "./../components/ButtonWrapper";
import { render, act, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { OfficeApi } from "./../api/officeApi";

describe("ButtonWrapper component test suit", () => {
  it("Should show host name on click", async () => {
    vi.spyOn(OfficeApi.prototype, "getHost").mockReturnValue("SomeHost");

    const root = render(<ButtonWrapper />);
    const btn = await root.findByRole("button");
    act(() => {
      fireEvent.click(btn);
    });
    const div = await root.findByText("SomeHost");
    expect(div).not.toBeNull();
  });
});
