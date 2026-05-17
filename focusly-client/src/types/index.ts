/** Focus or break session variant */
export type SessionType = 'focus' | 'break';

/** A single completed or cancelled timer session */
export interface Session {
  id: string;
  type: SessionType;
  startTime: string;
  endTime: string;
  duration: number;
  completed: boolean;
}

/** Persisted user preferences */
export interface UserSettings {
  dailyGoal: number;
  focusDuration: number;
  breakDuration: number;
  notificationEnabled: boolean;
  soundEnabled: boolean;
}

/** Streak tracking data */
export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
}

/** Aggregate stats for a single day */
export interface DailyStats {
  date: string;
  totalFocusTime: number;
  totalPomodoros: number;
  completedSessions: number;
  breakSessions: number;
}

/** Current timer mode */
export type TimerMode = 'focus' | 'break';

/** Current timer lifecycle status */
export type TimerStatus = 'idle' | 'running' | 'paused';
