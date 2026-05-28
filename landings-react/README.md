# Landings React (Templates)

Full React TypeScript landings used by jeutiktok.fr ecosystem.

## 📁 Structure (mirror of `src/` in the Vite project)

```
landings-react/
├── components/
│   ├── ChickenLayout.tsx       # Chicken Road theme
│   ├── TowerRushLayout.tsx     # Tower Rush theme
│   ├── NinjaCrashLayout.tsx    # Ninja Crash theme
│   ├── PenaltyLayout.tsx       # Penalty theme
│   ├── GeneralLayout.tsx       # Generic theme
│   └── FakeLive.tsx            # Used by all layouts
├── config/
│   ├── affiliates.ts           # ⚠️ SANITIZED (3 sample entries) — replace with real list
│   ├── themes.ts               # Theme color definitions
│   └── taapit-links.json       # Taapit short links by subdomain
├── utils/
│   ├── linkManager.ts          # CTA link resolver (geo, TikTok in-app, Mystake special)
│   ├── affiliateTelegramUrl.ts
│   └── haptics.ts
├── hooks/
│   └── useScrollHaptics.ts
└── translations.ts             # Multi-language strings (FR, IT, ES, DE, etc.)
```

## 🚀 Usage

1. Drop these files into your Vite + React + TS project under `src/`
2. The layouts expect to be rendered by an `App.tsx` that picks a theme based on `affiliate.theme`:

```tsx
import { getCurrentAffiliate } from './config/affiliates';
import ChickenLayout from './components/ChickenLayout';
import TowerRushLayout from './components/TowerRushLayout';

function App() {
  const affiliate = getCurrentAffiliate();
  if (!affiliate) return null;

  if (affiliate.theme === 'chicken') return <ChickenLayout {...} />;
  if (affiliate.theme === 'tower-rush') return <TowerRushLayout {...} />;
  // etc.
}
```

3. Setup nginx with wildcard subdomain → serves the same `index.html` to all subdomains
4. The React app reads `window.location.hostname` to detect which affiliate to show

## ⚠️ Sanitized files

The following are **sample placeholders**, replace before deploy:
- `config/affiliates.ts` — your real file has 900+ entries; this is a 3-entry sample
- `config/taapit-links.json` — 2 sample entries

## 📦 Dependencies (package.json)

This code expects (at minimum):
- `react`, `react-dom` 18+
- `lucide-react` (icons)
- TypeScript 5+
- Tailwind CSS 3+ (most layouts use Tailwind classes)
