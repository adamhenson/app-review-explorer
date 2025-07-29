# E2E Testing Package

End-to-end testing for the App Review Explorer using Playwright.

## 🎯 Purpose

This package focuses on testing the critical user experience requirements from the assignment:

1. **Loading States** - Verify loading indicators are shown while fetching data
2. **Error Handling** - Ensure errors are handled gracefully with appropriate messages

## 🧪 Test Coverage

### Loading States (`loading-states.spec.ts`)

- ✅ Initial page load shows loading indicator
- ✅ Search triggers loading state
- ✅ Rating filter triggers loading state
- ✅ "Load More" button shows loading state

### Error Handling (`error-handling.spec.ts`)

- ✅ Network failures show error message
- ✅ API server errors display appropriate messages
- ✅ Empty results show "No reviews found" message
- ✅ Search failures with recovery testing
- ✅ Filter failures with recovery testing
- ✅ Timeout handling for slow responses

## 🌐 Browser Coverage

Tests run on:

- **Desktop Chrome** (1280x720 viewport)
- **Mobile Safari** (iPhone 12 device simulation)

## 🚀 Running Tests

### Prerequisites

```bash
# Install dependencies (from project root)
npm install

# Install Playwright browsers
npm run install --workspace=packages/e2e

# Install system dependencies
npm run install:deps --workspace=packages/e2e
```

### Local Development

```bash
# Run tests headless (CI mode)
npm run test --workspace=packages/e2e

# Run tests with browser visible
npm run test:headed --workspace=packages/e2e

# Debug tests interactively
npm run test:debug --workspace=packages/e2e

# Open Playwright UI mode
npm run test:ui --workspace=packages/e2e

# View test report
npm run report --workspace=packages/e2e
```

### Environment Variables

The tests require the frontend application to be running. The Playwright config automatically starts the dev server, but you can also run it manually:

```bash
# Start the frontend application
npm run dev --workspace=apps/frontend

# Run tests against running application
npm run test --workspace=packages/e2e
```

## 🔧 Configuration

### Browser Configuration

```typescript
projects: [
  {
    name: 'chromium-desktop',
    use: {
      ...devices['Desktop Chrome'],
      viewport: { width: 1280, height: 720 },
    },
  },
  {
    name: 'mobile-safari',
    use: {
      ...devices['iPhone 12'],
    },
  },
];
```

### Test Settings

- **Timeout**: 30 seconds per test
- **Retries**: 2 retries on CI, 0 locally
- **Parallel**: Tests run in parallel locally, sequential on CI
- **Screenshots**: Captured on failure
- **Videos**: Recorded on failure
- **Traces**: Captured on first retry

## 📊 CI/CD Integration

Tests run automatically on:

- Pull requests to `main` branch
- Pushes to `main` branch

The GitHub Actions workflow:

1. Runs type checking first
2. Builds the UI library
3. Installs Playwright browsers
4. Starts the application
5. Runs E2E tests
6. Uploads test artifacts

### Artifacts

- **Test Reports**: HTML reports with screenshots and traces
- **Test Results**: JSON results for further processing
- **Videos**: Failure recordings (30-day retention)

## 🔍 Writing Tests

### Test Structure

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test('should do something specific', async ({ page }) => {
    // Navigate to page
    await page.goto('/');

    // Perform actions
    await page.getByRole('button', { name: 'Click me' }).click();

    // Assert expectations
    await expect(page.getByText('Expected result')).toBeVisible();
  });
});
```

### Best Practices

1. **Use semantic selectors**: Role-based selectors are preferred
2. **Add data-testid**: For complex components that need reliable targeting
3. **Wait for conditions**: Use `expect().toBeVisible()` with timeouts
4. **Test recovery**: Verify the app recovers gracefully from errors
5. **Mock network**: Use `page.route()` to simulate API failures

### Data Test IDs

Key test IDs available:

- `data-testid="review-card"` - Individual review cards

## 🐛 Debugging

### Common Issues

1. **Timeouts**: Increase timeout for slow network conditions
2. **Selectors**: Use `page.locator().highlight()` to debug selectors
3. **Network**: Check browser developer tools in `--headed` mode

### Debug Commands

```bash
# Run specific test with debug
npx playwright test loading-states.spec.ts --debug

# Run tests in headed mode with devtools
npx playwright test --headed --devtools

# Generate selectors interactively
npx playwright codegen http://localhost:3000
```

## 📈 Metrics

The E2E tests focus on key performance and UX metrics:

- **Loading state visibility** within 100ms of user action
- **Error message clarity** and actionability
- **Recovery paths** from error states
- **Cross-device consistency** between desktop and mobile

---

For more information about Playwright, visit: https://playwright.dev/
