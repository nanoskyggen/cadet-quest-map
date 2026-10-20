/* ============================================================
   SURVIVAL TRAINING — survival_training.js
   Green Star / Phase 1 / Level 1 survival curriculum simulator
   with interactive "Bush Survivor" Canadian wilderness game + audio
   ============================================================ */

(function () {
  "use strict";

  // ==========================================================
  // STORAGE KEYS
  // ==========================================================
  const SK = {
    progress: "survivalTrainingProgress",
    wrongAttempts: "survivalTrainingWrongAttempts",
    streak: "survivalTrainingStreak",
    bestStreak: "survivalTrainingBestStreak",
    readArticles: "survivalTrainingReadArticles",
    gameBest: "survivalTrainingGameBest"
  };

  // ==========================================================
  // RANK LADDER — Bushcraft cadet progression
  // ==========================================================
  const RANKS = [
    { id: 0, name: "Survival Cadet Recruit", icon: "🎖️", xp: 0, callsign: "BUSH-1" },
    { id: 1, name: "Bush Cadet", icon: "🌿", xp: 300, callsign: "BUSH-2" },
    { id: 2, name: "Field Survivor", icon: "🏕️", xp: 700, callsign: "BUSH-3" },
    { id: 3, name: "Shelter Builder", icon: "🪵", xp: 1200, callsign: "BUSH-4" },
    { id: 4, name: "Survival Specialist", icon: "🔥", xp: 1800, callsign: "BUSH-5" },
    { id: 5, name: "Master Survivor", icon: "🏅", xp: 2500, callsign: "BUSH-6" }
  ];

  // ==========================================================
  // SURVIVAL REFERENCE DATA
  // ==========================================================
  const STOP_STEPS = [
    { letter: "S", word: "Sit", desc: "Sit down and calm yourself. Recognise you are lost." },
    { letter: "T", word: "Think", desc: "Think about how you got here and what you have with you." },
    { letter: "O", word: "Observe", desc: "Observe your surroundings — landmarks, hazards, resources." },
    { letter: "P", word: "Plan", desc: "Plan your next actions. Stay put if unsure — rescue will come." }
  ];

  const FIVE_ELEMENTS = [
    { name: "Attitude", icon: "🧠", priority: 1, desc: "A positive, will-to-live attitude is the foundation of survival. Panic kills." },
    { name: "Shelter", icon: "🏕️", priority: 2, desc: "Protect yourself from the elements. In Canada, cold is the greatest threat." },
    { name: "Water", icon: "💧", priority: 3, desc: "Find and purify water. You can survive only 3 days without it." },
    { name: "Fire", icon: "🔥", priority: 4, desc: "Fire provides warmth, light, signalling, water purification, and morale." },
    { name: "Food", icon: "🍎", priority: 5, desc: "Food is last — you can survive 3 weeks without it. Focus on the others first." }
  ];

  const SEVEN_ENEMIES = [
    { name: "Pain", icon: "😣", desc: "Injuries and pain drain your will and energy. Treat injuries first." },
    { name: "Cold", icon: "🥶", desc: "The greatest threat in Canada. Hypothermia can kill in hours." },
    { name: "Thirst", icon: "💧", desc: "Dehydration impairs judgement within a day. Find water early." },
    { name: "Hunger", icon: "🍽️", desc: "Weakens the body over days. Forage only after shelter and water." },
    { name: "Fatigue", icon: "😴", desc: "Exhaustion causes fatal mistakes. Rest to conserve energy." },
    { name: "Boredom", icon: "😐", desc: "Idle time erodes focus. Keep busy with camp tasks." },
    { name: "Loneliness", icon: "🙁", desc: "Isolation destroys morale. Talk to yourself, stay positive, stay busy." }
  ];

  const RULE_OF_THREES = [
    { time: "3 minutes", without: "Air", icon: "😮‍💨", note: "Without oxygen, brain damage begins. Ensure airway in any emergency." },
    { time: "3 hours", without: "Shelter", icon: "🏕️", note: "In extreme cold or heat, exposure can kill within hours." },
    { time: "3 days", without: "Water", icon: "💧", note: "Dehydration becomes fatal after roughly three days." },
    { time: "3 weeks", without: "Food", icon: "🍎", note: "A healthy person can survive up to three weeks without food." }
  ];

  const SHELTERS = [
    { type: "Natural", name: "Tree Hollow", desc: "A large hollow tree or space under roots offers instant shelter from wind and rain." },
    { type: "Natural", name: "Cave / Overhang", desc: "Rock overhangs and small caves provide excellent shelter but check for wildlife." },
    { type: "Natural", name: "Root Shelter", desc: "The exposed roots of a fallen tree create a natural windbreak and framework." },
    { type: "Improvised", name: "Bough Shelter", desc: "Lean evergreen boughs against a low branch or log to shed rain and block wind." },
    { type: "Improvised", name: "Fallen Trunk Lean-to", desc: "Prop sticks and boughs against a fallen log. Open side faces away from wind." },
    { type: "Improvised", name: "Lean-to", desc: "A ridge pole between two trees, covered with boughs, bark, or a tarp." },
    { type: "Improvised", name: "Snow Cave", desc: "Dig into a deep snowdrift. Body heat warms the small interior. Essential in winter." },
    { type: "Improvised", name: "Tepee", desc: "Three long poles tied at top, covered with boughs or canvas. Stable and roomy." }
  ];

  const FIRE_TRIANGLE = [
    { element: "Air", icon: "💨", desc: "Oxygen feeds the fire. Build with space for airflow — don't smother it." },
    { element: "Fuel", icon: "🪵", desc: "Tinder, kindling, and fuel wood in increasing sizes to sustain the flame." },
    { element: "Heat", icon: "🔥", desc: "An ignition source — matches, lighter, spark, or friction — starts the chain." }
  ];

  const FUEL_TYPES = [
    { stage: "Tinder", desc: "Dry, fluffy, easily ignited — birch bark, dry grass, pine needles, shredded bark." },
    { stage: "Kindling", desc: "Small twigs and sticks, pencil-thin to finger-thick, to build the flame." },
    { stage: "Wood Fuel", desc: "Branches 2–5 cm thick that sustain the fire once kindling is burning well." },
    { stage: "Bulk Firewood", desc: "Larger logs that burn long and provide steady heat for the night." }
  ];

  const FIRE_TYPES = [
    { name: "Tepee", desc: "Tinder in centre, kindling leaned in a cone. Burns fast and hot — good for starting." },
    { name: "Cross-bed (Log Cabin)", desc: "Sticks layered in a square around tinder. Steady and long-burning." },
    { name: "Crisscross", desc: "Sticks crisscrossed over tinder. Good airflow, quick to build." }
  ];

  const GROUND_SIGNALS = [
    { symbol: "V", meaning: "Require Assistance", desc: "General call for help. Visible from the air." },
    { symbol: "X", meaning: "Require Medical Assistance", desc: "Someone is injured and needs medical evacuation." },
    { symbol: "N", meaning: "No / Negative", desc: "Used to answer questions from aircraft (e.g. 'Do you need medical?')." },
    { symbol: "Y", meaning: "Yes / Affirmative", desc: "Used to answer questions affirmatively from the air." },
    { symbol: "→", meaning: "Proceeding in Direction", desc: "An arrow pointing the direction you are moving." }
  ];

  const CLOUD_FAMILIES = [
    { family: "High Clouds", base: "Above 6000 m", types: "Cirrus, Cirrocumulus, Cirrostratus", weather: "Fair weather; cirrus can mean a change is coming." },
    { family: "Middle Clouds", base: "2000–6000 m", types: "Altocumulus, Altostratus", weather: "Altostratus often precedes rain or snow." },
    { family: "Low Clouds", base: "Below 2000 m", types: "Stratus, Stratocumulus, Nimbostratus", weather: "Nimbostratus brings steady rain or snow." },
    { family: "Clouds with Vertical Development", base: "Surface to high", types: "Cumulus, Cumulonimbus", weather: "Cumulus is fair weather; cumulonimbus means thunderstorms." }
  ];

  // ==========================================================
  // CANADIAN LOCATIONS (for the game)
  // ==========================================================
  const LOCATIONS = [
    {
      id: "arctic",
      name: "Arctic Tundra",
      icon: "❄️",
      tempBase: -25,
      tempNightDrop: 8,
      weather: ["clear", "snow", "wind", "blizzard"],
      weatherWeights: [0.2, 0.35, 0.3, 0.15],
      terrain: "tundra",
      waterSource: "snow",
      forageRichness: 0.3,
      warmthDrain: 2.2,
      desc: "Frozen plains of the far north. Brutally cold with little cover.",
      color: { sky1: "#1a2538", sky2: "#0a1018", ground: "#d0dde8", accent: "#b8d0e8" }
    },
    {
      id: "boreal",
      name: "Boreal Forest",
      icon: "🌲",
      tempBase: 5,
      tempNightDrop: 6,
      weather: ["clear", "cloudy", "rain", "fog"],
      weatherWeights: [0.25, 0.3, 0.3, 0.15],
      terrain: "forest",
      waterSource: "stream",
      forageRichness: 0.8,
      warmthDrain: 1.0,
      desc: "Dense spruce and pine forest. Rich in resources and shelter materials.",
      color: { sky1: "#2a3318", sky2: "#0e1208", ground: "#1a2410", accent: "#3d5a28" }
    },
    {
      id: "rockies",
      name: "Rocky Mountains",
      icon: "🏔️",
      tempBase: -2,
      tempNightDrop: 9,
      weather: ["clear", "cloudy", "snow", "wind"],
      weatherWeights: [0.25, 0.3, 0.25, 0.2],
      terrain: "mountain",
      waterSource: "stream",
      forageRichness: 0.5,
      warmthDrain: 1.5,
      desc: "Alpine peaks and valleys. Cold nights, rocky terrain, avalanche risk.",
      color: { sky1: "#2a2e3a", sky2: "#101218", ground: "#4a4e58", accent: "#6a7280" }
    },
    {
      id: "atlantic",
      name: "Atlantic Coast",
      icon: "🌊",
      tempBase: 8,
      tempNightDrop: 5,
      weather: ["clear", "fog", "rain", "wind"],
      weatherWeights: [0.2, 0.3, 0.3, 0.2],
      terrain: "coast",
      waterSource: "rain",
      forageRichness: 0.6,
      warmthDrain: 1.3,
      desc: "Rocky shoreline and cold North Atlantic waters. Fog and damp chill.",
      color: { sky1: "#2a3a48", sky2: "#0e1820", ground: "#3a4a58", accent: "#4a8098" }
    },
    {
      id: "greatlakes",
      name: "Great Lakes",
      icon: "🚣",
      tempBase: 10,
      tempNightDrop: 6,
      weather: ["clear", "cloudy", "rain", "fog"],
      weatherWeights: [0.25, 0.3, 0.3, 0.15],
      terrain: "lakeshore",
      waterSource: "lake",
      forageRichness: 0.7,
      warmthDrain: 1.1,
      desc: "Freshwater shoreline with mixed forest. Abundant water and fish.",
      color: { sky1: "#2a3848", sky2: "#101820", ground: "#2a3a28", accent: "#3a7090" }
    },
    {
      id: "prairie",
      name: "Prairie Grassland",
      icon: "🌾",
      tempBase: 12,
      tempNightDrop: 10,
      weather: ["clear", "wind", "rain", "cloudy"],
      weatherWeights: [0.3, 0.25, 0.2, 0.25],
      terrain: "prairie",
      waterSource: "none",
      forageRichness: 0.4,
      warmthDrain: 1.2,
      desc: "Open plains with little cover. Big temperature swings, scarce water.",
      color: { sky1: "#383828", sky2: "#181810", ground: "#4a4830", accent: "#6a6840" }
    }
  ];

  const SURVIVAL_ACTIONS = [
    { id: "shelter", icon: "🏕️", name: "Build Shelter", cost: 15, desc: "Reduces warmth loss from weather." },
    { id: "fire", icon: "🔥", name: "Build Fire", cost: 12, desc: "Warmth, boil water, cook, signal, morale." },
    { id: "water", icon: "💧", name: "Find Water", cost: 8, desc: "Gather water (needs purifying)." },
    { id: "purify", icon: "🫖", name: "Purify Water", cost: 5, desc: "Boil water (needs fire) for safe drinking." },
    { id: "forage", icon: "🍎", name: "Forage Food", cost: 12, desc: "Find food to restore energy." },
    { id: "rest", icon: "😴", name: "Rest", cost: -10, desc: "Recover energy (best with shelter+fire)." },
    { id: "signal", icon: "🆘", name: "Signal Rescue", cost: 10, desc: "Raise rescue chance. V/X signal or smoke." },
    { id: "navigate", icon: "🧭", name: "Navigate Out", cost: 25, desc: "Walk toward civilization. Risky, heavy cost." }
  ];

  // ==========================================================
  // TRAINING MODULES / MISSIONS
  // ==========================================================
  const MISSIONS = [
    {
      id: "stop_when_lost",
      order: 1,
      tag: "MODULE 01",
      icon: "🧭",
      title: "S.T.O.P. — When You Are Lost",
      desc: "The immediate actions when you realise you are lost: Sit, Think, Observe, Plan.",
      xp: 100,
      brief: "You have become separated from your group on a wilderness exercise and realise you are lost. Your instructor will test whether you can apply the S.T.O.P. procedure — the immediate survival actions every cadet must know. Open the field manual and work through each task.",
      scene: "forest",
      chapters: [
        { title: "S — Sit", desc: "Stop moving and sit down to calm yourself." },
        { title: "T — Think", desc: "Recall how you got here and what you have." },
        { title: "O — Observe", desc: "Scan your surroundings for hazards and resources." },
        { title: "P — Plan", desc: "Decide your next action — usually to stay put." }
      ],
      tasks: [
        {
          type: "select", tool: "manual",
          title: "First Action When Lost",
          prompt: "You realise you are lost in the bush. What is the very first thing you should do according to S.T.O.P.?",
          options: ["Run in the direction you think is correct", "Sit down and calm yourself", "Shout for help as loud as you can", "Climb a tree to look around"],
          expected: "Sit down and calm yourself",
          proof: "S.T.O.P. confirmed — S = Sit. Stop, sit down, and recognise you are lost. Panic is your biggest enemy."
        },
        {
          type: "select", tool: "manual",
          title: "The 'T' in S.T.O.P.",
          prompt: "After sitting and calming yourself, what does the 'T' in S.T.O.P. tell you to do?",
          options: ["Travel toward high ground", "Think about your situation and what you have with you", "Track animal footprints for food", "Tie a flag to a tree"],
          expected: "Think about your situation and what you have with you",
          proof: "S.T.O.P. confirmed — T = Think. Consider how you got lost and take stock of your equipment."
        },
        {
          type: "type", tool: "manual",
          title: "The 'O' — One Word",
          prompt: "Type the single word that the letter 'O' stands for in S.T.O.P.",
          expected: "Observe",
          proof: "S.T.O.P. confirmed — O = Observe. Look at your surroundings: landmarks, hazards, water, shelter materials."
        },
        {
          type: "select", tool: "manual",
          title: "The 'P' — Best Plan",
          prompt: "You have completed Sit, Think, and Observe. What is usually the best plan (P) when lost and unsure of your location?",
          options: ["Keep walking to cover more ground", "Stay put and wait for rescue — rescuers will find you faster", "Follow the first animal track you find", "Build a raft and float downstream"],
          expected: "Stay put and wait for rescue — rescuers will find you faster",
          proof: "S.T.O.P. confirmed — P = Plan. When unsure, stay put. A stationary person is easier to find than a moving one."
        },
        {
          type: "note", tool: "log",
          title: "Field Note: Why Stay Put",
          prompt: "Switch to the FIELD LOG. Write a short entry explaining why staying put is usually the safest plan when lost. Your note must include the keywords 'search' and 'easier'.",
          keywords: ["search", "easier"],
          proof: "Field note logged — staying put makes you easier to find; search teams cover ground systematically."
        }
      ]
    },
    {
      id: "five_elements_enemies",
      order: 2,
      tag: "MODULE 02",
      icon: "🧠",
      title: "Five Elements & Seven Enemies",
      desc: "The five elements of survival in priority order and the seven enemies you must overcome.",
      xp: 100,
      brief: "Your instructor introduces the five elements of survival — Attitude, Shelter, Water, Fire, Food — and the seven enemies: Pain, Cold, Thirst, Hunger, Fatigue, Boredom, and Loneliness. Open the field manual and demonstrate your understanding of survival priorities.",
      scene: "forest",
      chapters: [
        { title: "Five Elements", desc: "The five priorities of survival in order." },
        { title: "Seven Enemies", desc: "The threats that wear down a survivor." },
        { title: "Rule of Threes", desc: "How long you can survive without key needs." },
        { title: "Attitude First", desc: "Why a positive mindset is element number one." }
      ],
      tasks: [
        {
          type: "select", tool: "manual",
          title: "First Element of Survival",
          prompt: "The five elements of survival are listed in priority order. Which element comes FIRST?",
          options: ["Shelter", "Water", "Attitude", "Fire"],
          expected: "Attitude",
          proof: "Five Elements confirmed — Attitude is #1. A positive, will-to-live attitude is the foundation of all survival."
        },
        {
          type: "select", tool: "manual",
          title: "Second Priority",
          prompt: "After attitude, what is the second element of survival in priority order?",
          options: ["Food", "Shelter", "Fire", "Water"],
          expected: "Shelter",
          proof: "Five Elements confirmed — Shelter is #2. In Canada, protection from cold is critical."
        },
        {
          type: "type", tool: "manual",
          title: "Rule of Threes — Water",
          prompt: "According to the Rule of Threes, you can survive approximately 3 days without what? Type the word.",
          expected: "Water",
          proof: "Rule of Threes confirmed — 3 days without water. Dehydration becomes fatal quickly."
        },
        {
          type: "select", tool: "manual",
          title: "Greatest Enemy in Canada",
          prompt: "Of the seven enemies of survival, which is the greatest threat in the Canadian wilderness?",
          options: ["Boredom", "Cold", "Hunger", "Loneliness"],
          expected: "Cold",
          proof: "Seven Enemies confirmed — Cold is the greatest threat. Hypothermia can kill in hours in Canadian conditions."
        },
        {
          type: "note", tool: "log",
          title: "Field Note: Rule of Threes",
          prompt: "Switch to the FIELD LOG. Write the complete Rule of Threes: how long you can survive without air, shelter, water, and food. Include the keywords 'air', 'shelter', 'water', and 'food'.",
          keywords: ["air", "shelter", "water", "food"],
          proof: "Field note logged — Rule of Threes: 3 min without air, 3 hrs without shelter, 3 days without water, 3 weeks without food."
        }
      ]
    },
    {
      id: "shelters",
      order: 3,
      tag: "MODULE 03",
      icon: "🏕️",
      title: "Emergency Shelters",
      desc: "Natural and improvised shelters — from tree hollows and lean-tos to snow caves and tepees.",
      xp: 100,
      brief: "Your instructor teaches you to build emergency shelters using natural materials and improvised structures. You will identify natural shelters, choose the right improvised shelter for the conditions, and understand the principles of shelter site selection. Open the field manual and work through each task.",
      scene: "forest",
      chapters: [
        { title: "Natural Shelters", desc: "Using what nature provides — tree hollows, caves, root shelters." },
        { title: "Improvised Shelters", desc: "Bough, lean-to, fallen trunk, snow cave, tepee." },
        { title: "Site Selection", desc: "Choosing a safe, effective shelter location." },
        { title: "Build Principles", desc: "Small, insulated, protected from wind." }
      ],
      tasks: [
        {
          type: "select", tool: "manual",
          title: "Best Shelter in Deep Snow",
          prompt: "You are stranded in deep winter snow. Which improvised shelter is specifically designed for deep snow conditions?",
          options: ["Lean-to", "Tepee", "Snow Cave", "Bough Shelter"],
          expected: "Snow Cave",
          proof: "Shelter confirmed — a Snow Cave, dug into a deep drift, uses body heat to warm the small interior. Essential in winter."
        },
        {
          type: "select", tool: "manual",
          title: "Shelter Size Principle",
          prompt: "When building an emergency shelter, what size should it be?",
          options: ["As large as possible for comfort", "Small — just big enough to fit your body", "Open on all sides for airflow", "Big enough for a fire inside"],
          expected: "Small — just big enough to fit your body",
          proof: "Shelter principle confirmed — a small shelter is easier to warm with body heat and quicker to build."
        },
        {
          type: "select", tool: "manual",
          title: "Shelter Opening Direction",
          prompt: "When building a lean-to or bough shelter, which direction should the open side face?",
          options: ["Toward the prevailing wind", "Away from the wind", "Toward the sun always", "Toward water"],
          expected: "Away from the wind",
          proof: "Shelter confirmed — the open side faces away from the wind to keep cold air and weather out."
        },
        {
          type: "type", tool: "manual",
          title: "Natural Shelter Example",
          prompt: "Name one natural shelter that uses the exposed roots of a fallen tree. Type the two-word name.",
          expected: "Root Shelter",
          proof: "Natural shelter confirmed — a Root Shelter uses the exposed roots of a fallen tree as a natural windbreak and framework."
        },
        {
          type: "note", tool: "log",
          title: "Field Note: Site Selection",
          prompt: "Switch to the FIELD LOG. Write a short entry on choosing a safe shelter site. Include the keywords 'wind', 'water', and 'dead' (referring to dead trees/branches overhead — avoid them).",
          keywords: ["wind", "water", "dead"],
          proof: "Field note logged — site selection: protected from wind, near but not in water, away from dead overhead branches (widowmakers)."
        }
      ]
    },
    {
      id: "fire_building",
      order: 4,
      tag: "MODULE 04",
      icon: "🔥",
      title: "Fire Building",
      desc: "The fire triangle, fuel stages from tinder to bulk firewood, and fire lay types.",
      xp: 100,
      brief: "Your instructor teaches the art of fire building — the fire triangle (air, fuel, heat), the four fuel stages (tinder, kindling, wood fuel, bulk firewood), and fire lay types (tepee, cross-bed, crisscross). You will demonstrate correct fire-building sequence and safety. Open the field manual and work through each task.",
      scene: "forest",
      chapters: [
        { title: "Fire Triangle", desc: "Air, Fuel, Heat — all three are needed." },
        { title: "Fuel Stages", desc: "Tinder → Kindling → Wood Fuel → Bulk Firewood." },
        { title: "Fire Lays", desc: "Tepee, Cross-bed (Log Cabin), Crisscross." },
        { title: "Fire Safety", desc: "Clear the site, control the flame, extinguish fully." }
      ],
      tasks: [
        {
          type: "select", tool: "manual",
          title: "The Fire Triangle",
          prompt: "A fire needs three things to burn. Which of these is NOT one of the fire triangle elements?",
          options: ["Air (oxygen)", "Fuel", "Heat", "Water"],
          expected: "Water",
          proof: "Fire triangle confirmed — Air, Fuel, and Heat. Water extinguishes fire; it is not part of the triangle."
        },
        {
          type: "select", tool: "manual",
          title: "First Fuel Stage",
          prompt: "When building a fire, what is the first fuel stage you must gather and ignite?",
          options: ["Bulk firewood", "Kindling", "Tinder", "Wood fuel"],
          expected: "Tinder",
          proof: "Fuel stage confirmed — Tinder comes first. Dry, fluffy material like birch bark or dry grass ignites easily."
        },
        {
          type: "type", tool: "manual",
          title: "Tinder Examples",
          prompt: "Type the name of one common natural tinder material — the bark of a birch tree that burns even when damp. (Two words)",
          expected: "Birch Bark",
          proof: "Tinder confirmed — Birch Bark is excellent tinder. Its oils make it burn even when slightly damp."
        },
        {
          type: "select", tool: "manual",
          title: "Fire Lay for Quick Start",
          prompt: "Which fire lay type arranges kindling in a cone shape over the tinder and burns fast and hot — ideal for getting a fire started quickly?",
          options: ["Cross-bed (Log Cabin)", "Tepee", "Crisscross", "Star fire"],
          expected: "Tepee",
          proof: "Fire lay confirmed — the Tepee fire burns fast and hot, making it excellent for initial ignition."
        },
        {
          type: "note", tool: "log",
          title: "Field Note: Fire Sequence",
          prompt: "Switch to the FIELD LOG. Write the correct sequence of fuel stages when building a fire. Include the keywords 'tinder', 'kindling', and 'firewood'.",
          keywords: ["tinder", "kindling", "firewood"],
          proof: "Field note logged — fire sequence: tinder first, then kindling, then wood fuel, then bulk firewood to sustain the fire."
        }
      ]
    },
    {
      id: "aircrew_survival",
      order: 5,
      tag: "MODULE 05",
      icon: "✈️",
      title: "Aircrew Survival",
      desc: "Survival priorities after an aircraft emergency: shelter, fire, water, navigation, and signalling.",
      xp: 100,
      brief: "You are an air cadet learning aircrew survival — the skills needed after an aircraft emergency landing in remote terrain. The aircrew survival syllabus covers improvised shelters, fire-building, water purification, navigation, ground-to-air signalling, and wildlife awareness. Your instructor will test your knowledge of post-crash survival priorities. Open the field manual and work through each task.",
      scene: "mountain",
      chapters: [
        { title: "Post-Crash Priorities", desc: "What to do immediately after an emergency landing." },
        { title: "The Wreckage", desc: "Using the aircraft for shelter and salvaging equipment." },
        { title: "Navigation", desc: "Determining direction when you have no map." },
        { title: "Signalling Aircraft", desc: "Ground-to-air visual signals for rescue." }
      ],
      tasks: [
        {
          type: "select", tool: "manual",
          title: "First Priority After Landing",
          prompt: "After an emergency landing in remote terrain, what is your first survival priority?",
          options: ["Walk to find a road immediately", "Treat injuries and ensure safety from further danger", "Build a signal fire right away", "Eat your emergency rations"],
          expected: "Treat injuries and ensure safety from further danger",
          proof: "Aircrew survival confirmed — treat injuries first. Pain is the first enemy of survival and must be managed."
        },
        {
          type: "select", tool: "manual",
          title: "Using the Wreckage",
          prompt: "The aircraft wreckage can serve as an immediate survival resource. What is the best use of an intact fuselage after a crash?",
          options: ["Leave it immediately — it is dangerous", "Use it as a ready-made shelter and salvage useful equipment", "Set it on fire for warmth", "Dismantle it for scrap metal"],
          expected: "Use it as a ready-made shelter and salvage useful equipment",
          proof: "Aircrew survival confirmed — the fuselage provides instant shelter. Salvage radio, flares, first aid kit, and rations."
        },
        {
          type: "select", tool: "manual",
          title: "Signalling with Smoke",
          prompt: "What type of smoke signal is most visible to search aircraft during the day?",
          options: ["Thin white smoke from dry wood", "Thick black smoke from adding green leaves or oil", "No smoke — just a mirror", "Blue smoke from plastic"],
          expected: "Thick black smoke from adding green leaves or oil",
          proof: "Signalling confirmed — thick smoke columns are highly visible. Green vegetation or oil on a hot fire creates dense smoke."
        },
        {
          type: "type", tool: "manual",
          title: "Ground Signal for Help",
          prompt: "Type the single letter you would lay out on the ground as a ground-to-air visual signal meaning 'Require Assistance'.",
          expected: "V",
          proof: "Ground signal confirmed — V = Require Assistance. Build it large and visible from the air using contrasting materials."
        },
        {
          type: "note", tool: "log",
          title: "Field Note: Aircrew Kit",
          prompt: "Switch to the FIELD LOG. Write a short entry listing items you should salvage from a downed aircraft for survival. Include the keywords 'first aid', 'radio', and 'rations'.",
          keywords: ["first aid", "radio", "rations"],
          proof: "Field note logged — salvage priorities: first aid kit, radio/emergency transmitter, rations, flares, water, tools."
        }
      ]
    },
    {
      id: "water_survival",
      order: 6,
      tag: "MODULE 06",
      icon: "🌊",
      title: "On-the-Water Survival",
      desc: "Cold water survival — HELP position, huddle position, PFD importance, and self-rescue.",
      xp: 100,
      brief: "You are learning on-the-water survival — critical skills for cadets operating near or on Canadian waters. Cold water is a deadly threat: hypothermia can set in within minutes. Your instructor teaches the HELP (Heat Escape Lessening Posture) position, the group huddle position, and the importance of personal flotation devices. Open the field manual and work through each task.",
      scene: "lakeshore",
      chapters: [
        { title: "Cold Water Threat", desc: "Why cold water kills — 1-10-1 rule." },
        { title: "HELP Position", desc: "The curled-up position to conserve body heat alone." },
        { title: "Huddle Position", desc: "Group huddle to share warmth and stay together." },
        { title: "PFD / Lifejacket", desc: "Why a personal flotation device saves lives." }
      ],
      tasks: [
        {
          type: "select", tool: "manual",
          title: "Swimming to Keep Warm",
          prompt: "You have fallen into cold water. Should you swim hard to keep warm?",
          options: ["Yes — exercise generates heat", "No — swimming drains energy and flushes warm water away from your body, speeding heat loss", "Yes — but only for short bursts", "Only if you are a strong swimmer"],
          expected: "No — swimming drains energy and flushes warm water away from your body, speeding heat loss",
          proof: "Cold water survival confirmed — DO NOT swim to keep warm. It accelerates heat loss and exhaustion. Hold still and conserve heat."
        },
        {
          type: "select", tool: "manual",
          title: "The HELP Position",
          prompt: "HELP stands for Heat Escape Lessening Posture. How do you hold your body in the HELP position when alone in cold water?",
          options: ["Standing upright, treading water", "Curled-up position — arms crossed across chest, knees drawn up to chest", "Lying flat on your back, arms spread", "On your stomach, swimming slowly"],
          expected: "Curled-up position — arms crossed across chest, knees drawn up to chest",
          proof: "HELP confirmed — curled-up position with arms crossed and knees drawn up protects the lower body, chest, and head from heat loss."
        },
        {
          type: "select", tool: "manual",
          title: "Group Huddle Purpose",
          prompt: "When several people are in cold water together, what is the purpose of the huddle position?",
          options: ["To swim together to shore faster", "To share body warmth and keep the group together for rescue", "To create a large wave for visibility", "To tie yourselves together with rope"],
          expected: "To share body warmth and keep the group together for rescue",
          proof: "Huddle confirmed — group huddle conserves heat collectively, supports weaker swimmers, and keeps everyone visible for rescue."
        },
        {
          type: "select", tool: "manual",
          title: "Why Wear a PFD",
          prompt: "What is the most important reason to wear a personal flotation device (PFD / lifejacket) on the water?",
          options: ["It is a uniform requirement", "It keeps your head above water even if you lose consciousness from cold", "It makes you swim faster", "It stores emergency gear"],
          expected: "It keeps your head above water even if you lose consciousness from cold",
          proof: "PFD confirmed — a lifejacket keeps your airway clear even when cold shock or hypothermia incapacitates you. Always wear one."
        },
        {
          type: "note", tool: "log",
          title: "Field Note: 1-10-1 Rule",
          prompt: "Switch to the FIELD LOG. Write a short entry explaining the cold water 1-10-1 rule (1 minute to control breathing, 10 minutes of meaningful movement, 1 hour before hypothermia incapacitation). Include the keywords 'breathing', 'minutes', and 'hypothermia'.",
          keywords: ["breathing", "minutes", "hypothermia"],
          proof: "Field note logged — 1-10-1: 1 min to control gasp reflex, 10 min of useful movement, 1 hr before hypothermia disables you."
        }
      ]
    },
    {
      id: "signals_weather",
      order: 7,
      tag: "MODULE 07",
      icon: "🆘",
      title: "Signals & Weather Prediction",
      desc: "Ground-to-air visual signals and reading cloud formations to predict weather changes.",
      xp: 100,
      brief: "Your final module covers two vital survival skills: ground-to-air visual signals for rescue and reading cloud formations to predict weather. You will learn the five standard ground signal symbols and the four cloud families. Open the field manual and demonstrate your knowledge — then put it all together in the Bush Survivor game.",
      scene: "forest",
      chapters: [
        { title: "Ground Signals", desc: "V, X, N, Y, and arrow — the five visual codes." },
        { title: "Cloud Families", desc: "High, middle, low, and vertical development clouds." },
        { title: "Weather Reading", desc: "Predicting rain, snow, and storms from the sky." },
        { title: "Signal Visibility", desc: "Making your signal large and contrasting." }
      ],
      tasks: [
        {
          type: "select", tool: "manual",
          title: "Medical Assistance Signal",
          prompt: "Which ground-to-air visual signal indicates 'Require Medical Assistance'?",
          options: ["V", "X", "N", "Y"],
          expected: "X",
          proof: "Ground signal confirmed — X = Require Medical Assistance. Signals that someone is injured and needs evacuation."
        },
        {
          type: "select", tool: "manual",
          title: "Negative Signal",
          prompt: "Which ground signal means 'No' or 'Negative' — used to answer questions from a search aircraft?",
          options: ["V", "X", "N", "Y"],
          expected: "N",
          proof: "Ground signal confirmed — N = No / Negative. Used to respond to questions from the air."
        },
        {
          type: "select", tool: "manual",
          title: "Thunderstorm Cloud",
          prompt: "Which cloud type signals an approaching thunderstorm and potentially severe weather?",
          options: ["Cirrus", "Cumulus (small)", "Cumulonimbus", "Stratus"],
          expected: "Cumulonimbus",
          proof: "Weather confirmed — Cumulonimbus (towering vertical development) indicates thunderstorms, heavy rain, lightning, and wind."
        },
        {
          type: "select", tool: "manual",
          title: "Nimbostratus Means",
          prompt: "When you see low, dark nimbostratus clouds covering the sky, what weather should you expect?",
          options: ["Clear fair weather", "Steady rain or snow", "Severe thunderstorms", "Strong winds only"],
          expected: "Steady rain or snow",
          proof: "Weather confirmed — nimbostratus brings steady, continuous precipitation. Prepare your shelter for rain or snow."
        },
        {
          type: "note", tool: "log",
          title: "Field Note: Signal Construction",
          prompt: "Switch to the FIELD LOG. Write a short entry on how to make ground-to-air signals visible to search aircraft. Include the keywords 'large', 'contrast', and 'bright' (or 'colour').",
          keywords: ["large", "contrast"],
          altKeywords: ["large", "bright"],
          proof: "Field note logged — make signals large (3+ metres), high contrast against the ground, and use bright/unnatural colours if available."
        }
      ]
    }
  ];

  // ==========================================================
  // LEARN ARTICLES
  // ==========================================================
  const LEARN_ARTICLES = [
    { id: "l_stop", cat: "When Lost", icon: "🧭", title: "The S.T.O.P. Procedure", desc: "Sit, Think, Observe, Plan — the immediate actions when lost.", xp: 15,
      body: [
        { h: "What is S.T.O.P.?", p: "S.T.O.P. is the immediate survival procedure every cadet must memorise for the moment they realise they are lost. It prevents panic, focuses the mind, and sets up good decision-making. The four steps take only minutes but can save your life." },
        { h: "The Four Steps", p: "Each letter represents one action. They are done in order, calmly, without rushing. The most common mistake lost people make is running — S.T.O.P. exists to stop that fatal error." }
      ],
      table: { headers: ["Letter", "Word", "Action"], rows: STOP_STEPS.map(s => [s.letter, s.word, s.desc]) }
    },
    { id: "l_five_elements", cat: "Survival Theory", icon: "🧠", title: "The Five Elements of Survival", desc: "Attitude, Shelter, Water, Fire, Food — in priority order.", xp: 15,
      body: [
        { h: "Survival Priorities", p: "The five elements of survival are ranked in priority order. This ranking tells you what to focus on first. In the Canadian wilderness, this order is critical — attempting to find food before building shelter in winter is a deadly mistake." },
        { h: "Why Attitude is First", p: "Your mindset determines everything else. Panic leads to poor decisions, rapid energy expenditure, and exposure. A calm, positive, determined attitude — the will to live — is the single most important survival tool you possess." }
      ],
      table: { headers: ["Priority", "Element", "Description"], rows: FIVE_ELEMENTS.map(e => ["#" + e.priority, e.icon + " " + e.name, e.desc]) }
    },
    { id: "l_seven_enemies", cat: "Survival Theory", icon: "⚔️", title: "The Seven Enemies of Survival", desc: "Pain, Cold, Thirst, Hunger, Fatigue, Boredom, Loneliness.", xp: 15,
      body: [
        { h: "What Works Against You", p: "The seven enemies of survival are the physical and psychological forces that wear down a survivor over time. Recognising them helps you counter each one. In Canada, cold is the deadliest, but loneliness and boredom have killed survivors who had everything else they needed." },
        { h: "Countering Each Enemy", p: "Treat pain with first aid. Counter cold with shelter and fire. Find and purify water against thirst. Forage carefully for hunger. Rest to fight fatigue. Stay busy against boredom. Maintain a positive attitude and routine against loneliness." }
      ],
      table: { headers: ["Enemy", "Description"], rows: SEVEN_ENEMIES.map(e => [e.icon + " " + e.name, e.desc]) }
    },
    { id: "l_rule_threes", cat: "Survival Theory", icon: "⏱️", title: "The Rule of Threes", desc: "How long you can survive without air, shelter, water, and food.", xp: 15,
      body: [
        { h: "The Survival Timeline", p: "The Rule of Threes is a simple memory aid for how long the human body can survive without its basic needs. It tells you the urgency of each priority and helps you sequence your survival actions correctly." },
        { h: "The Rule", p: "You can survive approximately 3 minutes without air, 3 hours without shelter in extreme conditions, 3 days without water, and 3 weeks without food. This is why shelter comes before water, and water comes before food — the timeline dictates the priority." }
      ],
      table: { headers: ["Time", "Without", "Notes"], rows: RULE_OF_THREES.map(r => [r.time, r.icon + " " + r.without, r.note]) }
    },
    { id: "l_shelters", cat: "Shelter Building", icon: "🏕️", title: "Emergency Shelters Guide", desc: "Natural and improvised shelters for all Canadian conditions.", xp: 15,
      body: [
        { h: "Natural vs Improvised", p: "Shelters fall into two categories: natural (using existing features like tree hollows and caves) and improvised (structures you build from materials around you). Natural shelters are faster but may be occupied by wildlife — always check. Improvised shelters take more energy but you control their design." },
        { h: "Key Principles", p: "Keep your shelter small — just big enough for your body. Body heat warms a small space quickly. Insulate the ground — you lose most heat to the cold earth beneath you. Face the opening away from the wind. Avoid sites under dead branches (widowmakers), in dry creek beds, or too close to water's edge." }
      ],
      table: { headers: ["Type", "Shelter", "Description"], rows: SHELTERS.map(s => [s.type, s.name, s.desc]) }
    },
    { id: "l_fire", cat: "Fire Building", icon: "🔥", title: "Fire Building Complete Guide", desc: "Fire triangle, fuel stages, and fire lay types.", xp: 15,
      body: [
        { h: "The Fire Triangle", p: "Every fire requires three elements: air (oxygen), fuel, and heat. Remove any one and the fire goes out. This principle guides both building and extinguishing fires. When building, ensure airflow — don't smother your tinder. When extinguishing, remove heat (water) and air (cover with dirt)." },
        { h: "Fuel Stages", p: "Fire is built in stages of increasingly larger fuel. Start with tinder — dry, fluffy, easily ignited material like birch bark, dry grass, or pine needles. Add kindling — small twigs from pencil-thin to finger-thick. Then wood fuel — branches 2–5 cm thick. Finally bulk firewood — larger logs for sustained heat through the night. Always gather three times more fuel than you think you need." },
        { h: "Fire Lay Types", p: "The arrangement of your fuel is the fire lay. The tepee lay arranges kindling in a cone over tinder — it burns fast and hot, ideal for starting. The cross-bed or log cabin lay stacks sticks in a square around the tinder — it is steady and long-burning. The crisscross lay crisscrosses sticks over tinder for good airflow and quick assembly." }
      ],
      table: { headers: ["Stage", "Description"], rows: FUEL_TYPES.map(f => [f.stage, f.desc]) }
    },
    { id: "l_aircrew", cat: "Aircrew Survival", icon: "✈️", title: "Aircrew Survival Priorities", desc: "Survival after an aircraft emergency in remote terrain.", xp: 15,
      body: [
        { h: "After the Landing", p: "Aircrew survival begins the moment an emergency landing is complete. The first priority is to treat any injuries — pain is the first enemy of survival. Then ensure safety from immediate dangers such as fuel, fire, or unstable terrain. Only after injuries and safety are addressed should you begin shelter and signalling." },
        { h: "The Wreckage as a Resource", p: "The aircraft itself is a survival kit. An intact fuselage provides ready-made shelter. Salvage the emergency radio or ELT (Emergency Locator Transmitter) and activate it. Collect the first aid kit, emergency rations, water, flares, signal mirrors, matches or lighter, knives and tools, and any clothing or blankets. Everything aboard can serve a survival purpose." },
        { h: "Air Cadet Survival Courses", p: "The air cadet program offers dedicated survival training. The Intro to Survival course runs approximately two weeks and covers basic field survival skills. The Survival Instructor course runs approximately four weeks and trains cadets to teach survival skills to others. Both courses emphasise hands-on field training in real wilderness conditions." },
        { h: "Navigation Without a Map", p: "If you have no map or compass, determine direction using the sun (rises east, sets west, is due south at midday in the northern hemisphere) or the North Star (Polaris) at night. A watch can serve as a compass: point the hour hand at the sun; south is halfway between the hour hand and 12 o'clock." }
      ]
    },
    { id: "l_water_survival", cat: "On-the-Water Survival", icon: "🌊", title: "Cold Water Survival", desc: "HELP position, huddle position, and PFD importance.", xp: 15,
      body: [
        { h: "Cold Water is Deadly", p: "Canadian waters are cold. Even in summer, many lakes and coastal waters are below 15°C. Cold water causes cold shock (gasping, panic), cold incapacitation (loss of muscle control), and hypothermia. The 1-10-1 rule describes the timeline: 1 minute to control your breathing after the cold shock, 10 minutes of meaningful movement before your limbs lose function, and 1 hour before hypothermia causes unconsciousness." },
        { h: "The HELP Position", p: "HELP stands for Heat Escape Lessening Posture. When alone in cold water, assume a curled-up position: cross your arms tightly across your chest, draw your knees up to your chest, and keep your head and neck out of the water. This protects the high-heat-loss areas — the lower body, chest, sides of the chest, and neck — and can extend your survival time significantly." },
        { h: "The Huddle Position", p: "When multiple people are in the water together, form a huddle. Press your bodies together in a circle, arms around each other, with the smallest or weakest people in the centre. The huddle shares body warmth, keeps the group together so no one drifts away, and makes a larger target for rescue. It also provides mutual psychological support." },
        { h: "Do Not Swim", p: "Swimming to keep warm is a fatal mistake. Movement pumps warm water away from your body and replaces it with cold water, accelerating heat loss. It also burns precious energy and can lead to exhaustion and drowning. Unless shore is very close, stay still, assume HELP or huddle, and wait for rescue. Always wear a PFD so your head stays above water even if you lose consciousness." }
      ]
    },
    { id: "l_ground_signals", cat: "Signalling", icon: "🆘", title: "Ground-to-Air Visual Signals", desc: "The five standard ground symbols for communicating with aircraft.", xp: 15,
      body: [
        { h: "Communicating with Rescuers", p: "When search aircraft are looking for you, ground-to-air visual signals let you communicate even without a radio. The five standard symbols are internationally recognised. Build them large — at least 3 metres across — using materials that contrast with the ground surface. Bright colours, disturbed earth, or shadows from raised materials all improve visibility." },
        { h: "Making Signals Visible", p: "Use the brightest, most unnatural materials you can find: a space blanket, coloured fabric, overturned turf, or lines of rocks. On snow, stomp the symbol deeply so shadows define it. On open ground, make the lines wide, not just long. A signal that cannot be seen from the air is useless — contrast and size are everything." }
      ],
      table: { headers: ["Symbol", "Meaning", "Description"], rows: GROUND_SIGNALS.map(s => [s.symbol, s.meaning, s.desc]) }
    },
    { id: "l_clouds", cat: "Weather Prediction", icon: "☁️", title: "Cloud Formations & Weather", desc: "The four cloud families and what they predict.", xp: 15,
      body: [
        { h: "Reading the Sky", p: "Clouds are the most visible weather indicator. Cadets learn four cloud families based on altitude: high clouds (above 6000 m), middle clouds (2000–6000 m), low clouds (below 2000 m), and clouds with vertical development. Each family signals different weather. Learning to read clouds helps you anticipate rain, snow, storms, and fair conditions hours in advance." },
        { h: "Key Cloud Types", p: "Cirrus (high, wispy) generally means fair weather but can indicate an approaching change. Cumulus (puffy, fair-weather) is harmless when small. Cumulonimbus (towering, dark) means thunderstorms — seek shelter immediately. Nimbostratus (low, dark, featureless) brings steady rain or snow. Altostratus often precedes precipitation. Lenticular clouds over mountains mean strong winds." }
      ],
      table: { headers: ["Family", "Altitude", "Types", "Weather"], rows: CLOUD_FAMILIES.map(c => [c.family, c.base, c.types, c.weather]) }
    }
  ];

  // ==========================================================
  // TOOLS
  // ==========================================================
  const TOOLS = [
    { id: "manual", icon: "📖", label: "Field Manual" },
    { id: "log", icon: "📝", label: "Field Log" },
    { id: "compass", icon: "🧭", label: "Compass" },
    { id: "kit", icon: "🎒", label: "Survival Kit" }
  ];

  // ==========================================================
  // BADGES
  // ==========================================================
  const SURVIVAL_BADGES = [
    { id: "b_stop", icon: "🧭", name: "Not Lost Anymore", xp: 100, mission: "stop_when_lost" },
    { id: "b_elements", icon: "🧠", name: "Survival Theorist", xp: 100, mission: "five_elements_enemies" },
    { id: "b_shelter", icon: "🏕️", name: "Shelter Builder", xp: 100, mission: "shelters" },
    { id: "b_fire", icon: "🔥", name: "Fire Maker", xp: 100, mission: "fire_building" },
    { id: "b_aircrew", icon: "✈️", name: "Aircrew Survivor", xp: 100, mission: "aircrew_survival" },
    { id: "b_water", icon: "🌊", name: "Cold Water Ready", xp: 100, mission: "water_survival" },
    { id: "b_signals", icon: "🆘", name: "Signal Master", xp: 100, mission: "signals_weather" }
  ];

  // ==========================================================
  // STATE
  // ==========================================================
  let state = loadState();
  let activeMissionId = null;
  let activeTaskIndex = 0;
  let activeTool = "";
  let toggleState = {};
  let sliderValue = {};

  function defaultState() {
    return {
      xp: 0,
      completedMissions: [],
      missionProgress: {},
      badges: [],
      sitreps: [],
      wrongAttempts: 0,
      totalAttempts: 0,
      streak: 0,
      bestStreak: 0,
      readArticles: []
    };
  }
  function loadState() {
    try {
      const raw = localStorage.getItem(SK.progress);
      if (raw) return Object.assign(defaultState(), JSON.parse(raw));
    } catch (e) {}
    return defaultState();
  }
  function saveState() {
    try { localStorage.setItem(SK.progress, JSON.stringify(state)); } catch (e) {}
  }

  // ==========================================================
  // SCENE SVG GENERATORS
  // ==========================================================
  function sceneSVG(scene) {
    const W = 600, H = 180;
    const base = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">`;
    const end = `</svg>`;
    const grad = (id, c1, c2) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>`;

    if (scene === "forest") {
      return base + grad("g", "#1a2410", "#0a0d07") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <g opacity="0.1" stroke="#7cb342" stroke-width="0.5">
          <line x1="0" y1="60" x2="600" y2="60"/><line x1="0" y1="120" x2="600" y2="120"/>
        </g>
        <rect x="0" y="130" width="600" height="50" fill="#1a2410"/>
        <polygon points="80,130 100,70 120,130" fill="#2a3318"/><rect x="96" y="125" width="8" height="8" fill="#3d2818"/>
        <polygon points="180,130 205,55 230,130" fill="#283218"/><rect x="198" y="120" width="10" height="12" fill="#3d2818"/>
        <polygon points="300,130 320,80 340,130" fill="#2a3318"/><rect x="316" y="125" width="8" height="8" fill="#3d2818"/>
        <polygon points="420,130 445,50 470,130" fill="#283218"/><rect x="438" y="118" width="10" height="14" fill="#3d2818"/>
        <polygon points="520,130 540,75 560,130" fill="#2a3318"/><rect x="536" y="125" width="8" height="8" fill="#3d2818"/>
        <text x="300" y="22" fill="#a5e653" font-size="10" font-family="monospace" text-anchor="middle">SURVIVAL STATION — FIELD TRAINING AREA</text>
      ` + end;
    }
    if (scene === "mountain") {
      return base + grad("g", "#2a2e3a", "#101218") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <polygon points="0,130 120,50 200,130" fill="#3a3e48"/><polygon points="100,130 220,30 340,130" fill="#4a4e58"/>
        <polygon points="280,130 400,60 480,130" fill="#3a3e48"/><polygon points="420,130 540,40 600,130" fill="#4a4e58"/>
        <polygon points="220,30 240,45 230,55" fill="#d0dde8"/><polygon points="540,40 555,52 548,58" fill="#d0dde8"/>
        <rect x="0" y="125" width="600" height="55" fill="#1a1e24"/>
        <text x="300" y="22" fill="#ffc757" font-size="10" font-family="monospace" text-anchor="middle">REMOTE MOUNTAIN TERRAIN — AIRCREW SURVIVAL</text>
      ` + end;
    }
    if (scene === "lakeshore") {
      return base + grad("g", "#2a3848", "#101820") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <rect x="0" y="100" width="600" height="80" fill="#2a5070" opacity="0.5"/>
        <rect x="0" y="95" width="600" height="6" fill="#3a7090"/>
        <ellipse cx="150" cy="115" rx="40" ry="3" fill="#5fa0c0" opacity="0.4"/>
        <ellipse cx="400" cy="130" rx="50" ry="4" fill="#5fa0c0" opacity="0.3"/>
        <polygon points="0,95 80,60 140,95" fill="#2a3a28"/>
        <polygon points="480,95 540,65 600,95" fill="#2a3a28"/>
        <rect x="0" y="90" width="600" height="8" fill="#3a5030"/>
        <text x="300" y="22" fill="#87d4f0" font-size="10" font-family="monospace" text-anchor="middle">COLD WATER SURVIVAL — SHORELINE TRAINING</text>
      ` + end;
    }
    return base + `<rect width="${W}" height="${H}" fill="#161b10"/>` + end;
  }

  // ==========================================================
  // RANK LOGIC
  // ==========================================================
  function currentRank() {
    let r = RANKS[0];
    for (const rank of RANKS) { if (state.xp >= rank.xp) r = rank; }
    return r;
  }
  function nextRank() {
    const cur = currentRank();
    const idx = RANKS.indexOf(cur);
    return RANKS[idx + 1] || null;
  }
  function rankProgressPct() {
    const cur = currentRank();
    const nxt = nextRank();
    if (!nxt) return 100;
    const span = nxt.xp - cur.xp;
    const into = state.xp - cur.xp;
    return Math.max(0, Math.min(100, Math.round((into / span) * 100)));
  }

  // ==========================================================
  // BADGES
  // ==========================================================
  function refreshBadges() {
    state.badges = [];
    SURVIVAL_BADGES.forEach(b => { if (state.completedMissions.includes(b.mission)) state.badges.push(b.id); });
  }

  // ==========================================================
  // MISSION PROGRESS HELPERS
  // ==========================================================
  function missionProgress(missionId) {
    return state.missionProgress[missionId] || { tasksDone: [], wrongAttempts: 0 };
  }
  function missionDone(m) { return state.completedMissions.includes(m.id); }
  function missionUnlocked(m) {
    if (m.order === 1) return true;
    const prev = MISSIONS.find(x => x.order === m.order - 1);
    return prev ? missionDone(prev) : true;
  }
  function missionXP(m) {
    const mp = missionProgress(m.id);
    const penalty = mp.wrongAttempts * 10;
    return Math.max(40, m.xp - penalty);
  }
  function tasksDoneCount(m) { return missionProgress(m.id).tasksDone.length; }

  // ==========================================================
  // RENDER: SIDEBAR + TOP STATS
  // ==========================================================
  function renderSidebar() {
    const rank = currentRank();
    const nxt = nextRank();
    document.getElementById("pilotRank").textContent = rank.name;
    document.getElementById("pilotCallsign").textContent = "DESIG: " + rank.callsign;
    const pct = rankProgressPct();
    document.getElementById("xpFill").style.width = pct + "%";
    const span = nxt ? (nxt.xp - rank.xp) : 100;
    const into = nxt ? (state.xp - rank.xp) : span;
    document.getElementById("xpText").textContent = `${into} / ${span} XP`;
  }

  function renderTopStats() {
    const rank = currentRank();
    refreshBadges();
    document.getElementById("topRank").textContent = rank.name.replace("Survival Cadet ", "").replace("Cadet ", "");
    document.getElementById("topXP").textContent = state.xp;
    document.getElementById("topBadges").textContent = state.badges.length;
  }

  // ==========================================================
  // RENDER: COMMAND (DASHBOARD)
  // ==========================================================
  function renderCommand() {
    refreshBadges();
    document.getElementById("cmdMissionsDone").textContent = state.completedMissions.length;
    document.getElementById("cmdMissionsTotal").textContent = "of " + MISSIONS.length;
    document.getElementById("cmdXP").textContent = state.xp;
    const nxt = nextRank();
    document.getElementById("cmdXPNext").textContent = nxt ? `+${nxt.xp - state.xp} to ${nxt.name}` : "MAX RANK";
    document.getElementById("cmdSitreps").textContent = state.sitreps.length;
    document.getElementById("cmdBadges").textContent = state.badges.length;
    document.getElementById("cmdBadgeTotal").textContent = "of " + SURVIVAL_BADGES.length;

    const cl = document.getElementById("chapterList");
    cl.innerHTML = MISSIONS.map((m, i) => {
      const done = missionDone(m);
      const unlocked = missionUnlocked(m);
      const prog = tasksDoneCount(m);
      const total = m.tasks.length;
      const isActive = activeMissionId === m.id && !done;
      let cls = "chapter";
      let status = "";
      if (done) { cls += " done"; status = `<div class="ch-status done">COMPLETE — ${prog}/${total}</div>`; }
      else if (isActive) { cls += " active"; status = `<div class="ch-status ready">IN PROGRESS — ${prog}/${total}</div>`; }
      else if (unlocked) { cls += ""; status = `<div class="ch-status ready">READY — ${prog}/${total}</div>`; }
      else { cls += " locked"; status = `<div class="ch-status locked">LOCKED — complete Module ${m.order - 1}</div>`; }
      const num = done ? "✓" : `<span class="n">${m.order}</span>`;
      return `<div class="${cls}" data-mission="${m.id}">
        <div class="ch-num">${num}</div>
        <div class="ch-body">
          <div class="ch-title">${m.title}</div>
          <div class="ch-desc">${m.desc}</div>
          ${status}
        </div>
      </div>`;
    }).join("");
    cl.querySelectorAll(".chapter:not(.locked)").forEach(el => {
      el.addEventListener("click", () => { const mid = el.dataset.mission; openMission(mid); });
    });

    // Update threat meter based on progress
    const threatPct = Math.min(100, 20 + (state.completedMissions.length / MISSIONS.length) * 70);
    document.getElementById("threatFill").style.width = threatPct + "%";
  }

  // ==========================================================
  // RENDER: TRAINING GRID
  // ==========================================================
  function renderTraining() {
    const grid = document.getElementById("trainingGrid");
    grid.innerHTML = MISSIONS.map(m => {
      const done = missionDone(m);
      const unlocked = missionUnlocked(m);
      const prog = tasksDoneCount(m);
      const total = m.tasks.length;
      const pct = Math.round((prog / total) * 100);
      let cls = "mission-card";
      if (done) cls += " done";
      if (!unlocked) cls += " locked";
      return `<div class="${cls}" data-mission="${m.id}">
        <div class="mc-ico">${m.icon}</div>
        <div class="mc-tag">${m.tag}</div>
        <div class="mc-title">${m.title}</div>
        <div class="mc-desc">${m.desc}</div>
        <div class="mc-meta"><span>⚡ ${missionXP(m)} XP</span><span>📋 ${prog}/${total}</span></div>
        <div class="mc-prog"><div class="mc-prog-fill" style="width:${pct}%"></div></div>
      </div>`;
    }).join("");
    grid.querySelectorAll(".mission-card:not(.locked)").forEach(el => {
      el.addEventListener("click", () => openMission(el.dataset.mission));
    });
  }

  // ==========================================================
  // RENDER: MISSION SELECTOR
  // ==========================================================
  function renderMissionSelector() {
    const sel = document.getElementById("missionSelector");
    sel.innerHTML = MISSIONS.map(m => {
      const done = missionDone(m);
      const unlocked = missionUnlocked(m);
      const prog = tasksDoneCount(m);
      const total = m.tasks.length;
      const pct = Math.round((prog / total) * 100);
      let cls = "mission-card";
      if (done) cls += " done";
      if (activeMissionId === m.id) cls += " active";
      if (!unlocked) cls += " locked";
      return `<div class="${cls}" data-mission="${m.id}">
        <div class="mc-ico">${m.icon}</div>
        <div class="mc-tag">${m.tag}</div>
        <div class="mc-title">${m.title}</div>
        <div class="mc-desc">${m.desc}</div>
        <div class="mc-meta"><span>⚡ ${missionXP(m)} XP</span><span>📋 ${prog}/${total}</span></div>
        <div class="mc-prog"><div class="mc-prog-fill" style="width:${pct}%"></div></div>
      </div>`;
    }).join("");
    sel.querySelectorAll(".mission-card:not(.locked)").forEach(el => {
      el.addEventListener("click", () => openMission(el.dataset.mission));
    });
  }

  // ==========================================================
  // OPEN A MISSION
  // ==========================================================
  function openMission(missionId) {
    const m = MISSIONS.find(x => x.id === missionId);
    if (!m) return;
    if (!missionUnlocked(m)) { toast("warn", "🔒 Module " + m.order + " is locked. Complete the previous module first."); return; }
    activeMissionId = missionId;
    activeTool = "";
    toggleState = {};
    sliderValue = {};
    const mp = missionProgress(missionId);
    activeTaskIndex = mp.tasksDone.length;
    if (activeTaskIndex >= m.tasks.length) activeTaskIndex = m.tasks.length - 1;
    switchSection("missions");
    document.getElementById("missionSelector").style.display = "none";
    document.getElementById("missionConsole").style.display = "block";
    document.getElementById("missionHeaderTitle").textContent = m.title;
    document.getElementById("missionHeaderSub").textContent = m.tag + " — " + m.desc;
    renderMissionConsole();
    renderMissionSelector();
    renderCommand();
  }

  function renderMissionConsole() {
    const m = MISSIONS.find(x => x.id === activeMissionId);
    if (!m) return;
    const mp = missionProgress(m.id);
    const consoleEl = document.getElementById("missionConsole");
    if (missionDone(m)) { consoleEl.innerHTML = completedMissionHTML(m); bindCompleteEvents(m); return; }
    const task = m.tasks[activeTaskIndex];
    const total = m.tasks.length;
    toggleState[activeTaskIndex] = toggleState[activeTaskIndex] || false;
    consoleEl.innerHTML = `
      <div class="task-console">
        <div class="task-header">
          <div class="th-left">
            <div class="th-ico">${m.icon}</div>
            <div>
              <div class="th-title">${m.title}</div>
              <div class="th-sub">${m.tag} • ${mp.tasksDone.length}/${total} tasks complete</div>
            </div>
          </div>
          <div class="th-right">
            <span class="task-stage-pill">TASK ${activeTaskIndex + 1} / ${total}</span>
            <button class="btn btn-ghost" id="exitMissionBtn" type="button">← Back to list</button>
          </div>
        </div>
        <div class="task-body">
          <div class="scene-visual">${sceneSVG(m.scene)}<div class="scene-overlay">${m.brief.split(".")[0]}.</div></div>
          <div class="task-brief">${m.brief}</div>
          <div class="tool-dock" id="toolDock">
            ${TOOLS.map(t => `<button class="tool-btn ${activeTool === t.id ? "active" : ""}" data-tool="${t.id}" type="button"><span class="tb-ico">${t.icon}</span>${t.label}</button>`).join("")}
          </div>
          <div class="tool-req" id="toolReq">
            <span class="tr-ico">⚠️</span>
            <span class="tr-text">This task requires the <strong>${toolLabel(task.tool)}</strong> to be open. Current tool: <span class="tr-now" id="trNow">${activeTool ? toolLabel(activeTool) : "NONE"}</span></span>
          </div>
          <div class="task-step-label">
            <span class="step-num">STEP ${activeTaskIndex + 1}</span>
            <span class="step-title">${task.title}</span>
          </div>
          <div class="task-instructions">${task.prompt}</div>
          <div class="task-control" id="taskControl">${renderTaskControl(task, activeTaskIndex)}</div>
          <div class="task-actions">
            <button class="btn btn-primary" id="submitTaskBtn" type="button">✓ Submit &amp; Confirm</button>
            <button class="btn btn-ghost" id="hintBtn" type="button">💡 Hint</button>
            <button class="btn btn-ghost" id="speakTaskBtn" type="button">🔊 Hear It</button>
          </div>
          <div class="terminal" id="terminal"><div class="ln ln-dim">// awaiting input…</div></div>
          <div class="task-feedback" id="taskFeedback"></div>
          <hr class="divider"/>
          <h3 style="margin-bottom:10px;">Mission Checklist</h3>
          <div class="checklist" id="checklist">
            ${m.tasks.map((t, i) => {
              const done = mp.tasksDone.includes(i);
              return `<div class="check-item ${done ? "done" : ""}"><div class="ci-box"></div><div>${t.title}</div></div>`;
            }).join("")}
          </div>
        </div>
      </div>`;
    bindConsoleEvents(task);
    // Auto-open the required tool if the current tool doesn't match
    if (activeTool !== task.tool) {
      activeTool = task.tool;
      const btn = document.querySelector('#toolDock .tool-btn[data-tool="' + task.tool + '"]');
      if (btn) btn.classList.add('active');
      document.querySelectorAll('#toolDock .tool-btn').forEach(b => { if (b.dataset.tool !== task.tool) b.classList.remove('active'); });
    }

    updateToolReq(task);
  }

  function bindCompleteEvents(m) {
    const fileBtn = document.getElementById("fileSitrepQuickBtn");
    if (fileBtn) fileBtn.addEventListener("click", () => { switchSection("sitrep"); });
    const backBtn = document.getElementById("backToListBtn");
    if (backBtn) backBtn.addEventListener("click", exitMission);
  }

  function renderTaskControl(task, idx) {
    if (task.type === "toggle") {
      const on = toggleState[idx];
      return `<div class="toggle-row ${on ? "on" : ""}" id="toggleRow" data-idx="${idx}">
        <div class="toggle-switch"></div>
        <div class="toggle-label">${task.title}</div>
        <div class="toggle-icon">${on ? "✓" : "○"}</div>
      </div>`;
    }
    if (task.type === "select") {
      const esc = s => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");
      return `<select class="task-select" id="taskSelect" data-idx="${idx}">
        <option value="">— Select your answer —</option>
        ${task.options.map(o => `<option value="${esc(o)}">${esc(o)}</option>`).join("")}
      </select>`;
    }
    if (task.type === "type") {
      return `<input class="task-input" id="taskInput" type="text" placeholder="Type your answer…" autocomplete="off" />`;
    }
    if (task.type === "note") {
      return `<textarea class="task-note" id="taskNote" placeholder="Write your field log entry here…"></textarea>`;
    }
    if (task.type === "slider") {
      sliderValue[idx] = sliderValue[idx] !== undefined ? sliderValue[idx] : 0;
      return `<input class="task-slider" id="taskSlider" type="range" min="0" max="30" value="${sliderValue[idx]}" data-idx="${idx}" />
        <div class="slider-readout" id="sliderReadout">${sliderValue[idx]}</div>`;
    }
    return "";
  }

  function bindConsoleEvents(task) {
    document.querySelectorAll("#toolDock .tool-btn").forEach(b => {
      b.addEventListener("click", () => {
        activeTool = b.dataset.tool;
        document.querySelectorAll("#toolDock .tool-btn").forEach(x => x.classList.remove("active"));
        b.classList.add("active");
        updateToolReq(task);
        termPush("info", `▸ Opened ${toolLabel(activeTool)}`);
        survSound("click");
      });
    });
    const toggleRow = document.getElementById("toggleRow");
    if (toggleRow) {
      toggleRow.addEventListener("click", () => {
        const idx = parseInt(toggleRow.dataset.idx, 10);
        toggleState[idx] = !toggleState[idx];
        const on = toggleState[idx];
        toggleRow.classList.toggle("on", on);
        toggleRow.querySelector(".toggle-icon").textContent = on ? "✓" : "○";
        survSound("beep");
      });
    }
    const slider = document.getElementById("taskSlider");
    if (slider) {
      slider.addEventListener("input", () => {
        const idx = parseInt(slider.dataset.idx, 10);
        sliderValue[idx] = parseInt(slider.value, 10);
        document.getElementById("sliderReadout").textContent = sliderValue[idx];
      });
    }
    const submitBtn = document.getElementById("submitTaskBtn");
    if (submitBtn) submitBtn.addEventListener("click", () => submitTask(task));
    const hintBtn = document.getElementById("hintBtn");
    if (hintBtn) hintBtn.addEventListener("click", () => showHint(task));
    const speakBtn = document.getElementById("speakTaskBtn");
    if (speakBtn) speakBtn.addEventListener("click", () => speakTaskPrompt(task));
    const exitBtn = document.getElementById("exitMissionBtn");
    if (exitBtn) exitBtn.addEventListener("click", exitMission);
  }

  function updateToolReq(task) {
    const req = document.getElementById("toolReq");
    const now = document.getElementById("trNow");
    if (!req) return;
    const satisfied = activeTool === task.tool;
    req.classList.toggle("satisfied", satisfied);
    const ico = req.querySelector(".tr-ico");
    if (satisfied) { ico.textContent = "✅"; now.textContent = toolLabel(activeTool); }
    else { ico.textContent = "⚠️"; now.textContent = activeTool ? toolLabel(activeTool) : "NONE"; }
  }

  function toolLabel(id) { const t = TOOLS.find(x => x.id === id); return t ? t.label : id; }

  function termPush(kind, text) {
    const term = document.getElementById("terminal");
    if (!term) return;
    const ln = document.createElement("div");
    ln.className = "ln ln-" + kind;
    ln.textContent = text;
    term.appendChild(ln);
    term.scrollTop = term.scrollHeight;
  }

  // ==========================================================
  // VALIDATE + SUBMIT TASK
  // ==========================================================
  function submitTask(task) {
    const m = MISSIONS.find(x => x.id === activeMissionId);
    const fb = document.getElementById("taskFeedback");
    fb.className = "task-feedback";
    if (activeTool !== task.tool) {
      state.totalAttempts++; state.wrongAttempts++; state.streak = 0; saveState();
      fb.classList.add("show", "err");
      fb.innerHTML = `❌ Wrong tool! This task requires <strong>${toolLabel(task.tool)}</strong>. You currently have <strong>${activeTool ? toolLabel(activeTool) : "no tool"}</strong> open. Open the correct tool from the dock above.`;
      termPush("err", `✗ FAILED — wrong tool. Required: ${toolLabel(task.tool)}`);
      survSound("error");
      updateAnalysis(); return;
    }
    const valid = validateTask(task);
    state.totalAttempts++;
    if (!valid.ok) {
      state.wrongAttempts++; state.streak = 0;
      const mp = missionProgress(m.id);
      mp.wrongAttempts = (mp.wrongAttempts || 0) + 1;
      state.missionProgress[m.id] = mp;
      saveState();
      fb.classList.add("show", "err");
      fb.innerHTML = `❌ ${valid.msg}`;
      termPush("err", `✗ ${valid.msg}`);
      survSound("error");
      updateAnalysis(); return;
    }
    state.streak++;
    if (state.streak > state.bestStreak) state.bestStreak = state.streak;
    const mp = missionProgress(m.id);
    if (!mp.tasksDone.includes(activeTaskIndex)) mp.tasksDone.push(activeTaskIndex);
    state.missionProgress[m.id] = mp;
    saveState();
    fb.classList.add("show", "ok");
    fb.innerHTML = `✅ Correct! ${task.proof}`;
    termPush("ok", `✓ ${task.proof}`);
    survSound("success");
    activeTaskIndex++;
    if (activeTaskIndex >= m.tasks.length) { completeMission(m); }
    else { setTimeout(() => renderMissionConsole(), 1100); }
    updateAnalysis();
  }

  function validateTask(task) {
    if (task.type === "toggle") {
      const on = toggleState[activeTaskIndex];
      return on === task.expected ? { ok: true } : { ok: false, msg: "Toggle the indicator to the ON position first." };
    }
    if (task.type === "select") {
      const sel = document.getElementById("taskSelect");
      const val = sel ? sel.value : "";
      if (!val) return { ok: false, msg: "Select an answer from the dropdown." };
      return val === task.expected ? { ok: true } : { ok: false, msg: `Incorrect. The correct answer is not "${val}". Review the options and try again.` };
    }
    if (task.type === "type") {
      const inp = document.getElementById("taskInput");
      const val = (inp ? inp.value : "").trim().toLowerCase();
      if (!val) return { ok: false, msg: "Type your answer in the input field." };
      const exp = String(task.expected).toLowerCase();
      if (val === exp) return { ok: true };
      // Handle multi-word answers with flexible matching
      const expWords = exp.split(/\s+/);
      if (expWords.length > 1 && val === exp.replace(/\s+/g, "")) return { ok: true };
      return { ok: false, msg: `"${val}" is not correct. Hint: ${task.expected.length} character(s), starts with "${task.expected.charAt(0)}".` };
    }
    if (task.type === "note") {
      const ta = document.getElementById("taskNote");
      const val = (ta ? ta.value : "").trim();
      if (val.length < 10) return { ok: false, msg: "Your field log entry is too short. Write a complete sentence." };
      const lower = val.toLowerCase();
      const checkKw = (kws) => kws.every(k => lower.includes(k.toLowerCase()));
      const mainOk = task.keywords ? checkKw(task.keywords) : true;
      const altOk = task.altKeywords ? checkKw(task.altKeywords) : false;
      if (mainOk || altOk) return { ok: true };
      const missing = task.keywords.filter(k => !lower.includes(k.toLowerCase()));
      return { ok: false, msg: `Your note is missing required keywords: ${missing.join(", ")}. Make sure to include them.` };
    }
    if (task.type === "slider") {
      const v = sliderValue[activeTaskIndex] || 0;
      const tol = task.tolerance || 1;
      if (Math.abs(v - task.expected) <= tol) return { ok: true };
      return { ok: false, msg: `The reading is set to ${v}. Adjust the dial to match the target.` };
    }
    return { ok: false, msg: "Unknown task type." };
  }

  function showHint(task) {
    const fb = document.getElementById("taskFeedback");
    fb.className = "task-feedback show info";
    let hint = "";
    if (task.type === "select") hint = `The correct answer relates to: ${task.expected.split("(")[0].trim().slice(0, 40)}…`;
    else if (task.type === "type") hint = `The answer has ${task.expected.length} character(s) and starts with "${task.expected.charAt(0)}".`;
    else if (task.type === "note") hint = `Your note must include: ${task.keywords.join(", ")}${task.altKeywords ? " (or " + task.altKeywords.join(", ") + ")" : ""}.`;
    else if (task.type === "toggle") hint = "Click the toggle row to switch it to the ON (green) position.";
    else if (task.type === "slider") hint = `The target reading is close to ${task.expected}.`;
    fb.textContent = "💡 " + hint;
  }

  // ==========================================================
  // COMPLETE MISSION
  // ==========================================================
  function completeMission(m) {
    if (!state.completedMissions.includes(m.id)) {
      state.completedMissions.push(m.id);
      const earned = missionXP(m);
      state.xp += earned;
      saveState();
      refreshBadges();
      const badge = SURVIVAL_BADGES.find(b => b.mission === m.id);
      toast("ok", `🏅 Mission complete! +${earned} XP earned. Badge unlocked: ${badge ? badge.name : m.title}.`);
    }
    renderMissionConsole();
    renderMissionSelector();
    renderCommand();
    renderSidebar();
    renderTopStats();
    renderAnalysis();
    renderRanks();
  }

  function completedMissionHTML(m) {
    const earned = missionXP(m);
    const badge = SURVIVAL_BADGES.find(b => b.mission === m.id);
    const mp = missionProgress(m.id);
    return `<div class="task-console">
      <div class="task-body">
        <div class="complete-card">
          <div class="cc-ico">🏅</div>
          <div class="cc-title">Mission Complete: ${m.title}</div>
          <div class="cc-sub">${m.desc} You have successfully completed all ${m.tasks.length} tasks and earned the <strong>${badge ? badge.name : "Bush Cadet"}</strong> badge.</div>
          <div class="cc-stats">
            <div class="cc-stat"><div class="v">+${earned}</div><div class="l">XP Earned</div></div>
            <div class="cc-stat"><div class="v">${mp.tasksDone.length}/${m.tasks.length}</div><div class="l">Tasks Done</div></div>
            <div class="cc-stat"><div class="v">${mp.wrongAttempts || 0}</div><div class="l">Wrong Attempts</div></div>
          </div>
          <div class="task-actions" style="justify-content:center;">
            <button class="btn btn-primary" id="fileSitrepQuickBtn" type="button">📤 File SITREP for this mission</button>
            <button class="btn btn-ghost" id="backToListBtn" type="button">← Back to mission list</button>
          </div>
        </div>
      </div>
    </div>`;
  }

  function exitMission() {
    activeMissionId = null;
    document.getElementById("missionConsole").style.display = "none";
    document.getElementById("missionSelector").style.display = "grid";
    document.getElementById("missionHeaderTitle").textContent = "Select a Mission";
    document.getElementById("missionHeaderSub").textContent = "Choose a training module from the Training tab, or pick a mission below to enter the survival simulator.";
    renderMissionSelector();
    renderCommand();
  }

  // ==========================================================
  // ANALYSIS
  // ==========================================================
  function renderAnalysis() {
    refreshBadges();
    const rank = currentRank();
    const nxt = nextRank();
    document.getElementById("ringXP").textContent = state.xp;
    document.getElementById("ringRankLabel").textContent = rank.name.replace("Survival Cadet ", "").replace("Cadet ", "");
    document.getElementById("nextRankName").textContent = nxt ? nxt.name : "MAX RANK";
    const pct = rankProgressPct();
    const circ = 314;
    document.getElementById("xpRingFg").style.strokeDashoffset = circ - (circ * pct / 100);
    document.getElementById("ringXPToNext").textContent = nxt ? `${state.xp - rank.xp} / ${nxt.xp - rank.xp} XP to next rank` : "MAX RANK ACHIEVED";
    const chart = document.getElementById("xpBarChart");
    chart.innerHTML = MISSIONS.map(m => {
      const done = missionDone(m);
      const xp = done ? missionXP(m) : 0;
      const h = Math.max(4, (xp / 100) * 140);
      return `<div class="bar" style="height:${h}px;" title="${m.title}: ${xp} XP"><div class="bar-val">${xp}</div><div class="bar-label">M${m.order}</div></div>`;
    }).join("");
    const correct = state.totalAttempts - state.wrongAttempts;
    const acc = state.totalAttempts > 0 ? Math.round((correct / state.totalAttempts) * 100) : 100;
    document.getElementById("accuracyPct").textContent = acc + "%";
    document.getElementById("totalAttempts").textContent = state.totalAttempts;
    document.getElementById("bestStreak").textContent = state.bestStreak;
  }

  function updateAnalysis() { renderAnalysis(); renderSidebar(); renderTopStats(); }

  // ==========================================================
  // RANKS
  // ==========================================================
  function renderRanks() {
    const list = document.getElementById("rankList");
    const cur = currentRank();
    list.innerHTML = RANKS.map(r => {
      let cls = "rank-row";
      let tag = "";
      if (r.id === cur.id) { cls += " current"; tag = '<span class="r-tag current">CURRENT</span>'; }
      else if (state.xp >= r.xp) { cls += " achieved"; tag = '<span class="r-tag achieved">ACHIEVED</span>'; }
      else { cls += ""; tag = '<span class="r-tag locked">LOCKED</span>'; }
      return `<div class="${cls}">
        <div class="r-ico">${r.icon}</div>
        <div class="r-body">
          <div class="r-name">${r.name}</div>
          <div class="r-xp">${r.xp} XP • DESIG ${r.callsign}</div>
        </div>
        ${tag}
      </div>`;
    }).join("");
  }

  // ==========================================================
  // SITREP
  // ==========================================================
  function renderSitrep() {
    const sel = document.getElementById("sitrepMission");
    const completed = MISSIONS.filter(m => missionDone(m));
    sel.innerHTML = `<option value="">Select a completed mission…</option>` +
      completed.map(m => `<option value="${m.id}">${m.tag} — ${m.title}</option>`).join("");
    const log = document.getElementById("sitrepLog");
    if (state.sitreps.length === 0) {
      log.innerHTML = `<p class="muted center" style="padding:20px;">No SITREPs filed yet. Complete a mission and file your first report.</p>`;
    } else {
      log.innerHTML = state.sitreps.slice().reverse().map(s => {
        const statusMap = {
          NOMINAL: { cls: "low", text: "NOMINAL", color: "var(--green)" },
          MINOR_HAZARD: { cls: "med", text: "MINOR HAZARD", color: "var(--amber-bright)" },
          ABORTED: { cls: "high", text: "ABORTED", color: "var(--red)" }
        };
        const st = statusMap[s.status] || statusMap.NOMINAL;
        const m = MISSIONS.find(x => x.id === s.mission);
        return `<div class="sitrep-entry">
          <div class="se-head">
            <span class="se-time">${s.time}</span>
            <span class="se-status ti-level ${st.cls}">${st.text}</span>
          </div>
          <div class="se-body"><strong>${m ? m.tag + " — " + m.title : s.mission}</strong><br/>${escapeHTML(s.summary)}</div>
        </div>`;
      }).join("");
    }
  }

  function fileSitrep() {
    const mission = document.getElementById("sitrepMission").value;
    const status = document.getElementById("sitrepStatus").value;
    const summary = document.getElementById("sitrepSummary").value.trim();
    const fb = document.getElementById("sitrepFeedback");
    if (!mission) { showFeedback(fb, "err", "Please select a completed mission."); return; }
    if (!status) { showFeedback(fb, "err", "Please choose an overall status."); return; }
    if (summary.length < 20) { showFeedback(fb, "err", "Your summary must be at least 20 characters long."); return; }
    const entry = { mission, status, summary, time: new Date().toLocaleString("en-GB", { hour12: false }) };
    state.sitreps.push(entry);
    state.xp += 20;
    saveState();
    document.getElementById("sitrepSummary").value = "";
    document.getElementById("sitrepStatus").value = "";
    document.getElementById("sitrepMission").value = "";
    showFeedback(fb, "ok", "SITREP filed successfully! +20 XP. Your commanding officer has received your report.");
    toast("ok", "📤 SITREP filed! +20 XP");
    survSound("transmit");
    renderSitrep(); renderSidebar(); renderTopStats(); renderCommand(); renderAnalysis();
  }

  function showFeedback(el, kind, msg) {
    el.className = "task-feedback show " + kind;
    el.textContent = (kind === "ok" ? "✅ " : kind === "err" ? "❌ " : "💡 ") + msg;
  }

  // ==========================================================
  // LEARN LIBRARY
  // ==========================================================
  function renderLearn() {
    const grid = document.getElementById("learnGrid");
    grid.innerHTML = LEARN_ARTICLES.map(a => {
      const read = state.readArticles.includes(a.id);
      return `<div class="lib-card ${read ? "read" : ""}" data-article="${a.id}">
        <div class="lc-ico">${a.icon}</div>
        <div class="lc-cat">${a.cat}</div>
        <div class="lc-title">${a.title}</div>
        <div class="lc-desc">${a.desc}</div>
        <div class="lc-foot"><span>${read ? "✓ Read" : "Tap to read"}</span><span>+${a.xp} XP</span></div>
      </div>`;
    }).join("");
    grid.querySelectorAll(".lib-card").forEach(el => {
      el.addEventListener("click", () => openArticle(el.dataset.article));
    });
  }

  function openArticle(articleId) {
    const a = LEARN_ARTICLES.find(x => x.id === articleId);
    if (!a) return;
    showArticleModal(a);
    if (!state.readArticles.includes(articleId)) {
      state.readArticles.push(articleId);
      state.xp += a.xp;
      saveState();
      toast("ok", `📖 Article read: "${a.title}" — +${a.xp} XP`);
      renderLearn(); renderSidebar(); renderTopStats(); renderAnalysis();
    } else {
      toast("info", `📖 Already read: "${a.title}"`);
    }
  }

  function showArticleModal(a) {
    const existing = document.getElementById("articleModalOverlay");
    if (existing) existing.remove();
    let bodyHTML = "";
    if (a.body) {
      bodyHTML += a.body.map(s => `<h3>${s.h}</h3><p>${s.p}</p>`).join("");
    }
    if (a.table) {
      bodyHTML += `<h3>Reference Table</h3><table><thead><tr>${a.table.headers.map(h => `<th>${h}</th>`).join("")}</tr></thead><tbody>`;
      bodyHTML += a.table.rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join("")}</tr>`).join("");
      bodyHTML += `</tbody></table>`;
    }
    const overlay = document.createElement("div");
    overlay.className = "article-modal-overlay";
    overlay.id = "articleModalOverlay";
    overlay.innerHTML = `<div class="article-modal">
      <div class="article-modal-head">
        <h2>${a.icon} ${a.title}</h2>
        <button class="sv-modal-close" id="articleModalClose" type="button">✕</button>
      </div>
      <div class="article-modal-body">${bodyHTML}</div>
      <div class="article-modal-foot">
        <span class="am-xp">+${a.xp} XP earned for reading</span>
        <button class="btn btn-primary" id="articleModalDone" type="button">Got It</button>
      </div>
    </div>`;
    document.body.appendChild(overlay);
    const close = () => overlay.remove();
    document.getElementById("articleModalClose").addEventListener("click", close);
    document.getElementById("articleModalDone").addEventListener("click", close);
    overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });
  }

  // ==========================================================
  // NAVIGATION
  // ==========================================================
  function switchSection(name) {
    document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
    const target = document.getElementById("section-" + name);
    if (target) target.classList.add("active");
    document.querySelectorAll(".nav-btn").forEach(b => b.classList.toggle("active", b.dataset.section === name));
    if (name === "command") renderCommand();
    if (name === "training") renderTraining();
    if (name === "missions") { renderMissionSelector(); if (activeMissionId) openMissionRender(); }
    if (name === "analysis") renderAnalysis();
    if (name === "sitrep") renderSitrep();
    if (name === "ranks") renderRanks();
    if (name === "game") svInit();
    if (name === "learn") renderLearn();
    document.querySelector(".main").scrollTop = 0;
  }

  function openMissionRender() {
    document.getElementById("missionSelector").style.display = "none";
    document.getElementById("missionConsole").style.display = "block";
    renderMissionConsole();
  }

  // ==========================================================
  // TOAST
  // ==========================================================
  let toastTimer = null;
  function toast(kind, text) {
    const t = document.getElementById("toast");
    const ico = document.getElementById("toastIco");
    const txt = document.getElementById("toastText");
    t.className = "toast " + kind;
    ico.textContent = kind === "ok" ? "✅" : kind === "warn" ? "⚠️" : kind === "err" ? "❌" : "ℹ️";
    txt.textContent = text;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 3500);
  }

  function escapeHTML(s) {
    return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  // ==========================================================
  // AUDIO ENGINE — Web Audio API for survival sounds + speech
  // ==========================================================
  let audioCtx = null;
  let audioMaster = null;
  let ambientNodes = [];

  function ensureAudio() {
    if (!audioCtx) {
      try {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        audioMaster = audioCtx.createGain();
        audioMaster.gain.value = 0.4;
        audioMaster.connect(audioCtx.destination);
      } catch (e) { audioCtx = null; }
    }
    if (audioCtx && audioCtx.state === "suspended") { audioCtx.resume(); }
  }

  // --- Survival sound effects ---
  function survSound(type) {
    ensureAudio();
    if (!audioCtx) return;
    const t = audioCtx.currentTime;
    if (type === "beep") {
      const osc = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      osc.type = "sine"; osc.frequency.value = 660;
      osc.connect(g); g.connect(audioMaster);
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.25, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
      osc.start(t); osc.stop(t + 0.15);
    } else if (type === "click") {
      const osc = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      osc.type = "square"; osc.frequency.value = 800;
      osc.connect(g); g.connect(audioMaster);
      g.gain.setValueAtTime(0.12, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
      osc.start(t); osc.stop(t + 0.05);
    } else if (type === "success") {
      [523, 784].forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        osc.type = "sine"; osc.frequency.value = freq;
        osc.connect(g); g.connect(audioMaster);
        const st = t + i * 0.1;
        g.gain.setValueAtTime(0, st);
        g.gain.linearRampToValueAtTime(0.22, st + 0.02);
        g.gain.exponentialRampToValueAtTime(0.001, st + 0.2);
        osc.start(st); osc.stop(st + 0.22);
      });
    } else if (type === "error") {
      const osc = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      osc.type = "sawtooth"; osc.frequency.value = 180;
      osc.connect(g); g.connect(audioMaster);
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.18, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
      osc.start(t); osc.stop(t + 0.32);
    } else if (type === "transmit") {
      const osc = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      osc.type = "triangle"; osc.frequency.value = 400;
      osc.connect(g); g.connect(audioMaster);
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.18, t + 0.03);
      g.gain.setValueAtTime(0.18, t + 0.15);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
      osc.start(t); osc.stop(t + 0.32);
    } else if (type === "fire") {
      // Fire crackling — short noise bursts
      for (let i = 0; i < 6; i++) {
        const dur = 0.08 + Math.random() * 0.06;
        const bufSize = Math.floor(audioCtx.sampleRate * dur);
        const buf = audioCtx.createBuffer(1, bufSize, audioCtx.sampleRate);
        const data = buf.getChannelData(0);
        for (let j = 0; j < bufSize; j++) { data[j] = (Math.random() * 2 - 1) * (1 - j / bufSize) * 0.5; }
        const noise = audioCtx.createBufferSource(); noise.buffer = buf;
        const filt = audioCtx.createBiquadFilter();
        filt.type = "bandpass"; filt.frequency.value = 800 + Math.random() * 1200; filt.Q.value = 1.5;
        const g = audioCtx.createGain();
        noise.connect(filt); filt.connect(g); g.connect(audioMaster);
        const st = t + i * (0.1 + Math.random() * 0.08);
        g.gain.setValueAtTime(0.2, st);
        g.gain.exponentialRampToValueAtTime(0.001, st + dur);
        noise.start(st); noise.stop(st + dur + 0.02);
      }
    } else if (type === "water") {
      // Water lapping — low filtered noise swooshes
      const dur = 1.2;
      const bufSize = Math.floor(audioCtx.sampleRate * dur);
      const buf = audioCtx.createBuffer(1, bufSize, audioCtx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < bufSize; i++) {
        const env = Math.sin(Math.PI * i / bufSize);
        data[i] = (Math.random() * 2 - 1) * env * 0.3;
      }
      const noise = audioCtx.createBufferSource(); noise.buffer = buf;
      const filt = audioCtx.createBiquadFilter();
      filt.type = "lowpass"; filt.frequency.value = 600; filt.Q.value = 0.5;
      const g = audioCtx.createGain();
      noise.connect(filt); filt.connect(g); g.connect(audioMaster);
      g.gain.setValueAtTime(0.35, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + dur);
      noise.start(t); noise.stop(t + dur + 0.02);
    } else if (type === "bird") {
      // Bird chirp — quick freq sweeps
      for (let i = 0; i < 3; i++) {
        const osc = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        osc.type = "sine";
        const st = t + i * 0.15;
        osc.frequency.setValueAtTime(1800, st);
        osc.frequency.linearRampToValueAtTime(2400, st + 0.05);
        osc.frequency.linearRampToValueAtTime(1600, st + 0.1);
        osc.connect(g); g.connect(audioMaster);
        g.gain.setValueAtTime(0, st);
        g.gain.linearRampToValueAtTime(0.15, st + 0.01);
        g.gain.exponentialRampToValueAtTime(0.001, st + 0.12);
        osc.start(st); osc.stop(st + 0.14);
      }
    } else if (type === "wolf") {
      // Wolf howl — long descending tone with vibrato
      const osc = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      const lfo = audioCtx.createOscillator();
      const lfoGain = audioCtx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(220, t);
      osc.frequency.linearRampToValueAtTime(180, t + 1.5);
      lfo.type = "sine"; lfo.frequency.value = 5;
      lfoGain.gain.value = 8;
      lfo.connect(lfoGain); lfoGain.connect(osc.frequency);
      osc.connect(g); g.connect(audioMaster);
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.15, t + 0.3);
      g.gain.setValueAtTime(0.15, t + 1.2);
      g.gain.exponentialRampToValueAtTime(0.001, t + 2.0);
      const filt = audioCtx.createBiquadFilter();
      filt.type = "lowpass"; filt.frequency.value = 800;
      osc.disconnect(); osc.connect(filt); filt.connect(g);
      osc.start(t); lfo.start(t);
      osc.stop(t + 2.1); lfo.stop(t + 2.1);
    } else if (type === "helicopter") {
      // Helicopter rotor — rhythmic low thumps
      for (let i = 0; i < 20; i++) {
        const osc = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        osc.type = "square"; osc.frequency.value = 80 + Math.random() * 10;
        osc.connect(g); g.connect(audioMaster);
        const st = t + i * 0.08;
        g.gain.setValueAtTime(0.12, st);
        g.gain.exponentialRampToValueAtTime(0.001, st + 0.06);
        osc.start(st); osc.stop(st + 0.08);
      }
    } else if (type === "rescue") {
      // Rescue success — triumphant rising arpeggio
      [392, 523, 659, 784, 1047].forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        osc.type = "sine"; osc.frequency.value = freq;
        osc.connect(g); g.connect(audioMaster);
        const st = t + i * 0.12;
        g.gain.setValueAtTime(0, st);
        g.gain.linearRampToValueAtTime(0.22, st + 0.02);
        g.gain.exponentialRampToValueAtTime(0.001, st + 0.3);
        osc.start(st); osc.stop(st + 0.32);
      });
    } else if (type === "gameover") {
      // Game over — descending sad tones
      [440, 370, 311, 262].forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        osc.type = "triangle"; osc.frequency.value = freq;
        osc.connect(g); g.connect(audioMaster);
        const st = t + i * 0.2;
        g.gain.setValueAtTime(0, st);
        g.gain.linearRampToValueAtTime(0.18, st + 0.03);
        g.gain.exponentialRampToValueAtTime(0.001, st + 0.35);
        osc.start(st); osc.stop(st + 0.37);
      });
    }
  }

  // --- Ambient wind loop (continuous background) ---
  function startAmbientWind(intensity) {
    stopAmbient();
    ensureAudio();
    if (!audioCtx) return;
    const dur = 3;
    const bufSize = Math.floor(audioCtx.sampleRate * dur);
    const buf = audioCtx.createBuffer(1, bufSize, audioCtx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) {
      const env = 0.5 + 0.5 * Math.sin(2 * Math.PI * i / bufSize * 2);
      data[i] = (Math.random() * 2 - 1) * env * 0.4 * intensity;
    }
    const noise = audioCtx.createBufferSource();
    noise.buffer = buf; noise.loop = true;
    const filt = audioCtx.createBiquadFilter();
    filt.type = "lowpass"; filt.frequency.value = 400 + intensity * 200;
    const g = audioCtx.createGain();
    g.gain.value = 0.15 * intensity;
    noise.connect(filt); filt.connect(g); g.connect(audioMaster);
    noise.start();
    ambientNodes.push(noise, filt, g);
  }

  function stopAmbient() {
    ambientNodes.forEach(n => { try { if (n.stop) n.stop(); n.disconnect(); } catch (e) {} });
    ambientNodes = [];
  }

  // Speak text using Web Speech API
  function speakText(text, rate) {
    if (!("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = rate || 0.85;
      u.pitch = 0.9;
      u.volume = 0.8;
      window.speechSynthesis.speak(u);
    } catch (e) {}
  }

  function speakTaskPrompt(task) {
    ensureAudio();
    survSound("beep");
    setTimeout(() => speakText(task.prompt, 0.8), 200);
  }

  // ==========================================================
  // BUSH SURVIVOR GAME ENGINE
  // ==========================================================
  const SV = {
    running: false,
    paused: false,
    score: 0,
    rescued: 0,
    rescuePct: 0,
    day: 1,
    gameMinutes: 360, // start at 6:00 AM
    location: null,
    weather: "clear",
    warmth: 80,
    hydration: 75,
    energy: 90,
    morale: 70,
    hasShelter: false,
    hasFire: false,
    hasWater: false, // raw water gathered
    purifiedWater: 0, // safe to drink
    food: 0,
    signalType: null,
    inventory: [],
    rafId: null,
    lastFrame: 0,
    tickAccum: 0,
    fireFlicker: 0,
    weatherTimer: 0,
    nightMode: false,
    gameOver: false,
    rescuedFlag: false
  };

  function svInit() {
    svRenderLocationBar();
    svRenderActions();
    svRenderMeters();
    svRenderEnv();
    svRenderInventory();
    svInitSceneSVG();
    svUpdateScoreboard();
    svUpdateStatus("🏕️ Select a location and press Start to begin your survival scenario.");

    const startBtn = document.getElementById("svStartBtn");
    if (startBtn && !startBtn.dataset.bound) {
      startBtn.dataset.bound = "1";
      startBtn.addEventListener("click", svStart);
    }
    const pauseBtn = document.getElementById("svPauseBtn");
    if (pauseBtn && !pauseBtn.dataset.bound) {
      pauseBtn.dataset.bound = "1";
      pauseBtn.addEventListener("click", svPause);
    }
    const howBtn = document.getElementById("svHowBtn");
    if (howBtn && !howBtn.dataset.bound) {
      howBtn.dataset.bound = "1";
      howBtn.addEventListener("click", svShowHowTo);
    }
    const modalClose = document.getElementById("svModalClose");
    if (modalClose && !modalClose.dataset.bound) {
      modalClose.dataset.bound = "1";
      modalClose.addEventListener("click", svHideHowTo);
    }
    const modalStart = document.getElementById("svModalStart");
    if (modalStart && !modalStart.dataset.bound) {
      modalStart.dataset.bound = "1";
      modalStart.addEventListener("click", () => { svHideHowTo(); svStart(); });
    }
    const overlay = document.getElementById("svModalOverlay");
    if (overlay && !overlay.dataset.bound) {
      overlay.dataset.bound = "1";
      overlay.addEventListener("click", (e) => { if (e.target === overlay) svHideHowTo(); });
    }
  }

  function svRenderLocationBar() {
    const bar = document.getElementById("svLocationBar");
    bar.innerHTML = LOCATIONS.map(l => {
      const cls = SV.location && SV.location.id === l.id ? "active" : "";
      return `<button class="sv-loc-btn ${cls}" data-loc="${l.id}" type="button" ${SV.running ? "disabled" : ""}><span class="slb-ico">${l.icon}</span>${l.name}</button>`;
    }).join("");
    bar.querySelectorAll(".sv-loc-btn").forEach(b => {
      b.addEventListener("click", () => {
        if (SV.running) return;
        const loc = LOCATIONS.find(l => l.id === b.dataset.loc);
        SV.location = loc;
        svRenderLocationBar();
        svRenderEnv();
        svInitSceneSVG();
        svUpdateStatus("🏕️ Location selected: " + loc.name + ". Press Start to begin.");
        survSound("click");
      });
    });
  }

  function svRenderActions() {
    const grid = document.getElementById("svActionGrid");
    grid.innerHTML = SURVIVAL_ACTIONS.map(a => {
      const done = svIsActionDone(a.id);
      let cls = "";
      if (a.id === "shelter" && SV.hasShelter) cls = "done";
      if (a.id === "fire" && SV.hasFire) cls = "done";
      if (a.id === "signal" && SV.signalType) cls = "done";
      return `<button class="sv-action-btn ${cls}" data-action="${a.id}" type="button" ${SV.gameOver ? "disabled" : ""}>
        <span class="sab-ico">${a.icon}</span>
        <span class="sab-name">${a.name}</span>
        <span class="sab-cost">${a.cost > 0 ? "⚡" + a.cost : "⚡+" + Math.abs(a.cost)}</span>
      </button>`;
    }).join("");
    grid.querySelectorAll(".sv-action-btn").forEach(b => {
      b.addEventListener("click", () => svDoAction(b.dataset.action));
    });
  }

  function svIsActionDone(id) {
    if (id === "shelter") return SV.hasShelter;
    if (id === "fire") return SV.hasFire;
    return false;
  }

  function svStart() {
    if (!SV.location) {
      SV.location = LOCATIONS[1]; // default boreal
      svRenderLocationBar();
    }
    ensureAudio();
    if (SV.gameOver) svReset();
    if (SV.running && !SV.paused) return;
    SV.running = true;
    SV.paused = false;
    SV.lastFrame = 0;
    SV.tickAccum = 0;
    document.getElementById("svStartBtn").disabled = true;
    document.getElementById("svPauseBtn").disabled = false;
    svUpdateStatus("🏕️ Survival scenario active in " + SV.location.name + ". Manage your stats and signal for rescue!");
    svLog("info", "▶ SURVIVAL STARTED — " + SV.location.name + ". Day 1.");
    survSound("transmit");
    startAmbientWind(SV.location.terrain === "tundra" || SV.location.terrain === "mountain" ? 1.2 : 0.6);
    svRenderLocationBar();
    if (SV.rafId) cancelAnimationFrame(SV.rafId);
    SV.rafId = requestAnimationFrame(svLoop);
  }

  function svPause() {
    SV.paused = !SV.paused;
    const btn = document.getElementById("svPauseBtn");
    btn.textContent = SV.paused ? "▶ Resume" : "⏸ Pause";
    svUpdateStatus(SV.paused ? "⏸ Survival paused." : "🏕️ Survival resumed.");
    if (!SV.paused) { SV.lastFrame = 0; SV.rafId = requestAnimationFrame(svLoop); }
    else { if (SV.rafId) cancelAnimationFrame(SV.rafId); stopAmbient(); }
  }

  function svReset() {
    SV.score = 0;
    SV.rescued = 0;
    SV.rescuePct = 0;
    SV.day = 1;
    SV.gameMinutes = 360;
    SV.weather = "clear";
    SV.warmth = 80;
    SV.hydration = 75;
    SV.energy = 90;
    SV.morale = 70;
    SV.hasShelter = false;
    SV.hasFire = false;
    SV.hasWater = false;
    SV.purifiedWater = 0;
    SV.food = 0;
    SV.signalType = null;
    SV.inventory = [];
    SV.fireFlicker = 0;
    SV.weatherTimer = 0;
    SV.nightMode = false;
    SV.gameOver = false;
    SV.rescuedFlag = false;
    document.getElementById("svTerminal").innerHTML = '<div class="sv-ln sv-ln-dim">// survival log will appear here…</div>';
    document.getElementById("svStartBtn").disabled = false;
    document.getElementById("svPauseBtn").disabled = true;
    document.getElementById("svPauseBtn").textContent = "⏸ Pause";
    svRenderActions();
    svRenderMeters();
    svRenderInventory();
  }

  function svLoop(ts) {
    if (!SV.running || SV.paused) return;
    if (!SV.lastFrame) SV.lastFrame = ts;
    const dt = Math.min(100, ts - SV.lastFrame);
    SV.lastFrame = ts;

    SV.tickAccum += dt;
    // Game tick every 500ms = 30 game minutes
    while (SV.tickAccum >= 500) {
      SV.tickAccum -= 500;
      svTick(30);
    }

    SV.fireFlicker += dt * 0.01;
    svRenderScene();
    svRenderMeters();
    svRenderEnv();

    if (SV.gameOver || SV.rescuedFlag) {
      SV.running = false;
      if (SV.rafId) cancelAnimationFrame(SV.rafId);
      stopAmbient();
      return;
    }

    SV.rafId = requestAnimationFrame(svLoop);
  }

  function svTick(minutes) {
    // Advance time
    SV.gameMinutes += minutes;
    if (SV.gameMinutes >= 1440) {
      SV.gameMinutes -= 1440;
      SV.day++;
      svLog("info", "🌅 Day " + SV.day + " begins. Stay alive and keep signalling.");
      svUpdateScoreboard();
    }

    // Determine night mode
    const hour = Math.floor(SV.gameMinutes / 60);
    const wasNight = SV.nightMode;
    SV.nightMode = (hour < 6 || hour >= 19);
    if (SV.nightMode !== wasNight) {
      if (SV.nightMode) { svLog("warn", "🌙 Night falls — temperatures drop. Fire and shelter are critical now."); }
      else { svLog("info", "🌅 Dawn breaks — a new day of survival begins."); }
    }

    // Weather changes
    SV.weatherTimer += minutes;
    if (SV.weatherTimer >= 120) {
      SV.weatherTimer = 0;
      svRollWeather();
    }

    // Warmth drain
    let warmthDrain = SV.location.warmthDrain;
    if (SV.nightMode) warmthDrain *= 1.5;
    if (SV.weather === "snow" || SV.weather === "blizzard" || SV.weather === "rain") warmthDrain *= 1.4;
    if (SV.weather === "blizzard") warmthDrain *= 1.5;
    if (SV.hasShelter) warmthDrain *= 0.4;
    if (SV.hasFire) warmthDrain *= 0.3;
    SV.warmth = Math.max(0, Math.min(100, SV.warmth - warmthDrain));

    // Hydration drain
    SV.hydration = Math.max(0, Math.min(100, SV.hydration - 1.5));
    // If we have purified water, auto-drink some
    if (SV.purifiedWater > 0 && SV.hydration < 60) {
      SV.purifiedWater--;
      SV.hydration = Math.min(100, SV.hydration + 25);
      svLog("info", "💧 You drink purified water. Hydration restored. (" + SV.purifiedWater + " remaining)");
    }

    // Energy drain
    SV.energy = Math.max(0, Math.min(100, SV.energy - 0.8));

    // Morale changes
    let moraleChange = 0;
    if (SV.hasFire) moraleChange += 0.5;
    if (SV.hasShelter) moraleChange += 0.3;
    if (SV.food > 0) moraleChange += 0.3;
    if (SV.warmth < 30) moraleChange -= 1.0;
    if (SV.hydration < 30) moraleChange -= 0.8;
    if (SV.nightMode && !SV.hasFire) moraleChange -= 0.5;
    SV.morale = Math.max(0, Math.min(100, SV.morale + moraleChange));

    // Warmth from fire
    if (SV.hasFire) SV.warmth = Math.min(100, SV.warmth + 1.5);

    // Check for death conditions
    if (SV.warmth <= 0) {
      svGameOver("hypothermia");
      return;
    }
    if (SV.hydration <= 0) {
      svGameOver("dehydration");
      return;
    }
    if (SV.energy <= 0 && SV.morale <= 0) {
      svGameOver("exhaustion");
      return;
    }

    // Random events
    if (Math.random() < 0.02) {
      svRandomEvent();
    }

    // Score over time (survival points)
    SV.score += 2;

    // Rescue check
    if (SV.rescuePct >= 100 && !SV.rescuedFlag) {
      svRescueSuccess();
    }
  }

  function svRollWeather() {
    const loc = SV.location;
    let r = Math.random();
    let cumul = 0;
    let newWeather = loc.weather[0];
    for (let i = 0; i < loc.weather.length; i++) {
      cumul += loc.weatherWeights[i];
      if (r < cumul) { newWeather = loc.weather[i]; break; }
    }
    if (newWeather !== SV.weather) {
      SV.weather = newWeather;
      const weatherNames = { clear: "☀️ Clear skies", cloudy: "☁️ Cloudy", rain: "🌧️ Rain begins", snow: "❄️ Snow begins", wind: "💨 Strong winds", fog: "🌫️ Fog rolls in", blizzard: "🌨️ BLIZZARD!" };
      svLog("warn", weatherNames[newWeather] || "Weather changing.");
      // Adjust ambient wind for weather
      if (SV.running && !SV.paused) {
        const intensity = (newWeather === "blizzard" || newWeather === "wind") ? 1.5 : (newWeather === "clear" ? 0.4 : 0.8);
        startAmbientWind(intensity);
      }
    }
  }

  function svDoAction(actionId) {
    if (!SV.running || SV.paused || SV.gameOver) {
      if (!SV.running) { toast("warn", "Press Start to begin your survival scenario first."); return; }
      return;
    }
    const action = SURVIVAL_ACTIONS.find(a => a.id === actionId);
    if (!action) return;

    // Check energy
    if (action.cost > 0 && SV.energy < action.cost) {
      svLog("err", "✗ Too exhausted for " + action.name + ". Rest first.");
      survSound("error");
      svUpdateStatus("⚡ Not enough energy for " + action.name + ". Rest to recover.");
      return;
    }

    ensureAudio();

    if (actionId === "shelter") {
      if (SV.hasShelter) { svLog("info", "You already have a shelter."); return; }
      SV.hasShelter = true;
      SV.energy -= action.cost;
      SV.morale = Math.min(100, SV.morale + 5);
      SV.inventory.push({ icon: "🏕️", name: "Shelter", qty: 1 });
      svLog("ok", "🏕️ Shelter built! Warmth loss greatly reduced. Morale boosted.");
      survSound("click");
      svRenderActions(); svRenderInventory();
    }
    else if (actionId === "fire") {
      if (SV.hasFire) { svLog("info", "Your fire is already burning."); return; }
      SV.hasFire = true;
      SV.energy -= action.cost;
      SV.morale = Math.min(100, SV.morale + 8);
      SV.warmth = Math.min(100, SV.warmth + 10);
      SV.inventory.push({ icon: "🔥", name: "Fire", qty: 1 });
      svLog("ok", "🔥 Fire lit! Warmth, morale, and water purification now available.");
      survSound("fire");
      svRenderActions(); svRenderInventory();
    }
    else if (actionId === "water") {
      if (SV.location.waterSource === "none") {
        svLog("err", "✗ No water source here. You'll need to navigate or wait for rain.");
        survSound("error");
        return;
      }
      SV.hasWater = true;
      SV.energy -= action.cost;
      SV.inventory.push({ icon: "🥤", name: "Raw Water", qty: 1 });
      svLog("info", "💧 Water gathered from " + SV.location.waterSource + ". Purify it before drinking!");
      survSound("water");
      svRenderInventory();
    }
    else if (actionId === "purify") {
      if (!SV.hasWater) {
        svLog("err", "✗ No water to purify. Find water first.");
        survSound("error");
        return;
      }
      if (!SV.hasFire) {
        svLog("warn", "⚠ No fire to boil water. Purifying without boiling is risky...");
        // Risky purification - 50% chance of sickness
        if (Math.random() < 0.5) {
          SV.hasWater = false;
          SV.energy -= action.cost;
          SV.hydration = Math.max(10, SV.hydration - 15);
          svLog("err", "🤢 The unpurified water made you sick! Hydration dropped.");
          survSound("error");
          svRenderInventory();
          return;
        }
      }
      SV.hasWater = false;
      SV.purifiedWater++;
      SV.energy -= action.cost;
      // Remove raw water from inventory, add purified
      SV.inventory = SV.inventory.filter(i => i.name !== "Raw Water");
      SV.inventory.push({ icon: "💧", name: "Purified Water", qty: SV.purifiedWater });
      svLog("ok", "🫖 Water purified and safe to drink! You now have " + SV.purifiedWater + " safe water.");
      survSound("water");
      svRenderInventory();
    }
    else if (actionId === "forage") {
      SV.energy -= action.cost;
      const yield_ = Math.floor(10 + Math.random() * 20 * SV.location.forageRichness);
      SV.food += yield_;
      SV.energy = Math.min(100, SV.energy + yield_ * 0.5);
      SV.inventory.push({ icon: "🍎", name: "Food", qty: yield_ });
      svLog("ok", "🍎 Foraged " + yield_ + " food. Energy partially restored.");
      survSound("beep");
      // Auto-eat if energy low
      if (SV.food > 0 && SV.energy < 50) {
        SV.food = Math.max(0, SV.food - 20);
        SV.energy = Math.min(100, SV.energy + 15);
        svLog("info", "🍽️ You eat some foraged food. Energy restored.");
      }
      svRenderInventory();
    }
    else if (actionId === "rest") {
      const restBonus = (SV.hasShelter ? 20 : 10) + (SV.hasFire ? 10 : 0);
      SV.energy = Math.min(100, SV.energy + restBonus);
      SV.morale = Math.min(100, SV.morale + 5);
      // Resting advances time more
      SV.gameMinutes += 120;
      if (SV.gameMinutes >= 1440) { SV.gameMinutes -= 1440; SV.day++; svLog("info", "🌅 Day " + SV.day); svUpdateScoreboard(); }
      svLog("ok", "😴 You rest and recover " + restBonus + " energy. Time advances 2 hours.");
      survSound("beep");
    }
    else if (actionId === "signal") {
      SV.energy -= action.cost;
      let signalBonus = 15;
      let signalName = "Ground Signal (V)";
      // Fire + signal = smoke column, more effective
      if (SV.hasFire) { signalBonus = 30; signalName = "Smoke Column"; }
      if (SV.weather === "fog" || SV.weather === "blizzard") signalBonus = Math.floor(signalBonus * 0.3);
      if (SV.weather === "rain" || SV.weather === "snow") signalBonus = Math.floor(signalBonus * 0.6);
      SV.signalType = signalName;
      SV.rescuePct = Math.min(100, SV.rescuePct + signalBonus);
      SV.score += 20;
      svLog("ok", "🆘 Signal deployed: " + signalName + ". Rescue chance +" + signalBonus + "% (now " + SV.rescuePct + "%).");
      survSound("transmit");
      svRenderActions();
      svUpdateScoreboard();
    }
    else if (actionId === "navigate") {
      SV.energy -= action.cost;
      const navRoll = Math.random();
      if (navRoll < 0.15) {
        // Found civilization!
        svLog("ok", "🧭 You found a road! A passing vehicle spots you.");
        SV.rescuePct = 100;
        svUpdateScoreboard();
      } else if (navRoll < 0.4) {
        SV.rescuePct = Math.min(100, SV.rescuePct + 20);
        svLog("info", "🧭 You find tracks leading toward a trail. Rescue chance +20%.");
        survSound("beep");
      } else if (navRoll < 0.7) {
        svLog("warn", "🧭 You walk for hours but find nothing. Energy wasted.");
        survSound("error");
      } else {
        SV.warmth = Math.max(0, SV.warmth - 15);
        svLog("err", "🧭 You get turned around and lose your way. Warmth drops from exposure.");
        survSound("error");
      }
      svUpdateScoreboard();
    }

    svRenderMeters();
    svRenderEnv();
    svUpdateScoreboard();
  }

  function svRandomEvent() {
    const events = [];
    if (SV.nightMode && SV.location.terrain !== "tundra") {
      events.push({ type: "wolf", text: "🐺 You hear a wolf howl in the distance. Stay near your fire.", sound: "wolf", morale: -5 });
    }
    if (!SV.nightMode && SV.location.terrain === "forest") {
      events.push({ type: "bird", text: "🐦 Birds sing nearby — a sign of nearby water and calm weather.", sound: "bird", morale: +3 });
    }
    if (SV.location.waterSource !== "none" && SV.hasFire) {
      events.push({ type: "water", text: "🌊 You hear water flowing nearby.", sound: "water", morale: +2 });
    }
    if (SV.hasFire) {
      events.push({ type: "fire", text: "🔥 Your fire crackles warmly.", sound: "fire", morale: +1 });
    }
    events.push({ type: "fatigue", text: "😴 You feel the strain of survival wearing on you.", sound: "beep", energy: -5 });
    events.push({ type: "hope", text: "🌤️ You spot a plane far overhead — keep signalling!", sound: "beep", rescuePct: +5 });

    if (events.length === 0) return;
    const ev = events[Math.floor(Math.random() * events.length)];
    svLog("info", ev.text);
    if (ev.sound) survSound(ev.sound);
    if (ev.morale) SV.morale = Math.max(0, Math.min(100, SV.morale + ev.morale));
    if (ev.energy) SV.energy = Math.max(0, Math.min(100, SV.energy + ev.energy));
    if (ev.rescuePct) { SV.rescuePct = Math.min(100, SV.rescuePct + ev.rescuePct); svUpdateScoreboard(); }
  }

  function svGameOver(cause) {
    SV.gameOver = true;
    SV.running = false;
    if (SV.rafId) cancelAnimationFrame(SV.rafId);
    stopAmbient();
    const causes = {
      hypothermia: "HYPOTHERMIA — your body temperature dropped to fatal levels",
      dehydration: "DEHYDRATION — you ran out of water",
      exhaustion: "EXHAUSTION — your body and spirit gave out"
    };
    svLog("err", "✗ SURVIVAL FAILED: " + (causes[cause] || cause) + ". You survived " + (SV.day - 1) + " full days. Score: " + SV.score);
    svUpdateStatus("☠️ Survival failed: " + (causes[cause] || cause) + ". Press Start to try again.");
    survSound("gameover");
    svRenderActions();
    document.getElementById("svStartBtn").disabled = false;
    document.getElementById("svPauseBtn").disabled = true;
    svShowSceneOverlay("☠️ SURVIVAL FAILED", causes[cause] || cause, "var(--red)");
  }

  function svRescueSuccess() {
    SV.rescuedFlag = true;
    SV.rescued++;
    SV.running = false;
    if (SV.rafId) cancelAnimationFrame(SV.rafId);
    stopAmbient();
    svLog("ok", "🚁 RESCUE! A search helicopter spots your signal and lands. You survived " + SV.day + " days! Score: " + SV.score);
    svUpdateStatus("🚁 RESCUED! You survived " + SV.day + " days in " + SV.location.name + ". Final score: " + SV.score);
    survSound("helicopter");
    setTimeout(() => survSound("rescue"), 800);
    svUpdateScoreboard();
    svRenderActions();
    document.getElementById("svStartBtn").disabled = false;
    document.getElementById("svPauseBtn").disabled = true;
    svShowSceneOverlay("🚁 RESCUED!", "Survived " + SV.day + " days • Score: " + SV.score, "var(--green)");
    // Award XP for game completion
    if (!state.gameBest || SV.score > state.gameBest) {
      state.gameBest = SV.score;
      saveState();
    }
  }

  function svRenderMeters() {
    const meters = [
      { id: "Warmth", val: Math.round(SV.warmth), fillId: "svWarmthFill", valId: "svWarmthVal" },
      { id: "Hydration", val: Math.round(SV.hydration), fillId: "svHydrationFill", valId: "svHydrationVal" },
      { id: "Energy", val: Math.round(SV.energy), fillId: "svEnergyFill", valId: "svEnergyVal" },
      { id: "Morale", val: Math.round(SV.morale), fillId: "svMoraleFill", valId: "svMoraleVal" }
    ];
    meters.forEach(m => {
      const fill = document.getElementById(m.fillId);
      const val = document.getElementById(m.valId);
      if (fill) {
        fill.style.width = m.val + "%";
        fill.classList.toggle("critical", m.val < 20);
      }
      if (val) val.textContent = m.val;
    });
  }

  function svRenderEnv() {
    const loc = SV.location;
    if (loc) {
      document.getElementById("svLocName").textContent = loc.icon + " " + loc.name;
      const tempBase = loc.tempBase - (SV.nightMode ? loc.tempNightDrop : 0);
      const weatherTempMod = { clear: 2, cloudy: 0, rain: -2, snow: -3, wind: -3, fog: -1, blizzard: -8 };
      const temp = Math.round(tempBase + (weatherTempMod[SV.weather] || 0));
      document.getElementById("svTemp").textContent = temp + "°C";
    } else {
      document.getElementById("svLocName").textContent = "—";
      document.getElementById("svTemp").textContent = "—";
    }
    const h = Math.floor(SV.gameMinutes / 60);
    const m = Math.floor(SV.gameMinutes % 60);
    document.getElementById("svClock").textContent = String(h).padStart(2, "0") + ":" + String(m).padStart(2, "0");
    const weatherIcons = { clear: "☀️ Clear", cloudy: "☁️ Cloudy", rain: "🌧️ Rain", snow: "❄️ Snow", wind: "💨 Windy", fog: "🌫️ Fog", blizzard: "🌨️ Blizzard" };
    document.getElementById("svWeather").textContent = weatherIcons[SV.weather] || SV.weather;
    document.getElementById("svDay").textContent = SV.day;
    document.getElementById("svGameDay").textContent = SV.day;
  }

  function svRenderInventory() {
    const grid = document.getElementById("svInvGrid");
    if (SV.inventory.length === 0 && !SV.hasShelter && !SV.hasFire) {
      grid.innerHTML = '<span class="sv-inv-empty">No items gathered yet.</span>';
      return;
    }
    // Deduplicate and count
    const items = {};
    SV.inventory.forEach(i => {
      if (!items[i.name]) items[i.name] = { icon: i.icon, qty: 0 };
      items[i.name].qty += (i.qty || 1);
    });
    // Also show persistent shelter/fire
    if (SV.hasShelter) items["Shelter"] = { icon: "🏕️", qty: 1 };
    if (SV.hasFire) items["Fire"] = { icon: "🔥", qty: 1 };
    grid.innerHTML = Object.entries(items).map(([name, data]) =>
      `<span class="sv-inv-item"><span class="siv-ico">${data.icon}</span>${name} <span class="siv-qty">×${data.qty}</span></span>`
    ).join("");
  }

  function svUpdateScoreboard() {
    document.getElementById("svScore").textContent = SV.score;
    document.getElementById("svRescued").textContent = SV.rescued;
    document.getElementById("svRescuePct").textContent = SV.rescuePct;
    document.getElementById("svGameDay").textContent = SV.day;
  }

  function svUpdateStatus(text) {
    const strip = document.getElementById("svStatusStrip");
    document.getElementById("svStatusTxt").textContent = text;
    strip.classList.remove("alert", "success");
    if (text.includes("FAILED") || text.includes("failed")) strip.classList.add("alert");
    if (text.includes("RESCUED") || text.includes("Rescued")) strip.classList.add("success");
  }

  function svLog(kind, text) {
    const term = document.getElementById("svTerminal");
    if (!term) return;
    const ln = document.createElement("div");
    ln.className = "sv-ln sv-ln-" + kind;
    ln.textContent = "[" + svFormatTime() + "] " + text;
    term.appendChild(ln);
    term.scrollTop = term.scrollHeight;
    // Keep log trimmed
    while (term.children.length > 40) term.removeChild(term.firstChild);
  }

  function svFormatTime() {
    const h = Math.floor(SV.gameMinutes / 60);
    const m = Math.floor(SV.gameMinutes % 60);
    return "D" + SV.day + " " + String(h).padStart(2, "0") + ":" + String(m).padStart(2, "0");
  }

  function svShowHowTo() {
    const overlay = document.getElementById("svModalOverlay");
    if (overlay) overlay.style.display = "flex";
  }
  function svHideHowTo() {
    const overlay = document.getElementById("svModalOverlay");
    if (overlay) overlay.style.display = "none";
  }

  // ==========================================================
  // SCENE SVG RENDERING — animated Canadian wilderness
  // ==========================================================
  function svInitSceneSVG() {
    const svg = document.getElementById("svScene");
    if (!svg) return;
    if (!SV.location) {
      // Default preview
      svg.innerHTML = svSceneHTML(LOCATIONS[1], "clear", false, false, false);
      return;
    }
    svg.innerHTML = svSceneHTML(SV.location, SV.weather, SV.nightMode, SV.hasFire, SV.hasShelter);
  }

  function svRenderScene() {
    const svg = document.getElementById("svScene");
    if (!svg || !SV.location) return;
    svg.innerHTML = svSceneHTML(SV.location, SV.weather, SV.nightMode, SV.hasFire, SV.hasShelter);
  }

  function svSceneHTML(loc, weather, night, hasFire, hasShelter) {
    const W = 800, H = 550;
    let html = "";
    const c = loc.color;

    // Sky gradient (day vs night)
    const skyId = night ? "svSkyNight" : "svSkyDay";
    const sky1 = night ? "#0a0e18" : c.sky1;
    const sky2 = night ? "#050709" : c.sky2;
    html += `<defs>`;
    html += `<linearGradient id="${skyId}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky1}"/><stop offset="1" stop-color="${sky2}"/></linearGradient>`;
    html += `</defs>`;
    html += `<rect width="${W}" height="${H}" fill="url(#${skyId})"/>`;

    // Stars at night
    if (night) {
      html += `<g opacity="0.8">`;
      for (let i = 0; i < 30; i++) {
        const sx = (i * 73 + 37) % W;
        const sy = (i * 41 + 19) % 200;
        html += `<circle class="sv-star" cx="${sx}" cy="${sy}" r="${1 + (i % 2)}" fill="#e6f3ff" style="animation-delay:${i * 0.1}s"/>`;
      }
      html += `</g>`;
      // Moon
      html += `<circle cx="680" cy="80" r="22" fill="#d0dde8" opacity="0.85"/>`;
      html += `<circle cx="688" cy="75" r="18" fill="${sky1}" opacity="0.6"/>`;
    } else {
      // Sun
      const sunX = 120 + (SV.gameMinutes / 1440) * 560;
      const sunY = 200 - Math.sin((SV.gameMinutes / 1440) * Math.PI) * 120;
      html += `<circle cx="${sunX}" cy="${sunY}" r="24" fill="${weather === "fog" || weather === "blizzard" ? "#888" : "#ffd66b"}" opacity="${weather === "fog" || weather === "blizzard" ? 0.4 : 0.9}"/>`;
      html += `<circle cx="${sunX}" cy="${sunY}" r="32" fill="${weather === "fog" || weather === "blizzard" ? "#888" : "#ffd66b"}" opacity="0.2"/>`;
    }

    // Clouds (unless clear)
    if (weather !== "clear") {
      const cloudColor = night ? "#2a2e3a" : (weather === "blizzard" || weather === "rain" || weather === "snow" ? "#5a5e68" : "#4a4e58");
      html += `<g opacity="0.7">`;
      for (let i = 0; i < 4; i++) {
        const cx = (i * 200 + 50 + (Date.now() / 100) % 800) % 850 - 50;
        const cy = 50 + i * 25;
        html += `<ellipse cx="${cx}" cy="${cy}" rx="60" ry="20" fill="${cloudColor}"/>`;
        html += `<ellipse cx="${cx + 30}" cy="${cy - 10}" rx="40" ry="18" fill="${cloudColor}"/>`;
      }
      html += `</g>`;
    }

    // Terrain-specific background
    if (loc.terrain === "forest") {
      // Distant tree line
      html += `<rect x="0" y="380" width="${W}" height="170" fill="${c.ground}"/>`;
      for (let i = 0; i < 8; i++) {
        const tx = i * 105 + 20;
        html += `<polygon points="${tx},380 ${tx + 30},240 ${tx + 60},380" fill="${c.accent}" opacity="${0.5 + (i % 2) * 0.2}"/>`;
      }
      // Closer trees with sway animation
      for (let i = 0; i < 5; i++) {
        const tx = i * 170 + 40;
        html += `<g class="sv-leaf" style="animation-delay:${i * 0.3}s">`;
        html += `<polygon points="${tx + 10},430 ${tx + 35},290 ${tx + 60},430" fill="#2a3318"/>`;
        html += `<polygon points="${tx + 15},430 ${tx + 35},320 ${tx + 55},430" fill="#3d5a28"/>`;
        html += `<rect x="${tx + 32}" y="425" width="6" height="20" fill="#3d2818"/>`;
        html += `</g>`;
      }
    }
    else if (loc.terrain === "tundra") {
      // Snow ground
      html += `<rect x="0" y="380" width="${W}" height="170" fill="${c.ground}"/>`;
      html += `<rect x="0" y="370" width="${W}" height="10" fill="#e0ebf2" opacity="0.5"/>`;
      // Sparse rocks
      for (let i = 0; i < 6; i++) {
        const rx = i * 140 + 30;
        html += `<ellipse cx="${rx}" cy="430" rx="25" ry="12" fill="#9aa8b5" opacity="0.7"/>`;
      }
    }
    else if (loc.terrain === "mountain") {
      html += `<rect x="0" y="420" width="${W}" height="130" fill="${c.ground}"/>`;
      // Mountain peaks
      html += `<polygon points="0,420 150,200 300,420" fill="${c.accent}"/>`;
      html += `<polygon points="200,420 380,150 500,420" fill="#5a6068"/>`;
      html += `<polygon points="450,420 600,220 700,420" fill="${c.accent}"/>`;
      // Snow caps
      html += `<polygon points="380,150 400,185 390,195 370,180" fill="#d0dde8"/>`;
      html += `<polygon points="150,200 165,225 155,232 140,215" fill="#d0dde8"/>`;
    }
    else if (loc.terrain === "coast") {
      // Ocean
      html += `<rect x="0" y="350" width="${W}" height="200" fill="#2a5070" opacity="0.6"/>`;
      html += `<rect x="0" y="340" width="${W}" height="12" fill="#3a7090"/>`;
      // Waves
      for (let i = 0; i < 5; i++) {
        const wy = 360 + i * 30;
        html += `<ellipse cx="${i * 180 + 80}" cy="${wy}" rx="60" ry="4" fill="#5fa0c0" opacity="0.3"/>`;
      }
      // Shoreline rocks
      html += `<rect x="0" y="330" width="${W}" height="14" fill="#3a4858"/>`;
      for (let i = 0; i < 5; i++) {
        const rx = i * 170 + 40;
        html += `<ellipse cx="${rx}" cy="335" rx="20" ry="8" fill="#5a6878"/>`;
      }
    }
    else if (loc.terrain === "lakeshore") {
      // Lake
      html += `<rect x="0" y="360" width="${W}" height="190" fill="#2a5070" opacity="0.6"/>`;
      html += `<rect x="0" y="350" width="${W}" height="12" fill="#3a7090"/>`;
      // Water ripples
      html += `<g>`;
      for (let i = 0; i < 4; i++) {
        const wx = 100 + i * 200;
        html += `<circle class="sv-ripple" cx="${wx}" cy="400" r="4" fill="none" stroke="#87d4f0" stroke-width="1" opacity="0.5" style="animation-delay:${i * 0.5}s"/>`;
      }
      html += `</g>`;
      // Shore + trees
      html += `<rect x="0" y="340" width="${W}" height="16" fill="#3a5030"/>`;
      for (let i = 0; i < 4; i++) {
        const tx = i * 210 + 30;
        html += `<g class="sv-leaf" style="animation-delay:${i * 0.4}s">`;
        html += `<polygon points="${tx},340 ${tx + 25},230 ${tx + 50},340" fill="#2a3318"/>`;
        html += `<rect x="${tx + 22}" y="335" width="6" height="10" fill="#3d2818"/>`;
        html += `</g>`;
      }
    }
    else if (loc.terrain === "prairie") {
      html += `<rect x="0" y="400" width="${W}" height="150" fill="${c.ground}"/>`;
      // Grass tufts
      for (let i = 0; i < 20; i++) {
        const gx = (i * 42 + 10) % W;
        html += `<line x1="${gx}" y1="420" x2="${gx - 3}" y2="405" stroke="#5a5840" stroke-width="2"/>`;
        html += `<line x1="${gx}" y1="420" x2="${gx + 3}" y2="408" stroke="#5a5840" stroke-width="2"/>`;
      }
      // Distant horizon line
      html += `<line x1="0" y1="400" x2="${W}" y2="400" stroke="${c.accent}" stroke-width="2" opacity="0.4"/>`;
    }

    // Weather particles
    if (weather === "rain") {
      html += `<g opacity="0.6">`;
      for (let i = 0; i < 40; i++) {
        const rx = (i * 23 + 7) % W;
        const ry = (i * 31 + 13) % H;
        html += `<line class="sv-rain" x1="${rx}" y1="${ry}" x2="${rx - 3}" y2="${ry + 12}" stroke="#87d4f0" stroke-width="1" style="animation-delay:${i * 0.02}s"/>`;
      }
      html += `</g>`;
    }
    else if (weather === "snow" || weather === "blizzard") {
      const count = weather === "blizzard" ? 60 : 35;
      html += `<g opacity="0.85">`;
      for (let i = 0; i < count; i++) {
        const sx = (i * 19 + 5) % W;
        const sy = (i * 27 + 11) % H;
        html += `<circle class="sv-snow" cx="${sx}" cy="${sy}" r="${1 + (i % 2)}" fill="#e6f3ff" style="animation-delay:${i * 0.05}s;animation-duration:${2 + (i % 3)}s"/>`;
      }
      html += `</g>`;
    }
    else if (weather === "fog") {
      html += `<rect x="0" y="0" width="${W}" height="${H}" fill="#a0a8b0" opacity="0.25"/>`;
      html += `<rect x="0" y="300" width="${W}" height="250" fill="#a0a8b0" opacity="0.15"/>`;
    }

    // Shelter (if built)
    if (hasShelter) {
      const sx = 340, sy = 420;
      html += `<g>`;
      // Lean-to shelter
      html += `<polygon points="${sx},${sy} ${sx + 80},${sy} ${sx + 80},${sy - 50} ${sx},${sy - 70}" fill="#3d2818" opacity="0.9"/>`;
      html += `<polygon points="${sx},${sy - 70} ${sx + 80},${sy - 50} ${sx + 80},${sy - 45} ${sx},${sy - 65}" fill="#2a3318" opacity="0.7"/>`;
      // Boughs texture
      for (let i = 0; i < 5; i++) {
        html += `<line x1="${sx + i * 16}" y1="${sy}" x2="${sx + i * 16 + 20}" y2="${sy - 60 + i * 4}" stroke="#3d5a28" stroke-width="2" opacity="0.6"/>`;
      }
      // Support pole
      html += `<rect x="${sx + 75}" y="${sy - 50}" width="4" height="50" fill="#3d2818"/>`;
      html += `<text x="${sx + 40}" y="${sy + 18}" fill="#a5e653" font-size="10" font-family="monospace" text-anchor="middle">SHELTER</text>`;
      html += `</g>`;
    }

    // Fire (if lit) — animated flames and sparks
    if (hasFire) {
      const fx = 250, fy = 440;
      html += `<g>`;
      // Fire ring stones
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const rx = fx + Math.cos(angle) * 22;
        const ry = fy + Math.sin(angle) * 8;
        html += `<ellipse cx="${rx}" cy="${ry}" rx="6" ry="4" fill="#5a5a5a"/>`;
      }
      // Logs
      html += `<rect x="${fx - 18}" y="${fy - 3}" width="36" height="5" rx="2" fill="#3d2818" transform="rotate(15 ${fx} ${fy})"/>`;
      html += `<rect x="${fx - 18}" y="${fy - 1}" width="36" height="5" rx="2" fill="#3d2818" transform="rotate(-15 ${fx} ${fy})"/>`;
      // Animated flames
      html += `<g class="sv-flame">`;
      html += `<path d="M${fx},${fy - 5} Q${fx - 8},${fy - 20} ${fx},${fy - 35} Q${fx + 8},${fy - 20} ${fx},${fy - 5} Z" fill="#ff6b35" opacity="0.9"/>`;
      html += `<path d="M${fx},${fy - 8} Q${fx - 5},${fy - 18} ${fx},${fy - 28} Q${fx + 5},${fy - 18} ${fx},${fy - 8} Z" fill="#ffd66b" opacity="0.95"/>`;
      html += `<path d="M${fx},${fy - 12} Q${fx - 3},${fy - 16} ${fx},${fy - 22} Q${fx + 3},${fy - 16} ${fx},${fy - 12} Z" fill="#fff" opacity="0.7"/>`;
      html += `</g>`;
      // Sparks
      for (let i = 0; i < 4; i++) {
        const spx = fx + (Math.random() - 0.5) * 16;
        html += `<circle class="sv-spark" cx="${spx}" cy="${fy - 30}" r="1.5" fill="#ffd66b" style="animation-delay:${i * 0.3}s"/>`;
      }
      // Glow
      html += `<circle cx="${fx}" cy="${fy - 15}" r="40" fill="#ff6b35" opacity="0.08"/>`;
      html += `<text x="${fx}" y="${fy + 18}" fill="#ff8c54" font-size="10" font-family="monospace" text-anchor="middle">FIRE</text>`;
      html += `</g>`;
    }

    // Signal (if deployed)
    if (SV.signalType) {
      if (SV.signalType.includes("Smoke")) {
        // Smoke column from fire
        const smx = 250;
        html += `<g opacity="0.5">`;
        for (let i = 0; i < 5; i++) {
          const smy = 420 - i * 40;
          const offset = Math.sin(SV.fireFlicker + i) * 8;
          html += `<ellipse cx="${smx + offset}" cy="${smy}" r="${10 + i * 4}" fill="#888" opacity="${0.4 - i * 0.06}"/>`;
        }
        html += `</g>`;
      } else {
        // Ground signal V or X
        const gx = 480, gy = 470;
        html += `<g>`;
        html += `<line x1="${gx - 30}" y1="${gy + 20}" x2="${gx}" y2="${gy - 20}" stroke="#ff6b35" stroke-width="8" opacity="0.9"/>`;
        html += `<line x1="${gx + 30}" y1="${gy + 20}" x2="${gx}" y2="${gy - 20}" stroke="#ff6b35" stroke-width="8" opacity="0.9"/>`;
        html += `<text x="${gx}" y="${gy + 40}" fill="#ffd66b" font-size="12" font-family="monospace" text-anchor="middle" font-weight="bold">V</text>`;
        html += `</g>`;
      }
    }

    // Cadet figure
    const px = 520, py = 440;
    html += `<g>`;
    // Shadow
    html += `<ellipse cx="${px}" cy="${py + 5}" rx="12" ry="3" fill="#000" opacity="0.3"/>`;
    // Body
    html += `<rect x="${px - 6}" y="${py - 25}" width="12" height="22" rx="3" fill="${night ? "#2a3a48" : "#3a5a48"}"/>`;
    // Head
    html += `<circle cx="${px}" cy="${py - 30}" r="6" fill="${night ? "#4a5a68" : "#6a7a68"}"/>`;
    // Legs
    html += `<rect x="${px - 6}" y="${py - 3}" width="5" height="8" fill="#2a3a38"/>`;
    html += `<rect x="${px + 1}" y="${py - 3}" width="5" height="8" fill="#2a3a38"/>`;
    html += `</g>`;

    // Night wolf eyes (random, if night and not tundra)
    if (night && loc.terrain !== "tundra" && Math.random() < 0.5) {
      html += `<g>`;
      html += `<circle class="sv-wolf-eye" cx="120" cy="420" r="2" fill="#ffd66b"/>`;
      html += `<circle class="sv-wolf-eye" cx="128" cy="420" r="2" fill="#ffd66b" style="animation-delay:0.2s"/>`;
      html += `</g>`;
    }

    // Rescue helicopter (when rescuePct is high)
    if (SV.rescuePct >= 80 && SV.rescuePct < 100) {
      const hx = 600 + Math.sin(SV.fireFlicker * 0.5) * 20;
      const hy = 120;
      html += `<g opacity="0.7">`;
      html += `<ellipse cx="${hx}" cy="${hy}" rx="20" ry="8" fill="#3a3e48"/>`;
      html += `<rect x="${hx - 25}" y="${hy - 3}" width="10" height="6" fill="#3a3e48"/>`;
      html += `<g class="sv-heli-blade" style="transform-box:fill-box;transform-origin:center">`;
      html += `<rect x="${hx - 30}" y="${hy - 14}" width="60" height="3" fill="#5a5e68"/>`;
      html += `</g>`;
      html += `<rect x="${hx - 5}" y="${hy + 5}" width="3" height="12" fill="#3a3e48"/>`;
      html += `</g>`;
    }

    // Scene overlay for game over / rescue
    const overlayEl = document.getElementById("svSceneOverlay");
    // handled separately

    // Location label
    html += `<text x="400" y="30" fill="${night ? "#a5e653" : "#ffc757"}" font-size="13" font-family="monospace" text-anchor="middle" font-weight="bold">${loc.icon} ${loc.name.toUpperCase()}</text>`;
    if (night) {
      html += `<text x="400" y="48" fill="#6f8862" font-size="10" font-family="monospace" text-anchor="middle">🌙 NIGHT — ${svFormatTime()}</text>`;
    } else {
      html += `<text x="400" y="48" fill="#6f8862" font-size="10" font-family="monospace" text-anchor="middle">☀️ DAY — ${svFormatTime()}</text>`;
    }

    return html;
  }

  function svShowSceneOverlay(title, subtitle, color) {
    const svg = document.getElementById("svScene");
    if (!svg) return;
    const overlay = document.createElementNS("http://www.w3.org/2000/svg", "g");
    overlay.setAttribute("id", "svSceneOverlayG");
    overlay.innerHTML = `
      <rect x="200" y="220" width="400" height="110" rx="12" fill="rgba(10,13,8,0.92)" stroke="${color}" stroke-width="2"/>
      <text x="400" y="265" fill="${color}" font-size="22" font-family="sans-serif" text-anchor="middle" font-weight="bold">${title}</text>
      <text x="400" y="300" fill="#a3b896" font-size="13" font-family="sans-serif" text-anchor="middle">${subtitle}</text>
    `;
    svg.appendChild(overlay);
  }

  /* ── i18n: translate data arrays in-place ── */
  if (typeof trMutate === "function") {
    try { trMutate(CLOUD_FAMILIES); } catch(e) {}
    try { trMutate(FIRE_TRIANGLE); } catch(e) {}
    try { trMutate(FIRE_TYPES); } catch(e) {}
    try { trMutate(FIVE_ELEMENTS); } catch(e) {}
    try { trMutate(FUEL_TYPES); } catch(e) {}
    try { trMutate(GROUND_SIGNALS); } catch(e) {}
    try { trMutate(LEARN_ARTICLES); } catch(e) {}
    try { trMutate(LOCATIONS); } catch(e) {}
    try { trMutate(MISSIONS); } catch(e) {}
    try { trMutate(RANKS); } catch(e) {}
    try { trMutate(RULE_OF_THREES); } catch(e) {}
    try { trMutate(SEVEN_ENEMIES); } catch(e) {}
    try { trMutate(SHELTERS); } catch(e) {}
    try { trMutate(SK); } catch(e) {}
    try { trMutate(STOP_STEPS); } catch(e) {}
    try { trMutate(SURVIVAL_ACTIONS); } catch(e) {}
    try { trMutate(SURVIVAL_BADGES); } catch(e) {}
    try { trMutate(SV); } catch(e) {}
    try { trMutate(TOOLS); } catch(e) {}
    try { trMutate(ambientNodes); } catch(e) {}
    try { trMutate(causes); } catch(e) {}
    try { trMutate(events); } catch(e) {}
    try { trMutate(items); } catch(e) {}
    try { trMutate(meters); } catch(e) {}
    try { trMutate(sliderValue); } catch(e) {}
    try { trMutate(statusMap); } catch(e) {}
    try { trMutate(toggleState); } catch(e) {}
    try { trMutate(weatherIcons); } catch(e) {}
    try { trMutate(weatherNames); } catch(e) {}
    try { trMutate(weatherTempMod); } catch(e) {}
  }



  // ==========================================================
  // INIT
  // ==========================================================
  function init() {
    renderSidebar();
    renderTopStats();
    renderCommand();
    renderTraining();
    renderMissionSelector();
    renderRanks();
    renderSitrep();
    renderLearn();

    document.querySelectorAll("#mainNav .nav-btn").forEach(btn => {
      btn.addEventListener("click", () => switchSection(btn.dataset.section));
    });

    const mmb = document.getElementById("mobileMenuBtn");
    if (mmb) mmb.addEventListener("click", () => {
      document.getElementById("sidebar").classList.toggle("open");
    });

    const fileBtn = document.getElementById("fileSitrepBtn");
    if (fileBtn) fileBtn.addEventListener("click", fileSitrep);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
