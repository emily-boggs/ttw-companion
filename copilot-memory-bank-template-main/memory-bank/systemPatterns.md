# System Patterns

_Common design and architecture patterns used in the project._

---

## Architecture Overview

Single-page app (SPA) with client-side routing. No backend — all data persists in localStorage.

```
src/
├── components/       # Reusable UI components
│   ├── ui/           # shadcn/ui base components
│   └── ...           # App-specific components
├── pages/            # Route-level page components
├── hooks/            # Custom React hooks
├── lib/              # Utilities, date helpers, constants
├── data/             # Static content (DPO descriptions, symptoms list)
├── context/          # React Context providers
└── assets/           # SVGs, decorative shapes, fonts
```

---

## Key Design Patterns

### Component Structure
- **Pages** handle layout and data fetching (from localStorage)
- **Components** are presentational — receive props, render UI
- **Hooks** encapsulate reusable logic (e.g., `useTimeline`, `useSymptomLog`)
- **Context** for shared state (ovulation date, current DPO)

### Data Flow
```
localStorage ←→ Context Provider → Pages → Components
```

### State Management
- `useContext` for global state (ovulation date, logged symptoms)
- `useState` for local UI state
- No external state library needed at MVP scope

### Routing
- `/` — Landing / onboarding (enter ovulation date)
- `/timeline` — Day-by-day TWW timeline
- `/day/:dpo` — Detail view for a specific DPO day
- `/log` — Symptom logging

---

## Visual Design System

### Design Direction (Updated from Reference)
- **White/clean background** with colorful accent pops
- **Expressive serif/script font** for hero headings and section titles
- **Rounded sans-serif** (Nunito or Poppins) for body text and UI
- **Decorative elements** — stars, sparkles, abstract blobs, crescents for warmth
- **Card-based layout** with generous rounded corners (16px–24px)
- **Dark pill-shaped CTA buttons** for primary actions
- **Lots of white space** — airy, uncluttered, mobile-friendly
- **Colorful spot accents** — soft pinks, lavenders, warm yellows
- **Rounded/oval photo frames** or illustration containers
- **Touch targets** minimum 44px

### Color Palette
| Role | Color | Usage |
|---|---|---|
| Background | White (#FFFFFF) | Main background |
| Surface | Soft warm white (#FAFAFA) | Cards, sections |
| Primary | Soft lavender (#C4B5FD) | Accents, active states |
| Secondary | Warm pink (#FBCFE8) | Highlights, decorative |
| Accent | Soft yellow (#FDE68A) | Decorative shapes |
| Text Primary | Dark charcoal (#1F2937) | Headings, body |
| Text Secondary | Medium gray (#6B7280) | Captions, metadata |
| CTA | Dark/black (#1F2937) | Buttons |

### Typography
| Role | Font | Weight |
|---|---|---|
| Hero headings | Serif/Script (e.g., Playfair Display or similar) | Bold |
| Section headings | Same serif or rounded sans | Semi-bold |
| Body text | Nunito / Poppins | Regular/Medium |
| Micro-copy | Nunito / Poppins | Regular |