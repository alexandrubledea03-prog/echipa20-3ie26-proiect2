import { Link } from "@tanstack/react-router";
import { Folder } from "lucide-react";
import type { Category } from "@/services/strapi";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      to="/categories/$id"
      params={{ id: category.documentId }}
      className="group flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
    >
      <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-accent-foreground/20 text-primary">
        <Folder className="size-5" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-display text-base font-semibold text-foreground group-hover:text-primary">
          {category.name}
        </h3>
        {category.description && (
          <p className="truncate text-xs text-muted-foreground">{category.description}</p>
        )}
      </div>
    </Link>
  );
}
