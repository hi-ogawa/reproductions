"use server-entry";

import "./client";

// ##
// ## import "use client" directly
// ## (css is loaded via `createResourcesProxy` of `./root.tsx` chunk)
// ## https://github.com/parcel-bundler/parcel/blob/79843ee6aacdbec68345865fbc8500d937a1ef98/packages/runtimes/rsc/src/RSCRuntime.js#L346-L362
// ##
// js split [no]
// css split [no]
// css loaded [yes]
// import { TestClientComponent } from "./test/client"

// ##
// ## import "use client" through "use server-entry" wrapper and re-export
// ## (this probably hit the edge case of `createResourcesProxy` and css is broken)
// ##
// js split [yes]
// css split [yes]
// css loaded [no]
// import { TestClientComponent } from "./test/server"

// ##
// ## import "use client" through "use server-entry" wrapper and server component wrapper
// ## (css is loaded via `createResourcesProxy` of `./test/server2.tsx` chunk)
// ##
// js split [yes]
// css split [yes]
// css loaded [yes]
// import { TestClientComponent } from "./test/server2";

export async function Root(props: { url: string }) {
  // ##
  // ## dynamic import "use client" directly
  // ## (css is loaded via `createClientReference` wrapper of `./test/client` chunk)
  // ## https://github.com/parcel-bundler/parcel/blob/79843ee6aacdbec68345865fbc8500d937a1ef98/packages/runtimes/rsc/src/RSCRuntime.js#L98-L111
  // ##
  // js split [yes]
  // css split [yes]
  // css loaded [yes]
  const { TestClientComponent } = await import("./test/client");

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
        <div>{!props.url.includes("hide") && <TestClientComponent />}</div>
      </body>
    </html>
  );
}
