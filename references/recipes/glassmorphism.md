# Glassmorphism — Component Code Library (ready to use)

Drop-in, production-ready glassmorphism code for each common component. `../styles/glassmorphism.md`
holds the *principles and tokens*; **this file holds the exact code** so the right version already
exists when a user asks for "a glass card / navbar / button…". Every recipe bakes in the hard rules
we learned the hard way:

- **The background carries the effect** — these components only read as glass over a *rich, varied,
  saturated* background (see the Background recipe first; a pale/flat bg makes them look like plastic).
- **Not over-frosted** — blur ~10px and a *low* fill alpha so you can see *through* the glass.
- **Light edge, not dark** — a 1px border + an inner top highlight is what says "glass" once the fill
  is barely there.
- **Contrast handled honestly** — text on glass leans on a faint scrim, not a thicker (opaque) panel;
  text directly on the vivid background uses a near-solid color.
- **Accessible by default** — visible `:focus-visible`, `prefers-reduced-motion`, ≥44px hit areas.

> All recipes use the tokens below. Define them once (from `../styles/glassmorphism.md`), then every
> component is consistent. Adjust the 3 dials — `--glass-blur`, `--glass-bg` alpha, `--glass-border` —
> to taste; everything else follows.

```css
:root {
  /* The 3 dials that define the glass */
  --glass-blur:        10px;                          /* frost. 8–12 = see-through; 16+ = opaque */
  --glass-bg:          rgba(255,255,255,0.08);        /* fill. lower = more transparent */
  --glass-bg-strong:   rgba(255,255,255,0.16);        /* for the few panels that need more body */
  --glass-border:      rgba(255,255,255,0.28);        /* the visible glass edge */
  --glass-highlight:   rgba(255,255,255,0.55);        /* inner top-left light catch */
  --glass-shadow:      0 8px 32px rgba(16,18,40,0.18);
  --glass-radius:      18px;
  --glass-text:        #0e1020;                       /* on light-tinted glass over a light bg */
  --glass-text-muted:  #3a3d52;
  /* Dark glass (over a deep vivid bg) */
  --glass-bg-dark:     rgba(255,255,255,0.06);
  --glass-border-dark: rgba(255,255,255,0.14);
  --glass-text-dark:   rgba(255,255,255,0.96);
  --glass-text-dark-muted: rgba(255,255,255,0.72);
  /* Accent (one only) */
  --accent:            #6d5efc;
  --accent-contrast:   #ffffff;
  /* Motion */
  --ease: cubic-bezier(0.22, 1, 0.36, 1);
  --dur:  180ms;
}

/* The shared glass surface — every component extends this */
.glass {
  background: var(--glass-bg);
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(135%);
  backdrop-filter: blur(var(--glass-blur)) saturate(135%);
  border: 1px solid var(--glass-border);
  border-radius: var(--glass-radius);
  box-shadow:
    var(--glass-shadow),
    inset 0 1px 0 var(--glass-highlight);   /* the inner top highlight that sells the glass */
  color: var(--glass-text);
}
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .glass { background: rgba(255,255,255,0.78); }   /* readable fallback when no backdrop-filter */
}
@media (prefers-reduced-motion: reduce) {
  * { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
}
```

---

## 0. Background (do this first — the glass depends on it)

Glass over a flat/pale background looks like plastic. Give it a rich, *varied* field so adjacent
cards each refract a different hue.

```css
.glass-bg {
  min-height: 100vh;
  background-color: hsl(248, 65%, 95%);
  background-image:
    radial-gradient(at 14% 12%, hsla(250,100%,64%,0.88) 0, transparent 55%),
    radial-gradient(at 88%  8%, hsla(292,100%,66%,0.82) 0, transparent 52%),
    radial-gradient(at 80% 82%, hsla(189,100%,54%,0.80) 0, transparent 55%),
    radial-gradient(at 14% 90%, hsla(332,100%,64%,0.80) 0, transparent 52%),
    radial-gradient(at 52% 48%, hsla(40,100%,68%,0.48)  0, transparent 45%);
  background-attachment: fixed;
}
.glass-bg.dark {
  background-color: hsl(245, 55%, 9%);   /* deep, NOT flat near-black */
  background-image:
    radial-gradient(at 14% 12%, hsla(256,95%,55%,0.62) 0, transparent 55%),
    radial-gradient(at 88%  8%, hsla(291,92%,55%,0.56) 0, transparent 52%),
    radial-gradient(at 80% 82%, hsla(190,95%,50%,0.48) 0, transparent 55%),
    radial-gradient(at 14% 90%, hsla(330,92%,54%,0.50) 0, transparent 52%),
    radial-gradient(at 52% 48%, hsla(275,88%,46%,0.42) 0, transparent 50%);
}
/* Text that sits DIRECTLY on the bg (page header, labels) — near-solid, not faint grey */
.on-bg          { color: #15172b; }
.on-bg-muted    { color: #3b3e57; }
.dark .on-bg       { color: #f4f3ff; }
.dark .on-bg-muted { color: rgba(255,255,255,0.74); }
```

