# AGENT.md — Focusly

> **For AI coding agents, Claude Code, Cursor, Copilot, Gemini CLI, and all AI development assistants.**
> Read this file before writing any code. When in doubt, read `PRD.md` — it is the source of truth.

---

## Quick Reference

| Item | Value |
|------|-------|
| Project | Focusly |
| Type | Pomodoro productivity web app |
| Stack | React · TypeScript · Vite · TailwindCSS · Zustand · Recharts |
| Storage (MVP) | LocalStorage |
| Backend | Node.js + Express (added after frontend MVP) |
| Philosophy | Minimal · Fast · Polished · Portfolio-ready |
| Source of Truth | `PRD.md` |

---

## 1. Project Overview

**Focusly** is a minimalist Pomodoro web app that helps students, developers, and freelancers build a consistent deep-work habit.

### What it does

- 25-minute focus sessions / 5-minute breaks (Pomodoro technique)
- Tracks daily progress toward a configurable Pomodoro goal
- Shows weekly statistics and a daily streak
- Logs session history
- Sends browser notifications when sessions end

### Target users

Students · Junior developers · Freelancers · Anyone who struggles with procrastination

### MVP philosophy

> Do one thing. Do it well. Ship it.

The MVP runs entirely in the browser with LocalStorage. No login, no backend, no unnecessary setup. A user should be able to open the app and start a session in under 5 seconds.

### Product direction

- v1.0: Frontend-only, LocalStorage, deployed on Vercel
- v1.1: PWA support, custom timer durations, CSV export
- v2.0: Auth, cloud sync, cross-device support

---

## 2. Core Product Principles

These principles override feature requests, implementation preferences, and clever ideas.

```
1. Minimal distraction       — every element must earn its place on screen
2. Focus-first UX            — the timer is always the most prominent thing on the page
3. Zero friction to start    — no onboarding gates, no required setup
4. Fast interactions         — actions feel instant; no unnecessary loading states
5. Clean, readable code      — readable > clever; future-you will thank present-you
6. No over-engineering       — solve the actual problem, not imaginary future problems
7. Portfolio-quality         — code and UI should be something to be proud of
```

**When a feature idea conflicts with these principles, the principles win.**

---

## 3. Tech Decisions

### Why React?

Standard industry choice, large ecosystem, excellent TypeScript support. Appropriate for a component-driven productivity app. No need for a meta-framework (Next.js) since SSR provides no benefit for a client-side Pomodoro app.

### Why Vite?

Faster dev server than CRA, leaner config, excellent HMR. Path alias support (`@/` → `src/`) out of the box. Production builds are fast and well-optimized.

### Why Zustand over Redux or Context API?

| Option | Verdict |
|--------|---------|
| Redux Toolkit | Overkill. Too much boilerplate for this scope. |
| Context API | Causes unnecessary re-renders without careful optimization. |
| **Zustand** | ✅ Lightweight, minimal boilerplate, built-in persistence middleware, selector-based subscriptions prevent re-renders. |

### Why LocalStorage-first?

- Zero infrastructure cost for MVP
- Works offline immediately
- No auth complexity
- Data is scoped to the device (acceptable for v1)
- Storage layer is abstracted behind helpers, making migration to an API seamless later

### Why Recharts?

React-native API (no imperative `ref` hacks), responsive containers built in, smaller bundle than Chart.js, straightforward dark-mode theming via props.

### Backend role

The backend does **not exist in MVP**. It is scaffolded after the frontend is complete and tested. The frontend storage layer (`src/lib/storage.ts`) is designed so that swapping LocalStorage for API calls requires changing only the store actions — not the components.

### Future scalability

The abstraction layers (storage utils, typed interfaces, store actions) are intentionally designed to support a future migration to:
- Supabase / PostgreSQL for persistence
- JWT-based auth
- Multi-device sync

---

## 4. Architecture Guidelines

### Development order (strictly enforced)

```
Phase 1: Frontend complete → LocalStorage → deployed on Vercel
Phase 2: Backend scaffolded → API built → frontend connected
```

**Never build backend features in parallel with incomplete frontend features.**

### Separation of concerns

