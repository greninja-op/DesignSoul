# Pixel-Art AI-Agent Mascot Design & Animation System

A comprehensive, production-grade guide for designing, generating, organizing, animating, integrating, and visually verifying a family of fictional AI-agent mascot characters.

This system applies in two workflows:
1. **Reference-Image Workflow**: The user supplies an existing character master image to animate without altering its core identity.
2. **From-Scratch Workflow**: The user has no image yet and needs a new character designed from concept through master static artwork to production animation.

---

## 1. Core Visual Language

The universal family language across all AI-agent mascots is **polished modern pixel art**:

- **Chunky Pixel Clusters**: Deliberate, structured 2D pixel blocks rather than noisy single-pixel dithering or random singletons.
- **Hard Aliased Edges**: Crisp nearest-neighbor integer raster grid. **Strictly zero anti-aliasing, zero blur, zero vector smoothing, zero smooth gradients, and zero accidental 3D lighting.**
- **Compact Chibi Proportions**: Large expressive head/visor mass, compact body silhouette, high visual weight that remains immediately readable at small avatar sizes (24px to 64px).
- **High Contrast & Purposeful Palettes**: Limited palette per character (5 to 8 deliberate colors): dominant primary, dark tone, midtone, crisp highlight, contrasting accent, eye glow color, and deep visor faceplate.
- **Discrete Shading**: 3 to 4 tonal levels per hue. Shading is placed in solid pixel steps to describe volume and depth.
- **Silhouette Dominance**: Shape clarity takes priority over microscopic detail. If a character cannot be recognized from its solid black silhouette, the design is too busy.

---

## 2. Character Anatomy & Shared Structure

Every mascot in the family shares a unified architectural archetype while maintaining an independent physical and thematic personality:

```
                  ┌──────────────────────────────┐
                  │    TOP IDENTITY FEATURE      │ (Antenna, Sprout, Flame Crest,
                  │  (Seamlessly Anchored Head)  │  Crystal, Celestial Halo, Ears)
                  └──────────────┬───────────────┘
                                 │
                 ┌───────────────┴───────────────┐
                 │       MAIN HEAD / BODY        │ (Rounded chibi mass, solid pixel
                 │   [  DARK VISOR FACEPLATE  ]  │  cluster shading, crisp rim)
                 │   [   (♥ ♥) EXPRESSIVE EYES ]  │
                 └───────┬───────────────┬───────┘
                         │               │
        ┌────────────────┴──────┐ ┌──────┴────────────────┐
        │  SIDE WINGS / EARS    │ │  FLOATING PARTICLES   │ (Synchronized convection,
        │  (Attached Structures)│ │  (Embers, Hearts,     │  drift, gather, burst)
        └───────────────────────┘ │   Stars, Spores)      │
                                  └───────────────────────┘
```

### The Face & Visor Language
- **Large Dark Faceplate**: Rounded rectangle, pill, or organic geometry sitting recessed into the helmet or head.
- **Palette**: Deep navy, burgundy, blue-black, purple-black, or forest-black (`RGB < [70, 70, 70]`).
- **High Contrast**: The visor creates an uncluttered canvas for minimal, high-contrast eyes.
- **Zero Facial Clutter**: No mouth, no nose, no ears inside the visor unless explicitly requested by character concept. Emotional communication happens through **eye expression, head posture, and whole-body animation**.

### The Eye Expression System
Eyes are the primary communication instrument. Supported geometries include:
- **Vertical Bars**: Tall rectangles (`||`), classic robotic/sensor expression.
- **Horizontal Bars**: Narrow concentrated beams (`=`), calm or calculating.
- **Heart Shapes**: Joyful, empathetic, emotional (`♥ ♥`).
- **Curved Arches**: Happy upward crescents (`^ ^`) or sleeping resting creases (`︶ ︶`).
- **Equalizer Sensors**: Modulating audio-meter segments responding to acoustics.
- **Celestial Stars**: Four-point diamond sparks for celebratory reactions.

> [!IMPORTANT]
> **The Complete Eye Replacement Rule**:
> When an eye expression changes across frames, **never draw the new eye on top of the old eye pixels**.
> You must:
> 1. **Clear the entire old eye region.**
> 2. **Restore the dark visor faceplate** (using 2D harmonic inpainting or clean face sampling).
> 3. **Draw the new eye expression from scratch.**
> Failure to follow this rule creates leftover pixel remnants, ghost bars, and blurred hybrid shapes.

---

## 3. Character Uniqueness (Mandatory Rule)

**Never give every character the same animation choreography.**

While characters share the polished pixel-art visual language and 5 universal state categories, their physical motion identity must be derived directly from their unique anatomy and material properties:

| Archetype | Theme | Primary Motion | Secondary Motion | Unique Listening Cue | Unique Thinking Cue |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Cosmo (`space-bot`)** | Celestial Orbit | Weightless floating, 360° ring orbit | Floating crystals | Sensor cross glows, orbit stabilizes | Horizontal visor beam, tilt |
| **Ignis (`fireball`)** | Living Fire | Whole-body flame flow, thermal breathing | Top crest wave, ember convection | Flame elongates toward sound | Internal thermal contraction, curl |
| **Sprout (`sprout-bot`)** | Botanical Flora | Organic sprout stem bending, leaf flutter | Side leaf flex, breathing | Sprout perks toward sound source | Contemplative left-leaf droop |
| **Felina (`cat-bot`)** | Feline Android | Independent ear twitching, perking | Head tilt, cheek lights | Ears pivot toward sound direction | Asymmetrical ear fold, concentrated gaze |
| **Glacia (`frost-crystal`)** | Crystalline Ice | Sharp resonance, floating shards | Facet shimmer | Crystal facets align acoustically | Internal facet refractions |
| **Sol (`golden-sun`)** | Solar Radiant | Core pulsating, solar flare flares | Corona rays | Solar flare aligns toward sound | Flare pulls inward, corona darkens |
| **Amora (`heart-bot`)** | Emotional Mascot | Living biological heartbeat expansion/contraction | Top heart antenna dip/rise | Attentive taller heart eyes, particles gather | Narrowed heart eyes, slow contraction |

---

## 4. Production Frame Architecture

### Recommended Canvas Dimensions
- **Target Canvas**: **256 × 256 px** or **340 × 340 px** square integer canvas.
- **Grounded Anchoring**: The character must have stable baseline positioning with consistent margins (minimum 24px padding on all sides to allow antenna or flame rises during reactions).
- **Format**: Individual PNG frames with full 8-bit alpha transparency.
- **No Decorative Presentation Crops**: Do not crop characters from a miniature showcase sprite sheet and treat them as production assets. Production frames must be authored at full target resolution.

### The Complete Frame Reconstruction Rule
Every animation frame must be an independent, fully reconstructed pixel-art image.
- When an attached part moves (ear, leaf, antenna, flame):
  - **Rebuild the old region**: Restore background transparency or underlying body silhouette cleanly.
  - **Rebuild the new region**: Render the moving element at its new position with complete outlines and highlights.
  - **Dynamic Seam Tracking**: The boundary where the moving part meets the stationary body must remain seamlessly fused with **zero cracks, zero transparent gaps, and zero detachments**.

### Hard Frame Compositing
At runtime:
- **Exactly one complete frame is rendered at any instant.**
- Never crossfade, interpolate, stack, or blend consecutive frames. Discrete pixel-art motion requires crisp, single-frame replacement.

---

## 5. Universal 5-State Animation Choreography

Every mascot implements the 5 standard agent states. The choreography must remain character-specific:

