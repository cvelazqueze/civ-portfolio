import type { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    id: "backend",
    title: "Backend",
    description: "APIs, data modeling, and production service design",
    icon: "server",
    skills: [
      { name: "Node.js", level: "advanced" },
      { name: "TypeScript", level: "advanced" },
      { name: "PostgreSQL", level: "advanced" },
      { name: "Prisma", level: "advanced" },
      { name: "REST API Design", level: "advanced" },
      { name: "Authentication & Sessions", level: "proficient" },
      { name: "Message Queues", level: "proficient", note: "Bull, event patterns" },
      { name: "Caching Strategies", level: "proficient" },
      { name: "AWS Concepts", level: "proficient", note: "ECS, S3, RDS, IAM" },
      { name: "System Design", level: "growing", note: "Active focus area" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    description: "Modern React surfaces with performance and accessibility",
    icon: "layout",
    skills: [
      { name: "React", level: "advanced" },
      { name: "Next.js App Router", level: "advanced" },
      { name: "Tailwind CSS", level: "advanced" },
      { name: "State Management", level: "proficient", note: "Zustand, React Query" },
      { name: "Responsive Design", level: "advanced" },
      { name: "Accessibility", level: "proficient" },
      { name: "Framer Motion", level: "proficient" },
      { name: "Component Architecture", level: "growing" },
    ],
  },
  {
    id: "ai",
    title: "AI / Automation",
    description: "Practical AI integration in real product workflows",
    icon: "sparkles",
    skills: [
      { name: "OpenAI APIs", level: "proficient" },
      { name: "AI Workflows", level: "proficient" },
      { name: "Prompt Engineering", level: "proficient" },
      { name: "Embeddings", level: "proficient" },
      { name: "RAG Patterns", level: "growing" },
      { name: "AI-Assisted Tooling", level: "advanced", note: "Cursor, agentic dev" },
    ],
  },
  {
    id: "devops",
    title: "DevOps / Infra",
    description: "Shipping, observing, and operating production systems",
    icon: "cloud",
    skills: [
      { name: "Docker", level: "proficient" },
      { name: "CI/CD", level: "proficient" },
      { name: "Vercel", level: "advanced" },
      { name: "Monitoring", level: "proficient" },
      { name: "Structured Logging", level: "proficient" },
    ],
  },
];

export const levelLabels = {
  expert: "Production lead",
  advanced: "Ship independently",
  proficient: "Production-ready",
  growing: "Expanding depth",
} as const;
