export default function Page() {
  return (
    <main>
      <h1>Nested Server Function reproduction</h1>
      <p>Use the navigation above to exercise two delivery paths:</p>
      <ol>
        <li>
          On Client import, the Client Component imports the parent action
          directly. Calling the returned nested action fails.
        </li>
        <li>
          On Server Component prop, the Server Component passes the parent
          action to the client. Calling the returned nested action succeeds.
        </li>
      </ol>
    </main>
  )
}
