import type { ReactNode } from 'react'
import { Header } from './Header'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-surface text-foreground flex flex-col">
      <Header />
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-28">
        {children}
      </main>
      <footer className="py-5 text-center text-xs text-muted-foreground/60 border-t border-border/10">
        Focusly &copy; {new Date().getFullYear()}
      </footer>
    </div>
  )
}
