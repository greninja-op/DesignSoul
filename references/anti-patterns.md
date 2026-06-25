# Anti-Patterns: What AI-Generated UI Always Does Wrong

This file is a kill list. Every item here is a default habit that makes UI look AI-generated.
Before finishing any output, scan this list. If your output does any of these, fix it.

---

## Color Anti-Patterns

### ❌ The Default Blue
```css
/* AI default — do not use */
color: #3B82F6;        /* Tailwind blue-500 */
color: #2563EB;        /* Tailwind blue-600 */
background: #EFF6FF;   /* Tailwind blue-50 */
```
**Why it's wrong:** Every AI-generated site uses this exact blue. It signals nothing about the product.
**Fix:** Derive color from the product's context. A legal app gets slate/charcoal. A wellness app gets sage/warm beige. A fintech app gets deep navy or forest green. Choose with intent.

---

### ❌ The Generic Gray Stack
```css
/* AI default */
background: #F9FAFB;  /* page bg */
color: #111827;       /* text */
color: #6B7280;       /* secondary text */
border: #E5E7EB;      /* borders */
```
**Fix:** These are placeholders, not a palette. Give the grays a temperature — warm grays for human/lifestyle products, cool grays for technical/professional products. Add slight hue.

---

### ❌ Accent Color That Doesn't Mean Anything
Using the same accent color on buttons, links, badges, icons, and hover states simultaneously — it loses meaning entirely.
**Fix:** Reserve the accent for ONE primary action per screen. Everything else is secondary.

---

## Typography Anti-Patterns

### ❌ Inter for Everything
Inter is a fine font. It's also on 90% of AI-generated sites.
**Fix:** See `typography.md` for pairing logic. Inter is allowed but must be paired with intention, not used as the default safe choice.

---

### ❌ The 3-Size Type Scale
```css
/* AI default */
h1: 2rem
h2: 1.5rem
body: 1rem
```
**Fix:** A real type scale has 5-7 steps with deliberate ratios. Define display, heading, subheading, body, label, caption as distinct sizes with distinct weights.

---

### ❌ Font Weight Used for Decoration
Using `font-weight: 700` on things that aren't actually the most important thing on the page.
**Fix:** Bold means "this is the most important thing here." Use it sparingly. Max 2-3 bold elements per screen section.

---

### ❌ Line Height Ignored
AI-generated copy almost always has default or 1.5 line height everywhere.
**Fix:**
- Display/hero text: `line-height: 1.1` — tight, impactful
- Body text: `line-height: 1.6` — readable, breathing
- Labels/captions: `line-height: 1.3` — compact

---

## Spacing Anti-Patterns

### ❌ Symmetric Padding Everywhere
```css
/* AI default */
padding: 24px;
padding: 16px;
```
**Fix:** Intentional asymmetry creates visual tension and guides the eye. More bottom padding than top on sections. More left/right padding on cards than top/bottom. Make it feel designed.

---

### ❌ Consistent Border Radius on Everything
```css
/* AI default */
border-radius: 8px; /* on everything */
border-radius: 12px; /* on everything */
```
**Fix:** Define a radius scale and use it meaningfully. Small components (badges, tags): `4px`. Cards: `12px`. Modals: `16px`. Buttons: depends on brand personality — `6px` for serious, `full` for playful.

---

### ❌ The 24px Gap Default
Everything spaced 24px apart regardless of relationship.
**Fix:** Spacing encodes relationship. Things that belong together: `8px`. Things that are related: `16px`. Things that are separate sections: `48px+`. The eye should read the groupings before reading the content.

---

## Component Anti-Patterns

### ❌ The Generic Card
```css
/* AI default */
.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 24px;
}
```
**Fix:** Cards need identity. What is this card FOR? A product card looks different from a stat card looks different from a user profile card. The shape, density, and visual weight should reflect the content's purpose. The shadow itself is also a tell — that flat `0 2px 4px rgba(0,0,0,0.1)` is the default everyone recognizes; replace it with a soft, tinted, layered shadow (see `depth.md`).

---

### ❌ The Centered Hero with One CTA
```
[Big Heading]
[Subtext paragraph]
[Blue Button]
```
**Fix:** The hero is a thesis. It should communicate what makes this product different in the first 2 seconds. Center-aligned blurbs don't do that. Make a real design decision.

---

