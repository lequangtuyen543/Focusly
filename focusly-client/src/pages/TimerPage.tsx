import { useState, useCallback, useEffect, useRef } from 'react';
import { SessionStatus, TimerDisplay, TimerControls } from '@/components/timer';
import { isToday } from '@/utils/dateUtils';
import DailyProgress from '@/components/timer/DailyProgress';
import useTimer from '@/hooks/useTimer';
import FocusQuote from '@/components/timer/FocusQuote';
import { useSessionStore } from '@/store/sessionStore';
import { useStreakStore } from '@/store/streakStore';
import { useTimerStore } from '@/store/timerStore';
import { useSettingsStore } from '@/store/settingsStore';
import { sendNotification } from '@/hooks/useNotification';
import { playFocusCompleteBeep, playBreakCompleteBeep } from '@/utils/audio';
import { ProgressRing } from '@/components/ui/ProgressRing';

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

      // Notification / audio handling
      try {
        const { notificationEnabled, soundEnabled } = useSettingsStore.getState().settings;

        const title = mode === 'focus' ? 'Focus Session Complete' : 'Break Complete';
        const body = mode === 'focus' ? 'Time for a break.' : 'Ready to focus again.';

        if (notificationEnabled) {
          const canNotify = typeof Notification !== 'undefined' && Notification.permission === 'granted' && typeof document !== 'undefined' && document.hidden;
          if (canNotify) {
            sendNotification(title, body);
          } else if (soundEnabled) {
            if (mode === 'focus') playFocusCompleteBeep();
            else playBreakCompleteBeep();
          }
        } else {
          // notifications disabled — fallback to sound only if enabled
          if (soundEnabled) {
            if (mode === 'focus') playFocusCompleteBeep();
            else playBreakCompleteBeep();
          }
        }
      } catch (e) {
        // swallow any errors in notification/audio logic
      }
    },
    [sessionStore, streakStore],
  );

  // start the timer engine with completion callback
  useTimer(onSessionComplete);

  const timeLeft = useTimerStore((s) => s.timeLeft);
  const mode = useTimerStore((s) => s.mode);
  const status = useTimerStore((s) => s.status);
  
  const { focusDuration, breakDuration } = useSettingsStore((s) => s.settings);
  const duration = mode === 'focus' ? focusDuration : breakDuration;
  const progress = status === 'idle' ? 0 : Math.max(0, Math.min(100, ((duration - timeLeft) / duration) * 100));

  const [pulsing, setPulsing] = useState(false);
  const prevCompleteRef = useRef(false);

  useEffect(() => {
    const reached = progress >= 100;
    if (reached && !prevCompleteRef.current) {
      setPulsing(true);
      const t = setTimeout(() => setPulsing(false), 700);
      prevCompleteRef.current = true;
      return () => clearTimeout(t);
    }
    if (!reached) prevCompleteRef.current = false;
  }, [progress]);

  return (
    <div className="flex flex-col items-center gap-6 sm:gap-8 lg:gap-10">
      <header className="mx-auto w-full max-w-2xl space-y-3 px-2 text-center sm:space-y-4">
        <h1 className="font-heading text-heading text-canvas-white">Good morning.</h1>
        <p className="font-body text-subheading text-cool-gray">
          “Architecture starts when you carefully put two bricks together.” — Mies van der Rohe
        </p>
      </header>

      <section className="flex w-full flex-col items-center justify-center">
        <div className="flex w-full flex-col items-center gap-6 lg:flex-row lg:items-center lg:justify-center lg:gap-8">
          <div className={`relative flex aspect-square w-[min(82vw,24rem)] items-center justify-center rounded-[28px] border border-outline-variant/15 bg-rich-black/70 shadow-card transition-transform duration-300 ease-out sm:w-[min(78vw,26rem)] sm:rounded-[40px] lg:w-[min(38vw,26rem)] ${pulsing ? 'scale-105' : 'scale-100'}`}>
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-50">
              <ProgressRing value={progress} size={220} className="md:hidden" color={mode === 'focus' ? 'stroke-cofounder-blue' : 'stroke-action-azure'} strokeWidth={6} />
              <ProgressRing value={progress} size={320} className="hidden md:inline-flex" color={mode === 'focus' ? 'stroke-cofounder-blue' : 'stroke-action-azure'} strokeWidth={6} />
            </div>

            <div className="z-10 flex flex-col items-center gap-3 px-4 text-center sm:gap-4">
              <SessionStatus />
              <TimerDisplay />
              <span className="font-body text-body text-cool-gray">Pomodoro</span>
            </div>
          </div>

          <div className="flex items-center justify-center lg:min-w-[7rem]">
            <DailyProgress size={96} className="hidden lg:block" />
          </div>
        </div>

        <div className="mt-8 w-full px-2 sm:px-0">
          <TimerControls />
        </div>
      </section>

      <FocusQuote />
    </div>
  );
}

export default TimerPage;
