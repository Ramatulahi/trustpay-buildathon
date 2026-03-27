# TrustPay

TrustPay is a secure escrow-style web app for digital commerce. Buyers create transactions, funds are held in escrow, and release happens after delivery confirmation. The app includes dispute handling, multilingual UX support, role-based dashboards, and educational guidance for safer online trading.

## What this project includes

- Landing page with product education and trust-focused messaging
- Authentication flow (signup, login, forgot/reset password)
- Buyer flow: create transaction, track status, confirm/review
- Seller flow: seller dashboard and profile/review management
- Admin view for platform-level oversight
- Supabase integration (auth + database)
- Test setup with Vitest and Playwright

## Tech stack

- React 18 + TypeScript
- Vite 5
- React Router
- Tailwind CSS + shadcn/ui + Radix UI
- Supabase JavaScript client
- React Query
- Vitest + Testing Library + Playwright

## App routes

- `/` — Landing page
- `/login` — Sign in
- `/signup` — Sign up
- `/forgot-password` — Request password reset
- `/reset-password` — Complete password reset
- `/dashboard` — Buyer dashboard
- `/seller-dashboard` — Seller dashboard
- `/admin` — Admin dashboard
- `/create-transaction` — New escrow transaction
- `/transaction/:id` — Transaction details
- `/dispute/:id` — Dispute page

## Getting started

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

Create a `.env` file in the project root (or use `.env.local` in your local setup):

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

### 3) Run development server

```bash
npm run dev
```

### 4) Build for production

```bash
npm run build
```

### 5) Preview production build

```bash
npm run preview
```

## Scripts

- `npm run dev` — Start Vite dev server
- `npm run build` — Production build
- `npm run build:dev` — Development-mode build
- `npm run preview` — Preview built app
- `npm run lint` — Run ESLint
- `npm run test` — Run unit tests once
- `npm run test:watch` — Run unit tests in watch mode

## Supabase notes

- Supabase client setup lives in `src/integrations/supabase/client.ts`.
- Database and auth are expected to be provided by your Supabase project.
- Local Supabase config and migration artifacts are in the `supabase/` directory.

## Testing

Unit tests:

```bash
npm run test
```

End-to-end (Playwright):

```bash
npx playwright test
```

## Deployment

Any static frontend host that supports Vite output works (for example: Vercel, Netlify, Cloudflare Pages).

Deployment checklist:

1. Set `VITE_SUPABASE_URL`
2. Set `VITE_SUPABASE_PUBLISHABLE_KEY`
3. Run build command: `npm run build`
4. Publish `dist/`

## Project structure (high-level)

```text
src/
	components/      # Shared UI + feature components
	contexts/        # React context providers
	hooks/           # Custom hooks
	i18n/            # Translation resources
	integrations/    # External service clients (Supabase)
	lib/             # Utility logic
	pages/           # Route-level pages
	test/            # Test setup and examples
supabase/          # Supabase config, functions, migrations
```

---

If you want, I can also add a short “API and database schema” section next, based on your current Supabase tables and edge functions.
