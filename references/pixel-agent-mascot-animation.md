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
