import React, { useEffect, useState, useCallback } from 'react';

import { useTimerStore } from '@/store/timerStore';
import { useSettingsStore } from '@/store/settingsStore';
import { requestPermission } from '@/hooks/useNotification';
import { getFromStorage, saveToStorage } from '@/utils/storage';

const RESET_CONFIRM_MS = 1500;

const TimerControls: React.FC = () => {
  const status = useTimerStore((s) => s.status);
  const start = useTimerStore((s) => s.start);
  const pause = useTimerStore((s) => s.pause);
  const resume = useTimerStore((s) => s.resume);
  const reset = useTimerStore((s) => s.reset);

  const notificationEnabled = useSettingsStore((s) => s.settings.notificationEnabled);

  const [confirmingReset, setConfirmingReset] = useState(false);
  const confirmTimerRef = React.useRef<number | null>(null);

  const clearConfirm = useCallback(() => {
    setConfirmingReset(false);
    if (confirmTimerRef.current) {
      window.clearTimeout(confirmTimerRef.current);
      confirmTimerRef.current = null;
    }
  }, []);

  const handleResetClick = useCallback(() => {
    if (!confirmingReset) {
      setConfirmingReset(true);
      confirmTimerRef.current = window.setTimeout(() => setConfirmingReset(false), RESET_CONFIRM_MS);
    } else {
      reset();
      clearConfirm();
    }
  }, [confirmingReset, reset, clearConfirm]);

  const handleStart = useCallback(() => {
    try {
      const alreadyRequested = getFromStorage<boolean>('notification_permission_requested', false);
      if (notificationEnabled && !alreadyRequested) {
        saveToStorage('notification_permission_requested', true);
        void requestPermission();
      }
    } catch (e) {
      // ignore storage errors
    }

    start();
  }, [notificationEnabled, start]);

  // Keyboard shortcuts: Space = Start/Pause toggle, R = Reset (with confirmation)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      // ignore when typing into inputs
      if (target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA' || target?.isContentEditable) return;

      if (e.code === 'Space') {
        e.preventDefault();
        if (status === 'idle') handleStart();
        else if (status === 'running') pause();
        else if (status === 'paused') resume();
      }

      if (e.key.toLowerCase() === 'r') {
        // emulate click behavior
        handleResetClick();
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [status, handleStart, pause, resume, handleResetClick]);

  useEffect(() => {
    return () => clearConfirm();
  }, [clearConfirm]);

  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:mt-12">
      <button
        onClick={status !== 'idle' ? handleResetClick : undefined}
        disabled={status === 'idle'}
        className={`flex h-12 w-12 items-center justify-center rounded-full border border-outline-variant/50 transition-colors sm:h-14 sm:w-14 ${
          status === 'idle'
            ? 'cursor-not-allowed text-cool-gray opacity-50'
            : confirmingReset
            ? 'border-error/50 text-error hover:bg-error/10'
            : 'text-cool-gray hover:bg-rich-black/30 hover:text-canvas-white'
        }`}
        title={confirmingReset ? 'Confirm Reset' : 'Reset'}
      >
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>
          restart_alt
        </span>
      </button>

      {status === 'running' ? (
        <button
          onClick={pause}
          className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-on-primary shadow-sm transition-transform hover:scale-95 sm:h-24 sm:w-24"
          title="Pause"
        >
          <span className="material-symbols-outlined text-4xl sm:text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            pause
          </span>
        </button>
      ) : (
        <button
          onClick={status === 'idle' ? handleStart : resume}
          className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-on-primary shadow-sm transition-transform hover:scale-95 sm:h-24 sm:w-24"
          title={status === 'idle' ? 'Start' : 'Resume'}
        >
          <span className="material-symbols-outlined text-4xl sm:text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            play_arrow
          </span>
        </button>
      )}

      <button
        disabled
        className="flex h-12 w-12 items-center justify-center rounded-full border border-outline-variant/50 text-cool-gray opacity-50 transition-colors sm:h-14 sm:w-14"
        title="Skip Next"
      >
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>
          skip_next
        </span>
      </button>
    </div>
  );
};

export default TimerControls;
