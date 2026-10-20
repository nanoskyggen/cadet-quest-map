/* ============================================================
   ARMY CADET TRAINING COMMAND — army_training.js
   Operation Greenstar: hands-on Green Star training simulator
   Maple Defender-style dashboard engine (IIFE architecture)
   ============================================================ */

(function () {
  "use strict";

  // ==========================================================
  // STORAGE KEYS
  // ==========================================================
  const SK = {
    progress: "armyTrainingProgress",
    sitreps: "armyTrainingSitreps",
    wrongAttempts: "armyTrainingWrongAttempts",
    streak: "armyTrainingStreak",
    bestStreak: "armyTrainingBestStreak",
    readArticles: "armyTrainingReadArticles"
  };
  const MAP_PROGRESS_KEY = "cadetMapDemoCompleted";
  const ARMY_BADGE_ID = 14;

  // ==========================================================
  // RANK LADDER (Army Cadet ranks)
  // ==========================================================
  const RANKS = [
    { id: 0, name: "Cadet (Recruit)", icon: "🎖️", xp: 0, callsign: "ROOKIE-1" },
    { id: 1, name: "Cadet", icon: "🪖", xp: 300, callsign: "CADET-1" },
    { id: 2, name: "Cadet Lance-Corporal", icon: "⬇️", xp: 700, callsign: "LEAD-1" },
    { id: 3, name: "Cadet Corporal", icon: "⬇️⬇️", xp: 1200, callsign: "CORP-1" },
    { id: 4, name: "Cadet Master Corporal", icon: "⭐", xp: 1800, callsign: "MCPL-1" },
    { id: 5, name: "Cadet Sergeant", icon: "👑", xp: 2500, callsign: "SGT-1" }
  ];

  // ==========================================================
  // TOOLS (field tools cadets must "open")
  // ==========================================================
  const TOOLS = [
    { id: "orders", icon: "📋", label: "Section Orders" },
    { id: "followership", icon: "🤝", label: "Follower Duties" },
    { id: "comms", icon: "📻", label: "Comms Log" },
    { id: "rifle", icon: "🎯", label: "Rifle Diagram" },
    { id: "range", icon: "📐", label: "Range SOP" },
    { id: "sights", icon: "👁️", label: "Sight Alignment" },
    { id: "rankchart", icon: "🎖️", label: "Rank Chart" },
    { id: "uniform", icon: "👕", label: "Uniform Guide" },
    { id: "layering", icon: "🧥", label: "Layering System" },
    { id: "mapmargin", icon: "🗺️", label: "Map Margin" },
    { id: "contours", icon: "⛰️", label: "Contour Guide" },
    { id: "gridref", icon: "📍", label: "Grid Reference Manual" },
    { id: "compass", icon: "🧭", label: "Compass & Bearing" }
  ];

  // ==========================================================
  // TRAINING MISSIONS — Green Star Performance Objectives
  // Each mission has 4 hands-on tasks. Tool enforcement required.
  // ==========================================================
  const MISSIONS = [
    {
      id: "followership",
      order: 1,
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
      order: 2,
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
          type: "select", tool: "range",
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
          type: "note", tool: "range",
          title: "Confirm Parts Knowledge with Range Officer",
          prompt: "Write a note confirming you have identified all major parts and are ready for the range officer check. Include the keywords 'parts', 'confirmed', and 'range officer'.",
          keywords: ["parts", "confirmed", "range officer"],
          proof: "Parts knowledge confirmed with the range officer. Rifle parts mission complete."
        }
      ]
    },
    {
      id: "range_safety",
      order: 3,
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
          type: "select", tool: "range",
          title: "Verify the Safety Catch",
          prompt: "What colour should the safety catch show when it is ON (safe)?",
          options: ["Black", "Red", "Green", "White"],
          expected: "Black",
          proof: "Safety catch verified ON — black showing. First and most critical check complete."
        },
        {
          type: "toggle", tool: "range",
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
          type: "note", tool: "range",
          title: "Lift the Rifle Safely",
          prompt: "Write a note describing how to lift the rifle clear with correct muzzle direction. Include the keywords 'pistol grip', 'muzzle', and 'down range'.",
          keywords: ["pistol grip", "muzzle", "down range"],
          proof: "Rifle lifted safely with muzzle pointed down range. Range safety mission complete."
        }
      ]
    },
    {
      id: "marksmanship",
      order: 4,
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
          type: "note", tool: "range",
          title: "Execute the Loading Sequence",
          prompt: "Write a note describing the loading sequence in correct order. Include the keywords 'pellet', 'bolt', 'pump', and 'safety'.",
          keywords: ["pellet", "bolt", "pump", "safety"],
          proof: "Loading sequence executed safely — pellet on feed track, bolt closed, one pump, safety off when ready. Mission complete."
        }
      ]
    },
    {
      id: "range_commands",
      order: 5,
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
          type: "select", tool: "range",
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
          type: "toggle", tool: "range",
          title: "Respond to 'Commence Fire'",
          prompt: "Enable your readiness to fire upon the 'commence fire' command — acquire sight picture first.",
          expected: true,
          proof: "Correct response to 'commence fire' — firing begins with proper sight picture."
        },
        {
          type: "select", tool: "range",
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
          type: "note", tool: "range",
          title: "Complete Cease Fire Protocol",
          prompt: "Write a note confirming you inserted the safety rod and are awaiting further commands. Include the keywords 'safety rod', 'awaiting', and 'commands'.",
          keywords: ["safety rod", "awaiting", "commands"],
          proof: "Cease fire protocol completed — safety rod in, awaiting commands. Range discipline mission complete."
        }
      ]
    },
    {
      id: "ranks_compliments",
      order: 6,
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
      order: 7,
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
      order: 8,
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
      order: 9,
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
      order: 10,
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
      order: 11,
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
          proof: "Magnetic bearing calculated — 155 degrees. Direction of travel set. All 11 Green Star missions complete. Outstanding work, Cadet."
        }
      ]
    }
  ];

  // ==========================================================
  // LEARN LIBRARY ARTICLES
  // ==========================================================
  const LEARN_ARTICLES = [
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
  // ARMY BADGES (auto-generated from MISSIONS)
  // ==========================================================
  const ARMY_BADGES = MISSIONS.map(m => ({
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
  // MAP PROGRESS SYNC — badge 14 on the quest map
  // ==========================================================
  function syncMapProgress() {
    try {
      const allDone = MISSIONS.every(m => state.completedMissions.includes(m.id));
      let mapProgress = JSON.parse(localStorage.getItem(MAP_PROGRESS_KEY) || "[]");
      if (allDone && !mapProgress.includes(ARMY_BADGE_ID)) {
        mapProgress.push(ARMY_BADGE_ID);
        localStorage.setItem(MAP_PROGRESS_KEY, JSON.stringify(mapProgress));
      } else if (!allDone && mapProgress.includes(ARMY_BADGE_ID)) {
        mapProgress = mapProgress.filter(id => id !== ARMY_BADGE_ID);
        localStorage.setItem(MAP_PROGRESS_KEY, JSON.stringify(mapProgress));
      }
    } catch (e) {}
  }

  // ==========================================================
  // SCENE SVG GENERATORS — Army field themes
  // ==========================================================
  function sceneSVG(scene) {
    const W = 600, H = 180;
    const base = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">`;
    const end = `</svg>`;
    const grad = (id, c1, c2) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>`;

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
    return base + `<rect width="${W}" height="${H}" fill="#101a0e"/>` + end;
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
    ARMY_BADGES.forEach(b => {
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
    document.getElementById("topRank").textContent = rank.name.replace("Army Cadet ", "").replace("Cadet ", "");
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
    document.getElementById("cmdBadgeTotal").textContent = "of " + ARMY_BADGES.length;

    // Chapter list — Army CSS uses .chapter-row with .cr-title, .cr-desc, .cr-prog
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
  // RENDER: TRAINING GRID — Army CSS uses .mc-top, .mc-foot, .mc-prog-bar, .mc-xp, .mc-status
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

    // Determine task index — resume if in progress
    const mp = missionProgress(missionId);
    activeTaskIndex = mp.tasksDone.length;
    if (activeTaskIndex >= m.tasks.length) activeTaskIndex = m.tasks.length - 1;

    // Switch to missions section
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
    // Tool dock
    document.querySelectorAll("#toolDock .tool-btn").forEach(b => {
      b.addEventListener("click", () => {
        activeTool = b.dataset.tool;
        document.querySelectorAll("#toolDock .tool-btn").forEach(x => x.classList.remove("active"));
        b.classList.add("active");
        updateToolReq(task);
        termPush("info", `▸ Opened ${toolLabel(activeTool)}`);
      });
    });

    // Toggle
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

    // Slider
    const slider = document.getElementById("taskSlider");
    if (slider) {
      slider.addEventListener("input", () => {
        const idx = parseInt(slider.dataset.idx, 10);
        sliderValue[idx] = parseInt(slider.value, 10);
        const unit = task.unit || "m";
        document.getElementById("sliderReadout").textContent = sliderValue[idx] + " " + unit;
      });
    }

    // Submit
    const submitBtn = document.getElementById("submitTaskBtn");
    if (submitBtn) submitBtn.addEventListener("click", () => submitTask(task));

    // Hint
    const hintBtn = document.getElementById("hintBtn");
    if (hintBtn) hintBtn.addEventListener("click", () => showHint(task));

    // Exit
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

    // Tool check
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

    // Validate input
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

    // SUCCESS
    state.streak++;
    if (state.streak > state.bestStreak) state.bestStreak = state.streak;
    const mp = missionProgress(m.id);
    if (!mp.tasksDone.includes(activeTaskIndex)) mp.tasksDone.push(activeTaskIndex);
    state.missionProgress[m.id] = mp;
    saveState();

    fb.classList.add("show", "ok");
    fb.innerHTML = `✅ Correct! ${task.proof}`;
    termPush("ok", `✓ ${task.proof}`);

    // Advance
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
      const badge = ARMY_BADGES.find(b => b.mission === m.id);
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
    const badge = ARMY_BADGES.find(b => b.mission === m.id);
    const mp = missionProgress(m.id);
    return `<div class="task-console">
      <div class="task-body">
        <div class="complete-card">
          <div class="cc-ico">🏅</div>
          <div class="cc-title">Mission Complete: ${m.title}</div>
          <div class="cc-sub">${m.desc} You have successfully completed all ${m.tasks.length} tasks and earned the <strong>${badge ? badge.name : "Green Star Cadet"}</strong> badge.</div>
          <div class="cc-stats">
            <div class="cc-stat"><div class="v">+${earned}</div><div class="l">XP Earned</div></div>
            <div class="cc-stat"><div class="v">${mp.tasksDone.length}/${m.tasks.length}</div><div class="l">Tasks Done</div></div>
            <div class="cc-stat"><div class="v">${mp.wrongAttempts || 0}</div><div class="l">Wrong Attempts</div></div>
          </div>
          <div class="task-actions" style="justify-content:center;">
            <button class="btn btn-primary" id="fileSitrepQuickBtn" type="button">📠 File SITREP for this mission</button>
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
    document.getElementById("ringRankLabel").textContent = rank.name.replace("Green Star ", "").replace("Cadet ", "");
    document.getElementById("nextRankName").textContent = nxt ? nxt.name : "MAX RANK";
    const pct = rankProgressPct();
    const circ = 314;
    document.getElementById("xpRingFg").style.strokeDashoffset = circ - (circ * pct / 100);
    document.getElementById("ringXPToNext").textContent = nxt ? `${state.xp - rank.xp} / ${nxt.xp - rank.xp} XP to next rank` : "MAX RANK ACHIEVED";

    // XP bar chart
    const chart = document.getElementById("xpBarChart");
    chart.innerHTML = MISSIONS.map(m => {
      const done = missionDone(m);
      const xp = done ? missionXP(m) : 0;
      const h = Math.max(4, (xp / 100) * 140);
      return `<div class="bar" style="height:${h}px;" title="${m.title}: ${xp} XP"><div class="bar-val">${xp}</div><div class="bar-label">M${m.order}</div></div>`;
    }).join("");

    // Stats
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
    showFeedback(fb, "ok", `SITREP filed successfully! +20 XP. Your commanding officer has received your report.`);
    toast("ok", "📠 SITREP filed! +20 XP");
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
  // FIELD RANGE — FIELD PATROL SIMULATOR
  // Tactical map with sentry vision cones, cadet movement,
  // concealment/detection ("why things are seen"), field signals.
  // ==========================================================

  // SVG coordinate system
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
    try { trMutate(FC); } catch(e) {}
    try { trMutate(FC_CALLSIGNS); } catch(e) {}
    try { trMutate(FC_DIRS); } catch(e) {}
    try { trMutate(FC_MAP); } catch(e) {}
    try { trMutate(FC_SIGNALS); } catch(e) {}
    try { trMutate(FC_TECH); } catch(e) {}
    try { trMutate(LEARN_ARTICLES); } catch(e) {}
    try { trMutate(MISSIONS); } catch(e) {}
    try { trMutate(RANKS); } catch(e) {}
    try { trMutate(SK); } catch(e) {}
    try { trMutate(TOOLS); } catch(e) {}
    try { trMutate(coverSpots); } catch(e) {}
    try { trMutate(options); } catch(e) {}
    try { trMutate(sliderValue); } catch(e) {}
    try { trMutate(statusMap); } catch(e) {}
    try { trMutate(toggleState); } catch(e) {}
    try { trMutate(treeClusters); } catch(e) {}
  }



  // ==========================================================
  // INIT
  // ==========================================================
  function init() {
    // Nav buttons
    document.querySelectorAll(".nav-btn").forEach(b => {
      b.addEventListener("click", () => switchSection(b.dataset.section));
    });

    // Mobile menu
    const mb = document.getElementById("mobileMenuBtn");
    if (mb) mb.addEventListener("click", () => document.getElementById("sidebar").classList.toggle("open"));

    // SITREP file button
    const fsb = document.getElementById("fileSitrepBtn");
    if (fsb) fsb.addEventListener("click", fileSitrep);

    // Check for deep-link: ?mission=id
    const params = new URLSearchParams(window.location.search);
    const deepMission = params.get("mission");
    const deepSection = params.get("section");

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
