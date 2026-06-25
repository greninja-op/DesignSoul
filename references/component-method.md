# The Component Method: How a Professional Designs ANY Component

`components.md` is the lookup table — the standards for components we already know.
This file is the **method** — the repeatable thought process a senior designer runs for
*any* component, including ones not in the table, and the process for *rebuilding* an
existing one instead of just reskinning it.

> A normal designer styles what they see. A professional asks what the component is *for*,
> maps every way it can exist, and designs the system — then the styling is obvious.
> Run this method for every component, even simple-looking ones.

---

## Why this matters

If you only copy the standards in `components.md`, you can build the 20 listed components.
If you internalize this method, you can build the 1000 you'll actually meet — a "trip itinerary
card," a "macro-nutrient ring," a "seat-map selector," a "git diff viewer" — at the same
professional level, because you're reasoning from the same place a pro does.

---

## The 9 Passes (run in order)

### Pass 1 — Job & Stakes (what is this FOR?)
Before any pixels, answer in one sentence each:
- **What single job does this component do?** (If you can't say it in one sentence, it's two components.)
- **What decision or action does it enable for the user?**
- **What is the user's emotional state here?** (anxious about an order, scanning fast, focused on input, celebrating a win) — this sets tone, motion, and emphasis.
- **What is the cost of getting it wrong?** (a mis-tapped "delete" is high-stakes; a tooltip is not) — stakes drive confirmation, focus, and visual weight.

> Example reasoning: a delivery tracker's job is "reduce the anxiety of waiting." That single
> insight dictates everything — the current step must be unmistakable, progress must feel
> like it's moving, the ETA must be prominent and calm. Styling follows from the job.

### Pass 2 — Content Inventory & Hierarchy
- List **every** piece of content/data the component can hold.
- Rank it: **primary** (the one thing the eye must hit first), **secondary**, **tertiary**.
- There is exactly ONE primary element. If two things fight to be primary, the design fails.
- Decide what is essential vs. what can be revealed on demand (hover, expand, detail view).

### Pass 3 — Anatomy (break it into parts)
Decompose into named regions and give each a job:
- container / surface → the boundary and elevation
- media → image/icon/chart (aspect-ratio locked)
- header → title + the one key piece of meta
- body → the supporting content
- meta → timestamps, tags, status
- actions → buttons/links (ranked by hierarchy)
Define spacing *relationships* between parts (related = tight, separate = loose) — not uniform gaps.

### Pass 4 — The State Matrix (the pro's signature move)
Amateurs design the happy path. Professionals design every state. For this component, define:

**Interaction states:** default, hover, focus-visible, active/pressed, disabled, selected, read-only
**Data states:** empty (zero), single (one), populated (many), overflow (too many → truncate/scroll/paginate)
**Async states:** loading (skeleton matching real layout), success, error/retry, partial/stale
**Content edge cases:** very long text (clamp/wrap), missing image (fallback), huge numbers
  (format/abbreviate), tiny/zero values, RTL/long-translation text

If a state is "impossible," write down *why* — don't just skip it. Most "weird bugs" are an
unplanned state.

### Pass 5 — Behavior & Feedback
- What happens on each interaction? (click opens what, hover reveals what)
- Every action gets immediate feedback — nothing should feel dead.
- What's the cause→effect story? The animation should make that causation legible (see `motion.md`).
- Optimistic vs. confirmed updates: show progress, don't freeze.

### Pass 6 — Layout, Weight & Rhythm
- Assign visual weight to match the hierarchy from Pass 2 (size, contrast, color, space).
- Use deliberate, sometimes asymmetric spacing — symmetry everywhere reads as AI-default.
- Align to a grid; nothing floats arbitrarily.
- The silhouette should read before the content does.

### Pass 7 — Responsive & Touch
- Design the **mobile** state first, then enhance up (not the reverse).
- What reflows, reorders, hides, or collapses at each breakpoint?
- Touch targets ≥ 44×44px. No hover-only affordances on touch.
- No horizontal overflow at 375px — ever.

