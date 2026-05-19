# Portfolio Architecture

## Information Architecture

| Route | Purpose |
|-------|---------|
| `/` | Single-page product: Hero → Projects → Skills → Backend → AI → GitHub → Blog preview → Contact |
| `/projects/[slug]` | Full engineering case study (SSG) |
| `/blog` | MDX post index |
| `/blog/[slug]` | MDX article (SSG) |
| `/api/github` | Cached GitHub profile + repos |
| `/api/playground/*` | Live API demo handlers |
| `/api/contact` | Validated contact form → PostgreSQL |

**Global UX:** `⌘K` command palette, section anchors, dark-first design system.

## Folder Structure (feature-based)

```
src/
  app/                    # App Router pages + API routes
  components/
    ui/                   # shadcn primitives
    layout/               # Header, footer, command palette, section headings
    providers/            # React Query
  features/               # One folder per homepage section
    hero/
    projects/
    skills/
    backend-showcase/
    ai-showcase/
    github/
    blog/
    contact/
  data/                   # Typed static content (projects, skills, AI)
  lib/                    # site config, prisma, github, mdx, animations
  stores/                 # Zustand (command palette)
  types/
content/blog/             # MDX engineering notes
prisma/                   # Schema + migrations
```

## Design System

- **Colors:** HSL tokens in `globals.css` — deep navy background, teal primary, cyan accent
- **Typography:** Inter (UI) + JetBrains Mono (terminal, labels, code)
- **Surfaces:** `glass-panel`, subtle grid backgrounds, restrained glow
- **Motion:** Framer Motion stagger/fade — viewport-triggered, no infinite gimmicks

## Patterns

- **Server/client split:** MDX + metadata on server; interactive sections as `"use client"`
- **Data fetching:** React Query for GitHub; route handlers for playground + contact
- **Prisma 7:** PostgreSQL via `@prisma/adapter-pg` + lazy `getPrisma()` when `DATABASE_URL` is set
- **Content:** Case studies in TypeScript for type-safe project modals + SSG pages

## Deploy (Vercel)

1. Connect repo to Vercel
2. Set `DATABASE_URL`, optional `GITHUB_TOKEN`, `NEXT_PUBLIC_SITE_URL`
3. Run `yarn db:push` against production Postgres (Neon/Supabase)
4. Deploy — `postinstall` runs `prisma generate`
