import React from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'success' | 'warning' | 'focus' | 'break';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const badgeVariants: Record<BadgeVariant, string> = {
  default: 'bg-dark-charcoal/10 text-dark-charcoal',
  success: 'bg-action-azure/10 text-action-azure',
  warning: 'bg-rich-black/10 text-rich-black',
  focus: 'bg-cofounder-blue text-canvas-white',
  break: 'bg-ash-gray text-medium-gray',
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
