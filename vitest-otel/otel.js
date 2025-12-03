import { NodeSDK } from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";

// by default, SDK sets up `@opentelemetry/exporter-trace-otlp-proto` at localhost:4318
const sdk = new NodeSDK({
  serviceName: "vitest",
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
export default sdk;
