import { render, screen } from '@testing-library/react';
import { ArticleView } from '@/components/organisms/article-view';
import { TagForm } from '@/components/organisms/tag-form';
import { DashboardSidebar } from '@/components/organisms/dashboard-sidebar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

// Mock useRouter for SidebarLogoutButton
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  usePathname: () => '/admin/dashboard',
}));

describe('A11y Buttons Test', () => {
  it('ArticleView has back button with aria-label', () => {
    const article = {
      id: '1',
      title: 'Test',
      content: '<p>Test</p>',
      slug: 'test',
      authorName: 'Author',
      publishedAt: '2023-01-01',
      status: 'PUBLISHED',
      firmId: 'firm1',
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01',
    };
    render(<ArticleView article={article} onBack={() => {}} />);
    const button = screen.getByRole('button', { name: 'Voltar' });
    expect(button).toBeInTheDocument();
  });

  it('TagForm has back button with aria-label when onCancel is provided', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <TagForm onSubmit={() => {}} isPending={false} onCancel={() => {}} />
      </QueryClientProvider>
    );
    const button = screen.getByRole('button', { name: 'Voltar' });
    expect(button).toBeInTheDocument();
  });

  it('DashboardSidebar has close button with aria-label', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <DashboardSidebar isOpen={true} onClose={() => {}} />
      </QueryClientProvider>
    );
    const button = screen.getByRole('button', { name: 'Fechar menu' });
    expect(button).toBeInTheDocument();
  });
});