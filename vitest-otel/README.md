# Vitest OpenTelemetry Setup

Local OpenTelemetry setup for Vitest with Jaeger tracing.

## Quick Start

```sh
# Start Jaeger service to receive otlp traces over http
# and serve Web UI at http://localhost:16686
docker compose up

# Run tests (exports to Jaeger via OTLP HTTP)
pnpm test
```

## Debug Mode

```sh
# Dump traces to console without Jaeger
OTEL_TRACES_EXPORTER=console pnpm test
```

## References

- [Vitest OpenTelemetry Guide](https://vitest.dev/guide/open-telemetry.html)
- [Jaeger Getting Started](https://www.jaegertracing.io/docs/2.12/getting-started/)
