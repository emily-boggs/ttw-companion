# Tech Context

_Technology stack, architecture, and development setup._

---

## Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Build tool | Vite 5 (v8.1.2 plugin) |
| Styling | Tailwind CSS v4 (with @theme block in index.css) |
| Routing | react-router-dom v7 |
| Icons | Lucide React |
| Fonts | Google Fonts — Fraunces (serif, variable opsz+wght) + Nunito (sans) |
| Deployment | Vercel |
| Package manager | npm |

---

## Project Structure

```
tww-companion/
├── public/
│   └── (favicon goes here)
├── src/
│   ├── components/
│   │   └── AppLayout.jsx    # Global shell: nav rail, top bar, mobile nav
│   ├── pages/
│   │   ├── Home.jsx         # Dashboard with category cards + Today's Guide
│   │   ├── Today.jsx        # Daily body guide + symptom logging
│   │   ├── Timeline.jsx     # 14-day DPO card grid
│   │   ├── DayDetail.jsx    # Individual day view (guide + symptoms)
│   │   └── Chat.jsx         # Community feed with posts/replies
│   ├── App.jsx              # Router setup
│   ├── main.jsx             # Entry point
│   └── index.css            # Tailwind directives + @theme + background
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
├── README.md
└── LICENSE
```

---

## Design Tokens (in index.css @theme)

```css
--color-cta: #6366F1;          /* Indigo-500, primary CTA */
--font-serif: "Fraunces", serif;
```

Background: Fixed radial gradient with 5 layered ellipses on `#e0e7ff` base.

---

## Key Patterns

### Glassmorphism (outer cards)
```
bg-white/30 backdrop-blur-md border border-white/40 shadow-sm rounded-2xl
```

### Nested cards (inner content)
```
bg-white rounded-xl p-4
```

### Navigation
- **Desktop (md+):** M3-style rail — collapsed at md (w-20, icons + labels below), expanded at lg (w-64, inline labels + Quick Jump grid)
- **Mobile:** Floating pill bottom nav — `bg-white/40 backdrop-blur-md`, active state `bg-white text-indigo-600 shadow-md`

### Responsive Layout Pattern
```
max-w-md md:max-w-none pt-2
md:grid md:grid-cols-2 md:gap-8 md:items-start
```

### Modal/Sheet Pattern
- Mobile: Bottom sheet (absolute bottom-0, rounded-t-2xl, slide up)
- Desktop: Centered modal (md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-lg)

---

## Development

```bash
cd tww-companion
npm install
npm run dev        # localhost:5173
npm run build      # production build
```

---

## Deployment

- Hosted on Vercel
- Live: https://ttw-companion.vercel.app/
- Auto-deploys from main branch

---

## Dependencies (key)

- react, react-dom
- react-router-dom
- lucide-react
- tailwindcss (v4)
- @tailwindcss/vite
- date-fns
