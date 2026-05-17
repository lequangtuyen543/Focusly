import { Navigation } from './Navigation'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/10 bg-surface/80 backdrop-blur-xl supports-[backdrop-filter]:bg-surface/60">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        <a
          href="/"
          className="text-lg font-semibold tracking-tight text-foreground hover:text-accent transition-colors"
        >
          Focusly
        </a>
        <Navigation />
      </div>
    </header>
  )
}
