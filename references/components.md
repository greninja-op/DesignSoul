# Component Standards: Professional UX Per Component Type

For every component listed here, this is the professional standard.
Not the minimum. The standard. What a real product team ships.

> This file is the **lookup table** of known components. For a component that ISN'T listed
> here — or when building one from scratch or rebuilding an existing one — use
> `component-method.md`, the 9-pass thinking process that reaches this same bar for anything.
> The standards below are what that method *produces* for these common cases.

---

## Navigation

### Navbar
**States required:** default, scrolled (elevated), mobile (collapsed), active link, hover link
**Professional rules:**
- On scroll: add `backdrop-filter: blur(12px)` + subtle border-bottom — never just `box-shadow`
- Active link: not just a color change — an indicator bar, underline, or weight change that survives hover
- Mobile: hamburger must have open/close animation (not instant swap). Menu slides or fades with stagger on links
- Logo: never scale on hover. It's a brand asset, not a button
- CTA in navbar: visually distinct from nav links — own background, own weight
- Height: 56-64px desktop, 52px mobile. Never taller unless intentional hero-nav
- Links: 4-6 items max. If more, use a dropdown or restructure the IA

### Mobile Menu
- Full-screen or side-drawer — never a tiny dropdown on mobile
- Links stagger-animate in (50ms delay each)
- Close button top-right, large tap target (44x44px minimum)
- Background: semi-opaque overlay on body content

---

## Cards

### Product Card (e-commerce)
**States required:** default, hover (elevation lift), loading skeleton, out-of-stock
- Hover: subtle `translateY(-4px)` + shadow elevation increase — not scale
- Image: aspect-ratio locked (4:3 or 1:1). Never distort
- Price: typographically distinct — size jump, not just bold
- Add to cart: appears on hover on desktop, always visible on mobile
- Out of stock: desaturated + overlay badge — not just greyed text

### Stat / Metric Card
- The number is the primary element — everything else serves it
- Trend indicator (up/down): color + icon, never just color alone (accessibility)
- Comparison text: muted, smaller, below the number
- Sparkline if space allows: 60px height, no axes, clean line

### Content Card (article, blog post)
- Category/tag above the title, not below
- Title: 2-line clamp maximum
- Read time or date: one piece of metadata, not both unless essential
- Image: 16:9 ratio, covers full card width

### Card content & resilience (applies to every card)
- **A card is a shorter version of a page.** List everything you *could* show, then include only
  what helps the user make the decision the card exists for. More is not better — extra fields
  clutter the scan and slow the choice. (Imagery rules: `imagery.md`.)
- **Make it look clickable if it is** — subtle shadow/lift + cursor + hover (see `depth.md`); a
  static card must not borrow those cues.
- **Design for real data, not the happy path.** Set a line-clamp for long titles, a min/max width,
  and a placeholder for missing images. Cards break ugliest when a name is twice as long as your
  mockup or a photo is missing — handle both.
- Pick one card style (filled+shadow, bordered, or tinted-surface) and use it consistently; don't
  mix card styles in one view.

### Progress / Status Card (order tracking, delivery)
**This is a specialty component — read carefully**
- Steps must be clearly numbered with current step highlighted
- Completed steps: filled indicator + checkmark
- Current step: animated pulse or active ring — the user's eye must land here
- Future steps: muted, never the same visual weight as current
- For delivery/food tracking with movement:
  - Vehicle icon moves smoothly between waypoints (CSS transition on left/top %, or SVG path animation)
  - ETA updates with a subtle fade-in, not a hard swap
  - Never show the full route as equal weight — destination is emphasized
  - Current position: pulsing dot or animated icon
  - Completed segments: visually distinct from upcoming (filled line vs dashed)

---

## Forms

### Text Input
**States required:** default, focus, filled, error, disabled, read-only
- Default: `border: 1px solid <border-token>` — never boxShadow as the only indicator
- Focus: border color shift + subtle `box-shadow: 0 0 0 3px <primary-muted>` (not glow, a ring)
- Error: red border + error icon inside input + error message below (never above)
- Error message: `font-size: 0.75rem`, appears with a slide-down animation
- Label: always visible — never placeholder-as-label (accessibility crime)
- Placeholder: lighter than label, disappears on focus
- Disabled: `opacity: 0.5` + `cursor: not-allowed` — no interaction affordance

### Textarea
- Resize: `vertical` only, or `none` with auto-height
- Min-height: 96px
- Character counter if there's a limit — bottom right, changes color near limit

