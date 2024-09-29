import { useHook1 } from "./hook1";

export function App() {
  // console.log("🔼", Date.now(), "[App]");

  return (
    <div>
      <input placeholder="test-input" />
      <p>{useHook1()}</p>
    </div>
  );
}
