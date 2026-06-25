# Design Context: Start From What Already Exists

**This is the single most important idea in DesignSoul.**

Great high-fidelity design almost never comes from a blank page. It grows out of context that
already exists — the user's design system, their codebase, their live product, their brand.
**Designing from scratch is the last resort, and it reliably produces generic output.** So
every design task starts with one question: *is there anything to anchor this to?*

> A project's design ceiling is set by the quality of the context you gather. Ten minutes of
> collecting real context beats an hour of inventing hi-fi from imagination.

---

## What counts as Design Context (highest priority first)

1. **The user's design system / UI kit** — existing component library, color tokens, type
   scale, icon set. The ideal case. Use it verbatim.
2. **The user's codebase** — living component implementations. Read them and lift *exact* values:
   `theme.ts`, `tokens.css`, `_variables.scss`, `tailwind.config`, real components
   (`Button.tsx`, `Card.tsx`), layout shells, global stylesheets.
3. **The user's live product** — if shipped but no code given, screenshot it (Playwright) or
   ask for screenshots to read the real visual vocabulary.
4. **Brand guidelines / logo / assets** — brand colors, marketing material, logo style.
5. **Competitor / reference products** — "make it like X" → ask for the URL or a screenshot.
   Never work from a fuzzy memory of what X looks like.
6. **A known design system (fallback)** — Apple HIG, Material 3, Radix Colors, shadcn/ui,
   Tailwind defaults. State clearly which one you're using as the starting point.

---

## The flow

### Step 1 — Ask
At the start of a task, ask the essentials:
- Do you have a design system / UI kit / component library? Where?
- Any brand guidelines or color/font specs?
- Can you share a screenshot or URL of the existing product?
- Is there a codebase I can read?

### Step 2 — If they say "no," help them find it
Don't give up and go generic. Probe:
- Do earlier projects have related design?
- What colors/fonts does the marketing site use?
- What's the logo style — can you share it?
- Any product you admire as a reference?

### Step 3 — Read everything you can find
If given a codebase:
1. List the file structure; find theme/token/component files.
2. Read the token/theme files and lift exact hex/px values.
3. Read 2–3 representative components for the real visual vocabulary (hover, shadow, border, padding rhythm).
4. Read the global stylesheet (resets, font loading).
5. If there's a Figma link or screenshots, look — but **trust the code over the picture**.

> You haven't really lifted the system until you have 30+ concrete values written down.
> Don't glance once and design from impression.

### Step 4 — Vocalize the system, then confirm
Before building, state the system you extracted and get a thumbs-up:

```
From your codebase + product, the system I'll use:
COLORS    primary #C27558 · bg #FDF9F0 · text #1A1A1A · muted #6B6B6B
TYPE      display Instrument Serif · body Geist Sans · mono JetBrains Mono
SPACING   4 · 8 · 12 · 16 · 24 · 32 · 48 · 64
SHADOW    subtle 0 1px 2px rgba(0,0,0,.04) · elevated 0 10px 40px rgba(0,0,0,.1)
RADIUS    chips 4px · cards 12px · buttons 8px
Confirm and I'll build to this.
```

This check-in prevents "built half of it the wrong direction."

---

## When there is genuinely no context (fallback)

State plainly that quality will drop:

> You don't have design context, so I'll work from general instinct. The result will look
> "fine but unremarkable." Want to continue, or add a reference first?

If they continue, make deliberate decisions instead of defaulting:
1. **Pick one aesthetic direction** and name it (editorial, brutalist, organic, luxury, playful, retro-futuristic, soft…). Don't produce a generic average.
2. **Pick a known system as the skeleton** — Radix Colors for palette, shadcn/ui for component vocabulary, a 4px spacing scale.
3. **Pick a characterful font pairing** (not Inter/Roboto by default — see `typography.md`).
4. **Comment every key decision** in the code so the reasoning is visible.

---

## Codebase import strategy (by size)

- **Small (<50 files):** read it all, internalize the context.
- **Medium (50–500):** focus on `components/`, all token/theme/style files, and 2–3 representative full-page components.
- **Large (>500):** ask the user to point you at the area ("the settings page", "a new feature"), read the shell + the nearest existing reference. Aim for accurate, not exhaustive.

---

## Working with Figma

- Don't expect to convert a Figma link directly to code — links are usually private and need tooling.
- Ask the user to export **screenshots** plus the concrete values (hex, px), or use Figma's "export as code."
- You can read the visual from a screenshot, but you can't pull exact values from it — get those explicitly.

---

## The takeaway

When there's no context, **ask for it before charging ahead**. The context-gathering is not
overhead — it is the design work that makes the difference between "looks AI-made" and "looks
like it belongs to this product."
