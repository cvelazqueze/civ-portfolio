"use client";

import { motion } from "framer-motion";
import { Bot, GitBranch, Search, Sparkles } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/layout/section-heading";
import { aiProjects } from "@/data/ai-projects";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";

const demoIcons = {
  embeddings: Search,
  pipeline: GitBranch,
  copilot: Bot,
  search: Sparkles,
};

const pipelineStages = [
  { stage: "Context", detail: "Inject user profile + session metadata" },
  { stage: "Prompt", detail: "Structured template with guardrails" },
  { stage: "Model", detail: "gpt-4o-mini with temperature 0.2" },
  { stage: "Validate", detail: "Zod schema parse + fallback response" },
  { stage: "Deliver", detail: "Stream to UI with citation anchors" },
];

export function AIShowcaseSection() {
  const [activeStage, setActiveStage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const runSemanticSearch = () => {
    const corpus = [
      "Designing idempotent notification dispatch",
      "Prisma migration strategies for zero-downtime deploys",
      "RAG chunking patterns for engineering documentation",
      "Next.js server/client boundary best practices",
    ];
    const q = searchQuery.toLowerCase();
    setSearchResults(
      corpus
        .filter(
          (doc) =>
            q.length === 0 ||
            doc.toLowerCase().includes(q) ||
            q.split(" ").some((w) => doc.toLowerCase().includes(w))
        )
        .slice(0, 3)
    );
  };

  return (
    <section id="ai" className="section-padding border-t border-border/40">
      <div className="section-container">
        <SectionHeading
          eyebrow="AI Engineering"
          title="AI-native workflows in production"
          description="Practical integrations—not demos for demos' sake. Embeddings, structured pipelines, and developer tooling that ships with the product."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-2"
        >
          {aiProjects.map((project, i) => {
            const Icon = demoIcons[project.demoType];
            return (
              <motion.div
                key={project.id}
                variants={fadeUp}
                custom={i}
                className="glass-panel p-6"
              >
                <Icon className="h-5 w-5 text-primary" />
                <h3 className="mt-4 text-lg font-semibold">{project.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {project.summary}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.capabilities.map((cap) => (
                    <Badge key={cap} variant="outline">
                      {cap}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="glass-panel p-6">
            <h3 className="font-mono text-sm text-primary">
              Prompt pipeline simulator
            </h3>
            <div className="mt-4 space-y-2">
              {pipelineStages.map((item, index) => (
                <button
                  key={item.stage}
                  type="button"
                  onClick={() => setActiveStage(index)}
                  className={cn(
                    "w-full rounded-lg border px-4 py-3 text-left transition-colors",
                    activeStage === index
                      ? "border-primary/40 bg-primary/5"
                      : "border-border/60 hover:bg-muted/30"
                  )}
                >
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="ml-2 font-medium">{item.stage}</span>
                  {activeStage === index && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      {item.detail}
                    </p>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="glass-panel p-6">
            <h3 className="font-mono text-sm text-primary">
              Semantic search demo
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Query engineering notes (client-side fuzzy demo; production uses
              embeddings + vector store).
            </p>
            <div className="mt-4 flex gap-2">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && runSemanticSearch()}
                placeholder="e.g. prisma migrations"
                className="flex-1 rounded-lg border border-border bg-muted/30 px-3 py-2 font-mono text-sm outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                type="button"
                onClick={runSemanticSearch}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
              >
                Search
              </button>
            </div>
            <ul className="mt-4 space-y-2">
              {searchResults.length === 0 ? (
                <li className="font-mono text-xs text-muted-foreground">
                  {"// Results appear here"}
                </li>
              ) : (
                searchResults.map((r) => (
                  <li
                    key={r}
                    className="rounded-lg border border-border/60 bg-muted/20 px-3 py-2 text-sm"
                  >
                    {r}
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
