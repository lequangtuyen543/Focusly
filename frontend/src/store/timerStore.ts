import create from 'zustand'
import { Session } from '@/types'

interface TimerStore {
  isRunning: boolean
  seconds: number
  start: () => void
  pause: () => void
  reset: () => void
  sessions: Session[]
  addSession: (s: Session) => void
}

export const useTimerStore = create<TimerStore>((set) => ({
  isRunning: false,
  seconds: 0,
  start: () => set({ isRunning: true }),
  pause: () => set({ isRunning: false }),
  reset: () => set({ seconds: 0, isRunning: false }),
  sessions: [],
  addSession: (s: Session) => set((state) => ({ sessions: [...state.sessions, s] })),
}))

export default useTimerStore
