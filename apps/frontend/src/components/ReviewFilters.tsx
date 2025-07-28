'use client';

import {
  Button,
  Checkbox,
  CheckboxGroup,
  FilterButton,
  SearchField,
} from '@app-review-explorer/ui';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { getFilterSummary } from '@/lib/utils';

export interface ReviewFiltersProps {
  /** Callback when filters change */
  onFiltersChange: (filters: { keyword?: string; ratings?: number[] }) => void;

  /** Current loading state */
  isLoading?: boolean;

  /** Whether this is the initial page load */
  isInitialLoad?: boolean;

  /** Total number of reviews matching current filters */
  totalReviews?: number;

  /** Filters that generated the current totalReviews count */
  appliedFilters?: { keyword?: string; ratings?: number[] };
}

/**
 * Review filtering component with search and rating filters
 */
export const ReviewFilters = ({
  onFiltersChange,
  isLoading = false,
  isInitialLoad = false,
  totalReviews,
  appliedFilters,
}: ReviewFiltersProps) => {
  const [keyword, setKeyword] = useState('');
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

  // Debounce the search input to avoid excessive API calls
  const [debouncedKeyword] = useDebounce(keyword, 600);

  // Effect to notify parent when filters change
  useEffect(() => {
    onFiltersChange({
      keyword: debouncedKeyword || undefined,
      ratings: selectedRatings.length > 0 ? selectedRatings : undefined,
    });
  }, [debouncedKeyword, selectedRatings, onFiltersChange]);

  const handleRatingChange = (values: string[]) => {
    // Convert string array to number array
    const ratings = values
      .map(Number)
      .filter((n) => n >= 1 && n <= 5)
      .sort((a, b) => a - b); // Sort for consistent order

    setSelectedRatings(ratings);
  };

  const handleClearFilters = () => {
    setKeyword('');
    setSelectedRatings([]);
  };

  // Use ref to persist the last valid display text
  const lastValidTextRef = useRef<string>('');

  // Memoize display text to keep previous values until new data arrives
  const displayText = useMemo(() => {
    // Only update when we have valid data (totalReviews + appliedFilters)
    if (typeof totalReviews === 'number' && appliedFilters) {
      const hasActiveFilters =
        appliedFilters.keyword || (appliedFilters.ratings?.length ?? 0) > 0;
      const filterSummary = getFilterSummary(appliedFilters);

      const reviewsText = `Showing ${totalReviews.toLocaleString()} reviews`;
      const fullText = hasActiveFilters
        ? `${reviewsText} for ${filterSummary}`
        : reviewsText;

      // Store this as the new valid text
      lastValidTextRef.current = fullText;
      return fullText;
    }

    // Return previous valid text or fallback for very first load
    return lastValidTextRef.current || 'Showing reviews...';
  }, [totalReviews, appliedFilters]);

  // Use current values for clear button visibility (based on form state, not display)
  const showClearButton = keyword.length > 0 || selectedRatings.length > 0;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-end gap-4 mb-4">
        <div className="flex-1">
          <SearchField
            label="Search Reviews"
            placeholder="Search by keyword (e.g., crash, love, bug)"
            value={keyword}
            onChange={setKeyword}
            isDisabled={isLoading}
          />
        </div>

        <div className="lg:w-auto">
          <FilterButton
            label="Rating"
            activeCount={selectedRatings.length}
            isDisabled={isLoading}
          >
            <CheckboxGroup
              label="Filter by Rating"
              value={selectedRatings.map(String)}
              onChange={handleRatingChange}
              isDisabled={isLoading}
            >
              <Checkbox value="1">⭐ 1 star</Checkbox>
              <Checkbox value="2">⭐⭐ 2 stars</Checkbox>
              <Checkbox value="3">⭐⭐⭐ 3 stars</Checkbox>
              <Checkbox value="4">⭐⭐⭐⭐ 4 stars</Checkbox>
              <Checkbox value="5">⭐⭐⭐⭐⭐ 5 stars</Checkbox>
            </CheckboxGroup>
          </FilterButton>
        </div>
      </div>

      <div className="flex items-center justify-between min-h-[2rem]">
        <p
          className={`text-sm text-gray-600 transition-opacity duration-300 ${
            isInitialLoad ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {displayText}
        </p>

        {showClearButton && (
          <Button
            variant="ghost"
            size="sm"
            onPress={handleClearFilters}
            isDisabled={isLoading}
          >
            Clear filters
          </Button>
        )}
      </div>
    </div>
  );
};
