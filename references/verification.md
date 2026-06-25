# Visual Verification Loop

This is the file that turns DesignSoul from "AI guesses at CSS" into "AI sees the
result and fixes it." Without this loop, the agent writes styling blind — it reasons
about code but never confirms the rendered pixels. With it, the agent renders the page,
looks at it, critiques it against the design system, and iterates until it matches.

> The core principle: **You are not allowed to claim a UI is done until you have
> looked at it rendering in a real browser.** Reasoning about CSS is not seeing it.

---

## Why This Exists

The biggest failure mode of AI UI work is the blind spot: the model edits CSS, believes
it looks right, and hands back something that overflows, has unreadable contrast, broken
spacing, or animations that don't actually run. The fix is a feedback loop — the same loop
a human designer uses: make a change, look at it, adjust.

---

## Required Tool: A Browser Automation MCP

To see the page, the agent needs a browser. The recommended option is the
**Playwright MCP server**, which lets the agent navigate, screenshot, resize the viewport,
and read the console and accessibility tree.

### Setup (one time)

Add this to the project's MCP config (`.kiro/settings/mcp.json` for Kiro,
or the editor's equivalent). DesignSoul ships a ready-to-copy template at the repo root:
`mcp.example.json` — copy its `playwright` block into your config.

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"],
      "disabled": false,
      "autoApprove": [
        "browser_navigate",
        "browser_take_screenshot",
        "browser_snapshot",
        "browser_resize",
        "browser_console_messages"
      ]
    }
  }
}
```

If no browser MCP is available, the agent MUST tell the user:
> "I can apply the design system, but I can't visually verify the result without a browser
> tool. Install the Playwright MCP (see references/verification.md) or review the screenshots
> yourself. Treating this output as unverified."

Then proceed in **best-effort mode** — apply everything, but flag that visual checks were skipped.

---

## The Loop

Run this loop after the styling and motion passes (SKILL.md Step 4), before the final checklist.

```
1. START the dev server (ask the user for the command if unknown; never guess a port)
2. NAVIGATE to each primary route/page
3. SCREENSHOT at 3 viewports: 375px (mobile), 768px (tablet), 1440px (desktop)
4. CRITIQUE each screenshot against the rubric below
5. If any issue found → FIX in code → GO TO 2 (re-render the affected page only)
6. STOP when a full pass produces zero rubric violations
```

**Never** run the loop more than necessary. Re-render only the page you changed, not all pages every time.

---

## The Critique Rubric

For every screenshot, ask these questions and act on any "no":

### Layout
- [ ] Does anything overflow its container or the viewport (horizontal scrollbar at 375px)?
- [ ] Is any text clipped, overlapping, or touching an edge with no padding?
- [ ] Are tap targets at least 44x44px on the mobile screenshot?
- [ ] Is the spacing rhythm consistent, or do some gaps look arbitrary?

### Color & Contrast
- [ ] Is every text block readable against its background (eyeball 4.5:1)?
- [ ] Does any color appear that is NOT in the token set (a rogue blue, a default gray)?
- [ ] On glass/translucent styles: is text legible over the busiest part of the background?

### Hierarchy
- [ ] Can you tell what the most important element on the screen is within 1 second?
- [ ] Is there a clear primary / secondary / tertiary visual order?

### Style Fidelity (if a named style was requested)
- [ ] Does this actually look like the named style, or a generic approximation?
- [ ] Open the style file's checklist and verify each visual rule is visible in the screenshot.

### "AI-made" Smell Test
- [ ] Would a senior designer look at this screenshot and say "an AI made this"?
- [ ] If yes — identify the exact element triggering it and fix that element.

---

## Verifying Motion (the part screenshots miss)

Screenshots are static. Animation needs a different check:

- **Read the compiled CSS/JS**, not just intent: confirm every interactive element actually
  references a motion token (`var(--duration-*)`, `var(--ease-*)`), not a hardcoded value.
- **Grep the codebase** for hardcoded transitions (`0.3s`, `ease-in-out`, `transition: all`)
  — every hit is a consistency violation to fix.
- If the browser tool supports it, **hover/click key elements and screenshot mid-transition**
  to confirm the effect fires.
- Confirm `@media (prefers-reduced-motion: reduce)` exists and the page still shows content with it on.

The motion consistency guarantee comes from **one source of truth** (motion.md tokens) plus
**a grep sweep for hardcoded values**, not from watching every animation. That is how you
satisfy "everything has the same smoothness."

---

## When You Cannot Run the Project

Some projects won't start (missing env, backend deps, build errors unrelated to UI). In that case:

1. Try to render individual components in isolation (Storybook, a scratch HTML file, or a component playground) if one exists or can be created cheaply.
2. If even that fails, fall back to **static analysis**: read the rendered DOM structure, grep for token usage, and run the anti-pattern checklist against the source.
3. Always tell the user exactly what was and wasn't visually verified. Never imply you saw something you didn't.

---

## Honesty Rules (Non-Negotiable)

- Never say "this looks great" about something you have not rendered.
- Distinguish clearly between "verified in browser at 3 viewports" and "applied but not visually checked."
- If the loop was skipped for any reason, say so in the final report.
