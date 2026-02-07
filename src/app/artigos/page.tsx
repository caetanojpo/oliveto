import { articlesApi } from "@/features/articles/api/articles.api";
import { ArticlesList } from "@/features/articles/components/articles-list";
import { env } from "@/lib/env";

export default async function ArtigosPage() {
  const firmId = env.NEXT_PUBLIC_FIRM_ID;

  // Parallel fetching of initial data
  // We use getPublicPublishedByFirmId for articles to leverage Next.js caching (fetch)
  // We use getAllTagsByFirmId for tags to match the original client-side behavior
  const [initialArticles, initialTags] = await Promise.all([
    articlesApi.getPublicPublishedByFirmId(firmId, 0, 6),
    articlesApi.getAllTagsByFirmId(firmId)
  ]);

  return (
    <ArticlesList
      initialArticles={initialArticles}
      initialTags={initialTags}
    />
  );
}
