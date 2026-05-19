"use client";

import { useMutation } from "@tanstack/react-query";
import { Play, RotateCcw } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/layout/section-heading";
import { cn } from "@/lib/utils";

type PlaygroundMethod = "GET" | "POST";

interface PlaygroundResponse {
  status: number;
  latencyMs: number;
  headers: Record<string, string>;
  body: unknown;
}

const endpoints = [
  {
    id: "health",
    method: "GET" as const,
    path: "/api/playground/health",
    label: "Health check",
    description: "Service liveness & dependency status",
  },
  {
    id: "users",
    method: "GET" as const,
    path: "/api/playground/users",
    label: "List users",
    description: "Paginated user resource with cache headers",
  },
  {
    id: "notify",
    method: "POST" as const,
    path: "/api/playground/notify",
    label: "Dispatch notification",
    description: "Async job enqueue with idempotency key",
  },
];

export function BackendShowcaseSection() {
  const [selected, setSelected] = useState(endpoints[0]);
  const [response, setResponse] = useState<PlaygroundResponse | null>(null);

  const mutation = useMutation({
    mutationFn: async (endpoint: (typeof endpoints)[0]) => {
      const start = performance.now();
      const res = await fetch(endpoint.path, {
        method: endpoint.method,
        headers:
          endpoint.method === "POST"
            ? { "Content-Type": "application/json" }
            : undefined,
        body:
          endpoint.method === "POST"
            ? JSON.stringify({
                channel: "email",
                templateId: "welcome",
                idempotencyKey: `demo-${Date.now()}`,
              })
            : undefined,
      });
      const body = await res.json();
      return {
        status: res.status,
        latencyMs: Math.round(performance.now() - start),
        headers: Object.fromEntries(res.headers.entries()),
        body,
      } satisfies PlaygroundResponse;
    },
    onSuccess: setResponse,
  });

  return (
    <section id="backend" className="section-padding border-t border-border/40">
      <div className="section-container">
        <SectionHeading
          eyebrow="Backend Showcase"
          title="Live API playground"
          description="Execute real route handlers against this Next.js deployment. Inspect latency, headers, and structured responses—the way you'd debug production APIs."
        />

        <div className="grid gap-6 lg:grid-cols-5">
          <div className="space-y-2 lg:col-span-2">
            {endpoints.map((endpoint) => (
              <button
                key={endpoint.id}
                type="button"
                onClick={() => setSelected(endpoint)}
                className={cn(
                  "w-full rounded-xl border p-4 text-left transition-colors",
                  selected.id === endpoint.id
                    ? "border-primary/40 bg-primary/5"
                    : "border-border/60 bg-card/30 hover:border-border"
                )}
              >
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      endpoint.method === "GET" ? "outline" : "accent"
                    }
                  >
                    {endpoint.method}
                  </Badge>
                  <span className="font-mono text-xs">{endpoint.path}</span>
                </div>
                <p className="mt-2 text-sm font-medium">{endpoint.label}</p>
                <p className="text-xs text-muted-foreground">
                  {endpoint.description}
                </p>
              </button>
            ))}

            <div className="glass-panel mt-4 p-4 font-mono text-xs text-muted-foreground">
              <p className="text-primary">{"// Auth flow (demo)"}</p>
              <p className="mt-2">Client → API Gateway → JWT validate</p>
              <p>→ Service token → Worker queue → Provider</p>
            </div>
          </div>

          <div className="glass-panel lg:col-span-3">
            <div className="flex items-center justify-between border-b border-border/60 p-4">
              <div className="font-mono text-sm">
                <span
                  className={cn(
                    selected.method === "GET"
                      ? "text-accent"
                      : "text-primary"
                  )}
                >
                  {selected.method}
                </span>{" "}
                {selected.path}
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => mutation.mutate(selected)}
                  disabled={mutation.isPending}
                >
                  <Play className="h-3.5 w-3.5" />
                  {mutation.isPending ? "Running…" : "Send request"}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setResponse(null)}
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>

            <div className="grid min-h-[280px] grid-cols-1 md:grid-cols-2">
              <div className="border-b border-border/60 p-4 md:border-b-0 md:border-r">
                <p className="mb-2 font-mono text-xs text-muted-foreground">
                  Request
                </p>
                <pre className="overflow-x-auto rounded-lg bg-muted/40 p-3 font-mono text-xs">
                  {selected.method === "POST"
                    ? JSON.stringify(
                        {
                          channel: "email",
                          templateId: "welcome",
                          idempotencyKey: "demo-*",
                        },
                        null,
                        2
                      )
                    : "// No body"}
                </pre>
              </div>
              <div className="p-4">
                <p className="mb-2 font-mono text-xs text-muted-foreground">
                  Response
                  {response && (
                    <span className="ml-2 text-primary">
                      {response.status} · {response.latencyMs}ms
                    </span>
                  )}
                </p>
                <pre className="overflow-x-auto rounded-lg bg-muted/40 p-3 font-mono text-xs text-primary/90">
                  {response
                    ? JSON.stringify(response.body, null, 2)
                    : "// Hit Send request to inspect live handler output"}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
