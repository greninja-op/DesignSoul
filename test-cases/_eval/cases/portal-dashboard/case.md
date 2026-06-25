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
| Version | Files | AI-default signals (↓ better) | Craft signals (↑ better) | Hardcoded hex |
|---|---|---|---|---|
| before | 51 | 6 | 109 | 58 |
| control (no skill) | — | — | — | — |
| **after (DesignSoul)** | 51 | 6 | 109 | 58 |

- before: **51 files** · AI-default signals **6** (transition_all ×2, inter_font_only ×1, outline_none ×2, scale_hover_1_05 ×1) · craft signals **109** (css_tokens_var ×99, focus_visible ×1, reduced_motion ×1, aria_attrs ×2, modern_css ×6) · 58 hardcoded hex, 1 @media
- control: _(folder empty)_
- after: **51 files** · AI-default signals **6** (transition_all ×2, inter_font_only ×1, outline_none ×2, scale_hover_1_05 ×1) · craft signals **109** (css_tokens_var ×99, focus_visible ×1, reduced_motion ×1, aria_attrs ×2, modern_css ×6) · 58 hardcoded hex, 1 @media

_Generated 2026-06-25T22:31:03.087Z. Signals are heuristic proxies, not a verdict — pair with the screenshots and the craft scores below._
<!-- /AUTO:METRICS -->

---

## Auto: code diff (before → after)
<!-- AUTO:DIFFSTAT -->
```
(no before/after to diff yet)
```
_Full patch: `diff.patch` (gitignored by default)._
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

## Human verdict + visual critique (redesign test)
**Result: a real redesign, not a reskin — "day and night" improvement.** Owner happy; estimates it
now reads ~25–50% human (up from fully-AI). Layout genuinely changed: greeting + date header,
a real metric row (attendance w/ progress, CGPA, fees highlighted as the action), clean
"you're all caught up" empty state, quick-access list, floating nav. Confirms the core lesson:
**redesign works; reskin only helps an already-good design.** (Code diff not pushed to dev yet —
judged from screenshots.)

**What still reads as AI (the iteration roadmap toward "100% human"):**
1. **Three equal stat tiles in a perfectly even row** — the uniform-card-grid reflex. Make one the
   hero (deliberate size/weight variation — bento). (`visual-hierarchy.md`, `styles/bento.md`)
2. **Symmetric 2-column split** (Notice board | Quick access) — even/predictable. Break symmetry
   intentionally. (`layout-grids.md`)
3. **"Modern SaaS on a soft gradient" with no opinion** — pleasant but generic; lacks a signature
   detail or real brand character. Push personality harder. (`personality.md`)
4. **Generic icons + chevrons; safe copy** — distinctive type treatment and one characterful accent
   moment would lift it.
5. **Generic widgets, not contextual content** — a real student dashboard could compose around
   *today's classes / recent grades / timetable glance*, so it feels designed for this user, not
   assembled from default cards.

**Next iteration:** push hierarchy (one hero), asymmetry, genuine personality + a signature detail,
and contextual content composition. Iterate until the squint test + the "a human made this" bar pass.

## Iteration 2 — regressed (key learning: iteration isn't monotonic)
A more aggressive pass (oversized underlined "Test" hero, "Recent marks" list added, busier/lopsided
right column) read **worse** than the prior version per the owner ("the last one was the best"). Also
the fixed bottom nav appeared over the marks list (likely a full-page-screenshot artifact of a
`position:fixed` bar — but a real bug if it overlaps at viewport: must reserve `padding-bottom`).
Learnings folded into the skill:
- SKILL.md Step 5b: **iteration is not monotonic** — keep the previous best as baseline, change only
  the weak parts, compare and keep whichever is genuinely better; don't regenerate wholesale.
- anti-patterns.md: **fixed/floating bars must reserve space** (no content overlap).
- Reinforces that **blind redesign (no visual loop) ships hard-to-see regressions** — wire Playwright.
**Recovery:** revert to the prior best and iterate surgically.
