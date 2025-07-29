import { Checkbox, CheckboxGroup, FilterButton } from '@app-review-explorer/ui';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React from 'react';

const meta = {
  title: 'Components/FilterButton',
  component: FilterButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FilterButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Filter',
    activeCount: 0,
    children: <div className='p-4'>Filter content goes here...</div>,
  },
};

export const WithActiveFilters: Story = {
  args: {
    label: 'Status',
    activeCount: 3,
    children: <div className='p-4'>3 filters are active</div>,
  },
};

export const RatingFilter: Story = {
  render: (args) => (
    <FilterButton {...args}>
      <CheckboxGroup label='Filter by Rating' onChange={fn()} value={['3', '4', '5']}>
        <Checkbox value='1'>⭐ 1 star</Checkbox>
        <Checkbox value='2'>⭐⭐ 2 stars</Checkbox>
        <Checkbox value='3'>⭐⭐⭐ 3 stars</Checkbox>
        <Checkbox value='4'>⭐⭐⭐⭐ 4 stars</Checkbox>
        <Checkbox value='5'>⭐⭐⭐⭐⭐ 5 stars</Checkbox>
      </CheckboxGroup>
    </FilterButton>
  ),
  args: {
    label: 'Rating',
    activeCount: 3,
    children: <div>Placeholder</div>, // This gets overridden by render function
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Filter',
    activeCount: 2,
    isDisabled: true,
    children: <div className='p-4'>This filter is disabled</div>,
  },
};

export const ManyActiveFilters: Story = {
  args: {
    label: 'Categories',
    activeCount: 12, // Should show "9+" badge
    children: (
      <div className='p-4'>
        <p className='mb-2 font-medium'>Select categories:</p>
        <div className='space-y-2'>
          {Array.from({ length: 15 }, (_, i) => (
            <div key={`category-${i + 1}`} className='flex items-center gap-2'>
              <input type='checkbox' id={`cat-${i}`} defaultChecked={i < 12} />
              <label htmlFor={`cat-${i}`}>Category {i + 1}</label>
            </div>
          ))}
        </div>
      </div>
    ),
  },
};