### Select / Dropdown
- Custom styled — never default browser select
- Chevron icon rotates 180° when open (CSS transform transition)
- Options panel: `box-shadow` elevated, `border-radius` on panel
- Options: hover state, selected state (checkmark + color), keyboard navigable
- Search inside dropdown if >8 options
- Max-height with scroll if >6 options visible

### Checkbox
- Custom — never default browser checkbox
- Size: 18x18px minimum (tap target wrapper: 44x44px)
- Check animation: draw-in SVG path, not instant swap
- Indeterminate state: horizontal dash, not empty
- Label click area: full row, not just the box

### Radio Button
- Custom styled to match checkbox visual language
- Selected: filled inner circle with scale-in animation
- Group: clear visual grouping, consistent spacing

### Form Validation
- Inline, not on submit-only
- Validate on blur, not on keypress (except password strength)
- Never show all errors at once — fix the first, reveal the next
- Success state: green checkmark appears after valid input, stays visible

### Form best practices (conversion = the goal)
- **Keep it short.** Every field is friction; if it isn't needed, cut it. Don't ask for name +
  email + username just to log in.
- **Single-column layout.** The eye flows straight down without zig-zagging; multi-column forms
  cause skipped fields and confusion.
- **Don't overstyle inputs.** A white field with only a drop shadow looks like a button or card.
  Inputs should read as inputs — a plain rectangle with a **border**. (A search bar outside a form
  can be more stylized.)
- **≤4 options → radio buttons, not a dropdown.** Dropdowns hide choices behind a click; for short
  lists, show them. Use a dropdown (with search + scrollbar) only for long lists.
- **Break long forms into steps** with a progress indicator — the same fields feel far easier
  across 2–3 short steps than one wall (chunking, `ux-laws.md`).
- **Group fields into semantic sections** with a little extra space between groups (contact info /
  address / payment). Proximity does the work (`visual-hierarchy.md`).
- **Mark optional, not required.** When most fields are required, label the few optional ones
  ("(optional)") instead of asterisking everything. Never leave the user guessing.
- **Explain why you ask** for sensitive info (phone, address) with a small inline hint/“?”.
- **Offer social / SSO login** where possible — it removes the whole form for many users.
- **Float the label** (placeholder → label on focus) is a good pattern; never use placeholder as
  the only label (see `accessibility.md`).

---

## Buttons

### Hierarchy (use only what's needed — not all on one page)
- **Primary:** filled, high contrast — ONE per primary action per screen
- **Secondary:** outlined or surface — supporting actions
- **Tertiary/Ghost:** text only — least important actions
- **Destructive:** red/error color — irreversible actions only
- **Icon button:** icon only — must have tooltip or aria-label

### States required for ALL buttons
default → hover → active (pressed) → loading → disabled

### Loading State
- Replace label with spinner — same button size, no layout shift
- Spinner: 16px, same color as label, `animation: spin 0.8s linear infinite`
- Disable pointer events during loading — no double-submit

### Sizing
- Large: `height: 48px`, `padding: 0 24px` — primary CTAs
- Default: `height: 40px`, `padding: 0 16px` — general use
- Small: `height: 32px`, `padding: 0 12px` — dense UIs, tables
- Never mix sizes on the same row without intent
- Height floor for tappable CTAs: ~44–48px; mobile primary buttons usually go full-width (within margins)
- Corner radius sets the feel: sharp/0 reads elegant/serious, rounded reads friendly — pick per
  personality (`personality.md`) and keep it consistent across all buttons

### VIBs — Very Important Buttons
When a button does something irreversible or takes something from the user (charges a card,
deletes data, places an order), make that consequence unmistakable. Label the **outcome**, not a
vague step: **"Complete purchase"** / **"Pay $49"**, never "Continue". Add a line of context under
it if money or data is involved. Ambiguous copy on a charge button is bad UX (and edges toward a
dark pattern — see `ux-laws.md`).

### Button pairs (Back/Continue, Cancel/Save)
- The **more important action goes on the right**, the lesser (back/cancel) on the left — easiest
  to reach with a right thumb, and matches reading-exit position. (Mirror for RTL — `i18n.md`.)
- Style the primary as primary and the secondary as quieter — don't give both equal weight.
- Don't show a "Back" on the first step of a flow (there's nowhere to go back to).

---

## Modals & Dialogs

