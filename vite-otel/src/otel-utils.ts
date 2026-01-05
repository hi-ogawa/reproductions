import { type Span, SpanStatusCode, trace } from "@opentelemetry/api";

const tracer = trace.getTracer("default");

export function recordTrace<T>({
  name,
  attributes,
  fn,
}: {
  name: string;
  attributes: Record<string, any>;
  fn: (current: Span) => T;
}): T {
  return tracer.startActiveSpan(name, { attributes }, (span) => callActiveSpan(span, fn));
}

// https://github.com/vitest-dev/vitest/blob/fa34701d25eced7fc9ada6d8f46a4ab71a61ec4c/packages/vitest/src/utils/traces.ts#L149
function callActiveSpan<T>(span: Span, callback: (span: Span) => T): T {
  let result!: T;
  try {
    result = callback(span);
    if (result instanceof Promise) {
      return result
        .catch((error) => {
          span.recordException({
            name: error.name,
            message: error.message,
            stack: error.stack,
          });
          span.setStatus({
            code: SpanStatusCode.ERROR,
          });
          throw error;
        })
        .finally(() => span.end()) as T;
    }
    return result;
  } catch (error) {
    if (error instanceof Error) {
      span.recordException({
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
      span.setStatus({
        code: SpanStatusCode.ERROR,
      });
    }
    throw error;
  } finally {
    // end sync callbcak
    if (!(result instanceof Promise)) {
      span.end();
    }
  }
}
