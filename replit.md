# MON POINT DE VUE — CIANNEY

Plateforme web personnelle premium pour la marque CIANNEY / MON POINT DE VUE — combinant média personnel, portfolio professionnel, plateforme de contenu et espace communautaire.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080, path /api)
- `pnpm --filter @workspace/mon-point-de-vue run dev` — run the frontend (path /)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string
- Required env: `SESSION_SECRET` — Secret for token encryption

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React 18 + Vite, Tailwind CSS 4, Framer Motion, Wouter
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `lib/api-spec/openapi.yaml` — OpenAPI spec (source of truth)
- `lib/db/src/schema/` — Drizzle schema (one file per entity)
- `artifacts/api-server/src/routes/` — Express route handlers
- `artifacts/api-server/src/middlewares/auth.ts` — Auth middleware (AES-256 tokens)
- `artifacts/mon-point-de-vue/src/pages/` — React pages
- `artifacts/mon-point-de-vue/src/contexts/` — AuthContext, ThemeContext, LanguageContext

## Architecture decisions

- Auth uses AES-256-CBC encrypted tokens (no JWT library dependency), passwords hashed with scrypt
- All API types generated from OpenAPI spec via Orval — never hand-write types
- Dark mode is the default; light mode toggled via next-themes
- Bilingual (FR/EN) via a simple LanguageContext with static translations
- Admin role enforced server-side via `requireAdmin` middleware

## Product

Premium personal brand platform for CIANNEY / MON POINT DE VUE with:
- Public site (home, about, blog, videos, events, gallery, shop, contact, guestbook, FAQ)
- Member space (register, login, profile, badges)
- Admin dashboard (manage all content, moderate comments/testimonials)
- Social links: Facebook, YouTube, TikTok

## Admin Account

- **Email:** admin@monpointdevue.com
- **Password:** admin123
- Change this immediately in production!

## User preferences

- Language: French (primary), English (secondary)
- Design: Black + white + gold palette, Playfair Display headings, Inter body
- Dark mode as default

## Gotchas

- Always import from `@workspace/api-client-react` barrel (not deep paths like `/src/generated/api.schemas`)
- After OpenAPI spec changes, run `pnpm --filter @workspace/api-spec run codegen` before checking frontend
- Frontend runs on PORT assigned by Replit (env var), not hardcoded

## Pointers

- See `README.md` for full installation and deployment documentation
- See `.env.example` for required environment variables
- See the `pnpm-workspace` skill for workspace structure details
