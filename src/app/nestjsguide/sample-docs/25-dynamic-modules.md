# 25-dynamic-modules — NestJS Sample

Build a **custom dynamic module** with `ConfigModule.register(options)` — configurable at import time via a custom provider token and `@Inject`.

## Quick start

```bash
cd sample/25-dynamic-modules
npm install
npm run start:dev
```

App listens on **http://localhost:3000**.

| Method | Path | Response (from env file) |
| ------ | ---- | ------------------------ |
| `GET`  | `/`  | Message from `HELLO_MESSAGE` in `config/development.env` |

---


<!-- CORE_INVENTORY_START -->
## Core elements inventory

> Generated from `25-dynamic-modules/src`. **Wired** = registered in a module or applied globally. **Example** = present in code but not registered.

### Application type

| Property | Value |
| -------- | ----- |
| **Bootstrap** | `NestFactory.create(AppModule)` |
| **Kind** | HTTP server |
| **Entry file** | `main.ts` |
| **Port** | 3000 |

### Modules (2)

| Module | Path | Imports | Controllers | Providers |
| ------ | ---- | ------- | ----------- | --------- |
| `AppModule` | `src/app.module.ts` | `ConfigModule` | `AppController` | `AppService` |
| `ConfigModule` | `src/config/config.module.ts` | — | — | `options`, `ConfigService` |

### Controllers (1)

| Name | Path | Status |
| ---- | ---- | ------ |
| `AppController` | `src/app.controller.ts` | **Wired** |

### Providers / services (2)

| Name | Path | Status |
| ---- | ---- | ------ |
| `AppService` | `src/app.service.ts` | **Wired** |
| `ConfigService` | `src/config/config.service.ts` | **Wired** |

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

### Decorators used (5)

| Library | Decorators |
| ------- | ---------- |
| **@nestjs (@nestjs/common)** | `@Controller`, `@Get`, `@Inject`, `@Injectable`, `@Module` |

---
<!-- CORE_INVENTORY_END -->
## Project structure

```
sample/25-dynamic-modules/
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── app.controller.ts
│   ├── app.service.ts
│   └── config/
│       ├── config.module.ts          # static register() → DynamicModule
│       ├── config.service.ts
│       ├── constants.ts              # CONFIG_OPTIONS token
│       └── interfaces/
├── config/
│   └── development.env               # HELLO_MESSAGE = 'Hello there, world!'
```

---

## Dynamic module pattern

```mermaid
flowchart TD
    AM[AppModule] -->|ConfigModule.register folder| DM[DynamicModule instance]
    DM -->|provide CONFIG_OPTIONS useValue| OPT[options object]
    DM --> CS[ConfigService]
    CS -->|@Inject CONFIG_OPTIONS| OPT
    CS -->|dotenv load| ENV[development.env]
    AC[AppController] --> AS[AppService]
    AS --> CS
```

```typescript
// config.module.ts
static register(options: ConfigModuleOptions): DynamicModule {
  return {
    module: ConfigModule,
    providers: [
      { provide: CONFIG_OPTIONS, useValue: options },
      ConfigService,
    ],
    exports: [ConfigService],
  };
}
```

---

## Module graph

| Component       | Origin   | Role                                      |
| --------------- | -------- | ----------------------------------------- |
| `AppModule`     | **User** | `ConfigModule.register({ folder: './config' })` |
| `ConfigModule`  | **User** | Dynamic module factory                    |
| `ConfigService` | **User** | Loads env via `@Inject(CONFIG_OPTIONS)`   |
| `AppService`    | **User** | Reads `HELLO_MESSAGE` at construction     |
| `AppController` | **User** | Returns greeting from `AppService`        |

---

## Decorator glossary (`@`)

| Decorator              | Library  | Used on           | Purpose                    |
| ---------------------- | -------- | ----------------- | -------------------------- |
| `@Module`              | **NestJS** | Modules         | Module declaration         |
| `@Controller`, `@Get`  | **NestJS** | Controller      | HTTP route                 |
| `@Injectable`          | **NestJS** | Services        | DI marker                  |
| `@Inject(CONFIG_OPTIONS)` | **NestJS** | `ConfigService` | Injects register options |

**User-created:** `CONFIG_OPTIONS` token (string constant, not a decorator).

---

## Dependencies

`@nestjs/common`, `@nestjs/core`, `dotenv`
