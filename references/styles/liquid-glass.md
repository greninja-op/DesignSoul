# Style: Liquid Glass (Apple iOS 26 / visionOS)

Apple's 2025 design language. Not the frosted glass of iOS 7.
This is glass that reacts, refracts, and feels physically present.
The difference: specular highlights, chromatic refraction, dynamic blur, and materials that respond to content behind them.

---

## What Makes This Different From Glassmorphism

| Glassmorphism | Liquid Glass |
|---|---|
| Static blur | Dynamic blur that responds to content |
| White border only | Specular highlight + chromatic edge |
| Flat glass surface | Curved surface — light bends at edges |
| Single blur value | Multiple blur layers at different depths |
| Background gradient | Background content shows through naturally |

---

## The Core Visual Properties

### Specular Highlight
The top edge of liquid glass catches light as if it's a curved surface:
```css
/* The light hits the top curved edge first */
box-shadow:
  inset 0 1.5px 0 rgba(255, 255, 255, 0.75),     /* top specular */
  inset 0 -0.5px 0 rgba(255, 255, 255, 0.20),    /* bottom edge */
  inset 1px 0 0 rgba(255, 255, 255, 0.25),        /* left edge */
  inset -1px 0 0 rgba(255, 255, 255, 0.15),       /* right edge */
  0 8px 32px rgba(0, 0, 0, 0.12),
  0 2px 8px rgba(0, 0, 0, 0.08);
```

### Chromatic Refraction (Subtle)
At the edges, glass bends light slightly — a barely perceptible rainbow:
```css
/* Applied as a pseudo-element at the edge */
.liquid-glass::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(
    135deg,
    rgba(255, 100, 100, 0.04) 0%,
    rgba(100, 255, 100, 0.02) 50%,
    rgba(100, 100, 255, 0.04) 100%
  );
  pointer-events: none;
}
```

---

## Token System

```css
:root {
  /* Material fill */
  --liquid-bg:           rgba(255, 255, 255, 0.12);
  --liquid-bg-hover:     rgba(255, 255, 255, 0.18);
  --liquid-bg-active:    rgba(255, 255, 255, 0.08);
  --liquid-bg-elevated:  rgba(255, 255, 255, 0.22);  /* modals, overlays */

  /* Blur layers */
  --liquid-blur-base:    blur(20px);          /* standard surface */
  --liquid-blur-heavy:   blur(40px);          /* modals, overlays */
  --liquid-blur-light:   blur(12px);          /* subtle backgrounds */
  --liquid-blur-ultra:   saturate(180%) blur(24px); /* with color saturation */

  /* Border */
  --liquid-border:       rgba(255, 255, 255, 0.22);

  /* Text */
  --liquid-text:         rgba(255, 255, 255, 0.92);
  --liquid-text-muted:   rgba(255, 255, 255, 0.55);
  --liquid-text-subtle:  rgba(255, 255, 255, 0.35);

  /* Radius — Apple uses very round corners */
  --liquid-radius-sm:    12px;
  --liquid-radius-md:    18px;
  --liquid-radius-lg:    24px;
  --liquid-radius-pill:  9999px;
}
```

---

## The Liquid Glass Surface

```css
.liquid-glass {
  position: relative;
  background: var(--liquid-bg);
  backdrop-filter: var(--liquid-blur-ultra);
  -webkit-backdrop-filter: var(--liquid-blur-ultra);
  border-radius: var(--liquid-radius-lg);
  border: 1px solid var(--liquid-border);
  box-shadow:
    inset 0 1.5px 0 rgba(255, 255, 255, 0.70),
    inset 0 -0.5px 0 rgba(255, 255, 255, 0.15),
    inset 1px 0 0 rgba(255, 255, 255, 0.20),
    inset -1px 0 0 rgba(255, 255, 255, 0.10),
    0 8px 32px rgba(0, 0, 0, 0.10),
    0 2px 8px rgba(0, 0, 0, 0.06);
  overflow: hidden; /* clip the pseudo elements */
}

/* Chromatic fringe */
.liquid-glass::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(
    145deg,
    rgba(255, 80, 80, 0.03) 0%,
    transparent 40%,
    rgba(80, 80, 255, 0.03) 100%
  );
  pointer-events: none;
  z-index: 1;
}

/* Inner glow */
.liquid-glass::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 50%;
  border-radius: inherit;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.08),
    transparent
  );
  pointer-events: none;
  z-index: 1;
}
```

