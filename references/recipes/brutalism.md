# Brutalism — Component Code Library (ready to use)

Drop-in, production-ready brutalist code for each common component. `../styles/brutalism.md` holds the
*principles*; **this file holds the exact code** so the right version already exists when a user asks
for "a brutalist card / button / form…". Brutalism is disciplined, not lazy — every recipe is bold
enough to survive with no softening:

- **Zero radius** (2px maximum). Sharp corners are the point.
- **Offset shadows, no blur** — `6px 6px 0 #000`. Big, obvious, hard.
- **Maximum contrast** — black on white (or white on black). No mid-tones, no gradients ever.
- **ONE bright accent**, used like a weapon — neon yellow / hot pink / acid green, never muted.
- **Heavy type** — 800–900 weight, often uppercase, tight tracking, huge display sizes.
- **Intentional rawness** — generic/system fonts are a valid choice; deliberate misalignment is allowed.
- **Still accessible** — `:focus-visible`, `prefers-reduced-motion`, ≥44px hit areas, and the accent
  must clear contrast against whatever it sits on.

> Brutalism is austere. If you want loud multi-color blocks, that's `neo-brutalism.md`. Define the
> tokens once; the whole look is border + hard shadow + one accent.

```css
:root {
  --brut-bg:     #ffffff;              /* or #000000 — no middle ground */
  --brut-ink:    #000000;
  --brut-accent: #ff0066;              /* the ONE bright accent (or #ffff00 / #00ff66) */
  --brut-border: 3px solid #000000;    /* always thick, always black */
  --brut-shadow: 6px 6px 0 #000000;
  --brut-shadow-sm: 4px 4px 0 #000000;
  --ease: cubic-bezier(0.2, 0, 0, 1);
  --dur:  120ms;
}

body { background: var(--brut-bg); color: var(--brut-ink);
  font-family: Arial, Helvetica, system-ui, sans-serif; }   /* deliberately plain */

/* Shared block: thick border + hard shadow, sharp corners. Interactive blocks add press. */
.brut { border: var(--brut-border); border-radius: 0; box-shadow: var(--brut-shadow); background: var(--brut-bg); }
.brut-press { transition: transform var(--dur) var(--ease), box-shadow var(--dur) var(--ease); }
.brut-press:hover  { transform: translate(-3px,-3px); box-shadow: 9px 9px 0 var(--brut-ink); }
.brut-press:active { transform: translate(3px,3px);   box-shadow: 3px 3px 0 var(--brut-ink); }
@media (prefers-reduced-motion: reduce) {
  * { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
  .brut-press:hover, .brut-press:active { transform: none; }
}
```

---

## 1. Card

```html
<article class="brut brut-press brut-card">
  <h3>CARD TITLE</h3>
  <p>Raw, sharp, unapologetic. No rounding, no gradient, no soft shadow.</p>
</article>
```
```css
.brut-card { padding: 24px; display: flex; flex-direction: column; gap: 10px; }
.brut-card h3 { font-weight: 900; text-transform: uppercase; letter-spacing: -0.01em; font-size: 1.2rem; }
.brut-card p  { font-weight: 500; line-height: 1.5; }
/* Emphasis card: flip to inverse (black bg, white text) for the one that must dominate */
.brut-card.invert { background: var(--brut-ink); color: var(--brut-bg); box-shadow: 6px 6px 0 var(--brut-accent); }
```

---

## 2. Button (accent = primary, white = secondary)

```html
<button class="brut brut-press brut-btn brut-btn-accent">SUBMIT</button>
<button class="brut brut-press brut-btn">CANCEL</button>
```
```css
.brut-btn { min-height: 48px; padding: 0 28px; cursor: pointer; background: var(--brut-bg); color: var(--brut-ink);
  font-weight: 900; font-size: 1rem; letter-spacing: 0.05em; text-transform: uppercase; box-shadow: var(--brut-shadow-sm); }
.brut-btn-accent { background: var(--brut-accent); color: var(--brut-ink); }
.brut-btn:focus-visible { outline: 3px solid var(--brut-ink); outline-offset: 4px; }
.brut-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: var(--brut-shadow-sm); }
```

---

