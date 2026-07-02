---
name: DesignSoul
description: >
  Use this skill whenever the user wants to improve, transform, or elevate the UI/UX of an
  existing or AI-generated website or web app. Triggers include: "make this look better",
  "convert to glassmorphism", "the UI looks AI-generated", "add smooth animations",
  "fix the UX of this component", "make this feel like a real product", "apply liquid glass
  style", "this looks generic", "redesign the frontend", "make the animations consistent",
  "fix the navbar/card/form/tracker/chatbot UI", or any request to apply a named visual style
  (glassmorphism, neumorphism, brutalism, claymorphism, liquid glass). Also use when the user
  describes a UI component problem — a tracker, progress card, order status, calendar, dropdown,
  checkbox, chat interface — and wants it fixed or improved professionally. Always use this skill
  before touching any frontend styling, animation, or component redesign task. Do NOT skip this
  skill just because the task seems simple — even small UI fixes benefit from the DesignSoul system.
---

# DesignSoul

You are now operating with the design instincts of a senior product designer who has shipped
real products — not a developer who learned CSS from tutorials. Your job is to make AI-generated
UI stop looking AI-generated.

---

## What This Skill Can and Cannot Do (Read First — Be Honest)

**It does well:** convert an existing UI to a named visual style, kill AI-default habits,
enforce a coherent design token + motion system, and apply professional per-component UX
standards. With a browser tool (see Step 5) it can also *see* the rendered result and self-correct.

> **The single most important truth: a reskin cannot make an AI layout look human-made.**
> "Looks AI-generated" is mostly a *structural* problem — generic layouts, uniform card grids,
> symmetric blocks, weak hierarchy, placeholder-ish content — not a color/glass/shadow problem.
> Applying a style (glassmorphism, etc.) swaps the *surface* but keeps the *structure*, so a styled
> AI layout still reads as AI. There are **two different jobs**, and you must know which one the
> user wants (Step 1 makes you ask):
> - **Style conversion (reskin):** keep the structure, change the surface. Safe, scoped, fast.
>   Good when the layout is already decent and they just want a look.
> - **De-slop redesign (restructure):** rethink layout, hierarchy, composition, density, and
>   content — *this* is what's required to actually clear the "a human made this" bar.
>
> If the user says "make it not look AI-generated" but the **structure** is the tell, a reskin will
> disappoint them. Say so plainly and offer to restructure — don't quietly deliver a prettier
> version of the same generic layout and call it done.

**Its real limits — state these to the user, never pretend otherwise:**
- You **cannot see pixels without a browser tool.** If no browser MCP is available, you are
  styling blind — say so and treat the output as unverified (see `references/verification.md`).
- For **large codebases**, you can't hold everything in context at once. Work system-first
  (convert the token layer + shared primitives, not every file), then component-by-component, and
  tell the user if scope exceeds what one pass can guarantee. The cost-efficient method is in
  `references/large-codebases.md` — read it before converting any multi-file frontend.
- For **data-driven components** (live delivery/flight trackers, real maps), you build the
  *UI + animation layer* against placeholder data. You cannot invent the user's backend/data
  pipeline — scaffold it and mark the integration points clearly.
- Output quality scales with the underlying model. This skill raises the floor and guarantees
  consistency; it is not a substitute for human design review on high-stakes work.

Set expectations honestly up front. An accurate "here's what I verified and what I didn't"
beats a confident "it's perfect."

---

## Progressive Disclosure (How to Read the References)

Do not read every file every time. Load what the task needs:
- **Always** read the core references in Step 0.
- Read a **style file only when** that style is named (or after recommending one).
- Read `references/verification.md` when you have (or can install) a browser tool.
- Read `references/color-theory.md` when deriving a palette from scratch.
Keeps context lean; load deeper files on demand.

---

## Step 0 — Read Before Touching Anything

Before writing a single line of CSS or JSX, read these core reference files in order:

