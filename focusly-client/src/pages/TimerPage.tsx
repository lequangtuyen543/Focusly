import { useState, useCallback, useEffect } from 'react';
import { SessionStatus, TimerDisplay, TimerControls } from '@/components/timer';
import { isToday } from '@/utils/dateUtils';
import DailyProgress from '@/components/timer/DailyProgress';
import useTimer from '@/hooks/useTimer';
import FocusQuote from '@/components/timer/FocusQuote';
import { useSessionStore } from '@/store/sessionStore';
import { useStreakStore } from '@/store/streakStore';
import { useTimerStore } from '@/store/timerStore';

function TimerPage() {
  
  const sessionStore = useSessionStore();
  const streakStore = useStreakStore();

  // On app load, ensure streak/daily calculations are refreshed if day changed
  useEffect(() => {
    try {
      const lastActive = streakStore.streak?.lastActiveDate ?? '';
      // if lastActive is not today, recalculate streaks based on persisted sessions
      if (lastActive && !isToday(lastActive)) {
        streakStore.updateStreak(sessionStore.sessions);
      }
      // if no lastActive (fresh), still run an update to initialize
      if (!lastActive) {
        streakStore.updateStreak(sessionStore.sessions);
      }
    } catch (e) {
      // defensive: ignore initialization errors
      // (no UI changes required)
    }
    // run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const onSessionComplete = useCallback((mode: 'focus' | 'break') => {
    // read startTimestamp at callback time to avoid stale snapshot
    const startTimestamp = useTimerStore.getState().startTimestamp;

    const endTime = new Date().toISOString();
    const startMs = startTimestamp ?? Date.now();
    const duration = Math.max(1, Math.round((Date.now() - startMs) / 1000));

      const session = {
        id: (typeof crypto !== 'undefined' && 'randomUUID' in crypto) ? (crypto as any).randomUUID() : `${Date.now()}-${Math.random()}`,
        type: mode,
        startTime: new Date(startMs).toISOString(),
        endTime,
        duration,
        completed: true,
      };

      sessionStore.addSession(session);
      // update streak using the latest sessions
      streakStore.updateStreak(useSessionStore.getState().sessions);

      // TODO: trigger notification / sound (handled elsewhere)
    },
    [sessionStore, streakStore],
  );

  // start the timer engine with completion callback
  useTimer(onSessionComplete);

  return (
    <div className="flex flex-col items-center gap-section-gap">
      {/* Greeting & Quote Header */}
      <header className="text-center w-full max-w-2xl mx-auto space-y-4">
        <h1 className="font-heading text-heading text-dark-charcoal">Good morning.</h1>
        <p className="font-body text-subheading text-medium-gray">
          “Architecture starts when you carefully put two bricks together.” — Mies van der Rohe
        </p>
      </header>

      {/* Timer Hero Section */}
      <section className="w-full max-w-md mx-auto relative flex flex-col items-center justify-center mt-8">
        <div className="relative w-72 h-72 md:w-80 md:h-80 flex items-center justify-center bg-off-white rounded-[40px] shadow-card border border-outline-variant/10">
          {/* Timer Display (central) */}
          <div className="text-center z-10 flex flex-col items-center gap-4">
            <SessionStatus />
            <TimerDisplay />
            <span className="font-body text-body text-slate-gray">Pomodoro</span>
          </div>
        </div>

        {/* Daily progress ring placed beside the timer on md+ screens; absolute so layout unchanged */}
        <div className="hidden md:block absolute right-[-72px] top-1/2 -translate-y-1/2">
          <DailyProgress size={96} />
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6 mt-12">
          <TimerControls />
        </div>
      </section>

      <FocusQuote />
    </div>
  );
}

export default TimerPage;
