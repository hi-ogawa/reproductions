import { testServerState } from "../shared/index.js";

export function getServerSideProps() {
  testServerState()
  return {
    props: {},
  };
}

export default function Page() {
  return <div>Pages router</div>
}
