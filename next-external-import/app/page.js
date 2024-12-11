import argon2 from "argon2"
import esmOnly from "@vitejs/test-esm-only"
// externalized indirect dep not supported
// import externalDeep from "@vitejs/test-external-indirect"
// console.log(externalDeep)

export default function Home() {
  console.log(argon2, esmOnly);
  return <div>
    <h4>Test Page</h4>
    <pre>{JSON.stringify(Object.keys(argon2))}</pre>
    <pre>{esmOnly}</pre>
  </div>
}
