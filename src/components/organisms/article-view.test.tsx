import { render } from '@testing-library/react';
import { ArticleView } from './article-view';
import * as sanitizer from '@/lib/utils/sanitizer';
import { ArticleStatus } from '@/lib/types/article';
import { vi, describe, it, expect, beforeEach } from 'vitest';

describe('ArticleView Performance', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('verifies sanitizeHtml is memoized across re-renders', () => {
    const sanitizeSpy = vi.spyOn(sanitizer, 'sanitizeHtml');

    // Create a large HTML content to simulate work
    const largeContent = '<p>Content</p>'.repeat(1000);

    const article = {
      id: '1',
      title: 'Performance Test Article',
      content: largeContent,
      status: ArticleStatus.PUBLISHED,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: new Date().toISOString(),
      tags: [],
    } as any;

    // Initial render
    const { rerender } = render(
      <ArticleView article={article} onBack={() => {}} />
    );

    // Should be called once initially
    expect(sanitizeSpy).toHaveBeenCalledTimes(1);

    // Force re-render with identical props (simulating parent re-render or unrelated state change)
    rerender(
      <ArticleView article={article} onBack={() => {}} />
    );

    // Expectation for OPTIMIZED code: sanitizeHtml is called ONCE total
    // Currently, it will fail (called 2 times)
    expect(sanitizeSpy).toHaveBeenCalledTimes(1);

    // Another re-render with different onBack (new function reference)
    rerender(
      <ArticleView article={article} onBack={() => console.log('back')} />
    );

    expect(sanitizeSpy).toHaveBeenCalledTimes(1);
  });
});
