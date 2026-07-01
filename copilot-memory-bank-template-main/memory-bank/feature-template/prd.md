# PRD

_Describe the problem, goals, and success criteria._

---

## Problem Statement

People in the two-week wait (TWW) between ovulation and a reliable pregnancy test have no dedicated tool for this specific, anxiety-heavy moment. They resort to frantic googling, Reddit scrolling, and obsessing over symptoms without structured support.

---

## Goals

### Feature 1: TWW Timeline
**Goal:** Give users a personalized day-by-day countdown from ovulation date to test day.

- User enters ovulation date on landing page
- App calculates DPO 1–14 and displays as a visual timeline
- Highlights current day (today's DPO)
- Shows countdown to reliable test day (DPO 12–14)

### Feature 2: Day-by-Day Body Guide
**Goal:** Educate users on what's potentially happening in their body at each DPO.

- Each DPO day has short, warm descriptions of biological processes
- Covers implantation window (DPO 6–12), hormone changes, common sensations
- Written in warm, conversational tone — not medical textbook language

### Feature 3: "Should I Test?" Indicator
**Goal:** Give a clear, friendly signal about test reliability on any given day.

- DPO 1–7: "Too early — a test won't show anything yet"
- DPO 8–9: "Still early — most tests won't pick up yet"
- DPO 10–11: "Some people get a positive now, but a negative doesn't mean much yet"
- DPO 12–14: "This is a good time to test — results are more reliable now"
- Visual indicator (icon/color) that changes based on DPO

### Feature 4: Daily Symptom Log
**Goal:** Give users a place to log how they're feeling each day without obsessing.

- Predefined symptom chips (cramping, spotting, fatigue, nausea, mood swings, sore breasts, bloating, headache)
- Optional free-text note
- Saves per DPO day in localStorage
- Can review past entries on timeline

---

## Success Criteria

| Criteria | Metric |
|---|---|
| Time to value | < 60 seconds from open to personalized timeline |
| No friction | Zero sign-up, zero accounts |
| Mobile usability | Works flawlessly at 375px–430px |
| Offline capable | All features work without network |
| Emotional tone | User feels supported, not anxious — validated through copy |
| Feature completeness | All 4 features functional by end of week |