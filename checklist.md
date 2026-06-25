# DesignSoul Completion Checklist

Run this before handing ANY UI output back to the user.
Every unchecked item is a reason to keep working.

---

## Phase 1: Design System Defined

- [ ] Color tokens defined — primary, surface, border, text hierarchy, accent, error, success
- [ ] Typography system defined — display font, body font, type scale
- [ ] Spacing scale defined — 4px base unit, named steps
- [ ] Radius scale defined — sm, md, lg, full
- [ ] Elevation scale defined — 5 levels
- [ ] Motion tokens defined — durations and easings from motion.md
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
- [ ] Stated to the user exactly what was verified vs not

---

## Phase 5: Accessibility

- [ ] All interactive elements have visible focus states (custom, not browser default)
- [ ] Color contrast: 4.5:1 for body text
- [ ] Color contrast: 3:1 for large text and UI components
- [ ] Touch targets: 44x44px minimum
- [ ] Icon-only buttons have `aria-label`
- [ ] Form inputs have associated labels
- [ ] Error messages are programmatically associated with inputs

---

## Phase 6: The Final Question

Look at the complete output and answer honestly:

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
- [ ] Background has depth (gradient/mesh/image)
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

### Dark Mode (any style)
- [ ] No pure-black surfaces; elevation goes lighter not darker
- [ ] Accents desaturated/lifted; text off-white not pure `#fff`
- [ ] All contrast re-verified; system preference + manual toggle
