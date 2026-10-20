/* ============================================================
   EXPEDITION TRAINING — expedition_training.js
   Operation Wildtrail: Outdoor Expedition dashboard engine
   IIFE architecture matching the Maple Defender pattern.
   ============================================================ */
(function () {
  "use strict";

  // ==========================================================
  // STORAGE KEYS
  // ==========================================================
  const SK = {
    progress: "expeditionTrainingProgress",
    sitreps: "expeditionTrainingSitreps",
    wrongAttempts: "expeditionTrainingWrongAttempts",
    streak: "expeditionTrainingStreak",
    bestStreak: "expeditionTrainingBestStreak",
    readArticles: "expeditionTrainingReadArticles"
  };
  const MAP_PROGRESS_KEY = "cadetMapDemoCompleted";
  const EXPEDITION_BADGE_ID = 10;

  // ==========================================================
  // RANKS — Expedition trail hierarchy
  // ==========================================================
  const RANKS = [
    { id: 0, name: "Trail Novice", icon: "🎒", xp: 0, callsign: "ROOKIE-1" },
    { id: 1, name: "Trail Cadet", icon: "🥾", xp: 300, callsign: "TREKKER-1" },
    { id: 2, name: "Field Explorer", icon: "🗺️", xp: 700, callsign: "PATHFINDER-1" },
    { id: 3, name: "Wilderness Scout", icon: "🧭", xp: 1200, callsign: "SCOUT-1" },
    { id: 4, name: "Backcountry Ranger", icon: "⛰️", xp: 1800, callsign: "RANGER-1" },
    { id: 5, name: "Expedition Leader", icon: "🏔️", xp: 2500, callsign: "LEAD-1" }
  ];

  // ==========================================================
  // TOOLS — Outdoor field gear & reference guides
  // ==========================================================
  const TOOLS = [
    { id: "gearlist", icon: "🎒", label: "Gear Checklist" },
    { id: "forecast", icon: "🌦️", label: "Weather Forecast" },
    { id: "campsite", icon: "⛺", label: "Campsite Assessor" },
    { id: "compass", icon: "🧭", label: "Compass & Bearing" },
    { id: "topomap", icon: "🗺️", label: "Topographic Map" },
    { id: "firesafe", icon: "🔥", label: "Fire Safety Manual" },
    { id: "firstaid", icon: "🩹", label: "First-Aid Kit" },
    { id: "knots", icon: "🪢", label: "Knot Guide" },
    { id: "waterpurify", icon: "💧", label: "Water Purification" },
    { id: "lntguide", icon: "♻️", label: "Leave-No-Trace Guide" },
    { id: "wildlife", icon: "🐻", label: "Wildlife Field Guide" },
    { id: "shelter", icon: "🏚️", label: "Shelter Builder" },
    { id: "traillog", icon: "📝", label: "Trail Logbook" }
  ];

  // ==========================================================
  // MISSIONS — 11 wilderness expedition training modules
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
  ];

  // ==========================================================
  // ARENA QUESTIONS — Expedition Fundamentals Confirmation
  // Drawn from all 11 training modules (EXP-101 through EXP-111)
  // ==========================================================
  const ARENA_QUESTIONS = [
    // EXP-101: Expedition Kit Packing
    { eo: "EXP-101", q: "Which of the following is one of the six essential items every trekker must carry?", options: ["A paperback novel", "Extra food", "A folding chair", "A portable speaker"], correct: 1 },
    { eo: "EXP-101", q: "When packing a rucksack for an expedition, what principle should you follow for clothing?", options: ["Pack everything loose at the top", "Use the layering principle and keep items dry in plastic bags", "Roll all clothing into one large ball", "Only pack one outfit regardless of weather"], correct: 1 },
    { eo: "EXP-101", q: "What should always be part of your kit list regardless of the trek?", options: ["Raingear and a first aid kit", "A camp stove and fuel", "A hammock", "A change of boots"], correct: 0 },
    { eo: "EXP-101", q: "Which item belongs on the permanent kit list (always kept in your pack)?", options: ["A swimsuit", "Insect repellent and lip balm", "A sleeping pad", "A tent"], correct: 1 },

    // EXP-102: Weather Reading & Conditions
    { eo: "EXP-102", q: "What does a falling barometer (dropping air pressure) typically indicate?", options: ["Improving weather and clear skies", "Incoming storm or deteriorating weather", "No change in conditions", "Strong winds only at altitude"], correct: 1 },
    { eo: "EXP-102", q: "Which cloud type is tall, puffy, and can signal thunderstorms later in the day?", options: ["Stratus — flat grey layers", "Cirrus — thin wispy feathers", "Cumulus — towering cotton-like heaps", "Fog — ground-level cloud"], correct: 2 },
    { eo: "EXP-102", q: "When the forecast calls for heavy rain on your expedition, what is the correct leadership response?", options: ["Ignore it — the forecast is just a guess", "Add an early escape route, pack waterproofs on top, and brief the section on the wet-weather plan", "Cancel the entire expedition immediately", "Continue as planned and deal with it when it happens"], correct: 1 },
    { eo: "EXP-102", q: "What is the last-minute checklist item you should do before departing on a trek?", options: ["Buy new gear at the trailhead", "Check the weather forecast and trail conditions, then tell a reliable friend your itinerary", "Skip breakfast to save time", "Leave your map behind to save weight"], correct: 1 },

    // EXP-103: Campsite Selection & Assessment
    { eo: "EXP-103", q: "What are 'widowmakers' and why must you check for them when selecting a bivouac site?", options: ["Poisonous plants at ground level", "Dead limbs or trees overhead that can fall on tents in wind", "Small animals that steal food", "Roots that trip you at night"], correct: 1 },
    { eo: "EXP-103", q: "How far should a bivouac site be from the nearest water source?", options: ["Right on the water's edge for easy access", "About 60 metres from water", "At least 500 metres from water", "Distance does not matter"], correct: 1 },
    { eo: "EXP-103", q: "Why should you avoid setting up camp in a low-lying depression or valley floor?", options: ["It is too exposed to wind", "Cold air pools there at night and water drains into the site", "There are too many trees", "It is too close to the trail"], correct: 1 },
    { eo: "EXP-103", q: "What is the minimum recommended spacing between individual shelters in a bivouac layout?", options: ["0.5 metres", "2 metres", "10 metres", "50 metres"], correct: 1 },

    // EXP-104: Emergency Shelter Building
    { eo: "EXP-104", q: "When constructing a hoochie shelter, how far apart should the two anchor trees be?", options: ["About 0.5 metres", "Approximately 2 metres (6 feet)", "At least 10 metres", "Tree spacing does not matter"], correct: 1 },
    { eo: "EXP-104", q: "At what height should you tie the ridge line of a hoochie shelter to the trees?", options: ["Ground level", "Waist height", "Above your head", "Knee height"], correct: 1 },
    { eo: "EXP-104", q: "What knot is recommended for tying the hoochie groundsheet to the anchor trees?", options: ["Bowline", "Clove hitch or overhand knot", "Fisherman's knot", "Figure-of-eight on a bight"], correct: 1 },
    { eo: "EXP-104", q: "When pegging the grommets of a hoochie shelter, how far above the ground should they be?", options: ["Flush with the ground", "About 5 cm above ground for rain run-off", "30 cm above ground", "1 metre above ground"], correct: 1 },
    { eo: "EXP-104", q: "What should you do during shelter teardown to leave no trace?", options: ["Leave the twine for the next group", "Cut the twine, pull pegs, unzip groundsheets, and return the ground to its original state", "Burn the shelter on site", "Bury the groundsheet pieces"], correct: 1 },

    // EXP-105: Fire Lighting & Safety
    { eo: "EXP-105", q: "What are the three elements of the fire triangle?", options: ["Wood, matches, and wind", "Heat, fuel, and oxygen", "Spark, kindling, and patience", "Flame, ash, and smoke"], correct: 1 },
    { eo: "EXP-105", q: "How should you fully extinguish a fire before leaving camp?", options: ["Let it burn out on its own", "Douse with water, stir the ashes, and feel for heat — repeat until cold to the touch", "Cover it with leaves and walk away", "Throw dirt on it once"], correct: 1 },
    { eo: "EXP-105", q: "What should you clear before building a fire on the ground?", options: ["Nothing — fire is fine on any surface", "A 2-metre radius of leaf litter, grass, and flammable material down to bare soil", "Only the exact spot where the fire will be", "The entire campsite"], correct: 1 },
    { eo: "EXP-105", q: "In what order should you build a fire?", options: ["Large logs first, then kindling, then tinder", "Tinder first, then kindling, then gradually larger fuel", "All at once in a pile", "Fuel first, then ignite with a flare"], correct: 1 },

    // EXP-106: Water Sourcing & Purification
    { eo: "EXP-106", q: "Which type of water source is generally the safest to collect from in the wilderness?", options: ["A stagnant pond", "A fast-flowing stream above any human or animal activity", "A puddle near the trail", "Water collected from a swamp"], correct: 1 },
    { eo: "EXP-106", q: "What should you do before purifying water from a natural source?", options: ["Nothing — purification handles everything", "Pre-filter to remove sediment and visible particles", "Add flavour drops first", "Boil it twice before filtering"], correct: 1 },
    { eo: "EXP-106", q: "Which of these is a reliable method of water purification?", options: ["Shaking the bottle vigorously", "Boiling for at least one minute (longer at altitude)", "Leaving it in the sun for 10 minutes", "Filtering through a cotton shirt only"], correct: 1 },
    { eo: "EXP-106", q: "How far from a water source should waste water (e.g., from washing) be disposed of?", options: ["Directly into the stream", "At least 60 metres from the water source", "10 metres from the water", "Distance does not matter if you use biodegradable soap"], correct: 1 },

    // EXP-107: Essential Knots & Rope Work
    { eo: "EXP-107", q: "What is the bowline knot primarily used for?", options: ["Joining two ropes of different thickness", "Forming a secure loop that does not slip under load", "Tying a rope to a tent peg", "Securing a load to a pack frame"], correct: 1 },
    { eo: "EXP-107", q: "Which knot is used to join two ropes of similar diameter end-to-end?", options: ["Clove hitch", "Fisherman's knot", "Sheepshank", "Timber hitch"], correct: 1 },
    { eo: "EXP-107", q: "What is a double fisherman's knot used for?", options: ["Creating a loop in the middle of a rope", "Joining two ropes securely, especially for climbing or prusik loops", "Tying down a tarp", "Anchoring to a tree"], correct: 1 },
    { eo: "EXP-107", q: "Which knot is commonly used to start a lashing (e.g., square or sheer lashing)?", options: ["Bowline", "Clove hitch", "Figure-of-eight", "Fisherman's knot"], correct: 1 },
    { eo: "EXP-107", q: "What is a sheer lashing (round lashing) used for?", options: ["Tying a tent guyline", "Joining two spars side-by-side to make an A-frame or extend a spar", "Creating a rescue loop", "Securing a boat to a dock"], correct: 1 },

    // EXP-108: Trail Navigation & Compass Bearing
    { eo: "EXP-108", q: "What is a six-figure grid reference used for on a topographic map?", options: ["Measuring elevation", "Pinpointing a location to within 100 metres on the map", "Calculating magnetic declination", "Determining slope angle"], correct: 1 },
    { eo: "EXP-108", q: "How do you orient a map by inspection (without a compass)?", options: ["Fold it so north is at the top", "Align features on the map with the corresponding visible terrain features around you", "Hold it flat and spin randomly", "Place it face-down on the ground"], correct: 1 },
    { eo: "EXP-108", q: "What does the marginal information on a topographic map include?", options: ["Only the map title", "Scale, legend (conventional signs), grid numbers, declination diagram, and edition date", "Only the contour interval", "Only the publisher's address"], correct: 1 },
    { eo: "EXP-108", q: "How can you estimate distance along a route on foot?", options: ["Guess based on time alone", "Count your paces (pace counting) and use the map scale to convert", "Only use GPS", "Walk for exactly one hour and assume 5 km"], correct: 1 },
    { eo: "EXP-108", q: "What should you do to maintain a map in the field?", options: ["Fold it to show only the relevant section and keep it in a waterproof map case", "Roll it tightly and hang it from your pack", "Never fold it — keep it fully open", "Write notes directly on it in pen"], correct: 0 },

    // EXP-109: Leave-No-Trace Ethics
    { eo: "EXP-109", q: "What is a core principle of Leave No Trace camping?", options: ["Bury all food scraps near camp", "Pack out everything you pack in — leave the site as you found it or better", "Build permanent fire rings for future groups", "Leave broken gear for others to use"], correct: 1 },
    { eo: "EXP-109", q: "How deep should a cathole (cat hole) for human waste be dug?", options: ["5 cm", "16–20 cm deep, at least 60 m from water", "1 metre deep", "Surface is fine if covered with rocks"], correct: 1 },
    { eo: "EXP-109", q: "When washing in the field, where should you dispose of waste water?", options: ["Directly into the nearest stream", "In a dug hole at least 60 m from any water source", "On the trail", "In the fire pit"], correct: 1 },
    { eo: "EXP-109", q: "What is the recommended approach to a campfire in a Leave No Trace context?", options: ["Build the largest fire possible for warmth", "Use existing fire rings, keep fires small, and fully extinguish them", "Always build a new fire ring", "Fires are always fine if there are trees nearby"], correct: 1 },

    // EXP-110: Wildlife Safety & Bear Encounters
    { eo: "EXP-110", q: "How should you store food at a bivouac site to avoid attracting wildlife?", options: ["In your tent with you", "In a food hang suspended at least 4 metres up and 1 metre from the trunk", "On the ground near the fire pit", "In an open container at the camp entrance"], correct: 1 },
    { eo: "EXP-110", q: "If you encounter a bear at a distance, what should you do?", options: ["Run as fast as you can", "Stay calm, back away slowly while facing the bear, and speak in a calm voice", "Approach to take a photo", "Yell loudly and throw rocks"], correct: 1 },
    { eo: "EXP-110", q: "What should you check for when selecting a bivouac site to avoid animal hazards?", options: ["Animal trails, dens, and watering holes — avoid camping on or near them", "The presence of birds — birds mean no predators", "Fresh grass — animals avoid it", "Nothing — animals never come near camps"], correct: 0 },
    { eo: "EXP-110", q: "Which of these should you avoid at a bivouac site?", options: ["Beehives and hornets' nests", "Fallen trees and dead trees", "Ant hills", "All of the above"], correct: 3 },

    // EXP-111: Emergency Response & First Aid
    { eo: "EXP-111", q: "What is the first thing you should do in any field emergency?", options: ["Panic and run", "Stay calm and assess the scene for danger before approaching", "Immediately move the casualty", "Call out loudly for help repeatedly"], correct: 1 },
    { eo: "EXP-111", q: "What does a survival kit typically include for signalling in an emergency?", options: ["A brightly coloured scarf only", "A signalling device such as a whistle or mirror, plus waterproof matches and a flashlight", "A smartphone with games", "A flare gun only"], correct: 1 },
    { eo: "EXP-111", q: "When should injuries be treated in the field?", options: ["When you get back to base", "Immediately — do not delay treatment", "Only if they look serious", "At the next rest stop"], correct: 1 },
    { eo: "EXP-111", q: "What should be established at every bivouac site for safety?", options: ["A first aid point and a fire point", "Only a mess area", "A volleyball court", "A designated sleeping area only"], correct: 0 }
  ];

  // ==========================================================
  // EXPEDITION BADGES (auto-generated from MISSIONS)
  // ==========================================================
  const EXPEDITION_BADGES = MISSIONS.map(m => ({
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
      currentMissionTask: {},
      arenaBadgeEarned: false
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
      if (allDone && !mapProgress.includes(EXPEDITION_BADGE_ID)) {
        mapProgress.push(EXPEDITION_BADGE_ID);
        localStorage.setItem(MAP_PROGRESS_KEY, JSON.stringify(mapProgress));
      } else if (!allDone && mapProgress.includes(EXPEDITION_BADGE_ID)) {
        mapProgress = mapProgress.filter(id => id !== EXPEDITION_BADGE_ID);
        localStorage.setItem(MAP_PROGRESS_KEY, JSON.stringify(mapProgress));
      }
    } catch (e) {}
  }

  // ==========================================================
  // SCENE SVG GENERATORS — Wilderness themes
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
    EXPEDITION_BADGES.forEach(b => {
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
    document.getElementById("cmdBadgeTotal").textContent = "of " + EXPEDITION_BADGES.length;

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
      const badge = EXPEDITION_BADGES.find(b => b.mission === m.id);
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
    const badge = EXPEDITION_BADGES.find(b => b.mission === m.id);
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
  // EXPEDITION ARENA — Confirmation Game Engine
  // ==========================================================
  const ta = {
    active: false,
    examMode: false,
    pool: [],
    poolIndex: 0,
    currentQ: null,
    score: 0,
    correct: 0,
    wrong: 0,
    streak: 0,
    bestStreak: 0,
    round: 0,
    totalRounds: 10,
    answered: false
  };

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
    return arr;
  }

  function taRenderStartScreen() {
    const stage = document.getElementById("arenaStage");
    if (!stage) return;
    stage.innerHTML =
      '<div class="arena-idle">' +
        '<div class="arena-idle-ico">🏕️</div>' +
        '<h2>Expedition Fundamentals Arena</h2>' +
        '<p class="muted" style="font-size:13px; line-height:1.6; max-width:480px; margin:0 auto;">Test your mastery of all eleven outdoor expedition training modules. The Arena presents randomized questions drawn from every module — kit packing, weather reading, campsite selection, shelter building, fire safety, water purification, knots, navigation, leave-no-trace, wildlife safety, and emergency response. Answer correctly to build your streak and confirm your fundamentals.</p>' +
        '<div class="arena-mode-buttons" style="margin-top:20px;">' +
          '<button class="btn btn-primary" id="taStartBtn" type="button">🎮 Start 10-Question Round</button>' +
          '<button class="btn btn-ghost" id="taExamBtn" type="button" style="margin-left:10px;">📋 Exam Mode (8 to pass)</button>' +
        '</div>' +
        (state.arenaBadgeEarned ?
          '<p class="muted" style="margin-top:14px; font-size:12px;">✅ Expedition Arena badge earned! Keep practising to improve your streak.</p>' :
          '<p class="muted" style="margin-top:14px; font-size:12px;">Complete a 10-question round with 8+ correct to earn the Expedition Arena badge.</p>') +
      '</div>';
    taUpdateSide();

    const startBtn = document.getElementById("taStartBtn");
    const examBtn = document.getElementById("taExamBtn");
    if (startBtn) startBtn.addEventListener("click", function () { taStartRound(false); });
    if (examBtn) examBtn.addEventListener("click", function () { taStartRound(true); });
  }

  function taStartRound(examMode) {
    ta.active = true;
    ta.examMode = !!examMode;
    ta.pool = shuffleArray(ARENA_QUESTIONS.slice());
    ta.poolIndex = 0;
    ta.score = 0;
    ta.correct = 0;
    ta.wrong = 0;
    ta.streak = 0;
    ta.round = 0;
    ta.totalRounds = 10;
    ta.answered = false;
    taRenderQuestion();
  }

  function taRenderQuestion() {
    const stage = document.getElementById("arenaStage");
    if (!stage) return;
    if (ta.poolIndex >= ta.pool.length || ta.round >= ta.totalRounds) {
      taFinishRound();
      return;
    }
    ta.currentQ = ta.pool[ta.poolIndex];
    ta.answered = false;
    const q = ta.currentQ;
    const progressPct = Math.round((ta.round / ta.totalRounds) * 100);

    stage.innerHTML =
      '<div class="arena-active">' +
        '<div class="arena-progress-bar"><div class="arena-progress-fill" style="width:' + progressPct + '%"></div></div>' +
        '<div class="arena-q-meta">' +
          '<span class="arena-eo-tag">' + escapeHTML(q.eo) + "</span>" +
          '<span class="arena-round">Question ' + (ta.round + 1) + " of " + ta.totalRounds + "</span>" +
        "</div>" +
        '<div class="arena-prompt">' + escapeHTML(q.q) + "</div>" +
        '<div class="arena-choices" id="arenaChoices">' +
          q.options.map(function (opt, i) {
            return '<button class="arena-choice" data-idx="' + i + '" type="button"><span class="ac-letter">' + String.fromCharCode(65 + i) + "</span><span>" + escapeHTML(opt) + "</span></button>";
          }).join("") +
        "</div>" +
        '<div class="arena-feedback" id="arenaFeedback"></div>' +
      "</div>";

    taUpdateSide();

    document.querySelectorAll("#arenaChoices .arena-choice").forEach(function (btn) {
      btn.addEventListener("click", function () { taAnswerQuestion(parseInt(btn.dataset.idx, 10)); });
    });
  }

  function taAnswerQuestion(idx) {
    if (ta.answered) return;
    ta.answered = true;
    const q = ta.currentQ;
    const isCorrect = idx === q.correct;
    const fb = document.getElementById("arenaFeedback");
    ta.round++;

    // Highlight choices
    document.querySelectorAll("#arenaChoices .arena-choice").forEach(function (btn) {
      const i = parseInt(btn.dataset.idx, 10);
      btn.disabled = true;
      if (i === q.correct) {
        btn.classList.add("correct");
      } else if (i === idx && !isCorrect) {
        btn.classList.add("wrong");
      }
    });

    if (isCorrect) {
      ta.correct++;
      ta.streak++;
      if (ta.streak > ta.bestStreak) ta.bestStreak = ta.streak;
      ta.score += 10 + (ta.streak > 1 ? ta.streak * 2 : 0);
      if (fb) { fb.className = "arena-feedback ok"; fb.innerHTML = "✅ Correct! " + escapeHTML(q.options[q.correct]) + (ta.streak > 1 ? ' — 🔥 ' + ta.streak + " streak!" : ""); }
    } else {
      ta.wrong++;
      ta.streak = 0;
      if (fb) { fb.className = "arena-feedback err"; fb.innerHTML = "❌ Incorrect. The correct answer is: <strong>" + escapeHTML(q.options[q.correct]) + "</strong>"; }
    }

    // Record attempt in global stats
    state.totalAttempts++;
    if (!isCorrect) {
      state.wrongAttempts++;
      state.streak = 0;
    } else {
      state.streak++;
      if (state.streak > state.bestStreak) state.bestStreak = state.streak;
    }
    saveState();

    taUpdateSide();
    updateAnalysis();

    // Next question after delay
    setTimeout(function () {
      ta.poolIndex++;
      taRenderQuestion();
    }, 1800);
  }

  function taFinishRound() {
    ta.active = false;
    const stage = document.getElementById("arenaStage");
    if (!stage) return;
    const total = ta.correct + ta.wrong;
    const pct = total > 0 ? Math.round((ta.correct / total) * 100) : 0;
    const passed = ta.correct >= 8;

    // Award badge and XP if passed
    if (passed && !state.arenaBadgeEarned) {
      state.arenaBadgeEarned = true;
      state.xp += 100;
      saveState();
      refreshBadges();
      renderSidebar();
      renderTopStats();
      renderCommand();
      renderAnalysis();
      renderRanks();
    }

    let msg = "";
    let badgeText = "";
    if (ta.examMode) {
      if (passed) {
        msg = "QUALIFIED! You passed the Expedition Fundamentals exam with " + ta.correct + "/" + total + " correct. Score: " + ta.score + ".";
        badgeText = "Expedition Arena badge unlocked — you have confirmed your expedition fundamentals!";
      } else {
        msg = "NOT YET QUALIFIED. You scored " + ta.correct + "/" + total + ". You need 8/10 to pass. Review the Learn library and try again.";
      }
    } else {
      if (pct >= 80) {
        msg = "OUTSTANDING! " + ta.correct + "/" + total + " correct (" + pct + "%). Score: " + ta.score + ". Your expedition fundamentals are confirmed.";
        if (passed && state.arenaBadgeEarned) badgeText = "Expedition Arena badge earned!";
      } else if (pct >= 50) {
        msg = "SOLID EFFORT. " + ta.correct + "/" + total + " correct (" + pct + "%). Score: " + ta.score + ". Review the Learn library and try again.";
      } else {
        msg = "KEEP TRAINING. " + ta.correct + "/" + total + " correct (" + pct + "%). Study the Learn library and practise each module.";
      }
    }

    stage.innerHTML =
      '<div class="arena-complete">' +
        '<div class="arena-complete-ico">' + (passed ? "🏆" : "📊") + "</div>" +
        '<h2>' + (passed ? "Round Complete!" : "Round Complete") + "</h2>" +
        '<div class="arena-score-display">' +
          '<div class="arena-score-item"><div class="as-val">' + ta.correct + "/" + total + '</div><div class="as-lbl">Correct</div></div>' +
          '<div class="arena-score-item"><div class="as-val">' + ta.score + '</div><div class="as-lbl">Score</div></div>' +
          '<div class="arena-score-item"><div class="as-val">' + ta.bestStreak + '</div><div class="as-lbl">Best Streak</div></div>' +
        "</div>" +
        '<p style="color:var(--ink-2); font-size:13px; line-height:1.6; max-width:440px; margin:12px auto;">' + msg + "</p>" +
        (badgeText ? '<p style="color:var(--field-gold-bright); font-size:13px; font-weight:600; margin:10px 0;">🏕️ ' + escapeHTML(badgeText) + "</p>" : "") +
        '<div class="arena-mode-buttons" style="margin-top:16px;">' +
          '<button class="btn btn-primary" id="taRetryBtn" type="button">🎮 Play Again</button>' +
          '<button class="btn btn-ghost" id="taExamBtn2" type="button" style="margin-left:10px;">📋 Exam Mode</button>' +
        "</div>" +
      "</div>";

    taUpdateSide();
    if (passed) toast("ok", "🏆 Expedition Arena round passed! " + ta.correct + "/" + total + " correct.");

    const retryBtn = document.getElementById("taRetryBtn");
    const examBtn2 = document.getElementById("taExamBtn2");
    if (retryBtn) retryBtn.addEventListener("click", function () { taStartRound(false); });
    if (examBtn2) examBtn2.addEventListener("click", function () { taStartRound(true); });
  }

  function taUpdateSide() {
    const side = document.getElementById("arenaSide");
    if (!side) return;
    const total = ta.correct + ta.wrong;
    const pct = total > 0 ? Math.round((ta.correct / total) * 100) : 0;
    side.innerHTML =
      '<div class="arena-stat-block">' +
        '<h3><span class="ico">📊</span> Arena Stats</h3>' +
        '<div class="arena-stat-row"><span>Score</span><strong>' + ta.score + "</strong></div>" +
        '<div class="arena-stat-row"><span>Correct</span><strong>' + ta.correct + "/" + total + "</strong></div>" +
        '<div class="arena-stat-row"><span>Accuracy</span><strong>' + pct + "%</strong></div>" +
        '<div class="arena-stat-row"><span>Current Streak</span><strong>' + ta.streak + "</strong></div>" +
        '<div class="arena-stat-row"><span>Best Streak</span><strong>' + ta.bestStreak + "</strong></div>" +
      "</div>" +
      '<div class="arena-stat-block">' +
        '<h3><span class="ico">🏆</span> Arena Badge</h3>' +
        '<div class="arena-badge-status ' + (state.arenaBadgeEarned ? "earned" : "locked") + '">' +
          (state.arenaBadgeEarned ?
            '<div class="ab-ico">🏕️</div><div class="ab-text"><strong>Expedition Arena</strong><br/>Badge Earned!</div>' :
            '<div class="ab-ico">🔒</div><div class="ab-text"><strong>Locked</strong><br/>Score 8/10 to unlock</div>') +
        "</div>" +
      "</div>" +
      '<div class="arena-stat-block">' +
        '<h3><span class="ico">📚</span> Question Pool</h3>' +
        '<div class="arena-stat-row"><span>Total Questions</span><strong>' + ARENA_QUESTIONS.length + "</strong></div>" +
        '<div class="arena-stat-row"><span>Modules Covered</span><strong>11</strong></div>' +
        '<div class="arena-stat-row"><span>Rounds Played</span><strong>' + (state.totalAttempts > 0 ? Math.floor(state.totalAttempts / 10) : 0) + "</strong></div>" +
      "</div>";
  }

  function renderArenaGame() {
    if (!ta.active) {
      taRenderStartScreen();
    } else {
      taRenderQuestion();
    }
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
    if (name === "learn") renderLearn();
    if (name === "arena") renderArenaGame();
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
    try { trMutate(LEARN_ARTICLES); } catch(e) {}
    try { trMutate(MISSIONS); } catch(e) {}
    try { trMutate(RANKS); } catch(e) {}
    try { trMutate(SK); } catch(e) {}
    try { trMutate(TOOLS); } catch(e) {}
    try { trMutate(sliderValue); } catch(e) {}
    try { trMutate(statusMap); } catch(e) {}
    try { trMutate(toggleState); } catch(e) {}
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
    renderArenaGame();

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