---

## Liquid Glass Navbar (Apple-Style)

```css
.liquid-nav {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: saturate(200%) blur(24px);
  -webkit-backdrop-filter: saturate(200%) blur(24px);
  border-bottom: 0.5px solid rgba(255, 255, 255, 0.20);

  box-shadow:
    inset 0 -0.5px 0 rgba(255, 255, 255, 0.10),
    0 0.5px 0 rgba(255, 255, 255, 0.25),
    0 4px 20px rgba(0, 0, 0, 0.08);
}
```

---

## Liquid Glass Pills (Navigation, Tabs, Tags)

Apple's UI uses pill-shaped floating elements extensively:

```css
.liquid-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 18px;
  border-radius: var(--liquid-radius-pill);
  background: rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(16px) saturate(160%);
  -webkit-backdrop-filter: blur(16px) saturate(160%);
  border: 0.5px solid rgba(255, 255, 255, 0.28);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.55),
    0 4px 12px rgba(0, 0, 0, 0.08);
  color: var(--liquid-text);
  font-weight: 500;
  font-size: 0.875rem;
  transition: all var(--duration-fast) var(--ease-out);
}

.liquid-pill:hover {
  background: rgba(255, 255, 255, 0.20);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.65),
    0 6px 16px rgba(0, 0, 0, 0.12);
  transform: scale(1.02);
}

.liquid-pill.active {
  background: rgba(255, 255, 255, 0.85);
  color: rgba(0, 0, 0, 0.80);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 1),
    0 4px 12px rgba(0, 0, 0, 0.15);
}
```

---

## Liquid Glass Buttons

```css
.liquid-btn {
  position: relative;
  padding: 12px 28px;
  border-radius: var(--liquid-radius-pill); /* Apple uses full pill for buttons */
  background: rgba(255, 255, 255, 0.16);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 0.5px solid rgba(255, 255, 255, 0.30);
  box-shadow:
    inset 0 1.5px 0 rgba(255, 255, 255, 0.70),
    inset 0 -0.5px 0 rgba(255, 255, 255, 0.15),
    0 6px 20px rgba(0, 0, 0, 0.10);
  color: white;
  font-weight: 600;
  font-size: 0.9375rem;
  letter-spacing: -0.01em;
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
  overflow: hidden;
}

.liquid-btn:hover {
  background: rgba(255, 255, 255, 0.22);
  box-shadow:
    inset 0 1.5px 0 rgba(255, 255, 255, 0.80),
    inset 0 -0.5px 0 rgba(255, 255, 255, 0.20),
    0 10px 28px rgba(0, 0, 0, 0.14);
  transform: translateY(-1px) scale(1.01);
}

.liquid-btn:active {
  transform: translateY(0) scale(0.99);
  background: rgba(255, 255, 255, 0.10);
  transition-duration: var(--duration-instant);
}

/* Primary — Apple-style solid white */
.liquid-btn-primary {
  background: rgba(255, 255, 255, 0.88);
  color: rgba(0, 0, 0, 0.80);
  backdrop-filter: none;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 1),
    0 6px 20px rgba(0, 0, 0, 0.15);
}

.liquid-btn-primary:hover {
  background: rgba(255, 255, 255, 0.96);
}
```

---

## Liquid Motion (Apple Physics)

Liquid glass elements should feel physical — they don't just fade, they settle:

```css
:root {
  /* Apple uses spring-like curves */
  --liquid-spring:    cubic-bezier(0.34, 1.56, 0.64, 1);
  --liquid-ease:      cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --liquid-duration:  280ms;
}

/* Scale in with spring (menus, popovers) */
@keyframes liquidScaleIn {
  from {
    opacity: 0;
    transform: scale(0.88) translateY(4px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* The card "lifting" on hover */
.liquid-glass-card:hover {
  transform: translateY(-6px) scale(1.01);
  box-shadow:
    inset 0 1.5px 0 rgba(255, 255, 255, 0.80),
    inset 0 -0.5px 0 rgba(255, 255, 255, 0.20),
    0 20px 48px rgba(0, 0, 0, 0.16),
    0 8px 16px rgba(0, 0, 0, 0.08);
  transition: all var(--liquid-duration) var(--liquid-spring);
}
```

