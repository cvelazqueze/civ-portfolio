import type { ProjectCaseStudy } from "@/types";

export const projects: ProjectCaseStudy[] = [
  {
    slug: "bookamenities",
    title: "Scheduler — Shared Space Booking",
    summary:
      "Production web app for booking shared amenities and rooms: monthly calendar, whole-day reservations, multi-amenity selection, conflict prevention, and admin-controlled access — live at bookamenities.com.",
    role: "Full Stack Engineer — product UX, booking logic, auth API, admin workflows",
    complexity: "production",
    category: "fullstack",
    architecture: [
      "React SPA (Vite) with dashboard and admin surfaces",
      "Express authentication API with session-based access control",
      "Client-side booking domain with conflict detection per amenity/date",
      "Admin approval gate for new user signups",
    ],
    stack: [
      { name: "React", category: "frontend" },
      { name: "TypeScript", category: "frontend" },
      { name: "Vite", category: "frontend" },
      { name: "Tailwind CSS", category: "frontend" },
      { name: "Express", category: "backend" },
      { name: "Argon2", category: "backend" },
    ],
    liveUrl: "https://bookamenities.com",
    featured: true,
    problem:
      "Communities and property managers need a simple way to reserve shared spaces (amenities, rooms) without double-booking the same resource on the same day.",
    decisions: [
      "Whole-day bookings only (Mon–Sun monthly view) to match real amenity usage, not hourly complexity",
      "Multi-amenity selection per reservation with per-amenity conflict checks",
      "Spanish-first booking form with validation and sensible optional fields",
      "Split persistence: server DB for identity/auth, localStorage for bookings until full backend migration",
    ],
    backendDesign: [
      "Express auth service with session cookies and Argon2 password hashing",
      "Signup creates pending users; login restricted to admin-approved active accounts",
      "Auth tables persisted in server database; booking/amenity CRUD currently client-side",
    ],
    apiStructure: [
      "Session-based auth endpoints (signup, login, logout, session check)",
      "User lifecycle: pending → active (admin approval required)",
      "Future-ready separation between auth API and booking domain",
    ],
    databaseDesign: [
      "Server: user/auth tables (sessions, credentials, approval status)",
      "Client (today): bookings and amenities in browser localStorage",
      "Conflict model: unique (amenityId, date) enforced in application layer",
    ],
    scalability: [
      "Clear path to move bookings/amenities from localStorage to server persistence",
      "Conflict rules already centralized for extraction into API transactions",
      "Static frontend deployable to CDN; auth API scales independently",
    ],
    authentication: [
      "Express sessions with HTTP-only cookies",
      "Argon2 password hashing (no plaintext storage)",
      "Admin-gated signup: pending users cannot log in until approved",
    ],
    deployment: [
      "Production frontend at bookamenities.com",
      "Express auth API deployed alongside SPA",
      "Tailwind-based UI shipped as optimized Vite build",
    ],
    challenges: [
      "Dual persistence model (auth on server, bookings local) requires careful UX around data portability",
      "Whole-day conflict logic must stay correct when multiple amenities are selected in one form",
      "Bilingual/Spanish form copy with validation messages that remain accessible",
    ],
    lessons: [
      "Ship a focused scheduling product before adding hourly slots or payment complexity",
      "Auth and domain data can evolve on different timelines if boundaries are explicit early",
      "Admin approval workflows are cheap to build and prevent abuse on shared-space apps",
    ],
  },
  {
    slug: "vasectominfo",
    title: "VasectomInfo — Evidence-Based Health Education",
    summary:
      "Production bilingual (EN/ES) education platform that explains vasectomy clearly—myths vs. reality, procedure steps, recovery, Mexico & U.S. access, and FAQs—without fear-based messaging.",
    role: "Full Stack Engineer — information architecture, UI, content structure, i18n",
    complexity: "production",
    category: "frontend",
    architecture: [
      "Long-form educational sections with scannable myth/reality patterns",
      "Bilingual navigation (EN/ES) across the full content surface",
      "Structured procedure timeline and recovery calendar components",
      "CMS-ready testimonials and clinic finder placeholders for future integration",
    ],
    stack: [
      { name: "React", category: "frontend" },
      { name: "TypeScript", category: "frontend" },
      { name: "Tailwind CSS", category: "frontend" },
      { name: "Next.js", category: "frontend" },
    ],
    liveUrl: "https://www.vasectominfo.com",
    featured: true,
    problem:
      "Men and couples researching vasectomy encounter fear, myths, and fragmented medical information—especially across English and Spanish and between Mexico and U.S. healthcare systems.",
    decisions: [
      "Lead with calm, evidence-based copy—not alarmist or clinical jargon",
      "Dedicated myth vs. reality pattern so misconceptions are addressed directly",
      "Separate Mexico and U.S. pathways for insurance, IMSS, and access context",
      "Structure content for future headless CMS (testimonials, clinics) without blocking launch",
    ],
    backendDesign: [
      "Static-first content delivery optimized for SEO and fast global reads",
      "Reference sections linked to IMSS, Mayo Clinic, AUA, and gob.mx sources",
      "Clinic search and maps planned as phased integration—not fake data at launch",
    ],
    apiStructure: [
      "Public educational routes; no PHI or user medical data collected",
      "Future: provider directory API and CMS webhooks for testimonials/clinics",
    ],
    databaseDesign: [
      "Launch: content as structured front-end modules",
      "Planned: headless CMS for localized pages, FAQs, and clinic listings",
    ],
    scalability: [
      "CDN-friendly static generation for high-traffic informational queries",
      "i18n keys structured for additional locales beyond EN/ES",
      "Print/share utilities for consultation prep without extra backend load",
    ],
    deployment: [
      "Production at vasectominfo.com",
      "Educational disclaimer and medical-reference footer on every major section",
    ],
    challenges: [
      "Presenting sensitive health topics accessibly without oversimplifying risks",
      "Balancing Mexico (IMSS/public) and U.S. (insurance/FQHC) content without overwhelming readers",
      "Keeping legal/educational disclaimers visible without breaking reading flow",
    ],
    lessons: [
      "Health education products need emotional design as much as medical accuracy",
      "Myth-busting UI patterns reduce anxiety better than long unstructured articles",
      "Ship credible references and clear non-medical-advice boundaries from day one",
    ],
  },
  {
    slug: "simple-react-tutorial",
    title: "Simple React — Interactive Learning Surface",
    summary:
      "Production-grade interactive tutorial that teaches React fundamentals through live examples, progressive disclosure, and accessible UI patterns.",
    role: "Frontend Engineer — UX, component architecture, content structure",
    complexity: "medium",
    category: "frontend",
    architecture: [
      "Lesson-driven routing with isolated example sandboxes",
      "Composable demo components with shared theme tokens",
      "Progressive enhancement for mobile learners",
    ],
    stack: [
      { name: "React", category: "frontend" },
      { name: "Vite", category: "frontend" },
      { name: "CSS Modules", category: "frontend" },
    ],
    liveUrl: "https://simple-react-tutorial.vercel.app",
    githubUrl: "https://github.com/cvelazqueze/simple-react-tutorial",
    featured: true,
    problem:
      "Developers learning React need guided, runnable examples—not walls of static documentation.",
    decisions: [
      "Each lesson maps to a self-contained example module",
      "Minimal global state; examples demonstrate local patterns first",
      "Dark-first UI tuned for long reading sessions",
    ],
    backendDesign: ["Static deployment — no server state required"],
    apiStructure: ["N/A — client-only educational product"],
    databaseDesign: ["N/A"],
    scalability: [
      "CDN-cached static assets",
      "Code-split per lesson route",
    ],
    deployment: [
      "Vercel edge deployment",
      "Automated preview deployments per PR",
    ],
    challenges: [
      "Balancing simplicity in examples with realistic patterns",
      "Keeping bundle size low across many interactive demos",
    ],
    lessons: [
      "Teaching products benefit from strict visual hierarchy and predictable navigation",
      "Interactive learning surfaces are frontend architecture problems, not just content",
    ],
  },
  {
    slug: "portfolio-platform",
    title: "Engineering Portfolio Platform",
    summary:
      "This site — a production portfolio with API playground, GitHub integration, MDX engineering notes, and AI showcase sections built as a cohesive product.",
    role: "Full Stack Engineer — system design, UI platform, integrations",
    complexity: "production",
    category: "fullstack",
    architecture: [
      "Feature-based Next.js App Router modules",
      "Server actions + route handlers for integrations",
      "Prisma data layer for contact and telemetry",
      "Command palette + global search UX",
    ],
    stack: [
      { name: "Next.js", category: "frontend" },
      { name: "TypeScript", category: "backend" },
      { name: "Prisma", category: "data" },
      { name: "PostgreSQL", category: "data" },
      { name: "Framer Motion", category: "frontend" },
      { name: "OpenAI", category: "ai" },
    ],
    githubUrl: "https://github.com/cvelazqueze/civ-portfolio",
    featured: true,
    problem:
      "Traditional portfolios fail to communicate backend depth, system design, and AI-native engineering workflows.",
    decisions: [
      "Single-page narrative with deep-dive case study routes",
      "Interactive backend playground as credibility signal",
      "MDX blog for long-form engineering notes",
    ],
    backendDesign: [
      "Route handlers for GitHub proxy and API playground",
      "Zod-validated contact pipeline with Prisma persistence",
      "Optional OpenAI route for semantic search demo",
    ],
    apiStructure: [
      "/api/github — cached GitHub profile stats",
      "/api/playground — mock REST surface with latency simulation",
      "/api/contact — form submission with validation",
    ],
    databaseDesign: [
      "ContactMessage for inbound leads",
      "PlaygroundLog for demo request telemetry",
    ],
    scalability: [
      "Edge-cached GitHub responses",
      "Static generation for blog posts",
      "Lazy-loaded feature sections",
    ],
    authentication: ["Public read; write endpoints rate-limited"],
    deployment: ["Vercel with PostgreSQL (Neon/Supabase compatible)"],
    aiIntegrations: [
      "Embeddings demo for engineering notes search",
      "Prompt pipeline visualization in AI showcase",
    ],
    challenges: [
      "Balancing rich interactivity with Core Web Vitals",
      "Designing recruiter-friendly depth without template aesthetics",
    ],
    lessons: [
      "Treat your portfolio as a product with IA, not a slide deck of projects",
      "Backend credibility needs interaction, not bullet lists",
    ],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export const featuredProjects = projects.filter((p) => p.featured);
