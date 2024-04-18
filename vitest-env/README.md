- https://github.com/vitest-dev/vitest/issues/5525

```sh
npm run test
{
  'import.meta.env.PROD': true,
  'import.meta.env.DEV': true,
  'import.meta.env.SSR': true,
  'process.env.PROD': 'false',
  'process.env.DEV': 'true',
  'process.env.SSR': '1'
}

npm run test -- --pool vmThreads --disable-console-intercept
{
  'import.meta.env.PROD': true,
  'import.meta.env.DEV': true,
  'import.meta.env.SSR': false,
  'process.env.PROD': 'false',
  'process.env.DEV': 'true',
  'process.env.SSR': undefined
}
```
