# Eval case: portal-glass

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
_(filled by `node analyze.mjs portal-glass` — do not edit by hand)_

<!-- AUTO:METRICS -->
| Version | Files | AI-default signals (↓ better) | Craft signals (↑ better) | Hardcoded hex |
|---|---|---|---|---|
| before | 51 | 6 | 3 | 49 |
| control (no skill) | 0 | 0 | 0 | 0 |
| **after (DesignSoul)** | 51 | 6 | 109 | 58 |

- before: **51 files** · AI-default signals **6** (transition_all ×5, outline_none ×1) · craft signals **3** (aria_attrs ×3) · 49 hardcoded hex, 0 @media
- control: **0 files** · AI-default signals **0** (none) · craft signals **0** (none) · 0 hardcoded hex, 0 @media
- after: **51 files** · AI-default signals **6** (transition_all ×2, inter_font_only ×1, outline_none ×2, scale_hover_1_05 ×1) · craft signals **109** (css_tokens_var ×99, focus_visible ×1, reduced_motion ×1, aria_attrs ×2, modern_css ×6) · 58 hardcoded hex, 1 @media

_Generated 2026-06-25T21:17:07.418Z. Signals are heuristic proxies, not a verdict — pair with the screenshots and the craft scores below._
<!-- /AUTO:METRICS -->

---

## Auto: code diff (before → after)
<!-- AUTO:DIFFSTAT -->
```
.../index.html"                                    |   5 +
 .../src/components/AnimatedDatePicker.jsx"         |  14 +-
 .../src/components/AssignmentDatePicker.jsx"       |  32 +-
 .../src/components/CalendarDatePicker.jsx"         |  12 +-
 .../src/components/ConfirmDialog.jsx"              |  12 +-
 .../src/components/CustomAlert.jsx"                |  12 +-
 .../src/components/CustomSelect.jsx"               |  20 +-
 .../src/components/FeeDatePicker.jsx"              |  30 +-
 .../src/components/ImageCropper.jsx"               |  50 +-
 .../src/components/Navigation.jsx"                 |  18 +-
 .../src/components/SemesterMarksForm.jsx"          |  46 +-
 .../src/components/ThemeToggle.jsx"                |   2 +-
 .../src/index.css"                                 | 576 +++++++++++----------
 .../src/pages/AdminDashboard.jsx"                  | 176 +++----
 .../src/pages/Analysis.jsx"                        |  56 +-
 .../src/pages/Dashboard.jsx"                       |  76 +--
 .../src/pages/Login.jsx"                           |  22 +-
 .../src/pages/Notice.jsx"                          |  34 +-
 .../src/pages/Payments.jsx"                        |  48 +-
 .../src/pages/Result.jsx"                          |  40 +-
 .../src/pages/Results.jsx"                         |  46 +-
 .../src/pages/StudentAssignments.jsx"              |  66 +--
 .../src/pages/StudentAttendance.jsx"               |  92 ++--
 .../src/pages/StudentMaterials.jsx"                |  80 +--
 .../src/pages/Subjects.jsx"                        |  34 +-
 .../src/pages/TeacherAssignments.jsx"              | 102 ++--
 .../src/pages/TeacherAttendance.jsx"               |  68 +--
 .../src/pages/TeacherDashboard.jsx"                |  80 +--
 .../src/pages/TeacherMarks.jsx"                    |  88 ++--
 .../src/pages/TeacherNotice.jsx"                   |  24 +-
 .../src/pages/TeacherStudentList.jsx"              | 142 ++---
 .../src/pages/TeacherUploadMaterials.jsx"          |  68 +--
 .../src/pages/TeacherViewMaterials.jsx"            |  48 +-
 .../src/pages/TeacherViewResults.jsx"              |  50 +-
 .../src/pages/admin/AdminAddTeacher.jsx"           | 102 ++--
 .../src/pages/admin/AdminCourses.jsx"              | 102 ++--
 .../src/pages/admin/AdminFeeManagement.jsx"        | 142 ++---
 .../src/pages/admin/AdminNotices.jsx"              |  80 +--
 .../src/pages/admin/AdminStudents.jsx"             | 188 +++----
 .../src/pages/admin/AdminTeachers.jsx"             | 144 +++---
 .../src/pages/admin/AdminUploadMaterials.jsx"      |  86 +--
 .../tailwind.config.js"                            |  53 +-
 42 files changed, 1621 insertions(+), 1545 deletions(-)
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

## Signal triage (refined scanner)
With the refined scanner (excludes debug/test files; counts `default_blue` only in CSS/markup, not
JS data/chart arrays), signals are **before 6 → after 6**. The earlier "10 → 10" was inflated by
false positives now auto-removed: the chart palette in `StudentAttendance.jsx` and the 8px radii in
`public/debug-storage.html`.

Remaining after-signals are minor, real-ish leftovers worth a cleanup sweep:
- `transition: all` ×2 (down from 5) — should be specific properties (`polish.md`).
- `scale(1.05)` hover ×1 — the AI-default hover (`anti-patterns.md`).
- `outline: none` ×2 — verify each pairs with a visible `:focus-visible` ring (`accessibility.md`).
- `inter_font_only` ×1 — the deliberate **Sora + Inter** body pairing, not Inter-by-default (fine).

These slipping through a whole-frontend pass is exactly why a **final anti-pattern sweep** was added
to the conversion close-out (`large-codebases.md` Phase 8).

## Headline result (code-level)
- **CSS design tokens: 0 → 99** `var(--…)` usages; **craft signals 3 → 109**; modern CSS 0 → 6;
  reduced-motion 0 → 1; `:focus-visible` 0 → 1; **92** glass/backdrop-filter hits in `index.css`.
- `frontend/DESIGN.md` persisted (source of truth). Activation pointer `.kiro/steering/designsoul.md` committed.
- **Verdict:** a real, consistent, system-first conversion — validates the skill's core claim at the
  code level. The primary-blue / flat-shadow tells are gone; what the scanner still flags is mostly
  intentional (chart colors, debug page, paired body font).

## Did it follow the method? (verified from code)
- [x] System-first (token layer + primitives), did not stall — `large-codebases.md`
- [x] Used a token system (99 `var()` usages; not hardcoded sprawl)
- [x] Wrote a `DESIGN.md` source of truth
- [x] Honest handoff: reported build passes / no new deps, and **said it was not visually verified**
- [ ] Visual verification loop — NOT run (no browser tool); the agent flagged contrast risks itself

## Pending (needs the screenshots)
Visual craft scores (style fidelity, hierarchy, craft-as-rendered) and the contrast checks the
agent flagged (colored hero/banners; glass over light mesh) — can't be scored without the pixels.

## Failure notes (the most valuable part)
- Scanner false-positives on semantic/chart blues, debug pages, and paired body fonts → consider
  excluding obvious non-app paths (`**/debug*`, vendor) and noting chart palettes are exempt.
- Minor AI-default leftovers (transition:all, scale(1.05), outline:none) slipped through a "whole
  frontend" pass — a final anti-pattern grep-sweep should be part of the conversion close-out.
