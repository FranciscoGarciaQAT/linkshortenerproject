---
name: link-shortener-agents
description: "Configuration and guidelines for agents working on the Link Shortener project. Use when: implementing features, fixing bugs, refactoring, or making architectural decisions in this Next.js project. Follow strict TypeScript, Server Components, and established patterns."
---

# Link Shortener Project Agent Configuration

<!-- BEGIN:nextjs-agent-rules -->
## Critical: This is NOT the Next.js you know

This version (Next.js 16.2.4) has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## ⚠️ MANDATORY: Read `/docs` Files FIRST

**BEFORE WRITING ANY CODE**, you MUST read the relevant documentation files in `/docs` directory. This is non-negotiable. The project uses Next.js 16.2.4 with breaking changes and specific patterns that differ from standard practices. Skipping the documentation will result in code that violates project standards.

**Example**: If implementing authentication → Read [docs/authentication.md](/docs/authentication.md)
If building UI components → Read [docs/ui-components.md](/docs/ui-components.md)

## Agent Guidelines

All agents working on this project must follow the standards defined in this repository. This file provides critical context; detailed guidelines are organized by technology in `/docs`.

### Quick Start Checklist

**DO NOT SKIP THE FIRST ITEM** — Before writing code:
- [ ] **✅ CRITICAL**: Read the relevant `/docs/*.md` file for your task — this is mandatory and non-negotiable
- [ ] Verify project uses **TypeScript strict mode** (no `any` types)
- [ ] Confirm understanding of **Server Components** (default in Next.js)
- [ ] Run `npm run lint` to validate changes
- [ ] Check existing patterns in codebase before implementing

### Technology Stack

This is a modern, opinionated Next.js fullstack application. **Do not suggest alternatives** to the established stack:

| Layer | Technology | Version | Status |
|-------|-----------|---------|--------|
| Framework | Next.js | 16.2.4 | ✅ App Router |
| Language | TypeScript | 5.x | ✅ Strict mode |
| Runtime | Node.js / Edge | Latest | ✅ Both supported |
| React | React + React DOM | 19.2.4 | ✅ Server Components default |
| UI Components | Radix UI + shadcn/ui | Latest | ✅ Use these exclusively |
| Component Variants | CVA (class-variance-authority) | ^0.7.1 | ✅ For component variants |
| Styling | Tailwind CSS | v4 | ✅ Utility-first |
| Database | Drizzle ORM | ^0.45.2 | ✅ Type-safe |
| Database Driver | @neondatabase/serverless | ^1.1.0 | ✅ Neon PostgreSQL |
| Authentication | Clerk | ^7.2.2 | ✅ User management |
| Icons | lucide-react | ^1.8.0 | ✅ Icon library |
| Build Tools | ESLint 9 | ^9 | ✅ Next.js config |

### Core Principles

1. **Strict TypeScript**: All code must pass TypeScript strict mode. No `any` types without explicit justification.
2. **Server Components First**: Use Server Components by default. Only add `"use client"` when interactivity is needed.
3. **Type Safety**: Prefer explicit types in public APIs and component props over inference.
4. **Component Composition**: Build with small, reusable, composable components.
5. **UI Consistency**: Use shadcn/ui components as the design system foundation.
6. **Performance**: Minimize client-side JavaScript. Optimize for Core Web Vitals.
7. **Clean Code**: Follow ESLint rules. Keep functions focused and under 50 lines.
8. **Accessibility**: Build accessible interfaces using Radix UI primitives.

### Documentation Reference

**MANDATORY**: Read the relevant documentation BEFORE generating ANY code. The `/docs` directory contains project-specific standards and patterns that MUST be followed. Each task type has a corresponding guide:

- [authentication.md](/docs/authentication.md) — Clerk-based auth, protected routes, modals, redirects
- [ui-components.md](/docs/ui-components.md) — shadcn/ui usage, component composition, no custom components

