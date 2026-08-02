import React from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon-sm';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-cofounder-blue text-canvas-white hover:bg-action-azure active:bg-cofounder-blue/80 shadow-sm',
  secondary:
    'bg-night-sky text-canvas-white border border-rich-black hover:bg-rich-black active:bg-night-sky shadow-sm',
  ghost:
    'bg-transparent text-cool-gray hover:text-canvas-white hover:bg-rich-black/30 active:bg-rich-black/40',
  danger:
    'bg-transparent text-error hover:bg-error/10 active:bg-error/15 border border-error/30',
  outline:
    'bg-transparent text-cool-gray border border-outline-variant/40 hover:bg-rich-black/30 active:bg-rich-black/40',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-[13px] leading-none gap-1.5 font-semibold',
  md: 'h-10 px-4 text-button-label gap-2',
  lg: 'h-12 px-6 text-button-label gap-2.5',
  'icon-sm': 'h-8 w-8 p-0 text-[13px] leading-none gap-0 font-semibold',
};

const spinnerSizes: Record<ButtonSize, string> = {
  sm: 'h-3.5 w-3.5',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
  'icon-sm': 'h-4 w-4',
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading = false, className, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center rounded transition-all duration-150 motion-reduce:transition-none',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cofounder-blue/50 focus-visible:ring-offset-2 focus-visible:ring-offset-rich-black/70',
          'disabled:pointer-events-none disabled:opacity-50',
          'hover:scale-[1.02] hover:shadow-md active:scale-[0.98]',
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {loading && (
          <svg
            className={cn('animate-spin', spinnerSizes[size])}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export { Button };
export type { ButtonProps, ButtonVariant, ButtonSize };
