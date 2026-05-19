import type { AIProject } from "@/types";

export const aiProjects: AIProject[] = [
  {
    id: "semantic-notes",
    title: "Semantic Engineering Notes",
    summary:
      "Embedding-powered search across MDX engineering posts with relevance-ranked results and snippet highlighting.",
    capabilities: ["Embeddings", "Semantic search", "MDX content pipeline"],
    stack: ["OpenAI", "Next.js", "Vector similarity"],
    demoType: "embeddings",
  },
  {
    id: "prompt-pipeline",
    title: "Structured Prompt Pipeline",
    summary:
      "Multi-stage prompt workflow with validation, context injection, and output normalization for reliable AI responses.",
    capabilities: ["Prompt templates", "Guardrails", "Output parsing"],
    stack: ["OpenAI", "Zod", "TypeScript"],
    demoType: "pipeline",
  },
  {
    id: "dev-copilot",
    title: "Development Copilot Patterns",
    summary:
      "AI-assisted refactoring and codegen workflows integrated into day-to-day engineering with review checkpoints.",
    capabilities: ["Agentic workflows", "Code review assist", "Test scaffolding"],
    stack: ["Cursor", "OpenAI", "GitHub"],
    demoType: "copilot",
  },
  {
    id: "portfolio-search",
    title: "Portfolio Command Search",
    summary:
      "Global command palette with fuzzy navigation across projects, skills, blog posts, and API playground actions.",
    capabilities: ["Fuzzy search", "Keyboard UX", "Action routing"],
    stack: ["cmdk", "Zustand", "Next.js"],
    demoType: "search",
  },
];
