import { getImageUrl, type ArticleBlock } from "@/services/strapi";

export function BlockRenderer({ blocks }: { blocks?: ArticleBlock[] }) {
  if (!blocks?.length) return null;
  return (
    <div className="space-y-8">
      {blocks.map((block) => {
        switch (block.__component) {
          case "shared.rich-text":
            return (
              <div
                key={block.id}
                className="prose prose-neutral max-w-none whitespace-pre-wrap text-foreground/90 dark:prose-invert"
              >
                {block.body}
              </div>
            );
          case "shared.quote":
            return (
              <blockquote
                key={block.id}
                className="border-l-4 border-primary bg-card/50 p-6 italic"
              >
                <p className="font-display text-lg">"{block.body}"</p>
                {block.title && (
                  <footer className="mt-3 text-sm text-muted-foreground">— {block.title}</footer>
                )}
              </blockquote>
            );
          case "shared.media":
            return block.file ? (
              <img
                key={block.id}
                src={getImageUrl(block.file)}
                alt={block.file.alternativeText ?? ""}
                className="w-full rounded-xl border border-border"
                loading="lazy"
              />
            ) : null;
          default:
            return null;
        }
      })}
    </div>
  );
}
