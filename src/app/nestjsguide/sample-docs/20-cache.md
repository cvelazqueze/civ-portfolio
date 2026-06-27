# 20-cache — NestJS Sample

HTTP **response caching** with `@nestjs/cache-manager`. A 3-second delay on the first request demonstrates cache hits on subsequent calls.

## Quick start

```bash
cd sample/20-cache
npm install
npm run start:dev
```

App listens on **http://localhost:3000**.

| Method | Path | Description                          |
| ------ | ---- | ------------------------------------ |
| `GET`  | `/`  | Returns `[{ id: 1, name: 'Nest' }]` — first call slow, then cached |

---


<!-- CORE_INVENTORY_START -->
## Core elements inventory

> Generated from `20-cache/src`. **Wired** = registered in a module or applied globally. **Example** = present in code but not registered.

### Application type

| Property | Value |
| -------- | ----- |
| **Bootstrap** | `NestFactory.create(AppModule)` |
| **Kind** | HTTP server |
| **Entry file** | `main.ts` |
| **Port** | 3000 |

**Global setup (`main.ts`):** `ValidationPipe` (global, `@nestjs/common`)

### Modules (1)

| Module | Path | Imports | Controllers | Providers |
| ------ | ---- | ------- | ----------- | --------- |
| `AppModule` | `src/app.module.ts` | `CacheModule` | `AppController` | — |

### Controllers (1)

| Name | Path | Status |
| ---- | ---- | ------ |
| `AppController` | `src/app.controller.ts` | **Wired** |

### Providers / services (0)

_None_

### Guards (0)

_None_

### Interceptors (1)

| Name | Path | Status |
| ---- | ---- | ------ |
| `HttpCacheInterceptor` | `src/common/http-cache.interceptor.ts` | Example (not registered) |

### Pipes (0)

_None_

### Exception filters (0)

_None_

### Middleware (0)

_None_

### Decorators used (5)

| Library | Decorators |
| ------- | ---------- |
| **@nestjs (@nestjs/common)** | `@Controller`, `@Get`, `@Injectable`, `@Module`, `@UseInterceptors` |

---
<!-- CORE_INVENTORY_END -->
## Project structure

```
sample/20-cache/
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── app.controller.ts
│   └── common/
│       └── http-cache.interceptor.ts   # Example only — not wired
```

---

## How the app boots

```mermaid
flowchart TD
    A[main.ts] -->|global ValidationPipe| B[AppModule]
    B -->|CacheModule.register| C[Cache store]
    B --> D[AppController]
    D -->|@UseInterceptors CacheInterceptor| E[Cached GET /]
```

---

## Module graph

| Component            | Origin   | Role                              |
| -------------------- | -------- | --------------------------------- |
| `AppModule`          | **User** | Registers `CacheModule`           |
| `AppController`      | **User** | `@UseInterceptors(CacheInterceptor)` |
| `HttpCacheInterceptor` | **User** | Custom `trackBy` — **not wired** |

---

## Decorator glossary (`@`)

| Decorator                         | Library  | Used on           | Purpose                    |
| --------------------------------- | -------- | ------------------- | -------------------------- |
| `@Module`                         | **NestJS** | `AppModule`       | Module declaration         |
| `@Controller`                     | **NestJS** | `AppController`   | HTTP controller            |
| `@Get`                            | **NestJS** | `findAll`         | GET `/`                    |
| `@UseInterceptors(CacheInterceptor)` | **NestJS** + **@nestjs/cache-manager** | Controller | Caches responses |
| `@Injectable`                     | **NestJS** | `HttpCacheInterceptor` | Example subclass      |

**User-created decorators:** none.

---

## Mental model

1. **`CacheModule.register()`** provides cache store to the app.
2. **`CacheInterceptor`** (from `@nestjs/cache-manager`) caches handler return values by route key.
3. Custom interceptors can override **`trackBy()`** to control cache keys (see unused `HttpCacheInterceptor`).

---

## Dependencies

`@nestjs/cache-manager`, `cache-manager`
