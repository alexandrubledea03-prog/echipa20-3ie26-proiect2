import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { SiteLayout } from "@/layouts/SiteLayout";
import { ArticleCard } from "@/components/ArticleCard";
import { LoadingState, ErrorState, EmptyState } from "@/components/StateViews";
import { fetchCategory, fetchCategoryArticles } from "@/services/strapi";

export const Route = createFileRoute("/categories/$id")({
  component: CategoryDetail,
});

function CategoryDetail() {
  const { id } = Route.useParams();
  const category = useQuery({ queryKey: ["category", id], queryFn: () => fetchCategory(id) });
  const articles = useQuery({
    queryKey: ["category-articles", id],
    queryFn: () => fetchCategoryArticles(id),
  });

  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-16">
        <Link
          to="/categories"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> All categories
        </Link>

        {category.isLoading && <LoadingState />}
        {category.isError && <ErrorState message="Failed to load category." />}
        {category.data && (
          <>
            <p className="mt-8 font-mono text-xs uppercase tracking-widest text-primary">Category</p>
            <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">
              {category.data.name}
            </h1>
            {category.data.description && (
              <p className="mt-3 max-w-2xl text-muted-foreground">{category.data.description}</p>
            )}
          </>
        )}

        <div className="mt-12">
          {articles.isLoading && <LoadingState />}
          {articles.isError && <ErrorState message="Failed to load articles." />}
          {articles.data && articles.data.length === 0 && (
            <EmptyState message="No articles in this category yet." />
          )}
          {articles.data && articles.data.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.data.map((a) => (
                <ArticleCard key={a.documentId} article={a} />
              ))}
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
