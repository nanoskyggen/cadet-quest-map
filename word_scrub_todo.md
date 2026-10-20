# Todo — Content Scrub (Teenager-Safe Language)

## Part A — Scan & Review
- [x] Scan all module files for candidate problem words
- [x] Review each hit in context to confirm genuine concern

## Part B — Replacements
- [x] "breast" → "chest" — dress_uniform_training.js (8 occurrences)
- [x] "groin" → "lower body" — survival_training.js (2 occurrences)
- [x] "cocked hat" → "triangle of error" — sea_year2_map.js (1 occurrence)
- [x] "erect" → "upright" (posture) — drill_training.js (5), air_training.js (2), cadet_basics_training.js (2)
- [x] "erect" → "put up" (construction) — air_year2_map.js (1), sea_year2_map.js (1)
- [x] "fetal position" → "curled-up position" — survival_training.js (4 occurrences)

## Part C — Verification
- [x] Final scan: all target words cleared (0 standalone occurrences)
- [x] JS syntax validation passed for all 7 modified files
- [x] Keyword-matching tasks verified consistent (prompt/keywords/proof)
- [x] Edge cases reviewed: "breastbone" (sternum/CPR), "weed" (seaweed/anchoring), "rack" (equipment), "BANG!" (sound effect), "joint" (anatomy/instrument) — all legitimate, no change

## Part D — Deploy & Report
- [x] Redeploy site (name: ae5f40fc)
- [x] Compile final change list for user
