import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ hover = false, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-off-white rounded-cards-sm shadow-card',
          'transition-shadow duration-300',
          hover && 'hover:shadow-lg cursor-pointer',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = 'Card';

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardHeader: React.FC<CardHeaderProps> = ({ className, children, ...props }) => (
  <div className={cn('mb-4', className)} {...props}>
    {children}
  </div>
);

CardHeader.displayName = 'CardHeader';

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const CardTitle: React.FC<CardTitleProps> = ({ className, children, ...props }) => (
  <h3 className={cn('text-subheading text-dark-charcoal', className)} {...props}>
    {children}
  </h3>
);

CardTitle.displayName = 'CardTitle';

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const CardDescription: React.FC<CardDescriptionProps> = ({ className, children, ...props }) => (
  <p className={cn('text-body text-medium-gray', className)} {...props}>
    {children}
  </p>
);

CardDescription.displayName = 'CardDescription';

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardContent: React.FC<CardContentProps> = ({ className, children, ...props }) => (
  <div className={cn('', className)} {...props}>
    {children}
  </div>
);

CardContent.displayName = 'CardContent';

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardFooter: React.FC<CardFooterProps> = ({ className, children, ...props }) => (
  <div className={cn('mt-4 pt-4 border-t border-cool-gray', className)} {...props}>
    {children}
  </div>
);

CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
export type { CardProps };
