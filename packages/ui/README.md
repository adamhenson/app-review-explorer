# UI Component Library

A comprehensive, accessible React component library built with React Aria Components and Tailwind CSS. Designed for modern web applications with a focus on accessibility, performance, and developer experience.

## 🎯 Features

- **Accessibility First**: Built with React Aria Components for WCAG 2.1 AA compliance
- **TypeScript Native**: Full TypeScript support with excellent developer experience
- **Tailwind CSS**: Utility-first styling with consistent design system
- **Tree Shakeable**: Import only what you need for optimal bundle sizes
- **Framework Agnostic**: Works with any React-based framework
- **Modern Browser Support**: Supports all modern browsers

## 📦 Installation

This package is designed to be used within the monorepo. To use it in your application:

```bash
npm install @app-review-explorer/ui
```

## 🎨 Design System

### Color Palette

```css
/* Primary Colors */
--primary-50: #eff6ff
--primary-100: #dbeafe
--primary-200: #bfdbfe
--primary-300: #93c5fd
--primary-400: #60a5fa
--primary-500: #3b82f6
--primary-600: #2563eb
--primary-700: #1d4ed8
--primary-800: #1e40af
--primary-900: #1e3a8a

/* Gray Scale */
--gray-50: #f9fafb
--gray-100: #f3f4f6
--gray-200: #e5e7eb
--gray-300: #d1d5db
--gray-400: #9ca3af
--gray-500: #6b7280
--gray-600: #4b5563
--gray-700: #374151
--gray-800: #1f2937
--gray-900: #111827
```

### Typography

- **Font Family**: Inter (system fallback: ui-sans-serif, system-ui, sans-serif)
- **Font Sizes**: Semantic scale from xs (12px) to 4xl (36px)
- **Line Heights**: Optimized for readability

### Spacing

Consistent 4px grid system:

- `1` = 4px
- `2` = 8px
- `4` = 16px
- `6` = 24px
- `8` = 32px
- `12` = 48px

## 🧩 Components

### Button

Versatile button component with multiple variants and sizes, built with React Aria.

```tsx
import { Button } from '@app-review-explorer/ui';

<Button variant="primary" size="md" onPress={() => console.log('clicked')}>
  Click me
</Button>;
```

**Props:**

- `variant`: `'primary' | 'secondary' | 'outline' | 'ghost'`
- `size`: `'sm' | 'md' | 'lg'`
- `children`: ReactNode
- `className?`: string
- All React Aria Button props

### SearchField

Accessible search input with clear functionality and integrated icon.

```tsx
import { SearchField } from '@app-review-explorer/ui';

<SearchField
  label="Search Reviews"
  placeholder="Enter keywords..."
  value={searchTerm}
  onChange={setSearchTerm}
/>;
```

**Props:**

- `label`: string (required for accessibility)
- `placeholder?`: string
- `value?`: string
- `onChange?`: (value: string) => void
- `className?`: string
- All React Aria SearchField props

### Select

Accessible dropdown selection with keyboard navigation and custom styling.

```tsx
import { Select, SelectItem } from '@app-review-explorer/ui';

<Select label="Rating Filter" placeholder="All ratings">
  <SelectItem key="5">⭐⭐⭐⭐⭐ 5 stars</SelectItem>
  <SelectItem key="4">⭐⭐⭐⭐ 4 stars</SelectItem>
  <SelectItem key="3">⭐⭐⭐ 3 stars</SelectItem>
</Select>;
```

**Props:**

- `label`: string (required for accessibility)
- `placeholder?`: string
- `children`: ReactNode (SelectItem components)
- `className?`: string
- All React Aria Select props

### Checkbox & CheckboxGroup

Multi-select checkbox components for filtering and selection.

```tsx
import { Checkbox, CheckboxGroup } from '@app-review-explorer/ui';

<CheckboxGroup
  label="Select Ratings"
  value={selectedValues}
  onChange={setSelectedValues}
>
  <Checkbox value="5">⭐⭐⭐⭐⭐ 5 stars</Checkbox>
  <Checkbox value="4">⭐⭐⭐⭐ 4 stars</Checkbox>
</CheckboxGroup>;
```

### Popover

Floating content container for dropdowns and menus.

```tsx
import { Popover } from '@app-review-explorer/ui';

<Popover trigger={<Button>Open Menu</Button>} placement="bottom start">
  <div className="p-4">Popover content</div>
</Popover>;
```

### FilterButton

Compact filter button with popover and active count badge.

```tsx
import { FilterButton, CheckboxGroup, Checkbox } from '@app-review-explorer/ui';

<FilterButton label="Rating" activeCount={2}>
  <CheckboxGroup label="Filter by Rating" value={ratings} onChange={setRatings}>
    <Checkbox value="5">⭐⭐⭐⭐⭐ 5 stars</Checkbox>
  </CheckboxGroup>
</FilterButton>;
```

