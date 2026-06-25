# Style: Claymorphism

Soft. Inflated. Friendly 3D without being cartoonish.
Elements look like they're made of soft clay — rounded, puffy, colorful.

---

## Core Principle

Two shadows create the 3D clay effect — one outer (depth), one inner (top highlight that makes it look inflated).

```css
:root {
  /* Clay uses vivid, saturated backgrounds */
  --clay-bg:       #F0F4FF;    /* soft cool white */
  --clay-accent:   #6C63FF;    /* primary clay color */
  --clay-pink:     #FF6584;
  --clay-green:    #52D9A4;
  --clay-yellow:   #FFD166;
  --clay-orange:   #FF9A5C;

  /* Text */
  --clay-text:     #2D3748;
  --clay-text-muted: #718096;
}
```

## The Clay Effect

```css
.clay-card {
  background: white;
  border-radius: 24px; /* very rounded */
  border: none;
  padding: 24px;

  /* Outer shadow — depth */
  /* Inner shadow — top highlight that creates the "inflated" look */
  box-shadow:
    0 8px 0 rgba(0, 0, 0, 0.12),          /* bottom depth */
    0 16px 32px rgba(0, 0, 0, 0.08),       /* ambient shadow */
    inset 0 -4px 0 rgba(0, 0, 0, 0.06),   /* inner bottom edge */
    inset 0 4px 8px rgba(255, 255, 255, 0.80); /* inner top highlight */
}
```

## Clay Button

```css
.clay-btn {
  background: var(--clay-accent);
  border-radius: 16px;
  border: none;
  padding: 14px 28px;
  color: white;
  font-weight: 700;
  cursor: pointer;

  box-shadow:
    0 6px 0 rgba(90, 75, 210, 0.50),          /* bottom depth — darker version of bg */
    0 10px 20px rgba(108, 99, 255, 0.30),      /* glow */
    inset 0 -3px 0 rgba(0, 0, 0, 0.10),
    inset 0 3px 6px rgba(255, 255, 255, 0.30); /* top highlight */

  transition: all var(--duration-fast) var(--ease-spring);
}

.clay-btn:hover {
  transform: translateY(-3px);
  box-shadow:
    0 9px 0 rgba(90, 75, 210, 0.50),
    0 16px 28px rgba(108, 99, 255, 0.35),
    inset 0 -3px 0 rgba(0, 0, 0, 0.10),
    inset 0 3px 6px rgba(255, 255, 255, 0.30);
}

.clay-btn:active {
  transform: translateY(3px);
  box-shadow:
    0 2px 0 rgba(90, 75, 210, 0.50),
    0 4px 12px rgba(108, 99, 255, 0.20),
    inset 0 -1px 0 rgba(0, 0, 0, 0.10),
    inset 0 2px 4px rgba(255, 255, 255, 0.30);
}
```

## Clay Icon Components

Clay works beautifully for icon containers:

```css
.clay-icon {
  width: 56px;
  height: 56px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--clay-pink); /* use different clay colors per icon */

  box-shadow:
    0 4px 0 rgba(0, 0, 0, 0.12),
    0 8px 16px rgba(255, 101, 132, 0.30),
    inset 0 -2px 0 rgba(0, 0, 0, 0.08),
    inset 0 2px 4px rgba(255, 255, 255, 0.40);
}
```

## Claymorphism Rules

- **Very high border-radius** — 20-32px for cards, 16px for buttons
- **`inset` top highlight is essential** — this is what creates the inflated look
- **Bottom `box-shadow` offset with no blur** — this is the 3D depth
- **Colors are saturated but not neon** — bright pastels, not harsh
- **Spring easing on interactions** — things bounce back
- **Soft background** — off-white, light lavender, warm cream. Not pure white
- **No dark mode** — claymorphism lives in light, friendly space

---

## Claymorphism Checklist

- [ ] `inset` top highlight present (this creates the inflation)
- [ ] Bottom offset shadow for 3D depth
- [ ] Spring easing on all interactions
- [ ] Colors are saturated pastels, not neon
- [ ] Border-radius is very high (20-32px cards, 16px buttons)
- [ ] Soft background — not pure white
