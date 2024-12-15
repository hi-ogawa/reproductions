// @ts-ignore
import { TestServer } from "@hiogawa/test-dep-context/server2"
// @ts-ignore
import { TestClient } from "./context3-client.js"

export default function Page() {
  return <TestServer><TestClient/></TestServer> // should show [ok]
}
