# Authentication Guidelines

## Overview

All authentication in this application is handled exclusively by **Clerk**. No alternative authentication methods should be implemented. Clerk manages user sign-in, sign-up, user sessions, and profile management.

**Version**: Clerk ^7.2.2

## Core Rules

1. **Clerk Only**: All auth flows must use Clerk. No homegrown auth, OAuth implementations, or third-party auth providers.
2. **No Alternatives**: Do not suggest or implement email/password auth, JWT tokens, or other custom solutions.
3. **Leverage Clerk Components**: Use Clerk's pre-built UI components for all auth interfaces.

## Protected Routes

### The `/dashboard` Route

The `/dashboard` page is a **protected route** that requires user authentication.

#### Implementation

**Middleware-based protection**:

```typescript
// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.)(.*)"],
};
```

**Server Component guard** (in `app/dashboard/page.tsx`):

```typescript
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/");
  }

  return <div>Dashboard content</div>;
}
```

**Allow either approach**, but middleware is preferred for performance (blocks at network edge on Edge Runtime).

## Homepage Redirect

When a **logged-in user** accesses the homepage (`/`), they should be **redirected to `/dashboard`**.

### Implementation

Create a Server Component check on the homepage:

```typescript
// app/page.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const { userId } = await auth();
  
  // Redirect authenticated users to dashboard
  if (userId) {
    redirect("/dashboard");
  }

  return <div>Homepage content (logged-out users only)</div>;
}
```

Use server-side redirects with `redirect()` from `next/navigation` — this is cleaner than client-side redirects and works reliably.

## Sign In and Sign Up

### Modal-based UI (Recommended)

Sign in and sign up should **always launch as modals**, not full page redirects.

Use Clerk's modal components:

```typescript
// Example: Sign In Button triggering modal
"use client";

import { SignInButton } from "@clerk/nextjs";

export function AuthButtons() {
  return <SignInButton mode="modal" />;
}
```

```typescript
// Example: Sign Up Button triggering modal
"use client";

import { SignUpButton } from "@clerk/nextjs";

export function SignUpLink() {
  return <SignUpButton mode="modal" />;
}
```

### Usage

```typescript
// app/components/nav.tsx
"use client";

import { UserButton, SignInButton, SignUpButton } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";

export function Navigation() {
  const { isSignedIn } = useAuth();

  return (
    <nav>
      {isSignedIn ? (
        <UserButton afterSignOutUrl="/" />
      ) : (
        <>
          <SignInButton mode="modal" />
          <SignUpButton mode="modal" />
        </>
      )}
    </nav>
  );
}
```

**Always use `mode="modal"`** for all sign-in and sign-up entry points. This ensures consistent UX across the app.

## Key Clerk Components

| Component | Use Case | Mode |
|-----------|----------|------|
| `UserButton` | Signed-in user menu (avatar) | Default |
| `SignInButton` | Trigger sign-in | Always modal |
| `SignUpButton` | Trigger sign-up | Always modal |
| `SignedIn` | Render content for authenticated users | - |
| `SignedOut` | Render content for anonymous users | - |

## Type Safety

Import types from `@clerk/nextjs`:

```typescript
import type { User } from "@clerk/nextjs/server";
import { auth, currentUser } from "@clerk/nextjs/server";

async function getUserData() {
  const { userId } = await auth();
  const user: User = await currentUser(); // Typed
  
  return { userId, email: user?.emailAddresses[0].emailAddress };
}
```

## Common Patterns

### Check if user is signed in (Server Component)

```typescript
import { auth } from "@clerk/nextjs/server";

const { userId, sessionId } = await auth();

if (!userId) {
  // User is not signed in
}
```

### Check if user is signed in (Client Component)

```typescript
"use client";

import { useAuth } from "@clerk/nextjs";

export function MyComponent() {
  const { isLoaded, isSignedIn, userId } = useAuth();

  if (!isLoaded) return <div>Loading...</div>;
  
  return isSignedIn ? <div>Welcome {userId}</div> : <div>Sign in</div>;
}
```

### Conditional content

```typescript
"use client";

import { SignedIn, SignedOut } from "@clerk/nextjs";

export function ConditionalContent() {
  return (
    <>
      <SignedIn>
        <p>You are logged in!</p>
      </SignedIn>
      <SignedOut>
        <p>Please sign in</p>
      </SignedOut>
    </>
  );
}
```

## API Route Protection

To protect API routes, use Clerk middleware:

```typescript
// app/api/protected/route.ts
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();
  
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ message: "Protected data" });
}
```

## Environment Variables

Clerk requires these environment variables (check `.env.local`):

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your-key>
CLERK_SECRET_KEY=<your-secret>
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

When using modal-based UI, the sign-in and sign-up URLs are optional (modals will render internally).

## Before Committing

- [ ] No homegrown auth code exists
- [ ] All protected routes check authentication
- [ ] Sign in and sign up use modal mode
- [ ] Logged-in users redirect from homepage correctly
- [ ] Type imports from Clerk are used for User types
- [ ] No credentials or secrets in code

## Resources

- [Clerk Documentation](https://clerk.com/docs)
- [Clerk Next.js Integration](https://clerk.com/docs/quickstarts/nextjs)
- [Clerk Components](https://clerk.com/docs/components/overview)
