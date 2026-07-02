# Claymorphism — Component Code Library (ready to use)

Drop-in, production-ready claymorphism code for each common component. `../styles/claymorphism.md`
holds the *principles*; **this file holds the exact code** so the right version already exists when a
user asks for "a clay card / button / icon tile…". Every recipe bakes in what makes clay read as clay:

- **Two shadows, always** — an outer *offset* shadow with no/low blur for 3D depth, plus an **inner
  top highlight** (`inset`) that makes the surface look inflated. Drop either one and it stops being clay.
- **Very high radius** — 20–32px on cards, 14–18px on buttons/controls. Clay is never sharp.
- **Saturated pastels, not neon** — bright but soft; one accent leads, the rest are playful support.
- **Soft background, never pure white** — off-white, lavender, or warm cream so white surfaces pop.
- **Spring easing** — controls lift on hover and *press down into the surface* on active.
- **Light only** — clay lives in a friendly light space; there is no dark-mode clay.
- **Accessible by default** — visible `:focus-visible`, `prefers-reduced-motion`, ≥44px hit areas.

> Define the tokens once, then every component is consistent. The whole look lives in two custom
> properties — `--clay-depth` (the outer offset shadow) and `--clay-emboss` (the inner highlight).

```css
:root {
  /* Surfaces & background */
  --clay-bg:        #eef1fb;                 /* soft cool white — NOT pure white */
  --clay-surface:   #ffffff;
  /* Playful palette (one leads, rest support) */
  --clay-accent:    #6c63ff;
  --clay-accent-dk: #5a4bd2;                 /* darker accent for the button's depth shadow */
  --clay-pink:      #ff6584;
  --clay-green:     #52d9a4;
  --clay-yellow:    #ffd166;
  --clay-orange:    #ff9a5c;
  /* Text */
  --clay-text:      #2d3748;
  --clay-text-muted:#718096;
  /* The two shadows that DEFINE clay */
  --clay-depth:     0 8px 0 rgba(0,0,0,0.10), 0 16px 32px rgba(45,55,72,0.12);
  --clay-emboss:    inset 0 -4px 0 rgba(0,0,0,0.06), inset 0 4px 8px rgba(255,255,255,0.85);
  --clay-radius:    26px;
  /* Motion — spring so things bounce */
  --spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --dur:    200ms;
}

body { background: var(--clay-bg); color: var(--clay-text); }

/* The shared clay surface — every component extends this */
.clay {
  background: var(--clay-surface);
  border: none;
  border-radius: var(--clay-radius);
  box-shadow: var(--clay-depth), var(--clay-emboss);
}
@media (prefers-reduced-motion: reduce) {
  * { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
}
```

---

## 1. Card

```html
<article class="clay clay-card">
  <h3>Card title</h3>
  <p>Soft, inflated, friendly. The inner top highlight is what makes it look puffed.</p>
</article>
```
```css
.clay-card { padding: 26px; display: flex; flex-direction: column; gap: 10px; }
.clay-card h3 { font-weight: 700; }
.clay-card p  { color: var(--clay-text-muted); line-height: 1.55; }
.clay-card.interactive { cursor: pointer; transition: transform var(--dur) var(--spring), box-shadow var(--dur) var(--spring); }
.clay-card.interactive:hover  { transform: translateY(-4px);
  box-shadow: 0 12px 0 rgba(0,0,0,0.10), 0 22px 40px rgba(45,55,72,0.16), var(--clay-emboss); }
.clay-card.interactive:active { transform: translateY(2px);
  box-shadow: 0 3px 0 rgba(0,0,0,0.10), 0 8px 18px rgba(45,55,72,0.12), var(--clay-emboss); }
```

---

## 2. Button (primary · soft · ghost)

The depth shadow is a **darker shade of the button's own color** — that's what makes it look like a
solid lump of clay, not a floating card. On press it sinks (offset shrinks).

