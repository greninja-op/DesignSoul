# Liquid Glass — Component Code Library (ready to use)

Drop-in, production-ready Apple-style "Liquid Glass" code. `../styles/liquid-glass.md` holds the
*principles + the WebGL pipeline explanation*; **this file holds the exact code**. Almost everything
here is the **lightweight tier**: pure CSS + an SVG displacement filter — real refraction, specular
highlights, and chromatic edge, **with zero dependencies and no WebGL**. The heavy WebGL-snapshot
tier (for refracting live video/scroll) is a documented stub at the end — reserve it for one hero.

What makes it read as *liquid glass* (not just frosted glass):
- **Edge refraction** — light bends most at the rim (SVG `feDisplacementMap`), so the background
  warps around the edges.
- **Multi-layer specular** — a bright inner top-left highlight + a thin chromatic rim.
- **Saturation boost** in the backdrop — glass concentrates color.
- **Spring motion** on interaction — it feels physical, not mechanical.
- **A rich, varied background** behind it (same rule as glassmorphism — the lens needs something to bend).

> Needs a colorful background to refract (see the Background recipe in `glassmorphism.md`). Test FPS
> on scroll; if it janks, drop the displacement and keep the CSS glass (fallback included below).

```css
:root {
  --lg-blur:        14px;
  --lg-saturate:    180%;
  --lg-bg:          rgba(255,255,255,0.10);   /* keep low — see-through, not opaque */
  --lg-bg-strong:   rgba(255,255,255,0.18);
  --lg-border:      rgba(255,255,255,0.40);
  --lg-highlight:   rgba(255,255,255,0.70);   /* inner top-left light catch */
  --lg-radius:      26px;                       /* liquid glass leans rounder than flat glass */
  --lg-text:        #0c0e1c;
  --lg-text-dark:   rgba(255,255,255,0.96);
  --accent:         #6d5efc;
  --ease-spring:    cubic-bezier(0.34, 1.56, 0.64, 1);   /* the springy, physical feel */
  --dur:            260ms;
}
```

```html
<!-- One SVG filter, defined once per page, reused by every liquid surface. -->
<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <filter id="lg-refract" x="-20%" y="-20%" width="140%" height="140%">
    <feTurbulence type="fractalNoise" baseFrequency="0.008 0.008" numOctaves="2" seed="4" result="noise"/>
    <feGaussianBlur in="noise" stdDeviation="2" result="soft"/>
    <feDisplacementMap in="SourceGraphic" in2="soft" scale="36"
      xChannelSelector="R" yChannelSelector="G"/>
  </filter>
</svg>
```

---

## The shared liquid surface (every component extends this)

```css
.lg {
  position: relative;
  background: var(--lg-bg);
  -webkit-backdrop-filter: blur(var(--lg-blur)) saturate(var(--lg-saturate));
  backdrop-filter: blur(var(--lg-blur)) saturate(var(--lg-saturate));
  border: 1px solid var(--lg-border);
  border-radius: var(--lg-radius);
  color: var(--lg-text);
  box-shadow:
    0 8px 32px rgba(16,18,40,0.22),          /* float */
    inset 0 1.5px 0 var(--lg-highlight),     /* top specular */
    inset 0 0 0 1px rgba(255,255,255,0.10);  /* faint inner rim */
  isolation: isolate;
  overflow: hidden;
}
/* The refraction layer: a backdrop clone that gets displaced at the edges. */
.lg::before {
  content: ""; position: absolute; inset: 0; z-index: -1; border-radius: inherit;
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
  filter: url(#lg-refract);                  /* the liquid edge-bend */
  pointer-events: none;
}
/* Thin chromatic rim — the tell of real liquid glass. */
.lg::after {
  content: ""; position: absolute; inset: 0; border-radius: inherit; pointer-events: none;
  box-shadow:
    inset 1px 0 0 rgba(255,120,200,0.20),
    inset -1px 0 0 rgba(120,200,255,0.20);
  mix-blend-mode: screen;
}

/* Fallbacks & accessibility */
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .lg { background: rgba(255,255,255,0.80); }
  .lg::before { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .lg::before { filter: none; }               /* drop the live displacement */
  * { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
}
/* If it janks on scroll, add .lg--lite to fall back to plain CSS glass */
.lg--lite::before { filter: none; }
```

---

## 1. Liquid card