---

## 1. Card

```html
<article class="glass glass-card">
  <h3>Card title</h3>
  <p>Body copy sits on a faint scrim so it stays legible without thickening the whole panel.</p>
</article>
```
```css
.glass-card {
  padding: 20px 22px;            /* concentric: outer radius ≈ inner padding + inner radius */
  display: flex; flex-direction: column; gap: 8px;
}
.glass-card.interactive { cursor: pointer; transition: transform var(--dur) var(--ease), box-shadow var(--dur) var(--ease); }
.glass-card.interactive:hover { transform: translateY(-3px);
  box-shadow: 0 14px 40px rgba(16,18,40,0.24), inset 0 1px 0 var(--glass-highlight); }
.glass-card.interactive:active { transform: translateY(-1px) scale(0.997); }
/* legibility scrim behind text-heavy content, instead of raising the panel opacity */
.glass-card p { color: var(--glass-text-muted); }
```

---

## 2. Stat tile (metric card)

```html
<div class="glass stat-tile">
  <span class="stat-label">Attendance</span>
  <div class="stat-value">94<span class="stat-unit">%</span></div>
  <div class="stat-bar"><i style="width:94%"></i></div>
  <span class="stat-sub">135 of 144 classes · on track</span>
</div>
```
```css
.stat-tile { padding: 18px 20px; display: flex; flex-direction: column; gap: 8px; }
.stat-label { font-size: 0.72rem; letter-spacing: 0.06em; text-transform: uppercase; color: var(--glass-text-muted); }
.stat-value { font-size: 2.25rem; font-weight: 700; line-height: 1; font-variant-numeric: tabular-nums; }
.stat-unit  { font-size: 1rem; font-weight: 600; margin-left: 2px; color: var(--glass-text-muted); }
.stat-bar   { height: 6px; border-radius: 999px; background: rgba(0,0,0,0.10); overflow: hidden; }
.stat-bar i { display: block; height: 100%; background: var(--accent); border-radius: inherit; }
.stat-sub   { font-size: 0.8rem; color: var(--glass-text-muted); }
/* Make ONE tile the hero (don't ship 3 identical tiles): */
.stat-tile.hero { background: var(--glass-bg-strong); }
.stat-tile.hero .stat-value { font-size: 2.75rem; }
```

---

## 3. Top navbar

```html
<header class="glass glass-nav">
  <a class="brand" href="#">Campus</a>
  <nav class="nav-links">
    <a href="#" class="active">Dashboard</a><a href="#">Subjects</a><a href="#">Results</a>
  </nav>
  <button class="btn btn-primary">Sign in</button>
</header>
```
```css
.glass-nav {
  position: sticky; top: 12px; z-index: 50;
  display: flex; align-items: center; gap: 20px;
  padding: 10px 16px; margin: 12px; border-radius: 16px;
}
.glass-nav .brand { font-weight: 700; margin-right: auto; }
.nav-links { display: flex; gap: 4px; }
.nav-links a { padding: 8px 12px; border-radius: 10px; color: var(--glass-text-muted);
  text-decoration: none; transition: background var(--dur) var(--ease), color var(--dur) var(--ease); }
.nav-links a:hover { background: rgba(255,255,255,0.18); color: var(--glass-text); }
.nav-links a.active { color: var(--glass-text); background: rgba(255,255,255,0.22); }
.nav-links a:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
```

---

## 4. Floating bottom tab bar (mobile) — reserves space so it never overlaps content

```html
<body>
  <main class="app-scroll"><!-- page content --></main>
  <nav class="glass tab-bar" aria-label="Primary">
    <a href="#" class="active" aria-current="page"><svg>…</svg><span>Dashboard</span></a>
    <a href="#"><svg>…</svg><span>Results</span></a>
    <a href="#"><svg>…</svg><span>Profile</span></a>
  </nav>
</body>
```
```css
.tab-bar {
  position: fixed; left: 50%; transform: translateX(-50%);
  bottom: calc(12px + env(safe-area-inset-bottom));
  display: flex; gap: 4px; padding: 8px; border-radius: 22px; z-index: 60;
}
/* CRITICAL: reserve space so the fixed bar never covers the last content */
.app-scroll { padding-bottom: calc(96px + env(safe-area-inset-bottom)); }
.tab-bar a { display: flex; flex-direction: column; align-items: center; gap: 2px;
  min-width: 44px; min-height: 44px; padding: 6px 12px; border-radius: 14px;
  font-size: 0.68rem; color: var(--glass-text-muted); text-decoration: none; }
.tab-bar a.active { color: var(--accent-contrast); background: var(--accent); }
.tab-bar a:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
```

