# Muneeb Shahid — Portfolio

Personal portfolio site for Muneeb Shahid, Senior Full-Stack Developer & Backend Systems Architect. Built as a two-part app: a React frontend and a NestJS API backend, backed by MySQL/MariaDB.

**Live:** [muneebcodes.tech](https://muneebcodes.tech)

## Features

- Animated hero, project showcase, services, skills, experience timeline, and blog sections
- WebGL particle background and a custom lerped cursor trail
- Light/dark theme toggle
- Admin panel (JWT-protected) for managing projects, services, skills, experience, and blog content without touching the database directly
- Contact form wired to SMTP email delivery via Nodemailer
- Graceful fallback to mock data when the database isn't reachable, so the site never fully breaks

## Tech Stack

**Frontend**
- React 19 + Vite 6
- Tailwind CSS v4
- Motion (Framer Motion) for animation
- TanStack Query for data fetching/caching
- Three.js for the WebGL background
- Lucide for icons

**Backend**
- NestJS 11 on Express
- MySQL / MariaDB (via `mysql2`)
- Nodemailer for the contact form
- JWT-based auth for the admin panel

## Project Structure
.
├── frontend/           React app (Vite root)
│   ├── src/
│   │   ├── pages/       Home, About, Projects, Services, Skills, Experience, Blog, Contact, Admin
│   │   └── components/  Navbar, Footer, CustomCursor, CanvasBackground, etc.
│   └── index.html
├── backend/             NestJS API
│   └── src/
│       ├── auth/        Admin login + JWT
│       ├── projects/
│       ├── services/
│       ├── skills/
│       ├── experiences/
│       ├── blog/
│       └── contact/     Handles the contact form + SMTP
└── vite.config.ts        Vite config (root points at /frontend)

## Running Locally

**Prerequisites:** Node.js 18+, a MySQL/MariaDB instance (optional — the API falls back to mock data without one)

1. Install dependencies at the root, then in each workspace:
```bash
   npm install
   cd frontend && npm install
   cd ../backend && npm install
```

2. Copy `.env.example` to `.env` inside `backend/` and fill in your own values:
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=
SMTP_HOST=
SMTP_PORT=
SMTP_SECURE=
SMTP_USER=
SMTP_PASS=
SMTP_FROM=
CONTACT_RECEIVER=

3. Start both servers together from the project root:
```bash
   npm run dev
```
   This runs the Vite dev server on `:3000` and the NestJS API on `:3001`, with `/api` requests proxied from the frontend to the backend automatically.

## Building for Production

Frontend and backend are built independently:

```bash
# Frontend → outputs to /dist
npm run build

# Backend → outputs to /backend/dist
cd backend && npm run build
```

Set `VITE_API_URL` at build time if the API is served from a different origin/path than the frontend.

## Deployment

Deployed on shared hosting via cPanel's Node.js Selector (Passenger):
- The compiled frontend (`dist/`) is served as static files from `public_html`.
- The compiled backend (`backend/dist/`) runs as a Node.js app under its own application root, mounted at a subpath (`/app`) with a matching global API prefix.

## License

Personal project — all rights reserved.