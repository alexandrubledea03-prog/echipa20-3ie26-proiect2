import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/layouts/SiteLayout";
import { CategoryCard } from "@/components/CategoryCard";
import { LoadingState, ErrorState } from "@/components/StateViews";
import { fetchCategories } from "@/services/strapi";

export const Route = createFileRoute("/categories/")({
  head: () => ({
    meta: [
      { title: "Categories — Persona" },
      { name: "description", content: "Browse all categories." },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-20">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">Topics</p>
        <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">All categories</h1>

        <div className="mt-10">
          {isLoading && <LoadingState />}
          {isError && <ErrorState message="Failed to load categories." />}
          {data && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.map((c) => (
                <CategoryCard key={c.documentId} category={c} />
              ))}
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
