# Microcopy: The Words Are Half the UX

The fastest tell that an AI made an interface isn't the colors — it's the *words*. "Submit,"
"Something went wrong," "No items found," "Lorem ipsum," "Welcome to our platform." Generic
microcopy makes even a beautifully styled UI feel hollow and machine-made.

Microcopy is every small piece of text that guides action: button labels, field labels,
placeholder hints, error and success messages, empty states, tooltips, confirmations, toasts,
onboarding nudges. It carries clarity, tone, and trust. Treat it as a design material, not an
afterthought.

> Related but different: `anti-patterns.md` → "content slop" covers *fabricating* content (fake
> stats, invented testimonials, filler sections) — don't do that. This file covers writing the
> *functional* copy the interface genuinely needs, well.

---

## Principles

1. **Clear over clever.** The user's task beats your wit. If a joke costs comprehension, cut it.
2. **Specific over generic.** "Save changes," not "Submit." "3 photos failed to upload — retry,"
   not "Error." Specificity is the whole game.
3. **User's language, not the system's.** Say what the user is doing ("Delete account"), not what
   the code is doing ("Execute deletion handler"). No internal jargon, no error codes as headlines.
4. **Action-oriented.** Buttons and links describe the *outcome*: "Create project," "Send invite,"
   "Download report." Verbs the user can predict.
5. **Concise.** Cut filler — "Please note that you can," "In order to," "We're sorry to inform
   you." Front-load the meaning. Every word should earn its place.
6. **Consistent voice.** Pick a tone that matches the brand and product stakes (see below) and
   hold it across every string. Same term for the same thing everywhere ("Sign in" *or* "Log in",
   not both).
7. **Honest and respectful.** No fake urgency, guilt, or manipulation — that's a dark pattern
   (see `anti-patterns.md`). Don't blame the user for errors.
8. **Sound human.** Use contractions ("that's", "don't", "you'll") unless the product is
   deliberately formal — they make copy feel written by a person, not a system. When an error
   occurs, suggest the fix ("No internet connection. Try restarting your router.").

---

## Tone: match the stakes

Tone is not one setting — it shifts with the user's emotional state in that moment.

- **High-stakes / error / money / security** → calm, plain, reassuring. Drop personality.
  Someone seeing "Payment failed" wants clarity, not a pun.
- **Routine / success / onboarding** → warmer, lighter, can carry brand personality.
- **Destructive confirmations** → neutral and explicit about consequences.

A playful brand can still be playful — but never *at* the user, and never during their stress.

---

## By component

### Buttons & CTAs
- Label the outcome, not the mechanism: **"Create account"** > "Submit". **"Send message"** > "OK".
- First person can increase commitment for primary CTAs ("Start my free trial").
- Keep them short (1–3 words) and parallel across a screen.
- Distinguish primary from secondary in *words* too: "Save" / "Cancel", not "Yes" / "No".
- Dangerous actions name the thing: **"Delete 3 projects"**, so the click is informed.

### Field labels & placeholders
- The **label is permanent and visible** — it's not the placeholder (see `accessibility.md`).
- Placeholder = an *example or format hint*, not the label: `name@company.com`, `(555) 000-0000`.
- Add helper text for constraints *before* the user errs ("8+ characters, one number") rather
  than only scolding after.

### Error messages — the three-part formula
A good error answers: **what happened → why → how to fix it.**
- ❌ "Invalid input." / "Error 422." / "Something went wrong."
- ✅ "That email's already registered. **Sign in** or use a different address."
- ✅ "Card declined by your bank. Try another card or contact your bank."
- Be specific, blame the situation not the person, and give the next action. Place the message
  *at* the field that caused it, the moment it's knowable (validate on blur, not only on submit).

### Empty states — a micro-onboarding, not a dead end
Never just "No data." An empty state should explain the space and offer the first action:
- ❌ "No items found."
- ✅ "No projects yet. **Create your first project** to get started." (+ a direct button)
- For *search/filter* empties, distinguish "nothing matches" from "nothing exists," and offer to
  clear filters.

### Success & confirmation
- Confirm what happened and, when useful, the next step: "Invite sent to maya@acme.com."
- Don't over-celebrate routine actions; reserve delight for genuine milestones (Peak–End).

### Confirmations / destructive dialogs
- State the consequence and whether it's reversible: "This permanently deletes the project and
  its 14 files. This can't be undone."
- Make the confirm button name the action ("Delete project"), and don't make destructive the
  default focus (see `components.md`).
- **Name the specific object** when you can — "Yes, remove `report-q3.pdf`" / "No, keep it" — so
  the user is certain what they're acting on.
- **Avoid double negatives.** "Cancel your subscription?" with **Yes / Cancel** buttons is
  confusing (does "Cancel" cancel the subscription, or the dialog?). Use action-named buttons:
  **"Cancel subscription" / "Keep subscription"**.
- Prefer **Undo** over a confirm dialog where the action is reversible — less friction, safer.

### Tooltips & helper text
- Just-in-time, contextual, brief. Explain the non-obvious; don't restate the label.
- Never hide *essential* info in a hover-only tooltip (no hover on touch — see `accessibility.md`).

### Toasts / notifications
- One clear sentence. Include an action when there is one ("Message sent · Undo").
- Match type to tone: errors persist, success auto-dismisses.

---

## Numbers, dates, and formatting

- Format for humans: "2 minutes ago," "Yesterday," "Mar 3" — not raw timestamps in the UI.
- Pluralize correctly ("1 item" / "2 items"); never "1 items" or "item(s)".
- Respect locale for dates, numbers, and currency (see `i18n.md`).
- Use tabular figures for changing numbers so they don't jitter (see `polish.md`).

---

## Anti-slop tells (fix on sight)

- "Welcome to our platform!" / "Empowering your journey" / "Seamless experience" — vague hype.
- "Lorem ipsum" or placeholder copy shipped as real content.
- "Click here" / "Read more" links with no context (also an accessibility fail).
- "Oops!" / "Uh oh!" as the entire error message.
- The same word for different things, or different words for the same thing, across the app.
- Apologizing for routine events, or fake urgency ("Only 2 left!" when untrue).

---

## How to use this file

When the content is real, write it well using the formulas above. When the content **isn't**
available (real stats, quotes, copy you'd have to invent), use a clearly-labelled placeholder and
ask the user — never fabricate (see `anti-patterns.md`). Good microcopy is often the single
highest-leverage fix for making UI stop feeling AI-generated.

Pairs with: `anti-patterns.md` (content slop, dark patterns), `accessibility.md` (labels, error
association), `i18n.md` (translation, expansion), `ux-laws.md` (clear feedback, error recovery).
