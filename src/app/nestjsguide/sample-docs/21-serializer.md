# 21-serializer — NestJS Sample

**Response serialization** with `class-transformer` and Nest's **`ClassSerializerInterceptor`**. Demonstrates `@Exclude`, `@Expose`, and `@Transform` on entity classes.

## Quick start

```bash
cd sample/21-serializer
npm install
npm run start:dev
```

App listens on **http://localhost:3000**.

| Method | Path | Response (serialized) |
| ------ | ---- | --------------------- |
| `GET`  | `/`  | User without `password`; `fullName` exposed; `role` as string |

Example JSON shape:

```json
{
  "id": 1,
  "firstName": "Kamil",
  "lastName": "Mysliwiec",
  "fullName": "Kamil Mysliwiec",
  "role": "admin"
}
```

---


<!-- CORE_INVENTORY_START -->
## Core elements inventory

> Generated from `21-serializer/src`. **Wired** = registered in a module or applied globally. **Example** = present in code but not registered.

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

### Decorators used (7)

| Library | Decorators |
| ------- | ---------- |
| **@nestjs (@nestjs/common)** | `@Controller`, `@Get`, `@Module`, `@UseInterceptors` |
| **class-transformer** | `@Exclude`, `@Expose`, `@Transform` |

---
<!-- CORE_INVENTORY_END -->
## Project structure

```
sample/21-serializer/
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── app.controller.ts
│   └── entities/
│       ├── user.entity.ts
│       └── role.entity.ts
```

---

## How the app boots

```mermaid
flowchart TD
    A[main.ts] --> B[AppModule]
    B --> C[AppController]
    C -->|@UseInterceptors ClassSerializerInterceptor| D[GET /]
    D --> E[UserEntity instance]
    E -->|class-transformer rules| F[Filtered JSON]
```

---

## Entity transformation rules

| Field / property | Decorator    | Library           | Effect                          |
| ---------------- | ------------ | ----------------- | ------------------------------- |
| `password`       | `@Exclude()` | **class-transformer** | Omitted from response       |
| `fullName`       | `@Expose()` getter | **class-transformer** | Computed field in output |
| `role`           | `@Transform(...)` | **class-transformer** | `{ id, name }` → `"admin"` |

`AppController` returns `new UserEntity({ ... })` — serialization runs on class instances.

---

## Decorator glossary (`@`)

### NestJS

| Decorator                                      | Used on      | Purpose                |
| ---------------------------------------------- | ------------ | ---------------------- |
| `@Module`                                      | `AppModule`  | Module declaration     |
| `@Controller`                                  | Controller   | HTTP controller        |
| `@Get`                                         | `findOne`    | GET `/`                |
| `@UseInterceptors(ClassSerializerInterceptor)` | Controller   | Applies serialization  |

### class-transformer (third-party)

| Decorator     | Used on `UserEntity`     |
| ------------- | -------------------------- |
| `@Exclude`    | `password`                 |
| `@Expose`     | `fullName` getter          |
| `@Transform`  | `role` → role name string  |

**User-created decorators:** none.

---

## Dependencies

`class-transformer`
