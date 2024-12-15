// @ts-ignore
import { TestClientProvider } from "@hiogawa/test-dep-context/client"
// @ts-ignore
import { TestClient } from "./_client"

export default function Page() {
  return <TestClientProvider><TestClient/></TestClientProvider> // should show [ok]
}
