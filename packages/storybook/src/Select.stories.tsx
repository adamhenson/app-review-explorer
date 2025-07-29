import { Select, SelectItem } from '@app-review-explorer/ui';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React from 'react';

const meta = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Select label='Choose Option' placeholder='Select an option' onSelectionChange={fn()}>
      <SelectItem key='option1'>Option 1</SelectItem>
      <SelectItem key='option2'>Option 2</SelectItem>
      <SelectItem key='option3'>Option 3</SelectItem>
    </Select>
  ),
};

export const WithSelectedValue: Story = {
  render: () => (
    <Select
      label='Choose Fruit'
      placeholder='Select a fruit'
      selectedKey='banana'
      onSelectionChange={fn()}
    >
      <SelectItem key='apple'>🍎 Apple</SelectItem>
      <SelectItem key='banana'>🍌 Banana</SelectItem>
      <SelectItem key='orange'>🍊 Orange</SelectItem>
      <SelectItem key='grape'>🍇 Grape</SelectItem>
    </Select>
  ),
};

export const RatingFilter: Story = {
  render: () => (
    <Select label='Filter by Rating' placeholder='All ratings' onSelectionChange={fn()}>
      <SelectItem key='1'>⭐ 1 star</SelectItem>
      <SelectItem key='2'>⭐⭐ 2 stars</SelectItem>
      <SelectItem key='3'>⭐⭐⭐ 3 stars</SelectItem>
      <SelectItem key='4'>⭐⭐⭐⭐ 4 stars</SelectItem>
      <SelectItem key='5'>⭐⭐⭐⭐⭐ 5 stars</SelectItem>
    </Select>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Select
      label='Disabled Select'
      placeholder='Cannot select'
      isDisabled={true}
      onSelectionChange={fn()}
    >
      <SelectItem key='option1'>Option 1</SelectItem>
      <SelectItem key='option2'>Option 2</SelectItem>
      <SelectItem key='option3'>Option 3</SelectItem>
    </Select>
  ),
};

export const Countries: Story = {
  render: () => (
    <Select
      label='Select Country'
      placeholder='Choose your country'
      selectedKey='us'
      onSelectionChange={fn()}
    >
      <SelectItem key='us'>🇺🇸 United States</SelectItem>
      <SelectItem key='ca'>🇨🇦 Canada</SelectItem>
      <SelectItem key='mx'>🇲🇽 Mexico</SelectItem>
      <SelectItem key='uk'>🇬🇧 United Kingdom</SelectItem>
      <SelectItem key='de'>🇩🇪 Germany</SelectItem>
      <SelectItem key='fr'>🇫🇷 France</SelectItem>
      <SelectItem key='jp'>🇯🇵 Japan</SelectItem>
      <SelectItem key='au'>🇦🇺 Australia</SelectItem>
    </Select>
  ),
};
