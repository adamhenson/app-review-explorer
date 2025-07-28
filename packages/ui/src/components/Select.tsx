import type { ReactNode } from 'react';
import {
  Select as AriaSelect,
  Button,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  type SelectProps,
  SelectValue,
} from 'react-aria-components';
import { cn } from '../utils/cn';

/**
 * Accessible select dropdown component with keyboard navigation and screen reader support
 */
export const Select = <T extends object>({
  children,
  className,
  label,
  placeholder = 'Select an option',
  ...props
}: {
  /** The select options as collection items */
  children: ReactNode;

  /** Additional CSS classes to apply */
  className?: string;

  /** Accessible label for the select field */
  label: string;

  /** Placeholder text when no option is selected */
  placeholder?: string;
} & SelectProps<T>) => {
  return (
    <AriaSelect className={cn('flex flex-col gap-1', className)} {...props}>
      <Label className='text-sm font-medium text-gray-700'>{label}</Label>
      <Button
        className={cn(
          'flex h-10 w-full items-center justify-between rounded-md border border-gray-300',
          'bg-white px-3 py-2 text-sm',
          'focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'data-[pressed]:bg-gray-50'
        )}
      >
        <SelectValue className='text-left'>
          {({ isPlaceholder, selectedText }) => (isPlaceholder ? placeholder : selectedText)}
        </SelectValue>
        <span className='ml-2 text-gray-400'>▼</span>
      </Button>
      <Popover
        className={cn(
          'z-50 min-w-[8rem] overflow-hidden rounded-md border border-gray-200',
          'bg-white p-1 shadow-md',
          'data-[entering]:animate-in data-[entering]:fade-in-0 data-[entering]:zoom-in-95',
          'data-[exiting]:animate-out data-[exiting]:fade-out-0 data-[exiting]:zoom-out-95'
        )}
      >
        <ListBox className='max-h-60 overflow-auto'>{children}</ListBox>
      </Popover>
    </AriaSelect>
  );
};

/**
 * Select option item component for use within Select
 */
export const SelectItem = ({
  children,
  className,
  ...props
}: {
  /** The option content */
  children: ReactNode;

  /** Additional CSS classes to apply */
  className?: string;
} & React.ComponentProps<typeof ListBoxItem>) => {
  return (
    <ListBoxItem
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm',
        'outline-none data-[focused]:bg-primary-100 data-[focused]:text-primary-900',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className
      )}
      {...props}
    >
      {children}
    </ListBoxItem>
  );
};
