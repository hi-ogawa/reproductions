"use server-entry";

import "./client";
import { ClientComponent } from "./test/comp";

export async function Root(props: { url: string }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
      </head>
      <body>
        <h4>test</h4>
        <div>
          [<a href="/">show</a> | <a href="/?hide">hide</a>]
        </div>
        <div>{!props.url.includes("hide") && <ClientComponent />}</div>
      </body>
    </html>
  );
}
