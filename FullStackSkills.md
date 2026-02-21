---
name: full-stack-guide
description: Comprehensive full-stack development guidelines covering architecture, frontend, backend, and language mastery. Use this for planning, design, and implementation of full-stack applications.
allowed-tools: Read, Glob, Grep
---

# Full-Stack Development Guide

> "Requirements drive architecture. Intentional design drives engagement. Rigid layers drive maintainability."

This guide consolidates best practices for Full-Stack development, covering Architecture, Frontend, Backend, and Language Mastery.

---

## 🏗️ Section 1: Planning & Architecture

### 1.1 Decision Framework
**Start simple.** Add complexity only when proven necessary. Creating new layers or microservices has a high maintenance cost.

**Architecture Decision Records (ADR)**
-   Document significant decisions (e.g., database choice, framework selection).
-   Capture the `Context`, `Decision`, `Consequences` (Pros/Cons).

### 1.2 Feasibility Indices
Before starting implementation, evaluate feasibility using these indices.

**Design Feasibility & Impact Index (DFII)** - *From Frontend Design*
Score = `(Aesthetic Impact + Context Fit + Feasibility + Performance) - Consistency Risk`
-   **> 8**: Strong/Excellent. Proceed.
-   **< 4**: Risky/Weak. Rethink direction.

**Backend Feasibility & Risk Index (BFRI)** - *From Backend Guidelines*
Score = `(Architectural Fit + Testability) - (Complexity + Data Risk + Operational Risk)`
-   **> 6**: Safe. Proceed.
-   **< 0**: Dangerous. Redesign.

### 1.3 Core Principles
-   **Separation of Concerns**: Frontend handles presentation; Backend handles logic/data.
-   **Single Source of Truth**: Data should live in one place (Database). Config in one place (`unifiedConfig`).
-   **Type Safety**: End-to-end type safety using TypeScript, Zod, and generated types.

---

## 🎨 Section 2: Frontend Engineering (React, Next.js, CSS)

### 2.1 Design Mandate
-   **Intentional Aesthetics**: Explicit design stance (e.g., "Editorial Brutalism", "Clean Enterprise"). Avoid generic "AI UI".
-   **Technical Correctness**: Real, working code. No mockups.
-   **Responsiveness**: Mobile-first design.

### 2.2 Performance & Optimization
**Eliminate Waterfalls**
-   Prefer flat data fetching over nested component fetching.
-   Use `Promise.all` for parallel fetching.

**Bundle Size**
-   Use `next/dynamic` for heavy components (charts, maps, editors).
-   Monitor bundle size constraints.

**Rendering Strategy**
-   **Server Components (RSC)**: Default. Use for data fetching, secure logic.
-   **Client Components**: Use for interactivity (`onClick`, `useState`), browser APIs.

### 2.3 Styling
-   **CSS Variables**: Define a strict theme (colors, spacing, fonts).
-   **Tailwind CSS**: Use utility classes for layout and spacing. Use strict config.
-   **Constraint-Based**: Avoid magic numbers. Use spacing scales.

---

## ⚙️ Section 3: Backend Engineering (Node.js, TypeScript)

### 3.1 Layered Architecture
Strictly follow this flow:
`Routes -> Controllers -> Services -> Repositories -> Database`

-   **Routes**: Definition only. No logic.
-   **Controllers**: HTTP handling, parsing, formatting.
-   **Services**: Business logic. Framework agnostic.
-   **Repositories**: Data access (Prisma).

### 3.2 Safety & Reliability
-   **Validation**: **Zod** for EVERYTHING (Request bodies, query params, env vars).
-   **Error Handling**: Global error handler. **Sentry** for tracking.
-   **Configuration**: `unifiedConfig` pattern. Never use `process.env` directly in code.

### 3.3 Tech Choices (Node.js Context)
-   **Edge/Serverless**: Hono (lightweight, fast).
-   **High Perf API**: Fastify.
-   **Standard/Enterprise**: Express (ecosystem).
-   **Runtime**: Node.js (stable), Bun (speed/dev), Deno (security).

---

## 📝 Section 4: Language Mastery

### 4.1 TypeScript
-   **Strict Mode**: Always enabled (`"strict": true`).
-   **Branded Types**: Use for domain modeling (e.g., `UserId` vs `string`).
    ```typescript
    type Brand<K, T> = K & { __brand: T };
    type UserId = Brand<string, 'UserId'>;
    ```
-   **Type Inference**: Use `satisfies` and `as const` to preserve literal types.

### 4.2 JavaScript
-   **Core Concepts**: deep understanding of Event Loop, Closures, Prototypal Inheritance.
-   **Async Patterns**: proper use of `async`/`await`, `Promise.all`, avoiding "callback hell".
-   **Functional Patterns**: Pure functions, immutability where possible.

---

## ✅ Section 5: Workflow & Quality

### 5.1 Testing Strategy
-   **Unit Tests**: Focus on **Services**. Pure business logic.
-   **Integration Tests**: Focus on **Routes/Controllers**. Happy/Sad paths.
-   **Type Tests**: Use `tsd` or `expectTypeOf` for complex types.

### 5.2 Code Review Checklist
-   [ ] **Plan**: Architecture followed? Indices checked?
-   [ ] **Frontend**: Waterfall free? Responsive? Intentional design?
-   [ ] **Backend**: Layered? Validated (Zod)? Error handling?
-   [ ] **Types**: No `any`? Strict mode compliant?
-   [ ] **Tests**: Critical paths covered?

---

> **Note**: This file is a consolidation of multiple specialized skills. For deep dives, refer to the specific skill files (`react-best-practices`, `backend-dev-guidelines`, etc.).
