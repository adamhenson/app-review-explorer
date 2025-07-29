# ChatGPT Reviews Explorer

A modern monorepo application for exploring and filtering user reviews of the ChatGPT iOS app. Built with Next.js 15, React 19, and a comprehensive component library.

## 🚀 Features

- **Advanced Review Filtering**: Search by keywords and filter by multiple star ratings simultaneously
- **Smart Date Grouping**: Reviews are automatically grouped by date ranges (Today, Yesterday, This Week, etc.)
- **Infinite Pagination**: Load more reviews seamlessly with a "Load More" button
- **Responsive Design**: 3-column grid on desktop, 2-column on tablet, 1-column on mobile
- **Accessible Components**: Built with React Aria Components for excellent accessibility
- **Real-time Search**: 600ms debounced search input for smooth user experience
- **Modern UI**: Clean, professional interface with Tailwind CSS and modal interactions
- **Text Truncation**: Smart content truncation with expandable modal views
- **Multi-select Filters**: Compact popover-based rating filters with visual indicators

## 📁 Project Structure

This is a monorepo managed with npm workspaces:

```
app-review-explorer/
├── apps/
│   └── frontend/          # Next.js 15 + React 19 application
├── packages/
│   ├── ui/               # Reusable React component library
│   ├── storybook/        # Component documentation

├── docs/                 # Project documentation
└── _/                    # Assignment and requirements
```

## 🛠️ Technology Stack

### Frontend Application

- **Next.js 15** - React framework with App Router and Server Components
- **React 19** - Latest React with new features
- **TypeScript** - Type-safe development with strict mode
- **TanStack Query** - Data fetching, caching, and state management
- **Tailwind CSS** - Utility-first CSS framework
- **date-fns** - Date manipulation and formatting

### Component Library

- **React Aria Components** - Accessible UI primitives (Button, Select, Modal, Popover, Checkbox)
- **Tailwind CSS** - Consistent styling and design system
- **TSUP** - Fast TypeScript bundler with ESM/CJS output
- **clsx + tailwind-merge** - Dynamic class name composition

### Development Tools

- **Biome** - Fast formatter and linter replacing ESLint + Prettier
- **Husky** - Git hooks for code quality
- **Storybook** - Component documentation and visual testing
- **use-debounce** - Search input debouncing

## 🚀 Quick Start

### Prerequisites

- Node.js 18.17+ or 20.5+
- npm 10.0.0+

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd app-review-explorer
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp apps/frontend/example.env apps/frontend/.env.local
```

4. Build the UI library:

```bash
npm run build:ui
```

5. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## 📜 Available Scripts

### Root Level Commands

- `npm run dev` - Start the frontend development server (builds UI first)
- `npm run build` - Build UI library and frontend application
- `npm run build:ui` - Build the UI component library only
- `npm run start` - Start the production server
- `npm run storybook` - Start Storybook development server
- `npm run storybook:build` - Build Storybook for production
- `npm run lint` - Run linting on all packages
- `npm run lint:fix` - Fix linting issues automatically
- `npm run format` - Format code with Biome
- `npm run format:check` - Check code formatting
- `npm run type-check` - Type check frontend application
- `npm run type-check:ui` - Type check UI library

- `npm run clean` - Clean build artifacts from all packages

### Package-Specific Commands

Each package has its own scripts. See individual README files for details.

## 🏗️ Architecture

### API Integration

The application integrates with the external reviews API through a Next.js API proxy:

- **Internal API**: `/api/reviews` (proxies to external reviews API)
- **External API**: Configured via `APPFIGURES_API_URL` environment variable
- **CORS Solution**: Requests proxied through Next.js API routes to avoid CORS issues
- **Supported Filters**: Keyword search, star ratings, sorting, pagination
- **Data Caching**: Implemented with TanStack Query for optimal performance

### Component Architecture

- **ReviewFilters**: Search and multi-select star rating filters with 600ms debounced input
- **ReviewsList**: Displays grouped reviews with loading states and data consistency checks
- **ReviewCard**: Individual review display with text truncation and modal interactions
- **Date Grouping**: Automatic grouping by Today, Yesterday, This Week, Last Week, etc.
- **AppModal**: Reusable modal component for full review content display
- **FilterButton**: Compact popover-based filter UI with visual badges

### State Management

- **TanStack Query**: Server state management, caching, and pagination
- **React State**: Local component state for UI interactions and form controls
- **useRef + useMemo**: Text persistence during loading states to prevent flicker
- **Synchronized Display**: Applied filters only update when matching data arrives

## 🎨 Design System

The project includes a comprehensive design system built with:

- **Color Palette**: Professional blue and gray theme
- **Typography**: Inter font family with semantic sizing
- **Spacing**: Consistent 4px grid system
- **Components**: Accessible, reusable UI components
- **Dark Mode**: Ready for future implementation

## 🧪 Testing Strategy

### Component Testing

- **Storybook**: Comprehensive component documentation with stories for all UI components
- **Visual Testing**: Stories covering default, loading, error, and interaction states
- **Component Library**: Full coverage of Button, SearchField, Select, Modal, Popover, Checkbox, Loading, and StarRating components

## 📝 Development Guidelines

### Code Style

- **TypeScript**: Strict mode with explicit return types
- **Biome**: Automated formatting and linting
- **Conventional Commits**: Structured commit messages
- **JSDoc**: Function and component documentation

### Component Guidelines

- **React Aria**: All interactive components use React Aria
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: Optimized bundle sizes and loading
- **Responsive**: Mobile-first responsive design

## 🚀 Deployment

### Production Build

```bash
npm run build
npm start
```

### Environment Variables

Required environment variables for production:

- `APPFIGURES_API_URL`: Reviews API endpoint URL

## 🔗 Links

- [System Design Documentation](docs/system-design.md)
- [Frontend Application](apps/frontend/README.md)
- [UI Component Library](packages/ui/README.md)
