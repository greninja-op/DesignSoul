# Converting Large Codebases Without Burning the Context Window

The naive way to restyle a whole frontend is to read every component file, hold them all in
context, and rewrite each one. On anything past a few screens this blows the context window, gets
slow and expensive, and quality drops as the model juggles too much at once.

The professional way is the opposite: **convert the system, not the files.** Most of a redesign
lives in a small number of shared places (tokens + primitives). Change those and the change
cascades. Done right, the cost of a conversion is roughly *independent of how many files the
project has*.

Read this whenever the task is "redesign/convert an existing multi-file frontend" rather than a
single component or page.

> The mental model: a naive conversion is `O(read every file × every reference)` — it explodes.
> A system-first conversion is `O(1 token layer + a few primitives + M straggler hits)` — small,
> and mostly flat as the codebase grows.

---

## The context-budget rule (the one discipline that matters)

At any moment, keep only this in context:
- the **design system** (the tokens / `DESIGN.md`),
- the **old→new mapping table**,
- the **one file (or few) you're transforming right now**,
- the **progress manifest** (what's done, what's left).

Everything else is discovered on demand and dropped. Concretely:
- **Grep to discover; read only to transform.** Never read a file just to "see what's there" —
  search for the thing you need. Read a file's full contents only at the moment you rewrite it,
  then let it fall out of context.
- **Load references progressively** (already the rule in `SKILL.md` Step 0) — pull a style or
  craft file only when that step needs it.
- **Fan out with sub-agents.** Hand a single file (or a small batch) to a sub-agent with the
  mapping + target style; it returns a diff/summary. The file's full contents stay in the
  sub-agent's context, not the main thread. This is the biggest single lever for staying within
  budget on big jobs.

---

## Phase 1 — Map cheaply (scan, don't read)

Build an inventory from search results, not file reads. Cost is a few grep outputs, not N files.

- **Where do tokens live?** Look for a single source of truth before assuming there isn't one:
  `tailwind.config.*`, `theme.ts/js`, `tokens.css`, `_variables.scss`, `:root{--…}`, a styled
  components theme, CSS modules.
- **What's hardcoded?** Grep the patterns that a restyle must change:
  - colors: `#[0-9a-fA-F]{3,8}`, `rgb(`, `hsl(`
  - type: `font-family`, `font-size`
  - shape/depth: `border-radius`, `box-shadow`
  - motion: `transition`, `@keyframes`, `ease`
- **What components exist, and how reused?** List component files; grep import counts to find the
  high-reuse primitives (a `<Button>` imported 60 times is worth converting first).

Write this inventory down (a short table) — it's your work plan and it survives context
compaction.

```
# examples (ripgrep)
rg -n "#[0-9a-fA-F]{6}" src --glob '*.{css,tsx,jsx,vue}' | wc -l   # how many hardcoded colors
rg -l "font-family" src                                            # files with hardcoded type
rg -n "box-shadow" src                                             # every shadow to replace
rg -c "from .*/Button" src                                         # how reused is the Button primitive
```

### Optional accelerator — a code knowledge-graph

On a genuinely large repo, this mapping step can be made even cheaper if the user has a **code
knowledge-graph tool** installed — a separate, locally-run utility that parses the project once
into queryable nodes (files, components, functions) and edges (imports, calls, depends-on). The
agent then *queries the graph* ("what imports `Button`?", "where are the theme tokens defined?",
"what depends on this file?") instead of grepping and reading — which can sharply cut cross-file
navigation cost on big codebases.

Treat it as **optional infrastructure, never a DesignSoul dependency:**
- It's the user's choice to install; DesignSoul stays zero-dep and framework-agnostic and never
  bundles or auto-installs it.
- It accelerates **navigation and understanding** — not the design work. The token-layer-first
  conversion below is still what actually does the restyling; the graph just helps you find the
  token layer and the high-reuse primitives faster.
- The graph **goes stale** when code changes and must be re-indexed; don't trust an old one.
- It's **overkill on small/medium projects** — plain grep (above) is enough there.

If such a tool is present in the user's setup, use it for this Phase-1 inventory and the
"which primitives are most reused" question. If not, grep does the job — don't add a dependency
just to map a codebase.

---

## Phase 2 — Find or create the single source of truth

The whole strategy hinges on this:

- **If tokens are centralized** (CSS variables, Tailwind theme, a theme object): you're in luck.
  Rewriting that one layer reskins everything that *uses* it. This is the cheapest possible path.
