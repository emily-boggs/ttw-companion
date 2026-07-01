# Context

_Active decisions, scope, and current status._

---

## Current Status

**Phase:** Pre-development — planning complete, ready to scaffold.

---

## Scope

### In Scope (MVP — this week)
1. **TWW Timeline** — ovulation date → 14-day DPO countdown
2. **Day-by-Day Body Guide** — what's happening at each DPO
3. **"Should I Test?" Indicator** — DPO-based reliability signal
4. **Daily Symptom Log** — predefined chips + notes, saved per day

### Out of Scope
- User accounts / auth
- Backend / database
- Push notifications
- Social features
- Medical advice
- Cycle tracking (this is NOT a period tracker)

---

## Active Decisions

| Question | Decision | Status |
|---|---|---|
| How does user start? | Enter ovulation date on landing page → timeline | ✅ Decided |
| Where does data live? | localStorage only — privacy-first | ✅ Decided |
| What if user doesn't know ovulation date? | Provide helper text ("usually ~14 days before expected period") | ✅ Decided |
| How many DPO days? | 14 (standard TWW) | ✅ Decided |
| When is test reliable? | DPO 12+ for most tests | ✅ Decided |
| Can user change ovulation date? | Yes — reset from settings or landing page | ✅ Decided |

---

## Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Content accuracy (biology descriptions) | Use well-sourced fertility education content, add disclaimer |
| Emotional harm (false hope/anxiety) | Careful copy — never promise outcomes, always supportive |
| Tight deadline (end of week) | Prioritize Timeline feature, cut polish if needed |
| Mobile UX issues | Test on real device throughout development |

---

## Dependencies

- None external — all client-side, no APIs, no backend
- Content: need DPO 1–14 body guide copy (can write during development)
- Design: reference image provided, designing as we go