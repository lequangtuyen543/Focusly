import React from 'react';
import { cn } from '@/lib/utils';

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  message: string;
  icon?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message, icon, className, ...props }) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-16 px-4',
        className,
      )}
      {...props}
    >
      {icon && (
        <div className="mb-4 text-light-gray [&>svg]:size-10">
          {icon}
        </div>
      )}
      <p className="text-body text-medium-gray text-center max-w-sm">
        {message}
      </p>
    </div>
  );
};

export { EmptyState };
export type { EmptyStateProps };
