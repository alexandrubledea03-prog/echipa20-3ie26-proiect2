import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-card/30">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-10 md:flex-row">
        <div className="flex items-center gap-2 font-display text-lg font-bold">
          <Sparkles className="size-5 text-primary" />
          <span className="bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
            Persona
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Persona. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
