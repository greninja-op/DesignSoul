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

### 8-Bit / Pixel Art
- [ ] No curves; instant state changes (no easing)
- [ ] Rigid block borders (box-shadow); raised bevel swaps to pressed on `:active`
- [ ] Chunky pixel font for headers; tiled/dithered bg; small high-contrast palette
- [ ] Block cursor / RPG pointer on active items; text ≥ 4.5:1; blink respects reduced-motion

### Manga Panel Grid
- [ ] Asymmetrical/skewed panels + thick ink gutters; contents un-skewed so text is straight
- [ ] Screentone shading for greys (not flat fill); mostly B/W + one spot color
- [ ] Action/speed lines behind a focal element; skewed buttons; bubble inputs thicken on focus
- [ ] Text ≥ 4.5:1 (not over dense tone); `:focus-visible`; transitions respect reduced-motion

### Acid Graphics / Psychedelic Tech
- [ ] Molten chrome/metallic gradient on gooey blob shapes; toxic neon on near-black
- [ ] Distorted display for accents only; clean sans body; spiky starbursts as accents
- [ ] One clear focal point anchors the chaos
- [ ] Body text ≥ 4.5:1; `:focus-visible` visible; morph/rotate respects reduced-motion

### Glitch Art / Cyber-Vapor
- [ ] RGB channel split on key text/edges only (never body); faint scanlines + subtle static
- [ ] Terminal monospace; phosphor/anaglyph palette on near-black
- [ ] Glitch bursts are hover/moment accents, not constant
- [ ] Base content readable (≥ 4.5:1); `:focus-visible`; reduced-motion disables glitch; no rapid flashing

### Doodle / Sketch
- [ ] Wobbly/uneven borders (asymmetric radius or rough stroke)
- [ ] Handwritten headings; legible body (hand or clean sans); paper/cardboard texture
- [ ] Sketchy marks (underline/arrows/hatch); slight imperfection + soft inked shadow
- [ ] Text ≥ 4.5:1 (no long/small body in a hard script); `:focus-visible` (dashed); reduced-motion respected

### Dark Mode (any style)
- [ ] No pure-black surfaces; elevation goes lighter not darker
- [ ] Accents desaturated/lifted; text off-white not pure `#fff`
- [ ] All contrast re-verified; system preference + manual toggle

