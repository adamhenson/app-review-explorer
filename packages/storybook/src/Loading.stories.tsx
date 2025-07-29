import { Loading } from '@app-review-explorer/ui';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta = {
  title: 'Components/Loading',
  component: Loading,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the loading spinner',
    },
    text: {
      control: 'text',
      description: 'Optional loading text to display',
    },
  },
} satisfies Meta<typeof Loading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const WithText: Story = {
  args: {
    size: 'md',
    text: 'Loading reviews...',
  },
};

export const SmallWithText: Story = {
  args: {
    size: 'sm',
    text: 'Loading...',
  },
};

export const LargeWithText: Story = {
  args: {
    size: 'lg',
    text: 'Please wait while we load your data',
  },
};

// Demonstration of all sizes together
export const AllSizes: Story = {
  render: () => (
    <div className='flex items-center gap-8'>
      <div className='text-center'>
        <Loading size='sm' />
        <p className='mt-2 text-sm text-gray-600'>Small</p>
      </div>
      <div className='text-center'>
        <Loading size='md' />
        <p className='mt-2 text-sm text-gray-600'>Medium</p>
      </div>
      <div className='text-center'>
        <Loading size='lg' />
        <p className='mt-2 text-sm text-gray-600'>Large</p>
      </div>
    </div>
  ),
  args: {},
};
