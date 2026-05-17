Project setup and commands (pnpm, React 18, Vite, Tailwind)

If starting a brand-new project (recommended isolated folder):

```bash
pnpm create vite@latest focusly -- --template react-ts
cd focusly
pnpm install
```

Install required dependencies:

```bash
pnpm add react@^18.2.0 react-dom@^18.2.0
pnpm add zustand recharts clsx tailwind-merge date-fns lucide-react @tailwindcss/forms
pnpm add -D tailwindcss postcss autoprefixer typescript vite @vitejs/plugin-react eslint @eslint/js eslint-plugin-react-hooks @types/react @types/react-dom vitest
```

Tailwind init (if not already present):

```bash
pnpm exec tailwindcss init -p
# edits to tailwind.config.ts are already provided in this repo
```

TypeScript build & dev:

```bash
pnpm dev
pnpm build
pnpm preview
```

Lint and format:

```bash
pnpm run lint
pnpm exec prettier --write .
```

Notes:
- This repo already contains Vite config with `@` alias to `src/`.
- `tsconfig.app.json` now enables `strict` mode.
- Prettier, EditorConfig and Tailwind theme have been added/updated for Focusly.
