import { create } from 'zustand';
import type { TimerMode, TimerStatus } from '@/types';

const DEFAULT_FOCUS_DURATION = 1500;
const DEFAULT_BREAK_DURATION = 300;

interface TimerState {
  mode: TimerMode;
  status: TimerStatus;
  timeLeft: number;
  startTimestamp: number | null;
}

interface TimerActions {
  start: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  tick: () => void;
}

const initialState: TimerState = {
  mode: 'focus',
  status: 'idle',
  timeLeft: DEFAULT_FOCUS_DURATION,
  startTimestamp: null,
};

export const useTimerStore = create<TimerState & TimerActions>((set, get) => ({
  ...initialState,

  start: () => {
    const { mode } = get();
    const duration = mode === 'focus' ? DEFAULT_FOCUS_DURATION : DEFAULT_BREAK_DURATION;
    set({
      status: 'running',
      startTimestamp: Date.now(),
      timeLeft: duration,
    });
  },

  pause: () => {
    set({ status: 'paused', startTimestamp: null });
  },

  resume: () => {
    const { timeLeft, mode } = get();
    const totalDurationMs = (mode === 'focus' ? DEFAULT_FOCUS_DURATION : DEFAULT_BREAK_DURATION) * 1000;
    const elapsedMs = totalDurationMs - timeLeft * 1000;
    set({
      status: 'running',
      startTimestamp: Date.now() - elapsedMs,
    });
  },

  reset: () => {
    const { mode } = get();
    const duration = mode === 'focus' ? DEFAULT_FOCUS_DURATION : DEFAULT_BREAK_DURATION;
    set({
      status: 'idle',
      timeLeft: duration,
      startTimestamp: null,
    });
  },

  tick: () => {
    const { status, startTimestamp, mode } = get();
    if (status !== 'running' || startTimestamp === null) return;

    const totalDurationMs = (mode === 'focus' ? DEFAULT_FOCUS_DURATION : DEFAULT_BREAK_DURATION) * 1000;
    const elapsed = Date.now() - startTimestamp;
    const remaining = Math.max(0, Math.round((totalDurationMs - elapsed) / 1000));

    set({ timeLeft: remaining });
  },
}));

export default useTimerStore;
