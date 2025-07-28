import { cn } from '../utils/cn';

/**
 * Star rating display component that shows filled and empty stars based on rating value
 */
export const StarRating = ({
  className,
  rating,
  showLabel = false,
  size = 'sm',
}: {
  /** Additional CSS classes to apply */
  className?: string;

  /** The rating value from 0 to 5 */
  rating: number;

  /** Whether to show the numeric rating label */
  showLabel?: boolean;

  /** Size of the stars */
  size?: 'xs' | 'sm' | 'md' | 'lg';
}) => {
  const clampedRating = Math.max(0, Math.min(5, rating));
  const fullStars = Math.floor(clampedRating);
  const hasHalfStar = clampedRating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const StarIcon = ({ type }: { type: 'filled' | 'half' | 'empty' }) => {
    const baseClasses = cn(sizeClasses[size]);

    if (type === 'filled') {
      return (
        <svg
          className={cn(baseClasses, 'text-yellow-400 fill-current')}
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
          aria-hidden='true'
        >
          <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
        </svg>
      );
    }

    if (type === 'half') {
      return (
        <svg
          className={baseClasses}
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
          aria-hidden='true'
        >
          <defs>
            <linearGradient id='half-star'>
              <stop offset='50%' stopColor='#fbbf24' />
              <stop offset='50%' stopColor='#d1d5db' />
            </linearGradient>
          </defs>
          <path
            fill='url(#half-star)'
            d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'
          />
        </svg>
      );
    }

    // Empty star
    return (
      <svg
        className={cn(baseClasses, 'text-gray-300 fill-current')}
        viewBox='0 0 20 20'
        xmlns='http://www.w3.org/2000/svg'
        aria-hidden='true'
      >
        <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
      </svg>
    );
  };

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className='flex items-center'>
        {/* Filled stars */}
        {Array.from({ length: fullStars }, (_, index) => (
          <StarIcon key={`filled-star-${index + 1}`} type='filled' />
        ))}

        {/* Half star */}
        {hasHalfStar && <StarIcon key='half-star' type='half' />}

        {/* Empty stars */}
        {Array.from({ length: emptyStars }, (_, index) => (
          <StarIcon
            key={`empty-star-${fullStars + (hasHalfStar ? 1 : 0) + index + 1}`}
            type='empty'
          />
        ))}
      </div>

      {/* Rating label */}
      {showLabel && <span className='ml-1 text-sm text-gray-600'>{clampedRating.toFixed(1)}</span>}
    </div>
  );
};
