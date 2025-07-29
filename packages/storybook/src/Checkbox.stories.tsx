import { Checkbox, CheckboxGroup } from '@app-review-explorer/ui';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React from 'react';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// Individual Checkbox stories
export const Default: Story = {
  args: {
    children: 'Accept terms and conditions',
  },
};

export const Checked: Story = {
  args: {
    children: 'Checked checkbox',
    isSelected: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled checkbox',
    isDisabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    children: 'Disabled checked checkbox',
    isSelected: true,
    isDisabled: true,
  },
};

// CheckboxGroup stories
const CheckboxGroupMeta = {
  title: 'Components/CheckboxGroup',
  component: CheckboxGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CheckboxGroup>;

export { CheckboxGroupMeta };

export const RatingFilter: StoryObj<typeof CheckboxGroup> = {
  render: (args) => (
    <CheckboxGroup {...args}>
      <Checkbox value='1'>⭐ 1 star</Checkbox>
      <Checkbox value='2'>⭐⭐ 2 stars</Checkbox>
      <Checkbox value='3'>⭐⭐⭐ 3 stars</Checkbox>
      <Checkbox value='4'>⭐⭐⭐⭐ 4 stars</Checkbox>
      <Checkbox value='5'>⭐⭐⭐⭐⭐ 5 stars</Checkbox>
    </CheckboxGroup>
  ),
  args: {
    label: 'Filter by Rating',
    onChange: fn(),
    value: ['3', '4'], // Pre-select 3 and 4 stars
  },
};

export const BasicGroup: StoryObj<typeof CheckboxGroup> = {
  render: (args) => (
    <CheckboxGroup {...args}>
      <Checkbox value='option1'>Option 1</Checkbox>
      <Checkbox value='option2'>Option 2</Checkbox>
      <Checkbox value='option3'>Option 3</Checkbox>
    </CheckboxGroup>
  ),
  args: {
    label: 'Select Options',
    onChange: fn(),
  },
};

export const DisabledGroup: StoryObj<typeof CheckboxGroup> = {
  render: (args) => (
    <CheckboxGroup {...args}>
      <Checkbox value='option1'>Option 1</Checkbox>
      <Checkbox value='option2'>Option 2</Checkbox>
      <Checkbox value='option3'>Option 3</Checkbox>
    </CheckboxGroup>
  ),
  args: {
    label: 'Disabled Options',
    onChange: fn(),
    isDisabled: true,
    value: ['option1'],
  },
};
