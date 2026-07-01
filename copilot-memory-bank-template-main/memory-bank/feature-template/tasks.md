# Tasks

_List of implementation tasks with acceptance criteria._

---

## Phase 1: Project Setup

- [ ] **T1.1** Scaffold Vite + React project
  - AC: `npm run dev` starts successfully, blank React page renders
- [ ] **T1.2** Install and configure Tailwind CSS
  - AC: Tailwind utility classes work in components
- [ ] **T1.3** Install shadcn/ui + configure components
  - AC: Can import and render a shadcn Button component
- [ ] **T1.4** Install dependencies (date-fns, react-router-dom, lucide-react)
  - AC: All imports resolve without error
- [ ] **T1.5** Set up Google Fonts (Playfair Display + Nunito)
  - AC: Both fonts render correctly in browser
- [ ] **T1.6** Set up React Router with route structure
  - AC: Navigation between `/`, `/timeline`, `/day/:dpo`, `/log` works
- [ ] **T1.7** Create TWW Context provider (ovulation date state)
  - AC: Context provides ovulation date and computed current DPO to children

---

## Phase 2: TWW Timeline (Priority Feature)

- [ ] **T2.1** Build Landing page — hero section with expressive heading
  - AC: Serif heading, warm tagline, decorative elements visible on mobile
- [ ] **T2.2** Build date input component for ovulation date
  - AC: User can select a date, stored in context + localStorage
- [ ] **T2.3** Build CTA button → navigates to /timeline
  - AC: Dark pill button, 44px+ tap target, navigates on tap
- [ ] **T2.4** Build Timeline page — header showing current DPO + countdown
  - AC: Displays "You're on DPO X" and "Y days until test day"
- [ ] **T2.5** Build DayCard component for each DPO day
  - AC: Shows DPO number, highlights current day, shows logged indicator
- [ ] **T2.6** Render full 14-day timeline as scrollable card list
  - AC: All 14 days visible, current day highlighted, past days styled differently

---

## Phase 3: Day-by-Day Body Guide

- [ ] **T3.1** Create DPO content data file (DPO 1–14 descriptions)
  - AC: Each DPO has a title, body text, and key event description
- [ ] **T3.2** Build Day Detail page (`/day/:dpo`)
  - AC: Renders correct content for the given DPO from URL param
- [ ] **T3.3** Add "What's happening" body guide section
  - AC: Warm, conversational text about biological processes for that DPO
- [ ] **T3.4** Link DayCards on timeline to Day Detail page
  - AC: Tapping a DayCard navigates to `/day/{dpo}`

---

## Phase 4: "Should I Test?" Indicator

- [ ] **T4.1** Create test reliability logic (DPO → tier mapping)
  - AC: Pure function returns correct tier for DPO 1–14
- [ ] **T4.2** Build TestIndicator component with icon + message + color
  - AC: Displays appropriate message and visual for current DPO tier
- [ ] **T4.3** Add TestIndicator to Timeline page (today's status)
  - AC: Banner shows current day's test reliability at top of timeline
- [ ] **T4.4** Add TestIndicator to Day Detail page
  - AC: Each day detail shows test info for that specific DPO

---

## Phase 5: Daily Symptom Log

- [ ] **T5.1** Create symptom options data (predefined list)
  - AC: Array of symptoms with labels and optional emoji/icons
- [ ] **T5.2** Build SymptomChips component (tappable pills)
  - AC: Chips toggle on/off on tap, visually indicate selected state
- [ ] **T5.3** Build free-text note input
  - AC: Textarea saves optional note alongside symptoms
- [ ] **T5.4** Save symptom entries to localStorage per DPO day
  - AC: Data persists across page reloads, keyed by DPO number
- [ ] **T5.5** Build past entries view (review logged days)
  - AC: Can see what was logged on previous days
- [ ] **T5.6** Show symptom indicators on Timeline DayCards
  - AC: Days with logged symptoms show a dot/indicator on the card

---

## Phase 6: Polish & Deploy

- [ ] **T6.1** Add encouragement micro-copy (rotating messages)
  - AC: Warm messages appear on timeline, change daily or per-visit
- [ ] **T6.2** Add decorative SVG elements (stars, sparkles, blobs)
  - AC: Decorative shapes visible on landing and timeline pages
- [ ] **T6.3** Responsive polish — test at 375px, 390px, 430px, 768px+
  - AC: No layout breaks, text readable, touch targets adequate
- [ ] **T6.4** Add "Reset my data" option
  - AC: User can clear all localStorage data with confirmation
- [ ] **T6.5** Deploy to Vercel
  - AC: App accessible at public URL, loads under 3s on mobile