# DesignSoul

**Give your AI-generated UI a soul.**

A skill file for Claude Code (and compatible AI editors) that transforms generic, AI-default UI into interfaces that look like a real product team made them.

---

## The Problem

Every AI-generated website looks the same:

- Blue `#3B82F6` primary color
- Inter font, always
- `border-radius: 8px` on everything
- Cards with `box-shadow: 0 2px 4px rgba(0,0,0,0.1)`
- Centered hero with heading, subtext, and a button
- Fade-in on everything
- 3-column footer

It's not *bad*. It's just instantly recognisable as AI-generated.
No soul. No identity. No intentional design decisions.

**DesignSoul fixes that.**

---

## What It Does

Drop this skill into your project and tell your AI editor:

- *"Convert my UI to glassmorphism"* → full codebase converted with proper glass tokens, blur, specular highlights, and readable text
- *"Make this feel like a real product"* → anti-pattern audit + design system generated + motion system applied
- *"Fix the UX of my order tracker"* → professional-level component patterns applied
- *"Make the animations consistent"* → global motion system defined and applied to every interactive element

---

## Supported Styles

14 styles, each with a full token system, core components, and a verification checklist.
| Style | Description |
|---|---|
| **Glassmorphism** | Frosted glass, backdrop-blur, translucent cards |
| **Liquid Glass** | Apple iOS 26 — specular highlights, SVG refraction, spring physics |
| **Material You** | Material Design 3 — dynamic color, tonal elevation, state layers |
| **Aurora / Mesh** | Soft glowing gradient fields (Stripe/Linear/Vercel-style) |
| **Bento Grid** | Modular tile layout system — pairs with any surface skin |
| **Minimal / Swiss** | Restraint, strict grid, typography-led hierarchy |
| **Warm Editorial** | Cream paper, terracotta accent, serif/sans — human and readable |
| **Neumorphism** | Soft shadows, embossed surfaces, single-tone depth |
| **Claymorphism** | Soft 3D, inflated shapes, saturated pastels |
| **Brutalism** | Raw, austere, offset shadows, zero decoration |
| **Neo-Brutalism** | Loud color blocks, thick borders, hard offset shadows |
| **Skeuomorphism** | Real-material cues, tactile depth, physical controls |
| **Retro / Y2K** | Chrome, holographic, neon glow, nostalgic energy |
| **Dark Mode** | Cross-cutting — a tuned dark variant for any style above |

See `references/styles/_index.md` for a selection guide and how to combine styles.

---

## What's Inside

```
DesignSoul/
├── README.md                       ← This file (human-facing guide)
├── SKILL.md                        ← Main skill file (drop this into Claude Code)
├── checklist.md                    ← Completion checklist (AI runs this before finishing)
├── mcp.example.json                ← Browser-tool config for visual verification
├── skeleton/                       ← `designsoul-skeleton` npm package — skeletons from real UI
│   ├── skeleton.js                 ← zero-dep runtime: <ds-skeleton> + renderSkeleton()
│   ├── skeleton.css                ← runtime styles (pulse/shimmer/solid, dark, reduced-motion)
│   ├── adapters/                   ← React + Vue wrappers
│   ├── bin/cli.mjs                 ← generator: snapshots real UI → .skeleton.json specs
│   └── examples/                   ← worked source component + generated spec
├── test-cases/                     ← Before/after fixtures that validate the skill
│   └── generic-card/               ← Worked reference example (before, after, notes)
└── references/
    ├── design-context.md           ← Start from existing context (the most important idea)
    ├── anti-patterns.md            ← Every AI-default habit + the deeper content slop, with fixes
    ├── components.md               ← Professional UX standards per component
    ├── component-method.md         ← How to design/rebuild ANY component like a pro
    ├── critique.md                 ← Scored expert-review rubric (score it before shipping)
    ├── skeleton.md                 ← How the skill uses the skeleton system for loading states
    ├── motion.md                   ← Global animation system
    ├── typography.md               ← Font pairing logic and type scale
    ├── color-theory.md             ← Deriving a palette with intent (oklch, borrow-don't-invent)
    ├── modern-css.md               ← Craft toolkit: text-wrap, :has(), container queries, color-mix
    ├── polish.md                   ← Micro-craft details that separate built UI from slop
    ├── verification.md             ← Visual feedback loop (render → critique → fix)
    └── styles/
        ├── _index.md               ← Style selection & combination guide
        ├── glassmorphism.md
        ├── liquid-glass.md
        ├── material-you.md
        ├── aurora.md
        ├── bento.md
        ├── minimal-swiss.md
        ├── warm-editorial.md
        ├── neumorphism.md
        ├── claymorphism.md
        ├── brutalism.md
        ├── neo-brutalism.md
        ├── skeuomorphism.md
        ├── retro-y2k.md
        └── dark-mode.md
```

---

## How to Use

