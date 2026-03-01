## 2024-05-24 - FAQ Accordion Accessibility Attributes
**Learning:** Native accordion implementations (using buttons and state) often lack the ARIA attributes needed for screen reader context.
**Action:** Always add `aria-expanded` and `aria-controls` to the toggle `<button>`, pair it with an `id` on the content wrapper `<div>`, and ensure decorative icons within the button have `aria-hidden="true"`.
