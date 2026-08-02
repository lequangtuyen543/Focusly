import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Timer' },
  { to: '/stats', label: 'Stats' },
  { to: '/history', label: 'History' },
  { to: '/settings', label: 'Settings' },
] as const

export function Navigation() {
  return (
    <>
      <nav className="hidden items-center gap-2 md:flex">
        {navItems.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `scale-98 rounded-nav-pill px-4 py-2 font-body text-button-label transition-all duration-200 ease-out ${
                isActive
                  ? 'border-b-2 border-cofounder-blue pb-1 font-semibold text-cofounder-blue'
                  : 'font-medium text-cool-gray hover:bg-rich-black/30 hover:text-canvas-white'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>

      <nav className="fixed bottom-3 left-1/2 z-40 flex w-[calc(100%-1rem)] max-w-[24rem] -translate-x-1/2 items-center justify-between rounded-full border border-outline-variant/20 bg-rich-black/90 px-2 py-2 shadow-nav-item backdrop-blur-xl md:hidden">
        {navItems.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center justify-center rounded-full px-3 py-2 text-[11px] font-medium transition-all ${
                isActive
                  ? 'bg-cofounder-blue/20 text-cofounder-blue'
                  : 'text-cool-gray hover:bg-rich-black/30 hover:text-canvas-white'
              }`
            }
          >
            <span className="text-[14px] leading-none">{label === 'Timer' ? '⏱' : label === 'Stats' ? '📊' : label === 'History' ? '🕘' : '⚙'}</span>
            <span className="mt-1">{label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  )
}
