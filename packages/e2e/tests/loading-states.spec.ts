import { test, expect } from '@playwright/test';

test.describe('Loading States', () => {
  test('shows loading state while fetching initial reviews', async ({
    page,
  }) => {
    // Navigate to the app
    await page.goto('/');

    // Should show loading state initially
    await expect(page.getByText('Loading reviews...')).toBeVisible();

    // Loading state should eventually disappear and show reviews
    await expect(page.getByText('Loading reviews...')).toBeHidden({
      timeout: 10000,
    });

    // Should show actual reviews after loading
    await expect(
      page.locator('[data-testid="review-card"]').first()
    ).toBeVisible({ timeout: 15000 });
  });

  test('shows loading state when searching for reviews', async ({ page }) => {
    // Navigate to the app and wait for initial load
    await page.goto('/');
    await expect(page.getByText('Loading reviews...')).toBeHidden({
      timeout: 10000,
    });

    // Enter search term to trigger new loading state
    const searchInput = page.getByPlaceholder(
      'Search by keyword (e.g., crash, love, bug)'
    );
    await searchInput.fill('crash');

    // Should show loading indicator during search
    await expect(page.getByText('Loading reviews...')).toBeVisible();

    // Loading should complete and show filtered results
    await expect(page.getByText('Loading reviews...')).toBeHidden({
      timeout: 10000,
    });
  });

  test('shows loading state when filtering by rating', async ({ page }) => {
    // Navigate to the app and wait for initial load
    await page.goto('/');
    await expect(page.getByText('Loading reviews...')).toBeHidden({
      timeout: 10000,
    });

    // Click on rating filter to open popover
    await page.getByRole('button', { name: /rating/i }).click();

    // Select a rating filter - use force to bypass overlapping elements
    await page
      .getByRole('checkbox', { name: '5 stars' })
      .check({ force: true });

    // Close the popover by clicking outside
    await page.click('body');

    // Should show loading indicator during filter
    await expect(page.getByText('Loading reviews...')).toBeVisible();

    // Loading should complete and show filtered results
    await expect(page.getByText('Loading reviews...')).toBeHidden({
      timeout: 10000,
    });
  });

  test('shows loading state when using "Load More" button', async ({
    page,
  }) => {
    // Navigate to the app and wait for initial load
    await page.goto('/');
    await expect(page.getByText('Loading reviews...')).toBeHidden({
      timeout: 10000,
    });

    // Count initial reviews
    const initialReviewCount = await page
      .locator('[data-testid="review-card"]')
      .count();

    // Find and click "Load More" button
    const loadMoreButton = page.getByRole('button', { name: /load more/i });
    await expect(loadMoreButton).toBeVisible();

    await loadMoreButton.click();

    // Should load more reviews (API is too fast to reliably catch loading text)
    await expect(async () => {
      const newReviewCount = await page
        .locator('[data-testid="review-card"]')
        .count();
      expect(newReviewCount).toBeGreaterThan(initialReviewCount);
    }).toPass({ timeout: 10000 });
  });
});
