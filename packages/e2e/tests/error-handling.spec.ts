import { test, expect } from '@playwright/test';

test.describe('Error Handling', () => {
  test('shows error message when API is unavailable', async ({ page }) => {
    // Intercept API calls and simulate network failure
    await page.route('**/api/reviews*', (route) => {
      route.abort('failed');
    });

    // Navigate to the app
    await page.goto('/');

    // Should show error message instead of loading state
    await expect(page.getByText(/error loading reviews/i)).toBeVisible({
      timeout: 10000,
    });
  });

  test('shows error message when API returns server error', async ({
    page,
  }) => {
    // Intercept API calls and return 500 error
    await page.route('**/api/reviews*', (route) => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error' }),
      });
    });

    // Navigate to the app
    await page.goto('/');

    // Should show error message
    await expect(page.getByText(/error loading reviews/i)).toBeVisible({
      timeout: 10000,
    });
  });

  test('shows appropriate message when no reviews found', async ({ page }) => {
    // Intercept API calls and return empty results
    await page.route('**/api/reviews*', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          reviews: [],
          total: 0,
          page: 1,
          hasMore: false,
        }),
      });
    });

    // Navigate to the app
    await page.goto('/');

    // Should show "no reviews found" message
    await expect(page.getByText(/no reviews found/i)).toBeVisible({
      timeout: 10000,
    });
    await expect(
      page.getByText(/try adjusting your search criteria/i)
    ).toBeVisible();
  });

  test('shows error when search fails but recovers', async ({ page }) => {
    // First, let the app load normally
    await page.goto('/');
    await expect(page.getByText('Loading reviews...')).toBeHidden({
      timeout: 10000,
    });

    // Then intercept search requests to fail
    await page.route('**/api/reviews*q=*', (route) => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Search failed' }),
      });
    });

    // Perform a search that should fail
    const searchInput = page.getByPlaceholder(
      'Search by keyword (e.g., crash, love, bug)'
    );
    await searchInput.fill('invalid search');

    // Should show error message for search
    await expect(page.getByText(/error loading reviews/i)).toBeVisible({
      timeout: 10000,
    });

    // Clear the search to recover
    await searchInput.clear();

    // Remove the route intercept to allow normal API calls
    await page.unroute('**/api/reviews*q=*');

    // Should recover and show reviews again
    await expect(page.getByText(/error loading reviews/i)).toBeHidden({
      timeout: 10000,
    });
    await expect(
      page.locator('[data-testid="review-card"]').first()
    ).toBeVisible({ timeout: 15000 });
  });

  test('shows error when filter fails', async ({ page }) => {
    // First, let the app load normally
    await page.goto('/');
    await expect(page.getByText('Loading reviews...')).toBeHidden({
      timeout: 10000,
    });

    // Intercept filter requests to fail
    await page.route('**/api/reviews*stars=*', (route) => {
      route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Invalid rating filter' }),
      });
    });

    // Apply a rating filter that should fail
    await page.getByRole('button', { name: /rating/i }).click();
    await page.getByRole('checkbox', { name: '1 star' }).check({ force: true });
    await page.click('body'); // Close popover

    // Should show error message
    await expect(page.getByText(/error loading reviews/i)).toBeVisible({
      timeout: 10000,
    });

    // Clear filters to recover
    await page.getByRole('button', { name: /clear filters/i }).click();

    // Remove the route intercept
    await page.unroute('**/api/reviews*stars=*');

    // Should recover and show reviews again
    await expect(page.getByText(/error loading reviews/i)).toBeHidden({
      timeout: 10000,
    });
    await expect(
      page.locator('[data-testid="review-card"]').first()
    ).toBeVisible({ timeout: 15000 });
  });
});
