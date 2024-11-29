import { defineConfig } from "vite"

Error.stackTraceLimit = 3;

function f1() {
  f2();
}

function f2() {
  console.trace("test");
}

f1();

export default defineConfig({})
