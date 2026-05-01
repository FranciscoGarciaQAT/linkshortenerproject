# UI Components Guidelines

## Overview

All UI elements in this application use **shadcn/ui** exclusively. shadcn/ui is a collection of reusable components built on top of Radix UI primitives and styled with Tailwind CSS.

**Never create custom components from scratch.** Always start with shadcn/ui components and compose them together. This ensures visual consistency, accessibility, and maintainability across the application.

**Version**: shadcn/ui (Latest compatible)

## Core Rules

1. **shadcn/ui Only**: All user interface elements must be built using shadcn/ui components.
2. **No Custom Components**: Do not create custom HTML components, styled divs, or bespoke component implementations.
3. **Composition Over Creation**: Combine shadcn/ui components to achieve desired behavior instead of building from scratch.
4. **Leverage Radix UI**: shadcn/ui components are built on Radix UI primitives for accessibility and functionality.

## Importing Components

All shadcn/ui components are located in `@/components/ui/` and should be imported using the path alias:

```typescript
// ✅ Correct
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// ❌ Wrong - relative imports
import { Button } from "../../../components/ui/button";
```

## Available Components

The project includes the following standard shadcn/ui components:

- **Button** (`button.tsx`) — Interactive button element with variants for different states and sizes

Additional components can be added via `npx shadcn-ui@latest add [component-name]` when needed.

## Component Usage Patterns

### Basic Component Usage

```typescript
"use client";

import { Button } from "@/components/ui/button";

export function MyComponent() {
  return (
    <Button onClick={() => console.log("clicked")}>
      Click me
    </Button>
  );
}
```

### Composition Pattern

Combine multiple shadcn/ui components to build complex layouts:

```typescript
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function SearchForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Search</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-2">
        <Input placeholder="Enter search term..." />
        <Button>Search</Button>
      </CardContent>
    </Card>
  );
}
```

## Creating Component Variants

Use **class-variance-authority (CVA)** to create component variants while maintaining shadcn/ui as the foundation:

```typescript
"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "rounded-lg p-4",
  {
    variants: {
      intent: {
        default: "bg-white border border-gray-200",
        success: "bg-green-50 border border-green-200",
        error: "bg-red-50 border border-red-200",
      },
      size: {
        small: "text-sm",
        large: "text-lg",
      },
    },
    defaultVariants: {
      intent: "default",
      size: "small",
    },
  }
);

interface CardProps extends VariantProps<typeof cardVariants> {
  children: React.ReactNode;
}

export function CustomCard({ intent, size, children }: CardProps) {
  return (
    <div className={cardVariants({ intent, size })}>
      {children}
    </div>
  );
}
```

## Styling with Tailwind CSS

All shadcn/ui components use Tailwind CSS (v4) for styling. Customize component appearance using Tailwind utility classes:

```typescript
import { Button } from "@/components/ui/button";

export function StyledButton() {
  return (
    <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white rounded-full">
      Custom Button
    </Button>
  );
}
```

## Component Composition Best Practices

### ✅ Do

- Compose shadcn/ui components to build new UI patterns
- Use `cn()` utility from `@/lib/utils` to merge class names
- Accept component props through type-safe interfaces
- Leverage Tailwind utilities for spacing, sizing, and colors
- Use Server Components by default, add `"use client"` only when needed
- Type all component props explicitly

### ❌ Don't

- Create custom styled components from HTML elements
- Import components from libraries other than shadcn/ui for standard UI elements
- Write custom CSS instead of using Tailwind utilities
- Bypass shadcn/ui to build interactive components from scratch
- Use `any` types in component prop definitions
- Duplicate shadcn/ui component functionality

## Accessibility

shadcn/ui components are built on Radix UI, which provides built-in accessibility features:

- Keyboard navigation (arrow keys, Tab, Enter)
- ARIA attributes
- Screen reader support
- Focus management

Preserve these accessibility features when composing components. Do not override or remove ARIA attributes.

## Dark Mode

shadcn/ui components support dark mode via Tailwind's `dark:` prefix. Use it consistently:

```typescript
<div className="bg-white dark:bg-slate-950 text-black dark:text-white">
  Content
</div>
```

## Adding New Components

To add a new shadcn/ui component to the project:

```bash
npx shadcn-ui@latest add [component-name]
```

This will generate the component file in `@/components/ui/` and update necessary dependencies. Then update this documentation and reference the new component in AGENTS.md.

## Common Mistakes to Avoid

❌ **Don't create custom inputs** — Use `@/components/ui/input`

```typescript
// ❌ Wrong
function CustomInput() {
  return <input className="..." />;
}

// ✅ Correct
import { Input } from "@/components/ui/input";
```

❌ **Don't style elements directly** — Use Tailwind utilities and shadcn/ui

```typescript
// ❌ Wrong
<div style={{ backgroundColor: "blue", padding: "10px" }}>

// ✅ Correct
<div className="bg-blue-500 p-2.5">
```

❌ **Don't mix UI frameworks** — Only use shadcn/ui for components

```typescript
// ❌ Wrong
import { Button } from "some-other-ui-library";

// ✅ Correct
import { Button } from "@/components/ui/button";
```

## Documentation Resources

- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Radix UI Documentation](https://www.radix-ui.com/)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [class-variance-authority (CVA)](https://cva.style/docs)
