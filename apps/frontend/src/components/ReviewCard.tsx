'use client';

import { AppModal, ExpandableText, StarRating } from '@app-review-explorer/ui';
import { format, parseISO } from 'date-fns';
import { useState } from 'react';
import type { Review } from '@/types/review';

/**
 * Individual review card component displaying review details
 */
export const ReviewCard = ({
  review,
}: {
  /** The review data to display */
  review: Review;
}) => {
  const reviewDate = parseISO(review.date);
  const formattedDate = format(reviewDate, 'MMM d, yyyy');
  const starRating = parseFloat(review.stars);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="review-card cursor-pointer w-full text-left"
        onClick={() => setIsModalOpen(true)}
        aria-label={`Open review: ${
          review.title || `by ${review.author || 'Anonymous'}`
        }`}
        data-testid="review-card"
      >
        <div className="flex items-start justify-between mb-3 gap-3">
          <div className="flex items-center gap-3 flex-shrink-0">
            <StarRating rating={starRating} size="sm" />
            <time
              dateTime={review.date}
              className="text-sm text-gray-500"
              title={`Review posted on ${formattedDate}`}
            >
              {formattedDate}
            </time>
          </div>
          <div className="text-sm text-gray-600 truncate flex-shrink min-w-0">
            by{' '}
            <span className="font-medium">{review.author || 'Anonymous'}</span>
          </div>
        </div>

        {review.title && (
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
            {review.title}
          </h3>
        )}

        <ExpandableText text={review.review} className="" />
      </button>

      <AppModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={review.title || `Review by ${review.author || 'Anonymous'}`}
        isDismissable={true}
      >
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 flex-shrink-0">
              <StarRating rating={starRating} size="md" />
              <time
                dateTime={review.date}
                className="text-sm text-gray-500"
                title={`Review posted on ${formattedDate}`}
              >
                {formattedDate}
              </time>
            </div>
            <div className="text-sm text-gray-600 truncate flex-shrink min-w-0">
              by{' '}
              <span className="font-medium">
                {review.author || 'Anonymous'}
              </span>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            <p className="whitespace-pre-wrap text-gray-700 leading-relaxed text-base">
              {review.review}
            </p>
          </div>
        </div>
      </AppModal>
    </>
  );
};