---

## 5. Buttons (primary solid · glass secondary · ghost)

```html
<button class="btn btn-primary">Pay fees</button>
<button class="btn btn-glass">Cancel</button>
<button class="btn btn-ghost">Skip</button>
```
```css
.btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  height: 44px; padding: 0 20px; border-radius: 12px; font-weight: 600; font-size: 0.95rem;
  border: 1px solid transparent; cursor: pointer;
  transition: transform var(--dur) var(--ease), box-shadow var(--dur) var(--ease), background var(--dur) var(--ease); }
.btn:active { transform: scale(0.96); }                 /* scale-on-press */
.btn:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

.btn-primary { background: var(--accent); color: var(--accent-contrast);
  box-shadow: 0 6px 20px color-mix(in oklab, var(--accent) 45%, transparent); }   /* colored shadow */
.btn-primary:hover { transform: translateY(-2px);
  box-shadow: 0 10px 28px color-mix(in oklab, var(--accent) 55%, transparent); }

.btn-glass { background: var(--glass-bg-strong); color: var(--glass-text);
  border-color: var(--glass-border);
  -webkit-backdrop-filter: blur(var(--glass-blur)); backdrop-filter: blur(var(--glass-blur));
  box-shadow: inset 0 1px 0 var(--glass-highlight); }
.btn-glass:hover { background: rgba(255,255,255,0.24); }

.btn-ghost { background: transparent; color: var(--glass-text-muted); }
.btn-ghost:hover { background: rgba(255,255,255,0.14); color: var(--glass-text); }
```

---

## 6. Input / form field

```html
<label class="field">
  <span class="field-label">Email</span>
  <input class="glass-input" type="email" inputmode="email" placeholder="you@college.edu" />
</label>
```
```css
.field { display: flex; flex-direction: column; gap: 6px; }
.field-label { font-size: 0.82rem; color: var(--glass-text-muted); }     /* label is permanent, not the placeholder */
.glass-input {
  height: 46px; padding: 0 14px; border-radius: 12px; font-size: 1rem; color: var(--glass-text);
  background: var(--glass-bg-strong);
  -webkit-backdrop-filter: blur(var(--glass-blur)); backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);               /* a border — so it reads as an input, not a button */
  box-shadow: inset 0 1px 0 var(--glass-highlight);
  transition: border-color var(--dur) var(--ease), box-shadow var(--dur) var(--ease);
}
.glass-input::placeholder { color: color-mix(in oklab, var(--glass-text) 45%, transparent); }
.glass-input:focus-visible { outline: none; border-color: var(--accent);
  box-shadow: inset 0 1px 0 var(--glass-highlight), 0 0 0 3px color-mix(in oklab, var(--accent) 30%, transparent); }
.glass-input[aria-invalid="true"] { border-color: #e5484d; }
```

---

## 7. Modal / dialog

```html
<div class="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="m-title">
  <div class="glass modal">
    <h2 id="m-title">Confirm payment</h2>
    <p>You're about to pay ₹4,500 in fees. This can't be undone.</p>
    <div class="modal-actions">
      <button class="btn btn-glass">Cancel</button>
      <button class="btn btn-primary">Pay ₹4,500</button>
    </div>
  </div>
</div>
```
```css
.modal-overlay { position: fixed; inset: 0; z-index: 100; display: grid; place-items: center;
  padding: 20px; background: rgba(10,12,30,0.45);
  -webkit-backdrop-filter: blur(4px); backdrop-filter: blur(4px); }   /* dim+blur, not pure black */
.modal { width: min(440px, 100%); padding: 24px; background: var(--glass-bg-strong);
  display: flex; flex-direction: column; gap: 12px; }
.modal-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 8px; }
/* JS: trap focus inside, Esc closes, return focus to the trigger on close (see accessibility.md) */
```

---

## 8. Select / dropdown

