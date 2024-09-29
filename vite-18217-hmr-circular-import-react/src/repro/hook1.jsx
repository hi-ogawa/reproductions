import { useHook2 } from "./hook2";

export function useHook1() {
  return `(${useHook2()} in hook1)`;
}
