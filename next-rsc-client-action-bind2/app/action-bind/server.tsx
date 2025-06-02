// based on test cases in
// https://github.com/vercel/next.js/blob/ad898de735c393d98960a68c8d9eaeee32206c57/test/e2e/app-dir/actions/app/encryption/page.js

import { ActionBindClient } from "./client";
import { TestServerActionBindClientForm } from "./form";

export function TestServerActionBindClient() {
  // client element as bound arg
  const client = <ActionBindClient />;

  return (
    <TestServerActionBindClientForm
      action={async () => {
        "use server";
        return client;
      }}
    />
  );
}
