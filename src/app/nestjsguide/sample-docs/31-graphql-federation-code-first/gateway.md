# Gateway — Federation Sample 31

Apollo **Gateway** that composes the users and posts subgraphs via `IntrospectAndCompose`.

## Quick start

Requires subgraphs running on **:3002** and **:3003** first.

```bash
cd sample/31-graphql-federation-code-first/gateway
npm install
npm run start:dev
```

GraphQL: **http://localhost:3001/graphql**

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
| **Port** | 3001 |

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
## Project structure

```
gateway/
└── src/
    ├── main.ts
    └── app.module.ts
```

---

## Module graph

| Component   | Origin   | Role                                      |
| ----------- | -------- | ----------------------------------------- |
| `AppModule` | **User** | `GraphQLModule` with `ApolloGatewayDriver` |

Subgraph URLs (in `app.module.ts`):

- `users` → `http://localhost:3002/graphql`
- `posts` → `http://localhost:3003/graphql`

---

## Decorator glossary (`@`)

| Decorator | Library  | Used on     |
| --------- | -------- | ----------- |
| `@Module` | **NestJS** | `AppModule` |

No resolvers in the gateway — composition only.

---

## Dependencies

`@apollo/gateway`, `@nestjs/apollo`, `@nestjs/graphql`