```
                     ┌───────────────────────────┐
                     │           IDLE            │ (Calm, continuous living loop)
                     └──────┬─────────────▲──────┘
         User speaks        │             │ Response finished / Reaction settles
                            ▼             │
                     ┌─────────────┐      │
                     │  LISTENING  │      │
                     └──────┬──────┘      │
         User stops speaking│             │
                            ▼             │
                     ┌─────────────┐      │
                     │  THINKING   │      │
                     └──────┬──────┘      │
         Agent responds     │             │
                            ▼             │
                     ┌─────────────┐      │
                     │  SPEAKING   │──────┘
                     └──────┬──────┘
         Success / Event    │
                            ▼
                     ┌─────────────┐
                     │  REACTION   │────────────► (One-shot celebration -> Returns to Idle)
                     └─────────────┘
```

### 1. IDLE (8–14 Frames, Loop, 8–10 FPS)
- **Goal**: Make the mascot feel continuously alive while resting.
- **Choreography**: Subtle breathing (radial expansion/contraction), gentle material motion (flame sway, leaf flutter, heartbeat pulse), and an occasional natural blink on frames 06–08.
- **Anti-Pattern**: Do NOT make the character simply bounce up and down like an elevator.

### 2. LISTENING (8–10 Frames, Loop, 9–11 FPS)
- **Goal**: Clearly signal "I am paying attention to incoming audio/user input."
- **Choreography**: Directional posture lean toward user, sensor or ear orientation, attentive taller eyes, floating particles gather closer.
- **Anti-Pattern**: Do NOT use generic green sound-wave lines unless natural to the mascot.

### 3. THINKING (8–12 Frames, Loop, 9–11 FPS)
- **Goal**: Communicate internal calculation and cognitive focus.
- **Choreography**: Asymmetrical posture tilt, slower movement cadence, internal energy contraction, narrowed/concentrated eyes, particles drifting upward.
- **Anti-Pattern**: Do NOT merely increase eye brightness or add a spinning loading circle.

### 4. SPEAKING (8–10 Frames, Loop, 10–12 FPS)
- **Goal**: Communicate active verbal response stream.
- **Choreography**: Conversational cadence with rhythmic expansion on syllables, vocal eye modulation, dynamic secondary feature flutter.
- **Anti-Pattern**: Do NOT use rigid opening/closing mouth flaps on characters that have no mouth.

### 5. REACTION (6–12 Frames, One-Shot, 12–14 FPS)
- **Goal**: High-energy emotional milestone (task completion, success, celebration).
- **Choreography Curve**:
  $$\text{Anticipation (Crouch)} \to \text{Launch Surge} \to \text{PEAK REACTION (Apex Bloom)} \to \text{Settling Recovery} \to \text{Return to Idle}$$
- **Peak Frame**: Maximum expansion ($115\% \dots 130\%$), brightest eye expression (hearts, stars, joyful arches), energetic particle burst.

---

## 6. From-Scratch Character Creation Workflow

When designing a new mascot without an existing image, follow this 17-step pipeline:

1. **Concept & Role**: Define the agent's domain (e.g., Code Reviewer, Security Sentry, Audio Synthesis, Data Pipeline).
2. **Emotional Personality**: Pick 2 core traits (e.g., cheerful & energetic, stoic & observant, warm & empathetic).
3. **Physical & Elemental Theme**: Choose an archetype (Cosmic, Fire, Plant, Ice, Feline, Solar, Heart, Electric).
4. **Distinctive Silhouette**: Block out the outer contour in solid black. Ensure it has 1 unmistakable silhouette landmark (tall crest, sprout, halo, ears).
5. **Primary Body Mass**: Construct the chibi head/body on a 256x256 integer canvas.
6. **Visor Architecture**: Carve out the dark recessed visor plate (`[20, 20, 35]`).
7. **Default Eye Language**: Choose the signature eye geometry matching the character's personality.
8. **Primary Moving Feature**: Determine the main moving anatomy for animations (e.g., sprout leaves, cat ears, flame crest).
9. **Secondary Attached Features**: Add side wings, horns, shoulder pads, or lower base.
10. **Floating Ambient Particles**: Add 3 to 5 discrete floating particles (spores, embers, hearts, stars).
11. **Strict 6-Color Palette**: Select 1 deep outline, 1 visor base, 1 body base, 1 body shadow, 1 body highlight, 1 eye accent.
12. **Solid Pixel-Cluster Shading**: Apply discrete tonal blocks. Zero airbrushing, zero smooth gradients.
13. **Clean Outline Philosophy**: Ink with a dark, palette-harmonized outline (dark navy/burgundy/forest).
14. **Small-Size Downscale Test**: Scale the static artwork to 64px, 36px, and 24px. Verify that the eyes, silhouette, and primary feature remain unmistakable.
15. **Save Master Reference**: Save to `characters/<name>/master/character-reference.png`.
16. **Layer Separation**: Isolate background visor, eye sprites, body mass, and particle sub-canvases.
17. **Generate 45 Production Frames**: Apply character-specific deformation and eye expressions across all 5 states.

---

## 7. Common Failure Modes & Prevention Checklist

Audit every generated frame against these 18 common pixel-art animation failures:

| # | Defect | Cause | Prevention Rule |
| :--- | :--- | :--- | :--- |
| **1** | **Ghost Pixels / Residue** | Moving part leaves old pixels behind | Completely wipe old bounding box before blitting new position. |
| **2** | **Enclosed Transparent Holes** | Forward raster warp stretches pixels apart | Use backward-mapping with nearest-neighbor interpolation. |
| **3** | **Broken Attachment Seams** | Body shrinks while antenna/ear stays static | Implement dynamic seam tracking tied to vertical heartbeat/stretch. |
| **4** | **Hybrid / Overlaid Eyes** | Drawing new eye over previous eye | Wipe eye box $\to$ restore dark visor faceplate $\to$ draw new eye. |
| **5** | **Anti-Aliasing Blur** | Bilinear or bicubic image resampling | Always use `Image.NEAREST` when scaling pixel-art assets. |
| **6** | **Opaque Bounding Boxes** | Saving canvas with black or white background | Ensure 8-bit alpha channel transparency outside silhouette. |
| **7** | **Inconsistent Pixel Scale** | Mixing 1x and 4x pixel blocks | Maintain uniform pixel grid density across all elements. |
| **8** | **Violent Whole-Body Shaking** | Trying to simulate energy with random offsets | Replace shaking with controlled elastic expansion and wave harmonics. |
| **9** | **Detached Floating Parts** | Moving ear as independent sprite | Treat attached features as continuous extensions of the skull. |
| **10** | **Unintentional Transparent Gaps** | Incomplete alpha flood-fill | Run automated hole audit: exterior floodfill must equal total empty space. |
| **11** | **Particle Collisions** | Gathering particles touch the body | Enforce minimum 4px safety buffer between particles and body rim. |
| **12** | **Microscopic Unreadable Motion** | 1-pixel changes that vanish at 48px | Ensure primary motion displaces by at least 4% of character canvas. |
| **13** | **Generic Bouncing Elevator** | Applying vertical bob to entire frame | Apply squash-and-stretch with grounded baseline. |
| **14** | **Accidental Palette Drift** | Hue shifting between animation frames | Sample colors strictly from the validated static master palette. |
| **15** | **Missing Neutral Return** | Frame 12 or 45 does not match Frame 01 | Ensure neutral frames are 100.0% pixel-identical clones of the master. |
| **16** | **Stray Single-Pixel Lines** | Raster rotation rounding errors | Snap rotated components to discrete orthogonal pixel clusters. |
| **17** | **Unwanted Facial Features** | AI adding mouth/nose during generation | Strictly enforce visor minimalism: face contains only eyes. |
| **18** | **Canvas Edge Clipping** | Reaction surge exceeds canvas boundary | Maintain at least 24px padding around default pose on all 4 borders. |

