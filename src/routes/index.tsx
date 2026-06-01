import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/layouts/SiteLayout";
import { ArticleCard } from "@/components/ArticleCard";
import { CategoryCard } from "@/components/CategoryCard";
import { LoadingState, ErrorState } from "@/components/StateViews";
import { fetchArticles, fetchCategories } from "@/services/strapi";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-fallback.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Persona — Personal Portfolio" },
      { name: "description", content: "Welcome to my personal presentation website." },
    ],
  }),
  component: Home,
});

function Home() {
  const articles = useQuery({ queryKey: ["articles"], queryFn: fetchArticles });
  const categories = useQuery({ queryKey: ["categories"], queryFn: fetchCategories });

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <img
          src={heroImg}
          alt=""
          className="absolute inset-0 size-full object-cover opacity-40 dark:opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        <div className="container relative mx-auto px-4 py-24 md:py-36">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full border border-border bg-background/60 px-4 py-1 font-mono text-xs uppercase tracking-widest text-muted-foreground backdrop-blur">
              Personal · Portfolio · Blog
            </span>
            <h1 className="mt-6 font-display text-5xl font-bold leading-tight tracking-tight md:text-7xl">
              Ideas, stories &{" "}
              <span className="bg-gradient-to-r from-primary via-accent-foreground to-primary bg-clip-text text-transparent">
                projects
              </span>
              <br />worth sharing.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              A space where thoughts on design, code and everything in between come to life — powered by Strapi.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/articles">
                  Read articles <ArrowRight className="ml-1 size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/about">About me</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="container mx-auto px-4 py-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-primary">Latest</p>
            <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">Recent articles</h2>
          </div>
          <Link
            to="/articles"
            className="hidden text-sm font-medium text-primary hover:underline md:inline"
          >
            View all →
          </Link>
        </div>
        {articles.isLoading && <LoadingState />}
        {articles.isError && <ErrorState message="Failed to load articles." />}
        {articles.data && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.data.slice(0, 6).map((a) => (
              <ArticleCard key={a.documentId} article={a} />
            ))}
          </div>
        )}
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 pb-20">
        <div className="mb-10">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">Explore</p>
          <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">Categories</h2>
        </div>
        {categories.isLoading && <LoadingState />}
        {categories.isError && <ErrorState message="Failed to load categories." />}
        {categories.data && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.data.map((c) => (
              <CategoryCard key={c.documentId} category={c} />
            ))}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
