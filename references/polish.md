# Micro-Craft: The Details That Separate "Built" From "Slop"

Great interfaces rarely come from one big move. They come from a stack of small, almost
invisible details that compound. This file is the detail layer — the design-engineering
craft a senior front-end applies on top of the design system. Run a **polish pass** over
every component using these. Most of them take seconds and are the exact things missing from
AI-default UI.

> Tie every duration/easing here back to `motion.md` tokens. These details add craft, never
> novelty for its own sake.

---

## 1. Concentric Border Radius

When you nest one rounded element inside another, the radii must agree:

```
outer radius = inner radius + padding
```

Mismatched radii on nested surfaces is the single most common thing that makes a UI feel
subtly "off."

```css
/* Good — concentric */
.card       { border-radius: 20px; padding: 8px; }  /* 12 + 8 */
.card-inner { border-radius: 12px; }

/* Bad — same radius on both → inner corner looks pinched */
.card       { border-radius: 12px; padding: 8px; }
.card-inner { border-radius: 12px; }
```

If the padding is larger than ~24px, treat the layers as separate surfaces and choose each
radius independently — strict concentric math only matters when surfaces are close together.

---

## 2. Optical Over Geometric Alignment

When perfect geometric centering *looks* off, trust your eye and adjust.

- **Button with text + trailing icon:** use slightly less padding on the icon side —
  `icon-side padding ≈ text-side padding − 2px`. Equal padding makes the icon look shoved right.
- **Play triangle:** its visual center sits left of its geometric center. Nudge it right ~2px.
- **Asymmetric icons (carets, stars, arrows):** fix the imbalance in the SVG (viewBox/path) so
  no per-instance margin hacks are needed; fall back to a 1px margin only if you can't edit the SVG.

---

## 3. Shadows Instead of Borders (for depth)

For buttons, cards, and elevated containers, a layered translucent `box-shadow` reads more
naturally than a solid border — it adapts to any background, including images and color blocks.

```css
:root {
  /* Light: 1px ring + subtle lift + ambient depth */
  --shadow-border:
    0 0 0 1px rgba(0,0,0,0.06),
    0 1px 2px -1px rgba(0,0,0,0.06),
    0 2px 4px 0 rgba(0,0,0,0.04);
  --shadow-border-hover:
    0 0 0 1px rgba(0,0,0,0.08),
    0 1px 2px -1px rgba(0,0,0,0.08),
    0 2px 4px 0 rgba(0,0,0,0.06);
}
/* Dark: a single white ring — layered depth shadows don't read on dark */
[data-theme="dark"] {
  --shadow-border:       0 0 0 1px rgba(255,255,255,0.08);
  --shadow-border-hover: 0 0 0 1px rgba(255,255,255,0.13);
}
.card { box-shadow: var(--shadow-border); transition: box-shadow var(--duration-fast) var(--ease-out); }
.card:hover { box-shadow: var(--shadow-border-hover); }
```

**Keep borders for separation, not depth:** list dividers, table cell boundaries, hairline
separators, and form-input outlines (accessibility) should stay as real borders.

---

## 4. Image Outlines

Give images a 1px inset outline so they sit at the same depth as bordered/shadowed elements.

```css
img { outline: 1px solid rgba(0,0,0,0.1); outline-offset: -1px; }      /* light */
[data-theme="dark"] img { outline-color: rgba(255,255,255,0.1); }      /* dark */
```

Non-negotiable color rule: **pure black (light) / pure white (dark) at ~10%.** Never a tinted
near-black/near-white from the palette (slate, zinc, `#0a0a0a`, etc.) and never the accent —
a tinted outline picks up the surface behind it and reads as dirt on the image edge.
`outline` (not `border`) plus `outline-offset: -1px` keeps the image its intended size.

---

## 5. Interruptible Animations

Users change their mind mid-interaction. Animations must be able to retarget.

| | CSS transitions | CSS keyframes |
|---|---|---|
| Behavior | Interpolate toward the *latest* state | Run a fixed timeline |
| Interruptible | Yes — retargets mid-flight | No — restarts from the start |
| Use for | Interactive state (hover, toggle, open/close) | One-shot sequences (entrances, loaders) |

**Rule:** interactive elements use transitions; reserve keyframes for sequences that run once.
A drawer toggled with a `transform` transition reverses smoothly mid-animation; the same drawer
driven by a keyframe animation snaps or restarts.

---

## 6. Enter: Split, Stagger, Blur

Don't animate one big container. Split content into semantic chunks (title, description,
actions) and stagger them. Combine `opacity` + `translateY(12px→0)` + `blur(4px→0)`.

- Stagger ~80–100ms per chunk, **capped at 5** (per `motion.md`).
- For a hero title, optionally split into words at ~80ms each.
- Entrances use `--ease-out`.

```css
.enter { opacity: 0; transform: translateY(12px); filter: blur(4px);
  animation: enterUp var(--duration-slow) var(--ease-out) forwards; }
.enter:nth-child(1){animation-delay:0ms}
.enter:nth-child(2){animation-delay:100ms}
.enter:nth-child(3){animation-delay:200ms}
@keyframes enterUp { to { opacity:1; transform:translateY(0); filter:blur(0); } }
```

