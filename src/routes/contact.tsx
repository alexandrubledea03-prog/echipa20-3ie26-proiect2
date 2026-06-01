import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Send, CheckCircle2 } from "lucide-react";
import { SiteLayout } from "@/layouts/SiteLayout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Persona" },
      { name: "description", content: "Get in touch." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <SiteLayout>
      <section className="container mx-auto grid max-w-5xl gap-12 px-4 py-20 md:grid-cols-2">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-primary">Contact</p>
          <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">Let's talk.</h1>
          <p className="mt-4 text-muted-foreground">
            Have a project, an idea, or just want to say hi? Send a message and I'll get back to you.
          </p>
          <div className="mt-8 space-y-3 text-sm">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Mail className="size-4 text-primary" /> hello@persona.dev
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <MapPin className="size-4 text-primary" /> Worldwide · Remote
            </div>
          </div>
        </div>

        <form
          onSubmit={handle}
          className="space-y-5 rounded-2xl border border-border bg-card p-6 shadow-sm"
        >
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Tell me about your project…"
            />
          </div>
          <Button type="submit" className="w-full" size="lg">
            <Send className="mr-2 size-4" /> Send message
          </Button>
          {sent && (
            <div className="flex items-center gap-2 rounded-md bg-primary/10 p-3 text-sm text-primary">
              <CheckCircle2 className="size-4" /> Message sent successfully!
            </div>
          )}
        </form>
      </section>
    </SiteLayout>
  );
}
