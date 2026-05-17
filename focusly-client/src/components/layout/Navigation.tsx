import { NavLink } from 'react-router-dom'
import { Timer, BarChart3, History, Settings } from 'lucide-react'

const navItems = [
  { to: '/', label: 'Timer', icon: Timer },
  { to: '/stats', label: 'Stats', icon: BarChart3 },
  { to: '/history', label: 'History', icon: History },
  { to: '/settings', label: 'Settings', icon: Settings },
] as const

export function Navigation() {
  return (
    <nav className="flex items-center gap-1">
      {navItems.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) =>
            `flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? 'bg-accent/10 text-accent'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent/5'
            }`
          }
        >
          <Icon className="h-4 w-4 shrink-0" />
          <span className="hidden sm:inline">{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
