import { vi, describe, test, expect } from "vitest"
import okta from "./okta";

vi.mock("@okta/okta-signin-widget");

describe("Okta,", () => {
  test("okta", () => {
    expect(okta()).toBeDefined();
  });
});
