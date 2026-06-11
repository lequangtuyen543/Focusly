import React from 'react';
import { useTimerStore } from '@/store/timerStore';
import { useSessionStore } from '@/store/sessionStore';
import { isToday } from '@/utils/dateUtils';

const SessionStatus: React.FC = () => {
  const mode = useTimerStore((s) => s.mode);
  // Use a primitive selector to avoid infinite loop from new array refs
  const todayCompletedFocusCount = useSessionStore(
    (s) => s.sessions.filter((session) => session.type === 'focus' && session.completed && isToday(session.startTime)).length
  );

  const sessionNumber = todayCompletedFocusCount + 1;

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
