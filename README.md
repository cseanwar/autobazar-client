# AutoBazaar - Premium Car Marketplace 🚗

**AutoBazaar** is a full-stack, production-style automotive marketplace where users can browse, search, list, and manage car listings. Built as a demonstration of end-to-end TypeScript development — covering frontend, backend, database, authentication, and API design.

🔗 **Live Demo:** [autobazar-client.vercel.app](https://autobazar-client.vercel.app/)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Overview](#api-overview)
- [Authentication](#authentication)
- [Deployment](#deployment)
- [Roadmap](#roadmap)
- [License](#license)
- [Contact](#contact)

---

## Overview

AutoBazaar connects car buyers and sellers in a single marketplace. Sellers can list vehicles with photos, specifications, and pricing; buyers can search, filter, and compare listings before reaching out. The platform is built with a clean, component-driven architecture, a fully typed API layer, and a responsive UI across mobile, tablet, and desktop.

## Features

### Public
- **Landing page** with hero search, category browsing (Sedan, SUV, Sports, Electric, Luxury, Off-Road), platform statistics, testimonials, and FAQ
- **Browse/Explore page** with search, multi-field filtering (body type, fuel type, price, etc.), sorting, and pagination
- **Listing details page** with image gallery, specifications, and related listings
- **Blog** with articles on buying guides and market trends
- **About / Contact** pages

### Authenticated
- **Sign up / Sign in** via Better Auth
- **Sell Your Car** — add a new listing (`/items/add`)
- **Manage Listings** — view, edit, and remove owned listings (`/items/manage`)
- **User dashboard** for tracking listing activity

### Platform
- Verified listings workflow
- Newsletter subscription
- Market insights / pricing trend charts (via Recharts)
- Fully responsive, accessible UI built on HeroUI components

## Tech Stack

### Frontend (`autobazar-frontend`)
| Category | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| UI Components | [HeroUI](https://heroui.com/) |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion |
| Data Fetching / Cache | TanStack Query (React Query) |
| Auth (client) | Better Auth |
| Charts | Recharts |
| Icons | Lucide React |
| Theming | next-themes |

### Backend (`autobazar-backend`)
| Category | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express 5 |
| Language | TypeScript (tsx for dev, tsc for build) |
| Database | MongoDB (native driver) |
| Auth (server) | Better Auth |
| AI / Insights | Groq SDK |
| Middleware | cors, cookie-parser, dotenv |

## Project Structure

```
autobazar/
├── autobazar-frontend/
│   ├── src/
│   │   ├── app/              # Next.js App Router pages
│   │   │   ├── listings/
│   │   │   ├── items/add/
│   │   │   ├── items/manage/
│   │   │   ├── login/
│   │   │   ├── blog/
│   │   │   ├── about/
│   │   │   └── contact/
│   │   ├── components/       # Reusable UI components (cards, navbar, footer)
│   │   ├── lib/               # API clients, Better Auth config, query hooks
│   │   └── styles/
│   └── package.json
│
└── autobazar-backend/
    ├── src/
    │   ├── index.ts           # Express app entry point
    │   ├── routes/            # Route definitions (listings, auth, users)
    │   ├── controllers/       # Request handlers
    │   ├── models/            # MongoDB collections / schemas
    │   ├── middleware/        # Auth guards, error handling
    │   └── config/             # DB connection, env config
    └── package.json
```

> Adjust this tree to match your actual folder layout if it differs.

## Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm
- A MongoDB instance (local or MongoDB Atlas)

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/autobazar.git
cd autobazar
```

### 2. Install dependencies

**Backend**
```bash
cd autobazar-backend
npm install
```

**Frontend**
```bash
cd ../autobazar-frontend
npm install
```

### 3. Configure environment variables

Create a `.env` file in both `autobazar-backend/` and `autobazar-frontend/` — see [Environment Variables](#environment-variables) below.

### 4. Run the development servers

**Backend** (defaults to `http://localhost:5000` or your configured port)
```bash
cd autobazar-backend
npm run dev
```

**Frontend** (defaults to `http://localhost:3000`)
```bash
cd autobazar-frontend
npm run dev
```

### 5. Build for production

```bash
# Backend
npm run build && npm start

# Frontend
npm run build && npm start
```

## Environment Variables

**Backend (`autobazar-backend/.env`)**
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_auth_secret
BETTER_AUTH_URL=http://localhost:5000
GROQ_API_KEY=your_groq_api_key
CLIENT_URL=http://localhost:3000
```

**Frontend (`autobazar-frontend/.env.local`)**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:5000
```

> Never commit `.env` files. Add them to `.gitignore`.

## API Overview

The backend exposes a RESTful, fully typed API consumed by the frontend via TanStack Query. Example endpoints:

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/api/listings` | Get all listings (supports search, filters, pagination) | Public |
| `GET` | `/api/listings/:id` | Get a single listing's details | Public |
| `POST` | `/api/listings` | Create a new listing | Protected |
| `PUT` | `/api/listings/:id` | Update a listing | Protected (owner only) |
| `DELETE` | `/api/listings/:id` | Delete a listing | Protected (owner only) |
| `GET` | `/api/listings/mine` | Get listings created by the current user | Protected |
| `POST` | `/api/auth/*` | Better Auth sign-up / sign-in / session routes | Public |

> Update this table to reflect your actual route implementations.

## Authentication

AutoBazaar uses **Better Auth** for authentication, shared between the Next.js frontend and the Express backend:

- Session/cookie-based authentication with `cookie-parser` and CORS configured for credentialed requests
- Protected routes (`/items/add`, `/items/manage`) redirect unauthenticated users to `/login`
- Server-side route guards validate ownership before allowing edit/delete operations on listings

## Deployment

- **Frontend:** Deployed on [Vercel](https://vercel.com/) — [autobazar-client.vercel.app](https://autobazar-client.vercel.app/)
- **Backend:** Deployed also on [Vercel](https://vercel.com/) — [autobazar-server.vercel.app](https://autobazar-server.vercel.app/)
- **Database:** MongoDB Atlas recommended for production

## Roadmap

- [ ] Payment/escrow integration for transactions
- [ ] Seller verification badges and manual review workflow
- [ ] Saved searches and price-drop alerts
- [ ] Image upload (replacing image URL input) via cloud storage
- [ ] Admin dashboard for moderating listings

## License

This project is licensed under the ISC License. See the `LICENSE` file for details.

## Contact

**AutoBazaar**
📍 123 AutoBazaar St, Automotive City, AC 10001
📞 +1 (555) 123-4567
✉️ hello@autobazaar.com

---

Built with ❤️ using Next.js, Express, TypeScript, and MongoDB.