import { test, vi } from "vitest";
import * as repro from "./repro.js";

vi.mock("date-fns/addHours", () => ({ addHours: 0 }));
vi.mock("date-fns/parse", () => ({ parse: 0 }));

test("should work", async () => {
  console.log({ repro });
});
