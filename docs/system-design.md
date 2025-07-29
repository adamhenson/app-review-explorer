# 📘 System Design Document

**React Development Challenge**

---

## 🗂️ Overview

This monorepo project implements a React-based review explorer application using **Next.js 15** and **React 19**, alongside a **component library** and **Storybook for UI documentation and testing**. The project is built with scalability, accessibility, performance, and developer experience as primary concerns.

---

## 📦 Monorepo Architecture

### Why a Monorepo?

A monorepo is chosen for its advantages:

- **Logical separation** of concerns (apps vs shared packages)
- **Simplified dependency management** using npm workspaces
- **Single source of truth** for shared tooling/configs
- **Better collaboration** and easier cross-package testing
- **Granular versioning**

### Directory Structure

```text
root/
├── apps/
│   └── frontend/             # Next.js 15 app
├── packages/
│   ├── ui/                   # Reusable Tailwind/React Aria component library
│   ├── storybook/            # Isolated Storybook instance
│   └── e2e/                  # Playwright E2E testing package
├── .github/
│   └── workflows/
│       └── e2e-tests.yml     # GitHub Actions pipeline for E2E tests and type checking
├── biome.json                # Shared Biome config
├── tsconfig.json
├── package.json
└── README.md
```

### Workspaces Config

```json
{
  "private": true,
  "workspaces": ["apps/*", "packages/*"]
}
```

---

## 🌐 Frontend App (`apps/frontend`)

Built with **Next.js 15 + React 19**, using the App Router and Server Components for optimal performance.

### Features

- Displays ChatGPT iOS user reviews with responsive grid layout
- **Advanced Search** with keyword and multi-select star rating filters
- **Debounced input** (600ms) to minimize API spam
- **Grouped reviews** (Today, Yesterday, This Week, Last Week, etc.)
- **Infinite pagination** with smooth "Load More" functionality
- **Text truncation** with modal expansion for full content
- **Loading and error handling** with flicker prevention
- **TanStack Query v5** for stateful, reactive data fetching and caching

---

## 🧱 UI Component Library (`packages/ui`)

A reusable library of highly accessible, styled, composable components with comprehensive Storybook documentation.

### Tech Stack

- **Tailwind CSS**: Utility-first, purgeable, consistent design system
- **React Aria Components**: WCAG-compliant components with full keyboard/screen reader support
- **TSUP**: Fast TypeScript bundler with ESM/CJS output
- **clsx + tailwind-merge**: Dynamic class name composition

### Components Implemented

- **Button**: Multiple variants (primary, secondary, outline, ghost) and sizes
- **SearchField**: Debounced search input with integrated icon
- **Select**: Dropdown with keyboard navigation and custom styling
- **Checkbox/CheckboxGroup**: Multi-select components for filtering
- **Popover**: Floating content containers for menus and dropdowns
- **FilterButton**: Compact filter UI with badges and popover integration
- **AppModal**: Full-screen modal dialogs with click-outside-to-close
- **StarRating**: Visual star display with customizable sizes
- **Loading**: Configurable spinner component
- **ExpandableText**: CSS-based text truncation component

### Principles

- **Granular components**: One file per component for maintainability
- **Props-driven styling**: Consistent API with className overrides
- **Fully accessible** by default with React Aria foundation
- **Comprehensive Storybook coverage** for all components and states

---

## 📘 Storybook (`packages/storybook`)

A dedicated Storybook workspace providing comprehensive documentation and visual testing for all UI components.

### Why Separate?

- Decouples UI library from frontend app for independent development
- Enables component testing in isolation
- Provides design system documentation
- Supports component development workflow

### Features Implemented

- **Comprehensive Component Coverage**: Stories for all 10+ UI components
- **Multiple Story Variants**: Default, loading, error, disabled, and interactive states
- **Design System Documentation**: Color palette, typography, and spacing guidelines
- **Responsive Testing**: Component behavior across different screen sizes
- **Accessibility Focus**: Built-in accessibility testing and documentation