| Layer | Responsibility | Must NOT |
|-------|---------------|----------|
| `components/` | Render UI, emit events, accept props | Contain business logic or call localStorage directly |
| `hooks/` | Encapsulate stateful logic and side effects | Render JSX or import store directly (prefer accepting store values as parameters) |
| `store/` | Hold global state, persist to LocalStorage, expose actions | Contain render logic or DOM manipulation |
| `utils/` | Pure functions with no side effects | Import React, stores, or hooks |
| `types/` | TypeScript interfaces and type aliases | Export runtime code |
| `pages/` | Compose feature components into a full view | Contain non-trivial logic |
| `services/` (Phase 2) | API call wrappers | Contain UI logic or direct LocalStorage access |

### Component responsibilities

- One responsibility per component
- If a component needs more than 3 props to describe its internal logic, consider splitting it
- UI components in `components/ui/` must be fully generic — no business logic
- Feature components (e.g. `TimerDisplay`, `WeeklyChart`) are allowed to read from stores directly

### Hook responsibilities

- Prefix: `use` (required)
- One hook per logical concern (timer, notification, streak)
- Hooks manage `useEffect` cleanup, intervals, and event listeners
- Return stable references for callbacks (use `useCallback`)

---

## 5. Folder Structure

```
focusly/
├── src/
│   ├── assets/                   # Static images, icons
│   │
│   ├── components/
│   │   ├── ui/                   # Generic atomic components (Button, Card, Badge, ProgressRing)
│   │   ├── timer/                # Timer feature components
│   │   ├── stats/                # Statistics feature components
│   │   ├── history/              # Session history components
│   │   └── layout/               # Header, Navigation, Layout wrapper
│   │
│   ├── hooks/                    # Custom React hooks
│   │   ├── useTimer.ts           # Core timer countdown logic
│   │   ├── useNotification.ts    # Browser Notification API
│   │   └── useStreak.ts          # Streak calculation
│   │
│   ├── store/                    # Zustand stores
│   │   ├── timerStore.ts         # Timer mode, status, timeLeft
│   │   ├── sessionStore.ts       # Session history, CRUD
│   │   ├── settingsStore.ts      # User preferences
│   │   └── streakStore.ts        # Streak data
│   │
│   ├── data/
│   │   └── quotes.ts             # Hardcoded motivational quotes array
│   │
│   ├── utils/
│   │   ├── storage.ts            # Typed LocalStorage helpers
│   │   ├── time.ts               # formatTime, formatDuration
│   │   ├── dateUtils.ts          # isToday, isSameDay, getWeekDays, toDateKey
│   │   └── streakUtils.ts        # Pure streak calculation functions
│   │
│   ├── types/
│   │   └── index.ts              # All shared TypeScript interfaces
│   │
│   ├── pages/
│   │   ├── TimerPage.tsx
│   │   ├── StatsPage.tsx
│   │   ├── HistoryPage.tsx
│   │   └── SettingsPage.tsx
│   │
│   ├── services/                 # (Phase 2 only) API call wrappers
│   │   ├── api.ts                # Base fetch wrapper
│   │   ├── sessionApi.ts
│   │   └── statsApi.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── focusly-server/               # Backend (Phase 2 only)
│   └── src/
│       ├── routes/
│       ├── controllers/
│       ├── middleware/
│       ├── lib/
│       └── index.ts
```

### Rules

- Do not create new top-level directories in `src/` without updating this file
- Do not put business logic in `pages/` — compose from feature components
- Do not import from `store/` inside `utils/` or `types/`
- `services/` does not exist until Phase 2 begins

---

## 6. Coding Conventions

### Naming

| Item | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `TimerDisplay.tsx` |
| Hooks | camelCase, `use` prefix | `useTimer.ts` |
| Stores | camelCase, `Store` suffix | `timerStore.ts` |
| Utilities | camelCase | `formatTime`, `isToday` |
| Types/Interfaces | PascalCase | `Session`, `UserSettings` |
| Type aliases | PascalCase | `TimerMode`, `SessionType` |
| Constants | SCREAMING_SNAKE_CASE | `DEFAULT_FOCUS_DURATION` |
| LocalStorage keys | `focusly_snake_case` | `focusly_sessions` |

### TypeScript rules

