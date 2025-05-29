import { TestServerActionBindClient } from "./action-bind/server";

export default async function Page() {
  return (
    <div style={{ border: "1px solid blue", padding: "20px" }}>
      <h4>Page</h4>
      <TestServerActionBindClient />
    </div>
  );
}
