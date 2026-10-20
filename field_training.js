/* ============================================================
   FIELD TRAINING — field_training.js
   Operation Wildtrail: Combined Outdoor Expedition + Army Cadet Fieldcraft training engine
   IIFE architecture matching the Maple Defender pattern.
   ============================================================ */
(function () {
  "use strict";

  // ==========================================================
  // STORAGE KEYS
  // ==========================================================
  const SK = {
    progress: "fieldTrainingProgress",
    sitreps: "fieldTrainingSitreps",
    wrongAttempts: "fieldTrainingWrongAttempts",
    streak: "fieldTrainingStreak",
    bestStreak: "fieldTrainingBestStreak",
    readArticles: "fieldTrainingReadArticles",
    gameStats: "fieldTrainingGameStats"
  };
  const MAP_PROGRESS_KEY = "cadetMapDemoCompleted";
  const FIELD_BADGE_IDS = [13]; // Army Cadet Fieldcraft (combined page hosts expedition content)

  // ==========================================================
  // RANKS — Expedition trail hierarchy
  // ==========================================================
  const RANKS = [
    { id: 0, name: "Field Recruit", icon: "🎒", xp: 0, callsign: "ROOKIE-1" },
    { id: 1, name: "Trail Cadet", icon: "🥾", xp: 400, callsign: "TREKKER-1" },
    { id: 2, name: "Field Explorer", icon: "🗺️", xp: 900, callsign: "PATHFINDER-1" },
    { id: 3, name: "Wilderness Scout", icon: "🧭", xp: 1500, callsign: "SCOUT-1" },
    { id: 4, name: "Field Corporal", icon: "⭐", xp: 2200, callsign: "CORP-1" },
    { id: 5, name: "Expedition Leader", icon: "🏔️", xp: 3000, callsign: "LEAD-1" }
  ];

  // ==========================================================
  // TOOLS — Outdoor field gear & reference guides
  // ==========================================================
  const TOOLS = [
    { id: "gearlist", icon: "\ud83c\udf92", label: "Gear Checklist" },
    { id: "forecast", icon: "\u26c5\ufe0f", label: "Weather Forecast" },
    { id: "campsite", icon: "\u26fa", label: "Campsite Assessor" },
    { id: "compass", icon: "\ud83e\udded", label: "Compass & Bearing" },
    { id: "topomap", icon: "\ud83d\uddfa\ufe0f", label: "Topographic Map" },
    { id: "firesafe", icon: "\ud83d\udd25", label: "Fire Safety Manual" },
    { id: "firstaid", icon: "\ud83e\ude79", label: "First-Aid Kit" },
    { id: "knots", icon: "\ud83e\udea2", label: "Knot Guide" },
    { id: "waterpurify", icon: "\ud83d\udca7", label: "Water Purification" },
    { id: "lntguide", icon: "\u267b\ufe0f", label: "Leave-No-Trace Guide" },
    { id: "wildlife", icon: "\ud83d\udc3b", label: "Wildlife Field Guide" },
    { id: "shelter", icon: "\ud83c\udfda\ufe0f", label: "Shelter Builder" },
    { id: "traillog", icon: "\ud83d\udcdd", label: "Trail Logbook" },
    { id: "orders", icon: "\ud83d\udccb", label: "Section Orders" },
    { id: "followership", icon: "\ud83e\udd1d", label: "Follower Duties" },
    { id: "comms", icon: "\ud83d\udcfb", label: "Comms Log" },
    { id: "rifle", icon: "\ud83c\udfaf", label: "Rifle Diagram" },
    { id: "rangesop", icon: "\ud83d\udcd0", label: "Range SOP" },
    { id: "sights", icon: "\ud83d\udc41\ufe0f", label: "Sight Alignment" },
    { id: "rankchart", icon: "\ud83c\udf96\ufe0f", label: "Rank Chart" },
    { id: "uniform", icon: "\ud83d\udc55", label: "Uniform Guide" },
    { id: "layering", icon: "\ud83e\udde5", label: "Layering System" },
    { id: "mapmargin", icon: "\ud83d\uddfa\ufe0f", label: "Map Margin" },
    { id: "contours", icon: "\u26f0\ufe0f", label: "Contour Guide" },
    { id: "gridref", icon: "\ud83d\udccd", label: "Grid Reference Manual" }
  ]

  // ==========================================================
  // MISSIONS — 22 combined expedition + fieldcraft training modules
  // ==========================================================
  const MISSIONS = [
    {
      id: "kitpacking",
      order: 1,
      tag: "EXP-101",
      icon: "🎒",
      title: "Expedition Kit Packing",
      desc: "Select the right gear for a day expedition without overpacking — the foundation of every safe trip.",
      xp: 100,
      brief: "You are preparing for a day-long expedition into backcountry terrain. The expedition leader has asked you to assemble your kit. You must choose the right gear without overpacking. Every item matters — too little and you risk exposure, too much and you fatigue early.",
      scene: "kit",
      chapters: [
        { title: "Essential System", desc: "Identify the core gear every expedition must carry." },
        { title: "Footwear Choice", desc: "Select appropriate footwear for the terrain." },
        { title: "Layering Pack", desc: "Pack clothing layers for variable weather." },
        { title: "Final Inventory", desc: "Confirm the packed kit before departure." }
      ],
      tasks: [
        {
          type: "select", tool: "gearlist",
          title: "Identify the Essential System",
          prompt: "Which group represents the core survival priorities every expedition kit must address?",
          options: [
            "Shelter, water, fire, food, first aid",
            "Camera, snacks, phone, headphones",
            "Tent, sleeping bag, stove, lantern",
            "Map, compass, GPS, radio, flare"
          ],
          expected: "Shelter, water, fire, food, first aid",
          proof: "Essential system confirmed — shelter, water, fire, food, and first aid. The five survival priorities every kit must cover."
        },
        {
          type: "select", tool: "gearlist",
          title: "Select Appropriate Footwear",
          prompt: "For a mixed-terrain day expedition with rocky trails and stream crossings, which footwear is best?",
          options: [
            "Broken-in waterproof hiking boots with ankle support",
            "Brand-new stiff mountaineering boots",
            "Lightweight running shoes",
            "Rubber rain boots"
          ],
          expected: "Broken-in waterproof hiking boots with ankle support",
          proof: "Footwear selected — broken-in waterproof boots with ankle support. Protection without blister risk from unbroken leather."
        },
        {
          type: "toggle", tool: "gearlist",
          title: "Pack Clothing Layers",
          prompt: "Enable confirmation that you have packed a base layer, insulating mid-layer, and waterproof shell — the full layering system.",
          expected: true,
          proof: "Layering system packed — base, insulating, and shell layers ready for variable backcountry weather."
        },
        {
          type: "note", tool: "gearlist",
          title: "Confirm the Final Inventory",
          prompt: "Write a note listing your final packed kit, confirming you have not overpacked. Include the keywords 'water', 'first aid', and 'layering'.",
          keywords: ["water", "first aid", "layering"],
          proof: "Kit inventory confirmed — essentials packed, excess left behind. Kit packing mission complete."
        }
      ]
    },
    {
      id: "weatherreading",
      order: 2,
      tag: "EXP-102",
      icon: "🌦️",
      title: "Weather Reading & Conditions",
      desc: "Interpret cloud formations, pressure trends, and wind signs to anticipate changing backcountry weather.",
      xp: 100,
      brief: "You are leading a small group on a ridge trail. The sky is changing. You must read the weather signs — cloud types, wind direction, and pressure trends — to decide whether to continue or seek shelter. A wrong call could expose the group to a storm.",
      scene: "weather",
      chapters: [
        { title: "Cloud Types", desc: "Identify cloud formations and what they signal." },
        { title: "Pressure Trend", desc: "Read a falling barometer for incoming weather." },
        { title: "Wind Signs", desc: "Interpret wind direction and speed changes." },
        { title: "Go / No-Go", desc: "Make the weather-based decision." }
      ],
      tasks: [
        {
          type: "select", tool: "forecast",
          title: "Identify the Cloud Formation",
          prompt: "You see towering, dark-bottomed clouds building rapidly with an anvil-shaped top. What does this signal?",
          options: [
            "An approaching thunderstorm — seek shelter immediately",
            "Clear fair weather ahead",
            "Light drizzle for several hours",
            "Fog forming overnight"
          ],
          expected: "An approaching thunderstorm — seek shelter immediately",
          proof: "Cumulonimbus identified — anvil top signals a thunderstorm. The correct call is to seek shelter now."
        },
        {
          type: "toggle", tool: "forecast",
          title: "Read the Pressure Trend",
          prompt: "Enable confirmation that a rapidly falling barometer indicates deteriorating weather approaching.",
          expected: true,
          proof: "Pressure trend confirmed — falling barometer means a weather system is moving in. Time to prepare."
        },
        {
          type: "select", tool: "forecast",
          title: "Interpret Wind Signs",
          prompt: "The wind has shifted suddenly to come from the east and is increasing in speed. What is the most likely interpretation?",
          options: [
            "A weather front is passing through — expect change soon",
            "The wind will stop completely",
            "It is a permanent climate shift",
            "Wind direction never matters for weather"
          ],
          expected: "A weather front is passing through — expect change soon",
          proof: "Wind shift interpreted — a frontal passage. Expect precipitation or temperature change within hours."
        },
        {
          type: "note", tool: "forecast",
          title: "Make the Go / No-Go Decision",
          prompt: "Write a note recording your decision based on the signs you read. Include the keywords 'shelter', 'storm', and 'group'.",
          keywords: ["shelter", "storm", "group"],
          proof: "Decision recorded — group directed to shelter ahead of the storm. Weather reading mission complete."
        }
      ]
    },
    {
      id: "campsiteassessment",
      order: 3,
      tag: "EXP-103",
      icon: "⛺",
      title: "Campsite Selection & Assessment",
      desc: "Evaluate terrain for safe campsite selection — avoid hazards and choose a sheltered, sustainable spot.",
      xp: 100,
      brief: "Your group has reached the planned camp zone as evening approaches. You must assess the terrain and select a safe campsite. Avoid dead trees, low ground, and water edges. A poor choice risks flooding, falling limbs, or cold-air pooling.",
      scene: "campsite",
      chapters: [
        { title: "Overhead Hazards", desc: "Check for dead limbs (widowmakers) above the site." },
        { title: "Ground Drainage", desc: "Avoid low ground where cold air and water pool." },
        { title: "Water Proximity", desc: "Set the right distance from the water source." },
        { title: "Surface & Shelter", desc: "Choose a flat, naturally sheltered surface." }
      ],
      tasks: [
        {
          type: "select", tool: "campsite",
          title: "Check for Overhead Hazards",
          prompt: "Before pitching a tent, what overhead hazard must you check for?",
          options: [
            "Dead or hanging limbs (widowmakers) that could fall",
            "The height of nearby birds",
            "Satellite coverage",
            "The colour of the leaves"
          ],
          expected: "Dead or hanging limbs (widowmakers) that could fall",
          proof: "Overhead checked — no dead limbs above the site. Widowmakers ruled out. First safety check complete."
        },
        {
          type: "select", tool: "campsite",
          title: "Assess Ground Drainage",
          prompt: "Why should you avoid camping in the lowest point of a valley or depression?",
          options: [
            "Cold air and rainwater pool in low ground, risking hypothermia and flooding",
            "It is too close to the stars",
            "Low ground is always warmer",
            "Animals never go to low ground"
          ],
          expected: "Cold air and rainwater pool in low ground, risking hypothermia and flooding",
          proof: "Drainage assessed — low ground avoided. Cold-air pooling and flood risk eliminated."
        },
        {
          type: "select", tool: "campsite",
          title: "Set Water Proximity",
          prompt: "What is the recommended minimum distance to camp from a lake or stream?",
          options: [
            "At least 60 metres (200 feet)",
            "Right at the water's edge for convenience",
            "10 metres is fine",
            "As far as possible, over 500 metres"
          ],
          expected: "At least 60 metres (200 feet)",
          proof: "Water distance set — 60 metres from the source. Protects the waterway and follows leave-no-trace guidelines."
        },
        {
          type: "note", tool: "campsite",
          title: "Confirm Surface and Shelter",
          prompt: "Write a note describing the surface you chose and the natural shelter features. Include the keywords 'flat', 'sheltered', and 'wind'.",
          keywords: ["flat", "sheltered", "wind"],
          proof: "Surface confirmed — flat, well-drained, and sheltered from prevailing wind. Campsite assessment mission complete."
        }
      ]
    },
    {
      id: "shelterbuilding",
      order: 4,
      tag: "EXP-104",
      icon: "🏚️",
      title: "Emergency Shelter Building",
      desc: "Construct a temporary emergency shelter using natural materials and a tarp in a survival situation.",
      xp: 100,
      brief: "A member of your group is showing early signs of exposure and the weather is deteriorating. You must build an emergency shelter quickly. Using a tarp and natural materials, construct a lean-to that blocks wind and retains body heat. Speed and technique matter.",
      scene: "shelter",
      chapters: [
        { title: "Site Selection", desc: "Choose a sheltered spot with natural windbreak." },
        { title: "Ridge Line", desc: "Set the ridge line between two anchor points." },
        { title: "Tarp Pitch", desc: "Pitch the tarp as a lean-to at the correct angle." },
        { title: "Insulation", desc: "Add ground insulation to prevent heat loss." }
      ],
      tasks: [
        {
          type: "select", tool: "shelter",
          title: "Select the Shelter Site",
          prompt: "Where is the best location to build an emergency lean-to shelter?",
          options: [
            "A naturally sheltered spot protected from wind, with natural anchor points",
            "An exposed hilltop for maximum visibility",
            "The lowest point in a gully",
            "Directly under a dead tree"
          ],
          expected: "A naturally sheltered spot protected from wind, with natural anchor points",
          proof: "Site selected — sheltered from wind with two sturdy anchor trees for the ridge line."
        },
        {
          type: "toggle", tool: "shelter",
          title: "Set the Ridge Line",
          prompt: "Enable confirmation that the ridge line is secured between two anchor points at waist height, parallel to the wind.",
          expected: true,
          proof: "Ridge line secured — taut between two trees at waist height, oriented to block the prevailing wind."
        },
        {
          type: "select", tool: "shelter",
          title: "Pitch the Tarp",
          prompt: "At what angle should the tarp be pitched on the windward side for an effective lean-to?",
          options: [
            "Approximately 45 degrees — steep enough to shed rain, low enough to trap heat",
            "Completely flat like a roof",
            "Vertical like a wall",
            "Touching the ground on all sides"
          ],
          expected: "Approximately 45 degrees — steep enough to shed rain, low enough to trap heat",
          proof: "Tarp pitched at 45 degrees on the windward side — sheds rain while trapping a pocket of warm air inside."
        },
        {
          type: "note", tool: "shelter",
          title: "Add Ground Insulation",
          prompt: "Write a note explaining why ground insulation is critical and what materials you used. Include the keywords 'ground', 'conduction', and 'insulation'.",
          keywords: ["ground", "conduction", "insulation"],
          proof: "Ground insulation added — a thick layer of pine boughs blocks conductive heat loss to the cold earth. Shelter building mission complete."
        }
      ]
    },
    {
      id: "firesafety",
      order: 5,
      tag: "EXP-105",
      icon: "🔥",
      title: "Fire Lighting & Safety",
      desc: "Build a safe campfire with proper site prep, the fire triangle, and full extinguishing protocol.",
      xp: 100,
      brief: "Evening has fallen and the temperature is dropping. You need to build a campfire for warmth and morale. You must prepare the site correctly, understand the fire triangle, and know the extinguishing protocol. A careless fire risks wildfire — safety is paramount.",
      scene: "fire",
      chapters: [
        { title: "Site Preparation", desc: "Clear and prepare a safe fire site." },
        { title: "Fire Triangle", desc: "Understand the three elements fire needs." },
        { title: "Ignition & Build", desc: "Light and build the fire correctly." },
        { title: "Extinguish Protocol", desc: "Fully extinguish the fire before leaving." }
      ],
      tasks: [
        {
          type: "select", tool: "firesafe",
          title: "Prepare the Fire Site",
          prompt: "How should you prepare the ground before lighting a campfire?",
          options: [
            "Clear a 3-metre radius down to bare mineral soil, ring with stones",
            "Light it directly on dry grass",
            "Build it on a bed of dry leaves",
            "No preparation is needed"
          ],
          expected: "Clear a 3-metre radius down to bare mineral soil, ring with stones",
          proof: "Fire site prepared — 3-metre radius cleared to mineral soil, ringed with stones. No combustible material nearby."
        },
        {
          type: "select", tool: "firesafe",
          title: "Identify the Fire Triangle",
          prompt: "What are the three elements of the fire triangle that must all be present for combustion?",
          options: [
            "Heat, fuel, and oxygen",
            "Water, wind, and wood",
            "Spark, stone, and steel",
            "Light, air, and earth"
          ],
          expected: "Heat, fuel, and oxygen",
          proof: "Fire triangle confirmed — heat, fuel, and oxygen. Remove any one and the fire cannot sustain."
        },
        {
          type: "toggle", tool: "firesafe",
          title: "Light and Build the Fire",
          prompt: "Enable confirmation that you built the fire with tinder first, then kindling, then fuelwood — graduated layering.",
          expected: true,
          proof: "Fire built correctly — tinder lit, kindling added, fuelwood stacked. Graduated build ensures a sustainable flame."
        },
        {
          type: "note", tool: "firesafe",
          title: "Execute the Extinguish Protocol",
          prompt: "Write a note describing how you fully extinguish the fire before leaving the site. Include the keywords 'water', 'stir', and 'cold'.",
          keywords: ["water", "stir", "cold"],
          proof: "Extinguish protocol executed — drowned with water, stirred, and confirmed cold to the touch. Fire safety mission complete."
        }
      ]
    },
    {
      id: "waterpurification",
      order: 6,
      tag: "EXP-106",
      icon: "💧",
      title: "Water Sourcing & Purification",
      desc: "Find safe water sources and purify backcountry water to prevent illness on extended expeditions.",
      xp: 100,
      brief: "Your group's water supply is running low on day two of the expedition. You have found a clear mountain stream, but backcountry water is never safe to drink untreated. You must select a good source and purify it correctly to prevent giardia and other waterborne illness.",
      scene: "water",
      chapters: [
        { title: "Source Selection", desc: "Choose the safest type of water source." },
        { title: "Pre-Filter", desc: "Remove sediment before purifying." },
        { title: "Purify", desc: "Apply the correct purification method." },
        { title: "Verify Safe", desc: "Confirm the water is safe to drink." }
      ],
      tasks: [
        {
          type: "select", tool: "waterpurify",
          title: "Select the Water Source",
          prompt: "Which water source is generally the safest to collect from in the backcountry?",
          options: [
            "A fast-flowing stream at high elevation, upstream of any camp or grazing area",
            "A stagnant pond",
            "Water pooled in a animal track",
            "Water from downstream of a campsite"
          ],
          expected: "A fast-flowing stream at high elevation, upstream of any camp or grazing area",
          proof: "Source selected — fast-flowing, high-elevation, upstream of contamination. The cleanest available source."
        },
        {
          type: "toggle", tool: "waterpurify",
          title: "Pre-Filter the Water",
          prompt: "Enable confirmation that you pre-filtered the water through cloth to remove sediment and debris before purifying.",
          expected: true,
          proof: "Water pre-filtered — sediment and debris removed through cloth. Ready for purification."
        },
        {
          type: "select", tool: "waterpurify",
          title: "Apply the Purification Method",
          prompt: "What is the most reliable method to purify backcountry water when you cannot boil it?",
          options: [
            "Chemical purification tablets (iodine or chlorine dioxide) for the full contact time",
            "Just let it sit in the sun",
            "Add flavour drops",
            "Shake it vigorously"
          ],
          expected: "Chemical purification tablets (iodine or chlorine dioxide) for the full contact time",
          proof: "Purification applied — chemical tablets added for the full contact time (typically 30 minutes). Kills pathogens."
        },
        {
          type: "note", tool: "waterpurify",
          title: "Verify the Water is Safe",
          prompt: "Write a note confirming the purification is complete and the water is safe. Include the keywords 'contact time', 'clear', and 'safe'.",
          keywords: ["contact time", "clear", "safe"],
          proof: "Water verified safe — full contact time elapsed, water is clear and treated. Water purification mission complete."
        }
      ]
    },
    {
      id: "knotcraft",
      order: 7,
      tag: "EXP-107",
      icon: "🪢",
      title: "Essential Knots & Rope Work",
      desc: "Tie the core expedition knots — bowline, taut-line hitch, and clove hitch — for shelters and securing loads.",
      xp: 100,
      brief: "You need to secure a tarp shelter and guy lines for the camp. The expedition leader has asked you to demonstrate the three essential knots. Each knot has a specific purpose — a bowline for a fixed loop, a taut-line hitch for adjustable tension, and a clove hitch for temporary anchoring.",
      scene: "knots",
      chapters: [
        { title: "The Bowline", desc: "Tie a fixed, non-slipping loop — the king of knots." },
        { title: "Taut-Line Hitch", desc: "Tie an adjustable tension knot for guy lines." },
        { title: "Clove Hitch", desc: "Tie a quick temporary anchor to a post." },
        { title: "Application", desc: "Match each knot to its correct use." }
      ],
      tasks: [
        {
          type: "select", tool: "knots",
          title: "Identify the Bowline",
          prompt: "What is the primary purpose of the bowline knot?",
          options: [
            "Creates a fixed loop that does not slip under load",
            "Joins two ropes of different thickness",
            "Stops a rope from fraying",
            "Shortens a rope without cutting"
          ],
          expected: "Creates a fixed loop that does not slip under load",
          proof: "Bowline identified — a fixed, non-slipping loop. Ideal for securing a line to a fixed point or harness."
        },
        {
          type: "select", tool: "knots",
          title: "Identify the Taut-Line Hitch",
          prompt: "Why is the taut-line hitch the go-to knot for tent guy lines?",
          options: [
            "It is adjustable — you can slide it to change tension without retying",
            "It is the strongest knot known",
            "It can hold a person's weight",
            "It unties itself automatically"
          ],
          expected: "It is adjustable — you can slide it to change tension without retying",
          proof: "Taut-line hitch identified — adjustable tension. Perfect for guy lines that need fine-tuning after pitching."
        },
        {
          type: "toggle", tool: "knots",
          title: "Tie the Clove Hitch",
          prompt: "Enable confirmation that you tied a clove hitch to temporarily anchor a line to a tree post.",
          expected: true,
          proof: "Clove hitch tied — a quick temporary anchor around the post. Easy to adjust and release."
        },
        {
          type: "note", tool: "knots",
          title: "Match Knots to Applications",
          prompt: "Write a note matching each knot to its correct expedition use. Include the keywords 'bowline', 'taut-line', and 'clove'.",
          keywords: ["bowline", "taut-line", "clove"],
          proof: "Knots matched to applications — bowline for fixed loops, taut-line for guy tension, clove for temporary anchors. Knotcraft mission complete."
        }
      ]
    },
    {
      id: "trailnavigation",
      order: 8,
      tag: "EXP-108",
      icon: "🧭",
      title: "Trail Navigation & Compass Bearing",
      desc: "Take a compass bearing, measure distance by pacing, and follow a route through unfamiliar terrain.",
      xp: 100,
      brief: "Your group needs to navigate from your current position to a trail junction 1.2 km away through forest with limited visibility. You must take a compass bearing, estimate distance by pacing count, and follow the bearing to stay on course. Losing the bearing means losing the trail.",
      scene: "navcompass",
      chapters: [
        { title: "Take the Bearing", desc: "Set a compass bearing to the target." },
        { title: "Pace Count", desc: "Estimate distance using your pace length." },
        { title: "Handrail Feature", desc: "Use a linear terrain feature as a guide." },
        { title: "Arrive & Confirm", desc: "Confirm arrival at the trail junction." }
      ],
      tasks: [
        {
          type: "select", tool: "compass",
          title: "Take the Compass Bearing",
          prompt: "What is the correct method to follow a compass bearing through forest with limited visibility?",
          options: [
            "Pick a visible object on the bearing line, walk to it, then repeat",
            "Stare at the compass the entire time while walking",
            "Walk in the general direction and hope for the best",
            "Follow the sun only"
          ],
          expected: "Pick a visible object on the bearing line, walk to it, then repeat",
          proof: "Bearing method correct — sight a tree on the bearing line, walk to it, re-sight. Prevents drift in low visibility."
        },
        {
          type: "type", tool: "compass",
          title: "Calculate the Pace Count",
          prompt: "If your pace count is 65 double-paces per 100 m, how many double-paces for 1.2 km? (Type just the number.)",
          expected: "780",
          proof: "Pace count calculated — 780 double-paces for 1.2 km. Distance estimation by pacing confirmed."
        },
        {
          type: "toggle", tool: "compass",
          title: "Use a Handrail Feature",
          prompt: "Enable confirmation that you identified a linear terrain feature (a ridge or stream) running parallel to your route as a handrail.",
          expected: true,
          proof: "Handrail identified — the ridgeline runs parallel to your bearing. A natural guide keeps you on course."
        },
        {
          type: "note", tool: "compass",
          title: "Confirm Arrival at the Junction",
          prompt: "Write a note confirming you reached the trail junction and verified your position. Include the keywords 'bearing', 'junction', and 'verified'.",
          keywords: ["bearing", "junction", "verified"],
          proof: "Arrival confirmed — trail junction reached, position verified against the map. Trail navigation mission complete."
        }
      ]
    },
    {
      id: "leavenotrace",
      order: 9,
      tag: "EXP-109",
      icon: "♻️",
      title: "Leave-No-Trace Ethics",
      desc: "Apply the seven Leave-No-Trace principles to minimise your impact on the wilderness.",
      xp: 100,
      brief: "Your group has been camped for two days in a pristine backcountry meadow. Before you break camp, the expedition leader wants you to demonstrate the Leave-No-Trace principles. Every trace you leave damages the wilderness for future visitors and wildlife. You must leave the site exactly as you found it — or better.",
      scene: "lnt",
      chapters: [
        { title: "Waste Disposal", desc: "Pack out all waste, including food scraps." },
        { title: "Campfire Impact", desc: "Minimise fire impact or use a stove." },
        { title: "Trail Etiquette", desc: "Travel and camp on durable surfaces." },
        { title: "Wildlife Respect", desc: "Respect wildlife and keep distance." }
      ],
      tasks: [
        {
          type: "select", tool: "lntguide",
          title: "Plan Waste Disposal",
          prompt: "What should you do with all waste — including food scraps and biodegradable items — when breaking camp?",
          options: [
            "Pack out everything; leave nothing behind, not even orange peels",
            "Bury food scraps near the camp",
            "Burn all waste in the fire",
            "Scatter scraps for wildlife"
          ],
          expected: "Pack out everything; leave nothing behind, not even orange peels",
          proof: "Waste disposal confirmed — everything packed out. Even biodegradable items disrupt the local ecosystem if left."
        },
        {
          type: "toggle", tool: "lntguide",
          title: "Minimise Campfire Impact",
          prompt: "Enable confirmation that you used a lightweight stove instead of a fire, or if a fire was built, you used an existing fire ring and dispersed the ashes.",
          expected: true,
          proof: "Fire impact minimised — stove used for cooking, existing ring only for a small fire. Ashes dispersed, no new scars."
        },
        {
          type: "select", tool: "lntguide",
          title: "Practice Trail Etiquette",
          prompt: "When travelling through fragile alpine vegetation, how should your group walk?",
          options: [
            "Single file in the centre of existing trails; spread out only on durable rock surfaces",
            "Side by side to create a new path",
            "Cut switchbacks to save time",
            "Scatter widely across the meadow"
          ],
          expected: "Single file in the centre of existing trails; spread out only on durable rock surfaces",
          proof: "Trail etiquette applied — single file on existing trail. Fragile vegetation protected from trampling."
        },
        {
          type: "note", tool: "lntguide",
          title: "Respect Wildlife",
          prompt: "Write a note describing how you respected wildlife and stored food properly. Include the keywords 'distance', 'food storage', and 'wildlife'.",
          keywords: ["distance", "food storage", "wildlife"],
          proof: "Wildlife respected — distance maintained, food stored in bear-safe containers. Leave-no-trace mission complete."
        }
      ]
    },
    {
      id: "wildlifesafety",
      order: 10,
      tag: "EXP-110",
      icon: "🐻",
      title: "Wildlife Safety & Bear Encounters",
      desc: "Store food safely, prevent animal encounters, and respond correctly if you encounter a bear.",
      xp: 100,
      brief: "You are in bear country. Your group must store food correctly to avoid attracting wildlife, and everyone must know how to respond if a bear is encountered. Panic or running could trigger a chase. The correct response depends on the bear species and the situation. Preparation prevents dangerous encounters.",
      scene: "wildlife",
      chapters: [
        { title: "Food Storage", desc: "Store food and scented items away from camp." },
        { title: "Make Noise", desc: "Prevent surprise encounters on the trail." },
        { title: "Bear Species", desc: "Distinguish black bear from grizzly responses." },
        { title: "Encounter Response", desc: "Execute the correct encounter protocol." }
      ],
      tasks: [
        {
          type: "select", tool: "wildlife",
          title: "Store Food Safely",
          prompt: "How should food and scented items be stored in bear country?",
          options: [
            "In a bear canister or bear bag suspended at least 4 metres up, 1.5 metres from the trunk",
            "Inside the tent with you",
            "On the ground near the fire",
            "In your backpack by the tent door"
          ],
          expected: "In a bear canister or bear bag suspended at least 4 metres up, 1.5 metres from the trunk",
          proof: "Food storage confirmed — bear bag suspended 4 m up, 1.5 m from the trunk. Bears cannot reach it."
        },
        {
          type: "toggle", tool: "wildlife",
          title: "Make Noise on the Trail",
          prompt: "Enable confirmation that your group makes noise — talking, clapping, or bear bells — on the trail to prevent surprise encounters.",
          expected: true,
          proof: "Noise protocol confirmed — group announces presence. Surprising a bear is the most common cause of defensive attacks."
        },
        {
          type: "select", tool: "wildlife",
          title: "Distinguish the Bear Response",
          prompt: "If you encounter a BLACK bear, what is the recommended response?",
          options: [
            "Stand your ground, make yourself look big, and if it attacks — fight back",
            "Run away as fast as possible",
            "Climb a tree immediately",
            "Play dead on the ground"
          ],
          expected: "Stand your ground, make yourself look big, and if it attacks — fight back",
          proof: "Black bear response confirmed — stand ground, look big, fight back if attacked. Never run from a bear."
        },
        {
          type: "note", tool: "wildlife",
          title: "Execute the Encounter Protocol",
          prompt: "Write a note describing the full encounter response for a surprise bear sighting. Include the keywords 'calm', 'back away', and 'eye contact'.",
          keywords: ["calm", "back away", "eye contact"],
          proof: "Encounter protocol executed — stayed calm, backed away slowly, maintained eye contact. Wildlife safety mission complete."
        }
      ]
    },
    {
      id: "emergencyresponse",
      order: 11,
      tag: "EXP-111",
      icon: "🩹",
      title: "Emergency Response & First Aid",
      desc: "Assess an injured cadet, prioritise first-aid steps, and execute a safe evacuation plan.",
      xp: 100,
      brief: "Final mission. A member of your group has fallen on a rocky slope and is injured. You must assess the situation, apply the correct first-aid priorities, and execute a safe evacuation plan. In the backcountry, you are the first responder. Staying calm and following protocol saves lives.",
      scene: "firstaid",
      chapters: [
        { title: "Scene Safety", desc: "Ensure the scene is safe before approaching." },
        { title: "Primary Survey", desc: "Check airway, breathing, and circulation first." },
        { title: "Stabilise", desc: "Immobilise injuries and prevent shock." },
        { title: "Evacuation Plan", desc: "Plan and execute a safe evacuation." }
      ],
      tasks: [
        {
          type: "select", tool: "firstaid",
          title: "Ensure Scene Safety",
          prompt: "What is the very first step before approaching an injured person in the backcountry?",
          options: [
            "Ensure the scene is safe — no ongoing hazard to you or the casualty",
            "Run to them immediately",
            "Start CPR right away",
            "Call for a helicopter first"
          ],
          expected: "Ensure the scene is safe — no ongoing hazard to you or the casualty",
          proof: "Scene safety confirmed — rockfall risk assessed and eliminated. A rescuer who becomes a second casualty helps no one."
        },
        {
          type: "select", tool: "firstaid",
          title: "Conduct the Primary Survey",
          prompt: "In the primary survey, what do you check first for an unconscious casualty?",
          options: [
            "Airway, then breathing, then circulation (the ABC)",
            "Pulse only",
            "Whether they can walk",
            "Their identification"
          ],
          expected: "Airway, then breathing, then circulation (the ABC)",
          proof: "Primary survey conducted — ABC checked. Airway clear, breathing present, pulse strong. No immediate life threat."
        },
        {
          type: "toggle", tool: "firstaid",
          title: "Stabilise and Prevent Shock",
          prompt: "Enable confirmation that you immobilised the suspected fracture and kept the casualty warm to prevent shock.",
          expected: true,
          proof: "Casualty stabilised — leg immobilised with a improvised splint, kept warm in a sleeping bag. Shock risk reduced."
        },
        {
          type: "note", tool: "firstaid",
          title: "Plan the Evacuation",
          prompt: "Write a note describing your evacuation plan for the injured cadet. Include the keywords 'send for help', 'stable', and 'evacuate'.",
          keywords: ["send for help", "stable", "evacuate"],
          proof: "Evacuation plan executed — two cadets sent for help, casualty kept stable and monitored, carry-out prepared. Emergency response mission complete. All 11 Wildtrail missions complete. Outstanding work, Expedition Leader."
        }
      ]
    }
,
{
      id: "followership",
      order: 12,
      tag: "PO M103",
      icon: "🤝",
      title: "Followership & Team Responsibilities",
      desc: "Demonstrate proper follower responsibilities — respect, cooperation, honesty, and clear communication.",
      xp: 100,
      brief: "Your section commander has assigned a patrol task. Demonstrate proper follower responsibilities from M103: respect, cooperation, honesty, and clear communication. Your team is counting on you.",
      scene: "orders",
      chapters: [
        { title: "Patrol Order", desc: "Review the section order and confirm your assigned role." },
        { title: "Follower Duties", desc: "Understand the responsibilities of a good follower." },
        { title: "Communication", desc: "Report readiness clearly over the radio." },
        { title: "Honesty", desc: "Demonstrate honest self-assessment about preparation." }
      ],
      tasks: [
        {
          type: "select", tool: "orders",
          title: "Review the Patrol Order",
          prompt: "Open Section Orders and select your assigned task for this patrol.",
          options: [
            "Move to checkpoint Bravo, conduct observation, report findings",
            "Stay at base and clean equipment",
            "Go wherever the group goes without checking the order",
            "Lead the patrol yourself since you know the area"
          ],
          expected: "Move to checkpoint Bravo, conduct observation, report findings",
          proof: "Patrol order reviewed and assigned role confirmed — move to checkpoint Bravo."
        },
        {
          type: "select", tool: "followership",
          title: "Confirm Follower Responsibilities",
          prompt: "Choose the set of responsibilities that define a good follower (M103.01).",
          options: [
            "Respect, cooperate, admit mistakes, be honest, communicate clearly",
            "Ignore orders, do your own thing, stay quiet until asked",
            "Argue with the commander and refuse tasks you dislike",
            "Only follow orders when you agree with them"
          ],
          expected: "Respect, cooperate, admit mistakes, be honest, communicate clearly",
          proof: "Follower responsibilities confirmed from M103.01 — respect, cooperation, honesty, communication."
        },
        {
          type: "toggle", tool: "comms",
          title: "Report Readiness on the Radio",
          prompt: "Open the Comms Log and toggle your readiness report to the section commander ON.",
          expected: true,
          proof: "Readiness reported clearly over the radio net — communication complete."
        },
        {
          type: "note", tool: "followership",
          title: "Demonstrate Honest Self-Assessment",
          prompt: "Write a short honest note about any gaps in your preparation and what you need to review before stepping off. Include the keywords 'honest', 'review', and 'prepare'.",
          keywords: ["honest", "review", "prepare"],
          proof: "Honest self-assessment demonstrated — a key follower responsibility. Mission complete."
        }
      ]
    },
    {
      id: "rifle_parts",
      order: 13,
      tag: "PO M106.01",
      icon: "🎯",
      title: "Daisy 853C — Parts Identification",
      desc: "Identify the major parts of the Daisy 853C air rifle before handling it on the range.",
      xp: 100,
      brief: "You are at the range for marksmanship training (M106). Before handling the Daisy 853C air rifle, you must identify its major parts correctly. Using the wrong terminology could lead to a safety misunderstanding.",
      scene: "rifle",
      chapters: [
        { title: "Butt Plate", desc: "Identify the rear shoulder contact part." },
        { title: "Safety Catch", desc: "Identify the critical safe/loaded control." },
        { title: "Front Sight", desc: "Identify the front aiming element." },
        { title: "Range Check", desc: "Confirm all parts knowledge with the range officer." }
      ],
      tasks: [
        {
          type: "type", tool: "rifle",
          title: "Identify the Rear Shoulder Part",
          prompt: "Open the Rifle Diagram and type the name of the rearmost part that rests against the shooter's shoulder.",
          expected: "butt plate",
          proof: "Butt plate correctly identified as the rear shoulder contact."
        },
        {
          type: "select", tool: "rangesop",
          title: "Identify the Safety Control",
          prompt: "Select the mechanism that controls the safe/loaded status of the rifle.",
          options: [
            "Safety catch",
            "Trigger guard",
            "Pump handle",
            "Bolt handle"
          ],
          expected: "Safety catch",
          proof: "Safety catch identified as the critical safe/loaded control — black = ON, red = OFF."
        },
        {
          type: "type", tool: "rifle",
          title: "Identify the Front Aiming Element",
          prompt: "Type the name of the front sight with the round opening (global ____).",
          expected: "global aperture",
          proof: "Global aperture identified as the front aiming element with the round opening."
        },
        {
          type: "note", tool: "rangesop",
          title: "Confirm Parts Knowledge with Range Officer",
          prompt: "Write a note confirming you have identified all major parts and are ready for the range officer check. Include the keywords 'parts', 'confirmed', and 'range officer'.",
          keywords: ["parts", "confirmed", "range officer"],
          proof: "Parts knowledge confirmed with the range officer. Rifle parts mission complete."
        }
      ]
    },
    {
      id: "range_safety",
      order: 14,
      tag: "PO M106.02",
      icon: "🔒",
      title: "Range Safety — Rifle Handling Protocol",
      desc: "Guide a cadet through the safe removal of the Daisy 853C from its case — 8 critical steps.",
      xp: 100,
      brief: "A cadet is removing the Daisy 853C from its case. You must guide them through the safe removal procedure (M106.02). One wrong move and the range goes cold. Safety is everyone's responsibility.",
      scene: "range",
      chapters: [
        { title: "Safety Catch", desc: "Verify the safety catch is ON before handling." },
        { title: "Bolt & Pump", desc: "Confirm bolt is open and pump handle partially open." },
        { title: "Safety Rod", desc: "Insert the safety rod from the muzzle end." },
        { title: "Lift Clear", desc: "Lift the rifle with muzzle pointed down range." }
      ],
      tasks: [
        {
          type: "select", tool: "rangesop",
          title: "Verify the Safety Catch",
          prompt: "What colour should the safety catch show when it is ON (safe)?",
          options: ["Black", "Red", "Green", "White"],
          expected: "Black",
          proof: "Safety catch verified ON — black showing. First and most critical check complete."
        },
        {
          type: "toggle", tool: "rangesop",
          title: "Confirm Bolt and Pump Position",
          prompt: "Enable confirmation that the bolt is pulled fully back (open) and the pump handle is partially open.",
          expected: true,
          proof: "Bolt open and pump handle partially open — confirmed safe."
        },
        {
          type: "select", tool: "rifle",
          title: "Insert the Safety Rod",
          prompt: "Where should the safety rod be inserted to verify the barrel is clear?",
          options: [
            "From the muzzle end",
            "From the breech end",
            "Through the trigger guard",
            "Not needed if the bolt is open"
          ],
          expected: "From the muzzle end",
          proof: "Safety rod inserted from the muzzle end — barrel confirmed clear of obstructions."
        },
        {
          type: "note", tool: "rangesop",
          title: "Lift the Rifle Safely",
          prompt: "Write a note describing how to lift the rifle clear with correct muzzle direction. Include the keywords 'pistol grip', 'muzzle', and 'down range'.",
          keywords: ["pistol grip", "muzzle", "down range"],
          proof: "Rifle lifted safely with muzzle pointed down range. Range safety mission complete."
        }
      ]
    },
    {
      id: "marksmanship",
      order: 15,
      tag: "PO M106.03",
      icon: "🎯",
      title: "Marksmanship — Prone Position & Sight Alignment",
      desc: "Demonstrate correct prone position, sight alignment, and sight picture before loading and firing.",
      xp: 100,
      brief: "You are on the firing point preparing to shoot (M106.03). The range officer needs you to demonstrate correct prone position, sight alignment, and sight picture before you can load and fire.",
      scene: "sights",
      chapters: [
        { title: "Prone Position", desc: "Adopt correct prone with proper elbow and hand placement." },
        { title: "Sight Alignment", desc: "Achieve alignment between eye, rear sight, and front sight." },
        { title: "Sight Picture", desc: "Acquire the sight picture with the bull centered." },
        { title: "Loading Sequence", desc: "Execute the safe loading sequence." }
      ],
      tasks: [
        {
          type: "select", tool: "sights",
          title: "Adopt Correct Prone Position",
          prompt: "Where should the left elbow be positioned in the prone position (right-handed shooter)?",
          options: [
            "Directly under the rifle for support",
            "Out to the side for comfort",
            "On the ground behind the body",
            "Resting on the rucksack for height"
          ],
          expected: "Directly under the rifle for support",
          proof: "Left elbow positioned under the rifle — bone-on-bone support, not muscle strain."
        },
        {
          type: "select", tool: "sights",
          title: "Achieve Sight Alignment",
          prompt: "Select the correct sight alignment relationship.",
          options: [
            "Eye, rear sight, and front sight centered",
            "Eye and target only",
            "Front sight and barrel only",
            "Rear sight and target only"
          ],
          expected: "Eye, rear sight, and front sight centered",
          proof: "Sight alignment achieved between eye, rear sight (micrometer), and front sight (global aperture)."
        },
        {
          type: "toggle", tool: "sights",
          title: "Acquire the Sight Picture",
          prompt: "Enable sight picture acquisition — the bull centered inside the front aperture.",
          expected: true,
          proof: "Sight picture acquired — the bull floats centered in the front sight opening."
        },
        {
          type: "note", tool: "rangesop",
          title: "Execute the Loading Sequence",
          prompt: "Write a note describing the loading sequence in correct order. Include the keywords 'pellet', 'bolt', 'pump', and 'safety'.",
          keywords: ["pellet", "bolt", "pump", "safety"],
          proof: "Loading sequence executed safely — pellet on feed track, bolt closed, one pump, safety off when ready. Mission complete."
        }
      ]
    },
    {
      id: "range_commands",
      order: 16,
      tag: "PO M106.04",
      icon: "📢",
      title: "Range Commands & Fire Discipline",
      desc: "Respond correctly to range officer commands — a missed 'cease fire' could be catastrophic.",
      xp: 100,
      brief: "You are on a live range. The range officer is issuing commands. You must respond to each command correctly. A missed 'cease fire' could be catastrophic. Stay alert and follow every command instantly.",
      scene: "range_hot",
      chapters: [
        { title: "Relay, Load", desc: "Respond correctly to the load command." },
        { title: "Commence Fire", desc: "Begin firing with proper sight picture." },
        { title: "Cease Fire", desc: "Stop firing immediately — the most critical command." },
        { title: "Cease Fire Protocol", desc: "Complete the protocol and await commands." }
      ],
      tasks: [
        {
          type: "select", tool: "rangesop",
          title: "Respond to 'Relay, Load'",
          prompt: "What is the correct response to the command 'Relay, load'?",
          options: [
            "Place pellet on feed track, close bolt, pump once. Do not fire yet.",
            "Start firing immediately at the target",
            "Put the rifle down and wait silently",
            "Load as many pellets as possible and fire rapidly"
          ],
          expected: "Place pellet on feed track, close bolt, pump once. Do not fire yet.",
          proof: "Correct response to 'load' — rifle prepared but not yet fired. Discipline maintained."
        },
        {
          type: "toggle", tool: "rangesop",
          title: "Respond to 'Commence Fire'",
          prompt: "Enable your readiness to fire upon the 'commence fire' command — acquire sight picture first.",
          expected: true,
          proof: "Correct response to 'commence fire' — firing begins with proper sight picture."
        },
        {
          type: "select", tool: "rangesop",
          title: "Respond to 'Cease Fire'",
          prompt: "What must you do IMMEDIATELY on the command 'Relay, cease fire'?",
          options: [
            "Stop firing, safety ON, bolt open, finger off trigger",
            "Finish your current shot first since you had the sight picture",
            "Reload and prepare to fire again",
            "Put the rifle in the case immediately"
          ],
          expected: "Stop firing, safety ON, bolt open, finger off trigger",
          proof: "Cease fire executed instantly — safety catch on, bolt open, trigger finger clear. Textbook response."
        },
        {
          type: "note", tool: "rangesop",
          title: "Complete Cease Fire Protocol",
          prompt: "Write a note confirming you inserted the safety rod and are awaiting further commands. Include the keywords 'safety rod', 'awaiting', and 'commands'.",
          keywords: ["safety rod", "awaiting", "commands"],
          proof: "Cease fire protocol completed — safety rod in, awaiting commands. Range discipline mission complete."
        }
      ]
    },
    {
      id: "ranks_compliments",
      order: 17,
      tag: "PO M107",
      icon: "🎖️",
      title: "Army Cadet Ranks & Compliments",
      desc: "Identify ranks from insignia and pay the proper compliment — salute or stand at attention.",
      xp: 100,
      brief: "A senior cadet officer is approaching your position. You must identify their rank correctly and pay the proper compliment (M107). Drill and ceremonial knowledge reflects your discipline as an Army cadet.",
      scene: "ranks",
      chapters: [
        { title: "Rank Identification", desc: "Identify the approaching cadet's rank from insignia." },
        { title: "Compliment Decision", desc: "Determine whether a salute or standing at attention is appropriate." },
        { title: "Salute Execution", desc: "Execute the compliment correctly." },
        { title: "Address by Rank", desc: "Address the officer properly by rank." }
      ],
      tasks: [
        {
          type: "select", tool: "rankchart",
          title: "Identify the Rank",
          prompt: "Three pips on the insignia indicate which commissioned officer rank?",
          options: ["Captain", "Lieutenant", "Major", "Sergeant"],
          expected: "Captain",
          proof: "Rank identified correctly — Captain (three pips). A commissioned officer who rates a salute."
        },
        {
          type: "select", tool: "uniform",
          title: "Determine the Compliment",
          prompt: "You are wearing a beret (headdress). What is the proper compliment for a commissioned officer?",
          options: [
            "Salute with the right hand",
            "Stand at attention only",
            "Nod and say hello",
            "Wave casually since you recognize them"
          ],
          expected: "Salute with the right hand",
          proof: "Correct — headdress worn means salute. Without headdress, you would stand at attention instead."
        },
        {
          type: "toggle", tool: "uniform",
          title: "Execute the Salute",
          prompt: "Enable execution of the salute — right hand, palm forward, fingers extended, held until returned.",
          expected: true,
          proof: "Salute executed correctly and held until the officer returns it or passes."
        },
        {
          type: "note", tool: "uniform",
          title: "Address the Officer Properly",
          prompt: "Write a note describing how you address the officer and the importance of uniform discipline. Include the keywords 'sir', 'rank', and 'uniform'.",
          keywords: ["sir", "rank", "uniform"],
          proof: "Officer addressed by rank — 'Sir'. Uniform discipline demonstrated. Ranks and compliments mission complete."
        }
      ]
    },
    {
      id: "field_layering",
      order: 18,
      tag: "PO M121.01",
      icon: "🧥",
      title: "Field Training — The Layering System",
      desc: "Pack and wear the correct clothing layers to stay warm, dry, and effective in the field.",
      xp: 100,
      brief: "You are preparing for an overnight field exercise (M121). Temperature will drop to 2°C overnight. You must pack and wear the correct clothing layers to stay warm, dry, and effective in the field.",
      scene: "field",
      chapters: [
        { title: "Base Layer", desc: "Select the correct base layer fabric." },
        { title: "Insulating & Outer", desc: "Choose the insulating and outer layers." },
        { title: "Sleeping Bag", desc: "Select the appropriate sleeping bag insulation." },
        { title: "Dry Packing", desc: "Pack everything to stay dry during movement." }
      ],
      tasks: [
        {
          type: "select", tool: "layering",
          title: "Select the Base Layer Fabric",
          prompt: "Which fabric should you AVOID for the base layer in the field?",
          options: ["Cotton", "Synthetic (polyester)", "Wool", "Merino wool"],
          expected: "Cotton",
          proof: "Correct — cotton holds moisture and makes you cold ('cotton kills'). Choose synthetic or wool."
        },
        {
          type: "select", tool: "layering",
          title: "Choose Insulating and Outer Layers",
          prompt: "Select the correct insulating and outer layer combination.",
          options: [
            "Fleece insulating layer + waterproof/windproof shell",
            "T-shirt + rain poncho",
            "Cotton hoodie + light jacket",
            "Down vest only"
          ],
          expected: "Fleece insulating layer + waterproof/windproof shell",
          proof: "Insulating and outer layers selected — fleece traps warm air, the shell blocks wind and rain."
        },
        {
          type: "select", tool: "layering",
          title: "Select Sleeping Bag Insulation",
          prompt: "Which sleeping bag insulation is safer for damp Canadian field conditions?",
          options: [
            "Synthetic (retains warmth when damp)",
            "Down (lighter but useless when wet)",
            "Either one is fine",
            "No sleeping bag needed"
          ],
          expected: "Synthetic (retains warmth when damp)",
          proof: "Synthetic sleeping bag chosen — retains warmth in wet conditions where down would fail."
        },
        {
          type: "note", tool: "layering",
          title: "Pack Everything to Stay Dry",
          prompt: "Write a note describing how you pack your gear to keep it dry during the movement. Include the keywords 'waterproof', 'dry', and 'rucksack'.",
          keywords: ["waterproof", "dry", "rucksack"],
          proof: "Gear packed in waterproof bags inside the rucksack — stays dry. Layering system mission complete."
        }
      ]
    },
    {
      id: "map_marginal",
      order: 19,
      tag: "PO M122.02",
      icon: "🗺️",
      title: "Map Reading — Marginal Information",
      desc: "Read the map scale, contour interval, declination diagram, and conventional signs correctly.",
      xp: 100,
      brief: "Your section has been issued a topographical map for the navigation exercise (M122). Before you can use it, you must read the marginal information correctly. The scale, contour interval, and declination are critical to finding your way.",
      scene: "map_margin",
      chapters: [
        { title: "Map Scale", desc: "Identify the map scale from the marginal information." },
        { title: "Contour Interval", desc: "Determine the contour interval for elevation reading." },
        { title: "Declination", desc: "Read the declination diagram for compass correction." },
        { title: "Legend", desc: "Use the legend to interpret conventional signs and colors." }
      ],
      tasks: [
        {
          type: "select", tool: "mapmargin",
          title: "Identify the Map Scale",
          prompt: "What does a scale of 1:50000 mean?",
          options: [
            "1 cm on the map = 500 metres on the ground",
            "1 cm = 50 metres",
            "1 cm = 5 kilometres",
            "1 cm = 500 centimetres"
          ],
          expected: "1 cm on the map = 500 metres on the ground",
          proof: "Map scale identified — 1:50000 (1 cm = 500 m on the ground)."
        },
        {
          type: "type", tool: "mapmargin",
          title: "Determine the Contour Interval",
          prompt: "Type the contour interval shown on this map (in metres, just the number).",
          expected: "10",
          proof: "Contour interval confirmed — 10 metres between contour lines."
        },
        {
          type: "select", tool: "mapmargin",
          title: "Read the Declination Diagram",
          prompt: "What does the declination diagram show?",
          options: [
            "The angle between grid north and magnetic north",
            "The map scale ratio",
            "The contour interval value",
            "The sheet number and edition"
          ],
          expected: "The angle between grid north and magnetic north",
          proof: "Declination diagram read — grid vs magnetic north correction angle identified."
        },
        {
          type: "note", tool: "mapmargin",
          title: "Interpret Conventional Signs and Colors",
          prompt: "Write a note confirming what blue and brown mean on the map. Include the keywords 'blue', 'water', 'brown', and 'contour'.",
          keywords: ["blue", "water", "brown", "contour"],
          proof: "Legend interpreted — blue = water features, brown = contour lines. Map marginal information mission complete."
        }
      ]
    },
    {
      id: "contour_lines",
      order: 20,
      tag: "PO M122.03",
      icon: "⛰️",
      title: "Contour Lines — Reading Terrain Shape",
      desc: "Identify steep and gentle slopes, spurs, and re-entrants from contour line patterns.",
      xp: 100,
      brief: "You need to plan a route across unfamiliar terrain (M122.03). The contour lines on your map tell you about slopes, spurs, and re-entrants. Reading them correctly determines whether your route is easy or exhausting.",
      scene: "contours",
      chapters: [
        { title: "Steep Slope", desc: "Identify the steep slope from closely spaced contour lines." },
        { title: "Gentle Slope", desc: "Identify the gentle slope from widely spaced contours." },
        { title: "Spur", desc: "Recognize the spur from outward-bulging contours." },
        { title: "Re-entrant", desc: "Recognize the re-entrant from inward-bending contours." }
      ],
      tasks: [
        {
          type: "select", tool: "contours",
          title: "Identify the Steep Slope",
          prompt: "How can you identify a steep slope from contour lines?",
          options: [
            "Contours are closely spaced",
            "Contours are widely spaced",
            "Contours are perfectly circular",
            "There are no contour lines"
          ],
          expected: "Contours are closely spaced",
          proof: "Steep slope identified — closely spaced contours in the east sector. Avoid for a loaded patrol."
        },
        {
          type: "select", tool: "contours",
          title: "Identify the Gentle Slope",
          prompt: "Where is the gentle slope on this map section?",
          options: [
            "North sector (widely spaced contours)",
            "East sector (closely spaced contours)",
            "The re-entrant gully",
            "The top of the steep face"
          ],
          expected: "North sector (widely spaced contours)",
          proof: "Gentle slope identified — widely spaced contours in the north sector. Good route approach."
        },
        {
          type: "select", tool: "contours",
          title: "Recognize the Spur",
          prompt: "How do you identify a spur from contour lines?",
          options: [
            "Contours bulge outward from high ground toward lower ground",
            "Contours bend inward toward high ground",
            "Contours form perfect circles",
            "Contours are evenly spaced and straight"
          ],
          expected: "Contours bulge outward from high ground toward lower ground",
          proof: "Spur identified — contours bulge outward from high ground. This ridgeline offers good travel with visibility."
        },
        {
          type: "note", tool: "contours",
          title: "Recognize the Re-entrant",
          prompt: "Write a note describing what a re-entrant looks like on contours and why it matters for route planning. Include the keywords 'bend inward', 'gully', and 'route'.",
          keywords: ["bend inward", "gully", "route"],
          proof: "Re-entrant identified — inward-bending contours indicate a gully to avoid. Terrain analysis mission complete."
        }
      ]
    },
    {
      id: "grid_references",
      order: 21,
      tag: "PO M122.05",
      icon: "📍",
      title: "Grid References — Pinpointing Position",
      desc: "Generate a correct six-figure grid reference to communicate a precise location.",
      xp: 100,
      brief: "You need to report your position and find a checkpoint on the map (M122.05). Grid references are the standard way to communicate locations precisely. You must generate a correct six-figure grid reference for the checkpoint.",
      scene: "gridref",
      chapters: [
        { title: "Grid Reference Rule", desc: "Confirm: eastings first, then northings." },
        { title: "Easting Value", desc: "Identify the easting value for Checkpoint Bravo." },
        { title: "Northing Value", desc: "Identify the northing value for Checkpoint Bravo." },
        { title: "Report GR", desc: "Report the complete six-figure grid reference." }
      ],
      tasks: [
        {
          type: "select", tool: "gridref",
          title: "Confirm the Grid Reference Rule",
          prompt: "What is the correct order for reading grid references?",
          options: [
            "Eastings first (left to right), then Northings (bottom to top)",
            "Northings first, then Eastings",
            "Largest number first",
            "Random order does not matter"
          ],
          expected: "Eastings first (left to right), then Northings (bottom to top)",
          proof: "Rule confirmed — eastings then northings. 'Along the corridor, then up the stairs.'"
        },
        {
          type: "type", tool: "gridref",
          title: "Identify the Easting Value",
          prompt: "Type the easting value for Checkpoint Bravo (grid line 42, 3 tenths east — three digits).",
          expected: "423",
          proof: "Easting identified — 423 (3 tenths east of grid line 42)."
        },
        {
          type: "type", tool: "gridref",
          title: "Identify the Northing Value",
          prompt: "Type the northing value for Checkpoint Bravo (grid line 73, 8 tenths north — three digits).",
          expected: "738",
          proof: "Northing identified — 738 (8 tenths north of grid line 73)."
        },
        {
          type: "note", tool: "gridref",
          title: "Report the Complete Grid Reference",
          prompt: "Write a note reporting the six-figure grid reference for Checkpoint Bravo using the proper radio format. Include the keywords '423738', 'four', and 'two'.",
          keywords: ["423738", "four", "two"],
          proof: "Grid reference reported — 423738 — Checkpoint Bravo pinpointed to 100 m. Grid references mission complete."
        }
      ]
    },
    {
      id: "route_navigation",
      order: 22,
      tag: "PO 222",
      icon: "🧭",
      title: "Route Navigation — Orienting the Map & Compass Bearing",
      desc: "Fold the map, orient it to the ground, and take a compass bearing to set your direction of travel.",
      xp: 100,
      brief: "Final mission (PO 222). Your section must navigate from your current position to Checkpoint Bravo. You must fold the map correctly, orient it to the ground, and take a compass bearing to set your direction of travel.",
      scene: "compass",
      chapters: [
        { title: "Map Folding", desc: "Fold and protect the map for field use." },
        { title: "Map Orientation", desc: "Orient the map to the ground using visible features." },
        { title: "Compass Bearing", desc: "Take a compass bearing from your position to the checkpoint." },
        { title: "Declination", desc: "Apply magnetic declination and set direction of travel." }
      ],
      tasks: [
        {
          type: "select", tool: "compass",
          title: "Fold and Protect the Map",
          prompt: "How should you protect the map for field use?",
          options: [
            "In a plastic sealable bag, fold to route area, mark with pencil only",
            "Fold with printed side inward, use a marker pen",
            "Do not fold, carry it fully open",
            "Roll it tightly without protection"
          ],
          expected: "In a plastic sealable bag, fold to route area, mark with pencil only",
          proof: "Map folded to the route area and protected in a waterproof bag. Ready for field use."
        },
        {
          type: "toggle", tool: "compass",
          title: "Orient the Map to the Ground",
          prompt: "Enable map orientation — align visible features (hill, road junction) with the map so north matches the ground.",
          expected: true,
          proof: "Map oriented — north on the map matches north on the ground. You can read the terrain around you."
        },
        {
          type: "type", tool: "compass",
          title: "Take the Compass Bearing",
          prompt: "Type the grid bearing from your position to Checkpoint Bravo (in degrees, just the number).",
          expected: "143",
          proof: "Grid bearing taken — 143 degrees from current position to Checkpoint Bravo."
        },
        {
          type: "note", tool: "compass",
          title: "Apply Magnetic Declination and Set Direction",
          prompt: "Write a note showing the magnetic bearing calculation (grid bearing + 12° East declination) and your final direction of travel. Include the keywords '155', 'declination', and 'magnetic'.",
          keywords: ["155", "declination", "magnetic"],
          proof: "Magnetic bearing calculated — 155 degrees. Direction of travel set. All 11 first-year fieldcraft missions complete. Outstanding work, Cadet."
        }
      ]
    }
  ];

  // ==========================================================
  // LEARN LIBRARY ARTICLES
  // ==========================================================
  const LEARN_ARTICLES = [
    { id: "l_gear_essentials", cat: "Preparation", icon: "🎒", title: "The Essential Kit System", desc: "Shelter, water, fire, food, first aid — the five survival priorities every expedition kit must cover.", xp: 15 },
    { id: "l_footwear", cat: "Preparation", icon: "🥾", title: "Choosing Expedition Footwear", desc: "Broken-in waterproof boots with ankle support — the foundation of safe trail travel.", xp: 15 },
    { id: "l_layering", cat: "Preparation", icon: "🧥", title: "The Layering System", desc: "Base, insulating, and shell layers — and why cotton kills in the backcountry.", xp: 15 },
    { id: "l_overpacking", cat: "Preparation", icon: "⚖️", title: "Avoiding Overpacking", desc: "Every extra kilogram adds fatigue. Pack essentials, leave luxuries behind.", xp: 15 },
    { id: "l_clouds", cat: "Weather", icon: "☁️", title: "Reading Cloud Formations", desc: "Cumulonimbus with an anvil top signals thunderstorm — seek shelter immediately.", xp: 15 },
    { id: "l_pressure", cat: "Weather", icon: "📊", title: "Barometric Pressure Trends", desc: "A falling barometer means deteriorating weather is approaching.", xp: 15 },
    { id: "l_wind", cat: "Weather", icon: "🌬️", title: "Wind as a Weather Sign", desc: "Sudden wind shifts signal a frontal passage — expect change within hours.", xp: 15 },
    { id: "l_gonogo", cat: "Weather", icon: "🛑", title: "The Go / No-Go Decision", desc: "When weather deteriorates, the safest decision is often to turn back or shelter.", xp: 15 },
    { id: "l_widowmakers", cat: "Campsites", icon: "🪵", title: "Widowmakers & Overhead Hazards", desc: "Always check for dead limbs above your tent site — they can fall without warning.", xp: 15 },
    { id: "l_drainage", cat: "Campsites", icon: "💧", title: "Ground Drainage & Cold Air", desc: "Low ground pools cold air and rainwater — camp on higher, well-drained ground.", xp: 15 },
    { id: "l_water_distance", cat: "Campsites", icon: "🏞️", title: "Camping Distance from Water", desc: "Camp at least 60 metres from lakes and streams to protect waterways.", xp: 15 },
    { id: "l_shelter_site", cat: "Shelter", icon: "🏚️", title: "Emergency Shelter Sites", desc: "Choose a wind-protected spot with natural anchor points for your ridge line.", xp: 15 },
    { id: "l_lean_to", cat: "Shelter", icon: "📐", title: "The Lean-To Angle", desc: "A 45-degree pitch sheds rain while trapping a pocket of warm body heat.", xp: 15 },
    { id: "l_ground_insulation", cat: "Shelter", icon: "🌲", title: "Ground Insulation is Critical", desc: "You lose more heat to cold ground than to air — always insulate beneath you.", xp: 15 },
    { id: "l_fire_site", cat: "Fire", icon: "🔥", title: "Fire Site Preparation", desc: "Clear a 3-metre radius to mineral soil and ring with stones before lighting.", xp: 15 },
    { id: "l_fire_triangle", cat: "Fire", icon: "🔺", title: "The Fire Triangle", desc: "Heat, fuel, and oxygen — remove any one element and fire cannot sustain.", xp: 15 },
    { id: "l_extinguish", cat: "Fire", icon: "🚱", title: "Extinguishing Protocol", desc: "Drown, stir, and feel — confirm cold to the touch before leaving any fire.", xp: 15 },
    { id: "l_water_source", cat: "Water", icon: "🏔️", title: "Choosing a Water Source", desc: "Fast-flowing, high-elevation, upstream of contamination — the safest backcountry water.", xp: 15 },
    { id: "l_purify", cat: "Water", icon: "💊", title: "Water Purification Methods", desc: "Boiling, chemical tablets, or filters — always treat backcountry water before drinking.", xp: 15 },
    { id: "l_contact_time", cat: "Water", icon: "⏱️", title: "Purification Contact Time", desc: "Chemical tablets need a full 30-minute contact time to kill pathogens effectively.", xp: 15 },
    { id: "l_bowline", cat: "Knots", icon: "🪢", title: "The Bowline", desc: "A fixed, non-slipping loop — the king of knots for securing to a fixed point.", xp: 15 },
    { id: "l_tautline", cat: "Knots", icon: "📏", title: "The Taut-Line Hitch", desc: "Adjustable tension knot — perfect for tent guy lines that need fine-tuning.", xp: 15 },
    { id: "l_clove", cat: "Knots", icon: "🔩", title: "The Clove Hitch", desc: "A quick, temporary anchor around a post — easy to adjust and release.", xp: 15 },
    { id: "l_bearing", cat: "Navigation", icon: "🧭", title: "Following a Compass Bearing", desc: "Sight a visible object on the bearing line, walk to it, then re-sight to prevent drift.", xp: 15 },
    { id: "l_pacing", cat: "Navigation", icon: "👣", title: "Distance by Pacing", desc: "Count your double-paces per 100 m to estimate distance when you have no GPS.", xp: 15 },
    { id: "l_handrail", cat: "Navigation", icon: "⛰️", title: "Handrail Features", desc: "Linear terrain features — ridges, streams, fences — guide you along your route.", xp: 15 },
    { id: "l_lnt_waste", cat: "Leave-No-Trace", icon: "♻️", title: "Pack Out All Waste", desc: "Leave nothing behind — not even orange peels. Every trace disrupts the ecosystem.", xp: 15 },
    { id: "l_lnt_fire", cat: "Leave-No-Trace", icon: "🔥", title: "Minimise Fire Impact", desc: "Use a stove, or build fires only in existing rings and disperse the ashes.", xp: 15 },
    { id: "l_lnt_trail", cat: "Leave-No-Trace", icon: "🚶", title: "Travel on Durable Surfaces", desc: "Walk single file on existing trails; spread out only on rock and gravel.", xp: 15 },
    { id: "l_bear_storage", cat: "Wildlife", icon: "🐻", title: "Bear-Safe Food Storage", desc: "Bear canister or suspended bag — 4 m up, 1.5 m from the trunk, away from camp.", xp: 15 },
    { id: "l_bear_noise", cat: "Wildlife", icon: "🔔", title: "Making Noise on the Trail", desc: "Surprise is the main cause of defensive attacks — announce your presence.", xp: 15 },
    { id: "l_bear_response", cat: "Wildlife", icon: "⚠️", title: "Bear Encounter Response", desc: "Black bear: stand ground, look big, fight back. Never run from any bear.", xp: 15 },
    { id: "l_scene_safety", cat: "First Aid", icon: "🚨", title: "Scene Safety First", desc: "Before approaching a casualty, ensure no ongoing hazard to yourself.", xp: 15 },
    { id: "l_abc", cat: "First Aid", icon: "🫁", title: "The Primary Survey (ABC)", desc: "Airway, breathing, circulation — the first check for any unconscious casualty.", xp: 15 },
    { id: "l_shock", cat: "First Aid", icon: "🧊", title: "Preventing Shock", desc: "Keep the casualty warm and immobilise injuries — shock kills as surely as the wound.", xp: 15 }
,
{ id: "l_followership", cat: "Leadership", icon: "🤝", title: "The Responsibilities of a Follower", desc: "Respect, cooperation, honesty, and clear communication — the foundation of good followership (M103).", xp: 15 },
    { id: "l_teamwork", cat: "Leadership", icon: "👥", title: "Teamwork in the Field", desc: "How a well-coordinated section operates and why every cadet's role matters.", xp: 15 },
    { id: "l_rifle_parts", cat: "Marksmanship", icon: "🎯", title: "Daisy 853C Major Parts", desc: "Butt plate, stock, safety catch, bolt, pump handle, sights — a complete parts guide.", xp: 15 },
    { id: "l_safety_catch", cat: "Marksmanship", icon: "🔒", title: "The Safety Catch", desc: "Black = ON (safe), Red = OFF (fire) — the most critical control on the rifle.", xp: 15 },
    { id: "l_prone", cat: "Marksmanship", icon: "🎯", title: "The Prone Position", desc: "Bone-on-bone support, left elbow under the rifle, relaxed left hand on the sling swivel.", xp: 15 },
    { id: "l_sight_alignment", cat: "Marksmanship", icon: "👁️", title: "Sight Alignment & Sight Picture", desc: "Eye, rear sight, front sight centered — then the bull floating in the front aperture.", xp: 15 },
    { id: "l_range_safety", cat: "Range Safety", icon: "📐", title: "Removing the Rifle from the Case", desc: "The 8-step safe removal procedure — safety catch, bolt, pump, safety rod, lift clear.", xp: 15 },
    { id: "l_safety_rod", cat: "Range Safety", icon: "🥖", title: "The Safety Rod", desc: "Bright orange, inserted from the muzzle end — confirms the barrel is clear.", xp: 15 },
    { id: "l_range_commands", cat: "Range Safety", icon: "📢", title: "Standard Range Commands", desc: "Load, commence fire, cease fire, resume fire, change relays — know them all.", xp: 15 },
    { id: "l_cease_fire", cat: "Range Safety", icon: "🛑", title: "Cease Fire Protocol", desc: "Stop firing, safety ON, bolt open, finger off trigger, safety rod in, await commands.", xp: 15 },
    { id: "l_cadet_ranks", cat: "Drill", icon: "🎖️", title: "Army Cadet Ranks", desc: "From Cadet to Sergeant — chevrons, pips, and crowns explained (M107).", xp: 15 },
    { id: "l_compliments", cat: "Drill", icon: "👋", title: "Paying Compliments", desc: "When to salute, when to stand at attention, and how to address officers.", xp: 15 },
    { id: "l_uniform", cat: "Drill", icon: "👕", title: "Wearing the Uniform", desc: "Pride, cleanliness, polished brass, proper headdress — the uniform represents your corps.", xp: 15 },
    { id: "l_layering", cat: "Field Training", icon: "🧥", title: "The Layering System", desc: "Base, insulating, and outer layers — and why cotton kills in the field (M121).", xp: 15 },
    { id: "l_fabric", cat: "Field Training", icon: "🧵", title: "Fabric Choice for the Field", desc: "Wool and synthetic vs cotton — what to wear and what to avoid.", xp: 15 },
    { id: "l_sleeping_bag", cat: "Field Training", icon: "🛏️", title: "Sleeping Bag Insulation", desc: "Down vs synthetic — why synthetic wins in damp Canadian field conditions.", xp: 15 },
    { id: "l_map_scale", cat: "Navigation", icon: "🗺️", title: "Map Scale Explained", desc: "1:50000 means 1 cm = 500 m — understanding map scale for distance measurement.", xp: 15 },
    { id: "l_contour_interval", cat: "Navigation", icon: "📏", title: "Contour Intervals", desc: "The vertical distance between contour lines — typically 10 m on 1:50000 maps.", xp: 15 },
    { id: "l_declination", cat: "Navigation", icon: "🧭", title: "The Declination Diagram", desc: "Grid north vs magnetic north — the correction angle you must apply with a compass.", xp: 15 },
    { id: "l_conventional_signs", cat: "Navigation", icon: "🎨", title: "Conventional Signs & Colors", desc: "Black, brown, blue, green, red, white — what each color means on a topo map.", xp: 15 },
    { id: "l_contour_reading", cat: "Navigation", icon: "⛰️", title: "Reading Contour Lines", desc: "Closely spaced = steep, widely spaced = gentle — spurs bulge out, re-entrants bend in.", xp: 15 },
    { id: "l_slopes", cat: "Navigation", icon: "📐", title: "Slope Types for Route Planning", desc: "Concave, convex, uniform — how to read slope shape from contour spacing.", xp: 15 },
    { id: "l_grid_refs", cat: "Navigation", icon: "📍", title: "Grid References", desc: "Four-figure and six-figure GRs — 'along the corridor, then up the stairs'.", xp: 15 },
    { id: "l_map_folding", cat: "Navigation", icon: "📜", title: "Map Maintenance & Folding", desc: "Fold to the route area, protect in a waterproof bag, mark with pencil only.", xp: 15 },
    { id: "l_compass_bearing", cat: "Navigation", icon: "🧭", title: "Taking a Compass Bearing", desc: "Place compass on the map, align housing to grid lines, read the bearing, apply declination.", xp: 15 }
  ];

  // ==========================================================
  // FIELD BADGES (auto-generated from MISSIONS)
  // ==========================================================
  const FIELD_BADGES = MISSIONS.map(m => ({
    id: "b_" + m.id,
    icon: m.icon,
    name: m.title,
    xp: m.xp,
    mission: m.id
  }));

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
      readArticles: [],
      currentMissionTask: {}
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
  // MAP PROGRESS SYNC — badge 10 on the quest map
  // ==========================================================
  function syncMapProgress() {
    try {
      const allDone = MISSIONS.every(m => state.completedMissions.includes(m.id));
      let mapProgress = JSON.parse(localStorage.getItem(MAP_PROGRESS_KEY) || "[]");
      FIELD_BADGE_IDS.forEach(function (badgeId) {
        if (allDone && !mapProgress.includes(badgeId)) {
          mapProgress.push(badgeId);
        } else if (!allDone && mapProgress.includes(badgeId)) {
          mapProgress = mapProgress.filter(id => id !== badgeId);
        }
      });
      localStorage.setItem(MAP_PROGRESS_KEY, JSON.stringify(mapProgress));
    } catch (e) {}
  }

  // ==========================================================
  // SCENE SVG GENERATORS — Wilderness + fieldcraft themes
  // ==========================================================
  function sceneSVG(scene) {
    const W = 600, H = 180;
    const base = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">`;
    const end = `</svg>`;
    const grad = (id, c1, c2) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>`;

    if (scene === "kit") {
      return base + grad("g", "#16241b", "#0a100c") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <rect x="60" y="40" width="160" height="120" rx="10" fill="#1e3326" stroke="#6fae5e"/>
        <path d="M120 40 Q120 25 140 25 L160 25 Q180 25 180 40" fill="none" stroke="#6fae5e" stroke-width="3"/>
        <text x="140" y="62" fill="#9ee07e" font-size="11" font-family="monospace" text-anchor="middle" font-weight="bold">BACKPACK</text>
        <rect x="80" y="75" width="120" height="30" rx="4" fill="#101a14" stroke="#4a7a3e"/>
        <text x="140" y="94" fill="#b0c9a8" font-size="9" font-family="monospace" text-anchor="middle">MAIN COMPARTMENT</text>
        <rect x="90" y="115" width="100" height="18" rx="3" fill="#101a14" stroke="#4a7a3e"/>
        <text x="140" y="128" fill="#b0c9a8" font-size="8" font-family="monospace" text-anchor="middle">WATER + FIRST AID</text>
        <rect x="260" y="50" width="80" height="50" rx="6" fill="#1e3326" stroke="#9ee07e"/>
        <text x="300" y="80" fill="#9ee07e" font-size="14" text-anchor="middle">🥾</text>
        <text x="300" y="120" fill="#7a9a78" font-size="8" font-family="monospace" text-anchor="middle">BOOTS</text>
        <rect x="370" y="50" width="80" height="50" rx="6" fill="#1e3326" stroke="#ffd66b"/>
        <text x="410" y="80" fill="#ffd66b" font-size="14" text-anchor="middle">🧥</text>
        <text x="410" y="120" fill="#7a9a78" font-size="8" font-family="monospace" text-anchor="middle">LAYERS</text>
        <rect x="480" y="50" width="80" height="50" rx="6" fill="#1e3326" stroke="#6fae5e"/>
        <text x="520" y="80" fill="#6fae5e" font-size="14" text-anchor="middle">🩹</text>
        <text x="520" y="120" fill="#7a9a78" font-size="8" font-family="monospace" text-anchor="middle">FIRST AID</text>
        <text x="300" y="160" fill="#6fae5e" font-size="10" font-family="monospace" text-anchor="middle">KIT PACKING — EXP-101</text>
      ` + end;
    }
    if (scene === "weather") {
      return base + grad("g", "#1a2a22", "#0a100c") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <circle cx="120" cy="60" r="30" fill="#2d4a37" opacity="0.6"/>
        <circle cx="110" cy="55" r="22" fill="#1e3326" opacity="0.7"/>
        <path d="M90 75 Q120 75 150 75 Q140 95 120 95 Q100 95 90 75" fill="#16241b"/>
        <path d="M145 30 Q145 10 160 15 L170 25 L165 30 Q175 25 180 35 L175 40 Z" fill="#7a9a78" opacity="0.6"/>
        <text x="120" y="120" fill="#ff5a6e" font-size="9" font-family="monospace" text-anchor="middle">CUMULONIMBUS</text>
        <rect x="250" y="35" width="120" height="100" rx="6" fill="#101a14" stroke="#6fae5e"/>
        <text x="310" y="55" fill="#9ee07e" font-size="10" font-family="monospace" text-anchor="middle" font-weight="bold">BAROMETER</text>
        <circle cx="310" cy="95" r="28" fill="none" stroke="#4a7a3e" stroke-width="2"/>
        <line x1="310" y1="95" x2="335" y2="78" stroke="#ff5a6e" stroke-width="2.5"/>
        <circle cx="310" cy="95" r="3" fill="#ff5a6e"/>
        <text x="310" y="130" fill="#ff5a6e" font-size="8" font-family="monospace" text-anchor="middle">FALLING ▼</text>
        <text x="280" y="155" fill="#b0c9a8" font-size="8" font-family="monospace">WIND E→</text>
        <path d="M420 60 Q460 50 500 60" fill="none" stroke="#6fae5e" stroke-width="2"/>
        <polygon points="500,60 494,56 496,64" fill="#6fae5e"/>
        <text x="460" y="90" fill="#9ee07e" font-size="20" text-anchor="middle">💨</text>
        <text x="460" y="120" fill="#7a9a78" font-size="8" font-family="monospace" text-anchor="middle">WIND SHIFT</text>
        <text x="300" y="172" fill="#6fae5e" font-size="10" font-family="monospace" text-anchor="middle">WEATHER READING — EXP-102</text>
      ` + end;
    }
    if (scene === "campsite") {
      return base + grad("g", "#0d1f15", "#060b06") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <path d="M0 130 L60 120 L120 135 L180 125 L240 140 L300 128 L360 138 L420 122 L480 135 L540 125 L600 138 L600 180 L0 180 Z" fill="#1e3326" opacity="0.5"/>
        <path d="M250 110 Q300 80 350 110" fill="#2d4a37" stroke="#6fae5e" stroke-width="2"/>
        <polygon points="300,75 318,110 282,110" fill="#4a7a3e"/>
        <polygon points="280,95 295,120 265,120" fill="#4a7a3e"/>
        <polygon points="320,95 335,120 305,120" fill="#4a7a3e"/>
        <path d="M250 115 L300 90 L350 115" fill="#1e3326" stroke="#9ee07e" stroke-width="1.5"/>
        <path d="M250 115 L260 130 L340 130 L350 115" fill="#16241b" stroke="#9ee07e" stroke-width="1.5"/>
        <line x1="270" y1="115" x2="268" y2="130" stroke="#9ee07e" stroke-width="1" opacity="0.6"/>
        <line x1="330" y1="115" x2="332" y2="130" stroke="#9ee07e" stroke-width="1" opacity="0.6"/>
        <text x="300" y="148" fill="#9ee07e" font-size="10" font-family="monospace" text-anchor="middle" font-weight="bold">CAMPSITE</text>
        <path d="M450 140 Q460 120 470 140" fill="none" stroke="#4a9db8" stroke-width="2"/>
        <text x="460" y="155" fill="#4a9db8" font-size="8" font-family="monospace" text-anchor="middle">STREAM 60m</text>
        <path d="M80 130 L100 110 L100 130" fill="none" stroke="#ff5a6e" stroke-width="1.5"/>
        <text x="90" y="150" fill="#ff5a6e" font-size="8" font-family="monospace" text-anchor="middle">DEAD LIMB</text>
        <text x="300" y="172" fill="#6fae5e" font-size="9" font-family="monospace" text-anchor="middle">CAMPSITE ASSESSMENT — EXP-103</text>
      ` + end;
    }
    if (scene === "shelter") {
      return base + grad("g", "#0d1f15", "#060b06") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <line x1="120" y1="40" x2="480" y2="40" stroke="#8a6d4b" stroke-width="3"/>
        <text x="120" y="35" fill="#c9a875" font-size="9" font-family="monospace" text-anchor="middle">ANCHOR</text>
        <text x="480" y="35" fill="#c9a875" font-size="9" font-family="monospace" text-anchor="middle">ANCHOR</text>
        <polygon points="140,40 460,40 400,130 200,130" fill="#1e3326" stroke="#6fae5e" stroke-width="2" opacity="0.85"/>
        <line x1="140" y1="40" x2="200" y2="130" stroke="#9ee07e" stroke-width="1.5"/>
        <line x1="460" y1="40" x2="400" y2="130" stroke="#9ee07e" stroke-width="1.5"/>
        <line x1="200" y1="130" x2="400" y2="130" stroke="#4a7a3e" stroke-width="2"/>
        <g fill="#2d4a37" opacity="0.5">
          <polygon points="210,130 215,118 220,130"/>
          <polygon points="225,130 230,115 235,130"/>
          <polygon points="245,130 250,120 255,130"/>
          <polygon points="350,130 355,118 360,130"/>
          <polygon points="370,130 375,114 380,130"/>
          <polygon points="385,130 390,120 395,130"/>
        </g>
        <text x="300" y="70" fill="#9ee07e" font-size="9" font-family="monospace" text-anchor="middle">45° LEAN-TO</text>
        <text x="300" y="155" fill="#6fae5e" font-size="8" font-family="monospace" text-anchor="middle">PINE BOUGH INSULATION</text>
        <text x="300" y="170" fill="#6fae5e" font-size="9" font-family="monospace" text-anchor="middle">EMERGENCY SHELTER — EXP-104</text>
      ` + end;
    }
    if (scene === "fire") {
      return base + grad("g", "#1a2218", "#0a100c") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <circle cx="100" cy="100" r="50" fill="none" stroke="#8a6d4b" stroke-width="2"/>
        <circle cx="100" cy="100" r="42" fill="#0d1f15"/>
        <path d="M85 110 Q100 75 115 110 Q110 125 100 125 Q90 125 85 110" fill="#ff5a6e" opacity="0.8"/>
        <path d="M92 108 Q100 88 108 108 Q105 118 100 118 Q95 118 92 108" fill="#ffb454" opacity="0.9"/>
        <path d="M97 105 Q100 95 103 105 Q102 112 100 112 Q98 112 97 105" fill="#ffd66b"/>
        <text x="100" y="150" fill="#ff5a6e" font-size="9" font-family="monospace" text-anchor="middle">FIRE RING</text>
        <rect x="200" y="50" width="110" height="80" rx="6" fill="#101a14" stroke="#ffb454"/>
        <text x="255" y="70" fill="#ffb454" font-size="10" font-family="monospace" text-anchor="middle" font-weight="bold">FIRE TRIANGLE</text>
        <circle cx="222" cy="95" r="12" fill="#ff5a6e" opacity="0.6"/>
        <text x="222" y="99" fill="white" font-size="7" text-anchor="middle">HEAT</text>
        <circle cx="255" cy="95" r="12" fill="#8a6d4b" opacity="0.7"/>
        <text x="255" y="99" fill="white" font-size="7" text-anchor="middle">FUEL</text>
        <circle cx="288" cy="95" r="12" fill="#6ec4d8" opacity="0.5"/>
        <text x="288" y="99" fill="white" font-size="7" text-anchor="middle">O₂</text>
        <line x1="222" y1="95" x2="255" y2="95" stroke="#7a9a78" stroke-width="1" opacity="0.5"/>
        <line x1="255" y1="95" x2="288" y2="95" stroke="#7a9a78" stroke-width="1" opacity="0.5"/>
        <line x1="222" y1="95" x2="288" y2="95" stroke="#7a9a78" stroke-width="1" opacity="0.5"/>
        <rect x="340" y="60" width="100" height="70" rx="4" fill="#101a14" stroke="#3ee07f"/>
        <text x="390" y="80" fill="#3ee07f" font-size="9" font-family="monospace" text-anchor="middle" font-weight="bold">EXTINGUISH</text>
        <path d="M375 95 Q380 85 385 95" fill="#4a9db8" opacity="0.7"/>
        <path d="M395 95 Q400 88 405 95" fill="#4a9db8" opacity="0.7"/>
        <text x="390" y="115" fill="#3ee07f" font-size="8" font-family="monospace" text-anchor="middle">DROWN·STIR·COLD</text>
        <text x="470" y="80" fill="#9ee07e" font-size="22" text-anchor="middle">💧</text>
        <text x="300" y="172" fill="#6fae5e" font-size="9" font-family="monospace" text-anchor="middle">FIRE SAFETY — EXP-105</text>
      ` + end;
    }
    if (scene === "water") {
      return base + grad("g", "#0d1f15", "#060b06") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <path d="M40 130 Q120 115 200 130 Q280 145 360 130 Q440 115 520 130 Q560 138 580 130" fill="none" stroke="#4a9db8" stroke-width="3" opacity="0.7"/>
        <path d="M60 135 Q120 125 200 135 Q280 145 360 135 Q440 125 520 135" fill="none" stroke="#6ec4d8" stroke-width="1.5" opacity="0.5"/>
        <path d="M100 90 L120 130 L160 130 L180 90 Z" fill="#1e3326" stroke="#4a7a3e"/>
        <text x="140" y="115" fill="#9ee07e" font-size="8" font-family="monospace" text-anchor="middle">SOURCE</text>
        <rect x="250" y="45" width="100" height="95" rx="8" fill="#101a14" stroke="#6ec4d8"/>
        <text x="300" y="62" fill="#6ec4d8" font-size="9" font-family="monospace" text-anchor="middle" font-weight="bold">PURIFY</text>
        <rect x="270" y="72" width="60" height="50" rx="4" fill="#0d1f15" stroke="#4a9db8"/>
        <path d="M280 120 L280 82 M290 120 L290 75 M300 120 L300 78 M310 120 L310 80" stroke="#6ec4d8" stroke-width="1" opacity="0.5"/>
        <text x="300" y="135" fill="#6ec4d8" font-size="8" font-family="monospace" text-anchor="middle">TABLETS</text>
        <text x="300" y="150" fill="#3ee07f" font-size="8" font-family="monospace" text-anchor="middle">30 MIN</text>
        <rect x="390" y="50" width="80" height="90" rx="6" fill="#1e3326" stroke="#3ee07f"/>
        <text x="430" y="70" fill="#3ee07f" font-size="20" text-anchor="middle">✓</text>
        <text x="430" y="95" fill="#3ee07f" font-size="8" font-family="monospace" text-anchor="middle" font-weight="bold">SAFE</text>
        <text x="430" y="125" fill="#7a9a78" font-size="7" font-family="monospace" text-anchor="middle">CLEAR WATER</text>
        <text x="300" y="172" fill="#6fae5e" font-size="9" font-family="monospace" text-anchor="middle">WATER PURIFICATION — EXP-106</text>
      ` + end;
    }
    if (scene === "knots") {
      return base + grad("g", "#0d1f15", "#060b06") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <path d="M60 60 C60 40 100 40 100 60 C100 80 60 80 60 100 C60 120 100 120 100 100" fill="none" stroke="#c9a875" stroke-width="4" stroke-linecap="round"/>
        <circle cx="80" cy="80" r="14" fill="none" stroke="#c9a875" stroke-width="4"/>
        <text x="80" y="150" fill="#c9a875" font-size="9" font-family="monospace" text-anchor="middle" font-weight="bold">BOWLINE</text>
        <path d="M190 55 L250 55 M195 55 C190 70 210 75 215 60 L250 60 M215 60 C210 72 230 77 235 62 L250 62 M235 62 C230 74 250 79 250 70" fill="none" stroke="#9ee07e" stroke-width="3.5" stroke-linecap="round"/>
        <line x1="190" y1="55" x2="190" y2="130" stroke="#9ee07e" stroke-width="3"/>
        <text x="220" y="150" fill="#9ee07e" font-size="8" font-family="monospace" text-anchor="middle" font-weight="bold">TAUT-LINE</text>
        <line x1="340" y1="45" x2="340" y2="135" stroke="#8a6d4b" stroke-width="6"/>
        <path d="M370 50 L340 55 L370 60 L340 65" fill="none" stroke="#6ec4d8" stroke-width="3.5" stroke-linecap="round"/>
        <text x="355" y="150" fill="#6ec4d8" font-size="8" font-family="monospace" text-anchor="middle" font-weight="bold">CLOVE HITCH</text>
        <rect x="440" y="40" width="120" height="100" rx="6" fill="#101a14" stroke="#6fae5e"/>
        <text x="500" y="60" fill="#9ee07e" font-size="9" font-family="monospace" text-anchor="middle" font-weight="bold">APPLICATIONS</text>
        <text x="455" y="80" fill="#b0c9a8" font-size="7" font-family="monospace">• FIXED LOOP</text>
        <text x="455" y="95" fill="#b0c9a8" font-size="7" font-family="monospace">• GUY LINES</text>
        <text x="455" y="110" fill="#b0c9a8" font-size="7" font-family="monospace">• ANCHOR POST</text>
        <text x="300" y="172" fill="#6fae5e" font-size="9" font-family="monospace" text-anchor="middle">ESSENTIAL KNOTS — EXP-107</text>
      ` + end;
    }
    if (scene === "navcompass") {
      return base + grad("g", "#0d1f15", "#060b06") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <circle cx="150" cy="90" r="55" fill="#101a14" stroke="#6fae5e" stroke-width="2.5"/>
        <circle cx="150" cy="90" r="44" fill="none" stroke="#4a7a3e" stroke-width="1" opacity="0.5"/>
        <polygon points="150,45 156,90 150,98 144,90" fill="#ff5a6e"/>
        <polygon points="150,135 156,90 150,82 144,90" fill="#7a9a78"/>
        <text x="150" y="40" fill="#ff5a6e" font-size="11" font-family="monospace" text-anchor="middle" font-weight="bold">N</text>
        <text x="150" y="155" fill="#7a9a78" font-size="11" font-family="monospace" text-anchor="middle">S</text>
        <text x="100" y="94" fill="#7a9a78" font-size="11" font-family="monospace" text-anchor="middle">W</text>
        <text x="200" y="94" fill="#7a9a78" font-size="11" font-family="monospace" text-anchor="middle">E</text>
        <line x1="150" y1="90" x2="195" y2="55" stroke="#ffd66b" stroke-width="2.5"/>
        <polygon points="195,55 187,58 190,50" fill="#ffd66b"/>
        <text x="225" y="50" fill="#ffd66b" font-size="10" font-family="monospace">BEARING</text>
        <text x="225" y="65" fill="#9ee07e" font-size="11" font-family="monospace" font-weight="bold">045°</text>
        <rect x="310" y="45" width="120" height="95" rx="6" fill="#101a14" stroke="#6fae5e"/>
        <text x="370" y="62" fill="#9ee07e" font-size="9" font-family="monospace" text-anchor="middle" font-weight="bold">PACE COUNT</text>
        <text x="370" y="90" fill="#ffd66b" font-size="16" font-family="monospace" text-anchor="middle" font-weight="bold">780</text>
        <text x="370" y="108" fill="#b0c9a8" font-size="8" font-family="monospace" text-anchor="middle">double-paces</text>
        <text x="370" y="124" fill="#7a9a78" font-size="7" font-family="monospace" text-anchor="middle">= 1.2 km</text>
        <path d="M450 90 L470 80 L490 85 L510 75 L530 80 L540 72" fill="none" stroke="#6fae5e" stroke-width="2" stroke-dasharray="4 3"/>
        <polygon points="540,72 533,74 536,68" fill="#6fae5e"/>
        <text x="495" y="110" fill="#6fae5e" font-size="8" font-family="monospace" text-anchor="middle">HANDRAIL RIDGE</text>
        <text x="300" y="172" fill="#6fae5e" font-size="9" font-family="monospace" text-anchor="middle">TRAIL NAVIGATION — EXP-108</text>
      ` + end;
    }
    if (scene === "lnt") {
      return base + grad("g", "#0d1f15", "#060b06") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <circle cx="90" cy="90" r="42" fill="none" stroke="#3ee07f" stroke-width="2.5"/>
        <path d="M90 55 C70 55 65 75 90 75 C115 75 110 55 90 55 M90 75 L90 125" fill="none" stroke="#3ee07f" stroke-width="3"/>
        <text x="90" y="150" fill="#3ee07f" font-size="9" font-family="monospace" text-anchor="middle" font-weight="bold">LNT</text>
        <rect x="160" y="40" width="100" height="100" rx="6" fill="#101a14" stroke="#3ee07f"/>
        <text x="210" y="58" fill="#3ee07f" font-size="9" font-family="monospace" text-anchor="middle" font-weight="bold">7 PRINCIPLES</text>
        <text x="172" y="76" fill="#b0c9a8" font-size="6.5" font-family="monospace">1 Plan & prepare</text>
        <text x="172" y="88" fill="#b0c9a8" font-size="6.5" font-family="monospace">2 Durable surfaces</text>
        <text x="172" y="100" fill="#b0c9a8" font-size="6.5" font-family="monospace">3 Dispose of waste</text>
        <text x="172" y="112" fill="#b0c9a8" font-size="6.5" font-family="monospace">4 Leave what you find</text>
        <text x="172" y="124" fill="#b0c9a8" font-size="6.5" font-family="monospace">5 Minimise fire</text>
        <text x="172" y="136" fill="#b0c9a8" font-size="6.5" font-family="monospace">6 Respect wildlife</text>
        <text x="290" y="60" fill="#9ee07e" font-size="28" text-anchor="middle">♻️</text>
        <text x="290" y="85" fill="#7a9a78" font-size="8" font-family="monospace" text-anchor="middle">PACK OUT</text>
        <text x="370" y="60" fill="#9ee07e" font-size="28" text-anchor="middle">🚶</text>
        <text x="370" y="85" fill="#7a9a78" font-size="8" font-family="monospace" text-anchor="middle">STAY ON TRAIL</text>
        <text x="450" y="60" fill="#9ee07e" font-size="28" text-anchor="middle">🔥</text>
        <text x="450" y="85" fill="#7a9a78" font-size="8" font-family="monospace" text-anchor="middle">MINIMISE FIRE</text>
        <text x="530" y="60" fill="#9ee07e" font-size="28" text-anchor="middle">🐻</text>
        <text x="530" y="85" fill="#7a9a78" font-size="8" font-family="monospace" text-anchor="middle">RESPECT</text>
        <text x="300" y="160" fill="#6fae5e" font-size="9" font-family="monospace" text-anchor="middle">LEAVE-NO-TRACE — EXP-109</text>
      ` + end;
    }
    if (scene === "wildlife") {
      return base + grad("g", "#0d1f15", "#060b06") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <ellipse cx="130" cy="90" rx="45" ry="35" fill="#4a7a3e" opacity="0.5"/>
        <circle cx="120" cy="70" r="20" fill="#4a7a3e" opacity="0.6"/>
        <circle cx="150" cy="70" r="15" fill="#4a7a3e" opacity="0.6"/>
        <text x="130" y="95" fill="#c9a875" font-size="28" text-anchor="middle">🐻</text>
        <text x="130" y="130" fill="#c9a875" font-size="9" font-family="monospace" text-anchor="middle" font-weight="bold">BLACK BEAR</text>
        <rect x="230" y="45" width="120" height="95" rx="6" fill="#101a14" stroke="#c9a875"/>
        <text x="290" y="63" fill="#c9a875" font-size="9" font-family="monospace" text-anchor="middle" font-weight="bold">FOOD STORAGE</text>
        <line x1="290" y1="75" x2="290" y2="100" stroke="#8a6d4b" stroke-width="2"/>
        <line x1="270" y1="78" x2="310" y2="78" stroke="#8a6d4b" stroke-width="1" opacity="0.6"/>
        <rect x="278" y="85" width="24" height="18" rx="3" fill="#1e3326" stroke="#9ee07e"/>
        <text x="290" y="98" fill="#9ee07e" font-size="7" text-anchor="middle">BAG</text>
        <text x="290" y="120" fill="#9ee07e" font-size="7" font-family="monospace" text-anchor="middle">4m UP · 1.5m OUT</text>
        <text x="290" y="132" fill="#3ee07f" font-size="7" font-family="monospace" text-anchor="middle">✓ BEAR SAFE</text>
        <rect x="390" y="45" width="100" height="95" rx="6" fill="#101a14" stroke="#ffb454"/>
        <text x="440" y="63" fill="#ffb454" font-size="9" font-family="monospace" text-anchor="middle" font-weight="bold">RESPONSE</text>
        <text x="440" y="82" fill="#b0c9a8" font-size="7" font-family="monospace" text-anchor="middle">STAY CALM</text>
        <text x="440" y="97" fill="#b0c9a8" font-size="7" font-family="monospace" text-anchor="middle">LOOK BIG</text>
        <text x="440" y="112" fill="#ff5a6e" font-size="7" font-family="monospace" text-anchor="middle">DO NOT RUN</text>
        <text x="440" y="127" fill="#3ee07f" font-size="7" font-family="monospace" text-anchor="middle">FIGHT BACK</text>
        <text x="520" y="90" fill="#9ee07e" font-size="22" text-anchor="middle">🔔</text>
        <text x="520" y="115" fill="#7a9a78" font-size="7" font-family="monospace" text-anchor="middle">MAKE NOISE</text>
        <text x="300" y="172" fill="#6fae5e" font-size="9" font-family="monospace" text-anchor="middle">WILDLIFE SAFETY — EXP-110</text>
      ` + end;
    }
    if (scene === "firstaid") {
      return base + grad("g", "#1a1210", "#0a0806") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <rect x="60" y="45" width="140" height="95" rx="8" fill="#101a14" stroke="#ff5a6e"/>
        <text x="130" y="63" fill="#ff5a6e" font-size="10" font-family="monospace" text-anchor="middle" font-weight="bold">⚠ INJURED</text>
        <rect x="100" y="75" width="60" height="40" rx="4" fill="#1e3326" stroke="#ff5a6e" stroke-width="1.5"/>
        <line x1="130" y1="75" x2="130" y2="115" stroke="#ff5a6e" stroke-width="2"/>
        <line x1="100" y1="95" x2="160" y2="95" stroke="#ff5a6e" stroke-width="2"/>
        <text x="130" y="130" fill="#ffb454" font-size="8" font-family="monospace" text-anchor="middle">LEG IMMOBILISED</text>
        <rect x="230" y="45" width="130" height="95" rx="6" fill="#101a14" stroke="#3ee07f"/>
        <text x="295" y="62" fill="#3ee07f" font-size="9" font-family="monospace" text-anchor="middle" font-weight="bold">PRIMARY SURVEY</text>
        <text x="245" y="82" fill="#ff5a6e" font-size="14" font-family="monospace">A</text>
        <text x="262" y="82" fill="#b0c9a8" font-size="8" font-family="monospace">irway ✓</text>
        <text x="245" y="100" fill="#ffb454" font-size="14" font-family="monospace">B</text>
        <text x="262" y="100" fill="#b0c9a8" font-size="8" font-family="monospace">reathing ✓</text>
        <text x="245" y="118" fill="#6ec4d8" font-size="14" font-family="monospace">C</text>
        <text x="262" y="118" fill="#b0c9a8" font-size="8" font-family="monospace">irculation ✓</text>
        <text x="295" y="135" fill="#3ee07f" font-size="8" font-family="monospace" text-anchor="middle">NO LIFE THREAT</text>
        <rect x="390" y="45" width="140" height="95" rx="6" fill="#101a14" stroke="#9ee07e"/>
        <text x="460" y="62" fill="#9ee07e" font-size="9" font-family="monospace" text-anchor="middle" font-weight="bold">EVACUATION</text>
        <text x="405" y="82" fill="#b0c9a8" font-size="7" font-family="monospace">• 2 sent for help</text>
        <text x="405" y="97" fill="#b0c9a8" font-size="7" font-family="monospace">• Casualty stable</text>
        <text x="405" y="112" fill="#b0c9a8" font-size="7" font-family="monospace">• Keep warm</text>
        <text x="405" y="127" fill="#3ee07f" font-size="7" font-family="monospace">• Carry-out ready</text>
        <text x="300" y="172" fill="#6fae5e" font-size="9" font-family="monospace" text-anchor="middle">EMERGENCY RESPONSE — EXP-111</text>
      ` + end;
    }
    if (scene === "orders") {
      return base + grad("g", "#16241a", "#0a0f08") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <rect x="80" y="35" width="220" height="110" rx="6" fill="#101a0e" stroke="#2f4a30"/>
        <text x="190" y="55" fill="#9ab36a" font-size="11" font-family="monospace" text-anchor="middle" font-weight="bold">PATROL ORDER — SEC 2</text>
        <line x1="100" y1="65" x2="280" y2="65" stroke="#243a26" stroke-width="1"/>
        <text x="100" y="82" fill="#b0c9a8" font-size="10" font-family="monospace">TASK: Move to CKPT Bravo</text>
        <text x="100" y="98" fill="#b0c9a8" font-size="10" font-family="monospace">TIME: 0600–0900 hrs</text>
        <text x="100" y="114" fill="#b0c9a8" font-size="10" font-family="monospace">DRESS: Combat, webbing</text>
        <text x="100" y="130" fill="#ffd66b" font-size="10" font-family="monospace">CMDR: Sgt. Mackenzie</text>
        <rect x="340" y="35" width="180" height="110" rx="6" fill="#101a0e" stroke="#2f4a30"/>
        <circle cx="430" cy="80" r="22" fill="none" stroke="#9ab36a" stroke-width="2" opacity="0.5"/>
        <circle cx="430" cy="80" r="12" fill="#9ab36a" opacity="0.3"/>
        <text x="430" y="84" fill="#b8d97a" font-size="14" font-family="monospace" text-anchor="middle" font-weight="bold">📋</text>
        <text x="430" y="120" fill="#7a9a78" font-size="9" font-family="monospace" text-anchor="middle">FOLLOWER DUTIES</text>
      ` + end;
    }
    if (scene === "rifle") {
      return base + grad("g", "#101a0e", "#061008") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <rect x="60" y="80" width="480" height="20" rx="3" fill="#2f4a30" stroke="#5a7038"/>
        <rect x="60" y="78" width="60" height="24" rx="4" fill="#6b8e23" stroke="#9ab36a"/>
        <text x="90" y="94" fill="#0a0f08" font-size="9" font-family="monospace" text-anchor="middle" font-weight="bold">BUTT</text>
        <rect x="240" y="70" width="40" height="40" rx="3" fill="#1c2e22" stroke="#9ab36a"/>
        <text x="260" y="94" fill="#b8d97a" font-size="8" font-family="monospace" text-anchor="middle">BOLT</text>
        <circle cx="520" cy="90" r="14" fill="none" stroke="#ffd66b" stroke-width="2"/>
        <circle cx="520" cy="90" r="8" fill="#ffd66b" opacity="0.2"/>
        <text x="520" y="94" fill="#ffd66b" font-size="8" font-family="monospace" text-anchor="middle">FRONT</text>
        <text x="300" y="60" fill="#9ab36a" font-size="11" font-family="monospace" text-anchor="middle" font-weight="bold">DAISY 853C — PARTS DIAGRAM</text>
        <text x="90" y="120" fill="#7a9a78" font-size="8" font-family="monospace" text-anchor="middle">BUTT PLATE</text>
        <text x="260" y="120" fill="#7a9a78" font-size="8" font-family="monospace" text-anchor="middle">BOLT/SAFETY</text>
        <text x="520" y="120" fill="#7a9a78" font-size="8" font-family="monospace" text-anchor="middle">GLOBAL APERTURE</text>
      ` + end;
    }
    if (scene === "range") {
      return base + grad("g", "#16241a", "#0a0f08") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <rect x="40" y="90" width="520" height="50" rx="4" fill="#1c2e22" stroke="#2f4a30"/>
        <line x1="40" y1="115" x2="560" y2="115" stroke="#ffd66b" stroke-width="1" stroke-dasharray="8 6" opacity="0.5"/>
        <text x="300" y="110" fill="#ffd66b" font-size="9" font-family="monospace" text-anchor="middle">FIRING POINT → DOWN RANGE</text>
        <rect x="80" y="40" width="50" height="30" rx="4" fill="#101a0e" stroke="#9ab36a"/>
        <rect x="88" y="48" width="16" height="16" rx="2" fill="#0a0f08" stroke="#38d97b" stroke-width="2"/>
        <text x="105" y="80" fill="#38d97b" font-size="8" font-family="monospace" text-anchor="middle">SAFETY: ON</text>
        <rect x="180" y="40" width="50" height="30" rx="4" fill="#101a0e" stroke="#9ab36a"/>
        <rect x="200" y="44" width="10" height="22" rx="1" fill="#ff5a6e" opacity="0.7"/>
        <text x="205" y="80" fill="#b0c9a8" font-size="8" font-family="monospace" text-anchor="middle">BOLT: OPEN</text>
        <rect x="280" y="40" width="80" height="30" rx="4" fill="#101a0e" stroke="#ffd66b"/>
        <text x="320" y="60" fill="#ffd66b" font-size="9" font-family="monospace" text-anchor="middle">SAFETY ROD</text>
        <text x="320" y="80" fill="#b0c9a8" font-size="8" font-family="monospace" text-anchor="middle">MUZZLE → IN</text>
        <text x="300" y="155" fill="#9ab36a" font-size="10" font-family="monospace" text-anchor="middle">RANGE SAFETY — 8-STEP REMOVAL</text>
      ` + end;
    }
    if (scene === "sights") {
      return base + grad("g", "#101a0e", "#061008") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <circle cx="300" cy="90" r="55" fill="none" stroke="#9ab36a" stroke-width="2" opacity="0.5"/>
        <circle cx="300" cy="90" r="38" fill="none" stroke="#5a7038" stroke-width="1" opacity="0.4"/>
        <circle cx="300" cy="90" r="20" fill="none" stroke="#ffd66b" stroke-width="1.5"/>
        <circle cx="300" cy="90" r="8" fill="#ffd66b" opacity="0.3"/>
        <line x1="300" y1="35" x2="300" y2="145" stroke="#243a26" stroke-width="1"/>
        <line x1="245" y1="90" x2="355" y2="90" stroke="#243a26" stroke-width="1"/>
        <text x="300" y="94" fill="#ffd66b" font-size="7" font-family="monospace" text-anchor="middle">BULL</text>
        <rect x="80" y="50" width="70" height="40" rx="4" fill="#0a0f08" stroke="#2f4a30"/>
        <text x="115" y="68" fill="#9ab36a" font-size="8" font-family="monospace" text-anchor="middle">REAR SIGHT</text>
        <text x="115" y="82" fill="#b8d97a" font-size="7" font-family="monospace" text-anchor="middle">MICROMETER</text>
        <rect x="450" y="50" width="70" height="40" rx="4" fill="#0a0f08" stroke="#2f4a30"/>
        <text x="485" y="68" fill="#9ab36a" font-size="8" font-family="monospace" text-anchor="middle">FRONT SIGHT</text>
        <text x="485" y="82" fill="#b8d97a" font-size="7" font-family="monospace" text-anchor="middle">GLOBAL APERTURE</text>
        <text x="300" y="165" fill="#9ab36a" font-size="10" font-family="monospace" text-anchor="middle">SIGHT ALIGNMENT → SIGHT PICTURE</text>
      ` + end;
    }
    if (scene === "range_hot") {
      return base + grad("g", "#1a1210", "#0a0806") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <rect x="180" y="35" width="240" height="110" rx="8" fill="#101a0e" stroke="#b33244"/>
        <text x="300" y="58" fill="#ff5a6e" font-size="13" font-family="monospace" text-anchor="middle" font-weight="bold">⚠ RANGE HOT ⚠</text>
        <line x1="200" y1="68" x2="400" y2="68" stroke="#2f4a30" stroke-width="1"/>
        <text x="300" y="88" fill="#ffd66b" font-size="11" font-family="monospace" text-anchor="middle">RELAY, CEASE FIRE</text>
        <text x="300" y="108" fill="#b0c9a8" font-size="9" font-family="monospace" text-anchor="middle">→ SAFETY ON · BOLT OPEN</text>
        <text x="300" y="124" fill="#b0c9a8" font-size="9" font-family="monospace" text-anchor="middle">→ FINGER OFF TRIGGER</text>
        <text x="300" y="140" fill="#38d97b" font-size="9" font-family="monospace" text-anchor="middle">→ SAFETY ROD IN · AWAIT</text>
        <circle cx="100" cy="90" r="20" fill="#ff5a6e" opacity="0.2"/>
        <circle cx="100" cy="90" r="10" fill="#ff5a6e" opacity="0.4"/>
        <text x="100" y="95" fill="#ff5a6e" font-size="14" text-anchor="middle">🔴</text>
        <circle cx="500" cy="90" r="20" fill="#38d97b" opacity="0.2"/>
        <text x="500" y="95" fill="#38d97b" font-size="14" text-anchor="middle">🟢</text>
      ` + end;
    }
    if (scene === "ranks") {
      return base + grad("g", "#16241a", "#0a0f08") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <rect x="200" y="30" width="200" height="120" rx="8" fill="#101a0e" stroke="#ffd66b"/>
        <text x="300" y="52" fill="#ffd66b" font-size="11" font-family="monospace" text-anchor="middle" font-weight="bold">RANK INSIGNIA</text>
        <circle cx="270" cy="80" r="5" fill="#ffd66b"/>
        <circle cx="285" cy="80" r="5" fill="#ffd66b"/>
        <circle cx="300" cy="80" r="5" fill="#ffd66b"/>
        <text x="300" y="105" fill="#b8d97a" font-size="12" font-family="monospace" text-anchor="middle" font-weight="bold">CAPTAIN</text>
        <text x="300" y="125" fill="#7a9a78" font-size="9" font-family="monospace" text-anchor="middle">THREE PIPS</text>
        <text x="300" y="140" fill="#9ab36a" font-size="8" font-family="monospace" text-anchor="middle">COMMISSIONED OFFICER</text>
        <text x="100" y="90" fill="#9ab36a" font-size="20" text-anchor="middle">🪖</text>
        <text x="100" y="115" fill="#7a9a78" font-size="8" font-family="monospace" text-anchor="middle">CADET</text>
        <text x="500" y="90" fill="#ffd66b" font-size="20" text-anchor="middle">👑</text>
        <text x="500" y="115" fill="#7a9a78" font-size="8" font-family="monospace" text-anchor="middle">SALUTE</text>
      ` + end;
    }
    if (scene === "field") {
      return base + grad("g", "#0d1f15", "#061008") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <rect x="100" y="50" width="120" height="100" rx="6" fill="#1c2e22" stroke="#38d97b"/>
        <text x="160" y="70" fill="#38d97b" font-size="9" font-family="monospace" text-anchor="middle" font-weight="bold">BASE</text>
        <line x1="120" y1="85" x2="200" y2="85" stroke="#243a26"/>
        <line x1="120" y1="105" x2="200" y2="105" stroke="#243a26"/>
        <text x="160" y="100" fill="#b8d97a" font-size="7" font-family="monospace" text-anchor="middle">SYNTHETIC</text>
        <text x="160" y="120" fill="#b8d97a" font-size="7" font-family="monospace" text-anchor="middle">WOOL</text>
        <rect x="240" y="50" width="120" height="100" rx="6" fill="#1c2e22" stroke="#ffd66b"/>
        <text x="300" y="70" fill="#ffd66b" font-size="9" font-family="monospace" text-anchor="middle" font-weight="bold">INSULATING</text>
        <text x="300" y="100" fill="#b8d97a" font-size="8" font-family="monospace" text-anchor="middle">FLEECE</text>
        <rect x="380" y="50" width="120" height="100" rx="6" fill="#1c2e22" stroke="#9ab36a"/>
        <text x="440" y="70" fill="#9ab36a" font-size="9" font-family="monospace" text-anchor="middle" font-weight="bold">OUTER SHELL</text>
        <text x="440" y="100" fill="#b8d97a" font-size="8" font-family="monospace" text-anchor="middle">WATERPROOF</text>
        <text x="440" y="115" fill="#b8d97a" font-size="8" font-family="monospace" text-anchor="middle">WINDPROOF</text>
        <text x="300" y="40" fill="#9ab36a" font-size="10" font-family="monospace" text-anchor="middle">LAYERING SYSTEM — 2°C OVERNIGHT</text>
      ` + end;
    }
    if (scene === "map_margin") {
      return base + grad("g", "#0d1f15", "#061008") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <rect x="80" y="25" width="440" height="130" rx="4" fill="#16241a" stroke="#9ab36a"/>
        <g opacity="0.2" stroke="#38d97b" stroke-width="0.5">
          <line x1="80" y1="55" x2="520" y2="55"/><line x1="80" y1="85" x2="520" y2="85"/><line x1="80" y1="115" x2="520" y2="115"/>
          <line x1="190" y1="25" x2="190" y2="155"/><line x1="300" y1="25" x2="300" y2="155"/><line x1="410" y1="25" x2="410" y2="155"/>
        </g>
        <text x="300" y="45" fill="#ffd66b" font-size="9" font-family="monospace" text-anchor="middle">SCALE 1:50000 · CONTOUR 10m</text>
        <rect x="440" y="120" width="70" height="25" rx="3" fill="#101a0e" stroke="#9ab36a"/>
        <text x="475" y="136" fill="#9ab36a" font-size="7" font-family="monospace" text-anchor="middle">DECLINATION</text>
        <text x="100" y="150" fill="#7a9a78" font-size="7" font-family="monospace">BLUE=water BROWN=contour GREEN=veg</text>
      ` + end;
    }
    if (scene === "contours") {
      return base + grad("g", "#0d1f15", "#061008") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <g fill="none" stroke="#9ab36a" stroke-width="1.2" opacity="0.6">
          <path d="M 60 140 Q 120 135 180 138 Q 240 141 300 136 Q 360 131 420 138 Q 480 145 540 140"/>
          <path d="M 60 120 Q 120 113 180 116 Q 240 119 300 112 Q 360 105 420 114 Q 480 123 540 118"/>
          <path d="M 60 100 Q 120 91 180 92 Q 240 93 300 82 Q 360 71 420 80 Q 480 89 540 92"/>
          <path d="M 60 80 Q 120 69 180 68 Q 240 67 300 52 Q 360 37 420 44 Q 480 51 540 62"/>
        </g>
        <text x="150" y="48" fill="#38d97b" font-size="8" font-family="monospace" text-anchor="middle">N: GENTLE</text>
        <text x="450" y="48" fill="#ff5a6e" font-size="8" font-family="monospace" text-anchor="middle">E: STEEP</text>
        <text x="300" y="60" fill="#ffd66b" font-size="8" font-family="monospace" text-anchor="middle">SPUR →</text>
        <text x="300" y="168" fill="#9ab36a" font-size="9" font-family="monospace" text-anchor="middle">CONTOUR LINES — TERRAIN SHAPE</text>
      ` + end;
    }
    if (scene === "gridref") {
      return base + grad("g", "#0d1f15", "#061008") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <rect x="100" y="20" width="400" height="140" rx="3" fill="#16241a" stroke="#9ab36a"/>
        <g stroke="#38d97b" stroke-width="0.8" opacity="0.4">
          <line x1="180" y1="20" x2="180" y2="160"/><line x1="260" y1="20" x2="260" y2="160"/><line x1="340" y1="20" x2="340" y2="160"/><line x1="420" y1="20" x2="420" y2="160"/>
          <line x1="100" y1="50" x2="500" y2="50"/><line x1="100" y1="80" x2="500" y2="80"/><line x1="100" y1="110" x2="500" y2="110"/><line x1="100" y1="140" x2="500" y2="140"/>
        </g>
        <text x="140" y="18" fill="#ffd66b" font-size="8" font-family="monospace" text-anchor="middle">41</text>
        <text x="220" y="18" fill="#ffd66b" font-size="8" font-family="monospace" text-anchor="middle">42</text>
        <text x="300" y="18" fill="#ffd66b" font-size="8" font-family="monospace" text-anchor="middle">43</text>
        <text x="95" y="38" fill="#ffd66b" font-size="8" font-family="monospace" text-anchor="middle">72</text>
        <text x="95" y="68" fill="#ffd66b" font-size="8" font-family="monospace" text-anchor="middle">73</text>
        <text x="95" y="98" fill="#ffd66b" font-size="8" font-family="monospace" text-anchor="middle">74</text>
        <circle cx="236" cy="76" r="8" fill="#ff5a6e"/>
        <circle cx="236" cy="76" r="14" fill="none" stroke="#ff5a6e" stroke-width="1.5" opacity="0.6"/>
        <text x="236" y="80" fill="white" font-size="7" font-family="monospace" text-anchor="middle">B</text>
        <text x="300" y="170" fill="#9ab36a" font-size="9" font-family="monospace" text-anchor="middle">GR 423738 — CHECKPOINT BRAVO</text>
      ` + end;
    }
    if (scene === "compass") {
      return base + grad("g", "#0d1f15", "#061008") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <circle cx="300" cy="90" r="60" fill="#101a0e" stroke="#9ab36a" stroke-width="2"/>
        <circle cx="300" cy="90" r="48" fill="none" stroke="#5a7038" stroke-width="1" opacity="0.5"/>
        <polygon points="300,38 308,90 300,100 292,90" fill="#ff5a6e"/>
        <polygon points="300,142 308,90 300,80 292,90" fill="#7a9a78"/>
        <text x="300" y="33" fill="#ff5a6e" font-size="10" font-family="monospace" text-anchor="middle" font-weight="bold">N</text>
        <text x="300" y="158" fill="#7a9a78" font-size="10" font-family="monospace" text-anchor="middle">S</text>
        <text x="242" y="94" fill="#7a9a78" font-size="10" font-family="monospace" text-anchor="middle">W</text>
        <text x="358" y="94" fill="#7a9a78" font-size="10" font-family="monospace" text-anchor="middle">E</text>
        <line x1="300" y1="90" x2="380" y2="50" stroke="#ffd66b" stroke-width="2"/>
        <polygon points="380,50 372,54 374,46" fill="#ffd66b"/>
        <text x="400" y="45" fill="#ffd66b" font-size="10" font-family="monospace">143° GRID</text>
        <text x="400" y="60" fill="#b8d97a" font-size="9" font-family="monospace">155° MAG</text>
        <text x="300" y="170" fill="#9ab36a" font-size="9" font-family="monospace" text-anchor="middle">COMPASS BEARING — PO 222</text>
      ` + end;
    }
    return base + `<rect width="${W}" height="${H}" fill="#101a14"/>` + end;
  }

  // ==========================================================
  // RANK LOGIC
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
    FIELD_BADGES.forEach(b => {
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
    document.getElementById("xpText").textContent = `${into} / ${span} XP`;
  }

  function renderTopStats() {
    const rank = currentRank();
    refreshBadges();
    document.getElementById("topRank").textContent = rank.name;
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
    document.getElementById("cmdBadgeTotal").textContent = "of " + FIELD_BADGES.length;

    const cl = document.getElementById("chapterList");
    cl.innerHTML = MISSIONS.map(m => {
      const done = missionDone(m);
      const unlocked = missionUnlocked(m);
      const prog = tasksDoneCount(m);
      const total = m.tasks.length;
      const isActive = activeMissionId === m.id && !done;
      let cls = "chapter-row";
      let progText = "";
      if (done) { cls += " done"; progText = `${prog}/${total} ✓`; }
      else if (isActive) { cls += " active"; progText = `${prog}/${total} ▸`; }
      else if (unlocked) { progText = `${prog}/${total}`; }
      else { cls += " locked"; progText = "LOCKED"; }
      const num = done ? "" : m.order;
      return `<div class="${cls}" data-mission="${m.id}">
        <span class="n">${num}</span>
        <div class="cr-body" style="flex:1;">
          <div class="cr-title">${m.title}</div>
          <div class="cr-desc">${m.desc}</div>
        </div>
        <span class="cr-prog">${progText}</span>
      </div>`;
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
      return `<div class="${cls}" data-mission="${m.id}">
        <div class="mc-top">
          <div class="mc-ico">${m.icon}</div>
          <div>
            <div class="mc-tag">${m.tag}</div>
            <div class="mc-title">${m.title}</div>
          </div>
        </div>
        <div class="mc-desc">${m.desc}</div>
        <div class="mc-prog-bar"><div class="mc-prog-fill" style="width:${pct}%"></div></div>
        <div class="mc-foot">
          <span class="mc-xp">⚡ ${missionXP(m)} XP</span>
          <span class="${statusCls}">${statusText} · ${prog}/${total}</span>
        </div>
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
      let statusCls = "mc-status";
      let statusText = "";
      if (done) { cls += " done"; statusCls += " done"; statusText = "COMPLETE"; }
      else if (activeMissionId === m.id) { cls += " active"; statusCls += " active"; statusText = "IN PROGRESS"; }
      else if (!unlocked) { cls += " locked"; statusCls += " locked"; statusText = "LOCKED"; }
      else { statusCls += " active"; statusText = "READY"; }
      return `<div class="${cls}" data-mission="${m.id}">
        <div class="mc-top">
          <div class="mc-ico">${m.icon}</div>
          <div>
            <div class="mc-tag">${m.tag}</div>
            <div class="mc-title">${m.title}</div>
          </div>
        </div>
        <div class="mc-desc">${m.desc}</div>
        <div class="mc-prog-bar"><div class="mc-prog-fill" style="width:${pct}%"></div></div>
        <div class="mc-foot">
          <span class="mc-xp">⚡ ${missionXP(m)} XP</span>
          <span class="${statusCls}">${statusText} · ${prog}/${total}</span>
        </div>
      </div>`;
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
      toast("warn", "🔒 Module " + m.order + " is locked. Complete the previous module first.");
      return;
    }
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

          <div class="task-control" id="taskControl">
            ${renderTaskControl(task, activeTaskIndex)}
          </div>

          <div class="task-actions">
            <button class="btn btn-primary" id="submitTaskBtn" type="button">✓ Submit & Confirm</button>
            <button class="btn btn-ghost" id="hintBtn" type="button">💡 Hint</button>
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
      </div>
    `;

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
      return `<textarea class="task-note" id="taskNote" placeholder="Write your log entry here…"></textarea>`;
    }
    if (task.type === "slider") {
      sliderValue[idx] = sliderValue[idx] !== undefined ? sliderValue[idx] : 0;
      const unit = task.unit || "m";
      return `<input class="task-slider" id="taskSlider" type="range" min="0" max="${task.max || 100}" value="${sliderValue[idx]}" data-idx="${idx}" />
        <div class="slider-readout" id="sliderReadout">${sliderValue[idx]} ${unit}</div>`;
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

  function updateToolReq(task) {
    const req = document.getElementById("toolReq");
    const now = document.getElementById("trNow");
    if (!req) return;
    const satisfied = activeTool === task.tool;
    req.classList.toggle("satisfied", satisfied);
    const ico = req.querySelector(".tr-ico");
    if (satisfied) {
      ico.textContent = "✅";
      now.textContent = toolLabel(activeTool);
    } else {
      ico.textContent = "⚠️";
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
      fb.innerHTML = `❌ Wrong tool! This task requires <strong>${toolLabel(task.tool)}</strong>. You currently have <strong>${activeTool ? toolLabel(activeTool) : "no tool"}</strong> open. Open the correct tool from the dock above.`;
      termPush("err", `✗ FAILED — wrong tool. Required: ${toolLabel(task.tool)}`);
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
      fb.innerHTML = `❌ ${valid.msg}`;
      termPush("err", `✗ ${valid.msg}`);
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
    fb.innerHTML = `✅ Correct! ${task.proof}`;
    termPush("ok", `✓ ${task.proof}`);

    activeTaskIndex++;
    if (activeTaskIndex >= m.tasks.length) {
      completeMission(m);
    } else {
      setTimeout(() => renderMissionConsole(), 1100);
    }
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
      const val = (inp ? inp.value : "").trim().toUpperCase();
      if (!val) return { ok: false, msg: "Type your answer in the input field." };
      const exp = String(task.expected).toUpperCase();
      return val === exp ? { ok: true } : { ok: false, msg: `"${val}" is not correct. Hint: ${task.expected.length} characters.` };
    }
    if (task.type === "note") {
      const ta = document.getElementById("taskNote");
      const val = (ta ? ta.value : "").trim();
      if (val.length < 10) return { ok: false, msg: "Your log entry is too short. Write a complete sentence." };
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
      const unit = task.unit || "m";
      return { ok: false, msg: `The reading is set to ${v} ${unit}. Adjust the dial to match the target.` };
    }
    return { ok: false, msg: "Unknown task type." };
  }

  function showHint(task) {
    const fb = document.getElementById("taskFeedback");
    fb.className = "task-feedback show info";
    let hint = "";
    if (task.type === "select") hint = `The correct answer relates to: ${task.expected.slice(0, 40)}…`;
    else if (task.type === "type") hint = `The answer has ${task.expected.length} characters and starts with "${task.expected.charAt(0)}".`;
    else if (task.type === "note") hint = `Your note must include: ${task.keywords.join(", ")}${task.altKeywords ? " (or " + task.altKeywords.join(", ") + ")" : ""}.`;
    else if (task.type === "toggle") hint = "Click the toggle row to switch it to the ON (green) position.";
    else if (task.type === "slider") hint = `The target reading is close to ${task.expected} ${task.unit || "m"}.`;
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
      syncMapProgress();
      const badge = FIELD_BADGES.find(b => b.mission === m.id);
      toast("ok", `🏆 Mission complete! +${earned} XP earned. Badge unlocked: ${badge ? badge.name : m.title}.`);
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
    const badge = FIELD_BADGES.find(b => b.mission === m.id);
    const mp = missionProgress(m.id);
    return `<div class="task-console">
      <div class="task-body">
        <div class="complete-card">
          <div class="cc-ico">🏆</div>
          <div class="cc-title">Mission Complete: ${m.title}</div>
          <div class="cc-sub">${m.desc} You have successfully completed all ${m.tasks.length} tasks and earned the <strong>${badge ? badge.name : "Wildtrail Cadet"}</strong> badge.</div>
          <div class="cc-stats">
            <div class="cc-stat"><div class="v">+${earned}</div><div class="l">XP Earned</div></div>
            <div class="cc-stat"><div class="v">${mp.tasksDone.length}/${m.tasks.length}</div><div class="l">Tasks Done</div></div>
            <div class="cc-stat"><div class="v">${mp.wrongAttempts || 0}</div><div class="l">Wrong Attempts</div></div>
          </div>
          <div class="task-actions" style="justify-content:center;">
            <button class="btn btn-primary" id="fileSitrepQuickBtn" type="button">📝 File SITREP for this mission</button>
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
    document.getElementById("missionHeaderSub").textContent = "Choose a training module from the Training tab, or pick a mission below to enter the wilderness simulator.";
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
    document.getElementById("ringRankLabel").textContent = rank.name;
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
      else { cls += ""; tag = '<span class="r-tag locked">LOCKED</span>'; }
      return `<div class="${cls}">
        <div class="r-ico">${r.icon}</div>
        <div class="r-body">
          <div class="r-name">${r.name}</div>
          <div class="r-xp">${r.xp} XP • CALLSIGN ${r.callsign}</div>
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
          MINOR_HAZARD: { cls: "med", text: "MINOR HAZARD", color: "var(--amber)" },
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
    showFeedback(fb, "ok", `SITREP filed successfully! +20 XP. Your expedition leader has received your report.`);
    toast("ok", "📝 SITREP filed! +20 XP");
    renderSitrep();
    renderSidebar();
    renderTopStats();
    renderCommand();
    renderAnalysis();
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
    if (!state.readArticles.includes(articleId)) {
      state.readArticles.push(articleId);
      state.xp += a.xp;
      saveState();
      toast("ok", `📖 Article read: "${a.title}" — +${a.xp} XP`);
      renderLearn();
      renderSidebar();
      renderTopStats();
      renderAnalysis();
    } else {
      toast("info", `📖 Already read: "${a.title}"`);
    }
  }

  // ==========================================================
  // FIELD RANGE GAME — PATROL SIMULATOR
  // Tactical map with sentry vision cones, cadet movement,
  // concealment/detection ("why things are seen"), field signals.
  // ==========================================================

const FC = {
    running: false, paused: false,
    cadets: [], sentries: [], objectives: [], cover: [],
    selectedId: null,
    score: 0, reached: 0, detected: 0, wave: 1,
    spawnDone: false,
    rafId: null, lastFrame: 0,
    burstQueue: [],          // transient visual bursts {x,y,age}
    signalParts: { callsign: null, signal: null, detail: null },
    currentTech: "ghost",
    cadetSerial: 0, sentrySerial: 0, objSerial: 0,
    waveComplete: false,
    initDone: false
  };

  const FC_MAP = { cx: 300, cy: 300, size: 600 };

  // Movement techniques — speed (px/sec) and detection profile
  const FC_TECH = {
    leopard: { name: "Leopard Crawl", speed: 14, detect: 0.10, label: "LEOPARD" },
    monkey:  { name: "Monkey Run",    speed: 30, detect: 0.28, label: "MONKEY"  },
    ghost:   { name: "Ghost Walk",    speed: 52, detect: 0.55, label: "GHOST"   },
    halt:    { name: "Halt",          speed: 0,  detect: 0.00, label: "HALT"    }
  };

  // Hand signals
  const FC_SIGNALS = [
    { id: "advance",   label: "Advance" },
    { id: "halt",      label: "Halt" },
    { id: "takecover", label: "Take Cover" },
    { id: "observe",   label: "Observe" }
  ];

  // Compass directions
  const FC_DIRS = [
    { id: "N",  label: "North",  dx: 0,  dy: -1 },
    { id: "NE", label: "NE",     dx: 0.7,  dy: -0.7 },
    { id: "E",  label: "East",   dx: 1,  dy: 0 },
    { id: "SE", label: "SE",     dx: 0.7,  dy: 0.7 },
    { id: "S",  label: "South",  dx: 0,  dy: 1 },
    { id: "SW", label: "SW",     dx: -0.7, dy: 0.7 },
    { id: "W",  label: "West",   dx: -1, dy: 0 },
    { id: "NW", label: "NW",     dx: -0.7, dy: -0.7 }
  ];

  // Callsign pool
  const FC_CALLSIGNS = [
    { id: "red",   label: "RED-1",   color: "#ff7a6b" },
    { id: "blue",  label: "BLUE-2",  color: "#6bb8ff" },
    { id: "green", label: "GREEN-3", color: "#9ab36a" },
    { id: "gold",  label: "GOLD-4",  color: "#ffd66b" }
  ];

  const SVGNS = "http://www.w3.org/2000/svg";

  // ---- Build static SVG terrain (grid, terrain features) ----
  function fcInitMapSVG() {
    const svg = document.getElementById("fcMap");
    if (!svg) return;
    svg.innerHTML = "";

    // defs for gradients
    const defs = document.createElementNS(SVGNS, "defs");
    defs.innerHTML =
      '<radialGradient id="fcTreeShade" cx="50%" cy="50%" r="50%">' +
        '<stop offset="0%" stop-color="#1a2e1c"/>' +
        '<stop offset="70%" stop-color="#122012"/>' +
        '<stop offset="100%" stop-color="rgba(10,18,11,0)"/>' +
      '</radialGradient>' +
      '<linearGradient id="fcVisionGrad" x1="0%" y1="0%" x2="0%" y2="100%">' +
        '<stop offset="0%" stop-color="rgba(255,90,110,0.28)"/>' +
        '<stop offset="100%" stop-color="rgba(255,90,110,0)"/>' +
      '</linearGradient>' +
      '<radialGradient id="fcObjGlow" cx="50%" cy="50%" r="50%">' +
        '<stop offset="0%" stop-color="rgba(255,214,107,0.5)"/>' +
        '<stop offset="100%" stop-color="rgba(255,214,107,0)"/>' +
      '</radialGradient>';
    svg.appendChild(defs);

    // Grid lines
    const grid = document.createElementNS(SVGNS, "g");
    for (let i = 0; i <= 6; i++) {
      const p = (i / 6) * FC_MAP.size;
      const lh = document.createElementNS(SVGNS, "line");
      lh.setAttribute("x1", p); lh.setAttribute("y1", 0);
      lh.setAttribute("x2", p); lh.setAttribute("y2", FC_MAP.size);
      lh.setAttribute("stroke", "rgba(47,74,48,0.22)"); lh.setAttribute("stroke-width", 1);
      grid.appendChild(lh);
      const lv = document.createElementNS(SVGNS, "line");
      lv.setAttribute("x1", 0); lv.setAttribute("y1", p);
      lv.setAttribute("x2", FC_MAP.size); lv.setAttribute("y2", p);
      lv.setAttribute("stroke", "rgba(47,74,48,0.22)"); lv.setAttribute("stroke-width", 1);
      grid.appendChild(lv);
    }
    svg.appendChild(grid);

    // Compass rose
    const compass = document.createElementNS(SVGNS, "g");
    compass.innerHTML =
      '<text x="300" y="22" text-anchor="middle" fill="#5a7038" font-family="monospace" font-size="11" font-weight="700">N</text>' +
      '<text x="580" y="304" text-anchor="middle" fill="#5a7038" font-family="monospace" font-size="11" font-weight="700">E</text>' +
      '<text x="300" y="588" text-anchor="middle" fill="#5a7038" font-family="monospace" font-size="11" font-weight="700">S</text>' +
      '<text x="20" y="304" text-anchor="middle" fill="#5a7038" font-family="monospace" font-size="11" font-weight="700">W</text>';
    svg.appendChild(compass);

    // Terrain features — tree clusters (concealment) and open patches
    const terrain = document.createElementNS(SVGNS, "g");
    const treeClusters = [
      { x: 130, y: 180, r: 46 }, { x: 470, y: 150, r: 40 },
      { x: 200, y: 430, r: 50 }, { x: 430, y: 470, r: 38 },
      { x: 340, y: 250, r: 32 }, { x: 90, y: 360, r: 28 }
    ];
    treeClusters.forEach(function (c) {
      const sh = document.createElementNS(SVGNS, "circle");
      sh.setAttribute("cx", c.x); sh.setAttribute("cy", c.y); sh.setAttribute("r", c.r);
      sh.setAttribute("fill", "url(#fcTreeShade)");
      terrain.appendChild(sh);
      // little tree tops
      for (let t = 0; t < 4; t++) {
        const tx = c.x + (Math.cos(t * 1.6) * c.r * 0.45);
        const ty = c.y + (Math.sin(t * 1.6) * c.r * 0.45);
        const top = document.createElementNS(SVGNS, "circle");
        top.setAttribute("cx", tx); top.setAttribute("cy", ty); top.setAttribute("r", 7);
        top.setAttribute("fill", "#1f3a1f");
        top.setAttribute("opacity", 0.7);
        terrain.appendChild(top);
      }
    });
    svg.appendChild(terrain);

    // Dynamic layers (populated each frame)
    const coverLayer = document.createElementNS(SVGNS, "g"); coverLayer.id = "fcCoverLayer";
    const objLayer = document.createElementNS(SVGNS, "g"); objLayer.id = "fcObjLayer";
    const sentryLayer = document.createElementNS(SVGNS, "g"); sentryLayer.id = "fcSentryLayer";
    const trailLayer = document.createElementNS(SVGNS, "g"); trailLayer.id = "fcTrailLayer";
    const cadetLayer = document.createElementNS(SVGNS, "g"); cadetLayer.id = "fcCadetLayer";
    const burstLayer = document.createElementNS(SVGNS, "g"); burstLayer.id = "fcBurstLayer";
    svg.appendChild(coverLayer);
    svg.appendChild(objLayer);
    svg.appendChild(sentryLayer);
    svg.appendChild(trailLayer);
    svg.appendChild(cadetLayer);
    svg.appendChild(burstLayer);
  }

  // ---- Wave setup: spawn sentries, objectives, cover, cadets ----
  function fcSetupWave() {
    FC.cadets = []; FC.sentries = []; FC.objectives = []; FC.cover = [];
    FC.reached = 0; FC.waveComplete = false; FC.cadetSerial = 0;
    FC.sentrySerial = 0; FC.objSerial = 0; FC.spawnDone = false;

    const wave = FC.wave;
    const numSentries = Math.min(2 + wave, 5);
    const numObj = 1 + Math.min(wave - 1, 2); // up to 3 objectives at higher waves

    // Cover / concealment markers — areas that reduce detection
    const coverSpots = [
      { x: 130, y: 180 }, { x: 470, y: 150 }, { x: 200, y: 430 },
      { x: 430, y: 470 }, { x: 340, y: 250 }, { x: 90, y: 360 },
      { x: 510, y: 320 }, { x: 250, y: 510 }
    ];
    coverSpots.forEach(function (s) {
      FC.cover.push({ x: s.x, y: s.y, r: 42, used: false });
    });

    // Sentries — patrol along waypoints across the map with rotating vision cones
    for (let i = 0; i < numSentries; i++) {
      // Build a patrol route with 2-3 waypoints the sentry walks between
      const baseAng = (i / numSentries) * Math.PI * 2 + 0.4;
      const cx = FC_MAP.cx + Math.cos(baseAng) * (120 + (i % 2) * 50);
      const cy = FC_MAP.cy + Math.sin(baseAng) * (120 + (i % 2) * 50);
      // patrol leg length & direction — perpendicular-ish spread so they walk across terrain
      const legAng = baseAng + Math.PI / 2 + (i % 2 === 0 ? 0 : 0.6);
      const legLen = 110 + (i % 3) * 30; // 110-170px legs
      const wpA = { x: cx - Math.cos(legAng) * legLen, y: cy - Math.sin(legAng) * legLen };
      const wpB = { x: cx + Math.cos(legAng) * legLen, y: cy + Math.sin(legAng) * legLen };
      // clamp waypoints inside the playable area
      const clamp = function (p) {
        return { x: Math.max(60, Math.min(FC_MAP.size - 60, p.x)),
                 y: Math.max(60, Math.min(FC_MAP.size - 60, p.y)) };
      };
      const wps = [clamp(wpA), clamp(wpB)];
      // optional third waypoint for variety on later waves
      if (wave >= 2 && i % 2 === 1) {
        const wpC = clamp({ x: cx + Math.cos(legAng + 1.2) * legLen * 0.8,
                            y: cy + Math.sin(legAng + 1.2) * legLen * 0.8 });
        wps.push(wpC);
      }
      FC.sentries.push({
        id: "SENTRY-" + (++FC.sentrySerial),
        x: wps[0].x, y: wps[0].y,
        waypoints: wps,
        wpIndex: 1,                 // heading toward waypoints[1]
        patrolSpeed: 18 + wave * 1.5, // slow, visible walking speed (px/sec)
        facing: 0,                  // current heading angle (radians)
        visionRange: 120 + wave * 6,
        visionAngle: 30,             // cone half-angle (30° → 60° wide cone)
        scanAmp: 60,                 // sweep ±60° → total 180° coverage arc
        scanBase: i * 70,
        scanSpeed: 0.025 + wave * 0.004, // slow deliberate side-to-side sweep (~6s per cycle at wave 1)
        alerted: false,
        alertTimer: 0,
        walkPhase: i * 1.3          // stagger walk-bob phase per sentry
      });
    }

    // Objectives — placed in outer ring
    for (let i = 0; i < numObj; i++) {
      const ang = (i / numObj) * Math.PI * 2 + Math.PI / numObj;
      const rad = 230;
      FC.objectives.push({
        id: "OBJ-" + (++FC.objSerial),
        x: FC_MAP.cx + Math.cos(ang) * rad,
        y: FC_MAP.cy + Math.sin(ang) * rad,
        reached: false
      });
    }

    // Cadets — start at bottom centre staging area
    const callsigns = FC_CALLSIGNS.slice();
    for (let i = 0; i < 4; i++) {
      FC.cadets.push({
        id: callsigns[i].id,
        label: callsigns[i].label,
        color: callsigns[i].color,
        x: FC_MAP.cx - 30 + (i % 2) * 30,
        y: 540 - Math.floor(i / 2) * 22,
        heading: "N",
        tech: "halt",
        moving: false,
        moveDir: { dx: 0, dy: -1 },
        trail: [],
        concealment: 0,        // 0 (exposed) → 1 (fully concealed)
        detection: 0,          // 0 → 100 = detected
        detected: false,
        state: "staging",      // staging | moving | halted | concealing | observing | reached | detected
        targetCover: null,
        observeTimer: 0,
        reachedObjective: false
      });
    }
    FC.spawnDone = true;
    fcRenderStatic();
    fcRenderCadets();
    fcUpdateScoreboard();
    fcLog("info", "Wave " + wave + " deployed — " + numSentries + " sentries, " + numObj + " objective(s).");
    fcSetStatus("Section deployed. Select a cadet and send field signals to advance.", "ok");
  }

  // ---- Render static elements (cover, objectives, sentries) ----
  function fcRenderStatic() {
    const coverLayer = document.getElementById("fcCoverLayer");
    const objLayer = document.getElementById("fcObjLayer");
    const sentryLayer = document.getElementById("fcSentryLayer");
    if (!coverLayer || !objLayer || !sentryLayer) return;
    coverLayer.innerHTML = ""; objLayer.innerHTML = ""; sentryLayer.innerHTML = "";

    // Cover markers
    FC.cover.forEach(function (c) {
      const ring = document.createElementNS(SVGNS, "circle");
      ring.setAttribute("cx", c.x); ring.setAttribute("cy", c.y); ring.setAttribute("r", c.r);
      ring.setAttribute("fill", "rgba(107,142,35,0.10)");
      ring.setAttribute("stroke", "rgba(107,142,35,0.45)");
      ring.setAttribute("stroke-dasharray", "4 4");
      ring.setAttribute("stroke-width", 1);
      ring.setAttribute("class", "fc-cover-marker");
      coverLayer.appendChild(ring);
    });

    // Objectives
    FC.objectives.forEach(function (o) {
      const grp = document.createElementNS(SVGNS, "g");
      grp.setAttribute("transform", "translate(" + o.x + "," + o.y + ")");
      if (!o.reached) {
        const glow = document.createElementNS(SVGNS, "circle");
        glow.setAttribute("cx", 0); glow.setAttribute("cy", 0); glow.setAttribute("r", 18);
        glow.setAttribute("fill", "url(#fcObjGlow)");
        glow.setAttribute("class", "fc-objective-glow");
        grp.appendChild(glow);
        const beacon = document.createElementNS(SVGNS, "circle");
        beacon.setAttribute("cx", 0); beacon.setAttribute("cy", 0); beacon.setAttribute("r", 6);
        beacon.setAttribute("fill", "none");
        beacon.setAttribute("stroke", "#ffd66b");
        beacon.setAttribute("stroke-width", 2);
        beacon.setAttribute("class", "fc-obj-beacon");
        grp.appendChild(beacon);
        const dot = document.createElementNS(SVGNS, "circle");
        dot.setAttribute("cx", 0); dot.setAttribute("cy", 0); dot.setAttribute("r", 4);
        dot.setAttribute("fill", "#ffd66b");
        grp.appendChild(dot);
        const lbl = document.createElementNS(SVGNS, "text");
        lbl.setAttribute("x", 0); lbl.setAttribute("y", -16);
        lbl.setAttribute("text-anchor", "middle");
        lbl.setAttribute("class", "fc-label fc-label-obj");
        lbl.textContent = o.id;
        grp.appendChild(lbl);
      } else {
        const done = document.createElementNS(SVGNS, "circle");
        done.setAttribute("cx", 0); done.setAttribute("cy", 0); done.setAttribute("r", 6);
        done.setAttribute("fill", "#38d97b");
        grp.appendChild(done);
        const chk = document.createElementNS(SVGNS, "text");
        chk.setAttribute("x", 0); chk.setAttribute("y", 4);
        chk.setAttribute("text-anchor", "middle");
        chk.setAttribute("fill", "#0a0f08");
        chk.setAttribute("font-size", 9);
        chk.setAttribute("font-weight", 800);
        chk.textContent = "✓";
        grp.appendChild(chk);
      }
      objLayer.appendChild(grp);
    });

    // Sentries + vision cones + patrol routes
    FC.sentries.forEach(function (s) {
      // patrol route line (dashed) connecting waypoints
      if (s.waypoints && s.waypoints.length >= 2) {
        const route = document.createElementNS(SVGNS, "polyline");
        const pts = s.waypoints.map(function (p) {
          return p.x.toFixed(1) + "," + p.y.toFixed(1);
        }).join(" ");
        route.setAttribute("points", pts);
        route.setAttribute("class", "fc-patrol-route");
        sentryLayer.appendChild(route);
        // waypoint markers
        s.waypoints.forEach(function (wp) {
          const dot = document.createElementNS(SVGNS, "circle");
          dot.setAttribute("cx", wp.x); dot.setAttribute("cy", wp.y);
          dot.setAttribute("r", 3.5);
          dot.setAttribute("class", "fc-patrol-wp");
          sentryLayer.appendChild(dot);
        });
      }

      const grp = document.createElementNS(SVGNS, "g");
      grp.setAttribute("transform", "translate(" + s.x + "," + s.y + ")");

      // vision cone (will be updated by scan angle + facing in render loop)
      const cone = document.createElementNS(SVGNS, "path");
      cone.setAttribute("class", "fc-vision-cone");
      cone.setAttribute("fill", "url(#fcVisionGrad)");
      cone.setAttribute("stroke", "rgba(255,90,110,0.4)");
      cone.setAttribute("stroke-width", 1);
      grp.appendChild(cone);
      grp._cone = cone;

      // scan sweep handle — rotate the cone
      const sweepHandle = document.createElementNS(SVGNS, "g");
      sweepHandle.setAttribute("class", "fc-vision-sweep");
      grp.appendChild(sweepHandle);
      grp._sweep = sweepHandle;

      // facing triangle — points in the patrol direction
      const facing = document.createElementNS(SVGNS, "polygon");
      facing.setAttribute("class", "fc-sentry-facing");
      facing.setAttribute("points", "0,-8 5,2 -5,2");
      facing.setAttribute("fill", "rgba(255,90,110,0.75)");
      grp.appendChild(facing);
      grp._facing = facing;

      // body wrapper for walk-bob animation
      const bodyWrap = document.createElementNS(SVGNS, "g");
      bodyWrap.setAttribute("class", "fc-sentry-body");

      const body = document.createElementNS(SVGNS, "circle");
      body.setAttribute("cx", 0); body.setAttribute("cy", 0); body.setAttribute("r", 7);
      body.setAttribute("fill", "#ff5a6e");
      body.setAttribute("stroke", "#7a1a26");
      body.setAttribute("stroke-width", 1.5);
      bodyWrap.appendChild(body);

      const eye = document.createElementNS(SVGNS, "circle");
      eye.setAttribute("cx", 0); eye.setAttribute("cy", 0); eye.setAttribute("r", 2.5);
      eye.setAttribute("fill", "#0a0f08");
      bodyWrap.appendChild(eye);
      grp.appendChild(bodyWrap);

      const lbl = document.createElementNS(SVGNS, "text");
      lbl.setAttribute("x", 0); lbl.setAttribute("y", 20);
      lbl.setAttribute("text-anchor", "middle");
      lbl.setAttribute("class", "fc-label fc-label-sentry");
      lbl.textContent = s.id;
      grp.appendChild(lbl);

      sentryLayer.appendChild(grp);
      s._el = grp;
      s._coneEl = cone;
      s._facingEl = facing;
    });
  }

  // ---- Render cadets (and trails) ----
  function fcRenderCadets() {
    const trailLayer = document.getElementById("fcTrailLayer");
    const cadetLayer = document.getElementById("fcCadetLayer");
    if (!trailLayer || !cadetLayer) return;
    trailLayer.innerHTML = ""; cadetLayer.innerHTML = "";

    FC.cadets.forEach(function (cd) {
      // trail polyline
      if (cd.trail.length > 1) {
        const pl = document.createElementNS(SVGNS, "polyline");
        const pts = cd.trail.map(function (p) { return p.x.toFixed(1) + "," + p.y.toFixed(1); }).join(" ");
        pl.setAttribute("points", pts);
        pl.setAttribute("fill", "none");
        pl.setAttribute("stroke", cd.color);
        pl.setAttribute("stroke-width", 1.5);
        pl.setAttribute("stroke-opacity", 0.35);
        pl.setAttribute("class", "fc-trail");
        trailLayer.appendChild(pl);
      }

      const grp = document.createElementNS(SVGNS, "g");
      grp.setAttribute("transform", "translate(" + cd.x + "," + cd.y + ")");

      // concealment ring (dashed, green) — fades in when concealed
      if (cd.concealment > 0.05 && !cd.detected) {
        const cring = document.createElementNS(SVGNS, "circle");
        cring.setAttribute("cx", 0); cring.setAttribute("cy", 0);
        cring.setAttribute("r", 11);
        cring.setAttribute("fill", "none");
        cring.setAttribute("stroke", "#38d97b");
        cring.setAttribute("stroke-width", 1.5);
        cring.setAttribute("stroke-dasharray", "3 3");
        cring.setAttribute("opacity", cd.concealment * 0.7);
        cring.setAttribute("class", "fc-conceal-ring");
        grp.appendChild(cring);
      }

      // detection ring (red, pulsing) when detection building up
      if (cd.detection > 25 && !cd.detected) {
        const dring = document.createElementNS(SVGNS, "circle");
        dring.setAttribute("cx", 0); dring.setAttribute("cy", 0);
        dring.setAttribute("r", 8);
        dring.setAttribute("fill", "none");
        dring.setAttribute("stroke", "#ff5a6e");
        dring.setAttribute("stroke-width", 1.5);
        dring.setAttribute("opacity", (cd.detection / 100) * 0.8);
        dring.setAttribute("class", "fc-alert-pulse");
        grp.appendChild(dring);
      }

      // cadet body
      const body = document.createElementNS(SVGNS, "circle");
      body.setAttribute("cx", 0); body.setAttribute("cy", 0);
      body.setAttribute("r", 6);
      let cls = "fc-cadet-dot";
      if (cd.detected) {
        body.setAttribute("fill", "#ff5a6e");
        cls += " fc-risk-high";
      } else if (cd.detection > 50) {
        body.setAttribute("fill", "#ffb454");
        cls += " fc-risk-high";
      } else if (cd.concealment > 0.5) {
        body.setAttribute("fill", cd.color);
        body.setAttribute("opacity", 0.55 + cd.concealment * 0.3);
      } else {
        body.setAttribute("fill", cd.color);
      }
      if (cd.id === FC.selectedId) cls += " selected";
      body.setAttribute("class", cls);
      body.setAttribute("data-cadet", cd.id);
      body.addEventListener("click", function () { fcSelectCadet(cd.id); });
      grp.appendChild(body);

      // selected outline
      if (cd.id === FC.selectedId) {
        const sel = document.createElementNS(SVGNS, "circle");
        sel.setAttribute("cx", 0); sel.setAttribute("cy", 0);
        sel.setAttribute("r", 10);
        sel.setAttribute("fill", "none");
        sel.setAttribute("stroke", "#ffd66b");
        sel.setAttribute("stroke-width", 1.8);
        grp.appendChild(sel);
      }

      // reached checkmark
      if (cd.reachedObjective) {
        const ch = document.createElementNS(SVGNS, "text");
        ch.setAttribute("x", 0); ch.setAttribute("y", -11);
        ch.setAttribute("text-anchor", "middle");
        ch.setAttribute("fill", "#38d97b");
        ch.setAttribute("font-size", 11);
        ch.setAttribute("font-weight", 800);
        ch.textContent = "✓";
        grp.appendChild(ch);
      }

      const lbl = document.createElementNS(SVGNS, "text");
      lbl.setAttribute("x", 0); lbl.setAttribute("y", 20);
      lbl.setAttribute("text-anchor", "middle");
      lbl.setAttribute("class", "fc-label" + (cd.id === FC.selectedId ? " fc-label-selected" : ""));
      lbl.setAttribute("fill", cd.id === FC.selectedId ? "#ffd66b" : cd.color);
      lbl.textContent = cd.label;
      grp.appendChild(lbl);

      cadetLayer.appendChild(grp);
    });
  }

  // ---- Render sentry vision cones (animated scan) + patrol movement ----
  function fcRenderSentries(dt) {
    const sec = dt / 1000;
    FC.sentries.forEach(function (s) {
      if (!s._coneEl) return;

      // ---- Patrol movement: walk toward current waypoint ----
      if (s.waypoints && s.waypoints.length > 1) {
        const target = s.waypoints[s.wpIndex];
        const dx = target.x - s.x;
        const dy = target.y - s.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 4) {
          // reached this waypoint — advance to next (loop back to 0)
          s.wpIndex = (s.wpIndex + 1) % s.waypoints.length;
        } else {
          // walk slowly toward the waypoint
          const step = s.patrolSpeed * sec;
          const mvx = (dx / dist) * Math.min(step, dist);
          const mvy = (dy / dist) * Math.min(step, dist);
          s.x += mvx;
          s.y += mvy;
          // update facing angle to match walking direction
          s.facing = Math.atan2(dy, dx);
        }
      }

      // update sentry group position on the map
      if (s._el) s._el.setAttribute("transform", "translate(" + s.x.toFixed(1) + "," + s.y.toFixed(1) + ")");

      // rotate facing triangle toward patrol direction (facing 0 = east in atan2 terms)
      if (s._facingEl) {
        // triangle points up (-Y) at 0deg; convert atan2 angle to rotation
        const facingDeg = (s.facing * 180 / Math.PI) + 90;
        s._facingEl.setAttribute("transform", "rotate(" + facingDeg.toFixed(1) + ")");
      }

      // walk-bob: add/remove the walking class based on whether patrolling
      if (s._el) {
        if (s.waypoints && s.waypoints.length > 1) {
          s._el.classList.add("fc-sentry-walking");
        }
      }

      // ---- Vision cone: oriented by facing + scan sweep ----
      s.scanBase += s.scanSpeed * dt * 0.04;
      const scan = Math.sin(s.scanBase) * s.scanAmp;
      // base angle = patrol facing direction (atan2) + scan offset
      const baseAng = s.facing + scan * Math.PI / 180;
      const range = s.visionRange;
      const half = (s.visionAngle) * Math.PI / 180;
      const ax = Math.cos(baseAng - half) * range;
      const ay = Math.sin(baseAng - half) * range;
      const bx = Math.cos(baseAng + half) * range;
      const by = Math.sin(baseAng + half) * range;
      const path = "M0,0 L" + ax.toFixed(1) + "," + ay.toFixed(1) +
                   " A" + range + "," + range + " 0 0 1 " + bx.toFixed(1) + "," + by.toFixed(1) + " Z";
      s._coneEl.setAttribute("d", path);
      // alert colour
      if (s.alerted) {
        s._coneEl.setAttribute("fill", "rgba(255,90,110,0.45)");
        s.alertTimer -= dt;
        if (s.alertTimer <= 0) s.alerted = false;
      } else {
        s._coneEl.setAttribute("fill", "url(#fcVisionGrad)");
      }
    });
  }

  // ---- Is a cadet inside a sentry's current vision cone? ----
  function fcInVision(sentry, cadet) {
    const dx = cadet.x - sentry.x;
    const dy = cadet.y - sentry.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > sentry.visionRange) return 0;
    if (dist < 8) return 1; // right on top
    const cadetAng = Math.atan2(dy, dx);
    const scan = Math.sin(sentry.scanBase) * sentry.scanAmp;
    // base angle now driven by patrol facing + scan
    const baseAng = sentry.facing + scan * Math.PI / 180;
    let diff = cadetAng - baseAng;
    while (diff > Math.PI) diff -= 2 * Math.PI;
    while (diff < -Math.PI) diff += 2 * Math.PI;
    const half = sentry.visionAngle * Math.PI / 180;
    if (Math.abs(diff) > half) return 0;
    // falloff with distance
    return 1 - (dist / sentry.visionRange);
  }

  // ---- Update loop ----
  function fcUpdate(dt) {
    if (!FC.running || FC.paused) return;
    const sec = dt / 1000;

    // animate sentries
    fcRenderSentries(dt);

    // cover check + concealment
    FC.cadets.forEach(function (cd) {
      if (cd.detected || cd.reachedObjective) return;
      // concealment from cover
      let inCover = false;
      for (let i = 0; i < FC.cover.length; i++) {
        const c = FC.cover[i];
        const d = Math.hypot(cd.x - c.x, cd.y - c.y);
        if (d < c.r) { inCover = true; break; }
      }
      // stillness + cover increases concealment
      if (inCover) {
        cd.concealment = Math.min(1, cd.concealment + sec * 0.6);
      } else if (!cd.moving) {
        cd.concealment = Math.max(0, cd.concealment - sec * 0.2);
      } else {
        cd.concealment = Math.max(0, cd.concealment - sec * 0.5);
      }

      // movement
      if (cd.moving && cd.tech !== "halt") {
        const tech = FC_TECH[cd.tech];
        const spd = tech.speed;
        cd.x += cd.moveDir.dx * spd * sec;
        cd.y += cd.moveDir.dy * spd * sec;
        // clamp to map
        cd.x = Math.max(12, Math.min(FC_MAP.size - 12, cd.x));
        cd.y = Math.max(12, Math.min(FC_MAP.size - 12, cd.y));
        // trail
        if (!cd._lastTrail || Math.hypot(cd.x - cd._lastTrail.x, cd.y - cd._lastTrail.y) > 6) {
          cd.trail.push({ x: cd.x, y: cd.y });
          if (cd.trail.length > 40) cd.trail.shift();
          cd._lastTrail = { x: cd.x, y: cd.y };
        }
        // heading label from direction
        cd.heading = fcDirLabel(cd.moveDir);
        // stop at objective
        for (let o = 0; o < FC.objectives.length; o++) {
          const obj = FC.objectives[o];
          if (!obj.reached && Math.hypot(cd.x - obj.x, cd.y - obj.y) < 16) {
            obj.reached = true;
            cd.reachedObjective = true;
            cd.moving = false;
            cd.tech = "halt";
            cd.state = "reached";
            FC.reached++;
            FC.score += 50;
            fcLog("ok", cd.label + " reached " + obj.id + " undetected — +50.");
            fcAddBurst(obj.x, obj.y, "#38d97b");
            fcSetStatus(cd.label + " secured the objective! +" + 50 + " points.", "success");
            fcUpdateScoreboard();
            fcCheckWaveComplete();
          }
        }
      }

      // detection from sentries
      let maxVis = 0;
      for (let i = 0; i < FC.sentries.length; i++) {
        const v = fcInVision(FC.sentries[i], cd);
        if (v > maxVis) maxVis = v;
        if (v > 0.3) FC.sentries[i].alerted = true, FC.sentries[i].alertTimer = 1200;
      }
      // detection rises with visibility × technique factor, reduced by concealment
      const techDetect = FC_TECH[cd.tech] ? FC_TECH[cd.tech].detect : 0.2;
      const exposure = maxVis * (0.4 + techDetect) * (1 - cd.concealment * 0.7);
      if (exposure > 0.05) {
        cd.detection += exposure * sec * 55;
      } else {
        cd.detection = Math.max(0, cd.detection - sec * 30);
      }
      if (cd.detection >= 100 && !cd.detected) {
        cd.detected = true;
        cd.moving = false;
        cd.state = "detected";
        FC.detected++;
        FC.score = Math.max(0, FC.score - 20);
        fcLog("err", cd.label + " DETECTED by enemy sentry — −20. Break contact!");
        fcAddBurst(cd.x, cd.y, "#ff5a6e");
        fcSetStatus("⚠ " + cd.label + " compromised! Movement seen by sentry.", "alert");
        fcUpdateScoreboard();
      }
      // observing
      if (cd.state === "observing") {
        cd.observeTimer -= dt;
        // spot nearby sentries
        let spotted = false;
        FC.sentries.forEach(function (s) {
          if (Math.hypot(cd.x - s.x, cd.y - s.y) < 160 && !s._spottedBy) {
            s._spottedBy = cd.label;
            spotted = true;
          }
        });
        if (spotted) {
          FC.score += 10;
          fcLog("ok", cd.label + " observed enemy positions — +10.");
          fcUpdateScoreboard();
        }
        if (cd.observeTimer <= 0) {
          cd.state = "halted";
          cd.tech = "halt";
        }
      }
    });

    // render cadets each frame
    fcRenderCadets();

    // render bursts
    fcRenderBursts(dt);

    // selected detail live update
    if (FC.selectedId) fcRenderSelectedDetail();
  }

  function fcDirLabel(dir) {
    if (dir.dy < -0.5 && Math.abs(dir.dx) < 0.5) return "N";
    if (dir.dy > 0.5 && Math.abs(dir.dx) < 0.5) return "S";
    if (dir.dx > 0.5 && Math.abs(dir.dy) < 0.5) return "E";
    if (dir.dx < -0.5 && Math.abs(dir.dy) < 0.5) return "W";
    if (dir.dx > 0 && dir.dy < 0) return "NE";
    if (dir.dx > 0 && dir.dy > 0) return "SE";
    if (dir.dx < 0 && dir.dy > 0) return "SW";
    if (dir.dx < 0 && dir.dy < 0) return "NW";
    return "—";
  }

  // ---- Bursts (transient visual effects) ----
  function fcAddBurst(x, y, color) {
    FC.burstQueue.push({ x: x, y: y, color: color, age: 0 });
  }
  function fcRenderBursts(dt) {
    const layer = document.getElementById("fcBurstLayer");
    if (!layer) return;
    layer.innerHTML = "";
    for (let i = FC.burstQueue.length - 1; i >= 0; i--) {
      const b = FC.burstQueue[i];
      b.age += dt;
      if (b.age > 700) { FC.burstQueue.splice(i, 1); continue; }
      const prog = b.age / 700;
      const r = 5 + prog * 30;
      const ring = document.createElementNS(SVGNS, "circle");
      ring.setAttribute("cx", b.x); ring.setAttribute("cy", b.y); ring.setAttribute("r", r);
      ring.setAttribute("fill", "none");
      ring.setAttribute("stroke", b.color);
      ring.setAttribute("stroke-width", 2);
      ring.setAttribute("opacity", 1 - prog);
      layer.appendChild(ring);
    }
  }

  // ---- Selection ----
  function fcSelectCadet(id) {
    const cd = FC.cadets.find(function (c) { return c.id === id; });
    if (!cd || cd.detected || cd.reachedObjective) return;
    FC.selectedId = id;
    fcRenderCadets();
    fcRenderSelectedDetail();
    fcBuildCallChips();
    fcBuildSignalChips();
    fcBuildDetailChips();
    fcSetStatus("Selected " + cd.label + ". Build a field signal to direct movement.", "ok");
  }

  function fcRenderSelectedDetail() {
    const cd = FC.cadets.find(function (c) { return c.id === FC.selectedId; });
    const empty = document.getElementById("fcsEmpty");
    const det = document.getElementById("fcsDetail");
    if (!cd) {
      if (empty) empty.style.display = "block";
      if (det) det.style.display = "none";
      return;
    }
    if (empty) empty.style.display = "none";
    if (det) det.style.display = "block";
    document.getElementById("fcsCallsign").textContent = cd.label;
    document.getElementById("fcsTech").textContent = FC_TECH[cd.tech] ? FC_TECH[cd.tech].name : "—";
    document.getElementById("fcsMove").textContent = cd.moving ? "Moving" : (cd.state === "observing" ? "Observing" : "Halted");
    document.getElementById("fcsHeading").textContent = cd.heading;
    document.getElementById("fcsPos").textContent = Math.round(cd.x) + "," + Math.round(cd.y);
    const concEl = document.getElementById("fcsConceal");
    const pct = Math.round(cd.concealment * 100);
    concEl.textContent = pct + "%";
    concEl.className = "fcs-v " + (cd.concealment > 0.5 ? "concealed" : (cd.concealment < 0.2 ? "exposed" : ""));
    // distance to nearest unreached objective
    let minD = Infinity;
    FC.objectives.forEach(function (o) {
      if (!o.reached) {
        const d = Math.hypot(cd.x - o.x, cd.y - o.y);
        if (d < minD) minD = d;
      }
    });
    document.getElementById("fcsDist").textContent = minD === Infinity ? "—" : Math.round(minD) + "px";
  }

  // ---- Field signal chips ----
  function fcBuildCallChips() {
    const box = document.getElementById("fcCallChips");
    if (!box) return;
    box.innerHTML = "";
    FC.cadets.forEach(function (cd) {
      if (cd.detected || cd.reachedObjective) return;
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "fc-chip" + (cd.id === FC.signalParts.callsign ? " selected" : "") + (cd.id === FC.selectedId ? " selected" : "");
      chip.textContent = cd.label;
      chip.addEventListener("click", function () {
        FC.signalParts.callsign = cd.id;
        fcSelectCadet(cd.id);
        fcBuildCallChips(); fcBuildSignalChips(); fcBuildDetailChips(); fcUpdateBuiltLine();
      });
      box.appendChild(chip);
    });
  }

  function fcBuildSignalChips() {
    const box = document.getElementById("fcSignalChips");
    if (!box) return;
    box.innerHTML = "";
    const enabled = !!FC.signalParts.callsign;
    FC_SIGNALS.forEach(function (sig) {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "fc-chip" + (sig.id === FC.signalParts.signal ? " selected" : "") + (enabled ? "" : " disabled");
      chip.textContent = sig.label;
      if (enabled) {
        chip.addEventListener("click", function () {
          FC.signalParts.signal = sig.id;
          fcBuildSignalChips(); fcBuildDetailChips(); fcUpdateBuiltLine();
        });
      }
      box.appendChild(chip);
    });
  }

  function fcBuildDetailChips() {
    const box = document.getElementById("fcDetailChips");
    if (!box) return;
    box.innerHTML = "";
    const sig = FC.signalParts.signal;
    if (!sig) return;
    let options = [];
    if (sig === "advance") {
      options = FC_DIRS.map(function (d) { return { id: d.id, label: d.label }; });
    } else if (sig === "takecover") {
      options = [{ id: "nearest", label: "Nearest cover" }];
    } else if (sig === "observe") {
      options = [{ id: "hold", label: "Hold & scan" }];
    } else if (sig === "halt") {
      options = [{ id: "freeze", label: "Freeze in place" }];
    }
    options.forEach(function (opt) {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "fc-chip" + (opt.id === FC.signalParts.detail ? " selected" : "");
      chip.textContent = opt.label;
      chip.addEventListener("click", function () {
        FC.signalParts.detail = opt.id;
        fcBuildDetailChips(); fcUpdateBuiltLine();
      });
      box.appendChild(chip);
    });
  }

  function fcUpdateBuiltLine() {
    const txt = document.getElementById("fblText");
    const btn = document.getElementById("fcSendBtn");
    if (!txt) return;
    const parts = FC.signalParts;
    const cd = FC.cadets.find(function (c) { return c.id === parts.callsign; });
    const sig = FC_SIGNALS.find(function (s) { return s.id === parts.signal; });
    if (cd && sig && parts.detail) {
      let detailTxt = parts.detail;
      if (sig.id === "advance") {
        const d = FC_DIRS.find(function (x) { return x.id === parts.detail; });
        detailTxt = d ? d.label : parts.detail;
      }
      txt.textContent = cd.label + " — " + sig.label + " — " + detailTxt;
      txt.classList.remove("invalid");
      if (btn) btn.disabled = false;
    } else {
      txt.textContent = "— select components —";
      txt.classList.add("invalid");
      if (btn) btn.disabled = true;
    }
  }

  function fcClearSignal() {
    FC.signalParts = { callsign: null, signal: null, detail: null };
    fcBuildCallChips(); fcBuildSignalChips(); fcBuildDetailChips(); fcUpdateBuiltLine();
  }

  // ---- Execute / send signal ----
  function fcSendSignal() {
    const parts = FC.signalParts;
    const cd = FC.cadets.find(function (c) { return c.id === parts.callsign; });
    if (!cd || cd.detected || cd.reachedObjective) {
      fcLog("err", "Invalid signal — cadet unavailable.");
      return;
    }
    const sig = FC_SIGNALS.find(function (s) { return s.id === parts.signal; });
    if (!sig || !parts.detail) {
      fcLog("err", "Incomplete field signal — select all components.");
      return;
    }

    if (sig.id === "advance") {
      const d = FC_DIRS.find(function (x) { return x.id === parts.detail; });
      if (!d) return;
      cd.moveDir = { dx: d.dx, dy: d.dy };
      cd.moving = true;
      cd.tech = FC.currentTech;
      cd.state = "moving";
      fcLog("info", cd.label + " — Advance " + d.label + " (" + FC_TECH[FC.currentTech].name + ").");
    } else if (sig.id === "halt") {
      cd.moving = false;
      cd.tech = "halt";
      cd.state = "halted";
      fcLog("info", cd.label + " — Halt. Freezing in place.");
    } else if (sig.id === "takecover") {
      // find nearest cover spot
      let nearest = null, nd = Infinity;
      FC.cover.forEach(function (c) {
        const dist = Math.hypot(cd.x - c.x, cd.y - c.y);
        if (dist < nd) { nd = dist; nearest = c; }
      });
      if (nearest) {
        const ddx = nearest.x - cd.x, ddy = nearest.y - cd.y;
        const mag = Math.hypot(ddx, ddy) || 1;
        cd.moveDir = { dx: ddx / mag, dy: ddy / mag };
        cd.moving = true;
        cd.tech = "monkey";
        cd.state = "concealing";
        cd.targetCover = nearest;
        fcLog("info", cd.label + " — Take Cover (Monkey Run) to nearest concealment.");
      }
    } else if (sig.id === "observe") {
      cd.moving = false;
      cd.tech = "halt";
      cd.state = "observing";
      cd.observeTimer = 2500;
      fcLog("info", cd.label + " — Observe. Scanning for enemy positions…");
    }
    fcRenderCadets();
    fcRenderSelectedDetail();
    fcClearSignal();
  }

  // ---- Technique quick-select (changes movement style of selected cadet) ----
  function fcSetTechnique(techId) {
    const cd = FC.cadets.find(function (c) { return c.id === FC.selectedId; });
    if (!cd || cd.detected || cd.reachedObjective) return;
    cd.tech = techId;
    if (techId === "halt") { cd.moving = false; cd.state = "halted"; }
    else if (cd.state !== "moving" && cd.state !== "concealing") {
      // keep existing direction if any
    }
    fcLog("info", cd.label + " technique: " + FC_TECH[techId].name + ".");
    fcRenderSelectedDetail();
  }

  // ---- Scoreboard / status / log ----
  function fcUpdateScoreboard() {
    const s = document.getElementById("fcScore");
    const r = document.getElementById("fcObjective");
    const w = document.getElementById("fcWave");
    const d = document.getElementById("fcDetected");
    if (s) s.textContent = FC.score;
    if (r) r.textContent = FC.reached;
    if (w) w.textContent = FC.wave;
    if (d) d.textContent = FC.detected;
  }

  function fcSetStatus(text, kind) {
    const strip = document.getElementById("fcStatusStrip");
    const txt = document.getElementById("fcStatusTxt");
    if (txt) txt.textContent = text;
    if (strip) {
      strip.classList.remove("alert", "success");
      if (kind === "alert") strip.classList.add("alert");
      if (kind === "success") strip.classList.add("success");
    }
  }

  function fcLog(kind, text) {
    const term = document.getElementById("fcTerminal");
    if (!term) return;
    const ln = document.createElement("div");
    ln.className = "fc-ln fc-ln-" + kind;
    const time = new Date();
    const ts = String(time.getMinutes()).padStart(2, "0") + ":" + String(time.getSeconds()).padStart(2, "0");
    ln.textContent = "[" + ts + "] " + text;
    term.appendChild(ln);
    term.scrollTop = term.scrollHeight;
    // keep last 60
    while (term.children.length > 60) term.removeChild(term.firstChild);
  }

  // ---- Wave completion ----
  function fcCheckWaveComplete() {
    const activeCadets = FC.cadets.filter(function (c) { return !c.detected && !c.reachedObjective; });
    const remainingObj = FC.objectives.filter(function (o) { return !o.reached; });
    if (remainingObj.length === 0 && !FC.waveComplete) {
      FC.waveComplete = true;
      FC.score += 100;
      fcLog("ok", "★ All objectives secured! Wave " + FC.wave + " complete — +100 bonus.");
      fcSetStatus("Wave " + FC.wave + " complete! Starting next patrol…", "success");
      fcUpdateScoreboard();
      setTimeout(function () {
        FC.wave++;
        fcSetupWave();
      }, 2200);
    } else if (activeCadets.length === 0 && remainingObj.length > 0 && !FC.waveComplete) {
      // all cadets compromised
      FC.waveComplete = true;
      fcLog("err", "Section fully compromised. Patrol failed.");
      fcSetStatus("Section compromised — patrol failed. Press Start to redeploy.", "alert");
      fcStopGame();
    }
  }

  // ---- Animation loop ----
  function fcLoop(ts) {
    if (!FC.running) return;
    if (!FC.lastFrame) FC.lastFrame = ts;
    let dt = ts - FC.lastFrame;
    FC.lastFrame = ts;
    if (dt > 100) dt = 100; // clamp
    fcUpdate(dt);
    FC.rafId = requestAnimationFrame(fcLoop);
  }

  // ---- Game lifecycle ----
  function fcStartGame() {
    if (!FC.spawnDone) fcSetupWave();
    FC.running = true; FC.paused = false;
    FC.lastFrame = 0;
    const overlay = document.getElementById("fcScanOverlay");
    if (overlay) overlay.classList.remove("idle");
    fcLog("info", "Patrol commenced. Move your section to the objectives.");
    fcSetStatus("Patrol active. Direct your cadets with field signals.", "ok");
    document.getElementById("fcStartBtn").disabled = true;
    document.getElementById("fcPauseBtn").disabled = false;
    if (FC.rafId) cancelAnimationFrame(FC.rafId);
    FC.rafId = requestAnimationFrame(fcLoop);
  }

  function fcPauseGame() {
    if (!FC.running) return;
    FC.paused = !FC.paused;
    const btn = document.getElementById("fcPauseBtn");
    const overlay = document.getElementById("fcScanOverlay");
    if (FC.paused) {
      btn.textContent = "▶ Resume";
      if (overlay) overlay.classList.add("idle");
      fcLog("info", "Patrol paused.");
    } else {
      btn.textContent = "⏸ Pause";
      if (overlay) overlay.classList.remove("idle");
      FC.lastFrame = 0;
      fcLog("info", "Patrol resumed.");
    }
  }

  function fcStopGame() {
    FC.running = false; FC.paused = false;
    if (FC.rafId) cancelAnimationFrame(FC.rafId);
    FC.rafId = null;
    const overlay = document.getElementById("fcScanOverlay");
    if (overlay) overlay.classList.add("idle");
    const sb = document.getElementById("fcStartBtn");
    const pb = document.getElementById("fcPauseBtn");
    if (sb) sb.disabled = false;
    if (pb) { pb.disabled = true; pb.textContent = "⏸ Pause"; }
  }

  // ---- Modal ----
  function fcShowModal() { const o = document.getElementById("fcModalOverlay"); if (o) o.style.display = "flex"; }
  function fcHideModal() { const o = document.getElementById("fcModalOverlay"); if (o) o.style.display = "none"; }

  // ---- Set current movement technique (applies to next Advance signal) ----
  function fcSetCurrentTech(techId) {
    FC.currentTech = techId;
    document.querySelectorAll(".fc-tech-chip").forEach(function (ch) {
      ch.classList.toggle("selected", ch.dataset.tech === techId);
    });
    // if the selected cadet is currently moving, update their technique live
    const cd = FC.cadets.find(function (c) { return c.id === FC.selectedId; });
    if (cd && cd.moving && !cd.detected && !cd.reachedObjective) {
      if (techId === "halt") { cd.moving = false; cd.state = "halted"; cd.tech = "halt"; }
      else { cd.tech = techId; }
      fcLog("info", cd.label + " switches to " + FC_TECH[techId].name + ".");
      fcRenderSelectedDetail();
    }
  }

  // ---- Init ----
  function fcInit() {
    if (FC.initDone) return;
    FC.initDone = true;
    fcInitMapSVG();
    fcSetupWave();
    fcBuildCallChips();

    const startBtn = document.getElementById("fcStartBtn");
    const pauseBtn = document.getElementById("fcPauseBtn");
    const howBtn = document.getElementById("fcHowBtn");
    const sendBtn = document.getElementById("fcSendBtn");
    const clearBtn = document.getElementById("fcClearBtn");
    const modalClose = document.getElementById("fcModalClose");
    if (startBtn) startBtn.addEventListener("click", fcStartGame);
    if (pauseBtn) pauseBtn.addEventListener("click", fcPauseGame);
    if (howBtn) howBtn.addEventListener("click", fcShowModal);
    if (sendBtn) sendBtn.addEventListener("click", fcSendSignal);
    if (clearBtn) clearBtn.addEventListener("click", fcClearSignal);
    if (modalClose) modalClose.addEventListener("click", fcHideModal);
    document.querySelectorAll(".fc-tech-chip").forEach(function (ch) {
      ch.addEventListener("click", function () { fcSetCurrentTech(ch.dataset.tech); });
    });
    const ov = document.getElementById("fcModalOverlay");
    if (ov) ov.addEventListener("click", function (e) { if (e.target === ov) fcHideModal(); });
  }

  // ==========================================================
  // EXPEDITION TRAIL GAME — Wilderness Survival Simulator
  // Turn-based multi-day expedition with survival stats, weather,
  // waypoints and field decision scenarios.
  // ==========================================================

  const ET_WEATHER = [
    { id: "partly",  ico: "\u26c5\ufe0f", label: "Partly Cloudy", temp: 14, drain: { energy: 4, hydration: 5, warmth: 3, morale: 0 } },
    { id: "sunny",   ico: "\u2600\ufe0f", label: "Sunny / Hot",  temp: 27, drain: { energy: 6, hydration: 9, warmth: 2, morale: 1 } },
    { id: "rain",    ico: "\ud83c\udf27\ufe0f", label: "Heavy Rain",  temp: 11, drain: { energy: 5, hydration: 3, warmth: 9, morale: -3 } },
    { id: "cold",    ico: "\u2744\ufe0f", label: "Cold / Wind",  temp: 2,  drain: { energy: 7, hydration: 4, warmth: 11, morale: -2 } },
    { id: "fog",     ico: "\ud83c\udf2b\ufe0f", label: "Fog / Low Vis", temp: 8, drain: { energy: 5, hydration: 4, warmth: 5, morale: -1 } }
  ];

  // Map waypoint coordinates on the 500x300 viewBox (left→right trail)
  const ET_WAYPOINTS = [
    { x: 40,  y: 230, terrain: "trailhead", label: "Trailhead" },
    { x: 95,  y: 180, terrain: "forest",    label: "Forest Edge" },
    { x: 150, y: 210, terrain: "stream",    label: "Stream Crossing" },
    { x: 205, y: 130, terrain: "ridge",     label: "Ridge Ascent" },
    { x: 255, y: 95,  terrain: "campsite",  label: "Night 1 Camp" },
    { x: 300, y: 150, terrain: "valley",    label: "Valley Floor" },
    { x: 345, y: 110, terrain: "lake",      label: "Alpine Lake" },
    { x: 400, y: 70,  terrain: "summit",    label: "Summit Push" },
    { x: 455, y: 50,  terrain: "finish",    label: "Expedition End" }
  ];

  // Nine field-decision scenarios — one per waypoint.
  // Each choice: { txt, ico, correct (0=wrong,1=ideal,2=acceptable), hint, effects:{energy,hydration,warmth,morale}, points }
  const ET_SCENARIOS = [
    {
      tag: "KIT PACKING", icon: "\ud83c\udf92", title: "Packing for the Trek",
      desc: "You are at the <em>trailhead</em> on Day 1. The forecast is partly cloudy with possible afternoon showers. Your pack is nearly full. Which final item do you prioritise?",
      choices: [
        { ico: "\ud83c\udf08", txt: "Waterproof shell jacket — rain is forecast.", correct: 1, hint: "Correct. A shell is the single most versatile layer for variable weather.", effects: { energy: 0, hydration: 0, warmth: 8, morale: 5 }, points: 40 },
        { ico: "\ud83d\udcf1", txt: "Fully charged smartphone for photos.", correct: 0, hint: "Poor choice. A phone drains battery in the cold and offers no warmth or navigation backup.", effects: { energy: -3, hydration: 0, warmth: -4, morale: -5 }, points: -15 },
        { ico: "\ud83c\udfa8", txt: "Extra pair of cotton jeans for comfort.", correct: 0, hint: "Cotton holds water and loses insulation when wet — avoid it on expedition.", effects: { energy: -4, hydration: 0, warmth: -6, morale: -3 }, points: -15 },
        { ico: "\ud83e\udea2", txt: "Spare paracord and a ferro rod.", correct: 2, hint: "Acceptable — useful survival kit, but less urgent than a shell in forecast rain.", effects: { energy: 0, hydration: 0, warmth: 3, morale: 3 }, points: 18 }
      ]
    },
    {
      tag: "CAMPSITE ASSESSMENT", icon: "\u26fa", title: "Selecting a Rest Spot",
      desc: "At the <em>forest edge</em> you need a quick rest. Which location is safest for a short break?",
      choices: [
        { ico: "\ud83c\udf33", txt: "Flat, elevated ground away from dead branches overhead.", correct: 1, hint: "Correct. Elevated, clear ground avoids flash water and falling limbs (widowmakers).", effects: { energy: 8, hydration: 0, warmth: 2, morale: 5 }, points: 40 },
        { ico: "\ud83c\udf86", txt: "Sheltered under a large dead tree — lots of shade.", correct: 0, hint: "Dangerous. Dead overhead branches can fall without warning (widowmakers).", effects: { energy: -6, hydration: 0, warmth: -5, morale: -8 }, points: -15 },
        { ico: "\ud83c\udf30", txt: "Dry riverbed — flat and soft underfoot.", correct: 0, hint: "A dry riverbed can flood suddenly if rain falls upstream. Never camp or rest there.", effects: { energy: -8, hydration: 0, warmth: -7, morale: -6 }, points: -15 }
      ]
    },
    {
      tag: "WATER CROSSING", icon: "\ud83d\udca7", title: "Crossing the Stream",
      desc: "A shallow but fast stream blocks your path at the <em>stream crossing</em>. The water is knee-deep and cold. How do you cross?",
      choices: [
        { ico: "\ud83e\uddf5", txt: "Undo pack hip-belt, face upstream, shuffle sideways using a staff.", correct: 1, hint: "Correct. Unbuckling the belt lets you shed the pack if you fall; facing upstream gives control.", effects: { energy: -3, hydration: 0, warmth: 5, morale: 4 }, points: 40 },
        { ico: "\ud83c\udfc3", txt: "Run across quickly to minimise time in the water.", correct: 0, hint: "Running on wet rocks risks a fall and head injury. Move slowly and deliberately.", effects: { energy: -8, hydration: 0, warmth: -6, morale: -5 }, points: -15 },
        { ico: "\ud83e\udea2", txt: "Look for a narrower, deeper channel to jump.", correct: 2, hint: "Risky — a deeper channel means a harder fall. A ford is safer than a jump.", effects: { energy: -5, hydration: 0, warmth: -4, morale: -3 }, points: 12 }
      ]
    },
    {
      tag: "WEATHER READING", icon: "\u2600\ufe0f", title: "Reading the Sky",
      desc: "Climbing the <em>ridge ascent</em>, you notice clouds lowering and a dark band building to the west. The wind has shifted. What do you do?",
      choices: [
        { ico: "\ud83c\udf27\ufe0f", txt: "Don shell layers, lower exposure, and push to camp before the front hits.", correct: 1, hint: "Correct. Lowering cloud and a wind shift signal an approaching front — act early.", effects: { energy: 0, hydration: 0, warmth: 8, morale: 6 }, points: 40 },
        { ico: "\ud83d\ude34", txt: "Keep going as you are — it might pass over.", correct: 0, hint: "Ignoring weather signs leaves you exposed to hypothermia when the rain and wind arrive.", effects: { energy: -2, hydration: 0, warmth: -10, morale: -6 }, points: -15 },
        { ico: "\ud83d\udd6f\ufe0f", txt: "Sit on the exposed ridge and wait to see what happens.", correct: 0, hint: "An exposed ridge is the worst place to wait out a storm — descend to shelter.", effects: { energy: -5, hydration: 0, warmth: -12, morale: -8 }, points: -15 }
      ]
    },
    {
      tag: "FIRE & SHELTER", icon: "\ud83d\udd25", title: "Night 1 — Building a Fire",
      desc: "You have reached <em>Night 1 Camp</em>. The temperature is dropping fast. You need a warming fire. Where and how do you build it?",
      choices: [
        { ico: "\ud83c\udf32", txt: "Clear a 2m ring to mineral soil, gather tinder→kindling→fuel, keep water nearby.", correct: 1, hint: "Correct. A cleared ring, staged fuel, and water on hand are the safe fire foundations.", effects: { energy: -2, hydration: 0, warmth: 14, morale: 6 }, points: 40 },
        { ico: "\ud83c\udf33", txt: "Build it against the base of a big tree for a windbreak.", correct: 0, hint: "Fire against a tree can ignite roots and bark — a major wildfire risk.", effects: { energy: -2, hydration: 0, warmth: 6, morale: -5 }, points: -15 },
        { ico: "\ud83e\udea2", txt: "Pile dry leaves and light the whole stack at once.", correct: 0, hint: "A leaf bonfire flares and dies fast with no sustained heat — and spreads easily.", effects: { energy: -3, hydration: 0, warmth: 2, morale: -4 }, points: -15 }
      ]
    },
    {
      tag: "WATER PURIFICATION", icon: "\ud83d\udca7", title: "Water at the Valley",
      desc: "On the <em>valley floor</em> your bottles are empty. A clear stream runs nearby. How do you refill safely?",
      choices: [
        { ico: "\ud83e\udea2", txt: "Filter, then boil for one full minute (three at altitude), or use purification tablets.", correct: 1, hint: "Correct. Boiling or chemical/tablet treatment kills the pathogens that clear water hides.", effects: { energy: 0, hydration: 18, warmth: 0, morale: 5 }, points: 40 },
        { ico: "\ud83e\udd44", txt: "Drink straight from the fast-flowing section — it looks clean.", correct: 0, hint: "Even clear, fast water can carry giardia and bacteria. Always treat before drinking.", effects: { energy: -4, hydration: 6, warmth: -3, morale: -6 }, points: -15 },
        { ico: "\u2700\ufe0f", txt: "Scoop from a still pool where sediment has settled out.", correct: 0, hint: "Still water concentrates pathogens and sediment — the worst source to drink untreated.", effects: { energy: -6, hydration: 4, warmth: -3, morale: -8 }, points: -15 }
      ]
    },
    {
      tag: "LEAVE-NO-TRACE", icon: "\u267b\ufe0f", title: "Camp Waste at the Lake",
      desc: "At the <em>alpine lake</em> you finish lunch. You have food scraps, packaging, and used tissue. What is the correct leave-no-trace practice?",
      choices: [
        { ico: "\ud83d\ude9a", txt: "Pack out ALL waste — food scraps, packaging, and tissue — nothing is buried or left.", correct: 1, hint: "Correct. Pack out everything, even organics — alpine environments cannot break them down.", effects: { energy: 0, hydration: 0, warmth: 0, morale: 6 }, points: 40 },
        { ico: "\u2697\ufe0f", txt: "Bury food scraps and tissue in a shallow hole; pack out only the plastic.", correct: 0, hint: "Burying food attracts wildlife and pollutes soil/water. Pack out all of it.", effects: { energy: 0, hydration: 0, warmth: 0, morale: -6 }, points: -15 },
        { ico: "\ud83d\udd25", txt: "Burn the packaging and scatter the food scraps for animals.", correct: 0, hint: "Burning plastic releases toxins; feeding wildlife habituates them and harms the ecosystem.", effects: { energy: 0, hydration: 0, warmth: 0, morale: -8 }, points: -15 }
      ]
    },
    {
      tag: "WILDLIFE SAFETY", icon: "\ud83d\udc3b", title: "Wildlife Encounter on the Summit Push",
      desc: "On the <em>summit push</em> a large bear is feeding on berries 40m ahead on the trail. It has not seen you yet. What do you do?",
      choices: [
        { ico: "\ud83d\udc63", txt: "Stop, stay calm, back away slowly the way you came, giving it space and a retreat route.", correct: 1, hint: "Correct. Calm, slow retreat gives the bear space and an exit — never corner it.", effects: { energy: -2, hydration: 0, warmth: 0, morale: 5 }, points: 40 },
        { ico: "\ud83d\udc3e", txt: "Run downhill fast — you can outrun it.", correct: 0, hint: "You cannot outrun a bear. Running triggers a chase response. Never run.", effects: { energy: -8, hydration: 0, warmth: -4, morale: -10 }, points: -15 },
        { ico: "\ud83d\udc41\ufe0f", txt: "Walk closer to get a good photo, then wave your arms to scare it off.", correct: 0, hint: "Approaching and waving at a feeding bear is aggressive and dangerous. Back away instead.", effects: { energy: -6, hydration: 0, warmth: -3, morale: -8 }, points: -15 }
      ]
    },
    {
      tag: "EMERGENCY RESPONSE", icon: "\u26a0\ufe0f", title: "Emergency at the End",
      desc: "Near the <em>expedition end</em>, a teammate twists an ankle on loose rock and cannot walk. No phone signal. What is your first priority?",
      choices: [
        { ico: "\u2764\ufe0f", txt: "Primary survey — check airway, breathing, circulation, then immobilise and plan a safe evacuation.", correct: 1, hint: "Correct. Survey for life threats first, then splint and organise a controlled carry-out.", effects: { energy: -2, hydration: 0, warmth: 2, morale: 6 }, points: 40 },
        { ico: "\ud83c\udf10", txt: "Leave them with water and run for help alone as fast as possible.", correct: 0, hint: "Leaving an injured person alone risks shock and exposure. Stabilise and move together.", effects: { energy: -7, hydration: -3, warmth: -5, morale: -8 }, points: -15 },
        { ico: "\ud83c\udf89", txt: "Tell them to walk it off — it's only a short way to the end.", correct: 0, hint: "Forcing weight on a possible fracture causes more injury. Immobilise and assist.", effects: { energy: -5, hydration: 0, warmth: -4, morale: -10 }, points: -15 }
      ]
    }
  ];

  // Initial pack contents shown on the map
  const ET_PACK = [
    { ico: "\ud83c\udf92", label: "Pack" },
    { ico: "\ud83c\udf08", label: "Shell" },
    { ico: "\u26fa", label: "Shelter" },
    { ico: "\ud83d\udd6f\ufe0f", label: "Fire kit" },
    { ico: "\ud83d\udca7", label: "Water" },
    { ico: "\ud83e\udd44", label: "Filter" },
    { ico: "\ud83d\uddfa\ufe0f", label: "Map" },
    { ico: "\ud83e\udded", label: "Compass" },
    { ico: "\u2764\ufe0f", label: "First aid" },
    { ico: "\ud83d\udd07", label: "Headlamp" }
  ];

  // Game state
  let et = {
    active: false,
    wpIndex: 0,        // current waypoint (0-based, 0..8)
    day: 1,
    weather: ET_WEATHER[0],
    score: 0,
    correctCount: 0,
    energy: 80,
    hydration: 80,
    warmth: 75,
    morale: 70,
    answered: false,   // whether current scenario has been answered
    completedDays: 0,
    finished: false,
    etInitDone: false
  };

  function etLoadStats() {
    try {
      const raw = localStorage.getItem(SK.gameStats);
      if (raw) {
        const p = JSON.parse(raw);
        et.score = p.etScore || 0;
        et.correctCount = p.etCorrect || 0;
      }
    } catch (e) {}
  }

  function etSaveStats() {
    try {
      const raw = localStorage.getItem(SK.gameStats);
      const p = raw ? JSON.parse(raw) : {};
      p.etScore = et.score;
      p.etCorrect = et.correctCount;
      localStorage.setItem(SK.gameStats, JSON.stringify(p));
    } catch (e) {}
  }

  function etLog(kind, text) {
    const term = document.getElementById("etTerminal");
    if (!term) return;
    const cls = kind === "ok" ? "et-ln-ok" : kind === "err" ? "et-ln-err" : kind === "warn" ? "et-ln-warn" : kind === "info" ? "et-ln-info" : "et-ln-dim";
    const ln = document.createElement("div");
    ln.className = "et-ln " + cls;
    ln.textContent = text;
    term.appendChild(ln);
    term.scrollTop = term.scrollHeight;
  }

  function etClamp(v) { return Math.max(0, Math.min(100, v)); }

  function etApplyEffects(eff) {
    if (!eff) return;
    et.energy   = etClamp(et.energy + (eff.energy || 0));
    et.hydration = etClamp(et.hydration + (eff.hydration || 0));
    et.warmth   = etClamp(et.warmth + (eff.warmth || 0));
    et.morale   = etClamp(et.morale + (eff.morale || 0));
  }

  function etUpdateStats() {
    const map = [
      ["etEnergyVal", "etEnergyBar", "etStatEnergy", et.energy],
      ["etHydrationVal", "etHydrationBar", "etStatHydration", et.hydration],
      ["etWarmthVal", "etWarmthBar", "etStatWarmth", et.warmth],
      ["etMoraleVal", "etMoraleBar", "etStatMorale", et.morale]
    ];
    map.forEach(function (m) {
      const valEl = document.getElementById(m[0]);
      const barEl = document.getElementById(m[1]);
      const statEl = document.getElementById(m[2]);
      if (valEl) valEl.textContent = Math.round(m[3]);
      if (barEl) barEl.style.width = Math.round(m[3]) + "%";
      if (statEl) statEl.classList.toggle("low", m[3] <= 20);
    });
  }

  function etUpdateScore() {
    const s = document.getElementById("etScore"); if (s) s.textContent = et.score;
    const w = document.getElementById("etWpNum"); if (w) w.textContent = et.wpIndex + "/" + ET_SCENARIOS.length;
    const c = document.getElementById("etCorrect"); if (c) c.textContent = et.correctCount;
  }

  function etUpdateDayStrip() {
    const dayEl = document.getElementById("etDay"); if (dayEl) dayEl.textContent = "Day " + et.day;
    const wxIco = document.getElementById("etWxIco"); if (wxIco) wxIco.textContent = et.weather.ico;
    const wxTxt = document.getElementById("etWxTxt"); if (wxTxt) wxTxt.textContent = et.weather.label + " \u00b7 " + et.weather.temp + "\u00b0C";
    // waypoint progress dots
    const prog = document.getElementById("etWpProgress");
    if (prog) {
      let html = "";
      for (let i = 0; i < ET_WAYPOINTS.length; i++) {
        let cls = "et-wp-dot";
        if (i < et.wpIndex) cls += " done";
        else if (i === et.wpIndex) cls += " current";
        html += '<span class="' + cls + '"></span>';
      }
      prog.innerHTML = html;
    }
  }

  function etUpdatePack() {
    const box = document.getElementById("etPackItems");
    if (!box) return;
    let html = "";
    ET_PACK.forEach(function (item) {
      html += '<span class="et-pack-item"><span class="et-pi-ico">' + item.ico + '</span>' + item.label + '</span>';
    });
    box.innerHTML = html;
  }

  function etTerrainColor(terrain) {
    switch (terrain) {
      case "forest":   return "#2e6b4a";
      case "stream":   return "#4a9db8";
      case "campsite": return "#ffb454";
      case "lake":     return "#4a9db8";
      case "summit":   return "#b8d4c8";
      case "finish":   return "#3ee07f";
      case "ridge":    return "#88b98f";
      case "valley":   return "#4a7a3e";
      default:         return "#6fae5e";
    }
  }

  function etTerrainIcon(terrain) {
    switch (terrain) {
      case "stream":   return "\u2248";
      case "campsite": return "\u26fa";
      case "lake":     return "\u2248";
      case "finish":   return "\ud83c\udfc1";
      case "summit":   return "\u25b3";
      default:         return "";
    }
  }

  function etRenderMap() {
    const svg = document.getElementById("etMap");
    if (!svg) return;
    let html = "";

    // Background terrain zones
    html += '<rect x="0" y="0" width="500" height="300" fill="#0c1410"/>';
    // Forest patches
    html += '<rect x="60" y="140" width="120" height="110" fill="#2e6b4a" opacity="0.25" rx="8"/>';
    html += '<rect x="270" y="120" width="90" height="90" fill="#2e6b4a" opacity="0.22" rx="8"/>';
    // Lake
    html += '<ellipse cx="345" cy="150" rx="30" ry="18" fill="#4a9db8" opacity="0.4"/>';
    // Stream (wavy line)
    html += '<path d="M150 210 Q165 200 175 210 Q185 220 195 205" fill="none" stroke="#4a9db8" stroke-width="3" opacity="0.5"/>';
    // Contour lines (ridge)
    html += '<g fill="none" stroke="rgba(160,128,64,0.18)" stroke-width="1">';
    html += '<path d="M180 120 Q210 100 240 110 Q270 120 290 100"/>';
    html += '<path d="M180 140 Q210 120 240 130 Q270 140 290 120"/>';
    html += '</g>';

    // Trail path (completed + remaining)
    let pathDone = "";
    let pathFull = "";
    for (let i = 0; i < ET_WAYPOINTS.length; i++) {
      const wp = ET_WAYPOINTS[i];
      pathFull += (i === 0 ? "M" : " L") + " " + wp.x + " " + wp.y;
      if (i <= et.wpIndex) pathDone += (i === 0 ? "M" : " L") + " " + wp.x + " " + wp.y;
    }
    // Full trail (dashed, dim)
    html += '<path d="' + pathFull + '" fill="none" stroke="rgba(111,174,94,0.25)" stroke-width="2" stroke-dasharray="5,4"/>';
    // Completed trail (solid, bright)
    if (pathDone) {
      html += '<path d="' + pathDone + '" fill="none" stroke="#9ee07e" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" opacity="0.85"/>';
    }

    // Waypoint markers
    for (let i = 0; i < ET_WAYPOINTS.length; i++) {
      const wp = ET_WAYPOINTS[i];
      const done = i < et.wpIndex;
      const current = i === et.wpIndex && et.active;
      const r = current ? 11 : 8;
      const fill = done ? "#3ee07f" : current ? "#ffb454" : etTerrainColor(wp.terrain);
      const opacity = done ? 0.9 : current ? 0.95 : 0.5;

      if (current) {
        html += '<circle cx="' + wp.x + '" cy="' + wp.y + '" r="14" fill="none" stroke="#ffd66b" stroke-width="2" opacity="0.5">' +
          '<animate attributeName="r" values="14;20;14" dur="1.5s" repeatCount="indefinite"/>' +
          '<animate attributeName="opacity" values="0.5;0;0.5" dur="1.5s" repeatCount="indefinite"/></circle>';
      }
      html += '<circle cx="' + wp.x + '" cy="' + wp.y + '" r="' + r + '" fill="' + fill + '" opacity="' + opacity + '"' + (current ? ' stroke="#ffd66b" stroke-width="2"' : '') + '/>';
      const ic = etTerrainIcon(wp.terrain);
      if (ic) {
        html += '<text x="' + wp.x + '" y="' + (wp.y + 3) + '" fill="#0a100c" font-size="9" text-anchor="middle" font-weight="bold">' + ic + '</text>';
      }
      // Label
      html += '<text x="' + wp.x + '" y="' + (wp.y - 16) + '" fill="' + (current ? "#ffd66b" : done ? "#9ee07e" : "rgba(176,201,168,0.5)") + '" font-size="8" text-anchor="middle" font-family="monospace">' + wp.label + '</text>';
    }

    svg.innerHTML = html;
  }

  function etRenderScenario() {
    const scn = ET_SCENARIOS[et.wpIndex];
    if (!scn) return;
    const tagEl = document.getElementById("etScnTag"); if (tagEl) tagEl.textContent = scn.tag;
    const icoEl = document.getElementById("etScnIcon"); if (icoEl) icoEl.textContent = scn.icon;
    const titleEl = document.getElementById("etScnTitle"); if (titleEl) titleEl.textContent = scn.title;
    const descEl = document.getElementById("etScnDesc"); if (descEl) descEl.innerHTML = scn.desc;

    const list = document.getElementById("etChoiceList");
    if (!list) return;
    let html = "";
    scn.choices.forEach(function (ch, idx) {
      html += '<button class="et-choice" type="button" data-idx="' + idx + '">';
      html += '<span class="et-choice-ico">' + ch.ico + '</span>';
      html += '<span class="et-choice-body"><span class="et-choice-txt">' + ch.txt + '</span><span class="et-choice-hint"></span></span>';
      html += '</button>';
    });
    list.innerHTML = html;

    // Bind choice clicks
    list.querySelectorAll(".et-choice").forEach(function (btn) {
      btn.addEventListener("click", function () { etHandleChoice(parseInt(btn.dataset.idx, 10)); });
    });

    et.answered = false;
  }

  function etHandleChoice(idx) {
    if (!et.active || et.answered) return;
    const scn = ET_SCENARIOS[et.wpIndex];
    if (!scn || !scn.choices[idx]) return;
    const ch = scn.choices[idx];
    et.answered = true;

    // Disable all choices, reveal hints
    const list = document.getElementById("etChoiceList");
    if (list) {
      list.querySelectorAll(".et-choice").forEach(function (btn) {
        btn.disabled = true;
        btn.classList.add("outcome-shown");
        const ci = parseInt(btn.dataset.idx, 10);
        const choice = scn.choices[ci];
        if (choice) {
          if (choice.correct === 1) btn.classList.add("correct");
          else if (choice.correct === 0) btn.classList.add("wrong");
          const hintEl = btn.querySelector(".et-choice-hint");
          if (hintEl) hintEl.textContent = choice.hint;
        }
      });
    }

    // Apply effects + points
    etApplyEffects(ch.effects);
    et.score += ch.points;

    if (ch.correct === 1) {
      et.correctCount++;
      etLog("ok", "\u2713 " + scn.tag + " \u2014 correct decision. " + ch.hint + " +" + ch.points + " pts.");
      toast("ok", "\u2713 Correct! +" + ch.points + " points");
    } else if (ch.correct === 2) {
      etLog("warn", "\u25b8 " + scn.tag + " \u2014 acceptable, not ideal. " + ch.hint + " +" + ch.points + " pts.");
      toast("warn", "\u25b8 Acceptable choice. +" + ch.points + " points");
    } else {
      etLog("err", "\u2717 " + scn.tag + " \u2014 poor decision. " + ch.hint + " " + ch.points + " pts.");
      toast("err", "\u2717 Wrong choice. " + ch.points + " points");
    }

    // Award XP to overall state
    const xpGain = ch.correct === 1 ? 8 : ch.correct === 2 ? 4 : 0;
    if (xpGain > 0) {
      state.xp += xpGain;
      saveState();
      renderSidebar();
      renderTopStats();
    }

    etUpdateStats();
    etUpdateScore();
    etSaveStats();

    // Check for stat-critical (any stat at 0)
    const minStat = Math.min(et.energy, et.hydration, et.warmth, et.morale);
    if (minStat <= 0) {
      et.score = Math.max(0, et.score - 10);
      etLog("err", "\u26a0 A survival stat hit zero! Emergency stop \u2014 \u221210 pts. Rest and recover before the next waypoint.");
      // partial recovery
      et.energy = etClamp(et.energy + 15);
      et.hydration = etClamp(et.hydration + 15);
      et.warmth = etClamp(et.warmth + 15);
      et.morale = etClamp(et.morale + 10);
      etUpdateStats();
      etUpdateScore();
      etSaveStats();
    }

    // Status feedback
    const fb = document.getElementById("etStatusTxt");
    if (fb) fb.textContent = "Decision logged. Review the outcome, then continue to the next waypoint.";

    // Show advance button
    etShowAdvance();
  }

  function etShowAdvance() {
    const list = document.getElementById("etChoiceList");
    if (!list) return;
    // Remove any existing advance button
    const old = document.getElementById("etAdvanceBtn");
    if (old) old.remove();

    const isLast = et.wpIndex >= ET_SCENARIOS.length - 1;
    const btn = document.createElement("button");
    btn.id = "etAdvanceBtn";
    btn.className = "btn btn-primary";
    btn.type = "button";
    btn.textContent = isLast ? "\u2713 Complete Expedition" : "\u25b8 Advance to Next Waypoint \u2192";
    btn.addEventListener("click", etAdvanceWaypoint);
    list.appendChild(btn);
  }

  function etAdvanceWaypoint() {
    // Apply weather drain for the leg just travelled
    const d = et.weather.drain;
    et.energy = etClamp(et.energy - d.energy);
    et.hydration = etClamp(et.hydration - d.hydration);
    et.warmth = etClamp(et.warmth - d.warmth);
    et.morale = etClamp(et.morale - d.morale);

    et.wpIndex++;

    // Check day transitions (waypoints 5 and 8 roughly = day boundaries)
    // Waypoint indices: 0-3 = Day 1, 4-6 = Day 2, 7-8 = Day 3
    const newDay = et.wpIndex < 4 ? 1 : et.wpIndex < 7 ? 2 : 3;
    if (newDay > et.day) {
      et.day = newDay;
      // New weather for the new day
      et.weather = ET_WEATHER[(et.day - 1) % ET_WEATHER.length];
      etLog("info", "\u2500\u2500 Day " + et.day + " begins. Weather: " + et.weather.label + " \u00b7 " + et.weather.temp + "\u00b0C \u2500\u2500");
      // Day completion bonus if all stats safe
      const minStat = Math.min(et.energy, et.hydration, et.warmth, et.morale);
      if (minStat > 0) {
        et.score += 15;
        et.completedDays++;
        etLog("ok", "\u2713 Day survived with all stats safe. +15 bonus.");
        // Overnight partial recovery
        et.energy = etClamp(et.energy + 10);
        et.morale = etClamp(et.morale + 8);
      }
    }

    if (et.wpIndex >= ET_SCENARIOS.length) {
      etFinishExpedition();
      return;
    }

    etUpdateStats();
    etUpdateScore();
    etUpdateDayStrip();
    etRenderMap();
    etRenderScenario();

    const fb = document.getElementById("etStatusTxt");
    if (fb) {
      const scn = ET_SCENARIOS[et.wpIndex];
      fb.textContent = "Waypoint " + (et.wpIndex + 1) + " — " + (scn ? scn.tag : "") + ". Read the conditions and choose your action.";
    }
    etLog("info", "\u25b8 Reached " + ET_WAYPOINTS[et.wpIndex].label + " (Waypoint " + (et.wpIndex + 1) + ").");
  }

  function etFinishExpedition() {
    et.finished = true;
    et.active = false;
    // Completion bonus
    const completionBonus = 60;
    et.score += completionBonus;
    // Final stat condition bonus
    const safeStats = [et.energy, et.hydration, et.warmth, et.morale].filter(function (v) { return v > 0; }).length;
    const statBonus = safeStats * 10;
    et.score += statBonus;

    etLog("ok", "\u2713\u2713 EXPEDITION COMPLETE! Reached the end of the trail.");
    etLog("ok", "Completion bonus: +" + completionBonus + " pts. Stat survival bonus: +" + statBonus + " pts (" + safeStats + "/4 stats safe).");
    toast("ok", "\ud83c\udfc1 Expedition complete! +" + (completionBonus + statBonus) + " bonus points");

    // Award XP
    state.xp += 30;
    saveState();
    renderSidebar();
    renderTopStats();

    etUpdateScore();
    etUpdateDayStrip();
    etRenderMap();
    etSaveStats();

    // Show completion banner in scenario box
    const box = document.getElementById("etScenarioBox");
    if (box) {
      box.innerHTML =
        '<div class="et-complete-banner">' +
        '<h3>\ud83c\udfc1 Expedition Complete!</h3>' +
        '<p>You reached the end of the three-day backcountry trail. Final score: <strong style="color:var(--amber)">' + et.score + '</strong> \u2014 ' + et.correctCount + '/' + ET_SCENARIOS.length + ' correct decisions.</p>' +
        '<p style="font-size:12px;color:var(--ink-3);">Survival stats \u2014 Energy: ' + Math.round(et.energy) + ' \u00b7 Hydration: ' + Math.round(et.hydration) + ' \u00b7 Warmth: ' + Math.round(et.warmth) + ' \u00b7 Morale: ' + Math.round(et.morale) + '</p>' +
        '<button class="btn btn-primary" id="etRestartBtn" type="button">\u21bb New Expedition</button>' +
        '</div>';
      const rb = document.getElementById("etRestartBtn");
      if (rb) rb.addEventListener("click", etStartExpedition);
    }

    const fb = document.getElementById("etStatusTxt");
    if (fb) fb.textContent = "Expedition complete! Final score: " + et.score + ". Press New Expedition to play again.";
    const startBtn = document.getElementById("etStartBtn");
    if (startBtn) startBtn.textContent = "\u21bb New Expedition";
  }

  function etStartExpedition() {
    et.active = true;
    et.wpIndex = 0;
    et.day = 1;
    et.weather = ET_WEATHER[0];
    et.score = 0;
    et.correctCount = 0;
    et.completedDays = 0;
    et.energy = 80;
    et.hydration = 80;
    et.warmth = 75;
    et.morale = 70;
    et.answered = false;
    et.finished = false;

    // Clear terminal
    const term = document.getElementById("etTerminal");
    if (term) term.innerHTML = "";

    etLog("info", "\u2500\u2500 EXPEDITION TRAIL DEPLOYED \u2014 Day 1 \u2500\u2500");
    etLog("dim", "  Weather: " + et.weather.label + " \u00b7 " + et.weather.temp + "\u00b0C. Nine waypoints ahead. Manage your survival stats.");

    etUpdateStats();
    etUpdateScore();
    etUpdateDayStrip();
    etUpdatePack();
    etRenderMap();
    etRenderScenario();

    const fb = document.getElementById("etStatusTxt");
    if (fb) fb.textContent = "Waypoint 1 \u2014 " + ET_SCENARIOS[0].tag + ". Read the conditions and choose your action.";
    const startBtn = document.getElementById("etStartBtn");
    if (startBtn) startBtn.textContent = "\u21bb Restart Expedition";
  }

  function etShowModal() { const o = document.getElementById("etModalOverlay"); if (o) o.style.display = "flex"; }
  function etHideModal() { const o = document.getElementById("etModalOverlay"); if (o) o.style.display = "none"; }

  function etInit() {
    if (et.etInitDone) return;
    et.etInitDone = true;
    etLoadStats();
    etUpdateScore();

    const startBtn = document.getElementById("etStartBtn");
    if (startBtn) startBtn.addEventListener("click", etStartExpedition);
    const howBtn = document.getElementById("etHowBtn");
    if (howBtn) howBtn.addEventListener("click", etShowModal);
    const modalClose = document.getElementById("etModalClose");
    if (modalClose) modalClose.addEventListener("click", etHideModal);
    const ov = document.getElementById("etModalOverlay");
    if (ov) ov.addEventListener("click", function (e) { if (e.target === ov) etHideModal(); });
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
    if (name === "expedition") etInit();
    if (name === "range") fcInit();
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

  /* ── i18n: translate data arrays in-place ── */
  if (typeof trMutate === "function") {
    try { trMutate(ET_PACK); } catch(e) {}
    try { trMutate(ET_SCENARIOS); } catch(e) {}
    try { trMutate(ET_WAYPOINTS); } catch(e) {}
    try { trMutate(ET_WEATHER); } catch(e) {}
    try { trMutate(FC); } catch(e) {}
    try { trMutate(FC_CALLSIGNS); } catch(e) {}
    try { trMutate(FC_DIRS); } catch(e) {}
    try { trMutate(FC_MAP); } catch(e) {}
    try { trMutate(FC_SIGNALS); } catch(e) {}
    try { trMutate(FC_TECH); } catch(e) {}
    try { trMutate(FIELD_BADGE_IDS); } catch(e) {}
    try { trMutate(LEARN_ARTICLES); } catch(e) {}
    try { trMutate(MISSIONS); } catch(e) {}
    try { trMutate(RANKS); } catch(e) {}
    try { trMutate(SK); } catch(e) {}
    try { trMutate(TOOLS); } catch(e) {}
    try { trMutate(coverSpots); } catch(e) {}
    try { trMutate(options); } catch(e) {}
    try { trMutate(safeStats); } catch(e) {}
    try { trMutate(sliderValue); } catch(e) {}
    try { trMutate(statusMap); } catch(e) {}
    try { trMutate(toggleState); } catch(e) {}
    try { trMutate(treeClusters); } catch(e) {}
  }



  // ==========================================================
  // INIT
  // ==========================================================
  function init() {
    document.querySelectorAll(".nav-btn").forEach(b => {
      b.addEventListener("click", () => switchSection(b.dataset.section));
    });

    const mb = document.getElementById("mobileMenuBtn");
    if (mb) mb.addEventListener("click", () => document.getElementById("sidebar").classList.toggle("open"));

    const fsb = document.getElementById("fileSitrepBtn");
    if (fsb) fsb.addEventListener("click", fileSitrep);

    const params = new URLSearchParams(window.location.search);
    const deepMission = params.get("mission");

    refreshBadges();
    renderSidebar();
    renderTopStats();
    renderCommand();
    renderTraining();
    renderMissionSelector();
    renderAnalysis();
    renderRanks();
    renderSitrep();
    renderLearn();
    fcInit();
    etInit();

    if (deepMission) {
      const m = MISSIONS.find(x => x.id === deepMission);
      if (m) setTimeout(() => openMission(m.id), 200);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
