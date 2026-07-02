# Material You (M3) — Component Code Library (ready to use)

Drop-in, production-ready Material 3 code for each common component. `../styles/material-you.md` holds
the *principles*; **this file holds the exact code** so the right version already exists when a user
asks for "a filled button / FAB / M3 card…". Every recipe bakes in what separates real Material You
from default unstyled-Android:

- **One seed color drives everything** — primary, container, and surface tones are all derived from a
  single brand hue. Never hand-pick unrelated role colors.
- **Tonal elevation** — a higher surface gets a *lighter tonal overlay*, not just a bigger shadow.
  Shadow is subtle and supporting.
- **State layers** — hover/press are a translucent overlay of the *on-color*, not a different color.
- **Large, friendly shapes** — a shape scale from 8px to fully-rounded; buttons and FAB are pills.
- **Expressive motion** — emphasized / spring easing, never plain linear.
- **Accessible by default** — on-colors clear 4.5:1 on their containers; `:focus-visible`, reduced-motion.

> Define the tonal tokens once from the seed hue (see `../color-theory.md`), then every component
> stays system-coherent. Swap the hue in `--seed-h` to rebrand the whole UI.

```css
:root {
  --seed-h: 255;                                   /* the one brand hue — everything derives from it */
  /* Primary roles */
  --md-primary:              hsl(var(--seed-h) 55% 52%);
  --md-on-primary:           #ffffff;
  --md-primary-container:    hsl(var(--seed-h) 70% 92%);
  --md-on-primary-container: hsl(var(--seed-h) 60% 22%);
  --md-tertiary:             hsl(calc(var(--seed-h) + 65) 45% 55%);
  /* Tonal surfaces — lighter tone = higher elevation */
  --md-surface:    hsl(var(--seed-h) 25% 99%);
  --md-surface-1:  hsl(var(--seed-h) 24% 97%);
  --md-surface-2:  hsl(var(--seed-h) 22% 95%);
  --md-surface-3:  hsl(var(--seed-h) 20% 93%);
  --md-surface-variant: hsl(var(--seed-h) 18% 90%);
  --md-on-surface:         hsl(var(--seed-h) 15% 13%);
  --md-on-surface-variant: hsl(var(--seed-h) 10% 40%);
  --md-outline:            hsl(var(--seed-h) 10% 60%);
  /* Shape scale */
  --md-xs: 8px; --md-sm: 12px; --md-md: 16px; --md-lg: 24px; --md-xl: 28px; --md-full: 9999px;
  /* Expressive motion */
  --md-emph:   cubic-bezier(0.2, 0, 0, 1);
  --md-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --dur: 200ms;
}

body { background: var(--md-surface); color: var(--md-on-surface); font-family: Roboto, Inter, system-ui, sans-serif; }
@media (prefers-reduced-motion: reduce) {
  * { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
}
```

---

## 1. Buttons (filled · tonal · outlined · text) — all pill-shaped, all with state layers

```html
<button class="md-btn md-filled">Save</button>
<button class="md-btn md-tonal">Share</button>
<button class="md-btn md-outlined">Cancel</button>
<button class="md-btn md-text">Learn more</button>
```
```css
.md-btn { position: relative; overflow: hidden; border: none; cursor: pointer;
  height: 40px; padding: 0 24px; border-radius: var(--md-full); font-weight: 500; font-size: 0.95rem;
  transition: box-shadow var(--dur) var(--md-emph); }
/* the translucent state layer shared by every variant */
.md-btn::after { content: ""; position: absolute; inset: 0; background: currentColor; opacity: 0;
  transition: opacity var(--dur) var(--md-emph); }
.md-btn:hover::after  { opacity: 0.08; }
.md-btn:active::after { opacity: 0.12; }
.md-btn:focus-visible { outline: 3px solid var(--md-primary); outline-offset: 2px; }
.md-btn:disabled { opacity: 0.38; cursor: not-allowed; }

.md-filled   { background: var(--md-primary); color: var(--md-on-primary); }
.md-tonal    { background: var(--md-primary-container); color: var(--md-on-primary-container); }
.md-outlined { background: transparent; color: var(--md-primary); border: 1px solid var(--md-outline); }
.md-text     { background: transparent; color: var(--md-primary); padding: 0 12px; }
```

---

## 2. Card (tonal elevation — lighter tone = higher, shadow is subtle)

