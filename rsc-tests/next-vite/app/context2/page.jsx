// @ts-ignore
import { TestServer } from "@hiogawa/test-dep-context/server2"
// @ts-ignore
import { TestClient } from "@hiogawa/test-dep-context/client"

export default function Page() {
  return <TestServer><TestClient/></TestServer> // should show [ok]
}
