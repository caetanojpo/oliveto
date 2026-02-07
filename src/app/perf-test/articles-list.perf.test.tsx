import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { notFound } from 'next/navigation';

// Mock env before importing anything else
vi.mock('@/lib/env', () => ({
  env: {
    NEXT_PUBLIC_API_URL: 'http://localhost:3000/api',
    NEXT_PUBLIC_FIRM_ID: '00000000-0000-0000-0000-000000000000',
  }
}));

// Mock dependencies
vi.mock('next/navigation', () => ({
  notFound: vi.fn(),
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock('@/components/organisms/header', () => ({
  Header: () => <header>Header</header>,
}));

vi.mock('@/components/organisms/footer', () => ({
  Footer: () => <footer>Footer</footer>,
}));

vi.mock('@/components/atoms/page-background-words', () => ({
  PageBackgroundWords: () => <div>Background</div>,
}));

vi.mock('@/components/molecules/filter-bar', () => ({
  FilterBar: () => <div>FilterBar</div>,
}));

vi.mock('@/components/molecules/article-grid-item', () => ({
  ArticleGridItem: ({ article }: { article: any }) => <div>{article.title}</div>,
}));

vi.mock('@/components/atoms/load-more-button', () => ({
  LoadMoreButton: () => <button>Load More</button>,
}));

// Mock API responses
const mockArticles = {
  content: [
    { id: '1', title: 'Optimized Article 1' },
    { id: '2', title: 'Optimized Article 2' },
  ],
  page: {
    size: 10,
    number: 0,
    totalElements: 2,
    totalPages: 1
  }
};

const mockTags = {
  content: [
    { id: 'tag1', name: 'Tag 1' }
  ]
};

// Mock hooks logic to verify initialData usage
vi.mock('@/features/articles/hooks/useArticles', () => ({
  useArticles: vi.fn((firmId, page, size, publishedOnly, initialData) => ({
    articles: initialData ? initialData.content : [],
    totalPages: initialData ? initialData.page.totalPages : 0,
    totalElements: initialData ? initialData.page.totalElements : 0,
    isLoadingArticles: !initialData,
  })),
}));

vi.mock('@/features/articles/hooks/useTags', () => ({
  useTags: vi.fn((firmId, publishedOnly, initialData) => ({
    tags: initialData ? initialData.content : [],
    isLoadingTags: !initialData,
  })),
}));

import { ArticlesList } from '@/features/articles/components/articles-list';

describe('ArticlesList Performance Optimization', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders content immediately with initial data (SSR/SSG behavior)', () => {
    render(
      <ArticlesList
        initialArticles={mockArticles as any}
        initialTags={mockTags as any}
      />
    );

    expect(screen.getByText('Optimized Article 1')).toBeTruthy();
  });

  it('handles empty initial data correctly (calls notFound)', () => {
    const emptyArticles = {
       content: [],
       page: { size: 10, number: 0, totalElements: 0, totalPages: 0 }
    };

    render(
      <ArticlesList
        initialArticles={emptyArticles as any}
        initialTags={mockTags as any}
      />
    );

    expect(notFound).toHaveBeenCalled();
  });
});
