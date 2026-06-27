# 29-file-upload — NestJS Sample

**Multipart file uploads** with `FileInterceptor`, `@UploadedFile()`, and **`ParseFilePipeBuilder`** validation (MIME type, required/optional file).

## Quick start

```bash
cd sample/29-file-upload
npm install
npm run start:dev
```

App listens on **http://localhost:3000**.

| Method | Path                      | Description                          |
| ------ | ------------------------- | ------------------------------------ |
| `POST` | `/file`                   | Basic upload (any file)              |
| `POST` | `/file/pass-validation`   | Optional JPEG only                   |
| `POST` | `/file/fail-validation`   | Required JPG — fails if missing/wrong |

Test with curl:

```bash
curl -F "file=@photo.jpg" http://localhost:3000/file
```

---


<!-- CORE_INVENTORY_START -->
## Core elements inventory

> Generated from `29-file-upload/src`. **Wired** = registered in a module or applied globally. **Example** = present in code but not registered.

### Application type

| Property | Value |
| -------- | ----- |
| **Bootstrap** | `NestFactory.create(AppModule)` |
| **Kind** | HTTP server |
| **Entry file** | `main.ts` |
| **Port** | 3000 |

**Stack notes:** HTTP adapter: **Express** (default)

**Global setup (`main.ts`):** `ValidationPipe` (global, `@nestjs/common`)

### Modules (1)

| Module | Path | Imports | Controllers | Providers |
| ------ | ---- | ------- | ----------- | --------- |
| `AppModule` | `src/app.module.ts` | — | `AppController` | `AppService` |

### Controllers (1)

| Name | Path | Status |
| ---- | ---- | ------ |
| `AppController` | `src/app.controller.ts` | **Wired** |

### Providers / services (1)

| Name | Path | Status |
| ---- | ---- | ------ |
| `AppService` | `src/app.service.ts` | **Wired** |

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

### Decorators used (8)

| Library | Decorators |
| ------- | ---------- |
| **@nestjs (@nestjs/common)** | `@Body`, `@Controller`, `@Get`, `@Injectable`, `@Module`, `@Post`, `@UploadedFile`, `@UseInterceptors` |

---
<!-- CORE_INVENTORY_END -->
## Project structure

```
sample/29-file-upload/
├── src/
│   ├── main.ts                       # Global ValidationPipe
│   ├── app.module.ts
│   ├── app.controller.ts
│   ├── app.service.ts
│   └── sample.dto.ts
```

---

## Module graph

| Component       | Origin   | Role                    |
| --------------- | -------- | ----------------------- |
| `AppModule`     | **User** | Root                    |
| `AppController` | **User** | Upload endpoints        |
| `AppService`    | **User** | Processes uploaded file |

```mermaid
flowchart LR
    AC[AppController] --> AS[AppService]
    AC -->|@UploadedFile| Multer[Multer middleware via FileInterceptor]
```

---

## Decorator glossary (`@`)

| Decorator              | Library  | Used on              | Purpose                    |
| ---------------------- | -------- | -------------------- | -------------------------- |
| `@Module`              | **NestJS** | Module             | Module declaration         |
| `@Controller`          | **NestJS** | Controller         | HTTP routes                |
| `@Post`                | **NestJS** | Handlers           | Upload endpoints           |
| `@Body`                | **NestJS** | Parameter          | Non-file form fields       |
| `@UploadedFile()`      | **NestJS** | Parameter          | Injected multer file       |
| `@UseInterceptors(FileInterceptor('file'))` | **NestJS** + **platform-express** | Handler | Parses multipart |
| `@Injectable`          | **NestJS** | `AppService`       | DI marker                  |

**ParseFilePipeBuilder** is a Nest class (not a decorator) used inline in `@UploadedFile(...)`.

**User-created decorators:** none.

---

## Dependencies

`@nestjs/platform-express`, `class-validator`, `@types/multer`

E2E tests use `NODE_OPTIONS=--experimental-vm-modules`.
