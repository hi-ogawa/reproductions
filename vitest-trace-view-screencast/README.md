# Trace View Screencast Demo

This React fixture exercises an isolated date-range picker through `vitest-browser-react`. The component lives in `src/demo.tsx`, while `src/demo.test.tsx` contains three Browser Mode scenarios:

- `saves a valid date range` selects April 18–22 and passes.
- `rejects checkout before check-in` selects April 18–14 and fails because the component incorrectly reports `Dates saved`.
- `reviews the dark theme` applies a dark render wrapper, marks the initial component, opens the calendar, and passes.

https://github.com/user-attachments/assets/8cce6aa5-e84d-4483-9485-0e8c76143234

## Run

```sh
pnpm install
pnpm typecheck
pnpm test
```

The single-file HTML reporter writes all traces to `.vitest/index.html`. For the recording, open the report and click through the passing test first, then the failing test. The failed final state visibly shows check-in `18 Apr`, checkout `14 Apr`, and the incorrect `Dates saved` confirmation.

The Vitest packages use `5.1.0-beta.1`, the first release whose trace viewer has the Aria snapshot view. The guide screenshots in [vitest#11826](https://github.com/vitest-dev/vitest/pull/11826) come from the `saves a valid date range` test at the `click "18"` step.
