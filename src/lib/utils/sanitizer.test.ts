import { describe, it, expect } from 'vitest';
import { sanitizeHtml } from './sanitizer';

describe('sanitizeHtml', () => {
  it('should allow target="_blank" but ensure rel="noopener noreferrer" is present', () => {
    const input = '<a href="https://example.com" target="_blank">Link</a>';
    const output = sanitizeHtml(input);
    expect(output).toContain('rel="noopener noreferrer"');
    expect(output).toContain('target="_blank"');
  });

  it('should handle case-insensitive target="_BLANK"', () => {
    const input = '<a href="https://example.com" target="_BLANK">Link</a>';
    const output = sanitizeHtml(input);
    // target attribute value might be normalized or not depending on parser,
    // but rel attribute MUST contain noopener noreferrer
    expect(output).toContain('rel="noopener noreferrer"');
    expect(output).toMatch(/target="_BLANK"/i);
  });

  it('should append to existing rel attributes', () => {
    const input = '<a href="https://example.com" target="_blank" rel="nofollow">Link</a>';
    const output = sanitizeHtml(input);
    expect(output).toContain('rel="nofollow noopener noreferrer"');
    expect(output).toContain('target="_blank"');
  });

  it('should handle duplicate rel attributes gracefully', () => {
    const input = '<a href="https://example.com" target="_blank" rel="noopener">Link</a>';
    const output = sanitizeHtml(input);
    // Should not duplicate "noopener"
    // The implementation uses Set, so order is preserved based on Set iteration (insertion order usually)
    // "noopener" is already there. "noreferrer" is added.
    expect(output).toContain('rel="noopener noreferrer"');
  });

  it('should not modify internal links without target="_blank"', () => {
    const input = '<a href="/internal">Internal</a>';
    const output = sanitizeHtml(input);
    expect(output).toBe(input);
  });
});
