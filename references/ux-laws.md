# UX Laws: The Designer Brain Behind the Pixels

Visual craft makes UI *look* designed. This file makes it *behave* designed. These are the
usability principles a senior product designer applies automatically — the reasoning that
decides where a control goes, how much to show at once, and why an interface feels effortless
or exhausting. Apply them while building, not as an afterthought.

> If `anti-patterns.md` is the "don't," this file is the "why." When a layout feels off but
> every token is correct, the problem is almost always on this page.

---

## The Ten Usability Heuristics (run these on every screen)

A quick mental audit. For each screen you build, confirm all ten hold.

1. **Visibility of system status** — The interface always tells the user what's happening.
   Loading, saving, uploading, succeeded, failed. No silent state. A button that does nothing
   visible for 800ms reads as broken. Acknowledge every action within ~100ms.
2. **Match the real world** — Use the user's words and mental model, not internal/system jargon.
   "Trash," not "Soft-delete queue." Order things the way the user thinks about them.
3. **User control and freedom** — Every action has a clearly marked exit: cancel, back, undo,
   close. Undo beats a confirm dialog. Never trap the user in a flow they can't reverse.
4. **Consistency and standards** — The same thing looks and behaves the same way everywhere.
   Don't invent a novel control when a known one exists. Follow platform conventions (a link
   is underlined or colored; a primary button sits where users expect).
5. **Error prevention** — Designing out the error beats a good error message. Disable submit
   until valid, constrain inputs (date pickers over free-text dates), confirm destructive acts,
   format-as-you-type. The best error is the one that can't happen.
6. **Recognition over recall** — Show options; don't make people remember them. Visible labels,
   recently-used items, autocomplete, inline hints. Memory is expensive; recognition is cheap.
7. **Flexibility and efficiency** — Accelerators for experts that don't get in beginners' way:
   keyboard shortcuts, command palette, bulk actions, saved views, sensible defaults.
8. **Aesthetic and minimalist design** — Every extra element competes with the important ones.
   Remove what doesn't earn its place. (This is the usability case for the restraint in
   `anti-patterns.md` → "filler content.")
9. **Help users recognize, diagnose, recover from errors** — Plain-language messages, no error
   codes as the headline, say exactly what's wrong and how to fix it. (See `microcopy.md`.)
10. **Help and documentation** — Ideally the UI needs none. When it does, make it searchable,
    contextual, and task-focused — not a wall of docs the user has to leave the flow to read.

---

## Cognitive load — the thing you're actually managing

Every interface asks the user to think. Your job is to spend their attention wisely. There are
three kinds of load, and you can only act on two of them:

- **Intrinsic** — the inherent difficulty of the task itself. You can't remove it, but you can
  *chunk* it (a multi-step wizard instead of one 40-field form) and sequence it.
- **Extraneous** — load created by *your design*: clutter, unclear labels, inconsistent
  patterns, too many choices, decorative noise. **This is the load you attack.** Every reduction
  here is a free win.
- **Germane** — the productive effort of learning the system. Make it efficient with clear
  structure, good grouping, and progressive disclosure.

### How to reduce extraneous load (do these by default)
- **Progressive disclosure** — show the few things needed now; reveal depth on demand. (Below.)
- **Prioritize ruthlessly** — one primary action per screen, everything else quieter.
- **Group by meaning** — spacing and proximity encode relationship (see `anti-patterns.md`).
- **Strong information hierarchy** — headings, scannable lists, one obvious entry point.
- **Sensible defaults** — pre-fill, pre-select, remember. A default is a decision you made *for*
  the user so they don't have to.
- **Feedback and guidance** — never leave the user wondering whether something worked.

> **Hick's Law:** decision time grows with the number and complexity of choices. More options =
> slower, more stressful. Cut choices, or stage them.
> **Miller's rule of thumb:** people hold ~5–9 items in working memory. Chunk nav, steps, and
> grouped fields accordingly — not 14 top-level nav links.

---

## Usability friction — find it and remove it

Friction is anything that makes the experience less smooth than it needs to be. Audit for these
common sources and fix the matching cause:

