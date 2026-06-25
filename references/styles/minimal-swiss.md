# Style: Minimal / Swiss (International Typographic)

Restraint as the design. Built on a strict grid, generous whitespace, a tiny palette,
and typography that does almost all the work. Used by premium brands, editorial sites,
agencies, and any product that wants to signal confidence through what it leaves out.

> The hardest style to do well because there's nothing to hide behind. Every spacing
> value, every type choice, every alignment is visible.

---

## Core Principles

1. **Whitespace is the primary material** — generous, intentional, asymmetric
2. **Strict grid** — everything aligns to a baseline and columns; nothing floats randomly
3. **Tiny palette** — usually black + white + one accent, plus a couple of grays
4. **Typography carries hierarchy** — size, weight, and spacing, not color or boxes
5. **No decoration** — no gratuitous shadows, gradients, or borders; lines are functional
6. **Detail precision** — optical alignment, tracking, and rhythm must be exact

---

## Token System

```css
:root {
  --sw-bg:        #ffffff;
  --sw-ink:       #0a0a0a;
  --sw-gray-1:    #6b6b6b;   /* secondary text */
  --sw-gray-2:    #d4d4d4;   /* hairline rules */
  --sw-accent:    #1a1aff;   /* ONE accent — used sparingly (links, key action) */

  /* Spacing — a strict modular scale, used without exception */
  --sw-1: 8px;  --sw-2: 16px; --sw-3: 24px; --sw-4: 40px;
  --sw-5: 64px; --sw-6: 96px; --sw-7: 160px;

  --sw-rule: 1px solid var(--sw-gray-2);
}
```

---

## The Grid

```css
.sw-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: var(--sw-3);
  max-width: 1200px;
  margin-inline: auto;
  padding-inline: var(--sw-4);
}
/* Use asymmetric spans for tension: content in 7 cols, offset by 1 */
.sw-lead { grid-column: 2 / 9; }
.sw-aside { grid-column: 9 / 12; }
```

---

## Typography (does the heavy lifting)

```css
:root {
  /* Classic Swiss faces / web equivalents: Helvetica Now, Inter, Neue Haas,
     Suisse Int'l, or a grotesque like Space Grotesk / Archivo */
  --sw-font: 'Inter', 'Helvetica Neue', Arial, sans-serif;
}

.sw-display {
  font-family: var(--sw-font);
  font-size: clamp(3rem, 7vw, 6rem);
  font-weight: 600;
  line-height: 0.98;
  letter-spacing: -0.03em;     /* tight tracking on large text */
}
.sw-h2 {
  font-size: 1.5rem; font-weight: 600;
  letter-spacing: -0.01em; line-height: 1.2;
}
.sw-body {
  font-size: 1.0625rem; font-weight: 400;
  line-height: 1.6; max-width: 62ch;   /* measure control for readability */
}
.sw-label {
  font-size: 0.75rem; font-weight: 500;
  letter-spacing: 0.08em; text-transform: uppercase;   /* small caps labels */
  color: var(--sw-gray-1);
}
```

---

## Buttons & Links (understated)

```css
.sw-btn {
  background: var(--sw-ink);
  color: #fff;
  border: none;
  border-radius: 0;            /* sharp, or 2px max */
  padding: 14px 28px;
  font-weight: 500;
  letter-spacing: 0.01em;
  transition: opacity var(--duration-fast) var(--ease-out);
}
.sw-btn:hover { opacity: 0.82; }   /* understated — no lift, no scale */

.sw-link {
  color: var(--sw-ink);
  text-decoration: none;
  border-bottom: 1px solid var(--sw-ink);
  transition: color var(--duration-fast) var(--ease-out);
}
.sw-link:hover { color: var(--sw-accent); border-color: var(--sw-accent); }
```

---

## Dividers & Structure

```css
.sw-rule { border: none; border-top: var(--sw-rule); margin-block: var(--sw-4); }
/* Use hairline rules to structure sections instead of cards/boxes */
```

---

## Motion (subtle)

Swiss motion is quiet: short fades, small offsets, no bounce.

```css
.sw-reveal { animation: fadeUp var(--duration-slow) var(--ease-out) both; }
/* No scale, no spring. Movement is 8-12px max. */
```

---

## Minimal / Swiss Checklist

- [ ] Layout aligns to a strict grid; nothing floats arbitrarily
- [ ] Whitespace is generous and intentional (uses the spacing scale exclusively)
- [ ] Palette is black + white + at most one accent + 2 grays
- [ ] Hierarchy comes from type size/weight/spacing, not color or boxes
- [ ] Body text has a controlled measure (~60–70ch)
- [ ] Hairline rules structure sections instead of cards where possible
- [ ] No gratuitous shadows, gradients, or decoration
- [ ] Motion is quiet — short fades, small offsets, no bounce/scale
- [ ] Tracking is tight on large text, slightly wide on small caps labels
