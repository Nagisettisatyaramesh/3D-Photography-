# Ilaya Studio — Public Website (Phase 1)

Cinematic wedding photography & films studio site. Next.js (App Router) +
TypeScript + Tailwind CSS + Motion.

This is Phase 1 of a larger build: the public marketing site. The quotation
system (customer-facing quotes, accept/request-changes, PDF) and the
vendor/admin dashboard are separate phases — see the plan history for scope.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Connecting Supabase (optional for Phase 1)

The Contact page's enquiry form posts to `/api/enquiry`, which inserts into a
`leads` table in Supabase. Without it configured, the form still validates
fully client-side and shows a clear "not connected" message on submit instead
of crashing.

To wire it up:

1. Create a project at [supabase.com](https://supabase.com).
2. Run [`supabase/schema.sql`](supabase/schema.sql) in its SQL editor.
3. Copy `.env.local.example` to `.env.local` and fill in the values from
   Project Settings → API.

## Content

All copy, images, and structured content (stories, films, portfolio,
services, packages, testimonials, team, site config) live in
[`lib/content/`](lib/content) as typed data files — not hardcoded in
components. This is intentional: Phase 3's "Website Content" admin module
will eventually replace this layer with database-backed content without
touching the components that render it.

Photography is placeholder imagery from Unsplash (see
[`lib/content/images.ts`](lib/content/images.ts)), swappable per-image via
that one file.

## Stack

- Next.js 16 (App Router), TypeScript, Tailwind CSS v4
- [`motion`](https://motion.dev) (`motion/react`) for all animation
- Supabase (`@supabase/supabase-js`) for the enquiry form
