# Neumorphism — Component Code Library (ready to use)

Drop-in, production-ready neumorphism code for each common component. `../styles/neumorphism.md`
holds the *principles*; **this file holds the exact code** so the right version already exists when a
user asks for "a soft-UI card / button / toggle…". Every recipe bakes in what makes soft-UI work —
and the honest caveats that keep it usable:

- **One surface color for everything** — depth comes *only* from two shadows: a light one (top-left)
  and a dark one (bottom-right). The surface, page, and controls all share `--neu-bg`.
- **No borders. Ever.** A border instantly breaks the carved-from-one-material illusion.
- **Raised vs inset** — buttons/cards are *raised* (outer shadows); inputs, tracks, and pressed
  states are *inset* (shadows move inside). That inset is the whole interaction language.
- **Mid-toned background only** — never pure white or black; the light source needs a mid grey so
  both shadows are visible. No dark-mode neumorphism that reads.
- **One accent, used sparingly** — for the selected/active state only.
- **Contrast is the risk** — same-color text on same-color bg is low-contrast by nature. Body text
  must still hit 4.5:1, so text is a good few steps darker than the surface. Don't set long copy in it.

> The entire look is two shadow tokens derived from the background. Get `--neu-bg` and its light/dark
> shadow pair right and every component follows.

```css
:root {
  --neu-bg:          #e0e5ec;                      /* the ONE surface color — mid-toned */
  --neu-light:       rgba(255,255,255,0.85);       /* lighter than bg (top-left) */
  --neu-dark:        rgba(163,177,198,0.60);       /* darker than bg (bottom-right) */
  --neu-text:        #3d4759;                       /* several steps darker than bg for contrast */
  --neu-text-muted:  #6b7688;
  --neu-accent:      #6c63ff;                       /* the only color; active/selected only */
  --neu-radius:      18px;
  --ease: cubic-bezier(0.22, 1, 0.36, 1);
  --dur:  180ms;
  /* the reusable shadow pairs */
  --neu-raised: 6px 6px 12px var(--neu-dark), -6px -6px 12px var(--neu-light);
  --neu-inset:  inset 5px 5px 10px var(--neu-dark), inset -5px -5px 10px var(--neu-light);
}

body { background: var(--neu-bg); color: var(--neu-text); }

/* Shared surfaces — extend these; note: NO border on any of them */
.neu        { background: var(--neu-bg); border: none; border-radius: var(--neu-radius); box-shadow: var(--neu-raised); }
.neu-inset  { background: var(--neu-bg); border: none; border-radius: var(--neu-radius); box-shadow: var(--neu-inset); }
@media (prefers-reduced-motion: reduce) {
  * { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
}
```

---

## 1. Card

```html
<article class="neu neu-card">
  <h3>Card title</h3>
  <p>Carved from the background. Keep body copy short — soft-UI contrast is inherently gentle.</p>
</article>
```
```css
.neu-card { padding: 24px; display: flex; flex-direction: column; gap: 10px; }
.neu-card h3 { font-weight: 700; color: var(--neu-text); }
.neu-card p  { color: var(--neu-text-muted); line-height: 1.55; }
```

---

## 2. Button (raised → flat on hover → inset on press)

The press interaction is the point: the button sinks *into* the surface. Never add a border to fake it.

```html
<button class="neu-btn">Continue</button>
<button class="neu-btn neu-btn-accent">Save</button>
```
```css
.neu-btn {
  background: var(--neu-bg); border: none; cursor: pointer;
  min-height: 48px; padding: 0 26px; border-radius: 14px;
  font-weight: 600; font-size: 0.96rem; color: var(--neu-text);
  box-shadow: var(--neu-raised);
  transition: box-shadow var(--dur) var(--ease), color var(--dur) var(--ease);
}
.neu-btn:hover  { box-shadow: 3px 3px 6px var(--neu-dark), -3px -3px 6px var(--neu-light); }   /* flatter */
.neu-btn:active { box-shadow: var(--neu-inset); color: var(--neu-accent); }                    /* pressed in */
.neu-btn:focus-visible { outline: 2px solid var(--neu-accent); outline-offset: 3px; }
.neu-btn:disabled { opacity: 0.6; cursor: not-allowed; box-shadow: var(--neu-raised); }
/* Accent variant: colored text + faint tinted glow, still shadow-driven (no fill, no border) */
.neu-btn-accent { color: var(--neu-accent); }
.neu-btn-accent:hover { box-shadow: 3px 3px 6px var(--neu-dark), -3px -3px 6px var(--neu-light),
  0 0 0 0 transparent; }
```

