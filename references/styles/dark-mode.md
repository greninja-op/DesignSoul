# Dark Mode (Applies to Any Style)

Dark mode is not "invert the colors." It's a separate, deliberately tuned token set.
This file is the method for producing a correct dark variant of ANY DesignSoul style.

> Trigger: "dark mode", "dark theme", or "dark mode + <style>". When a style is named,
> apply that style's structure with this dark token strategy layered on top.

> **Ready-to-use code:** a tuned dark token layer, a no-flash theme toggle, the dark elevation
> pattern, and per-style dark overrides live in `../recipes/dark-mode.md`. Use this file for the
> *why* (the seven rules); use the recipe library for the exact code.

---

## The Seven Rules

1. **Never pure black surfaces.** Use a dark tinted neutral, e.g. `hsl(H, 14%, 8–12%)`.
   Pure `#000` makes shadows invisible and feels like a void.
2. **Elevation goes lighter, not darker.** In dark mode, higher surfaces are *lighter*
   (more white overlay), the opposite of light-mode drop shadows. Shadows barely read on dark.
3. **Desaturate accents slightly.** Fully saturated colors vibrate on dark backgrounds.
   Drop chroma ~10–20% and nudge lightness up for legibility.
4. **Soften text — don't use pure white.** Body text at `hsl(H, 10%, 90%)`, not `#fff`.
   Pure white on dark causes halation (glare/smearing).
5. **Re-check ALL contrast.** Ratios change completely. Light-on-dark needs re-verification.
6. **Borders become subtle light, not dark.** `rgba(255,255,255,0.08–0.14)` instead of dark lines.
7. **Reduce overall contrast of large fills.** Dark UIs are calmer; avoid stark white blocks.

---

## Dark Token Template

```css
:root[data-theme="dark"] {
  /* Surfaces — tinted toward the brand hue, lighter as elevation increases */
  --bg:            hsl(225, 16%, 8%);
  --surface:       hsl(225, 15%, 11%);
  --surface-1:     hsl(225, 14%, 14%);   /* card */
  --surface-2:     hsl(225, 13%, 17%);   /* dropdown */
  --surface-3:     hsl(225, 12%, 21%);   /* modal */

  --border:        rgba(255, 255, 255, 0.10);
  --border-strong: rgba(255, 255, 255, 0.16);

  --text-primary:   hsl(225, 10%, 92%);  /* not pure white */
  --text-secondary: hsl(225, 8%, 68%);
  --text-muted:     hsl(225, 7%, 50%);

  /* Accent — desaturated + lifted vs light mode */
  --primary:       hsl(255, 60%, 68%);
  --primary-hover: hsl(255, 60%, 74%);
  --primary-muted: hsla(255, 60%, 68%, 0.16);

  --success: hsl(150, 45%, 55%);
  --warning: hsl(38, 80%, 60%);
  --error:   hsl(2, 65%, 62%);
}
```

---

## Elevation in Dark Mode

```css
/* Light mode: elevation = bigger shadow.
   Dark mode: elevation = lighter surface + faint shadow. */
.card        { background: var(--surface-1); box-shadow: 0 1px 2px rgba(0,0,0,0.4); }
.dropdown    { background: var(--surface-2); box-shadow: 0 4px 12px rgba(0,0,0,0.5); }
.modal       { background: var(--surface-3); box-shadow: 0 16px 48px rgba(0,0,0,0.6); }
```

---

## Per-Style Dark Notes

- **Glassmorphism / Liquid Glass:** switch to the dark-glass tokens (`rgba(0,0,0,0.25)` fills,
  `rgba(255,255,255,0.12)` borders). Specular highlights stay light. Background gradient
  goes deep/saturated. These styles are *naturally* suited to dark.
- **Aurora:** use `--aurora-bg-dark`; let blobs glow more (opacity can rise to ~0.7 on dark).
- **Material You:** use M3 dark tonal palette — surfaces lighten with elevation via tonal overlay.
- **Neumorphism:** ⚠️ does NOT work in true dark mode (needs a mid-tone surface). If forced,
  use a dark *mid-gray* (`#2a2d34`), not black, and expect a weaker effect. Warn the user.
- **Claymorphism:** ⚠️ designed for light/friendly space; skip dark or expect it to lose its character.
- **Neo-brutalism:** invert to dark paper (`#15140f`) with the same loud fills; borders go light.
- **Skeuomorphism:** dark brushed-metal/graphite materials work well; keep the top light source.
- **Minimal/Swiss:** near-black bg (`#0a0a0a`), off-white ink, the one accent brightened slightly.

---

## Theme Switching

```css
/* Respect system preference by default, allow manual override via [data-theme] */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) { /* apply dark tokens */ }
}
```

Always provide a manual toggle if the product has settings; never trap the user in one theme.

---

## Dark Mode Checklist

- [ ] No pure-black surfaces — tinted dark neutrals only
- [ ] Higher elevation = lighter surface (not just bigger shadow)
- [ ] Accents desaturated/lifted vs light mode
- [ ] Body text is off-white, not pure `#fff`
- [ ] Borders are subtle light overlays, not dark lines
- [ ] ALL contrast re-verified for the dark palette
- [ ] System preference respected + manual toggle available
- [ ] Style-specific caveats handled (neumorphism/claymorphism warnings)
