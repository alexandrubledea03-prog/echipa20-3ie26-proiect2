import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { getImageUrl, type Article } from "@/services/strapi";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      to="/articles/$id"
      params={{ id: article.documentId }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <img
          src={getImageUrl(article.cover)}
          alt={article.cover?.alternativeText ?? article.title}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = getImageUrl(null);
          }}
        />
        {article.category?.name && (
          <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 font-mono text-xs uppercase tracking-wide text-foreground backdrop-blur">
            {article.category.name}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="font-display text-xl font-semibold leading-snug text-foreground group-hover:text-primary">
          {article.title}
        </h3>
        {article.description && (
          <p className="line-clamp-3 text-sm text-muted-foreground">{article.description}</p>
        )}
        <div className="mt-auto flex items-center gap-1 pt-2 text-sm font-medium text-primary">
          Read <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </Link>
  );
}
