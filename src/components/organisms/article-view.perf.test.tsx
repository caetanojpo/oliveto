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

    const article = {
      id: '1',
      title: 'Performance Test Article',
      content: '<p>Content</p>',
      status: ArticleStatus.PUBLISHED,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: new Date().toISOString(),
      tags: [],
    } as any;

    const onBack = vi.fn();

    const { rerender } = render(
      <ArticleView article={article} onBack={onBack} />
    );

    // Should be called once initially
    expect(sanitizeSpy).toHaveBeenCalledTimes(1);

    // Force re-render with identical props (but onBack is unstable if parent recreates it,
    // though here we pass same 'onBack' mock. If ArticleView is not memoized, it rerenders.
    // If sanitizeHtml is not memoized inside, it runs again.
    rerender(
      <ArticleView article={article} onBack={onBack} />
    );

    // Without optimization, this will fail because it's called again on re-render
    expect(sanitizeSpy).toHaveBeenCalledTimes(1);
  });
});