### In Claude Code
1. Copy the `DesignSoul/` folder into your project root
2. Claude Code will automatically detect it as a skill
3. Ask Claude to apply it: *"Use DesignSoul to convert my UI to liquid glass style"*

### In Cursor / Windsurf / other AI editors
1. Copy the `DesignSoul/` folder into your project
2. Reference it in your request: *"Using the DesignSoul skill in my project, redesign my frontend with glassmorphism"*
3. Or add `SKILL.md` content to your `.cursorrules` / system prompt

### As a Claude.ai Skill
1. Upload the skill via Claude.ai Settings → Skills
2. Claude will automatically use it when you ask for UI work

---

## What the AI Does With It

When triggered, the AI:

1. **Gathers context first** — reads your design system, codebase tokens, live product, or brand, and lifts exact values (designing from scratch is a last resort)
2. **Audits** your existing frontend — maps every component, color, font, animation
3. **Defines a design system** — tokens for color, typography, spacing, motion
4. **Checks anti-patterns** — kills every AI-default decision, including the deeper content slop
5. **Applies professional component standards** — per-component UX knowledge for 20+ component types, plus a 9-pass design method that reaches the same bar for *any* component (listed or not, new or rebuilt)
6. **Runs a global motion pass** — consistent animation system across everything
7. **Runs a polish pass** — concentric radii, optical alignment, shadow-as-border, interruptible animations, scale-on-press, tabular numbers, and the other micro-details that separate built UI from slop
8. **Visually verifies** — with a browser tool, it renders the result, screenshots at mobile/tablet/desktop, critiques against a rubric, and fixes what it finds
9. **Scores a critique** — reviews the result like a senior designer across five dimensions before finishing
10. **Runs the completion checklist** — doesn't stop until every item is checked

---

## Visual Verification (the part that makes it actually work)

An AI editing CSS is normally *blind* — it reasons about code but never sees the rendered
page. DesignSoul closes that loop with a browser tool (Playwright MCP):

1. Copy the `playwright` block from `mcp.example.json` into your editor's MCP config
2. The AI then renders your pages, screenshots them at 375 / 768 / 1440px, and self-corrects
   until they pass the rubric in `references/verification.md`

Without a browser tool the skill still works, but it will tell you the output was **not
visually verified** rather than pretend it looks right.

---

## Loading Skeletons (built in)

DesignSoul ships its own installable skeleton package (`designsoul-skeleton`) — so when a
design needs a loading state, the skeleton is generated *from your real component*, not
hand-guessed boxes:

```bash
npm install designsoul-skeleton
```

1. Mark a component with `data-skeleton="name"`
2. Run the generator (`npx designsoul-skeleton <url>`) — it snapshots the real layout into a
   `.skeleton.json` spec at multiple breakpoints
3. Render it with `<ds-skeleton name="name" loading>` (or the React/Vue wrapper) — animated
   blocks (pulse/shimmer/solid), dark mode, stagger, and a fade to content

Zero runtime dependencies, works in any framework. See `skeleton/README.md`.

---

## Honest Scope — What It Can and Can't Do

**Does well:** style conversion, killing AI-default habits, enforcing a coherent token +
motion system, professional per-component UX, and (with a browser tool) seeing and fixing results.

**Real limits, stated plainly:**
- Without a browser MCP, it styles blind and says so.
- Very large codebases exceed one context window — it works system-first then component-by-component.
- Data-driven components (live delivery/flight trackers, real maps) get a polished UI +
  animation layer wired to placeholder data; it can't invent your backend.
- Output quality scales with the underlying model. The skill raises the floor and guarantees
  consistency — it's not a replacement for human review on high-stakes work.

---

## The Quality Bar

> Would a senior designer at Stripe, Linear, Vercel, or Apple look at this output
> and say "an AI made this"?

If yes, the skill keeps working. That's the bar. Not "looks decent." Not "client approved it."
**Does it look like a human who cares made it?**

---

## Status

This is v0.2 — significantly expanded with a visual verification loop, color theory,
13 styles, and a test-case framework. Still a working draft being tested across real projects.

**What's tested:**
- [ ] React / Next.js projects
- [ ] Plain HTML/CSS
- [ ] Tailwind CSS projects
- [ ] Vue.js projects

**Contributing:**
Found a component the skill handles badly? An anti-pattern it missed? A style that needs better tokens?
Open an issue with a before/after example. That's the most useful contribution.

---

## Roadmap

- [x] Visual verification loop (Playwright MCP)
- [x] Color-theory reference for intentional palettes
- [x] Dark mode strategy (cross-cutting)
- [x] Expanded style library (13 styles)
- [x] Test-cases directory (framework + first worked example)
- [ ] Complete the remaining test-case fixtures (trackers, forms, chat, calendar, table)
- [ ] Before/after example screenshots
- [ ] Tailwind-specific token mappings
- [ ] Framework adapters (React/Vue component output conventions)
- [ ] Additional styles: Flat 2.0, Memphis, Cyberpunk

---

*Built for vibe coders who want their projects to look like they weren't.*
