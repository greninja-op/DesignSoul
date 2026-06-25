# Depth: Shadows & Gradients

Shadows and gradients are how a flat screen gets a sense of light and space — what sits *above*
the surface, what's interactive, what recedes. They're also where AI-default UI gives itself away
fastest: the default card shadow `box-shadow: 0 2px 4px rgba(0,0,0,0.1)` is our single most
recognizable slop signal (see `anti-patterns.md`), and harsh, muddy gradients are a close second.

This file is the craft of light: how to make shadows that read as real, and gradients that look
intentional rather than generated. Read it whenever you add elevation, depth, or a gradient.

---

## Part 1 — Shadows

A shadow is light blocked by an object. Get the *physics* roughly right and it reads as real; get
it wrong and the UI looks plastic. Every shadow has four values: **X / Y offset, blur, opacity**
(and color — which is not black; see below).

### The rules that separate real shadows from default ones

1. **Soft, not hard.** Real shadows are diffuse. Use a **larger blur and a low opacity** (often
   ~5–15%), not a tight high-opacity blur. The default `0 2px 4px rgba(0,0,0,0.1)` is too tight
   and too dark-feeling at once — it reads "AI." Spread the light.
2. **Shadows fall down (and a little back).** Light usually comes from above, so the **Y offset is
   positive and larger than X** (X often 0). The bigger the offset and blur, the *higher* the
   element floats. Elevation = distance from the surface; encode importance with it (see the
   elevation scale in `SKILL.md` Step 2).
3. **Never pure black.** `#000000` shadows look dirty and unnatural. **Tint the shadow** — use a
   dark shade from your palette (often a desaturated version of the surface or brand hue). On a
   colored surface, a shadow tinted toward that hue reads far more natural than gray.
4. **Layer shadows for realism.** One shadow is flat. Stack two or three — a tight, near-opaque
   *contact* shadow + a soft, wide *ambient* shadow — to mimic how real objects cast both. This is
   the biggest single upgrade over the default one-liner:
   ```css
   /* Layered, tinted, soft — reads as a real lift */
   box-shadow:
     0 1px 2px hsl(220 40% 20% / 0.10),   /* contact */
     0 4px 8px hsl(220 40% 20% / 0.08),   /* mid */
     0 12px 24px hsl(220 40% 20% / 0.06); /* ambient */
   ```
5. **Colorful shadows on colorful elements.** A vivid button or card can cast a shadow tinted with
   *its own* color (a colored glow), which makes it "pop" and feel premium. Use sparingly, on
   hero/CTA elements — not everywhere.
6. **Only interactive / elevated things cast shadows.** Buttons, cards, dropdowns, modals, FABs —
   yes. Body text, plain labels, decorative shapes, disabled controls — no. A shadow signals
   "this is above the page / you can act on it." Shadows on text are a classic beginner tell.
   (One narrow exception: a *subtle* text-shadow on label text over a busy/bright button to keep
   contrast — but fixing the color is better.)
7. **Elevation should be consistent and meaningful.** Same elevation level = same shadow recipe
   everywhere. Higher elevation (modal > dropdown > card) = larger offset + blur. Don't invent a
   new shadow per component.

### Inner shadows
Inner shadows make an element look *recessed* ("sunk into" the surface). Rare in modern UI and
easily confusing (users expect raised = interactive). Reserve for genuine inset metaphors —
pressed states, wells, neumorphism (see `references/styles/neumorphism.md`). Don't use them as a
default container treatment.

### Dark mode
**Do not turn shadows white in dark mode.** Light-on-dark "shadows" look wrong and confusing. In
dark UI, convey elevation with a **lighter surface color** instead — higher elements get a lighter
background, not a glow. (Full method in `references/styles/dark-mode.md`.) Keep a faint dark
shadow if anything; lean on surface lightness.

---

## Part 2 — Gradients

Almost everything in the real world is a gradient under light, so gradients add realism and depth.
They also let a brand own a *combination* of colors (memorable, hard to copy) and make elements
stand out. But a bad gradient looks worse than a flat color.

### The rules for gradients that look intentional

1. **Transition between close hues.** Smooth gradients blend colors that are **near each other on
   the color wheel** (analogous). A good trick: take one color and shift its **hue by ~20–30°**
   for the second stop, rather than jumping across the wheel. Big hue jumps look harsh.
2. **Avoid the muddy middle.** When two distant colors blend, the midpoint turns a grayish, dull
   tone — the dead giveaway of a careless gradient. Keep hues close, or blend in a perceptual
   space (oklch/lab) so the midpoint stays vivid (see `color-theory.md`). In CSS:
   `linear-gradient(in oklch, …)` interpolates more cleanly than default sRGB.
3. **Know the types and when to use them:**
   - **Linear** — straight blend along an angle. The workhorse: backgrounds, buttons, overlays.
   - **Radial** — blends from a center outward; great for soft glows and faux-3D on rounded shapes.
   - **Conic / angular** — color sweeps around a point. Distinctive but distracting; rare in
     product UI — use deliberately.
   - **Mesh** — multi-point abstract blends (the aurora look). Beautiful for hero backgrounds;
     keep it behind calm content. (See `references/styles/aurora.md`.)
4. **Subtle usually wins.** A faint gradient (two close shades of the same color, or a soft
   light-to-slightly-darker) adds depth without looking "designed-y." Loud rainbow gradients date
   fast and fight your content.
5. **Don't gradient everything.** Same law as color and shadows: if every surface has a vivid
   gradient, none stands out and the screen feels chaotic (cognitive overload). Reserve gradients
   for a hero, a key CTA, or the background — let them be a feature, not wallpaper.
6. **Pair with a tinted shadow.** A gradient element with a soft shadow tinted toward the
   gradient's color reads as genuinely lifted and is a signature "premium" look — use on hero CTAs.

```css
/* Smooth, vivid: same hue family, oklch interpolation, ~25° shift */
background: linear-gradient(135deg in oklch, oklch(0.72 0.18 265), oklch(0.70 0.19 295));
```

---

## Checklist

### Shadows
- [ ] No default `0 2px 4px rgba(0,0,0,0.1)` anywhere — shadows are soft (higher blur, low opacity)
- [ ] Shadow color is tinted (palette dark / brand hue), never pure `#000`
- [ ] Important elevations use layered shadows (contact + ambient), not a single flat one
- [ ] Y offset positive and ≥ X; higher elevation = larger offset + blur, applied consistently
- [ ] Only interactive/elevated elements cast shadows; no shadows on body text or disabled controls
- [ ] Colorful shadows used only on hero/CTA elements, not sprayed everywhere
- [ ] Dark mode conveys elevation via lighter surfaces, not white shadows

### Gradients
- [ ] Stops use close/analogous hues (or oklch interpolation); no muddy gray midpoint
- [ ] Gradient type fits the use (linear default; radial for glow; conic/mesh deliberate)
- [ ] Gradients are reserved for hero/CTA/background — not on every surface
- [ ] Text over a gradient still passes contrast (see `accessibility.md`)

Pairs with: `anti-patterns.md` (the default shadow), `color-theory.md` (hue/oklch), `polish.md`
(shadow-as-border, image outlines), `references/styles/` (per-style depth treatments).
