# 27-scheduling — NestJS Sample

**Cron, interval, and timeout** tasks via `@nestjs/schedule`. No HTTP endpoints — background jobs log to the console.

## Quick start

```bash
cd sample/27-scheduling
npm install
npm run start:dev
```

Watch console for scheduled log output:

| Decorator    | Schedule              | Message                              |
| ------------ | --------------------- | ------------------------------------ |
| `@Cron`      | Second 45 of every minute | `Called when the second is 45` |
| `@Interval`  | Every 10 seconds      | `Called every 10 seconds`            |
| `@Timeout`   | Once after 5 seconds  | `Called once after 5 seconds`        |

---


<!-- CORE_INVENTORY_START -->
## Core elements inventory

> Generated from `27-scheduling/src`. **Wired** = registered in a module or applied globally. **Example** = present in code but not registered.

### Application type

| Property | Value |
| -------- | ----- |
| **Bootstrap** | `NestFactory.create(AppModule)` |
| **Kind** | HTTP server |
| **Entry file** | `main.ts` |
| **Port** | 3000 |

**Stack notes:** Task scheduling enabled

### Modules (2)

| Module | Path | Imports | Controllers | Providers |
| ------ | ---- | ------- | ----------- | --------- |
| `AppModule` | `src/app.module.ts` | `ScheduleModule`, `TasksModule` | — | — |
| `TasksModule` | `src/tasks/tasks.module.ts` | — | — | `TasksService` |

### Controllers (0)

_None_

### Providers / services (1)

| Name | Path | Status |
| ---- | ---- | ------ |
| `TasksService` | `src/tasks/tasks.service.ts` | **Wired** |

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
| **@nestjs (@nestjs/common)** | `@Injectable`, `@Module` |
| **@nestjs (@nestjs/schedule)** | `@Cron`, `@Interval`, `@Timeout` |

---
<!-- CORE_INVENTORY_END -->
## Project structure

```
sample/27-scheduling/
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   └── tasks/
│       ├── tasks.module.ts
│       └── tasks.service.ts
```

---

## How the app boots

```mermaid
flowchart TD
    A[main.ts] --> B[AppModule]
    B -->|ScheduleModule.forRoot| C[Scheduler registry]
    B --> D[TasksModule]
    D --> E[TasksService]
    E -->|@Cron @Interval @Timeout| C
```

---

## Module graph

| Component      | Origin   | Role                         |
| -------------- | -------- | ---------------------------- |
| `AppModule`    | **User** | Enables scheduling globally  |
| `TasksModule`  | **User** | Registers `TasksService`     |
| `TasksService` | **User** | Three scheduled methods      |

No controllers — `TasksService` has no constructor dependencies.

---

## Decorator glossary (`@`)

| Decorator       | Library  | Used on              | Purpose                    |
| --------------- | -------- | -------------------- | -------------------------- |
| `@Module`       | **NestJS** | Modules            | Module declaration         |
| `@Injectable`   | **NestJS** | `TasksService`     | Injectable provider        |
| `@Cron('45 * * * * *')` | **NestJS** + **@nestjs/schedule** | `handleCron` | Cron expression |
| `@Interval(10000)` | **NestJS** + **@nestjs/schedule** | `handleInterval` | Repeat every ms |
| `@Timeout(5000)` | **NestJS** + **@nestjs/schedule** | `handleTimeout` | Run once after ms |

**User-created decorators:** none.

---

## Mental model

1. **`ScheduleModule.forRoot()`** once in `AppModule` enables the scheduler.
2. Schedule decorators on **provider methods** register jobs automatically at bootstrap.
3. Cron syntax follows standard cron (with optional seconds field).

---

## Dependencies

`@nestjs/schedule`
