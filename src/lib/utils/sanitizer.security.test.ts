import { describe, it, expect } from 'vitest';
import { sanitizeHtml } from './sanitizer';

describe('sanitizeHtml Security Checks', () => {
  it('should enforce rel="noopener noreferrer" on named targets (Reverse Tabnabbing)', () => {
    const input = '<a href="https://example.com" target="my_window">External Link</a>';
    const output = sanitizeHtml(input);

    // Expect rel="noopener noreferrer" to be present
    expect(output).toContain('rel="noopener noreferrer"');
    // Expect target="my_window" to be preserved (optional, but good for UX)
    expect(output).toContain('target="my_window"');
  });

  it('should enforce rel="noopener noreferrer" on target="_blank" (Standard)', () => {
    const input = '<a href="https://example.com" target="_blank">External Link</a>';
    const output = sanitizeHtml(input);
    expect(output).toContain('rel="noopener noreferrer"');
  });

  it('should NOT enforce rel on target="_self"', () => {
    const input = '<a href="https://example.com" target="_self">Self Link</a>';
    const output = sanitizeHtml(input);
    expect(output).not.toContain('rel="noopener noreferrer"');
  });

  it('should NOT enforce rel on links without target', () => {
    const input = '<a href="https://example.com">Normal Link</a>';
    const output = sanitizeHtml(input);
    expect(output).not.toContain('rel="noopener noreferrer"');
  });
});
