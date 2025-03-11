export function repro2Dep() {
  Error.stackTraceLimit = 2;
  console.trace("__TEST__");
}
