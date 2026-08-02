import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: string | number;
  subText?: string;
  icon?: React.ReactNode;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, subText, icon, className }) => {
  return (
    <Card className={cn('p-6', className)}>
      <CardContent className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-light-gray">
          <span className="text-body font-medium">{label}</span>
          {icon && <span className="text-xl">{icon}</span>}
        </div>
        <div className="text-4xl font-bold text-canvas-white font-mono">
          {value}
        </div>
        {subText && (
          <div className="text-caption text-light-gray mt-1">
            {subText}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
