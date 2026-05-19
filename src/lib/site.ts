export const siteConfig = {
  name: "César Velázquez",
  title: "César Velázquez — Full Stack Engineer",
  description:
    "Backend-focused full stack engineer building scalable products, production APIs, and AI-native developer experiences.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://cesarvelazquez.dev",
  author: "César Velázquez",
  role: "Full Stack Engineer",
  tagline: "Backend depth. Modern frontend. AI-native workflows.",
  links: {
    github: "https://github.com/cvelazqueze",
    linkedin: "https://www.linkedin.com/in/cesarvelazqueze/",
    email: "ing.cesarvelazquez@gmail.com",
  },
  githubUsername: "cvelazqueze",
} as const;

export const navSections = [
  { id: "hero", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "backend", label: "Backend" },
  { id: "ai", label: "AI" },
  { id: "github", label: "GitHub" },
  { id: "blog", label: "Notes" },
  { id: "contact", label: "Contact" },
] as const;
