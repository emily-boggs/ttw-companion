## 🚨 Never Upload Secrets

- Do not store API keys or `.env` in repo.
- Use `.env.example` with placeholders.
- If a secret is leaked: rotate credentials, purge history, notify team.

---

## 🤖 Copilot Working Rules

### Communication
- **Always ask before major decisions** — don't silently choose architecture or patterns
- Explain briefly, then implement
- Keep responses concise

### Code Style
- Mobile-first Tailwind classes (start with base/mobile, add `sm:`, `md:` breakpoints)
- Functional React components with hooks — no class components
- Named exports for components, default exports for pages
- Use `date-fns` for all date math — never raw Date manipulation
- All interactive elements must have min 44px touch targets

### Design Rules
- White backgrounds with colorful accent elements
- Serif/script font for hero headings only — sans-serif everywhere else
- Card-based layouts with 16px–24px border radius
- Decorative shapes (stars, sparkles, blobs) for personality
- Dark pill-shaped buttons for primary CTAs
- Generous whitespace — never cluttered
- Tone: warm, friendly, emotionally aware — never clinical

### Data & Privacy
- All user data stays in localStorage — never sent anywhere
- No analytics, no tracking, no external requests for user data
- Provide clear "reset my data" option

### Project Constraints
- No backend, no database, no auth
- Must work offline (localStorage-only)
- Optimize for mobile networks — keep bundle small
- Deploy to Vercel