---

## 3. Icon button (round, raised)

```html
<button class="neu-icon" aria-label="Play"><svg width="20" height="20">…</svg></button>
```
```css
.neu-icon { width: 52px; height: 52px; border-radius: 50%; border: none; cursor: pointer;
  background: var(--neu-bg); color: var(--neu-text); display: grid; place-items: center;
  box-shadow: var(--neu-raised); transition: box-shadow var(--dur) var(--ease); }
.neu-icon:hover  { box-shadow: 3px 3px 6px var(--neu-dark), -3px -3px 6px var(--neu-light); }
.neu-icon:active { box-shadow: var(--neu-inset); color: var(--neu-accent); }
.neu-icon:focus-visible { outline: 2px solid var(--neu-accent); outline-offset: 3px; }
```

---

## 4. Input / form field (always inset — it's a groove)

```html
<label class="field">
  <span class="field-label">Search</span>
  <input class="neu-input" type="search" placeholder="Type to search…" />
</label>
```
```css
.field { display: flex; flex-direction: column; gap: 6px; }
.field-label { font-size: 0.82rem; font-weight: 600; color: var(--neu-text-muted); }
.neu-input {
  min-height: 50px; padding: 0 18px; border: none; border-radius: 14px; font-size: 1rem;
  color: var(--neu-text); background: var(--neu-bg); box-shadow: var(--neu-inset);
  transition: box-shadow var(--dur) var(--ease);
}
.neu-input::placeholder { color: var(--neu-text-muted); }
.neu-input:focus-visible { outline: none;
  box-shadow: var(--neu-inset), 0 0 0 2px color-mix(in oklab, var(--neu-accent) 55%, transparent); }
```

---

## 5. Toggle / switch (inset track, raised knob)

```html
<button class="neu-switch" role="switch" aria-checked="true"><span class="knob"></span></button>
```
```css
.neu-switch { width: 62px; height: 34px; padding: 4px; border: none; cursor: pointer;
  border-radius: 999px; background: var(--neu-bg); display: flex; box-shadow: var(--neu-inset);
  transition: box-shadow var(--dur) var(--ease); }
.neu-switch .knob { width: 26px; height: 26px; border-radius: 50%; background: var(--neu-bg);
  box-shadow: 3px 3px 6px var(--neu-dark), -3px -3px 6px var(--neu-light);
  transition: transform var(--dur) var(--ease), background var(--dur) var(--ease); }
.neu-switch[aria-checked="true"] .knob { transform: translateX(28px); background: var(--neu-accent); }
.neu-switch:focus-visible { outline: 2px solid var(--neu-accent); outline-offset: 3px; }
```

---

## 6. Stat tile

```html
<div class="neu neu-stat">
  <span class="stat-label">Balance</span>
  <div class="stat-value">$4,820</div>
  <div class="neu-inset stat-bar"><i style="width:68%"></i></div>
</div>
```
```css
.neu-stat  { padding: 22px 24px; display: flex; flex-direction: column; gap: 10px; }
.stat-label { font-size: 0.74rem; letter-spacing: 0.06em; text-transform: uppercase; color: var(--neu-text-muted); }
.stat-value { font-size: 2.1rem; font-weight: 800; line-height: 1; color: var(--neu-text); font-variant-numeric: tabular-nums; }
.stat-bar   { height: 12px; border-radius: 999px; padding: 0; overflow: hidden; }
.stat-bar i { display: block; height: 100%; border-radius: inherit; background: var(--neu-accent); }
```

---

## 7. Navbar

```html
<header class="neu neu-nav">
  <a class="brand" href="#">Soft</a>
  <nav class="nav-links">
    <a href="#" class="active">Home</a><a href="#">Cards</a><a href="#">Settings</a>
  </nav>
  <button class="neu-icon" aria-label="Profile">🙂</button>
</header>
```
```css
.neu-nav { position: sticky; top: 14px; z-index: 50; margin: 14px;
  display: flex; align-items: center; gap: 16px; padding: 12px 16px; border-radius: 18px; }
.neu-nav .brand { font-weight: 800; margin-right: auto; color: var(--neu-text); }
.nav-links { display: flex; gap: 6px; }
.nav-links a { padding: 9px 14px; border-radius: 12px; text-decoration: none; font-weight: 600;
  color: var(--neu-text-muted); transition: box-shadow var(--dur) var(--ease), color var(--dur) var(--ease); }
.nav-links a:hover  { color: var(--neu-text); }
.nav-links a.active { color: var(--neu-accent); box-shadow: var(--neu-inset); }   /* selected = pressed in */
.nav-links a:focus-visible { outline: 2px solid var(--neu-accent); outline-offset: 2px; }
```

