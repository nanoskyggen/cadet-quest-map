# Parade Drill Training — Task Tracker

## Planning & Research — all [x]

## Build
- [x] Create parade_drill_training.css  (1295 lines)
- [x] Create parade_drill_training.html  (452 lines)
- [x] Create parade_drill_training.js  (2629 lines, syntax OK)

## Integration
- [x] Add `5: 'parade_drill_training.html'` to scenarioPages in script.js

## Testing
- [x] Verify JS syntax (node --check)
- [x] Browser test the game
  - [x] Command page renders with full ceremonial theme
  - [x] Parade Ground game: animated SVG squad of 15 cadets + colour bearer
  - [x] Start Parade → command calling (cautionary → executive) works
  - [x] Timing meter and timeout on no response
  - [x] Correct response awards XP + timing bonus
  - [x] Wrong response shows correct answer + resets streak
  - [x] General Salute 4-step sequence mode (Present→Let Fly→Catch→Shoulder)
  - [x] Sequence completion awards +20 XP bonus + increments Compliments
  - [x] Reset works
  - [x] Missions section: 10 missions with sequential unlock
  - [x] Learn section: 24 articles with categories and XP
  - [x] Map integration: clicking Parade Drill lesson → Play Interactive Scenario → navigates to parade_drill_training.html
- [x] Deploy and verify on production
