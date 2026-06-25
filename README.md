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

| Style | Description |
|---|---|
| **Glassmorphism** | Frosted glass, backdrop-blur, translucent cards |
| **Liquid Glass** | Apple iOS 26 style — specular highlights, chromatic refraction, spring physics |
| **Neumorphism** | Soft shadows, embossed surfaces, single-tone depth |
| **Brutalism** | Raw, bold, offset shadows, zero decoration |
| **Claymorphism** | Soft 3D, inflated shapes, saturated pastels |

---

## What's Inside

```
DesignSoul/
├── README.md                       ← This file (human-facing guide)
├── SKILL.md                        ← Main skill file (drop this into Claude Code)
├── checklist.md                    ← Completion checklist (AI runs this before finishing)
└── references/
    ├── anti-patterns.md            ← Every AI-default habit, with fixes
    ├── components.md               ← Professional UX standards per component
    ├── motion.md                   ← Global animation system
    ├── typography.md               ← Font pairing logic and type scale
    └── styles/
        ├── glassmorphism.md
        ├── liquid-glass.md
        ├── neumorphism.md
        ├── brutalism.md
        └── claymorphism.md
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

1. **Audits** your existing frontend — maps every component, color, font, animation
2. **Defines a design system** — tokens for color, typography, spacing, motion
3. **Checks anti-patterns** — kills every AI-default decision
4. **Applies professional component standards** — per-component UX knowledge for 20+ component types
5. **Runs a global motion pass** — consistent animation system across everything
6. **Runs the completion checklist** — doesn't stop until every item is checked

---

## The Quality Bar

> Would a senior designer at Stripe, Linear, Vercel, or Apple look at this output
> and say "an AI made this"?

If yes, the skill keeps working. That's the bar. Not "looks decent." Not "client approved it."
**Does it look like a human who cares made it?**

---

## Status

This is v0.1 — a working draft being tested across real projects.

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

- [ ] Before/after example screenshots
- [ ] Test cases directory with real-world UI patterns
- [ ] Dark mode variant for each style
- [ ] Tailwind-specific token mappings
- [ ] Additional styles: Aurora UI, Skeuomorphism, Flat 2.0

---

*Built for vibe coders who want their projects to look like they weren't.*
