"use server-entry";

import { TestClientComponent as Inner } from "./client";

export function TestClientComponent(props: any) {
  return <Inner {...props} />;
}