### AppModal

Full-screen modal dialog for displaying detailed content.

```tsx
import { AppModal } from '@app-review-explorer/ui';

<AppModal title="Review Details" trigger={<Button>View Full Review</Button>}>
  <div>Full review content here...</div>
</AppModal>;
```

### StarRating

Visual star rating display component with customizable size and labels.

```tsx
import { StarRating } from '@app-review-explorer/ui';

<StarRating rating={4.5} size="md" showLabel />;
```

**Props:**

- `rating`: number (0-5)
- `size?`: `'xs' | 'sm' | 'md' | 'lg'`
- `showLabel?`: boolean
- `className?`: string

### Loading

Loading spinner with optional text and customizable sizes.

```tsx
import { Loading } from '@app-review-explorer/ui';

<Loading size="md" text="Loading reviews..." />;
```

**Props:**

- `size?`: `'sm' | 'md' | 'lg'`
- `text?`: string
- `className?`: string

### ExpandableText

Text component with CSS-based truncation and fixed height.

```tsx
import { ExpandableText } from '@app-review-explorer/ui';

<ExpandableText text="Long review content..." className="custom-styles" />;
```

**Props:**

- `text`: string
- `className?`: string

## 🛠️ Utilities

### cn()

Utility function for merging class names with Tailwind CSS conflict resolution.

```tsx
import { cn } from '@app-review-explorer/ui';

const className = cn(
  'base-styles',
  condition && 'conditional-styles',
  'override-styles'
);
```

## 🎨 Styling

### Using with Tailwind CSS

The components are designed to work seamlessly with Tailwind CSS. Include the component styles in your Tailwind configuration:

```js
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@app-review-explorer/ui/dist/**/*.js',
  ],
  // ... rest of config
};
```

### Custom Styling

Components accept a `className` prop for additional styling:

```tsx
<Button className="bg-red-500 hover:bg-red-600" variant="primary">
  Custom Styled Button
</Button>
```

### CSS Variables

The library uses CSS custom properties for theming:

```css
:root {
  --primary-color: #3b82f6;
  --text-color: #111827;
  --border-color: #e5e7eb;
}
```

## ♿ Accessibility

All components are built with accessibility in mind:

- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: Proper ARIA labels and descriptions
- **Focus Management**: Logical focus flow
- **Color Contrast**: WCAG AA compliant color ratios
- **Semantic HTML**: Proper HTML elements and structure

### Testing Accessibility

- Use automated tools like axe-core
- Test with keyboard navigation
- Verify with screen readers
- Check color contrast ratios

## 🚀 Development

### Building

```bash
npm run build
```

### Development Mode

```bash
npm run dev
```

### Linting

```bash
npm run lint
npm run lint:fix
```

### Type Checking

```bash
npm run type-check
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Button.tsx      # Button component
│   ├── Loading.tsx     # Loading spinner
│   ├── SearchField.tsx # Search input
│   ├── Select.tsx      # Dropdown select
│   └── StarRating.tsx  # Star rating display
├── utils/              # Utility functions
│   └── cn.ts          # Class name utility
├── styles.css         # Component styles
└── index.ts          # Main export file
```

## 🧪 Testing

### Component Testing

Components are tested with:

- **Jest**: Unit testing framework
- **React Testing Library**: Component testing utilities
- **User Events**: Interaction testing

### Visual Testing

- **Storybook**: Component documentation and visual testing
- **Chromatic**: Visual regression testing

## 📋 Best Practices

### Component Usage

1. **Always provide labels** for form components
2. **Use semantic HTML** when possible
3. **Test keyboard navigation** for interactive components
4. **Provide meaningful error messages** for form validation
5. **Use appropriate ARIA attributes** for complex interactions

### Styling Guidelines

1. **Use Tailwind utilities** for styling
2. **Maintain consistent spacing** with the 4px grid
3. **Follow the design system** colors and typography
4. **Ensure sufficient color contrast** for accessibility
5. **Test responsive behavior** across breakpoints

### Performance Tips

1. **Import only needed components** to reduce bundle size
2. **Use tree-shaking** to eliminate unused code
3. **Optimize images** and icons for web delivery
4. **Monitor bundle size** with tools like Bundle Analyzer

## 🔧 Configuration

### TypeScript

The library includes comprehensive TypeScript definitions:

```json
{
  "compilerOptions": {
    "strict": true,
    "jsx": "react-jsx",
    "declaration": true,
    "declarationMap": true
  }
}
```

### Build Configuration

Built with TSUP for optimal performance:

```js
// tsup.config.js
export default {
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  external: ['react', 'react-dom'],
};
```

## 🤝 Contributing

1. Follow the established component patterns
2. Write comprehensive tests for new components
3. Update documentation for changes
4. Ensure accessibility compliance
5. Use conventional commit format

## 📝 Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and updates.

## 📄 License

This component library is private and proprietary.