---

## Typography for Liquid Glass

Apple uses SF Pro — use these web equivalents:

```css
/* Primary font stack (closest to SF Pro) */
--font-display: -apple-system, 'SF Pro Display', 'Inter', system-ui, sans-serif;
--font-body: -apple-system, 'SF Pro Text', 'Inter', system-ui, sans-serif;

/* Key typographic choices */
/* Slightly tighter tracking than usual */
/* Slightly heavier weights than standard */
```

```css
h1, h2 { letter-spacing: -0.03em; font-weight: 700; }
h3, h4 { letter-spacing: -0.02em; font-weight: 600; }
body    { letter-spacing: -0.01em; font-weight: 400; }
.label  { letter-spacing: 0em;    font-weight: 500; }
```

---

## Dark Background Colors for Liquid Glass

```css
/* These work as backgrounds that liquid glass floats on */

/* Deep space (visionOS-inspired) */
--bg-space: linear-gradient(
  135deg,
  hsl(240, 30%, 8%) 0%,
  hsl(260, 25%, 12%) 50%,
  hsl(220, 30%, 8%) 100%
);

/* Warm dark (iPhone wallpaper-inspired) */
--bg-warm-dark: linear-gradient(
  135deg,
  hsl(20, 40%, 8%) 0%,
  hsl(340, 35%, 12%) 100%
);

/* Cool glass (iMac-inspired) */
--bg-cool: linear-gradient(
  135deg,
  hsl(210, 50%, 10%) 0%,
  hsl(180, 40%, 12%) 100%
);
```

---

## Liquid Glass Checklist

- [ ] `saturate()` included in `backdrop-filter` — not just `blur()`
- [ ] Multi-layered `box-shadow` for specular highlights (not just outer shadow)
- [ ] `inset 0 1.5px 0` top highlight present on all glass surfaces
- [ ] Pseudo-elements for chromatic fringe and inner glow
- [ ] `overflow: hidden` on parent to clip pseudo-elements
- [ ] Button radius is pill (full round), not just rounded
- [ ] Hover uses spring easing, not linear or ease
- [ ] Primary CTA is opaque white over glass, not more glass
- [ ] Typography uses tight letter-spacing (`-0.02em` to `-0.03em`)
- [ ] `@supports` fallback for browsers without backdrop-filter
- [ ] `-webkit-backdrop-filter` present for Safari

---

## Advanced: Real Refraction with SVG Displacement (Optional, High-Fidelity)

The CSS above gives a convincing liquid-glass *look*. True Apple Liquid Glass also **bends
the content behind it** (lensing/refraction). The browser has no native API for this, but an
SVG `feDisplacementMap` filter approximates it — the same approach used in production web
recreations of iOS 26 glass.

> Use this only when the user wants maximum fidelity. It's heavier (an SVG filter +
> backdrop-filter) and needs a performance/fallback check. The pure-CSS version above is
> the safe default.

### 1. Define the displacement filter once (inline SVG in the DOM)

```html
<svg width="0" height="0" style="position:absolute">
  <filter id="liquid-refraction" x="-20%" y="-20%" width="140%" height="140%">
    <!-- noise drives how light bends -->
    <feTurbulence type="fractalNoise" baseFrequency="0.008 0.008"
                  numOctaves="2" seed="7" result="noise"/>
    <feGaussianBlur in="noise" stdDeviation="2" result="softNoise"/>
    <!-- displace the backdrop using the noise = the refraction -->
    <feDisplacementMap in="SourceGraphic" in2="softNoise"
                       scale="40" xChannelSelector="R" yChannelSelector="G"/>
  </filter>
</svg>
```

### 2. Apply it alongside blur + saturate

```css
.liquid-glass--refractive {
  backdrop-filter: blur(8px) saturate(180%) url(#liquid-refraction);
  -webkit-backdrop-filter: blur(8px) saturate(180%);
}
```

