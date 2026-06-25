# Accessibility — The Non-Negotiable Baseline

Accessible UI is not a separate feature you bolt on at the end. It overlaps almost entirely with
*good* UI: clear hierarchy, real contrast, keyboard reach, honest labels. A design that fails
accessibility usually fails plain usability too. Build it in from the first component.

Read this whenever you build or convert interactive UI — which is always. The checklist at the
bottom is the bar; the body explains how to clear it.

---

## The Four Principles (POUR)

Every accessibility decision rolls up to one of these. WCAG conformance has three levels —
**A** (minimum), **AA** (the real-world target, ship for this), **AAA** (highest, rarely fully met).
**Design and verify against AA.**

- **Perceivable** — users can sense the content. Text alternatives for images, captions for
  media, sufficient color contrast, content not conveyed by color alone.
- **Operable** — users can drive it with any input. Full keyboard access, visible focus, enough
  time, no seizure-inducing motion, big-enough targets.
- **Understandable** — it behaves predictably. Plain language, consistent navigation, labeled
  inputs, helpful errors.
- **Robust** — it works across browsers and assistive tech. Semantic, valid HTML; correct ARIA;
  no reliance on one fragile technique.

---

## 1. Semantic HTML First (the highest-leverage rule)

The single biggest accessibility win is using the right element. Native elements come with
keyboard behavior, focus, and screen-reader roles **for free** — a `<div onclick>` comes with
none of it.

