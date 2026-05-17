import type { Session, StreakData } from '@/types';
import { toDateKey } from './dateUtils';

export function isConsecutiveDay(a: string, b: string): boolean {
  const d1 = new Date(a + 'T00:00:00');
  const d2 = new Date(b + 'T00:00:00');
  return Math.abs(d1.getTime() - d2.getTime()) === 86_400_000;
}

/** Count consecutive days with focus sessions, and record longest run. */
export function calculateStreak(sessions: Session[]): StreakData {
  const active = sessions.filter((s) => s.type === 'focus' && s.completed);
  if (active.length === 0) {
    return { currentStreak: 0, longestStreak: 0, lastActiveDate: '' };
  }

  const seen = new Set<string>();
  for (const s of active) seen.add(toDateKey(new Date(s.startTime)));

  const dates = Array.from(seen).sort().reverse();
  const lastActiveDate = dates[0];
  const now = new Date();
  const today = toDateKey(now);

  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = toDateKey(yesterday);

  const isActive = lastActiveDate === today || lastActiveDate === yesterdayStr;

  let currentStreak = isActive ? 1 : 0;
  for (let i = 1; i < dates.length && isActive; i++) {
    if (isConsecutiveDay(dates[i - 1], dates[i])) {
      currentStreak++;
    } else {
      break;
    }
  }

  let longestStreak = 1;
  let run = 1;
  for (let i = 1; i < dates.length; i++) {
    run = isConsecutiveDay(dates[i - 1], dates[i]) ? run + 1 : 1;
    if (run > longestStreak) longestStreak = run;
  }

  return { currentStreak, longestStreak, lastActiveDate };
}
