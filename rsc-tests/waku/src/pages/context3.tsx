// @ts-ignore
import { TestClientProvider } from "@hiogawa/test-dep-context/client"
// @ts-ignore
import { TestClient } from "./context3-client"

export default function Page() {
  return <TestClientProvider><TestClient/></TestClientProvider> // should show [ok]
}