---

## 8. Quality Assurance & Browser Verification Loop

Do not declare completion simply because code runs. Every character animation must complete the **Autonomous Browser Visual QA Loop**:

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   GENERATE   │ ──► │  INTEGRITY   │ ──► │ OPEN CHROME  │ ──► │ MULTI-SCALE  │
│  45 FRAMES   │     │    AUDIT     │     │     LAB      │     │  INSPECTION  │
└──────────────┘     └──────┬───────┘     └──────────────┘     └──────┬───────┘
                            │ (If failed)                             │ (If artifact)
                            ▼                                         ▼
                     ┌──────────────┐                          ┌──────────────┐
                     │ RECALIBRATE  │                          │  AUTO-FIX    │
                     │  DEFORM ENG  │                          │    ASSET     │
                     └──────────────┘                          └──────────────┘
```

### Multi-Resolution Verification Standards
Inspect the character rendered at:
1. **Normal UI Size (120px–140px)**: Primary inspection size. Verify heartbeat elasticity, crest waving, and particle flow.
2. **Chat Avatar Size (64px)**: Primary operational size. Verify that eye state changes and primary feature movements are instantly recognizable.
3. **Micro Avatar Size (24px–36px)**: High-density badge size. Verify that the character reads as a crisp, distinct icon with zero blurred edges.
4. **Zoomed Inspection (2x–4x)**: Edge integrity check. Verify zero cracks, zero stray lines, and zero transparent holes along all seams.

---

## 9. Asset Organization Standard

Store every character's assets in its own isolated directory structure. Never mix assets across characters:

```
characters/
└── <character-name>/
    ├── master/
    │   └── character-reference.png       # 100% immutable visual master
    ├── idle/
    │   ├── frame-01.png                  # Exact clone of master
    │   └── ...                           # frames 02 to 12
    ├── listening/
    │   └── frame-13.png ... frame-20.png # Attentive loop
    ├── thinking/
    │   └── frame-21.png ... frame-29.png # Contemplative loop
    ├── speaking/
    │   └── frame-30.png ... frame-37.png # Conversational loop
    ├── reaction/
    │   └── frame-38.png ... frame-45.png # Celebration one-shot
    ├── sprite-sheets/                    # Optional compiled sheets
    │   ├── idle.png
    │   ├── listening.png
    │   ├── thinking.png
    │   ├── speaking.png
    │   └── reaction.png
    └── documentation/
        ├── showcase.png                  # 10-keyframe contact sheet
        ├── multi-res-qa.png              # Multi-resolution verification card
        └── choreography-spec.md          # Mathematical formulas and timings
```

---

## 10. Application Runtime Integration

### Architecture
```
┌─────────────────────────────────────────────────────────┐
│                 APPLICATION UI LAYER                    │
│   (Avatar View / Chat Header / Assistant Status Badge)  │
└───────────────────────────┬─────────────────────────────┘
                            │ setCharacterState("listening")
                            ▼
┌─────────────────────────────────────────────────────────┐
│              ANIMATION CONTROLLER (SHARED)              │
│  - State Machine (idle, listening, thinking, speaking)  │
│  - Transition queues & One-shot reaction handler        │
│  - Configurable FPS clock & requestAnimationFrame loop  │
│  - Preloader & image cache                              │
└───────────────────────────┬─────────────────────────────┘
                            │ discrete frame index
                            ▼
