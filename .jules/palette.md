
## 2024-05-18 - [Accessibility: Explicit Form Labeling]
**Learning:** In compound inputs or inputs with untraditional usage (e.g. `<input type="color">`), visual `<label>`s without an explicit `htmlFor` matching the input's `id` fail to provide accessible names. Further, in cases where a visual label exists but multiple inputs are associated, specific `aria-label`s must be used on the secondary inputs.
**Action:** Always link visual `<label>` elements to their primary `<input>` using the `htmlFor` and `id` pair, and supplement additional inputs (like a color picker combined with a hex code input) with explicit `aria-label`s.
