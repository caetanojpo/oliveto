import { render, screen } from '@testing-library/react';
import { ArticleList } from './article-list';
import { ArticleResponseDTO, ArticleStatus } from '@/lib/types/article';
import { vi, describe, it, expect } from 'vitest';

describe('ArticleList', () => {
  it('renders a list of articles', () => {
    const articles: ArticleResponseDTO[] = [
      {
        id: '1',
        title: 'Article 1',
        status: ArticleStatus.PUBLISHED,
        publishedAt: '2023-01-01T00:00:00Z',
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-01-01T00:00:00Z',
        content: 'Content 1',
        authorId: 'author1',
        firmId: 'firm1',
        tags: [],
      },
      {
        id: '2',
        title: 'Article 2',
        status: ArticleStatus.DRAFT,
        publishedAt: undefined,
        createdAt: '2023-01-02T00:00:00Z',
        updatedAt: '2023-01-02T00:00:00Z',
        content: 'Content 2',
        authorId: 'author1',
        firmId: 'firm1',
        tags: [],
      },
    ];

    const onView = vi.fn();
    const onEdit = vi.fn();
    const onDelete = vi.fn();

    render(
      <ArticleList
        articles={articles}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    );

    expect(screen.getByText('Article 1')).toBeTruthy();
    expect(screen.getByText('Article 2')).toBeTruthy();
    expect(screen.getByText('Publicado')).toBeTruthy();
    expect(screen.getByText('Rascunho')).toBeTruthy();

    // Check if table rows are rendered (header + 2 rows = 3 rows, but header is in thead)
    // We can count buttons or something.
    const viewButtons = screen.getAllByTitle('Visualizar');
    expect(viewButtons).toHaveLength(2);
  });

  it('renders empty state when no articles are provided', () => {
    const articles: ArticleResponseDTO[] = [];
    const onView = vi.fn();
    const onEdit = vi.fn();
    const onDelete = vi.fn();

    render(
      <ArticleList
        articles={articles}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    );

    expect(screen.getByText('Nenhum artigo encontrado')).toBeTruthy();
    expect(screen.getByText('Você ainda não criou nenhum artigo.')).toBeTruthy();
  });
});
