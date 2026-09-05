# The DESIGN.md Artifact: A Project's Design System of Record

A production-ready app doesn't keep its design system in someone's head — it writes it down.
DesignSoul produces and maintains a single `DESIGN.md` at the project root: the source of truth
for every color, font, spacing value, motion rule, and the *reasoning* behind them.

> This is where the system you extract in `design-context.md` gets committed. Every later design
> task — and every design review — is **calibrated against this file**. A choice documented here
> as intentional is never flagged as a problem.

---

## Why it matters

- **Consistency over time:** the next session (or teammate) builds against the same system instead of reinventing it.
- **Calibration:** reviews judge work against *this project's* decisions, not generic defaults. A bold brand purple that's documented here is a feature, not slop.
- **Decisions survive:** the log records *why* a choice was made, so it isn't silently undone later.
- **It's the production bar:** "is the design done?" becomes checkable — every section below is filled, and the UI matches it.

---

## When to create / update it

- **Create** it the first time you do real design work on a project, right after gathering context (`design-context.md`) and before building components.
- **Update** it whenever a system-level decision changes (a new accent, a font swap, a new elevation level) — and append to the Decisions Log.
- If a `DESIGN.md` (or `design-system.md`) already exists, **read it first** and treat it as law; extend rather than overwrite.

---

## The Template

Fill every section. Empty sections mean the system is incomplete.

```markdown
# Design System — <Project>

## Product Context
- What this is: <one line>
- Who it's for: <audience>
- Space/industry: <domain + peer products>
- Project type: <marketing site / dashboard / app / docs / …>

## Aesthetic Direction
- Direction: <named direction — e.g. industrial/utilitarian, warm editorial, playful>
- Decoration level: <minimal / intentional / expressive>
- Mood: <2–3 sentences — what should the user feel>
- Reference sites: <real products this draws from>

## Typography
- Display/Hero: <family + weights + why this, not Inter-by-default>
- Body: <family + weights>
- UI/Labels: <family>
- Mono/Data: <family — if used>
- Loading: <Google Fonts / self-host; use display=swap>
- Scale: <hero / h1 / h2 / h3 / body / small / caption — explicit px or clamp()>

## Color
- Approach: <restrained / expressive; what gets the accent>
- Primary (light / dark): <hex or oklch, both modes>
- Accent / semantic: success / warning / error / info
- Neutrals: <the tinted gray ramp — base, surface, border, text tiers>
- Dark mode: <default? token shifts>

## Spacing
- Base unit: <4px>
- Density: <comfortable / compact / spacious>
- Scale: <xs … 3xl with px values>

## Layout
- Approach: <grid-disciplined / editorial / bento>
- Grid: <columns at breakpoints>
- Max content width: <px>
- Border radius: <sm/md/lg/full + which components use which>

## Motion
- Approach: <minimal-functional / expressive>
- Easing: enter / exit / move (curves, from motion.md)
- Duration: micro / short / medium / long
- Signature animated elements: <the few that carry the product's feel>

## Signature / Texture (optional)
- <Any distinctive material touch — grain, noise, glow, etc. — that prevents generic-template sameness>

## Mascot / AI-Agent Avatar System (optional)
- Character archetype: <name + physical/elemental theme + personality>
- Visual language: <polished 2D pixel art, 8/16-bit chunky clusters, crisp edges, no anti-aliasing>
- Palette: <5–8 strict colors: outline, visor base, body base, shadow, highlight, eye glow>
- Eye expression language: <vertical bars, horizontal beam, heart shapes, arches, sensor meter>
- Five universal states: <idle, listening, thinking, speaking, reaction choreography & FPS>
- Delivery: <discrete PNG frames, nearest-neighbor canvas rendering, reduced-motion freeze>
- See: references/pixel-agent-mascot-animation.md

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| <date> | <what was decided> | <why — including options rejected> |
```

---

## Rules

- **One source of truth.** Components reference these tokens; nothing is hardcoded that contradicts this file.
- **Calibrate everything to it.** When reviewing or auditing, a pattern documented here as intentional is *not* a finding. (See `code-audit.md`.)
- **Log the trade-offs.** The Decisions Log captures rejected options too — that's what stops a later session from "fixing" a deliberate choice.
- **Keep it honest.** If a section is a placeholder (no real brand color yet), say so rather than inventing finality.
- **Production check:** the design is "done" when every section is filled and the rendered UI verifiably matches it.