```html
<article class="lg lg-card">
  <h3>Liquid card</h3>
  <p>The background bends around the rim and the top edge catches light.</p>
</article>
```
```css
.lg-card { padding: 22px 24px; display: flex; flex-direction: column; gap: 8px; }
.lg-card.interactive { cursor: pointer; transition: transform var(--dur) var(--ease-spring), box-shadow var(--dur) var(--ease-spring); }
.lg-card.interactive:hover { transform: translateY(-4px) scale(1.01); }
.lg-card.interactive:active { transform: translateY(-1px) scale(0.99); }
.lg-card p { color: color-mix(in oklab, var(--lg-text) 65%, transparent); }
```

---

## 2. Liquid button

```html
<button class="lg lg-btn">Continue</button>
<button class="lg-btn lg-btn--solid">Pay now</button>
```
```css
.lg-btn { height: 50px; padding: 0 26px; border-radius: 999px; font-weight: 600; font-size: 1rem;
  display: inline-flex; align-items: center; gap: 8px; cursor: pointer;
  transition: transform var(--dur) var(--ease-spring), box-shadow var(--dur) var(--ease-spring); }
.lg-btn:active { transform: scale(0.94); }                 /* springy press */
.lg-btn:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
.lg-btn--solid { background: var(--accent); color: #fff; border: none;
  box-shadow: 0 8px 24px color-mix(in oklab, var(--accent) 50%, transparent), inset 0 1.5px 0 rgba(255,255,255,0.5); }
.lg-btn--solid:hover { transform: translateY(-2px); }
```

---

## 3. Liquid dock / pill nav (the iOS-style floating bar)

```html
<nav class="lg lg-dock" aria-label="Primary">
  <a href="#" class="active" aria-current="page"><svg>…</svg></a>
  <a href="#"><svg>…</svg></a>
  <a href="#"><svg>…</svg></a>
</nav>
```
```css
.lg-dock { position: fixed; left: 50%; transform: translateX(-50%);
  bottom: calc(16px + env(safe-area-inset-bottom));
  display: flex; gap: 6px; padding: 10px; border-radius: 999px; z-index: 60; }
.lg-dock a { width: 48px; height: 48px; display: grid; place-items: center; border-radius: 50%;
  color: color-mix(in oklab, var(--lg-text) 60%, transparent);
  transition: transform var(--dur) var(--ease-spring), background var(--dur) var(--ease-spring); }
.lg-dock a:hover { transform: translateY(-3px) scale(1.08); }   /* magnify on hover, dock-style */
.lg-dock a.active { background: var(--accent); color: #fff; }
.lg-dock a:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
/* reserve space so the fixed dock never overlaps content */
.app-scroll { padding-bottom: calc(96px + env(safe-area-inset-bottom)); }
```

---

## 4. Liquid toggle

```html
<button class="lg lg-toggle" role="switch" aria-checked="true"><span class="knob"></span></button>
```
```css
.lg-toggle { width: 60px; height: 34px; padding: 4px; border-radius: 999px; cursor: pointer; display: flex;
  transition: background var(--dur) var(--ease-spring); }
.lg-toggle .knob { width: 26px; height: 26px; border-radius: 50%; background: #fff;
  box-shadow: 0 2px 6px rgba(0,0,0,0.35);
  transition: transform var(--dur) var(--ease-spring); }       /* spring slide */
.lg-toggle[aria-checked="true"] { background: var(--accent); border-color: transparent; }
.lg-toggle[aria-checked="true"] .knob { transform: translateX(26px); }
.lg-toggle:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
```

---

## 5. Liquid input

```html
<label class="field"><span class="field-label">Email</span>
  <input class="lg lg-input" type="email" placeholder="you@college.edu"></label>
```
```css
.lg-input { height: 52px; padding: 0 18px; border-radius: 16px; font-size: 1rem; color: var(--lg-text);
  background: var(--lg-bg-strong); width: 100%;
  transition: box-shadow var(--dur) var(--ease-spring), border-color var(--dur) var(--ease-spring); }
.lg-input::placeholder { color: color-mix(in oklab, var(--lg-text) 45%, transparent); }
.lg-input:focus-visible { outline: none; border-color: var(--accent);
  box-shadow: inset 0 1.5px 0 var(--lg-highlight), 0 0 0 3px color-mix(in oklab, var(--accent) 30%, transparent); }
```

---

## 6. Liquid modal

