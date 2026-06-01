import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Calendar } from "lucide-react";
import { SiteLayout } from "@/layouts/SiteLayout";
import { BlockRenderer } from "@/components/BlockRenderer";
import { LoadingState, ErrorState } from "@/components/StateViews";
import { fetchArticle, getImageUrl } from "@/services/strapi";

export const Route = createFileRoute("/articles/$id")({
  component: ArticleDetail,
});

function ArticleDetail() {
  const { id } = Route.useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["article", id],
    queryFn: () => fetchArticle(id),
  });

  return (
    <SiteLayout>
      <article className="container mx-auto max-w-3xl px-4 py-16">
        <Link
          to="/articles"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> Back to articles
        </Link>

        {isLoading && <LoadingState />}
        {isError && <ErrorState message="Failed to load article." />}
        {data && (
          <>
            {data.category && (
              <span className="mt-8 inline-block rounded-full bg-accent px-3 py-1 font-mono text-xs uppercase tracking-wide text-accent-foreground">
                {data.category.name}
              </span>
            )}
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
              {data.title}
            </h1>
            {data.description && (
              <p className="mt-4 text-lg text-muted-foreground">{data.description}</p>
            )}
            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="size-3.5" />
              {new Date(data.publishedAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <img
              src={getImageUrl(data.cover)}
              alt={data.title}
              className="mt-10 w-full rounded-2xl border border-border object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = getImageUrl(null);
              }}
            />
            <div className="mt-10">
              <BlockRenderer blocks={data.blocks} />
            </div>
          </>
        )}
      </article>
    </SiteLayout>
  );
}
