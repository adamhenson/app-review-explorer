import type { ReactNode } from 'react';
import { Button, Dialog, DialogTrigger, Popover } from 'react-aria-components';
import { cn } from '../utils/cn';

/**
 * Filter button component with icon and popover menu
 */
export const FilterButton = ({
  activeCount = 0,
  children,
  className,
  isDisabled = false,
  label = 'Filter',
}: {
  /** Number of active filters (shows badge if > 0) */
  activeCount?: number;

  /** Popover content */
  children: ReactNode;

  /** Additional CSS classes for the button */
  className?: string;

  /** Whether the button is disabled */
  isDisabled?: boolean;

  /** Accessible label for the filter button */
  label?: string;
}) => {
  const hasActiveFilters = activeCount > 0;

  return (
    <DialogTrigger>
      <Button
        isDisabled={isDisabled}
        className={cn(
          'inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border transition-colors',
          'w-36', // Wider for better spacing
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1',
          hasActiveFilters
            ? 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100'
            : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          className
        )}
      >
        {/* Filter Icon */}
        <svg
          className='w-4 h-4 flex-shrink-0'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          aria-hidden='true'
        >
          <title>Filter</title>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z'
          />
        </svg>

        {/* Label */}
        <span className='flex-shrink-0'>{label}</span>

        {/* Active filters badge */}
        {hasActiveFilters && (
          <span className='inline-flex items-center justify-center w-6 h-6 text-xs font-medium text-white bg-blue-600 rounded-full flex-shrink-0'>
            {activeCount > 9 ? '9+' : activeCount}
          </span>
        )}

        {/* Chevron Down Icon - pushed to the right */}
        <svg
          className='w-4 h-4 text-gray-400 flex-shrink-0 ml-auto'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          aria-hidden='true'
        >
          <title>Open menu</title>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
        </svg>
      </Button>

      <Popover
        placement='bottom start'
        className={cn(
          'bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50',
          'min-w-52 max-w-sm',
          'entering:animate-in entering:fade-in-0 entering:zoom-in-95',
          'exiting:animate-out exiting:fade-out-0 exiting:zoom-out-95',
          'placement-bottom:slide-in-from-top-2'
        )}
      >
        <Dialog className='outline-none'>{children}</Dialog>
      </Popover>
    </DialogTrigger>
  );
};
