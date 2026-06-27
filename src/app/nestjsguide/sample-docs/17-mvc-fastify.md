# 17-mvc-fastify — NestJS Sample

**Server-side rendering** with **Fastify** and **Handlebars** — the Fastify counterpart to `15-mvc`.

## Quick start

```bash
cd sample/17-mvc-fastify
npm install
npm run start:dev
```

App listens on **http://localhost:3000** — renders `views/index.hbs`.

| Method | Path | Response        |
| ------ | ---- | --------------- |
| `GET`  | `/`  | HTML from template |

---


<!-- CORE_INVENTORY_START -->
## Core elements inventory

> Generated from `17-mvc-fastify/src`. **Wired** = registered in a module or applied globally. **Example** = present in code but not registered.

### Application type

| Property | Value |
| -------- | ----- |
| **Bootstrap** | `Unknown` |
| **Kind** | Unknown |
| **Entry file** | `main.ts` |
| **Port** | 3000 |

**Stack notes:** HTTP adapter: **Fastify**

### Modules (1)

| Module | Path | Imports | Controllers | Providers |
| ------ | ---- | ------- | ----------- | --------- |
| `AppModule` | `src/app.module.ts` | — | `AppController` | — |

### Controllers (1)

| Name | Path | Status |
| ---- | ---- | ------ |
| `AppController` | `src/app.controller.ts` | **Wired** |

### Providers / services (0)

_None_

### Guards (0)

_None_

### Interceptors (0)

_None_

### Pipes (0)

_None_

### Exception filters (0)

_None_

### Middleware (0)

_None_

### Decorators used (4)

| Library | Decorators |
| ------- | ---------- |
| **@nestjs (@nestjs/common)** | `@Controller`, `@Get`, `@Module`, `@Render` |

---
<!-- CORE_INVENTORY_END -->
## Project structure

```
sample/17-mvc-fastify/
├── src/
│   ├── main.ts                       # FastifyAdapter + @fastify/view
│   ├── app.module.ts
│   └── app.controller.ts
├── views/
│   └── index.hbs
└── public/
```

---

## How the app boots

```mermaid
flowchart TD
    A[main.ts] -->|FastifyAdapter| B[AppModule]
    B --> C[AppController]
    A -->|register fastifyStatic| D[/public/]
    A -->|register fastifyView handlebars| E[views/index.hbs]
    C -->|@Render index| E
```

Fastify plugins registered in `main.ts`:

- `@fastify/static` — serves `public/` at `/public/`
- `@fastify/view` — Handlebars engine for `.hbs` files

---

## Module graph

| Component       | Origin   | Role                    |
| --------------- | -------- | ----------------------- |
| `AppModule`     | **User** | Root                    |
| `AppController` | **User** | `@Render('index')` route|

---

## Decorator glossary (`@`)

| Decorator          | Library  | Used on     | Purpose              |
| ------------------ | -------- | ----------- | -------------------- |
| `@Module`          | **NestJS** | Module    | Module declaration   |
| `@Controller`      | **NestJS** | Controller| HTTP controller      |
| `@Get`             | **NestJS** | `root`    | GET `/`              |
| `@Render('index')` | **NestJS** | `root`    | Render Handlebars view |

**User-created decorators:** none.

---

## vs sample 15-mvc

| Aspect   | 15-mvc (Express)              | 17-mvc-fastify                |
| -------- | ----------------------------- | ----------------------------- |
| Adapter  | `NestExpressApplication`      | `FastifyAdapter`              |
| Views    | `setViewEngine('hbs')`        | `@fastify/view` + handlebars  |
| Static   | `useStaticAssets`             | `@fastify/static`             |

---

## Dependencies

`@nestjs/platform-fastify`, `@fastify/static`, `@fastify/view`, `handlebars`
