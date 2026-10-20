/* ============================================================
   NAVIGATION TRAINING COMMAND — navigation_training.js
   Operation Pathfinder: map reading, compass work, and
   checkpoint navigation simulator.
   Built on the Maple Defender-style dashboard engine (IIFE).
   Covers the first-year Navigation and Expedition syllabus.
   ============================================================ */

(function () {
  "use strict";

  // ==========================================================
  // STORAGE KEYS
  // ==========================================================
  const SK = {
    progress: "navigationTrainingProgress",
    sitreps: "navigationTrainingSitreps",
    wrongAttempts: "navigationTrainingWrongAttempts",
    streak: "navigationTrainingStreak",
    bestStreak: "navigationTrainingBestStreak",
    readArticles: "navigationTrainingReadArticles",
    navGame: "navigationGameStats"
  };
  const MAP_PROGRESS_KEY = "cadetMapDemoCompleted";
  const NAV_BADGE_ID = 6;

  // ==========================================================
  // RANK LADDER (Navigation ranks)
  // ==========================================================
  const RANKS = [
    { id: 0, name: "Trail Novice",        icon: "🧭", xp: 0,    callsign: "PATHFINDER-1" },
    { id: 1, name: "Trail Cadet",         icon: "🗺️", xp: 300,  callsign: "MAP-1" },
    { id: 2, name: "Pathfinder",          icon: "📍", xp: 700,  callsign: "ROUTE-1" },
    { id: 3, name: "Senior Pathfinder",   icon: "🧭", xp: 1200, callsign: "GUIDE-1" },
    { id: 4, name: "Navigation Corporal", icon: "⭐", xp: 1800, callsign: "NAV-CORP" },
    { id: 5, name: "Master Navigator",    icon: "🏆", xp: 2500, callsign: "MASTER-NAV" }
  ];

  // ==========================================================
  // TOOLS (navigation tools cadets must "open")
  // ==========================================================
  const TOOLS = [
    { id: "mapsheet",   icon: "🗺️", label: "Map Sheet" },
    { id: "mapcare",    icon: "📋", label: "Map Care Guide" },
    { id: "symbols",    icon: "🔣", label: "Symbol Chart" },
    { id: "contours",   icon: "⛰️", label: "Contour Guide" },
    { id: "gridref",    icon: "📐", label: "Grid Reference Manual" },
    { id: "compass",    icon: "🧭", label: "Compass & Bearing" },
    { id: "declin",     icon: "🧲", label: "Declination Chart" },
    { id: "handrail",   icon: "🛤️", label: "Handrail Guide" },
    { id: "features",   icon: "🏞️", label: "Feature Finder" },
    { id: "routeplan",  icon: "📐", label: "Route Planner" },
    { id: "leave_no_trace",icon: "🌾", label: "Leave No Trace" },
    { id: "traillog",   icon: "📝", label: "Trail Logbook" },
    { id: "scalebar",   icon: "📏", label: "Scale Bar" },
    { id: "legend",     icon: "📖", label: "Map Legend" }
  ];

  // ==========================================================
  // TRAINING MISSIONS — first-year Navigation Syllabus
  // ==========================================================
  const MISSIONS = [
    {
      id: "map_care",
      order: 1, tag: "NAV-101", icon: "🗺️",
      title: "Map Care & Handling",
      desc: "Learn how to identify, care for, and protect your map so it remains usable in all field conditions.",
      xp: 100,
      brief: "You are issued your first topographic map sheet. Your instructor explains that a map is only useful if it is cared for — a torn, wet, or smudged map is worse than no map at all. You will learn how to identify a map, fold it correctly, protect it from weather, and keep it oriented in the field. Map care is the foundation of all navigation.",
      scene: "mapcare",
      chapters: [
        { title: "Map Identification", desc: "Identify the key information in the map margin." },
        { title: "Folding", desc: "Learn the correct way to fold a map for field use." },
        { title: "Protection", desc: "Protect the map from rain, sweat, and damage." },
        { title: "Orienting", desc: "Keep the map oriented to the ground at all times." }
      ],
      tasks: [
        {
          type: "select", tool: "mapsheet",
          title: "Identify the Map Title and Scale",
          prompt: "Open the Map Sheet and select where you find the map's title, scale, and edition date.",
          options: [
            "In the map margin — the border area around the map face",
            "Printed across the centre of the map face in large text",
            "On the reverse side of the map sheet only",
            "There is no title or scale on a topographic map"
          ],
          expected: "In the map margin — the border area around the map face",
          proof: "Map identification correct — the title, scale, and edition date are found in the map margin."
        },
        {
          type: "select", tool: "mapcare",
          title: "How to Fold a Map for Field Use",
          prompt: "Open the Map Care Guide and select the correct method for folding a map so the area you need is visible while the rest is protected.",
          options: [
            "Fold it in a concertina fold so the relevant section faces up and the map fits inside a map case",
            "Roll it into a tight cylinder and carry it in your hand",
            "Crumple it loosely and stuff it in a pocket",
            "Cut out the section you need and discard the rest"
          ],
          expected: "Fold it in a concertina fold so the relevant section faces up and the map fits inside a map case",
          proof: "Folding method confirmed — concertina fold with the relevant section facing up inside a map case."
        },
        {
          type: "toggle", tool: "mapcare",
          title: "Confirm the Map Case Rule",
          prompt: "Open the Map Care Guide and toggle to confirm: a map should always be carried in a waterproof map case or sealed plastic sleeve in the field.",
          expected: true,
          proof: "Map case rule confirmed — always protect the map with a waterproof case in the field."
        },
        {
          type: "note", tool: "mapcare",
          title: "Explain Why Map Care Matters",
          prompt: "Write a short note explaining why map care is essential for safe navigation. Include the keywords 'wet', 'oriented', and 'protected'.",
          keywords: ["wet", "oriented", "protected"],
          proof: "Map care explained correctly — keep the map dry, oriented, and protected at all times. Mission complete."
        }
      ]
    },
    {
      id: "map_symbols",
      order: 2, tag: "NAV-102", icon: "🔣",
      title: "Map Symbols & the Legend",
      desc: "Decode the standard map symbols used on topographic maps — from roads and buildings to water features and vegetation.",
      xp: 100,
      brief: "Your instructor hands you a symbol chart. Topographic maps use a standard set of symbols to represent real-world features — roads, tracks, buildings, bridges, rivers, lakes, forests, and more. These symbols are explained in the map legend. Reading them correctly is the difference between following a road and walking into a swamp.",
      scene: "symbols",
      chapters: [
        { title: "The Legend", desc: "Understand how the map legend works." },
        { title: "Line Symbols", desc: "Identify roads, tracks, and water lines." },
        { title: "Area Symbols", desc: "Recognise forests, lakes, and built-up areas." },
        { title: "Point Symbols", desc: "Spot buildings, bridges, and landmarks." }
      ],
      tasks: [
        {
          type: "select", tool: "legend",
          title: "What Is the Map Legend?",
          prompt: "Open the Map Legend and select the correct description of what a map legend is.",
          options: [
            "A key that explains what each symbol on the map represents in the real world",
            "A story about the history of the mapped area",
            "A list of the mapmaker's names and qualifications",
            "A scale showing distances only, with no symbols"
          ],
          expected: "A key that explains what each symbol on the map represents in the real world",
          proof: "Legend defined correctly — it is the key that decodes every symbol on the map."
        },
        {
          type: "select", tool: "symbols",
          title: "Identify the Road Symbol",
          prompt: "Open the Symbol Chart and select the correct description of how a sealed main road is typically shown on a topographic map.",
          options: [
            "A solid red or thick brown line, sometimes with a casing (parallel lines)",
            "A dashed blue line crossing the map",
            "A dotted green line with small tree icons",
            "A series of small black squares in a row"
          ],
          expected: "A solid red or thick brown line, sometimes with a casing (parallel lines)",
          proof: "Road symbol identified — sealed main roads are solid red or thick brown lines with casing."
        },
        {
          type: "select", tool: "symbols",
          title: "Identify the Water Symbol",
          prompt: "Open the Symbol Chart and select how a river or stream is shown on a topographic map.",
          options: [
            "A blue line — solid for perennial (year-round) streams, dashed for intermittent (seasonal)",
            "A green line running along valleys",
            "A brown dotted line following contours",
            "A red line with bridge symbols at crossings"
          ],
          expected: "A blue line — solid for perennial (year-round) streams, dashed for intermittent (seasonal)",
          proof: "Water symbol identified — blue lines, solid for perennial and dashed for intermittent streams."
        },
        {
          type: "note", tool: "legend",
          title: "Why the Legend Matters",
          prompt: "Write a note explaining why you must always check the legend before navigating. Include the keywords 'symbols', 'real world', and 'mistake'.",
          keywords: ["symbols", "real world", "mistake"],
          proof: "Legend importance explained — checking the symbols prevents mistaking a track for a road. Mission complete."
        }
      ]
    },
    {
      id: "map_features",
      order: 3, tag: "NAV-103", icon: "🏞️",
      title: "Map Features & Terrain",
      desc: "Identify natural and man-made features on a map — hills, valleys, ridges, spurs, saddles, and human structures.",
      xp: 100,
      brief: "Now you move beyond symbols to reading the terrain itself. A topographic map shows hills, valleys, ridges, spurs, saddles, knolls, and human features like buildings, roads, and fences. Recognising these features lets you build a mental picture of the landscape and match what you see on the ground to what is on the map.",
      scene: "features",
      chapters: [
        { title: "Natural Features", desc: "Identify hills, valleys, ridges, and spurs." },
        { title: "Human Features", desc: "Spot buildings, tracks, fences, and power lines." },
        { title: "Matching", desc: "Match ground features to map features." },
        { title: "Navigate", desc: "Use features to confirm your position." }
      ],
      tasks: [
        {
          type: "select", tool: "features",
          title: "Identify a Ridge",
          prompt: "Open the Feature Finder and select the correct description of a ridge on a topographic map.",
          options: [
            "A line of high ground with the land sloping down on both sides, shown by contours pointing away from the ridge crest",
            "A low area between two hills where water collects, shown by contours forming a V pointing uphill",
            "A small isolated hill shown as concentric closed contours",
            "A flat area at the top of a hill shown by widely spaced contours"
          ],
          expected: "A line of high ground with the land sloping down on both sides, shown by contours pointing away from the ridge crest",
          proof: "Ridge identified — a line of high ground with slopes on both sides, contours pointing away from the crest."
        },
        {
          type: "select", tool: "features",
          title: "Identify a Valley (Re-Entrant)",
          prompt: "Open the Feature Finder and select how a valley or re-entrant is shown by contour lines.",
          options: [
            "Contours form a V or U shape pointing towards the higher ground (uphill), indicating lower ground jutting into the hill",
            "Contours form a V pointing downhill, indicating a spur jutting out from the hill",
            "Contours are perfectly circular and widely spaced",
            "Contours are absent — valleys are not shown on topographic maps"
          ],
          expected: "Contours form a V or U shape pointing towards the higher ground (uphill), indicating lower ground jutting into the hill",
          proof: "Valley identified — contours form a V or U pointing uphill, showing lower ground into the hillside."
        },
        {
          type: "select", tool: "features",
          title: "Identify a Saddle",
          prompt: "Open the Feature Finder and select the correct description of a saddle on a topographic map.",
          options: [
            "A lower point on a ridge between two higher peaks, shown by an hourglass or pinch in the contour lines",
            "The very top of the highest hill, shown as a small closed contour",
            "A steep cliff face shown by closely packed contours merging together",
            "A man-made feature where two roads meet, shown by intersecting red lines"
          ],
          expected: "A lower point on a ridge between two higher peaks, shown by an hourglass or pinch in the contour lines",
          proof: "Saddle identified — a low point on a ridge between two peaks, contours pinch inwards."
        },
        {
          type: "note", tool: "features",
          title: "Matching Ground to Map",
          prompt: "Write a note explaining how you match what you see on the ground to what is on the map. Include the keywords 'features', 'position', and 'confirm'.",
          keywords: ["features", "position", "confirm"],
          proof: "Feature matching explained — identifying ground features confirms your map position. Mission complete."
        }
      ]
    },
    {
      id: "contour_lines",
      order: 4, tag: "NAV-104", icon: "⛰️",
      title: "Contour Lines & Elevation",
      desc: "Read contour lines to understand the shape of the land — steepness, slopes, cliffs, and relief.",
      xp: 100,
      brief: "Contour lines are the most powerful feature on a topographic map. They join points of equal height above sea level and reveal the three-dimensional shape of the land. Close contours mean steep ground; widely spaced contours mean gentle slopes. Learning to read contours lets you visualise the terrain before you even set foot on it.",
      scene: "contours",
      chapters: [
        { title: "What Contours Mean", desc: "Understand how contour lines show elevation." },
        { title: "Spacing", desc: "Read contour spacing for steepness." },
        { title: "Cliffs", desc: "Identify cliff bands and dangerous ground." },
        { title: "Route Choice", desc: "Use contours to choose a safe route." }
      ],
      tasks: [
        {
          type: "select", tool: "contours",
          title: "What Do Contour Lines Show?",
          prompt: "Open the Contour Guide and select the correct definition of a contour line.",
          options: [
            "A line joining points of equal height above sea level on the map",
            "A line showing the direction of water flow downhill",
            "A line marking the boundary between two map grid squares",
            "A line showing the path of a road or track"
          ],
          expected: "A line joining points of equal height above sea level on the map",
          proof: "Contour defined correctly — a line joining points of equal elevation above sea level."
        },
        {
          type: "select", tool: "contours",
          title: "Reading Contour Spacing for Steepness",
          prompt: "Open the Contour Guide and select how you tell whether ground is steep or gentle from contour spacing.",
          options: [
            "Close contours mean steep ground; widely spaced contours mean gentle slopes",
            "Close contours mean flat ground; widely spaced contours mean cliffs",
            "The colour of the contours indicates steepness, not spacing",
            "Contours are always evenly spaced regardless of terrain"
          ],
          expected: "Close contours mean steep ground; widely spaced contours mean gentle slopes",
          proof: "Contour spacing understood — close lines are steep, wide lines are gentle."
        },
        {
          type: "toggle", tool: "contours",
          title: "Confirm the Cliff Rule",
          prompt: "Open the Contour Guide and toggle to confirm: when contour lines merge together or form a nearly solid black band, it indicates a cliff or near-vertical drop that cannot be crossed safely.",
          expected: true,
          proof: "Cliff rule confirmed — merged contour lines indicate a cliff. Never attempt to cross a cliff band."
        },
        {
          type: "note", tool: "contours",
          title: "Using Contours for Route Choice",
          prompt: "Write a note explaining how contour lines help you choose a safe route. Include the keywords 'slope', 'contour', and 'avoid'.",
          keywords: ["slope", "contour", "avoid"],
          proof: "Contour route choice explained — read slopes, contour around steep ground, and avoid cliffs. Mission complete."
        }
      ]
    },
    {
      id: "grid_references",
      order: 5, tag: "NAV-105", icon: "📐",
      title: "Grid References",
      desc: "Use the grid system to give and find precise locations with four-figure and six-figure grid references.",
      xp: 100,
      brief: "Topographic maps are overlaid with a grid of numbered squares. This grid lets you pinpoint any location with a grid reference — a numerical address for any point on the map. You will learn four-figure references (to locate a 1km square) and six-figure references (to pinpoint within 100 metres). This is how cadets communicate positions in the field.",
      scene: "grid",
      chapters: [
        { title: "The Grid System", desc: "Understand how the map grid works." },
        { title: "Eastings & Northings", desc: "Learn the reading order: eastings then northings." },
        { title: "Four-Figure", desc: "Give a four-figure grid reference." },
        { title: "Six-Figure", desc: "Pinpoint with a six-figure grid reference." }
      ],
      tasks: [
        {
          type: "select", tool: "gridref",
          title: "The Grid Reading Rule",
          prompt: "Open the Grid Reference Manual and select the correct order for reading a grid reference.",
          options: [
            "Eastings first (left to right), then Northings (bottom to top) — 'along the corridor and up the stairs'",
            "Northings first (bottom to top), then Eastings (left to right)",
            "The largest number first, then the smallest",
            "Always read from top to bottom, then left to right"
          ],
          expected: "Eastings first (left to right), then Northings (bottom to top) — 'along the corridor and up the stairs'",
          proof: "Grid reading rule confirmed — eastings first, then northings. 'Along the corridor and up the stairs.'"
        },
        {
          type: "select", tool: "gridref",
          title: "Four-Figure Grid Reference Precision",
          prompt: "Open the Grid Reference Manual and select what a four-figure grid reference locates.",
          options: [
            "A single 1km grid square on the map",
            "A point to within 100 metres",
            "A point to within 10 metres",
            "An entire map sheet"
          ],
          expected: "A single 1km grid square on the map",
          proof: "Four-figure reference understood — it locates a 1km grid square."
        },
        {
          type: "select", tool: "gridref",
          title: "Six-Figure Grid Reference Precision",
          prompt: "Open the Grid Reference Manual and select what a six-figure grid reference locates.",
          options: [
            "A point to within 100 metres — by dividing the grid square into tenths",
            "A point to within 1 kilometre",
            "A point to within 1 metre",
            "An entire 10km area"
          ],
          expected: "A point to within 100 metres — by dividing the grid square into tenths",
          proof: "Six-figure reference understood — it pinpoints a location to within 100 metres."
        },
        {
          type: "note", tool: "gridref",
          title: "Why Grid References Matter",
          prompt: "Write a note explaining why grid references are important for cadets in the field. Include the keywords 'position', 'communication', and 'precise'.",
          keywords: ["position", "communication", "precise"],
          proof: "Grid reference importance explained — precise positions enable clear field communication. Mission complete."
        }
      ]
    },
    {
      id: "compass_bearings",
      order: 6, tag: "NAV-106", icon: "🧭",
      title: "Compass & Bearings",
      desc: "Use a compass to set and follow bearings, account for magnetic declination, and navigate accurately.",
      xp: 100,
      brief: "Your instructor introduces the Silva-style baseplate compass. You will learn the parts of the compass — the magnetic needle, the orienting arrow, the direction of travel arrow, and the rotating bezel. You will set a bearing from the map and walk it on the ground, accounting for magnetic declination — the difference between grid north and magnetic north.",
      scene: "compass",
      chapters: [
        { title: "Compass Parts", desc: "Identify the key parts of a baseplate compass." },
        { title: "Setting a Bearing", desc: "Set a bearing from the map." },
        { title: "Walking a Bearing", desc: "Follow a bearing on the ground." },
        { title: "Declination", desc: "Account for magnetic declination." }
      ],
      tasks: [
        {
          type: "select", tool: "compass",
          title: "Identify the Magnetic Needle",
          prompt: "Open the Compass & Bearing tool and select the correct description of the magnetic needle.",
          options: [
            "The red-and-white needle that pivots to align with the earth's magnetic field, pointing to magnetic north",
            "The fixed arrow printed on the baseplate showing direction of travel",
            "The rotating bezel with degree markings around the edge",
            "The orienting lines inside the bezel housing"
          ],
          expected: "The red-and-white needle that pivots to align with the earth's magnetic field, pointing to magnetic north",
          proof: "Magnetic needle identified — the pivoting red-and-white needle that points to magnetic north."
        },
        {
          type: "select", tool: "compass",
          title: "Setting a Bearing from the Map",
          prompt: "Open the Compass & Bearing tool and select the correct first step to set a bearing from a map.",
          options: [
            "Place the compass on the map with its edge connecting your current position and your destination",
            "Hold the compass at arm's length and spin around until the needle settles",
            "Turn the bezel to any random number and start walking",
            "Place the compass face-down on the map and close your eyes"
          ],
          expected: "Place the compass on the map with its edge connecting your current position and your destination",
          proof: "Bearing step one correct — place the compass edge on the map from your position to your destination."
        },
        {
          type: "select", tool: "declin",
          title: "What Is Magnetic Declination?",
          prompt: "Open the Declination Chart and select the correct definition of magnetic declination.",
          options: [
            "The angle between grid north (from the map) and magnetic north (where the compass points), which must be added or subtracted",
            "The angle between true north and the sun at noon",
            "The tilt of the compass needle when held on a slope",
            "The difference in height between two contour lines"
          ],
          expected: "The angle between grid north (from the map) and magnetic north (where the compass points), which must be added or subtracted",
          proof: "Declination defined — the angle between grid north and magnetic north, corrected by adding or subtracting."
        },
        {
          type: "note", tool: "compass",
          title: "Walking a Bearing in the Field",
          prompt: "Write a note explaining how you walk a bearing on the ground after setting it on the map. Include the keywords 'needle', 'travel', and 'object'.",
          keywords: ["needle", "travel", "object"],
          proof: "Bearing walking explained — align the needle, follow the direction of travel arrow to a landmark object. Mission complete."
        }
      ]
    },
    {
      id: "handrails",
      order: 7, tag: "NAV-107", icon: "🛤️",
      title: "Handrails & Attack Points",
      desc: "Use linear features as handrails to navigate efficiently, and use attack points for the final approach to a target.",
      xp: 100,
      brief: "Your instructor introduces a powerful technique: handrails. A handrail is any linear feature on the map that you can follow — a road, track, river, fence line, power line, ridge, or coastline. Instead of navigating a precise bearing across open ground, you follow a handrail to an attack point, then make a short, precise push to your target. This reduces navigation error and fatigue.",
      scene: "handrail",
      chapters: [
        { title: "What Is a Handrail?", desc: "Understand the handrail concept." },
        { title: "Linear Features", desc: "Identify features that make good handrails." },
        { title: "Attack Points", desc: "Use an attack point for the final approach." },
        { title: "Collecting Features", desc: "Track features as you pass them." }
      ],
      tasks: [
        {
          type: "select", tool: "handrail",
          title: "What Is a Handrail in Navigation?",
          prompt: "Open the Handrail Guide and select the correct definition of a navigation handrail.",
          options: [
            "A linear feature on the map that you follow like a guide rail — a road, track, river, fence, ridge, or coastline",
            "A metal railing installed on steep hiking trails for safety",
            "A compass bearing that you follow in a straight line",
            "A type of knot used to secure a rope between two trees"
          ],
          expected: "A linear feature on the map that you follow like a guide rail — a road, track, river, fence, ridge, or coastline",
          proof: "Handrail defined — a linear map feature you follow to navigate efficiently."
        },
        {
          type: "select", tool: "handrail",
          title: "What Is an Attack Point?",
          prompt: "Open the Handrail Guide and select the correct description of an attack point.",
          options: [
            "A prominent, easily-found feature near your target where you switch from handrail navigation to a precise bearing for the final approach",
            "The starting point of your route at HQ",
            "The highest point on the map where you can see the most terrain",
            "A hazard zone you must avoid during navigation"
          ],
          expected: "A prominent, easily-found feature near your target where you switch from handrail navigation to a precise bearing for the final approach",
          proof: "Attack point defined — a prominent feature near the target where you switch to a precise final approach."
        },
        {
          type: "select", tool: "handrail",
          title: "Which Feature Makes the Best Handrail?",
          prompt: "Open the Handrail Guide and select which of these features makes the most reliable handrail for navigation.",
          options: [
            "A clear track or road that runs roughly parallel to your direction of travel",
            "A single small hill in the middle of open ground",
            "A patch of forest with no clear edges",
            "A contour line that crosses your path at a single point"
          ],
          expected: "A clear track or road that runs roughly parallel to your direction of travel",
          proof: "Best handrail identified — a track or road parallel to your travel direction is the most reliable."
        },
        {
          type: "note", tool: "handrail",
          title: "Collecting Features as You Navigate",
          prompt: "Write a note explaining how collecting features along your handrail helps you stay oriented. Include the keywords 'track', 'confirm', and 'progress'.",
          keywords: ["track", "confirm", "progress"],
          proof: "Collecting features explained — checking off features along the handrail confirms progress. Mission complete."
        }
      ]
    },
    {
      id: "route_planning",
      order: 8, tag: "NAV-108", icon: "📐",
      title: "Route Planning",
      desc: "Plan a safe, efficient route from start to finish using contours, handrails, and the map scale to estimate distances and times.",
      xp: 100,
      brief: "You are given a mission: plan a route from HQ to the campsite through three checkpoints. You must use the map to choose the safest path — contouring around steep ground, using handrails where possible, estimating distances with the scale bar, and calculating travel time using Naismith's rule. Good route planning reduces fatigue and keeps the team safe.",
      scene: "routeplan",
      chapters: [
        { title: "Choosing the Path", desc: "Select a safe route using map features." },
        { title: "Measuring Distance", desc: "Use the scale bar to measure route distance." },
        { title: "Naismith's Rule", desc: "Estimate travel time from distance and height." },
        { title: "Finalise", desc: "Produce a complete route plan with checkpoints." }
      ],
      tasks: [
        {
          type: "select", tool: "routeplan",
          title: "Choosing the Safest Route",
          prompt: "Open the Route Planner and select the best principle for choosing a safe route across the map.",
          options: [
            "Contour around steep ground, use handrails where available, and avoid unnecessary water crossings and restricted areas",
            "Always take the shortest straight-line distance regardless of terrain",
            "Always climb to the highest point for the best visibility",
            "Follow rivers directly, even through steep gorges"
          ],
          expected: "Contour around steep ground, use handrails where available, and avoid unnecessary water crossings and restricted areas",
          proof: "Route principle confirmed — contour around steep ground, use handrails, avoid hazards."
        },
        {
          type: "select", tool: "scalebar",
          title: "Using the Scale Bar to Measure Distance",
          prompt: "Open the Scale Bar and select how you measure the distance of a planned route on the map.",
          options: [
            "Lay a piece of string along your planned route, then measure the string against the scale bar to find the real-world distance",
            "Count the number of contour lines the route crosses and multiply by 10",
            "Estimate the distance by looking at the map and guessing",
            "Measure the straight-line distance only, ignoring bends in the route"
          ],
          expected: "Lay a piece of string along your planned route, then measure the string against the scale bar to find the real-world distance",
          proof: "Distance measurement correct — use a string along the route, then measure against the scale bar."
        },
        {
          type: "select", tool: "routeplan",
          title: "Naismith's Rule for Travel Time",
          prompt: "Open the Route Planner and select the correct statement of Naismith's rule for estimating walking time.",
          options: [
            "Allow 5 km per hour on flat ground, plus 1 minute for every 10 metres of ascent",
            "Allow 10 km per hour regardless of terrain or height gain",
            "Allow 1 hour per kilometre on any ground",
            "Allow 3 km per hour plus 5 minutes per 10 metres of descent only"
          ],
          expected: "Allow 5 km per hour on flat ground, plus 1 minute for every 10 metres of ascent",
          proof: "Naismith's rule confirmed — 5 km/h on flat ground, plus 1 minute per 10 metres of ascent."
        },
        {
          type: "note", tool: "routeplan",
          title: "Producing Your Route Plan",
          prompt: "Write a note describing your complete route plan from HQ to the campsite through three checkpoints. Include the keywords 'checkpoints', 'contour', and 'time'.",
          keywords: ["checkpoints", "contour", "time"],
          proof: "Route plan produced — three checkpoints, contouring around steep ground, estimated travel time. Mission complete."
        }
      ]
    },
    {
      id: "leave_no_trace",
      order: 9, tag: "NAV-109", icon: "🌾",
      title: "Leave No Trace Principles",
      desc: "Follow the Leave No Trace — respect, protect, and enjoy the outdoors responsibly as a cadet in the field.",
      xp: 100,
      brief: "Before you head into the field, your instructor covers Leave No Trace principles. As cadets navigating through farmland, forests, and open country, you must respect landowners, protect the environment, and enjoy the outdoors responsibly. Leave No Trace covers planning ahead, travelling on durable surfaces, disposing of waste properly, leaving what you find, minimising campfire impact, respecting wildlife, and being considerate of others.",
      scene: "countryside",
      chapters: [
        { title: "Respect", desc: "Respect landowners, property, and other people." },
        { title: "Protect", desc: "Protect the environment — no litter, no damage." },
        { title: "Enjoy", desc: "Enjoy the outdoors safely and responsibly." },
        { title: "Cadet Conduct", desc: "Apply the Code as a cadet in the field." }
      ],
      tasks: [
        {
          type: "select", tool: "leave_no_trace",
          title: "Leave No Trace — Seven Principles",
          prompt: "Open the Leave No Trace principles card and select the seven core principles.",
          options: [
            "Plan ahead, travel on durable surfaces, dispose of waste properly, leave what you find, minimise campfire impact, respect wildlife, be considerate of others",
            "Walk fast, stay quiet, carry a rifle",
            "Climb every fence, chase the livestock, leave your litter",
            "Navigate alone, ignore signs, take shortcuts"
          ],
          expected: "Plan ahead, travel on durable surfaces, dispose of waste properly, leave what you find, minimise campfire impact, respect wildlife, be considerate of others",
          proof: "Leave No Trace principles confirmed \u2014 plan ahead, travel on durable surfaces, dispose of waste properly, leave what you find, minimise campfire impact, respect wildlife, be considerate of others."
        },
        {
          type: "select", tool: "leave_no_trace",
          title: "Gates and Fences",
          prompt: "Open the Leave No Trace principles card and select the correct action when you encounter a gate while navigating across farmland.",
          options: [
            "Leave all gates as you find them — if it was open, leave it open; if it was closed, close it behind you",
            "Always leave gates open so others can pass through easily",
            "Always close gates regardless of how you found them",
            "Climb over gates rather than opening them"
          ],
          expected: "Leave all gates as you find them — if it was open, leave it open; if it was closed, close it behind you",
          proof: "Gate rule confirmed — leave gates as you find them."
        },
        {
          type: "toggle", tool: "leave_no_trace",
          title: "Confirm the Litter Rule",
          prompt: "Open the Leave No Trace principles card and toggle to confirm: cadets must carry out all litter and leave no trace — nothing is left behind in the countryside.",
          expected: true,
          proof: "Litter rule confirmed — carry out all litter and leave no trace."
        },
        {
          type: "note", tool: "leave_no_trace",
          title: "Respecting Livestock and Wildlife",
          prompt: "Write a note explaining how cadets should behave around livestock and wildlife in the countryside. Include the keywords 'distance', 'dogs', and 'disturb'.",
          keywords: ["distance", "dogs", "disturb"],
          proof: "Livestock and wildlife conduct explained — keep distance, control dogs, and do not disturb animals. Mission complete."
        }
      ]
    },
    {
      id: "checkpoint_navigation",
      order: 10, tag: "NAV-110", icon: "🎯",
      title: "Checkpoint Navigation Challenge",
      desc: "Put it all together — navigate from HQ to the campsite through three checkpoints using every skill you have learned.",
      xp: 120,
      brief: "The final mission. You must navigate a complete route from HQ to the campsite, passing through three checkpoints. You will identify map symbols, read contour lines, give grid references, set compass bearings, use handrails, and follow Leave No Trace principles. This is the real thing — everything you have learned applied in one integrated navigation challenge.",
      scene: "challenge",
      chapters: [
        { title: "Plan", desc: "Plan the full route with checkpoints." },
        { title: "Navigate", desc: "Navigate to each checkpoint in sequence." },
        { title: "Confirm", desc: "Confirm your position at each checkpoint." },
        { title: "Complete", desc: "Reach the campsite and file your SITREP." }
      ],
      tasks: [
        {
          type: "select", tool: "routeplan",
          title: "Plan the Full Route",
          prompt: "Open the Route Planner and select the correct approach for planning a route from HQ to the campsite through three checkpoints.",
          options: [
            "Identify each checkpoint's grid reference, plan handrails between them, contour around steep ground, and estimate travel time",
            "Walk in a straight line from HQ to the campsite and hope you find the checkpoints",
            "Navigate to the campsite first, then backtrack to find the checkpoints",
            "Send one cadet ahead to find the route while the rest wait at HQ"
          ],
          expected: "Identify each checkpoint's grid reference, plan handrails between them, contour around steep ground, and estimate travel time",
          proof: "Route plan confirmed — grid references, handrails, contouring, and time estimates for all three checkpoints."
        },
        {
          type: "select", tool: "compass",
          title: "Set the Bearing to Checkpoint 1",
          prompt: "Open the Compass & Bearing tool and select the correct bearing you would set to navigate from HQ to Checkpoint 1 at grid reference 4572 (roughly north-east of HQ).",
          options: [
            "Approximately 045° (north-east) — place the compass on the map from HQ to Checkpoint 1, align the bezel, and account for declination",
            "Approximately 180° (south) — walk away from the checkpoint to get a better view",
            "Approximately 270° (west) — the checkpoint is always to the west",
            "Approximately 000° (north) — always walk due north to find checkpoints"
          ],
          expected: "Approximately 045° (north-east) — place the compass on the map from HQ to Checkpoint 1, align the bezel, and account for declination",
          proof: "Bearing to Checkpoint 1 set correctly — 045° north-east with declination accounted for."
        },
        {
          type: "select", tool: "gridref",
          title: "Confirm Your Position at Checkpoint 2",
          prompt: "You have reached a feature you believe is Checkpoint 2 at grid reference 4774. Open the Grid Reference Manual and select how you confirm you are at the right place.",
          options: [
            "Check that the features around you — a track junction and a small stream — match the features shown at grid 4774 on the map",
            "Trust your instinct that you are in the right place without checking the map",
            "Walk in a circle until you recognise something familiar",
            "Ask a passing hiker where you are"
          ],
          expected: "Check that the features around you — a track junction and a small stream — match the features shown at grid 4774 on the map",
          proof: "Position confirmed at Checkpoint 2 — ground features match the map at grid 4774."
        },
        {
          type: "note", tool: "traillog",
          title: "Complete the Navigation Challenge",
          prompt: "Write your final trail log entry describing how you navigated from HQ to the campsite through all three checkpoints. Include the keywords 'checkpoints', 'handrail', and 'campsite'.",
          keywords: ["checkpoints", "handrail", "campsite"],
          proof: "Navigation challenge complete — you navigated all three checkpoints using handrails and reached the campsite. Full mission complete!"
        }
      ]
    }
  ];

  // ==========================================================
  // LEARN ARTICLES — Navigation knowledge base
  // ==========================================================
  const LEARN_ARTICLES = [
    { id: "l_map_parts",        cat: "Map Basics",    icon: "🗺️", title: "Parts of a Topographic Map",             desc: "Margin, legend, scale bar, grid lines, contour lines — the anatomy of a map sheet.", xp: 15 },
    { id: "l_map_care",         cat: "Map Basics",    icon: "📋", title: "Map Care in the Field",                desc: "Waterproof cases, concertina folds, and keeping your map oriented to the ground.", xp: 15 },
    { id: "l_scale",            cat: "Map Basics",    icon: "📏", title: "Understanding Map Scale",              desc: "1:25,000 and 1:50,000 — what the scale ratio means and how to use the scale bar.", xp: 15 },
    { id: "l_symbols",          cat: "Map Reading",   icon: "🔣", title: "Map Symbols Guide",                    desc: "Roads, tracks, buildings, water, vegetation — decoding the standard symbol set.", xp: 15 },
    { id: "l_contours",         cat: "Map Reading",   icon: "⛰️", title: "Reading Contour Lines",                desc: "How contours show elevation, slope, and the three-dimensional shape of the land.", xp: 15 },
    { id: "l_features",         cat: "Map Reading",   icon: "🏞️", title: "Terrain Features",                     desc: "Hills, valleys, ridges, spurs, saddles, and knolls — recognising landforms on a map.", xp: 15 },
    { id: "l_grid_refs",        cat: "Grid System",   icon: "📐", title: "Four & Six-Figure Grid References",    desc: "Eastings and northings, 'along the corridor and up the stairs,' pinpointing locations.", xp: 15 },
    { id: "l_grid_north",       cat: "Grid System",   icon: "🧲", title: "Grid North, True North & Magnetic North", desc: "The three norths and why the difference matters for accurate navigation.", xp: 15 },
    { id: "l_compass_parts",    cat: "Compass",       icon: "🧭", title: "Parts of a Baseplate Compass",         desc: "Magnetic needle, orienting arrow, direction of travel arrow, bezel, baseplate.", xp: 15 },
    { id: "l_set_bearing",      cat: "Compass",       icon: "🧭", title: "Setting & Walking a Bearing",          desc: "From map to ground — setting a bearing and following it to your destination.", xp: 15 },
    { id: "l_declination",      cat: "Compass",       icon: "🧲", title: "Magnetic Declination",                 desc: "The angle between grid north and magnetic north, and how to correct for it.", xp: 15 },
    { id: "l_handrails",        cat: "Techniques",    icon: "🛤️", title: "Handrail Navigation",                  desc: "Using linear features — roads, tracks, rivers, fences — as guide rails to navigate.", xp: 15 },
    { id: "l_attack_points",    cat: "Techniques",    icon: "📍", title: "Attack Points & Collecting Features",   desc: "Switching from handrail to precise bearing at a prominent feature near your target.", xp: 15 },
    { id: "l_naismith",         cat: "Techniques",    icon: "⏱️", title: "Naismith's Rule",                      desc: "5 km/h on flat ground plus 1 minute per 10 metres of ascent — estimating travel time.", xp: 15 },
    { id: "l_route_planning",   cat: "Techniques",    icon: "📐", title: "Route Planning Principles",            desc: "Contouring, handrails, avoiding hazards, and measuring distance with the scale bar.", xp: 15 },
    { id: "l_leave_no_trace",      cat: "Field Conduct", icon: "🌾", title: "Leave No Trace Principles",                 desc: "Seven principles for outdoor ethics — plan ahead, travel on durable surfaces, dispose of waste properly, leave what you find, minimise campfire impact, respect wildlife, be considerate of others.", xp: 15 },
    { id: "l_gates_livestock",  cat: "Field Conduct", icon: "🚪", title: "Gates, Fences & Livestock",            desc: "Leave gates as you find them, keep dogs under control, and give livestock space.", xp: 15 },
    { id: "l_leave_no_trace",   cat: "Field Conduct", icon: "♻️", title: "Leave No Trace",                       desc: "Carry out all litter, minimise campfire impact, and leave the land as you found it.", xp: 15 },
    { id: "l_safety",           cat: "Field Conduct", icon: "⚠️", title: "Navigation Safety",                    desc: "Tell someone your route, carry a whistle, and know what to do if you get lost.", xp: 15 },
    { id: "l_night_nav",        cat: "Advanced",      icon: "🌙", title: "Night Navigation Basics",              desc: "Shorter legs, attack points, and pacing — the fundamentals of navigating after dark.", xp: 15 },
    { id: "l_pacing",           cat: "Advanced",      icon: "👣", title: "Pacing & Timing",                      desc: "Counting double paces and using timing to estimate distance travelled in the field.", xp: 15 },
    { id: "l_resection",        cat: "Advanced",      icon: "📐", title: "Resection — Finding Your Position",     desc: "Using bearings to two or three known features to pinpoint your exact location on the map.", xp: 15 }
  ];

  // ==========================================================
  // NAVIGATION BADGES (auto-generated from MISSIONS)
  // ==========================================================
  const NAV_BADGES = MISSIONS.map(m => ({
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
  // MAP PROGRESS SYNC — badge 6 on the quest map
  // ==========================================================
  function syncMapProgress() {
    try {
      const allDone = MISSIONS.every(m => state.completedMissions.includes(m.id));
      let mapProgress = JSON.parse(localStorage.getItem(MAP_PROGRESS_KEY) || "[]");
      if (allDone && !mapProgress.includes(NAV_BADGE_ID)) {
        mapProgress.push(NAV_BADGE_ID);
        localStorage.setItem(MAP_PROGRESS_KEY, JSON.stringify(mapProgress));
      } else if (!allDone && mapProgress.includes(NAV_BADGE_ID)) {
        mapProgress = mapProgress.filter(id => id !== NAV_BADGE_ID);
        localStorage.setItem(MAP_PROGRESS_KEY, JSON.stringify(mapProgress));
      }
    } catch (e) {}
  }

  // ==========================================================
  // SCENE SVG GENERATORS — Navigation themes
  // ==========================================================
  function sceneSVG(scene) {
    const W = 600, H = 180;
    const base = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">`;
    const end = `</svg>`;
    const grad = (id, c1, c2) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>`;

    if (scene === "mapcare") {
      return base + grad("mcg", "#1a2a1e", "#0a100c") +
        `<rect width="${W}" height="${H}" fill="url(#mcg)"/>` +
        // map sheet
        `<rect x="180" y="20" width="240" height="140" fill="#e8e0c8" stroke="#8a6d4b" stroke-width="2" rx="4" opacity="0.85"/>` +
        // grid lines on map
        `<g stroke="#b8a878" stroke-width="0.5" opacity="0.5"><line x1="240" y1="20" x2="240" y2="160"/><line x1="300" y1="20" x2="300" y2="160"/><line x1="360" y1="20" x2="360" y2="160"/><line x1="180" y1="55" x2="420" y2="55"/><line x1="180" y1="90" x2="420" y2="90"/><line x1="180" y1="125" x2="420" y2="125"/></g>` +
        // contour lines
        `<g fill="none" stroke="#a08040" stroke-width="1" opacity="0.5"><ellipse cx="290" cy="100" rx="45" ry="30"/><ellipse cx="290" cy="100" rx="30" ry="20"/><ellipse cx="290" cy="100" rx="15" ry="10"/></g>` +
        // map case
        `<rect x="165" y="10" width="270" height="160" fill="none" stroke="#ffb454" stroke-width="2" rx="6" opacity="0.6"/>` +
        // compass
        `<circle cx="500" cy="90" r="30" fill="none" stroke="#ffb454" stroke-width="1.5" opacity="0.7"/>` +
        `<line x1="500" y1="60" x2="500" y2="120" stroke="#ffb454" stroke-width="1" opacity="0.5"/>` +
        `<line x1="470" y1="90" x2="530" y2="90" stroke="#ffb454" stroke-width="1" opacity="0.5"/>` +
        `<text x="500" y="58" fill="#ffd97a" font-size="10" text-anchor="middle" font-family="monospace">N</text>` +
        end;
    }
    if (scene === "symbols") {
      return base + grad("sg", "#1a2a1e", "#0a100c") +
        `<rect width="${W}" height="${H}" fill="url(#sg)"/>` +
        // legend panel
        `<rect x="40" y="20" width="180" height="140" fill="#16241b" stroke="#2d4a37" rx="4" opacity="0.8"/>` +
        `<text x="130" y="38" fill="#ffb454" font-size="11" text-anchor="middle" font-family="monospace">LEGEND</text>` +
        // symbol entries
        `<line x1="55" y1="55" x2="85" y2="55" stroke="#c9334a" stroke-width="2.5"/>` +
        `<text x="95" y="58" fill="#b0c9a8" font-size="9">Main road</text>` +
        `<line x1="55" y1="72" x2="85" y2="72" stroke="#4a9db8" stroke-width="2"/>` +
        `<text x="95" y="75" fill="#b0c9a8" font-size="9">River</text>` +
        `<rect x="58" y="85" width="24" height="14" fill="#2e6b4a" opacity="0.6"/>` +
        `<text x="95" y="95" fill="#b0c9a8" font-size="9">Forest</text>` +
        `<rect x="63" y="107" width="6" height="6" fill="#e8e0c8"/>` +
        `<text x="95" y="113" fill="#b0c9a8" font-size="9">Building</text>` +
        `<path d="M55 130 Q70 125 85 130" fill="none" stroke="#a08040" stroke-width="1.5"/>` +
        `<text x="95" y="133" fill="#b0c9a8" font-size="9">Track</text>` +
        // map area
        `<rect x="250" y="20" width="310" height="140" fill="#e8e0c8" stroke="#8a6d4b" stroke-width="1.5" rx="4" opacity="0.7"/>` +
        `<line x1="250" y1="20" x2="560" y2="160" stroke="#c9334a" stroke-width="3" opacity="0.7"/>` +
        `<path d="M280 80 Q330 60 380 90 Q430 120 480 100" fill="none" stroke="#4a9db8" stroke-width="2" opacity="0.7"/>` +
        `<rect x="350" y="50" width="80" height="50" fill="#2e6b4a" opacity="0.4"/>` +
        end;
    }
    if (scene === "features") {
      return base + grad("fg", "#1a2a1e", "#0a100c") +
        `<rect width="${W}" height="${H}" fill="url(#fg)"/>` +
        // contour terrain
        `<g fill="none" stroke="#a08040" stroke-width="1" opacity="0.5">` +
        `<path d="M50 140 Q150 60 250 80 Q350 100 450 50 Q550 20 590 60"/>` +
        `<path d="M50 150 Q150 80 250 95 Q350 110 450 70 Q550 40 590 75"/>` +
        `<path d="M50 160 Q150 100 250 110 Q350 120 450 90 Q550 60 590 90"/>` +
        `</g>` +
        // ridge label
        `<text x="300" y="55" fill="#ffd97a" font-size="11" font-family="monospace" opacity="0.8">RIDGE</text>` +
        `<text x="100" y="145" fill="#6ec4d8" font-size="11" font-family="monospace" opacity="0.8">VALLEY</text>` +
        // hill peak
        `<text x="450" y="45" fill="#ff5a6e" font-size="14">▲</text>` +
        `<text x="455" y="35" fill="#b0c9a8" font-size="9">280m</text>` +
        end;
    }
    if (scene === "contours") {
      return base + grad("cog", "#1a2a1e", "#0a100c") +
        `<rect width="${W}" height="${H}" fill="url(#cog)"/>` +
        // steep contours (close together)
        `<g fill="none" stroke="#a08040" stroke-width="1" opacity="0.6">` +
        `<line x1="80" y1="20" x2="80" y2="160"/>` +
        `<line x1="95" y1="20" x2="95" y2="160"/>` +
        `<line x1="110" y1="20" x2="110" y2="160"/>` +
        `<line x1="125" y1="20" x2="125" y2="160"/>` +
        `</g>` +
        `<text x="100" y="170" fill="#ff5a6e" font-size="9" text-anchor="middle" font-family="monospace">STEEP</text>` +
        // gentle contours (wide apart)
        `<g fill="none" stroke="#a08040" stroke-width="1" opacity="0.6">` +
        `<line x1="300" y1="20" x2="300" y2="160"/>` +
        `<line x1="360" y1="20" x2="360" y2="160"/>` +
        `<line x1="420" y1="20" x2="420" y2="160"/>` +
        `<line x1="480" y1="20" x2="480" y2="160"/>` +
        `</g>` +
        `<text x="400" y="170" fill="#3ee07f" font-size="9" text-anchor="middle" font-family="monospace">GENTLE</text>` +
        end;
    }
    if (scene === "grid") {
      return base + grad("grg", "#1a2a1e", "#0a100c") +
        `<rect width="${W}" height="${H}" fill="url(#grg)"/>` +
        // grid squares
        `<g stroke="#4a9db8" stroke-width="0.8" opacity="0.3">` +
        `<rect x="150" y="20" width="300" height="140" fill="none"/>` +
        `<line x1="200" y1="20" x2="200" y2="160"/><line x1="250" y1="20" x2="250" y2="160"/><line x1="300" y1="20" x2="300" y2="160"/><line x1="350" y1="20" x2="350" y2="160"/><line x1="400" y1="20" x2="400" y2="160"/>` +
        `<line x1="150" y1="48" x2="450" y2="48"/><line x1="150" y1="76" x2="450" y2="76"/><line x1="150" y1="104" x2="450" y2="104"/><line x1="150" y1="132" x2="450" y2="132"/>` +
        `</g>` +
        // grid numbers
        `<g fill="#ffb454" font-size="9" font-family="monospace" opacity="0.7">` +
        `<text x="175" y="14">45</text><text x="225" y="14">46</text><text x="275" y="14">47</text><text x="325" y="14">48</text>` +
        `<text x="142" y="36">72</text><text x="142" y="64">73</text><text x="142" y="92">74</text><text x="142" y="120">75</text>` +
        `</g>` +
        // target marker
        `<circle cx="275" cy="64" r="8" fill="none" stroke="#ff5a6e" stroke-width="2"/>` +
        `<text x="275" y="68" fill="#ff5a6e" font-size="8" text-anchor="middle">✕</text>` +
        `<text x="290" y="60" fill="#ff5a6e" font-size="9" font-family="monospace">4673</text>` +
        end;
    }
    if (scene === "compass") {
      return base + grad("cpg", "#1a2a1e", "#0a100c") +
        `<rect width="${W}" height="${H}" fill="url(#cpg)"/>` +
        // compass rose
        `<circle cx="300" cy="90" r="60" fill="none" stroke="#ffb454" stroke-width="2" opacity="0.7"/>` +
        `<circle cx="300" cy="90" r="45" fill="none" stroke="#ffb454" stroke-width="0.8" opacity="0.4"/>` +
        `<circle cx="300" cy="90" r="30" fill="none" stroke="#ffb454" stroke-width="0.8" opacity="0.4"/>` +
        // cardinal points
        `<text x="300" y="25" fill="#ffd97a" font-size="14" text-anchor="middle" font-weight="bold">N</text>` +
        `<text x="300" y="162" fill="#b0c9a8" font-size="12" text-anchor="middle">S</text>` +
        `<text x="235" y="95" fill="#b0c9a8" font-size="12" text-anchor="middle">W</text>` +
        `<text x="365" y="95" fill="#b0c9a8" font-size="12" text-anchor="middle">E</text>` +
        // needle
        `<path d="M300 35 L293 90 L300 85 L307 90 Z" fill="#ff5a6e"/>` +
        `<path d="M300 145 L293 90 L300 95 L307 90 Z" fill="#eef8e8" opacity="0.6"/>` +
        `<circle cx="300" cy="90" r="4" fill="#ffd97a"/>` +
        // degree markers
        `<text x="430" y="50" fill="#ffb454" font-size="9" font-family="monospace" opacity="0.6">000°</text>` +
        `<text x="430" y="65" fill="#ffb454" font-size="9" font-family="monospace" opacity="0.6">090°</text>` +
        `<text x="430" y="80" fill="#ffb454" font-size="9" font-family="monospace" opacity="0.6">180°</text>` +
        `<text x="430" y="95" fill="#ffb454" font-size="9" font-family="monospace" opacity="0.6">270°</text>` +
        end;
    }
    if (scene === "handrail") {
      return base + grad("hrg", "#1a2a1e", "#0a100c") +
        `<rect width="${W}" height="${H}" fill="url(#hrg)"/>` +
        // track (handrail)
        `<path d="M40 140 Q200 120 300 90 Q400 60 560 40" fill="none" stroke="#c47a26" stroke-width="3" stroke-dasharray="8,4" opacity="0.7"/>` +
        // river
        `<path d="M40 30 Q200 50 300 80 Q400 110 560 150" fill="none" stroke="#4a9db8" stroke-width="2" opacity="0.6"/>` +
        // cadet positions
        `<circle cx="60" cy="138" r="6" fill="#ffd97a" opacity="0.8"/>` +
        `<text x="50" y="125" fill="#ffd97a" font-size="9" font-family="monospace">START</text>` +
        `<circle cx="300" cy="88" r="6" fill="#9ee07e" opacity="0.8"/>` +
        `<text x="270" y="78" fill="#9ee07e" font-size="9" font-family="monospace">CHECKPOINT</text>` +
        `<circle cx="540" cy="42" r="6" fill="#3ee07f" opacity="0.8"/>` +
        `<text x="510" y="32" fill="#3ee07f" font-size="9" font-family="monospace">CAMP</text>` +
        end;
    }
    if (scene === "routeplan") {
      return base + grad("rpg", "#1a2a1e", "#0a100c") +
        `<rect width="${W}" height="${H}" fill="url(#rpg)"/>` +
        // map area
        `<rect x="30" y="15" width="540" height="150" fill="#e8e0c8" stroke="#8a6d4b" stroke-width="1" rx="3" opacity="0.5"/>` +
        // contour terrain
        `<g fill="none" stroke="#a08040" stroke-width="0.8" opacity="0.4">` +
        `<path d="M30 100 Q150 70 300 90 Q450 110 570 80"/>` +
        `<path d="M30 115 Q150 85 300 105 Q450 125 570 95"/>` +
        `<path d="M30 130 Q150 100 300 120 Q450 140 570 110"/>` +
        `</g>` +
        // planned route
        `<path d="M80 130 L80 100 L200 95 L280 80 L350 70 L420 55 L500 50" fill="none" stroke="#ffb454" stroke-width="2.5" stroke-dasharray="5,3" opacity="0.8"/>` +
        // checkpoints
        `<circle cx="80" cy="130" r="7" fill="#ffd97a"/><text x="70" y="148" fill="#ffd97a" font-size="8" font-family="monospace">HQ</text>` +
        `<circle cx="200" cy="95" r="6" fill="none" stroke="#9ee07e" stroke-width="2"/><text x="185" y="85" fill="#9ee07e" font-size="8" font-family="monospace">CP1</text>` +
        `<circle cx="350" cy="70" r="6" fill="none" stroke="#9ee07e" stroke-width="2"/><text x="335" y="60" fill="#9ee07e" font-size="8" font-family="monospace">CP2</text>` +
        `<circle cx="420" cy="55" r="6" fill="none" stroke="#9ee07e" stroke-width="2"/><text x="405" y="45" fill="#9ee07e" font-size="8" font-family="monospace">CP3</text>` +
        `<circle cx="500" cy="50" r="7" fill="#3ee07f"/><text x="492" y="68" fill="#3ee07f" font-size="8" font-family="monospace">CAMP</text>` +
        end;
    }
    if (scene === "countryside") {
      return base + grad("ccg", "#1a2a1e", "#0a100c") +
        `<rect width="${W}" height="${H}" fill="url(#ccg)"/>` +
        // sky gradient
        `<rect x="0" y="0" width="${W}" height="60" fill="#2a3a2e" opacity="0.4"/>` +
        // hills
        `<path d="M0 90 Q100 50 200 70 Q300 90 400 55 Q500 35 600 60 L600 180 L0 180 Z" fill="#2e6b4a" opacity="0.5"/>` +
        `<path d="M0 110 Q120 80 240 95 Q360 110 480 85 Q540 72 600 90 L600 180 L0 180 Z" fill="#1e3326" opacity="0.6"/>` +
        // gate
        `<rect x="270" y="120" width="60" height="40" fill="none" stroke="#8a6d4b" stroke-width="1.5" opacity="0.7"/>` +
        `<line x1="270" y1="125" x2="330" y2="125" stroke="#8a6d4b" stroke-width="0.8" opacity="0.5"/>` +
        `<line x1="270" y1="135" x2="330" y2="135" stroke="#8a6d4b" stroke-width="0.8" opacity="0.5"/>` +
        `<line x1="290" y1="120" x2="290" y2="160" stroke="#8a6d4b" stroke-width="0.8" opacity="0.5"/>` +
        `<line x1="310" y1="120" x2="310" y2="160" stroke="#8a6d4b" stroke-width="0.8" opacity="0.5"/>` +
        // trail
        `<path d="M40 160 Q150 150 270 140 Q400 130 560 130" fill="none" stroke="#c47a26" stroke-width="2" stroke-dasharray="6,4" opacity="0.6"/>` +
        end;
    }
    if (scene === "challenge") {
      return base + grad("chg", "#1a2a1e", "#0a100c") +
        `<rect width="${W}" height="${H}" fill="url(#chg)"/>` +
        // grid overlay
        `<g stroke="#4a9db8" stroke-width="0.5" opacity="0.2">` +
        `<line x1="0" y1="45" x2="600" y2="45"/><line x1="0" y1="90" x2="600" y2="90"/><line x1="0" y1="135" x2="600" y2="135"/>` +
        `<line x1="120" y1="0" x2="120" y2="180"/><line x1="240" y1="0" x2="240" y2="180"/><line x1="360" y1="0" x2="360" y2="180"/><line x1="480" y1="0" x2="480" y2="180"/>` +
        `</g>` +
        // contour terrain
        `<g fill="none" stroke="#a08040" stroke-width="0.8" opacity="0.4">` +
        `<path d="M0 120 Q150 80 300 100 Q450 120 600 90"/>` +
        `<path d="M0 135 Q150 95 300 115 Q450 135 600 105"/>` +
        `</g>` +
        // river
        `<path d="M0 30 Q200 50 400 70 Q500 80 600 95" fill="none" stroke="#4a9db8" stroke-width="2" opacity="0.5"/>` +
        // route
        `<path d="M80 150 L80 120 L180 110 L240 90 L340 80 L420 60 L500 50" fill="none" stroke="#ffb454" stroke-width="2.5" stroke-dasharray="5,3" opacity="0.9"/>` +
        // markers
        `<circle cx="80" cy="150" r="7" fill="#ffd97a"/><text x="70" y="168" fill="#ffd97a" font-size="8" font-family="monospace">HQ</text>` +
        `<circle cx="240" cy="90" r="5" fill="none" stroke="#9ee07e" stroke-width="2"/>` +
        `<circle cx="340" cy="80" r="5" fill="none" stroke="#9ee07e" stroke-width="2"/>` +
        `<circle cx="420" cy="60" r="5" fill="none" stroke="#9ee07e" stroke-width="2"/>` +
        `<circle cx="500" cy="50" r="7" fill="#3ee07f"/><text x="490" y="40" fill="#3ee07f" font-size="8" font-family="monospace">CAMP</text>` +
        end;
    }
    return base + `<rect width="${W}" height="${H}" fill="#0a100c"/>` + end;
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
    NAV_BADGES.forEach(b => {
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
    document.getElementById("topRank").textContent = rank.name;
    document.getElementById("topXP").textContent = state.xp;
    refreshBadges();
    document.getElementById("topBadges").textContent = state.badges.length;
  }

  // ==========================================================
  // RENDER: COMMAND (Dashboard)
  // ==========================================================
  function renderCommand() {
    refreshBadges();
    document.getElementById("cmdMissionsDone").textContent = state.completedMissions.length;
    document.getElementById("cmdMissionsTotal").textContent = "of " + MISSIONS.length;
    document.getElementById("cmdXP").textContent = state.xp;
    const nxt = nextRank();
    document.getElementById("cmdXPNext").textContent = nxt ? "+" + (nxt.xp - state.xp) + " to next rank" : "MAX RANK";
    document.getElementById("cmdSitreps").textContent = state.sitreps.length;
    document.getElementById("cmdBadges").textContent = state.badges.length;
    document.getElementById("cmdBadgeTotal").textContent = "of " + MISSIONS.length;

    const progress = state.completedMissions.length / MISSIONS.length;
    const threatPct = 70 - Math.round(progress * 40);
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
      if (done) cls += " done";
      if (isActive) cls += " active";
      if (!unlocked && !done) cls += " locked";
      const num = done ? "" : m.order;
      return `<div class="${cls}" data-mission="${m.id}">
        <div class="n">${num}</div>
        <div>
          <div class="cr-title">${m.title}</div>
          <div class="cr-desc">${m.tag} • ${m.desc.slice(0, 50)}…</div>
        </div>
        <div class="cr-prog">${done ? "✓" : prog + "/" + total}</div>
      </div>`;
    }).join("");
    cl.querySelectorAll(".chapter-row").forEach(el => {
      el.addEventListener("click", () => {
        const mid = el.dataset.mission;
        const m = MISSIONS.find(x => x.id === mid);
        if (m && missionUnlocked(m)) openMission(mid);
      });
    });
  }

  // ==========================================================
  // RENDER: TRAINING
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
      if (!unlocked && !done) cls += " locked";
      return `<div class="${cls}" data-mission="${m.id}">
        <div class="mc-head">
          <div class="mc-ico">${m.icon}</div>
          <div>
            <div class="mc-tag">${m.tag}</div>
            <div class="mc-title">${m.title}</div>
          </div>
        </div>
        <div class="mc-desc">${m.desc}</div>
        <div class="mc-foot">
          <span class="mc-xp">+${m.xp} XP</span>
          ${!unlocked && !done ? '<span class="mc-lock">🔒 Locked</span>' :
            done ? '<span class="mc-done-badge">✓ Complete</span>' :
            `<div class="mc-prog-wrap"><div class="mc-prog-bar"><div class="mc-prog-fill" style="width:${pct}%"></div></div><div class="mc-prog-text">${prog}/${total}</div></div>`}
        </div>
      </div>`;
    }).join("");
    grid.querySelectorAll(".mission-card").forEach(el => {
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
      if (!unlocked && !done) cls += " locked";
      return `<div class="${cls}" data-mission="${m.id}">
        <div class="mc-head">
          <div class="mc-ico">${m.icon}</div>
          <div>
            <div class="mc-tag">${m.tag}</div>
            <div class="mc-title">${m.title}</div>
          </div>
        </div>
        <div class="mc-desc">${m.desc}</div>
        <div class="mc-foot">
          <span class="mc-xp">+${m.xp} XP</span>
          ${!unlocked && !done ? '<span class="mc-lock">🔒 Locked</span>' :
            done ? '<span class="mc-done-badge">✓ Complete</span>' :
            `<div class="mc-prog-wrap"><div class="mc-prog-bar"><div class="mc-prog-fill" style="width:${pct}%"></div></div><div class="mc-prog-text">${prog}/${total}</div></div>`}
        </div>
      </div>`;
    }).join("");
    sel.querySelectorAll(".mission-card").forEach(el => {
      el.addEventListener("click", () => openMission(el.dataset.mission));
    });
  }

  // ==========================================================
  // OPEN MISSION
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
      if (mainOk) return { ok: true };
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
    else if (task.type === "note") hint = `Your note must include: ${task.keywords.join(", ")}.`;
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
      const badge = NAV_BADGES.find(b => b.mission === m.id);
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
    const badge = NAV_BADGES.find(b => b.mission === m.id);
    const mp = missionProgress(m.id);
    return `<div class="task-console">
      <div class="task-body">
        <div class="complete-card">
          <div class="cc-ico">🏆</div>
          <div class="cc-title">Mission Complete: ${m.title}</div>
          <div class="cc-sub">${m.desc} You have successfully completed all ${m.tasks.length} tasks and earned the <strong>${badge ? badge.name : "Navigation Cadet"}</strong> badge.</div>
          <div class="cc-stats">
            <div class="cc-stat"><div class="v">+${earned}</div><div class="l">XP Earned</div></div>
            <div class="cc-stat"><div class="v">${mp.tasksDone.length}/${m.tasks.length}</div><div class="l">Tasks Done</div></div>
            <div class="cc-stat"><div class="v">${mp.wrongAttempts || 0}</div><div class="l">Wrong Attempts</div></div>
          </div>
          <div class="task-actions" style="justify-content:center;">
            <button class="btn btn-primary" id="fileSitrepQuickBtn" type="button">📮 File SITREP for this mission</button>
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
    document.getElementById("ringXP").textContent = state.xp;
    document.getElementById("ringRankLabel").textContent = rank.name.replace("Trail ", "").replace("Navigation ", "").replace("Senior ", "");
    document.getElementById("nextRankName").textContent = nxt ? nxt.name : "MAX RANK";
    const pct = rankProgressPct();
    const circ = 314;
    document.getElementById("xpRingFg").style.strokeDashoffset = circ - (circ * pct / 100);
    document.getElementById("ringXPToNext").textContent = nxt ? `${state.xp - rank.xp} / ${nxt.xp - rank.xp} XP to next rank` : "MAX RANK ACHIEVED";

    const chart = document.getElementById("xpBarChart");
    chart.innerHTML = MISSIONS.map(m => {
      const done = missionDone(m);
      const xp = done ? missionXP(m) : 0;
      const h = Math.max(4, (xp / 120) * 140);
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
    showFeedback(fb, "ok", `SITREP filed successfully! +20 XP. Your instructor has received your report.`);
    toast("ok", "📮 SITREP filed! +20 XP");
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
  // TRAIL NAVIGATOR GAME
  // Interactive topographic map checkpoint navigation game
  // ==========================================================

  // Direction vectors (for an 8x8 grid where 0,0 is top-left)
  // Grid is displayed with North = up
  const DIRS = {
    N:  { dx: 0,  dy: -1, name: "North",     deg: "000°" },
    NE: { dx: 1,  dy: -1, name: "North-East",deg: "045°" },
    E:  { dx: 1,  dy: 0,  name: "East",      deg: "090°" },
    SE: { dx: 1,  dy: 1,  name: "South-East",deg: "135°" },
    S:  { dx: 0,  dy: 1,  name: "South",     deg: "180°" },
    SW: { dx: -1, dy: 1,  name: "South-West",deg: "225°" },
    W:  { dx: -1, dy: 0,  name: "West",      deg: "270°" },
    NW: { dx: -1, dy: -1, name: "North-West",deg: "315°" }
  };

  // Wave definitions — each wave has a different map layout and route
  const WAVES = [
    {
      // Wave 1: gentle terrain, clear route
      gridSize: 8,
      hq: { x: 1, y: 6 },
      checkpoints: [
        { x: 3, y: 4, name: "Track Junction", desc: "A junction where two forest tracks meet near a small stream.", grid: "4374" },
        { x: 5, y: 2, name: "Ridge Saddle", desc: "A low point on the ridge between two small hills — good passage.", grid: "4572" },
        { x: 6, y: 1, name: "Treeline Edge", desc: "Where the forest meets open ground near the campsite approach.", grid: "4671" }
      ],
      campsite: { x: 6, y: 0, name: "Campsite", desc: "Your destination — a cleared campsite at the edge of the treeline.", grid: "4670" },
      hazards: [{ x: 2, y: 5 }, { x: 4, y: 5 }],
      water: [{ x: 3, y: 3 }, { x: 3, y: 5 }],
      forest: [{ x: 2, y: 2 }, { x: 2, y: 3 }, { x: 5, y: 3 }, { x: 4, y: 3 }, { x: 6, y: 2 }, { x: 6, y: 3 }]
    },
    {
      // Wave 2: more hazards, water barrier
      gridSize: 8,
      hq: { x: 0, y: 7 },
      checkpoints: [
        { x: 2, y: 5, name: "Footbridge", desc: "A small footbridge crossing the stream — the only safe crossing point.", grid: "4275" },
        { x: 4, y: 3, name: "Hill Knoll", desc: "A small knoll with a clearing — good viewpoint for the next leg.", grid: "4473" },
        { x: 6, y: 2, name: "Fence Corner", desc: "A corner in the boundary fence where you turn towards the camp.", grid: "4672" }
      ],
      campsite: { x: 7, y: 0, name: "Campsite", desc: "Your destination — the expedition campsite in a sheltered clearing.", grid: "4770" },
      hazards: [{ x: 1, y: 6 }, { x: 3, y: 6 }, { x: 5, y: 4 }, { x: 6, y: 4 }],
      water: [{ x: 1, y: 5 }, { x: 1, y: 4 }, { x: 2, y: 4 }, { x: 3, y: 4 }, { x: 5, y: 3 }],
      forest: [{ x: 4, y: 4 }, { x: 4, y: 5 }, { x: 5, y: 5 }, { x: 7, y: 3 }, { x: 7, y: 2 }, { x: 7, y: 1 }]
    },
    {
      // Wave 3: complex terrain, steep ground and restricted zones
      gridSize: 8,
      hq: { x: 1, y: 7 },
      checkpoints: [
        { x: 3, y: 5, name: "River Bend", desc: "A bend in the river where a track follows the bank upstream.", grid: "4375" },
        { x: 5, y: 4, name: "Old Quarry", desc: "An old quarry site marked on the map — a key attack point.", grid: "4574" },
        { x: 4, y: 1, name: "Saddle Pass", desc: "A narrow saddle between two steep hills — the only safe crossing.", grid: "4471" }
      ],
      campsite: { x: 6, y: 0, name: "Campsite", desc: "Your destination — a high campsite with panoramic views.", grid: "4670" },
      hazards: [{ x: 2, y: 6 }, { x: 4, y: 6 }, { x: 5, y: 5 }, { x: 6, y: 3 }, { x: 5, y: 2 }, { x: 3, y: 2 }],
      water: [{ x: 2, y: 5 }, { x: 3, y: 4 }, { x: 3, y: 3 }, { x: 2, y: 4 }],
      forest: [{ x: 4, y: 4 }, { x: 4, y: 3 }, { x: 5, y: 3 }, { x: 6, y: 2 }, { x: 6, y: 1 }, { x: 7, y: 1 }]
    }
  ];

  // Game state
  let ng = {
    active: false,
    wave: 0,
    currentWave: null,
    pos: { x: 0, y: 0 },
    route: [],
    checkpointIndex: 0,
    targets: [],
    score: 0,
    errors: 0,
    steps: 0,
    hintsUsed: 0,
    lastBearing: "",
    lastDir: null,
    reachedCheckpoints: 0,
    completedWaves: 0
  };

  function loadNavGameStats() {
    try {
      const raw = localStorage.getItem(SK.navGame);
      if (raw) {
        const p = JSON.parse(raw);
        ng.score = p.score || 0;
        ng.errors = p.errors || 0;
        ng.completedWaves = p.completedWaves || 0;
      }
    } catch (e) {}
  }

  function saveNavGameStats() {
    try {
      localStorage.setItem(SK.navGame, JSON.stringify({
        score: ng.score,
        errors: ng.errors,
        completedWaves: ng.completedWaves
      }));
    } catch (e) {}
  }

  // Determine the correct direction from current position to a target
  function dirToTarget(from, to) {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    if (dx === 0 && dy === 0) return null;
    // Find the closest matching direction
    let best = null;
    let bestDist = Infinity;
    for (const [key, d] of Object.entries(DIRS)) {
      const dist = Math.abs(d.dx - Math.sign(dx)) + Math.abs(d.dy - Math.sign(dy));
      if (dist < bestDist) { bestDist = dist; best = key; }
    }
    return best;
  }

  // Check if a position is a hazard
  function isHazard(x, y) {
    return ng.currentWave.hazards.some(h => h.x === x && h.y === y);
  }
  function isWater(x, y) {
    return ng.currentWave.water.some(w => w.x === x && w.y === y);
  }
  function isForest(x, y) {
    return ng.currentWave.forest.some(f => f.x === x && f.y === y);
  }
  function inBounds(x, y) {
    return x >= 0 && x < ng.currentWave.gridSize && y >= 0 && y < ng.currentWave.gridSize;
  }

  // Render the topographic map SVG
  function renderNavMap() {
    const svg = document.getElementById("navMap");
    if (!svg) return;
    const W = ng.currentWave.gridSize;
    const cellSize = 600 / W;
    let html = "";

    // Grid background
    html += `<rect width="600" height="600" fill="#0c1410"/>`;

    // Grid lines
    for (let i = 0; i <= W; i++) {
      const pos = i * cellSize;
      html += `<line x1="${pos}" y1="0" x2="${pos}" y2="600" stroke="rgba(74,157,184,0.15)" stroke-width="0.5"/>`;
      html += `<line x1="0" y1="${pos}" x2="600" y2="${pos}" stroke="rgba(74,157,184,0.15)" stroke-width="0.5"/>`;
    }

    // Grid numbers (eastings along top, northings along left)
    for (let i = 0; i < W; i++) {
      html += `<text x="${i * cellSize + cellSize / 2}" y="14" fill="rgba(255,180,84,0.5)" font-size="10" text-anchor="middle" font-family="monospace">${42 + i}</text>`;
      html += `<text x="12" y="${i * cellSize + cellSize / 2 + 4}" fill="rgba(255,180,84,0.5)" font-size="10" text-anchor="middle" font-family="monospace">${70 + i}</text>`;
    }

    // Forest areas
    ng.currentWave.forest.forEach(f => {
      const cx = f.x * cellSize + cellSize / 2;
      const cy = f.y * cellSize + cellSize / 2;
      html += `<rect x="${f.x * cellSize + 2}" y="${f.y * cellSize + 2}" width="${cellSize - 4}" height="${cellSize - 4}" fill="#2e6b4a" opacity="0.35" rx="3"/>`;
      // Tree dots
      for (let t = 0; t < 4; t++) {
        const tx = f.x * cellSize + 8 + (t % 2) * (cellSize - 16);
        const ty = f.y * cellSize + 8 + Math.floor(t / 2) * (cellSize - 16);
        html += `<circle cx="${tx}" cy="${ty}" r="3" fill="#4a7a3e" opacity="0.6"/>`;
      }
    });

    // Water features
    ng.currentWave.water.forEach(w => {
      const cx = w.x * cellSize + cellSize / 2;
      const cy = w.y * cellSize + cellSize / 2;
      html += `<rect x="${w.x * cellSize + 4}" y="${w.y * cellSize + cellSize / 2 - 2}" width="${cellSize - 8}" height="4" fill="#4a9db8" opacity="0.5" rx="2"/>`;
      html += `<text x="${cx}" y="${cy + 4}" fill="rgba(110,196,216,0.6)" font-size="9" text-anchor="middle">≈</text>`;
    });

    // Hazard zones (steep/restricted)
    ng.currentWave.hazards.forEach(h => {
      const cx = h.x * cellSize + cellSize / 2;
      const cy = h.y * cellSize + cellSize / 2;
      html += `<rect x="${h.x * cellSize + 2}" y="${h.y * cellSize + 2}" width="${cellSize - 4}" height="${cellSize - 4}" fill="rgba(255,90,110,0.15)" stroke="rgba(255,90,110,0.4)" stroke-width="1" stroke-dasharray="3,2" rx="3"/>`;
      html += `<text x="${cx}" y="${cy + 5}" fill="rgba(255,90,110,0.6)" font-size="14" text-anchor="middle">⚠</text>`;
    });

    // Contour lines (decorative — gentle curves across the map)
    html += `<g fill="none" stroke="rgba(160,128,64,0.2)" stroke-width="1">`;
    for (let i = 0; i < 5; i++) {
      const yBase = 80 + i * 110;
      html += `<path d="M0 ${yBase} Q150 ${yBase - 30} 300 ${yBase} Q450 ${yBase + 30} 600 ${yBase - 10}"/>`;
    }
    html += `</g>`;

    // Route trail (drawn lines)
    if (ng.route.length > 1) {
      let pathD = "";
      ng.route.forEach((p, i) => {
        const cx = p.x * cellSize + cellSize / 2;
        const cy = p.y * cellSize + cellSize / 2;
        pathD += (i === 0 ? "M" : " L") + ` ${cx} ${cy}`;
      });
      html += `<path d="${pathD}" fill="none" stroke="#ffb454" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" opacity="0.7" stroke-dasharray="6,4"/>`;
    }

    // HQ marker
    {
      const hq = ng.currentWave.hq;
      const cx = hq.x * cellSize + cellSize / 2;
      const cy = hq.y * cellSize + cellSize / 2;
      html += `<circle cx="${cx}" cy="${cy}" r="${cellSize * 0.3}" fill="#ffb454" opacity="0.9"/>`;
      html += `<circle cx="${cx}" cy="${cy}" r="${cellSize * 0.3}" fill="none" stroke="#ffd97a" stroke-width="1.5"/>`;
      html += `<text x="${cx}" y="${cy + 4}" fill="#0a100c" font-size="10" font-weight="bold" text-anchor="middle">HQ</text>`;
    }

    // Checkpoint markers
    ng.currentWave.checkpoints.forEach((cp, i) => {
      const cx = cp.x * cellSize + cellSize / 2;
      const cy = cp.y * cellSize + cellSize / 2;
      const reached = i < ng.checkpointIndex;
      const isNext = i === ng.checkpointIndex;
      const fill = reached ? "#3ee07f" : isNext ? "#9ee07e" : "#4a7a3e";
      const stroke = reached ? "#3ee07f" : isNext ? "#9ee07e" : "#4a7a3e";
      html += `<circle cx="${cx}" cy="${cy}" r="${cellSize * 0.25}" fill="none" stroke="${stroke}" stroke-width="2" opacity="0.8"/>`;
      if (isNext) {
        // Pulsing animation for the next checkpoint
        html += `<circle cx="${cx}" cy="${cy}" r="${cellSize * 0.25}" fill="none" stroke="#9ee07e" stroke-width="2" opacity="0.4">
          <animate attributeName="r" values="${cellSize * 0.25};${cellSize * 0.4};${cellSize * 0.25}" dur="1.5s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.4;0;0.4" dur="1.5s" repeatCount="indefinite"/>
        </circle>`;
      }
      html += `<text x="${cx}" y="${cy + 3}" fill="${fill}" font-size="8" font-weight="bold" text-anchor="middle">${i + 1}</text>`;
    });

    // Campsite marker
    {
      const camp = ng.currentWave.campsite;
      const cx = camp.x * cellSize + cellSize / 2;
      const cy = camp.y * cellSize + cellSize / 2;
      const isTarget = ng.checkpointIndex >= ng.currentWave.checkpoints.length;
      html += `<circle cx="${cx}" cy="${cy}" r="${cellSize * 0.3}" fill="${isTarget ? "#3ee07f" : "#1f9e54"}" opacity="0.8"/>`;
      if (isTarget) {
        html += `<circle cx="${cx}" cy="${cy}" r="${cellSize * 0.3}" fill="none" stroke="#3ee07f" stroke-width="2" opacity="0.4">
          <animate attributeName="r" values="${cellSize * 0.3};${cellSize * 0.45};${cellSize * 0.3}" dur="1.5s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.4;0;0.4" dur="1.5s" repeatCount="indefinite"/>
        </circle>`;
      }
      html += `<text x="${cx}" y="${cy + 3}" fill="#0a100c" font-size="9" font-weight="bold" text-anchor="middle">⛺</text>`;
    }

    // Current position marker (cadet)
    {
      const cx = ng.pos.x * cellSize + cellSize / 2;
      const cy = ng.pos.y * cellSize + cellSize / 2;
      html += `<circle cx="${cx}" cy="${cy}" r="${cellSize * 0.35}" fill="rgba(255,180,84,0.2)">
        <animate attributeName="r" values="${cellSize * 0.35};${cellSize * 0.5};${cellSize * 0.35}" dur="1.2s" repeatCount="indefinite"/>
      </circle>`;
      html += `<circle cx="${cx}" cy="${cy}" r="${cellSize * 0.22}" fill="#ffd97a" stroke="#ffb454" stroke-width="2"/>`;
      html += `<text x="${cx}" y="${cy + 4}" fill="#0a100c" font-size="11" text-anchor="middle">🧭</text>`;
    }

    svg.innerHTML = html;
  }

  // Update the target panel
  function updateTargetPanel() {
    const stageEl = document.getElementById("ngStage");
    const nameEl = document.getElementById("ngTargetName");
    const descEl = document.getElementById("ngTargetDesc");
    const gridEl = document.getElementById("ngGridRef");

    if (ng.checkpointIndex < ng.currentWave.checkpoints.length) {
      const cp = ng.currentWave.checkpoints[ng.checkpointIndex];
      stageEl.textContent = `CHECKPOINT ${ng.checkpointIndex + 1}/${ng.currentWave.checkpoints.length}`;
      nameEl.textContent = cp.name;
      descEl.textContent = cp.desc;
      gridEl.textContent = cp.grid;
    } else {
      const camp = ng.currentWave.campsite;
      stageEl.textContent = "FINAL TARGET";
      stageEl.style.background = "var(--green-dim)";
      nameEl.textContent = camp.name;
      descEl.textContent = camp.desc;
      gridEl.textContent = camp.grid;
    }
  }

  // Update scoreboard
  function updateNavScoreboard() {
    document.getElementById("ngScore").textContent = ng.score;
    document.getElementById("ngCheckpoint").textContent = ng.reachedCheckpoints;
    document.getElementById("ngWave").textContent = ng.wave + 1;
    document.getElementById("ngErrors").textContent = ng.errors;
  }

  // Navigation game terminal
  function ngTermPush(kind, text) {
    const term = document.getElementById("ngTerminal");
    if (!term) return;
    const ln = document.createElement("div");
    ln.className = "ln ln-" + kind;
    ln.textContent = text;
    term.appendChild(ln);
    term.scrollTop = term.scrollHeight;
  }

  function startNavigation() {
    ng.wave = ng.wave % WAVES.length;
    ng.currentWave = WAVES[ng.wave];
    ng.pos = { x: ng.currentWave.hq.x, y: ng.currentWave.hq.y };
    ng.route = [{ x: ng.pos.x, y: ng.pos.y }];
    ng.checkpointIndex = 0;
    ng.reachedCheckpoints = 0;
    ng.steps = 0;
    ng.hintsUsed = 0;
    ng.lastBearing = "—";
    ng.active = true;

    // Clear terminal
    const term = document.getElementById("ngTerminal");
    if (term) term.innerHTML = "";

    ngTermPush("info", `▸ Wave ${ng.wave + 1} deployed. Navigate from HQ to the campsite through ${ng.currentWave.checkpoints.length} checkpoints.`);
    ngTermPush("dim", `  HQ at grid ${42 + ng.currentWave.hq.x}${70 + ng.currentWave.hq.y}. First target: ${ng.currentWave.checkpoints[0].name} at grid ${ng.currentWave.checkpoints[0].grid}.`);

    updateTargetPanel();
    updateNavScoreboard();
    renderNavMap();

    // Enable direction buttons
    document.querySelectorAll(".nav-dir-btn[data-dir]").forEach(b => b.disabled = false);
    document.getElementById("ngHintBtn").disabled = false;

    const statusTxt = document.getElementById("ngStatusTxt");
    statusTxt.textContent = `Navigating to Checkpoint 1: ${ng.currentWave.checkpoints[0].name}. Choose your heading.`;

    const startBtn = document.getElementById("ngStartBtn");
    if (startBtn) {
      startBtn.textContent = "↻ Restart Wave";
    }

    document.getElementById("ngBearing").textContent = "—";
  }

  function handleDirection(dirKey) {
    if (!ng.active) return;
    const d = DIRS[dirKey];
    if (!d) return;

    const newX = ng.pos.x + d.dx;
    const newY = ng.pos.y + d.dy;

    // Check bounds
    if (!inBounds(newX, newY)) {
      ng.errors++;
      ngTermPush("err", `✗ ${d.name} — out of bounds! You cannot move off the map edge.`);
      const fb = document.getElementById("ngStatusTxt");
      fb.textContent = `Cannot move ${d.name} — that would take you off the map. Choose another direction.`;
      saveNavGameStats();
      updateNavScoreboard();
      return;
    }

    // Check hazards
    if (isHazard(newX, newY)) {
      ng.errors++;
      ng.score = Math.max(0, ng.score - 10);
      ngTermPush("err", `✗ ${d.name} (${d.deg}) — HAZARD! Steep or restricted ground. −10 points. Turn back.`);
      const fb = document.getElementById("ngStatusTxt");
      fb.textContent = `⚠ Hazard ahead to the ${d.name}! Steep or restricted terrain. Choose a different direction.`;
      saveNavGameStats();
      updateNavScoreboard();
      return;
    }

    // Move is valid
    ng.pos = { x: newX, y: newY };
    ng.route.push({ x: newX, y: newY });
    ng.steps++;
    ng.lastBearing = d.deg + " " + d.name;
    ng.lastDir = dirKey;

    document.getElementById("ngBearing").textContent = ng.lastBearing;

    // Check water crossing (penalty but not blocking)
    if (isWater(newX, newY)) {
      ng.score = Math.max(0, ng.score - 5);
      ngTermPush("info", `≈ ${d.name} (${d.deg}) — water crossing. −5 points. Try to avoid unnecessary river crossings.`);
    } else {
      ngTermPush("info", `▸ Moved ${d.name} (${d.deg}) to grid ${42 + newX}${70 + newY}.`);
    }

    // Check if reached current target
    const target = ng.checkpointIndex < ng.currentWave.checkpoints.length
      ? ng.currentWave.checkpoints[ng.checkpointIndex]
      : ng.currentWave.campsite;

    if (ng.pos.x === target.x && ng.pos.y === target.y) {
      if (ng.checkpointIndex < ng.currentWave.checkpoints.length) {
        // Reached a checkpoint
        ng.reachedCheckpoints++;
        ng.checkpointIndex++;
        const cpPoints = 30;
        const efficiencyBonus = Math.max(0, 10 - ng.steps);
        const totalCpPoints = cpPoints + efficiencyBonus;
        ng.score += totalCpPoints;

        // Award XP to state
        state.xp += 10;
        saveState();
        renderSidebar();
        renderTopStats();

        ngTermPush("ok", `✓ CHECKPOINT ${ng.checkpointIndex} REACHED: ${target.name}! +${totalCpPoints} points (+${efficiencyBonus} efficiency bonus). +10 XP.`);
        toast("ok", `📍 Checkpoint ${ng.checkpointIndex} reached! +${totalCpPoints} pts, +10 XP`);

        // Reset step counter for next leg
        ng.steps = 0;

        if (ng.checkpointIndex >= ng.currentWave.checkpoints.length) {
          ngTermPush("info", `▸ All checkpoints reached! Final target: the campsite at grid ${ng.currentWave.campsite.grid}.`);
          const fb = document.getElementById("ngStatusTxt");
          fb.textContent = `All checkpoints reached! Navigate to the campsite (grid ${ng.currentWave.campsite.grid}).`;
        } else {
          const nextCp = ng.currentWave.checkpoints[ng.checkpointIndex];
          const fb = document.getElementById("ngStatusTxt");
          fb.textContent = `Checkpoint ${ng.checkpointIndex} reached! Next: ${nextCp.name} (grid ${nextCp.grid}).`;
        }
        updateTargetPanel();
      } else {
        // Reached campsite — wave complete!
        const campPoints = 50;
        const efficiencyBonus = Math.max(0, 15 - ng.steps);
        const totalCampPoints = campPoints + efficiencyBonus;
        ng.score += totalCampPoints;
        ng.completedWaves++;

        // Award XP to state
        state.xp += 25;
        saveState();
        renderSidebar();
        renderTopStats();

        ngTermPush("ok", `✓✓ CAMPSITE REACHED! Wave ${ng.wave + 1} complete! +${totalCampPoints} points (+${efficiencyBonus} efficiency). +25 XP.`);
        toast("ok", `⛺ Campsite reached! Wave ${ng.wave + 1} complete! +${totalCampPoints} pts, +25 XP`);

        ng.active = false;
        document.querySelectorAll(".nav-dir-btn[data-dir]").forEach(b => b.disabled = true);
        document.getElementById("ngHintBtn").disabled = true;

        const fb = document.getElementById("ngStatusTxt");
        fb.textContent = `Wave ${ng.wave + 1} complete! Score: ${ng.score}. Press Start for the next wave.`;

        // Advance wave
        ng.wave = (ng.wave + 1) % WAVES.length;

        const startBtn = document.getElementById("ngStartBtn");
        if (startBtn) startBtn.textContent = "▶ Next Wave";
      }
    } else {
      // Check if moving closer or further from target
      const distBefore = Math.abs(ng.route[ng.route.length - 2].x - target.x) + Math.abs(ng.route[ng.route.length - 2].y - target.y);
      const distAfter = Math.abs(newX - target.x) + Math.abs(newY - target.y);
      if (distAfter > distBefore) {
        ng.errors++;
        ng.score = Math.max(0, ng.score - 10);
        ngTermPush("err", `✗ ${d.name} — moving away from target. −10 points. Check the map and your bearing.`);
        const fb = document.getElementById("ngStatusTxt");
        fb.textContent = `Moving away from the target. Grid ref ${target.grid} is in a different direction. −10 pts.`;
      } else if (distAfter < distBefore) {
        const fb = document.getElementById("ngStatusTxt");
        fb.textContent = `Good bearing — moving closer to ${target.name} (grid ${target.grid}). Distance: ${distAfter} grid units.`;
      }
    }

    saveNavGameStats();
    updateNavScoreboard();
    renderNavMap();
  }

  function handleHint() {
    if (!ng.active) return;
    ng.hintsUsed++;
    const target = ng.checkpointIndex < ng.currentWave.checkpoints.length
      ? ng.currentWave.checkpoints[ng.checkpointIndex]
      : ng.currentWave.campsite;

    const correctDir = dirToTarget(ng.pos, target);
    if (correctDir) {
      const d = DIRS[correctDir];
      ng.score = Math.max(0, ng.score - 5);
      ngTermPush("info", `💡 Terrain hint: ${target.name} is to the ${d.name} (${d.deg}). −5 points for using a hint.`);
      const fb = document.getElementById("ngStatusTxt");
      fb.textContent = `Hint: head ${d.name} (${d.deg}) towards ${target.name}. −5 pts for the hint.`;
    }
    saveNavGameStats();
    updateNavScoreboard();
  }

  function ngShowModal() { const o = document.getElementById("ngModalOverlay"); if (o) o.style.display = "flex"; }
  function ngHideModal() { const o = document.getElementById("ngModalOverlay"); if (o) o.style.display = "none"; }

  let navGameBound = false;

  // Main render function for the Trail Navigator section
  function renderNavigatorGame() {
    // Set initial wave data for display
    if (!ng.currentWave) ng.currentWave = WAVES[0];

    // Render initial map
    renderNavMap();

    // Bind event listeners only once to prevent duplicate handlers
    if (!navGameBound) {
      navGameBound = true;

      const startBtn = document.getElementById("ngStartBtn");
      if (startBtn) startBtn.addEventListener("click", startNavigation);

      const hintBtn = document.getElementById("ngHintBtn");
      if (hintBtn) hintBtn.addEventListener("click", handleHint);

      const howBtn = document.getElementById("ngHowBtn");
      if (howBtn) howBtn.addEventListener("click", ngShowModal);

      const modalClose = document.getElementById("ngModalClose");
      if (modalClose) modalClose.addEventListener("click", ngHideModal);

      const ov = document.getElementById("ngModalOverlay");
      if (ov) ov.addEventListener("click", function (e) { if (e.target === ov) ngHideModal(); });

      // Direction buttons
      document.querySelectorAll(".nav-dir-btn[data-dir]").forEach(b => {
        b.addEventListener("click", () => handleDirection(b.dataset.dir));
      });
    }

    // Update scoreboard and target panel on every render
    updateNavScoreboard();
    updateTargetPanel();
  }

  // ==========================================================
  // NAVIGATION ARENA — Confirmation Game Engine (PO 222)
  // ==========================================================
  const ARENA_QUESTIONS = [
    // M222.01 — Review Green Star Navigation (map care, marginal info, conventional signs, contours, grid refs, orienting)
    { eo: "M222.01", q: "When folding a topographic map for field use, which method protects the map while keeping the relevant section visible?", options: ["Roll it into a tight cylinder", "Concertina fold so the needed section faces up inside a map case", "Crumple it loosely and stuff it in a pocket", "Cut out the section you need and discard the rest"], correct: 1 },
    { eo: "M222.01", q: "Where do you find the map title, scale, and edition date on a topographic map sheet?", options: ["Printed across the centre of the map face", "On the reverse side only", "In the map margin — the border area around the map face", "There is no title or scale on a topographic map"], correct: 2 },
    { eo: "M222.01", q: "On a topographic map, what do closely spaced contour lines indicate?", options: ["A gentle, flat slope", "A steep slope", "A river or stream", "A dense forest"], correct: 1 },
    { eo: "M222.01", q: "What is the correct order for reading a grid reference?", options: ["Northings first, then Eastings", "Eastings first (left to right), then Northings (bottom to top)", "The largest number first, then the smallest", "Always read from top to bottom, then left to right"], correct: 1 },
    { eo: "M222.01", q: "A four-figure grid reference locates a point to within what precision?", options: ["A single 1 km grid square", "A point to within 100 metres", "A point to within 10 metres", "An entire map sheet"], correct: 0 },
    { eo: "M222.01", q: "A six-figure grid reference locates a point to within what precision?", options: ["1 kilometre", "100 metres", "10 metres", "1 metre"], correct: 1 },
    { eo: "M222.01", q: "When orienting a map by inspection (without a compass), what is the key principle?", options: ["Rotate the map until features on the map align with the same features on the ground around you", "Fold the map so north is always at the top edge", "Hold the map above your head to match the sky", "Place the map flat and wait for the sun to cast a shadow"], correct: 0 },
    { eo: "M222.01", q: "What is a spur on a topographic map?", options: ["A depression or dip in the ground", "A projecting ridge of high ground running out from a hill or ridge", "A stream or river channel", "A flat area of marshland"], correct: 1 },
    { eo: "M222.01", q: "What is a re-entrant on a topographic map?", options: ["A projecting ridge of high ground", "A depression or valley running into a hillside — the opposite of a spur", "A man-made building symbol", "A contour line that forms a closed loop"], correct: 1 },

    // M222.02 — Describe Bearings (16 compass points, degrees, mils, three norths, back bearing)
    { eo: "M222.02", q: "How many cardinal points are there on a compass?", options: ["2", "4", "8", "16"], correct: 1 },
    { eo: "M222.02", q: "What are the four inter-cardinal (or quadrantal) points on a compass?", options: ["N, E, S, W", "NE, SE, SW, NW", "NNE, ENE, ESE, SSE", "NNW, WNW, WSW, SSW"], correct: 1 },
    { eo: "M222.02", q: "How many total compass points are there when counting cardinal, inter-cardinal, and intermediate points?", options: ["8", "12", "16", "32"], correct: 2 },
    { eo: "M222.02", q: "How many degrees are in a full circle on a compass?", options: ["180", "360", "6400", "1000"], correct: 1 },
    { eo: "M222.02", q: "How many mils are in a full circle on a military compass?", options: ["360", "1000", "6400", "3600"], correct: 2 },
    { eo: "M222.02", q: "In the degree system, what bearing is East?", options: ["0 degrees", "90 degrees", "180 degrees", "270 degrees"], correct: 1 },
    { eo: "M222.02", q: "In the mils system, what bearing is South?", options: ["1600 mils", "3200 mils", "4800 mils", "6400 mils"], correct: 1 },
    { eo: "M222.02", q: "What is true north?", options: ["The direction a compass needle points", "The direction of the grid lines on a map", "The direction of the geographic North Pole, found by the stars (Polaris)", "The direction a GPS calculates"], correct: 2 },
    { eo: "M222.02", q: "What is grid north?", options: ["The direction the magnetic needle points", "The direction indicated by the north-south grid lines (eastings) on a map sheet", "The direction of the North Star", "The direction of magnetic declination"], correct: 1 },
    { eo: "M222.02", q: "What is magnetic north?", options: ["The direction of the geographic North Pole", "The direction indicated by map grid lines", "The direction a compass needle points — the magnetic North Pole", "The direction the sun is at noon"], correct: 2 },
    { eo: "M222.02", q: "What is a back bearing?", options: ["A bearing taken while walking backwards", "A bearing in the opposite direction — 180 degrees from the original bearing", "A bearing to your starting point only", "A bearing measured in mils instead of degrees"], correct: 1 },
    { eo: "M222.02", q: "How do you calculate a back bearing in degrees if the original bearing is less than 180 degrees?", options: ["Add 180 degrees", "Subtract 180 degrees", "Add 360 degrees", "Subtract 90 degrees"], correct: 0 },
    { eo: "M222.02", q: "How do you calculate a back bearing in mils if the original bearing is less than 3200 mils?", options: ["Add 3200 mils", "Subtract 3200 mils", "Add 6400 mils", "Subtract 1600 mils"], correct: 0 },
    { eo: "M222.02", q: "If your forward bearing is 60 degrees, what is the back bearing?", options: ["120 degrees", "180 degrees", "240 degrees", "300 degrees"], correct: 2 },

    // M222.03 — Identify Compass Parts (compass anatomy, Red in the Bed, declination)
    { eo: "M222.03", q: "What does the mnemonic 'Red in the Bed' refer to when using a compass?", options: ["Placing the compass on a red map surface", "Aligning the red (north) end of the magnetic needle inside the orienting arrow on the dial", "Keeping the compass away from red metal objects", "Using a red light at night to read the compass"], correct: 1 },
    { eo: "M222.03", q: "On a compass dial, how many mils does each graduation mark typically represent?", options: ["10 mils", "50 mils", "100 mils", "640 mils"], correct: 1 },
    { eo: "M222.03", q: "On a compass dial graduated in degrees, how many degrees does each mark typically represent?", options: ["1 degree", "2 degrees", "5 degrees", "10 degrees"], correct: 1 },
    { eo: "M222.03", q: "Which end of the magnetic needle points to magnetic north?", options: ["The black end", "The red end", "The white end", "Both ends equally"], correct: 1 },
    { eo: "M222.03", q: "What is the purpose of the romer scales on a compass base plate?", options: ["To measure distance in paces", "To measure grid references on maps of specific scales (e.g. 1:25000 and 1:50000)", "To adjust the declination", "To hold the lanyard"], correct: 1 },
    { eo: "M222.03", q: "What is magnetic declination?", options: ["The angle between true north and the North Star", "The angle between grid north and magnetic north that must be set on the compass", "The tilt of the compass needle on a slope", "The distance between two grid lines"], correct: 1 },
    { eo: "M222.03", q: "When setting declination on a compass, which direction do you turn the adjustment screw for a west declination?", options: ["To the left", "To the right", "Clockwise always", "It does not matter"], correct: 1 },
    { eo: "M222.03", q: "When setting declination on a compass, which direction do you turn the adjustment screw for an east declination?", options: ["To the right", "To the left", "Counter-clockwise always", "It does not matter"], correct: 1 },
    { eo: "M222.03", q: "On the declination scale, how many degrees does each line typically represent?", options: ["1 degree", "2 degrees", "5 degrees", "10 degrees"], correct: 1 },
    { eo: "M222.03", q: "Approximately how far off course will a 1-degree error cause you to be over a 1-kilometre distance?", options: ["About 1.8 metres", "About 17.8 metres", "About 100 metres", "About 1 metre"], correct: 1 },
    { eo: "M222.03", q: "What is the purpose of the luminous markings on a compass (luminous index point, orienting points)?", options: ["To make the compass look decorative", "To allow the compass to be read in low light or darkness", "To indicate magnetic north", "To mark the declination scale"], correct: 1 },
    { eo: "M222.03", q: "What is the maximum declination you should ever set on a compass?", options: ["45 degrees", "90 degrees", "180 degrees", "360 degrees"], correct: 1 },

    // M222.04 — Determine Distance Along a Route (map distance, pace counting)
    { eo: "M222.04", q: "On a 1:50000 scale map, what does 1 centimetre on the map represent on the ground?", options: ["50 metres", "500 metres", "5 kilometres", "50 kilometres"], correct: 1 },
    { eo: "M222.04", q: "How is a pace defined in military navigation?", options: ["One single step", "Two steps (counting each time the same foot hits the ground)", "Three steps", "A 100-metre walk"], correct: 1 },
    { eo: "M222.04", q: "What is the average number of paces per 100 metres for most cadets?", options: ["30 to 40 paces", "60 to 70 paces", "100 to 120 paces", "150 to 200 paces"], correct: 1 },
    { eo: "M222.04", q: "When counting paces, which foot should you count on?", options: ["Both feet", "Your dominant foot only — count each time it hits the ground", "Your non-dominant foot only", "Neither — estimate by eye"], correct: 1 },
    { eo: "M222.04", q: "How do you measure distance along a winding route on a map?", options: ["Draw a straight line between start and end and measure that", "Lay a strip of paper along the route, pivoting it at each bend or curve, then measure the total length against the scale bar", "Count the grid squares the route passes through", "Estimate by the number of contour lines crossed"], correct: 1 },
    { eo: "M222.04", q: "Which factor most commonly affects the accuracy of pace counting?", options: ["Time of day", "Topography (terrain — slopes, rough ground, obstacles)", "The colour of your boots", "The brand of compass used"], correct: 1 },
    { eo: "M222.04", q: "How does walking uphill affect your pace length compared to flat ground?", options: ["Paces become longer", "Paces become shorter", "Paces stay the same length", "Paces double in length"], correct: 1 },
    { eo: "M222.04", q: "How does fatigue affect pace counting over a long day of navigation?", options: ["Paces are consistent all day", "Paces are naturally longer in the morning and become shorter in the afternoon as fatigue sets in", "Paces become longer as you get tired", "Fatigue has no effect on pace length"], correct: 1 },
    { eo: "M222.04", q: "What are pacing beads (or stones) used for?", options: ["To decorate the compass lanyard", "To track distance by moving a bead or stone for every 100 metres paced", "To measure declination", "To mark a map"], correct: 1 },
    { eo: "M222.04", q: "How many trials should you conduct to determine your personal average pace count per 100 metres?", options: ["1 trial", "3 to 5 trials and take the average", "10 to 20 trials", "No trials needed — use the standard 65"], correct: 1 },

    // M222.05 — Orient a Map Using a Compass (6-step procedure)
    { eo: "M222.05", q: "What is the first step when orienting a map using a compass?", options: ["Set the dial to 0 degrees", "Set the declination on the compass", "Draw a line on the map", "Hold the compass at eye level"], correct: 1 },
    { eo: "M222.05", q: "After setting declination, what should the compass dial be set to when orienting a map?", options: ["0 degrees (or 0 mils)", "90 degrees", "180 degrees", "The magnetic bearing of the destination"], correct: 0 },
    { eo: "M222.05", q: "When orienting a map, how should the compass be placed on the map?", options: ["Face down with the cover closed", "Flat on the map with the cover open, pointing the mirror toward the north (top) of the map", "Standing upright on its edge", "Underneath the map sheet"], correct: 1 },
    { eo: "M222.05", q: "What should the base plate of the compass be aligned with when orienting a map?", options: ["A contour line", "An easting (north-south grid) line on the map", "A river or stream symbol", "The map's border edge"], correct: 1 },
    { eo: "M222.05", q: "What is the final step in orienting a map with a compass?", options: ["Read the bearing at the index pointer", "Turn the map and compass together until 'Red in the Bed' — the needle sits in the orienting arrow", "Fold the map along the grid line", "Walk forward 100 paces"], correct: 1 },

    // M222.06 — Follow a Magnetic Bearing Point to Point
    { eo: "M222.06", q: "When taking a magnetic bearing of a prominent object in the field, where should you hold the compass?", options: ["On the ground", "At eye level, at arm's length, facing the object", "Inside your jacket pocket", "Flat on a table"], correct: 1 },
    { eo: "M222.06", q: "When aiming at a prominent object to take a bearing, which compass parts do you use to sight the object?", options: ["The romer and base plate", "The sight and sighting line (in the mirror), looking through the cover", "The lanyard and wrist lock", "The declination scale"], correct: 1 },
    { eo: "M222.06", q: "After sighting the object, what do you do with the compass dial to read the bearing?", options: ["Turn the dial until 'Red in the Bed' (the needle sits in the orienting arrow), then read at the luminous index pointer", "Turn the map until the object is visible", "Flip the compass over", "Pull the lanyard"], correct: 0 },
    { eo: "M222.06", q: "When taking a magnetic bearing on a map, what do you do first after setting declination?", options: ["Hold the compass at eye level", "Mark points A (your position) and B (your destination) and draw a plotting ray from A to B", "Set the dial to 0", "Fold the map"], correct: 1 },
    { eo: "M222.06", q: "When plotting a bearing on a map, what should the compass edge be aligned with?", options: ["The contour lines", "The plotting ray from A to B", "The map border", "The scale bar"], correct: 1 },
    { eo: "M222.06", q: "After placing the compass edge along the plotting ray, what do you rotate to read the grid bearing?", options: ["The map itself", "The dial until the meridian lines align with the easting (grid) lines, then read at the index pointer", "The magnetic needle", "The cover of the compass"], correct: 1 },
    { eo: "M222.06", q: "When following a magnetic bearing point to point in the field, what technique helps you stay on course over distance?", options: ["Walk backwards", "Pick a prominent object along your bearing, walk to it, then repeat for the next leg", "Close your eyes and walk straight", "Always follow the contour lines"], correct: 1 },
    { eo: "M222.06", q: "Why is point-to-point navigation (picking intermediate objects) more accurate than trying to walk a long bearing in one go?", options: ["It is faster", "Small errors accumulate over distance — breaking the route into shorter legs to visible objects keeps you on bearing", "It uses less energy", "It avoids needing a compass"], correct: 1 },

    // C222.01 — Practice Navigation Using a Map and Compass (safety, activities, debrief)
    { eo: "C222.01", q: "If you become lost during a navigation exercise, what should be your first action?", options: ["Run in the direction you think is correct", "Return to your last known checkpoint, use a radio to contact staff, or follow a safety bearing", "Keep walking in a straight line", "Climb the nearest hill for a view"], correct: 1 },
    { eo: "C222.01", q: "What is the recommended time limit for a navigation exercise before returning or reporting?", options: ["15 minutes", "30 minutes", "55 minutes", "2 hours"], correct: 2 },
    { eo: "C222.01", q: "Why are boundaries established before a practical navigation exercise?", options: ["To keep cadets within a safe, controlled area where they can be found if lost", "To make the exercise harder", "To prevent cadets from seeing each other's maps", "To mark the finish line only"], correct: 0 },
    { eo: "C222.01", q: "In the 'Navigation Brain Teaser' activity, how do cadets collect information at checkpoints?", options: ["By taking photos of each checkpoint", "By following clues or answering navigation questions at each checkpoint to progress", "By running as fast as possible between points", "By asking local hikers for directions"], correct: 1 },
    { eo: "C222.01", q: "What skill does the 'Compass Work and Pacing' activity combine?", options: ["Map drawing and first aid", "Following magnetic bearings while measuring distance by counting paces", "Shelter building and fire lighting", "Radio communication and signalling"], correct: 1 },
    { eo: "C222.01", q: "What is the purpose of the group debriefing after a navigation exercise?", options: ["To rank cadets from best to worst", "To discuss skills required, the hardest part, what was exciting, and how to apply the skills in future", "To assign punishment for errors", "To select the next exercise leader only"], correct: 1 },
    { eo: "C222.01", q: "What should be included in the safety briefing before a navigation exercise?", options: ["Only the route map", "Lost procedures, time limits, boundaries, and communication plan", "The scores from the last exercise", "The weather forecast for the entire week"], correct: 1 },
    { eo: "C222.01", q: "In the 'Puzzle Navigation' activity, what do cadets collect at checkpoints to complete the exercise?", options: ["Firewood", "Puzzle pieces that form a complete picture or message when assembled", "Rocks and sticks", "Water samples"], correct: 1 }
  ];

  const navArena = {
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

  function shuffleArenaArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
    return arr;
  }

  function arenaRenderStartScreen() {
    const stage = document.getElementById("arenaStage");
    if (!stage) return;
    stage.innerHTML =
      '<div class="arena-idle">' +
        '<div class="arena-idle-ico">🧭</div>' +
        '<h2>Advanced Navigation Arena</h2>' +
        '<p class="muted" style="font-size:13px; line-height:1.6; max-width:480px; margin:0 auto;">Test your mastery of all seven Red Star navigation training modules. The Arena presents randomized questions drawn from every module of the PO 222 Navigation syllabus — map review, bearings, compass parts, distance determination, orienting a map, following magnetic bearings, and practical navigation. Answer correctly to build your streak and confirm your advanced navigation fundamentals.</p>' +
        '<div class="arena-mode-buttons" style="margin-top:20px;">' +
          '<button class="btn btn-primary" id="navArenaStartBtn" type="button">🎮 Start 10-Question Round</button>' +
          '<button class="btn btn-ghost" id="navArenaExamBtn" type="button" style="margin-left:10px;">📋 Exam Mode (8 to pass)</button>' +
        '</div>' +
        (state.arenaBadgeEarned ?
          '<p class="muted" style="margin-top:14px; font-size:12px;">✅ Navigation Arena badge earned! Keep practising to improve your streak.</p>' :
          '<p class="muted" style="margin-top:14px; font-size:12px;">Complete a 10-question round with 8+ correct to earn the Navigation Arena badge.</p>') +
      '</div>';
    arenaUpdateSide();

    const startBtn = document.getElementById("navArenaStartBtn");
    const examBtn = document.getElementById("navArenaExamBtn");
    if (startBtn) startBtn.addEventListener("click", function () { arenaStartRound(false); });
    if (examBtn) examBtn.addEventListener("click", function () { arenaStartRound(true); });
  }

  function arenaStartRound(examMode) {
    navArena.active = true;
    navArena.examMode = !!examMode;
    navArena.pool = shuffleArenaArray(ARENA_QUESTIONS.slice());
    navArena.poolIndex = 0;
    navArena.score = 0;
    navArena.correct = 0;
    navArena.wrong = 0;
    navArena.streak = 0;
    navArena.round = 0;
    navArena.totalRounds = 10;
    navArena.answered = false;
    arenaRenderQuestion();
  }

  function arenaRenderQuestion() {
    const stage = document.getElementById("arenaStage");
    if (!stage) return;
    if (navArena.poolIndex >= navArena.pool.length || navArena.round >= navArena.totalRounds) {
      arenaFinishRound();
      return;
    }
    navArena.currentQ = navArena.pool[navArena.poolIndex];
    navArena.answered = false;
    const q = navArena.currentQ;
    const progressPct = Math.round((navArena.round / navArena.totalRounds) * 100);

    stage.innerHTML =
      '<div class="arena-active">' +
        '<div class="arena-progress-bar"><div class="arena-progress-fill" style="width:' + progressPct + '%"></div></div>' +
        '<div class="arena-q-meta">' +
          '<span class="arena-eo-tag">' + escapeHTML(q.eo) + "</span>" +
          '<span class="arena-round">Question ' + (navArena.round + 1) + " of " + navArena.totalRounds + "</span>" +
        "</div>" +
        '<div class="arena-prompt">' + escapeHTML(q.q) + "</div>" +
        '<div class="arena-choices" id="arenaChoices">' +
          q.options.map(function (opt, i) {
            return '<button class="arena-choice" data-idx="' + i + '" type="button"><span class="ac-letter">' + String.fromCharCode(65 + i) + "</span><span>" + escapeHTML(opt) + "</span></button>";
          }).join("") +
        "</div>" +
        '<div class="arena-feedback" id="arenaFeedback"></div>' +
      "</div>";

    arenaUpdateSide();

    document.querySelectorAll("#arenaChoices .arena-choice").forEach(function (btn) {
      btn.addEventListener("click", function () { arenaAnswerQuestion(parseInt(btn.dataset.idx, 10)); });
    });
  }

  function arenaAnswerQuestion(idx) {
    if (navArena.answered) return;
    navArena.answered = true;
    const q = navArena.currentQ;
    const isCorrect = idx === q.correct;
    const fb = document.getElementById("arenaFeedback");
    navArena.round++;

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
      navArena.correct++;
      navArena.streak++;
      if (navArena.streak > navArena.bestStreak) navArena.bestStreak = navArena.streak;
      navArena.score += 10 + (navArena.streak > 1 ? navArena.streak * 2 : 0);
      if (fb) { fb.className = "arena-feedback ok"; fb.innerHTML = "✅ Correct! " + escapeHTML(q.options[q.correct]) + (navArena.streak > 1 ? " — 🔥 " + navArena.streak + " streak!" : ""); }
    } else {
      navArena.wrong++;
      navArena.streak = 0;
      if (fb) { fb.className = "arena-feedback err"; fb.innerHTML = "❌ Incorrect. The correct answer is: <strong>" + escapeHTML(q.options[q.correct]) + "</strong>"; }
    }

    state.totalAttempts++;
    if (!isCorrect) {
      state.wrongAttempts++;
      state.streak = 0;
    } else {
      state.streak++;
      if (state.streak > state.bestStreak) state.bestStreak = state.streak;
    }
    saveState();

    arenaUpdateSide();
    updateAnalysis();

    setTimeout(function () {
      navArena.poolIndex++;
      arenaRenderQuestion();
    }, 1800);
  }

  function arenaFinishRound() {
    navArena.active = false;
    const stage = document.getElementById("arenaStage");
    if (!stage) return;
    const total = navArena.correct + navArena.wrong;
    const pct = total > 0 ? Math.round((navArena.correct / total) * 100) : 0;
    const passed = navArena.correct >= 8;

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
    if (navArena.examMode) {
      if (passed) {
        msg = "QUALIFIED! You passed the Advanced Navigation exam with " + navArena.correct + "/" + total + " correct. Score: " + navArena.score + ".";
        badgeText = "Navigation Arena badge unlocked — you have confirmed your advanced navigation fundamentals!";
      } else {
        msg = "NOT YET QUALIFIED. You scored " + navArena.correct + "/" + total + ". You need 8/10 to pass. Review the Learn library and try again.";
      }
    } else {
      if (pct >= 80) {
        msg = "OUTSTANDING! " + navArena.correct + "/" + total + " correct (" + pct + "%). Score: " + navArena.score + ". Your advanced navigation fundamentals are confirmed.";
        if (passed && state.arenaBadgeEarned) badgeText = "Navigation Arena badge earned!";
      } else if (pct >= 50) {
        msg = "SOLID EFFORT. " + navArena.correct + "/" + total + " correct (" + pct + "%). Score: " + navArena.score + ". Review the Learn library and try again.";
      } else {
        msg = "KEEP TRAINING. " + navArena.correct + "/" + total + " correct (" + pct + "%). Study the Learn library and practise each module.";
      }
    }

    stage.innerHTML =
      '<div class="arena-complete">' +
        '<div class="arena-complete-ico">' + (passed ? "🏆" : "📊") + "</div>" +
        '<h2>' + (passed ? "Round Complete!" : "Round Complete") + "</h2>" +
        '<div class="arena-score-display">' +
          '<div class="arena-score-item"><div class="as-val">' + navArena.correct + "/" + total + '</div><div class="as-lbl">Correct</div></div>' +
          '<div class="arena-score-item"><div class="as-val">' + navArena.score + '</div><div class="as-lbl">Score</div></div>' +
          '<div class="arena-score-item"><div class="as-val">' + navArena.bestStreak + '</div><div class="as-lbl">Best Streak</div></div>' +
        "</div>" +
        '<p style="color:var(--ink-2); font-size:13px; line-height:1.6; max-width:440px; margin:12px auto;">' + msg + "</p>" +
        (badgeText ? '<p style="color:var(--amber-bright); font-size:13px; font-weight:600; margin:10px 0;">🧭 ' + escapeHTML(badgeText) + "</p>" : "") +
        '<div class="arena-mode-buttons" style="margin-top:16px;">' +
          '<button class="btn btn-primary" id="navArenaRetryBtn" type="button">🎮 Play Again</button>' +
          '<button class="btn btn-ghost" id="navArenaExamBtn2" type="button" style="margin-left:10px;">📋 Exam Mode</button>' +
        "</div>" +
      "</div>";

    arenaUpdateSide();
    if (passed) toast("ok", "🏆 Navigation Arena round passed! " + navArena.correct + "/" + total + " correct.");

    const retryBtn = document.getElementById("navArenaRetryBtn");
    const examBtn2 = document.getElementById("navArenaExamBtn2");
    if (retryBtn) retryBtn.addEventListener("click", function () { arenaStartRound(false); });
    if (examBtn2) examBtn2.addEventListener("click", function () { arenaStartRound(true); });
  }

  function arenaUpdateSide() {
    const side = document.getElementById("arenaSide");
    if (!side) return;
    const total = navArena.correct + navArena.wrong;
    const pct = total > 0 ? Math.round((navArena.correct / total) * 100) : 0;
    side.innerHTML =
      '<div class="arena-stat-block">' +
        '<h3><span class="ico">📊</span> Arena Stats</h3>' +
        '<div class="arena-stat-row"><span>Score</span><strong>' + navArena.score + "</strong></div>" +
        '<div class="arena-stat-row"><span>Correct</span><strong>' + navArena.correct + "/" + total + "</strong></div>" +
        '<div class="arena-stat-row"><span>Accuracy</span><strong>' + pct + "%</strong></div>" +
        '<div class="arena-stat-row"><span>Current Streak</span><strong>' + navArena.streak + "</strong></div>" +
        '<div class="arena-stat-row"><span>Best Streak</span><strong>' + navArena.bestStreak + "</strong></div>" +
      "</div>" +
      '<div class="arena-stat-block">' +
        '<h3><span class="ico">🏆</span> Arena Badge</h3>' +
        '<div class="arena-badge-status ' + (state.arenaBadgeEarned ? "earned" : "locked") + '">' +
          (state.arenaBadgeEarned ?
            '<div class="ab-ico">🧭</div><div class="ab-text"><strong>Navigation Arena</strong><br/>Badge Earned!</div>' :
            '<div class="ab-ico">🔒</div><div class="ab-text"><strong>Locked</strong><br/>Score 8/10 to unlock</div>') +
        "</div>" +
      "</div>" +
      '<div class="arena-stat-block">' +
        '<h3><span class="ico">📚</span> Question Pool</h3>' +
        '<div class="arena-stat-row"><span>Total Questions</span><strong>' + ARENA_QUESTIONS.length + "</strong></div>" +
        '<div class="arena-stat-row"><span>Modules Covered</span><strong>7</strong></div>' +
        '<div class="arena-stat-row"><span>Rounds Played</span><strong>' + (state.totalAttempts > 0 ? Math.floor(state.totalAttempts / 10) : 0) + "</strong></div>" +
      "</div>";
  }

  function renderArenaGame() {
    if (!navArena.active) {
      arenaRenderStartScreen();
    } else {
      arenaRenderQuestion();
    }
  }

  // ==========================================================
  // NAVIGATION (section switching)
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
    if (name === "navigator") renderNavigatorGame();
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
    try { trMutate(DIRS); } catch(e) {}
    try { trMutate(LEARN_ARTICLES); } catch(e) {}
    try { trMutate(MISSIONS); } catch(e) {}
    try { trMutate(RANKS); } catch(e) {}
    try { trMutate(SK); } catch(e) {}
    try { trMutate(TOOLS); } catch(e) {}
    try { trMutate(WAVES); } catch(e) {}
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
    const deepSection = params.get("section");

    loadNavGameStats();
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
    renderNavigatorGame();
    renderArenaGame();

    if (deepSection) {
      switchSection(deepSection);
    }
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
