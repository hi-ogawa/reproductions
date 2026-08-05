'use client'

import { useState } from 'react'

export function InlineDirectiveClient(props: {
  action: (formData: FormData) => Promise<void>
  executionCount: number
  result: string
}) {
  const [submissions, setSubmissions] = useState(0)

  return (
    <form
      action={props.action}
      data-testid="inline-directive"
      onSubmit={() => setSubmissions((value) => value + 1)}
    >
      <h1>Inline directive</h1>
      <p>
        <label>
          Message: <input name="message" defaultValue="hello" />
        </label>
      </p>
      <p>
        <button>Call cached function</button>
      </p>
      <p>
        Submission count:{' '}
        <output data-testid="submission-count">{submissions}</output>
        <br />
        Execution count:{' '}
        <output data-testid="execution-count">{props.executionCount}</output>
        <br />
        Result: <output data-testid="result">{props.result}</output>
      </p>
    </form>
  )
}