### ❌ The 3-Column Footer
```
[Logo + tagline]  [Links]  [Links]  [Links]
[Copyright]
```
**Fix:** What does the user actually need when they reach the footer? Design for that. Sometimes a footer is just a copyright line. Sometimes it's a final CTA. The 3-column grid is almost never the real answer.

---

### ❌ Icons Without Labels (or Labels Without Icons)
Icon-only buttons with no tooltip. Or text labels with generic icons that add no meaning.
**Fix:** Icons should either stand alone with a clear universal meaning (✕ close, ← back) or always have a label. Decorative icons that sit next to text they repeat are visual noise.

---

### ❌ The Placeholder Empty State
```
[Sad icon]
No items found.
```
**Fix:** Empty states are opportunities. Tell the user why it's empty, what they can do about it, and give them a direct action. Treat it like a micro-onboarding moment.

---

## Animation Anti-Patterns

### ❌ Fade-In on Everything
```css
/* AI default */
.anything {
  animation: fadeIn 0.3s ease;
}
```
**Fix:** If everything fades in, nothing feels intentional. Define what types of elements get which entrance. See `motion.md`.

---

### ❌ Hover Scale on Everything
```css
/* AI default */
:hover { transform: scale(1.05); }
```
**Fix:** Scale on hover works for media/image cards. It's wrong for buttons, nav links, and text elements. Buttons get background color change. Links get underline or color shift. Scale is for things you're "picking up."

---

### ❌ Mixed Durations and Easings
```css
/* AI default — different values everywhere */
transition: all 0.2s ease;
transition: opacity 0.3s linear;
transition: transform 0.15s ease-in-out;
```
**Fix:** Read `motion.md`. Define a motion system. Use it everywhere. The page should move like one organism.

---

### ❌ Animation Without Purpose
Spinning logos. Floating elements. Parallax on text. Gradient shifting backgrounds.
**Fix:** Every animation must answer the question: "What does the user now understand that they didn't before?" If the answer is nothing, remove it.

---

## Layout Anti-Patterns

### ❌ The Max-Width-768px Mobile Breakpoint
```css
/* AI default */
@media (max-width: 768px) { ... }
```
**Fix:** Mobile-first. Write base styles for mobile, add complexity for larger screens. One breakpoint is almost never enough.

---

### ❌ The 12-Column Grid Used as 3 Columns
Using a grid system but only ever placing things in thirds.
**Fix:** Use the grid to create rhythm and unexpected proportions. 5/7 splits, 4/8 splits, full-bleed elements that break the grid intentionally.

---

### ❌ No Visual Hierarchy Within Sections
Every element the same size, same weight, same contrast.
**Fix:** Every section needs a clear primary, secondary, and tertiary visual element. The eye needs a path.

---

## Content & Asset Anti-Patterns (the deeper slop)

These are the slop sources that survive even after the visual tokens are fixed. They're the
difference between "styled nicely" and "made by someone who cares."

### ❌ Data slop
Fabricated stats used as decoration: "10,000+ happy customers," "99.9% uptime," rows of
made-up metric cards, mock tables dressed up with fake numbers.
**Fix:** if there's no real data, use a clearly-labelled placeholder or ask the user. Never invent numbers to fill space.

### ❌ Quote slop
Invented testimonials or famous-person quotes to pad a page.
**Fix:** placeholder + ask the user for real quotes.

### ❌ SVG-imagery slop
Trying to hand-draw people, scenes, devices, or "abstract art" in SVG. AI-drawn SVG imagery
reads as cheap and juvenile instantly.
**Fix:** a plain grey rectangle labelled "illustration 1200×800" beats a bad SVG hero a
hundred times over. Reserve SVG for real icons (16–32px), geometric decoration, and data-viz charts.

### ❌ Over-iconography
An icon on every heading, feature, and section. It makes the UI look like a toy.
**Fix:** icons earn their place; most headings don't need one. Use a real icon set
(Lucide/Heroicons/Phosphor), never emoji as icons.

### ❌ Filler content
Adding paragraphs/sections/elements to make a page "feel less empty." Emptiness is a
composition problem, solved with contrast/rhythm/whitespace — not with more stuff.
**Fix:** for every element ask "if I delete this, does the design get worse?" If no, delete it.
"One thousand no's for every yes."

### ❌ Adding without asking
Unilaterally deciding the page needs one more section/page/feature.
**Fix:** the user knows their audience better than you. Propose additions; don't silently add them.

### 🚩 The slop tell
The moment you think *"adding this would make it look better"* — that thought is usually the
slop signal. Build the simplest version first; add only when the user asks or the content demands it.

