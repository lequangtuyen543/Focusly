import { Navigation } from './Navigation'

export function Header() {
  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 w-full max-w-[1200px] z-50 rounded-nav-pill bg-ash-gray/80 backdrop-blur-xl border border-outline-variant/20 shadow-nav-item">
      <div className="flex justify-between items-center px-6 md:px-8 py-3 w-full mx-auto">
        <a
          href="/"
          className="font-heading-lg text-subheading font-bold text-dark-charcoal hover:text-cofounder-blue transition-colors"
        >
          Focusly
        </a>
        <Navigation />
      </div>
    </header>
  )
}
