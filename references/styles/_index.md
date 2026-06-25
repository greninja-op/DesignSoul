# Style Index & Selection Guide

DesignSoul ships these visual styles. Load ONLY the file for the style the user named
(progressive disclosure — don't read all of them). If the user is unsure, use the
"Best for" column to recommend one.

| Style | File | Best for | Vibe |
|---|---|---|---|
| Glassmorphism | `glassmorphism.md` | Dashboards, overlays, modern landing | Frosted, layered, airy |
| Liquid Glass | `liquid-glass.md` | Apple-like apps, premium product, iOS/visionOS feel | Refractive, alive, premium |
| Material You | `material-you.md` | Android/cross-platform apps, friendly products | Dynamic color, tactile |
| Aurora / Mesh | `aurora.md` | SaaS landing, AI products, hero sections | Soft glow, premium calm |
| Bento Grid | `bento.md` | Feature sections, dashboards, portfolios (LAYOUT, pairs with any skin) | Modular, scannable |
| Minimal / Swiss | `minimal-swiss.md` | Editorial, agencies, luxury, confident brands | Restrained, typographic |
| Warm Editorial | `warm-editorial.md` | AI products, long-form, brand sites, docs | Cream paper, terracotta, human |
| Neumorphism | `neumorphism.md` | Niche UI, music/audio controls, single-surface apps | Soft, embossed, calm |
| Claymorphism | `claymorphism.md` | Playful consumer, education, kids | Puffy, friendly, 3D |
| Brutalism | `brutalism.md` | Editorial, statements, anti-corporate | Raw, austere, bold |
| Neo-Brutalism | `neo-brutalism.md` | Indie SaaS, portfolios, playful-but-structured | Loud color, hard shadows |
| Skeuomorphism | `skeuomorphism.md` | Instruments, calculators, watches, games | Material, tactile realism |
| Retro / Y2K | `retro-y2k.md` | Music, gaming, fashion, events, creative | Nostalgic, neon, expressive |
| Dark Mode | `dark-mode.md` | Cross-cutting — apply to ANY style above | Tuned dark variant |

---

## How to Choose (if the user hasn't named one)

Ask one question if it's genuinely unclear, otherwise infer from the product:

- **Premium / Apple-like / "wow"** → Liquid Glass or Aurora
- **Modern SaaS that should look current** → Aurora + Bento layout
- **Friendly consumer / app** → Material You or Claymorphism
- **Serious / editorial / luxury** → Minimal-Swiss or Brutalism
- **Warm / human / readable (AI product, docs, long-form)** → Warm Editorial
- **Playful indie / standout** → Neo-Brutalism
- **Physical-metaphor product** → Skeuomorphism
- **Creative / music / event** → Retro-Y2K

---

## Combining Styles

- **Bento** is a layout system — combine it with any surface skin (e.g. "bento layout with
  glassmorphism tiles").
- **Dark Mode** is a token strategy — layer it onto any style.
- **Aurora** is often used as a background *under* glass or minimal surfaces.
- Do NOT combine more than one *surface* style (e.g. don't mix neumorphism + brutalism) —
  they have contradictory rules and will look incoherent.

---

## Adding a New Style (for contributors)

Each style file must contain, in order:
1. One-paragraph definition + "done right / done wrong"
2. Core Principles (3–6 bullets)
3. Token System (CSS custom properties)
4. Core components (card, button, input at minimum)
5. Typography notes
6. A style-specific checklist (matches checklist.md's "Style-Specific Final Checks")

Then register it in: this index, `SKILL.md` trigger table, `README.md` styles table,
and `checklist.md` style-specific section.