```typescript
// ✅ Always type function parameters and return values
function formatTime(seconds: number): string { ... }

// ✅ Use interfaces for object shapes
interface Session {
  id: string;
  type: SessionType;
  startTime: string; // ISO 8601
  endTime: string;
  duration: number;  // seconds
  completed: boolean;
}

// ❌ Never use `any`
const data: any = ...; // FORBIDDEN

// ❌ Never use non-null assertion without a comment
element!.focus(); // Only if unavoidable, add: // safe: element exists at this point

// ✅ Use union types over enums for simple cases
type TimerMode = 'focus' | 'break';
type TimerStatus = 'idle' | 'running' | 'paused';

// ✅ Use `unknown` + type guard when type is uncertain
function parseSession(raw: unknown): Session | null { ... }
```

### Component structure

```tsx
// Order within a component file:
// 1. Imports
// 2. Types/interfaces (local to this file)
// 3. Constants (local to this file)
// 4. Component function
// 5. Subcomponents (if small and tightly coupled)
// 6. Default export

import React from 'react';
import { useTimerStore } from '@/store/timerStore';
import { formatTime } from '@/utils/time';

interface TimerDisplayProps {
  className?: string;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ className }) => {
  const timeLeft = useTimerStore((s) => s.timeLeft);
  const mode = useTimerStore((s) => s.mode);

  return (
    <div className={className}>
      <span>{formatTime(timeLeft)}</span>
    </div>
  );
};

export default TimerDisplay;
```

### Import ordering

```typescript
// 1. React and React ecosystem
import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// 2. Third-party libraries
import { BarChart } from 'recharts';
import { clsx } from 'clsx';

// 3. Internal — stores
import { useTimerStore } from '@/store/timerStore';

// 4. Internal — hooks
import { useTimer } from '@/hooks/useTimer';

// 5. Internal — components
import Button from '@/components/ui/Button';

// 6. Internal — utils, types, data
import { formatTime } from '@/utils/time';
import type { Session } from '@/types';
```

### General rules

- Max component file length: ~150 lines. Split if longer.
- No inline styles. Use TailwindCSS classes only.
- No magic numbers — extract to named constants.
- No commented-out code in commits.
- Prefer `const` over `let`. Never use `var`.
- Arrow functions for components and callbacks.
- Explicit `return` in hooks that return values.

---

## 7. UI/UX Rules

### Core constraints

- **Timer is king.** It must be the largest, most visually prominent element on the Timer page.
- **Dark mode first.** The entire palette is designed for dark backgrounds. Do not add hard-coded white backgrounds.
- **No UI chrome that doesn't serve the user's current task.** If an element isn't needed right now, don't show it.

### Color usage

```
--accent-focus:  #6c63ff   (indigo/violet) — active focus mode
--accent-break:  #43d9ad   (teal/mint)     — active break mode
--accent-warn:   #f7b731   (amber)         — streak, warnings

Only use accent colors for: active states, CTAs, progress indicators.
Use muted text (#9094a4) for secondary information.
Never use more than 2 accent colors on a single view.
```

### Typography rules

- Timer digits: monospace font (Space Mono or JetBrains Mono) — this prevents layout shift as numbers change
- Headings: humanist sans (Outfit or Plus Jakarta Sans)
- Body: neutral sans (Inter)
- Font sizes: follow TailwindCSS scale — do not use arbitrary `text-[17px]` values

### Spacing philosophy

- Use TailwindCSS spacing scale consistently (4px base unit)
- Generous padding inside cards (`p-6` minimum)
- Adequate breathing room between sections (`gap-6` or `gap-8`)
- Never crowd elements to "fit more on screen" — whitespace is intentional

### Animation rules

```
✅ Allowed:
  - Transition on mode switch (focus ↔ break): max 500ms ease
  - Progress ring fill animation: CSS stroke-dashoffset transition
  - Button hover: scale(1.02) + shadow, 150ms
  - Fade-in for quotes: opacity 0 → 1, 300ms
  - Bounce for streak badge: single bounce, not loop

❌ Not allowed:
  - Looping animations on the main timer screen
  - Animations that delay user interaction
  - Animations with duration > 600ms (except one-time completion celebrations)

⚠️ Always implement:
  @media (prefers-reduced-motion: reduce) {
    * { animation: none !important; transition: none !important; }
  }
```

### Responsive breakpoints

