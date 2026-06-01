import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/layouts/SiteLayout";
import { BlockRenderer } from "@/components/BlockRenderer";
import { LoadingState, ErrorState } from "@/components/StateViews";
import { fetchAbout } from "@/services/strapi";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Persona" },
      { name: "description", content: "Learn more about me and this site." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { data, isLoading, isError } = useQuery({ queryKey: ["about"], queryFn: fetchAbout });

  return (
    <SiteLayout>
      <section className="container mx-auto max-w-3xl px-4 py-20">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">About</p>
        {isLoading && <LoadingState />}
        {isError && <ErrorState message="Failed to load about page." />}
        {data && (
          <>
            <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">{data.title}</h1>
            <div className="mt-10">
              <BlockRenderer blocks={data.blocks} />
            </div>
          </>
        )}
      </section>
    </SiteLayout>
  );
}
