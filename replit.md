# Thalia - Aesthetic Academic Planner & Glow-Up Companion

## Overview

Thalia is a mobile-first web application designed for female students that combines an aesthetic academic planner, daily to-do system, habit/wellness tracker, and content creator studio. The app features a soft feminine design aesthetic (blush pink, beige, cream tones) and is structured as a single-page application with a bottom navigation bar mimicking a native iOS app experience.

The app is also configured for native iOS deployment via Capacitor.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend

- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side router)
- **State Management / Data Fetching**: TanStack React Query for server state, with a centralized `apiRequest` helper for all API calls
- **UI Components**: shadcn/ui (new-york style) built on Radix UI primitives
- **Styling**: Tailwind CSS v4 with CSS custom properties for theming. Custom color palette uses warm cream/beige/blush pink tones. Two font families: "Plus Jakarta Sans" (sans) and "Playfair Display" (serif)
- **Animations**: Framer Motion for page transitions and UI interactions
- **Build Tool**: Vite
- **Mobile-First Layout**: The main `Router` component constrains content to a max-width mobile container (`max-w-md`) with simulated iOS status bar/notch for desktop preview. Uses `100dvh` for proper mobile viewport handling.

### Pages / Features

| Route | Page | Purpose |
|-------|------|---------|
| `/` | Home | Dashboard with daily summary, upcoming events, tasks, habits overview |
| `/planner` | Planner | Weekly calendar view with event creation (color-coded) |
| `/tasks` | Tasks | Daily and master to-do lists with priority levels, categories |
| `/glow` | Glow | Habit tracker (water, steps, sleep, skincare) + Pomodoro focus timer |
| `/studio` | CreatorHub | Content creator tools: idea vault, editing tasks, brand deals |
| `/inspo` | Inspiration | Pinterest-style vision/inspiration board |
| `/profile` | Profile | User profile with stats (mostly static/demo) |

### Backend

- **Runtime**: Node.js with Express
- **Language**: TypeScript (compiled with tsx in dev, esbuild for production)
- **API Pattern**: RESTful JSON API under `/api/*` prefix
- **Server Entry**: `server/index.ts` creates HTTP server, registers routes, serves static files in production or uses Vite dev server middleware in development

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET/POST | `/api/tasks` | List/create tasks (filterable by list type) |
| PATCH/DELETE | `/api/tasks/:id` | Update/delete a task |
| GET/POST | `/api/events` | List/create calendar events (filterable by date) |
| PATCH/DELETE | `/api/events/:id` | Update/delete an event |
| GET/POST | `/api/habits` | Get habits by date / upsert habit entry |
| GET/POST | `/api/focus-sessions` | List/create Pomodoro focus sessions |
| GET/POST | `/api/creator-ideas` | List/create content ideas |
| PATCH/DELETE | `/api/creator-ideas/:id` | Update/delete content ideas |
| GET/POST | `/api/editing-tasks` | List/create editing tasks |
| PATCH/DELETE | `/api/editing-tasks/:id` | Update/delete editing tasks |
| GET/POST | `/api/brand-deals` | List/create brand collaborations |
| PATCH/DELETE | `/api/brand-deals/:id` | Update/delete brand deals |

### Database

- **Database**: PostgreSQL (required via `DATABASE_URL` environment variable)
- **ORM**: Drizzle ORM with `drizzle-zod` for validation schema generation
- **Schema Location**: `shared/schema.ts` (shared between client and server)
- **Migrations**: Managed via `drizzle-kit push` (`npm run db:push`)

### Database Tables

| Table | Purpose |
|-------|---------|
| `users` | User accounts (username, password, name, goals) |
| `tasks` | To-do items with title, category, priority, done status, list type (daily/master), date, order |
| `events` | Calendar events with title, date, time, duration, location, type, color, notes |
| `habits` | Daily habit tracking entries (habit key, value, target, date) |
| `focus_sessions` | Pomodoro timer session records (duration, date, completed timestamp) |
| `creator_ideas` | Content creator idea cards with status tracking |
| `editing_tasks` | Video/content editing task tracking |
| `brand_deals` | Brand collaboration/sponsorship tracking |

All tables use UUID primary keys generated via `gen_random_uuid()`.

### Build & Deployment

- **Development**: `npm run dev` runs tsx to start the Express server with Vite middleware for HMR
- **Production Build**: `npm run build` runs a custom build script (`script/build.ts`) that builds the Vite client and bundles the server with esbuild into `dist/index.cjs`
- **Production Start**: `npm start` runs the bundled server which serves static files from `dist/public`
- **Native Mobile**: Capacitor configured for iOS (`com.thalia.app`), web output at `dist/public`

### Path Aliases

- `@/*` → `client/src/*`
- `@shared/*` → `shared/*`
- `@assets` → `attached_assets/`

## External Dependencies

### Required Services

- **PostgreSQL Database**: Required. Connection via `DATABASE_URL` environment variable. Used with Drizzle ORM for all data persistence.

### Key NPM Packages

- **Frontend**: React, Wouter, TanStack React Query, Framer Motion, date-fns, shadcn/ui (Radix UI + Tailwind CSS + class-variance-authority)
- **Backend**: Express, Drizzle ORM, pg (node-postgres), Zod (validation)
- **Mobile**: Capacitor CLI + Core + iOS plugin
- **Build**: Vite, esbuild, tsx

### Third-Party Integrations

- **Pinterest**: Placeholder/mock integration on the Inspiration page (not actually connected — simulates a sync flow)
- **TikTok/Instagram**: Placeholder sync buttons in Creator Hub (not actually connected)
- **Google Fonts**: Playfair Display and Plus Jakarta Sans loaded from fonts.googleapis.com
- **Unsplash**: Stock images used in the Inspiration board (loaded via URL)