import { SearchField } from '@app-review-explorer/ui';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React from 'react';

const meta = {
  title: 'Components/SearchField',
  component: SearchField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label for the search field',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input',
    },
    value: {
      control: 'text',
      description: 'Current value of the search field',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the search field is disabled',
    },
  },
} satisfies Meta<typeof SearchField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Search',
    placeholder: 'Enter search term...',
    value: '',
    onChange: fn(),
  },
};

export const WithValue: Story = {
  args: {
    label: 'Search Reviews',
    placeholder: 'Search by keyword (e.g., crash, love, bug)',
    value: 'user interface',
    onChange: fn(),
  },
};

export const WithLongPlaceholder: Story = {
  args: {
    label: 'Advanced Search',
    placeholder: 'Search for reviews by content, author, or specific keywords',
    value: '',
    onChange: fn(),
  },
};

export const Disabled: Story = {
  args: {
    label: 'Search (Disabled)',
    placeholder: 'Search is currently disabled',
    value: '',
    isDisabled: true,
    onChange: fn(),
  },
};

export const DisabledWithValue: Story = {
  args: {
    label: 'Search',
    placeholder: 'Enter search term...',
    value: 'loading data...',
    isDisabled: true,
    onChange: fn(),
  },
};

// Demonstration in different container widths
export const ResponsiveWidth: Story = {
  render: (args) => (
    <div className='space-y-4'>
      <div className='w-64'>
        <SearchField {...args} label='Narrow (256px)' />
      </div>
      <div className='w-96'>
        <SearchField {...args} label='Medium (384px)' />
      </div>
      <div className='w-full max-w-2xl'>
        <SearchField {...args} label='Wide (max 672px)' />
      </div>
    </div>
  ),
  args: {
    label: 'Search Field',
    placeholder: 'Search for reviews...',
    value: '',
    onChange: fn(),
  },
};
