# Retro / Y2K / Vaporwave — Component Code Library (ready to use)

Drop-in, production-ready Y2K/vaporwave code. `../styles/retro-y2k.md` holds the *principles*; **this
file holds the exact code** so the right loud-but-usable components already exist when a user asks for
"a Y2K / vaporwave / chrome / holographic look." Loud is not the same as unusable — every recipe keeps
structure and accessibility intact:

- **Saturated gradient atmosphere** — sunset/cyber gradients (purple → pink → cyan), not flat color.
- **Chrome & holographic surfaces** — metallic gradients and iridescent sheens on *display* text.
- **Glow & bloom** — neon outer glow on accents.
- **Pixel/display fonts for accents only** — body copy stays a clean readable sans.
- **Retro motifs as accents** — grid floor, scanlines, sparkles; never wallpaper over everything.
- **Accessible by default** — body text clears 4.5:1, `prefers-reduced-motion` kills the shimmer,
  effects use GPU-friendly transform/opacity, `:focus-visible` on controls.

```css
:root {
  --y2k-bg-1:#2a0a4a; --y2k-bg-2:#7b2ff7;                 /* deep purple → electric violet */
  --y2k-pink:#ff5db1; --y2k-cyan:#2de2e6; --y2k-lime:#b6ff3c;
  --y2k-chrome-1:#f0f0ff; --y2k-chrome-2:#9aa7d8;
  --y2k-ink:#1a0533; --y2k-text:#f5f0ff;
  --y2k-glow-pink: 0 0 16px rgba(255,93,177,0.7);
  --y2k-glow-cyan: 0 0 16px rgba(45,226,230,0.7);
  --font-display:'Orbitron', system-ui, sans-serif;       /* display/accent only */
  --font-body:'Inter', system-ui, sans-serif;             /* body stays clean */
  --ease: cubic-bezier(0.22, 1, 0.36, 1);
  --dur: 200ms;
}

body { background: var(--y2k-bg-1); color: var(--y2k-text); font-family: var(--font-body); }
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition-duration: 0.01ms !important; }
}
```

---

## 1. Atmosphere background (gradient sky + optional perspective grid)

```html
<div class="y2k-bg"><!-- content --></div>
```
```css
.y2k-bg { position: relative; min-height: 100vh; overflow: hidden; color: var(--y2k-text);
  background:
    radial-gradient(60% 50% at 50% 0%, var(--y2k-pink) 0%, transparent 55%),
    linear-gradient(180deg, var(--y2k-bg-2), var(--y2k-bg-1)); }
.y2k-bg::after {                                   /* perspective grid floor — an accent, not wallpaper */
  content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 40%; pointer-events: none; opacity: 0.25;
  background-image:
    linear-gradient(var(--y2k-cyan) 1px, transparent 1px),
    linear-gradient(90deg, var(--y2k-cyan) 1px, transparent 1px);
  background-size: 40px 40px; transform: perspective(300px) rotateX(60deg); transform-origin: bottom; }
.y2k-bg > * { position: relative; z-index: 1; }
```

---

## 2. Chrome & holographic display text (accents only — never body)

```html
<h1 class="y2k-chrome">CHROME</h1>
<h2 class="y2k-holo">HOLOGRAPHIC</h2>
```
```css
.y2k-chrome { font-family: var(--font-display); font-weight: 800; letter-spacing: -0.02em;
  background: linear-gradient(180deg, #fff 0%, var(--y2k-chrome-1) 40%, var(--y2k-chrome-2) 60%, #fff 100%);
  -webkit-background-clip: text; background-clip: text; color: transparent; text-shadow: 0 2px 0 rgba(0,0,0,0.2); }
.y2k-holo { font-family: var(--font-display); font-weight: 800;
  background: linear-gradient(120deg, var(--y2k-pink), var(--y2k-cyan), var(--y2k-lime), var(--y2k-pink));
  background-size: 300% 300%; -webkit-background-clip: text; background-clip: text; color: transparent;
  animation: holoShift 6s linear infinite; }
@keyframes holoShift { to { background-position: 300% 0; } }
/* reduced-motion: the global reset above freezes holoShift to a static iridescent gradient */
```

---

## 3. Button (glowing, pill)

```html
<button class="y2k-btn">ENTER</button>
<button class="y2k-btn y2k-btn-ghost">SKIP</button>
```
```css
.y2k-btn { border: 2px solid rgba(255,255,255,0.7); border-radius: 999px; cursor: pointer;
  min-height: 46px; padding: 0 28px; font-weight: 700; color: var(--y2k-ink);
  background: linear-gradient(135deg, var(--y2k-pink), var(--y2k-cyan)); box-shadow: var(--y2k-glow-pink);
  transition: transform var(--dur) var(--ease), box-shadow var(--dur) var(--ease); }
.y2k-btn:hover  { transform: translateY(-2px); box-shadow: var(--y2k-glow-cyan), 0 0 32px rgba(45,226,230,0.5); }
.y2k-btn:active { transform: translateY(0); }
.y2k-btn:focus-visible { outline: 3px solid var(--y2k-lime); outline-offset: 3px; }
.y2k-btn-ghost { background: rgba(255,255,255,0.08); color: var(--y2k-text); box-shadow: none;
  -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px); }
```

---

## 4. Card (holographic sheen sweep)

