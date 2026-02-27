import { test, expect } from '@playwright/test';

test('Verify Focus States', async ({ page }) => {
  // 1. Visit Home Page
  await page.goto('http://localhost:3000');

  // 2. Locate WhatsApp Button (Floating)
  // Use exact match or more specific locator to distinguish from the popup close button
  const waButton = page.getByRole('button', { name: 'Abrir chat do WhatsApp' });
  await expect(waButton).toBeVisible();

  // 3. Focus and Screenshot Main Button
  await waButton.focus();
  await page.screenshot({ path: '.jules/verification/wa-button-focus.png' });

  // 4. Open Popup
  await waButton.click();

  // The popup close button has aria-label="Fechar chat"
  // The main button changes label to "Fechar chat do WhatsApp"
  const popupCloseButton = page.getByRole('button', { name: 'Fechar chat', exact: true });
  await expect(popupCloseButton).toBeVisible();

  // 5. Focus and Screenshot Close Button
  await popupCloseButton.focus();
  await page.screenshot({ path: '.jules/verification/wa-close-focus.png' });

  // 6. Close Popup
  await popupCloseButton.click();
  await expect(popupCloseButton).toBeHidden();
});
