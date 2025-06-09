# Server-Client Component Architecture

## Overview
We've optimized the application by implementing a hybrid server-client component architecture for maximum performance while maintaining interactivity.

## Architecture Changes

### Server Components (Fast Loading)
- **`/src/app/page.tsx`** - Main page component
  - Fetches data on server-side
  - No `'use client'` directive
  - Renders immediately with data

### Client Components (Interactive)
Components that use React hooks, state, or browser APIs require `'use client'`:

1. **`/src/themes/components/Navbar/Navbar.tsx`**
   - Uses `useState`, `useEffect`, `useRef`
   - Handles scroll events and mobile menu

2. **`/src/themes/components/HeroBanner/HeroBanner.tsx`**
   - Uses `useState`, `useEffect`
   - Handles dynamic content rendering

3. **`/src/themes/components/Footer/Footer.tsx`**
   - Uses `useState`, `useEffect`
   - Interactive footer functionality

4. **`/src/themes/components/TimeLine/TimeLine.tsx`**
   - Uses `useEffect`, `useRef`
   - Framer Motion animations

5. **`/src/themes/components/ShowCases/ShowCase.tsx`**
   - Uses `useState`, `useEffect`, `useRef`
   - Lazy loading and interactive showcases

6. **`/src/themes/components/Tabs/Tabs.tsx`**
   - Uses `useRef`
   - Interactive tab functionality

7. **`/src/themes/components/Slider/Slider.tsx`**
   - Uses `useRef`, `useEffect`
   - Framer Motion scroll animations

8. **`/src/themes/components/PricingCard/PricingCard.tsx`**
   - Uses Framer Motion
   - Interactive pricing cards

## Data Flow Architecture

### Server-Side Data Fetching
```typescript
// /src/app/page.tsx
async function getHomePageData() {
  const data = await client.fetch(HOME_PAGE_QUERY, {}, {
    cache: 'force-cache',
    next: { revalidate: 60 }
  });
  return data;
}
```

### Props-Based Data Passing
```typescript
// Server component passes data to client components
<Navbar initialData={navbar} />
<SpotlightPreview initialData={heroBanner} />
```

### Fallback Client-Side Fetching
```typescript
// Client components fallback to fetching if no server data
useEffect(() => {
  if (!initialData) {
    // Fetch data client-side
  }
}, [initialData]);
```

## Performance Benefits

1. **Server-Side Rendering**: Main page renders with data immediately
2. **Selective Hydration**: Only interactive components hydrate on client
3. **Optimized Caching**: 60-second cache with force-cache strategy
4. **Combined Queries**: Single API call for multiple data sources
5. **Progressive Enhancement**: Works without JavaScript, enhanced with it

## Best Practices Implemented

1. **Minimal Client Components**: Only components that need interactivity use `'use client'`
2. **Server-First Architecture**: Data fetching happens on server when possible
3. **Prop Drilling for Performance**: Server-fetched data passed as props
4. **Smart Fallbacks**: Client-side fetching as backup for server data
5. **Caching Strategy**: Optimized for both performance and freshness

## Error Resolution

Fixed common Next.js 15 errors:
- ✅ Added `'use client'` to components using React hooks
- ✅ Converted main page to server component for performance
- ✅ Implemented hybrid server-client architecture
- ✅ Maintained all interactive functionality

## Testing Checklist

- [ ] Server-side data fetching works
- [ ] Client-side fallback fetching works
- [ ] Interactive components (navbar, mobile menu) work
- [ ] Animations and scroll effects work
- [ ] Caching is working (check Network tab)
- [ ] No hydration mismatches
- [ ] Performance metrics improved (Lighthouse)
