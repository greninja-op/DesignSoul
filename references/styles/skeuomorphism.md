# Style: Skeuomorphism (Modern)

UI that imitates real materials and objects — leather, paper, metal, switches, dials.
The 2010 version was heavy and tacky. The modern version is restrained: subtle realism,
tactile depth, real material cues, without the stitched-leather excess.

> Use sparingly and intentionally. Skeuomorphism shines for products that benefit from
> physical metaphor — audio apps, instruments, calculators, watches, toggles, games.

> **Ready-to-use code:** drop-in skeuomorphic components (material panel, physical button, toggle,
> inset screen, input, slider, knob, navbar) live in `../recipes/skeuomorphism.md`. Use this file for
> the *why*; use the recipe library for the exact code.

---

## Core Principles

1. **Real light model** — a single consistent light source (usually top), shadows and highlights agree with it
2. **Layered depth** — bevels, inner shadows, and gradients build a sense of physical layers
3. **Material texture** — subtle grain/noise, brushed metal, paper fiber — never flat color
4. **Tactile controls** — buttons look pressable, switches look throwable, dials look turnable
5. **Restraint** — modern skeuomorphism suggests material; it doesn't photo-realistically render it

---

## Token System

```css
:root {
  --sk-bg:          #e8e6e1;        /* warm neutral "surface" */
  --sk-metal-1:     #f5f5f7;
  --sk-metal-2:     #c8c8cc;
  --sk-highlight:   rgba(255,255,255,0.85);
  --sk-shadow:      rgba(0,0,0,0.25);
  --sk-shadow-deep: rgba(0,0,0,0.40);
  --sk-text:        #2b2b2e;
  --sk-accent:      #2f7de1;
}
```

---

## Raised Physical Button

```css
.sk-button {
  background: linear-gradient(180deg, var(--sk-metal-1), var(--sk-metal-2));
  border-radius: 14px;
  padding: 14px 28px;
  color: var(--sk-text);
  font-weight: 600;
  border: 1px solid rgba(0,0,0,0.15);
  box-shadow:
    inset 0 1px 0 var(--sk-highlight),        /* top highlight catches light */
    inset 0 -2px 4px rgba(0,0,0,0.10),        /* inner bottom shadow */
    0 2px 3px var(--sk-shadow),               /* contact shadow */
    0 6px 12px rgba(0,0,0,0.12);              /* ambient */
  transition: all var(--duration-instant) var(--ease-out);
}
.sk-button:active {
  background: linear-gradient(180deg, var(--sk-metal-2), var(--sk-metal-1));
  box-shadow:
    inset 0 2px 4px var(--sk-shadow-deep),    /* pressed = inner shadow flips */
    0 1px 1px var(--sk-shadow);
  transform: translateY(1px);
}
```

---

## Toggle Switch (physical)

```css
.sk-switch {
  width: 56px; height: 32px; border-radius: 999px;
  background: linear-gradient(180deg, #c4c4c8, #e0e0e4);
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.30), inset 0 -1px 0 var(--sk-highlight);
  position: relative; cursor: pointer;
  transition: background var(--duration-fast) var(--ease-out);
}
.sk-switch .knob {
  position: absolute; top: 2px; left: 2px;
  width: 28px; height: 28px; border-radius: 50%;
  background: linear-gradient(180deg, #ffffff, #d8d8dc);
  box-shadow: 0 2px 3px rgba(0,0,0,0.35), inset 0 1px 0 #fff;
  transition: transform var(--duration-fast) var(--ease-spring);
}
.sk-switch[aria-checked="true"] {
  background: linear-gradient(180deg, #2f7de1, #5aa0f0);
}
.sk-switch[aria-checked="true"] .knob { transform: translateX(24px); }
```

---

## Material Texture (subtle)

```css
.sk-surface {
  background-color: var(--sk-bg);
  /* very subtle noise to avoid flat plastic look */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  border-radius: 18px;
  box-shadow: inset 0 1px 0 var(--sk-highlight), 0 8px 24px rgba(0,0,0,0.12);
}
```

---

## Inset Display / Screen

```css
.sk-display {
  background: #1c1f1a;
  color: #b6ff6b;                  /* phosphor-ish readout, optional */
  border-radius: 10px;
  padding: 16px;
  box-shadow:
    inset 0 2px 6px rgba(0,0,0,0.70),   /* recessed into the surface */
    inset 0 -1px 0 rgba(255,255,255,0.06);
}
```

---

## Skeuomorphism Checklist

- [ ] Single consistent light source (top) — all highlights/shadows agree
- [ ] Raised controls have top highlight + bottom inner shadow + contact shadow
- [ ] Pressed state flips to an inner/inset shadow (looks pushed in)
- [ ] Subtle material texture/noise — not flat plastic color
- [ ] Recessed elements (screens, inputs) use inset shadows
- [ ] Used intentionally for a product that benefits from physical metaphor
- [ ] Restrained — suggests material, doesn't photo-realistically over-render
- [ ] Text on textured/material surfaces still meets contrast
