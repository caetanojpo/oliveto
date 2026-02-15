## 2024-05-22 - Icon-Only Button Standardization
**Learning:** Found multiple instances of raw HTML `button` elements used for icon-only actions (Edit/Delete) instead of the design system's `Button` component. This resulted in missing focus rings, inconsistent hover states, and lack of ARIA labels.
**Action:** Replace raw buttons with `<Button variant="ghost" size="icon-sm">` and strictly enforce `aria-label` for all icon-only interactions to ensure keyboard accessibility and visual consistency.

## 2024-05-23 - Form Label Association
**Learning:** Found visible `label` elements that were not programmatically associated with their `input` fields using `htmlFor` and `id`. This prevents screen readers from announcing the label when the input is focused and breaks the click-to-focus behavior.
**Action:** Always ensure `label` elements have a `htmlFor` attribute that matches the `id` of the corresponding `input`.

## 2024-05-24 - Custom Form Field Accessibility
**Learning:** The `CustomFormField` component (used in `ContactForm`) rendered inputs without accessible names when the `label` prop was omitted, relying solely on `placeholder` which is not sufficient for screen readers.
**Action:** Updated `CustomFormField` to automatically fallback to using `placeholder` as `aria-label` when no explicit `label` is provided, ensuring all form inputs have an accessible name without requiring visual design changes.

## 2025-02-23 - Focus Trap in Hidden Elements
**Learning:** Elements that fade out with `opacity-0` remain focusable, creating a confusing keyboard experience. Using `invisible` (CSS `visibility: hidden`) works perfectly with CSS transitions because it delays the hidden state until the transition completes, naturally solving the focus trap issue.
**Action:** Always combine `opacity-0` transitions with `invisible` or `visibility: hidden` for elements that should be removed from the accessibility tree.

## 2025-02-24 - Destructive Action Confirmation
**Learning:** Found that the logout action was immediate and lacked confirmation, which could lead to accidental session termination. Direct action buttons for destructive operations without confirmation are a UX risk.
**Action:** Implemented `AlertDialog` for the logout button to require user confirmation. Added a loading state within the dialog action to provide feedback during the async logout process, ensuring the dialog remains open until the action completes or redirects.

## 2025-02-25 - Slot Component Content Injection
**Learning:** Radix UI's `Slot` component (used when `asChild` is true) strictly expects a single child and merges props, making it impossible to inject additional content like a loading spinner directly.
**Action:** When implementing `loading` states in components supporting `asChild`, condition the spinner rendering on `!asChild` and document this limitation, or refactor to wrap the child manually if needed.

## 2025-02-26 - Accessible Text Animations
**Learning:** Text animations like "scrambling" are disastrous for screen readers as they announce rapidly changing, meaningless characters. Additionally, they can trigger vestibular disorders.
**Action:** Implement dual rendering: a visually hidden (`sr-only`) static element for screen readers, and an `aria-hidden="true"` animated element. Also, respect `prefers-reduced-motion` by disabling the animation entirely.
