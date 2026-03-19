# Playonix — Real-Time Sports Matching

Find nearby players instantly. Play now.

## Quick Start

```bash
npm install
npm run dev
# → http://localhost:5173
```

Hit **"Continue with Demo"** on the login screen for instant access with sample data.

---

## File Structure

```
playonix/
├── src/
│   ├── App.jsx                              Root screen router
│   ├── main.jsx                             React entry point
│   ├── styles/globals.css                   All CSS variables, utilities, responsive rules
│   ├── data/
│   │   ├── sports.js                        Sport list + level meta
│   │   └── sampleData.js                    Seed users and matches
│   ├── utils/
│   │   ├── storage.js                       localStorage wrapper
│   │   ├── matchUtils.js                    Time formatting, slot helpers
│   │   └── scoreUtils.js                    Reliability score math
│   ├── context/AppContext.jsx               Global state + auth + persistence
│   ├── components/
│   │   ├── auth/AuthScreen.jsx              Login / Register
│   │   ├── profile/
│   │   │   ├── ProfileSetup.jsx             2-step onboarding (sport + level)
│   │   │   └── ProfileScreen.jsx            Profile tab
│   │   ├── matches/
│   │   │   ├── CreateMatch.jsx              Create match modal
│   │   │   ├── MatchDetail.jsx              Match detail + actions modal
│   │   │   └── Tabs.jsx                     NearbyMatches, MyMatches, Notifications
│   │   └── shared/
│   │       ├── Icon.jsx                     Inline SVG icon component
│   │       ├── ReliabilityBadge.jsx         SVG ring score badge
│   │       ├── MatchCard.jsx                Reusable match list card
│   │       └── PlayerSlots.jsx              Slot grid visualization
│   └── screens/HomeScreen.jsx              App shell — side nav + bottom nav + tabs
├── index.html
├── package.json
└── vite.config.js
```

---

## Features

| Feature | Status |
|---|---|
| Register / Login / Demo | ✅ |
| Profile setup — sports with per-sport level | ✅ |
| Custom sport — add your own | ✅ |
| Overall athlete level | ✅ |
| Create Match | ✅ |
| Discover nearby matches + map placeholder | ✅ |
| Join match | ✅ |
| Confirm participation | ✅ |
| Check-in at match time | ✅ |
| Reliability Score (+2 check-in / −10 no-show) | ✅ |
| Notifications | ✅ |
| Responsive — phone + laptop | ✅ |
| Play Now (instant match) | 🔜 |

---

## Reliability Score

| Event | Change |
|---|---|
| Check in at match | +2 |
| No-show recorded | −10 |
| Range | 0 – 100 |

**85+** Reliable · **65–84** Average · **0–64** Risky

---

## Responsive Layout

- **Mobile < 768px** — full screen with bottom tab bar
- **Desktop ≥ 768px** — sidebar navigation + content column, max-width 960px
