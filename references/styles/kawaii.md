# Style: Kawaii / Pastel

Japanese cute culture as UI: soft pastel palettes, pillowy rounded shapes, friendly faces, and a
mascot that guides the user. Warm, low-anxiety, comforting. Done right: gentle and delightful with
real legibility. Done wrong: a washed-out sea of low-contrast pastels where nothing is readable.

> Distinct from `claymorphism.md` (3D inflated shadows) — kawaii is flatter, softer, and leans on
> **faces, mascots, and rounded friendliness** more than heavy depth.

> **Ready-to-use code:** drop-in kawaii components (card, button, mascot chip, input, toggle, stat,
> navbar, modal) live in `../recipes/kawaii.md`. Use this file for the *why*; use the recipe for code.

---

## Core Principles

1. **Soft pastel palette** — pinks, lavenders, mints, butter yellows; low saturation, high lightness.
2. **Very rounded, pillowy shapes** — big radii, no sharp corners; everything looks huggable.
3. **Friendly faces & mascots** — a smiley, a blush, a little character; personality over chrome.
4. **Gentle depth** — soft, low-contrast shadows and a subtle border, never harsh.
5. **Rounded, warm type** — a friendly rounded sans; generous spacing; kind microcopy.
6. **Comfort motion** — soft bounces and wiggles; nothing abrupt.

> The trap: pastel-on-pastel fails contrast. Keep **text near-solid dark** (a warm charcoal), and
> use pastels for *surfaces and accents*, not body text.

---

## Token System

```css
:root {
  --kw-bg:      #fff5fb;                     /* barely-pink cream */
  --kw-surface: #ffffff;
  --kw-pink:    #ffb7d5;
  --kw-lav:     #c9b6ff;
  --kw-mint:    #a7ecd0;
  --kw-butter:  #ffe08a;
  --kw-accent:  #ff8fc0;                     /* the lead pastel accent */
  --kw-accent-ink:#7a2e52;                   /* readable text on the accent */
  --kw-ink:     #4a3b46;                     /* warm charcoal — the readable text color */
  --kw-ink-soft:#8a7a84;
  --kw-border:  #ffd9ea;
  --kw-shadow:  0 8px 20px rgba(255,150,195,0.28);
  --kw-radius:  22px;
  --kw-bounce:  cubic-bezier(0.34, 1.56, 0.64, 1);
  --kw-font:    'Baloo 2','Quicksand','Nunito',system-ui,sans-serif;
}
```

---

## Card

```css
.kw-card {
  background: var(--kw-surface);
  border: 2px solid var(--kw-border);
  border-radius: var(--kw-radius);
  box-shadow: var(--kw-shadow);
  padding: 22px;
  color: var(--kw-ink);
}
```

## Button (bouncy)

```css
.kw-btn {
  background: var(--kw-accent); color: var(--kw-accent-ink);
  border: none; border-radius: 999px; cursor: pointer;
  padding: 12px 26px; font-family: var(--kw-font); font-weight: 700;
  box-shadow: 0 6px 0 rgba(255,120,175,0.55);      /* soft bottom depth */
  transition: transform 160ms var(--kw-bounce), box-shadow 160ms var(--kw-bounce);
}
.kw-btn:hover  { transform: translateY(-2px); box-shadow: 0 9px 0 rgba(255,120,175,0.55); }
.kw-btn:active { transform: translateY(3px);  box-shadow: 0 3px 0 rgba(255,120,175,0.55); }
```

## Mascot chip (friendly face)

```css
.kw-mascot { display: inline-flex; align-items: center; gap: 8px;
  background: var(--kw-mint); color: var(--kw-ink); border-radius: 999px; padding: 6px 14px 6px 8px; font-weight: 700; }
.kw-mascot .face { width: 26px; height: 26px; border-radius: 50%; background: #fff; display: grid; place-items: center; font-size: 0.9rem; }
```

## Input

```css
.kw-input {
  background: var(--kw-surface); border: 2px solid var(--kw-border); border-radius: 16px;
  padding: 12px 16px; font-family: var(--kw-font); color: var(--kw-ink);
}
.kw-input::placeholder { color: var(--kw-ink-soft); }
.kw-input:focus { outline: none; border-color: var(--kw-accent); box-shadow: 0 0 0 4px rgba(255,143,192,0.25); }
```

## Typography

```css
/* Rounded friendly sans (Baloo 2, Quicksand, Nunito, Fredoka).
   Keep body text a warm charcoal, NOT a pastel, so it stays readable. */
.kw-title { font-family: var(--kw-font); font-weight: 800; color: var(--kw-ink); letter-spacing: -0.01em; }
```

---

## Kawaii / Pastel Checklist

- [ ] Soft pastel palette for surfaces/accents (low sat, high light)
- [ ] Very rounded, pillowy shapes; no sharp corners
- [ ] A friendly face / mascot / blush somewhere — personality present
- [ ] Gentle low-contrast shadows + soft border (never harsh)
- [ ] Rounded warm typeface; kind, gentle microcopy
- [ ] Body text is near-solid warm charcoal, NOT pastel (contrast ≥ 4.5:1)
- [ ] Bouncy but soft motion; `prefers-reduced-motion` respected
- [ ] `:focus-visible` present and clearly visible on pastel surfaces
