# DesignSoul Completion Checklist

Run this before handing ANY UI output back to the user.
Every unchecked item is a reason to keep working.

---

## Phase 0: Context Gathered

- [ ] Looked for existing design context (design system, codebase tokens, live product, brand)
- [ ] Lifted exact values from code where available (not redrawn from memory)
- [ ] Decided the target **personality** (playful ↔ serious) from audience + brand — see `personality.md`
- [ ] Vocalized the extracted system and confirmed direction with the user
- [ ] Wrote/updated the project's `DESIGN.md` (source of truth) — see `design-system-doc.md`
- [ ] If no context existed, told the user quality would drop and picked a deliberate direction

---

## Phase 1: Design System Defined

- [ ] Color tokens defined — primary, surface, border, text hierarchy, accent, error, success
- [ ] Typography system defined — display font, body font, type scale
- [ ] Spacing scale defined — 4pt base, finite 9-token scale, every gap from it (see `spacing.md`)
- [ ] Grid/layout system defined — column grid for the page, 8pt/4pt soft spacing (see `layout-grids.md`)
- [ ] Radius scale defined — sm, md, lg, full
- [ ] Elevation scale defined — 5 levels, using soft/tinted/layered shadows (see `depth.md`)
- [ ] Motion tokens defined — durations and easings from motion.md
- [ ] Every design choice agrees with the chosen personality (see `personality.md`)
- [ ] If a named style was requested — style tokens loaded from styles/ file

---

## Phase 2: Anti-Pattern Check

Open `references/anti-patterns.md` and verify NONE of the following are present:

