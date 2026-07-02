# Neo-Brutalism — Component Code Library (ready to use)

Drop-in, production-ready neo-brutalist code for each common component. `../styles/neo-brutalism.md`
holds the *principles*; **this file holds the exact code** so the right version already exists when a
user asks for "a neubrutalist card / button / badge…". Every recipe bakes in the structural rules:

- **Hard offset shadow, zero blur** — `4px 4px 0 #111`. The shadow is a solid block, never soft.
- **Thick near-black border on everything** — 2–3px solid. It's the outline that holds the look together.
- **Flat, saturated color fills** — no gradients, no soft shadows. Pick 3–5 loud palette colors.
- **Small radius, not zero** — 4–8px. Zero radius is austere *brutalism*; pill is something else.
- **Press collapses the shadow** — on `:active` the element shifts into where its shadow was and the
  shadow shrinks to nothing. That physical "clunk" is the whole interaction feel.
- **Chunky type** — 700–800 weight, tight tracking on display sizes.
- **Accessible by default** — `:focus-visible`, `prefers-reduced-motion`, ≥44px hit areas, and text
  contrast checked against *every* colored fill.

> Define the tokens once. The look lives in three: `--nb-border`, `--nb-shadow`, and the flat palette.

```css
:root {
  --nb-bg:        #fffef2;                  /* warm off-white paper */
  --nb-ink:       #111111;
  --nb-border:    2px solid #111111;        /* on small controls; use 3px on big surfaces */
  --nb-shadow:    4px 4px 0 #111111;
  --nb-shadow-lg: 6px 6px 0 #111111;
  --nb-radius:    6px;
  /* loud flat palette — pick 3–5 */
  --nb-yellow:#ffd23f; --nb-pink:#ff5da2; --nb-blue:#4d9de0;
  --nb-green:#6bcb77;  --nb-purple:#9b5de5; --nb-orange:#ff7a00;
  --ease: cubic-bezier(0.2, 0, 0, 1);
  --dur:  120ms;
}

body { background: var(--nb-bg); color: var(--nb-ink);
  font-family: 'Space Grotesk','Archivo',Inter,system-ui,sans-serif; }

/* Shared block — border + hard shadow. Interactive blocks add the press behavior. */
.nb { border: var(--nb-border); border-radius: var(--nb-radius); box-shadow: var(--nb-shadow); }
.nb-press { transition: transform var(--dur) var(--ease), box-shadow var(--dur) var(--ease); }
.nb-press:hover  { transform: translate(-2px,-2px); box-shadow: var(--nb-shadow-lg); }
.nb-press:active { transform: translate(4px,4px);   box-shadow: 0 0 0 #111; }   /* shadow collapses */
@media (prefers-reduced-motion: reduce) {
  * { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
  .nb-press:hover, .nb-press:active { transform: none; }
}
```

---

## 1. Card (a different palette color per card)

```html
<article class="nb nb-press nb-card" style="background:var(--nb-pink)">
  <h3>Card title</h3>
  <p>Flat fill, thick border, hard shadow. Lifts on hover, clunks down on click.</p>
</article>
```
```css
.nb-card { padding: 24px; display: flex; flex-direction: column; gap: 8px; color: var(--nb-ink); }
.nb-card h3 { font-weight: 800; font-size: 1.25rem; }
.nb-card p  { font-weight: 500; line-height: 1.5; }
/* Note: pick fills where #111 text clears 4.5:1 — yellow/green/blue/pink pass; test purple/orange. */
```

---

## 2. Button

```html
<button class="nb nb-press nb-btn" style="background:var(--nb-yellow)">Get started</button>
<button class="nb nb-press nb-btn" style="background:#fff">Secondary</button>
```
```css
.nb-btn { min-height: 46px; padding: 0 24px; font-weight: 800; font-size: 0.98rem;
  color: var(--nb-ink); cursor: pointer; }
.nb-btn:focus-visible { outline: 3px solid var(--nb-ink); outline-offset: 3px; }
.nb-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: var(--nb-shadow); }
```

---

