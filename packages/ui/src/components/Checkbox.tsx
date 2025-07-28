import type { ReactNode } from 'react';
import {
  Checkbox as AriaCheckbox,
  CheckboxGroup as AriaCheckboxGroup,
  type CheckboxGroupProps,
  type CheckboxProps,
  Label,
} from 'react-aria-components';
import { cn } from '../utils/cn';

/**
 * Accessible checkbox group component for multiple selections
 */
export const CheckboxGroup = ({
  children,
  className,
  label,
  ...props
}: {
  /** The checkbox options */
  children: ReactNode;

  /** Additional CSS classes to apply */
  className?: string;

  /** Accessible label for the checkbox group */
  label: string;
} & CheckboxGroupProps) => {
  return (
    <AriaCheckboxGroup className={cn('flex flex-col gap-2', className)} {...props}>
      <Label className='text-sm font-medium text-gray-700'>{label}</Label>
      <div className='flex flex-col gap-2'>{children}</div>
    </AriaCheckboxGroup>
  );
};

/**
 * Accessible checkbox component with custom styling
 */
export const Checkbox = ({
  children,
  className,
  ...props
}: {
  /** The checkbox label content */
  children: ReactNode;

  /** Additional CSS classes to apply */
  className?: string;
} & CheckboxProps) => {
  return (
    <AriaCheckbox
      className={cn(
        'group flex items-center gap-2 text-sm',
        'data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed',
        className
      )}
      {...props}
    >
      {({ isSelected, isIndeterminate, isDisabled }) => (
        <>
          <div
            className={cn(
              'w-4 h-4 border-2 rounded flex items-center justify-center transition-all',
              'border-gray-300 bg-white',
              'group-data-[focus-visible]:ring-2 group-data-[focus-visible]:ring-blue-500 group-data-[focus-visible]:ring-offset-1',
              'group-data-[pressed]:bg-gray-50',
              isSelected || isIndeterminate
                ? 'border-blue-500 bg-blue-500'
                : 'border-gray-300 bg-white',
              isDisabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            {isSelected && (
              <svg
                className='w-3 h-3 text-white'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                aria-hidden='true'
              >
                <title>Checked</title>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={3}
                  d='M5 13l4 4L19 7'
                />
              </svg>
            )}
            {isIndeterminate && <div className='w-2 h-0.5 bg-white rounded' aria-hidden='true' />}
          </div>
          <span className={cn('select-none', isDisabled && 'text-gray-400')}>{children}</span>
        </>
      )}
    </AriaCheckbox>
  );
};