```html
<button class="clay-btn">Get started</button>
<button class="clay-btn clay-btn-soft">Maybe later</button>
<button class="clay-btn clay-btn-ghost">Skip</button>
```
```css
.clay-btn {
  border: none; cursor: pointer; font-weight: 700; font-size: 0.98rem;
  min-height: 48px; padding: 0 26px; border-radius: 16px;
  color: #fff; background: var(--clay-accent);
  box-shadow:
    0 6px 0 var(--clay-accent-dk),
    0 12px 22px rgba(108,99,255,0.32),
    inset 0 -3px 0 rgba(0,0,0,0.10),
    inset 0 3px 6px rgba(255,255,255,0.30);
  transition: transform var(--dur) var(--spring), box-shadow var(--dur) var(--spring);
}
.clay-btn:hover  { transform: translateY(-3px);
  box-shadow: 0 9px 0 var(--clay-accent-dk), 0 18px 30px rgba(108,99,255,0.38),
    inset 0 -3px 0 rgba(0,0,0,0.10), inset 0 3px 6px rgba(255,255,255,0.30); }
.clay-btn:active { transform: translateY(4px);
  box-shadow: 0 2px 0 var(--clay-accent-dk), 0 5px 12px rgba(108,99,255,0.24),
    inset 0 -1px 0 rgba(0,0,0,0.10), inset 0 2px 4px rgba(255,255,255,0.30); }
.clay-btn:focus-visible { outline: 3px solid var(--clay-accent-dk); outline-offset: 3px; }
.clay-btn:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }

/* Soft = white clay lump with a neutral depth shadow */
.clay-btn-soft { background: var(--clay-surface); color: var(--clay-text);
  box-shadow: var(--clay-depth), var(--clay-emboss); }
.clay-btn-soft:hover  { transform: translateY(-3px);
  box-shadow: 0 11px 0 rgba(0,0,0,0.10), 0 20px 34px rgba(45,55,72,0.16), var(--clay-emboss); }
.clay-btn-soft:active { transform: translateY(3px);
  box-shadow: 0 3px 0 rgba(0,0,0,0.10), 0 7px 16px rgba(45,55,72,0.12), var(--clay-emboss); }

/* Ghost = no shadow until hover */
.clay-btn-ghost { background: transparent; color: var(--clay-text-muted); box-shadow: none; }
.clay-btn-ghost:hover { color: var(--clay-text); background: rgba(108,99,255,0.10); }
```

---

## 3. Icon tile (clay's signature — colorful puffed squares)

Use a **different clay color per icon** so a grid of them feels playful. Each color's depth shadow
is a tinted version of that color.

```html
<div class="clay-icon" style="--c:var(--clay-pink);   --glow:rgba(255,101,132,0.34)">🎨</div>
<div class="clay-icon" style="--c:var(--clay-green);  --glow:rgba(82,217,164,0.34)">🌱</div>
<div class="clay-icon" style="--c:var(--clay-yellow); --glow:rgba(255,209,102,0.40)">⭐</div>
```
```css
.clay-icon {
  width: 58px; height: 58px; border-radius: 18px; font-size: 1.5rem;
  display: grid; place-items: center; background: var(--c, var(--clay-accent));
  box-shadow:
    0 5px 0 rgba(0,0,0,0.10),
    0 9px 16px var(--glow, rgba(108,99,255,0.30)),
    inset 0 -2px 0 rgba(0,0,0,0.08),
    inset 0 2px 4px rgba(255,255,255,0.42);
}
```

---

## 4. Stat tile

```html
<div class="clay clay-stat">
  <span class="stat-label">Streak</span>
  <div class="stat-value">28<span class="stat-unit">days</span></div>
  <span class="stat-sub">personal best 🎉</span>
</div>
```
```css
.clay-stat  { padding: 22px 24px; display: flex; flex-direction: column; gap: 6px; }
.stat-label { font-size: 0.74rem; letter-spacing: 0.06em; text-transform: uppercase; color: var(--clay-text-muted); }
.stat-value { font-size: 2.4rem; font-weight: 800; line-height: 1; font-variant-numeric: tabular-nums; }
.stat-unit  { font-size: 0.95rem; font-weight: 700; margin-left: 6px; color: var(--clay-text-muted); }
.stat-sub   { font-size: 0.82rem; color: var(--clay-text-muted); }
```

---

## 5. Navbar