- Backdrop: `rgba(0,0,0,0.5)` with `backdrop-filter: blur(4px)` — not pure black
- Entrance: modal scales from `0.95` to `1` + backdrop fades in — simultaneous
- Exit: reverse, but faster (150ms vs 250ms enter)
- Close: ✕ top-right AND backdrop click AND Escape key
- Width: `max-width: 480px` for simple dialogs, `max-width: 720px` for content modals
- Never full-screen on desktop unless it's a media viewer
- Scroll: modal content scrolls, header and footer are sticky
- Destructive confirm dialogs: destructive button is NOT the default — user must click explicitly

---

## Tables

- Row hover: subtle background shift — `<surface-elevated>` token
- Sortable columns: sort indicator (arrows) always visible, active sort highlighted
- Row selection: checkbox column, selected row gets background tint
- Sticky header on scroll
- Empty state: centered message in the table body, not below it
- Loading: skeleton rows (3-5), same height as real rows
- Pagination: always show total count ("Showing 1-20 of 143")
- Responsive: horizontal scroll on mobile with sticky first column, or card layout below 640px

---

## Chat / Messaging Interface

**States required:** empty, loading, messages present, typing indicator, error

- Message bubbles:
  - Sent (user): right-aligned, primary color background, white text
  - Received: left-aligned, surface-elevated background, primary text color
  - Bubble `border-radius`: `18px` with `4px` on the "tail" corner
  - Max-width: 72% of container
  - Timestamp: appears on hover, not always visible (reduces noise)

- Typing indicator:
  - 3 dots, staggered bounce animation (not simultaneous)
  - Same bubble style as received messages
  - Appears with a 300ms delay after last message

- Input area:
  - Sticky to bottom
  - Auto-height textarea (not fixed height)
  - Send button: icon only, activates when input is non-empty
  - Attach/emoji buttons: muted until hovered

- New messages:
  - Scroll to bottom automatically if user is at bottom
  - If user has scrolled up: show "New message ↓" pill, don't auto-scroll
  - Message entrance: slide up from bottom, not fade-in

---

## Calendar / Date Picker