### Component Stories Coverage

- **Button**: All variants, sizes, and states (primary, secondary, outline, ghost)
- **SearchField**: Default, with value, disabled, and responsive width testing
- **Select**: Rating filters, country selection, disabled states
- **Checkbox/CheckboxGroup**: Individual checkboxes and grouped rating filters
- **Popover**: Basic popovers, menu-style, different placements
- **FilterButton**: Default, active, disabled, and rating filter demonstrations
- **AppModal**: Trigger-based modals, long content, review examples
- **StarRating**: All sizes and label combinations
- **Loading**: Different sizes with and without text
- **ExpandableText**: Short text, long text, truncation examples

---

## 🔀 Data Fetching with TanStack Query

### Why TanStack Query?

- Declarative and cache-driven with intelligent caching strategies
- Auto background re-fetching and data synchronization
- Query deduplication and invalidation
- Built-in loading and error state management
- Pagination support with seamless "Load More" functionality

```ts
useQuery({
  queryKey: reviewsQueryKeys.paginated(queryFilters, currentPage),
  queryFn: () => fetchReviews(queryFilters),
  staleTime: 1000 * 60 * 5, // 5 minutes
  gcTime: 1000 * 60 * 10, // 10 minutes
});
```

### Advanced Features Implemented

- **Pagination**: Automatic page-based query management with `currentPage` state
- **Filter Synchronization**: Applied filters only update display when matching data arrives
- **Data Consistency Checks**: Prevents flicker during transition states
- **Query Key Strategy**: Hierarchical query keys for efficient cache invalidation

### Debouncing

```ts
const [debouncedKeyword] = useDebounce(keyword, 600);
```

Reduces excessive API calls while user is typing with 600ms delay for optimal UX balance.

---

## 🎨 Advanced UI Features

### Responsive Grid Layout

