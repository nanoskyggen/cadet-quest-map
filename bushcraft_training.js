/* ============================================================
   BUSHCRAFT & SURVIVAL TRAINING COMMAND — bushcraft_training.js
   Operation Wildwood: shelter, fire, water, foraging, signalling
   Maple Defender-style dashboard engine (IIFE architecture)
   Unique game: Survival Trail — interactive multi-stage scenario
   with Web Audio API ambient campfire music and sound effects.
   ============================================================ */

(function () {
  "use strict";

  // ==========================================================
  // STORAGE KEYS
  // ==========================================================
  const SK = {
    progress: "bushcraftTrainingProgress",
    sitreps: "bushcraftTrainingSitreps",
    wrongAttempts: "bushcraftTrainingWrongAttempts",
    streak: "bushcraftTrainingStreak",
    bestStreak: "bushcraftTrainingBestStreak",
    readArticles: "bushcraftTrainingReadArticles"
  };
  const MAP_PROGRESS_KEY = "cadetMapDemoCompleted";
  const BUSHCRAFT_BADGE_ID = 15;

  // ==========================================================
  // MODULE-LEVEL STATE VARIABLES
  // ==========================================================
  let state = null;
  let activeMissionId = null;
  let activeTaskIndex = 0;
  let activeTool = "";
  let toggleState = {};
  let sliderValue = {};
  let selectState = {};
  let orderState = {};

  // ==========================================================
  // RANK LADDER (Bushcraft progression ranks)
  // ==========================================================
  const RANKS = [
    { id: 0, name: "Survival Recruit",          icon: "🔥",  xp: 0,    callsign: "WOODS-1" },
    { id: 1, name: "Survival Cadet",            icon: "🛣",  xp: 300,  callsign: "WILD-2" },
    { id: 2, name: "Senior Survival Cadet",     icon: "\u2B50",  xp: 700,  callsign: "SENIOR-3" },
    { id: 3, name: "Bushcraft Instructor Cadet", icon: "🏅",  xp: 1200, callsign: "INSTR-4" },
    { id: 4, name: "Wilderness Commander Cadet",  icon: "👑",  xp: 1800, callsign: "CMDR-5" },
    { id: 5, name: "Master of the Wild",    icon: "🏆",  xp: 2500, callsign: "MASTER-6" }
  ];

  // ==========================================================
  // TOOLS (bushcraft & survival tools cadets must "open")
  // ==========================================================
  const TOOLS = [
    { id: "flintsteel",     icon: "\u26A1", label: "Flint & Steel" },
    { id: "firekit",        icon: "🔥", label: "Fire Kit" },
    { id: "tinderbox",      icon: "🧴", label: "Tinder Box" },
    { id: "knife",          icon: "🔪", label: "Bush Knife" },
    { id: "axe",            icon: "🪓", label: "Camp Axe" },
    { id: "canteen",        icon: "🛁", label: "Canteen" },
    { id: "puritab",        icon: "💊", label: "Purification Tabs" },
    { id: "paracord",       icon: "🧵", label: "Paracord" },
    { id: "tarp",           icon: "🛡", label: "Tarp Sheet" },
    { id: "compass",        icon: "🧭", label: "Compass" },
    { id: "whistle",        icon: "🏷\uFE0F", label: "Survival Whistle" },
    { id: "signalmirror",   icon: "👁\uFE0F", label: "Signal Mirror" },
    { id: "firstaid",       icon: "🢚", label: "First Aid Kit" },
    { id: "sitrepform",     icon: "📝", label: "SITREP Form" }
  ];

  // ==========================================================
  // TRAINING MISSIONS — Bushcraft & Survival
  // Based on Red Star PO 224 Wilderness Survival syllabus
  // EO M224.01-06: S.T.O.P., seven enemies, weather, shelters,
  // fire, water purification, foraging, signalling
  // Each mission has 4 hands-on tasks. Tool enforcement required.
  // ==========================================================
  const MISSIONS = [
    {
      id: "bc_stop",
      order: 1,
      tag: "SURVIVAL 01",
      icon: "🤔",
      title: "S.T.O.P. & Survival Psychology",
      desc: "Master the S.T.O.P. procedure, the five elements of survival, and the psychology of staying alive.",
      xp: 100,
      brief: "Your survival instructor introduces the foundational survival psychology module. When you realize you are lost or stranded, the first action is always S.T.O.P. — Sit, Think, Observe, Plan. Panic is the biggest enemy. You will learn the five elements of survival (Attitude, Shelter, Water, Fire, Food) and the rule of three: you can survive 3 minutes without air, 3 hours without shelter in extreme conditions, 3 days without water, and 3 weeks without food. Understanding these priorities is what keeps survivors alive.",
      scene: "stop",
      chapters: [
        { title: "The S.T.O.P. Procedure", desc: "Sit, Think, Observe, Plan — your first action when lost." },
        { title: "Five Elements of Survival", desc: "Attitude, Shelter, Water, Fire, Food — the survival pyramid." },
        { title: "The Rule of Three", desc: "3 min air, 3 hrs shelter, 3 days water, 3 weeks food." },
        { title: "Psychology of Survival", desc: "A positive attitude is the most important survival tool." }
      ],
      tasks: [
        {
          type: "select", tool: "sitrepform",
          prompt: "You realize you are lost in the woods. What is the FIRST action you should take according to S.T.O.P.?",
          options: [
            { ico: "🏃", text: "Run in the direction you think is back to camp", correct: false, fb: "Running when lost leads to further disorientation and exhaustion. S.T.O.P. says SIT first." },
            { ico: "🛏\uFE0F", text: "Sit down immediately and calm yourself", correct: true, fb: "Correct! The 'S' in S.T.O.P. stands for SIT. Stop moving, sit down, and calm yourself before doing anything else. Panic kills more survivors than the elements." },
            { ico: "💧", text: "Start looking for a water source right away", correct: false, fb: "Water is important but it is not the first action. S.T.O.P. says SIT first — calm down before acting." },
            { ico: "🔥", text: "Build a fire immediately to attract attention", correct: false, fb: "Fire is important but acting before thinking leads to mistakes. S.T.O.P. says SIT and THINK first." }
          ]
        },
        {
          type: "select", tool: "compass",
          prompt: "After sitting and calming down, what does the 'O' in S.T.O.P. tell you to do?",
          options: [
            { ico: "👁\uFE0F", text: "Observe your surroundings — landmarks, water sounds, trails, weather, hazards", correct: true, fb: "Correct! OBSERVE means studying your environment: where is water, what landmarks are visible, what is the weather doing, what hazards exist, and what materials are available." },
            { ico: "🏅", text: "Organize your equipment by priority", correct: false, fb: "O stands for OBSERVE, not organize. Look at your surroundings and gather information." },
            { ico: "\u270B", text: "Walk outward in expanding circles to orient yourself", correct: false, fb: "O stands for OBSERVE, not orient. Stay put and observe from where you are — do not wander." },
            { ico: "📱", text: "Call out loudly for help", correct: false, fb: "O stands for OBSERVE. shouting wastes energy and may not reach anyone. Observe your surroundings first." }
          ]
        },
        {
          type: "order", tool: "sitrepform",
          prompt: "Arrange the five elements of survival in order of priority (most critical first).",
          items: [
            "Attitude — a positive will to survive is the foundation",
            "Shelter — protection from the elements is next",
            "Water — you need hydration within 3 days",
            "Fire — warmth, signalling, and water purification",
            "Food — you can survive weeks without it"
          ],
          correctOrder: [0, 1, 2, 3, 4],
          fb: "The five elements of survival in priority order are: Attitude, Shelter, Water, Fire, Food. Your mental attitude is the most critical — without the will to survive, nothing else matters. Shelter and water come before fire and food because exposure and dehydration kill faster than hunger."
        },
        {
          type: "select", tool: "firstaid",
          prompt: "According to the rule of three, how long can a person survive without water?",
          options: [
            { ico: "\u23F1\uFE0F", text: "3 hours", correct: false, fb: "3 hours is the survival time without shelter in extreme conditions, not without water." },
            { ico: "📅", text: "3 days", correct: true, fb: "Correct! The rule of three says you can survive 3 days without water. This is why locating and purifying water is a high priority in any survival situation." },
            { ico: "📆", text: "3 weeks", correct: false, fb: "3 weeks is the survival time without food, not without water. Water is far more urgent." },
            { ico: "\u23F0\uFE0F", text: "3 minutes", correct: false, fb: "3 minutes is the survival time without air, not without water." }
          ]
        }
      ]
    },

    {
      id: "bc_enemies",
      order: 2,
      tag: "SURVIVAL 02",
      icon: "\u26A0\uFE0F",
      title: "Seven Enemies of Survival",
      desc: "Identify and combat the seven enemies: Pain, Cold, Thirst, Hunger, Fatigue, Boredom, and Loneliness.",
      xp: 100,
      brief: "Your survival instructor covers EO M224.02 — the seven enemies of survival. These are the physical and psychological forces that erode your ability to survive: Pain, Cold, Thirst, Hunger, Fatigue, Boredom, and Loneliness. Each enemy must be recognized and actively countered. Pain and cold can be managed with first aid and shelter. Thirst and hunger require water and food sourcing. Fatigue demands rest. Boredom and loneliness are psychological enemies that can destroy your will to survive — countered by staying busy, maintaining routine, and keeping hope alive.",
      scene: "enemies",
      chapters: [
        { title: "The Seven Enemies", desc: "Pain, Cold, Thirst, Hunger, Fatigue, Boredom, Loneliness." },
        { title: "Physical Enemies", desc: "Pain, Cold, Thirst, Hunger, Fatigue — the body's enemies." },
        { title: "Psychological Enemies", desc: "Boredom and Loneliness — the mind's enemies." },
        { title: "Countering Each Enemy", desc: "Strategies to overcome every survival enemy." }
      ],
      tasks: [
        {
          type: "select", tool: "firstaid",
          prompt: "Which of the following is NOT one of the seven enemies of survival?",
          options: [
            { ico: "😵", text: "Fear", correct: true, fb: "Correct! Fear is not one of the seven enemies. The seven enemies are: Pain, Cold, Thirst, Hunger, Fatigue, Boredom, and Loneliness. Fear is related but it falls under the psychology of survival, not the seven enemies list." },
            { ico: "😰", text: "Fatigue", correct: false, fb: "Fatigue IS one of the seven enemies. It is the exhaustion that comes from prolonged physical and mental effort." },
            { ico: "😒", text: "Boredom", correct: false, fb: "Boredom IS one of the seven enemies. It is a psychological enemy that can erode your will to keep going." },
            { ico: "🧑\u200D👩\u200D👦", text: "Loneliness", correct: false, fb: "Loneliness IS one of the seven enemies. Isolation can be psychologically devastating in a survival situation." }
          ]
        },
        {
          type: "select", tool: "firekit",
          prompt: "Cold is one of the seven enemies. What is the most effective first response to combat cold?",
          options: [
            { ico: "🔥", text: "Build a fire and construct or find shelter immediately", correct: true, fb: "Correct! Cold is combated by building a fire for warmth and constructing shelter to block wind and retain heat. Hypothermia is the number one wilderness killer, so this is a top priority." },
            { ico: "🏋\uFE0F", text: "Do vigorous exercise to generate body heat", correct: false, fb: "Exercise generates heat temporarily but also causes sweating, which accelerates heat loss when the sweat evaporates. Build shelter and fire instead." },
            { ico: "🍼", text: "Drink cold water to lower your internal temperature", correct: false, fb: "Drinking cold water would make hypothermia worse. You need to warm up with fire and shelter." },
            { ico: "🚶", text: "Keep moving continuously to stay warm", correct: false, fb: "Continuous movement causes fatigue (another enemy) and sweating. Build fire and shelter for sustained warmth." }
          ]
        },
        {
          type: "select", tool: "whistle",
          prompt: "Boredom and Loneliness are psychological enemies of survival. What is the best strategy to counter them?",
          options: [
            { ico: "📝", text: "Stay busy with tasks, maintain a daily routine, and keep hope alive", correct: true, fb: "Correct! The best way to counter boredom and loneliness is to stay busy — build shelters, improve your camp, maintain fire, keep a routine, and maintain hope. An active mind and body resist psychological collapse." },
            { ico: "😴", text: "Sleep as much as possible to pass the time faster", correct: false, fb: "Excessive sleep increases vulnerability and wastes daylight hours for survival tasks. Stay busy instead." },
            { ico: "😣", text: "Focus on how unfair your situation is", correct: false, fb: "Focusing on unfairness feeds despair, which is exactly what boredom and loneliness lead to. Stay positive and busy." },
            { ico: "🚫", text: "Do nothing and wait for rescue to come", correct: false, fb: "Doing nothing feeds both boredom and loneliness. Active engagement with survival tasks is the antidote." }
          ]
        },
        {
          type: "select", tool: "firstaid",
          prompt: "Fatigue is an enemy of survival. What is the correct way to manage fatigue in the field?",
          options: [
            { ico: "😴", text: "Push through it — survival requires constant effort", correct: false, fb: "Pushing through fatigue leads to mistakes, injuries, and poor decisions. Fatigue must be managed with rest." },
            { ico: "💤", text: "Schedule regular rest periods and pace your activities", correct: true, fb: "Correct! Fatigue is managed by scheduling regular rest, pacing your activities, and not overexerting. A rested survivor makes better decisions and avoids injuries." },
            { ico: "\u2615", text: "Drink caffeine or stimulants to stay alert", correct: false, fb: "Stimulants provide false energy and lead to a crash. Proper rest and pacing are the correct approach." },
            { ico: "🍚", text: "Eat large meals to maintain energy levels", correct: false, fb: "Large meals cause sluggishness. Pacing activities with regular rest is the correct fatigue management strategy." }
          ]
        }
      ]
    },

    {
      id: "bc_shelter",
      order: 3,
      tag: "SURVIVAL 03",
      icon: "🛡\uFE0F",
      title: "Emergency Shelter Construction",
      desc: "Select a shelter site and build emergency shelters from natural and improvised materials.",
      xp: 100,
      brief: "Your survival instructor covers EO M224.04 — emergency shelters. Shelter is your protection from the elements and is a top survival priority. You will learn the difference between natural shelters (tree hollow, cave, root shelter) and improvised shelters (bough shelter, fallen trunk, lean-to, snow cave, tepee). Critical site selection factors include: elevated ground with good drainage, wind protection, proximity to water and fuel, availability of building materials, away from animal trails, visible from the air for rescue, enough time before nightfall, and entrance oriented leeward (away from prevailing wind). A well-built shelter can mean the difference between life and death.",
      scene: "shelter",
      chapters: [
        { title: "Natural Shelters", desc: "Tree hollow, cave, root shelter — use what nature provides." },
        { title: "Improvised Shelters", desc: "Bough, fallen trunk, lean-to, snow cave, tepee." },
        { title: "Site Selection", desc: "Drainage, wind, water, fuel, materials, safety." },
        { title: "Building a Debris Shelter", desc: "The most practical improvised shelter for cadets." }
      ],
      tasks: [
        {
          type: "select", tool: "tarp",
          prompt: "You need to build a shelter before nightfall. Which site factor is MOST critical for avoiding hypothermia?",
          options: [
            { ico: "🌊", text: "Elevated ground with good drainage — avoid low spots where cold air and water pool", correct: true, fb: "Correct! Elevation and drainage are critical. Cold air sinks into low areas and valleys at night, and water pools in depressions. An elevated, well-drained site prevents hypothermia from ground cold and dampness." },
            { ico: "🚂", text: "Close to a trail for easy rescue access", correct: false, fb: "Being near a trail is not a primary shelter factor. Cold air drainage is far more critical for survival." },
            { ico: "🌳", text: "Under the largest tree available for maximum cover", correct: false, fb: "Large trees provide cover but may have dead branches (widowmakers) that can fall. Drainage and elevation are more critical." },
            { ico: "🏘\uFE0F", text: "Near existing structures or campsites", correct: false, fb: "Existing structures are not a natural shelter factor. Elevation and drainage are the most critical for avoiding hypothermia." }
          ]
        },
        {
          type: "select", tool: "axe",
          prompt: "Which of the following is an IMPROVISED shelter (not a natural one)?",
          options: [
            { ico: "🌳", text: "Tree hollow", correct: false, fb: "A tree hollow is a NATURAL shelter — it already exists in nature. Improvised shelters are ones you build." },
            { ico: "🎪", text: "Cave", correct: false, fb: "A cave is a NATURAL shelter. Improvised shelters are constructed from available materials." },
            { ico: "🛗", text: "Lean-to", correct: true, fb: "Correct! A lean-to is an IMPROVISED shelter — you build it by leaning branches and materials against a ridgepole or between trees. Other improvised shelters include bough shelters, fallen trunk shelters, snow caves, and tepees." },
            { ico: "🌿", text: "Root shelter", correct: false, fb: "A root shelter (under an exposed tree root system) is a NATURAL shelter. Improvised shelters are built from scratch." }
          ]
        },
        {
          type: "select", tool: "paracord",
          prompt: "When orienting your shelter entrance, which direction should it face?",
          options: [
            { ico: "🍃", text: "Leeward — away from the prevailing wind", correct: true, fb: "Correct! The entrance should face leeward (away from the prevailing wind) to keep wind, rain, and cold air from blowing directly into your shelter. This is a critical site selection factor." },
            { ico: "🌬\uFE0F", text: "Windward — into the prevailing wind for ventilation", correct: false, fb: "Facing windward lets cold wind blow directly into your shelter, accelerating heat loss. Face leeward instead." },
            { ico: "\u2600\uFE0F", text: "Always south-facing for maximum sunlight", correct: false, fb: "While sunlight is nice, the primary consideration is wind. Face leeward regardless of compass direction." },
            { ico: "📍", text: "Direction does not matter as long as the shelter is built well", correct: false, fb: "Entrance orientation matters greatly. A well-built shelter with a windward entrance will still be cold and drafty. Face leeward." }
          ]
        },
        {
          type: "order", tool: "axe",
          prompt: "Arrange the steps for building a debris shelter in the correct order.",
          items: [
            "Find a ridgepole — a long branch or fallen sapling about 2m longer than you",
            "Prop one end of the ridgepole on a stump, rock, or low branch about waist high",
            "Lean rib branches against both sides of the ridgepole to form an A-frame skeleton",
            "Pile debris (leaves, pine needles, moss, earth) thickly over the frame for insulation"
          ],
          correctOrder: [0, 1, 2, 3],
          fb: "The correct order for building a debris shelter is: 1) Find a ridgepole, 2) Prop one end elevated, 3) Lean rib branches to form the A-frame, 4) Pile insulating debris over the frame. The debris layer should be at least 30cm thick for adequate insulation."
        }
      ]
    },

    {
      id: "bc_fire",
      order: 4,
      tag: "SURVIVAL 04",
      icon: "🔥",
      title: "Fire Lighting & Maintenance",
      desc: "Master the fire triangle, fuel types, fire lays, and safe fire lighting with flint and steel.",
      xp: 100,
      brief: "Your survival instructor covers EO M224.05 — fire. Fire provides warmth, light, morale, a way to purify water, cook food, and signal for rescue. The fire triangle is the foundation: Air (oxygen), Heat, and Fuel — remove any one and fire cannot exist. You will learn the four fuel types in order of use: Tinder (fine, fluffy, catches spark easily), Kindling (small sticks, pencil-thin), Wood Fuel (thumb to wrist-thick branches), and Bulk Firewood (larger logs for sustained heat). Fire lays include the tepee, crossbed, and crisscross (pyramid). You must also check the CFFDRS fire danger rating and always use a fire ring or pit for safety.",
      scene: "fire",
      chapters: [
        { title: "The Fire Triangle", desc: "Air (oxygen), Heat, Fuel — all three are required." },
        { title: "Fuel Types", desc: "Tinder, Kindling, Wood Fuel, Bulk Firewood — in order." },
        { title: "Fire Lays", desc: "Tepee, Crossbed, Crisscross (Pyramid) — different builds." },
        { title: "Fire Safety & CFFDRS", desc: "Fire rings, danger ratings, and extinguishing properly." }
      ],
      tasks: [
        {
          type: "select", tool: "flintsteel",
          prompt: "What are the three components of the fire triangle?",
          options: [
            { ico: "🔥", text: "Air (oxygen), Heat, Fuel", correct: true, fb: "Correct! The fire triangle consists of Air (oxygen), Heat, and Fuel. Remove any one of these three and the fire cannot exist. This principle governs all fire lighting and fire suppression." },
            { ico: "\u2744\uFE0F", text: "Water, Air, and Spark", correct: false, fb: "Water is used to EXTINGUISH fire, not sustain it. The triangle is Air, Heat, Fuel." },
            { ico: "💧", text: "Oxygen, Water, and Wood", correct: false, fb: "Water puts fire out. The fire triangle is Air (oxygen), Heat, and Fuel." },
            { ico: "\u26A1", text: "Spark, Wind, and Dry Wood", correct: false, fb: "These are related but not the triangle. The official fire triangle is Air (oxygen), Heat, and Fuel." }
          ]
        },
        {
          type: "order", tool: "tinderbox",
          prompt: "Arrange the four fuel types in the order they are added when building a fire.",
          items: [
            "Tinder — fine fluffy material that catches a spark (dry grass, birch bark, cotton)",
            "Kindling — pencil-thin sticks and small twigs that catch from tinder",
            "Wood Fuel — thumb to wrist-thick branches that sustain the flame",
            "Bulk Firewood — larger logs for long-lasting, sustained heat"
          ],
          correctOrder: [0, 1, 2, 3],
          fb: "The correct fuel order is: Tinder (catches spark) → Kindling (catches from tinder) → Wood Fuel (sustains flame) → Bulk Firewood (long-lasting heat). Each stage must be properly alight before adding the next, or you will smother the fire."
        },
        {
          type: "select", tool: "firekit",
          prompt: "Which fire lay is best for boiling water and cooking because it collapses into a flat bed of coals?",
          options: [
            { ico: "\u26E9\uFE0F", text: "Tepee fire lay", correct: false, fb: "The tepee lay is good for quick starting and a tall flame, but it does not create a flat coal bed ideal for cooking." },
            { ico: "\u2717", text: "Crossbed (log cabin) fire lay", correct: true, fb: "Correct! The crossbed (also called log cabin) fire lay is built like a square cabin with alternating layers. It burns down into a flat, even bed of coals that is ideal for cooking and boiling water." },
            { ico: "🏒", text: "Crisscross (pyramid) fire lay", correct: false, fb: "The crisscross/pyramid lay burns from the top down and is good for long-lasting heat, but the crossbed is the best for a flat cooking surface." },
            { ico: "💠", text: "Star fire lay", correct: false, fb: "The star lay pushes logs inward from a circle, but the crossbed (log cabin) is specifically best for creating a flat coal bed for cooking." }
          ]
        },
        {
          type: "select", tool: "firekit",
          prompt: "You need to completely extinguish your fire before leaving camp. What is the correct procedure?",
          options: [
            { ico: "🚶", text: "Walk away once the flames are out — the coals will cool on their own", correct: false, fb: "Never leave a fire with hot coals. Wind can reignite them and start a wildfire. You must fully extinguish it." },
            { ico: "💧", text: "Douse with water, stir the ashes, feel for heat, then fill with earth", correct: true, fb: "Correct! The proper extinguishing procedure is: 1) Douse thoroughly with water, 2) Stir the ashes to expose all hot spots, 3) Feel for residual heat with your hand, 4) Fill the pit with earth. Only when it is cold to the touch is it safe to leave." },
            { ico: "🧳", text: "Cover with sand only — no water needed", correct: false, fb: "Sand alone may not extinguish deep coals. Water, stirring, and earth are all needed for complete extinguishing." },
            { ico: "\u23F1\uFE0F", text: "Wait 30 minutes for it to burn out naturally", correct: false, fb: "Waiting does not guarantee the fire is out. Coals can stay hot for hours. Douse, stir, feel, and fill with earth." }
          ]
        }
      ]
    },

    {
      id: "bc_water",
      order: 5,
      tag: "SURVIVAL 05",
      icon: "💧",
      title: "Water Sourcing & Purification",
      desc: "Locate water sources and purify water using boiling and improvised filtration methods.",
      xp: 100,
      brief: "Your survival instructor covers water sourcing and purification. You can survive only 3 days without water, making it a critical survival priority after shelter. You will learn to locate water by observing animal tracks, bird flight patterns, vegetation, and natural drainage. Water must always be purified before drinking — even clear mountain streams can contain harmful bacteria, parasites, and contaminants. The two primary purification methods are boiling (rolling boil for at least 1 minute, 3+ minutes at altitude) and chemical purification tablets. Improvised filtration using layers of sand, charcoal, and cloth removes sediment but does NOT kill bacteria — always follow filtration with boiling or chemical treatment.",
      scene: "water",
      chapters: [
        { title: "Locating Water", desc: "Animal signs, vegetation, drainage, bird patterns." },
        { title: "Boiling", desc: "Rolling boil for 1+ minutes — the most reliable method." },
        { title: "Chemical Purification", desc: "Iodine or chlorine tablets — lightweight and effective." },
        { title: "Improvised Filtration", desc: "Sand, charcoal, cloth — removes sediment, not bacteria." }
      ],
      tasks: [
        {
          type: "select", tool: "canteen",
          prompt: "You found a clear, fast-running mountain stream. Is it safe to drink directly from it?",
          options: [
            { ico: "\u2705", text: "Yes — clear flowing water is always safe to drink", correct: false, fb: "Never assume clear water is safe. Even pristine mountain streams can contain Giardia, Cryptosporidium, and other harmful pathogens from animal waste upstream." },
            { ico: "🚫", text: "No — all water must be purified by boiling or chemical treatment before drinking", correct: true, fb: "Correct! All water from natural sources must be purified before drinking, no matter how clear it looks. Boiling for at least 1 minute (3+ at altitude) or using purification tablets kills harmful bacteria, viruses, and parasites like Giardia." },
            { ico: "👃", text: "Only if it smells clean and has no visible debris", correct: false, fb: "Smell and appearance do not indicate safety. Pathogens are invisible. All natural water must be purified." },
            { ico: "\u2728", text: "Yes, but only if you drink quickly before bacteria multiply", correct: false, fb: "Bacteria are already in the water. Drinking fast does not protect you. All water must be purified first." }
          ]
        },
        {
          type: "select", tool: "firekit",
          prompt: "What is the minimum boiling time to make water safe to drink at normal elevation?",
          options: [
            { ico: "\u23F1\uFE0F", text: "30 seconds of gentle simmering", correct: false, fb: "30 seconds is not enough. A rolling boil of at least 1 minute is needed to kill most pathogens." },
            { ico: "🔥", text: "A rolling boil for at least 1 minute (3+ minutes at altitude)", correct: true, fb: "Correct! Water must reach a rolling boil for at least 1 minute to be safe. At higher altitudes (above 2000m), boil for 3 or more minutes because water boils at a lower temperature at altitude." },
            { ico: "\u23F0\uFE0F", text: "Bring to a boil and immediately remove from heat", correct: false, fb: "Just reaching a boil is not sufficient. Maintain a rolling boil for at least 1 minute to ensure all pathogens are killed." },
            { ico: "📅", text: "10 minutes of continuous boiling", correct: false, fb: "10 minutes is excessive and wastes fuel. 1 minute of rolling boil (3+ at altitude) is the standard minimum." }
          ]
        },
        {
          type: "select", tool: "puritab",
          prompt: "You built an improvised filter using sand, charcoal, and cloth. Is the filtered water now safe to drink?",
          options: [
            { ico: "\u2705", text: "Yes — the filter removes all contaminants", correct: false, fb: "An improvised filter removes sediment and some impurities but does NOT kill bacteria, viruses, or parasites. The water is still unsafe." },
            { ico: "🚫", text: "No — filtration removes sediment but you must still boil or chemically treat it to kill pathogens", correct: true, fb: "Correct! Improvised filtration removes visible sediment and particles but does not kill microorganisms. You must ALWAYS follow filtration with boiling or chemical purification tablets to make the water truly safe to drink." },
            { ico: "🔎", text: "Only if the charcoal layer is thick enough", correct: false, fb: "Charcoal helps remove some chemicals and improves taste, but it does not kill all pathogens. Boil or chemically treat after filtering." },
            { ico: "🧲", text: "Yes, but only if the water was originally from a clean source", correct: false, fb: "Filtration alone never guarantees safety regardless of source. Always boil or chemically treat after filtering." }
          ]
        },
        {
          type: "order", tool: "canteen",
          prompt: "Arrange the steps for improvising a water filter in the correct order (bottom to top).",
          items: [
            "Place a cloth or grass layer at the bottom of a container with small holes",
            "Add a layer of fine sand on top of the cloth",
            "Add a layer of crushed charcoal on top of the sand",
            "Add another layer of fine sand on top of the charcoal, then pour water through"
          ],
          correctOrder: [0, 1, 2, 3],
          fb: "The correct filter order (bottom to top) is: cloth/grass (catches fines) → fine sand → crushed charcoal (removes chemicals and odors) → fine sand → pour water through. Remember: this filters sediment only — you must still boil or chemically treat the water to kill pathogens."
        }
      ]
    },

    {
      id: "bc_weather",
      order: 6,
      tag: "SURVIVAL 06",
      icon: "\u2601\uFE0F",
      title: "Weather Prediction & Cloud Reading",
      desc: "Predict weather changes by reading cloud formations and natural signs in the wilderness.",
      xp: 100,
      brief: "Your survival instructor covers EO M224.03 — predicting weather using cloud formations. Weather awareness is critical for survival: knowing when a storm is approaching lets you prepare shelter, secure your fire, and avoid dangerous exposure. You will learn to identify cloud types and what they signal: cirrus clouds (high, wispy, fair weather but may indicate change), cumulus clouds (fluffy, fair weather), cumulonimbus clouds (towering, thunderstorms), stratus clouds (flat grey layer, steady rain), and nimbostratus (dark grey, continuous rain). Natural signs like bird behavior, insect activity, and wind direction changes also provide weather clues.",
      scene: "weather",
      chapters: [
        { title: "Cloud Types", desc: "Cirrus, cumulus, stratus, cumulonimbus, nimbostratus." },
        { title: "Reading Cloud Signals", desc: "What each cloud type tells you about coming weather." },
        { title: "Natural Weather Signs", desc: "Bird behavior, insects, wind shifts, pressure changes." },
        { title: "Storm Preparation", desc: "Securing shelter and fire before bad weather hits." }
      ],
      tasks: [
        {
          type: "select", tool: "compass",
          prompt: "You see towering, anvil-shaped clouds building on the horizon. What weather is likely coming?",
          options: [
            { ico: "\u2600\uFE0F", text: "Clear, fair weather for the next 24 hours", correct: false, fb: "Towering anvil-shaped clouds are cumulonimbus — they indicate thunderstorms, not fair weather." },
            { ico: "\u26C8\uFE0F", text: "Thunderstorms with heavy rain, lightning, and strong winds", correct: true, fb: "Correct! Cumulonimbus clouds — tall, towering clouds with an anvil-shaped top — indicate thunderstorms are approaching. Prepare your shelter, secure your fire area, and be ready for heavy rain, lightning, and strong winds." },
            { ico: "🌧\uFE0F", text: "Light, steady drizzle for several hours", correct: false, fb: "Steady drizzle comes from stratus or nimbostratus clouds, not towering cumulonimbus. These mean thunderstorms." },
            { ico: "🍃", text: "Windy but dry conditions", correct: false, fb: "Cumulonimbus clouds bring thunderstorms with rain and lightning, not just wind. Prepare for a storm." }
          ]
        },
        {
          type: "select", tool: "compass",
          prompt: "High, thin, wispy clouds (cirrus) are spreading across the sky. What does this typically indicate?",
          options: [
            { ico: "\u2600\uFE0F", text: "Stable fair weather that will continue", correct: false, fb: "While cirrus clouds themselves mean current fair weather, their spreading often indicates a weather change is coming within 12-24 hours." },
            { ico: "🔀", text: "A weather change is likely coming within 12-24 hours", correct: true, fb: "Correct! Cirrus clouds (high, thin, wispy, horse-tail appearance) often indicate fair weather at present, but when they increase and spread across the sky, a weather change — often rain or a front — is likely within 12-24 hours." },
            { ico: "\u26C8\uFE0F", text: "An immediate thunderstorm within the hour", correct: false, fb: "Cirrus clouds indicate a slower weather change over 12-24 hours, not an immediate thunderstorm. Cumulonimbus means imminent storms." },
            { ico: "🍃", text: "Strong winds but no precipitation", correct: false, fb: "Cirrus spreading indicates a general weather change, often bringing rain. Not just wind." }
          ]
        },
        {
          type: "select", tool: "tarp",
          prompt: "Birds are flying low to the ground and insects are less active than usual. What might this signal?",
          options: [
            { ico: "\u2600\uFE0F", text: "Fair weather approaching — good conditions ahead", correct: false, fb: "Birds flying low and insects going quiet typically signal bad weather, not fair weather. Air pressure drops before a storm." },
            { ico: "🌧\uFE0F", text: "Bad weather approaching — lower air pressure drives birds and insects down", correct: true, fb: "Correct! When birds fly low and insects become less active, it often signals dropping air pressure and approaching bad weather. Many animals sense pressure changes before storms and alter their behavior accordingly." },
            { ico: "🐼", text: "Predators nearby — animals are hiding", correct: false, fb: "While possible, the combination of low-flying birds and inactive insects is a classic weather sign, not predator behavior." },
            { ico: "🍃", text: "Night is approaching and animals are settling in", correct: false, fb: "If this happens during daylight hours, it is a weather sign, not a day-night cycle indicator." }
          ]
        },
        {
          type: "select", tool: "tarp",
          prompt: "You notice dark grey, flat-layered clouds covering the entire sky. What weather should you expect?",
          options: [
            { ico: "🌧\uFE0F", text: "Continuous, steady rain for an extended period", correct: true, fb: "Correct! Nimbostratus clouds — dark grey, flat, featureless layers covering the sky — bring continuous, steady rain that can last for hours. This is different from the brief heavy downpours of thunderstorms. Prepare for prolonged wet conditions." },
            { ico: "\u26C8\uFE0F", text: "Brief, violent thunderstorm then clearing", correct: false, fb: "Brief violent storms come from cumulonimbus clouds. Dark flat layers mean steady, prolonged rain." },
            { ico: "\u2600\uFE0F", text: "Overcast but dry — no precipitation expected", correct: false, fb: "Dark grey nimbostratus clouds specifically bring rain. Lighter stratus may be dry, but dark grey means precipitation." },
            { ico: "🍃", text: "Fog and mist but no actual rainfall", correct: false, fb: "Dark grey flat clouds (nimbostratus) bring actual rain, not just fog. Prepare for steady precipitation." }
          ]
        }
      ]
    },

    {
      id: "bc_forage",
      order: 7,
      tag: "SURVIVAL 07",
      icon: "🌿",
      title: "Foraging Awareness & Safe Food",
      desc: "Distinguish safe from unsafe wild plants and understand the universal edibility test.",
      xp: 100,
      brief: "Your survival instructor covers foraging awareness. Food is the lowest survival priority — you can survive weeks without it — but it provides energy and morale. The golden rule of foraging is absolute: if you cannot identify a plant with 100% certainty, do not eat it. Many poisonous plants look similar to edible ones. You will learn to identify common safe plants, recognize dangerous ones, and understand the universal edibility test for uncertain plants. Berries, roots, nuts, and certain greens can supplement survival rations, but mistakes can be fatal. When in doubt, go without.",
      scene: "forage",
      chapters: [
        { title: "The Golden Rule", desc: "If you cannot identify it with certainty, do not eat it." },
        { title: "Safe Plant Identification", desc: "Common edible wild plants in Canadian terrain." },
        { title: "Dangerous Plants", desc: "Poisonous look-alikes and what to avoid." },
        { title: "Universal Edibility Test", desc: "A step-by-step method for uncertain plants." }
      ],
      tasks: [
        {
          type: "select", tool: "knife",
          prompt: "You find an unfamiliar berry. You think it might be edible but are not 100% certain. What should you do?",
          options: [
            { ico: "🍆", text: "Eat a small amount and wait to see if you get sick", correct: false, fb: "Eating an unknown berry without proper testing is dangerous. Even a small amount of some toxins can be fatal. Use the universal edibility test or do not eat it." },
            { ico: "🚫", text: "Do not eat it — if you cannot identify it with 100% certainty, leave it alone", correct: true, fb: "Correct! The golden rule of foraging is absolute: if you cannot identify a plant with 100% certainty, do not eat it. Food is the lowest survival priority (you can survive weeks without it), so the risk of poisoning is never worth taking." },
            { ico: "🐵", text: "Feed it to an animal first — if they eat it, it is safe for you", correct: false, fb: "Animals have different digestive systems. Many plants toxic to humans are safely eaten by birds and animals. This is not a reliable test." },
            { ico: "👃", text: "Smell it — if it smells good, it is safe to eat", correct: false, fb: "Smell is not a reliable indicator of safety. Some toxic plants smell pleasant. Only eat what you can identify with certainty." }
          ]
        },
        {
          type: "select", tool: "knife",
          prompt: "Which of the following is a general warning sign that a wild plant may be poisonous?",
          options: [
            { ico: "🌾", text: "Milky sap or bitter, soapy taste when tested on the lips", correct: true, fb: "Correct! General warning signs of poisonous plants include: milky sap, bitter or soapy taste, almond scent (cyanide), spines or thorns, and plants with umbrella-shaped flower clusters. These are not absolute rules but strong caution signals." },
            { ico: "🌼", text: "Bright yellow flowers — yellow always means toxic", correct: false, fb: "Flower color is not a reliable indicator. Many safe plants have yellow flowers. Milky sap and bitter taste are better warning signs." },
            { ico: "🌿", text: "Growing near water — water plants are always poisonous", correct: false, fb: "Many water plants are edible. Location alone does not indicate toxicity. Milky sap and bitter taste are better warning signs." },
            { ico: "🍃", text: "Having large leaves — large-leafed plants are unsafe", correct: false, fb: "Leaf size does not indicate toxicity. Many edible plants have large leaves. Milky sap and bitter taste are the warning signs to watch for." }
          ]
        },
        {
          type: "select", tool: "sitrepform",
          prompt: "In the survival priorities (rule of three), where does food rank compared to other needs?",
          options: [
            { ico: "👍", text: "Food is the highest priority — you need energy to survive", correct: false, fb: "Food is actually the LOWEST priority. You can survive 3 weeks without food. Attitude, shelter, and water come first." },
            { ico: "💧", text: "Food is the second priority, right after water", correct: false, fb: "Food is lower than second. The priority order is: attitude, shelter, water, fire, then food. You can go 3 weeks without food." },
            { ico: "📅", text: "Food is the lowest priority — you can survive 3 weeks without it", correct: true, fb: "Correct! Food is the lowest survival priority. The rule of three says you can survive 3 weeks without food, compared to 3 days without water and 3 hours without shelter in extreme conditions. Focus on shelter and water first." },
            { ico: "\u270B", text: "Food is a middle priority — equal to fire", correct: false, fb: "Food is lower than fire. Fire provides warmth, signalling, and water purification. Food only provides energy, and you can survive weeks without it." }
          ]
        },
        {
          type: "select", tool: "knife",
          prompt: "When applying the universal edibility test, what is the first step after separating the plant into parts?",
          options: [
            { ico: "👃", text: "Smell the plant for almond or acidic odors (signs of cyanide or acid)", correct: true, fb: "Correct! The universal edibility test begins by separating the plant into parts (leaves, stems, roots, flowers), then smelling each part for almond or acidic odors which can indicate cyanide or acid. If it smells of almonds, do not eat it. Further steps include testing on skin, then lips, tongue, and finally swallowing a small amount with an 8-hour wait." },
            { ico: "👄", text: "Eat a large quantity immediately to test the effects", correct: false, fb: "Never eat a large quantity of an unknown plant. The test is gradual — smell, skin contact, lip contact, tongue, then small swallow with a wait period." },
            { ico: "🔧", text: "Cook the plant first to neutralize any toxins", correct: false, fb: "Cooking does not neutralize all toxins. The first step is smelling for dangerous odors, then gradual contact testing." },
            { ico: "🐼", text: "Feed it to a small animal and observe for 24 hours", correct: false, fb: "Animals process toxins differently than humans. The test uses gradual human contact: smell, skin, lip, tongue, swallow with wait." }
          ]
        }
      ]
    },

    {
      id: "bc_signal",
      order: 8,
      tag: "SURVIVAL 08",
      icon: "🚧",
      title: "Rescue Signalling & SITREP",
      desc: "Master universal distress signals, ground-to-air codes, and signal for rescue to complete your survival training.",
      xp: 100,
      brief: "Your survival instructor covers EO M224.06 — signalling for rescue. Once your immediate survival needs are met (shelter, fire, water), signalling becomes the path home. The universal distress signal is THREE of anything — three whistle blasts, three mirror flashes, three fires in a row. You will learn the signalling devices: flares, signal mirrors, whistles, radios and cell phones, and fire/smoke signals. Ground-to-air signals are symbols marked on the ground (each 1m wide by 8m long, placed 3m apart) that aircraft can read. Three fires arranged in a triangle 35 metres apart is an internationally recognized distress signal visible from the air.",
      scene: "signal",
      chapters: [
        { title: "Universal Distress Signal", desc: "Three of anything — whistles, flashes, fires." },
        { title: "Signalling Devices", desc: "Flares, mirrors, whistles, radios, fire and smoke." },
        { title: "Ground-to-Air Signals", desc: "Standard symbols: 1m wide, 8m long, 3m apart." },
        { title: "Three Fires in a Triangle", desc: "Three fires 35m apart — visible from the air." }
      ],
      tasks: [
        {
          type: "select", tool: "whistle",
          prompt: "What is the universal distress signal pattern?",
          options: [
            { ico: "💙", text: "One long continuous signal", correct: false, fb: "One continuous signal is not the universal distress pattern. The universal pattern is three signals." },
            { ico: "\uFE0F\u2755", text: "Two short signals repeated", correct: false, fb: "Two signals is not the distress pattern. The universal distress signal is THREE of anything." },
            { ico: "\uFE0F\u2755\uFE0F\u2755\uFE0F", text: "Three signals in a row — three whistle blasts, three flashes, or three fires", correct: true, fb: "Correct! The universal distress signal is THREE of anything: three whistle blasts, three mirror flashes, three gunshots, or three fires. This pattern is internationally recognized as a distress call. Three evenly spaced fires in a triangle is a standard aerial distress signal." },
            { ico: "💙\uFE0F\u2755", text: "Alternating long and short signals", correct: false, fb: "Alternating signals is not the standard pattern. The universal distress signal is THREE signals in a row." }
          ]
        },
        {
          type: "select", tool: "signalmirror",
          prompt: "You want to signal an aircraft overhead using fire. What is the internationally recognized distress fire signal?",
          options: [
            { ico: "🔥", text: "One large signal fire in a clearing", correct: false, fb: "One fire alone may not be recognized as a distress signal. The international standard is three fires." },
            { ico: "🔥\uFE0F\u2755\uFE0F\u2755", text: "Two fires placed 10 metres apart", correct: false, fb: "Two fires is not the standard distress signal. The international standard is three fires in a triangle." },
            { ico: "\uFE0F\u2755\uFE0F\u2755\uFE0F", text: "Three fires arranged in a triangle, 35 metres apart", correct: true, fb: "Correct! Three fires arranged in a triangle, spaced 35 metres apart, is the internationally recognized aerial distress signal. This pattern is clearly visible from aircraft and distinguishes a distress signal from a campfire or natural fire." },
            { ico: "🔥\uFE0F\u2755\uFE0F\u2755\uFE0F\u2755", text: "Four fires in a straight line", correct: false, fb: "Four fires in a line is not the standard. Three fires in a triangle, 35m apart, is the international distress signal." }
          ]
        },
        {
          type: "select", tool: "signalmirror",
          prompt: "What are the standard dimensions for ground-to-air signal symbols?",
          options: [
            { ico: "📏", text: "1 metre wide and 8 metres long, placed 3 metres apart", correct: true, fb: "Correct! Ground-to-air signal symbols should be 1 metre wide and 8 metres long, with individual symbols placed 3 metres apart. This size ensures visibility from searching aircraft. Symbols include V (require assistance), X (require medical assistance), and arrows for direction." },
            { ico: "📏", text: "50cm wide and 2 metres long, placed 1 metre apart", correct: false, fb: "These dimensions are too small to be reliably seen from aircraft. The standard is 1m wide, 8m long, 3m apart." },
            { ico: "📏", text: "3 metres wide and 10 metres long, placed 5 metres apart", correct: false, fb: "These dimensions are larger than needed and hard to construct. The standard is 1m wide, 8m long, 3m apart." },
            { ico: "📏", text: "Any size as long as the symbol is recognizable", correct: false, fb: "While recognizability matters, there are standard dimensions for reliable aircraft visibility: 1m wide, 8m long, 3m apart." }
          ]
        },
        {
          type: "select", tool: "sitrepform",
          prompt: "You have secured shelter, fire, and water. What should you do next to maximize your chance of rescue?",
          options: [
            { ico: "🚤", text: "Stay at your camp and set up multiple signal methods — three fires, ground symbols, and a signal mirror ready", correct: true, fb: "Correct! Once your survival basics are secured, focus on signalling. Stay at your shelter (it provides protection and is a landmark), prepare three fires for aerial distress, lay out ground-to-air signal symbols, and keep a signal mirror and whistle ready. Multiple signal methods increase your chances of being spotted by rescuers." },
            { ico: "🚶", text: "Leave your shelter and walk in the direction you think civilization is", correct: false, fb: "Leaving a secure shelter reduces your chances of rescue. Rescuers search last-known locations. Stay put and signal." },
            { ico: "🍀", text: "Focus entirely on foraging food to maintain energy while waiting", correct: false, fb: "Food is the lowest priority. Once shelter, fire, and water are secured, signalling is the next critical step to getting rescued." },
            { ico: "😴", text: "Sleep and conserve energy — rescue will come eventually", correct: false, fb: "Passive waiting reduces rescue chances. Actively prepare and maintain signal systems while your basic needs are met." }
          ]
        }
      ]
    }
  ];

  // ==========================================================
  // BUSHCRAFT BADGES (auto-generated from MISSIONS)
  // ==========================================================
  const BUSHCRAFT_BADGES = MISSIONS.map(m => ({
    id: m.id,
    mission: m.id,
    name: m.title,
    icon: m.icon,
    tag: m.tag
  }));

  // ==========================================================
  // LEARN ARTICLES — Bushcraft & Survival knowledge base
  // ==========================================================
  const LEARN_ARTICLES = [
    {
      id: "la_stop", icon: "🤔", tag: "SURVIVAL 01",
      title: "The S.T.O.P. Procedure",
      desc: "The first action every survivor must take when lost or stranded.",
      body: "<p>The <strong>S.T.O.P.</strong> procedure is the foundational survival response when you realize you are lost or in trouble. Each letter represents a critical step:</p><p><strong>S — Sit:</strong> The moment you realize you are lost, stop moving and sit down. Panic is your biggest enemy at this moment. Sitting prevents you from running deeper into danger and gives you time to calm your breathing and heart rate.</p><p><strong>T — Think:</strong> Once calm, think about how you got here. What was your last known position? What resources do you have? What are the threats? Do not rush — good decisions come from clear thinking.</p><p><strong>O — Observe:</strong> Study your surroundings. Where is water? What landmarks are visible? What is the weather doing? What natural materials are available for shelter and fire? What hazards exist? Observation is information gathering.</p><p><strong>P — Plan:</strong> Based on your thinking and observation, make a plan. Prioritize by the rule of three. Decide whether to stay put (usually best) or move. Assign tasks. A plan gives you purpose and direction, which fights the psychological enemies of boredom and loneliness.</p>"
    },
    {
      id: "la_enemies", icon: "\u26A0\uFE0F", tag: "SURVIVAL 02",
      title: "The Seven Enemies of Survival",
      desc: "Pain, Cold, Thirst, Hunger, Fatigue, Boredom, and Loneliness.",
      body: "<p>The <strong>seven enemies of survival</strong> are the physical and psychological forces that erode your ability to survive. Each must be recognized and actively countered:</p><p><strong>Pain:</strong> Injuries cause pain that can overwhelm your judgment. Treat injuries with first aid, immobilize sprains, and manage pain so you can think clearly and act effectively.</p><p><strong>Cold:</strong> Hypothermia is the number one wilderness killer. Counter cold with shelter, fire, dry clothing, and insulation from the ground. Never let yourself stay wet and exposed.</p><p><strong>Thirst:</strong> You can survive only 3 days without water. Locate and purify water early. Ration sweat, not water — drink when you have it.</p><p><strong>Hunger:</strong> You can survive 3 weeks without food, so it is the lowest priority. But hunger saps energy and morale. Forage safely only when you can identify plants with 100% certainty.</p><p><strong>Fatigue:</strong> Exhaustion leads to mistakes and injuries. Schedule rest, pace your activities, and sleep when safe. A rested survivor makes better decisions.</p><p><strong>Boredom:</strong> Idle time in survival can be psychologically devastating. Stay busy with camp improvements, fire tending, signaling preparation, and routine tasks.</p><p><strong>Loneliness:</strong> Isolation erodes the will to live. Maintain hope, talk to yourself, keep a journal, and set daily goals. Your mental attitude is the most important survival tool you have.</p>"
    },
    {
      id: "la_rule3", icon: "\uFE0F\u2755\uFE0F\u2755\uFE0F", tag: "SURVIVAL 01",
      title: "The Rule of Three",
      desc: "Survival time limits: 3 minutes, 3 hours, 3 days, 3 weeks.",
      body: "<p>The <strong>rule of three</strong> is a simple mnemonic that establishes survival priorities based on how long you can survive without each need:</p><p><strong>3 minutes without air:</strong> Oxygen is the most immediate need. In drowning, suffocation, or blocked airway situations, you have approximately 3 minutes.</p><p><strong>3 hours without shelter:</strong> In extreme conditions (freezing cold, intense heat, storm), you can survive about 3 hours without adequate shelter. This makes shelter your highest physical priority after air.</p><p><strong>3 days without water:</strong> Dehydration becomes critical after 3 days. Water sourcing and purification must happen early in your survival timeline.</p><p><strong>3 weeks without food:</strong> You can survive approximately 3 weeks without food. This makes food the lowest survival priority — you have time to figure it out after shelter, water, and fire are secured.</p><p>This rule directly informs the five elements of survival priority: Attitude, Shelter, Water, Fire, Food. Your mental attitude underpins everything, shelter addresses the 3-hour limit, water the 3-day limit, and food the 3-week limit.</p>"
    },
    {
      id: "la_shelters", icon: "🛡\uFE0F", tag: "SURVIVAL 03",
      title: "Emergency Shelter Types",
      desc: "Natural and improvised shelters for wilderness survival.",
      body: "<p>Emergency shelters fall into two categories: <strong>natural</strong> (already existing) and <strong>improvised</strong> (you build them).</p><p><strong>Natural Shelters:</strong></p><p><strong>Tree hollow:</strong> A large hollow tree or space beneath exposed roots provides instant wind and rain protection.</p><p><strong>Cave:</strong> Caves offer excellent shelter but check for occupancy (bears, bats) and ensure adequate ventilation if you build a fire inside.</p><p><strong>Root shelter:</strong> The space beneath a fallen tree's exposed root ball creates a natural windbreak and roof frame.</p><p><strong>Improvised Shelters:</strong></p><p><strong>Bough shelter:</strong> Lean evergreen boughs against a low branch or fallen log for a simple, quick shelter.</p><p><strong>Fallen trunk shelter:</strong> A fallen tree trunk serves as a ridgepole — lean branches and debris against it to form a lean-to.</p><p><strong>Lean-to:</strong> A ridgepole between two trees or on a branch, with ribs leaned against it. Open on one side, best with a reflector fire.</p><p><strong>Snow cave:</strong> Dig into a deep snowdrift. Critical: create a cold air sink below the sleeping platform and a ventilation hole.</p><p><strong>Tepee:</strong> Three or more long poles tied at the top and spread at the base, covered with bark, boughs, or a tarp. More work but very effective.</p>"
    },
    {
      id: "la_shelter_site", icon: "📍", tag: "SURVIVAL 03",
      title: "Shelter Site Selection",
      desc: "The critical factors for choosing where to build your survival shelter.",
      body: "<p>Choosing the right shelter site is as important as the shelter itself. Key factors to evaluate:</p><p><strong>Elevation and drainage:</strong> Choose elevated ground. Cold air sinks into valleys and depressions at night. Avoid low spots where water pools during rain. This is the most critical factor for avoiding hypothermia.</p><p><strong>Wind protection:</strong> Look for natural windbreaks — hills, large rocks, or dense trees. The entrance should face leeward (away from the prevailing wind).</p><p><strong>Water proximity:</strong> Be near a water source but not so close that you risk flooding or contamination. About 60 metres is a good balance.</p><p><strong>Fuel proximity:</strong> Ensure adequate firewood and building materials are nearby. Carrying materials long distances wastes energy.</p><p><strong>Building materials:</strong> Check that the site has enough branches, boughs, leaves, and debris for your shelter type.</p><p><strong>Avoid animal trails:</strong> Do not build on or near animal paths. You do not want wildlife walking through your camp at night.</p><p><strong>Aircraft visibility:</strong> If you want to be rescued, choose a site visible from the air. Open areas near tree lines are good.</p><p><strong>Time before nightfall:</strong> Only build as much shelter as you can complete before dark. A simple shelter finished before night beats an elaborate one left incomplete.</p><p><strong>Beware widowmakers:</strong> Check above your site for dead branches or trees that could fall in wind. These are called widowmakers for a reason.</p>"
    },
    {
      id: "la_fire_triangle", icon: "🔥", tag: "SURVIVAL 04",
      title: "The Fire Triangle",
      desc: "Air, Heat, and Fuel — the three elements every fire requires.",
      body: "<p>The <strong>fire triangle</strong> is the fundamental principle of fire science. Fire requires three elements, and removing any one will extinguish the fire:</p><p><strong>Air (Oxygen):</strong> Fire needs oxygen to burn. This is why you build fire lays with gaps for airflow. Smothering a fire deprives it of oxygen — this is how a fire blanket or sand extinguishes flames. Too much wind can also blow out a small fire before it establishes.</p><p><strong>Heat:</strong> Heat is the energy that sustains the chemical reaction of combustion. Your spark from flint and steel provides initial heat. Once burning, the fire generates its own heat. Remove heat (with water, which cools) and the fire dies.</p><p><strong>Fuel:</strong> Fuel is what burns. In survival, this means wood in progressively larger sizes. Remove the fuel and the fire goes out — this is why you clear the area around your fire ring of combustible material.</p><p>Understanding the triangle helps you both build fires (provide all three) and extinguish them (remove one or more). Water removes heat and oxygen. Stirring exposes all hot spots. Earth smothers oxygen. A properly built fire lay ensures adequate airflow to all fuel.</p>"
    },
    {
      id: "la_fuel_types", icon: "🧴", tag: "SURVIVAL 04",
      title: "Fire Fuel Types and Order",
      desc: "Tinder, kindling, wood fuel, and bulk firewood — added in sequence.",
      body: "<p>Building a fire requires adding fuel in order from finest to coarsest. Each stage must be properly alight before adding the next:</p><p><strong>1. Tinder:</strong> The finest, most combustible material. Catches a spark or small flame easily. Examples: dry grass, birch bark, cedar bark shavings, dry pine needles, cotton, cattail fluff, feather sticks (wood shavings left attached to a stick). Tinder must be dry and fluffy to catch the initial spark.</p><p><strong>2. Kindling:</strong> Pencil-thin sticks and small twigs, about the thickness of a pencil or your little finger. Catches fire from the burning tinder. Gather a generous bundle — not enough kindling is the most common reason fires fail. Dead twigs snapped from the lower branches of standing trees are usually driest.</p><p><strong>3. Wood Fuel:</strong> Thumb to wrist-thick branches. These catch from the kindling and create a sustained flame with good heat output. This is your primary fuel for cooking and warmth.</p><p><strong>4. Bulk Firewood:</strong> Larger logs that burn slowly and provide long-lasting heat. Added once the fire is well established. For overnight warmth, you need enough bulk firewood to last the night.</p><p><strong>Feather sticks:</strong> When wood is wet, make feather sticks by shaving a dry stick (split open to find dry wood inside) with many curls left attached. The thin curls catch fire easily even in damp conditions.</p>"
    },
    {
      id: "la_fire_lays", icon: "\u2757", tag: "SURVIVAL 04",
      title: "Fire Lays: Tepee, Crossbed, and Crisscross",
      desc: "Different fire arrangements for different purposes.",
      body: "<p>A <strong>fire lay</strong> is the arrangement of fuel for a fire. Each lay has different advantages:</p><p><strong>Tepee Fire Lay:</strong> Arrange kindling in a cone or tepee shape over the tinder, with larger sticks forming the outer tepee. The tepee shape funnels heat upward and helps the fire catch quickly. Good for quick starting and a tall, visible flame. Best for initial fire establishment and signalling. Collapses inward as it burns.</p><p><strong>Crossbed (Log Cabin) Fire Lay:</strong> Build like a log cabin — lay two parallel sticks, then two perpendicular on top, alternating layers. Creates a stable structure with good airflow. Burns down into a flat, even bed of coals that is ideal for cooking and boiling water. The flat coal bed supports pots and pans evenly.</p><p><strong>Crisscross (Pyramid) Fire Lay:</strong> Lay the largest logs on the bottom in a crisscross pattern, then progressively smaller layers on top, with tinder and kindling at the very top. Burns from the top down. Provides long-lasting, sustained heat with minimal tending. Good for overnight warmth — the fire burns slowly downward through the fuel.</p><p>Choose your fire lay based on your need: tepee for quick start and signalling, crossbed for cooking, crisscross for long-lasting overnight heat.</p>"
    },
    {
      id: "la_cffdrs", icon: "🟠", tag: "SURVIVAL 04",
      title: "CFFDRS Fire Danger Ratings",
      desc: "Canadian Forest Fire Danger Rating System — check before lighting any fire.",
      body: "<p>The <strong>Canadian Forest Fire Danger Rating System (CFFDRS)</strong> rates wildfire risk on a scale. Always check the current rating before lighting any fire in the field:</p><p><strong>Low (Blue):</strong> Fire risk is low. Fires are unlikely to start and spread. Safe for controlled fires with standard precautions.</p><p><strong>Moderate (Green):</strong> Some fire risk exists. Fires can start but spread slowly. Use caution, keep fires small and contained in fire rings.</p><p><strong>High (Yellow):</strong> Significant fire risk. Fires start easily and spread at a moderate rate. Only light fires if absolutely necessary, keep them small, and maintain constant supervision.</p><p><strong>Very High (Orange):</strong> Dangerous fire conditions. Fires start very easily and spread rapidly. Avoid lighting fires unless it is a survival emergency. If you must, use minimal fuel and keep water nearby.</p><p><strong>Extreme (Red):</strong> Critical fire danger. Fires start instantly and spread explosively. No open flames should be permitted under any circumstances. A single spark can cause a catastrophic wildfire. Use alternative warming methods if possible.</p><p>Always use a fire ring or pit, clear the surrounding area of combustible material to a radius of at least 1.5 metres, and keep water and earth nearby for extinguishing. Never leave a fire unattended.</p>"
    },
    {
      id: "la_water_purify", icon: "💧", tag: "SURVIVAL 05",
      title: "Water Purification Methods",
      desc: "Boiling, chemical treatment, and filtration for safe drinking water.",
      body: "<p>All water from natural sources must be purified before drinking. Even clear, fast-running streams can contain <strong>Giardia</strong>, <strong>Cryptosporidium</strong>, bacteria, and viruses from animal waste upstream.</p><p><strong>Boiling (most reliable):</strong> Bring water to a rolling boil for at least <strong>1 minute</strong>. At altitudes above 2,000 metres, boil for <strong>3 or more minutes</strong> because water boils at a lower temperature at altitude. Boiling kills all pathogens — bacteria, viruses, and parasites. This is the most reliable method available in the field.</p><p><strong>Chemical Purification:</strong> Iodine or chlorine dioxide tablets kill most pathogens. Follow the package instructions for dosage and wait time (typically 20-30 minutes, longer for cold water). Lightweight and easy to carry. Some tablets leave a taste — neutralizing tablets can help. Less effective against Cryptosporidium than boiling.</p><p><strong>Improvised Filtration:</strong> Build a filter by layering (bottom to top): cloth or grass, fine sand, crushed charcoal, fine sand. Pour water through. This removes sediment, debris, and some chemicals, and improves taste. <strong>However, filtration does NOT kill bacteria or parasites.</strong> Always follow filtration with boiling or chemical treatment.</p><p><strong>Never</strong> assume clear water is safe. <strong>Never</strong> drink from a natural source without purification. The consequences of waterborne illness in a survival situation — diarrhea, vomiting, dehydration — can be fatal.</p>"
    },
    {
      id: "la_water_find", icon: "🔍", tag: "SURVIVAL 05",
      title: "Finding Water in the Wilderness",
      desc: "How to locate water sources using natural signs.",
      body: "<p>Water is your third survival priority. Here are methods to locate water in the wild:</p><p><strong>Animal signs:</strong> Animal trails often lead to water. Follow them downhill, especially if multiple trails converge. Grazing animals typically drink at dawn and dusk.</p><p><strong>Bird flight patterns:</strong> Birds, especially waterfowl, often fly toward water at dawn and away at dusk. Follow their flight direction at these times.</p><p><strong>Vegetation:</strong> Lush, green vegetation in an otherwise dry area indicates water nearby. Willows, cottonwoods, and cattails grow near water. Dig near their roots in dry stream beds — water may be just below the surface.</p><p><strong>Natural drainage:</strong> Follow ravines, gullies, and valley floors downhill. Water flows to the lowest point. Dry stream beds may have water beneath the surface — dig in the lowest outside bend.</p><p><strong>Dew collection:</strong> In the absence of flowing water, collect morning dew by wiping grass and leaves with a clean cloth, then wringing it into a container. This can provide significant water in dew-heavy areas.</p><p><strong>Snow and ice:</strong> Melt snow or ice for water. Prefer ice over snow — it yields more water per volume. Always melt before drinking to avoid lowering your core temperature.</p><p><strong>Beware:</strong> Avoid water with unusual color, odor, or foam. Avoid water downstream of mines, settlements, or agricultural areas. And always purify before drinking.</p>"
    },
    {
      id: "la_clouds", icon: "\u2601\uFE0F", tag: "SURVIVAL 06",
      title: "Reading Cloud Formations",
      desc: "Cloud types and what they predict about coming weather.",
      body: "<p>Cloud reading is an essential survival weather prediction skill:</p><p><strong>Cirrus:</strong> High, thin, wispy clouds (horse-tail appearance). Made of ice crystals at high altitude. Indicate fair weather at present, but if they increase and spread, a weather change (often rain) is likely within 12-24 hours.</p><p><strong>Cumulus:</strong> Fluffy, cotton-ball clouds with flat bases. Indicate fair, calm weather. If they remain small and isolated, good weather continues. If they grow vertically into towering cumulonimbus, storms are coming.</p><p><strong>Cumulonimbus:</strong> Towering clouds that build to great heights with an anvil-shaped top. These are thunderstorm clouds. Expect heavy rain, lightning, strong winds, and possibly hail. Seek shelter immediately when you see these building.</p><p><strong>Stratus:</strong> Flat, grey, featureless cloud layer covering the sky. May produce light drizzle or no precipitation. Indicates stable but gloomy conditions.</p><p><strong>Nimbostratus:</strong> Dark grey, thick, flat layer. Brings continuous, steady rain that can last for hours. Unlike thunderstorms, this is prolonged, moderate rainfall.</p><p><strong>Altocumulus:</strong> Mid-level puffy clouds in patches or rolls. If seen on a warm, sticky morning, may indicate thunderstorms later in the day.</p><p>Combine cloud reading with natural signs: birds flying low (dropping pressure), insects going quiet before rain, wind direction shifts, and the smell of rain approaching.</p>"
    },
    {
      id: "la_foraging", icon: "🌿", tag: "SURVIVAL 07",
      title: "Foraging Safety and the Golden Rule",
      desc: "The absolute rule: if you cannot identify it with 100% certainty, do not eat it.",
      body: "<p><strong>The Golden Rule of foraging:</strong> If you cannot identify a plant with 100% certainty, do not eat it. This rule is absolute and has no exceptions. Food is your lowest survival priority — you can survive 3 weeks without it — so the risk of poisoning is never justified.</p><p><strong>General warning signs of poisonous plants:</strong></p><p>Milky sap (many toxic plants exude white sap), bitter or soapy taste when tested on the lips, almond scent (indicates cyanide), plants with spines or thorns on leaves or stems, and umbrella-shaped flower clusters (some of the most toxic plants, like water hemlock, have these).</p><p><strong>The Universal Edibility Test:</strong> For plants you suspect are edible but cannot confirm:</p><p>1. Separate the plant into parts (leaves, stems, roots, flowers, buds). Test only one part at a time.</p><p>2. Smell each part for almond or acidic odors. If detected, do not eat.</p><p>3. Place a small piece on the inside of your elbow or wrist for 15 minutes. If skin irritation occurs, do not eat.</p><p>4. If no irritation, place a small piece on your lips for 3 minutes. If burning or irritation occurs, do not eat.</p><p>5. If no reaction, place a small piece on your tongue for 15 minutes without chewing. If irritation occurs, spit it out.</p><p>6. If no reaction, chew thoroughly but do not swallow for 15 minutes. If irritation occurs, spit it out.</p><p>7. If no reaction, swallow the chewed plant. Wait 8 hours. Do not eat or drink anything else.</p><p>8. If no stomach upset after 8 hours, eat a small amount (about 1/4 cup). Wait another 8 hours. If still no reaction, the plant part is likely safe.</p>"
    },
    {
      id: "la_distress", icon: "🚧", tag: "SURVIVAL 08",
      title: "Universal Distress Signals",
      desc: "Three of anything — the international pattern for help.",
      body: "<p>The <strong>universal distress signal</strong> is <strong>three of anything</strong>. This pattern is internationally recognized:</p><p><strong>Three whistle blasts:</strong> Blow three sharp blasts on your survival whistle, pause, then repeat. A whistle carries much farther than a voice and uses less energy.</p><p><strong>Three mirror flashes:</strong> Flash a signal mirror three times toward aircraft or distant observers. The mirror flash can be seen for many kilometres on a sunny day.</p><p><strong>Three fires:</strong> Three fires arranged in a <strong>triangle</strong>, spaced <strong>35 metres apart</strong>, is an internationally recognized aerial distress signal. This is clearly distinguishable from a single campfire or natural fire.</p><p><strong>Three gunshots:</strong> If you have a firearm, three shots in succession signals distress. (Use only if safe and legal.)</p><p><strong>Three piles of smoke:</strong> Three separate smoky fires (add green branches to produce white smoke) are visible from the air during daylight.</p><p><strong>Ground-to-air signal symbols:</strong> Mark symbols on open ground using rocks, logs, or trenches. Each symbol should be <strong>1 metre wide and 8 metres long</strong>, with symbols placed <strong>3 metres apart</strong>. Key symbols: <strong>V</strong> (require assistance), <strong>X</strong> (require medical assistance), <strong>F</strong> (need food and water), <strong>arrow</strong> (proceeding in this direction).</p>"
    },
    {
      id: "la_signal_devices", icon: "📱", tag: "SURVIVAL 08",
      title: "Signalling Devices and Methods",
      desc: "Flares, mirrors, whistles, radios, and fire/smoke signals.",
      body: "<p>Once survival basics are secured, signalling for rescue becomes the priority. Know your signalling options:</p><p><strong>Signal Mirror:</strong> One of the most effective daylight signals. Aim the reflected sun beam at aircraft or distant searchers using the sighting hole. Can be seen for 10+ kilometres. Practice aiming before you need it. Even a CD or polished metal can work as an improvised mirror.</p><p><strong>Whistle:</strong> A survival whistle carries much farther than a shout (up to 1 kilometre) and requires far less energy. The standard distress pattern is three blasts. Always carry a whistle on your person.</p><p><strong>Flares:</strong> Aerial flares and hand-held flares are extremely bright and unmistakable. They are effective day or night but have limited duration (seconds to minutes). Use them only when you see or hear potential rescuers. Store carefully — they are hazardous.</p><p><strong>Radios and Cell Phones:</strong> If you have a working radio or cell phone with signal, call for help. Even a text message may go through when voice calls cannot. Conserve battery. In Canada, channel 16 on VHF marine radio is the distress channel.</p><p><strong>Fire and Smoke:</strong> A smoky fire (add green branches, leaves, or rubber to produce thick smoke) is visible from the air during daylight. A bright fire is visible at night. Three fires in a triangle, 35 metres apart, is the international aerial distress signal.</p><p><strong>Ground signals:</strong> Spell out SOS or lay ground-to-air symbol markers in open areas. Make them large: 1m wide, 8m long, 3m apart. Use contrasting materials (light rocks on dark ground or vice versa).</p><p><strong>Contrast and movement</strong> attract attention. Wave a brightly colored item. Move in an unnatural pattern (not like an animal). Anything that stands out from the natural environment helps rescuers spot you.</p>"
    },
    {
      id: "la_extinguish", icon: "🛑", tag: "SURVIVAL 04",
      title: "Properly Extinguishing a Fire",
      desc: "Douse, stir, feel, and fill — the complete extinguishing procedure.",
      body: "<p>Extinguishing a fire properly is as important as lighting it safely. A fire that is not fully extinguished can reignite and start a wildfire. The correct procedure:</p><p><strong>Step 1 — Douse:</strong> Pour water over the entire fire, covering all coals and ashes. Use enough water to thoroughly soak the fire bed. You will hear hissing as water hits hot coals — keep pouring until the hissing stops.</p><p><strong>Step 2 — Stir:</strong> Use a stick to stir the ashes and coals. This exposes hot spots that were buried under the surface. Break up any clumped coals. You may find still-hot embers buried in the ash — these must be exposed and doused.</p><p><strong>Step 3 — Feel:</strong> Hold the back of your hand near the ashes (do not touch directly). If you feel heat, there are still hot spots. Douse with more water and stir again. Repeat until you feel no heat radiating from the ashes.</p><p><strong>Step 4 — Fill:</strong> Once the fire is completely cold, fill the fire pit with earth. This ensures no hidden embers can reignite and restores the site. If possible, scatter the cold ashes and replace any displaced topsoil or vegetation.</p><p><strong>Only when the ashes are cold to the touch</strong> is the fire truly extinguished and safe to leave. Never leave a fire with visible smoke or warm coals. Wind can reignite smoldering embers hours later, and a wildfire from your campfire can be catastrophic.</p>"
    },
    {
      id: "la_psychology", icon: "🧠", tag: "SURVIVAL 01",
      title: "The Psychology of Survival",
      desc: "Why a positive attitude is your most important survival tool.",
      body: "<p>The most critical survival tool is not a knife, fire, or shelter — it is <strong>your mind</strong>. Survival is 90% psychology. The cadets who survive are those who maintain a positive, determined attitude.</p><p><strong>Panic is the first enemy.</strong> When disaster strikes, the natural response is panic. Panic causes irrational decisions, aimless running, and wasted energy. The S.T.O.P. procedure exists specifically to combat panic — sitting down forces you to stop, breathe, and think.</p><p><strong>The REACT acronym</strong> helps manage psychological stress:</p><p><strong>R</strong> — Recognize the situation. Do not deny reality. Accept that you are in a survival situation.</p><p><strong>E</strong> — Expect to survive. Believe you will make it. This belief drives all your actions.</p><p><strong>A</strong> — Assess your resources. What do you have? What can you use? What are your priorities?</p><p><strong>C</strong> — Create a plan. Use S.T.O.P. Make decisions based on your assessment and the rule of three.</p><p><strong>T</strong> — Take action. Execute your plan. Staying busy fights boredom and gives you purpose.</p><p><strong>Counter the psychological enemies:</strong> Boredom and loneliness can destroy your will to survive. Fight them by setting daily goals, maintaining routines, keeping your camp organized, tending your fire, and keeping hope alive. Talk to yourself, sing, or keep a log. Your mind is your best friend or your worst enemy in survival — choose to make it your ally.</p>"
    },
    {
      id: "la_feather", icon: "🌴", tag: "SURVIVAL 04",
      title: "Feather Sticks for Wet Conditions",
      desc: "How to make feather sticks when all wood is damp.",
      body: "<p>When wood is wet from rain, snow, or high humidity, finding dry tinder and kindling is challenging. <strong>Feather sticks</strong> are the solution.</p><p><strong>What is a feather stick?</strong> A feather stick is a split piece of wood with many thin shavings (feathers) left attached to the stick. The thin shavings catch fire easily, and the dry inner wood of the stick sustains the flame.</p><p><strong>How to make feather sticks:</strong></p><p>1. Find a dry-standing dead branch (still attached to the tree, not on the ground where it absorbs moisture). Standing dead wood is drier than fallen wood.</p><p>2. Split the branch open with your knife or axe. The inner wood is protected from moisture and should be dry even when the outside is wet.</p><p>3. Hold the split stick firmly. With your knife, make downward shaving strokes, leaving each shaving attached to the stick at the bottom. Make many thin shavings — 20 or more per stick.</p><p>4. The shavings should curl outward like feathers. The thinner and more numerous the curls, the easier they will catch a spark.</p><p>5. Make several feather sticks. The first catches the spark, and additional sticks provide progressively more fuel as the fire grows.</p><p>Feather sticks are a critical survival skill because wet conditions are when you most need a fire (for warmth) and when fire is hardest to start. Master this technique and you can light a fire in almost any conditions.</p>"
    },
    {
      id: "la_debris_shelter", icon: "🛡\uFE0F", tag: "SURVIVAL 03",
      title: "Building a Debris Shelter",
      desc: "Step-by-step guide to the most practical improvised shelter for cadets.",
      body: "<p>The <strong>debris shelter</strong> is the most practical improvised shelter for cadets in the field. It requires no tools (though a knife helps) and uses only natural materials. It provides excellent insulation against cold, wind, and rain.</p><p><strong>Materials needed:</strong> One ridgepole (a long branch or fallen sapling about 2 metres longer than your height), rib branches (many sticks), and debris (leaves, pine needles, moss, ferns, earth).</p><p><strong>Step 1 — Find your ridgepole:</strong> Select a sturdy branch or fallen sapling about 2 metres longer than you are tall. It should be strong enough to support your weight without bending.</p><p><strong>Step 2 — Prop the ridgepole:</strong> Rest one end of the ridgepole on a stump, rock, or low tree branch about waist height (around 1 metre). The other end rests on the ground. This creates a sloping A-frame ridge.</p><p><strong>Step 3 — Build the rib frame:</strong> Lean rib branches against both sides of the ridgepole, close together, forming an A-frame skeleton. The ribs should touch the ground on each side, creating a sleeping space about as wide as your shoulders plus a bit more.</p><p><strong>Step 4 — Pile on the debris:</strong> This is the insulation layer. Pile leaves, pine needles, dry grass, moss, and ferns thickly over the entire frame. The debris layer should be at least <strong>30 centimetres thick</strong> — thicker in cold conditions. This is what keeps you warm. The trapped air in the debris is your insulation.</p><p><strong>Step 5 — Add a door plug:</strong> Stuff debris at the entrance to close it once you are inside, leaving just enough for air. Your body heat warms the small interior space.</p><p>A properly built debris shelter can keep you warm in temperatures well below freezing, using only your body heat and the insulating properties of the debris. It is one of the most effective survival shelters you can build with no equipment.</p>"
    }
  ];

  // ==========================================================
  // SURVIVAL TRAIL — Unique Interactive Game Data
  // A multi-stage survival scenario with ambient music via
  // Web Audio API. NOT a quiz — a sequential decision simulator
  // with condition meters, narrative, and consequences.
  // ==========================================================
  const SURVIVAL_TRAIL = {
    stages: [
      {
        id: "stage_stop",
        title: "Stage 1: Lost in the Wilderness",
        tag: "S.T.O.P. PROCEDURE",
        icon: "🤔",
        narrative: "You were hiking with your cadet group when you took a wrong turn at a trail junction. Now the trail is gone, the forest looks the same in every direction, and the sun is getting low. Your heart is pounding. This is the moment that determines whether you survive — what do you do FIRST?",
        prompt: "What is your immediate first action?",
        visual: "forest_lost",
        choices: [
          {
            ico: "🛏\uFE0F",
            title: "Sit down and calm yourself",
            desc: "Stop moving. Sit. Breathe. Follow the S in S.T.O.P.",
            correct: true,
            fbTitle: "Excellent — S.T.O.P. in action!",
            fbDetail: "You sit down on a log and force yourself to breathe slowly. Your heart rate settles. Panic is the first enemy of survival, and you just defeated it. The 'S' in S.T.O.P. stands for SIT — stop moving, sit down, and calm yourself before doing anything else. Now you can think clearly.",
            effects: { morale: +20, heat: 0, water: 0, shelter: 0, signal: 0 }
          },
          {
            ico: "🏃",
            title: "Run back the way you came",
            desc: "Retrace your steps quickly before it gets dark.",
            correct: false,
            fbTitle: "Dangerous choice!",
            fbDetail: "You start running through the forest, but without a clear sense of direction you only get more disoriented. Running when lost leads to exhaustion, injury, and deeper into unknown terrain. You stop, out of breath and more lost than before. Remember: the S in S.T.O.P. means SIT first.",
            effects: { morale: -15, heat: -5, water: -10, shelter: 0, signal: 0 }
          },
          {
            ico: "🔥",
            title: "Build a fire immediately",
            desc: "Get a fire going for warmth and signalling right now.",
            correct: false,
            fbTitle: "Premature action!",
            fbDetail: "You start gathering firewood in a panic, but without thinking through your situation first, you choose a poor location and struggle to light it in the damp conditions. Acting before thinking leads to mistakes. S.T.O.P. — Sit, Think, Observe, THEN Plan. Fire comes later.",
            effects: { morale: -10, heat: -5, water: -5, shelter: 0, signal: 0 }
          },
          {
            ico: "📱",
            title: "Shout for help",
            desc: "Call out loudly — maybe someone can hear you.",
            correct: false,
            fbTitle: "Wasted energy!",
            fbDetail: "You shout into the forest. Your voice echoes and fades. No one responds. Shouting wastes precious energy and moisture, and the sound does not carry far through trees. You feel more alone than before. S.T.O.P. — sit and think before acting.",
            effects: { morale: -10, heat: -5, water: -10, shelter: 0, signal: 0 }
          }
        ]
      },
      {
        id: "stage_observe",
        title: "Stage 2: Assess Your Situation",
        tag: "OBSERVE & PLAN",
        icon: "👁\uFE0F",
        narrative: "Now that you are calm, you need to observe your surroundings and make a plan. The sky is clouding over and the temperature is dropping. You estimate you have about 2 hours of daylight left. You have a small daypack with a water bottle, a knife, a whistle, and a lighter. What do you observe and prioritize?",
        prompt: "What is your top priority for the next 2 hours of daylight?",
        visual: "forest_observe",
        choices: [
          {
            ico: "🛡\uFE0F",
            title: "Build an emergency shelter",
            desc: "Shelter is priority — you can survive 3 hours without it in extreme cold.",
            correct: true,
            fbTitle: "Smart prioritization!",
            fbDetail: "You observe the area: a fallen tree on elevated ground, away from animal trails, with plenty of debris nearby. You decide to build a debris shelter. With 2 hours of light, you have time to complete it. Shelter is your highest physical priority — the rule of three says 3 hours without shelter in extreme conditions. The clouds and dropping temperature confirm this is the right call.",
            effects: { morale: +15, heat: +10, water: 0, shelter: +50, signal: 0 }
          },
          {
            ico: "💧",
            title: "Search for a water source",
            desc: "Head downhill to find a stream while you still have light.",
            correct: false,
            fbTitle: "Wrong priority for now!",
            fbDetail: "You head downhill looking for water, but you wander for 45 minutes without finding any. Meanwhile, your daylight is running out and you have no shelter. Water is important (3 days without it) but with nightfall approaching and dropping temperatures, shelter is the higher priority right now. You need to get back and build shelter before dark.",
            effects: { morale: -10, heat: -10, water: 0, shelter: 0, signal: 0 }
          },
          {
            ico: "🌿",
            title: "Forage for edible plants",
            desc: "Gather food to maintain your energy for the night ahead.",
            correct: false,
            fbTitle: "Lowest priority!",
            fbDetail: "You spend time examining plants, but you cannot identify most with certainty. Remember the golden rule: if you cannot identify it 100%, do not eat it. Food is the lowest survival priority — you can survive 3 weeks without it. You have wasted precious daylight. Shelter should have come first.",
            effects: { morale: -10, heat: -10, water: -5, shelter: 0, signal: 0 }
          },
          {
            ico: "📱",
            title: "Try to find the trail again",
            desc: "Walk in expanding circles to find the path you lost.",
            correct: false,
            fbTitle: "Risky and wasteful!",
            fbDetail: "You walk in expanding circles, but the forest looks the same everywhere and you risk getting even more lost. By the time you give up, most of your daylight is gone and you have no shelter. The S.T.O.P. procedure says to stay put once you realize you are lost. Rescuers search your last known area.",
            effects: { morale: -15, heat: -10, water: -10, shelter: 0, signal: 0 }
          }
        ]
      },
      {
        id: "stage_shelter",
        title: "Stage 3: Build Your Shelter",
        tag: "SHELTER CONSTRUCTION",
        icon: "🛡\uFE0F",
        narrative: "You found a good site near a fallen tree on elevated ground. Now you need to build your debris shelter before the light fades. You have your knife and the forest provides materials. The wind is picking up and you can smell rain in the air. How will you orient your shelter entrance?",
        prompt: "Which direction should your shelter entrance face?",
        visual: "shelter_build",
        choices: [
          {
            ico: "🍃",
            title: "Leeward — away from the prevailing wind",
            desc: "The entrance should face away from where the wind is coming from.",
            correct: true,
            fbTitle: "Perfect site selection!",
            fbDetail: "You observe the wind direction (the trees sway from the west) and orient your shelter entrance to the east — leeward, away from the prevailing wind. This keeps wind, rain, and cold air from blowing directly into your shelter. You build your debris shelter: ridgepole on the fallen tree, rib branches for the A-frame, and thick debris for insulation. Your shelter is complete just as darkness falls.",
            effects: { morale: +20, heat: +15, water: 0, shelter: +40, signal: 0 }
          },
          {
            ico: "🌬\uFE0F",
            title: "Windward — into the wind for ventilation",
            desc: "Face the entrance toward the wind for airflow.",
            correct: false,
            fbTitle: "That will be cold!",
            fbDetail: "You face the entrance into the wind. As soon as the rain starts, wind and water blow directly into your shelter. You shiver through the night, your body heat escaping with every gust. Facing windward lets the elements in — always face leeward, away from the prevailing wind. You survive but lose valuable body heat.",
            effects: { morale: -10, heat: -25, water: -5, shelter: +20, signal: 0 }
          },
          {
            ico: "\u2600\uFE0F",
            title: "South-facing for maximum sunlight",
            desc: "Point the entrance south to catch the morning sun.",
            correct: false,
            fbTitle: "Sun is secondary!",
            fbDetail: "You orient the entrance south for sunlight, but tonight is cloudy and rainy — there will be no sun. More importantly, the wind is from the west, and your south-facing entrance catches the wind at an angle, funneling cold air inside. While sunlight is nice, wind protection is the primary consideration. Always face leeward.",
            effects: { morale: -5, heat: -15, water: -5, shelter: +25, signal: 0 }
          },
          {
            ico: "📍",
            title: "Direction doesn't matter",
            desc: "Just build the shelter quickly, orientation is not important.",
            correct: false,
            fbTitle: "Orientation matters!",
            fbDetail: "You build the shelter without considering wind direction. The entrance faces west — directly into the wind. All night, cold gusts blow through your shelter, stealing your body heat. A well-built shelter with the wrong orientation is still cold and drafty. Entrance orientation is a critical site selection factor — always face leeward.",
            effects: { morale: -15, heat: -20, water: -5, shelter: +20, signal: 0 }
          }
        ]
      },
      {
        id: "stage_fire",
        title: "Stage 4: Light Your Fire",
        tag: "FIRE LIGHTING",
        icon: "🔥",
        narrative: "Your shelter is built and you are out of the wind, but the temperature is dropping fast. You need a fire for warmth, morale, and as a potential signal. You have your lighter and found some dry materials under a pine tree. The wood is damp on the outside from the approaching rain. How will you build your fire?",
        prompt: "What is the correct way to prepare and build your fire?",
        visual: "fire_light",
        choices: [
          {
            ico: "🌴",
            title: "Make feather sticks from split dead wood, then build tepee lay with tinder first",
            desc: "Split wood to find dry interior, shave feather sticks, start with tinder then kindling in a tepee.",
            correct: true,
            fbTitle: "Expert firecraft!",
            fbDetail: "You split a standing dead branch to find dry wood inside, then carefully carve feather sticks with your knife — thin shavings that will catch a spark easily even in damp conditions. You gather dry tinder (pine needles, bark) under the tree, build a tepee lay with kindling, and light it. The feather sticks catch, the kindling follows, and soon you have a warm, crackling fire. The fire triangle is satisfied: air flows through the tepee, heat builds from the tinder, and your fuel is ready.",
            effects: { morale: +20, heat: +30, water: 0, shelter: 0, signal: +10 }
          },
          {
            ico: "🧴",
            title: "Pile wet wood over the lighter flame",
            desc: "Just hold the lighter to the wood and let it catch.",
            correct: false,
            fbTitle: "Fire smothered!",
            fbDetail: "You hold the lighter to a pile of damp wood. The flame licks the wet bark but cannot catch — the moisture prevents ignition, and the thick wood smothers the small flame. You waste lighter fuel and get no fire. Remember the fuel order: tinder first, then kindling, then larger wood. And in wet conditions, split wood to find dry interior and make feather sticks.",
            effects: { morale: -15, heat: -10, water: 0, shelter: 0, signal: 0 }
          },
          {
            ico: "🔥",
            title: "Build a large log fire immediately",
            desc: "Stack big logs and light them — bigger fire means more heat.",
            correct: false,
            fbTitle: "No ignition!",
            fbDetail: "You stack large logs and try to light them directly. But logs are the LAST fuel stage — they will not catch from a small flame. You need tinder and kindling first to build enough heat. The fire triangle needs all three elements in the right proportion. Starting with bulk firewood violates the fuel order and your fire never catches. Start small: tinder, then kindling, then wood fuel.",
            effects: { morale: -15, heat: -10, water: 0, shelter: 0, signal: 0 }
          },
          {
            ico: "💧",
            title: "Pour water on the wood to clean it first",
            desc: "Wash the wood, then it will burn better.",
            correct: false,
            fbTitle: "That makes no sense!",
            fbDetail: "You pour water on the wood, making it even wetter. Wood needs to be DRY to burn — water removes heat from the fire triangle. You have made your fire impossible to light. Always find the driest materials possible, and in wet conditions, split wood to expose the dry interior. Never add water to fuel you want to burn.",
            effects: { morale: -20, heat: -10, water: -10, shelter: 0, signal: 0 }
          }
        ]
      },
      {
        id: "stage_water",
        title: "Stage 5: Find and Purify Water",
        tag: "WATER PURIFICATION",
        icon: "💧",
        narrative: "It is morning. Your fire kept you warm through the night and your shelter held up against the rain. Your water bottle is nearly empty and you are getting thirsty. You can hear running water in the distance — a stream about 100 metres downhill. You follow the sound and find a clear, fast-running stream. What do you do?",
        prompt: "How will you make this water safe to drink?",
        visual: "water_stream",
        choices: [
          {
            ico: "🔥",
            title: "Boil the water in your canteen over the fire for at least 1 minute",
            desc: "Collect water, carry it to camp, boil it for 1+ minutes to kill all pathogens.",
            correct: true,
            fbTitle: "Correct purification!",
            fbDetail: "You fill your canteen from the stream, carry it back to your camp, and place it in the fire to boil. You maintain a rolling boil for a full minute. Boiling is the most reliable purification method — it kills all bacteria, viruses, and parasites like Giardia. Even clear mountain water can be contaminated, so you never take chances. You now have safe drinking water. Your body and morale both recover.",
            effects: { morale: +15, heat: +5, water: +50, shelter: 0, signal: 0 }
          },
          {
            ico: "\u2705",
            title: "Drink directly from the stream — it looks clean",
            desc: "The water is clear and fast-running, so it must be safe.",
            correct: false,
            fbTitle: "Dangerous assumption!",
            fbDetail: "You drink directly from the stream. The water is refreshing — but it may contain Giardia, Cryptosporidium, or other pathogens from animal waste upstream. You cannot see, smell, or taste these contaminants. Within hours, you develop stomach cramps and diarrhea, which accelerates dehydration in a survival situation. NEVER drink untreated water, no matter how clean it looks. Always boil or chemically treat first.",
            effects: { morale: -20, heat: -5, water: +10, shelter: 0, signal: 0 }
          },
          {
            ico: "🧴",
            title: "Filter through sand and charcoal, then drink",
            desc: "Improvise a filter — it will clean the water.",
            correct: false,
            fbTitle: "Filtration is not enough!",
            fbDetail: "You build a filter with sand, charcoal, and cloth. The water comes out clearer and tastes better — but filtration only removes sediment, NOT bacteria or parasites. You drink it and risk the same waterborne illnesses as drinking raw. Improvised filtration must ALWAYS be followed by boiling or chemical treatment. You got lucky this time, but the risk was real.",
            effects: { morale: -10, heat: -5, water: +30, shelter: 0, signal: 0 }
          },
          {
            ico: "🚫",
            title: "Do not drink — wait for rescue with your remaining water",
            desc: "Ration your last few sips and hope rescue comes soon.",
            correct: false,
            fbTitle: "Missed opportunity!",
            fbDetail: "You decide not to collect water, rationing your last few sips. But you can survive only 3 days without water, and rescue may take longer. When you have a water source available, collect and purify it — do not ration when resupply is possible. By avoiding the stream, you are accelerating dehydration unnecessarily. Always secure water when you can.",
            effects: { morale: -10, heat: -5, water: -10, shelter: 0, signal: 0 }
          }
        ]
      },
      {
        id: "stage_signal",
        title: "Stage 6: Signal for Rescue",
        tag: "RESCUE SIGNALLING",
        icon: "🚧",
        narrative: "It is your second day. You have shelter, fire, and water — your survival basics are secured. Now you hear something in the distance: an aircraft engine. This could be a search plane looking for you. You have your whistle, your signal mirror, and three potential fire locations. You have about 30 seconds before the sound fades. What do you do?",
        prompt: "How will you signal the aircraft?",
        visual: "signal_air",
        choices: [
          {
            ico: "\uFE0F\u2755\uFE0F\u2755\uFE0F",
            title: "Three whistle blasts + three mirror flashes + light three fires in a triangle",
            desc: "Use the universal distress signal: three of everything. Multiple methods maximize visibility.",
            correct: true,
            fbTitle: "Textbook distress signalling!",
            fbDetail: "You blow three sharp whistle blasts, pause, and repeat. You flash your signal mirror three times toward the aircraft. You light your three pre-prepared fire locations arranged in a triangle 35 metres apart. The universal distress signal is THREE of anything — three whistles, three flashes, three fires in a triangle. Your multiple signal methods catch the search crew's attention. The aircraft circles, waggles its wings — they have seen you! Rescue is on the way. You did everything right.",
            effects: { morale: +30, heat: +5, water: 0, shelter: 0, signal: +50 }
          },
          {
            ico: "📖",
            title: "Shout and wave your arms",
            desc: "Make noise and movement to attract attention.",
            correct: false,
            fbTitle: "Not enough!",
            fbDetail: "You shout and wave your arms, but the aircraft is high up and far away. Your voice does not carry over the engine noise, and arm-waving is invisible from that altitude. The aircraft flies past without noticing you. Shouting and waving are insufficient for aircraft signalling. Use the universal distress signal: three whistle blasts, three mirror flashes, or three fires in a triangle. These are designed to be seen and heard from the air.",
            effects: { morale: -15, heat: -5, water: -5, shelter: 0, signal: +5 }
          },
          {
            ico: "🔥",
            title: "Light one big signal fire",
            desc: "One large fire will be seen by the plane.",
            correct: false,
            fbTitle: "Single fire is ambiguous!",
            fbDetail: "You light one large fire. But from the air, a single fire could be a campfire, a natural wildfire, or a forestry burn — it is not clearly a distress signal. The aircraft does not recognize it as a call for help and flies on. The international aerial distress signal is THREE fires in a triangle, 35 metres apart — this pattern is unmistakable. One fire is not the universal distress signal.",
            effects: { morale: -10, heat: +5, water: 0, shelter: 0, signal: +10 }
          },
          {
            ico: "😴",
            title: "Stay in your shelter and wait",
            desc: "They will see your camp eventually — no need to act.",
            correct: false,
            fbTitle: "Missed your chance!",
            fbDetail: "You stay in your shelter, hoping the aircraft will spot your camp. But from the air, a small shelter in the forest is nearly invisible. The aircraft passes without seeing anything. You missed a critical rescue opportunity. When you hear or see potential rescuers, you must ACTIVELY signal — the universal distress signal is three of anything. Passive waiting does not get you rescued.",
            effects: { morale: -20, heat: 0, water: -5, shelter: 0, signal: -10 }
          }
        ]
      }
    ],
    passThreshold: 5
  };

  // ==========================================================
  // STATE MANAGEMENT
  // ==========================================================
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
      readArticles: [],
      currentMissionTask: {},
      trailBadgeEarned: false,
      trailBestScore: 0
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
    syncMapProgress();
  }

  // ==========================================================
  // MAP PROGRESS SYNC -- badge 15 on the quest map
  // ==========================================================
  function syncMapProgress() {
    try {
      const allDone = MISSIONS.every(m => state.completedMissions.includes(m.id));
      let mapProgress = JSON.parse(localStorage.getItem(MAP_PROGRESS_KEY) || "[]");
      if (allDone && !mapProgress.includes(BUSHCRAFT_BADGE_ID)) {
        mapProgress.push(BUSHCRAFT_BADGE_ID);
        localStorage.setItem(MAP_PROGRESS_KEY, JSON.stringify(mapProgress));
      } else if (!allDone && mapProgress.includes(BUSHCRAFT_BADGE_ID)) {
        mapProgress = mapProgress.filter(id => id !== BUSHCRAFT_BADGE_ID);
        localStorage.setItem(MAP_PROGRESS_KEY, JSON.stringify(mapProgress));
      }
    } catch (e) {}
  }

  // ==========================================================
  // SCENE SVG GENERATORS -- Bushcraft & survival themes
  // ==========================================================
  function sceneSVG(scene) {
    const W = 600, H = 180;
    const base = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">`;
    const end = `</svg>`;
    const grad = (id, c1, c2) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>`;

    if (scene === "stop") {
      return base + grad("g", "#1a140d", "#0f0a06") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <circle cx="300" cy="70" r="35" fill="none" stroke="#a08050" stroke-width="2"/>
        <text x="300" y="62" fill="#c8a86e" font-size="14" font-family="monospace" text-anchor="middle" font-weight="bold">S.T.O.P.</text>
        <text x="300" y="78" fill="#e8762e" font-size="8" font-family="monospace" text-anchor="middle">SURVIVAL MINDSET</text>
        <rect x="80" y="110" width="100" height="50" rx="4" fill="#14100a" stroke="#a08050" stroke-width="1"/>
        <text x="130" y="128" fill="#c8a86e" font-size="9" font-family="monospace" text-anchor="middle" font-weight="bold">SIT</text>
        <text x="130" y="142" fill="#a08050" font-size="6" font-family="monospace" text-anchor="middle">CALM DOWN</text>
        <text x="130" y="152" fill="#a08050" font-size="6" font-family="monospace" text-anchor="middle">DON'T PANIC</text>
        <rect x="200" y="110" width="100" height="50" rx="4" fill="#14100a" stroke="#a08050" stroke-width="1"/>
        <text x="250" y="128" fill="#c8a86e" font-size="9" font-family="monospace" text-anchor="middle" font-weight="bold">THINK</text>
        <text x="250" y="142" fill="#a08050" font-size="6" font-family="monospace" text-anchor="middle">ASSESS</text>
        <text x="250" y="152" fill="#a08050" font-size="6" font-family="monospace" text-anchor="middle">SITUATION</text>
        <rect x="320" y="110" width="100" height="50" rx="4" fill="#14100a" stroke="#a08050" stroke-width="1"/>
        <text x="370" y="128" fill="#c8a86e" font-size="9" font-family="monospace" text-anchor="middle" font-weight="bold">OBSERVE</text>
        <text x="370" y="142" fill="#a08050" font-size="6" font-family="monospace" text-anchor="middle">SURVEY</text>
        <text x="370" y="152" fill="#a08050" font-size="6" font-family="monospace" text-anchor="middle">SURROUNDINGS</text>
        <rect x="440" y="110" width="100" height="50" rx="4" fill="#14100a" stroke="#e8762e" stroke-width="1"/>
        <text x="490" y="128" fill="#ff9a42" font-size="9" font-family="monospace" text-anchor="middle" font-weight="bold">PLAN</text>
        <text x="490" y="142" fill="#e8762e" font-size="6" font-family="monospace" text-anchor="middle">DECIDE</text>
        <text x="490" y="152" fill="#e8762e" font-size="6" font-family="monospace" text-anchor="middle">ACT</text>
        <text x="300" y="172" fill="#a08050" font-size="9" font-family="monospace" text-anchor="middle" font-weight="bold">S.T.O.P. & THE FIVE ELEMENTS OF SURVIVAL</text>
      ` + end;
    }
    if (scene === "enemies") {
      return base + grad("g", "#1a140d", "#0f0a06") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <text x="300" y="28" fill="#e8762e" font-size="10" font-family="monospace" text-anchor="middle" font-weight="bold">SEVEN ENEMIES OF SURVIVAL</text>
        <rect x="30" y="45" width="75" height="40" rx="3" fill="#14100a" stroke="#ff5a6e" stroke-width="1"/>
        <text x="67" y="62" fill="#ff5a6e" font-size="9" font-family="monospace" text-anchor="middle">PAIN</text>
        <text x="67" y="76" fill="#a08050" font-size="5" font-family="monospace" text-anchor="middle">INJURY</text>
        <rect x="115" y="45" width="75" height="40" rx="3" fill="#14100a" stroke="#5b9eff" stroke-width="1"/>
        <text x="152" y="62" fill="#5b9eff" font-size="9" font-family="monospace" text-anchor="middle">COLD</text>
        <text x="152" y="76" fill="#a08050" font-size="5" font-family="monospace" text-anchor="middle">EXPOSURE</text>
        <rect x="200" y="45" width="75" height="40" rx="3" fill="#14100a" stroke="#5b9eff" stroke-width="1"/>
        <text x="237" y="62" fill="#5b9eff" font-size="8" font-family="monospace" text-anchor="middle">THIRST</text>
        <text x="237" y="76" fill="#a08050" font-size="5" font-family="monospace" text-anchor="middle">DEHYDRATION</text>
        <rect x="285" y="45" width="75" height="40" rx="3" fill="#14100a" stroke="#e8762e" stroke-width="1"/>
        <text x="322" y="62" fill="#e8762e" font-size="8" font-family="monospace" text-anchor="middle">HUNGER</text>
        <text x="322" y="76" fill="#a08050" font-size="5" font-family="monospace" text-anchor="middle">STARVATION</text>
        <rect x="370" y="45" width="75" height="40" rx="3" fill="#14100a" stroke="#a08050" stroke-width="1"/>
        <text x="407" y="62" fill="#a08050" font-size="8" font-family="monospace" text-anchor="middle">FATIGUE</text>
        <text x="407" y="76" fill="#a08050" font-size="5" font-family="monospace" text-anchor="middle">EXHAUSTION</text>
        <rect x="100" y="100" width="100" height="40" rx="3" fill="#14100a" stroke="#a08050" stroke-width="1"/>
        <text x="150" y="117" fill="#a08050" font-size="8" font-family="monospace" text-anchor="middle">BOREDOM</text>
        <text x="150" y="131" fill="#a08050" font-size="5" font-family="monospace" text-anchor="middle">MONOTONY</text>
        <rect x="220" y="100" width="100" height="40" rx="3" fill="#14100a" stroke="#a08050" stroke-width="1"/>
        <text x="270" y="117" fill="#a08050" font-size="7" font-family="monospace" text-anchor="middle">LONELINESS</text>
        <text x="270" y="131" fill="#a08050" font-size="5" font-family="monospace" text-anchor="middle">ISOLATION</text>
        <rect x="360" y="100" width="140" height="40" rx="3" fill="#1a140d" stroke="#e8762e" stroke-width="1.5"/>
        <text x="430" y="117" fill="#ff9a42" font-size="7" font-family="monospace" text-anchor="middle" font-weight="bold">ATTITUDE IS KEY</text>
        <text x="430" y="131" fill="#e8762e" font-size="6" font-family="monospace" text-anchor="middle">WILL TO LIVE</text>
        <text x="300" y="172" fill="#a08050" font-size="9" font-family="monospace" text-anchor="middle" font-weight="bold">RECOGNIZE & OVERCOME THE SEVEN ENEMIES</text>
      ` + end;
    }
    if (scene === "shelter") {
      return base + grad("g", "#1a140d", "#0f0a06") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <path d="M 0 150 Q 150 120 300 135 Q 450 115 600 145 L 600 180 L 0 180 Z" fill="#2a2014" opacity="0.7"/>
        <polygon points="150,140 200,85 250,140" fill="#3a2a1a" stroke="#a08050" stroke-width="1.5"/>
        <line x1="200" y1="85" x2="200" y2="140" stroke="#5b4a30" stroke-width="1" opacity="0.5"/>
        <text x="200" y="155" fill="#c8a86e" font-size="7" font-family="monospace" text-anchor="middle">LEAN-TO</text>
        <polygon points="350,140 380,100 410,140" fill="#3a2a1a" stroke="#a08050" stroke-width="1"/>
        <text x="380" y="155" fill="#c8a86e" font-size="6" font-family="monospace" text-anchor="middle">DEBRIS HUT</text>
        <path d="M 450 140 L 450 105 Q 450 95 460 95 Q 470 95 470 105 L 470 140 Z" fill="#3a2a1a" stroke="#a08050" stroke-width="1"/>
        <text x="460" y="155" fill="#c8a86e" font-size="6" font-family="monospace" text-anchor="middle">SNOW CAVE</text>
        <circle cx="80" cy="50" r="12" fill="#f5c84c" opacity="0.7"/>
        <text x="80" y="42" fill="#f5c84c" font-size="6" font-family="monospace" text-anchor="middle">WIND</text>
        <path d="M 92 50 L 120 60 L 115 55 M 120 60 L 115 65" fill="none" stroke="#c8a86e" stroke-width="1.5"/>
        <text x="115" y="80" fill="#a08050" font-size="5" font-family="monospace" text-anchor="middle">ENTRANCE</text>
        <text x="115" y="90" fill="#a08050" font-size="5" font-family="monospace" text-anchor="middle">AWAY FROM WIND</text>
        <rect x="480" y="40" width="90" height="30" rx="3" fill="#14100a" stroke="#a08050" stroke-width="1"/>
        <text x="525" y="55" fill="#c8a86e" font-size="6" font-family="monospace" text-anchor="middle">SITE SELECTION</text>
        <text x="490" y="65" fill="#a08050" font-size="5" font-family="monospace">DRY - FLAT - SAFE</text>
        <text x="300" y="172" fill="#a08050" font-size="9" font-family="monospace" text-anchor="middle" font-weight="bold">EMERGENCY SHELTER CONSTRUCTION</text>
      ` + end;
    }
    if (scene === "fire") {
      return base + grad("g", "#1a140d", "#0f0a06") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <path d="M 0 150 Q 200 130 400 140 Q 500 135 600 150 L 600 180 L 0 180 Z" fill="#2a2014" opacity="0.6"/>
        <polygon points="240,140 270,75 300,140" fill="#e8762e" opacity="0.7"/>
        <polygon points="255,140 280,85 305,140" fill="#ff9a42" opacity="0.8"/>
        <polygon points="270,140 285,95 300,140" fill="#f5c84c" opacity="0.6"/>
        <text x="280" y="160" fill="#e8762e" font-size="7" font-family="monospace" text-anchor="middle" font-weight="bold">FIRE</text>
        <polygon points="80,50 130,50 105,90" fill="none" stroke="#c8a86e" stroke-width="1.5"/>
        <text x="105" y="40" fill="#c8a86e" font-size="6" font-family="monospace" text-anchor="middle">HEAT</text>
        <text x="60" y="70" fill="#a08050" font-size="6" font-family="monospace" text-anchor="middle">FUEL</text>
        <text x="105" y="105" fill="#a08050" font-size="6" font-family="monospace" text-anchor="middle">AIR</text>
        <text x="150" y="70" fill="#c8a86e" font-size="6" font-family="monospace" text-anchor="middle">TRIANGLE</text>
        <rect x="370" y="45" width="70" height="25" rx="2" fill="#14100a" stroke="#a08050" stroke-width="1"/>
        <text x="405" y="55" fill="#c8a86e" font-size="6" font-family="monospace" text-anchor="middle">FUEL ORDER</text>
        <text x="380" y="65" fill="#a08050" font-size="5" font-family="monospace">TINDER&#8594;KINDLING&#8594;FUEL</text>
        <rect x="460" y="45" width="120" height="55" rx="3" fill="#14100a" stroke="#ff5a6e" stroke-width="1"/>
        <text x="520" y="58" fill="#ff5a6e" font-size="6" font-family="monospace" text-anchor="middle">FIRE DANGER</text>
        <rect x="475" y="65" width="90" height="10" rx="2" fill="#2a2014"/>
        <rect x="475" y="65" width="72" height="10" rx="2" fill="#e8762e"/>
        <text x="520" y="73" fill="#14100a" font-size="6" font-family="monospace" text-anchor="middle" font-weight="bold">HIGH</text>
        <text x="520" y="90" fill="#e8762e" font-size="5" font-family="monospace" text-anchor="middle">CFFDRS RATING</text>
        <text x="300" y="172" fill="#a08050" font-size="9" font-family="monospace" text-anchor="middle" font-weight="bold">FIRE LIGHTING & MAINTENANCE</text>
      ` + end;
    }
    if (scene === "water") {
      return base + grad("g", "#1a140d", "#0f0a06") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <path d="M 0 140 Q 100 120 200 130 Q 300 115 400 128 Q 500 120 600 140 L 600 180 L 0 180 Z" fill="#2a2014" opacity="0.5"/>
        <path d="M 120 55 Q 120 45 130 45 Q 140 45 140 55 L 140 110 Q 140 120 130 120 Q 120 120 120 110 Z" fill="#5b9eff" opacity="0.3" stroke="#5b9eff" stroke-width="1"/>
        <text x="130" y="40" fill="#5b9eff" font-size="6" font-family="monospace" text-anchor="middle">STREAM</text>
        <rect x="210" y="50" width="80" height="60" rx="4" fill="#14100a" stroke="#5b9eff" stroke-width="1"/>
        <circle cx="250" cy="80" r="18" fill="none" stroke="#5b9eff" stroke-width="1.5"/>
        <circle cx="250" cy="80" r="10" fill="#e8762e" opacity="0.5"/>
        <text x="250" y="83" fill="#ff9a42" font-size="7" font-family="monospace" text-anchor="middle">BOIL</text>
        <text x="250" y="120" fill="#5b9eff" font-size="5" font-family="monospace" text-anchor="middle">10 MIN ROLLING</text>
        <rect x="320" y="50" width="80" height="60" rx="4" fill="#14100a" stroke="#5b9eff" stroke-width="1"/>
        <rect x="340" y="60" width="40" height="20" rx="2" fill="#2a2014" stroke="#c8a86e" stroke-width="1"/>
        <text x="360" y="74" fill="#c8a86e" font-size="6" font-family="monospace" text-anchor="middle">TABLET</text>
        <text x="360" y="95" fill="#5b9eff" font-size="5" font-family="monospace" text-anchor="middle">CHEMICAL</text>
        <text x="360" y="105" fill="#5b9eff" font-size="5" font-family="monospace" text-anchor="middle">30 MIN WAIT</text>
        <rect x="430" y="50" width="80" height="60" rx="4" fill="#14100a" stroke="#5b9eff" stroke-width="1"/>
        <rect x="445" y="58" width="50" height="10" fill="#3a2a1a" stroke="#a08050" stroke-width="0.5"/>
        <rect x="445" y="68" width="50" height="10" fill="#5b4a30" stroke="#a08050" stroke-width="0.5"/>
        <rect x="445" y="78" width="50" height="10" fill="#2a2014" stroke="#a08050" stroke-width="0.5"/>
        <text x="470" y="100" fill="#5b9eff" font-size="5" font-family="monospace" text-anchor="middle">FILTER</text>
        <text x="470" y="108" fill="#5b9eff" font-size="5" font-family="monospace" text-anchor="middle">SAND+CHARCOAL</text>
        <text x="300" y="172" fill="#a08050" font-size="9" font-family="monospace" text-anchor="middle" font-weight="bold">WATER SOURCING & PURIFICATION</text>
      ` + end;
    }
    if (scene === "weather") {
      return base + grad("g", "#1a140d", "#0f0a06") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <path d="M 80 45 Q 75 35 85 35 Q 90 28 100 32 Q 110 28 115 38 Q 125 38 120 48 L 80 48 Z" fill="#c8a86e" opacity="0.5"/>
        <text x="100" y="62" fill="#c8a86e" font-size="5" font-family="monospace" text-anchor="middle">CIRRUS</text>
        <path d="M 200 50 Q 190 38 210 38 Q 220 30 240 38 Q 260 30 270 42 Q 285 42 280 52 L 200 52 Z" fill="#a08050" opacity="0.4"/>
        <text x="240" y="66" fill="#a08050" font-size="5" font-family="monospace" text-anchor="middle">CUMULUS</text>
        <path d="M 380 45 Q 365 25 400 28 Q 420 15 450 28 Q 480 15 500 30 Q 520 25 515 50 L 380 50 Z" fill="#5b4a30" opacity="0.6"/>
        <polygon points="430,50 420,70 440,70" fill="#5b9eff" opacity="0.7"/>
        <polygon points="460,50 450,75 470,75" fill="#5b9eff" opacity="0.7"/>
        <text x="445" y="90" fill="#5b9eff" font-size="5" font-family="monospace" text-anchor="middle">CUMULONIMBUS</text>
        <rect x="50" y="110" width="500" height="30" rx="3" fill="#14100a" stroke="#a08050" stroke-width="0.5" opacity="0.5"/>
        <path d="M 50 125 Q 150 118 250 125 Q 350 115 450 123 Q 500 120 550 125" fill="none" stroke="#5b4a30" stroke-width="1" opacity="0.6"/>
        <text x="300" y="130" fill="#a08050" font-size="5" font-family="monospace" text-anchor="middle">STRATUS - OVERCAST LAYER</text>
        <rect x="150" y="110" width="120" height="25" rx="3" fill="#2a2014" stroke="#5b9eff" stroke-width="0.5" opacity="0.7"/>
        <text x="210" y="127" fill="#5b9eff" font-size="5" font-family="monospace" text-anchor="middle">NIMBOSTRATUS - RAIN</text>
        <text x="300" y="172" fill="#a08050" font-size="9" font-family="monospace" text-anchor="middle" font-weight="bold">WEATHER PREDICTION & CLOUD READING</text>
      ` + end;
    }
    if (scene === "forage") {
      return base + grad("g", "#1a140d", "#0f0a06") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <path d="M 0 140 Q 200 120 400 130 Q 500 125 600 145 L 600 180 L 0 180 Z" fill="#2a2014" opacity="0.5"/>
        <circle cx="100" cy="60" r="15" fill="#7bbd3e" opacity="0.6"/>
        <text x="100" y="65" fill="#7bbd3e" font-size="8" text-anchor="middle">&#127807;</text>
        <text x="100" y="85" fill="#7bbd3e" font-size="5" font-family="monospace" text-anchor="middle">KNOWN SAFE</text>
        <circle cx="220" cy="60" r="15" fill="#ff5a6e" opacity="0.4"/>
        <text x="220" y="65" fill="#ff5a6e" font-size="8" text-anchor="middle">&#9888;</text>
        <text x="220" y="85" fill="#ff5a6e" font-size="5" font-family="monospace" text-anchor="middle">UNKNOWN</text>
        <rect x="310" y="40" width="130" height="60" rx="4" fill="#14100a" stroke="#a08050" stroke-width="1"/>
        <text x="375" y="55" fill="#c8a86e" font-size="6" font-family="monospace" text-anchor="middle">GOLDEN RULE</text>
        <text x="320" y="68" fill="#a08050" font-size="5" font-family="monospace">NEVER eat unless</text>
        <text x="320" y="78" fill="#a08050" font-size="5" font-family="monospace">100% identified</text>
        <text x="320" y="88" fill="#a08050" font-size="5" font-family="monospace">& known safe</text>
        <text x="320" y="96" fill="#e8762e" font-size="5" font-family="monospace">When in doubt - OUT</text>
        <rect x="460" y="45" width="110" height="50" rx="3" fill="#14100a" stroke="#e8762e" stroke-width="1"/>
        <text x="515" y="58" fill="#ff9a42" font-size="6" font-family="monospace" text-anchor="middle">WARNING SIGNS</text>
        <text x="470" y="70" fill="#a08050" font-size="5" font-family="monospace">&#10005; Milky sap</text>
        <text x="470" y="80" fill="#a08050" font-size="5" font-family="monospace">&#10005; Bitter taste</text>
        <text x="470" y="90" fill="#a08050" font-size="5" font-family="monospace">&#10005; Almond smell</text>
        <text x="300" y="172" fill="#a08050" font-size="9" font-family="monospace" text-anchor="middle" font-weight="bold">FORAGING AWARENESS & SAFE FOOD</text>
      ` + end;
    }
    if (scene === "signal") {
      return base + grad("g", "#1a140d", "#0f0a06") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <path d="M 0 140 Q 200 120 400 130 Q 500 125 600 145 L 600 180 L 0 180 Z" fill="#2a2014" opacity="0.5"/>
        <circle cx="100" cy="70" r="15" fill="none" stroke="#c8a86e" stroke-width="2"/>
        <text x="100" y="75" fill="#c8a86e" font-size="10" text-anchor="middle">&#128227;</text>
        <text x="100" y="95" fill="#c8a86e" font-size="5" font-family="monospace" text-anchor="middle">WHISTLE x3</text>
        <circle cx="200" cy="70" r="15" fill="none" stroke="#f5c84c" stroke-width="2"/>
        <text x="200" y="75" fill="#f5c84c" font-size="10" text-anchor="middle">&#128247;</text>
        <text x="200" y="95" fill="#f5c84c" font-size="5" font-family="monospace" text-anchor="middle">MIRROR x3</text>
        <polygon points="330,80 340,60 350,80" fill="#e8762e" opacity="0.7"/>
        <polygon points="360,80 370,60 380,80" fill="#e8762e" opacity="0.7"/>
        <polygon points="390,80 400,60 410,80" fill="#e8762e" opacity="0.7"/>
        <text x="370" y="95" fill="#e8762e" font-size="5" font-family="monospace" text-anchor="middle">3 FIRES TRIANGLE</text>
        <text x="370" y="105" fill="#a08050" font-size="5" font-family="monospace" text-anchor="middle">35m APART</text>
        <rect x="460" y="50" width="110" height="55" rx="3" fill="#14100a" stroke="#e8762e" stroke-width="1"/>
        <text x="515" y="63" fill="#ff9a42" font-size="6" font-family="monospace" text-anchor="middle">GROUND-TO-AIR</text>
        <text x="515" y="75" fill="#a08050" font-size="5" font-family="monospace" text-anchor="middle">SIGNALS</text>
        <text x="470" y="88" fill="#a08050" font-size="5" font-family="monospace">1m WIDE</text>
        <text x="470" y="97" fill="#a08050" font-size="5" font-family="monospace">8m LONG</text>
        <text x="300" y="172" fill="#a08050" font-size="9" font-family="monospace" text-anchor="middle" font-weight="bold">RESCUE SIGNALLING & SITREP</text>
      ` + end;
    }
    if (scene === "trail") {
      return base + grad("g", "#1a140d", "#0f0a06") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <path d="M 0 140 Q 150 110 300 125 Q 450 100 600 135 L 600 180 L 0 180 Z" fill="#2a2014" opacity="0.6"/>
        <polygon points="250,140 280,80 310,140" fill="#e8762e" opacity="0.6"/>
        <polygon points="265,140 285,90 305,140" fill="#ff9a42" opacity="0.7"/>
        <circle cx="280" cy="95" r="4" fill="#f5c84c"/>
        <text x="280" y="160" fill="#e8762e" font-size="7" font-family="monospace" text-anchor="middle" font-weight="bold">CAMPFIRE</text>
        <path d="M 100 60 L 120 50 L 110 65 Z" fill="#3a2a1a" stroke="#a08050" stroke-width="1"/>
        <path d="M 140 65 L 155 55 L 148 68 Z" fill="#3a2a1a" stroke="#a08050" stroke-width="1" opacity="0.7"/>
        <text x="130" y="85" fill="#a08050" font-size="5" font-family="monospace" text-anchor="middle">FOREST</text>
        <circle cx="450" cy="50" r="10" fill="#f5c84c" opacity="0.5"/>
        <path d="M 450 60 Q 455 70 450 75 Q 445 70 450 60" fill="none" stroke="#c8a86e" stroke-width="1"/>
        <text x="450" y="40" fill="#f5c84c" font-size="5" font-family="monospace" text-anchor="middle">MOON</text>
        <path d="M 480 50 q 5 -3 10 0 q 5 -3 10 0" fill="none" stroke="#a08050" stroke-width="1" opacity="0.5"/>
        <path d="M 500 60 q 5 -3 10 0 q 5 -3 10 0" fill="none" stroke="#a08050" stroke-width="1" opacity="0.4"/>
        <text x="520" y="80" fill="#a08050" font-size="5" font-family="monospace" text-anchor="middle">SMOKE SIGNAL</text>
        <text x="300" y="172" fill="#e8762e" font-size="10" font-family="monospace" text-anchor="middle" font-weight="bold">SURVIVAL TRAIL</text>
      ` + end;
    }
    return base + `<rect width="${W}" height="${H}" fill="#1a140d"/><text x="${W/2}" y="${H/2}" fill="#a08050" font-size="12" text-anchor="middle">WILDWOOD</text>` + end;
  }

  // ==========================================================
  // HELPER FUNCTIONS
  // ==========================================================
  function escapeHTML(str) {
    if (str === null || str === undefined) return "";
    return String(str).replace(/[&<>"']/g, function (c) {
      var map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
      return map[c];
    });
  }
  function toastOld(msg, type) {
    const el = document.getElementById("toast");
    if (!el) return;
    el.textContent = msg;
    el.className = "toast show" + (type ? " toast-" + type : "");
    setTimeout(() => { el.className = "toast"; }, 2800);
  }

  // ==========================================================
  // RANK HELPERS
  // ==========================================================
  function currentRank() {
    let r = RANKS[0];
    for (const rank of RANKS) {
      if (state.xp >= rank.xp) r = rank;
    }
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
    BUSHCRAFT_BADGES.forEach(b => {
      if (state.completedMissions.includes(b.mission)) state.badges.push(b.id);
    });
  }

  // ==========================================================
  // MISSION PROGRESS HELPERS
  // ==========================================================
  function missionProgress(missionId) {
    return state.missionProgress[missionId] || { tasksDone: [], wrongAttempts: 0 };
  }
  function missionDone(m) {
    return state.completedMissions.includes(m.id);
  }
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
  function tasksDoneCount(m) {
    return missionProgress(m.id).tasksDone.length;
  }

  // ==========================================================
  // RENDER: SIDEBAR + TOP STATS
  // ==========================================================
  function renderSidebar() {
    const rank = currentRank();
    const nxt = nextRank();
    document.getElementById("pilotRank").textContent = rank.name;
    document.getElementById("pilotCallsign").textContent = "CALLSIGN: " + rank.callsign;
    const pct = rankProgressPct();
    document.getElementById("xpFill").style.width = pct + "%";
    const span = nxt ? (nxt.xp - rank.xp) : 100;
    const into = nxt ? (state.xp - rank.xp) : span;
    document.getElementById("xpText").textContent = into + " / " + span + " XP";
  }

  function renderTopStats() {
    const rank = currentRank();
    refreshBadges();
    document.getElementById("topRank").textContent = rank.name.replace("Survival Recruit", "Recruit").replace("Survival Cadet", "Cadet").replace("Survival ", "").replace("Wilderness ", "");
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
    document.getElementById("cmdXPNext").textContent = nxt ? "+" + (nxt.xp - state.xp) + " to " + nxt.name : "MAX RANK";
    document.getElementById("cmdSitreps").textContent = state.sitreps.length;
    document.getElementById("cmdBadges").textContent = state.badges.length;
    document.getElementById("cmdBadgeTotal").textContent = "of " + BUSHCRAFT_BADGES.length;

    const threatPct = Math.min(80, 20 + state.wrongAttempts * 5);
    const tf = document.getElementById("threatFill");
    if (tf) tf.style.width = threatPct + "%";

    const cl = document.getElementById("chapterList");
    cl.innerHTML = MISSIONS.map(m => {
      const done = missionDone(m);
      const unlocked = missionUnlocked(m);
      const prog = tasksDoneCount(m);
      const total = m.tasks.length;
      const isActive = activeMissionId === m.id && !done;
      let cls = "chapter-row";
      let progText = "";
      if (done) { cls += " done"; progText = prog + "/" + total + " " + String.fromCharCode(10003); }
      else if (isActive) { cls += " active"; progText = prog + "/" + total + " " + String.fromCharCode(9656); }
      else if (unlocked) { progText = prog + "/" + total; }
      else { cls += " locked"; progText = "LOCKED"; }
      const num = done ? String.fromCharCode(10003) : m.order;
      return '<div class="' + cls + '" data-mission="' + m.id + '">' +
        '<span class="n">' + num + '</span>' +
        '<div class="cr-body" style="flex:1;">' +
          '<div class="cr-title">' + m.title + '</div>' +
          '<div class="cr-desc">' + m.desc + '</div>' +
        '</div>' +
        '<span class="cr-prog">' + progText + '</span>' +
      '</div>';
    }).join("");
    cl.querySelectorAll(".chapter-row:not(.locked)").forEach(el => {
      el.addEventListener("click", () => {
        const mid = el.dataset.mission;
        openMission(mid);
      });
    });
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
      let statusCls = "mc-status";
      let statusText = "";
      if (done) { cls += " done"; statusCls += " done"; statusText = "COMPLETE"; }
      else if (!unlocked) { cls += " locked"; statusCls += " locked"; statusText = "LOCKED"; }
      else { statusCls += " active"; statusText = "READY"; }
      return '<div class="' + cls + '" data-mission="' + m.id + '">' +
        '<div class="mc-top">' +
          '<div class="mc-ico">' + m.icon + '</div>' +
          '<div>' +
            '<div class="mc-tag">' + m.tag + '</div>' +
            '<div class="mc-title">' + m.title + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="mc-desc">' + m.desc + '</div>' +
        '<div class="mc-prog-bar"><div class="mc-prog-fill" style="width:' + pct + '%"></div></div>' +
        '<div class="mc-foot">' +
          '<span class="mc-xp">' + String.fromCharCode(9889) + ' ' + missionXP(m) + ' XP</span>' +
          '<span class="' + statusCls + '">' + statusText + ' ' + String.fromCharCode(183) + ' ' + prog + '/' + total + '</span>' +
        '</div>' +
      '</div>';
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
      let statusCls = "mc-status";
      let statusText = "";
      if (done) { cls += " done"; statusCls += " done"; statusText = "COMPLETE"; }
      else if (activeMissionId === m.id) { cls += " active"; statusCls += " active"; statusText = "IN PROGRESS"; }
      else if (!unlocked) { cls += " locked"; statusCls += " locked"; statusText = "LOCKED"; }
      else { statusCls += " active"; statusText = "READY"; }
      return '<div class="' + cls + '" data-mission="' + m.id + '">' +
        '<div class="mc-top">' +
          '<div class="mc-ico">' + m.icon + '</div>' +
          '<div>' +
            '<div class="mc-tag">' + m.tag + '</div>' +
            '<div class="mc-title">' + m.title + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="mc-desc">' + m.desc + '</div>' +
        '<div class="mc-prog-bar"><div class="mc-prog-fill" style="width:' + pct + '%"></div></div>' +
        '<div class="mc-foot">' +
          '<span class="mc-xp">' + String.fromCharCode(9889) + ' ' + missionXP(m) + ' XP</span>' +
          '<span class="' + statusCls + '">' + statusText + ' ' + String.fromCharCode(183) + ' ' + prog + '/' + total + '</span>' +
        '</div>' +
      '</div>';
    }).join("");
    sel.querySelectorAll(".mission-card:not(.locked)").forEach(el => {
      el.addEventListener("click", () => openMission(el.dataset.mission));
    });
  }

  // ==========================================================
  // MISSION CONSOLE
  // ==========================================================
  function openMission(missionId) {
    const m = MISSIONS.find(x => x.id === missionId);
    if (!m) return;
    if (!missionUnlocked(m)) {
      toast("warn", String.fromCharCode(128274) + " Module " + m.order + " is locked. Complete the previous module first.");
      return;
    }
    activeMissionId = missionId;
    activeTool = "";
    toggleState = {};
    sliderValue = {};
    orderState = {};

    const mp = missionProgress(missionId);
    activeTaskIndex = mp.tasksDone.length;
    if (activeTaskIndex >= m.tasks.length) activeTaskIndex = m.tasks.length - 1;

    switchSection("missions");
    document.getElementById("missionSelector").style.display = "none";
    document.getElementById("missionConsole").style.display = "block";
    document.getElementById("missionHeaderTitle").textContent = m.title;
    document.getElementById("missionHeaderSub").textContent = m.tag + " " + String.fromCharCode(8212) + " " + m.desc;

    renderMissionConsole();
    renderMissionSelector();
    renderCommand();
  }

  function renderMissionConsole() {
    const m = MISSIONS.find(x => x.id === activeMissionId);
    if (!m) return;
    const mp = missionProgress(m.id);
    const consoleEl = document.getElementById("missionConsole");

    if (missionDone(m)) {
      consoleEl.innerHTML = completedMissionHTML(m);
      const fb = document.getElementById("fileSitrepQuickBtn");
      if (fb) fb.addEventListener("click", () => { exitMission(); switchSection("sitrep"); });
      const bl = document.getElementById("backToListBtn");
      if (bl) bl.addEventListener("click", exitMission);
      return;
    }

    const task = m.tasks[activeTaskIndex];
    const total = m.tasks.length;

    consoleEl.innerHTML =
      '<div class="task-console">' +
        '<div class="task-header">' +
          '<div class="th-left">' +
            '<div class="th-ico">' + m.icon + '</div>' +
            '<div>' +
              '<div class="th-title">' + m.title + '</div>' +
              '<div class="th-sub">' + m.tag + ' ' + String.fromCharCode(8226) + ' ' + mp.tasksDone.length + '/' + total + ' tasks complete</div>' +
            '</div>' +
          '</div>' +
          '<div class="th-right">' +
            '<span class="task-stage-pill">TASK ' + (activeTaskIndex + 1) + ' / ' + total + '</span>' +
            '<button class="btn btn-ghost" id="exitMissionBtn" type="button">' + String.fromCharCode(8592) + ' Back to list</button>' +
          '</div>' +
        '</div>' +
        '<div class="task-body">' +
          '<div class="scene-visual">' + sceneSVG(m.scene) + '<div class="scene-overlay">' + m.brief.split(".")[0] + '.</div></div>' +
          '<div class="task-brief">' + m.brief + '</div>' +

          '<div class="tool-dock" id="toolDock">' +
            TOOLS.map(t => '<button class="tool-btn ' + (activeTool === t.id ? "active" : "") + '" data-tool="' + t.id + '" type="button"><span class="tb-ico">' + t.icon + '</span>' + t.label + '</button>').join("") +
          '</div>' +

          '<div class="tool-req" id="toolReq">' +
            '<span class="tr-ico">' + String.fromCharCode(9888) + String.fromCharCode(65039) + '</span>' +
            '<span class="tr-text">This task requires the <strong>' + toolLabel(task.tool) + '</strong> to be open. Current tool: <span class="tr-now" id="trNow">' + (activeTool ? toolLabel(activeTool) : "NONE") + '</span></span>' +
          '</div>' +

          '<div class="task-step-label">' +
            '<span class="step-num">STEP ' + (activeTaskIndex + 1) + '</span>' +
            '<span class="step-title">' + (task.prompt ? task.prompt.substring(0, 60) : "Task") + '</span>' +
          '</div>' +
          '<div class="task-instructions">' + (task.prompt || "") + '</div>' +

          '<div class="task-control" id="taskControl">' +
            renderTaskControl(task, activeTaskIndex) +
          '</div>' +

          '<div class="task-actions">' +
            '<button class="btn btn-primary" id="submitTaskBtn" type="button">' + String.fromCharCode(10003) + ' Submit & Confirm</button>' +
            '<button class="btn btn-ghost" id="hintBtn" type="button">' + String.fromCharCode(128161) + ' Hint</button>' +
          '</div>' +

          '<div class="terminal" id="terminal"><div class="ln ln-dim">// awaiting input' + String.fromCharCode(8230) + '</div></div>' +
          '<div class="task-feedback" id="taskFeedback"></div>' +

          '<hr class="divider"/>' +
          '<h3 style="margin-bottom:10px;">Mission Checklist</h3>' +
          '<div class="checklist" id="checklist">' +
            m.tasks.map((t, i) => {
              const done = mp.tasksDone.includes(i);
              return '<div class="check-item ' + (done ? "done" : "") + '"><div class="ci-box"></div><div>' + (t.prompt ? t.prompt.substring(0, 50) + String.fromCharCode(8230) : "Task " + (i+1)) + '</div></div>';
            }).join("") +
          '</div>' +
        '</div>' +
      '</div>';

    bindConsoleEvents(task);
    if (activeTool !== task.tool) {
      activeTool = task.tool;
      const btn = document.querySelector('#toolDock .tool-btn[data-tool="' + task.tool + '"]');
      if (btn) btn.classList.add('active');
      document.querySelectorAll('#toolDock .tool-btn').forEach(b => { if (b.dataset.tool !== task.tool) b.classList.remove('active'); });
    }
    updateToolReq(task);
  }

  // ==========================================================
  // RENDER TASK CONTROL -- bushcraft uses select (button-based) and order types
  // ==========================================================
  function renderTaskControl(task, idx) {
    if (task.type === "select") {
      const opts = task.options || [];
      const chosen = selectState[idx];
      return '<div class="task-options" id="taskOptions" data-idx="' + idx + '">' +
        opts.map((o, i) => {
          const sel = chosen === i;
          return '<button class="task-option-btn ' + (sel ? "selected" : "") + '" data-opt="' + i + '" type="button">' +
            '<span class="to-ico">' + (o.ico || "") + '</span>' +
            '<span class="to-text">' + escapeHTML(o.text) + '</span>' +
          '</button>';
        }).join("") +
      '</div>';
    }
    if (task.type === "order") {
      const items = task.items || [];
      if (!orderState[idx]) {
        orderState[idx] = items.map((_, i) => i);
      }
      const order = orderState[idx];
      return '<div class="task-order" id="taskOrder" data-idx="' + idx + '">' +
        order.map((origIdx, pos) => {
          return '<div class="order-item" data-pos="' + pos + '">' +
            '<span class="oi-num">' + (pos + 1) + '</span>' +
            '<span class="oi-text">' + escapeHTML(items[origIdx]) + '</span>' +
            '<span class="oi-controls">' +
              '<button class="oi-btn oi-up" data-dir="up" type="button" ' + (pos === 0 ? "disabled" : "") + '>&#8593;</button>' +
              '<button class="oi-btn oi-down" data-dir="down" type="button" ' + (pos === order.length - 1 ? "disabled" : "") + '>&#8595;</button>' +
            '</span>' +
          '</div>';
        }).join("") +
      '</div>';
    }
    if (task.type === "toggle") {
      const on = toggleState[idx];
      return '<div class="toggle-row ' + (on ? "on" : "") + '" id="toggleRow" data-idx="' + idx + '">' +
        '<div class="toggle-switch"></div>' +
        '<div class="toggle-label">' + (task.title || task.prompt || "") + '</div>' +
        '<div class="toggle-icon">' + (on ? String.fromCharCode(10003) : String.fromCharCode(9675)) + '</div>' +
      '</div>';
    }
    if (task.type === "type") {
      return '<input class="task-input" id="taskInput" type="text" placeholder="Type your answer' + String.fromCharCode(8230) + '" autocomplete="off" />';
    }
    if (task.type === "note") {
      return '<textarea class="task-note" id="taskNote" placeholder="Write your log entry here' + String.fromCharCode(8230) + '"></textarea>';
    }
    if (task.type === "slider") {
      sliderValue[idx] = sliderValue[idx] !== undefined ? sliderValue[idx] : 0;
      const unit = task.unit || "m";
      return '<input class="task-slider" id="taskSlider" type="range" min="0" max="' + (task.max || 100) + '" value="' + sliderValue[idx] + '" data-idx="' + idx + '" />' +
        '<div class="slider-readout" id="sliderReadout">' + sliderValue[idx] + ' ' + unit + '</div>';
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
        termPush("info", String.fromCharCode(9656) + " Opened " + toolLabel(activeTool));
      });
    });

    // Select option buttons
    document.querySelectorAll("#taskOptions .task-option-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const optIdx = parseInt(btn.dataset.opt, 10);
        const taskIdx = parseInt(document.getElementById("taskOptions").dataset.idx, 10);
        selectState[taskIdx] = optIdx;
        document.querySelectorAll("#taskOptions .task-option-btn").forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
        termPush("info", String.fromCharCode(9656) + " Selected: " + (task.options[optIdx].text || "").substring(0, 40));
      });
    });

    // Order item controls
    document.querySelectorAll("#taskOrder .oi-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const pos = parseInt(btn.parentElement.parentElement.dataset.pos, 10);
        const taskIdx = parseInt(document.getElementById("taskOrder").dataset.idx, 10);
        const dir = btn.dataset.dir;
        const arr = orderState[taskIdx];
        if (dir === "up" && pos > 0) {
          const tmp = arr[pos]; arr[pos] = arr[pos-1]; arr[pos-1] = tmp;
        } else if (dir === "down" && pos < arr.length - 1) {
          const tmp = arr[pos]; arr[pos] = arr[pos+1]; arr[pos+1] = tmp;
        }
        renderOrderItems(taskIdx, task);
        termPush("info", String.fromCharCode(9656) + " Reordered item " + (pos+1) + " " + dir);
      });
    });

    const toggleRow = document.getElementById("toggleRow");
    if (toggleRow) {
      toggleRow.addEventListener("click", () => {
        const idx = parseInt(toggleRow.dataset.idx, 10);
        toggleState[idx] = !toggleState[idx];
        const on = toggleState[idx];
        toggleRow.classList.toggle("on", on);
        toggleRow.querySelector(".toggle-icon").textContent = on ? String.fromCharCode(10003) : String.fromCharCode(9675);
      });
    }

    const slider = document.getElementById("taskSlider");
    if (slider) {
      slider.addEventListener("input", () => {
        const idx = parseInt(slider.dataset.idx, 10);
        sliderValue[idx] = parseInt(slider.value, 10);
        const unit = task.unit || "m";
        document.getElementById("sliderReadout").textContent = sliderValue[idx] + " " + unit;
      });
    }

    const submitBtn = document.getElementById("submitTaskBtn");
    if (submitBtn) submitBtn.addEventListener("click", () => submitTask(task));
    const hintBtn = document.getElementById("hintBtn");
    if (hintBtn) hintBtn.addEventListener("click", () => showHint(task));
    const exitBtn = document.getElementById("exitMissionBtn");
    if (exitBtn) exitBtn.addEventListener("click", exitMission);
  }

  function renderOrderItems(taskIdx, task) {
    const container = document.getElementById("taskOrder");
    if (!container) return;
    const items = task.items || [];
    const order = orderState[taskIdx];
    container.innerHTML = order.map((origIdx, pos) => {
      return '<div class="order-item" data-pos="' + pos + '">' +
        '<span class="oi-num">' + (pos + 1) + '</span>' +
        '<span class="oi-text">' + escapeHTML(items[origIdx]) + '</span>' +
        '<span class="oi-controls">' +
          '<button class="oi-btn oi-up" data-dir="up" type="button" ' + (pos === 0 ? "disabled" : "") + '>&#8593;</button>' +
          '<button class="oi-btn oi-down" data-dir="down" type="button" ' + (pos === order.length - 1 ? "disabled" : "") + '>&#8595;</button>' +
        '</span>' +
      '</div>';
    }).join("");
    // Re-bind events
    container.querySelectorAll(".oi-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const pos = parseInt(btn.parentElement.parentElement.dataset.pos, 10);
        const dir = btn.dataset.dir;
        const arr = orderState[taskIdx];
        if (dir === "up" && pos > 0) {
          const tmp = arr[pos]; arr[pos] = arr[pos-1]; arr[pos-1] = tmp;
        } else if (dir === "down" && pos < arr.length - 1) {
          const tmp = arr[pos]; arr[pos] = arr[pos+1]; arr[pos+1] = tmp;
        }
        renderOrderItems(taskIdx, task);
        termPush("info", String.fromCharCode(9656) + " Reordered item " + (pos+1) + " " + dir);
      });
    });
  }

  function updateToolReq(task) {
    const req = document.getElementById("toolReq");
    const now = document.getElementById("trNow");
    if (!req) return;
    const satisfied = activeTool === task.tool;
    req.classList.toggle("satisfied", satisfied);
    const ico = req.querySelector(".tr-ico");
    if (satisfied) {
      ico.textContent = String.fromCharCode(9989);
      now.textContent = toolLabel(activeTool);
    } else {
      ico.textContent = String.fromCharCode(9888) + String.fromCharCode(65039);
      now.textContent = activeTool ? toolLabel(activeTool) : "NONE";
    }
  }

  function toolLabel(id) {
    const t = TOOLS.find(x => x.id === id);
    return t ? t.label : id;
  }

  // ==========================================================
  // TERMINAL
  // ==========================================================
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
      state.totalAttempts++;
      state.wrongAttempts++;
      state.streak = 0;
      saveState();
      fb.classList.add("show", "err");
      fb.innerHTML = String.fromCharCode(10060) + " Wrong tool! This task requires <strong>" + toolLabel(task.tool) + "</strong>. You currently have <strong>" + (activeTool ? toolLabel(activeTool) : "no tool") + "</strong> open. Open the correct tool from the dock above.";
      termPush("err", String.fromCharCode(10007) + " FAILED " + String.fromCharCode(8212) + " wrong tool. Required: " + toolLabel(task.tool));
      updateAnalysis();
      return;
    }

    const valid = validateTask(task);
    state.totalAttempts++;

    if (!valid.ok) {
      state.wrongAttempts++;
      state.streak = 0;
      const mp = missionProgress(m.id);
      mp.wrongAttempts = (mp.wrongAttempts || 0) + 1;
      state.missionProgress[m.id] = mp;
      saveState();
      fb.classList.add("show", "err");
      fb.innerHTML = String.fromCharCode(10060) + " " + valid.msg;
      termPush("err", String.fromCharCode(10007) + " " + valid.msg);
      updateAnalysis();
      return;
    }

    state.streak++;
    if (state.streak > state.bestStreak) state.bestStreak = state.streak;
    const mp = missionProgress(m.id);
    if (!mp.tasksDone.includes(activeTaskIndex)) mp.tasksDone.push(activeTaskIndex);
    state.missionProgress[m.id] = mp;
    saveState();

    fb.classList.add("show", "ok");
    const proofText = valid.fb || "Correct! Task completed.";
    fb.innerHTML = String.fromCharCode(9989) + " " + proofText;
    termPush("ok", String.fromCharCode(10003) + " " + proofText.substring(0, 80));

    activeTaskIndex++;
    if (activeTaskIndex >= m.tasks.length) {
      completeMission(m);
    } else {
      setTimeout(() => renderMissionConsole(), 1400);
    }
    updateAnalysis();
  }

  function validateTask(task) {
    if (task.type === "select") {
      const chosen = selectState[activeTaskIndex];
      if (chosen === undefined || chosen === null) {
        return { ok: false, msg: "Select an answer by tapping one of the options above." };
      }
      const opt = task.options[chosen];
      if (opt && opt.correct) {
        return { ok: true, fb: opt.fb || "Correct!" };
      }
      // Find the correct option's feedback for learning
      const correctOpt = task.options.find(o => o.correct);
      return { ok: false, msg: "Incorrect. " + (opt ? opt.fb : "") + (correctOpt ? " Correct answer: " + correctOpt.text : "") };
    }
    if (task.type === "order") {
      const order = orderState[activeTaskIndex] || [];
      const correct = task.correctOrder || [];
      const matches = order.every((v, i) => v === correct[i]);
      if (matches) {
        return { ok: true, fb: task.fb || "Correct! Items are in the right order." };
      }
      return { ok: false, msg: "The order is not correct yet. Rearrange the items using the up/down arrows and try again. " + (task.fb || "") };
    }
    if (task.type === "toggle") {
      const on = toggleState[activeTaskIndex];
      return on === task.expected ? { ok: true, fb: "Correct! Toggle is in the right position." } : { ok: false, msg: "Toggle the indicator to the ON position first." };
    }
    if (task.type === "type") {
      const inp = document.getElementById("taskInput");
      const val = (inp ? inp.value : "").trim().toUpperCase();
      if (!val) return { ok: false, msg: "Type your answer in the input field." };
      const exp = String(task.expected).toUpperCase();
      return val === exp ? { ok: true, fb: "Correct!" } : { ok: false, msg: "\"" + val + "\" is not correct. Hint: " + task.expected.length + " characters." };
    }
    if (task.type === "note") {
      const ta = document.getElementById("taskNote");
      const val = (ta ? ta.value : "").trim();
      if (val.length < 10) return { ok: false, msg: "Your log entry is too short. Write a complete sentence." };
      return { ok: true, fb: "Log entry recorded." };
    }
    if (task.type === "slider") {
      const v = sliderValue[activeTaskIndex] || 0;
      const tol = task.tolerance || 1;
      if (Math.abs(v - task.expected) <= tol) return { ok: true, fb: "Correct reading!" };
      const unit = task.unit || "m";
      return { ok: false, msg: "The reading is set to " + v + " " + unit + ". Adjust the dial to match the target." };
    }
    return { ok: false, msg: "Unknown task type." };
  }

  function showHint(task) {
    const fb = document.getElementById("taskFeedback");
    fb.className = "task-feedback show info";
    let hint = "";
    if (task.type === "select") {
      const correctOpt = (task.options || []).find(o => o.correct);
      hint = "The correct answer is: " + (correctOpt ? correctOpt.text.substring(0, 50) + String.fromCharCode(8230) : "look for the most survival-sound option");
    } else if (task.type === "order") {
      const correct = task.correctOrder || [];
      hint = "The correct order starts with item " + (correct[0] + 1) + ". Use the up/down arrows to arrange all items.";
    } else if (task.type === "type") {
      hint = "The answer has " + task.expected.length + " characters and starts with \"" + task.expected.charAt(0) + "\".";
    } else if (task.type === "toggle") {
      hint = "Click the toggle row to switch it to the ON (green) position.";
    } else if (task.type === "slider") {
      hint = "The target reading is close to " + task.expected + " " + (task.unit || "m") + ".";
    }
    fb.textContent = String.fromCharCode(128161) + " " + hint;
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
      syncMapProgress();
      const badge = BUSHCRAFT_BADGES.find(b => b.mission === m.id);
      toast("ok", String.fromCharCode(127942) + " Mission complete! +" + earned + " XP earned. Badge unlocked: " + (badge ? badge.name : m.title) + ".");
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
    const badge = BUSHCRAFT_BADGES.find(b => b.mission === m.id);
    const mp = missionProgress(m.id);
    return '<div class="task-console">' +
      '<div class="task-body">' +
        '<div class="complete-card">' +
          '<div class="cc-ico">' + String.fromCharCode(127942) + '</div>' +
          '<div class="cc-title">Mission Complete: ' + m.title + '</div>' +
          '<div class="cc-sub">' + m.desc + ' You have successfully completed all ' + m.tasks.length + ' tasks and earned the <strong>' + (badge ? badge.name : "Survival Cadet") + '</strong> badge.</div>' +
          '<div class="cc-stats">' +
            '<div class="cc-stat"><div class="v">+' + earned + '</div><div class="l">XP Earned</div></div>' +
            '<div class="cc-stat"><div class="v">' + mp.tasksDone.length + '/' + m.tasks.length + '</div><div class="l">Tasks Done</div></div>' +
            '<div class="cc-stat"><div class="v">' + (mp.wrongAttempts || 0) + '</div><div class="l">Wrong Attempts</div></div>' +
          '</div>' +
          '<div class="task-actions" style="justify-content:center;">' +
            '<button class="btn btn-primary" id="fileSitrepQuickBtn" type="button">' + String.fromCharCode(128221) + ' File SITREP for this mission</button>' +
            '<button class="btn btn-ghost" id="backToListBtn" type="button">' + String.fromCharCode(8592) + ' Back to mission list</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  function exitMission() {
    activeMissionId = null;
    document.getElementById("missionConsole").style.display = "none";
    document.getElementById("missionSelector").style.display = "grid";
    document.getElementById("missionHeaderTitle").textContent = "Select a Mission";
    document.getElementById("missionHeaderSub").textContent = "Choose a training module from the Training tab, or pick a mission below to enter the simulator.";
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
    const elRingXP = document.getElementById("ringXP");
    if (elRingXP) elRingXP.textContent = state.xp;
    const elRingLabel = document.getElementById("ringRankLabel");
    if (elRingLabel) elRingLabel.textContent = rank.name.replace("Survival Recruit", "Recruit").replace("Survival Cadet", "Cadet").replace("Survival ", "").replace("Wilderness ", "");
    const elNextRank = document.getElementById("nextRankName");
    if (elNextRank) elNextRank.textContent = nxt ? nxt.name : "MAX RANK";
    const pct = rankProgressPct();
    const circ = 314;
    const elRingFg = document.getElementById("xpRingFg");
    if (elRingFg) elRingFg.style.strokeDashoffset = circ - (circ * pct / 100);
    const elRingToNext = document.getElementById("ringXPToNext");
    if (elRingToNext) elRingToNext.textContent = nxt ? (state.xp - rank.xp) + " / " + (nxt.xp - rank.xp) + " XP to next rank" : "MAX RANK ACHIEVED";

    const chart = document.getElementById("xpBarChart");
    if (chart) chart.innerHTML = MISSIONS.map(m => {
      const done = missionDone(m);
      const xp = done ? missionXP(m) : 0;
      const h = Math.max(4, (xp / 150) * 140);
      return '<div class="bar" style="height:' + h + 'px;" title="' + m.title + ': ' + xp + ' XP"><div class="bar-val">' + xp + '</div><div class="bar-label">M' + m.order + '</div></div>';
    }).join("");

    const pchart = document.getElementById("progressChart");
    if (pchart) pchart.innerHTML = MISSIONS.map(m => {
      const mp = state.missionProgress[m.id] || { tasksDone: [] };
      const pct = Math.round((mp.tasksDone.length / m.tasks.length) * 100);
      return '<div class="prog-row"><div class="prog-label">' + m.title + '</div><div class="prog-track"><div class="prog-fill" style="width:' + pct + '%"></div></div><div class="prog-pct">' + pct + '%</div></div>';
    }).join("");

    const correct = state.totalAttempts - state.wrongAttempts;
    const acc = state.totalAttempts > 0 ? Math.round((correct / state.totalAttempts) * 100) : 100;
    const elAcc = document.getElementById("accuracyPct");
    if (elAcc) elAcc.textContent = acc + "%";
    const elTot = document.getElementById("totalAttempts");
    if (elTot) elTot.textContent = state.totalAttempts;
    const elBest = document.getElementById("bestStreak");
    if (elBest) elBest.textContent = state.bestStreak;
  }

  function updateAnalysis() {
    renderAnalysis();
    renderSidebar();
    renderTopStats();
  }

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
      else { tag = '<span class="r-tag locked">LOCKED</span>'; }
      return '<div class="' + cls + '">' +
        '<div class="r-ico">' + r.icon + '</div>' +
        '<div class="r-body">' +
          '<div class="r-name">' + r.name + '</div>' +
          '<div class="r-xp">' + r.xp + ' XP ' + String.fromCharCode(8226) + ' CALLSIGN ' + r.callsign + '</div>' +
        '</div>' +
        tag +
      '</div>';
    }).join("");
  }

  // ==========================================================
  // SITREP
  // ==========================================================
  function renderSitrep() {
    const sel = document.getElementById("sitrepMission");
    const completed = MISSIONS.filter(m => missionDone(m));
    sel.innerHTML = '<option value="">Select a completed mission' + String.fromCharCode(8230) + '</option>' +
      completed.map(m => '<option value="' + m.id + '">' + m.tag + ' ' + String.fromCharCode(8212) + ' ' + m.title + '</option>').join("");

    const log = document.getElementById("sitrepLog");
    if (state.sitreps.length === 0) {
      log.innerHTML = '<p class="muted center" style="padding:20px;">No SITREPs filed yet. Complete a mission and file your first report.</p>';
    } else {
      log.innerHTML = state.sitreps.slice().reverse().map(s => {
        const statusMap = {
          NOMINAL: { cls: "low", text: "NOMINAL" },
          MINOR_HAZARD: { cls: "med", text: "MINOR HAZARD" },
          ABORTED: { cls: "high", text: "ABORTED" }
        };
        const st = statusMap[s.status] || statusMap.NOMINAL;
        const m = MISSIONS.find(x => x.id === s.mission);
        return '<div class="sitrep-entry">' +
          '<div class="se-head">' +
            '<span class="se-time">' + s.time + '</span>' +
            '<span class="se-status ti-level ' + st.cls + '">' + st.text + '</span>' +
          '</div>' +
          '<div class="se-body"><strong>' + (m ? m.tag + " " + String.fromCharCode(8212) + " " + m.title : s.mission) + '</strong><br/>' + escapeHTML(s.summary) + '</div>' +
        '</div>';
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

    const entry = {
      mission, status, summary,
      time: new Date().toLocaleString("en-GB", { hour12: false })
    };
    state.sitreps.push(entry);
    state.xp += 20;
    saveState();
    document.getElementById("sitrepSummary").value = "";
    document.getElementById("sitrepStatus").value = "";
    document.getElementById("sitrepMission").value = "";
    showFeedback(fb, "ok", "SITREP filed successfully! +20 XP. Your survival instructor has received your report.");
    toast("ok", String.fromCharCode(128231) + " SITREP filed! +20 XP");
    renderSitrep();
    renderSidebar();
    renderTopStats();
    renderCommand();
    renderAnalysis();
  }

  function showFeedback(el, kind, msg) {
    el.className = "task-feedback show " + kind;
    el.textContent = (kind === "ok" ? String.fromCharCode(9989) + " " : kind === "err" ? String.fromCharCode(10060) + " " : String.fromCharCode(128161) + " ") + msg;
  }

  // ==========================================================
  // LEARN LIBRARY
  // ==========================================================
  function renderLearn() {
    const grid = document.getElementById("learnGrid");
    grid.innerHTML = LEARN_ARTICLES.map(a => {
      const read = state.readArticles.includes(a.id);
      return '<div class="lib-card ' + (read ? "read" : "") + '" data-article="' + a.id + '">' +
        '<div class="lc-ico">' + a.icon + '</div>' +
        '<div class="lc-cat">' + (a.cat || a.tag || "") + '</div>' +
        '<div class="lc-title">' + a.title + '</div>' +
        '<div class="lc-desc">' + a.desc + '</div>' +
        '<div class="lc-foot"><span>' + (read ? String.fromCharCode(10003) + " Read" : "Tap to read") + '</span><span>+' + a.xp + ' XP</span></div>' +
      '</div>';
    }).join("");
    grid.querySelectorAll(".lib-card").forEach(el => {
      el.addEventListener("click", () => openArticle(el.dataset.article));
    });
  }

  function openArticle(articleId) {
    const a = LEARN_ARTICLES.find(x => x.id === articleId);
    if (!a) return;
    if (!state.readArticles.includes(articleId)) {
      state.readArticles.push(articleId);
      state.xp += a.xp;
      saveState();
      toast("ok", String.fromCharCode(128214) + ' Article read: "' + a.title + '" ' + String.fromCharCode(8212) + " +" + a.xp + " XP");
      renderLearn();
      renderSidebar();
      renderTopStats();
      renderAnalysis();
    } else {
      toast("info", String.fromCharCode(128214) + ' Already read: "' + a.title + '"');
    }
  }

  // ==========================================================
  // SWITCH SECTION
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
    if (name === "learn") renderLearn();
    if (name === "trail") trailRenderStartScreen();
    document.querySelector(".main").scrollTop = 0;
  }

  function openMissionRender() {
    document.getElementById("missionSelector").style.display = "none";
    document.getElementById("missionConsole").style.display = "block";
    renderMissionConsole();
  }

  // ==========================================================
  // TOAST (dynamic, appended to toastContainer)
  // ==========================================================
  function toast(kind, text) {
    const container = document.getElementById("toastContainer");
    if (!container) return;
    const el = document.createElement("div");
    el.className = "toast " + (kind || "info");
    const ico = kind === "ok" ? String.fromCharCode(9989) :
                kind === "warn" ? String.fromCharCode(9888) + String.fromCharCode(65039) :
                kind === "err" ? String.fromCharCode(10060) :
                String.fromCharCode(8505) + String.fromCharCode(65039);
    el.textContent = ico + "  " + text;
    container.appendChild(el);
    setTimeout(() => {
      el.style.opacity = "0";
      el.style.transition = "opacity 0.4s";
      setTimeout(() => { if (el.parentNode) el.parentNode.removeChild(el); }, 400);
    }, 3200);
  }

  // ==========================================================
  // SURVIVAL TRAIL GAME ENGINE
  // A unique multi-stage interactive survival scenario simulator.
  // NOT a quiz -- cadets make sequential survival decisions with
  // condition meters, narrative stages, and Web Audio campfire music.
  // 6 stages, pass threshold 5/6 correct, badge + 100 XP on first pass.
  // ==========================================================
  const TRAIL = {
    active: false,
    stageIndex: 0,
    correctCount: 0,
    answered: false,
    conditions: { morale: 75, heat: 60, water: 65, shelter: 0, signal: 0 },
    musicOn: false,
    audioCtx: null,
    musicNodes: null,
    sfxNodes: null
  };

  // ==========================================================
  // WEB AUDIO API -- Campfire ambient music + survival SFX
  // ==========================================================
  function initAudio() {
    if (TRAIL.audioCtx) return;
    try {
      TRAIL.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      TRAIL.audioCtx = null;
    }
  }

  function startCampfireMusic() {
    initAudio();
    if (!TRAIL.audioCtx) return;
    const ctx = TRAIL.audioCtx;
    if (ctx.state === "suspended") ctx.resume();

    // Stop existing music if any
    stopCampfireMusic();

    const masterGain = ctx.createGain();
    masterGain.gain.value = 0.0;
    masterGain.connect(ctx.destination);
    masterGain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 2.0);

    // Low drone (wind/atmosphere) -- two detuned oscillators
    const drone1 = ctx.createOscillator();
    drone1.type = "sine";
    drone1.frequency.value = 55;
    const drone2 = ctx.createOscillator();
    drone2.type = "sine";
    drone2.frequency.value = 82.5;
    const droneGain = ctx.createGain();
    droneGain.gain.value = 0.08;
    drone1.connect(droneGain);
    drone2.connect(droneGain);
    droneGain.connect(masterGain);
    drone1.start();
    drone2.start();

    // LFO for gentle wobble on the drone
    const lfo = ctx.createOscillator();
    lfo.type = "sine";
    lfo.frequency.value = 0.15;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 5;
    lfo.connect(lfoGain);
    lfoGain.connect(drone1.frequency);
    lfo.start();

    // Crackling fire -- filtered noise bursts
    const fireInterval = setInterval(() => {
      if (!TRAIL.musicOn) return;
      playCrackle(ctx, masterGain);
    }, 200 + Math.random() * 400);

    // Occasional owl hoot -- sine wave with pitch envelope
    const owlInterval = setInterval(() => {
      if (!TRAIL.musicOn) return;
      if (Math.random() < 0.3) playOwlHoot(ctx, masterGain);
    }, 8000 + Math.random() * 12000);

    TRAIL.musicNodes = { masterGain, drone1, drone2, lfo, fireInterval, owlInterval };
  }

  function playCrackle(ctx, master) {
    const duration = 0.05 + Math.random() * 0.1;
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2);
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 800 + Math.random() * 1200;
    filter.Q.value = 2;
    const gain = ctx.createGain();
    gain.gain.value = 0.04 + Math.random() * 0.06;
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    noise.start();
  }

  function playOwlHoot(ctx, master) {
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = 220;
    const gain = ctx.createGain();
    gain.gain.value = 0;
    gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.1);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8);
    osc.frequency.setValueAtTime(220, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(180, ctx.currentTime + 0.3);
    osc.frequency.linearRampToValueAtTime(200, ctx.currentTime + 0.6);
    osc.connect(gain);
    gain.connect(master);
    osc.start();
    osc.stop(ctx.currentTime + 0.9);
  }

  function stopCampfireMusic() {
    if (!TRAIL.musicNodes) return;
    const ctx = TRAIL.audioCtx;
    const n = TRAIL.musicNodes;
    try {
      if (n.fireInterval) clearInterval(n.fireInterval);
      if (n.owlInterval) clearInterval(n.owlInterval);
      if (n.masterGain && ctx) {
        n.masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
      }
      setTimeout(() => {
        try {
          if (n.drone1) n.drone1.stop();
          if (n.drone2) n.drone2.stop();
          if (n.lfo) n.lfo.stop();
        } catch (e) {}
      }, 600);
    } catch (e) {}
    TRAIL.musicNodes = null;
  }

  function toggleMusic() {
    TRAIL.musicOn = !TRAIL.musicOn;
    const control = document.getElementById("trailMusicControl");
    const note = control ? control.querySelector(".tmc-note") : null;
    const sub = control ? control.querySelector(".tmc-sub") : null;
    if (TRAIL.musicOn) {
      startCampfireMusic();
      if (control) control.classList.add("playing");
      if (note) note.classList.add("pulse");
      if (sub) sub.textContent = "Playing: ambient campfire & wilderness sounds";
      toast("info", String.fromCharCode(127925) + " Campfire music on");
    } else {
      stopCampfireMusic();
      if (control) control.classList.remove("playing");
      if (note) note.classList.remove("pulse");
      if (sub) sub.textContent = "Click to toggle ambient wilderness sounds";
      toast("info", String.fromCharCode(128263) + " Campfire music off");
    }
  }

  // SFX for choices
  function playSFX(type) {
    initAudio();
    if (!TRAIL.audioCtx) return;
    const ctx = TRAIL.audioCtx;
    if (ctx.state === "suspended") ctx.resume();

    if (type === "correct") {
      // Ascending pleasant tone
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(660, ctx.currentTime + 0.15);
      osc.frequency.linearRampToValueAtTime(880, ctx.currentTime + 0.3);
      const gain = ctx.createGain();
      gain.gain.value = 0;
      gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.05);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.45);
    } else if (type === "wrong") {
      // Descending dissonant tone
      const osc = ctx.createOscillator();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(200, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.3);
      const gain = ctx.createGain();
      gain.gain.value = 0;
      gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.05);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } else if (type === "complete") {
      // Triumphant chord
      [523, 659, 784].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.value = freq;
        const gain = ctx.createGain();
        gain.gain.value = 0;
        gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.1 + i * 0.1);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.05);
        osc.stop(ctx.currentTime + 1.6);
      });
    }
  }

  // ==========================================================
  // TRAIL RENDER FUNCTIONS
  // ==========================================================
  function trailRenderStartScreen() {
    const stage = document.getElementById("trailStage");
    if (!stage) return;
    stage.innerHTML =
      '<div class="trail-idle">' +
        '<div class="trail-idle-ico">' + String.fromCharCode(127793) + '</div>' +
        '<h2>Survival Trail</h2>' +
        '<p class="muted" style="font-size:13px; line-height:1.6; max-width:480px; margin:0 auto;">You are alone in the wilderness. Nightfall is approaching and the temperature is dropping. The Survival Trail puts you through six critical stages of a survival scenario. At each stage, you must choose the right course of action. Every choice affects your condition meters: Morale, Heat, Water, Shelter, and Signal. Make the correct decision in at least 5 of 6 stages to earn the Survival Trail badge and +100 XP.</p>' +
        '<div class="trail-stage-indicators" style="margin:18px 0;">' +
          SURVIVAL_TRAIL.stages.map((s, i) =>
            '<span class="trail-stage-dot" data-stage="' + i + '">' + (i + 1) + '</span>'
          ).join("") +
        '</div>' +
        '<div style="margin-top:16px;">' +
          '<button class="btn btn-primary" id="trailStartBtn" type="button">' + String.fromCharCode(127918) + ' Begin Survival Trail</button>' +
        '</div>' +
        (state.trailBadgeEarned ?
          '<p class="muted" style="margin-top:14px; font-size:12px;">' + String.fromCharCode(9989) + ' Survival Trail badge earned! Best score: ' + state.trailBestScore + '/6. Play again to improve.</p>' :
          '<p class="muted" style="margin-top:14px; font-size:12px;">Complete 5 of 6 stages correctly to earn the Survival Trail badge.</p>') +
      '</div>';
    trailUpdateSide();

    const startBtn = document.getElementById("trailStartBtn");
    if (startBtn) startBtn.addEventListener("click", trailStartGame);
  }

  function trailStartGame() {
    TRAIL.active = true;
    TRAIL.stageIndex = 0;
    TRAIL.correctCount = 0;
    TRAIL.answered = false;
    TRAIL.conditions = { morale: 75, heat: 60, water: 65, shelter: 0, signal: 0 };
    trailRenderStage();
  }

  function trailRenderStage() {
    const stage = document.getElementById("trailStage");
    if (!stage) return;
    if (TRAIL.stageIndex >= SURVIVAL_TRAIL.stages.length) {
      trailFinishGame();
      return;
    }
    const s = SURVIVAL_TRAIL.stages[TRAIL.stageIndex];
    TRAIL.answered = false;
    const progressPct = Math.round((TRAIL.stageIndex / SURVIVAL_TRAIL.stages.length) * 100);

    stage.innerHTML =
      '<div class="trail-active">' +
        '<div class="trail-progress-bar"><div class="trail-progress-fill" style="width:' + progressPct + '%"></div></div>' +
        '<div class="trail-stage-indicators">' +
          SURVIVAL_TRAIL.stages.map((_, i) => {
            let cls = "trail-stage-dot";
            if (i < TRAIL.stageIndex) cls += " done";
            else if (i === TRAIL.stageIndex) cls += " current";
            return '<span class="' + cls + '">' + (i + 1) + '</span>';
          }).join("") +
        '</div>' +
        '<div class="trail-stage-tag">' + s.icon + ' ' + s.tag + '</div>' +
        '<div class="trail-visual">' + sceneSVG(s.visual) + '</div>' +
        '<div class="trail-narrative">' + s.narrative + '</div>' +
        '<div class="trail-prompt">' + s.prompt + '</div>' +
        '<div class="trail-choices" id="trailChoices">' +
          s.choices.map((c, i) => {
            return '<button class="trail-choice" data-idx="' + i + '" type="button">' +
              '<span class="tc-ico">' + (c.ico || "") + '</span>' +
              '<span class="tc-body">' +
                '<span class="tc-title">' + escapeHTML(c.title) + '</span>' +
                '<span class="tc-desc">' + escapeHTML(c.desc) + '</span>' +
              '</span>' +
            '</button>';
          }).join("") +
        '</div>' +
        '<div class="trail-feedback" id="trailFeedback"></div>' +
      '</div>';

    trailUpdateSide();

    document.querySelectorAll("#trailChoices .trail-choice").forEach(btn => {
      btn.addEventListener("click", () => trailAnswerChoice(parseInt(btn.dataset.idx, 10)));
    });
  }

  function trailAnswerChoice(idx) {
    if (TRAIL.answered) return;
    TRAIL.answered = true;
    const s = SURVIVAL_TRAIL.stages[TRAIL.stageIndex];
    const choice = s.choices[idx];
    const fb = document.getElementById("trailFeedback");
    const isCorrect = choice.correct;
    TRAIL.stageIndex++;

    // Apply effects to conditions
    const eff = choice.effects || {};
    TRAIL.conditions.morale = Math.max(0, Math.min(100, TRAIL.conditions.morale + (eff.morale || 0)));
    TRAIL.conditions.heat = Math.max(0, Math.min(100, TRAIL.conditions.heat + (eff.heat || 0)));
    TRAIL.conditions.water = Math.max(0, Math.min(100, TRAIL.conditions.water + (eff.water || 0)));
    TRAIL.conditions.shelter = Math.max(0, Math.min(100, TRAIL.conditions.shelter + (eff.shelter || 0)));
    TRAIL.conditions.signal = Math.max(0, Math.min(100, TRAIL.conditions.signal + (eff.signal || 0)));

    // Highlight choices
    document.querySelectorAll("#trailChoices .trail-choice").forEach(btn => {
      const i = parseInt(btn.dataset.idx, 10);
      btn.disabled = true;
      if (s.choices[i].correct) {
        btn.classList.add("correct");
      } else if (i === idx && !isCorrect) {
        btn.classList.add("wrong");
      }
    });

    if (isCorrect) {
      TRAIL.correctCount++;
      playSFX("correct");
      fb.classList.add("show", "ok");
      fb.innerHTML = '<div class="trail-fb-title">' + String.fromCharCode(9989) + ' ' + choice.fbTitle + '</div>' +
        '<div class="trail-fb-detail">' + escapeHTML(choice.fbDetail) + '</div>';
    } else {
      playSFX("wrong");
      fb.classList.add("show", "err");
      fb.innerHTML = '<div class="trail-fb-title">' + String.fromCharCode(10060) + ' ' + choice.fbTitle + '</div>' +
        '<div class="trail-fb-detail">' + escapeHTML(choice.fbDetail) + '</div>';
      // Also show what the correct answer was
      const correctChoice = s.choices.find(c => c.correct);
      if (correctChoice) {
        fb.innerHTML += '<div class="trail-fb-correct"><strong>Correct answer:</strong> ' + escapeHTML(correctChoice.title) + '</div>';
      }
    }

    trailUpdateSide();

    // Show next button
    const isLast = TRAIL.stageIndex >= SURVIVAL_TRAIL.stages.length;
    const nextBtn = document.createElement("button");
    nextBtn.className = "btn btn-primary trail-next-btn";
    nextBtn.type = "button";
    nextBtn.textContent = isLast ? String.fromCharCode(127937) + " See Results" : String.fromCharCode(8594) + " Next Stage";
    nextBtn.addEventListener("click", () => {
      if (isLast) trailFinishGame();
      else trailRenderStage();
    });
    fb.appendChild(nextBtn);
  }

  function trailUpdateSide() {
    const side = document.getElementById("trailSide");
    if (!side) return;

    const meters = [
      { key: "morale", label: "Morale", icon: String.fromCharCode(128170), color: "#f5c84c" },
      { key: "heat", label: "Heat", icon: String.fromCharCode(128293), color: "#e8762e" },
      { key: "water", label: "Water", icon: String.fromCharCode(128167), color: "#5b9eff" },
      { key: "shelter", label: "Shelter", icon: String.fromCharCode(127968), color: "#a08050" },
      { key: "signal", label: "Signal", icon: String.fromCharCode(128225), color: "#7bbd3e" }
    ];

    const stageInfo = TRAIL.active ?
      '<div class="trail-side-stage">' +
        '<div class="tss-label">Stage</div>' +
        '<div class="tss-value">' + Math.min(TRAIL.stageIndex + 1, SURVIVAL_TRAIL.stages.length) + ' / ' + SURVIVAL_TRAIL.stages.length + '</div>' +
      '</div>' +
      '<div class="trail-side-score">' +
        '<div class="tss-label">Correct</div>' +
        '<div class="tss-value">' + TRAIL.correctCount + ' / ' + SURVIVAL_TRAIL.stages.length + '</div>' +
      '</div>' +
      '<div class="trail-side-threshold">' +
        '<div class="tss-label">Pass Threshold</div>' +
        '<div class="tss-value">' + SURVIVAL_TRAIL.passThreshold + ' / ' + SURVIVAL_TRAIL.stages.length + '</div>' +
      '</div>'
      :
      '<div class="trail-side-stage">' +
        '<div class="tss-label">Stages</div>' +
        '<div class="tss-value">' + SURVIVAL_TRAIL.stages.length + '</div>' +
      '</div>' +
      '<div class="trail-side-score">' +
        '<div class="tss-label">Pass</div>' +
        '<div class="tss-value">' + SURVIVAL_TRAIL.passThreshold + '+</div>' +
      '</div>' +
      '<div class="trail-side-threshold">' +
        '<div class="tss-label">Reward</div>' +
        '<div class="tss-value">Badge + 100 XP</div>' +
      '</div>';

    side.innerHTML =
      '<div class="trail-side-header">' +
        '<div class="tsh-ico">' + String.fromCharCode(127919) + '</div>' +
        '<div class="tsh-title">Survival Status</div>' +
      '</div>' +
      stageInfo +
      '<div class="trail-side-divider"></div>' +
      '<div class="trail-side-conditions">' +
        '<div class="tsc-label">Condition Meters</div>' +
        meters.map(m => {
          const val = TRAIL.conditions[m.key];
          let stateCls = "";
          if (val < 25) stateCls = " critical";
          else if (val < 50) stateCls = " low";
          const barColor = val < 25 ? "#ff5a6e" : val < 50 ? "#e8762e" : m.color;
          return '<div class="trail-stat' + stateCls + '">' +
            '<div class="ts-head">' +
              '<span class="ts-ico">' + m.icon + '</span>' +
              '<span class="ts-label">' + m.label + '</span>' +
              '<span class="ts-val">' + Math.round(val) + '</span>' +
            '</div>' +
            '<div class="ts-bar"><div class="ts-fill" style="width:' + val + '%; background:' + barColor + ';"></div></div>' +
          '</div>';
        }).join("") +
      '</div>' +
      (state.trailBadgeEarned ?
        '<div class="trail-side-badge">' +
          '<div class="tsb-ico">' + String.fromCharCode(127942) + '</div>' +
          '<div class="tsb-text">Trail badge earned!<br/>Best: ' + state.trailBestScore + '/' + SURVIVAL_TRAIL.stages.length + '</div>' +
        '</div>'
        : "");
  }

  function trailFinishGame() {
    const stage = document.getElementById("trailStage");
    if (!stage) return;
    const total = SURVIVAL_TRAIL.stages.length;
    const score = TRAIL.correctCount;
    const passed = score >= SURVIVAL_TRAIL.passThreshold;
    TRAIL.active = false;

    if (passed) {
      playSFX("complete");
      if (!state.trailBadgeEarned) {
        state.trailBadgeEarned = true;
        state.xp += 100;
        saveState();
        toast("ok", String.fromCharCode(127942) + " Survival Trail badge earned! +100 XP");
      } else {
        saveState();
        toast("ok", String.fromCharCode(127942) + " Survival Trail completed again!");
      }
      if (score > state.trailBestScore) {
        state.trailBestScore = score;
        saveState();
      }
    } else {
      toast("warn", String.fromCharCode(9888) + String.fromCharCode(65039) + " You survived " + score + "/" + total + " stages. " + SURVIVAL_TRAIL.passThreshold + " needed to pass. Try again!");
    }

    // Update condition meters to final state
    const finalMeters = [
      { key: "morale", label: "Morale", icon: String.fromCharCode(128170) },
      { key: "heat", label: "Heat", icon: String.fromCharCode(128293) },
      { key: "water", label: "Water", icon: String.fromCharCode(128167) },
      { key: "shelter", label: "Shelter", icon: String.fromCharCode(127968) },
      { key: "signal", label: "Signal", icon: String.fromCharCode(128225) }
    ];

    const resultIcon = passed ? String.fromCharCode(127942) : String.fromCharCode(128148);
    const resultTitle = passed ? "You Survived!" : "The Wilderness Won This Round";
    const resultSub = passed ?
      "You made the right decisions in " + score + " of " + total + " survival stages. Your training held strong through the night. The Survival Trail badge is yours." :
      "You answered " + score + " of " + total + " stages correctly. You needed " + SURVIVAL_TRAIL.passThreshold + " to pass. Review the survival modules and try the trail again.";

    stage.innerHTML =
      '<div class="trail-complete' + (passed ? " passed" : " failed") + '">' +
        '<div class="trail-complete-ico">' + resultIcon + '</div>' +
        '<h2>' + resultTitle + '</h2>' +
        '<p class="muted" style="font-size:13px; line-height:1.6; max-width:480px; margin:0 auto;">' + resultSub + '</p>' +
        '<div class="trail-complete-score">' +
          '<div class="tcs-ring">' +
            '<div class="tcs-num">' + score + '</div>' +
            '<div class="tcs-den">/ ' + total + '</div>' +
          '</div>' +
          '<div class="tcs-label">Stages Correct</div>' +
        '</div>' +
        '<div class="trail-final-conditions">' +
          finalMeters.map(m => {
            const val = TRAIL.conditions[m.key];
            return '<div class="tfc-item">' +
              '<span class="tfc-ico">' + m.icon + '</span>' +
              '<span class="tfc-label">' + m.label + '</span>' +
              '<span class="tfc-val">' + Math.round(val) + '</span>' +
            '</div>';
          }).join("") +
        '</div>' +
        (passed && state.trailBadgeEarned ?
          '<div class="trail-badge-earned">' + String.fromCharCode(127942) + ' Survival Trail Badge' + '</div>'
          : "") +
        '<div class="trail-complete-actions">' +
          '<button class="btn btn-primary" id="trailRetryBtn" type="button">' + String.fromCharCode(128260) + ' Try Again</button>' +
          '<button class="btn btn-ghost" id="trailExitBtn" type="button">' + String.fromCharCode(8592) + ' Back to Start</button>' +
        '</div>' +
      '</div>';

    trailUpdateSide();
    renderSidebar();
    renderTopStats();
    renderAnalysis();

    const retryBtn = document.getElementById("trailRetryBtn");
    if (retryBtn) retryBtn.addEventListener("click", trailStartGame);
    const exitBtn = document.getElementById("trailExitBtn");
    if (exitBtn) exitBtn.addEventListener("click", trailRenderStartScreen);
  }

  // ==========================================================
  // I18N -- Apply translations to dynamic content
  // ==========================================================
  function applyI18n() {
    if (typeof trMutate !== "function") return;

    // RANKS
    RANKS.forEach(r => {
      trMutate(r, "name", "bushcraft_rank_" + r.id + "_name");
      trMutate(r, "callsign", "bushcraft_rank_" + r.id + "_callsign");
    });

    // TOOLS
    TOOLS.forEach(t => {
      trMutate(t, "label", "bushcraft_tool_" + t.id);
    });

    // MISSIONS
    MISSIONS.forEach(m => {
      trMutate(m, "title", "bushcraft_mission_" + m.id + "_title");
      trMutate(m, "desc", "bushcraft_mission_" + m.id + "_desc");
      trMutate(m, "brief", "bushcraft_mission_" + m.id + "_brief");
      if (m.tasks) {
        m.tasks.forEach((task, ti) => {
          trMutate(task, "prompt", "bushcraft_mission_" + m.id + "_task" + ti + "_prompt");
          if (task.options) {
            task.options.forEach((opt, oi) => {
              trMutate(opt, "text", "bushcraft_mission_" + m.id + "_task" + ti + "_opt" + oi);
              trMutate(opt, "fb", "bushcraft_mission_" + m.id + "_task" + ti + "_opt" + oi + "_fb");
            });
          }
          if (task.items) {
            task.items.forEach((item, ii) => {
              task.items[ii] = tr("bushcraft_mission_" + m.id + "_task" + ti + "_item" + ii, item);
            });
          }
          trMutate(task, "fb", "bushcraft_mission_" + m.id + "_task" + ti + "_fb");
        });
      }
    });

    // LEARN ARTICLES
    LEARN_ARTICLES.forEach(a => {
      trMutate(a, "title", "bushcraft_article_" + a.id + "_title");
      trMutate(a, "desc", "bushcraft_article_" + a.id + "_desc");
      trMutate(a, "body", "bushcraft_article_" + a.id + "_body");
    });

    // SURVIVAL TRAIL stages
    SURVIVAL_TRAIL.stages.forEach((s, si) => {
      trMutate(s, "title", "bushcraft_trail_stage" + si + "_title");
      trMutate(s, "narrative", "bushcraft_trail_stage" + si + "_narrative");
      trMutate(s, "prompt", "bushcraft_trail_stage" + si + "_prompt");
      if (s.choices) {
        s.choices.forEach((c, ci) => {
          trMutate(c, "title", "bushcraft_trail_stage" + si + "_choice" + ci + "_title");
          trMutate(c, "desc", "bushcraft_trail_stage" + si + "_choice" + ci + "_desc");
          trMutate(c, "fbTitle", "bushcraft_trail_stage" + si + "_choice" + ci + "_fbtitle");
          trMutate(c, "fbDetail", "bushcraft_trail_stage" + si + "_choice" + ci + "_fbdetail");
        });
      }
    });
  }

  // ==========================================================
  // INIT
  // ==========================================================
  function init() {
    state = loadState();

    // Nav buttons
    document.querySelectorAll(".nav-btn").forEach(b => {
      b.addEventListener("click", () => switchSection(b.dataset.section));
    });

    // Mobile menu
    const mb = document.getElementById("mobileMenuBtn");
    if (mb) mb.addEventListener("click", () => document.getElementById("sidebar").classList.toggle("open"));

    // File SITREP button
    const fsb = document.getElementById("fileSitrepBtn");
    if (fsb) fsb.addEventListener("click", fileSitrep);

    // Music toggle
    const musicControl = document.getElementById("trailMusicControl");
    if (musicControl) musicControl.addEventListener("click", toggleMusic);

    // Apply i18n translations
    applyI18n();

    // Refresh badges
    refreshBadges();

    // Render all sections
    renderSidebar();
    renderTopStats();
    renderCommand();
    renderTraining();
    renderMissionSelector();
    renderAnalysis();
    renderRanks();
    renderSitrep();
    renderLearn();
    trailRenderStartScreen();

    // Update nav count badges
    const navMC = document.getElementById("navMissionCount");
    if (navMC) navMC.textContent = MISSIONS.length;
    const navTC = document.getElementById("navTrainingCount");
    if (navTC) navTC.textContent = MISSIONS.length;

    // Analysis extra stats
    const amd = document.getElementById("analysisMissionsDone");
    if (amd) amd.textContent = state.completedMissions.length + " / " + MISSIONS.length;
    const axp = document.getElementById("analysisXP");
    if (axp) axp.textContent = state.xp;
    const awa = document.getElementById("wrongAttempts");
    if (awa) awa.textContent = state.wrongAttempts;
    const cs = document.getElementById("currentStreak");
    if (cs) cs.textContent = state.streak;

    // Deep-link via URL param
    const params = new URLSearchParams(window.location.search);
    const deepMission = params.get("mission");
    if (deepMission) {
      const m = MISSIONS.find(x => x.id === deepMission);
      if (m) setTimeout(() => openMission(m.id), 200);
    }

    // Auto-stop music when leaving the page
    window.addEventListener("beforeunload", () => {
      if (TRAIL.musicOn) stopCampfireMusic();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // ==========================================================
  // EXPOSE FOR I18N RE-APPLY
  // ==========================================================
  window.bushcraftTraining = {
    applyI18n: applyI18n,
    renderAll: function() {
      renderSidebar();
      renderTopStats();
      renderCommand();
      renderTraining();
      renderMissionSelector();
      renderAnalysis();
      renderRanks();
      renderSitrep();
      renderLearn();
      trailRenderStartScreen();
    }
  };

})();