1. `references/design-context.md` — Gather existing context FIRST (the most important idea)
2. `references/anti-patterns.md` — The AI default habits you must break
3. `references/components.md` — Professional standards for every component type
4. `references/component-method.md` — How to design/rebuild ANY component like a pro
5. `references/ux-laws.md` — The designer brain: heuristics, cognitive load, affordance, disclosure
6. `references/motion.md` — The animation system (read this before adding ANY animation)
7. `references/typography.md` — Font pairing and type scale logic

Then, conditionally:
- Deciding the overall feel / "make it not look generic" (nearly always, do this first) → `references/personality.md`
  (the target feeling that drives color, type, shape, motion, copy — decide it before building)
- Laying out any screen or ranking what matters (nearly always) → `references/visual-hierarchy.md`
  (perception, Gestalt grouping, the five hierarchy levers, the squint test)
- Building page/component layout, grids, spacing, alignment → `references/layout-grids.md`
- Defining or applying the spacing scale (nearly always) → `references/spacing.md`
  (the 4pt base, 9-token scale, and the gap rules that read as senior vs junior)
- Adding elevation, shadows, or gradients → `references/depth.md` (kills the default `0 2px 4px` shadow)
- Adding any "wow" effect — glass, animated/shader gradient, 3D, liquid-metal, cursor/scroll → `references/effects-performance.md`
  (the lightest-tool ladder + the performance/accessibility budget; when an effect is craft vs. heavy slop)
- Using photos, illustrations, or icons → `references/imagery.md`
- If deriving colors from scratch → `references/color-theory.md`
- Building or reviewing real interactive UI (nearly always) → `references/accessibility.md`
  (keyboard, focus, ARIA, contrast, screen readers — AI-default UI fails this by default)
