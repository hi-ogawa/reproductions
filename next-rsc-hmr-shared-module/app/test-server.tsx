import { TestClient } from "./test-client";
import { testShared } from "./test-shared";

export function TestServer() {
  return <TestClient testSharedFromServer={testShared} />
}
