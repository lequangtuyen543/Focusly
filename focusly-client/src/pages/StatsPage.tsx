import { useMemo } from 'react';
import { useSessionStore } from '@/store/sessionStore';
import { useStreakStore } from '@/store/streakStore';
import { useSettingsStore } from '@/store/settingsStore';
import {
  TodaySummary,
  WeeklyChart,
  StreakDisplay,
  StatCard,
} from '@/components/stats';
import type { WeeklyChartData } from '@/components/stats/WeeklyChart';
import { isToday, getWeekDays, isSameDay } from '@/utils/dateUtils';

function StatsPage() {
  const sessions = useSessionStore((state) => state.sessions);
  const streak = useStreakStore((state) => state.streak);
  const settings = useSettingsStore((state) => state.settings);

  // Compute Today's Data
  const { todayFocusSeconds, todayPomodoros } = useMemo(() => {
    let focusTime = 0;
    let pomodoros = 0;
    sessions.forEach((s) => {
      if (isToday(s.startTime)) {
        focusTime += s.duration;
        pomodoros += 1;
      }
    });
    return { todayFocusSeconds: focusTime, todayPomodoros: pomodoros };
  }, [sessions]);

  // Compute All-time Data
  const { totalFocusSeconds, totalPomodoros } = useMemo(() => {
    let focusTime = 0;
    let pomodoros = sessions.length;
    sessions.forEach((s) => {
      focusTime += s.duration;
    });
    return { totalFocusSeconds: focusTime, totalPomodoros: pomodoros };
  }, [sessions]);

  // Compute Weekly Chart Data
  const weeklyData = useMemo<WeeklyChartData[]>(() => {
    const weekDays = getWeekDays(); // Array of YYYY-MM-DD
    const chartData: WeeklyChartData[] = weekDays.map((dayKey) => {
      const daySessions = sessions.filter((s) => isSameDay(s.startTime, dayKey));
      const count = daySessions.length;

      const date = new Date(dayKey);
      const shortDay = new Intl.DateTimeFormat('vi-VN', { weekday: 'short' }).format(date);
      const longDayDate = new Intl.DateTimeFormat('vi-VN', {
        weekday: 'long',
        day: '2-digit',
        month: '2-digit',
      }).format(date);

      return {
        shortDay,
        longDayDate,
        count,
        isToday: isToday(dayKey),
      };
    });
    return chartData;
  }, [sessions]);

  // Format Hours for display
  const formatHours = (seconds: number) => {
    return (seconds / 3600).toFixed(1);
  };

  return (
    <div className="flex flex-col gap-6 pb-20">
      <section className="mb-2 px-1">
        <h1 className="mb-4 font-heading-lg text-heading-lg text-canvas-white">
          Your Progress
        </h1>
        <p className="max-w-2xl font-body text-body text-cool-gray">
          A high-level overview of your focus sessions and productivity trends. Consistent effort compounds over time.
        </p>
      </section>

      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <div className="flex flex-col gap-6">
          <TodaySummary
            totalFocusSeconds={todayFocusSeconds}
            pomodoros={todayPomodoros}
            dailyGoal={settings.dailyGoal}
          />
          <WeeklyChart data={weeklyData} />
        </div>

        <div className="flex flex-col gap-6">
          <StreakDisplay
            currentStreak={streak.currentStreak}
            bestStreak={streak.longestStreak}
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <StatCard
              label="Total Focus Time"
              value={`${formatHours(totalFocusSeconds)}h`}
              icon={<span className="material-symbols-outlined">schedule</span>}
            />
            <StatCard
              label="Total Pomodoros"
              value={totalPomodoros}
              subText="Completed sessions"
              icon={<span className="material-symbols-outlined">task_alt</span>}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatsPage;
