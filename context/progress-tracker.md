# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Feature 07: Wire editor home — complete

## Current Goal

- Define the immediate implementation goal here.

## Completed

- Boilerplate cleanup (stripped globals.css, removed SVGs, minimal page.tsx)
- 01-design-system: shadcn/ui configured for Tailwind v4, all UI primitive components installed, lucide-react installed, lib/utils.ts with cn() helper created
- 02-editor: EditorNavbar (fixed bar, PanelLeftOpen/Close toggle, dark bg + bottom border), ProjectSidebar (overlay, slide-in, Tabs, New Project button), dialog pattern established via existing shadcn dialog.tsx
- 03-auth: ClerkProvider with dark theme + CSS variable overrides in root layout, proxy.ts with protected-first middleware, /sign-in and /sign-up two-panel pages, / redirects by auth state, UserButton in editor navbar
- 04-project-dialogs: editor home screen, Create/Rename/Delete dialogs (useProjectDialogs hook), sidebar project items with owned-only actions, mobile backdrop scrim, mock project state in lib/mock-projects.ts
- 05-prisma: Project + ProjectCollaborator models in prisma/models/project.prisma, lib/prisma.ts singleton (PrismaPg for postgres://, Accelerate branch for prisma+postgres://), migration applied, client generated to app/generated/prisma
- 06-project-apis: REST endpoints for list/create/rename/delete projects (app/api/projects/route.ts, app/api/projects/[projectId]/route.ts), Clerk auth() for ownerId, 401 for unauthenticated, 403 for non-owner mutations, @prisma/extension-accelerate installed
- 07-wire-editor-home: lib/projects.ts server helper (getProjects fetches owned + shared via Prisma), hooks/use-project-actions.ts (create/rename/delete with real API calls, router.push to new workspace, router.refresh after mutations), editor page split into server component (app/editor/page.tsx) + client wrapper (components/editor/editor-home.tsx), project-sidebar.tsx uses real Project type, all dialogs updated with roomId preview and loading states

## In Progress

- None.

## Spec: 07-wire-editor-home

- [x] Editor home page is a server component that fetches owned + shared projects and passes them to the sidebar
- [x] `useProjectActions` hook in hooks/ manages dialog state and project mutations
- [x] Create: generates room ID (`{slug}-{suffix}`), POSTs to `/api/projects` with id, navigates to new workspace
- [x] Rename: PATCHes `/api/projects/[id]`, refreshes on success
- [x] Delete: DELETEs `/api/projects/[id]`, redirects to `/editor` if active workspace, otherwise refreshes
- [x] Create dialog shows room ID preview
- [x] Rename dialog pre-fills current name
- [x] Delete dialog shows project name

## Next Up

- Add the next planned feature unit here.

## Spec: 03-auth

- [x] ClerkProvider wraps root layout with `dark` theme from `@clerk/ui/themes`, variables overridden with app CSS vars
- [x] `proxy.ts` at project root (Next.js 16), protected-first using `NEXT_PUBLIC_CLERK_SIGN_IN_URL` / `NEXT_PUBLIC_CLERK_SIGN_UP_URL` env vars
- [x] `/sign-in` and `/sign-up` pages: two-panel on large screens (left: logo/tagline/features, right: Clerk form), form-only on small screens, no gradients
- [x] `/` redirects authenticated → `/editor`, unauthenticated → `/sign-in`
- [x] Editor content moved to `/editor` route
- [x] `UserButton` added to editor navbar right section

## Open Questions

- Add unresolved product or implementation questions here.

## Architecture Decisions

- Prisma 7 requires adapter passed to PrismaClient constructor; using PrismaPg({ connectionString }) — no separate pg.Pool needed
- Multi-file schema via prisma.config.ts `schema: "prisma/"` — models live in prisma/models/, generator/datasource stay in prisma/schema.prisma
- shadcn/ui v4.11.0 initialized with Radix/Nova preset, Tailwind v4 CSS-variable mode
- Dark theme lives in .dark class in globals.css (toggled via class strategy, not media query)
- Do not modify files under components/ui/* — managed by shadcn CLI
- Clerk middleware file is `proxy.ts` (Next.js 16 renamed middleware.ts → proxy.ts)
- Clerk `dark` theme from `@clerk/ui/themes` used as appearance base; all color variables reference app CSS vars (no hardcoded colors)

## Session Notes

- Using Next.js 16 with Tailwind CSS v4 (@import "tailwindcss" syntax, no tailwind.config.js)
- shadcn components path: components/ui/
- lib/utils.ts provides cn() (clsx + tailwind-merge)
- @clerk/nextjs v7.5.9 (current SDK), @clerk/ui v1.23.0 for themes
