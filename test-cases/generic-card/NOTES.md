# Test Case: Generic Card → Glassmorphism

A reference example showing the exact transformation DesignSoul should produce.

## What was wrong with `before.html` (the AI-default tells)

| Anti-pattern | Where | Reference |
|---|---|---|
| Default blue `#3B82F6` | button background | anti-patterns.md → "The Default Blue" |
| Generic gray stack (`#111827`, `#6B7280`, `#F9FAFB`) | text + bg | anti-patterns.md → "Generic Gray Stack" |
| Uniform `border-radius: 8px` | card + button | anti-patterns.md → "Consistent Border Radius" |
| Default card shadow `0 2px 4px rgba(0,0,0,0.1)` | card | anti-patterns.md → "The Generic Card" |
| `scale(1.05)` hover on non-media | card + button | anti-patterns.md → "Hover Scale on Everything" |
| Plain `fadeIn` on everything | card | anti-patterns.md → "Fade-In on Everything" |
| Mixed/loose `transition: all 0.2s ease` | everywhere | anti-patterns.md → "Mixed Durations" |
| 3-size type scale, no hierarchy device | headings | anti-patterns.md → "3-Size Type Scale" |
| No focus state | button | components.md → accessibility minimums |

## What changed in `after.html`

- **Color:** replaced the default blue + gray stack with an intentional deep-violet glass
  palette derived from a product context, on a mesh-gradient background (glass needs depth behind it).
- **Type:** added an eyebrow label, tightened display tracking, real line-height hierarchy.
- **Surface:** glass card with `backdrop-filter`, inner top/left highlight, `@supports` fallback.
- **Motion:** all transitions routed through duration/easing tokens; entrance is `fadeUp`, not flat fade.
- **Hover:** lift (`translateY(-4px)`), not scale.
- **Button:** primary is opaque white over glass (hierarchy), full-width, with `:active` and
  `:focus-visible` states.
- **Accessibility:** focus ring added, `prefers-reduced-motion` block, text-shadow for legibility on glass.

## How an AI output should be judged against this

It does NOT need to match pixel-for-pixel. It must:
- Trip none of the anti-patterns in the table above
- Use a token system (no hardcoded colors/durations)
- Pass the glassmorphism checklist in `references/styles/glassmorphism.md`
- Pass the visual rubric in `references/verification.md` at 375 / 768 / 1440px
