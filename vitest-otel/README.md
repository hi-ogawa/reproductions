# Vitest OpenTelemetry Example

Local OpenTelemetry setup for Vitest with Jaeger tracing.

## How to run

```sh
# Start Jaeger service to receive otlp traces over http
# and serve Web UI at http://localhost:16686
docker compose up

# Run tests (exports to Jaeger via OTLP HTTP)
pnpm test

# Open http://localhost:16686
```

```sh
# Browser mode test runtime traces are not implemented yet
pnpm test --browser.enabled=true
```

## References

- [Vitest OpenTelemetry Guide](https://vitest.dev/guide/open-telemetry.html)
- [Jaeger Getting Started](https://www.jaegertracing.io/docs/2.12/getting-started/)
