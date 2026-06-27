# 33-graphql-mercurius — NestJS Sample

**Code-first GraphQL** on **Fastify** using the **Mercurius** driver (not Apollo/Express). Queries, mutations, subscriptions, GraphiQL, and a custom `Date` scalar.

## Quick start

```bash
cd sample/33-graphql-mercurius
npm install
npm run start:dev
```

GraphQL / GraphiQL: **http://localhost:3000/graphql**

Generated schema: `schema.gql`

---


<!-- CORE_INVENTORY_START -->
## Core elements inventory

> Generated from `33-graphql-mercurius/src`. **Wired** = registered in a module or applied globally. **Example** = present in code but not registered.

### Application type

| Property | Value |
| -------- | ----- |
| **Bootstrap** | `NestFactory.create(AppModule, new FastifyAdapter())` |
| **Kind** | HTTP server |
| **Entry file** | `main.ts` |
| **Port** | 3000 |

**Stack notes:** HTTP adapter: **Fastify** · GraphQL endpoint enabled

**Global setup (`main.ts`):** `ValidationPipe` (global, `@nestjs/common`)

### Modules (2)

| Module | Path | Imports | Controllers | Providers |
| ------ | ---- | ------- | ----------- | --------- |
| `AppModule` | `src/app.module.ts` | `RecipesModule`, `GraphQLModule` | — | — |
| `RecipesModule` | `src/recipes/recipes.module.ts` | — | — | `RecipesResolver` |

### Controllers (0)

_None_

### GraphQL resolvers (1)

| Name | Path | Status |
| ---- | ---- | ------ |
| `RecipesResolver` | `src/recipes/recipes.resolver.ts` | **Wired** |

### Providers / services (1)

| Name | Path | Status |
| ---- | ---- | ------ |
| `RecipesService` | `src/recipes/recipes.service.ts` | Example (not registered) |

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

### Decorators used (18)

| Library | Decorators |
| ------- | ---------- |
| **@nestjs (@nestjs/common)** | `@Injectable`, `@Module` |
| **@nestjs (@nestjs/graphql)** | `@Args`, `@ArgsType`, `@Context`, `@Field`, `@InputType`, `@Mutation`, `@ObjectType`, `@Query`, `@Resolver`, `@Scalar`, `@Subscription` |
| **class-validator** | `@IsOptional`, `@Length`, `@Max`, `@MaxLength`, `@Min` |

---
<!-- CORE_INVENTORY_END -->
## Project structure

```
sample/33-graphql-mercurius/
├── src/
│   ├── main.ts                       # FastifyAdapter
│   ├── app.module.ts                 # MercuriusDriver
│   ├── recipes/
│   │   ├── recipes.module.ts
│   │   ├── recipes.resolver.ts
│   │   ├── recipes.service.ts       # MOCK data
│   │   ├── models/recipe.model.ts
│   │   └── dto/
│   └── common/scalars/date.scalar.ts
└── schema.gql
```

---

## How the app boots

```mermaid
flowchart TD
    A[main.ts FastifyAdapter] --> B[AppModule]
    B -->|GraphQLModule MercuriusDriver| C[/graphql graphiql]
    B --> D[RecipesModule]
    D --> E[RecipesResolver]
    D --> F[RecipesService MOCK]
    D --> G[DateScalar]
```

Mercurius config: `autoSchemaFile`, `subscription: true`, `graphiql: true`.

---

## Module graph

| Component         | Origin   | Role                    |
| ----------------- | -------- | ----------------------- |
| `RecipesResolver` | **User** | GraphQL operations      |
| `RecipesService`  | **User** | Mock — no real DB       |
| `DateScalar`      | **User** | Custom Date scalar      |

Subscriptions use `@Context('pubsub')` for Mercurius PubSub (not constructor DI).

---

## Decorator glossary (`@`)

### NestJS GraphQL

| Decorator        | Used on              |
| ---------------- | -------------------- |
| `@Module`        | Modules              |
| `@Resolver`      | `RecipesResolver`    |
| `@Query`, `@Mutation`, `@Subscription` | Handlers |
| `@Args`, `@Context`, `@Field`, `@ObjectType`, `@InputType`, `@ArgsType` | Schema |
| `@Scalar('Date', () => Date)` | `DateScalar` |
| `@Injectable`    | Services, scalar     |

### class-validator

`@Min`, `@Max`, `@MaxLength`, `@Length`, `@IsOptional` on DTOs.

**User-created decorators:** none.

---

## vs sample 23 (Apollo + Express)

| Aspect   | 23 code-first Apollo | 33 Mercurius        |
| -------- | -------------------- | ------------------- |
| HTTP     | Express              | Fastify             |
| Driver   | `ApolloDriver`       | `MercuriusDriver`   |
| Subscriptions context | PubSub module | `@Context('pubsub')` |

---

## Dependencies

`@nestjs/mercurius`, `@nestjs/platform-fastify`, `mercurius`, `graphql`, `class-validator`
