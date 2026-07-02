## Never Upload Secrets

- Do not store API keys or `.env` in repo.
- Use `.env.example` with placeholders.
- If a secret is leaked: rotate credentials, purge history, notify team.

---

## Copilot Working Rules

### Communication
- **Always ask before major decisions** — don't silently choose architecture or patterns
- Explain briefly, then implement
- Keep responses concise

### Code Style
- Mobile-first Tailwind classes (start with base/mobile, add `md:`, `lg:` breakpoints)
- Functional React components with hooks — no class components
- Named exports for components, default exports for pages
- Use `date-fns` for all date math — never raw Date manipulation
- All interactive elements must have min 44px touch targets

### Design Rules
- Glassmorphic outer cards (`bg-white/30 backdrop-blur-md border border-white/40`)
- Solid white inner/nested cards (`bg-white rounded-xl`)
- Fixed gradient background (radial blobs on `#e0e7ff`)
- Fraunces serif for headings, Nunito sans for body
- Indigo/violet color palette (`#6366F1` primary CTA)
- Rounded corners: 2xl for cards, full for pills/buttons
- Generous whitespace — never cluttered
- Tone: warm, friendly, emotionally aware — never clinical

### Navigation
- M3-style rail on desktop (collapsed md, expanded lg)
- Floating pill bottom nav on mobile
- Global top bar with profile + notifications on all pages

### Data & Privacy
- All user data stays in localStorage — never sent anywhere
- No analytics, no tracking, no external requests for user data
- Provide clear "reset my data" option

### Project Constraints
- No backend, no database, no auth
- Must work offline (localStorage-only)
- Optimize for mobile networks — keep bundle small
- Deploy to Vercel
