# Brand Design Languages (Offline Library)

A library of real companies' website design languages, one detailed file per brand in
`references/brands/`. Each file has the full token set (color, typography, spacing, radius),
component specs, do's/don'ts, responsive behavior, and open-source font substitutes.

When the user wants their UI to look like a real brand — or like "a car-selling site" / "a music
app" — the agent reads the relevant brand file(s) here. **No web lookup needed.**

---

## Two ways to use this library

### 1. Exact-brand mode — "make it look like Apple / Spotify / Stripe"
1. Open `references/brands/<brand>.md`.
2. Lift its tokens into the project design system (Step 2 of `SKILL.md`) and apply across components.
3. Match the *design language* — type, color, spacing, motion, component grammar. **Never** copy
   the brand's logo, trademarked imagery, product photography, or verbatim marketing copy.
4. Result: "feels like that brand's design system," not "a clone of their page."

### 2. Category-inspiration mode — "build a website for selling cars / a music app / a fintech app"
1. Identify the category and pull the relevant brand files (see catalog below).
2. Read 2–4 of them and **synthesize a fresh design language** from their shared patterns
   (see "Category Patterns") — don't copy a single brand; combine the category's DNA with the
   user's own content and brand.
3. This is the strongest use: the agent now designs a car site the way someone who has studied
   BMW, Ferrari, Bugatti, and Tesla would — not from a blank page.

Either way: write the resulting system to `DESIGN.md` (`design-system-doc.md`), then verify and
critique as normal. If a requested brand isn't in the library, say so and fall back to asking for
a screenshot/URL (`design-context.md`).

---

## Catalog (by category)

> Read only the file(s) you need — progressive disclosure. Files live in `references/brands/`.

### Automotive
`bmw` · `bmw-m` · `bugatti` · `ferrari` · `lamborghini` · `renault` · `tesla`

### AI / ML products
`claude` · `cohere` · `mistral-ai` · `x-ai` · `minimax` · `together-ai` · `runwayml` ·
`replicate` · `ollama` · `elevenlabs` · `cursor` · `lovable` · `composio` · `voltagent`

### Developer tools & infrastructure
`linear-app` · `vercel` · `warp` · `raycast` · `supabase` · `mongodb` · `clickhouse` ·
`hashicorp` · `sentry` · `posthog` · `resend` · `expo` · `mintlify` · `sanity` ·
`opencode-ai` · `figma` · `framer` · `webflow` · `miro` · `airtable` · `cal` · `zapier`

### Fintech / crypto / payments
`stripe` · `coinbase` · `binance` · `kraken` · `revolut` · `wise` · `mastercard`

### Commerce / consumer / travel
`shopify` · `airbnb` · `uber` · `starbucks` · `pinterest`

### Communication / productivity
`slack` · `discord` · `intercom` · `notion` · `superhuman`

### Media / editorial
`theverge` · `wired` · `spotify` *(music/streaming)*

### Big tech / enterprise / hardware
`apple` · `meta` · `ibm` · `nvidia` · `vodafone` · `spacex`

### Gaming / entertainment
`playstation` · `nintendo-2001` *(retro)*

### Retro / archival (period-accurate looks)
`dell-1996` · `nintendo-2001`

### Agency / brand / other
`clay`

---

## Category Patterns (cross-brand DNA — use in inspiration mode)

Distilled from the library so the agent designs *like a category specialist*, not from scratch.

### Automotive (BMW, Ferrari, Bugatti, Lamborghini, Tesla, Renault)
- **Photography-first**: full-bleed vehicle renders carry the page; depth comes from photo +
  color-block contrast, **not** drop shadows.
- **Rectangular, 0px-radius buttons** ("engineered precision"); single brand-color accent.
- **Heavy display weight + light body** type contrast; generous 80–96px section rhythm.
- Light canvas with **dark hero bands** for rhythm; configurator/inventory grids for models.
- Luxury tier (Bugatti/Ferrari/Lamborghini) → near-black, gold/red accents, cinematic, sparse.
  Mainstream (BMW/Tesla/Renault) → cleaner, more functional, lighter.

### Music / streaming (Spotify)
- **Near-black immersive theme**; album art / content is the only real color.
- Single functional accent (used only for play/active/CTA, never decoration).
- **Pill + circle geometry**; compact dense type; heavy shadows for elevation on dark.

### Fintech / crypto / payments (Stripe, Coinbase, Revolut, Wise, Mastercard)
- **Trust signals**: restrained, confident palettes (deep navy/black) — or boldly branded (Revolut).
- **Tabular numbers everywhere** for money/metrics; precise alignment.
- Gradients used sparingly and intentionally (Stripe's angled multi-color band is the exception).
- Rounded-but-serious components; security and clarity over decoration.

### AI / ML products (Claude, Mistral, Cohere, Runway, x.ai)
- Either **warm-editorial** (cream + serif/sans, e.g. Claude) or **dark + restrained**.
- **Monospace accents** for technical credibility; generous whitespace; one accent.
- Subtle gradient/aurora glows, never neon; the product demo is the hero.

### Developer tools & infra (Linear, Vercel, Warp, Supabase, Sentry, Raycast)
- **Intentional dark** (near-black, not pure `#000`; avoid the GitHub-dark `#0D1117`+neon cliché).
- **Monospace as a personality font**; hairline grids; bento layouts; restrained accent glow.
- Tight, negative-tracked geometric sans display; high craft, low decoration.

### Commerce / consumer / travel (Shopify, Airbnb, Uber, Starbucks)
- **Warmer and friendlier**; rounded components; lifestyle photography.
- Clear, prominent CTAs; approachable type; generous imagery.

### Media / editorial (The Verge, Wired)
- **Dense information** with strong type hierarchy; hairline dividers; big headlines.
- Photography framed with thin outlines; multi-column rhythm.

### Retro / archival (Dell-1996, Nintendo-2001)
- Period-accurate: system fonts, beveled/3D buttons, table-based layouts, web-safe palettes.
- Use deliberately when the user wants a nostalgic or throwback aesthetic.

---

## Rules

- These files are **observational descriptions of public design languages**, kept approximate and
  evolving — not official brand guidelines.
- Use the design *language* only. Never reproduce logos, trademarked assets, product photography,
  or verbatim copy; never imply affiliation.
- Substitute open-source fonts for proprietary brand fonts (each file lists a stand-in).
- In inspiration mode, **synthesize** — combine category DNA with the user's content. Don't ship a
  pixel-clone of one brand under a different name.