```html
<article class="md-card">
  <h3>Card title</h3>
  <p>Elevation reads through tone first, shadow second.</p>
</article>
```
```css
.md-card { background: var(--md-surface-1); border-radius: var(--md-md); padding: 16px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.10); color: var(--md-on-surface);
  display: flex; flex-direction: column; gap: 8px; }
.md-card p { color: var(--md-on-surface-variant); line-height: 1.5; }
.md-card--elevated  { background: var(--md-surface-3); box-shadow: 0 2px 6px rgba(0,0,0,0.12); }
.md-card--clickable { cursor: pointer; position: relative; overflow: hidden;
  transition: box-shadow var(--dur) var(--md-emph); }
.md-card--clickable::after { content:""; position:absolute; inset:0; background: var(--md-on-surface); opacity:0;
  transition: opacity var(--dur) var(--md-emph); }
.md-card--clickable:hover::after  { opacity: 0.05; }
.md-card--clickable:active::after { opacity: 0.09; }
```

---

## 3. Text field (filled, M3 — underline that thickens to the accent on focus)

```html
<label class="md-field">
  <input type="text" placeholder=" " id="name" />
  <span class="md-label">Full name</span>
</label>
```
```css
.md-field { position: relative; display: block; }
.md-field input { width: 100%; height: 56px; padding: 22px 16px 8px; border: none;
  background: var(--md-surface-variant); color: var(--md-on-surface);
  border-radius: var(--md-xs) var(--md-xs) 0 0; border-bottom: 1px solid var(--md-outline);
  font-size: 1rem; transition: border-color var(--dur) var(--md-emph); }
.md-field input:focus { outline: none; border-bottom: 2px solid var(--md-primary); }
.md-label { position: absolute; left: 16px; top: 18px; color: var(--md-on-surface-variant);
  pointer-events: none; transition: transform var(--dur) var(--md-emph), color var(--dur) var(--md-emph);
  transform-origin: left; }
/* float the label up when focused or filled */
.md-field input:focus + .md-label,
.md-field input:not(:placeholder-shown) + .md-label { transform: translateY(-12px) scale(0.75); color: var(--md-primary); }
```

---

## 4. FAB (Floating Action Button)

```html
<button class="md-fab" aria-label="Compose"><svg width="24" height="24">…</svg></button>
```
```css
.md-fab { position: fixed; right: 24px; bottom: calc(24px + env(safe-area-inset-bottom));
  width: 56px; height: 56px; border: none; cursor: pointer; border-radius: var(--md-lg);
  background: var(--md-primary-container); color: var(--md-on-primary-container);
  box-shadow: 0 4px 10px rgba(0,0,0,0.18); display: grid; place-items: center;
  transition: transform var(--dur) var(--md-spring), box-shadow var(--dur) var(--md-emph); }
.md-fab:hover  { transform: scale(1.05); box-shadow: 0 6px 16px rgba(0,0,0,0.22); }
.md-fab:active { transform: scale(0.96); }
.md-fab:focus-visible { outline: 3px solid var(--md-primary); outline-offset: 3px; }
```

---

## 5. Switch (M3 — track + thumb that grows when on)

```html
<button class="md-switch" role="switch" aria-checked="true"><span class="thumb"></span></button>
```
```css
.md-switch { width: 52px; height: 32px; padding: 0; border: 2px solid var(--md-outline); cursor: pointer;
  border-radius: var(--md-full); background: var(--md-surface-variant); position: relative;
  transition: background var(--dur) var(--md-emph), border-color var(--dur) var(--md-emph); }
.md-switch .thumb { position: absolute; top: 50%; left: 6px; width: 16px; height: 16px; border-radius: 50%;
  background: var(--md-outline); transform: translateY(-50%);
  transition: transform var(--dur) var(--md-spring), width var(--dur) var(--md-spring), height var(--dur) var(--md-spring), background var(--dur) var(--md-emph); }
.md-switch[aria-checked="true"] { background: var(--md-primary); border-color: var(--md-primary); }
.md-switch[aria-checked="true"] .thumb { width: 24px; height: 24px; left: auto; right: 2px; background: var(--md-on-primary); }
.md-switch:focus-visible { outline: 3px solid var(--md-primary); outline-offset: 3px; }
```

---

## 6. Chip (assist / filter — filter chips get a tonal fill when selected)