┌─────────────────────────────────────────────────────────┐
│              HTML5 CANVAS / SPRITE VIEW                 │
│  - Nearest-neighbor pixelated rendering                 │
│  - image-rendering: pixelated; crisp-edges;             │
└─────────────────────────────────────────────────────────┘
```

### Agent Lifecycle State Mapping
- `User starts speaking / typing` $\to$ `setCharacterState("listening")`
- `Agent starts processing / tool calling` $\to$ `setCharacterState("thinking")`
- `Agent streams text / voice response` $\to$ `setCharacterState("speaking")`
- `Agent finishes response` $\to$ `setCharacterState("idle")`
- `Task completed / Success milestone` $\to$ `triggerReaction()` (plays once, automatically transitions back to `idle`)

### Accessibility & Reduced Motion
Respect `prefers-reduced-motion`:
```css
@media (prefers-reduced-motion: reduce) {
  .character-canvas {
    animation: none !important;
  }
}
```
When reduced motion is active, the runtime freezes playback on the stable neutral keyframe (Frame 01) and communicates status via text labels and subtle, non-moving badge accents.

---

## 11. Field-Tested Correction Rules & Permanent Error-Prevention Knowledge Base

Whenever error-fixing prompts are received across past character iterations (e.g., Lantern Bot, Signal Bot, Moss Gravity Bot, Arcane Wizard Hat, Laboratory UI), the root causes and permanent engineering solutions are recorded here. **Always review and comply with these rules prior to authoring any new character:**

### Rule 1: Strict Zero-Artifact Visor & Complete Cavity Clearing (Lantern Bot Lessons)
- **Defect Encountered**: Unintended yellow rings/halos/circles appearing around eyes; leftover vertical bars corrupting horizontal eyes.
- **Root Cause**: Stacking or overlaying eye states on top of previous frames, or drawing arbitrary radial glow rings not present in the master.
- **Mandatory Prevention Protocol**:
  1. **Strict Complete Cavity Clear Rule**:
     $$\text{CLEAR OLD EYE BOUNDING BOX} \longrightarrow \text{RESTORE CLEAN VISOR BACKGROUND} \longrightarrow \text{DRAW NEW EYE PIXELS}$$
     Sample the authentic dark face color from the master artwork (e.g. `[24, 10, 58, 255]`), clear the rectangle covering all possible eye positions, flood with clean face color, and only then render the new eye geometry.
  2. **Zero Halos / Rings**: The dark visor cavity must remain clean. Never add circular rings, glowing rings, halos, or concentric shapes around the eyes unless explicitly present in the original master reference image.
  3. **High-Contrast Light Emission**: Glowing accents and light emission must use distinct, vibrant palette colors with bold visual contrast against the dark visor, remaining clearly discernible down to 32px.

### Rule 2: Mandatory Universal Baseline Hover (Signal Bot Lessons)
- **Defect Encountered**: Mascot feeling completely dead, rigid, and static like a corpse during idle and listening states.
- **Root Cause**: Over-indexing on tiny localized movements (e.g. 1px eye blink) without whole-body life motion.
- **Mandatory Prevention Protocol**:
  - Every single character in the animation system **MUST** have a continuous subtle baseline hover/life motion:
    $$\text{UP } (-2\text{ to }-3\text{px}) \longrightarrow \text{CENTER } (0\text{px}) \longrightarrow \text{DOWN } (+2\text{px}) \longrightarrow \text{CENTER } (0\text{px})$$
  - The baseline hover is the **underlying life motion**. Character-specific primary motions (flame sway, hat tip flex, antenna tilt, stone drift) layer on top of it.
  - The mascot must **never** be 100% physically identical across consecutive resting frames.

### Rule 3: Character-Specific Distinct Listening (Signal Bot Lessons)
- **Defect Encountered**: Listening state visually indistinguishable from Idle, requiring users to look at UI badges.
- **Root Cause**: Minimalist 1-pixel changes that do not alter the silhouette or posture.
- **Mandatory Prevention Protocol**:
  - Listening must communicate **immediate magical or acoustic awareness**:
    1. **Hover Stabilizes**: Body float locks to a stable, rock-steady anchor.
    2. **Perking / Straightening**: Primary sensory feature (antennae, ears, wizard hat tip, sprout stem) perks or straightens upright.
    3. **Inward Particle/Field Attraction**: Surrounding particles, fragments, or embers draw inward into a disciplined, compact sensing formation.
    4. **Attentive Eyes**: Eye geometry elongates or widens noticeably to express focused reception.
  - Never use generic sound-wave ripples or stock audio icons unless the character's native lore explicitly calls for it.

### Rule 4: Zero Raster Transforms & Continuous Segment Shifts (Moss Gravity & Arcane Wizard Lessons)
- **Defect Encountered**: 1px transparent cracks, sheared borders, detached pixels, and jagged artifacts when flexing connected structures (e.g., wizard hat tip, plant stems, antenna shafts).
- **Root Cause**: Applying raster rotation, CSS transforms, fractional subpixel offsets, or shifting different parts of the same continuous row independently.
- **Mandatory Prevention Protocol**:
  - **Zero Raster Transforms**: Strictly **zero** CSS rotate, CSS scale, raster rotation, affine warping, or anti-aliased interpolation.
  - **Continuous Row Segment Shifts**:
    When flexing or curling an attached cone, tip, stem, or horn, shift entire horizontal rows as unified integer segments:
    $$dx(y) = \text{int}\left(\text{flex} \times \frac{y_{\text{base}} - y}{h}\right)$$
    This preserves the exact relative spacing between the main cone and any dangling loops/folds with **0 cracks, 0 gaps, and 100% seamless attachment** at the anchor seam ($y_{\text{base}}$).
  - **Visor Cavity Solid Opacity**: The core faceplate must maintain 100% alpha = 255 with zero transparency holes.

### Rule 5: Single HTML Animation Lab Experience & Dynamic Latest-Character Default
- **Defect Encountered**: Refreshing the browser repeatedly loaded an old hardcoded character (`gyro-core` yellow sun), forcing the user to search through 17+ buttons to find newly generated characters.
- **Root Cause**: Hardcoded fallback string on page load, and chronological tab order burying new characters at the bottom right.
- **Mandatory Prevention Protocol**:
  1. **Dynamic Latest-Character Detection**:
     The HTML laboratory must dynamically detect the most recently added character (`getLatestCharacterId()`) in `CHARACTER_REGISTRY` and make it the **immediate active default** on initial load and browser refresh (`F5`).
  2. **Reverse-Chronological Character Tabs**:
     Character selector buttons in `buildCharacterSelector()` must be displayed in reverse-chronological order so newly generated characters appear at **Position #1 (top-left)** of the grid with a prominent, glowing **`NEW`** badge.
  3. **Zero Hardcoded Legacy Fallbacks**: Never hardcode an old character key like `'gyro-core'` or `'space-bot'` as the default fallback in `index.html`.

### Rule 6: Mandatory Automated Visual QA Loop
- Do not consider any character complete until:
  1. **Mathematical Audit Script** passes 45/45 frames (340x340 RGBA, 0 corner leaks, 0 visor holes, 100% non-zero deltas).
  2. **Google Chrome Headless Capture** runs across all 5 states (`idle`, `listening`, `thinking`, `speaking`, `reaction`) and saves 1280x1200 full-viewport captures for visual verification.
  3. **Multi-Resolution Contact Card** confirms readability at 128px, 64px, 48px, and 32px.

### Rule 7: Seamless Branch Deformation, Disjoint Mask Partitioning, Multi-Pass Gap Closure & Particle Rigidity (Bioelectric Coral Bot Lessons)
- **Defects Encountered**:
  1. Visible pixel shifting and crackling on side branches: vertical 1px black slice lines cutting across branch columns; horizontal tears splitting branch midsections.
  2. Floating blue particles sliced in half with residual ghost trails.
  3. Hairline cracks between the head/chin and side branching structures.
- **Root Causes**:
  1. *Forward Point-Mapping Dropouts*: Displacing pixel columns forward (`nx = x - int(w * f)`) without reverse sampling or hole filling causes adjacent integer displacements to skip a column, leaving an unwritten vertical 1px line (`alpha = 0`).
  2. *Abrupt Piecewise Sign Flips*: Conditional vertical curling (`-dy if y < 160 else +dy`) pulls the upper section up and lower section down, tearing row 168 apart.
  3. *Incomplete Color Masking on Multi-Tonal Particle Clusters*: Color threshold `R < 120` on blue particles excluded bright white/cyan highlights (`R > 200, G > 200, B > 200`), causing highlight pixels to be left behind as ghost pixels while the particle base moved away.
  4. *Non-Disjoint Anatomical Masking*: Defining branches by simple X-coordinate thresholds (`x <= 97`) without vertical bounding captured outer pixels of the top head and bottom chin, tearing them from the central body.
- **Mandatory Prevention Protocol**:
  1. **Disjoint Partitioning of Anatomy**:
     Every non-particle pixel of the character must belong to exactly ONE mutually exclusive mask:
     - Left branch: vertically bounded to the branch span (`y in [100..232], x <= 97`).
     - Right branch: vertically bounded to the branch span (`y in [100..232], x >= 242`).
     - Central body: 100% of all remaining character anatomy (`~is_left_branch & ~is_right_branch & ~is_particle`).
     Never leave anatomical regions unassigned or ambiguously overlapping.
  2. **Continuous Deformation Functions Without Sign Flips**:
     Vertical curling and wave deflection must be continuous without step functions or sign discontinuities:
     $$dy = \text{int}\left(\text{round}\left(0.38 \times w \times f \times \frac{y - y_{\text{anchor}}}{h}\right)\right)$$
     This guarantees zero horizontal tears across the structure.
  3. **Iterative Multi-Pass (4-Pass) Gap & Crack Closure**:
     Immediately after forward deformation of branches or limbs, run an iterative 4-pass morphological gap closure loop over the branch bounding boxes:
     If `frame[y, x, 3] == 0` and it is flanked horizontally or vertically by filled branch pixels (`frame[y, x-1]` and `frame[y, x+1]`, or `frame[y, x-1]` and `frame[y, x+2]`, or `frame[y-1, x]` and `frame[y+1, x]`), fill it with the adjacent branch color.
  4. **Rigid Whole-Block Particle Translation**:
     Never deform or shear small secondary floating particle clusters point-by-point. Small satellite particles must be translated as solid, rigid integer blocks:
     $$(ny, nx) = (y + \text{hover\_y} + p_{dy}, x + p_{dx})$$
     Ensure particle color masks encompass ALL component colors including specular white highlights (`B > 140, G > 120, B >= R - 5`).
  5. **Branch Attachment Integrity**: The branch base, midsection, and tip must remain a continuous pixel-art structure anchored to the body with zero crackling or separation.

### Rule 8: Topological Connected Component Masking, Clean Visor Plates & Seamless Anchor Rows (Orange Sprout Bot Lessons)
- **Defects Encountered**:
  1. *Horizontal Black Slicing & Vertical Green Bars on Eyes*: In Idle frame 02 and other animated frames, mint arch eyes were sliced horizontally in half by a black void, with missing pixel rows, broken geometry, and stray vertical green bars.
  2. *Top-Left Orange Cap Notch & Sliced Floating Spark*: A square chunk was ripped out of the upper orange cap and moved away, while a floating amber spark had a horizontal black cut slicing into its center with darker edge pixels stripped.
  3. *L-Shaped Black Crack next to Sprout*: A black gap opened between the sprout stem and orange cap, cutting into the green foliage.
- **Root Causes**:
  1. *Color-Filter Threshold Dropout*: The eye mask condition `R < 120` failed because authentic mint eye rows 206–208 had $R \in [122..134]$. This caused `is_eye` to miss half the eye pixels. When `render_eyes` wiped the bounding box with black and redrew only the incomplete mask, the missing rows became horizontal black slices. Furthermore, `is_body` had drawn the unshifted eyes beforehand, causing ghost pixels.
  2. *Bounding Box Spark Extraction & Color Clipping*: Sparks were extracted with loose bounding boxes ($X < 130, Y < 115$) and strict color cuts ($R > 180, B < 70$). This captured part of the orange cap shoulder ($Y < 115, X < 130$) and moved it away with the spark, ripping a notch in the head. Meanwhile, darker shaded edge pixels of the spark ($R \le 180$) were left behind on the body, slicing the spark in half.
  3. *Artificial Bounding Box Cap on Sprout Leaf*: Sprout mask was artificially clipped at $X \le 225$, but the right leaf extends to $X=232$. The 154 tip pixels stayed behind on the body and tore away when the sprout stretched.
  4. *Raster Fragment Expansion on Boundary Seams*: Attempting to expand the orange cap horizontally without expanding the white body underneath tore the seam between the cap and body.
- **Mandatory Prevention Protocol**:
  1. **Topological Connected Component Masking**:
     - Never extract floating particles, sparks, or appendages using loose bounding boxes or brittle color thresholds.
     - Always use 8-connected component flood-fill (BFS) to isolate the exact, complete, multi-tonal component with 100% of its shaded and highlight pixels intact.
     - Verify that $\sum \text{pixels}(\text{body}) + \sum \text{pixels}(\text{appendages}) + \sum \text{pixels}(\text{particles}) = \text{total master non-empty pixels}$ with zero overlap and zero dropouts.
  2. **Clean Visor Background Plate Rule**:
     - The body mask MUST completely exclude all eye pixels (`is_body = master & ~is_sprout & ~is_spark & ~is_eye`).
     - In `clean_master_body`, replace the eye cavity with the authentic solid visor background color (`[1, 17, 28, 255]`).
     - When `clean_master_body` is drawn onto any frame, the visor is ALREADY 100% clean, dark navy, and solid.
     - Expressions are drawn onto this clean plate, making old-frame eye ghosting, horizontal slices, and vertical green bars mathematically impossible.
  3. **Zero Partial-Body Raster Fragment Scaling**:
     - Never scale or deform an attached upper cap or dome independently of the underlying chassis. The entire character head and chassis must hover as a unified, continuous structure to preserve border integrity and prevent boundary cracking.
  4. **Rigid Stem Anchor Rows ($Y \ge y_{\text{base}} - 1$)**:
     - The root of an attached stem or antenna must have $dy = 0, dx = 0$ for its bottom 2 rows ($y \ge 106$), ensuring it remains permanently fused to the head with zero gap, zero crack, and zero background leak.
  5. **Component-Isolated Internal Gap Closure**:
     - Morphological hole closure must ONLY run on isolated component scratch canvases (`sprout_canvas`), never across the whole frame, preventing accidental bleeding into adjacent features or backgrounds.

### Rule 9: Minimum Particle-to-Hull Buffer Spacing & Non-Zero Subpixel Delta Guarantees (Spell-Channeler Bot Lessons)
- **Defects Encountered**:
  1. *Subpixel Deflection Dropouts*: Very small floating-point deflection coefficients (e.g. `tilt = 0.2`, `front_lift = 0.2`) on short coordinate spans round to `0` across every row, accidentally rendering duplicate resting frames and violating non-zero delta rules.
  2. *Particle-to-Hull Merging*: Moving floating particles into tight constellation alignments within 1px of the outer hull causes external air gaps to register as internal cracks or visually merge with the character silhouette at low resolutions.
- **Mandatory Prevention Protocol**:
  1. **Non-Zero Integer Displacement Guarantee**:
     Every consecutive frame in an animated sequence must incorporate at least one explicit integer offset ($\Delta y \ge 1$ or $\Delta x \ge 1$ on whole-body hover, aperture size, or particle positions). Never rely solely on tiny fractional tilts that risk rounding down to zero.
  2. **$\ge 4\text{px}$ Particle Buffer Zone**:
     Floating satellite particles must maintain a minimum clear buffer distance of $\ge 4\text{px}$ from the outer character hull across all constellation states. This preserves crisp, readable silhouettes down to 32px and prevents boundary ambiguity.

### Rule 10: Coherent Full-Structure Energy Propagation vs Dithered Pixel Dropout & Segment Cutting (Phase-Core Bot Lessons)
- **Defects Encountered**:
  1. *Broken Light Segments & Thin Dark Artifacts*: The diagonal white/lavender band developed a fragmented lighting effect where only small disconnected chunks lit up while neighboring pixels remained dark or missing.
  2. *Dithered Hole Punching*: Using modulo operations like `(x + y) % 3 != 0` to simulate transparency punched 1px holes throughout the band, leaving scattered, detached pixel debris that appeared as a rendering failure.
  3. *Sharp Geometric Slicing*: Splitting the band abruptly at a vertical coordinate threshold ($X \le 174$) created a harsh 1px vertical fracture cutting straight across a continuous diagonal ribbon.
- **Root Causes**:
  1. *Coordinate-Space Chunking vs Parametric Manifold*: Treating a diagonal wrapping band with rectangular bounding boxes or arbitrary X-splits broke its topological continuity.
  2. *Pixel-Level Modulo Erasure*: Modulo dithering on solid pixel-art anatomy causes missing pixels, discontinuous edges, and dark cracks.
  3. *Incoherent Partial Illumination*: Flashing isolated segments without a smooth continuous wave trajectory created the impression of rendering errors rather than intentional energy propagation.
- **Mandatory Prevention Protocol**:
  1. **Parametric Arc-Length Propagation ($t \in [0.0, 1.0]$)**:
     - Always treat orbital bands, conduits, light rings, and energy ribbons as continuous 1D/2D manifolds.
     - Parameterize every pixel $(y, x)$ belonging to the structure with a normalized path coordinate $t \in [0.0, 1.0]$ along its continuous centerline.
     - Energy and lighting waves must propagate continuously through $t$:
       $$\text{dist} = |t - t_{\text{center}}|$$
       $$I(t) = I_{\text{ambient}} + (I_{\text{peak}} - I_{\text{ambient}}) \times \cos^2\left(\frac{\pi}{2} \frac{\text{dist}}{w_t}\right) \quad \text{for } \text{dist} \le w_t$$
     - Never split continuous diagonal structures with Cartesian coordinate cuts ($x \le \text{const}$).
  2. **Strict Zero Modulo Dithering on Solid Structural Anatomy**:
     - Strictly prohibit modulo operations (`(x + y) % N == 0`) on solid pixel-art anatomy, bands, or limbs.
     - Never simulate transparency by deleting pixels into 1px holes. Changes in state, energy, or phase must be expressed through palette luminance transitions and coherent edge highlights.
  3. **Unbroken Full-Band Peak States**:
     - When an energy effect reaches peak (e.g. Reaction F43 or Listening focus F18), 100% of visible band pixels ($t \in [0.0, 1.0]$) must reach elevated radiant illumination simultaneously as ONE unbroken, connected structure.
     - Never leave random dark segments or disconnected chunks during a full-energy peak surge.
  4. **Harmonious Palette Family Elevation**:
     - Active illumination states must use brighter values of the exact same color family:
       - Normal: authentic white/lavender (`[215..230, 180..215, 250..255]`)
       - Active: bright cyan-lavender (`[220..245, 235..252, 255]`)
       - Peak: radiant pure white core (`[255, 255, 255]`) and radiant cyan-white borders (`[232..248, 246..255, 255]`)
     - Strictly forbidden: out-of-family colors (yellow, green, pink, red, rainbow) and soft blur/bloom/gradients. The pixel art must remain 100% crisp.
  5. **Complete Discrete Frame Reconstruction & Depth Occlusion**:
     - Every frame is rendered from a clean base: clear previous band state, compute complete continuous illumination state, and composite with strict depth hierarchy (occluding body parts properly cover rear band sections without light leaking through).

### Rule 11: Topological Component Boundary Enforcement vs Color-Threshold Dropout & Cavity Infiltration (Photosynthesis Bot Lessons)
- **Defects Encountered**:
  1. *Visor Eye Ghosting & Leftover Outlines*: Arched eye outlines and stray green pixels remained stamped onto the visor when transitioning to other eye states (e.g. Thinking horizontal bars), creating malformed double-eyes and thin green residual lines.
  2. *Flower Center & Boundary Green Light Leak*: When internal photosynthesis energy/sap reached the flower, bright green illumination leaked through the boundary between the pink petals and yellow center, and bled onto petal borders, destroying the flower's natural anatomy.
- **Root Causes**:
  1. *Under-inclusive Eye Segmentation & Mantle Fallback*: Defining eyes with a naive bright color threshold ($G > 165$) missed 271 darker green/lime transition and outline pixels ($G \le 165$). Because the body mantle was defined as `~is_visor & ~is_eyes`, those 271 dark eye outline pixels were categorized as mantle and stamped back onto every frame.
  2. *Incomplete Flower Masking & Sap Color Bleed*: Defining flower petals with a blue threshold ($B > 115$) missed 2,244 dark magenta shading and petal outline pixels ($B \le 115$). The green crown/mantle energy logic claimed these pixels and elevated them to vivid green, causing the petal borders and the contour around the yellow center to turn bright green.
- **Mandatory Prevention Protocol**:
  1. **Topological Visor Cavity Segmentation & Clean Plate Invariant**:
     - Never rely on color thresholds to find eyes or visor bounds.
     - Extract the entire enclosed facial visor cavity (e.g. via 8-connected BFS from a known seed inside the visor).
     - In the master frame buffer, initialize the visor cavity to a solid, pristine face color plate (`clean_master_body[is_visor_cavity] = VISOR_COLOR`).
     - Strictly exclude the entire visor cavity from body mantle logic (`is_body_mantle &= ~is_visor_cavity`).
     - Every new eye expression must be drawn onto this clean visor plate from scratch:
       $$\text{CLEAR OLD EYE REGION} \longrightarrow \text{RESTORE CLEAN VISOR} \longrightarrow \text{DRAW NEW EYES FROM SCRATCH}$$
     - Zero pixels from previous expressions or body layers may persist inside the visor cavity.
  2. **Comprehensive Topological Flower Isolation & Zero Color Bleed**:
     - Segment the entire multi-part attached structure (petals, shading, outlines, and core) using robust relational color logic (e.g. for pink flower above crown: $Y < 140 \land R > G$).
     - Strictly exclude the flower structure from all body mantle, foliage, and green energy propagation logic (`is_green_crown &= ~is_flower`, `is_body_mantle &= ~is_flower`).
     - Green energy MUST terminate cleanly at the structural biological boundary.
     - When energy reaches an attached structure of a different palette, that structure responds ONLY with its native color family (e.g. flower center blazes with amber-gold highlights: `[255, 248, 140]`, `[255, 235, 95]`, `[255, 215, 75]`, NEVER green).
  3. **Automated Structural & Palette Boundary Auditing**:
     - Automated test loops must verify:
       - 0 pixels with $G > 50$ inside the visor cavity outside the strictly defined active eye bounding box.
       - 0 pixels with $G > R$ inside the flower boundary.
       - 0 transparent holes inside the character silhouette.
       - 100% complete frame replacement between consecutive frames (zero ghosting).

### Rule 12: Multi-Pass Morphological Gap & Crack Closure vs Non-Linear Forward-Mapping Integer Divergence (Mushroom / Spore Bot Lessons)
- **Defects Encountered**:
  1. *Internal Body Cracks in Deformed Anatomy*: Forward mapping during mushroom cap expansion, eaves lateral flex, and vertical lift produced 1-2px unmapped alpha=0 holes inside the character body (e.g. at coordinate (101, 99) in frame 15).
  2. *Single-Pass Closure Termination*: A naive scanline gap check (`if left > 50 and right > 50: fill`) failed because when two adjacent destination pixels were both skipped due to integer rounding ($x_{i+1} - x_i \ge 2$), the right neighbor was also unpopulated during the first pass, causing the algorithm to exit with the hole intact.
- **Root Causes**:
  1. *Forward Mapping Grid Divergence*: In raster transformations where target coordinates $(y', x')$ are computed from source $(y, x)$ via non-linear elastic formulas (`cur_dx = int(round(cap_dx * x_frac * y_frac))`), local gradient stretching causes adjacent source pixels to land $\ge 2\text{px}$ apart on the target canvas.
  2. *Insufficient Morphological Connectivity*: Checking only strict orthogonal 1px horizontal or vertical sandwiches misses diagonal step cracks and multi-pixel dilation boundaries.
- **Mandatory Prevention Protocol**:
  1. **6-Pass 8-Neighborhood Morphological Crack Closure**:
     - During all raster grid deformations (cap flex, eaves warp, organic breathing), execute a dedicated multi-pass morphological hole filler:
     - Check the 8-neighborhood (orthogonal and diagonal).
     - Fill an empty pixel if it forms an opposite sandwich across ANY of the 4 axes (horizontal, vertical, diagonal 1, diagonal 2) OR has $\ge 5$ solid 8-neighbors.
     - Repeat until zero holes remain or maximum 6 passes complete.
  2. **Strict Internal Silhouette Convexity Audit**:
     - The mathematical test suite must assert: zero pixels with alpha == 0 within the character core envelope that have solid pixels on both sides.
  3. **Clean Visor Plate Invariant Across Facial Deformations**:
     - Even when upper canopy structures flex, the facial visor plate must be continuously flooded with the solid visor color, guaranteeing zero ghost eyes, zero alpha seams, and zero facial cracks.

### Rule 13: Absolute Eye Region Replacement & Geometric Visor Masking vs Threshold BFS Leakage (Mushroom Bot Eye Corruption Lessons)
- **Defects Encountered**:
  1. *Residual Vertical Line Remnants & Box Outlines*: When transitioning from vertical normal eyes to horizontal thinking eyes, thin dark vertical lines remained below/around the eyes, accompanied by faint rectangular shadow boxes.
  2. *Top-Left Visor Notch*: A 45-degree angled notch/crack artifact cut into the top-left curve of the dark visor plate ($y=171..178$).
  3. *Stray Pixels & Old Eye Borders*: Anti-aliased transition pixels and shadow borders from previous eye states persisted across frames.
- **Root Causes**:
  1. *Color-Threshold BFS Failure*: Using color thresholds ($R < 45$ for dark visor, $R > 160$ for pink eyes) to segment the visor cavity skipped shaded border pixels where $45 \le R \le 160$. The BFS treated these transition pixels as obstacles and routed around them, leaving 252 eye outline pixels and the shaded top-left visor notch unclassified.
  2. *Fallback Stamping into Body Base*: The unclassified 252 pixels defaulted to `is_lower_body` and were stamped onto the base canvas of every single frame from `clean_master_body`, permanently baking old eye borders and shadow rectangles into the background.
  3. *Incomplete Eye Region Reset*: Attempting to draw new eye expressions on top of previous frames or relying on partial pixel patching rather than completely re-flooding the visor cavity.
- **Mandatory Prevention Protocol**:
  1. **Deterministic Geometric Visor Masking**:
     - Never rely on fragile color-threshold flood-fills to delineate the facial visor.
     - Delineate the visor cavity using deterministic geometric row spans (`VISOR_SPANS`) and explicit eye cavity guarantees (`is_visor_cavity[Y_EYES, X_EYES] = True`).
     - In `clean_master_body`, 100% of pixels in the visor cavity must be reset to the authentic dark visor color (`VISOR_COLOR = [23, 13, 16, 255]`), guaranteeing that zero master eye borders, shadows, or notches survive into the body base.
  2. **Absolute Eye Region Replacement Rule**:
     $$\text{CLEAR ENTIRE EYE REGION} \longrightarrow \text{RESTORE ORIGINAL DARK VISOR} \longrightarrow \text{DRAW COMPLETE NEW EYE EXPRESSION}$$
     - Every eye frame must be generated as a 100% independent, complete replacement.
     - NEVER modify an existing eye raster or draw new eyes on top of old eyes.
     - For BOTH eyes independently, flood the entire extended eye bounding box ($Y \in [cy - 26, cy + 26]$, $X \in [lx - 24, lx + 24]$ and $X \in [rx - 24, rx + 24]$) with `VISOR_COLOR` before drawing the new expression.
  3. **Zero Transformation on Raster Eye Artwork**:
     - Never apply CSS transforms, scaling, rotation, translation, or fractional resampling to eye art.
     - Every expression (normal vertical pills, thinking horizontal beams, listening sensory expansion, speaking rhythmic pulses, reaction burst flares) must be rendered as clean, discrete pixel art.
  4. **Mandatory 5-Direction Eye Boundary Audit**:
     - For every frame across all states, inspect:
       - ABOVE eye
       - BELOW eye
       - LEFT of eye
       - RIGHT of eye
       - BETWEEN BOTH EYES
     - Fail immediately if any non-visor pixel ($R > 45$, $G > 45$, or $B > 45$) exists outside the mathematically designated active eye bounding box.
     - Zero vertical remnants, zero rectangular outlines, zero bottom lines, and zero ghost pixels permitted.

### Rule 14: In-Place Multi-Axis Dilation & Visor Boundary Flank Anchoring (Shadow Cloak Bot Lessons)
- **Defects Encountered**:
  1. *Batch-Collector Gap-Closure Bottleneck*: Collecting empty pixels into a deferred batch list `holes.append((y, x, color))` misses 2-pixel wide divergence gaps (`[solid, hole1, hole2, solid]`), because during pass 1 neither hole has an immediate solid orthogonal neighbor on both sides.
  2. *Lateral Mantle-to-Visor Seam Separation*: Applying non-zero displacement to the inner edges of lateral cloak flanks separates the mantle from the rigid visor plate, causing 1px tears along the facial perimeter.
- **Mandatory Prevention Protocol**:
  1. **Immediate In-Place Morphological Dilation Closure**:
     - During gap closure, assign newly bridged pixels immediately to the canvas (`out_canvas[y, x] = neighbor_color`) so subsequent pixels in the same scanline immediately recognize the filled structure.
     - Include 2-pixel lookahead checks (`l and r2` where `r2 = out_canvas[y, x+2] > 40`, `u and d2`) across orthogonal and diagonal axes.
  2. **Inner Visor Flank Boundary Anchoring**:
     - When calculating lateral deformation factors (`x_frac = (x - x_inner) / (x_outer - x_inner)`), strictly pin $x\_frac = 0.0$ at the inner visor boundary so zero displacement occurs at the seam where the cloak meets the faceplate.
  3. **Bottom Anchor Crystal System Coherence**:
      - The bottom diamond anchor must react dynamically to the traveling wave (lifting on idle arrival F10, contracting on thinking F23, surging upward on reaction F43) while retaining solid attachment to the cloak apex.

### Rule 15: Unified Attached Structure Segmentation & Additive Base Anchor vs Arbitrary Partition Seams (Unstable Ice Bot Lessons)
- **Defects Encountered**:
  1. *Vertical Dark/Black Cracking Seams Beside Attached Structures*: Thin vertical cracks ($y \in [108..140], x \approx 215$ and $x \approx 125$) cut into the top-right and top-left flanks of the top ice crystal and headset during movement, tremor, and tilt.
  2. *Base Attachment Displacement Jump*: When the top structure sheared, the base connection suffered displacement mismatches against the underlying body shell, exposing background or dark navy visor pixels.
- **Root Causes**:
  1. *Fragmented Anatomy Partitioning*: The top crystal/headset was segmented using an arbitrary narrow bounding box (`y <= 140 and 125 <= x <= 215`). The actual physical structure spanned $x \in [110..229]$. Slicing at $x=125$ and $x=215$ severed the left and right flanks of the crystal/headset and dumped them into `is_outer_shell`.
  2. *Discontinuous Displacement Gradient*: Pixels inside $x \le 215$ moved with the top crystal shear, while adjacent pixels at $x > 215$ moved with the core body displacement. The relative velocity differential pulled adjacent pixels apart by 1 to 4 pixels along the artificial partition lines, tearing open vertical rifts that exposed the dark background/visor plate.
  3. *Base Anchor Multiplier Zeroing*: `body_tilt_x` was incorrectly multiplied by the vertical shear factor `shear_factor = (145 - y) / 120`. At the base $y=145$, `shear_factor = 0`, causing the global body displacement to be zeroed out at the base while the adjacent body shell moved with the full core displacement.
- **Mandatory Prevention Protocol**:
  1. **Unified Attached Structure Segmentation (Zero Partition Rule)**:
     - Attached structures (top crest, sensor, headset, cap, crown) must be segmented as ONE complete continuous pixel-art structure without arbitrary horizontal or vertical bounding boxes cutting through the anatomy.
     - Include the top formation, side facets, side edges, base, and body headset mantle in a single unified component (`y <= 145` across all $x$ in the upper body).
  2. **Additive Base Anchor Kinematics**:
     - Never multiply global body displacement by local shear factors.
     - All articulating components must inherit the global core displacement additively:
       $$dx_{attached}(y) = \text{body\_tilt\_x} + \text{tremor\_core\_x} + \text{round}(\text{tilt\_offset} \cdot \text{shear\_factor}(y)) + \text{round}(\text{tremor\_relative} \cdot \text{shear\_factor}(y))$$
     - Ensure $\text{shear\_factor}(y_{base}) = 0.0$ strictly, guaranteeing that at the attachment seam, $dx_{attached} \equiv dx_{body}$.
     - Across any horizontal row $y$, all pixels in the attached structure shift by the exact same integer $dx$, making horizontal tearing mathematically impossible.
  3. **Mandatory Anatomical Seam Audit**:
     - Automated test suites must explicitly scan the boundary boxes around attached structures ($y \in [80..140], x \in [105..235]$) across all 45 frames.
     - Fail immediately if any dark, empty, or background pixel ($R < 25, G < 35, B < 65$ with $\alpha > 100$) appears within the continuous shell/crystal envelope.

### 11.16 Solar Corona Bot — Eye Corruption, Static Stars, and Cadence Readability Protocol

- **Defects Encountered**:
  1. *Eye Corruption & Malformed Geometry*: Idle curved eyes generated via parametric ellipse approximations exhibited 1px vertical spikes, middle gap rifts, and stray interior pixels. In subsequent states (e.g. thinking horizontal slit), residual eye pixels from master character artwork survived at the outer perimeter ($x \approx 114$ and $x \approx 227$) because visor cavity clearing had an overly conservative radius threshold ($r \le 58\text{px}$ instead of full $r \le 61\text{px}$).
  2. *Static Surrounding Particles*: Floating golden cross/star particles had negligible ($\pm 1\text{px}$) mirrored shifts, appearing virtually frozen and static at standard avatar scale ($120\text{px}$–$160\text{px}$).
  3. *Perceived Playback Sluggishness*: Low frame rates (10 FPS) across all states made character responsiveness feel sluggish and unresponsive.
- **Root Causes**:
  1. *Continuous Formula vs. Authentic Pixel Art*: Replacing hand-drawn pixel-art eye curves with naive analytic formulas ($((dx/a)^2 + (dy/b)^2 \le 1.0)$) causes raster stepping flaws, thin 1px orphan poles, and hollow-center noise.
  2. *Incomplete Visor Flooding*: Merging dilated body shells without clearing the full visor envelope allowed previous master pixels and dilation bleed to linger beneath newly drawn eyes.
  3. *Symmetric/Under-Scaled Particle Kinematics*: Star offsets were mirrored and under-scaled ($\pm 1\text{px}$), disappearing upon browser downsampling.
- **Mandatory Prevention Protocol**:
  1. **Discrete Master-Derived Eye Reproduction**:
     - For default/idle arched eyes, extract the authentic master eye pixel bitmap directly from the approved master image (`master-character.png`) rather than synthesizing with mathematical formulas.
     - For all modulated eye states (attentive, thinking, speaking, excited, blink), design clean, handcrafted discrete pixel matrices with solid borders and chamfered tips (zero 1px spikes).
  2. **100% Visor Flooding Pre-Stamp Gate**:
     - In `render_frame()`, immediately prior to drawing ANY state eye, thoroughly flood the entire eye socket cavity across the complete radius ($r \le 61\text{px}$ covering all $(y, x)$ where eyes can ever appear) with pure visor background (`#1E110C`).
     - Never draw over existing eye pixels; never transform existing raster eyes.
  3. **Independent Asynchronous Particle Kinematics**:
     - Decorative surrounding particles (stars, embers, crystals, spores) must NEVER remain static.
     - Each particle must execute an independent trajectory (e.g., TL drifts up-left, TR drifts right, BL shifts left-then-down, BR drifts down-right).
     - Use a structured motion curve: **DRIFT $\to$ PAUSE $\to$ DRIFT $\to$ RETURN**.
     - Amplitudes must be at least $\pm 4\text{px}$ to $\pm 6\text{px}$ in Idle, clearly contracting inward in Listening/Thinking, rhythmically pulsing in Speaking, and bursting $\pm 10\text{px}$ to $\pm 12\text{px}$ in Reaction to remain visible at normal avatar sizes ($120\text{px}$).
  4. **State-Adaptive Readability Cadence**:
     - Playback FPS must reflect character personality and perception: Idle (12 FPS), Listening (12 FPS), Thinking (11 FPS), Speaking (13 FPS), Reaction (15 FPS).

