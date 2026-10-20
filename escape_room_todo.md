# Todo — Cadet Escape Room (Capstone Challenge)

## Part A — Planning & Architecture
- [x] Study quest map architecture (script.js lessons, scenarioPages, badges, achievements)
- [x] Study existing standalone modules (cyber_range) as template
- [x] Determine placement: new specialist station (id 17) — capstone challenge
- [x] Design escape room concept: multi-room bunker, puzzles from all cadet knowledge

## Part B — Generate Assets
- [x] Create escape room badge image (badge_19_escape_room.png)
- [x] Create escape room entrance/hero background image

## Part C — Build escape_room.css
- [x] Full themed CSS: bunker aesthetic, room transitions, puzzle UI, timer, animations
- [x] Music control UI styling
- [x] Victory screen styling

## Part D — Build escape_room.html
- [x] Intro/briefing screen with music toggle
- [x] Room 1: Drill & Uniform (rank ordering / drill command puzzle)
- [x] Room 2: Radio Communications (phonetic alphabet decode)
- [x] Room 3: Navigation (bearing/map symbol puzzle)
- [x] Room 4: First Aid (DRABC sequence puzzle)
- [x] Room 5: Survival & Knots (STOP protocol + knot matching)
- [x] Final lock: multi-code master lock combining clues
- [x] Victory/escape screen with badge award + back to quest map

## Part E — Build escape_room.js
- [x] Game state engine (rooms, inventory, timer, progress)
- [x] Puzzle logic for all 5 rooms + final lock
- [x] Animations & visual feedback (door opens, lock turns, room transitions)
- [x] Web Audio API ambient background music generator (no external files)
- [x] Sound effects (click, unlock, success, fail)
- [x] Badge award → localStorage → quest map integration
- [x] Hint system
- [x] Reset/replay

## Part F — Wire into Quest Map
- [x] Add lesson 17 to lessons[] in script.js (specialist station)
- [x] Add entry to scenarioPages (17 → escape_room.html)
- [x] Update heroTotal / totalCount display (16→17 quests)
- [x] Add badge image reference
- [x] Verify syntax (node --check script.js)

## Part G — Test & Deploy
- [x] Test escape room in browser — all 5 rooms solved, final vault unlocked, victory screen shown
- [x] Test music toggle (on/off both directions work)
- [x] Test hint system (hint counter decrements, hint text appears)
- [x] Test wrong answer feedback (toast shows error, stays in room)
- [x] Test timer countdown (20:00 → counting down correctly)
- [x] Test door transitions between rooms (animated transitions work)
- [x] Test badge award to localStorage (id 17 added to cadetMapDemoCompleted)
- [x] Test best time storage (cadetEscapeRoomBest saved)
- [x] Test quest map integration — escape room pin at center (50%,50%) on specialist map
- [x] Test quest map — pin shows "done" state after completion
- [x] Test quest map — Specialist Stations tab count shows "5"
- [x] Test quest map — total quests shows "17"
- [x] Test quest map — lesson detail panel shows full escape room info
- [x] Test quest map — "Play Interactive Scenario" button visible and linked
- [x] Deploy to production (name: ae5f40fc)
