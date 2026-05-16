export type SessionType = 'focus' | 'break'

export interface Session {
  id: string
  type: SessionType
  startTime: string // ISO
  endTime?: string // ISO
  duration: number // seconds
  completed: boolean
}

export interface UserSettings {
  dailyGoal: number
  focusDuration: number
  breakDuration: number
  notificationEnabled: boolean
  soundEnabled: boolean
}

export interface StreakData {
  currentStreak: number
  longestStreak: number
  lastActiveDate?: string
}

export type TimerMode = 'focus' | 'break'
export type TimerStatus = 'idle' | 'running' | 'paused'
