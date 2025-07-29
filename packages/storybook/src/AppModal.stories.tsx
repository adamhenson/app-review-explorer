import { AppModal, Button } from '@app-review-explorer/ui';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta = {
  title: 'Components/AppModal',
  component: AppModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AppModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithTrigger: Story = {
  render: () => (
    <AppModal title='Example Modal' trigger={<Button variant='primary'>Open Modal</Button>}>
      <div className='space-y-4'>
        <p>This is the content inside the modal.</p>
        <p>You can put any content here including forms, images, or other components.</p>
        <div className='flex gap-2'>
          <Button variant='primary' size='sm'>
            Save
          </Button>
          <Button variant='outline' size='sm'>
            Cancel
          </Button>
        </div>
      </div>
    </AppModal>
  ),
};

export const LongContent: Story = {
  render: () => (
    <AppModal
      title='Modal with Long Content'
      trigger={<Button variant='outline'>View Long Content</Button>}
    >
      <div className='space-y-4'>
        <p>This modal demonstrates how scrollable content works.</p>
        <div className='space-y-4'>
          {Array.from({ length: 20 }, (_, i) => (
            <p key={`paragraph-${i}`}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris.
            </p>
          ))}
        </div>
        <Button variant='primary'>Close</Button>
      </div>
    </AppModal>
  ),
};

export const ReviewModal: Story = {
  render: () => (
    <AppModal
      title='Review by John Doe'
      trigger={<Button variant='ghost'>View Full Review</Button>}
    >
      <div className='space-y-4'>
        <div className='flex items-center gap-3'>
          <div className='flex text-yellow-400'>{'★'.repeat(5)}</div>
          <span className='text-sm text-gray-500'>July 27, 2025</span>
        </div>

        <div>
          <h4 className='font-semibold mb-2'>Amazing app with great features</h4>
          <p className='text-gray-700 leading-relaxed'>
            I've been using this app for several months now and I'm really impressed with the
            functionality and user experience. The interface is intuitive and the features work
            exactly as expected. The developers have done a great job creating something that's both
            powerful and easy to use.
          </p>
        </div>

        <div className='pt-4 border-t'>
          <p className='text-sm text-gray-500'>Was this review helpful?</p>
          <div className='flex gap-2 mt-2'>
            <Button variant='outline' size='sm'>
              👍 Yes
            </Button>
            <Button variant='outline' size='sm'>
              👎 No
            </Button>
          </div>
        </div>
      </div>
    </AppModal>
  ),
};

export const SimpleModal: Story = {
  render: () => (
    <AppModal title='Simple Modal' trigger={<Button>Simple Example</Button>}>
      <p>This is a simple modal with minimal content.</p>
    </AppModal>
  ),
};

export const NoTitle: Story = {
  render: () => (
    <AppModal trigger={<Button variant='secondary'>Modal without Title</Button>}>
      <div className='text-center space-y-4'>
        <div className='text-4xl'>🎉</div>
        <h3 className='text-lg font-semibold'>Success!</h3>
        <p>Your action was completed successfully.</p>
        <Button variant='primary'>Continue</Button>
      </div>
    </AppModal>
  ),
};