### Pass 8 — Accessibility (built in, not bolted on)
- Correct semantics/roles (a clickable card is a `button`/`a`, not a `div` with onClick).
- Full keyboard path: tab order, Enter/Space, Escape, arrow keys where relevant.
- Visible custom focus state (not the browser default outline).
- Contrast: 4.5:1 text, 3:1 UI/large. State never by color alone — pair with icon/text.
- Labels for icon-only controls; programmatic association of errors to inputs.

### Pass 9 — Tokenize & Critique
- Every value (color, space, radius, duration, easing, font) comes from the design system.
  Zero hardcoded values.
- Run the kill list in `anti-patterns.md` against what you built.
- Final question: *would a senior designer say "an AI made this"?* If yes, find the exact
  element triggering it and fix it.

---

## Rebuilding an Existing Component (audit before you touch)

When the component already exists, do NOT jump straight to reskinning. First diagnose:

1. **Recover the job** — what was this *trying* to do? (Pass 1, applied to existing code.)
2. **Inventory what's there** — content, current states handled, current behavior.
3. **Find the gaps** — which states from Pass 4 are missing? (Usually: no empty, no error,
   no loading, no focus, no overflow handling — these are the most common professional gaps.)
4. **Find the anti-patterns** — run `anti-patterns.md` against the current code.
5. **Decide: restyle vs. restructure.**
   - *Restyle* if the structure/UX is sound and only the visuals are AI-default.
   - *Restructure* if states are missing, hierarchy is unclear, or the markup is inaccessible.
   Rebuilding the look on top of a broken structure just makes a prettier broken component.
6. **Preserve behavior & data contracts** — keep props/inputs/outputs working; improve the
   inside. Don't break what calls this component.
7. Then run Passes 2–9 to produce the rebuilt version.

---

## Worked Mini-Example (applying the method to a "stat card")

- **Pass 1:** Job = "communicate one metric and whether it's good or bad, at a glance." Stakes: low, but it's scanned fast — clarity is everything.
- **Pass 2:** Primary = the number. Secondary = the trend (▲/▼ + %). Tertiary = label + comparison period.
- **Pass 3:** label (top) · number (dominant) · trend chip · optional sparkline (bottom).
- **Pass 4:** loading = skeleton with a number-shaped bar; empty = "—" with muted "No data yet";
  error = retry; edge = format `1,240,000` → `1.24M`, negative trend turns the chip red+▼.
- **Pass 5:** if clickable → hover lift + opens detail; trend chip has a tooltip with exact value.
- **Pass 6:** number is the largest, highest-contrast thing; label is muted/small above it.
- **Pass 7:** stacks fine on mobile; sparkline hides under 320px.
- **Pass 8:** trend uses icon+color (not color alone); card is a `button` if clickable; aria-label summarizes.
- **Pass 9:** all values tokenized; not a generic centered card with `0 2px 4px` shadow.

That's the difference between "a card" and a *professionally designed* card — and the same
nine passes produce a professional tracker, calendar, or anything else.

---

## The Method Checklist (per component)

- [ ] Stated the component's single job and the user's emotional state
- [ ] Identified exactly one primary element; ranked the rest
- [ ] Broke it into named parts with deliberate spacing relationships
- [ ] Designed the FULL state matrix (interaction + data + async + edge cases)
- [ ] Defined feedback for every interaction with legible cause→effect
- [ ] Visual weight matches the hierarchy; layout on a grid
- [ ] Mobile-first responsive; touch targets ≥44px; no 375px overflow
- [ ] Accessibility built in (semantics, keyboard, focus, contrast, labels)
- [ ] Fully tokenized; passes the anti-pattern kill list
- [ ] (Rebuild) audited the original and chose restyle vs. restructure deliberately
