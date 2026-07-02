# Style: Brutalism

Raw. Unpolished. Aggressively intentional.
No gradients. No shadows (or massive obvious shadows). No rounded corners.
Heavy borders. Offset elements. Things that look like they'll break.

> **Ready-to-use code:** drop-in brutalist components (card, button, input, badge, navbar, checkbox,
> tabs, modal…) live in `../recipes/brutalism.md`. Use this file for the *why*; use the recipe library
> for the exact code.

---

## Core Principle

Brutalism is NOT lazy design. It's disciplined design that rejects decoration.
Every choice must be bold enough to survive without any softening.

```css
:root {
  /* Brutalist palette — maximum contrast, zero subtlety */
  --brut-black:   #000000;
  --brut-white:   #FFFFFF;
  --brut-yellow:  #FFFF00;  /* or hot pink, or acid green — ONE bright color */
  --brut-accent:  #FF0066;  /* the one accent — use it like a weapon */
  --brut-bg:      #FFFFFF;  /* or black — no middle ground */
  --brut-border:  3px solid #000000; /* always thick, always black */
}
```

## Brutalist Card

```css
.brut-card {
  background: white;
  border: var(--brut-border);
  border-radius: 0;
  padding: 24px;
  /* Offset shadow — visible, offset, no blur */
  box-shadow: 6px 6px 0 black;
  transition: box-shadow var(--duration-fast) var(--ease-out),
              transform var(--duration-fast) var(--ease-out);
}

.brut-card:hover {
  transform: translate(-3px, -3px);
  box-shadow: 9px 9px 0 black;
}

.brut-card:active {
  transform: translate(3px, 3px);
  box-shadow: 3px 3px 0 black;
}
```

## Brutalist Button

```css
.brut-button {
  background: var(--brut-yellow);
  border: var(--brut-border);
  border-radius: 0;
  padding: 14px 28px;
  font-weight: 900;
  font-size: 1rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: 4px 4px 0 black;
  transition: all var(--duration-fast) var(--ease-out);
}

.brut-button:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 black;
}

.brut-button:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0 black;
}
```

## Brutalist Input

```css
.brut-input {
  border: var(--brut-border);
  border-radius: 0;
  padding: 12px 16px;
  background: white;
  font-size: 1rem;
  outline: none;
  width: 100%;
}

.brut-input:focus {
  box-shadow: 4px 4px 0 black;
  outline: none;
}
```

## Typography for Brutalism

```css
/* Display: maximum impact */
.brut-display {
  font-weight: 900;
  font-size: clamp(3rem, 8vw, 8rem);
  line-height: 0.9;
  letter-spacing: -0.03em;
  text-transform: uppercase;
}

/* Body: readable but still personality */
body {
  font-family: 'Arial', sans-serif; /* Brutalism often uses system/generic fonts deliberately */
  font-size: 1rem;
  line-height: 1.5;
}
```

## Brutalism Rules

- **Zero border-radius** (or `border-radius: 2px` maximum)
- **Offset shadows only** — no blur. `box-shadow: 4px 4px 0 black`
- **One bright accent** — neon yellow, hot pink, acid green. Not muted
- **Heavy typography** — 800-900 weight, sometimes all caps
- **Grid breaks** — intentional misalignment, overflow, rotation is OK
- **No gradients** — flat fills only

---

## Brutalism Checklist

- [ ] Zero border-radius (or maximum 2px)
- [ ] Offset shadow with no blur
- [ ] One bright accent maximum
- [ ] No gradients
- [ ] Heavy display weight (800-900)
- [ ] Bright accent still passes contrast against its background
