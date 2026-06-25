# Style: Neumorphism

Soft. Embossed. The UI looks carved from the background.
The entire surface shares one color — depth comes entirely from light and shadow.

---

## Core Principle

Everything is the same background color. Elements appear raised (convex) or inset (concave) using two shadows — one light (top-left, simulating a light source from top-left) and one dark (bottom-right).

```css
:root {
  /* The single surface color — must be mid-toned, not pure white/black */
  --neu-bg: #E0E5EC;

  /* Shadow colors derived from the bg */
  --neu-shadow-light: rgba(255, 255, 255, 0.80);  /* lighter than bg */
  --neu-shadow-dark:  rgba(163, 177, 198, 0.60);  /* darker than bg */

  /* Text — must contrast against bg */
  --neu-text:        #4A5568;
  --neu-text-muted:  #718096;
  --neu-accent:      #6C63FF; /* the ONLY color accent — use sparingly */
}
```

---

## Raised Element (Default — Buttons, Cards)

```css
.neu-raised {
  background: var(--neu-bg);
  border-radius: 16px;
  border: none;
  box-shadow:
    6px 6px 12px var(--neu-shadow-dark),
    -6px -6px 12px var(--neu-shadow-light);
}
```

## Inset Element (Active State, Input Fields)

```css
.neu-inset {
  background: var(--neu-bg);
  border-radius: 16px;
  border: none;
  box-shadow:
    inset 4px 4px 8px var(--neu-shadow-dark),
    inset -4px -4px 8px var(--neu-shadow-light);
}
```

## Flat (Hover — transition between raised and inset)

```css
.neu-flat {
  background: var(--neu-bg);
  border-radius: 16px;
  border: none;
  box-shadow: none;
}
```

## Button Interaction

```css
.neu-button {
  background: var(--neu-bg);
  border-radius: 12px;
  padding: 14px 28px;
  box-shadow:
    5px 5px 10px var(--neu-shadow-dark),
    -5px -5px 10px var(--neu-shadow-light);
  transition: all var(--duration-fast) var(--ease-out);
  color: var(--neu-text);
  font-weight: 600;
  cursor: pointer;
  border: none;
}

.neu-button:hover {
  box-shadow:
    3px 3px 6px var(--neu-shadow-dark),
    -3px -3px 6px var(--neu-shadow-light);
}

.neu-button:active {
  box-shadow:
    inset 3px 3px 6px var(--neu-shadow-dark),
    inset -3px -3px 6px var(--neu-shadow-light);
}
```

## Neumorphism Rules

- **Never use on dark backgrounds** — light source only works on light mid-toned colors
- **One accent color only** — for the active/selected state
- **No border** — ever. Borders break the illusion
- **Radius is generous** — 12-20px minimum
- **Don't use for long text** — dark text on same-color bg has low contrast

---

## Neumorphism Checklist

- [ ] Only one surface color throughout
- [ ] No borders anywhere
- [ ] Inset state for active/pressed
- [ ] Single accent color only
- [ ] Not used on a dark background
- [ ] Text contrast checked — neumorphism's low contrast must still meet 4.5:1 for body text
