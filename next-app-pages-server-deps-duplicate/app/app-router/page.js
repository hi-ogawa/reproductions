import { testServerState } from "../../shared/index.js"

export default function Page() {
  testServerState()
  return <div>App router</div>;
}
