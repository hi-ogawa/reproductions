# Trace View Screencast Demo

This React fixture exercises an isolated date-range picker through `vitest-browser-react`. The component lives in `src/demo.tsx`, while `src/demo.test.tsx` contains three Browser Mode scenarios:

- `saves a valid date range` selects April 18–22 and passes.
- `rejects checkout before check-in` selects April 18–14 and fails because the component incorrectly reports `Dates saved`.
- `reviews the dark theme` applies a dark render wrapper, marks the initial component, opens the calendar, and passes.

https://github.com/user-attachments/assets/8cce6aa5-e84d-4483-9485-0e8c76143234

## Run

```sh
pnpm install --config.blockExoticSubdeps=false
pnpm typecheck
pnpm test
```

The single-file HTML reporter writes all traces to `.vitest/index.html`. For the recording, open the report and click through the passing test first, then the failing test. The failed final state visibly shows check-in `18 Apr`, checkout `14 Apr`, and the incorrect `Dates saved` confirmation.

The Vitest packages use the `pkg.pr.new` snapshots for commit `c36c4fd` from [vitest#11027](https://github.com/vitest-dev/vitest/pull/11027#issuecomment-5391793011), which preserves Trace Viewer split-pane sizes for easier recording. Installation requires `pnpm install --config.blockExoticSubdeps=false` because those snapshots reference their internal workspace packages through trusted `pkg.pr.new` URLs.
 