```html
<button class="md-chip">Assist</button>
<button class="md-chip md-chip--selected" aria-pressed="true">✓ Filter</button>
```
```css
.md-chip { height: 32px; padding: 0 16px; border-radius: var(--md-xs); cursor: pointer;
  border: 1px solid var(--md-outline); background: transparent; color: var(--md-on-surface-variant);
  font-size: 0.86rem; font-weight: 500; position: relative; overflow: hidden;
  transition: background var(--dur) var(--md-emph); }
.md-chip::after { content:""; position:absolute; inset:0; background: currentColor; opacity:0; transition: opacity var(--dur) var(--md-emph); }
.md-chip:hover::after { opacity: 0.08; }
.md-chip--selected { background: var(--md-primary-container); color: var(--md-on-primary-container); border-color: transparent; }
.md-chip:focus-visible { outline: 3px solid var(--md-primary); outline-offset: 2px; }
```

---

## 7. Navigation bar (bottom, M3 — pill "active indicator" behind the icon)

```html
<nav class="md-navbar" aria-label="Primary">
  <a href="#" class="active" aria-current="page"><span class="pill">🏠</span><span>Home</span></a>
  <a href="#"><span class="pill">🔍</span><span>Search</span></a>
  <a href="#"><span class="pill">🔔</span><span>Alerts</span></a>
</nav>
```
```css
.md-navbar { position: fixed; left: 0; right: 0; bottom: 0; z-index: 60; display: flex; justify-content: space-around;
  background: var(--md-surface-2); padding: 10px 8px calc(10px + env(safe-area-inset-bottom)); }
.md-navbar a { display: flex; flex-direction: column; align-items: center; gap: 2px; min-width: 56px; min-height: 44px;
  text-decoration: none; color: var(--md-on-surface-variant); font-size: 0.72rem; }
.md-navbar .pill { display: grid; place-items: center; width: 56px; height: 32px; border-radius: var(--md-full);
  transition: background var(--dur) var(--md-emph); }
.md-navbar a.active { color: var(--md-on-surface); }
.md-navbar a.active .pill { background: var(--md-primary-container); color: var(--md-on-primary-container); }
.md-navbar a:focus-visible { outline: 3px solid var(--md-primary); outline-offset: 2px; border-radius: 8px; }
```

---

## 8. Dialog (M3 — large radius, tonal surface)

```html
<div class="md-scrim" role="dialog" aria-modal="true" aria-labelledby="m-title">
  <div class="md-dialog">
    <h2 id="m-title">Reset settings?</h2>
    <p>This restores every option to its default value.</p>
    <div class="md-dialog-actions">
      <button class="md-btn md-text">Cancel</button>
      <button class="md-btn md-text">Reset</button>
    </div>
  </div>
</div>
```
```css
.md-scrim { position: fixed; inset: 0; z-index: 100; display: grid; place-items: center; padding: 20px;
  background: rgba(0,0,0,0.4); }
.md-dialog { width: min(420px,100%); background: var(--md-surface-3); border-radius: var(--md-xl); padding: 24px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.2); display: flex; flex-direction: column; gap: 12px;
  animation: md-in var(--dur) var(--md-emph); }
.md-dialog p { color: var(--md-on-surface-variant); line-height: 1.5; }
.md-dialog-actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 8px; }
@keyframes md-in { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
/* JS: trap focus, Esc closes, return focus to trigger on close (see ../accessibility.md) */
```

---

## Using this library (for the skill)

When a user wants Material You / Material 3 (or a specific component): **start from the matching
recipe here**, then set `--seed-h` to the brand hue. Always:
1. Derive **all** color roles from the one seed; don't hand-pick unrelated colors.
2. Show elevation with **tone** (lighter surface = higher); keep shadow subtle.
3. Use **state-layer overlays** for hover/press, not new background colors.
4. Use **pill** shapes for buttons/FAB and the shape scale elsewhere.
5. Use **emphasized/spring** easing for motion.
6. Verify **on-color contrast** against every container (4.5:1); keep `:focus-visible`.

## Quick checklist
- [ ] Every color role derived from one seed hue
- [ ] Elevation is tonal first; shadow subtle/supporting
- [ ] Hover/press use translucent state-layer overlays (currentColor)
- [ ] Buttons + FAB are pill/large-rounded from the shape scale
- [ ] Emphasized or spring easing, never linear
- [ ] `:focus-visible` on every control; `prefers-reduced-motion` respected
- [ ] On-color contrast ≥ 4.5:1 on its container; no default unstyled-Material look

Pairs with: `../styles/material-you.md` (principles), `../color-theory.md` (deriving the tonal ramp),
`motion.md` (emphasized/spring easing), `accessibility.md` (contrast, focus), `depth.md` (tonal elevation).
