# Cadet Quest Map

An interactive, gamified training platform for Royal Canadian Army, Air, and Sea Cadets. Cadets progress along quest maps, complete hands-on training modules, earn badges, build an avatar, and track their journey — all in the browser, with full English/French bilingual support.

## Features

- **Quest maps** — visual progression maps for each program (Army/Red Star, Sea Phase 2, Air Phase 2) with unlockable lessons.
- **24+ training modules** — self-paced lessons with readings, interactive simulators, knowledge checks, and XP.
- **Interactive simulators** — HTML5 `<canvas>` activities such as the Deck Orientation Trainer, Chart Your Course, bridge watch, and more.
- **Diagnostic games** — per-section assessments that score competency strands, produce a radar report, and recommend what to learn next.
- **Badges & HQ Mail** — badges are awarded on completion and delivered as messages in the "HQ Mail" inbox.
- **Avatar system** — customizable cadet avatars.
- **Bilingual (EN/FR)** — a full i18n layer with a language switcher on every page.
- **Accessibility** — semantic landmarks, native `<dialog>`, reduced-motion support, and screen-reader announcements.

## Tech

Static HTML5 + CSS + vanilla JavaScript. No build step and no runtime dependencies — just open `index.html`. Interactive graphics use the native Canvas API; UI uses the shared HTML5 shell (`cadet-html5.css` / `cadet-html5.js`) and a lightweight i18n engine (`i18n.js` + `translations_en.js` / `translations_fr.js`).

## Project layout

| Path | Purpose |
| --- | --- |
| `index.html` | Main hub — Training Campus, badge inventory, avatars, HQ Mail |
| `*_training.html` / `.js` / `.css` | Individual training modules |
| `*_scenario.html` | Scenario-based lessons |
| `year2_map.html`, `sea_year2_map.html`, `air_year2_map.html` | Quest maps |
| `*_diagnostic.html` / `.js` | Diagnostic games |
| `cadet-html5.css` / `cadet-html5.js` | Shared HTML5 UI shell & utilities |
| `cadet_hq.js` / `cadet_hq.css` | HQ Mail + badge/report pipeline |
| `i18n.js`, `translations_en.js`, `translations_fr.js` | Bilingual engine & dictionaries |
| `assets/` | Images, badges, maps, avatars |

## Running locally

Because the site loads local assets, serve it over HTTP rather than opening the file directly:

```bash
# from the project folder
python3 -m http.server 8000
# then visit http://localhost:8000/
```

## Hosting

This repository is a static site published with **GitHub Pages** (deploy from branch `main` / root).

**🔗 Live site: https://nanoskyggen.github.io/cadet-quest-map/**

## License

© Royal Canadian Cadet training demo project. All rights reserved.
