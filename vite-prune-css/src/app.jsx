// import "./test.css";
import { Dep } from "./dep.jsx";
import { dep2 } from "./dep2.js";

export function App() {
  return (
    <>
      <h1>Test</h1>
      <Dep />
      {dep2()}
    </>
  );
}
