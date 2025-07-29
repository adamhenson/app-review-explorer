# Frontend Application

The main Next.js 15 application for the ChatGPT Reviews Explorer, built with React 19 and modern development practices.

## 🚀 Features

- **Next.js 15 App Router**: Latest Next.js with new features and performance improvements
- **React 19**: Cutting-edge React with improved performance and developer experience
- **TanStack Query**: Powerful data fetching, caching, and synchronization with pagination
- **Debounced Search**: Smooth search experience with 600ms debounce
- **Multi-select Filters**: Advanced star rating filters with popover UI
- **Infinite Pagination**: Load more reviews seamlessly with scroll positioning
- **Responsive Grid**: 3-column desktop, 2-column tablet, 1-column mobile layout
- **Text Truncation**: CSS-based truncation with modal expansion
- **Accessibility**: WCAG 2.1 AA compliant components with React Aria

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **UI Library**: React 19
- **Data Fetching**: TanStack Query v5
- **Styling**: Tailwind CSS
- **Components**: Custom UI library with React Aria
- **TypeScript**: Strict mode with explicit types
- **Date Handling**: date-fns for date manipulation

## 📁 Project Structure

```
src/
├── app/                   # Next.js App Router pages
│   ├── globals.css       # Global styles and Tailwind imports
│   ├── layout.tsx        # Root layout with providers
│   └── page.tsx          # Main reviews page
├── components/           # React components
│   ├── QueryProvider.tsx # TanStack Query provider
│   ├── ReviewCard.tsx    # Individual review display
│   ├── ReviewFilters.tsx # Search and filtering
│   └── ReviewsList.tsx   # Review list with grouping
├── lib/                  # Utility libraries
│   ├── api.ts           # API client and query functions
│   └── utils.ts         # Date grouping and helper functions
└── types/               # TypeScript type definitions
    └── review.ts        # Review-related types
```

## 🎯 Key Components

### ReviewFilters

Advanced filtering component with:

- Debounced keyword search (600ms)
- Multi-select star rating filters (1-5 stars, any combination)
- Compact popover-based filter UI with badges
- Active filter summary with synchronized display
- Clear filters functionality
- Opacity animations for initial load states

### ReviewsList

Displays reviews with:

- Date-based grouping (Today, Yesterday, This Week, Last Week, etc.)
- Loading and error states with flicker prevention
- Empty state handling with data consistency checks
- Load more pagination with smooth scrolling
- Responsive grid layout (3/2/1 columns)

### ReviewCard

Individual review display with:

- Star rating visualization
- Formatted date display with relative time
- Author information with text truncation
- CSS-based content truncation (3-line height)
- Modal interaction for full content viewing
- Responsive card design

## 🔄 Data Flow

1. **User Input**: Search terms and multi-select star rating filters
2. **Debouncing**: 600ms delay for search input to prevent excessive API calls
3. **API Query**: TanStack Query manages requests with pagination support
4. **Caching**: 5-minute stale time, 10-minute garbage collection
5. **Data Consistency**: Applied filters synchronized with actual result data
6. **Grouping**: Reviews grouped by date ranges using date-fns
7. **Display**: Rendered with flicker prevention and loading state management
8. **Pagination**: Seamless "Load More" with scroll positioning to new content

## 🌐 API Integration

### Supported Parameters

- `q`: Keyword search (debounced at 600ms)
- `stars`: Multi-select star rating filter (e.g., "5", "4,5", "1,2,3")
- `sort`: Sort order ("-date" for newest first)
- `count`: Number of results per page (fixed at 25)
- `page`: Page number for pagination (1-based)

### Query Keys

```typescript
// All reviews
['reviews'][
  // Filtered reviews
  ('reviews', 'filtered', filters)
][
  // Paginated reviews
  ('reviews', 'paginated', filters, page)
];
```

## 🎨 Styling

### Tailwind Configuration

- Extended color palette with primary blues
- Custom container styles
- Responsive breakpoints
- Typography with Inter font

### Custom CSS Classes

- `.review-card`: Styled review container
- `.section-heading`: Consistent heading styles
- `.line-clamp-*`: Text truncation utilities

## 📱 Responsive Design

- **Mobile**: Single column, stacked filters
- **Tablet**: Responsive filter layout
- **Desktop**: Optimized for larger screens
- **Touch**: Touch-friendly interactive elements

## 🚀 Development

### Prerequisites

- Node.js 18.17+ or 20.5+
- npm 10.0.0+

### Setup

```bash
# Install dependencies (from root)
npm install

# Build UI library
npm run build:ui

# Start development server
cd apps/frontend
npm run dev
```

### Environment Variables

Create `.env.local`:

```bash
APPFIGURES_API_URL=https://example.com/api/reviews
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run linting
- `npm run lint:fix` - Fix linting issues
- `npm run type-check` - TypeScript type checking

## 🧪 Testing

### Component Testing

- Individual component tests with React Testing Library
- Integration tests for user flows
- Visual regression tests with Storybook

## 🔧 Configuration

### Next.js Config

- Turbopack enabled for development
- UI library transpilation
- Environment variable exposure

### TypeScript Config

- Strict mode enabled
- Path aliases (`@/*` for `src/*`)
- Next.js optimizations

### Tailwind Config

- UI library content inclusion
- Extended design system
- Custom utility classes

## 📊 Performance

### Optimization Features

- **Code Splitting**: Automatic with Next.js
- **Image Optimization**: Next.js Image component
- **Bundle Analysis**: Built-in bundle analyzer
- **Caching**: TanStack Query for data caching
- **Debouncing**: Reduced API calls

### Performance Metrics

- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- First Input Delay: < 100ms

## 🔒 Security

- **CSRF Protection**: Built into Next.js
- **XSS Prevention**: React's built-in protection
- **Content Security Policy**: Configurable headers
- **Environment Variables**: Secure secret management

## 🚀 Deployment

### Production Build

```bash
npm run build
npm run start
```

### Environment Variables

- `APPFIGURES_API_URL`: Reviews API endpoint
- `NODE_ENV`: Environment (production/development)

### Hosting Recommendations

- **Vercel**: Optimal for Next.js applications
- **Netlify**: Good alternative with edge functions
- **AWS/GCP/Azure**: Full control and scalability

## 📈 Monitoring

### Recommended Tools

- **Vercel Analytics**: Performance monitoring
- **Sentry**: Error tracking
- **LogRocket**: User session recording
- **Lighthouse CI**: Performance automation

## 🤝 Contributing

1. Follow the established patterns and conventions
2. Write TypeScript with explicit types
3. Test components thoroughly
4. Update documentation for changes
5. Use conventional commit format