---

## Craft / Detail Anti-Patterns

The small things that read as "off" even when the system is right (full guide in `polish.md`):

- ❌ **Same border-radius on a nested element and its parent** — inner corner looks pinched.
  Fix: concentric radius, outer = inner + padding.
- ❌ **`transition: all`** — animates properties you didn't intend and blocks optimization.
  Fix: name exact properties (`transition-property: scale, opacity`).
- ❌ **Tinted image outline / border** (slate/zinc/accent) — reads as dirt on the edge.
  Fix: pure black/white at ~10%, inset.
- ❌ **Numbers that shift layout as they update** — Fix: `font-variant-numeric: tabular-nums`.
- ❌ **Keyframe animations on interactive toggles** — snap/restart when interrupted.
  Fix: CSS transitions for anything a user can reverse mid-flight.
- ❌ **`scale` smaller than 0.95 on press** — feels exaggerated. Fix: `scale(0.96)`.
- ❌ **Tiny tap targets** — Fix: extend to 44px with a pseudo-element.

---

## Forbidden Default Zones (override only on explicit brand request)

- ❌ **GitHub-dark lazy solution:** a uniform deep-blue-black (`#0D1117`) background + generic
  cyan/purple neon glow. This one specific combination is banned as a default — not "dark mode
  in general." Intentional, authored dark palettes (cinematic, warm-cyber, the dark styles in
  the style library) are fine.
- ❌ The all-purpose aggressive purple gradient formula.
- ❌ Emoji used as icons.
- ❌ Rounded card + left-colored-border accent (unless the brand genuinely uses it).
- ❌ A signature/watermark on a cover.

---

## Dark Patterns (Never Build These — Even If Asked Casually)

Dark patterns are deceptive designs that trick users into actions against their interest. They
exploit cognitive biases for short-term metrics and destroy trust. They are unethical, increasingly
illegal, and never part of a DesignSoul output. If a request would produce one, name it and offer
the honest alternative instead.

- ❌ **Forced continuity** — silent auto-renew after a trial, with cancellation buried.
  ✅ Remind before charging; make canceling as easy as subscribing.
- ❌ **Roach motel** — easy to get in (sign up, subscribe), deliberately hard to get out.
  ✅ Symmetrical effort: if signup is one click, so is cancellation/deletion.
- ❌ **Sneak into basket** — adding items/insurance/donations the user didn't choose.
  ✅ Opt-in, never opt-out, for anything that costs money.
- ❌ **Hidden costs** — fees revealed only at the final checkout step.
  ✅ Show the full price (incl. fees/shipping) as early as possible.
- ❌ **Confirmshaming** — guilt-tripping decline text ("No thanks, I hate saving money").
  ✅ Neutral, respectful decline options.
- ❌ **Misdirection / false hierarchy** — styling the manipulative choice as the obvious one,
  hiding the user-friendly option in low-contrast text.
  ✅ Give the user's interest equal or greater visual weight.
- ❌ **Fake urgency / scarcity** — countdowns that reset, "Only 2 left!" when untrue.
  ✅ Only show urgency/scarcity that is real.
- ❌ **Friend spam** — harvesting contacts or posting on the user's behalf without clear consent.
  ✅ Explicit, scoped, revocable consent.
- ❌ **Trick questions / preselected consent** — double negatives, pre-ticked marketing boxes.
  ✅ Plain language, unchecked by default for anything optional.

The rule: a default or a flow should serve the user at least as much as the business. If it only
works *because* the user doesn't notice, it's a dark pattern.

---

## Paper-Cut Bugs (the small things that quietly erode quality)

Individually trivial, collectively they make a UI feel cheap and unfinished. Sweep for these on
the final pass — they're the gap between "styled" and "cared about":

- Misaligned or inconsistent elements (a button 1px off, a stray margin).
- Inconsistent typography across sections (a heading that didn't get the system).
- A click/tap with no visual feedback — reads as broken (see `ux-laws.md` → visibility of status).
- Vague or ambiguous labels (see `microcopy.md`).
- Form validation that fires at the wrong time or doesn't explain the fix.
- One component on the page that didn't get the same treatment as the rest.
- A mobile touch target that's slightly too small or too close to its neighbor.

No single one is a blocker. Shipping a pile of them is exactly what AI-default output does.

---

## The Final Check

Read this list one more time before submitting.
If you catch yourself thinking "it's fine, the user won't notice" — fix it anyway.
That thought is exactly how AI-default design ships.
