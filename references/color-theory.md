# Color: Deriving a Palette With Intent

The #1 tell of AI-generated UI is the default blue (`#3B82F6`) on a gray stack.
This file is how you replace "the safe default" with a palette that means something
for the specific product. Never pick a color because it's safe. Derive it from context.

---

## Step 1 — Read the Product's Context

Before choosing any color, answer:

1. **What does the product do?** (domain → emotional register)
2. **Who uses it?** (consumer warmth vs professional restraint)
3. **What should the user feel?** (calm, urgent, trusted, playful, premium)

### Domain → Hue Direction (starting points, not rules)

| Domain | Primary hue direction | Why |
|---|---|---|
| Fintech / Banking | Deep navy, forest green, near-black | Trust, stability, money = green/blue |
| Healthcare / Medical | Calm teal, soft blue, clean white | Clean, calm, clinical-but-human |
| Wellness / Meditation | Sage, warm beige, muted terracotta | Natural, grounded, low arousal |
| Food / Delivery | Warm red, orange, appetite tones | Urgency + appetite stimulation |
| Legal / Enterprise | Slate, charcoal, oxblood accent | Serious, authoritative |
| Developer tools | Near-black, electric accent, mono | Technical, high-contrast, focused |
| Education / Kids | Saturated primary + playful secondary | Energy, friendliness |
| Luxury / Fashion | Black, cream, single metallic accent | Restraint signals premium |
| Eco / Sustainability | Earth greens, clay, sky | Natural materials |
| SaaS / Productivity | Indigo/violet, or a confident non-blue | Modern, but avoid the default blue |

**Rule:** If you land on blue, make it a *deliberate, specific* blue (a deep slate-blue, a
teal-leaning blue) — never Tailwind `blue-500`.

---

## Step 2 — Build the Palette From One Seed

Pick ONE primary hue from Step 1, then derive everything using a consistent method.

### Use HSL or OKLCH, not random hex

Working in HSL/OKLCH lets you derive a coherent ramp by changing only lightness/chroma.

```css
:root {
  /* Seed: pick H (hue) and a base S (saturation) */
  /* Example seed: forest fintech → H 155, S 40% */

  --primary:        hsl(155, 45%, 38%);
  --primary-hover:  hsl(155, 45%, 32%);  /* -6% lightness */
  --primary-muted:  hsl(155, 40%, 92%);  /* tint for backgrounds/rings */
  --primary-text:   hsl(155, 50%, 22%);  /* text on muted */
}
```

### The Neutral Ramp Must Have a Temperature

Pure gray (`#6B7280`) is an AI tell. Give neutrals a subtle hue from the primary
(or its complement) so they feel intentional.

```css
:root {
  /* Warm neutrals (human/lifestyle): borrow a little red/yellow hue */
  /* Cool neutrals (technical/professional): borrow a little blue */
  /* Example: cool neutrals tinted toward the primary's hue */

  --bg:             hsl(155, 12%, 98%);
  --surface:        hsl(155, 10%, 100%);
  --surface-alt:    hsl(155, 12%, 96%);
  --border:         hsl(155, 12%, 88%);
  --text-primary:   hsl(155, 15%, 12%);
  --text-secondary: hsl(155, 10%, 38%);
  --text-muted:     hsl(155, 8%, 56%);
}
```

**Rule:** Every neutral shares ONE hue (small saturation, 6–14%). Never mix a warm gray
border with a cool gray text — that reads as accidental.

---

## Step 3 — Semantic Colors (Don't Default These Either)

```css
:root {
  --success: hsl(150, 55%, 40%);
  --warning: hsl(38, 90%, 50%);
  --error:   hsl(2, 70%, 50%);
  --info:    hsl(210, 70%, 50%);
}
```

- Tune each toward the brand's temperature so they belong to the same family.
- **Never use color alone** to convey state — always pair with icon/text (accessibility).
- The accent/primary is reserved for ONE primary action per screen. Semantic colors are
  for status only, not decoration.

---

## Step 4 — Contrast Is Law

| Use | Minimum ratio |
|---|---|
| Body text on background | 4.5:1 |
| Large text (≥24px or ≥19px bold) | 3:1 |
| UI components, focus rings, icons | 3:1 |
| Disabled elements | exempt, but still legible |

Check the primary text token against every surface it sits on. If a glass/translucent
style makes this variable, add a `text-shadow` or a scrim behind text (see glassmorphism.md).

---

## Step 5 — Dark Mode (if requested)

Dark mode is not "invert the colors." See `styles/dark-mode.md` for the full method, but the
short version:

- Don't use pure black (`#000`) for surfaces — use a very dark tinted neutral (`hsl(H, 14%, 8%)`).
- Reduce saturation of the primary slightly; bright saturated colors vibrate on dark.
- Elevation goes **lighter** in dark mode (higher surfaces = lighter), opposite of light mode shadows.
- Re-check contrast — it changes completely.

---

## Don't Invent a Palette From Scratch

Designing a whole unfamiliar color system from zero usually produces disharmony. Prefer, in order:

1. **Brand colors exist** → use them; fill missing tokens by interpolating in oklch.
2. **A reference product exists** → sample the palette from its screenshots.
3. **Truly from zero** → adopt a known system (Radix Colors, Tailwind's default palette, a
   documented brand system) rather than hand-mixing. Say which one you used.

Derive hover/active/tint states with `color-mix` instead of inventing new hex values
(see `modern-css.md`):

```css
.button:hover { background: color-mix(in oklch, var(--primary) 88%, black); }
.tint        { background: color-mix(in oklch, var(--primary) 12%, transparent); }
```

Working in oklch keeps hue stable as you change lightness — the modern, reliable choice.

---

## The Palette Checklist

- [ ] Primary hue derived from product context, not a default
- [ ] If blue, it's a specific deliberate blue, not `#3B82F6`
- [ ] Neutrals share one temperature (tinted, not pure gray)
- [ ] Primary/accent reserved for ONE action per screen
- [ ] Semantic colors belong to the same temperature family
- [ ] State is never conveyed by color alone
- [ ] All text passes 4.5:1 (3:1 for large) on every surface it appears on
