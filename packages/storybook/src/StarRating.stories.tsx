import { StarRating } from '@app-review-explorer/ui';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/StarRating',
  component: StarRating,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Star rating display component that shows filled and empty stars based on rating value. Supports different sizes and optional numeric label display.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    rating: {
      control: { type: 'range', min: 0, max: 5, step: 0.1 },
      description: 'Rating value from 0 to 5',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Size of the stars',
    },
    showLabel: {
      control: { type: 'boolean' },
      description: 'Whether to show the numeric rating label',
    },
  },
} satisfies Meta<typeof StarRating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    rating: 4.5,
  },
};

export const FiveStars: Story = {
  args: {
    rating: 5,
  },
};

export const ThreeStars: Story = {
  args: {
    rating: 3,
  },
};

export const OneAndHalfStars: Story = {
  args: {
    rating: 1.5,
  },
};

export const ZeroStars: Story = {
  args: {
    rating: 0,
  },
};

export const WithLabel: Story = {
  args: {
    rating: 4.2,
    showLabel: true,
  },
};

export const ExtraSmall: Story = {
  args: {
    rating: 4,
    size: 'xs',
  },
};

export const Small: Story = {
  args: {
    rating: 4,
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    rating: 4,
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    rating: 4,
    size: 'lg',
  },
};

export const AllSizes: Story = {
  args: {
    rating: 4.5,
  },
  render: () => (
    <div className='flex flex-col gap-4 items-start'>
      <div className='flex items-center gap-4'>
        <span className='w-16 text-sm'>XS:</span>
        <StarRating rating={4.5} size='xs' />
      </div>
      <div className='flex items-center gap-4'>
        <span className='w-16 text-sm'>SM:</span>
        <StarRating rating={4.5} size='sm' />
      </div>
      <div className='flex items-center gap-4'>
        <span className='w-16 text-sm'>MD:</span>
        <StarRating rating={4.5} size='md' />
      </div>
      <div className='flex items-center gap-4'>
        <span className='w-16 text-sm'>LG:</span>
        <StarRating rating={4.5} size='lg' />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All star rating sizes shown together for comparison.',
      },
    },
  },
};

export const DifferentRatings: Story = {
  args: {
    rating: 4.0,
  },
  render: () => (
    <div className='flex flex-col gap-3'>
      <div className='flex items-center gap-4'>
        <span className='w-12 text-sm'>5.0:</span>
        <StarRating rating={5.0} showLabel />
      </div>
      <div className='flex items-center gap-4'>
        <span className='w-12 text-sm'>4.5:</span>
        <StarRating rating={4.5} showLabel />
      </div>
      <div className='flex items-center gap-4'>
        <span className='w-12 text-sm'>4.0:</span>
        <StarRating rating={4.0} showLabel />
      </div>
      <div className='flex items-center gap-4'>
        <span className='w-12 text-sm'>3.2:</span>
        <StarRating rating={3.2} showLabel />
      </div>
      <div className='flex items-center gap-4'>
        <span className='w-12 text-sm'>2.7:</span>
        <StarRating rating={2.7} showLabel />
      </div>
      <div className='flex items-center gap-4'>
        <span className='w-12 text-sm'>1.5:</span>
        <StarRating rating={1.5} showLabel />
      </div>
      <div className='flex items-center gap-4'>
        <span className='w-12 text-sm'>0.0:</span>
        <StarRating rating={0.0} showLabel />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different rating values demonstrating partial stars and labels.',
      },
    },
  },
};
