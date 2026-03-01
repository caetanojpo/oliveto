const fs = require('fs');
const content = fs.readFileSync('src/components/organisms/dashboard-sidebar.tsx', 'utf8');

const hasAriaLabel = content.includes('aria-label="Fechar menu"');
const hasAriaHidden = content.includes('aria-hidden="true"');

if (hasAriaLabel && hasAriaHidden) {
  console.log("SUCCESS: Sidebar button accessibility attributes found.");
} else {
  console.error("ERROR: Sidebar button accessibility attributes missing.");
  process.exit(1);
}