- Buttons are `<button>`. Links are `<a href>`. (A button does an action; a link goes somewhere.)
- Inputs are `<input>`/`<select>`/`<textarea>` with a real `<label>`.
- Structure with `<header> <nav> <main> <footer> <section> <article>`, headings `<h1>`–`<h6>` in
  order (don't skip levels for size — use CSS for size).
- Lists are `<ul>/<ol>`. Tables are `<table>` with `<th scope>`. Don't fake these with divs.

> Rule of thumb: **if a native element exists for it, use it.** Reach for a `div` + ARIA only
> when no native element fits.

---

## 2. ARIA — Only When Native HTML Can't

ARIA adds roles, states, and properties that assistive tech can read for *custom* widgets. It's
powerful and easy to misuse.

> **No ARIA is better than bad ARIA.** Incorrect roles actively mislead screen-reader users.
> Don't add `role="button"` to a real `<button>`. Don't sprinkle ARIA for "completeness."

Use it for things HTML can't express:
- **Roles** for custom widgets: `role="tablist"/"tab"/"tabpanel"`, `role="dialog"`,
  `role="menu"`, `role="alert"` (announces immediately).
- **States** that change: `aria-expanded`, `aria-selected`, `aria-checked`, `aria-disabled`,
  `aria-current="page"`. **Update these in JS as the state changes** — a stale `aria-expanded`
  is worse than none.
- **Names** when there's no visible text: `aria-label` on icon-only buttons,
  `aria-labelledby`/`aria-describedby` to wire a control to existing text.
- **Live regions** for async updates: `aria-live="polite"` for status, `role="alert"` /
  `aria-live="assertive"` for errors, so screen readers announce them.

Common widgets and their required ARIA: accordion (`aria-expanded` + `aria-controls`), tabs
(`tablist`/`tab`/`tabpanel` + `aria-selected`), modal (`role="dialog"` + `aria-modal="true"` +
focus trap), toast (`role="status"` or `alert`), disclosure/drawer (`aria-expanded`).

---

## 3. Keyboard & Focus (test this on every build)

A huge share of users never touch a mouse: keyboard-only, switch devices, screen readers.
**Unplug your mouse and tab through the page** — that's the test.

- **Everything interactive is reachable and operable by keyboard.** Tab to it, Enter/Space to
  activate. Custom controls must implement their expected keys (arrows for tabs/menus/sliders,
  Esc to close, Home/End in lists).
- **Visible focus, always.** Never `outline: none` without replacing it. Use a clear custom ring
  (`:focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }`). `:focus-visible`
  shows the ring for keyboard users without flashing it on every mouse click.
- **Logical tab order** — matches visual order. Avoid positive `tabindex`. Use `tabindex="0"` to
  add a custom control, `tabindex="-1"` to make something focusable only via script.
- **Manage focus on route/modal changes.** Open a dialog → move focus into it and trap it; close
  it → return focus to the trigger. Don't leave focus stranded on a removed element.
- **Skip link** — a "Skip to content" link as the first focusable element on content-heavy pages.

---

## 4. Color & Contrast

- **Body text contrast ≥ 4.5:1** against its background. **Large text (≥24px, or ≥18.66px bold)
  and UI components/icons ≥ 3:1.** Check the *actual* background, including over images and
  gradients (aurora/glass styles are the usual offenders — verify text over the busiest area).
- **Never use color as the only signal.** Color-blind users (~1 in 12 men) can't rely on it.
  Pair color with an icon, label, shape, or pattern:
  - Error field: red border **+** an icon **+** a text message — not just a red border.
  - Status dots: add a label or shape, not green/red alone.
  - Chart series: differ by pattern/label, not only hue.
- Prefer palettes that stay distinguishable across color-vision types; avoid red/green as the
  sole differentiator. (Palette logic lives in `color-theory.md`.)
- Don't disable elements with low-contrast gray *only* — pair with `aria-disabled` and a clear
  cursor/state so the unavailability is perceivable.

---

## 5. Images, Media & Icons

- **Every meaningful image gets `alt` text** that conveys its purpose/content, concisely. A
  product photo: describe the product. A chart: summarize the takeaway.
- **Decorative images get empty alt** (`alt=""`) so screen readers skip them. A decorative image
  with a filename read aloud is noise.
- **Icon-only controls need an accessible name** (`aria-label` or visually-hidden text). A bare
  hamburger or gear icon is silent to a screen reader.
- Don't put essential info only in an image of text; use real text.

---

## 6. Forms (where accessibility most often breaks)

- **Every input has a real, associated `<label>`** (`for`/`id` or wrapping). **Placeholder is not
  a label** — it vanishes on input and usually fails contrast. (Anti-pattern, see `components.md`.)
- Group related fields with `<fieldset>`/`<legend>` (e.g., a radio set).
- Mark required fields in text, not color alone; use `required` and `aria-required`.
- **Errors:** put the message next to the field, associate it with `aria-describedby`, set
  `aria-invalid="true"`, and move focus to (or announce) the first error on submit. State *what*
  is wrong and *how to fix it*.
- Use correct `type`/`inputmode`/`autocomplete` (`type="email"`, `inputmode="numeric"`,
  `autocomplete="one-time-code"`) — better mobile keyboards and autofill = less friction.

---

## 7. Motion & Time

- **Respect `prefers-reduced-motion`.** Wrap non-essential animation; replace large
  movement/parallax with a simple fade or nothing. (Already a motion-system rule — enforce it.)
- No content that flashes more than 3×/second (seizure risk).
- Don't impose tight time limits; if you must, let users extend or dismiss them.
- Auto-advancing carousels/marquees need a pause control.

---

## 8. Targets, Zoom & Reflow

- **Touch targets ≥ 44×44px** (extend the hit area with a pseudo-element if the visual is
  smaller — see `polish.md`). Don't pack targets so tightly they overlap.
- Layout must survive **200% zoom** and **400px-equivalent reflow** with no loss of content or
  horizontal scrolling. Use relative units (`rem`), not fixed pixel heights on text containers.

---

## 9. Internationalization & RTL (inclusive reach)

If the UI may be translated or used right-to-left, design for it now — retrofitting is painful.

- **Use CSS logical properties** so layout flips automatically for RTL: `margin-inline-start`
  (not `margin-left`), `padding-inline`, `inset-inline`, `text-align: start`. Set `dir="rtl"` on
  the root and most of the layout mirrors itself. (More in `modern-css.md`.)
- **Leave room for text expansion.** Translations run ~30% longer than English; German/Finnish
  can blow past fixed-width buttons. Don't hard-code widths around label length; let containers
  grow and wrap.
- Don't concatenate sentences from fragments (word order differs by language).
- Format dates, numbers, and currency per locale (`Intl.*`), not with hand-rolled strings.
- Mirror directional icons (back/forward, progress) in RTL; don't mirror logos or media.

---

## Accessibility Checklist (verify before shipping — target WCAG AA)

- [ ] Native HTML element used wherever one exists (`button`, `a`, `label`, headings in order)
- [ ] Custom widgets have correct ARIA roles + states, updated in JS (no stale/incorrect ARIA)
- [ ] Full keyboard operation: tab to every control, expected keys work, Esc closes overlays
- [ ] Visible `:focus-visible` ring on everything focusable (no bare `outline: none`)
- [ ] Focus managed on modal open/close and route change; focus trap in dialogs; skip link present
- [ ] Body text ≥ 4.5:1, large text / UI / icons ≥ 3:1 — checked over the real (busiest) background
- [ ] No information conveyed by color alone (icon/label/shape backup everywhere)
- [ ] Meaningful images have descriptive `alt`; decorative images have `alt=""`
- [ ] Icon-only buttons have an `aria-label` / visually-hidden name
- [ ] Every input has a real associated label; errors are inline, announced, and actionable
- [ ] `prefers-reduced-motion` honored; no >3Hz flashing; carousels can pause
- [ ] Touch targets ≥ 44×44px; layout holds at 200% zoom with no horizontal scroll
- [ ] If translatable/RTL: logical properties used, text expansion tolerated, `dir` tested
