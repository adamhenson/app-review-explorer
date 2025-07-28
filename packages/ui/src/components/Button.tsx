import type { ReactNode } from 'react';
import { Button as AriaButton, type ButtonProps as AriaButtonProps } from 'react-aria-components';
import { cn } from '../utils/cn';

/**
 * Accessible button component with consistent styling and interaction states
 */
export const Button = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: {
  /** The button content */
  children: ReactNode;

  /** Additional CSS classes to apply */
  className?: string;

  /** Button size variant */
  size?: 'sm' | 'md' | 'lg';

  /** Button style variant */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
} & AriaButtonProps) => {
  const baseStyles = [
    'inline-flex items-center justify-center rounded-md font-medium transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
    'disabled:pointer-events-none disabled:opacity-50',
  ];

  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 active:bg-gray-100',
    ghost: 'text-gray-700 hover:bg-gray-100 active:bg-gray-200',
  };

  const sizes = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
  };

  return (
    <AriaButton className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </AriaButton>
  );
};
