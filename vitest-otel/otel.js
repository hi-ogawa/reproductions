import { NodeSDK } from "@opentelemetry/sdk-node";
// import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-proto";
// import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node'

// by default, SDK sets up `@opentelemetry/exporter-trace-otlp-proto` at localhost:4318
const sdk = new NodeSDK({
  serviceName: "vitest",
  // traceExporter: new tracing.ConsoleSpanExporter(),
  // traceExporter: new OTLPTraceExporter(),
  // instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
export default sdk;
