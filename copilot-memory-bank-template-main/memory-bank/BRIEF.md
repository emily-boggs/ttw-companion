# Project Brief

_A short summary of project goals and scope._

# 📋 Project Brief — P303


## Two-Week Wait (TWW) Companion App

---

## 🧩 The Problem We're Solving

The two-week wait — the time between ovulation and when a pregnancy test is reliable — is one 
of the most emotionally charged, anxiety-filled experiences in the fertility journey. Women and 
people trying to conceive are left **googling symptoms at 2am**, doom-scrolling Reddit threads, 
and obsessing over every twinge in their body with zero structured support.

Most fertility apps (Flo, Clue, Ovia) are **cycle trackers** — they require months of data 
before they're useful, and they don't speak to the emotional reality of the TWW. There is no 
dedicated, warm, supportive tool built specifically for *this* moment.

---

## 🎯 Elevator Pitch

> *"TWW Companion is a mobile-first web app for people in the two-week wait. It gives you a 
> day-by-day guide of what's happening in your body, lets you log how you're feeling, and tells 
> you when it's actually time to test — so you can breathe a little easier."*

---

## 👤 Who This Is For

| | |
|---|---|
| **Primary User** | Women / people with cycles aged 20–38 who are actively trying to conceive |
| **Context of Use** | On their phone, often at night, anxious, looking for reassurance and information |
| **Technical Comfort** | Moderate — comfortable with apps, not necessarily tech-savvy |
| **Emotional State** | Hopeful but anxious. Needs warmth, not clinical coldness |

---

## 🏗️ What We're Building

A **responsive mobile-first web app** with one focused job: support someone through their 
two-week wait, day by day.

### Core Features (MVP)

| Feature | Description |
|---|---|
| 📅 **TWW Timeline** | Enter your ovulation date → get a personalized day-by-day countdown |
| 🌡️ **Daily Symptom Log** | Log symptoms each day (cramping, spotting, mood, fatigue, etc.) |
| 📖 **Day-by-Day Body Guide** | What's potentially happening in your body on each DPO (days past ovulation) |
| 🧪 **"Should I Test?" Indicator** | A clear, friendly signal for when a test would actually be reliable |
| 💛 **Encouragement Micro-copy** | Warm, supportive messages throughout — never clinical or cold |

---

## 🎨 Design Direction

**Mood:** Warm, friendly, soft, and reassuring — like a knowledgeable best friend, not a 
doctor's office.

### Visual Style

- **Color Palette:** Pastels — soft pinks, lavenders, warm whites, light beige, and soft grays
- **Typography:** Rounded, friendly fonts (e.g. *Nunito*, *DM Sans*, or *Poppins*)
- **Iconography:** Soft line icons and emoji-style illustrations throughout
- **Imagery:** Gentle, inclusive lifestyle imagery — diverse representation
- **Layout:** Lots of white space, card-based UI, nothing cluttered
- **Tone:** Warm, conversational, emotionally aware micro-copy

### Design Inspiration

> Soft card layouts, pastel backgrounds, rounded corners, icon + text pairings, gentle 
> gradients. Think: approachable wellness app, not medical software.

---

## ⚙️ Tech Specs

### Full Tech Stack

| Layer | Technology | Why |
|---|---|---|
| **Framework** | React 18 | Component-based, industry standard |
| **Build Tool** | Vite | Fast, modern, lightweight |
| **Styling** | Tailwind CSS | Utility-first, perfect for mobile-first design |
| **UI Components** | shadcn/ui | Beautiful, accessible, customizable |
| **Icons** | Lucide React | Clean, consistent icon set |
| **State Management** | React useState / useContext | Simple enough for MVP scope |
| **Date Handling** | date-fns | Lightweight date math for DPO calculations |
| **Routing** | React Router v6 | Simple page navigation |
| **Storage** | localStorage | No backend needed for MVP — privacy-first |
| **Deployment** | Vercel | Fast, free, mobile-optimized CDN |

### Mobile-First Requirements

- ✅ Responsive web app (NOT React Native / Flutter / Swift / Kotlin)
- ✅ Designed for 375px–430px viewport first, scales up
- ✅ Touch-friendly tap targets (min 44px)
- ✅ No hover-dependent interactions
- ✅ Fast load time — optimized for mobile networks
- ✅ Works offline or with poor signal (localStorage-based)

---

## 🚫 Out of Scope (MVP)

- User accounts / authentication
- Backend / database
- Push notifications
- Social features
- Medical advice or diagnosis

---

## ✅ Success Criteria

A user can open the app, enter their ovulation date, and immediately get value — a personalized 
timeline, daily body info, and a place to log how they're feeling — **in under 60 seconds, on 
their phone, with no account required.**