---

## 7. Exit: Subtle, Not Dramatic

The user's focus is moving on — exits shouldn't fight for attention.

- Use a small fixed `translateY(-12px)`, not the full element height.
- Keep a little directional movement so the eye knows where it went.
- Exit shorter than enter (e.g. 150ms vs 400ms) and use `--ease-in`.
- Don't just `display:none` — that vanish feels broken.

---

## 8. Contextual Icon Animation

When an icon swaps on state change (play→pause, like→liked, hover reveals), animate it instead
of toggling visibility. Exact values, do not deviate:

- `scale`: `0.25 → 1`
- `opacity`: `0 → 1`
- `filter`: `blur(4px) → blur(0)`

If the project already uses a motion library (`motion`/`framer-motion` in `package.json`), use a
spring with `bounce: 0` (never any bounce). If not, **don't add a dependency** — keep both icons
in the DOM (one `position: absolute` over the other) and cross-fade them with a transition
(`cubic-bezier(0.2, 0, 0, 1)`); the non-absolute icon defines the layout size.

Animate state-change / hover / contextual icons. Don't animate static nav or decorative icons.

---

## 9. Scale on Press

A small scale-down on click gives tactile feedback. Always `scale(0.96)` — never below `0.95`
(it starts to feel exaggerated). Use a transition so releasing mid-press returns smoothly.

```css
.button { transition: scale var(--duration-fast) var(--ease-out); }
.button:active { scale: 0.96; }
```

Not every button needs it — expose a `static` opt-out for cases where motion would distract
(destructive confirms, dense toolbars).

---

## 10. Tabular Numbers

Any number that updates in place (counters, timers, prices, table columns, scoreboards) gets
`font-variant-numeric: tabular-nums` so digit widths are equal and the layout doesn't jitter.

```css
.counter, .price, td.num { font-variant-numeric: tabular-nums; }
```

Skip it for static/decorative numbers, phone numbers, zip codes, and version strings. (Note:
in Inter the `1` widens and centers with this on — that's expected and usually desirable.)

---

## 11. Font Smoothing (macOS)

Apply once at the root so text renders crisp and consistent on macOS:

```css
html { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
```

Other platforms ignore it, so it's safe globally. Apply at the root, never per element.

---

## 12. Never `transition: all`

Always name the exact properties — `all` forces the browser to watch everything, triggers
transitions you didn't intend (colors, padding, shadows), and blocks optimizations.

```css
/* Good */ .button { transition-property: scale, background-color; transition-duration: var(--duration-fast); }
/* Bad  */ .button { transition: all var(--duration-fast) ease; }
```

(Tailwind: `transition-transform` covers transform/translate/scale/rotate; for other combos use
`transition-[scale,opacity,filter]`.)

---

## 13. `will-change` Sparingly

Only hint properties the GPU can composite: `transform`, `opacity`, `filter`, `clip-path`.
Never `will-change: all`, never on `background`/`color`/`width`. Add it *only* when you actually
see first-frame stutter (Safari benefits most) — each layer costs memory.

---

## 14. Minimum Hit Area

Interactive elements need at least a 44×44px hit area (WCAG; 40px floor). If the visible control
is smaller, extend it with a pseudo-element rather than padding the visual:

```css
.icon-btn { position: relative; width: 20px; height: 20px; }
.icon-btn::after { content:""; position:absolute; top:50%; left:50%;
  transform:translate(-50%,-50%); width:44px; height:44px; }
```

**Collision rule:** two interactive elements must never have overlapping hit areas — shrink the
pseudo-element to the largest size that doesn't collide.

---

## 15. Don't Animate on First Load

Elements already in their default state shouldn't play an enter animation on page load — only on
later state changes (icon swaps, toggles, tabs, segmented controls). With a motion library this
is `initial={false}` on the presence wrapper. Don't apply it to genuine first-time entrances
(a staggered hero, a loading reveal) — verify on a full refresh.

---

## The Polish Pass Checklist

- [ ] Nested rounded elements use concentric radius (outer = inner + padding)
- [ ] Icons optically aligned (icon-side padding −2px; play triangle nudged right)
- [ ] Depth uses layered shadow-as-border; dividers/inputs stay real borders
- [ ] Images have a pure-black/white 10% inset outline (never tinted)
- [ ] Interactive motion uses transitions (interruptible), keyframes only for one-shots
- [ ] Entrances split + staggered (≤5) with opacity/translateY/blur
- [ ] Exits subtle (small translateY, shorter, ease-in)
- [ ] Contextual icon swaps animate (scale .25→1, opacity, blur), bounce 0
- [ ] Buttons scale to 0.96 on press (with a `static` opt-out)
- [ ] Dynamic numbers use tabular-nums
- [ ] Font smoothing applied once at the root
- [ ] No `transition: all`; exact properties only
- [ ] `will-change` only on transform/opacity/filter, only when needed
- [ ] Small controls extended to a 44px hit area; no overlapping hit areas
- [ ] No enter animation firing on first page load for default-state elements
