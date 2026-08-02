import type { ReactNode } from 'react'
import { Header } from './Header'
import { useTimerStore } from '@/store/timerStore'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const mode = useTimerStore((s) => s.mode);
  const status = useTimerStore((s) => s.status);

  const bgClass = status === 'running'
    ? mode === 'focus' ? 'bg-cofounder-blue/10' : 'bg-action-azure/10'
    : 'bg-[#171717]';

  return (
    <div className={`min-h-screen text-canvas-white font-body flex min-w-0 flex-col transition-colors duration-500 ease-in-out ${bgClass}`}>
      <Header />
      <main className="mx-auto flex-1 w-full max-w-6xl overflow-x-hidden px-3 pt-24 pb-24 sm:px-6 sm:pt-28 md:px-8 md:pt-32 lg:px-10 xl:px-12">
        {children}
      </main>
      <footer className="mt-auto w-full border-t border-outline-variant/10 py-8 sm:py-10 lg:py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-3 text-center sm:px-6 md:flex-row md:justify-between md:text-left lg:px-10 xl:px-12">
          <div className="font-heading text-subheading text-canvas-white">Focusly</div>
          <div className="font-caption text-caption text-cool-gray opacity-80 duration-200 hover:opacity-100">
            &copy; {new Date().getFullYear()} Focusly. Deep focus, architected.
          </div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <a className="font-caption text-caption text-cool-gray transition-colors hover:text-cofounder-blue" href="#">Privacy Policy</a>
            <a className="font-caption text-caption text-cool-gray transition-colors hover:text-cofounder-blue" href="#">Terms of Service</a>
            <a className="font-caption text-caption text-cool-gray transition-colors hover:text-cofounder-blue" href="#">Support</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
