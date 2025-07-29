/**
 * Review data structure from the external reviews API
 */
export interface Review {
  /** Unique identifier for the review */
  id: string;

  /** Author name of the review (can be null) */
  author: string | null;

  /** Review body text content */
  review: string;

  /** ISO date string when the review was created */
  date: string;

  /** Star rating as string (e.g., "5.00") */
  stars: string;

  /** Review title */
  title: string;

  /** App version this review is for */
  version?: string;

  /** Country ISO code where review was observed */
  iso?: string;

  /** Product ID this review belongs to */
  product?: number;
}

/**
 * API response structure for reviews endpoint
 */
export interface ReviewsResponse {
  /** Array of review objects */
  reviews: Review[];

  /** Total count of reviews matching the filters */
  total: number;

  /** Total number of pages available */
  pages: number;

  /** Current page number */
  this_page: number;
}

/**
 * Parameters for filtering reviews
 */
export interface ReviewFilters {
  /** Keyword to search in review content */
  q?: string;

  /** Comma-separated list of star ratings to filter by (e.g., "4,5") */
  stars?: string;

  /** Sort order: date, -date (newest first), country, stars */
  sort?: 'date' | '-date' | 'country' | 'stars';

  /** Number of reviews to return (1-500, default: 25) */
  count?: number;

  /** Page number for pagination (starts at 1, max 500) */
  page?: number;
}

/**
 * Date groupings for organizing reviews
 */
export type DateGroup =
  | 'today'
  | 'yesterday'
  | 'this-week'
  | 'last-week'
  | 'this-month'
  | 'last-month'
  | string; // For specific month names like "Oct 2024"

/**
 * Grouped reviews by date range
 */
export interface GroupedReviews {
  /** The date group identifier */
  group: DateGroup;

  /** Human-readable label for the group */
  label: string;

  /** Reviews in this group */
  reviews: Review[];
}