## 3. Input / form field (gains the hard shadow on focus)

```html
<label class="field">
  <span class="field-label">NAME</span>
  <input class="brut brut-input" type="text" placeholder="TYPE HERE" />
</label>
```
```css
.field { display: flex; flex-direction: column; gap: 6px; }
.field-label { font-weight: 900; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.06em; }
.brut-input { background: var(--brut-bg); min-height: 48px; padding: 0 16px; font-size: 1rem; font-weight: 500;
  color: var(--brut-ink); box-shadow: none; transition: box-shadow var(--dur) var(--ease); }
.brut-input::placeholder { color: #666; font-weight: 700; letter-spacing: 0.04em; }
.brut-input:focus-visible { outline: none; box-shadow: var(--brut-shadow-sm); }
.brut-input[aria-invalid="true"] { border-color: var(--brut-accent); }
```

---

## 4. Badge / label

```html
<span class="brut-badge">NEW</span>
<span class="brut-badge brut-badge-accent">SALE</span>
```
```css
.brut-badge { display: inline-block; border: var(--brut-border); border-radius: 0; padding: 2px 10px;
  background: var(--brut-bg); color: var(--brut-ink); font-weight: 900; font-size: 0.72rem;
  text-transform: uppercase; letter-spacing: 0.06em; box-shadow: 3px 3px 0 var(--brut-ink); }
.brut-badge-accent { background: var(--brut-accent); }
```

---

## 5. Stat block

```html
<div class="brut brut-stat">
  <span class="stat-label">USERS</span>
  <div class="stat-value">12,904</div>
  <span class="stat-sub">+ 22% MTD</span>
</div>
```
```css
.brut-stat  { padding: 22px; display: flex; flex-direction: column; gap: 4px; }
.stat-label { font-weight: 900; font-size: 0.76rem; text-transform: uppercase; letter-spacing: 0.08em; }
.stat-value { font-weight: 900; font-size: 2.8rem; line-height: 0.95; font-variant-numeric: tabular-nums; }
.stat-sub   { font-weight: 700; font-size: 0.82rem; color: var(--brut-accent); }
```

---

## 6. Navbar

```html
<header class="brut brut-nav">
  <a class="brand" href="#">STUDIO™</a>
  <nav class="nav-links">
    <a href="#" class="active">WORK</a><a href="#">ABOUT</a><a href="#">CONTACT</a>
  </nav>
</header>
```
```css
.brut-nav { background: var(--brut-bg); margin: 0 0 24px; padding: 14px 18px; border-width: 0 0 3px 0;
  border-style: solid; border-color: var(--brut-ink); box-shadow: none;
  display: flex; align-items: center; gap: 20px; position: sticky; top: 0; z-index: 50; }
.brut-nav .brand { font-weight: 900; font-size: 1.2rem; text-transform: uppercase; letter-spacing: -0.01em;
  margin-right: auto; text-decoration: none; color: var(--brut-ink); }
.nav-links { display: flex; gap: 4px; }
.nav-links a { padding: 8px 12px; text-decoration: none; font-weight: 800; text-transform: uppercase;
  font-size: 0.86rem; color: var(--brut-ink); border: 3px solid transparent; }
.nav-links a:hover  { border-color: var(--brut-ink); }
.nav-links a.active { background: var(--brut-accent); border-color: var(--brut-ink); }
.nav-links a:focus-visible { outline: 3px solid var(--brut-ink); outline-offset: 2px; }
```

---

## 7. Checkbox (big, square, accent-filled)

```html
<label class="brut-check"><input type="checkbox" checked><span class="box"></span> I AGREE</label>
```
```css
.brut-check { display: inline-flex; align-items: center; gap: 12px; cursor: pointer;
  font-weight: 800; text-transform: uppercase; font-size: 0.86rem; }
.brut-check input { position: absolute; opacity: 0; width: 0; height: 0; }
.brut-check .box { width: 28px; height: 28px; border: var(--brut-border); background: var(--brut-bg);
  display: grid; place-items: center; }
.brut-check input:checked + .box { background: var(--brut-accent); }
.brut-check input:checked + .box::after { content: "✕"; font-weight: 900; color: var(--brut-ink); }
.brut-check input:focus-visible + .box { outline: 3px solid var(--brut-ink); outline-offset: 3px; }
```

