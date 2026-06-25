# DesignSoul Test Cases

This directory validates that the skill actually works. Each test case is a small,
self-contained UI that exhibits the "AI-generated" problem DesignSoul is meant to fix,
plus the expected after-state and notes on what changed and why.

## Why this exists

A skill is only as good as its results. These fixtures let you:
- Manually verify the skill produces real improvement (run the before through the skill, compare to after)
- Spot regressions when the reference files change
- Serve as concrete examples the model can learn the target quality from

## Structure

```
test-cases/
├── README.md                  ← this file
└── <case-name>/
    ├── before.html            ← the AI-default version (the problem)
    ├── after.html             ← the DesignSoul target (the fix)
    └── NOTES.md               ← what was wrong, what changed, which rules applied
```

Each `before.html` / `after.html` is standalone (inline CSS, no build step) so it opens
directly in a browser and works with the Playwright verification loop.

## How to run a test case

1. Open `before.html` — confirm it looks generic/AI-default.
2. Ask the AI: *"Use DesignSoul to convert this to <style>"* pointing at `before.html`.
3. Compare the AI's output to `after.html` and the rubric in `references/verification.md`.
4. The output doesn't need to match `after.html` pixel-for-pixel — it needs to pass the
   same checklist and not look AI-generated.

## Status of cases

| Case | before | after | notes | Status |
|---|---|---|---|---|
| generic-card | ✅ | ✅ | ✅ | Done (reference example) |
| upload-dropzone | ✅ | ✅ | ✅ | Done (proves the Component Method on an unlisted component) |
| order-tracker (food delivery, moving scooter) | ⬜ | ⬜ | ⬜ | Pending |
| flight-tracker | ⬜ | ⬜ | ⬜ | Pending |
| navbar (default → scrolled → mobile) | ⬜ | ⬜ | ⬜ | Pending |
| form (input/select/checkbox states) | ⬜ | ⬜ | ⬜ | Pending |
| chat interface (bubbles, typing, scroll) | ⬜ | ⬜ | ⬜ | Pending |
| calendar / date picker | ⬜ | ⬜ | ⬜ | Pending |
| data table (sort/empty/loading) | ⬜ | ⬜ | ⬜ | Pending |
| empty + error states | ⬜ | ⬜ | ⬜ | Pending |
| pricing/bento feature section | ⬜ | ⬜ | ⬜ | Pending |

A test runner in `_runner/` validates link consistency and renders fixtures in a real
browser (Playwright). See `_runner/README.md`.

Contributions: add a new `<case-name>/` folder following the structure above and update this table.
