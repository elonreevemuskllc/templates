# Templates

Three categories of templates used in jeutiktok.fr ecosystem.

## 📁 Structure

### `landings-react/`
React TypeScript components (themes) used by the landing app at `/var/www/landing/src/components/`.

- `ChickenLayout.tsx` — Chicken Road theme
- `TowerRushLayout.tsx` — Tower Rush theme
- `NinjaCrashLayout.tsx` — Ninja Crash theme
- `PenaltyLayout.tsx` — Penalty theme
- `GeneralLayout.tsx` — Generic theme

### `fake-games/`
Standalone HTML fake game pages served by nginx (used by the A/B landing split). Each one is a fully self-contained mini-game (iframe + popup tuto + redirect logic).

- `chicken-road-game.html`
- `tower-rush-game.html`
- `megablock-game.html`
- `piano-game.html`
- `ninjacrash.html`
- `jeu.html`, `jeu3.html`
- `whitepage.html`

### `bonus-sites/`
Static bonus-aggregator sites (React build + admin panel + offers JSON).

- `sabonus/` — sabinhobonus.com (live)
- `ferrettibonus/` — ferrettibonus.com (live, cloned from sabonus)

**Note**: `uploads/` and `*.mp4` are excluded from this repo (user-generated / heavy media).

## 🔧 Usage

To clone a new bonus site:
```bash
cp -r bonus-sites/sabonus /var/www/newbonus
# Edit index.html (title, OG tags), offers.json, admin.html (API endpoint)
# Add nginx config + DNS
```

To use a React landing template:
```bash
# Copy into /var/www/landing/src/components/
# Reference it in App.tsx based on affiliate.theme
```
