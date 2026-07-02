# System Patterns

_Architecture decisions, component patterns, and conventions._

---

## Architecture

**Single-Page Application** with client-side routing. No backend — all data is local/in-memory (MVP scope).

```
App.jsx (Router)
└── AppLayout.jsx (Global shell)
    ├── Navigation Rail (desktop)
    ├── Top Bar (profile + notifications)
    ├── <Outlet /> (page content)
    └── Bottom Nav (mobile)
```

---

## Component Conventions

### Page Components
- Located in `src/pages/`
- Receive no props — manage own state or read from route params
- Wrapped by `AppLayout` via React Router `<Outlet />`
- Use `max-w-md md:max-w-none` for responsive width
- Content starts at `pt-2` (top bar provides 32px padding above)

### Layout Patterns
- Two-column on desktop: `md:grid md:grid-cols-2 md:gap-8 md:items-start`
- Three-column grids for cards: `md:grid-cols-2 lg:grid-cols-3`
- Left column sticky: `md:sticky md:top-8`
- Day circle hidden on desktop: `md:hidden`
- Headings: `text-2xl md:text-3xl font-bold font-serif`

### Card Hierarchy
1. **Outer (frosted glass):** `bg-white/30 backdrop-blur-md border border-white/40 shadow-sm rounded-2xl p-5`
2. **Inner (solid):** `bg-white rounded-xl p-4`
3. **Interactive chips:** `bg-indigo-50 text-indigo-700 rounded-full px-3 py-1` (selected: `bg-indigo-100 ring-2 ring-indigo-400`)

### Drawer/Modal Pattern
```jsx
{/* Overlay */}
<div className="fixed inset-0 bg-black/30 z-40" onClick={close} />

{/* Mobile: bottom sheet */}
<div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 p-6 md:hidden">

{/* Desktop: centered modal */}
<div className="hidden md:block fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl z-50 p-6 max-w-lg w-full">
```

---

## Navigation System

### Desktop Rail (AppLayout)
- Frosted glass sidebar: `bg-white/30 backdrop-blur-md border-r border-white/40`
- Collapsed (md): w-20, icon + label stacked vertically
- Expanded (lg): w-64, icon + label inline, Quick Jump grid visible
- Active indicator: `bg-indigo-100 text-indigo-600` pill
- Logo: Gradient "TWW" text (lg) or indigo square with sparkle (md)

### Mobile Bottom Nav
- Floating pill: `bg-white/40 backdrop-blur-md rounded-full mx-4 mb-4 px-6 py-3`
- 4 items with `gap-9`
- Active: `bg-white text-indigo-600 shadow-md rounded-full p-2`
- Inactive: `text-gray-500`

### Top Bar (Global)
- Sticky, right-aligned
- Profile pill: avatar (w-8 h-8) + name (text-xs, lg only)
- Bell button: w-10 h-10, notification dot
- Profile dropdown: Edit Profile, Log Out

---

## State Management

- **Local component state** (useState) for all features
- Ovulation date stored in localStorage
- Symptom logs stored in component state (not persisted in MVP)
- Community posts: hardcoded initial data + local additions/deletions
- No global state library needed at MVP scale

---

## Routing

```jsx
<Routes>
  <Route element={<AppLayout />}>
    <Route path="/home" element={<Home />} />
    <Route path="/today" element={<Today />} />
    <Route path="/timeline" element={<Timeline />} />
    <Route path="/day/:dayNumber" element={<DayDetail />} />
    <Route path="/chat" element={<Chat />} />
  </Route>
  <Route path="/" element={<Landing />} />
</Routes>
```

---

## Styling Conventions

- Tailwind utility-first, no custom CSS classes (except @theme tokens)
- Responsive: mobile-first, `md:` for tablet, `lg:` for desktop
- Colors: indigo-500/600 for primary, gray-500 for muted, white for cards
- Font sizes: `text-sm` body, `text-base` emphasis, `text-2xl`/`text-3xl` headings
- Spacing: `p-4`/`p-5` for cards, `gap-4`/`gap-8` for grids
- Transitions: `transition-colors` on interactive elements