### Pixel-Art AI-Agent Mascot & Character Animation (see `references/pixel-agent-mascot-animation.md`)
- [ ] Character uniqueness enforced — choreography is specific to character anatomy/theme (not generic bouncing, not copied)
- [ ] Universal baseline hover present — continuous subtle floating motion ($\pm 2\dots 3\text{px}$) ensures character never feels dead or static
- [ ] Complete frame reconstruction — every animation frame is an independent, complete integer pixel-art image
- [ ] Zero raster transforms — strictly 0 CSS rotate/scale, 0 raster rotation, 0 affine warps, and 0 anti-aliased interpolation
- [ ] Continuous row segment bending — flexing tapering/crooked tips shifts unified horizontal rows to eliminate 1px cracks/gaps
- [ ] Complete eye replacement protocol — old eye bounding box cleared and restored with solid dark face color before drawing new eyes
- [ ] Zero unintended visor artifacts — no accidental yellow/white rings, circles, or halos drawn around the eyes
- [ ] Distinct listening posture — listening is immediately identifiable (hover stabilizes, feature perks upright, particles gather inward)
- [ ] Attached components remain solidly fused — dynamic seams track movement with 0 cracks, gaps, or detachment
- [ ] Zero enclosed transparent holes — interior silhouette and visor cavity are 100% solid (alpha = 255); genuine alpha transparency outside
- [ ] All 5 states implemented — Idle (living loop), Listening (attentive cue), Thinking (cognitive focus), Speaking (vocal rhythm), Reaction (anticipation -> peak -> recovery)
- [ ] Multi-resolution verification — tested and clearly readable at 128px UI, 64px chat avatar, and 32px mini badge
- [ ] Hard discrete compositing — exactly one frame rendered at a time; zero frame ghosting, stacking, or crossfading
- [ ] Discrete branch attachment & integrity — branch base, midsection, and tip remain physically connected to the body with 0 cracks, 0 tears, and 0 background leakage
- [ ] Zero forward-mapping dropout cracks — multi-pass 2D morphological gap closure verified on all moving limbs and branches
- [ ] Rigid satellite particle translation — small secondary particles translated as solid integer blocks without slicing or ghost pixels
- [ ] Chrome headless visual QA passed — all 5 states captured at 1280x1200 via Chrome and audited visually before declaring completion
- [ ] Preloaded assets & reduced motion — `@media (prefers-reduced-motion: reduce)` freezes playback on stable neutral pose
- [ ] Topological connected component masking — all particles and appendages extracted using 8-connected BFS, never brittle bounding boxes or color thresholds
- [ ] Complete clean visor plate — body mask excludes eyes; eye cavity flooded with solid visor background color so zero old-eye remnants or ghost stripes can occur
- [ ] Zero partial-body raster scaling — chassis, visor, and cap hover as one unified structure; zero boundary seam tearing
- [ ] Rigid anchor base rows — bottom 2 rows of attached stems/antennae have zero displacement ($dy=0, dx=0$), ensuring permanent seamless attachment
- [ ] Component-isolated gap closure — morphological hole filling executes only on isolated scratch layers, never bleeding across the frame
- [ ] Non-zero integer displacement guarantee — every consecutive frame in an animated sequence incorporates at least one explicit integer offset ($\Delta y \ge 1$ or $\Delta x \ge 1$), preventing duplicate resting frames
- [ ] Coherent full-structure energy propagation — orbital/dimensional bands parameterize along continuous arc length ($t \in [0.0, 1.0]$) with 0 coordinate splits, 0 modulo dithering holes, continuous wave travel, and 100% connected full-band peak states
- [ ] Topological component boundary enforcement — attached multi-part structures (flowers, horns, accessories) are 100% isolated from body mantle logic; energy illumination respects biological boundaries with zero color bleed (e.g. 0 green in flower)
- [ ] Solid visor cavity plate invariant — entire facial cavity extracted topologically and flooded with solid dark visor color; zero old-eye remnants, ghost pixels, or stray outline lines across all state transitions
- [ ] 6-pass 8-neighborhood morphological crack closure — forward raster deformations execute 4-axis opposite-sandwich gap closure so non-linear coordinate stretching never leaves 1-2px unmapped cracks
- [ ] Absolute eye region replacement rule — every eye-expression frame generated as a complete replacement (CLEAR EYE REGION -> RESTORE DARK VISOR -> DRAW NEW EXPRESSION); never overlay new eyes on top of old eyes or transform previous eye rasters
- [ ] Deterministic geometric visor masking — visor cavity delineated via explicit row-span tables and eye box guarantees; never rely on color-threshold BFS that risks skipping anti-aliased perimeter pixels ($45 \le R \le 160$) and stamping old eye borders into body base
- [ ] Mandatory 5-direction eye boundary audit — programmatic scan ABOVE, BELOW, LEFT, RIGHT, and BETWEEN BOTH EYES asserts 0 non-visor pixels outside designated eye bounds across all 45 frames
- [ ] In-place multi-axis morphological dilation — iterative in-place gap closure with 2-pixel lookahead checks eliminates multi-pixel gaps that batch-collected hole queues fail to bridge
- [ ] Inner visor flank boundary anchoring — lateral mantle/cloak deformations anchor $x\_frac = 0.0$ at the inner visor cavity boundary, eliminating boundary seam separation
- [ ] Traveling cloak fold & crystal anchor coherence — wave propagation travels coherently across mantle layers and modulates the bottom crystal anchor without raster detachment
- [ ] Unified attached structure segmentation & additive base anchor — attached structures (top crystal, headset, crest, crown) segmented as ONE complete continuous structure with zero arbitrary vertical/horizontal bounding box partitions; articulating kinematics apply global core displacement additively ($dx_{attached} = dx_{core} + dx_{articulation}$), pinning seam factor strictly to 0.0 at the base to eliminate vertical cracking seams and displacement jumps
- [ ] Discrete master-derived eye reproduction — default/idle eyes sampled directly from authentic master pixel art rather than parametric mathematical formulas, eliminating 1px spikes, middle gap splits, and stray interior pixels
- [ ] 100% full-radius visor pre-stamp flooding — entire eye cavity ($r \le 61\text{px}$) flooded with pure dark visor background color immediately prior to stamping any state eye expression; zero master residual pixels and zero dilation bleed
- [ ] Independent asynchronous particle kinematics — surrounding satellite particles (stars, cross sparks) animate with distinct, non-identical trajectories following a DRIFT -> PAUSE -> DRIFT -> RETURN cycle with perceptible amplitudes ($\ge 4\text{px}$ in idle, inward pull in listening/thinking, rhythmic pulse in speaking, $\pm 12\text{px}$ in reaction)
- [ ] State-adaptive readability cadence — frame rates tailored to character identity (Idle 12 FPS, Listening 12 FPS, Thinking 11 FPS, Speaking 13 FPS, Reaction 15 FPS) for immediate visual readability at avatar scale
- [ ] Complete color-range anatomical plume/crest masking — segmented mask encompasses 100% of the physical envelope including all dark crimson crease/shadow pixels, cleanly wiping all moving pixels from the static chassis plate to eliminate stationary stripe artifacts
- [ ] True wind-waving traveling flag physics — flexible flags, plumes, and fabric crests parameterize along geodesic distance $s \in [0.0, 1.0]$ from the base socket outward to tip with progressive delay ($k \cdot s - \phi$) and non-linear tip displacement growth ($s^{1.5}$), creating authentic traveling folds and flutter instead of rigid tilting
- [ ] Multi-pass morphological scratch canvas gap closure — deformed cloth/plume layers execute 3-pass sandwich morphological closure (horizontal, vertical, diagonal) on an isolated scratch layer before stamping, eliminating 100% of 1px dropouts, black cracks, and raster stepping holes
- [ ] Pre-filled slit cavity plates for mechanical scanner shutters — cage bars articulate across pre-filled dark navy slit cavities (`SLIT_BG_COLOR`), allowing left-to-right sweeps, diagnostic compression, and wide alert apertures without helmet rim tearing
- [ ] Pristine clean chassis invariant — never clear intact body anatomy (cage bars, side ear sockets, visor borders) into background colors; only remove the moving cloth pixels from `clean_chassis` so the entire robot body remains 100% solid and crack-free
- [ ] 2-fold traveling wind wave kinematics — flag parameterization uses $k \ge 3.0\pi$ with non-linear envelope ($s^{1.3}$) and 5-pass gap closure to produce authentic multi-fold cloth flutter rather than a stiff wiggling stick
- [ ] Mandatory localhost asset cache busting — always append fresh version query strings (`?v=YYYYMMDD_revX`) to `getFrameUrl` and HTML `<script>` / `<link>` tags to prevent browser from serving stale cached frames or outdated scripts
- [ ] Top leaves & flexible structures continuous topological partitioning & inverse-mapped row scaling — flexible structures (leaves, ears, stems, tails) extracted topologically as complete connected components without arbitrary geometric bounding-box clipping ($X \ge 90, X \le 245$); vertical stretching/perking uses inverse nearest-neighbor row mapping to guarantee zero skipped destination rows; joined stems blend horizontal displacement continuously across the junction ($dx = (1-t)dx_l + t dx_r$) with zero displacement at root base, eliminating all thin black lines, dark seams, and severed vertical pixel bars


