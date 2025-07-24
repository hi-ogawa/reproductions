import { testFn } from "./action-module";

export default async function Page() {
  console.log(testFn);
  return (
    <div style={{ border: "1px solid blue", padding: "20px" }}>
      <h4>Page</h4>
    </div>
  );
}
