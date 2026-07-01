# Tech Context

_The tech stack, tools, and constraints._

---

## Tech Stack

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| Framework | React | 18.x | Component-based UI |
| Build Tool | Vite | 5.x | Fast dev server & builds |
| Styling | Tailwind CSS | 3.x | Utility-first mobile-first CSS |
| UI Components | shadcn/ui | latest | Accessible, customizable base components |
| Icons | Lucide React | latest | Clean, consistent icon set |
| Date Handling | date-fns | latest | Lightweight DPO date math |
| Routing | React Router | v6 | Client-side navigation |
| Storage | localStorage | — | Privacy-first, no backend |
| Deployment | Vercel | — | Fast, free CDN hosting |

---

## Development Setup

```bash
# Package manager
npm (or pnpm)

# Dev server
npm run dev        # Vite dev server on localhost:5173

# Build
npm run build      # Production build to /dist

# Preview
npm run preview    # Preview production build locally
```

---

## Technical Constraints

- **Mobile-first responsive** — designed for 375px–430px viewport, scales up
- **No backend / no database** — all data in localStorage
- **No authentication** — privacy-first, no accounts
- **Offline-capable** — works with poor signal (localStorage-based)
- **Fast load** — optimized for mobile networks, minimal bundle size
- **Touch-friendly** — minimum 44px tap targets, no hover-dependent interactions
- **Accessible** — semantic HTML, ARIA where needed (shadcn/ui helps here)

---

## Dependencies to Install

```json
{
  "dependencies": {
    "react": "^18",
    "react-dom": "^18",
    "react-router-dom": "^6",
    "date-fns": "^3",
    "lucide-react": "latest",
    "class-variance-authority": "latest",
    "clsx": "latest",
    "tailwind-merge": "latest"
  },
  "devDependencies": {
    "vite": "^5",
    "@vitejs/plugin-react": "latest",
    "tailwindcss": "^3",
    "postcss": "latest",
    "autoprefixer": "latest"
  }
}
```

---

## Fonts to Load

- **Serif/Script:** Playfair Display (or similar expressive serif) — for hero headings
- **Sans-serif:** Nunito or Poppins — for body text and UI
- Load via Google Fonts CDN in `index.html`