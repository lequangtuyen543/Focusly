import React, { useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { useTimerStore } from '@/store/timerStore';

const RESET_CONFIRM_MS = 1500;

const TimerControls: React.FC = () => {
  const status = useTimerStore((s) => s.status);
  const start = useTimerStore((s) => s.start);
  const pause = useTimerStore((s) => s.pause);
  const resume = useTimerStore((s) => s.resume);
  const reset = useTimerStore((s) => s.reset);

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

  // Keyboard shortcuts: Space = Start/Pause toggle, R = Reset (with confirmation)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      // ignore when typing into inputs
      if (target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA' || target?.isContentEditable) return;

      if (e.code === 'Space') {
        e.preventDefault();
        if (status === 'idle') start();
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
  }, [status, start, pause, resume, handleResetClick]);

  useEffect(() => {
    return () => clearConfirm();
  }, [clearConfirm]);

  return (
    <div className="flex items-center gap-4">
      {status === 'idle' && (
        <Button variant="primary" size="lg" onClick={start}>
          Start
        </Button>
      )}

      {status === 'running' && (
        <Button variant="secondary" size="lg" onClick={pause}>
          Pause
        </Button>
      )}

      {status === 'paused' && (
        <Button variant="secondary" size="lg" onClick={resume}>
          Resume
        </Button>
      )}

      {status !== 'idle' && (
        <Button
          variant={confirmingReset ? 'danger' : 'ghost'}
          size="md"
          onClick={handleResetClick}
          className="ml-2"
        >
          {confirmingReset ? 'Confirm Reset' : 'Reset'}
        </Button>
      )}
    </div>
  );
};

export default TimerControls;