```html
<div class="glass-select">
  <button class="glass-input select-trigger" aria-haspopup="listbox" aria-expanded="false">
    <span>Choose a semester</span><svg class="chev">▾</svg>
  </button>
  <ul class="glass select-menu" role="listbox" hidden>
    <li role="option">Semester 1</li><li role="option" aria-selected="true">Semester 2</li>
  </ul>
</div>
```
```css
.glass-select { position: relative; }
.select-trigger { display: flex; align-items: center; justify-content: space-between; width: 100%; }
.select-trigger .chev { transition: transform var(--dur) var(--ease); }
.select-trigger[aria-expanded="true"] .chev { transform: rotate(180deg); }
.select-menu { position: absolute; top: calc(100% + 6px); left: 0; right: 0; z-index: 40;
  list-style: none; margin: 0; padding: 6px; max-height: 260px; overflow: auto;
  background: var(--glass-bg-strong); }
.select-menu li { padding: 10px 12px; border-radius: 9px; cursor: pointer; }
.select-menu li:hover, .select-menu li[aria-selected="true"] { background: rgba(255,255,255,0.20); }
/* ≤4 options? use radios instead of a dropdown (see components.md) */
```

---

## 9. Badge / chip / pill

```html
<span class="chip">BCA · Semester 1</span>
<span class="chip chip-accent">2 fees due</span>
<span class="chip chip-success">On track</span>
```
```css
.chip { display: inline-flex; align-items: center; gap: 6px; height: 26px; padding: 0 10px;
  border-radius: 999px; font-size: 0.78rem; font-weight: 500;
  background: var(--glass-bg-strong); border: 1px solid var(--glass-border);
  -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px); color: var(--glass-text); }
.chip-accent  { background: color-mix(in oklab, var(--accent) 22%, transparent); border-color: color-mix(in oklab, var(--accent) 40%, transparent); }
.chip-success { background: rgba(36,180,126,0.18); border-color: rgba(36,180,126,0.4); }
```

---

## 10. Toggle / switch

```html
<button class="switch" role="switch" aria-checked="true"><span class="knob"></span></button>
```
```css
.switch { width: 46px; height: 28px; padding: 3px; border-radius: 999px; cursor: pointer;
  background: var(--glass-bg-strong); border: 1px solid var(--glass-border);
  -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px);
  display: flex; transition: background var(--dur) var(--ease); }
.switch .knob { width: 22px; height: 22px; border-radius: 50%; background: #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.3); transition: transform var(--dur) var(--ease); }
.switch[aria-checked="true"] { background: var(--accent); border-color: transparent; }
.switch[aria-checked="true"] .knob { transform: translateX(18px); }
.switch:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
```

---

## 11. Tabs

```html
<div class="glass tabs" role="tablist">
  <button role="tab" aria-selected="true">Overview</button>
  <button role="tab" aria-selected="false">Reviews</button>
  <button role="tab" aria-selected="false">Specs</button>
</div>
```
```css
.tabs { display: inline-flex; gap: 2px; padding: 4px; border-radius: 14px; }
.tabs [role="tab"] { border: 0; background: transparent; cursor: pointer;
  padding: 8px 16px; border-radius: 10px; font-weight: 600; color: var(--glass-text-muted);
  transition: background var(--dur) var(--ease), color var(--dur) var(--ease); }
.tabs [role="tab"][aria-selected="true"] { background: rgba(255,255,255,0.24); color: var(--glass-text); }
.tabs [role="tab"]:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
```

---

## Using this library (for the skill)

When a user wants glassmorphism (or a specific glass component): **start from the matching recipe
here**, then adapt the tokens to the project's accent and the page's real content. Always:
1. Establish a rich, varied **background** first (recipe 0) — without it none of these read as glass.
2. Keep blur ~8–12px and fill alpha low — verify you can see the background *through* the surfaces.
3. Keep the **1px border + inner highlight** on every glass surface.
4. Reserve space for any **fixed bar** (recipe 4) so it never overlaps content.
5. Use **one accent**; keep success/danger/warning as semantic-only colors.
6. Verify contrast over the *busiest* part of the background; text directly on the bg uses `.on-bg`.

## Quick checklist
- [ ] Background is rich/varied (recipe 0), not pale/flat
- [ ] You can see the background through every glass surface (not over-frosted)
- [ ] Every glass surface has border + inner highlight + `@supports` fallback
- [ ] One accent only; semantic colors reserved
- [ ] Fixed nav reserves content space; ≥44px hit areas; `:focus-visible` everywhere
- [ ] `prefers-reduced-motion` respected; no `transition: all`
- [ ] Contrast verified over the busiest background area (incl. text directly on the bg)

Pairs with: `../styles/glassmorphism.md` (principles + the frost↔transparency dial), `depth.md`
(shadows/gradients), `accessibility.md` (contrast, focus, ARIA), `components.md` (per-component UX
standards), `polish.md` (concentric radius, scale-on-press, hit areas).