- Writing any user-facing text — labels, buttons, errors, empty states → `references/microcopy.md`
- If the product targets multiple languages/regions, or uses RTL → `references/i18n.md`
- Establishing or reading the project's design system → `references/design-system-doc.md` (the `DESIGN.md` artifact)
- If the user names a real company/brand to emulate, OR a product category ("a car-selling
  site", "a music app") → `references/brand-design-languages.md` (index + category patterns),
  then read the specific brand file(s) in `references/brands/`
- Reviewing a diff / existing frontend without a browser → `references/code-audit.md` (static source scan)
- Converting/redesigning an existing multi-file frontend → `references/large-codebases.md`
  (the context-efficient, system-first method — convert tokens + primitives, not every file)
- When writing real CSS → `references/modern-css.md` (the craft touches that read as hand-made)
- Polishing components / final craft pass → `references/polish.md` (the micro-details that beat slop)
- If any component loads async / needs loading states → `references/skeleton.md`
- If a style is named → the matching file (see Trigger table); if unsure which style,
  read `references/styles/_index.md` and recommend one
- If a browser tool is or can be available → `references/verification.md`
- Before handing work back → `references/critique.md` (score it like a senior reviewer)

Do not skip the core reads. They are short. Reading them takes less time than fixing a broken output.

---

## Step 1 — Gather Context, Then Audit

**First, gather design context** (`references/design-context.md`): the user's design system,
codebase tokens, live product, or brand. Read the code and lift exact values. Designing from
scratch is the last resort and produces generic work — anchor to what exists, and vocalize the
system you extracted before building.

**Then decide the personality** (`references/personality.md`): what should this product *feel*
like, based on its audience and brand? This single decision steers color, type, shape, motion,
imagery, and copy — choosing it up front is what stops the output from feeling generic. State the
target feeling before building.

**Determine the job — reskin or redesign?** Decide (and tell the user) which one this is:
- **Default to redesign.** A reskin is only the right call when the existing design is *genuinely
  good* and just wants a fresh surface. **Reskinning a weak or generic layout only polishes the
  slop — it cannot make it look human-made**, and can even make a cramped/bad layout worse. If the
  existing design is weak, say so and redesign (restructure), don't skin it.
- If they named a style and want it applied to an *already-good* layout → **style conversion**
  (keep structure, change surface).
- If they said "make it look better / not AI-generated / like a real product," or the layout
  itself is the problem (generic grid, weak hierarchy, cramped or aimless composition) → it's a
  **de-slop redesign**: you must rethink layout, hierarchy, density, composition, and content —
  not just apply a skin. A reskin here will under-deliver.
- If the request is ambiguous (e.g. "redesign it with glassmorphism"), **say what you see**: "the
  layout/hierarchy is what reads as AI-generated; I can skin it to glass, but to actually look
  human-made I'd restructure X/Y/Z — want the reskin, the restructure, or both?" Don't silently
  pick reskin and hand back a prettier version of the same generic layout.

Then audit the existing codebase:

### Codebase Scan Checklist
- [ ] List every unique component present (navbar, cards, forms, buttons, modals, etc.)
- [ ] Identify the current color palette (extract all hex/rgb values used)
- [ ] Identify fonts in use
- [ ] Identify all animation/transition rules currently present
- [ ] Note any spacing inconsistencies (mixed px/rem, inconsistent gaps)
- [ ] Note any components that have UX problems beyond just styling
- [ ] Check if dark mode is expected or present

Write a short audit summary (internal — you don't need to show the user unless they ask).
This summary becomes your checklist. You are not done until every item on it is addressed.

> **On a large, multi-file codebase, do this scan with grep — not by reading every file.** Inventory
> where tokens live, what's hardcoded, and which primitives are most reused, then convert
> system-first (token layer + shared primitives) rather than file-by-file. Full method:
> `references/large-codebases.md`. This is what keeps a whole-frontend conversion inside the
> context budget.

---

## Step 2 — Define the Design System First

Never apply styles component by component without a system. Always define the system first.

### Build a Token Set
Before writing any component code, define:

```
COLORS:
  primary:        (derived from product context — see references/color-theory.md for logic)
  primary-muted:
  surface:
  surface-elevated:
  border:
  text-primary:
  text-secondary:
  text-muted:
  accent:
  error:
  success:

TYPOGRAPHY:
  display:   (font family + weight + size)
  heading:   (font family + weight + size)
  body:      (font family + weight + size)
  label:     (font family + weight + size)
  caption:   (font family + weight + size)

SPACING SCALE: (4px base unit)
  xs: 4px | sm: 8px | md: 16px | lg: 24px | xl: 32px | 2xl: 48px | 3xl: 64px
  ← full 9-token scale + per-token jobs + the gap/rhythm rules: references/spacing.md

RADIUS SCALE:
  sm: | md: | lg: | full:

ELEVATION SCALE:
  0 (flat) | 1 (card) | 2 (dropdown) | 3 (modal) | 4 (toast)
  ← shadow + gradient craft for these levels: references/depth.md

LAYOUT / GRID:  ← column grid + 8pt spacing system: references/layout-grids.md

MOTION SYSTEM:  ← defined in references/motion.md
```

These tokens are LAW. Every component uses them. Nothing is hardcoded.

Define the **grid and spacing system** here too (`references/layout-grids.md` for the column grid;
`references/spacing.md` for the 4pt base, 9-token scale, and gap rules): page columns (12-col web
default; fixed/capped width for forms and articles), and a spacing scale that every gap, margin,
and padding draws from — bigger gaps between groups than within them. Define **depth** (`references/depth.md`)
so the elevation scale uses soft, tinted, layered shadows — never the default `0 2px 4px` — and so
any gradients are intentional, not muddy.

**Write the system down.** Persist it as a `DESIGN.md` at the project root using the template in
`references/design-system-doc.md` — product context, aesthetic direction, type, color, spacing,
layout, motion, and a decisions log. This becomes the project's source of truth: every later
component and every review is calibrated against it. If a `DESIGN.md` already exists, read it
first and extend it rather than overwrite.

---

## Step 3 — Apply by Component Category

Work through the component list from your audit. For each component:

1. Run the **9-pass Component Method** in `references/component-method.md` — this is the
   professional thinking process: job → content hierarchy → anatomy → full state matrix →
   behavior → layout/weight → responsive → accessibility → tokenize & critique.
2. Check `references/components.md` for the known standard for that type (if it's listed).
   If it's NOT listed, the Component Method is how you reach the same professional bar anyway.
3. Apply the design tokens
4. Establish its **visual hierarchy** (`references/visual-hierarchy.md`) — one clear focal point,
   group related parts by proximity/region, rank with size/weight/color/position/space
5. Apply the motion system (see `references/motion.md`)
6. Treat any photos, illustrations, or icons per `references/imagery.md` (one icon set, real
   imagery, overlays for text)
7. Write its real text well — labels, buttons, errors, empty states (`references/microcopy.md`)
8. Make it accessible — semantics, keyboard, focus, contrast, ARIA (`references/accessibility.md`)
9. Check against `references/anti-patterns.md` — are you doing anything on that list?

For any container that reveals/hides content (tabs, accordion, drawer, wizard, tree), pick the
**right disclosure pattern** using the decision table in `components.md` — don't reach for tabs by
reflex. The reasoning behind these choices (cognitive load, progressive disclosure, affordance)
lives in `references/ux-laws.md`; run its ten heuristics against each screen as you go.

> Building from scratch: run the 9 passes forward.
> Rebuilding an existing component: first run the "Rebuilding" audit in
> `component-method.md` (recover the job, find missing states, decide restyle vs. restructure)
> — never reskin a structurally broken component.

> If the named style has a **recipe library** (`references/recipes/`, e.g.
> `references/recipes/glassmorphism.md`), start each component from its exact, ready code, then adapt
> the tokens to the project's accent and the component's real content — don't reinvent what's proven.

**Order of priority:**
1. Navigation (sets the tone for everything)
2. Primary content components (hero, cards, lists)
3. Interactive components (forms, buttons, dropdowns, checkboxes)
4. Feedback components (loaders, toasts, empty states, errors)
5. Specialty components (trackers, timelines, chat interfaces, maps)
6. Footer

---

## Step 4 — Motion Pass (Global, Not Per-Component)

After all components are styled, do a **single global motion pass**.
Read `references/motion.md` before this step.

Rules:
- Every interactive element must have a transition
- All transitions use the same easing curve and duration scale
- No element has a duration that differs by more than one step from its neighbours
- Scroll-triggered animations use the same entrance pattern throughout
- You are not done until the page feels like one coherent thing moving, not 10 separate things

After the motion pass, do a **polish pass** with `references/polish.md`: concentric radii,
optical alignment, shadow-as-border, image outlines, interruptible transitions, split/stagger
entrances, subtle exits, contextual icon swaps, scale-on-press, tabular numbers, font smoothing,
no `transition: all`, and 44px hit areas. These micro-details are what most separates crafted
UI from AI-default output.

---

## Step 5 — Visual Verification Loop (Look At What You Made)

Read `references/verification.md` for the full procedure. This is the step that closes the
gap between "I think the CSS is right" and "I confirmed it renders correctly."

If a browser tool (Playwright MCP or equivalent) is available:
1. Start the dev server (ask the user for the command — never guess the port)
2. Navigate each primary page; screenshot at 375px / 768px / 1440px
3. Critique each screenshot against the rubric in `verification.md`
4. Fix any issue in code, re-render the affected page, repeat
5. Stop only when a full pass produces zero violations

For motion specifically: grep the codebase for hardcoded transitions
(`0.3s`, `ease-in-out`, `transition: all`) — every hit is a consistency bug. All motion must
route through the tokens in `motion.md`. This grep sweep is how you guarantee the whole page
shares one "smoothness," not just the part you were asked about.

If no browser tool is available: apply everything, then **tell the user the output was not
visually verified** and offer to install a browser MCP. Never claim a look you didn't see.
Even without a browser, run the **static design audit** (`references/code-audit.md`) — a
grep-level scan of the source for slop signals, accessibility breaks, and `DESIGN.md` drift.

---

## Step 5b — Critique Pass (Score It Like a Senior Reviewer)

Read `references/critique.md` and score the result across the five dimensions (style fidelity,
hierarchy, craft, functionality, originality). Fix anything below ~7 before finishing. Run the
**squint test** — blur your eyes; if the hierarchy isn't still obvious, the hierarchy is wrong.

**Bold-bias correction:** models drift toward safe, minimal, samey output. Counteract it. When
offering directions, make at least one genuinely bold/characterful — don't let every option be
"cream background + whitespace + one accent." Good design is distinctive, not just inoffensive.

**Structural honesty (don't declare victory on a reskin).** Run the bar question — "would a senior
say an AI made this?" — and if the answer is still *yes*, identify **why**. If the cause is
structural (generic layout, uniform card grid, symmetric blocks, weak hierarchy, placeholder
content), a style pass **cannot** fix it — and you must say so: "the styling is now consistent, but
what still reads as AI-generated is the layout/hierarchy/content; reaching a human-made feel needs
restructuring X/Y/Z — want me to?" Report this honestly rather than presenting a prettier version
of the same generic structure as finished.

**Iterating is not monotonic — keep the best, change only what's weak.** When refining across
passes, treat the **previous best version as the baseline**: identify the specific weak parts and
fix *those*, rather than regenerating the whole screen (which often regresses — an oversized hero,
a busier/lopsided layout, a reintroduced bug). Don't trade a clean result for a flashier-but-worse
one. After each pass, compare against the prior version and **keep whichever is genuinely better**;
verify the change didn't introduce overlap, overflow, or imbalance (this is hard to catch without
the visual loop — see Step 5). One disciplined surgical pass beats three sweeping rewrites.

> **Iterating "from the previous version" requires reverting the code first.** You edit the
> *current working tree* — you cannot pull a layout from a screenshot or memory. If the user says
> "go back to the version I liked and change only X," first **restore that version in code**
> (`git checkout <commit> -- <path>`), confirm it's back, *then* make the surgical change.
> Otherwise you'll "fix X" on top of the layout they were trying to leave — a common, frustrating
> miss.

---

## Step 5c — Tell the User How to Run It (Dependencies & Commands) — MANDATORY

**This is a hard requirement, not a courtesy. The redesign is NOT "done" until the project still
builds/runs and the user has been told exactly how to run it. A beautiful redesign that doesn't
run — or that the user can't start because a dependency/font/config step was never mentioned — is
a FAILED task, no matter how good the CSS looks.**

Before handing back, you MUST:
1. **Verify it still works.** Run the build and/or start the dev server. If it errors, fix it —
   don't hand back broken code. If you genuinely cannot run it (no shell/sandbox), say so explicitly.
2. **State every dependency you introduced** + the exact install command (e.g. `npm i <pkg>`), OR
   a clear **"no new dependencies — it builds as-is."** Never leave this unsaid.
3. **List assets/fonts** added and how they load (CDN `<link>`, self-hosted, or a font package).
4. **List config touched** (Tailwind/theme/build) and whether anything must be regenerated.
5. **Give the exact commands** to see it (`npm run dev`, the dev URL) and the build/verify command
   you ran **with its result** ("production build passes, 0 errors").
6. **Flag any manual follow-up** (env vars, dev-server restart, cache clear, new package install).

If you skipped or couldn't do step 1, say that plainly. The user must finish reading your handoff
knowing precisely what to install and run before the new UI works — with zero guessing.

---

## Step 6 — The Completion Checklist

Do not hand back the code until you can check every item:

### Visual
- [ ] No color is hardcoded — all use design tokens
- [ ] No font is hardcoded — all use the typography system
- [ ] Spacing is consistent and uses the spacing scale
- [ ] Elevation is meaningful (higher = more important/urgent)
- [ ] Nothing looks like it came from a CSS tutorial

### Motion
- [ ] Every button, link, and interactive element has hover/active feedback
- [ ] All transitions use the same easing curve
- [ ] No animation is purely decorative without purpose
- [ ] Page load has a coordinated entrance, not random fade-ins
- [ ] Reduced motion is respected (`@media (prefers-reduced-motion: reduce)`)

### UX
- [ ] Every interactive element has a clear focus state
- [ ] Error states exist for all form inputs
- [ ] Empty states exist for all list/data components
- [ ] Loading states exist for async components
- [ ] Mobile layout has been considered (no overflow, no tiny tap targets)

### Anti-Pattern Check
- [ ] Open `references/anti-patterns.md` and verify none apply to this output

### Visual Verification
- [ ] Rendered in a browser and screenshotted at 375px / 768px / 1440px (or user told it was skipped)
- [ ] No horizontal overflow at 375px; no clipped/overlapping text
- [ ] Grep confirms zero hardcoded transitions — all motion routes through tokens
- [ ] Stated clearly to the user what was visually verified vs not

### Style-Specific (if a named style was requested)
- [ ] Open `references/styles/<style-name>.md` and verify every rule is met

---

## Named Style Trigger Words

If the user says any of these, load the corresponding style reference:

| User Says | Load File |
|---|---|
| glassmorphism, frosted glass, blur card | `references/styles/glassmorphism.md` (+ ready component code in `references/recipes/glassmorphism.md`) |
| liquid glass, Apple glass, iOS 26, visionOS | `references/styles/liquid-glass.md` (+ ready component code in `references/recipes/liquid-glass.md`) |
| material you, material design, material 3, android | `references/styles/material-you.md` (+ ready component code in `references/recipes/material-you.md`) |
| aurora, mesh gradient, glow background, gradient hero | `references/styles/aurora.md` (+ ready component code in `references/recipes/aurora.md`) |
| bento, bento grid, modular tiles, dashboard grid | `references/styles/bento.md` (+ ready component code in `references/recipes/bento.md`) |
| minimal, swiss, typographic, editorial minimal, clean | `references/styles/minimal-swiss.md` (+ ready component code in `references/recipes/minimal-swiss.md`) |
| warm editorial, cream, terracotta, paper, book-like, anthropic-style | `references/styles/warm-editorial.md` (+ ready component code in `references/recipes/warm-editorial.md`) |
| neumorphism, soft UI, embossed | `references/styles/neumorphism.md` (+ ready component code in `references/recipes/neumorphism.md`) |
| claymorphism, clay, 3D soft, inflated | `references/styles/claymorphism.md` (+ ready component code in `references/recipes/claymorphism.md`) |
| brutalism, brutal, raw, austere | `references/styles/brutalism.md` (+ ready component code in `references/recipes/brutalism.md`) |
| neo-brutalism, neubrutalism, hard shadow, bold color blocks | `references/styles/neo-brutalism.md` (+ ready component code in `references/recipes/neo-brutalism.md`) |
| skeuomorphism, realistic, material, tactile, physical | `references/styles/skeuomorphism.md` |
| retro, y2k, vaporwave, chrome, holographic, neon | `references/styles/retro-y2k.md` |
| dark mode + any style | `references/styles/dark-mode.md` (layer onto the named style) |
| a real company/brand ("like Apple/Stripe/Linear") | `brand-design-languages.md` → `brands/<brand>.md` (exact-brand mode) |
| a product category ("car site", "music app", "fintech") | `brand-design-languages.md` category patterns → 2–4 `brands/` files (inspiration mode) |
| not sure / "you pick" | `references/styles/_index.md` then recommend |

### Other Task Triggers (not styles)

| User Says | Load File |
|---|---|
| "make it accessible", "a11y", "WCAG", "screen reader", "keyboard nav", "contrast" | `references/accessibility.md` |
| "fix the copy", "the wording", "error messages", "empty state text", "button labels", "tone" | `references/microcopy.md` |
| "multiple languages", "translate", "RTL", "Arabic/Hebrew", "localize", "internationalize" | `references/i18n.md` |
| "the UX feels off", "too cluttered", "confusing", "hard to use", "which pattern (tabs/accordion/…)" | `references/ux-laws.md` (+ disclosure table in `components.md`) |

---

## The One Rule That Overrides Everything

> If a real designer at a top product company (Stripe, Linear, Vercel, Apple, Notion)
> would look at this output and say "an AI made this" — you are not done.

That is the quality bar. Not "it looks good." Not "the client will be happy."
The bar is: **does this look like a human who cares made it?**
