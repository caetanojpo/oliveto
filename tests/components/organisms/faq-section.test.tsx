import { expect, test } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FaqSection } from '@/components/organisms/faq-section';

test('FaqSection handles accessibility attributes correctly', () => {
  const { container } = render(<FaqSection />);

  const buttons = screen.getAllByRole('button');
  expect(buttons.length).toBeGreaterThan(0);

  const firstButton = buttons[0];
  const firstContentId = firstButton.getAttribute('aria-controls');
  expect(firstContentId).toBeTruthy();

  // Use container.querySelector instead of document.getElementById
  const firstContent = container.querySelector(`#${firstContentId}`);
  expect(firstContent).toBeTruthy();
  expect(firstContent?.getAttribute('role')).toBe('region');
  expect(firstContent?.getAttribute('aria-labelledby')).toBe(firstButton.id);

  // Initial state (first item is open by default)
  expect(firstButton.getAttribute('aria-expanded')).toBe('true');

  // Click to close
  fireEvent.click(firstButton);
  expect(firstButton.getAttribute('aria-expanded')).toBe('false');

  // Click to open
  fireEvent.click(firstButton);
  expect(firstButton.getAttribute('aria-expanded')).toBe('true');
});
