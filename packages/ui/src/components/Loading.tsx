import { cn } from '../utils/cn';

/**
 * Loading spinner component for indicating async operations in progress
 */
export const Loading = ({
  className,
  size = 'md',
  text,
}: {
  /** Additional CSS classes to apply */
  className?: string;

  /** Size of the loading spinner */
  size?: 'sm' | 'md' | 'lg';

  /** Optional loading text to display */
  text?: string;
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      <div
        className={cn(
          sizeClasses[size],
          'animate-spin rounded-full border-2 border-gray-300 border-t-primary-600'
        )}
        role='status'
        aria-label={text || 'Loading'}
      />
      {text && <span className='text-sm text-gray-600'>{text}</span>}
      <span className='sr-only'>{text || 'Loading'}</span>
    </div>
  );
};
