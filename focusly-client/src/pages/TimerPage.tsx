import { useState, useCallback } from 'react';
import { SessionStatus, TimerDisplay, TimerControls } from '@/components/timer';
import useTimer from '@/hooks/useTimer';
import { getRandomQuote } from '@/data/quotes';
import { useSessionStore } from '@/store/sessionStore';
import { useStreakStore } from '@/store/streakStore';
import { useTimerStore } from '@/store/timerStore';

function TimerPage() {
  const [quote, setQuote] = useState(() => getRandomQuote());
  const sessionStore = useSessionStore();
  const streakStore = useStreakStore();


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

        {/* Controls */}
        <div className="flex items-center gap-6 mt-12">
          <TimerControls />
        </div>
      </section>

      {/* Quote card */}
      <section className="w-full max-w-md mx-auto mt-8">
        <div className="bg-off-white rounded-xl p-6 border border-outline-variant/10 shadow-card">
          <div className="font-caption text-caption text-medium-gray mb-2">Focus Quote</div>
          <div className="font-body text-body text-dark-charcoal">{quote}</div>
          <div className="mt-4 flex justify-end">
            <button
              className="text-caption text-medium-gray hover:text-cofounder-blue"
              onClick={() => setQuote(getRandomQuote())}
            >
              Refresh
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TimerPage;
