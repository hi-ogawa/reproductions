# context

- https://github.com/vitejs/vite-plugin-react/issues/883

```
 ⨯ ./app/client.jsx:7:9
Ecmascript file had an error
   5 |     <form
   6 |       action={async () => {
>  7 |         "use server";
     |         ^^^^^^^^^^^^
   8 |         console.log("boom");
   9 |       }}
  10 |     >

It is not allowed to define inline "use server" annotated Server Actions in Client Components.
To use Server Actions in a Client Component, you can either export them from a separate file with "use server" at the top, or pass them down through props from a Server Component.

Read more: https://nextjs.org/docs/app/api-reference/directives/use-server#using-server-functions-in-a-client-component


Import trace:
  Server Component:
    ./app/client.jsx
    ./app/page.jsx
```
