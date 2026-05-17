import React from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline' | 'destructive' | 'default';
type ButtonSize = 'sm' | 'md' | 'lg' | 'default' | 'xs' | 'icon' | 'icon-sm' | 'icon-xs' | 'icon-lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-[#6c63ff] text-white hover:bg-[#5b52e0] active:bg-[#4a43c0] shadow-md hover:shadow-lg',
  secondary:
    'bg-[#43d9ad] text-[#1f1f29] hover:bg-[#3ac9a3] active:bg-[#2eb88d] shadow-md hover:shadow-lg',
  ghost:
    'bg-transparent text-[#9094a4] hover:bg-[#282834] hover:text-white border border-transparent',
  danger:
    'bg-[#ba1a1a] text-white hover:bg-[#a01515] active:bg-[#8a1212] shadow-md hover:shadow-lg',
  outline:
    'bg-transparent border border-[#78767c]/50 text-[#9094a4] hover:bg-[#282834] hover:text-white hover:border-[#78767c]/80',
  destructive:
    'bg-[#ba1a1a] text-white hover:bg-[#a01515] active:bg-[#8a1212] shadow-md hover:shadow-lg',
  default:
    'bg-[#282834] text-white hover:bg-[#1f1f29] border border-transparent shadow-sm hover:shadow-md',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm rounded-lg gap-1.5',
  md: 'h-10 px-4 text-base rounded-xl gap-2',
  lg: 'h-12 px-6 text-lg rounded-xl gap-2.5',
  default: 'h-8 px-3 text-sm rounded-lg gap-1.5',
  xs: 'h-6 px-2 text-xs rounded-md gap-1',
  icon: 'size-8',
  'icon-sm': 'size-7',
  'icon-xs': 'size-6',
  'icon-lg': 'size-9',
};

const spinnerSizes: Record<ButtonSize, string> = {
  sm: 'w-3.5 h-3.5',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
  default: 'w-3.5 h-3.5',
  xs: 'w-3 h-3',
  icon: 'w-4 h-4',
  'icon-sm': 'w-3.5 h-3.5',
  'icon-xs': 'w-3 h-3',
  'icon-lg': 'w-5 h-5',
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = 'primary', size = 'md', loading = false, className, children, disabled, ...props },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-all duration-150',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6c63ff]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1f1f29]',
          'disabled:pointer-events-none disabled:opacity-50',
          'active:scale-[0.98]',
          variantStyles[variant],
          sizeStyles[size],
          className
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
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
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
  }
);

Button.displayName = 'Button';

export { Button };
export type { ButtonProps, ButtonVariant, ButtonSize };