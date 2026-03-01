const fs = require('fs');
const content = fs.readFileSync('src/components/organisms/faq-section.tsx', 'utf8');

const hasAriaExpanded = content.includes('aria-expanded={openIndex === index}');
const hasAriaControls = content.includes('aria-controls={`faq-answer-${index}`}');
const hasIdQuestion = content.includes('id={`faq-question-${index}`}');
const hasIdAnswer = content.includes('id={`faq-answer-${index}`}');
const hasRoleRegion = content.includes('role="region"');
const hasAriaLabelledby = content.includes('aria-labelledby={`faq-question-${index}`}');
const hasAriaHidden = content.includes('aria-hidden="true"');
const hasFocusVisible = content.includes('focus-visible:ring-primary');

if (
  hasAriaExpanded &&
  hasAriaControls &&
  hasIdQuestion &&
  hasIdAnswer &&
  hasRoleRegion &&
  hasAriaLabelledby &&
  hasAriaHidden &&
  hasFocusVisible
) {
  console.log("SUCCESS: FAQ section accessibility attributes found.");
} else {
  console.error("ERROR: FAQ section accessibility attributes missing.");
  process.exit(1);
}