## 3. Input / form field (gains the hard shadow on focus)

```html
<label class="field">
  <span class="field-label">Email</span>
  <input class="nb nb-input" type="email" placeholder="you@site.com" />
</label>
```
```css
.field { display: flex; flex-direction: column; gap: 6px; }
.field-label { font-size: 0.8rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; }
.nb-input { background: #fff; min-height: 46px; padding: 0 16px; font-size: 1rem; font-weight: 500;
  color: var(--nb-ink); box-shadow: inset 2px 2px 0 rgba(0,0,0,0.06);
  transition: box-shadow var(--dur) var(--ease); }
.nb-input::placeholder { color: #6b6b60; }
.nb-input:focus-visible { outline: none; box-shadow: var(--nb-shadow); }
.nb-input[aria-invalid="true"] { background: #ffe9ef; }
```

---

## 4. Badge / tag

```html
<span class="nb nb-badge" style="background:var(--nb-green)">NEW</span>
<span class="nb nb-badge" style="background:var(--nb-blue)">v2.0</span>
```
```css
.nb-badge { display: inline-block; padding: 3px 10px; border-radius: 4px; box-shadow: 2px 2px 0 var(--nb-ink);
  font-weight: 800; font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.03em; color: var(--nb-ink); }
```

---

## 5. Stat tile

```html
<div class="nb nb-stat" style="background:var(--nb-blue)">
  <span class="stat-label">Signups</span>
  <div class="stat-value">1,204</div>
  <span class="stat-sub">▲ 18% this week</span>
</div>
```
```css
.nb-stat  { padding: 20px 22px; display: flex; flex-direction: column; gap: 6px; color: var(--nb-ink); }
.stat-label { font-size: 0.74rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; }
.stat-value { font-size: 2.4rem; font-weight: 800; line-height: 1; font-variant-numeric: tabular-nums; }
.stat-sub   { font-size: 0.82rem; font-weight: 700; }
```

---

## 6. Navbar

```html
<header class="nb nb-nav">
  <a class="brand" href="#">BRUTAL</a>
  <nav class="nav-links">
    <a href="#" class="active">Home</a><a href="#">Work</a><a href="#">Shop</a>
  </nav>
  <button class="nb nb-press nb-btn" style="background:var(--nb-yellow)">Sign in</button>
</header>
```
```css
.nb-nav { background: var(--nb-bg); margin: 14px; padding: 12px 16px;
  display: flex; align-items: center; gap: 16px; position: sticky; top: 14px; z-index: 50; }
.nb-nav .brand { font-weight: 800; font-size: 1.15rem; letter-spacing: -0.02em; margin-right: auto; text-decoration: none; color: var(--nb-ink); }
.nav-links { display: flex; gap: 6px; }
.nav-links a { padding: 8px 12px; border-radius: 5px; text-decoration: none; font-weight: 700; color: var(--nb-ink);
  border: 2px solid transparent; transition: background var(--dur) var(--ease); }
.nav-links a:hover  { background: #fff; border-color: var(--nb-ink); }
.nav-links a.active { background: var(--nb-yellow); border-color: var(--nb-ink); box-shadow: 3px 3px 0 var(--nb-ink); }
.nav-links a:focus-visible { outline: 3px solid var(--nb-ink); outline-offset: 2px; }
```

---

## 7. Toggle / switch (the knob has its own border + shadow)

```html
<button class="nb-switch" role="switch" aria-checked="true"><span class="knob"></span></button>
```
```css
.nb-switch { width: 62px; height: 34px; padding: 3px; cursor: pointer; border: var(--nb-border);
  border-radius: 6px; background: #fff; display: flex; box-shadow: var(--nb-shadow);
  transition: background var(--dur) var(--ease); }
.nb-switch .knob { width: 26px; height: 26px; border: var(--nb-border); border-radius: 4px; background: #fff;
  transition: transform var(--dur) var(--ease); }
.nb-switch[aria-checked="true"] { background: var(--nb-green); }
.nb-switch[aria-checked="true"] .knob { transform: translateX(28px); }
.nb-switch:focus-visible { outline: 3px solid var(--nb-ink); outline-offset: 3px; }
```

