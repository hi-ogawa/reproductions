Investigating how Next.js code splits js/css assets of client references.

It looks like they don't have client references level code spliting, but only per-page level?
(and that might not even the case on build?).

## example 1

No code splitting based on client reference deserialization.

- run `pnpm dev`
- open http://localhost:3000/?hide=1
- see `app_large_a57e95c6.js` and `app_client_4baaaf35.css` link is included in ssr

## example 2

Dev has per-page code splitting.

- run `pnpm dev`
- open http://localhost:3000/other
- click "/" to navigate
- see `app_large_a57e95c6.js` and `app_client_4baaaf35.css` is loaded

## example 3

Build doesn't even have a per-page code spitting.

- run `pnpm build` and `pnpm start`
- open http://localhost:3000/other
- see `large.js` content is included in initial scripts `app/page-67802e06ee378d1f.js`
- click "/" to navigate
- see `29628dcd2c77fb85.css` is loaded
