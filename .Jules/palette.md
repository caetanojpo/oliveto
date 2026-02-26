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
**Learning:** Purely visual text animations (like `ScrambleText`) cause significant accessibility issues for screen readers by constantly announcing changing content, and can trigger motion sickness.
**Action:** Implement text animations with a dual structure: a visually hidden static element (`sr-only`) for screen readers, and the animated element marked with `aria-hidden="true"`. Also, respect `prefers-reduced-motion` to disable the animation entirely.

## 2025-02-27 - Decorative Icon Accessibility
**Learning:** Found multiple instances of decorative icons (e.g., in close buttons, search inputs, or separators) lacking `aria-hidden="true"`, potentially causing screen readers to announce them as "graphic" or "unlabeled image" alongside the actual text label.
**Action:** Consistently add `aria-hidden="true"` to icons that are purely decorative or have a visible text alternative (like `sr-only` text), reducing noise for screen reader users.

## 2025-02-27 - Contextual Action Buttons
**Learning:** Found multiple instances of generic `aria-label`s on icon-only buttons in lists (e.g., "Edit" instead of "Edit Article [Title]"). This creates a confusing experience for screen reader users navigating lists of items.
**Action:** Always include the unique identifier (like title or name) in the `aria-label` of action buttons within lists to provide context.

## 2025-02-28 - Component Localization
**Learning:** Default UI components (like Pagination, Dialog) often contain hardcoded English strings and ARIA labels. In a non-English application (Portuguese), this creates a disjointed and inaccessible experience for users, particularly those relying on screen readers.
**Action:** Audit and localize all default strings and ARIA labels in reusable UI components to ensure they match the application's primary language.

## 2025-05-22 - Escape Key Interaction Pattern
**Learning:** Custom floating widgets (like `WhatsAppButton`) often miss the standard `Escape` key interaction to close them. This creates a trap for keyboard users who navigate to the widget but cannot easily dismiss it without tabbing away.
**Action:** Always implement a global `keydown` listener for `Escape` in `useEffect` for custom interactive overlays to ensure they are dismissible via keyboard.