---

## 8. Tabs

```html
<div class="nb-tabs" role="tablist">
  <button role="tab" aria-selected="true">All</button>
  <button role="tab" aria-selected="false">Active</button>
  <button role="tab" aria-selected="false">Done</button>
</div>
```
```css
.nb-tabs { display: inline-flex; gap: 8px; }
.nb-tabs [role="tab"] { border: var(--nb-border); border-radius: 5px; background: #fff; cursor: pointer;
  padding: 8px 16px; font-weight: 800; color: var(--nb-ink);
  transition: transform var(--dur) var(--ease), box-shadow var(--dur) var(--ease); }
.nb-tabs [role="tab"][aria-selected="true"] { background: var(--nb-purple); color: #fff; box-shadow: var(--nb-shadow); }
.nb-tabs [role="tab"]:focus-visible { outline: 3px solid var(--nb-ink); outline-offset: 2px; }
```

---

## 9. Modal / dialog

```html
<div class="nb-overlay" role="dialog" aria-modal="true" aria-labelledby="m-title">
  <div class="nb nb-modal">
    <h2 id="m-title">Delete this?</h2>
    <p>This can't be undone. Really delete the project?</p>
    <div class="modal-actions">
      <button class="nb nb-press nb-btn" style="background:#fff">Cancel</button>
      <button class="nb nb-press nb-btn" style="background:var(--nb-pink)">Delete</button>
    </div>
  </div>
</div>
```
```css
.nb-overlay { position: fixed; inset: 0; z-index: 100; display: grid; place-items: center; padding: 20px;
  background: rgba(17,17,17,0.4); }
.nb-modal { width: min(440px,100%); background: var(--nb-bg); border-width: 3px; box-shadow: var(--nb-shadow-lg);
  padding: 26px; display: flex; flex-direction: column; gap: 12px; }
.nb-modal h2 { font-weight: 800; font-size: 1.5rem; }
.nb-modal p  { font-weight: 500; line-height: 1.5; }
.modal-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 8px; }
/* JS: trap focus, Esc closes, return focus to trigger on close (see ../accessibility.md) */
```

---

## 10. Display heading

```html
<h1 class="nb-display">SHIP<br>LOUD.</h1>
```
```css
.nb-display { font-weight: 800; font-size: clamp(2.5rem, 6vw, 5rem); line-height: 1;
  letter-spacing: -0.02em; color: var(--nb-ink); }
/* Optional: a highlighted word gets a flat block behind it */
.nb-display mark { background: var(--nb-yellow); color: var(--nb-ink); padding: 0 0.1em; box-decoration-break: clone; }
```

---

## Using this library (for the skill)

When a user wants neo-brutalism (or a specific component): **start from the matching recipe here**,
then set the palette. Always:
1. Put a **thick near-black border + hard offset shadow** on every surface and control.
2. Use **flat saturated fills** — pick 3–5 palette colors, a different one per card.
3. Keep radius **small (4–8px)**, never 0 (austere) or pill.
4. Make interactive elements **collapse their shadow on `:active`** (physical click).
5. Use **heavy type** (700–800), tight tracking on display.
6. **Check text contrast on every colored fill** — some loud colors need dark text; some need re-picking.

## Quick checklist
- [ ] Hard offset shadow, zero blur, on every surface/control
- [ ] Thick near-black border everywhere (2px controls / 3px big surfaces)
- [ ] Flat saturated fills, 3–5 palette colors, no gradients
- [ ] Small radius (4–8px), not 0 and not pill
- [ ] `:active` collapses the shadow (element shifts into it)
- [ ] Heavy display type (700–800)
- [ ] `:focus-visible` on every control; `prefers-reduced-motion` respected
- [ ] Text contrast ≥ 4.5:1 verified against every colored fill

Pairs with: `../styles/neo-brutalism.md` (principles), `../styles/brutalism.md` (the austere sibling),
`depth.md` (hard-shadow logic), `personality.md` (bold voice), `accessibility.md` (contrast, focus).