---

## 8. Segmented tabs (inset track, raised selected)

```html
<div class="neu-inset neu-tabs" role="tablist">
  <button role="tab" aria-selected="true">Overview</button>
  <button role="tab" aria-selected="false">Activity</button>
  <button role="tab" aria-selected="false">Report</button>
</div>
```
```css
.neu-tabs { display: inline-flex; gap: 6px; padding: 6px; border-radius: 14px; }
.neu-tabs [role="tab"] { border: none; background: transparent; cursor: pointer;
  padding: 9px 18px; border-radius: 10px; font-weight: 600; color: var(--neu-text-muted);
  transition: box-shadow var(--dur) var(--ease), color var(--dur) var(--ease); }
.neu-tabs [role="tab"][aria-selected="true"] { color: var(--neu-accent); background: var(--neu-bg);
  box-shadow: var(--neu-raised); }
.neu-tabs [role="tab"]:focus-visible { outline: 2px solid var(--neu-accent); outline-offset: 2px; }
```

---

## 9. Checkbox (inset default, accent-filled checked)

```html
<label class="neu-check"><input type="checkbox" checked><span class="box"></span> Remember me</label>
```
```css
.neu-check { display: inline-flex; align-items: center; gap: 10px; cursor: pointer; color: var(--neu-text); }
.neu-check input { position: absolute; opacity: 0; width: 0; height: 0; }
.neu-check .box { width: 26px; height: 26px; border-radius: 8px; background: var(--neu-bg);
  box-shadow: var(--neu-inset); display: grid; place-items: center; transition: box-shadow var(--dur) var(--ease); }
.neu-check input:checked + .box { box-shadow: var(--neu-raised); }
.neu-check input:checked + .box::after { content: "✓"; color: var(--neu-accent); font-weight: 800; font-size: 0.9rem; }
.neu-check input:focus-visible + .box { outline: 2px solid var(--neu-accent); outline-offset: 3px; }
```

---

## 10. Modal / dialog

```html
<div class="neu-overlay" role="dialog" aria-modal="true" aria-labelledby="m-title">
  <div class="neu neu-modal">
    <h2 id="m-title">Update settings?</h2>
    <p>Your changes will apply across all devices.</p>
    <div class="modal-actions">
      <button class="neu-btn">Cancel</button>
      <button class="neu-btn neu-btn-accent">Apply</button>
    </div>
  </div>
</div>
```
```css
.neu-overlay { position: fixed; inset: 0; z-index: 100; display: grid; place-items: center;
  padding: 20px; background: color-mix(in oklab, var(--neu-bg) 70%, #6b7688); }
.neu-modal { width: min(440px, 100%); padding: 26px; display: flex; flex-direction: column; gap: 12px; }
.neu-modal p { color: var(--neu-text-muted); line-height: 1.55; }
.modal-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 8px; }
/* JS: trap focus, Esc closes, return focus to trigger on close (see ../accessibility.md) */
```

---

## Using this library (for the skill)

When a user wants neumorphism (or a specific soft-UI component): **start from the matching recipe
here**, then set the palette. Always:
1. Pick a **mid-toned surface color** and use it for page, cards, and controls alike (never white/black).
2. Use **raised** shadows for cards/buttons, **inset** for inputs/tracks/pressed/selected states.
3. **No borders anywhere** — depth is shadows only.
4. Keep body copy short and set text several steps darker than the surface; **verify 4.5:1**.
5. **One accent**, on active/selected only.
6. Provide the press interaction (raised → inset) so controls feel physical.

## Quick checklist
- [ ] Single mid-toned surface color for everything (not pure white/black)
- [ ] Raised shadows for cards/buttons; inset for inputs, tracks, pressed & selected states
- [ ] Zero borders anywhere
- [ ] One accent only, on active/selected
- [ ] `:active` presses controls inward; `:focus-visible` on every control
- [ ] Body-text contrast ≥ 4.5:1 despite the low-contrast look
- [ ] `prefers-reduced-motion` respected

Pairs with: `../styles/neumorphism.md` (principles), `depth.md` (light-source shadow logic),
`accessibility.md` (the contrast caveat, focus), `polish.md` (press feedback, radius).
