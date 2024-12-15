// @ts-ignore
import { TestClientProvider } from "@hiogawa/test-dep-context/client"
import { TestClient } from "./context3-client.js"

export default function Page() {
  return <TestClientProvider><TestClient/></TestClientProvider> // should show [ok]
}