| Breakpoint | Behavior |
|-----------|---------|
| `< 640px` | Single column, large timer, stacked controls |
| `640px–1024px` | Timer + progress ring side by side |
| `> 1024px` | Full layout with possible sidebar for stats |

Minimum tested width: **375px** (iPhone SE)

---

## 8. State Management Rules

### What belongs in Zustand stores

- Timer mode (`focus` / `break`), status (`idle` / `running` / `paused`), `timeLeft`, `startTimestamp`
- Session history array (persisted)
- User settings (persisted)
- Streak data (persisted)

### What stays in local component state

- UI-only state: modal open/closed, input field value, hover state
- Temporary form state before submission
- Tooltip visibility

### Persistence strategy

```typescript
// Persist only what needs to survive a page refresh.
// Timer state is intentionally NOT persisted (reset on refresh is correct behavior).

// Pattern for persisted stores:
const useSessionStore = create<SessionStore>()(
  persist(
    (set, get) => ({ ... }),
    {
      name: 'focusly_sessions', // LocalStorage key
      storage: createJSONStorage(() => localStorage),
    }
  )
);
```

### Derived state rules

- Do not store derived values in Zustand (e.g., `todayPomodoroCount`).
- Compute them with selector functions or inside components:

```typescript
// ✅ Derived in selector
const todayCount = useSessionStore((s) =>
  s.sessions.filter(session => isToday(session.startTime) && session.completed).length
);

// ❌ Stored as redundant state
const { todayCount } = useSessionStore(); // if this is just a count of sessions, don't store it
```

---

## 9. LocalStorage / Data Rules

### Key naming

All keys must be prefixed with `focusly_`:

```
focusly_sessions    → Session[]
focusly_settings    → UserSettings
focusly_streak      → StreakData
```

### Storage helpers — always use typed wrappers

```typescript
// src/utils/storage.ts

const PREFIX = 'focusly_';

export function getFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback; // Never crash on corrupt data
  }
}

export function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    console.warn(`[Focusly] Failed to save "${key}" to localStorage`);
  }
}
```

### Serialization rules

- All dates stored as **ISO 8601 strings**: `"2026-05-11T08:30:00.000Z"`
- All durations stored as **seconds** (number): `1500` = 25 minutes
- Never store `Date` objects directly — they do not serialize correctly with `JSON.stringify`

### Migration awareness

- If the data schema changes, version the key: `focusly_sessions_v2`
- Always write a migration function that reads the old key, transforms, writes to new key, then removes the old key
- Do not silently break existing user data

### Date handling rules

```typescript
// Always use these utilities — never raw Date comparisons inline

isToday(dateString: string): boolean
isSameDay(a: string, b: string): boolean
toDateKey(date?: Date): string   // → "2026-05-11"
getWeekDays(): string[]           // → 7 ISO date strings, oldest first
```

---

## 10. Timer Engine Rules

> This is the most technically sensitive part of the codebase. Read carefully.

### The core problem

`setInterval` fires approximately every 1000ms, but browsers **throttle timers in background tabs** to save CPU. A timer built purely on tick-counting will drift — sometimes by minutes — when the user switches tabs.

### The solution: timestamp-based countdown

```typescript
// ✅ CORRECT — calculate elapsed time from a saved timestamp
function tick() {
  const elapsed = Date.now() - startTimestamp;
  const remaining = duration - elapsed;
  setTimeLeft(Math.max(0, Math.round(remaining / 1000)));

  if (remaining <= 0) {
    onSessionComplete();
  }
}

// ❌ WRONG — decrement a counter on every interval tick
function tick() {
  setTimeLeft(prev => prev - 1); // Drifts when tab is hidden
}
```

### Implementation pattern

```typescript
// src/hooks/useTimer.ts (simplified)

const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

const start = useCallback(() => {
  const startTimestamp = Date.now();
  timerStore.setStartTimestamp(startTimestamp);
  timerStore.setStatus('running');

  intervalRef.current = setInterval(() => {
    const elapsed = Date.now() - startTimestamp;
    const remaining = duration * 1000 - elapsed;

    if (remaining <= 0) {
      clearInterval(intervalRef.current!);
      onSessionComplete();
    } else {
      timerStore.setTimeLeft(Math.ceil(remaining / 1000));
    }
  }, 500); // Poll every 500ms for smoother display without extra CPU cost
}, [duration, onSessionComplete]);

// Always clean up on unmount
useEffect(() => {
  return () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };
}, []);
```

