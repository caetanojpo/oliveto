import { describe, it, expect } from 'vitest';
import { sanitizeHtml } from '../../src/lib/utils/sanitizer';

describe('XSS Bypass Attempts', () => {
  it('should block javascript: scheme', () => {
    const input = '<a href="javascript:alert(1)">Click me</a>';
    const output = sanitizeHtml(input);
    expect(output).not.toContain('href="javascript:alert(1)"');
    expect(output).not.toContain('javascript:');
  });

  it('should block data: scheme in links', () => {
    const input = '<a href="data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==">Click me</a>';
    const output = sanitizeHtml(input);
    expect(output).not.toContain('href="data:');
  });

  it('should allow data: scheme in images', () => {
    const input = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg==">';
    const output = sanitizeHtml(input);
    expect(output).toContain('src="data:image/png;base64,');
  });

  it('should block vbscript:', () => {
    const input = '<a href="vbscript:alert(1)">Click me</a>';
    const output = sanitizeHtml(input);
    expect(output).not.toContain('vbscript:');
  });

  it('should block java\\tscript: (tab)', () => {
    const input = '<a href="java\tscript:alert(1)">Click me</a>';
    const output = sanitizeHtml(input);
    expect(output).not.toContain('java\tscript:');
  });

  it('should block java\\nscript: (newline)', () => {
    const input = '<a href="java\nscript:alert(1)">Click me</a>';
    const output = sanitizeHtml(input);
    expect(output).not.toContain('java\nscript:');
  });

  it('should block whitespace around scheme', () => {
    const input = '<a href="  javascript:alert(1)">Click me</a>';
    const output = sanitizeHtml(input);
    expect(output).not.toContain('javascript:');
  });

  it('should allow valid http links', () => {
    const input = '<a href="https://google.com">Google</a>';
    const output = sanitizeHtml(input);
    expect(output).toContain('href="https://google.com"');
  });

  it('should block ftp scheme', () => {
    const input = '<a href="ftp://example.com">FTP</a>';
    const output = sanitizeHtml(input);
    expect(output).not.toContain('href="ftp://example.com"');
  });

  it('should block magnet scheme', () => {
    const input = '<a href="magnet:?xt=urn:btih:...">Magnet</a>';
    const output = sanitizeHtml(input);
    expect(output).not.toContain('href="magnet:');
  });

  it('should block dangerous form tags', () => {
    const input = '<form action="https://evil.com"><input type="submit"></form>';
    const output = sanitizeHtml(input);
    expect(output).not.toContain('<form');
  });

  // NEW TESTS
  it('should add rel="noopener noreferrer" to target="_blank"', () => {
    const input = '<a href="https://example.com" target="_blank">Link</a>';
    const output = sanitizeHtml(input);
    expect(output).toContain('rel="noopener noreferrer"');
  });

  it('should add rel="noopener noreferrer" to target="foo" (named window)', () => {
    const input = '<a href="https://example.com" target="foo">Link</a>';
    const output = sanitizeHtml(input);
    expect(output).toContain('rel="noopener noreferrer"');
  });

  it('should NOT add rel="noopener noreferrer" to target="_self"', () => {
    const input = '<a href="https://example.com" target="_self">Link</a>';
    const output = sanitizeHtml(input);
    expect(output).not.toContain('rel="noopener noreferrer"');
  });
});
