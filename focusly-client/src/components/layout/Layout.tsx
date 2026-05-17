import type { ReactNode } from 'react'
import { Header } from './Header'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-canvas-white text-dark-charcoal font-body flex flex-col">
      <Header />
      <main className="flex-1 w-full max-w-[1200px] mx-auto px-6 md:px-8 pt-32 pb-24">
        {children}
      </main>
      <footer className="w-full py-12 border-t border-outline-variant/10 bg-transparent mt-auto">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center px-8 gap-4">
          <div className="font-heading text-subheading text-dark-charcoal">Focusly</div>
          <div className="font-caption text-caption text-medium-gray opacity-80 hover:opacity-100 duration-200">
            &copy; {new Date().getFullYear()} Focusly. Deep focus, architected.
          </div>
          <div className="flex gap-6">
            <a className="font-caption text-caption text-medium-gray hover:text-cofounder-blue transition-colors" href="#">Privacy Policy</a>
            <a className="font-caption text-caption text-medium-gray hover:text-cofounder-blue transition-colors" href="#">Terms of Service</a>
            <a className="font-caption text-caption text-medium-gray hover:text-cofounder-blue transition-colors" href="#">Support</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
