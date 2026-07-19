# AutoBazaar Frontend

Premium car marketplace built with Next.js 16, React 19, and Tailwind CSS v4.

## Prerequisites

- Node.js >= 18
- Backend server running (see `autobazar-backend/`)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Production build
npm run build

# Lint
npm run lint
```

The frontend expects the backend at `http://localhost:5000`. Override with `NEXT_PUBLIC_SERVER_URL`.

## Project Structure

```
src/
├── app/
│   ├── (auth)/          # login, register
│   ├── (main)/          # home, listings, items, about, blog, contact
│   ├── globals.css      # Tailwind v4 theme, HeroUI import, custom properties
│   └── layout.tsx       # root layout with Providers + AIChatWidget
├── components/
│   ├── ai/              # AIChatWidget, AIDescriptionGenerator
│   ├── home/            # HeroSection, FeaturesSection, etc.
│   ├── listings/        # CarCard, CarGrid, FilterPanel, Pagination, etc.
│   ├── AuthGuard.tsx
│   ├── Footer.tsx
│   ├── Navbar.tsx
│   ├── Providers.tsx    # React Query + next-themes
│   └── ThemeToggle.tsx
├── hooks/
│   ├── useAI.ts
│   ├── useItemMutations.ts
│   └── useItems.ts
├── lib/
│   ├── api.ts           # fetch wrapper + endpoints map
│   ├── auth-client.ts   # better-auth client
│   └── query-client.ts  # TanStack Query config
└── types/
    └── index.ts
```

## Tech Stack

| Category | Choice |
|----------|--------|
| Framework | Next.js 16 (App Router) |
| UI Library | React 19 |
| Styling | Tailwind CSS v4 + HeroUI |
| State / Data | TanStack React Query |
| Auth | better-auth/react |
| Theme | next-themes (dark default) |
| Animations | Framer Motion |
| Charts | Recharts |
| Icons | Lucide React |
| Fonts | Geist, Playfair Display |

## Features

- **Car Listings** — Browse, search, filter, and sort available vehicles
- **User Auth** — Email/password and Google OAuth via Better Auth
- **Sell Your Car** — Authenticated users can list vehicles with AI-assisted descriptions
- **AI Chat** — In-app AI assistant for car-related questions
- **Responsive** — Full mobile/tablet/desktop support
- **Dark/Light Theme** — Toggle with persistent preference
- **Dashboard** — Manage your listings from a personal dashboard

## Environment

| Variable | Default | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_SERVER_URL` | `http://localhost:5000` | Backend API base URL |

## Related

- [autobazar-backend](../autobazar-backend/) — Express 5 + MongoDB API server