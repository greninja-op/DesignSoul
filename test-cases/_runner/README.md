# DesignSoul Test Runner

Automated validation for the skill. Two layers:

- **`check-links.mjs`** — structural consistency. Verifies every ``references/...md`` link in
  every markdown file resolves to a real file, and that every style file is registered in `_index.md`.
- **`verify.mjs`** — live browser verification (Playwright/Chromium). Renders each fixture at
  375 / 768 / 1440px, saves screenshots to `artifacts/`, and asserts the `verification.md` rubric:
  - DesignSoul outputs have **no** horizontal overflow and **no** console errors
  - "before" fixtures are confirmed to exhibit AI-default flaws (overflow, default blue) — proving the loop catches what the skill fixes
  - DesignSoul outputs contain **no** default blue (`#3B82F6` / `#2563EB`)
  - DesignSoul buttons have a visible focus state

## Run it

```bash
cd test-cases/_runner
npm run setup     # one time: installs Playwright + Chromium
npm test          # runs both check-links and verify
```

`node_modules/` and `artifacts/` are gitignored (regenerable). The `.mjs` scripts and this
README are the committed, reproducible part.

## Latest result (recorded manually)

```
check-links: ✅ 40 links + 13 style files OK
verify:      ✅ all fixtures pass; (expected) before/dropzone overflows 69px at 375px
             12 screenshots written to artifacts/
```

> Note: these are *programmatic* checks (overflow, console, computed styles, focus). They
> prove structure and catch the measurable anti-patterns. Pixel-level aesthetic judgement
> still needs a human or a vision-capable agent reviewing the screenshots in `artifacts/`.
