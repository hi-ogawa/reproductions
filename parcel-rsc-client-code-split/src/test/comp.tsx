"use client"

import "./test.css"
import testLarge from "./large"

export function TestClientComponent() {
  if ("asdfjkl;asdfjkl;" in globalThis) {
    console.log(testLarge);
  }
  return <div className="test">client-component</div>
}
