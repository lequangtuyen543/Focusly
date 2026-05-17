import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Timer' },
  { to: '/stats', label: 'Stats' },
  { to: '/history', label: 'History' },
  { to: '/settings', label: 'Settings' },
] as const

export function Navigation() {
  return (
    <nav className="hidden md:flex items-center gap-2">
      {navItems.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) =>
            `font-body text-button-label px-4 py-2 rounded-nav-pill transition-all duration-200 ease-out scale-98 ${
              isActive
                ? 'text-cofounder-blue font-semibold border-b-2 border-cofounder-blue pb-1'
                : 'text-slate-gray font-medium hover:text-dark-charcoal hover:bg-surface-container-high/50'
            }`
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
