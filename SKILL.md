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

## Step 0 — Read Before Touching Anything

Before writing a single line of CSS or JSX, read these reference files in order:

1. `references/anti-patterns.md` — The AI default habits you must break
2. `references/components.md` — Professional standards for every component type
3. `references/motion.md` — The animation system (read this before adding ANY animation)
4. `references/typography.md` — Font pairing and type scale logic

If the user has named a specific style (glassmorphism, liquid glass, etc.), also read:
5. `references/styles/<style-name>.md`

Do not skip any of these. They are short. Reading them takes less time than fixing a broken output.

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
  primary:        (derived from product context — see typography.md for logic)
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

1. Check `references/components.md` for the professional standard for that type
2. Apply the design tokens
3. Apply the motion system (see `references/motion.md`)
4. Check against `references/anti-patterns.md` — are you doing anything on that list?

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

## Step 5 — The Completion Checklist

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

### Style-Specific (if a named style was requested)
- [ ] Open `references/styles/<style-name>.md` and verify every rule is met

---

## Named Style Trigger Words

If the user says any of these, load the corresponding style reference:

| User Says | Load File |
|---|---|
| glassmorphism, frosted glass, blur card | `references/styles/glassmorphism.md` |
| liquid glass, Apple glass, iOS 26, visionOS | `references/styles/liquid-glass.md` |
| neumorphism, soft UI, embossed | `references/styles/neumorphism.md` |
| brutalism, brutal, raw, bold, editorial | `references/styles/brutalism.md` |
| claymorphism, clay, 3D soft, inflated | `references/styles/claymorphism.md` |
| dark mode + any style | Apply dark token set from the style file |

---

## The One Rule That Overrides Everything

> If a real designer at a top product company (Stripe, Linear, Vercel, Apple, Notion)
> would look at this output and say "an AI made this" — you are not done.

That is the quality bar. Not "it looks good." Not "the client will be happy."
The bar is: **does this look like a human who cares made it?**
