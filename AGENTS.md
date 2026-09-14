<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project Context: "Ghosted" (Job Application Tracker)

## 🎨 Style Guidelines & Architecture
- **Architecture**: The project strictly follows **Feature-Sliced Design (FSD)** patterns (`src/app`, `src/views`, `src/features`, `src/widgets`, `src/entities`, `src/shared`).
- **Exports**: Use **explicit named exports** in barrel files (`index.ts`). Avoid `export *`.
- **Linting**: The project uses **Biome** as its linter and formatter. Run `npm run lint` or `npx biome check --write --unsafe` to fix unused imports and formatting.
- **Table Management**: We use `@tanstack/react-table` **v9**. Stock features are *not* bundled by default. You must explicitly import and register table features (e.g., `columnVisibilityFeature`, `rowSortingFeature`) inside the `tableFeatures({})` configuration.
- **UI & Styling**: Use standard Tailwind CSS along with customized components in `src/shared/ui/` (Shadcn-like). Icons are provided by `lucide-react`.

## ✅ What We Have Done (Completed)
- **Project Scaffold**: Initialized a Next.js 15 App Router project.
- **Application Management Feature**: Built the base UI for tracking job applications (`applications-kanban.tsx`, `applications-table.tsx`).
- **Dashboard View**: Created a toggleable view in `dashboard-page.tsx` allowing users to switch between a Table and Kanban layout.
- **Mock Implementation**: Setup dummy data, basic states, and status color badges.
- **Layout & Shell**: Established the main `app-sidebar.tsx` and header widgets for navigation.
- **Auth Shell**: Built a basic `login-form.tsx`, `auth-provider.tsx`, and sync structure in `src/features/auth/`.
- **TypeScript Fixes**: Fixed TanStack Table v9 `getVisibleCells()` type errors and structured explicit feature barrel exports.
- **Database & Routing Fixes**: Migrated to proper `app/api` routing, handled Next.js 500 errors gracefully, and added strong end-to-end typing using Zod and `objectToFormData`.
- **Create Application (CRUD)**: Built out the backend API and server actions for adding a new application, complete with Supabase insertions.
- **Resume Uploads**: Handled file uploads to Supabase Storage and `resume_versions` tracking.

## ⏳ Pending / On-deck Tasks
- **Codebase Cleanup**: Remove old mock implementations, dummy data, and unused legacy types/components now that we have real data fetching and server actions.
- **Update & Delete (CRUD)**: Implement the Edit and Delete operations for existing applications.
- **Kanban Interactivity**: Ensure drag-and-drop state changes work and persist to the database.
- **Authentication**: Fully connect the auth flow so that the dashboard and user states are properly protected and personalized.

## 📚 Recent Codebase Rules & Lessons

### 1. Database & Type Generation
- **Never manually edit Database Types:** The `database.types.ts` file must always be generated via `npm run db:types` after modifying the remote schema.
- **Trust Supabase Relations:** When querying a many-to-one or one-to-one foreign key (e.g., `resume_versions` on an `application`), Supabase always returns a single object or `null`. Do not write overly defensive code (like `Array.isArray` checks) for these relations.

### 2. Next.js App Router Structure
- **Root `app/` Precedence:** Next.js completely ignores `src/app/` if a root `app/` directory exists. All route handlers (e.g., `api/.../route.ts`) and pages must live in the root `app/` folder to avoid silent `404` errors.
- **Route Handler Exceptions:** Unlike Next.js Middleware, you cannot `throw NextResponse.json(...)` inside a standard Route Handler to abort a request (it will result in an unhandled `500` error). Always explicitly `return` the error response instead.

### 3. Client & Server Data Flow
- **End-to-End Zod Validation:** Never write manual TypeScript interfaces (like `CreateApplicationData`) for incoming form data. Always share the Zod schema (e.g., `addApplicationSchema`) between the client form and the server action. Run `.parse()` on the server to validate payloads and automatically coerce types.
- **FormData Abstraction:** Stop writing huge blocks of `formData.append()` and `formData.get()`. Always use the `objectToFormData` and `formDataToObject` utilities to easily bridge standard JavaScript objects with HTML APIs.

### 4. React Query
- **Prefer `useSuspenseQuery`:** When fetching data, default to `useSuspenseQuery` instead of `useQuery`. This eliminates the need for manual `isLoading` boolean checks inside the component, allowing Next.js `<Suspense>` boundaries (or `loading.tsx`) to handle the skeleton natively. 
- **`ky` HTTP Client Rules:** When the `ky` client is initialized with a `prefixUrl` (like `/api`), endpoint paths must **not** begin with a leading slash (use `"applications"` instead of `"/applications"`).
