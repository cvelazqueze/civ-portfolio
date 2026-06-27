# 26-queues — NestJS Sample

**Bull queue** integration — enqueue jobs via HTTP, process them with `@Processor` / `@Process`. Requires **Redis**.

## Quick start

```bash
cd sample/26-queues
npm install
docker-compose up -d    # Redis on :6379
npm run start:dev
```

App listens on **http://localhost:3000**.

| Method | Path               | Description                    |
| ------ | ------------------ | ------------------------------ |
| `POST` | `/audio/transcode` | Enqueues `{ file: 'audio.mp3' }` |

Worker logs job processing in the console.

---


<!-- CORE_INVENTORY_START -->
## Core elements inventory

> Generated from `26-queues/src`. **Wired** = registered in a module or applied globally. **Example** = present in code but not registered.

### Application type

| Property | Value |
| -------- | ----- |
| **Bootstrap** | `NestFactory.create(AppModule)` |
| **Kind** | HTTP server |
| **Entry file** | `main.ts` |
| **Port** | 3000 |

**Stack notes:** Bull queue enabled

### Modules (2)

| Module | Path | Imports | Controllers | Providers |
| ------ | ---- | ------- | ----------- | --------- |
| `AppModule` | `src/app.module.ts` | `BullModule` | `AudioController` | `AudioProcessor` |
| `AudioModule` | `src/audio/audio.module.ts` | `BullModule` | `AudioController` | `AudioProcessor` |

### Controllers (1)

| Name | Path | Status |
| ---- | ---- | ------ |
| `AudioController` | `src/audio/audio.controller.ts` | **Wired** |

### Providers / services (0)

_None_

### Queue processors (1)

| Name | Path | Status |
| ---- | ---- | ------ |
| `AudioProcessor` | `src/audio/audio.processor.ts` | **Wired** |

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

### Decorators used (6)

| Library | Decorators |
| ------- | ---------- |
| **@nestjs (@nestjs/bull)** | `@InjectQueue`, `@Process`, `@Processor` |
| **@nestjs (@nestjs/common)** | `@Controller`, `@Module`, `@Post` |

---
<!-- CORE_INVENTORY_END -->
## Project structure

```
sample/26-queues/
├── src/
│   ├── main.ts
│   ├── app.module.ts                 # Bull setup inline (not AudioModule)
│   └── audio/
│       ├── audio.module.ts           # Duplicate — NOT imported
│       ├── audio.controller.ts
│       └── audio.processor.ts
└── docker-compose.yml
```

---

## How the app boots

```mermaid
flowchart TD
    A[main.ts] --> B[AppModule]
    B -->|BullModule.forRoot redis| C[(Redis)]
    B -->|registerQueue audio| D[Queue audio]
    B --> E[AudioController]
    B --> F[AudioProcessor]
    E -->|add transcode job| D
    D -->|@Process transcode| F
```

---

## Module graph

| Component         | Origin   | Registered in              | Role                    |
| ----------------- | -------- | -------------------------- | ----------------------- |
| `AppModule`       | **User** | Root                       | Bull root + queue       |
| `AudioController` | **User** | `AppModule.controllers`    | Enqueues jobs           |
| `AudioProcessor`  | **User** | `AppModule.providers`      | Processes jobs          |
| `AudioModule`     | **User** | **Not imported**           | Example duplicate       |

---

## Controller ↔ Queue ↔ Processor

```mermaid
flowchart LR
    AC[AudioController] -->|@InjectQueue audio| Q[Queue]
    Q --> AP[AudioProcessor]
    AP -->|@Process transcode| Handler[handleTranscode]
```

---

## Decorator glossary (`@`)

| Decorator              | Library  | Used on              | Purpose                    |
| ---------------------- | -------- | -------------------- | -------------------------- |
| `@Module`              | **NestJS** | Modules            | Module declaration         |
| `@Controller`          | **NestJS** | `AudioController`  | HTTP routes                |
| `@Post`                | **NestJS** | Handler            | POST endpoint              |
| `@Injectable`          | **NestJS** | Processor          | DI marker                  |
| `@InjectQueue('audio')`| **NestJS** + **@nestjs/bull** | Controller | Injects Bull queue |
| `@Processor('audio')`  | **NestJS** + **@nestjs/bull** | `AudioProcessor` | Queue worker class |
| `@Process('transcode')`| **NestJS** + **@nestjs/bull** | Handler method | Job name handler   |

**User-created decorators:** none.

---

## Dependencies

`@nestjs/bull`, `bull`

Environment: `REDIS_HOST`, `REDIS_PORT` (default `localhost:6379`)
