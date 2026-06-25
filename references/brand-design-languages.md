# Brand Design Languages (Offline Library)

A reference library of real companies' website design languages. When the user asks to make
their UI "look like <Company>'s site" (Apple, Stripe, Linear, Vercel, Notion, Airbnb, …), the
agent reads that brand's entry here and applies its design language — **no web lookup needed**.

> Purpose: turn "redesign my UI to feel like Apple" into a precise, repeatable conversion using
> a documented design language, the same way the named-style files work — but for real brands.

---

## How the skill uses this file

1. The user names a real company/brand to emulate.
2. Read **only that brand's section** below (don't load the whole file — progressive disclosure).
3. Translate its design language into a project token set (color, type, spacing, motion, etc.),
   exactly like Step 2 of `SKILL.md`, and apply it across the components.
4. Calibrate against the user's content — match the *language*, never copy the brand's logo,
   exact copy, or trademarked assets. The goal is "feels like that brand's design system,"
   not "is a clone of that brand's page."
5. Verify and critique as normal (`verification.md`, `critique.md`).

If a requested brand isn't in this library yet, say so and fall back to asking the user for a
screenshot/URL (per `design-context.md`).

---

## Entry format (use this for every brand)

Keep each brand a self-contained `##` section so it can be read in isolation. Fill what's known;
mark gaps honestly. Suggested schema:

```markdown
## <Brand> — <one-line essence>
**Recognizable by:** the 2–3 cues that instantly read as this brand
**Typography:** display / body / mono families + scale + weight notes (open-source substitutes if the brand font is proprietary)
**Color:** palette with hex/oklch — neutrals + accent(s), light/dark
**Spacing & density:** base unit, how generous/tight
**Layout:** grid, max-width, hero approach, section rhythm
**Motion:** signature easing/durations, scroll behavior, hover feel
**Imagery:** photography / illustration / 3D / product-shot style
**Components:** button, card, nav signatures
**Voice/copy (optional):** tone of the words
**Pure-HTML/CSS fidelity:** what's achievable with no proprietary assets (and what degrades)
**Apply when user says:** trigger phrases ("like Apple", "Apple-style", …)
```

Rules for entries:
- Substitute open-source fonts for proprietary brand fonts (e.g. note the real font, then give a free stand-in).
- These are **observational descriptions of public design languages**, kept approximate and
  updated as brands evolve — not official brand guidelines.
- Never instruct copying logos, trademarked imagery, or verbatim marketing copy.

---

## Brand Index

(Filled in as brands are added. Each links to its section below.)

| Brand | Essence | Trigger phrases |
|---|---|---|
| Apple | Calm, premium, product-as-hero | "like Apple", "Apple-style", "apple.com" |
| _…add more…_ | | |

---

## Apple — calm, premium, product-as-hero  *(format example — refine/replace with your pasted data)*

**Recognizable by:** enormous whitespace; a single product shot as the hero; huge thin headline + small subhead, center-aligned; near-silent chrome.
**Typography:** SF Pro Display/Text (proprietary) → open-source stand-in: Inter / Geist. Very large hero headlines, tight tracking, light-to-semibold weights.
**Color:** mostly white (#FFFFFF) and near-black (#1D1D1F) text on white or black sections; neutral grays (#F5F5F7 surface); color comes from the product imagery, not the chrome.
**Spacing & density:** extremely generous; large vertical section padding; content breathes.
**Layout:** centered, full-bleed sections stacked vertically; max content width with big margins; one idea per section.
**Motion:** smooth scroll-triggered reveals (fade + subtle rise), gentle easing, restrained; occasional pinned/scroll-scrubbed product animations.
**Imagery:** high-resolution product photography, full-bleed, often on pure black or pure white.
**Components:** pill buttons (blue accent #0071E3), minimal nav bar that's translucent on scroll, clean rounded cards.
**Voice/copy:** short, confident, benefit-led.
**Pure-HTML/CSS fidelity:** layout, type scale, whitespace, scroll reveals — high. The hero *product photography/3D* is the soul and needs real assets; without them, use a clean placeholder (don't fake it with bad SVG).
**Apply when user says:** "like Apple", "Apple-style", "apple.com look".

> ↑ This Apple entry is an illustrative example of the format using widely-known public design
> traits. Replace or refine it with your own pasted data; user-provided entries take precedence.