```html
<header class="clay clay-nav">
  <a class="brand" href="#">Clay</a>
  <nav class="nav-links">
    <a href="#" class="active">Home</a><a href="#">Explore</a><a href="#">Saved</a>
  </nav>
  <button class="clay-btn">Sign in</button>
</header>
```
```css
.clay-nav { position: sticky; top: 14px; z-index: 50; margin: 14px;
  display: flex; align-items: center; gap: 18px; padding: 12px 16px; border-radius: 20px; }
.clay-nav .brand { font-weight: 800; margin-right: auto; }
.nav-links { display: flex; gap: 4px; }
.nav-links a { padding: 9px 14px; border-radius: 12px; text-decoration: none;
  color: var(--clay-text-muted); font-weight: 600; transition: all var(--dur) var(--spring); }
.nav-links a:hover  { color: var(--clay-text); background: rgba(108,99,255,0.10); }
.nav-links a.active { color: var(--clay-accent);
  box-shadow: inset 3px 3px 6px rgba(163,177,198,0.5), inset -3px -3px 6px rgba(255,255,255,0.9); }
.nav-links a:focus-visible { outline: 3px solid var(--clay-accent); outline-offset: 2px; }
```

---

## 6. Input / form field (pressed-in clay)

Inputs read as **carved into** the surface — invert the shadows (inner depth, no outer offset).

```html
<label class="field">
  <span class="field-label">Email</span>
  <input class="clay-input" type="email" placeholder="you@studio.com" />
</label>
```
```css
.field { display: flex; flex-direction: column; gap: 6px; }
.field-label { font-size: 0.84rem; font-weight: 600; color: var(--clay-text-muted); }
.clay-input {
  min-height: 50px; padding: 0 18px; border: none; border-radius: 16px; font-size: 1rem;
  color: var(--clay-text); background: var(--clay-bg);
  box-shadow: inset 4px 4px 8px rgba(163,177,198,0.55), inset -4px -4px 8px rgba(255,255,255,0.9);
  transition: box-shadow var(--dur) var(--spring);
}
.clay-input::placeholder { color: var(--clay-text-muted); }
.clay-input:focus-visible { outline: none;
  box-shadow: inset 4px 4px 8px rgba(163,177,198,0.55), inset -4px -4px 8px rgba(255,255,255,0.9),
    0 0 0 3px rgba(108,99,255,0.35); }
.clay-input[aria-invalid="true"] { box-shadow: inset 4px 4px 8px rgba(255,101,132,0.4),
  inset -4px -4px 8px rgba(255,255,255,0.9); }
```

---

## 7. Toggle / switch

```html
<button class="clay-switch" role="switch" aria-checked="true"><span class="knob"></span></button>
```
```css
.clay-switch { width: 60px; height: 34px; padding: 4px; border: none; cursor: pointer;
  border-radius: 999px; background: var(--clay-bg); display: flex;
  box-shadow: inset 3px 3px 6px rgba(163,177,198,0.55), inset -3px -3px 6px rgba(255,255,255,0.9);
  transition: background var(--dur) var(--spring); }
.clay-switch .knob { width: 26px; height: 26px; border-radius: 50%; background: var(--clay-surface);
  box-shadow: 2px 2px 4px rgba(163,177,198,0.7), -1px -1px 3px rgba(255,255,255,0.9);
  transition: transform var(--dur) var(--spring); }
.clay-switch[aria-checked="true"] { background: var(--clay-accent); }
.clay-switch[aria-checked="true"] .knob { transform: translateX(26px); }
.clay-switch:focus-visible { outline: 3px solid var(--clay-accent); outline-offset: 3px; }
```

---

## 8. Chip / badge

```html
<span class="clay-chip">Beginner</span>
<span class="clay-chip clay-chip-accent">New</span>
<span class="clay-chip clay-chip-success">Done</span>
```
```css
.clay-chip { display: inline-flex; align-items: center; gap: 6px; height: 30px; padding: 0 14px;
  border-radius: 999px; font-size: 0.8rem; font-weight: 700; color: var(--clay-text);
  background: var(--clay-surface);
  box-shadow: 0 3px 0 rgba(0,0,0,0.08), inset 0 2px 4px rgba(255,255,255,0.8); }
.clay-chip-accent  { background: var(--clay-accent); color: #fff; box-shadow: 0 3px 0 var(--clay-accent-dk), inset 0 2px 4px rgba(255,255,255,0.3); }
.clay-chip-success { background: var(--clay-green); color: #0a3d2c; box-shadow: 0 3px 0 rgba(40,160,110,0.7), inset 0 2px 4px rgba(255,255,255,0.4); }
```

