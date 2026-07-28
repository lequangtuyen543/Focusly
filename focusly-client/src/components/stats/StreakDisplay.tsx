import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface StreakDisplayProps {
  currentStreak: number;
  bestStreak: number;
  className?: string;
}

const StreakDisplay: React.FC<StreakDisplayProps> = ({ currentStreak, bestStreak, className }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (currentStreak > 0) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 600);
      return () => clearTimeout(timer);
    }
  }, [currentStreak]);

  return (
    <Card className={cn('p-6', className)}>
      <CardContent className="flex flex-col items-center justify-center gap-4 text-center">
        <Badge variant="warning" className="text-sm px-3 py-1">
          🔥 Current Streak
        </Badge>
        
        <div 
          className={cn(
            'text-6xl font-bold text-dark-charcoal font-mono motion-reduce:animate-none',
            animate && 'animate-bounce-in'
          )}
        >
          {currentStreak}
        </div>
        
        <div className="text-body text-medium-gray mt-2">
          Kỷ lục: {bestStreak} ngày
        </div>
      </CardContent>
    </Card>
  );
};

export default StreakDisplay;
