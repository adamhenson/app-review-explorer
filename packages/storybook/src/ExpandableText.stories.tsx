import { ExpandableText } from '@app-review-explorer/ui';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta = {
  title: 'Components/ExpandableText',
  component: ExpandableText,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'The text content to display',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof ExpandableText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ShortText: Story = {
  args: {
    text: 'This is a short text that will not be truncated because it fits within the 3-line limit.',
  },
};

export const LongText: Story = {
  args: {
    text: 'This is a much longer text that will be truncated at exactly 3 lines with CSS line-clamp. The text continues beyond what is visible, demonstrating how the component handles overflow content. This text is intentionally verbose to show the truncation behavior in action. You can see how it cuts off cleanly at the end of the third line, providing a consistent visual experience across different content lengths.',
  },
};

export const ReviewExample: Story = {
  args: {
    text: "I've been using this app for several months now and I'm really impressed with the functionality and user experience. The interface is intuitive and the features work exactly as expected. The developers have done a great job creating something that's both powerful and easy to use. However, there are a few areas where improvements could be made, particularly around performance on older devices.",
  },
};

export const SingleLine: Story = {
  args: {
    text: 'Short single line.',
  },
};

export const WithCustomClassName: Story = {
  args: {
    text: 'This example demonstrates how you can add custom styling through the className prop. The component maintains its core truncation behavior while allowing additional styling customization.',
    className: 'border border-gray-200 rounded-lg p-4 bg-gray-50',
  },
};

// Comparison view showing different text lengths
export const AllLengths: Story = {
  render: () => (
    <div className='space-y-6 max-w-md'>
      <div>
        <h4 className='font-medium mb-2'>Short text (no truncation)</h4>
        <ExpandableText text='Brief content that fits.' />
      </div>

      <div>
        <h4 className='font-medium mb-2'>Medium text (partial truncation)</h4>
        <ExpandableText text="This is medium-length content that will fill about two to three lines, showing how the component handles text that's right at the truncation boundary." />
      </div>

      <div>
        <h4 className='font-medium mb-2'>Long text (full truncation)</h4>
        <ExpandableText text='This is significantly longer content that definitely exceeds the three-line limit and will be truncated. The component uses CSS line-clamp to ensure consistent visual presentation regardless of content length. This demonstrates the truncation behavior in a real-world scenario where user-generated content varies widely in length.' />
      </div>
    </div>
  ),
};
