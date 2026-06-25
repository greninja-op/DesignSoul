# Imagery: Photos, Illustrations & Icons

The visual content *inside* a layout — photos, illustrations, icons — carries enormous weight for
how real and trustworthy a product feels, yet it's where AI-default and beginner UI slips most:
generic stock photos, mismatched icons from five different sets, images with no overlay so the
text is unreadable. Great structure can't rescue cheap imagery.

This file is how a pro selects and treats imagery. Read it whenever a design includes photos,
hero images, illustrations, or icons.

---

## Part 1 — Photos

Photos are the most "real" thing in a UI — the closest tie to the physical world — so they do
heavy emotional work. The job of a photo is rarely decoration; it's to tell a story and evoke a
feeling that moves the user.

### Selecting photos

- **Show real people doing real things.** Authentic imagery builds trust; users connect with it.
  A photo of a happy family cooking sells kitchenware better than a sterile shot of the product.
- **Avoid stock-looking photos.** Over-staged, fake-emotion, cliché corporate stock is an instant
  credibility killer (and an AI-slop tell). Prefer natural, candid, moderate-emotion shots —
  people who look real, not posed-ecstatic.
- **One clear focal point.** The user should know in a glance what the photo is about. Busy photos
  with no subject make the eye work and dilute the message.
- **Fit the purpose, not just "looks nice."** A beautiful photo that doesn't match the content
  (a grocery store on a travel page) is the wrong photo. Relevance beats prettiness.
- **High resolution, then compressed.** Source large, export optimized (and provide multiple
  sizes for responsive/`srcset`). Never ship a stretched low-res image — it looks broken. Mind
  the **license** for any image that goes to production.

### Treating photos

- **Overlay text over images.** Text directly on a photo usually fails contrast. Add an overlay —
  a dark/light scrim, or a **gradient overlay** that's strongest where the text sits and fades
  away elsewhere so the photo still shows (see `depth.md`). A subtle *colored* overlay (often the
  brand/primary hue) both aids contrast and unifies imagery. Always re-check contrast
  (`accessibility.md`).
- **Lead the eye.** People look where the subject of a photo looks/points. Orient imagery so it
  guides attention *toward* your heading, CTA, or form — not off the edge of the screen.
- **Keep a set consistent.** Multiple photos on one page should feel related: shoot/select a
  similar style, or unify them with a shared subtle color overlay or matched
  saturation/temperature. A grid of clashing photos looks chaotic.
- **Test multiple aspect ratios.** The same image may render 16:9, 4:5, or 1:1 across breakpoints.
  Pick images whose focal point survives cropping (and use `object-fit: cover` with a sensible
  focal position).
- **"Unbox" products for cleanliness.** For e-commerce, product shots on a removed/neutral
  background create whitespace and read cleaner than busy in-scene photos (keep lifestyle shots
  for secondary slots).

---

## Part 2 — Illustrations

Illustrations communicate abstract ideas that are hard to photograph ("boost your creativity"),
and they're friendly and on-brand. They're rarely pure decoration — they usually complement copy.

- **Use them where a photo can't go:** explaining a concept on a landing page, onboarding/empty
  states, achievements/gamification, errors (a friendlier 404).
- **Keep one consistent illustration style** across the product (line vs filled, flat vs 3D, the
  same palette). Mixing illustration styles reads as borrowed-from-everywhere.
- **Match the personality** (see `personality.md`): playful, rounded, colorful illustrations for a
  youthful product; restrained or none for a serious/financial one.
- Subtle motion on an illustration adds delight — keep it within the motion system (`motion.md`)
  and respect reduced-motion.

---

## Part 3 — Icons

Icons let users *scan* instead of read — they're a visual language. They must be understood
instantly, which means consistency and simplicity beat artistry.

- **Use a full icon set, not icons picked from here and there.** Pulling one icon from each source
  guarantees mismatched weights and styles. Choose one set (or a coherent system) and stay in it;
  if you must borrow one, restyle it to match line width and corner roundness.
- **Consistent line width and roundness across every icon.** A 1.5px-stroke rounded set shouldn't
  contain one 3px sharp icon. Sharp icons read serious/formal; rounded read friendly — pick one
  per the product's personality and hold it.
- **Simple and scalable.** An icon must be legible at small sizes. Detailed/ornate icons turn to
  mush at 16–20px. Favor the simplest form that still reads.
- **Two roles:** *clarifying* icons (explain a feature/category — non-interactive) and
  *interactive* icons (buttons/nav — must look tappable and have a **≥44px hit area**, see
  `polish.md` and `accessibility.md`).
- **Label when not obvious.** Home/search/profile are universally understood; niche icons aren't.
  Pair an unfamiliar icon with a text label — and **never mix labeled and unlabeled** icons in the
  same nav/tab bar (all or none). An icon-only control still needs an `aria-label`.
- **Convention test:** if you've never seen a successful product use this icon *without* a label
  for this action, don't either. Don't invent novel icons for standard actions (Jakob's Law,
  `ux-laws.md`).
- **Bounding box.** Keep every icon in a consistent bounding box (e.g. 24×24) so sizes and
  spacing align even though glyph shapes differ. Resize the box, not the glyph, to avoid
  half-pixel blur.
- **Active-state pairing:** a common, effective pattern is a *filled* icon for the current nav
  item and *line* icons for the rest.

---

## Checklist

- [ ] Photos show real, relatable people/scenes — no cliché stock or fake-emotion shots
- [ ] Each key photo has one clear focal point and fits the content's purpose
- [ ] Text over images uses an overlay (often a gradient/colored scrim); contrast re-checked
- [ ] Imagery on a page is stylistically consistent (matched style or unifying overlay)
- [ ] Images tested across the aspect ratios they'll actually render at; focal point survives crops
- [ ] Production images are high-res, compressed, correctly licensed, with responsive sizes
- [ ] Illustrations share one consistent style and match the product personality
- [ ] All icons come from one coherent set; consistent line width and roundness
- [ ] Icons are simple enough to read small; interactive icons have ≥44px hit areas + `aria-label`
- [ ] Unfamiliar icons are labeled; labeled/unlabeled icons never mixed in one nav

Pairs with: `personality.md` (style match), `depth.md` (overlays/gradients), `accessibility.md`
(alt text, contrast, hit areas), `polish.md` (image outlines, hit areas), `anti-patterns.md` (stock slop).
