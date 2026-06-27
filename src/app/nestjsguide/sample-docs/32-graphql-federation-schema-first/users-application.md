# Users Application — Federation Sample 32

Schema-first **users subgraph** — SDL in `users.graphql`, resolvers use string names.

## Quick start

```bash
cd sample/32-graphql-federation-schema-first/users-application
npm install
npm run start:dev
```

GraphQL: **http://localhost:3000/graphql**

---


<!-- CORE_INVENTORY_START -->
## Core elements inventory

> Generated from `users-application/src`. **Wired** = registered in a module or applied globally. **Example** = present in code but not registered.

### Application type

| Property | Value |
| -------- | ----- |
| **Bootstrap** | `NestFactory.create(AppModule)` |
| **Kind** | HTTP server |
| **Entry file** | `main.ts` |
| **Port** | 3000 |

**Stack notes:** GraphQL endpoint enabled

### Modules (2)

| Module | Path | Imports | Controllers | Providers |
| ------ | ---- | ------- | ----------- | --------- |
| `AppModule` | `src/app.module.ts` | `UsersModule` | — | — |
| `UsersModule` | `src/users/users.module.ts` | `GraphQLModule` | — | `UsersResolver` |

### Controllers (0)

_None_

### GraphQL resolvers (1)

| Name | Path | Status |
| ---- | ---- | ------ |
| `UsersResolver` | `src/users/users.resolver.ts` | **Wired** |

### Providers / services (1)

| Name | Path | Status |
| ---- | ---- | ------ |
| `UsersService` | `src/users/users.service.ts` | Example (not registered) |

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

### Decorators used (9)

| Library | Decorators |
| ------- | ---------- |
| **@nestjs (@nestjs/common)** | `@Injectable`, `@Module` |
| **@nestjs (@nestjs/graphql)** | `@Args`, `@Directive`, `@Field`, `@ObjectType`, `@Query`, `@ResolveReference`, `@Resolver` |

---
<!-- CORE_INVENTORY_END -->
## Project structure

```
users-application/src/
├── main.ts
├── app.module.ts
└── users/
    ├── users.module.ts
    ├── users.graphql
    ├── users.resolver.ts
    ├── users.service.ts
    └── models/user.model.ts
```

GraphQL config: `typePaths: ['**/*.graphql']`

---

## SDL (users.graphql)

```graphql
type User @key(fields: "id") {
  id: ID!
  name: String!
}
type Query {
  getUser(id: ID!): User
}
```

---

## Resolver methods

| Method               | Decorator                 | Purpose           |
| -------------------- | ------------------------- | ----------------- |
| `getUser()`          | `@Query('getUser')`       | Query from SDL    |
| `resolveReference()` | `@ResolveReference()`     | Federation lookup |

---

## Decorator glossary (`@`)

| Decorator              | Library  | Used on              |
| ---------------------- | -------- | -------------------- |
| `@Module`              | **NestJS** | Modules            |
| `@Resolver('User')`    | **NestJS** | `UsersResolver`    |
| `@Query('getUser')`    | **NestJS** | Handler            |
| `@ResolveReference`    | **NestJS** | Federation         |
| `@Directive('@key')`   | **Apollo Federation** | Model class |

**User-created decorators:** none.
