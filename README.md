# Security+ Hub (CyberGuard Academy)

A comprehensive learning platform for CompTIA Security+ certification, featuring interactive lessons, quizzes, flashcards, and attack simulations.

## 🚀 Development Workflow (Strict)

To ensure high code quality and prevent deployment failures on Vercel, we follow a **strict pre-push protocol**.

### ✅ The Golden Rule: `npm run check`

Before pushing **ANY** code to GitHub, you MUST run:

```bash
npm run check
```

This command runs:
1.  **ESLint** (`npm run lint`): Checks for syntax errors and unused variables.
2.  **TypeScript Build** (`npm run build`): Verifies all types and compiles the project exactly like Vercel does.

**If `npm run check` fails, DO NOT PUSH.** Fix the errors first.

### Troubleshooting Common Errors

#### 1. "Type ... is a type and must be imported using a type-only import"
**Cause:** `verbatimModuleSyntax` is enabled (common in Vite 5+).
**Fix:** Use `import type` for interfaces/types.
```typescript
// ❌ Bad
import { Section } from './types';

// ✅ Good
import { type Section } from './types';
```

#### 2. "Implicit any"
**Cause:** TypeScript doesn't know what type a variable is.
**Fix:** Explicitly define the type.
```typescript
// ❌ Bad
data.map((item) => ...)

// ✅ Good
data.map((item: ItemType) => ...)
```

## 🛠️ Commands

- `npm run dev`: Start development server
- `npm run check`: **REQUIRED before push** (runs lint + build)
- `npm run build`: Build for production
- `npm run lint`: Run ESLint only

## 📂 Project Structure

- `src/pages`: Application pages (Section, Lesson, Admin, etc.)
- `src/components`: Shared UI components
- `src/data`: Static data (JSON/TS) for curriculum
- `src/context`: React contexts (Auth, Progress)
- `src/hooks`: Custom hooks (useLocalStorage, etc.)
