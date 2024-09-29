import { App } from "./app";
App;

console.log("🔵", Date.now(), "[import:hook2.jsx]");

export function useHook2() {
  console.log("🔶", Date.now(), "[useHook2]");
  return "(hook2)";
}
