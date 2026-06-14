import React from 'react';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { useSessionStore } from '@/store/sessionStore';
import { useSettingsStore } from '@/store/settingsStore';
import { isToday } from '@/utils/dateUtils';

const DailyProgress: React.FC<{ size?: number; className?: string }> = ({
  size = 112,
  className,
}) => {
  // Count completed focus sessions today (subscribe to sessions via selector)
  const completedPomodoros = useSessionStore(
    (s) => s.sessions.filter((session) => session.type === 'focus' && session.completed && isToday(session.startTime)).length
  );

  const dailyGoal = useSettingsStore((s) => s.settings.dailyGoal ?? 0);

  const progress = React.useMemo(() => {
    if (!dailyGoal || dailyGoal <= 0) return 0;
    return Math.min(100, Math.round((completedPomodoros / dailyGoal) * 100));
  }, [completedPomodoros, dailyGoal]);

  // choose token classes (no hardcoded colors)
  const ringColor =
    progress >= 100 ? 'stroke-green-600' : progress >= 50 ? 'stroke-cofounder-blue' : 'stroke-steel-gray';

  // single pulse when reaching 100% (non-looping)
  const [pulsing, setPulsing] = React.useState(false);
  const prevCompleteRef = React.useRef(false);

  React.useEffect(() => {
    const reached = progress >= 100;
    if (reached && !prevCompleteRef.current) {
      setPulsing(true);
      const t = setTimeout(() => setPulsing(false), 700);
      prevCompleteRef.current = true;
      return () => clearTimeout(t);
    }
    if (!reached) prevCompleteRef.current = false;
    return;
  }, [progress]);

  return (
    <div className={className}>
      <ProgressRing value={progress} size={size} strokeWidth={10} color={ringColor}>
        <div
          className={`flex flex-col items-center justify-center text-center transition-transform duration-300 ease-out ${
            pulsing ? 'scale-105' : 'scale-100'
          }`}
        >
          {progress >= 100 ? (
            <div className="font-semibold text-sm text-green-600">Hoàn thành!</div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="text-lg font-semibold text-dark-charcoal">{`${completedPomodoros} / ${dailyGoal}`}</div>
              <div className="text-xs text-medium-gray">Pomodoros</div>
            </div>
          )}
        </div>
      </ProgressRing>
    </div>
  );
};

export default DailyProgress;
