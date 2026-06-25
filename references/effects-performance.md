# Premium Effects & the Performance Budget

"Wow" visual effects — glass refraction, animated/shader gradients, liquid-metal logos, 3D scenes,
cursor and scroll effects — are a real signal of a crafted, high-end interface. They're also where
two opposite failures live, and AI-default UI commits both:

- **Too little:** flat, motionless, zero depth — reads as a template.
- **Too much / too heavy:** a gratuitous WebGL effect on every surface, a 3D scene behind body
  text, a logo that never stops melting — a different, glossier flavor of slop that tanks
  performance and accessibility.

The senior move is neither. It's deploying *one* effect where it earns its place, achieved with the
**lightest technique that produces the look**, and meeting a strict performance + accessibility
budget. This file is that decision framework. Read it before adding any effect heavier than a CSS
transition.

> Effects don't make a design good; they make a *good* design feel premium. If the hierarchy,
> spacing, type, and color aren't already right, an effect just decorates a weak layout. Fix the
> foundation first (`visual-hierarchy.md`, `spacing.md`, `typography.md`, `color-theory.md`).

---

## The lightest-tool ladder (climb it, stop at the first rung that works)

For *any* effect, reach for the cheapest technique that achieves it. Going straight to a 3D
renderer for something CSS can fake is itself the AI-default mistake.

1. **Pure CSS** — gradients, `backdrop-filter`, transforms, transitions, `@keyframes`, masks. Zero
   JS, cheap, cross-framework. Covers far more than people assume.
2. **SVG filters** — `feDisplacementMap`, `feTurbulence`, `feGaussianBlur` for refraction/distortion
   (this is how glass/"liquid glass" refraction is done — see `references/styles/liquid-glass.md`).
   Cheap-ish, declarative, no dependency.
3. **Canvas 2D** — particles, simple generative motion. Moderate cost, no big dependency.
4. **Exported asset** — render a complex effect once and ship a static image, a short looping
   video/WebM, or a Lottie/APNG. Heavier file, but **no runtime GPU cost** and trivially portable.
   Often the smartest choice for a complex look on a marketing page.
5. **WebGL / shaders / 3D** (canvas shader, or a Three.js / R3F scene) — only when the effect is
   genuinely the point and nothing lighter reproduces it. This buys the most "wow" at the highest
   cost (large dependency/bundle, continuous GPU/battery, SSR/hydration care, mandatory fallback).

Most "premium" looks live on rungs 1–4. The renderer on rung 5 is the exception, not the reflex.

---

## Where common effects sit (and their home reference)

| Effect | Lightest real option | Reach for heavy only when… | Reference |
|---|---|---|---|
| Frosted / liquid glass refraction | CSS `backdrop-filter` + SVG displacement | a large interactive surface needs live, per-frame warping | `styles/liquid-glass.md` |
| Mesh / aurora gradient background | CSS radial/conic blobs (+ slow CSS drift) | a hero truly needs living, organic motion | `styles/aurora.md`, `depth.md` |
| Liquid-metal / chrome logo | static SVG/PNG, or a short exported loop | the animated brand mark *is* the hero moment | this file |
| 3D product / scene | exported render/video, or CSS 3D transforms | the product genuinely needs to be inspected in 3D | this file |
| Cursor / scroll-reactive effects | CSS + small JS (IntersectionObserver, transforms) | rarely — these age fast and hurt a11y | `motion.md` |

---

## Non-negotiables for any heavy effect (WebGL / canvas / 3D / shader)

If you climb to rung 3–5, all of these are required, not optional:

- **One hero, not everywhere.** Reserve the effect for a single focal surface. Never app-wide,
  never behind scrolling body text, never on data-dense screens.
- **Respect `prefers-reduced-motion`.** Pause or replace the animation with a static frame. Motion
  effects that ignore this are an accessibility failure (`accessibility.md`).
- **Ship a static fallback.** An exported first-frame image for no-WebGL, low-power devices, SSR,
  and load. The page must look intentional before (or without) the effect mounting.
- **Don't block content or interaction.** The effect is `pointer-events: none` decoration behind
  the UI; text stays real text and passes contrast over the busiest part of it.
- **Budget the cost.** Pause when offscreen or the tab is hidden (IntersectionObserver /
  `visibilitychange`); throttle/cap FPS; test on a mid-range phone and drop to the static fallback
  if it janks (`verification.md`). Watch the bundle — a renderer can dwarf the whole app.
- **SSR/hydration safe.** Mount the effect client-side after paint; never block first render on it.

---

## When NOT to add the effect

- The layout's fundamentals aren't solid yet (fix those first — an effect won't rescue weak design).
- It would sit behind text, run app-wide, or appear on a data/utility screen.
- It only works by importing a heavy renderer for something rungs 1–4 already do.
- The product's personality is calm/serious/utilitarian (`personality.md`) — restraint *is* the
  premium signal there.
- You can't ship the reduced-motion handling and static fallback. No fallback → don't ship the effect.

---

## On third-party effect libraries

Effect libraries (shader-gradient generators, glass-refraction kits, liquid-metal logo tools, 3D
renderers) can be a fine *choice in the user's own project* when the effect is core and the budget
above is met. But:
- Prefer the technique over the dependency when CSS/SVG already does it (glass refraction and most
  gradients need no library).
- Treat any renderer as a real cost (bundle, GPU, maintenance), not free polish.
- Recommend, don't silently add — flag the dependency and its tradeoffs so the user decides.

---

## Checklist (before shipping any effect heavier than a CSS transition)

- [ ] Foundations (hierarchy, spacing, type, color) are right *before* the effect was added
- [ ] Used the lightest technique that achieves the look (didn't jump to WebGL for a CSS effect)
- [ ] Effect is on one hero surface — not app-wide, not behind text, not on data screens
- [ ] `prefers-reduced-motion` honored (pause / static frame)
- [ ] Static fallback ships for no-WebGL / low-power / SSR / pre-mount
- [ ] Decoration is `pointer-events: none`; text stays real and passes contrast over it
- [ ] Paused offscreen/hidden, FPS capped, tested on mid-range mobile (falls back if it janks)
- [ ] Any added library was flagged to the user with its bundle/perf tradeoffs, not added silently

Pairs with: `styles/liquid-glass.md` (glass refraction), `styles/aurora.md` + `depth.md` (gradients),
`motion.md` (the animation system + reduced-motion), `accessibility.md`, `verification.md` (FPS/render checks),
`personality.md` (whether an effect even fits the product).