⚠️ **Failure to read the relevant `/docs` file will result in code that violates project standards. Always check `/docs` first.**


### Key Project Files

Agents should be familiar with these configuration files:

- `tsconfig.json` - TypeScript strict mode enabled, path aliasing configured
- `eslint.config.mjs` - Next.js ESLint rules
- `next.config.ts` - Next.js runtime configuration
- `tailwind.config.ts` - Tailwind CSS v4 configuration
- `drizzle.config.ts` - Database migration configuration
- `components.json` - shadcn/ui component configuration
- `package.json` - Dependencies and scripts

### Path Aliases

Always use `@/` for imports from project root:

```typescript
// ✅ Correct
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// ❌ Wrong - relative imports at root level
import { cn } from "../../../lib/utils";
```

### Common Patterns by Layer

#### Frontend Components
- Use shadcn/ui components as foundation
- Create variants with CVA (class-variance-authority)
- Compose components instead of prop drilling
- Server Components by default, Client Components for interactivity

#### API Routes
- Type request/response payloads
- Validate input before processing
- Return proper HTTP status codes and error messages
- Handle errors with clear error responses

#### Database
- Use Drizzle ORM for all queries (no raw SQL)
- Infer types from schema definitions
- Add indexes for frequently queried columns
- Use transactions for atomic operations

#### Styling
- Tailwind CSS utilities exclusively (no custom CSS)
- Dark mode via `dark:` prefix
- Responsive via mobile-first breakpoints
- Group classes: layout, sizing, spacing, colors, effects

### Code Quality Standards

**TypeScript**:
- No `any` types unless absolutely unavoidable (with comment)
- Explicit return types on functions
- Type props interfaces explicitly
- Use utility types (Pick, Omit, Record, etc.)

**Components**:
- PascalCase for component files
- Destructure from props interface
- Single responsibility
- Props interface with `Props` suffix

**Functions**:
- camelCase naming
- Verb-based names (`getUser`, `validateEmail`, `handleClick`)
- async/await for promises
- Meaningful error messages

**Database**:
- snake_case for columns and tables
- Indexes on foreign keys and frequently filtered columns
- Type inference from schema
- Transactions for multi-step operations

### Before Committing

1. **ESLint**: Run `npm run lint` and fix all errors
2. **Types**: Verify `tsc` produces no errors (no builds needed)
3. **Imports**: Verify all imports use `@/` alias
4. **Tests** (when applicable): Run test suite
5. **Local**: Test feature locally with `npm run dev`

### Common Mistakes to Avoid

❌ **Don't**:
- Suggest replacing Tailwind with CSS-in-JS solutions
- Create untyped variables or functions
- Use `any` type casually
- Build with Client Components when Server would work
- Use relative imports from root level
- Skip error handling in API routes
- Commit code without running lint
- Create custom UI components instead of using shadcn/ui
- Implement animations without checking Tailwind docs
- Use `SELECT *` in database queries

✅ **Do**:
- Consult `/docs` before implementing
- Check existing patterns in codebase
- Use type inference from database schema
- Default to Server Components
- Always use `@/` path alias
- Validate and type all inputs
- Run linter before submitting changes
- Reuse shadcn/ui and custom components
- Check Tailwind v4 documentation for API changes
- Select specific columns in queries

### Asking for Clarification

If unclear about a requirement:
1. Check the relevant `/docs/*.md` file
2. Look at similar implementations in the codebase
3. Read the ESLint or TypeScript error message carefully
4. Ask clarifying questions leveraging the documentation

### Continuous Improvement

When discovering new patterns or best practices:
1. Update the relevant `/docs/*.md` file
2. Include code examples
3. Note any project-specific considerations
4. Commit with clear message: "docs: update [topic] patterns"

---

**Last Updated**: April 17, 2026
**Documentation**: See [copilot-instructions.md](copilot-instructions.md) for comprehensive overview
