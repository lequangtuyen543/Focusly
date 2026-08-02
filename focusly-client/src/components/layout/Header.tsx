import { Navigation } from './Navigation'

export function Header() {
  return (
    <header className="fixed left-1/2 top-2 z-50 w-[calc(100%-0.5rem)] max-w-6xl -translate-x-1/2 overflow-x-hidden sm:top-4 md:top-6">
      <div className="mx-auto flex w-full items-center justify-between rounded-full border border-outline-variant/20 bg-rich-black/80 px-2.5 py-2 shadow-nav-item backdrop-blur-xl sm:px-6 sm:py-3 md:px-8">
        <a
          href="/"
          className="font-heading-lg text-subheading font-bold text-canvas-white transition-colors hover:text-cofounder-blue"
        >
          Focusly
        </a>
        <Navigation />
      </div>
    </header>
  )
}
