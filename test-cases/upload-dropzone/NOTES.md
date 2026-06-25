# Test Case: Upload Dropzone — proving the Component Method generalizes

This component is **deliberately NOT in `components.md`**. It exists to prove the 9-pass
`component-method.md` produces professional output for a component with no pre-written standard.

## The 9 passes, applied

1. **Job & stakes** — Job: "let the user get files in confidently and know what's happening."
   Emotional state: mild uncertainty ("did it work? is it too big?"). Stakes: medium — a
   silent failure is frustrating. → implies strong feedback + explicit error reasons.
2. **Content hierarchy** — Primary: the drop target + its current status. Secondary: the
   browse action. Tertiary: format/size constraints (meta).
3. **Anatomy** — surface · icon · title · hint · action · meta. Spacing relationships:
   title↔hint tight, hint↔button looser, meta separated.
4. **State matrix (the point)** — idle, drag-over, uploading (with progress), success, error
   (file-too-big). Edge cases handled: **long filename** ellipsis-clamps; size/percent shown;
   error names the file and the limit. (Empty = idle here; "many files" → the uploading row repeats.)
5. **Behavior & feedback** — drag-over changes border to solid + tint + slight scale (clear
   "you can drop now"); upload shows a moving progress bar, not a frozen spinner; success and
   error are unmistakable and offer the next action.
6. **Layout/weight** — the drop target dominates; meta is muted/small; status color carries weight.
7. **Responsive** — max-width stack, padding eases under 380px, no horizontal overflow at 320px.
8. **Accessibility** — drop target is a real `role="button"` + `tabindex` + `aria-label`;
   error block is `role="alert"`; state shown by **icon + text + color**, never color alone;
   focus-visible ring on the button; icons are `aria-hidden`.
9. **Tokenize & critique** — every value is a token; palette is a derived teal (not `#3B82F6`);
   radius/shadows/motion all systemized; runs clean against `anti-patterns.md`.

## What `before.html` got wrong (the AI default)
Default blue + `#EFF6FF`, uniform 8px radius, a single idle state, **no** drag-over / uploading /
success / error states, no long-filename handling, no focus state, no accessibility semantics.

## How to judge an AI's output for this component
It doesn't need to match `after.html` — it needs to have reasoned through the same 9 passes,
especially the **full state matrix**, and pass `references/verification.md` at 375/768/1440px.