### Tab visibility

- When the tab becomes visible again (`visibilitychange` event), recalculate `timeLeft` immediately from the saved `startTimestamp` — do not wait for the next interval tick.

```typescript
useEffect(() => {
  const handleVisibilityChange = () => {
    if (document.visibilityState === 'visible' && status === 'running') {
      // Force immediate recalculation
      const elapsed = Date.now() - startTimestamp;
      const remaining = duration * 1000 - elapsed;
      if (remaining <= 0) {
        onSessionComplete();
      } else {
        timerStore.setTimeLeft(Math.ceil(remaining / 1000));
      }
    }
  };
  document.addEventListener('visibilitychange', handleVisibilityChange);
  return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
}, [status, startTimestamp, duration]);
```

### Session completion flow

```
1. Timer reaches 0
2. Clear interval
3. Create Session object: { id, type, startTime, endTime, duration, completed: true }
4. Call sessionStore.addSession(session)
5. Call streakStore.updateStreak()
6. Send browser notification (or audio fallback)
7. Auto-switch mode: 'focus' → 'break' | 'break' → 'focus'
8. Reset timeLeft to next session duration
9. Status → 'idle' (user must manually start next session)
```

### Auto-switch rule

Auto-switch mode after each session, but **do not auto-start** the next session. The user must press Start. This is intentional — it prevents the app from locking the user into an uncontrolled loop.

---

## 11. Backend / API Guidelines

### Timing constraint

> The backend does not exist until the frontend MVP is complete, tested, and deployed on Vercel.

### REST conventions

```
GET    /api/sessions              → list sessions (query params: date, from, to, limit, offset)
POST   /api/sessions              → create session
PUT    /api/sessions/:id          → update session
DELETE /api/sessions/:id          → delete session

GET    /api/stats/today           → today's summary
GET    /api/stats/week            → 7-day array
GET    /api/stats/streak          → current + longest streak

GET    /api/settings              → user settings
PUT    /api/settings              → update settings

GET    /health                    → { status: 'ok', version: '1.0' }
```

### Response format (consistent across all endpoints)

```typescript
// Success
{ data: T, error: null }

// Error
{ data: null, error: { code: string, message: string } }
```

### Controller / service separation

```
routes/      → define endpoint + attach middleware
controllers/ → parse request, call service, send response
services/    → business logic, data access (no req/res objects here)
middleware/  → validation, error handling, logging
```

### Validation rules

- Validate all inputs at the controller level before they reach the service
- Return `400` with a descriptive `error.message` for invalid input
- Return `404` with `error.code: 'NOT_FOUND'` for missing resources
- Never return `500` with a raw error stack in production

### Auth readiness

