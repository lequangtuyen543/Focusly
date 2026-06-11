import React from 'react';
import { useTimerStore } from '@/store/timerStore';
import { useSessionStore } from '@/store/sessionStore';

const SessionStatus: React.FC = () => {
  const mode = useTimerStore((s) => s.mode);
  const todaySessions = useSessionStore((s) => s.getTodaySessions());

  // session number for the next session (1-based)
  const sessionNumber = todaySessions.filter((s) => s.type === 'focus' && s.completed).length + 1;

  return (
    <div className="flex flex-col items-center">
      <div className="px-3 py-1 rounded-full bg-cofounder-blue/10 text-cofounder-blue font-caption uppercase tracking-widest font-semibold">
        {mode === 'focus' ? 'FOCUS' : 'BREAK'}
      </div>
      <div className="mt-2 text-body text-medium-gray">Session #{sessionNumber} today</div>
    </div>
  );
};

export default SessionStatus;
