import { Button, Popover } from '@app-review-explorer/ui';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta = {
  title: 'Components/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicPopover: Story = {
  render: () => (
    <Popover trigger={<Button>Open Popover</Button>}>
      <div className='p-4'>
        <h3 className='font-semibold mb-2'>Popover Content</h3>
        <p className='text-sm text-gray-600'>This is content inside a popover component.</p>
      </div>
    </Popover>
  ),
};

export const MenuPopover: Story = {
  render: () => (
    <Popover trigger={<Button variant='outline'>Menu</Button>}>
      <div className='py-2'>
        <button className='block w-full px-4 py-2 text-left hover:bg-gray-100 text-sm'>
          Edit Profile
        </button>
        <button className='block w-full px-4 py-2 text-left hover:bg-gray-100 text-sm'>
          Settings
        </button>
        <button className='block w-full px-4 py-2 text-left hover:bg-gray-100 text-sm'>Help</button>
        <hr className='my-1' />
        <button className='block w-full px-4 py-2 text-left hover:bg-gray-100 text-sm text-red-600'>
          Sign Out
        </button>
      </div>
    </Popover>
  ),
};

export const BottomPlacement: Story = {
  render: () => (
    <Popover trigger={<Button variant='secondary'>Bottom Popover</Button>} placement='bottom start'>
      <div className='p-4 max-w-sm'>
        <h4 className='font-medium'>Bottom Placement</h4>
        <p className='text-sm text-gray-600 mt-1'>This popover opens below the trigger button.</p>
      </div>
    </Popover>
  ),
};
