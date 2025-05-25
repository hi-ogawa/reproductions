"use client";

import "./client.css";
import large from "./large";

export function TestClient() {
  if (Math.random() > 1) {
    console.log(large);
  }

  return <div className="test-client">[test-client-style]</div>;
}
