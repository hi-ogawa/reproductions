# context

- https://github.com/vitejs/vite-plugin-react/pull/939

## notes

- navigating to a different page pulls scroll to the top
  - including when changing only `searchParams` or `params`
  - disabled by `scroll={false}` on `Link` component
- back/forward navigation restores cached content and scroll position

## todo

- `Link.scroll` https://nextjs.org/docs/app/api-reference/components/link#scroll
- `Link.onNavigate` https://nextjs.org/docs/app/api-reference/components/link#onnavigate
- `useLinkStatus` https://nextjs.org/docs/app/api-reference/functions/use-link-status
