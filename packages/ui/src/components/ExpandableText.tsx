'use client';

import { cn } from '../utils/cn';

export interface ExpandableTextProps {
  /** Additional CSS classes */
  className?: string;

  /** The text content to display */
  text: string;
}

/**
 * Simple text component that truncates text with CSS at a fixed height
 */
export const ExpandableText = ({ className, text }: ExpandableTextProps) => {
  return (
    <div className={cn('', className)}>
      <p className='text-gray-700 leading-relaxed line-clamp-3 h-[4.875rem]'>{text}</p>
    </div>
  );
};
