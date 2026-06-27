# Gateway — Federation Sample 32

Apollo Gateway composing schema-first subgraphs on **:3000** (users) and **:3001** (posts).

## Quick start

Start both subgraphs first.

```bash
cd sample/32-graphql-federation-schema-first/gateway
npm install
npm run start:dev
```

GraphQL: **http://localhost:3002/graphql**

---


<!-- CORE_INVENTORY_START -->
## Core elements inventory

> Generated from `gateway/src`. **Wired** = registered in a module or applied globally. **Example** = present in code but not registered.

### Application type

| Property | Value |
| -------- | ----- |
| **Bootstrap** | `NestFactory.create(AppModule)` |
| **Kind** | HTTP server |
| **Entry file** | `main.ts` |
| **Port** | 3002 |

**Stack notes:** GraphQL endpoint enabled

### Modules (1)

| Module | Path | Imports | Controllers | Providers |
| ------ | ---- | ------- | ----------- | --------- |
| `AppModule` | `src/app.module.ts` | `GraphQLModule` | — | — |

### Controllers (0)

_None_

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

### Decorators used (2)

| Library | Decorators |
| ------- | ---------- |
| **@nestjs (@nestjs/common)** | `@Module` |
| **Unknown** | `@apollo` |

---
<!-- CORE_INVENTORY_END -->
## Structure

```
gateway/src/
├── main.ts
└── app.module.ts
```

Subgraph URLs:

- `users` → `http://localhost:3000/graphql`
- `posts` → `http://localhost:3001/graphql`

---

## Decorator glossary (`@`)

| Decorator | Library  | Used on     |
| --------- | -------- | ----------- |
| `@Module` | **NestJS** | `AppModule` |

No resolvers — gateway composes federated schema only.
