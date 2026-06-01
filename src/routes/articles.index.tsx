import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/layouts/SiteLayout";
import { ArticleCard } from "@/components/ArticleCard";
import { LoadingState, ErrorState, EmptyState } from "@/components/StateViews";
import { fetchArticles } from "@/services/strapi";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/articles/")({
  head: () => ({
    meta: [
      { title: "Articles — Persona" },
      { name: "description", content: "Browse all articles." },
    ],
  }),
  component: ArticlesPage,
});

function ArticlesPage() {
  const { data, isLoading, isError } = useQuery({ queryKey: ["articles"], queryFn: fetchArticles });
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    if (!data) return [];
    const term = q.trim().toLowerCase();
    if (!term) return data;
    return data.filter(
      (a) =>
        a.title.toLowerCase().includes(term) ||
        a.description?.toLowerCase().includes(term) ||
        a.category?.name?.toLowerCase().includes(term),
    );
  }, [data, q]);

  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-20">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-primary">Library</p>
            <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">All articles</h1>
          </div>
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search articles…"
              className="pl-9"
            />
          </div>
        </div>

        {isLoading && <LoadingState />}
        {isError && <ErrorState message="Failed to load articles." />}
        {data && filtered.length === 0 && <EmptyState message="No articles match your search." />}
        {filtered.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((a) => (
              <ArticleCard key={a.documentId} article={a} />
            ))}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