- Design request handlers to accept an optional `userId` parameter from the start
- Use a middleware slot for auth (even if it's a no-op in v1):

```typescript
// router.use(authMiddleware); // no-op in v1, real JWT check in v2
```

---

## 12. Performance Guidelines

### Prevent unnecessary re-renders

```typescript
// ✅ Use selectors to subscribe to only what the component needs
const timeLeft = useTimerStore((s) => s.timeLeft);   // Re-renders only when timeLeft changes
const mode = useTimerStore((s) => s.mode);           // Re-renders only when mode changes

// ❌ Subscribes to the entire store — re-renders on any state change
const store = useTimerStore();
```

### Memoization

- Use `useCallback` for functions passed as props or used in `useEffect` dependencies
- Use `useMemo` for expensive computations (e.g., weekly stats derived from a large sessions array)
- Do not memoize everything by default — only when a profiler shows a real problem

### Chart performance

- Always wrap Recharts components in `<ResponsiveContainer>` — it handles resize events internally
- Do not re-render charts on every timer tick — charts live on `StatsPage`, not `TimerPage`
- Limit session data passed to charts: last 7 days only, not the full history array

### Bundle size

- Do not import entire libraries when only a subset is needed:

```typescript
// ✅
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

// ❌ (if recharts supported this — always check tree-shaking)
import Recharts from 'recharts';
```

- Run `pnpm run build` and check `dist/assets/` before each deploy
- Target: total JS bundle < 500KB (gzipped)

---

## 13. Git & Project Workflow

### Branch naming

```
main              → production-ready code only
dev               → integration branch (optional for solo dev)
feat/timer-engine
feat/weekly-chart
fix/timer-drift
fix/streak-reset
chore/setup-eslint
docs/update-readme
```

### Commit naming (Conventional Commits)

```
feat: add timestamp-based countdown in useTimer
fix: prevent timer drift when tab is hidden
chore: configure TailwindCSS dark mode
docs: update AGENT.md with timer engine rules
refactor: extract streak logic into streakUtils
style: adjust progress ring animation timing
test: add unit tests for dateUtils helpers
```

### Workflow

1. Work in small, focused commits — one logical change per commit
2. Test locally before pushing to `main`
3. Deploy preview on Vercel is automatic on push — verify it before sharing the link
4. Do not push broken builds to `main`
5. Keep `PRD.md` and `AGENT.md` up to date when architecture decisions change

---

## 14. AI Agent Instructions

> Read this section carefully. These are non-negotiable constraints for any AI-assisted development on this project.

### DO

```
✅ Read PRD.md before implementing any feature
✅ Follow the folder structure exactly as defined in Section 5
✅ Use the naming conventions defined in Section 6
✅ Use timestamp-based timer logic as defined in Section 10
✅ Write TypeScript with explicit types — no implicit `any`
✅ Keep components small and single-responsibility
✅ Use existing utility functions before creating new ones
✅ Use TailwindCSS classes — no inline styles
✅ Preserve existing store structure and action naming
✅ Write code that a junior developer can read and understand
```

### DO NOT

```
❌ Do not rewrite the architecture without explicit instruction
❌ Do not add new dependencies without a clear reason
❌ Do not build backend features while frontend is incomplete
❌ Do not use `any` type under any circumstances
❌ Do not store derived state in Zustand (compute it from existing state)
❌ Do not use setInterval tick-counting for the timer (causes drift)
❌ Do not add features that are explicitly listed as out-of-scope in PRD.md
❌ Do not create new top-level folders in src/ without updating AGENT.md
❌ Do not use CSS-in-JS or styled-components — TailwindCSS only
❌ Do not introduce global CSS rules outside of index.css
❌ Do not over-engineer: if the simple solution works, use it
```

### When implementing a new feature

1. Check `PRD.md` — is this feature in scope for the current phase?
2. Check `types/index.ts` — do the required types already exist?
3. Check `utils/` — does a utility function already solve part of this?
4. Check `store/` — does an existing store already hold the needed state?
5. Build in this order: `types` → `utils` → `store actions` → `hooks` → `components` → `page`
6. Do not skip steps or combine layers

### When asked to "improve" or "refactor"

- Preserve the public API of stores (action names, state shape) unless explicitly asked to change it
- Do not silently rename things — renames break references elsewhere
- Do not change the LocalStorage key names without a migration plan
- Improvements to style/formatting are always safe — improvements to architecture need a reason

### Handling ambiguity

If a task is ambiguous and could go multiple ways:
1. State the ambiguity explicitly
2. Propose the simplest interpretation first
3. Ask for confirmation before implementing the complex interpretation

**Simpler is always the default.**

---

## 15. Key Files Reference

| File | Purpose |
|------|---------|
| `PRD.md` | Source of truth for the entire product |
| `AGENT.md` | This file — coding conventions and agent instructions |
| `todo.md` | Phase-by-phase implementation checklist |
| `src/types/index.ts` | All shared TypeScript types |
| `src/utils/storage.ts` | Typed LocalStorage read/write helpers |
| `src/utils/time.ts` | Time formatting utilities |
| `src/utils/dateUtils.ts` | Date comparison and manipulation |
| `src/hooks/useTimer.ts` | Core timer logic (timestamp-based) |
| `src/store/timerStore.ts` | Timer global state |
| `src/store/sessionStore.ts` | Session history (persisted) |
| `src/store/settingsStore.ts` | User preferences (persisted) |
| `src/store/streakStore.ts` | Streak data (persisted) |

---

*AGENT.md v1.0 — Focusly*
*Update this file when architecture decisions change. Keep PRD.md as the source of truth.*