### 3. Edge-only refraction (more accurate to Apple)

Real glass bends light most at the **rim**. Apply stronger displacement at the edges using
a thin pseudo-element border-ring with its own heavier filter, while the center stays clear.
Keep `scale` modest (20–50) — high values look like water, not glass.

### Performance & Fallback

```css
/* SVG-filter backdrop is GPU-heavy; gate it behind support + a class */
@supports not (backdrop-filter: blur(0)) {
  .liquid-glass--refractive { background: rgba(30,30,60,0.85); backdrop-filter: none; }
}
/* Respect reduced motion / data: drop the live filter on low-power hints */
@media (prefers-reduced-motion: reduce) {
  .liquid-glass--refractive { backdrop-filter: blur(12px) saturate(160%); }
}
```

**Rules for the refractive variant:**
- Test FPS while scrolling — if it janks, fall back to the pure-CSS glass.
- Never apply the displacement filter to large full-screen surfaces; reserve it for
  cards, bars, and pills.
- Always keep the specular `box-shadow` layers from the standard surface — refraction
  alone isn't enough; the highlight sells the glass.
- This SVG-displacement approach needs **no WebGL library** — prefer it over a JS/WebGL glass
  dependency. The full effect budget (reduced-motion, static fallback, mobile FPS) is in
  `references/effects-performance.md`.

---

## How "true" Liquid Glass works (the WebGL refraction pipeline)

The SVG/CSS approach above is our default and covers most needs. But the *full* Apple "Liquid
Glass" — glass that **refracts live, moving content** (video, scrolling text) in real time, with
magnification and chromatic aberration — needs a shader. Here's the pipeline, and the one clever
trick that makes it possible:

**The constraint:** WebGL **cannot read live screen pixels** (browser security). So you can't just
"sample what's behind the element." The workaround is a snapshot.

**The pipeline:**
1. **Snapshot the background** behind the glass element into an image (a DOM-to-canvas snapshotter
   rasterizes the page region behind the lens).
2. **Upload that snapshot as a texture** into a WebGL shader.
3. **The fragment shader does the glass** — for each pixel it samples the background texture
   *displaced through a lens shape*: **refraction** (offset by a bevel/edge normal — strongest at
   the rim), **magnification** (scale the sample toward center), **chromatic aberration** (sample
   R/G/B at slightly different offsets at the edges), **frosted blur**, plus **specular highlights**
   and a soft drop shadow drawn on top.
4. **Keep it live** — re-snapshot / re-render on scroll and on content change so the lens refracts
   *current* content, not a frozen image (this is what separates it from a static `backdrop-filter`).
5. The lens is a **fixed, high-z-index element**; its own inner content renders on top, excluded
   from the refraction.

```glsl
// the essence of the fragment shader (conceptual)
vec2 lens   = uv - center;
float bevel = smoothstep(radius, radius - edge, length(lens));   // strong bend at the rim
vec2 refr   = uv - lens * bevel * strength;                      // displace the sample
vec3 col;
col.r = texture2D(bg, refr + aberration).r;                      // chromatic split at edges
col.g = texture2D(bg, refr).g;
col.b = texture2D(bg, refr - aberration).b;
col  += specular(lens, lightDir);                                // highlight on the bevel
```

## Two tiers — pick by need (see `../effects-performance.md`)

| Tier | Technique | Use when | Cost |
|---|---|---|---|
| **Lightweight (default)** | SVG `feDisplacementMap` + `backdrop-filter` (above) | cards, bars, pills, panels — 95% of cases | zero deps, pure CSS/SVG |
| **Heavy (true liquid glass)** | snapshot → WebGL shader (this pipeline) | a hero that must refract **live video / scrolling content** | a snapshotter + WebGL + GPU; needs a static fallback |

**Don't reach for the WebGL tier by reflex.** It pulls in a snapshot library + a shader, costs
continuous GPU, and must be reserved for one hero surface with `prefers-reduced-motion` handling and
a static first-frame fallback (full budget in `../effects-performance.md`). For everything else, the
SVG-displacement glass already reads convincingly and ships free.