- [ ] Default blue (#3B82F6 or similar) used as primary color without intent
- [ ] Inter used as default without deliberate pairing decision
- [ ] `border-radius: 8px` uniform on everything
- [ ] `box-shadow: 0 2px 4px rgba(0,0,0,0.1)` default card shadow
- [ ] `scale(1.05)` on hover for non-media elements
- [ ] Generic centered hero (heading + subtext + blue button)
- [ ] 3-column footer without purpose
- [ ] Fade-in animation on every element
- [ ] Mixed transition durations and easings throughout
- [ ] Placeholder empty states ("No items found.")
- [ ] `@media (max-width: 768px)` as only breakpoint

---

## Phase 3: Component Coverage

Check that EVERY component present in the codebase has been addressed:

### Navigation
- [ ] Navbar — default, scrolled, mobile states
- [ ] Mobile menu — animation, tap targets
- [ ] Active link state

### Content
- [ ] Hero section — not generic centered layout
- [ ] Cards — appropriate type for content (product/stat/content)
- [ ] Lists — consistent spacing, hover states

### Interactive
- [ ] Buttons — all hierarchy levels, all states (default/hover/active/loading/disabled)
- [ ] Form inputs — all states (default/focus/error/disabled)
- [ ] Dropdowns/Selects — custom styled, open/close animation
- [ ] Checkboxes — custom, check animation
- [ ] Radio buttons — custom styled

### Feedback
- [ ] Loading states (DesignSoul skeleton for content, spinner for actions — see `references/skeleton.md`)
- [ ] Error states
- [ ] Empty states
- [ ] Toast/notification system
- [ ] Form validation messages

### Specialty (if present)
- [ ] Progress tracker / order status — current step unmistakable, movement animated
- [ ] Chat interface — bubble styles, typing indicator, scroll behaviour
- [ ] Calendar / date picker — full state coverage
- [ ] Data tables — hover, sort, empty, loading

### Layout
- [ ] Footer — purposeful, not 3-column default
- [ ] Mobile layout — tested at 375px width

---

## Phase 3b: Visual Hierarchy, Depth & Imagery

(Guides: `visual-hierarchy.md`, `depth.md`, `imagery.md`.)

- [ ] Each screen has one clear focal point; ≤3 competing levels; one primary action per view
- [ ] Related elements grouped by proximity/region; intra-group spacing tighter than inter-group
- [ ] Bigger gap above a heading than below it; section gaps 2–3× within-section gaps (`spacing.md`)
- [ ] Padding (inside) vs margin (outside) kept distinct; every gap from the 9-token scale
- [ ] Everything aligns to the grid; background stays soft so foreground wins
- [ ] Passes the **squint test** (hierarchy obvious with detail blurred)
- [ ] No default `0 2px 4px rgba(0,0,0,0.1)` shadow; shadows soft, tinted (not pure black), layered
- [ ] Shadows only on interactive/elevated elements; dark mode uses lighter surfaces, not white shadows
- [ ] Gradients (if any) use close hues / oklch (no muddy midpoint) and are reserved, not everywhere
- [ ] Photos are real/relevant with a clear focal point; text over images has an overlay
- [ ] Imagery is stylistically consistent; all icons from one set with consistent weight/roundness
- [ ] Unfamiliar icons labeled; interactive icons have ≥44px hit area + `aria-label`

---

## Phase 4: Motion Audit

- [ ] ALL interactive elements have hover feedback
- [ ] ALL transitions use tokens from motion.md (no hardcoded `0.3s ease`)
- [ ] Entering animations use `--ease-out`
- [ ] Exiting animations use `--ease-in`
- [ ] Stagger stops at 5 items
- [ ] Scroll-triggered animations present for main content sections
- [ ] No animation is purely decorative
- [ ] Page feels like ONE coherent thing moving
- [ ] `@media (prefers-reduced-motion: reduce)` present and working

---

## Phase 4b: Visual Verification

(See `references/verification.md`. If no browser tool is available, mark this phase
SKIPPED and tell the user the output is unverified — do not silently pass it.)

- [ ] Rendered in a real browser (dev server started with the user's command)
- [ ] Screenshotted at 375px, 768px, and 1440px
- [ ] No horizontal overflow at 375px
- [ ] No clipped, overlapping, or edge-touching text at any viewport
- [ ] Visual hierarchy readable within 1 second on each screen
- [ ] Named style is recognizably that style (not a generic approximation)
- [ ] Grep sweep done — zero hardcoded transitions; all motion uses tokens
- [ ] Static design audit run (`code-audit.md`) — slop signals, a11y breaks, DESIGN.md drift
- [ ] Stated to the user exactly what was verified vs not

---

## Phase 4c: Micro-Craft / Polish

(Full guide in `references/polish.md`.)

- [ ] Nested rounded elements use concentric radius (outer = inner + padding)
- [ ] Icons optically aligned (icon-side padding −2px; play triangle nudged right)
- [ ] Depth uses layered shadow-as-border; dividers/inputs stay real borders
- [ ] Images have a pure-black/white 10% inset outline (never tinted)
- [ ] Interactive motion uses transitions (interruptible); keyframes only for one-shots
- [ ] Entrances split + staggered with opacity/translateY/blur; exits subtle (ease-in)
- [ ] Contextual icon swaps animate (scale .25→1, opacity, blur), bounce 0
- [ ] Buttons scale to 0.96 on press (with a `static` opt-out)
- [ ] Dynamic numbers use tabular-nums; font smoothing applied at root
- [ ] No `transition: all`; `will-change` only on transform/opacity/filter when needed
- [ ] Small controls extended to a 44px hit area; no overlapping hit areas

---

## Phase 5: Accessibility

(Full guide in `references/accessibility.md`. Design to WCAG **AA**.)

- [ ] Semantic HTML used (`<button>`/`<a>`/headings/landmarks) before any custom `<div>` control
- [ ] Custom widgets have correct ARIA roles + states, kept in sync as the user interacts
- [ ] Full keyboard operation: everything reachable, logical focus order, no traps
- [ ] Focus managed in overlays (moves in on open, returns to trigger on close)
- [ ] All interactive elements have a visible custom `:focus-visible` ring (never bare `outline: none`)
- [ ] Color contrast: 4.5:1 body text; 3:1 large text / UI components — re-checked in dark mode and over glass/gradient
- [ ] No meaning conveyed by color alone (icon/shape/text added)
- [ ] Touch targets: 44x44px minimum; no hover-only essential actions
- [ ] Icon-only buttons have `aria-label`; decorative icons `aria-hidden`
- [ ] Form inputs have persistent visible labels; errors linked (`aria-describedby`) and announced
- [ ] Meaningful images have alt; decorative images have `alt=""`
- [ ] `prefers-reduced-motion` respected; nothing flashes >3×/second
- [ ] Stated honestly what was verified (keyboard/SR pass) vs not

---

## Phase 5b: UX Soundness

(See `references/ux-laws.md`.)

- [ ] Ran the ten usability heuristics on each screen — all hold
- [ ] System status always visible (loading/saving/success/error — no silent actions)
- [ ] One clear primary action per screen; extraneous cognitive load removed
- [ ] Right disclosure pattern chosen (tabs vs accordion vs drawer vs wizard — see `components.md`)
- [ ] Affordances match: clickable things look clickable; static things don't
- [ ] Reversible escape from every flow (cancel/back/undo); destructive actions confirmed or undoable
- [ ] No dark patterns (forced continuity, sneak-into-basket, fake urgency, confirmshaming — see `anti-patterns.md`)

---

## Phase 5c: Microcopy

(See `references/microcopy.md`.)

- [ ] Buttons/CTAs name the outcome ("Create account", not "Submit")
- [ ] Errors follow what-happened → why → how-to-fix; specific and blame-free
- [ ] Empty states explain the space and offer the first action (not "No items found")
- [ ] Labels and terms consistent across the app; tone matches the stakes
- [ ] No placeholder/lorem copy, no fabricated stats or quotes shipped as real content
- [ ] Numbers/dates pluralized and formatted for humans

---

## Phase 5d: Internationalization (if multi-locale or RTL)

(See `references/i18n.md`. Skip only if single-locale and confirmed so.)

- [ ] No hardcoded user-facing strings; no sentence concatenation
- [ ] Layout survives ~40% text expansion (containers wrap/grow, don't clip)
- [ ] Logical CSS properties used (`inline-start/end`, `text-align: start`) — flips for RTL
- [ ] Directional icons mirror in RTL; non-directional (logos, play, clocks) don't
- [ ] Dates/numbers/currency via locale formatting; fonts cover target scripts

---

## Phase 5b: Handoff — How to Run It (MANDATORY — a redesign that won't run is a failed task)

(See `SKILL.md` Step 5c. Verify it builds/runs and tell the user exactly how to run it. Do not
hand back until these are true or you've plainly stated you couldn't run it.)

- [ ] Verified the project still builds / the dev server starts (or stated plainly you couldn't run it)
- [ ] Stated new dependencies + exact install command — OR "no new dependencies, builds as-is"
- [ ] Noted any fonts/assets added and how they load (CDN link / self-hosted / package)
- [ ] Noted config touched (Tailwind/theme/build) and anything to regenerate
- [ ] Gave the run command + dev URL, and reported the build/verify result (e.g. "build passes, 0 errors")
- [ ] Flagged any manual follow-up (env vars, dev-server restart, cache clear)

---

## Phase 6: The Final Question

Run the scored critique in `references/critique.md` (five dimensions, fix anything below ~7),
then answer honestly:

> Would a senior designer at Stripe, Linear, Vercel, Apple, or Notion look at this
> and say "an AI made this"?

If the answer is **yes** — find what's triggering that reaction and fix it.
Common culprits at this stage:
- Copy/placeholder text that sounds generic
- One component that didn't get the same treatment as the rest
- Animation that feels mechanical
- A color that doesn't belong to the system
- Spacing that's close but not quite intentional

If the answer is **no** — ship it.

---

## Style-Specific Final Checks

### Glassmorphism
- [ ] Background is rich, saturated, and *varied* (3–4 color zones/glows or image) — NOT pale/uniform
- [ ] Adjacent glass panels visibly sit over different background colors (glass actually refracts)
- [ ] Not over-frosted — you can clearly see the background *through* the cards (blur ~8–12px, low fill alpha)
- [ ] Text stays legible without re-frosting (local scrim/shadow behind text, not a higher panel opacity)
- [ ] All surfaces have `backdrop-filter` + `-webkit-backdrop-filter`
- [ ] Inner top-left highlight present
- [ ] `@supports` fallback written
- [ ] Text readable on glass across all background variations

### Liquid Glass
- [ ] `saturate()` in backdrop-filter
- [ ] Multi-layer specular `box-shadow`
- [ ] `inset 0 1.5px 0` top specular present
- [ ] Pseudo-elements for chromatic fringe and inner glow
- [ ] Spring easing on interactions

### Neumorphism
- [ ] Only one surface color throughout
- [ ] No borders anywhere
- [ ] Inset state for active/pressed
- [ ] Single accent color only

### Brutalism
- [ ] Zero border-radius (or maximum 2px)
- [ ] Offset shadow with no blur
- [ ] One bright accent maximum
- [ ] No gradients

### Claymorphism
- [ ] `inset` top highlight present (this creates the inflation)
- [ ] Bottom offset shadow for 3D depth
- [ ] Spring easing on all interactions
- [ ] Colors are saturated pastels, not neon

### Liquid Glass (refractive variant)
- [ ] SVG `feDisplacementMap` filter used only on cards/bars/pills, not full screens
- [ ] FPS checked while scrolling; falls back to pure-CSS glass if it janks
- [ ] Specular `box-shadow` layers kept (refraction alone isn't enough)

### Material You
- [ ] Whole palette derived from one seed color
- [ ] Elevation is tonal (lighter = higher), shadow only supporting
- [ ] Hover/press use translucent state-layer overlays
- [ ] Pill/large rounded shapes; emphasized/spring motion

### Aurora / Mesh
- [ ] Soft blurred radial blobs (40–80px), restrained opacity (0.4–0.65)
- [ ] 2–4 analogous/brand hues only
- [ ] Content surfaces calm; text passes contrast over busiest area
- [ ] Any motion drifts slowly (20–40s)

### Bento Grid
- [ ] Tiles vary in size deliberately; one hero tile per section
- [ ] One idea per tile; one consistent gap and radius
- [ ] Reflows 4→2→1 column without overflow
- [ ] Clickable tiles lift; static tiles have no hover affordance

### Minimal / Swiss
- [ ] Strict grid alignment; generous intentional whitespace
- [ ] Palette is black + white + ≤1 accent + 2 grays
- [ ] Hierarchy from type, not boxes/color; body measure ~60–70ch
- [ ] Motion quiet — short fades, no bounce/scale

### Warm Editorial
- [ ] Background is warm cream, never pure white
- [ ] One earthy accent (terracotta/clay), used sparingly
- [ ] Serif display + clean sans body (open-source fonts)
- [ ] Controlled measure (~65–70ch), generous line-height (~1.7)
- [ ] Near-black warm text; hairline rules; no heavy decoration

### Neo-Brutalism
- [ ] Hard offset shadows (zero blur); thick near-black borders
- [ ] Flat saturated fills; small radius (4–8px)
- [ ] Press collapses the shadow; text passes contrast on every fill

### Skeuomorphism
- [ ] Single consistent (top) light source across all elements
- [ ] Raised = highlight + inner/contact shadow; pressed = inset
- [ ] Subtle material texture, not flat plastic
- [ ] Used intentionally for a physical-metaphor product

### Retro / Y2K
- [ ] Saturated gradient atmosphere; glow/bloom on accents
- [ ] Pixel/retro fonts for accents only; body stays clean sans
- [ ] Despite loudness, body text passes 4.5:1; motion respects reduced-motion

### Cyberpunk / Mech-HUD
- [ ] Angular framing (clip-path/brackets), radius ≈ 0; thin neon lines + grid do the drawing
- [ ] One or two neon accents on a deep tinted base (not pure black/rainbow)
- [ ] Mono uppercase labels + tabular readouts; glow only on key lines/text
- [ ] Text ≥ 4.5:1 on the base; `:focus-visible` visible; reduced-motion freezes scan/flicker

### Pop Art / Comic
- [ ] Thick black ink outlines (3–4px) everywhere; hard offset shadows (no blur)
- [ ] Halftone/Ben-Day dot texture present; loud primaries (not pastel)
- [ ] Speech bubbles / bursts used as real UI; comic display for headings, clean sans body
- [ ] One clear focal point; text ≥ 4.5:1; `:focus-visible`; reduced-motion respected

### Kawaii / Pastel
- [ ] Pastel surfaces/accents; body text near-solid warm charcoal (≥ 4.5:1) — NOT pastel
- [ ] Very rounded pillowy shapes; a friendly face/mascot present
- [ ] Gentle low-contrast shadows + soft border; rounded warm typeface
- [ ] Bouncy-but-soft motion; `:focus-visible` visible; reduced-motion respected

### Cyber-Retro / Windows Desktop (Y2K OS)
- [ ] Two-tone bevels (raised light-TL/dark-BR; inset inverted) on every element
- [ ] Window chrome: gradient title bar + min/max/close + thick frame; sharp corners
- [ ] System gray + one desktop accent; buttons flip bevel inward on press
- [ ] Pixel type for titles only, UI sans for body; text ≥ 4.5:1; `:focus-visible` present

### Dark Mode (any style)
- [ ] No pure-black surfaces; elevation goes lighter not darker
- [ ] Accents desaturated/lifted; text off-white not pure `#fff`
- [ ] All contrast re-verified; system preference + manual toggle
