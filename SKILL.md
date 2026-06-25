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

**Its real limits — state these to the user, never pretend otherwise:**
- You **cannot see pixels without a browser tool.** If no browser MCP is available, you are
  styling blind — say so and treat the output as unverified (see `references/verification.md`).
- For **large codebases**, you can't hold everything in context at once. Work system-first,
  then component-by-component, and tell the user if scope exceeds what one pass can guarantee.
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
- **Always** read the four core references in Step 0.
- Read a **style file only when** that style is named (or after recommending one).
- Read `references/verification.md` when you have (or can install) a browser tool.
- Read `references/color-theory.md` when deriving a palette from scratch.
Keeps context lean; load deeper files on demand.

---

## Step 0 — Read Before Touching Anything

Before writing a single line of CSS or JSX, read these core reference files in order:

1. `references/anti-patterns.md` — The AI default habits you must break
2. `references/components.md` — Professional standards for every component type
3. `references/component-method.md` — How to design/rebuild ANY component like a pro
4. `references/motion.md` — The animation system (read this before adding ANY animation)
5. `references/typography.md` — Font pairing and type scale logic

Then, conditionally:
- If deriving colors from scratch → `references/color-theory.md`
- If any component loads async / needs loading states → `references/skeleton.md`
- If a style is named → the matching file (see Trigger table); if unsure which style,
  read `references/styles/_index.md` and recommend one
- If a browser tool is or can be available → `references/verification.md`

Do not skip the core four. They are short. Reading them takes less time than fixing a broken output.

---

## Step 1 — Audit First, Touch Second

Before changing anything, audit the existing codebase:

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

RADIUS SCALE:
  sm: | md: | lg: | full:

ELEVATION SCALE:
  0 (flat) | 1 (card) | 2 (dropdown) | 3 (modal) | 4 (toast)

MOTION SYSTEM:  ← defined in references/motion.md
```

These tokens are LAW. Every component uses them. Nothing is hardcoded.

---

## Step 3 — Apply by Component Category

Work through the component list from your audit. For each component:

1. Run the **9-pass Component Method** in `references/component-method.md` — this is the
   professional thinking process: job → content hierarchy → anatomy → full state matrix →
   behavior → layout/weight → responsive → accessibility → tokenize & critique.
2. Check `references/components.md` for the known standard for that type (if it's listed).
   If it's NOT listed, the Component Method is how you reach the same professional bar anyway.
3. Apply the design tokens
4. Apply the motion system (see `references/motion.md`)
5. Check against `references/anti-patterns.md` — are you doing anything on that list?

> Building from scratch: run the 9 passes forward.
> Rebuilding an existing component: first run the "Rebuilding" audit in
> `component-method.md` (recover the job, find missing states, decide restyle vs. restructure)
> — never reskin a structurally broken component.

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
| glassmorphism, frosted glass, blur card | `references/styles/glassmorphism.md` |
| liquid glass, Apple glass, iOS 26, visionOS | `references/styles/liquid-glass.md` |
| material you, material design, material 3, android | `references/styles/material-you.md` |
| aurora, mesh gradient, glow background, gradient hero | `references/styles/aurora.md` |
| bento, bento grid, modular tiles, dashboard grid | `references/styles/bento.md` |
| minimal, swiss, typographic, editorial minimal, clean | `references/styles/minimal-swiss.md` |
| neumorphism, soft UI, embossed | `references/styles/neumorphism.md` |
| claymorphism, clay, 3D soft, inflated | `references/styles/claymorphism.md` |
| brutalism, brutal, raw, austere | `references/styles/brutalism.md` |
| neo-brutalism, neubrutalism, hard shadow, bold color blocks | `references/styles/neo-brutalism.md` |
| skeuomorphism, realistic, material, tactile, physical | `references/styles/skeuomorphism.md` |
| retro, y2k, vaporwave, chrome, holographic, neon | `references/styles/retro-y2k.md` |
| dark mode + any style | `references/styles/dark-mode.md` (layer onto the named style) |
| not sure / "you pick" | `references/styles/_index.md` then recommend |

---

## The One Rule That Overrides Everything

> If a real designer at a top product company (Stripe, Linear, Vercel, Apple, Notion)
> would look at this output and say "an AI made this" — you are not done.

That is the quality bar. Not "it looks good." Not "the client will be happy."
The bar is: **does this look like a human who cares made it?**