```html
<article class="y2k-card">
  <h3>Track 01</h3>
  <p>Glassy panel with a diagonal iridescent sheen.</p>
</article>
```
```css
.y2k-card { position: relative; overflow: hidden; padding: 24px; border-radius: 18px;
  background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.25);
  -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px);
  display: flex; flex-direction: column; gap: 8px; }
.y2k-card::before { content: ""; position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%); }
.y2k-card h3 { font-family: var(--font-display); font-weight: 700; }
.y2k-card p  { color: rgba(245,240,255,0.82); line-height: 1.55; }
```

---

## 5. Input / form field

```html
<label class="field">
  <span class="field-label">USERNAME</span>
  <input class="y2k-input" type="text" placeholder="enter_name" />
</label>
```
```css
.field { display: flex; flex-direction: column; gap: 6px; }
.field-label { font-family: var(--font-display); font-size: 0.74rem; letter-spacing: 0.1em; color: var(--y2k-cyan); }
.y2k-input { min-height: 46px; padding: 0 14px; border: 2px solid rgba(45,226,230,0.5); border-radius: 10px;
  background: rgba(26,5,51,0.5); color: var(--y2k-text); font-size: 1rem;
  transition: border-color var(--dur) var(--ease), box-shadow var(--dur) var(--ease); }
.y2k-input::placeholder { color: rgba(245,240,255,0.5); }
.y2k-input:focus-visible { outline: none; border-color: var(--y2k-cyan); box-shadow: var(--y2k-glow-cyan); }
```

---

## 6. Badge / tag (neon)

```html
<span class="y2k-badge">NEW</span>
<span class="y2k-badge y2k-badge-cyan">LIVE</span>
```
```css
.y2k-badge { display: inline-block; padding: 3px 12px; border-radius: 999px; font-family: var(--font-display);
  font-size: 0.72rem; font-weight: 700; letter-spacing: 0.06em; color: var(--y2k-ink);
  background: var(--y2k-pink); box-shadow: var(--y2k-glow-pink); }
.y2k-badge-cyan { background: var(--y2k-cyan); box-shadow: var(--y2k-glow-cyan); }
```

---

## 7. Toggle / switch (glowing track)

```html
<button class="y2k-switch" role="switch" aria-checked="true"><span class="knob"></span></button>
```
```css
.y2k-switch { width: 60px; height: 32px; padding: 3px; border: 2px solid rgba(255,255,255,0.5); cursor: pointer;
  border-radius: 999px; background: rgba(26,5,51,0.6); display: flex; transition: all var(--dur) var(--ease); }
.y2k-switch .knob { width: 24px; height: 24px; border-radius: 50%; background: #fff; transition: transform var(--dur) var(--ease); }
.y2k-switch[aria-checked="true"] { background: linear-gradient(135deg, var(--y2k-pink), var(--y2k-cyan)); box-shadow: var(--y2k-glow-cyan); }
.y2k-switch[aria-checked="true"] .knob { transform: translateX(28px); }
.y2k-switch:focus-visible { outline: 3px solid var(--y2k-lime); outline-offset: 3px; }
```

---

## 8. Navbar

```html
<header class="y2k-nav">
  <a class="brand y2k-chrome" href="#">Y2K</a>
  <nav class="nav-links"><a href="#" class="active">HOME</a><a href="#">MIX</a><a href="#">CREW</a></nav>
  <button class="y2k-btn">LOGIN</button>
</header>
```
```css
.y2k-nav { position: sticky; top: 12px; z-index: 50; margin: 12px; padding: 10px 16px; border-radius: 16px;
  display: flex; align-items: center; gap: 18px; background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.25); -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px); }
.y2k-nav .brand { font-family: var(--font-display); font-size: 1.2rem; margin-right: auto; text-decoration: none; }
.nav-links { display: flex; gap: 6px; }
.nav-links a { font-family: var(--font-display); font-size: 0.8rem; letter-spacing: 0.06em; padding: 8px 12px;
  border-radius: 8px; text-decoration: none; color: rgba(245,240,255,0.8); transition: all var(--dur) var(--ease); }
.nav-links a:hover  { color: var(--y2k-cyan); }
.nav-links a.active { color: var(--y2k-ink); background: var(--y2k-cyan); box-shadow: var(--y2k-glow-cyan); }
.nav-links a:focus-visible { outline: 3px solid var(--y2k-lime); outline-offset: 2px; }
```

---

## Using this library (for the skill)

When a user wants a Y2K / vaporwave / retro look: **start from the atmosphere + chrome text here**,
then keep it usable. Always:
1. Set a **saturated gradient atmosphere**; add grid floor / scanlines only as accents.
2. Use **chrome/holo** treatment on *display* text; keep **body copy a clean sans**.
3. Add **neon glow** on key accents; use pixel/display fonts for accents only.
4. **Verify body-text contrast** (4.5:1) despite the loudness.
5. Disable the **holo shimmer under `prefers-reduced-motion`**; keep effects transform/opacity-based.
6. Keep `:focus-visible` visible against the busy background (bright lime works well).

## Quick checklist
- [ ] Saturated gradient atmosphere, not flat color
- [ ] Chrome/holographic treatment on key display text only
- [ ] Neon glow/bloom on accent elements
- [ ] Pixel/retro fonts for accents ONLY — body stays clean sans
- [ ] Retro motifs (grid floor, scanlines) as accents, not wallpaper
- [ ] Body text passes contrast (4.5:1) despite the loudness
- [ ] `prefers-reduced-motion` disables the holo shimmer; effects are GPU-friendly
- [ ] `:focus-visible` clearly visible against the busy background

Pairs with: `../styles/retro-y2k.md` (principles), `motion.md` (GPU-friendly animation),
`personality.md` (loud voice), `effects-performance.md` (glow/blur budget), `accessibility.md`.
