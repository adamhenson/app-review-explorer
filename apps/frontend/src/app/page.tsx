'use client';

import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ReviewFilters } from '@/components/ReviewFilters';
import { ReviewsList } from '@/components/ReviewsList';
import { fetchReviews, reviewsQueryKeys } from '@/lib/api';
import {
  formatRatingFilter,
  groupReviewsByDate,
  parseRatingFilter,
} from '@/lib/utils';
import type { Review } from '@/types/review';

/**
 * Main page component for the ChatGPT Reviews Explorer
 */
export default function HomePage() {
  const [filters, setFilters] = useState<{
    keyword?: string;
    ratings?: number[];
  }>({});
  const [allLoadedReviews, setAllLoadedReviews] = useState<Review[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [newReviewsStartIndex, setNewReviewsStartIndex] = useState(0);
  const newReviewsRef = useRef<HTMLDivElement | null>(null);

  const REVIEWS_PER_PAGE = 25;

  // Build query parameters
  const queryFilters = {
    q: filters.keyword,
    stars: filters.ratings?.length
      ? formatRatingFilter(filters.ratings)
      : undefined,
    sort: '-date' as const,
    count: REVIEWS_PER_PAGE,
    page: currentPage,
  };

  // Fetch reviews using TanStack Query
  const {
    data: reviewsResponse,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: reviewsQueryKeys.paginated(queryFilters, currentPage),
    queryFn: () => fetchReviews(queryFilters),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });

  // Handle filter changes - reset pagination but keep reviews until loading starts
  const handleFiltersChange = useCallback((newFilters: typeof filters) => {
    setFilters(newFilters);
    setCurrentPage(1);
    // Don't clear reviews immediately - let them clear when query starts loading
  }, []);

  // Handle loading more reviews - increment page to trigger new query
  const handleLoadMore = useCallback(() => {
    setCurrentPage((prev) => prev + 1);
  }, []);

  // Auto-append new reviews when they load
  useEffect(() => {
    if (!reviewsResponse?.reviews) return;

    if (currentPage === 1) {
      // Reset for new search/filter or initial load - clear old reviews when new ones arrive
      setAllLoadedReviews(reviewsResponse.reviews);
      setNewReviewsStartIndex(0);
    } else {
      // Append new reviews only if they're different from what we already have
      setAllLoadedReviews((prev) => {
        // Check if we already have these reviews to prevent duplicates
        const existingIds = new Set(prev.map((r) => r.id));
        const newReviews = reviewsResponse.reviews.filter(
          (r) => !existingIds.has(r.id)
        );

        if (newReviews.length > 0) {
          // Mark where new reviews start before appending
          setNewReviewsStartIndex(prev.length);

          // Scroll to first new review after a small delay
          setTimeout(() => {
            if (newReviewsRef.current) {
              newReviewsRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest',
              });
            }
          }, 300);

          return [...prev, ...newReviews];
        }

        return prev;
      });
    }
  }, [reviewsResponse?.reviews, currentPage]);

  // Use allLoadedReviews as the source of truth
  const allReviews = allLoadedReviews;

  // Group reviews by date ranges
  const groupedReviews = groupReviewsByDate(allReviews);

  // Check if we have new data that hasn't been processed yet (prevents flicker)
  const hasDataInconsistency =
    currentPage === 1 &&
    reviewsResponse?.reviews &&
    allReviews.length > 0 &&
    reviewsResponse.reviews[0]?.id !== allReviews[0]?.id;

  // Determine if there are more reviews to load
  // Keep button visible during loading to prevent visual jump
  const isLoadingMore = isFetching && currentPage > 1;

  // Always show button if we're loading more, or if we have response and more reviews available
  const hasMore =
    isLoadingMore ||
    (reviewsResponse && allReviews.length < reviewsResponse.total);

  // Handle error state
  const errorMessage =
    isError && error
      ? error instanceof Error
        ? error.message
        : 'An unexpected error occurred while loading reviews'
      : undefined;

  return (
    <div className="space-y-6">
      <ReviewFilters
        onFiltersChange={handleFiltersChange}
        isLoading={isLoading || isFetching}
        isInitialLoad={allLoadedReviews.length === 0 && isLoading}
        totalReviews={reviewsResponse?.total}
        appliedFilters={
          reviewsResponse
            ? {
                keyword: queryFilters.q,
                ratings: queryFilters.stars
                  ? parseRatingFilter(queryFilters.stars)
                  : undefined,
              }
            : undefined
        }
      />

      <ReviewsList
        groupedReviews={groupedReviews}
        hasMore={hasMore}
        isLoadingMore={isLoadingMore}
        isLoading={(isLoading || isFetching) && currentPage === 1}
        isFetching={isFetching}
        hasDataInconsistency={hasDataInconsistency}
        onLoadMore={handleLoadMore}
        error={errorMessage}
        newReviewsRef={newReviewsRef}
        newReviewsStartIndex={newReviewsStartIndex}
      />
    </div>
  );
}