### 11.17 Signal Beacon / Scanning Relay Bot — True Wind-Waving Traveling Flag Physics, Pristine Chassis Preservation, and Mandatory Browser Cache Busting

- **Defects Encountered**:
  1. *Over-Clearing "More Regions" Corruption*: Attempting to clear scanner cage slits, ear sockets, or the entire visor into background colors wiped out the authentic metallic visor frame borders, helmet forehead rim, and ear module seams, causing artificial black cracks across multiple robot body regions.
  2. *Flat / Rigid Flag Motion*: Under-frequency wave equations ($k = 2.2\pi$) with small amplitudes appeared as a stiff, flat wiggling stick or paddle rather than a flexible fabric cloth flag fluttering in the wind.
  3. *Browser Cache Invalidation / "Not Loading" Failure*: The single HTML lab served scripts (`character-config.js`, `animator.js`) and frame URLs without fresh version query strings, causing the browser to serve stale cached frames from before the fix.
- **Root Causes**:
  1. *Artificial Background Flooding of Intact Anatomy*: The robot body is ONE continuous, solid piece of pixel art. Clearing sub-regions (like cage interiors or ears) creates artificial holes and cracks whenever overlays shift.
  2. *Insufficient Traveling Wave Cycles*: Flexible cloth flags require at least 1.5 to 2.0 full wave cycles ($k = 3.2\pi$) along their geodesic length, paired with a non-linear amplitude envelope ($s^{1.3}$) and 5-pass morphological gap closure.
  3. *Un-versioned Script and Image URLs*: Browsers aggressively cache static `.png` frame sequences and `.js` files.
