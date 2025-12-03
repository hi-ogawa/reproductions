import { test, expect } from "vitest";
import { trace } from "@opentelemetry/api";

test("ten times 2", async () => {
  new Promise((resolve) => setTimeout(resolve, 50));
  expect(10 * 2).toBe(20);
});

test("auto instrumentation", async () => {
  // auto instrumentation tracks network calls
  // e.g. the trace shows "GET"
  const res = await fetch("https://vitest.dev");
  expect(res.status).toBe(200);
});

test("custom", async () => {
  const tracer = trace.getTracer("custom-scope");
  await tracer.startActiveSpan("custom-span", async (span) => {
    span.setAttribute("custom-attribute", "hello world");
    await new Promise((resolve) => setTimeout(resolve, 50));
    span.end();
  });
});
