## 2024-03-20 - Add ARIA Labels to Dashboard Sidebar and FAQ Toggles
**Learning:** Custom interactive elements (like custom FAQ toggles or sidebar close buttons) frequently lack standard accessible roles (`aria-expanded`, `aria-controls`, `role="region"`) and keyboard focus indicators (`focus-visible`).
**Action:** When creating or maintaining custom interactive elements, explicitly ensure they implement ARIA attributes matching their semantic purpose (e.g. `aria-expanded` for accordions) and provide clear visual focus indicators.
