export default function Page() {
  return (
    <main>
      <h1>Server-reference argument reproduction</h1>
      <p>Use the navigation above to exercise three related cases:</p>
      <ol>
        <li>On Page A, save action A and then navigate to Page B.</li>
        <li>
          On Page B, calling saved A directly succeeds, while passing it to
          action B fails during argument decoding.
        </li>
        <li>
          On Nested control, passing one route-local action to another succeeds
          because the page can resolve both references.
        </li>
      </ol>
    </main>
  )
}
