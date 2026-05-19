"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SectionHeading } from "@/components/layout/section-heading";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function ContactSection() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [terminalLines, setTerminalLines] = useState<string[]>([
    "$ contact --init",
    "> Awaiting your message…",
  ]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = new FormData(e.currentTarget);

    setTerminalLines((lines) => [
      ...lines,
      `$ send --to ${siteConfig.name}`,
      "> Validating payload…",
    ]);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          subject: form.get("subject"),
          message: form.get("message"),
        }),
      });

      if (!res.ok) throw new Error("Failed");

      setStatus("success");
      setTerminalLines((lines) => [
        ...lines,
        "✓ Message queued · 201 Created",
        "> I'll respond within 48h. Thanks for reaching out.",
      ]);
      e.currentTarget.reset();
    } catch {
      setStatus("error");
      setTerminalLines((lines) => [
        ...lines,
        "✗ Delivery failed — try email directly",
      ]);
    }
  }

  return (
    <section id="contact" className="section-padding border-t border-border/40">
      <div className="section-container">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something production-grade"
          description="Startup, fintech, AI company, or client project—send a message. This form persists to PostgreSQL when configured."
        />

        <div className="grid gap-8 lg:grid-cols-2">
          <form onSubmit={handleSubmit} className="glass-panel space-y-4 p-6">
            <div className="flex items-center gap-2 font-mono text-xs text-primary">
              <span
                className={cn(
                  "h-2 w-2 rounded-full",
                  status === "idle" && "bg-primary animate-pulse",
                  status === "loading" && "bg-yellow-500 animate-pulse",
                  status === "success" && "bg-primary",
                  status === "error" && "bg-red-500"
                )}
              />
              {status === "idle" && "Available for opportunities"}
              {status === "loading" && "Transmitting…"}
              {status === "success" && "Message sent"}
              {status === "error" && "Transmission error"}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" required placeholder="Jane Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@company.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                name="subject"
                placeholder="Backend role / Contract / Collaboration"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Tell me about the system you're building…"
              />
            </div>
            <Button type="submit" disabled={status === "loading"} className="w-full">
              {status === "loading" ? "Sending…" : "Send message"}
            </Button>
          </form>

          <div className="glass-panel flex flex-col font-mono text-sm">
            <div className="border-b border-border/60 px-4 py-3 text-xs text-muted-foreground">
              contact-cli v1.0
            </div>
            <div className="flex-1 space-y-2 p-4">
              {terminalLines.map((line, i) => (
                <p
                  key={`${line}-${i}`}
                  className={cn(
                    line.startsWith("✓")
                      ? "text-primary"
                      : line.startsWith("✗")
                        ? "text-destructive"
                        : "text-muted-foreground"
                  )}
                >
                  {line}
                </p>
              ))}
            </div>
            <div className="border-t border-border/60 p-4 text-xs text-muted-foreground">
              Prefer email?{" "}
              <a
                href={`mailto:${siteConfig.links.email}`}
                className="text-primary hover:underline"
              >
                {siteConfig.links.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
