import {
  SearchField as AriaSearchField,
  Input,
  Label,
  type SearchFieldProps,
} from 'react-aria-components';
import { cn } from '../utils/cn';

/**
 * Accessible search field component with clear functionality and proper labeling
 */
export const SearchField = ({
  className,
  label,
  placeholder,
  ...props
}: {
  /** Additional CSS classes to apply */
  className?: string;

  /** Accessible label for the search field */
  label: string;

  /** Placeholder text to display */
  placeholder?: string;
} & SearchFieldProps) => {
  return (
    <AriaSearchField className={cn('flex flex-col gap-1', className)} {...props}>
      <Label className='text-sm font-medium text-gray-700'>{label}</Label>
      <div className='relative'>
        <Input
          placeholder={placeholder}
          className={cn(
            'w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm',
            'placeholder:text-gray-400',
            'focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1',
            'disabled:cursor-not-allowed disabled:opacity-50'
          )}
        />
      </div>
    </AriaSearchField>
  );
};
