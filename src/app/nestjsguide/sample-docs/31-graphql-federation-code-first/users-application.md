# Users Application — Federation Sample 31

**Users subgraph** — owns the `User` entity with `@key(fields: "id")`.

## Quick start

```bash
cd sample/31-graphql-federation-code-first/users-application
npm install
npm run start:dev
```

GraphQL: **http://localhost:3002/graphql**

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
| **Port** | 3002 |

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

### Decorators used (10)

| Library | Decorators |
| ------- | ---------- |
| **@nestjs (@nestjs/common)** | `@Injectable`, `@Module` |
| **@nestjs (@nestjs/graphql)** | `@Args`, `@Directive`, `@Field`, `@ObjectType`, `@Query`, `@ResolveReference`, `@Resolver` |
| **Unknown** | `@apollo` |

---
<!-- CORE_INVENTORY_END -->
## Project structure

```
users-application/
└── src/
    ├── main.ts
    ├── app.module.ts
    └── users/
        ├── users.module.ts
        ├── users.resolver.ts
        ├── users.service.ts
        └── models/user.model.ts
```

---

## Module graph

| Component       | Origin   | Role                          |
| --------------- | -------- | ----------------------------- |
| `AppModule`     | **User** | Imports `UsersModule`         |
| `UsersModule`   | **User** | GraphQL federation driver + providers |
| `UsersResolver` | **User** | `getUser` query + reference resolution |
| `UsersService`  | **User** | In-memory users               |

```mermaid
flowchart LR
    UR[UsersResolver] --> US[UsersService]
    UR -->|@ResolveReference| Ref[Federation entity lookup]
```

---

## Resolver methods

| Method               | Decorator            | Purpose                    |
| -------------------- | -------------------- | -------------------------- |
| `getUser(id)`        | `@Query`             | Direct query               |
| `resolveReference()` | `@ResolveReference`  | Load User by federation key|

---

## Decorator glossary (`@`)

| Decorator              | Library  | Used on              |
| ---------------------- | -------- | -------------------- |
| `@Module`              | **NestJS** | Modules            |
| `@Resolver(of => User)`| **NestJS** | `UsersResolver`    |
| `@Query`               | **NestJS** | `getUser`          |
| `@ResolveReference`    | **NestJS** | `resolveReference` |
| `@Args`                | **NestJS** | Query parameter    |
| `@ObjectType`, `@Field`| **NestJS** | `User` model       |
| `@Directive('@key(fields: "id")')` | **Apollo Federation** | `User` |
| `@Injectable`          | **NestJS** | `UsersService`     |

**User-created decorators:** none.

---

## Dependencies

`@nestjs/graphql`, `@nestjs/apollo`, `@apollo/server`
