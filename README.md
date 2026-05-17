# Focusly — Minimal Pomodoro & Focus Tracker

Lightweight Pomodoro productivity web app with a focus on minimal UI, fast feedback, and local-first persistence.

Tech stack
- React 18 + TypeScript
- Vite (dev & build)
- TailwindCSS v3 (+ @tailwindcss/forms)
- Zustand (state management)
- Recharts (charts)
- pnpm for package management

Quick start (local)
1. Clone the repo and enter the frontend folder:

```bash
git clone <your-repo-url>
cd Focusly/focusly-client
pnpm install
```

2. Start development server:

```bash
pnpm dev
```

Available scripts (frontend)
- `pnpm dev` — start Vite dev server
- `pnpm build` — build production bundle
- `pnpm preview` — preview production build
- `pnpm run lint` — run ESLint
- `pnpm exec prettier --write .` — format code

Folder structure (frontend)

```
frontend/
├─ src/
│  ├─ components/   # UI + feature components
│  ├─ hooks/        # reusable hooks
│  ├─ store/        # Zustand stores
│  ├─ utils/        # helpers (storage, time, audio)
│  ├─ types/        # shared TS types
│  └─ pages/        # route pages
├─ public/
├─ index.html
├─ vite.config.ts
└─ tailwind.config.ts
```

Deploy (Vercel)
- Prefer Vercel for frontend: connect GitHub repository → select `frontend/` as project root → set `VITE_API_URL` env var in Vercel → enable Auto Deploy on pushes to `main`.

Environment variables
- Copy `.env.example` → `.env` locally. Do not commit `.env`.

Notes
- This repo is frontend-first and uses LocalStorage for MVP persistence.
- TypeScript strict mode is enabled.

License
- MIT