import React, { useEffect, useState } from 'react';
import { useTimerStore } from '@/store/timerStore';
import { formatTime } from '@/utils/time';

const TimerDisplay: React.FC = () => {
  const timeLeft = useTimerStore((s) => s.timeLeft);
  const mode = useTimerStore((s) => s.mode);

  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    // small flicker/transition when seconds change
    setPulse(true);
    const t = setTimeout(() => setPulse(false), 180);
    return () => clearTimeout(t);
  }, [timeLeft]);

  const colorClass = mode === 'focus' ? 'text-cofounder-blue' : 'text-action-azure';

  return (
    <div className="flex flex-col items-center">
      <h2
        className={`font-mono text-display tracking-tighter transition-transform duration-150 ${colorClass} ${
          pulse ? 'scale-[1.01] opacity-95' : 'scale-100 opacity-100'
        }`}
        style={{ fontFeatureSettings: "'tnum'" }}
      >
        {formatTime(timeLeft)}
      </h2>
    </div>
  );
};

export default TimerDisplay;