---

## 8. Tabs

```html
<div class="brut-tabs" role="tablist">
  <button role="tab" aria-selected="true">INDEX</button>
  <button role="tab" aria-selected="false">ARCHIVE</button>
  <button role="tab" aria-selected="false">INFO</button>
</div>
```
```css
.brut-tabs { display: inline-flex; }
.brut-tabs [role="tab"] { border: var(--brut-border); border-radius: 0; background: var(--brut-bg); cursor: pointer;
  padding: 10px 18px; font-weight: 900; text-transform: uppercase; font-size: 0.86rem; color: var(--brut-ink);
  margin-left: -3px; }                                     /* borders collapse into a shared line */
.brut-tabs [role="tab"]:first-child { margin-left: 0; }
.brut-tabs [role="tab"][aria-selected="true"] { background: var(--brut-ink); color: var(--brut-bg); }
.brut-tabs [role="tab"]:focus-visible { outline: 3px solid var(--brut-accent); outline-offset: -3px; position: relative; z-index: 1; }
```

---

## 9. Modal / dialog

```html
<div class="brut-overlay" role="dialog" aria-modal="true" aria-labelledby="m-title">
  <div class="brut brut-modal">
    <h2 id="m-title">ARE YOU SURE?</h2>
    <p>THIS ACTION IS PERMANENT.</p>
    <div class="modal-actions">
      <button class="brut brut-press brut-btn">NO</button>
      <button class="brut brut-press brut-btn brut-btn-accent">YES</button>
    </div>
  </div>
</div>
```
```css
.brut-overlay { position: fixed; inset: 0; z-index: 100; display: grid; place-items: center; padding: 20px;
  background: rgba(0,0,0,0.6); }
.brut-modal { width: min(440px,100%); background: var(--brut-bg); box-shadow: 10px 10px 0 var(--brut-ink);
  padding: 26px; display: flex; flex-direction: column; gap: 14px; }
.brut-modal h2 { font-weight: 900; text-transform: uppercase; font-size: 1.6rem; }
.brut-modal p  { font-weight: 600; }
.modal-actions { display: flex; justify-content: flex-end; gap: 12px; margin-top: 8px; }
/* JS: trap focus, Esc closes, return focus to trigger on close (see ../accessibility.md) */
```

---

## 10. Display heading

```html
<h1 class="brut-display">MAKE<br>IT<br>LOUD</h1>
```
```css
.brut-display { font-weight: 900; font-size: clamp(3rem, 8vw, 8rem); line-height: 0.9;
  letter-spacing: -0.03em; text-transform: uppercase; color: var(--brut-ink); }
.brut-display em { font-style: normal; background: var(--brut-accent); padding: 0 0.08em; }
```

---

## Using this library (for the skill)

When a user wants brutalism (or a specific component): **start from the matching recipe here**, then
choose the single accent. Always:
1. **Zero radius** (2px max), **thick black border**, **hard offset shadow** on surfaces.
2. **Max contrast** — pure black/white base, no gradients, no soft shadows.
3. Exactly **one bright accent**, used sparingly for emphasis and the primary action.
4. **Heavy type** (800–900), uppercase on display, tight tracking.
5. Interactive elements shift with the press (hover grows shadow, active shrinks it).
6. Keep it accessible — `:focus-visible`, reduced-motion, and verify the accent's contrast.

## Quick checklist
- [ ] Zero border-radius (2px maximum)
- [ ] Offset shadow with no blur; thick black borders
- [ ] Pure black/white base, no gradients, no soft shadows
- [ ] Exactly one bright accent, used sparingly
- [ ] Heavy display weight (800–900), uppercase where it fits
- [ ] `:focus-visible` on every control; `prefers-reduced-motion` respected
- [ ] Accent + text contrast ≥ 4.5:1 against their backgrounds

Pairs with: `../styles/brutalism.md` (principles), `../styles/neo-brutalism.md` (the colorful sibling
+ its recipe), `personality.md` (bold voice), `layout-grids.md` (intentional grid breaks), `accessibility.md`.
