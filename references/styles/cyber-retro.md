# Style: Cyber-Retro / Windows Desktop (Y2K OS)

The early-2000s operating-system aesthetic: Windows 95/XP window chrome, beveled gray buttons,
title bars, inset fields, tiled desktops, and pixel/system fonts, mixed with Y2K metallic gradients.
Playful nostalgia for Gen-Z and millennials. Done right: a convincing "old OS" with real usability.
Done wrong: a flat gray mess with none of the 3D bevel logic that made it work.

> Distinct from `retro-y2k.md` (vaporwave/holographic sky) and `pixel-art.md` (8-bit game UI). This
> is the **desktop-OS / window-chrome** flavor: title bars, bevels, dialog boxes, taskbars.

> **Ready-to-use code:** drop-in OS components (window, button, input, checkbox, taskbar, progress
> bar, dialog) live in `../recipes/cyber-retro.md`. Use this file for the *why*; use the recipe for code.

---

## Core Principles

1. **3D bevels via border tricks** — raised elements have a light top-left edge + dark bottom-right;
   inset elements invert it. This two-tone bevel is the whole visual language.
2. **Window chrome** — title bars (often a blue/teal gradient), min/max/close buttons, thick frames.
3. **System gray + one desktop accent** — classic `#c0c0c0` UI gray, teal/blue desktop, metallic gradients.
4. **Pixel / system type** — Tahoma/MS-Sans-like for UI; a pixel face for headers/accents.
5. **Sharp corners** — radius 0; this era had no rounding.
6. **Tactile press** — buttons flip their bevel inward on click (pushed in).

---

## Token System

```css
:root {
  --os-face:    #c0c0c0;                     /* the classic UI gray */
  --os-face-2:  #d9d9d9;
  --os-hi:      #ffffff;                     /* bevel highlight (top-left) */
  --os-lo:      #808080;                     /* bevel shadow (bottom-right) */
  --os-lo-2:    #404040;                     /* deep bevel line */
  --os-title-1: #1a52c9;                     /* title bar gradient (XP-ish blue) */
  --os-title-2: #4b9bff;
  --os-title-tx:#ffffff;
  --os-desktop: #128a86;                     /* teal desktop */
  --os-ink:     #0a0a0a;
  --os-accent:  #1a52c9;
  --os-ui:      'Tahoma','Segoe UI',system-ui,sans-serif;
  --os-pixel:   'VT323','Press Start 2P',monospace;
}
/* Reusable bevels */
.os-raised { border: 2px solid; border-color: var(--os-hi) var(--os-lo-2) var(--os-lo-2) var(--os-hi);
  box-shadow: inset 1px 1px 0 var(--os-face-2), inset -1px -1px 0 var(--os-lo); background: var(--os-face); }
.os-inset  { border: 2px solid; border-color: var(--os-lo-2) var(--os-hi) var(--os-hi) var(--os-lo-2);
  box-shadow: inset 1px 1px 0 var(--os-lo); background: #fff; }
```

---

## Window (title bar + body)

```css
.os-window { background: var(--os-face); border: 2px solid;
  border-color: var(--os-hi) var(--os-lo-2) var(--os-lo-2) var(--os-hi);
  box-shadow: inset 1px 1px 0 var(--os-face-2), inset -1px -1px 0 var(--os-lo); }
.os-titlebar { display: flex; align-items: center; gap: 8px; padding: 4px 6px;
  background: linear-gradient(90deg, var(--os-title-1), var(--os-title-2)); color: var(--os-title-tx);
  font-family: var(--os-ui); font-weight: 700; }
.os-titlebar .controls { margin-left: auto; display: flex; gap: 3px; }
.os-titlebar .controls button { width: 22px; height: 20px; font-size: 0.7rem; }
.os-window .body { padding: 14px; font-family: var(--os-ui); color: var(--os-ink); }
```

## Button (beveled, presses in)

```css
.os-btn {
  font-family: var(--os-ui); font-size: 0.9rem; color: var(--os-ink); cursor: pointer;
  background: var(--os-face); padding: 6px 16px; border-radius: 0;
  border: 2px solid; border-color: var(--os-hi) var(--os-lo-2) var(--os-lo-2) var(--os-hi);
  box-shadow: inset 1px 1px 0 var(--os-face-2), inset -1px -1px 0 var(--os-lo);
}
.os-btn:active {   /* bevel flips inward */
  border-color: var(--os-lo-2) var(--os-hi) var(--os-hi) var(--os-lo-2);
  box-shadow: inset 1px 1px 0 var(--os-lo); padding: 7px 15px 5px 17px;
}
.os-btn:focus-visible { outline: 1px dotted var(--os-ink); outline-offset: -4px; }
```

## Input (inset field)

```css
.os-input {
  font-family: var(--os-ui); color: var(--os-ink); background: #fff; border-radius: 0; padding: 6px 8px;
  border: 2px solid; border-color: var(--os-lo-2) var(--os-hi) var(--os-hi) var(--os-lo-2);
}
.os-input:focus { outline: none; }
```

## Desktop background (tiled)

```css
.os-desktop { min-height: 100vh; background: var(--os-desktop); padding: 20px; }
```

## Typography

```css
/* UI text = Tahoma/Segoe/MS-Sans-like. Accent headers can use a pixel face (VT323).
   Body copy stays the readable UI sans; pixel faces for titles only. */
.os-pixel { font-family: var(--os-pixel); }
```

---

## Cyber-Retro / OS Checklist

- [ ] Two-tone bevels: raised = light TL + dark BR; inset inverts it
- [ ] Window chrome present (title bar gradient, min/max/close, thick frame)
- [ ] System gray + one desktop accent; optional metallic gradient
- [ ] Sharp corners (radius 0)
- [ ] Buttons flip their bevel inward on `:active` (pushed in)
- [ ] System/pixel type used correctly (pixel for titles, UI sans for body)
- [ ] Text passes 4.5:1 (dark ink on gray/white); `:focus-visible` present
- [ ] `prefers-reduced-motion` respected for any window animations
