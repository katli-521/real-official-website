## 1. Tech Stack

- Framework: React 19, TanStack Start (SSR), TanStack Router
- Styling: Tailwind CSS v4, Lucide Icons, clsx, tailwind-merge
- Server: tRPC, TanStack Start (Nitro/Deno Edge Runtime)
- Data: TanStack React Query v5, Zod validation, SuperJSON transformer

---

## 2. Directory Structure

```
src/
├── client/                     # Client-side core logic
│   ├── trpc/
│   │   ├── index.ts            # Initializes the tRPC client with splitLink logic for SSR and exports the typed 'trpc' proxy for hooks. It handles the transition between server-side local links and client-side HTTP calls.
│   │   └── provider.tsx        # Provides the TanStack Query client context to the React application tree. It wraps the app root to enable data fetching and caching throughout all components.
│   └── views/
│       └── home.tsx            # Main landing page view that renders the Root component and sets up toast notification portals. It manages the top-level layout structure and accessibility regions for notifications.
├── components/                 # React component library
│   ├── home/                   # Homepage sections and layout components
│   │   ├── flex-grow.tsx       # A layout wrapper using flex-grow to ensure the main content area occupies the full viewport height. It specifically nests the primary hero and content sections of the page.
│   │   ├── min-hscreen.tsx     # The primary shell component containing the site navigation, main sticky header, theme toggles, and site-wide footer. It establishes the global layout constraints and visual theme transitions.
│   │   ├── min-hscreen1.tsx    # A dense hero and content section featuring complex CSS-based decorative graphics, an interactive canvas, and the primary service listing grid. It implements high-fidelity visual effects like background blurs and animated stars.
│   │   └── root.tsx            # The entry point for the homepage component tree that purely renders the MinHScreen layout shell. It provides a clean hook for the root ID and future global home state.
│   └── not-found.tsx           # A simple, centered fallback view rendered when the user navigates to an undefined route. It displays a basic "404 - Not Found" message with minimal styling.
├── hooks/                      # Custom React hooks
│   └── use-mobile.ts           # Detects mobile screen sizes using window.matchMedia and the 768px breakpoint. It provides a reactive boolean to components for responsive rendering logic.
├── lib/                        # Utility functions
│   └── utils.ts                # Contains the 'cn' utility combining clsx and tailwind-merge for safe CSS class manipulation. It ensures Tailwind classes are merged correctly without conflicts.
├── routes/                     # TanStack Router route definitions
│   ├── api/
│   │   └── trpc.$.ts           # Catch-all API route handler for tRPC requests using the standard Fetch API adapter. It links incoming HTTP requests to the server's appRouter and context.
│   ├── __root.tsx              # The root layout component defining the HTML document structure, meta tags, and global style injections. It wraps the entire application in the TrpcProvider and renders the layout outlet.
│   └── index.tsx               # The index route definition mapping the site's root path directly to the HomePage view. It serves as the main entry point for site visitors.
├── server/                     # Server-side logic and tRPC configuration
│   ├── trpc/
│   │   ├── routes/
│   │   │   └── example.ts      # Defines public procedures for time queries and greeting mutations. It serves as a template for building out future domain-specific server routes.
│   │   ├── caller.ts           # Utility for creating a server-side caller to execute tRPC procedures directly within loaders or API routes. It abstracts the context and header propagation logic.
│   │   ├── context.ts          # Defines the tRPC context shared by all procedures, currently holding request headers. This is the foundation for future authentication and dependency injection.
│   │   ├── init.ts             # Initializes the tRPC backend instance with context typing and SuperJSON transformation. It exports the base router and public procedure builders used by specific routes.
│   │   ├── link.ts             # Configures the local server link for tRPC, allowing the client to call server functions directly during SSR without HTTP overhead. It uses TanStack Start's header utilities.
│   │   ├── middlewares.ts      # Contains the application's tRPC middleware for logging and mock authentication. It provides detailed execution timing and error reporting in the server console.
│   │   ├── procedure.ts        # Exports standardized procedure types including public and protected variations. It integrates the logging and auth middleware into a reusable API.
│   │   └── router.ts           # The main tRPC router assembly that merges all sub-routers into a single typed tree. It defines the 'AppRouter' type used by the client for type safety.
│   └── loader.ts               # Server-side data loading utility that executes tRPC calls within TanStack Router's loader lifecycle. It prevents client-side execution using typeof window checks.
├── styles/                     # Global styles
│   └── global.css              # Main Tailwind CSS v4 entry point with theme definitions and radius variables. It defines the Oklch-based color palette for both light and dark modes.
├── routeTree.gen.ts            # Auto-generated TanStack Router tree mapping file paths to route definitions.
└── router.tsx                  # TanStack Router configuration and instance creation including scroll restoration and 404 handling.
public/
└── home/
    └── styles/                 # Extracted asset-specific stylesheets
        ├── merged_styles.css   # Contains specific global viewport scaling and custom selection color overrides for the Yuri.WG brand.
        ├── style_44662de83434.css # Massive set of @property CSS variable definitions providing type safety for Tailwind's layout and transformation engine.
        └── style_793077ce07b0.css # Comprehensive utility manifest containing Tailwind reset styles, responsive grid layouts, and visual effect classes.
```

---

## 3. Core Modules

### 3.1 Layout & Navigation (components/home/)
The project uses a structured layout wrapper to manage global state like themes and navigation.
- `min-hscreen.tsx`: The master layout component. It includes the sticky navigation bar, the "DARK/EN" toggle buttons, and the global grid-pattern footer.
- `flex-grow.tsx`: A simple layout helper that ensures the main content area stretches to fill available space using `min-h-screen`.
- `root.tsx`: Acts as the high-level container for the homepage components.

