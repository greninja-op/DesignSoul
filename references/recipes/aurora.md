# Aurora / Mesh Gradient — Component Code Library (ready to use)

Drop-in, production-ready aurora code. `../styles/aurora.md` holds the *principles*; **this file holds
the exact code** so the right background and surfaces already exist when a user asks for "an aurora
background / glow hero / mesh gradient." Every recipe bakes in the rules that keep it premium, not a
harsh rainbow:

- **The gradient is the background; the UI stays calm.** Content sits on near-neutral surfaces; the
  aurora glows *behind* them, never on the text.
- **Soft, luminous, restrained** — low saturation, high lightness, opacity ~0.4–0.65, never full.
- **Blurred blobs, not hard stops** — radial gradients with a big `blur()` (40–80px).
- **2–4 hues max**, analogous or brand-aligned — never the full spectrum.
- **Motion drifts slowly** (20–40s) if at all; never pulses.
- **Lightest tool that works** — static CSS before animated CSS before video before WebGL.
- **Accessible by default** — text checked over the lightest *and* most saturated area; reduced-motion.

```css
:root {
  /* 2–4 analogous / brand hues — soft and luminous, not neon */
  --aurora-1: hsl(265, 80%, 65%);   /* violet */
  --aurora-2: hsl(220, 85%, 62%);   /* blue */
  --aurora-3: hsl(190, 80%, 60%);   /* cyan */
  --aurora-4: hsl(320, 70%, 65%);   /* pink accent */
  /* the UI sits on calm near-neutral surfaces */
  --surface:        rgba(255,255,255,0.72);
  --surface-solid:  #ffffff;
  --border:         rgba(15,23,42,0.08);
  --ink:            hsl(225,25%,12%);
  --ink-muted:      hsl(225,12%,40%);
  --radius: 16px;
  --ease: cubic-bezier(0.22, 1, 0.36, 1);
  --dur:  200ms;
}
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition-duration: 0.01ms !important; }
}
```

---

## 1. Aurora background (static — the default; zero JS, zero runtime cost)

```html
<div class="aurora-bg">
  <!-- page content -->
</div>
```
```css
.aurora-bg { position: relative; min-height: 100vh; background-color: #fafafe; overflow: hidden; }
.aurora-bg::before {
  content: ""; position: absolute; inset: -20%; z-index: 0; pointer-events: none;
  background:
    radial-gradient(40% 40% at 20% 25%, var(--aurora-1) 0%, transparent 60%),
    radial-gradient(35% 35% at 80% 15%, var(--aurora-2) 0%, transparent 60%),
    radial-gradient(45% 45% at 70% 80%, var(--aurora-3) 0%, transparent 60%),
    radial-gradient(30% 30% at 30% 75%, var(--aurora-4) 0%, transparent 60%);
  filter: blur(60px);           /* large falloff so blobs read as glow, not shapes */
  opacity: 0.55;                /* restrained — never full strength */
}
.aurora-bg > * { position: relative; z-index: 1; }

/* Dark variant: deep tinted base, blobs can glow a touch stronger */
.aurora-bg.dark { background-color: hsl(240,30%,7%); }
.aurora-bg.dark::before { opacity: 0.7; }
```

### Optional slow drift (still pure CSS — the second rung of the ladder)

```css
.aurora-bg.animate::before { animation: auroraDrift 32s ease-in-out infinite; }
@keyframes auroraDrift {
  0%   { transform: translate(0,0) scale(1); }
  50%  { transform: translate(-3%,2%) scale(1.05); }
  100% { transform: translate(0,0) scale(1); }
}
```

> Need something richer than animated CSS? Climb the ladder one rung at a time — exported
> image/looping video next, WebGL shader only for a hero that earns it (with a static fallback +
> reduced-motion). Full criteria in `../styles/aurora.md` and `../effects-performance.md`.

---

## 2. Card / surface (calm, faintly translucent so the glow shows through)

```html
<article class="aurora-card">
  <h3>Card title</h3>
  <p>The surface is near-neutral; the aurora glows behind it, never on the text.</p>
</article>
```
```css
.aurora-card {
  background: var(--surface);
  -webkit-backdrop-filter: blur(12px); backdrop-filter: blur(12px);
  border: 1px solid var(--border); border-radius: var(--radius);
  box-shadow: 0 8px 32px rgba(15,23,42,0.06); color: var(--ink); padding: 24px;
  display: flex; flex-direction: column; gap: 8px;
}
.aurora-card p { color: var(--ink-muted); line-height: 1.55; }
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .aurora-card { background: rgba(255,255,255,0.9); }
}
```

---

## 3. Buttons (primary draws a subtle gradient from the aurora hues)