| Friction source | Fix |
|---|---|
| Cluttered / busy UI | Cut elements; raise hierarchy; one primary action |
| Slow load / response | Lazy-load, skeletons (`skeleton.md`), optimistic UI, compress assets |
| Long onboarding / signup | Defer what isn't needed now; social auth; progressive profiling |
| Confusing navigation | Clear labels, shallow IA, obvious current-location indicator |
| Long / complex forms | Chunk into steps, input masks, autosuggest, inline validation |
| Poor error messages | Specific, plain-language, actionable (see `microcopy.md`) |
| Heavy checkout / payment | Fewer steps, guest checkout, autofill, trust signals |
| Inaccessible design | Meet `accessibility.md` — friction for some users is a wall for others |
| Broken mobile | Mobile-first; real device sizes; 44px targets |
| Unnecessary steps | Delete steps that don't serve the goal |
| Overload of info/choices | Progressive disclosure; defaults; prioritize |

Friction isn't always bad — *intentional* friction (a confirm step before deleting an account)
protects the user. Remove the accidental kind; keep the protective kind.

---

## Affordances and signifiers — make things look like what they do

- An **affordance** is what an element *can* do (a button can be pressed). A **signifier** is the
  visual cue that *tells* the user so (it looks raised, has a hover state, a label).
- AI-default UI frequently breaks this: flat shapes with no press cue, clickable cards with no
  hover affordance, text that's actually a link but isn't styled like one, icons whose meaning
  isn't universal.
- **Rules:**
  - If it's clickable, it must *look* clickable (cursor, hover, focus, press feedback).
  - If it's *not* clickable, it must not look clickable (no hover lift on static cards).
  - Don't rely on a hidden affordance (swipe, long-press, hover-to-reveal) as the *only* path to
    an action — especially on touch. Provide a visible route too.
  - Match conventions: links, primary buttons, toggles, and inputs should read instantly because
    they look like the version of themselves users already know.

---

## Progressive disclosure — show less, reveal on demand

The single most effective tool against cognitive overload. Present the minimum needed to act;
let the user pull more when they want it. Choosing the *right* disclosure pattern matters — see
the decision table in `components.md` → "Disclosure & Navigation Patterns." In short:

- **Accordion** — stacked sections, one or few open at a time, vertical space-saving.
- **Tabs** — peer views of the same object; only one visible; flat, frequent switching.
- **Drawer / sheet** — secondary nav or contextual tools that slide in over content.
- **Wizard / stepper** — a long or unfamiliar task broken into ordered steps with progress.
- **"Show more" / detail-on-demand** — collapse the long tail; reveal advanced options only when asked.
- **Tooltip / popover** — just-in-time help without leaving the flow.

Default to hiding complexity behind intent. A settings page with 8 visible options and an
"Advanced" disclosure beats one with 40 options shown at once.

---

## A few more laws worth internalizing

- **Aesthetic–Usability Effect** — people perceive good-looking interfaces as easier to use, and
  forgive minor issues. This is *why* DesignSoul exists — but it's a multiplier, not a substitute
  for real usability. Pretty + broken still loses.
- **Jakob's Law** — users spend most of their time on *other* sites, so they expect yours to work
  like the ones they already know. Novelty in core interaction patterns is a tax, not a feature.
  Be inventive with brand and craft; be conventional with mechanics.
- **Fitts's Law** — time to hit a target depends on its size and distance. Make primary actions
  big and close; put related controls near where the user's attention/cursor already is; use
  screen edges/corners (infinitely "deep" targets). This is the usability reason behind the 44px
  hit areas in `polish.md`.
- **Doherty Threshold** — keep system response under ~400ms or the user disengages. When you
  can't, *show* progress (optimistic UI, skeletons, progress indicators) so the wait feels short.
- **Postel/robustness for input** — be liberal in what you accept (parse messy phone numbers,
  trim whitespace, accept multiple date formats) and strict in what you require of the user's effort.
- **Peak–End rule** — people judge an experience by its most intense moment and its end. Invest
  craft in the high-emotion moments (success, error, first run, checkout complete) and the finish.

---

## How to use this file

1. While building each screen, run the **ten heuristics** as a fast checklist.
2. For anything that feels heavy, ask: *what extraneous load can I remove?* Cut, group, default,
   disclose.
3. For any flow longer than one screen, pick the right **disclosure pattern** instead of dumping
   everything at once.
4. Pair this with `accessibility.md` (usability for everyone), `microcopy.md` (the words that
   carry half the UX), and `components.md` (the per-component standards these principles produce).
