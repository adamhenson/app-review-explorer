import { clsx } from 'clsx';
import {
  endOfMonth,
  endOfWeek,
  format,
  isThisMonth,
  isThisWeek,
  isToday,
  isWithinInterval,
  isYesterday,
  parseISO,
  startOfMonth,
  startOfWeek,
  subMonths,
  subWeeks,
} from 'date-fns';
import { twMerge } from 'tailwind-merge';
import type { DateGroup, GroupedReviews, Review } from '@/types/review';

/**
 * Combines class names with clsx and tailwind-merge
 */
export const cn = (...inputs: Parameters<typeof clsx>) => {
  return twMerge(clsx(inputs));
};

/**
 * Checks if a date is in the last week (excluding this week)
 */
const isLastWeek = (date: Date): boolean => {
  const now = new Date();
  const lastWeekStart = startOfWeek(subWeeks(now, 1), { weekStartsOn: 1 });
  const lastWeekEnd = endOfWeek(subWeeks(now, 1), { weekStartsOn: 1 });
  return isWithinInterval(date, { start: lastWeekStart, end: lastWeekEnd });
};

/**
 * Checks if a date is in the last month (excluding this month)
 */
const isLastMonth = (date: Date): boolean => {
  const now = new Date();
  const lastMonthStart = startOfMonth(subMonths(now, 1));
  const lastMonthEnd = endOfMonth(subMonths(now, 1));
  return isWithinInterval(date, { start: lastMonthStart, end: lastMonthEnd });
};

/**
 * Determines which date group a review belongs to
 */
const getDateGroup = (reviewDate: Date): { group: DateGroup; label: string } => {
  if (isToday(reviewDate)) {
    return { group: 'today', label: 'Today' };
  }

  if (isYesterday(reviewDate)) {
    return { group: 'yesterday', label: 'Yesterday' };
  }

  if (isThisWeek(reviewDate, { weekStartsOn: 1 })) {
    return { group: 'this-week', label: 'This Week' };
  }

  if (isLastWeek(reviewDate)) {
    return { group: 'last-week', label: 'Last Week' };
  }

  if (isThisMonth(reviewDate)) {
    return { group: 'this-month', label: 'This Month' };
  }

  if (isLastMonth(reviewDate)) {
    return { group: 'last-month', label: 'Last Month' };
  }

  // For older dates, group by month/year
  const monthYear = format(reviewDate, 'MMM yyyy');
  return { group: monthYear, label: monthYear };
};

/**
 * Groups reviews by date ranges according to the assignment requirements
 */
export const groupReviewsByDate = (reviews: Review[]): GroupedReviews[] => {
  const groups = new Map<string, { group: DateGroup; label: string; reviews: Review[] }>();

  // Group reviews by date
  for (const review of reviews) {
    const reviewDate = parseISO(review.date);
    const { group, label } = getDateGroup(reviewDate);
    const groupKey = group;

    if (!groups.has(groupKey)) {
      groups.set(groupKey, { group, label, reviews: [] });
    }

    groups.get(groupKey)!.reviews.push(review);
  }

  // Sort groups by priority (today first, then yesterday, etc.)
  const sortOrder: Record<string, number> = {
    today: 0,
    yesterday: 1,
    'this-week': 2,
    'last-week': 3,
    'this-month': 4,
    'last-month': 5,
  };

  return Array.from(groups.values()).sort((a, b) => {
    const priorityA = sortOrder[a.group] ?? 1000;
    const priorityB = sortOrder[b.group] ?? 1000;

    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }

    // For month/year groups, sort by date (newest first)
    if (priorityA === 1000 && priorityB === 1000) {
      // Parse the date from the first review in each group
      const dateA = parseISO(a.reviews[0]?.date || '');
      const dateB = parseISO(b.reviews[0]?.date || '');
      return dateB.getTime() - dateA.getTime();
    }

    return 0;
  });
};

/**
 * Formats star rating selections for the API
 */
export const formatRatingFilter = (ratings: number[]): string => {
  return ratings.join(',');
};

/**
 * Parses rating filter string back to array of numbers
 */
export const parseRatingFilter = (ratingString: string): number[] => {
  if (!ratingString) return [];
  return ratingString
    .split(',')
    .map(Number)
    .filter((n) => n >= 1 && n <= 5);
};

/**
 * Debounces a function call
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Generates a human-readable summary of active filters
 */
export const getFilterSummary = (filters: { keyword?: string; ratings?: number[] }): string => {
  const parts: string[] = [];

  if (filters.keyword) {
    parts.push(`"${filters.keyword}"`);
  }

  if (filters.ratings && filters.ratings.length > 0) {
    if (filters.ratings.length === 1) {
      parts.push(`${filters.ratings[0]} star${filters.ratings[0] === 1 ? '' : 's'}`);
    } else {
      parts.push(`${filters.ratings.join(', ')} stars`);
    }
  }

  if (parts.length === 0) {
    return 'All reviews';
  }

  return parts.join(' with ');
};