- Month navigation: previous/next with smooth slide transition (slide, not fade)
- Today: underline or dot indicator — never filled (that's for selected)
- Selected: filled circle, high contrast
- Range selection: filled endpoints + tinted background between
- Disabled dates: `opacity: 0.4`, `cursor: not-allowed`, no hover effect
- Hover on valid date: light circle background
- Week starts Monday in most of the world — make this configurable
- Keyboard: full keyboard navigation (arrow keys, Enter, Escape)
- Mobile: full-width, larger tap targets (44px per day cell)

---

## Notifications / Toasts

- Position: top-right desktop, top-center mobile
- Entrance: slide in from right (desktop) or down from top (mobile)
- Auto-dismiss: 4s for info/success, 6s for warning, manual-only for error
- Progress bar: shows remaining time, counts down
- Stack: max 3 visible, oldest at bottom, newest at top
- Types: success (green), warning (amber), error (red), info (blue) — always icon + color, never color alone
- Dismiss: ✕ button, hover pauses auto-dismiss timer

---

## Loading States

### Skeleton Screens (preferred over spinners for content)
- Match the exact layout of the content it's replacing
- Animated shimmer: `background: linear-gradient(90deg, ...)` moving right
- Never use grey boxes that don't represent the real layout

> **Use DesignSoul's own skeleton system — see `skeleton.md`.** Don't hand-write placeholder
> boxes or add an external skeleton library. The system captures the skeleton from the REAL
> component (`data-skeleton` + the generator) so it matches exactly, and renders it with the
> `<ds-skeleton>` runtime (pulse/shimmer/solid, dark mode, stagger, fade). Every async
> component with layout gets one.

### Spinners (for actions, not page content)
- Size: 20px for inline, 40px for overlay
- Color: primary or white depending on background
- Duration: `0.8s linear infinite` — not too fast, not too slow

### Progress Bars
- Determinate: fill animates smoothly to exact percentage
- Indeterminate: bouncing fill animation (not just 50% static)
- Always label what's happening ("Uploading...", "Processing...")

---

## Error & Empty States

### Error State
- Icon: relevant to the error type (network = wifi icon, not-found = compass)
- Heading: what went wrong (plain language)
- Body: why it happened (if known) + what the user can do
- Action: retry button, or link to relevant help
- Never: "Error 500", "Something went wrong", generic sad face with no context

### Empty State
- Icon: relevant to the content type (no messages = speech bubble, no files = folder)
- Heading: explain what this space is for
- Body: how to populate it
- CTA: the first action to take — direct, specific
- Never: "No data found", "Nothing here yet" with no direction

---

## Specialty: Progress Trackers (Order, Delivery, Flight Status)

This component deserves special attention because it carries high user anxiety — they want to know exactly where their thing is.

### Rules
- **Current state must be unmistakable** — pulsing animation, distinct color, larger icon
- **Completed steps** — filled, checkmarked, reduced visual weight vs current
- **Future steps** — muted, never same weight as current or completed
- **Time estimates** — if shown, update smoothly, no hard flicker
- **Connecting lines** — fill from left as steps complete (animated, not instant)

### For Moving-Object Trackers (scooter, car, plane)
- Object moves along a path — never teleports
- Use CSS `transition` on position, or SVG `animateMotion` for curved paths
- Path itself: completed portion = solid, upcoming = dashed
- Destination marker: distinct from current position marker
- ETA: prominent, near the current position indicator or in a dedicated chip
- Waypoints (restaurant → en route → arriving): each is a distinct visual stage

### For Flight Trackers
- Departure city left, arrival city right — always
- Plane icon on a curved arc path between them
- Time at each end: departure actual vs scheduled, arrival estimated vs scheduled
- Delay shown in amber/red with reason if available
- Gate/terminal info: secondary, not competing with the main timeline

---

## Disclosure & Navigation Patterns — Which to Choose

Before styling a container, pick the *right* pattern for revealing content. AI-default UI reaches
for tabs or a giant scroll by reflex; a pro matches the pattern to the content's structure and the
user's task. (The principle behind this is progressive disclosure — see `ux-laws.md`.)

| Pattern | Use when | Avoid when |
|---|---|---|
| **Accordion** | Many stacked sections, user wants a few at a time, vertical space matters (FAQs, settings groups, mobile filters) | Content needs side-by-side comparison; only 2–3 short items (just show them) |
| **Tabs** | A few peer views of the *same* object, frequent switching, only one relevant at once (Overview / Reviews / Specs) | More than ~6 tabs; sequential steps (use a wizard); content users compare simultaneously |
| **Drawer / sheet** | Secondary nav or contextual tools that shouldn't occupy the main canvas; mobile menus, filters, detail panels | It holds the *primary* task — that belongs on the page, not hidden behind a swipe |
| **Wizard / stepper** | A long or unfamiliar task split into ordered steps with a clear end (onboarding, checkout, setup) | A short task (don't add steps to a 3-field form); steps users need to jump between freely |
| **Tree** | Genuinely hierarchical, nested data (file explorer, org chart, category nav) | Flat lists; mobile (deep trees are painful on touch) |
| **"Show more" / detail-on-demand** | A long tail of optional/advanced content; collapse it, reveal on intent | The hidden content is essential to the decision |
| **Modal / dialog** | A focused, must-resolve task that interrupts the flow (confirm, quick edit) | Long content or multi-step flows (use a page/route); anything users may want to reference alongside |
| **Tooltip / popover** | Just-in-time, non-essential help or extra detail | Essential info or actions (no hover on touch — see `accessibility.md`) |

**Shared rules for all disclosure components:**
- The trigger must signal its state: chevron rotation, `aria-expanded`, a clear open/closed cue.
- Animate the open/close (height/opacity/transform) — never an instant snap. Keep it interruptible.
- Keyboard + screen-reader operable: correct roles/states, focus moves sensibly (see `accessibility.md`).
- Don't nest disclosure inside disclosure (accordion-in-tabs-in-drawer) — that's a cognitive-load
  smell; restructure the information architecture instead.

### Affordance check (applies to every interactive container)
If it expands, collapses, slides, or navigates, it must *look* like it does (cursor, hover, focus,
a state-change cue) — and static containers must *not* borrow those cues. Mismatched affordances
are a top reason a UI "feels" wrong even when it's pretty (see `ux-laws.md` → affordances).

---

## Accessibility Minimums (Non-Negotiable)

> These are the per-component floor. The full guide — POUR, ARIA, keyboard/focus management,
> contrast, screen readers, RTL — is in `accessibility.md`.

- All interactive elements: visible focus state (not browser default outline — a custom one)
- Color contrast: 4.5:1 for body text, 3:1 for large text and UI components
- Touch targets: 44x44px minimum
- `aria-label` on all icon-only buttons
- `role` and `aria-*` on custom components (dropdowns, modals, tabs)
- `prefers-reduced-motion`: all animations respect it
- Form inputs: always have associated `<label>` or `aria-label`