- **Mandatory Prevention Protocol**:
  1. **Pristine Clean Chassis Invariant (Zero Body Over-Clearing)**:
     - In `clean_chassis`, remove ONLY the exact moving cloth plume pixels (5,880 pure red flag pixels).
     - NEVER clear scanner cage interiors, side ear sockets, or the visor frame on `clean_chassis`. The authentic helmet, cage bars, ear modules, and metallic borders must remain 100% solid and intact.
     - Move the entire chassis as one unified physical entity via integer `hover_dy`.
  2. **True Traveling Wind-Wave Flag Kinematics**:
     - Wave number: $k = 3.2\pi$ ($\approx 1.6$ wave cycles along the crest) to produce: $\text{Base Solid} \to \text{First Cloth Fold} \to \text{Second Cloth Fold} \to \text{Tip Flutter} \to \text{Recovery}$.
     - Dynamic Amplitudes:
       - Idle: $A_x = 13.0, A_y = 6.5, \text{envelope} = s^{1.3}$, $hover\_dy \in [-2..2]$
       - Listening: $A_x = 9.0, A_y = 4.5, \text{lift\_bias} = -3.0$
       - Thinking: $A_x = 7.0, A_y = 3.5, \text{lean\_bias} = -2.0$
       - Speaking: $A_x = 14.0, A_y = 7.0, \text{lean\_bias} = 1.0$
       - Reaction: $A_x$ surging up to $18.0, A_y = 9.0, \text{lean\_bias} = 10.0$ at peak alert!
     - 5-Pass Morphological Scratch Canvas Gap Closure: executes 5 iterative passes filling orthogonal and diagonal 1px voids before compositing onto the canvas.
     - Strict Base Anchor: $y \ge 82, x \ge 148$ or $s < 0.06 \implies \Delta x = 0, \Delta y = 0$ (Zero detachment / Zero socket crack invariant).
  3. **Strict Bounded Eye Aperture Clearance**:
     - When changing eye expressions or blinking, clear ONLY the precise eye apertures ($Y \in [205..230] + hover\_dy, X \in [110..151]$ and $X \in [189..230]$) with `VISOR_BG`.
     - NEVER touch the surrounding visor rim ($X < 110$, $X \in [152..188]$, $X > 230$, $Y < 205$, $Y > 230$).
  4. **Mandatory Cache-Busting Protocol for Localhost Web Labs**:
     - Always append explicit version query strings to `getFrameUrl` in `character-config.js` (e.g. `?v=YYYYMMDD_revX`).
     - Always bump `<script>` and `<link>` version query strings in `index.html` on any rebuild to prevent browser caching.
