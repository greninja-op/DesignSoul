# Style: Material You (Material Design 3 / Expressive)

Google's current design language. Dynamic color derived from a single seed, large rounded
shapes, tonal elevation (color, not just shadow), and expressive, springy motion.
Done right: friendly, accessible, system-coherent. Done wrong: flat default Material that
looks like an unstyled Android app.

> **Ready-to-use code:** drop-in M3 components (filled/tonal/outlined buttons, card, text field, FAB,
> switch, chip, nav bar, dialog…) live in `../recipes/material-you.md`. Use this file for the *why*;
> use the recipe library for the exact code.

---

## Core Principles

1. **Dynamic color from one seed** — an entire tonal palette is generated from a single source color
2. **Tonal elevation** — higher surfaces get a lighter tonal overlay, not just a bigger shadow
3. **Large, friendly shape scale** — generous rounding, with a few fully-rounded ("pill") elements
4. **State layers** — hover/press are translucent overlays of the on-color, not new colors
5. **Expressive motion** — spring-based, slightly bouncy, emphasized easing

---

## Dynamic Color (Seed → Roles)

Generate a tonal ramp from one brand seed, then map roles. (Conceptually mirrors M3's
tonal palettes; here as practical CSS tokens.)

```css
:root {
  /* Seed hue drives everything — pick from color-theory.md */
  --md-primary:            hsl(255, 55%, 52%);
  --md-on-primary:         #ffffff;
  --md-primary-container:  hsl(255, 70%, 92%);
  --md-on-primary-container: hsl(255, 60%, 22%);

  --md-secondary:          hsl(255, 20%, 48%);
  --md-tertiary:           hsl(320, 45%, 55%);

  /* Surfaces — tonal, slightly tinted toward primary */
  --md-surface:            hsl(255, 25%, 99%);
  --md-surface-1:          hsl(255, 24%, 97%);   /* +elevation = lighter overlay */
  --md-surface-2:          hsl(255, 22%, 95%);
  --md-surface-3:          hsl(255, 20%, 93%);
  --md-surface-variant:    hsl(255, 18%, 90%);

  --md-on-surface:         hsl(255, 15%, 13%);
  --md-on-surface-variant: hsl(255, 10%, 40%);
  --md-outline:            hsl(255, 10%, 60%);

  /* Shape scale */
  --md-shape-xs:  8px;
  --md-shape-sm:  12px;
  --md-shape-md:  16px;
  --md-shape-lg:  24px;
  --md-shape-xl:  28px;
  --md-shape-full: 9999px;

  /* Expressive motion */
  --md-ease-emphasized: cubic-bezier(0.2, 0, 0, 1);
  --md-ease-spring:     cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

---

## Filled Button

```css
.md-btn-filled {
  background: var(--md-primary);
  color: var(--md-on-primary);
  border: none;
  border-radius: var(--md-shape-full);   /* M3 buttons are pill-shaped */
  padding: 10px 24px;
  height: 40px;
  font-weight: 500;
  position: relative;
  overflow: hidden;
  transition: box-shadow var(--duration-fast) var(--ease-out);
}

/* State layer — translucent on-color overlay */
.md-btn-filled::after {
  content: '';
  position: absolute; inset: 0;
  background: var(--md-on-primary);
  opacity: 0;
  transition: opacity var(--duration-fast) var(--ease-out);
}
.md-btn-filled:hover::after  { opacity: 0.08; }
.md-btn-filled:active::after { opacity: 0.12; }
```

### Tonal & Outlined variants

```css
.md-btn-tonal {
  background: var(--md-primary-container);
  color: var(--md-on-primary-container);
  border: none; border-radius: var(--md-shape-full);
  padding: 10px 24px; height: 40px; font-weight: 500;
}
.md-btn-outlined {
  background: transparent;
  color: var(--md-primary);
  border: 1px solid var(--md-outline);
  border-radius: var(--md-shape-full);
  padding: 10px 24px; height: 40px; font-weight: 500;
}
```

---

## Card (Tonal Elevation)

```css
.md-card {
  background: var(--md-surface-1);
  border-radius: var(--md-shape-md);
  padding: 16px;
  /* Elevation is mostly tonal; shadow is subtle */
  box-shadow: 0 1px 2px rgba(0,0,0,0.10);
}
.md-card--elevated {
  background: var(--md-surface-3);   /* lighter tone = higher */
  box-shadow: 0 2px 6px rgba(0,0,0,0.12);
}
```

---

## Text Field (Filled, M3)

```css
.md-field {
  background: var(--md-surface-variant);
  border: none;
  border-bottom: 1px solid var(--md-outline);
  border-radius: var(--md-shape-xs) var(--md-shape-xs) 0 0;
  padding: 16px;
  color: var(--md-on-surface);
  transition: border-color var(--duration-fast) var(--ease-out);
}
.md-field:focus {
  outline: none;
  border-bottom: 2px solid var(--md-primary);
}
```

---

## FAB (Floating Action Button)

```css
.md-fab {
  width: 56px; height: 56px;
  border-radius: var(--md-shape-lg);
  background: var(--md-primary-container);
  color: var(--md-on-primary-container);
  border: none;
  box-shadow: 0 4px 10px rgba(0,0,0,0.18);
  display: grid; place-items: center;
  transition: transform var(--duration-fast) var(--md-ease-spring);
}
.md-fab:hover { transform: scale(1.05); }
.md-fab:active { transform: scale(0.96); }
```

---

## Material You Checklist

- [ ] Entire palette derived from ONE seed color (not ad-hoc role colors)
- [ ] Elevation is tonal (lighter surface = higher), shadow is subtle/supporting
- [ ] Hover/press use translucent state-layer overlays, not separate colors
- [ ] Buttons and FAB use pill / large rounded shapes from the shape scale
- [ ] Motion uses emphasized/spring easing, not linear ease
- [ ] On-colors meet contrast against their containers (4.5:1)
- [ ] No default unstyled-Material look — the seed color is clearly present