- **Desktop**: 3-column grid for optimal screen real estate usage
- **Tablet**: 2-column grid for medium screens
- **Mobile**: Single-column stack for mobile devices
- **CSS Grid**: Tailwind utility classes (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`)

### Text Truncation & Modal Interactions

- **CSS Line Clamp**: Fixed 3-line height with ellipsis overflow
- **Clickable Cards**: Entire review cards are clickable to open modal
- **Modal Content**: Full title and scrollable content with proper focus management
- **Click Outside**: Modal closes when clicking outside content area

### Loading State Management

- **Flicker Prevention**: Advanced state management to prevent content flashing
- **Data Consistency**: Applied filters synchronized with actual result data
- **Opacity Animations**: Smooth transitions for initial load states
- **Text Persistence**: `useRef + useMemo` pattern to maintain text during transitions

### Multi-select Filter UI

- **Compact Design**: Filter button with icon, label, and badge count
- **Popover Integration**: Floating checkbox group for selection
- **Visual Feedback**: Active filter count badges and blue accent on selection
- **Accessibility**: Full keyboard navigation and screen reader support

---

## 📊 Linting & Formatting with Biome

[Biome](https://biomejs.dev/) is used in place of ESLint + Prettier.

### Why Biome?

- **All-in-one** (formatter + linter)
- **Fast** (Rust-powered)
- **Zero config/plugins**
- **Developer-friendly** tooling with great DX

### Scripts

```json
"scripts": {
  "format": "biome format . --write",
  "lint": "biome lint .",
  "type-check": "tsc --noEmit"
}
```

These scripts run automatically in CI to enforce code quality and correctness.

---

## 🎭 End-to-End Testing with Playwright

### Testing Strategy

The E2E testing package (`packages/e2e`) focuses specifically on the critical UX requirements from the assignment:

1. **Loading States**: Validates that loading indicators are displayed while fetching data
2. **Error Handling**: Ensures errors are handled gracefully with appropriate messages

### Technology Choice

**Playwright** was chosen for E2E testing due to:

- **Cross-browser testing**: Native support for Chrome and WebKit (Safari)
- **Device simulation**: Mobile Safari testing using iPhone device simulation
- **Network mocking**: Comprehensive API mocking for error scenarios
- **CI/CD integration**: Excellent GitHub Actions support with artifacts
- **Developer experience**: Rich debugging tools and test UI mode

### Test Coverage

```typescript
// Loading States
- Initial page load shows loading indicator
- Search triggers loading state
- Rating filter triggers loading state
- "Load More" button shows loading state

// Error Handling
- Network failures show error message
- API server errors display appropriate messages
- Empty results show "No reviews found" message
- Search failures with recovery testing
- Filter failures with recovery testing
- Timeout handling for slow responses
```

### Browser Matrix

| Browser        | Viewport  | Device Simulation     |
| -------------- | --------- | --------------------- |
| Chrome Desktop | 1280x720  | Standard desktop      |
| Mobile Safari  | iPhone 12 | iOS device simulation |

### CI/CD Integration

The GitHub Actions workflow (`.github/workflows/e2e-tests.yml`) provides:

- **Sequential execution**: Type checking runs first, then E2E tests
- **Parallel browser testing**: Chrome and Safari tests run simultaneously
- **Artifact collection**: Test reports, screenshots, and videos on failure
- **Environment isolation**: Dedicated test environment with API mocking
- **Failure analysis**: Detailed traces and debugging information

### Local Development

```bash
# Install Playwright browsers (first time)
npm run install --workspace=packages/e2e

# Run tests headless
npm run test

# Debug with visible browser
npm run test:e2e:headed

# Interactive test development
npm run test:ui --workspace=packages/e2e
```

---

## 📃 Implementation Summary

| Feature            | Technology Used          | Location             | Status |
| ------------------ | ------------------------ | -------------------- | ------ |
| Frontend App       | Next.js 15 + React 19    | `apps/frontend`      | ✅     |
| Component Library  | React Aria + Tailwind    | `packages/ui`        | ✅     |
| Documentation      | Storybook                | `packages/storybook` | ✅     |
| E2E Testing        | Playwright               | `packages/e2e`       | ✅     |
| Data Fetching      | TanStack Query           | `apps/frontend`      | ✅     |
| Code Quality       | Biome (lint + format)    | All packages         | ✅     |
| Type Safety        | TypeScript (strict)      | All packages         | ✅     |
| Responsive Design  | Tailwind CSS Grid        | All components       | ✅     |
| Accessibility      | React Aria Components    | All UI components    | ✅     |
| Search & Filtering | Debounced + Multi-select | Frontend app         | ✅     |
| Text Truncation    | CSS + Modal Expansion    | Review cards         | ✅     |
| CI/CD Pipeline     | GitHub Actions           | `.github/workflows`  | ✅     |

---

## 📂 Future Enhancements

### Core Application

- 🔗 **URL State Management**: Persist search and filter state in URL
- 📱 **Progressive Web App**: Add manifest and service worker
- 🌙 **Dark Mode**: Implement theme switching with system preference detection
- 🔍 **Advanced Search**: Add date range filtering and sorting options
- 📊 **Analytics**: Add user interaction tracking and performance monitoring

### Component Library & Testing

- 🚀 **Package Publishing**: Publish `@app-review-explorer/ui` to npm registry
- 🔳 **Visual Regression Testing**: Host Storybook on Chromatic for visual diffs
- 🧪 **Unit Testing**: Add Jest + React Testing Library for component tests
- 📈 **Accessibility Testing**: Automated a11y testing in CI pipeline
- 🎯 **Extended E2E Coverage**: Add tests for advanced user flows and edge cases

### Performance & Infrastructure

- ⚡ **Build Optimization**: Migrate to Turborepo for faster builds and caching
- 🚀 **Performance Monitoring**: Add Core Web Vitals tracking
- 🔄 **API Optimization**: Implement GraphQL or more efficient data fetching
- 📦 **Bundle Analysis**: Continuous bundle size monitoring and optimization

---
