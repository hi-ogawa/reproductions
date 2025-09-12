# font optimization

Preprocess Google Font CSS and inject `<link rel="preload" as="font" ... />` to imporove font loading performance.

## Example

```js
export default defineConfig({
  plugins: [
    googleFontPlugin({
      fonts: [
        "https://fonts.googleapis.com/css2?family=Roboto:wght@100..900&display=swap",
      ],
      subsets: ["latin"]
    }),
  ]
})
```

```jsx
import Font from "virtual:font"

function Layout() {
  return (
    <>
      <Font />
      ...
    </>
  )
}
```

`virtual:font` internally works as:

```jsx
import "virtual:font.css" // concatenated font css 

export default function Font() {
  return <>
    <link
      rel="preload"
      as="font"
      type="font/woff2"
      href="https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxM.woff2"
      crossOrigin="anonymous"
    />
  </>
}
```

## references

- https://nextjs.org/docs/app/api-reference/components/font
- https://nuxt.com/modules/fonts
- https://docs.astro.build/en/reference/experimental-flags/fonts/
