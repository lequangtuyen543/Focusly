import { useEffect, useRef, useCallback } from 'react';
import { useTimerStore } from '@/store/timerStore';
import { useSettingsStore } from '@/store/settingsStore';
import { formatTime } from '@/utils/time';

type OnComplete = (mode: 'focus' | 'break') => void;

/**
 * useTimer hook
 * - drives the interval that updates the `timerStore` via its `tick()` action
 * - recalculates immediately on visibilitychange
 * - calls `onSessionComplete` once when a session reaches 0
 * - auto-switches `mode` (focus <-> break) and leaves timer in `idle` state
 */
export default function useTimer(onSessionComplete?: OnComplete) {
  const status = useTimerStore((s) => s.status);
  const timeLeft = useTimerStore((s) => s.timeLeft);
  const mode = useTimerStore((s) => s.mode);
  const startTimestamp = useTimerStore((s) => s.startTimestamp);

  const tick = useTimerStore((s) => s.tick);
  const start = useTimerStore((s) => s.start);
  const pause = useTimerStore((s) => s.pause);
  const resume = useTimerStore((s) => s.resume);
  const reset = useTimerStore((s) => s.reset);

  const { focusDuration, breakDuration } = useSettingsStore((s) => s.settings);

  const intervalRef = useRef<number | null>(null);
  const handledCompleteRef = useRef(false);

  // cleanup helper
  const clearIntervalRef = useCallback(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // start/stop interval based on status
  useEffect(() => {
    clearIntervalRef();

    if (status === 'running') {
      // run immediately then every 1s
      tick();
      intervalRef.current = window.setInterval(() => {
        tick();
      }, 1000);
    }

    return () => {
      clearIntervalRef();
    };
  }, [status, tick, clearIntervalRef]);

  // visibilitychange: force immediate recalculation when returning to tab
  useEffect(() => {
    const onVisibility = () => {
      if (document.visibilityState === 'visible' && status === 'running') tick();
    };

    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, [status, tick]);

  // update document.title
  useEffect(() => {
    if (status === 'running') {
      document.title = `${formatTime(timeLeft)} — Focusly`;
    } else {
      document.title = 'Focusly';
    }
  }, [status, timeLeft]);

  // handle session completion and auto-switch
  useEffect(() => {
    if (status !== 'running') {
      handledCompleteRef.current = false;
      return;
    }

    if (timeLeft <= 0 && !handledCompleteRef.current) {
      handledCompleteRef.current = true;

      // notify caller about which mode just finished
      onSessionComplete?.(mode);

      // compute next mode and duration
      const nextMode: 'focus' | 'break' = mode === 'focus' ? 'break' : 'focus';
      const nextDuration = nextMode === 'focus' ? focusDuration : breakDuration;

      // set store state: switch mode and reset into idle with correct timeLeft
      // use setState directly to toggle mode and reset timer without auto-starting
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore - Zustand's setState exists on the hook
      useTimerStore.setState({
        mode: nextMode,
        status: 'idle',
        timeLeft: nextDuration,
        startTimestamp: null,
      });

      // restore document title
      document.title = 'Focusly';
      clearIntervalRef();
    }
  }, [timeLeft, status, mode, onSessionComplete, focusDuration, breakDuration, clearIntervalRef]);

  // public API (proxy to store actions)
  return {
    start,
    pause,
    resume,
    reset,
    status,
    timeLeft,
    mode,
    startTimestamp,
  } as const;
}

