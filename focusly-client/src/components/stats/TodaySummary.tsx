import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Progress, ProgressLabel, ProgressValue } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

export interface TodaySummaryProps {
  totalFocusSeconds: number;
  pomodoros: number;
  dailyGoal: number;
  className?: string;
}

const formatHHMM = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
};

const TodaySummary: React.FC<TodaySummaryProps> = ({
  totalFocusSeconds,
  pomodoros,
  dailyGoal,
  className
}) => {
  const progressPercent = dailyGoal > 0 ? Math.min(100, Math.round((pomodoros / dailyGoal) * 100)) : 0;

  return (
    <Card className={cn('p-4 sm:p-6', className)}>
      <CardHeader className="mb-4">
        <CardTitle>Tổng quan hôm nay</CardTitle>
      </CardHeader>
      
      <CardContent className="flex flex-col gap-8">
        <div>
          <div className="text-body text-cool-gray mb-2">Thời gian tập trung</div>
          <div className="text-5xl font-bold text-canvas-white font-mono">
            {formatHHMM(totalFocusSeconds)}
          </div>
        </div>

        <div>
          <Progress value={progressPercent} className="w-full">
            <div className="flex w-full justify-between items-center mb-1">
              <ProgressLabel>Mục tiêu ngày</ProgressLabel>
              <ProgressValue>
                {() => `${pomodoros} / ${dailyGoal}`}
              </ProgressValue>
            </div>
          </Progress>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodaySummary;
