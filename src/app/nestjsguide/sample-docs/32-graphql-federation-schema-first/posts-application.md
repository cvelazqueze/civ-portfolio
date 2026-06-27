# Posts Application — Federation Sample 32

Schema-first **posts subgraph** — extends `User` with `posts` per `posts.graphql`.

## Quick start

```bash
cd sample/32-graphql-federation-schema-first/posts-application
npm install
npm run start:dev
```

GraphQL: **http://localhost:3001/graphql**

---


<!-- CORE_INVENTORY_START -->
## Core elements inventory

> Generated from `posts-application/src`. **Wired** = registered in a module or applied globally. **Example** = present in code but not registered.

### Application type

| Property | Value |
| -------- | ----- |
| **Bootstrap** | `NestFactory.create(AppModule)` |
| **Kind** | HTTP server |
| **Entry file** | `main.ts` |
| **Port** | 3001 |

**Stack notes:** GraphQL endpoint enabled

### Modules (2)

| Module | Path | Imports | Controllers | Providers |
| ------ | ---- | ------- | ----------- | --------- |
| `AppModule` | `src/app.module.ts` | `PostsModule` | — | — |
| `PostsModule` | `src/posts/posts.module.ts` | `GraphQLModule` | — | `PostsService` |

### Controllers (0)

_None_

### GraphQL resolvers (2)

| Name | Path | Status |
| ---- | ---- | ------ |
| `PostsResolver` | `src/posts/posts.resolver.ts` | Example (not registered) |
| `UsersResolver` | `src/posts/users.resolver.ts` | Example (not registered) |

### Providers / services (1)

| Name | Path | Status |
| ---- | ---- | ------ |
| `PostsService` | `src/posts/posts.service.ts` | **Wired** |

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

### Decorators used (10)

| Library | Decorators |
| ------- | ---------- |
| **@nestjs (@nestjs/common)** | `@Injectable`, `@Module` |
| **@nestjs (@nestjs/graphql)** | `@Args`, `@Directive`, `@Field`, `@ObjectType`, `@Parent`, `@Query`, `@ResolveField`, `@Resolver` |

---
<!-- CORE_INVENTORY_END -->
## Project structure

```
posts-application/src/
├── main.ts
├── app.module.ts
└── posts/
    ├── posts.module.ts
    ├── posts.graphql
    ├── posts.resolver.ts
    ├── users.resolver.ts
    ├── posts.service.ts
    └── models/
        ├── post.model.ts
        └── user.model.ts
```

---

## Resolvers

| Class           | Decorator binding   | Role                    |
| --------------- | ------------------- | ----------------------- |
| `PostsResolver` | `@Resolver('Post')` | `getPosts`, `findPost`  |
| `UsersResolver` | `@Resolver('User')` | `@ResolveField('posts')`|

---

## Decorator glossary (`@`)

| Decorator                    | Library  | Used on              |
| ---------------------------- | -------- | -------------------- |
| `@Module`                    | **NestJS** | Modules            |
| `@Resolver('Post'/'User')`   | **NestJS** | Resolvers          |
| `@Query('getPosts')`, `@Query('findPost')` | **NestJS** | Queries |
| `@ResolveField('posts')`     | **NestJS** | User extension       |
| `@ResolveReference`          | **NestJS** | Post entity          |
| `@Directive('@key'/'@extends'/'@external')` | **Apollo Federation** | Models |

**User-created decorators:** none.

---

## Note

`posts.graphql` declares `body: String!` but mock data may omit it — sample uses in-memory stubs.
