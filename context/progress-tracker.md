# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Feature 04: Project Dialogs — complete

## Current Goal

- Define the immediate implementation goal here.

## Completed

- Boilerplate cleanup (stripped globals.css, removed SVGs, minimal page.tsx)
- 01-design-system: shadcn/ui configured for Tailwind v4, all UI primitive components installed, lucide-react installed, lib/utils.ts with cn() helper created
- 02-editor: EditorNavbar (fixed bar, PanelLeftOpen/Close toggle, dark bg + bottom border), ProjectSidebar (overlay, slide-in, Tabs, New Project button), dialog pattern established via existing shadcn dialog.tsx
- 03-auth: ClerkProvider with dark theme + CSS variable overrides in root layout, proxy.ts with protected-first middleware, /sign-in and /sign-up two-panel pages, / redirects by auth state, UserButton in editor navbar
- 04-project-dialogs: editor home screen, Create/Rename/Delete dialogs (useProjectDialogs hook), sidebar project items with owned-only actions, mobile backdrop scrim, mock project state in lib/mock-projects.ts

## In Progress

- None yet.

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
