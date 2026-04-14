# TESTO

A production-ready Next.js application built with **TypeScript** and **Clean Architecture**.

## Tech Stack

- **Next.js 14** — React framework with App Router
- **TypeScript** — Strict mode enabled
- **Clean Architecture** — Domain-centric, dependency-inversion design

## Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm, yarn, or pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Available Scripts

| Command              | Description                        |
| -------------------- | ---------------------------------- |
| `npm run dev`        | Start development server           |
| `npm run build`      | Create production build            |
| `npm start`          | Start production server            |
| `npm run lint`       | Run ESLint                         |
| `npm run format`     | Format code with Prettier          |
| `npm run format:check` | Check formatting without changes |
| `npm run type-check` | Run TypeScript type checking       |

## API Endpoints

| Method | Path              | Description          |
| ------ | ----------------- | -------------------- |
| GET    | `/api/health`     | Health check         |
| GET    | `/api/users`      | List all users       |
| POST   | `/api/users`      | Create a new user    |
| GET    | `/api/users/:id`  | Get a user by ID     |

### Example: Create a User

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Alice", "email": "alice@example.com"}'
```

## Clean Architecture

This project follows **Clean Architecture** principles. The codebase is organized into four layers with strict dependency rules.

```
┌──────────────────────────────────────────┐
│              Interfaces                  │  ← Entry points (API routes, pages)
│  app/api/*, src/interfaces/              │
├──────────────────────────────────────────┤
│            Application                   │  ← Use cases, DTOs, ports
│  src/application/                        │
├──────────────────────────────────────────┤
│              Domain                      │  ← Entities, value objects, rules
│  src/domain/                             │
├──────────────────────────────────────────┤
│           Infrastructure                 │  ← DB, HTTP clients, adapters
│  src/infrastructure/                     │
└──────────────────────────────────────────┘
```

### Dependency Rule (Absolute)

Dependencies must **only point inward**:

```
interfaces → application → domain
infrastructure → application → domain
```

- **Domain** imports NOTHING from outside itself
- **Application** imports only from Domain
- **Infrastructure** implements interfaces defined in Domain/Application
- **Interfaces** orchestrates use cases — never contains business logic

### Layer Details

#### `src/domain/`
The heart of the application. Contains all business rules and logic with zero knowledge of the outside world.

- **Entities** — Objects with identity and lifecycle (e.g., `User`)
- **Value Objects** — Immutable objects with equality by value (e.g., `Email`)
- **Repository Interfaces** — Abstractions for persistence (WHAT, not HOW)
- **Domain Services** — Business logic that doesn't belong to one entity
- **Exceptions** — Domain-specific error types

#### `src/application/`
Orchestrates domain objects to fulfill use cases. Knows WHAT to do, not HOW.

- **Use Cases** — One class per use case with an `execute(dto)` method
- **DTOs** — Input/output contracts for use cases
- **Ports** — Abstractions for infrastructure needs (e.g., `IdGenerator`)
- **Mappers** — Domain entity ↔ DTO transformations

#### `src/infrastructure/`
Implements interfaces defined in Domain/Application. All I/O lives here.

- **Repository Implementations** — Concrete persistence (e.g., `InMemoryUserRepository`)
- **Adapters** — External service integrations (e.g., `CryptoIdGenerator`)

#### `src/interfaces/`
Entry points into the application. Translates external input into use case calls.

- **API Controllers** — HTTP request → use case → HTTP response
- **Route Handlers** — Next.js App Router route files delegate to controllers

#### `src/config/`
Composition root (outside clean architecture layers). Wires infrastructure implementations to application use cases via dependency injection.

### Path Aliases

| Alias              | Path                    |
| ------------------ | ----------------------- |
| `@domain/*`        | `src/domain/*`          |
| `@application/*`   | `src/application/*`     |
| `@infrastructure/*`| `src/infrastructure/*`  |
| `@interfaces/*`    | `src/interfaces/*`      |
| `@config/*`        | `src/config/*`          |

## Project Structure

```
├── app/                          # Next.js App Router
│   ├── api/
│   │   ├── health/route.ts       # Health check endpoint
│   │   └── users/
│   │       ├── route.ts          # GET /api/users, POST /api/users
│   │       └── [id]/route.ts     # GET /api/users/:id
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── src/
│   ├── config/                   # Composition root (DI container)
│   │   └── container.ts
│   ├── domain/                   # Domain layer
│   │   ├── entities/
│   │   │   └── user.ts
│   │   ├── value-objects/
│   │   │   └── email.ts
│   │   ├── repositories/
│   │   │   └── user-repository.interface.ts
│   │   ├── services/
│   │   │   └── user-domain.service.ts
│   │   └── exceptions/
│   │       ├── domain-exception.ts
│   │       ├── invalid-email.exception.ts
│   │       └── user-not-found.exception.ts
│   ├── application/              # Application layer
│   │   ├── use-cases/
│   │   │   ├── create-user.use-case.ts
│   │   │   ├── get-user.use-case.ts
│   │   │   └── list-users.use-case.ts
│   │   ├── dtos/
│   │   │   ├── create-user.dto.ts
│   │   │   ├── get-user.dto.ts
│   │   │   └── list-users.dto.ts
│   │   ├── ports/
│   │   │   └── id-generator.port.ts
│   │   └── mappers/
│   │       └── user.mapper.ts
│   ├── infrastructure/           # Infrastructure layer
│   │   ├── repositories/
│   │   │   └── in-memory-user.repository.ts
│   │   └── adapters/
│   │       └── crypto-id-generator.ts
│   └── interfaces/               # Interfaces layer
│       └── api/
│           └── users/
│               ├── user.controller.ts
│               └── user-by-id.controller.ts
├── public/                       # Static assets
├── architecture.json             # Machine-readable layer rules
├── CLAUDE.md                     # Global architecture contract
├── next.config.js                # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
├── .eslintrc.json                # ESLint configuration (with layer rules)
├── .prettierrc                   # Prettier configuration
├── .gitignore                    # Git ignore rules
├── package.json                  # Dependencies and scripts
└── README.md                     # This file
```

## License

Private — All rights reserved.
