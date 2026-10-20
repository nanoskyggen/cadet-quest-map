# Community Service Project Training Page (Lesson 112)

## Research & Design
- [x] Research PO X02 Community Service curriculum from Red Star/Green Star guides
- [x] Design unique game concept ("Project Command Center" — project planning simulator)
- [x] Confirm lesson 112 details from year2_map.js

## Build Files
- [x] Create community_training.css (community/green theme with civic blue accents)
- [x] Create community_training.html (8 sections: command, training, missions, analysis, sitrep, ranks, learn, project)
- [x] Write community_training.js Part 1 (IIFE, SK keys, RANKS, TOOLS)
- [x] Write community_training.js Part 2 (MISSIONS, COMMUNITY_BADGES)
- [x] Write community_training.js Part 3 (LEARN_ARTICLES, PROJECT_COMMAND game data)
- [x] Write community_training.js Part 4 (state mgmt, sceneSVG, helpers)
- [x] Write community_training.js Part 5 (render functions, switchSection)
- [x] Write community_training.js Part 6 (Project Command Center game engine, init)
- [x] Verify community_training.js passes `node --check`

## Map Integration
- [x] Add trainingLink to lesson 112 in year2_map.js
- [x] Verify lesson 112 pin shows "Launch Community Service" button

## i18n (French Translation)
- [x] Extract translatable strings from community_training.js/html
- [x] Generate French translations (639 entries via gen_community_fr.py)
- [x] Insert into translations_fr.js (node --check passes)
- [x] Verify translations load in browser (EN + FR both confirmed working)

## Testing & Deployment
- [x] Test locally (port 8093) — page loads, game works, FR toggle works, EN toggle works, map link works
- [x] Deploy to production (name: ae5f40fc)
- [x] Verify on production URL (EN + FR both confirmed working, map link confirmed)
