# 09-babel-example — NestJS Sample

NestJS in **plain JavaScript** with **Babel** (no TypeScript). Shows legacy decorator support and an alternative DI style using `@Dependencies` / `@Bind` instead of typed constructor injection.

## Quick start

```bash
cd sample/09-babel-example
npm install
npm start              # nodemon + babel-node
```

Entry is **`index.js`** (not `src/main.ts`):

```javascript
require('@babel/register');
require('./src/main');
```

App listens on **http://localhost:3000**.

| Method | Path         | Description        |
| ------ | ------------ | ------------------ |
| `POST` | `/cats`      | Create cat         |
| `GET`  | `/cats`      | List cats          |
| `GET`  | `/cats/:id`  | Stub (not implemented) |

---


<!-- CORE_INVENTORY_START -->
## Core elements inventory

> Generated from `09-babel-example/src`. **Wired** = registered in a module or applied globally. **Example** = present in code but not registered.

### Application type

| Property | Value |
| -------- | ----- |
| **Bootstrap** | `NestFactory.create(AppModule)` |
| **Kind** | HTTP server |
| **Entry file** | `main.js` |
| **Port** | 3000 |

### Modules (2)

| Module | Path | Imports | Controllers | Providers |
| ------ | ---- | ------- | ----------- | --------- |
| `AppModule` | `src/app.module.js` | `CatsModule` | — | — |
| `CatsModule` | `src/cats/cats.module.js` | — | `CatsController` | `CatsService` |

### Controllers (1)

| Name | Path | Status |
| ---- | ---- | ------ |
| `CatsController` | `src/cats/cats.controller.js` | **Wired** |

### Providers / services (1)

| Name | Path | Status |
| ---- | ---- | ------ |
| `CatsService` | `src/cats/cats.service.js` | **Wired** |

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
| **@nestjs (@nestjs/common)** | `@Bind`, `@Controller`, `@Dependencies`, `@Get`, `@Injectable`, `@Module`, `@Post` |

---
<!-- CORE_INVENTORY_END -->
## Project structure

```
sample/09-babel-example/
├── index.js                          # Babel register + require main
├── .babelrc
├── nodemon.json
├── jsconfig.json
└── src/
    ├── main.js
    ├── app.module.js
    └── cats/
        ├── cats.module.js
        ├── cats.controller.js
        └── cats.service.js
```

---

## How the app boots

```mermaid
flowchart TD
    A[index.js] -->|@babel/register| B[src/main.js]
    B -->|NestFactory.create| C[AppModule]
    C --> D[CatsModule]
    D --> E[CatsController]
    E --> F[CatsService]
```

---

## Module graph

| Component        | Path                         | Origin   | Role                 |
| ---------------- | ---------------------------- | -------- | -------------------- |
| `AppModule`      | `src/app.module.js`          | **User** | Root                 |
| `CatsModule`     | `src/cats/cats.module.js`    | **User** | Feature module       |
| `CatsController` | `src/cats/cats.controller.js`| **User** | HTTP handlers        |
| `CatsService`    | `src/cats/cats.service.js`   | **User** | In-memory cat store  |

---

## Controller ↔ Service (Babel DI style)

Unlike TypeScript constructor injection, this sample uses **property-based DI**:

```javascript
@Controller('cats')
@Dependencies(CatsService)
export class CatsController {
  constructor(catsService) {
    this.catsService = catsService;
  }

  @Post()
  @Bind(Body())
  async create(createCatDto) { ... }
}
```

| Decorator / pattern | Library  | Purpose                                      |
| ------------------- | -------- | -------------------------------------------- |
| `@Dependencies(CatsService)` | **NestJS** | Declares injectable deps (no TS types) |
| `@Bind(Body())`     | **NestJS** | Binds parameter decorators without TS types  |
| `@Bind(Param('id'))`| **NestJS** | Binds route param                            |

---

## Decorator glossary (`@`)

### NestJS

| Decorator              | Used on              | Purpose                    |
| ---------------------- | -------------------- | -------------------------- |
| `@Module`              | Modules              | Module declaration         |
| `@Controller('cats')`  | `CatsController`     | Route prefix               |
| `@Post`, `@Get`        | Handlers             | HTTP verbs                 |
| `@Injectable`          | `CatsService`        | Injectable provider        |
| `@Dependencies(...)`   | `CatsController`     | JS-style constructor DI    |
| `@Bind(...)`           | Handler methods      | JS-style parameter binding |

**User-created decorators:** none.

---

## Babel config (`.babelrc`)

- `@babel/preset-env`
- `@babel/plugin-proposal-decorators` (legacy mode)
- `@babel/plugin-transform-runtime`

---

## Mental model

1. **Babel** transpiles decorators before Node runs the code.
2. **`@Dependencies` / `@Bind`** are Nest alternatives when TypeScript metadata is unavailable.
3. Same Nest module/controller/service concepts apply — only the language and DI syntax differ.

---

## Dependencies

`@babel/core`, `@babel/register`, `@babel/preset-env`, `@babel/plugin-proposal-decorators`, `@babel/plugin-transform-runtime`
