import { defineConfig } from "vite";

export default defineConfig({
  optimizeDeps: {
    // exclude: [
    //   "@opentelemetry/api",
    //   "@opentelemetry/sdk-trace-web",
    //   "@opentelemetry/resources",
    //   // this needs to be optimized
    //   // "@opentelemetry/exporter-trace-otlp-proto",
    // ],
  },
});