- **If they're not** (values hardcoded everywhere): your *first* job is to introduce a token
  layer — define the new tokens once, then route components through them as you go. You're not
  just restyling; you're paying down the debt that made it expensive in the first place.

Either way, the deliverable of this phase is **one place** that holds the new look.

---

## Phase 3 — Rewrite the token layer once

Apply the new design system (from `SKILL.md` Step 2 + the relevant style/`spacing`/`depth`/`color`
references) to that single source of truth: palette, type scale, spacing scale, radius, elevation,
motion. Most of the visual transformation lands here, in one edit, affecting every screen that
reads from it.

---

## Phase 4 — Map old → new, then sweep stragglers

Build a tiny deterministic mapping table once:

```
#3B82F6  → var(--color-primary)
#1F2937  → var(--color-text)
8px      → var(--radius-md)
0 2px 4px rgba(0,0,0,.1) → var(--shadow-1)   (soft/tinted/layered — see depth.md)
'Inter'  → var(--font-body)
```

Then **grep for each old value and replace the hits** — you're transforming *occurrences*, not
loading whole files into context to eyeball them. After the sweep, a grep for the old values
should return zero. Anything that can't be mechanically mapped (it's genuinely bespoke) goes on the
per-screen list for Phase 6.

---

## Phase 5 — Convert the shared primitives first

Restyle the high-reuse building blocks before any page: Button, Input/Field, Card, Nav/Header,
Modal, Badge, Tabs. Roughly ten primitives carry most of what the user sees, so converting them
covers most screens at once (run each through the `component-method.md` passes). Do these well and
the app already looks 80% converted.

---

## Phase 6 — Bespoke screens, one isolated batch at a time

For layouts that aren't just primitives + tokens (a marketing hero, a dashboard, a specialty
tracker), handle them **one at a time**, not all loaded together:
- Pull in one screen's files, transform, produce the diff, drop it.
- Prefer delegating each to a **sub-agent** so its file contents never enter the main context.
- Tick it off the manifest before starting the next. If scope exceeds what one pass can guarantee,
  say so and stop at a clean boundary rather than half-converting everything.

---

## Phase 7 — Persist state (survive compaction)

Two artifacts let you resume without re-reading the world:
- **`DESIGN.md`** — the new system (tokens, decisions). See `design-system-doc.md`.
- **A conversion manifest** — the inventory from Phase 1 + the old→new map + a checklist of
  primitives/screens with status (done / left). This is your memory; update it as you go so a
  fresh context (or a teammate) can pick up exactly where you stopped.

---

## Phase 8 — Verify by sampling, not by reloading everything

Don't re-read every file to check the result. Instead:
- **Grep** for the old values and for hardcoded bypasses — zero hits is the proof the token layer
  is doing the work.
- **Render a few representative screens** (a primitive-heavy page, a bespoke page, a form) at the
  three viewports and critique them (`verification.md`). If the shared layer is right, the
  un-sampled screens are almost certainly right too.

---

## When to tell the user it won't fit one pass

Be honest about scale (see `SKILL.md` limits). If the project is large enough that even the
system-first path exceeds a single pass, say so, convert in prioritized batches (tokens →
primitives → top screens first), and hand back a manifest of what's converted and what remains —
rather than silently doing a shallow job on everything.

---

## Checklist

- [ ] Inventory built from grep (tokens location, hardcoded values, primitives + reuse) — not full reads
- [ ] Single source of truth found or created; the new look lives in one place
- [ ] Token layer rewritten once; most of the change cascades from there
- [ ] Old→new mapping table written; stragglers swept by search/replace (old values now grep to zero)
- [ ] Shared primitives converted before bespoke screens
- [ ] Bespoke screens done one isolated batch at a time (sub-agents where possible)
- [ ] `DESIGN.md` + conversion manifest kept up to date (resumable after compaction)
- [ ] Verified by grep + sampled renders, not by reloading every file
- [ ] If it exceeds one pass, the user was told and given a converted-vs-remaining manifest

Pairs with: `design-context.md` (find existing tokens), `design-system-doc.md` (DESIGN.md),
`component-method.md` (per-primitive passes), `code-audit.md` (grep-level scanning), `verification.md`
(sampled rendering), `spacing.md`/`depth.md`/`color-theory.md` (what the new token layer holds).