```html
<div class="lg-overlay" role="dialog" aria-modal="true" aria-labelledby="t">
  <div class="lg lg-modal"><h2 id="t">Title</h2><p>Body.</p>
    <div class="lg-actions"><button class="lg lg-btn">Cancel</button>
      <button class="lg-btn lg-btn--solid">Confirm</button></div></div>
</div>
```
```css
.lg-overlay { position: fixed; inset: 0; z-index: 100; display: grid; place-items: center; padding: 20px;
  background: rgba(10,12,30,0.40); -webkit-backdrop-filter: blur(6px); backdrop-filter: blur(6px); }
.lg-modal { width: min(460px,100%); padding: 26px; background: var(--lg-bg-strong);
  display: flex; flex-direction: column; gap: 14px;
  animation: lg-in var(--dur) var(--ease-spring); }
.lg-actions { display: flex; justify-content: flex-end; gap: 10px; }
@keyframes lg-in { from { opacity: 0; transform: translateY(12px) scale(0.96); } to { opacity: 1; transform: none; } }
```

---

## 7. Heavy tier — true WebGL refraction (hero only, optional)

For glass that refracts **live video / scrolling content** (not just a blurred backdrop), the
lightweight SVG approach isn't enough — you need the WebGL pipeline from `../styles/liquid-glass.md`:

```text
snapshot the background (DOM→canvas)  →  upload as a shader texture
   →  fragment shader: refract (edge bevel) + magnify + chromatic aberration + specular + blur
   →  re-render on scroll/content change to keep it live
   →  glass = fixed, high z-index; inner content renders on top (excluded from the lens)
```

**Only use this when a hero genuinely needs live refraction.** It pulls in a DOM-snapshot library +
a WebGL renderer, runs the GPU continuously, and **must** ship:
- a `prefers-reduced-motion` path (freeze to a static frame),
- a **static first-frame fallback** for no-WebGL / low-power / SSR,
- offscreen/tab-hidden pausing + an FPS cap, and a mobile jank check.

If you can't meet that budget, use the lightweight SVG glass above — it reads convincingly and is
free. Full decision criteria in `../effects-performance.md`.

### Runnable reference implementation

`demos/liquid-glass-webgl.html` is a complete, self-contained WebGL implementation of this tier —
a draggable rounded-rect lens that refracts a live animated background in real time. Open it to see
every effect in isolation, with sliders for refraction / frost / chromatic / magnify. It uses a
procedural background (moving colour blobs + a grid) so the bending is obvious, but the lens code is
the same one you'd point at a snapshot texture for a real hero.

The core is a single fragment shader. Inside the lens, sample the background with an outward offset
that grows toward the rim (a rounded-box SDF gives both the mask and the bevel normal), then split
the RGB taps and add a specular highlight:

```glsl
// d  = signed distance to the rounded-rect (<0 inside the glass)
// grad = normalize(gradient of the SDF) — points outward, i.e. the 2D bevel normal
float rim    = 1.0 - smoothstep(0.0, bevel, -d);   // 1 at the edge → 0 flat interior
vec2  refr   = px + grad * rim * strength;          // 1) refraction: bend strongest at the rim
refr = center + (refr - center) * (1.0 - magnify);  // 2) magnify across the whole pane

vec3 col;                                            // 3) chromatic aberration: split along the rim
col.r = background(refr + grad * chroma).r;
col.g = background(refr).g;
col.b = background(refr - grad * chroma).b;

vec3 n = normalize(vec3(grad * rim, 1.0));           // 4) specular on the bevel (light upper-left)
col += pow(max(dot(n, normalize(vec3(-0.6,0.7,0.55))), 0.0), 18.0) * rim;
```

For a real hero, swap `background(uv)` for a `texture2D(snapshot, uv)` lookup, where `snapshot` is a
canvas of the page behind the glass (re-captured on scroll / content change). Everything else stays.

---

## Quick checklist
- [ ] Rich, varied background behind the glass (the lens needs something to bend)
- [ ] See-through, not over-frosted (low fill alpha; you can read the background through it)
- [ ] Edge refraction (SVG displacement) + inner top specular + thin chromatic rim all present
- [ ] Spring easing on interaction (`--ease-spring`); rounder radius than flat glass
- [ ] `@supports` + `prefers-reduced-motion` fallbacks; `.lg--lite` escape hatch if it janks
- [ ] Fixed dock/nav reserves content space; ≥44px targets; `:focus-visible` everywhere
- [ ] One accent; contrast verified over the busiest background area
- [ ] WebGL heavy tier used ONLY for a hero, with static fallback + reduced-motion

Pairs with: `../styles/liquid-glass.md` (principles + the WebGL pipeline), `glassmorphism.md`
(background recipe + tokens), `../effects-performance.md` (when the heavy tier is justified),
`../accessibility.md`, `../polish.md`.
