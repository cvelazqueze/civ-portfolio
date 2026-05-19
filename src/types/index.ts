export type Complexity = "high" | "medium" | "production";

export type ProjectCategory =
  | "fullstack"
  | "backend"
  | "frontend"
  | "ai"
  | "infrastructure";

export interface TechStackItem {
  name: string;
  category?: "backend" | "frontend" | "infra" | "ai" | "data";
}

export interface ProjectCaseStudy {
  slug: string;
  title: string;
  summary: string;
  role: string;
  complexity: Complexity;
  category: ProjectCategory;
  architecture: string[];
  stack: TechStackItem[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  problem: string;
  decisions: string[];
  backendDesign: string[];
  apiStructure: string[];
  databaseDesign: string[];
  scalability: string[];
  authentication?: string[];
  deployment: string[];
  aiIntegrations?: string[];
  challenges: string[];
  lessons: string[];
}

export interface SkillItem {
  name: string;
  level: "expert" | "advanced" | "proficient" | "growing";
  note?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  skills: SkillItem[];
}

export interface AIProject {
  id: string;
  title: string;
  summary: string;
  capabilities: string[];
  stack: string[];
  demoType: "embeddings" | "pipeline" | "copilot" | "search";
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readingTime: string;
}
