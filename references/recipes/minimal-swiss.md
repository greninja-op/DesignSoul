# Minimal / Swiss — Component Code Library (ready to use)

Drop-in, production-ready Swiss/International-Typographic code. `../styles/minimal-swiss.md` holds the
*principles*; **this file holds the exact code** so the right restrained components already exist when
a user asks for "a minimal / editorial / clean layout." This is the hardest style to fake — there's
nothing to hide behind — so every recipe is about precision, not decoration:

- **Whitespace is the material** — generous, intentional, often asymmetric. Use the spacing scale only.
- **Strict grid** — everything aligns to columns and a baseline; nothing floats arbitrarily.
- **Tiny palette** — black + white + at most one accent + two grays.
- **Type carries hierarchy** — size, weight, and tracking do the work, not color or boxes.
- **Functional lines, no decoration** — hairline rules structure sections instead of cards.
- **Quiet motion** — short fades, 8–12px offsets, no bounce, no scale.
- **Accessible by default** — controlled measure, `:focus-visible`, reduced-motion, real contrast.

```css
:root {
  --sw-bg:     #ffffff;
  --sw-ink:    #0a0a0a;
  --sw-gray-1: #6b6b6b;                 /* secondary text */
  --sw-gray-2: #d4d4d4;                 /* hairline rules */
  --sw-accent: #1a1aff;                 /* ONE accent — links + the key action only */
  /* strict modular spacing scale — used without exception */
  --sw-1: 8px; --sw-2: 16px; --sw-3: 24px; --sw-4: 40px; --sw-5: 64px; --sw-6: 96px; --sw-7: 160px;
  --sw-rule: 1px solid var(--sw-gray-2);
  --sw-font: 'Inter', 'Helvetica Neue', Arial, sans-serif;
  --ease: cubic-bezier(0.22, 1, 0.36, 1);
  --dur: 220ms;
}

body { background: var(--sw-bg); color: var(--sw-ink); font-family: var(--sw-font); }
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition-duration: 0.01ms !important; }
}
```

---

## 1. The grid (asymmetric spans create tension)

```html
<div class="sw-grid">
  <div class="sw-lead"> <!-- primary content --> </div>
  <aside class="sw-aside"> <!-- secondary --> </aside>
</div>
```
```css
.sw-grid { display: grid; grid-template-columns: repeat(12, 1fr); column-gap: var(--sw-3);
  max-width: 1200px; margin-inline: auto; padding-inline: var(--sw-4); }
.sw-lead  { grid-column: 2 / 9; }        /* offset, not centered — deliberate asymmetry */
.sw-aside { grid-column: 9 / 12; }
@media (max-width: 720px) { .sw-lead, .sw-aside { grid-column: 1 / -1; } .sw-grid { padding-inline: var(--sw-3); } }
```

---

## 2. Typography (does the heavy lifting)

```html
<span class="sw-label">Case study</span>
<h1 class="sw-display">Restraint is the design.</h1>
<p class="sw-body">Hierarchy comes from size, weight, and spacing — not color or boxes.</p>
```
```css
.sw-display { font-size: clamp(3rem, 7vw, 6rem); font-weight: 600; line-height: 0.98; letter-spacing: -0.03em; text-wrap: balance; }
.sw-h2   { font-size: 1.5rem; font-weight: 600; letter-spacing: -0.01em; line-height: 1.2; }
.sw-body { font-size: 1.0625rem; font-weight: 400; line-height: 1.6; max-width: 62ch; text-wrap: pretty; }  /* measure control */
.sw-label { font-size: 0.75rem; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: var(--sw-gray-1); }
```

---

## 3. Buttons & links (understated — no lift, no scale)

```html
<button class="sw-btn">Read the report</button>
<a class="sw-link" href="#">View the archive</a>
```
```css
.sw-btn { background: var(--sw-ink); color: #fff; border: none; border-radius: 0; cursor: pointer;
  min-height: 48px; padding: 0 28px; font-weight: 500; letter-spacing: 0.01em;
  transition: opacity var(--dur) var(--ease); }
.sw-btn:hover { opacity: 0.82; }                       /* understated — no transform */
.sw-btn:focus-visible { outline: 2px solid var(--sw-accent); outline-offset: 3px; }
.sw-btn-secondary { background: transparent; color: var(--sw-ink); box-shadow: inset 0 0 0 1px var(--sw-ink); }

.sw-link { color: var(--sw-ink); text-decoration: none; border-bottom: 1px solid var(--sw-ink);
  transition: color var(--dur) var(--ease), border-color var(--dur) var(--ease); }
.sw-link:hover { color: var(--sw-accent); border-color: var(--sw-accent); }
.sw-link:focus-visible { outline: 2px solid var(--sw-accent); outline-offset: 3px; }
```

---

## 4. Input / form field (a functional line, not a box)

