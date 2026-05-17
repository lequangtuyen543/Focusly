import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressRingProps {
  value: number;
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
  children?: React.ReactNode;
}

const ProgressRing: React.FC<ProgressRingProps> = ({
  value,
  size = 120,
  color = 'stroke-cofounder-blue',
  strokeWidth = 8,
  className,
  children,
}) => {
  const clampedValue = Math.min(100, Math.max(0, value));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - clampedValue / 100);
  const isCustom = color.startsWith('#');
  const glowId = React.useId();

  return (
    <div
      className={cn('relative inline-flex items-center justify-center', className)}
      style={{ width: size, height: size }}
      role="progressbar"
      aria-valuenow={clampedValue}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <svg width={size} height={size} className="absolute inset-0 -rotate-90">
        <defs>
          <filter id={`glow-${glowId}`}>
            <feDropShadow
              dx={0}
              dy={0}
              stdDeviation={3}
              floodColor={isCustom ? color : '#0081c0'}
              floodOpacity={0.2}
            />
          </filter>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          className="stroke-steel-gray"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={cn(
            'transition-all duration-700 ease-out',
            !isCustom && color,
          )}
          style={{
            ...(isCustom ? { stroke: color } : {}),
            filter: `url(#glow-${glowId})`,
          }}
        />
      </svg>
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
};

export { ProgressRing };
export type { ProgressRingProps };
