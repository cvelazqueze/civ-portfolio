# 15-mvc — NestJS Sample

**Server-side rendering** with **Express** and **Handlebars**. Nest configures view engine and static assets; `@Render()` returns template data instead of JSON.

## Quick start

```bash
cd sample/15-mvc
npm install
npm run start:dev
```

App listens on **http://localhost:3000** — renders `views/index.hbs`.

| Method | Path | Response                    |
| ------ | ---- | --------------------------- |
| `GET`  | `/`  | HTML page (`index` template)|

---


<!-- CORE_INVENTORY_START -->
## Core elements inventory

> Generated from `15-mvc/src`. **Wired** = registered in a module or applied globally. **Example** = present in code but not registered.

### Application type

| Property | Value |
| -------- | ----- |
| **Bootstrap** | `Unknown` |
| **Kind** | Unknown |
| **Entry file** | `main.ts` |
| **Port** | 3000 |

**Stack notes:** HTTP adapter: **Express** (default)

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

### Decorators used (4)

| Library | Decorators |
| ------- | ---------- |
| **@nestjs (@nestjs/common)** | `@Controller`, `@Get`, `@Module`, `@Render` |

---
<!-- CORE_INVENTORY_END -->
## Project structure

```
sample/15-mvc/
├── src/
│   ├── main.ts                       # NestExpressApplication + hbs setup
│   ├── app.module.ts
│   └── app.controller.ts
├── views/
│   └── index.hbs
└── public/                           # Static assets
```

---

## How the app boots

```mermaid
flowchart TD
    A[main.ts] -->|NestExpressApplication| B[AppModule]
    B --> C[AppController]
    A -->|useStaticAssets public| D[Static files]
    A -->|setBaseViewsDir views| E[Handlebars engine hbs]
    C -->|@Render index| E
```

Configuration in `main.ts`:

```typescript
app.useStaticAssets(join(__dirname, '..', 'public'));
app.setBaseViewsDir(join(__dirname, '..', 'views'));
app.setViewEngine('hbs');
```

---

## Module graph

| Component       | Origin   | Role                              |
| --------------- | -------- | --------------------------------- |
| `AppModule`     | **User** | Root — controller only            |
| `AppController` | **User** | Single route with template render |

No services — controller returns `{ message: 'Hello world!' }` for the template.

---

## Decorator glossary (`@`)

| Decorator     | Library  | Used on       | Purpose                          |
| ------------- | -------- | ------------- | -------------------------------- |
| `@Module`     | **NestJS** | `AppModule` | Module declaration               |
| `@Controller`| **NestJS** | Controller  | HTTP controller                  |
| `@Get`        | **NestJS** | `root`      | GET `/`                          |
| `@Render('index')` | **NestJS** | `root` | Renders `views/index.hbs` with return value |

**User-created decorators:** none.

---

## Mental model

1. **`@Render('templateName')`** tells Nest to render a view instead of sending JSON.
2. Handler **return value** becomes template context (`{{ message }}` in `.hbs`).
3. **`NestExpressApplication`** exposes Express-specific APIs for views and static files.

---

## Dependencies

`@nestjs/platform-express`, `hbs`