---

## 9. Modal / dialog

```html
<div class="clay-overlay" role="dialog" aria-modal="true" aria-labelledby="m-title">
  <div class="clay clay-modal">
    <h2 id="m-title">Nice work!</h2>
    <p>You finished today's goal. Keep the streak going tomorrow.</p>
    <div class="modal-actions">
      <button class="clay-btn clay-btn-soft">Later</button>
      <button class="clay-btn">Continue</button>
    </div>
  </div>
</div>
```
```css
.clay-overlay { position: fixed; inset: 0; z-index: 100; display: grid; place-items: center;
  padding: 20px; background: rgba(45,55,72,0.35); -webkit-backdrop-filter: blur(3px); backdrop-filter: blur(3px); }
.clay-modal { width: min(440px, 100%); padding: 28px; display: flex; flex-direction: column; gap: 12px;
  animation: clay-pop var(--dur) var(--spring); }
.clay-modal p { color: var(--clay-text-muted); line-height: 1.55; }
.modal-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 8px; }
@keyframes clay-pop { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
/* JS: trap focus, Esc closes, return focus to trigger on close (see ../accessibility.md) */
```

---

## 10. Segmented tabs (pressed-in track, raised selected)

```html
<div class="clay-tabs" role="tablist">
  <button role="tab" aria-selected="true">Day</button>
  <button role="tab" aria-selected="false">Week</button>
  <button role="tab" aria-selected="false">Month</button>
</div>
```
```css
.clay-tabs { display: inline-flex; gap: 4px; padding: 6px; border-radius: 16px; background: var(--clay-bg);
  box-shadow: inset 3px 3px 6px rgba(163,177,198,0.5), inset -3px -3px 6px rgba(255,255,255,0.9); }
.clay-tabs [role="tab"] { border: none; background: transparent; cursor: pointer;
  padding: 9px 18px; border-radius: 12px; font-weight: 700; color: var(--clay-text-muted);
  transition: all var(--dur) var(--spring); }
.clay-tabs [role="tab"][aria-selected="true"] { color: var(--clay-accent); background: var(--clay-surface);
  box-shadow: 0 3px 0 rgba(0,0,0,0.08), inset 0 2px 4px rgba(255,255,255,0.8); }
.clay-tabs [role="tab"]:focus-visible { outline: 3px solid var(--clay-accent); outline-offset: 2px; }
```

---

## Using this library (for the skill)

When a user wants claymorphism (or a specific clay component): **start from the matching recipe
here**, then adapt the palette to the project and the content. Always:
1. Set a **soft, non-white background** first — white clay surfaces need it to pop.
2. Keep **both shadows** on every raised surface (outer offset depth + inner top highlight).
3. Invert to **inset** shadows for inputs, toggle tracks, and pressed states (carved-in look).
4. Use **one lead accent**; let the pastel palette play only on icon tiles / decorative bits.
5. **Spring easing** everywhere; controls lift on hover and sink on press.
6. Keep radius high (20–32px cards). Check body-text contrast — pastel-on-white can fall short.

## Quick checklist
- [ ] Soft background, not pure white
- [ ] Every raised surface has BOTH the outer offset shadow and the inner top highlight
- [ ] Inputs / pressed states use inset shadows (carved in)
- [ ] Radius 20–32px on cards, 14–18px on controls
- [ ] One lead accent; pastels only as playful support
- [ ] Spring easing; lift on hover, sink on `:active`
- [ ] `:focus-visible` on every control; `prefers-reduced-motion` respected
- [ ] Body-text contrast ≥ 4.5:1 verified

Pairs with: `../styles/claymorphism.md` (principles), `depth.md` (layered shadows), `motion.md`
(spring easing), `accessibility.md` (contrast, focus), `polish.md` (concentric radius, press feedback).