```html
<button class="aurora-btn">Get started</button>
<button class="aurora-btn aurora-btn-ghost">Learn more</button>
```
```css
.aurora-btn { border: none; cursor: pointer; min-height: 46px; padding: 0 24px; border-radius: 12px;
  font-weight: 600; font-size: 0.96rem; color: #fff;
  background: linear-gradient(135deg, var(--aurora-1), var(--aurora-2));
  box-shadow: 0 6px 20px hsla(255,80%,60%,0.30);
  transition: transform var(--dur) var(--ease), box-shadow var(--dur) var(--ease); }
.aurora-btn:hover  { transform: translateY(-2px); box-shadow: 0 10px 28px hsla(255,80%,60%,0.40); }
.aurora-btn:active { transform: translateY(0); }
.aurora-btn:focus-visible { outline: 3px solid var(--aurora-2); outline-offset: 3px; }
.aurora-btn-ghost { background: var(--surface); color: var(--ink); border: 1px solid var(--border);
  -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px); box-shadow: none; }
.aurora-btn-ghost:hover { background: rgba(255,255,255,0.9); }
```

---

## 4. Hero (headline over the glow, with a gradient-text accent)

```html
<section class="aurora-hero">
  <span class="eyebrow">Introducing</span>
  <h1>Build calmer, <span class="grad">brighter</span> products.</h1>
  <p>A soft aurora sets the mood; the content stays perfectly readable.</p>
  <button class="aurora-btn">Start free</button>
</section>
```
```css
.aurora-hero { max-width: 720px; margin-inline: auto; padding: 96px 20px; text-align: center;
  display: flex; flex-direction: column; align-items: center; gap: 16px; }
.aurora-hero .eyebrow { font-size: 0.78rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-muted); }
.aurora-hero h1 { font-size: clamp(2.2rem, 6vw, 4rem); line-height: 1.05; font-weight: 700; color: var(--ink); text-wrap: balance; }
.aurora-hero .grad { background: linear-gradient(120deg, var(--aurora-1), var(--aurora-3));
  -webkit-background-clip: text; background-clip: text; color: transparent; }
.aurora-hero p { color: var(--ink-muted); font-size: 1.1rem; max-width: 52ch; text-wrap: pretty; }
```

---

## 5. Stat tile (glass-calm on the glow)

```html
<div class="aurora-card aurora-stat">
  <span class="stat-label">Uptime</span>
  <div class="stat-value">99.98%</div>
  <span class="stat-sub">last 90 days</span>
</div>
```
```css
.aurora-stat { gap: 6px; }
.stat-label { font-size: 0.74rem; letter-spacing: 0.06em; text-transform: uppercase; color: var(--ink-muted); }
.stat-value { font-size: 2.3rem; font-weight: 800; line-height: 1; color: var(--ink); font-variant-numeric: tabular-nums; }
.stat-sub   { font-size: 0.82rem; color: var(--ink-muted); }
```

---

## 6. Navbar (translucent, lets the glow pass under it)

```html
<header class="aurora-nav">
  <a class="brand" href="#">Aurora</a>
  <nav class="nav-links"><a href="#" class="active">Product</a><a href="#">Docs</a><a href="#">Pricing</a></nav>
  <button class="aurora-btn">Sign in</button>
</header>
```
```css
.aurora-nav { position: sticky; top: 12px; z-index: 50; margin: 12px; padding: 10px 16px; border-radius: 16px;
  display: flex; align-items: center; gap: 18px; background: var(--surface); border: 1px solid var(--border);
  -webkit-backdrop-filter: blur(12px); backdrop-filter: blur(12px); box-shadow: 0 8px 32px rgba(15,23,42,0.06); }
.aurora-nav .brand { font-weight: 700; margin-right: auto; color: var(--ink); text-decoration: none; }
.nav-links { display: flex; gap: 4px; }
.nav-links a { padding: 8px 12px; border-radius: 10px; text-decoration: none; color: var(--ink-muted); font-weight: 500;
  transition: background var(--dur) var(--ease), color var(--dur) var(--ease); }
.nav-links a:hover  { background: rgba(255,255,255,0.6); color: var(--ink); }
.nav-links a.active { background: rgba(255,255,255,0.8); color: var(--ink); }
.nav-links a:focus-visible { outline: 2px solid var(--aurora-2); outline-offset: 2px; }
```

---

## Using this library (for the skill)

When a user wants an aurora / mesh-gradient look: **start from the background + calm surfaces here**,
then set 2–4 brand hues. Always:
1. Keep the aurora **behind** the UI; content sits on **calm near-neutral** surfaces.
2. Keep opacity **restrained** (0.4–0.65) and the `blur()` falloff **large** (40–80px).
3. Use **2–4 hues**, analogous or brand-aligned.
4. If it moves, it **drifts slowly** (20–40s) — climb the lightest-tool ladder before reaching for WebGL.
5. **Verify text contrast** over both the lightest and the most saturated part of the field.

## Quick checklist
- [ ] Background is soft blurred radial blobs, not hard linear stops
- [ ] Aurora opacity restrained (0.4–0.65); `blur()` 40–80px
- [ ] 2–4 hues only, analogous / brand-aligned
- [ ] Content surfaces calm/near-neutral — glow behind, not on, the text
- [ ] Text contrast verified over lightest AND most saturated areas
- [ ] Motion drifts slowly (20–40s), no pulsing; `prefers-reduced-motion` respected
- [ ] Animated background uses the lightest tool that works (CSS before WebGL); shader is hero-only + fallback

Pairs with: `../styles/aurora.md` (principles + the lightest-tool ladder), `../effects-performance.md`
(when heavy is justified), `color-theory.md` (choosing the hues), `accessibility.md` (contrast over the glow).
