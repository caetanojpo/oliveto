import { renderHook, waitFor } from "@testing-library/react";
import { useArticle } from "./useArticle";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { articlesApi } from "../api/articles.api";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { QUERY_CONFIG } from "@/lib/config/query";

// Mock the API
vi.mock("../api/articles.api", () => ({
  articlesApi: {
    getById: vi.fn(),
  },
}));

// Create a new QueryClient for each test
let queryClient: QueryClient;

const createWrapper = () => {
  queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useArticle", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch article by id", async () => {
    const mockArticle = { id: "1", title: "Test Article" };
    vi.mocked(articlesApi.getById).mockResolvedValue(mockArticle as any);

    const { result } = renderHook(() => useArticle("1"), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.article).toEqual(mockArticle));
    expect(articlesApi.getById).toHaveBeenCalledWith("1");
  });

  it("should have correct staleTime configuration", async () => {
    const mockArticle = { id: "1", title: "Test Article" };
    vi.mocked(articlesApi.getById).mockResolvedValue(mockArticle as any);

    renderHook(() => useArticle("1"), { wrapper: createWrapper() });

    // Wait for the query to be created
    await waitFor(() => expect(queryClient.getQueryCache().find({ queryKey: ["article", "1"] })).toBeDefined());

    const query = queryClient.getQueryCache().find({ queryKey: ["article", "1"] });

    // Check if staleTime matches the config value
    expect(query?.options.staleTime).toBe(QUERY_CONFIG.ARTICLES_STALE_TIME);
  });
});
