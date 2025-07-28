import type { ReviewFilters, ReviewsResponse } from '@/types/review';

const API_BASE_URL = '/api/reviews';

/**
 * Custom error class for API-related errors
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public response?: Response
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Builds query string from filter parameters
 */
const buildQueryString = (filters: ReviewFilters): string => {
  const params = new URLSearchParams();

  if (filters.q) {
    params.append('q', filters.q);
  }

  if (filters.stars) {
    params.append('stars', filters.stars);
  }

  if (filters.sort) {
    params.append('sort', filters.sort);
  }

  if (filters.count !== undefined) {
    params.append('count', filters.count.toString());
  }

  if (filters.page !== undefined) {
    params.append('page', filters.page.toString());
  }

  return params.toString();
};

/**
 * Fetches reviews from the Appfigures API with the specified filters
 */
export const fetchReviews = async (filters: ReviewFilters = {}): Promise<ReviewsResponse> => {
  const queryString = buildQueryString(filters);
  const url = queryString ? `${API_BASE_URL}?${queryString}` : API_BASE_URL;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new ApiError(
        `Failed to fetch reviews: ${response.status} ${response.statusText}`,
        response.status,
        response
      );
    }

    const data = await response.json();

    // Validate response structure
    if (!Array.isArray(data.reviews)) {
      throw new ApiError('Invalid response format: reviews must be an array');
    }

    return data as ReviewsResponse;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    // Handle network errors, JSON parsing errors, etc.
    throw new ApiError(
      `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
};

/**
 * React Query key factory for reviews queries
 */
export const reviewsQueryKeys = {
  all: ['reviews'] as const,
  filtered: (filters: ReviewFilters) => ['reviews', 'filtered', filters] as const,
  paginated: (filters: ReviewFilters, page: number) =>
    ['reviews', 'paginated', filters, page] as const,
};
