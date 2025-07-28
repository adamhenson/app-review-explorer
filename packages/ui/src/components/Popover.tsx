import type { ReactNode } from 'react';
import {
  Popover as AriaPopover,
  Button,
  Dialog,
  DialogTrigger,
  type PopoverProps,
} from 'react-aria-components';
import { cn } from '../utils/cn';

/**
 * Popover component with customizable trigger and content
 */
export const Popover = ({
  children,
  className,
  placement = 'bottom start',
  trigger,
  ...props
}: {
  /** Popover content */
  children: ReactNode;

  /** Additional CSS classes for the popover */
  className?: string;

  /** Popover placement relative to trigger */
  placement?: PopoverProps['placement'];

  /** Trigger element to open the popover */
  trigger: ReactNode;
} & Omit<PopoverProps, 'children' | 'placement'>) => {
  return (
    <DialogTrigger>
      {trigger}
      <AriaPopover
        placement={placement}
        className={cn(
          'bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50',
          'min-w-48 max-w-sm',
          'entering:animate-in entering:fade-in-0 entering:zoom-in-95',
          'exiting:animate-out exiting:fade-out-0 exiting:zoom-out-95',
          'placement-bottom:slide-in-from-top-2',
          'placement-top:slide-in-from-bottom-2',
          'placement-left:slide-in-from-right-2',
          'placement-right:slide-in-from-left-2',
          className
        )}
        {...props}
      >
        <Dialog className='outline-none'>{children}</Dialog>
      </AriaPopover>
    </DialogTrigger>
  );
};
