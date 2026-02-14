import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useInfiniteArticles } from "./useInfiniteArticles";
import { articlesApi } from "../api/articles.api";
import { vi, describe, it, expect, beforeEach } from "vitest";

// Mock the API
vi.mock("../api/articles.api", () => ({
  articlesApi: {
    getPublishedByFirmId: vi.fn(),
    getAllByFirmId: vi.fn(),
  },
}));

const mockArticles = [
  { id: "1", title: "Article 1" },
  { id: "2", title: "Article 2" },
];

const mockResponse = {
  content: mockArticles,
  page: {
    size: 10,
    number: 0,
    totalElements: 2,
    totalPages: 1,
  },
};

describe("useInfiniteArticles", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    vi.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it("should return stable articles reference across re-renders", async () => {
    (articlesApi.getPublishedByFirmId as any).mockResolvedValue(mockResponse);

    const { result, rerender } = renderHook(
      () => useInfiniteArticles("firm-id", 10, true),
      { wrapper }
    );

    // Wait for data to load
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    const firstArticles = result.current.articles;
    expect(firstArticles).toHaveLength(2);

    // Force re-render
    rerender();

    const secondArticles = result.current.articles;

    // This expectation will FAIL before optimization because flatMap returns a new array
    expect(secondArticles).toBe(firstArticles);
  });

  it("should return stable hook result object across re-renders", async () => {
     (articlesApi.getPublishedByFirmId as any).mockResolvedValue(mockResponse);

    const { result, rerender } = renderHook(
      () => useInfiniteArticles("firm-id", 10, true),
      { wrapper }
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    const firstResult = result.current;

    // Force re-render
    rerender();

    const secondResult = result.current;

    // This expectation will FAIL before optimization
    expect(secondResult).toBe(firstResult);
  });
});
