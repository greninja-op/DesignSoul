# Eval case: portal-dashboard

- **Date:** 2026-06-25
- **Editor / model:** _(fill in meta.json — keep the model identical for control + after)_
- **Stack:** _(html-css / react-next / tailwind / vue)_
- **Style / ask:** _(e.g. "convert to liquid glass" or "make this not look AI-generated")_
- **Prompt used:** _(paste the exact prompt)_
- **Mentioned DesignSoul?** _(no = testing auto-trigger)_
- **Did the agent open SKILL.md / references before editing?** _(yes / no — the activation test)_

---

## Screenshots
Drop images in `screenshots/` and reference them here (name them `before-375.png`, `after-1440.png`, etc.).

| | 375px | 768px | 1440px |
|---|---|---|---|
| before | | | |
| control (no skill) | | | |
| after (DesignSoul) | | | |

---

## Auto: slop / craft signals
_(filled by `node analyze.mjs portal-dashboard` — do not edit by hand)_

<!-- AUTO:METRICS -->
_Run `node analyze.mjs portal-dashboard` to populate._
<!-- /AUTO:METRICS -->

---

## Auto: code diff (before → after)
<!-- AUTO:DIFFSTAT -->
_Run `node analyze.mjs portal-dashboard` to populate._
<!-- /AUTO:DIFFSTAT -->

---

## Craft scores (you fill these — 1 to 10)
Score the rendered result on `critique.md`'s five dimensions. Fill the SCORES block below so
`summary.mjs` can roll it up. Leave a value blank if you didn't run that version.

<!-- SCORES
control: style=, hierarchy=, craft=, functionality=, originality=
designsoul: style=, hierarchy=, craft=, functionality=, originality=
-->

- **Style fidelity** — does it actually look like the requested style/personality?
- **Hierarchy** — passes the squint test; clear focal point?
- **Craft** — spacing/tokens/depth/motion feel intentional, not default?
- **Functionality** — real states (hover/focus/error/empty/loading), accessible?
- **Originality** — distinctive, or the generic AI template?

---

## Anti-pattern check
Open `references/anti-patterns.md` and tick any that STILL apply to the `after`:
- [ ] default blue / Inter-only / uniform 8px radius / `0 2px 4px` shadow
- [ ] generic centered hero / 3-column footer / fade-everything
- [ ] placeholder or lorem content / vague microcopy
- [ ] missing focus states / poor contrast / no reduced-motion

## Did it follow the method? (yes/no)
- [ ] Decided a personality / gathered context first
- [ ] Used a token system (no hardcoded values bypassing it)
- [ ] Applied the checklist before finishing
- [ ] If no browser tool: it *said* the output was not visually verified
- [ ] Large codebase: went system-first (tokens + primitives), didn't stall

---

## Failure notes (the most valuable part)
What still looked AI-made? Which reference did the agent ignore? Any component handled badly?
_(These become new anti-patterns / fixes.)_
