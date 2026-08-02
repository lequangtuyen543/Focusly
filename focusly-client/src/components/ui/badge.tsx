import React from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'success' | 'warning' | 'focus' | 'break';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const badgeVariants: Record<BadgeVariant, string> = {
  default: 'bg-rich-black/50 text-canvas-white border border-outline-variant/20',
  success: 'bg-action-azure/15 text-action-azure border border-action-azure/25',
  warning: 'bg-rich-black/50 text-cool-gray border border-outline-variant/20',
  focus: 'bg-cofounder-blue text-canvas-white',
  break: 'bg-rich-black/50 text-cool-gray border border-outline-variant/20',
};

const Badge: React.FC<BadgeProps> = ({ variant = 'default', className, children, ...props }) => {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-nav-pill px-2.5 py-0.5 text-caption font-medium whitespace-nowrap',
        'transition-colors duration-150',
        badgeVariants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export { Badge };
export type { BadgeProps, BadgeVariant };