```html
<label class="sw-field">
  <span class="sw-label">Email</span>
  <input type="email" placeholder="you@studio.com" />
</label>
```
```css
.sw-field { display: flex; flex-direction: column; gap: var(--sw-1); }
.sw-field input { border: none; border-bottom: var(--sw-rule); border-radius: 0; background: transparent;
  padding: 10px 0; font-size: 1.0625rem; color: var(--sw-ink); transition: border-color var(--dur) var(--ease); }
.sw-field input::placeholder { color: var(--sw-gray-1); }
.sw-field input:focus { outline: none; border-bottom: 1px solid var(--sw-ink); }
.sw-field input:focus-visible { outline: none; border-bottom: 2px solid var(--sw-accent); }
```

---

## 5. Dividers / section structure (rules instead of cards)

```html
<section>…</section>
<hr class="sw-rule-line" />
<section>…</section>
```
```css
.sw-rule-line { border: none; border-top: var(--sw-rule); margin-block: var(--sw-4); }
/* A labelled section header: small-caps label + hairline, no box */
.sw-section-head { display: grid; grid-template-columns: max-content 1fr; align-items: center; gap: var(--sw-3); }
.sw-section-head::after { content: ""; border-top: var(--sw-rule); }
```

---

## 6. Data table (hairlines only — the Swiss table)

```html
<table class="sw-table">
  <thead><tr><th>Project</th><th>Year</th><th>Role</th></tr></thead>
  <tbody>
    <tr><td>Atlas</td><td>2026</td><td>Design</td></tr>
    <tr><td>Meridian</td><td>2025</td><td>Brand</td></tr>
  </tbody>
</table>
```
```css
.sw-table { width: 100%; border-collapse: collapse; font-size: 0.98rem; }
.sw-table th { text-align: left; font-size: 0.75rem; font-weight: 500; letter-spacing: 0.08em;
  text-transform: uppercase; color: var(--sw-gray-1); padding: 0 0 var(--sw-1); border-bottom: 1px solid var(--sw-ink); }
.sw-table td { padding: var(--sw-2) 0; border-bottom: var(--sw-rule); }
.sw-table tbody tr:hover td { color: var(--sw-accent); }
```

---

## 7. Navbar (type + one rule, no chrome)

```html
<header class="sw-nav">
  <a class="brand" href="#">Studio</a>
  <nav class="nav-links"><a href="#" class="active">Work</a><a href="#">About</a><a href="#">Contact</a></nav>
</header>
```
```css
.sw-nav { display: flex; align-items: baseline; gap: var(--sw-4); padding: var(--sw-3) var(--sw-4);
  border-bottom: var(--sw-rule); max-width: 1200px; margin-inline: auto; }
.sw-nav .brand { font-weight: 600; letter-spacing: -0.01em; margin-right: auto; text-decoration: none; color: var(--sw-ink); }
.nav-links { display: flex; gap: var(--sw-3); }
.nav-links a { text-decoration: none; color: var(--sw-gray-1); font-size: 0.95rem;
  transition: color var(--dur) var(--ease); }
.nav-links a:hover, .nav-links a.active { color: var(--sw-ink); }
.nav-links a:focus-visible { outline: 2px solid var(--sw-accent); outline-offset: 3px; }
```

---

## 8. Quiet motion (fades and small offsets only)

```css
.sw-reveal { animation: swFade var(--dur) var(--ease) both; }
@keyframes swFade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
/* No scale, no spring. Movement is 8–12px maximum. Stagger sparingly. */
```

---

## Using this library (for the skill)

When a user wants a minimal / Swiss / editorial-clean look: **start from the grid + type here**, then
set the one accent. Always:
1. Align everything to the **12-col grid**; use **asymmetric spans** for tension, not random floats.
2. Spend **whitespace** generously and only from the scale.
3. Keep the palette to **black + white + one accent + two grays**.
4. Build hierarchy with **type size/weight/tracking**; use **hairline rules**, not cards.
5. Keep body copy at a **controlled measure** (~60–70ch).
6. Keep motion **quiet** — short fades, ≤12px offset, no bounce/scale.

## Quick checklist
- [ ] Layout aligns to a strict grid; nothing floats arbitrarily
- [ ] Whitespace generous/intentional (spacing scale only)
- [ ] Palette: black + white + one accent + two grays
- [ ] Hierarchy from type, not color/boxes
- [ ] Body measure ~60–70ch
- [ ] Hairline rules structure sections instead of cards where possible
- [ ] No gratuitous shadows/gradients/decoration
- [ ] Motion quiet (fades, ≤12px, no bounce); `:focus-visible` + reduced-motion respected

Pairs with: `../styles/minimal-swiss.md` (principles), `layout-grids.md` (grid + baseline),
`spacing.md` (the scale), `microcopy.md` (precise copy), `accessibility.md`.
