'use client';

import { Button } from '@app-review-explorer/ui';
import type { ReactNode, RefObject } from 'react';
import type { GroupedReviews } from '@/types/review';
import { ReviewCard } from './ReviewCard';

export interface ReviewsListProps {
  /** Grouped reviews to display */
  groupedReviews: GroupedReviews[];

  /** Whether more reviews can be loaded */
  hasMore?: boolean;

  /** Whether a load more operation is in progress */
  isLoadingMore?: boolean;

  /** Whether the initial load is in progress */
  isLoading?: boolean;

  /** Whether data is being fetched (including filter changes) */
  isFetching?: boolean;

  /** Whether there's data inconsistency during transitions */
  hasDataInconsistency?: boolean;

  /** Callback to load more reviews */
  onLoadMore?: () => void;

  /** Error message to display */
  error?: string;

  /** Ref to mark where new reviews start for scrolling */
  newReviewsRef?: RefObject<HTMLDivElement | null>;

  /** Index where new reviews start (for marking scroll position) */
  newReviewsStartIndex?: number;
}

/**
 * Component that displays a list of reviews grouped by date ranges
 */
export const ReviewsList = ({
  groupedReviews,
  hasMore = false,
  isLoadingMore = false,
  isLoading = false,
  isFetching = false,
  hasDataInconsistency = false,
  onLoadMore,
  error,
  newReviewsRef,
  newReviewsStartIndex = 0,
}: ReviewsListProps) => {
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <h3 className="text-lg font-medium text-red-900 mb-2">
          Error Loading Reviews
        </h3>
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  if (isLoading || hasDataInconsistency) {
    return (
      <div className="py-12 text-center">
        <div className="flex items-center justify-center gap-2">
          <svg
            className="w-6 h-6 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span className="text-sm text-gray-600">Loading reviews...</span>
        </div>
      </div>
    );
  }

  // Handle empty state cases
  if (groupedReviews.length === 0) {
    // If we're fetching, show nothing (keep previous results visible or loading state)
    if (isFetching) {
      return null;
    }

    // Only show "No Reviews Found" if we're truly done loading with no results
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No Reviews Found
        </h3>
        <p className="text-gray-600">
          Try adjusting your search criteria or clearing the filters.
        </p>
      </div>
    );
  }

  // Track current review index for marking new reviews
  let currentReviewIndex = 0;

  return (
    <div className="space-y-8">
      {groupedReviews.map((group) => (
        <ReviewGroup
          key={group.group}
          label={group.label}
          reviewCount={group.reviews.length}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {group.reviews.map((review) => {
              const isFirstNewReview =
                currentReviewIndex === newReviewsStartIndex;
              const reviewElement = (
                <div
                  key={review.id}
                  ref={isFirstNewReview ? newReviewsRef : undefined}
                  className={isFirstNewReview ? 'animate-pulse-once' : ''}
                >
                  <ReviewCard review={review} />
                </div>
              );
              currentReviewIndex++;
              return reviewElement;
            })}
          </div>
        </ReviewGroup>
      ))}

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center py-8">
          <Button
            variant="outline"
            size="lg"
            onPress={onLoadMore}
            isDisabled={isLoadingMore}
            className="w-56"
          >
            {isLoadingMore ? (
              <svg
                className="w-4 h-4 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            )}
            <span className="ml-2">
              {isLoadingMore ? 'Loading more...' : 'Load More Reviews'}
            </span>
          </Button>
        </div>
      )}
    </div>
  );
};

/**
 * Component for displaying a group of reviews with a section header
 */
const ReviewGroup = ({
  children,
  label,
  reviewCount,
}: {
  /** The reviews content to display */
  children: ReactNode;

  /** The human-readable label for this date group */
  label: string;

  /** Number of reviews in this group */
  reviewCount: number;
}) => {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-heading">{label}</h2>
        <span className="text-sm text-gray-500">
          {reviewCount} review{reviewCount === 1 ? '' : 's'}
        </span>
      </div>
      {children}
    </section>
  );
};
