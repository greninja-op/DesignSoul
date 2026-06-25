# Visual Hierarchy & Perception

Before color, before motion, before any style: hierarchy is what makes an interface readable at a
glance. It's the difference between a screen the eye flows through effortlessly and one where
everything shouts at once. AI-default UI fails here constantly — uniform sizing, even spacing,
every element the same weight — which is *why* it reads as flat and machine-made even when the
colors are fine.

This file is the perception layer: how the human eye groups, ranks, and reads a screen, and the
levers you pull to control it. Read it for any layout decision — what goes where, what's loud,
what's quiet.

> The governing rule: **when everything stands out, nothing stands out.** Hierarchy is created by
> *contrast* between elements, which means most elements must be quiet so a few can be loud.

---

## The Five Levers of Hierarchy

You make one element more important than another by increasing contrast on one or more of these.
Use the *fewest* levers that achieve the rank — stacking all five on one element is shouting.

1. **Size.** Bigger = more important. The eye lands on the largest thing first. A large heading
   reads before body text; a large number is the subject of a stat card.
2. **Weight.** Heavier font weight pulls rank without taking more space. Often better than size —
   a bold 16px label can outrank a regular 20px one while staying compact. (Type detail in
   `typography.md`.)
3. **Color & contrast.** A saturated or high-contrast element jumps forward; muted/low-contrast
   recedes. This is why the primary action gets the one bold fill and everything else stays
   quiet. Bold color is a scarce resource — spend it on what matters.
4. **Position.** In LTR cultures the eye reads top-to-bottom, left-to-right. Put the most
   important thing high and early. The top-left is prime real estate; the bottom-right is where
   the eye exits (which is why the primary action often sits there in a button pair). This is
   cultural — it mirrors for RTL (see `i18n.md`).
5. **Spacing (isolation).** Whitespace around an element makes it important — isolation signals
   significance. Crowding signals "minor / grouped." Giving one element room is a hierarchy move,
   not wasted space. (Whitespace craft in `layout-grids.md`.)

**In practice:** a stat card makes the *number* the largest + heaviest element; the label above
it is small + muted; the trend is a small colored chip. Three levers, three ranks, instantly
readable. Don't make the label compete with the number.

---

## Gestalt: How the Eye Groups Things Automatically

The brain imposes structure on a screen before the user consciously reads it. These grouping
principles are doing work whether you control them or not — so control them. They are the
*mechanism* behind "this layout feels organized" vs "this feels like a pile."

- **Proximity.** Elements placed close together are read as a group; gaps separate groups. This
  is the single most powerful grouping tool. A label sitting closer to the field *below* it than
  the field above reads as belonging to the wrong field — a real, common bug. Tighten intra-group
  spacing; widen inter-group spacing. (See form field grouping in `components.md`.)
- **Similarity.** Elements that share a look (shape, color, size) are read as the same kind of
  thing. Make all clickable chips look alike; don't make two unrelated things look identical.
- **Common region.** Elements inside a shared boundary (a card, a panel, a bordered box) are read
  as one group — even without proximity. This is *why* cards work. Use a container to bind
  related content; don't box unrelated content together.
- **Alignment (continuation).** Aligned elements read as related and as a deliberate line the eye
  follows. A misaligned element breaks the line and stands out — sometimes that's intentional
  emphasis, usually it's a defect. Align to a grid (see `layout-grids.md`).
- **Figure / ground.** The eye separates foreground (figure) from background (ground). Foreground
  reads as closer, more important, interactive. Keep backgrounds soft and low-contrast so they
  stay *behind*; a too-bold background or a full-bleed image with no overlay makes the eye unsure
  what's foreground — a frequent cause of "this feels off" and unreadable text over images.

> These are not style choices — they're how perception works. A design that fights them feels
> wrong to users who can't say why. A design that uses them feels "clean" and "intuitive."

---

## Reading Order & Scanning

Users don't read screens; they scan them. Design for the scan:

- **Establish one clear entry point** — the largest/boldest thing — then a path from it. The eye
  should never land on a screen and not know where to start.
- Common scan shapes: **F-pattern** for text-dense pages (users read the top line, then scan down
  the left edge), **Z-pattern** for simpler marketing layouts. Put key info and actions along
  these paths, not buried mid-right.
- **Three levels is usually enough**: primary (the one thing), secondary (supporting), tertiary
  (details/metadata). If you have five competing levels on one screen, collapse some.

---

## The Squint Test (verify hierarchy fast)

Blur your eyes (or your screenshot — `verification.md`). With detail gone, can you still tell:
- What's the most important element? (If two things tie, your hierarchy is flat — fix it.)
- Where does the eye start and where does it go?
- Which things are grouped together?

If the answer to any is "no," the hierarchy is broken regardless of how polished the pixels are.
This is the single fastest design check there is — run it on every screen.

---

## Common Hierarchy Failures (the AI-default tells)

- **Everything the same size/weight** — no entry point; reads as a wall. Fix: pick the one thing,
  make it bigger/bolder; demote the rest.
- **Two primary actions** — competing CTAs freeze the user. One primary, the rest secondary.
- **Even spacing everywhere** — no grouping; the eye can't tell what belongs together. Vary
  intra- vs inter-group spacing.
- **Bold color on everything** — when all is loud, nothing leads. Reserve the loudest color for
  the one most important element.
- **Background competing with foreground** — busy/high-contrast backgrounds, or text on an
  un-overlaid photo. Soften the ground; let the figure win.
- **Misalignment** — stray elements off the grid read as mistakes. Align everything to the grid
  unless breaking it is a deliberate emphasis move.

---

## Checklist

- [ ] Each screen has one unmistakable entry point (largest/boldest element)
- [ ] No more than ~3 levels of importance competing on a screen
- [ ] Exactly one primary action per view; everything else is visually quieter
- [ ] Related items are grouped by proximity and/or a shared region; unrelated items are separated
- [ ] Intra-group spacing is tighter than inter-group spacing (labels hug their own field)
- [ ] Everything aligns to the grid unless a break is a deliberate emphasis
- [ ] Background stays soft/low-contrast so foreground wins; text over imagery has an overlay
- [ ] Bold color is reserved for what matters, not sprayed across the screen
- [ ] Passes the squint test — hierarchy still obvious with detail blurred

Pairs with: `layout-grids.md` (the structure hierarchy sits on), `spacing.md` (proximity/grouping
gaps), `typography.md` (size/weight), `color-theory.md` (contrast), `ux-laws.md` (cognitive load,
"show less"), `critique.md` (squint test).