### 3.2 Hero & Visual Sections (components/home/)
High-fidelity visual components using canvas and CSS-based graphics.
- `min-hscreen1.tsx`: The primary content component. It contains the interactive canvas hero (an image-based signature/graphic), floating decorative SVG stars/icons, and the three-item service grid (AI Library, Knowledge Base, Data Viz). It uses intensive absolute positioning and blurs for a "Digital Craftsmanship" aesthetic.

### 3.3 Data & Infrastructure (server/trpc/)
Backend logic for handling requests.
- `router.ts`: Combines procedural logic.
- `routes/example.ts`: Provides procedures for server time and user greetings.

---

## 4. Routes

| Path | File | Description |
|------|------|-------------|
| / | routes/index.tsx | Landing page for Yuri.WG featuring portfolio highlights and contact info |
| /api/trpc/$ | routes/api/trpc.$.ts | Catch-all handler for tRPC API interactions (queries/mutations) |
| __root__ | routes/__root.tsx | Root layout containing the site's `<head>`, meta tags, and global style imports |

---

## 5. Data Flow

### 5.1 State Management
- **URL/Routing State**: Managed by `TanStack Router`, which also handles the root document structure.
- **Visual State**: Handled via raw CSS and Tailwind classes (e.g., `.dark` class on the `<html>` element for theming).
- **Responsive State**: `useIsMobile` hook uses `matchMedia` to provide screen-size awareness for specific component layouts.

### 5.2 Data Fetching
- **tRPC + React Query**: The application uses tRPC for type-safe client-server communication. On the client, `trpcClient` acts as the engine, while `@trpc/tanstack-react-query` provides the hooks used in components.
- **Isomorphic Links**: In `client/trpc/index.ts`, a `splitLink` checks if the code is running on the server (`typeof window === 'undefined'`). If so, it uses a `lazyServerLink` to call server functions directly; otherwise, it uses `httpBatchLink`.

### 5.3 Key Data Paths
- **Initial Load**: TanStack Router loads the `__root` route → injects extracted CSS from `public/home/styles/` → `HomePage` renders `Root`.
- **API Request**: Component calls `trpc.example.greet.useQuery` → React Query checks cache → `httpBatchLink` sends request to `/api/trpc/example.greet` → `routes/api/trpc.$.ts` handles the request.

---

## 6. Stylesheets

### `merged_styles.css`
- **Summary**: Implements global brand-identity adjustments and viewport-based typography scaling. It primarily focuses on the user interface's interactive feel.
- **Type**: `global`
- **Key Selectors**: `::selection`, `html`
- **CSS Variables Defined**: None.
- **Related Components**: 
  - `min-hscreen.tsx` — affected by the global selection color.
- **Edit Guidance**: Safe to change color values and font sizes. 

### `style_44662de83434.css`
- **Summary**: Contains a comprehensive list of `@property` definitions for modern CSS variables. This ensures that Tailwind transitions and transforms (like gradients and scales) have typed initial values for smooth animation.
- **Type**: `global`
- **Key Selectors**: N/A (Variable definitions only)
- **CSS Variables Defined**: `--tw-translate-x`, `--tw-scale-x`, `--tw-gradient-from`, `--tw-mask-top`, `--tw-shadow`, `--tw-ring-color`, `--tw-backdrop-blur`.
- **Related Components**: 
  - `min-hscreen1.tsx` — uses `--tw-scale-x`, `--tw-rotate` for decorative icons.
  - `min-hscreen.tsx` — uses backdrop-blur and shadow variables for the nav.
- **Edit Guidance**: Risky: Do not delete these properties as it may break CSS animations and transitions in Chromium-based browsers.

### `style_793077ce07b0.css`
- **Summary**: The main Tailwind utility manifest containing the CSS reset, font definitions, and the majority of utility classes (flex, grid, spacing). It defines the visual architecture of the entire site.
- **Type**: `custom`
- **Key Selectors**: `.bg-accent`, `.max-w-7xl`, `.backdrop-blur-md`, `.font-mono`, `.tracking-tighter`, `.animate-pulse`, `.flex-col`, `.grid-cols-12`
- **CSS Variables Defined**: `--tw-ring-color: rgb(59 130 246/0.5)`, `--tw-ring-offset-color: #fff`.
- **Related Components**: 
  - `min-hscreen.tsx` — uses `.bg-white/90`, `.backdrop-blur-md`, `.border-gray-100`.
  - `min-hscreen1.tsx` — uses `.bg-accent/20`, `.blur-[100px]`, `.grid-cols-1`.
  - `footer (inside MinHScreen)` — uses `.bg-[size:60px_60px]`, `.tracking-widest`.
- **Edit Guidance**: This is the primary file for layout adjustments. Add new utility modifications at the end of the file to ensure they override defaults.

### Brand Colors

| Semantic Role | Value | Source File |
|---------------|-------|-------------|
| Accent (Blue) | #0033ff / rgb(0 51 255) | merged_styles.css, style_793077ce07b0.css |
| Border Gray | #e5e7eb | style_793077ce07b0.css |
| Selection Blue| #0033ff | merged_styles.css |

### Responsive Breakpoints

| Breakpoint | Value | Source File |
|------------|-------|-------------|
| sm | 640px | style_793077ce07b0.css |
| md | 768px | style_793077ce07b0.css |
| lg | 1024px | style_793077ce07b0.css |