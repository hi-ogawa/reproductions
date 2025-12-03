// @ts-check

import { NodeSDK, tracing } from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-proto";

const sdk = new NodeSDK({
  serviceName: "vitest",

  // enable instrumentations
  instrumentations: [getNodeAutoInstrumentations()],

  // send to http://localhost:4318
  traceExporter: new OTLPTraceExporter(),

  // or dump logs on console for quick debugging
  // traceExporter: new tracing.ConsoleSpanExporter(),
});

sdk.start();
export default sdk;
