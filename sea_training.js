/* ============================================================
   SEA CADET TRAINING COMMAND — sea_training.js
   Operation Bluewater: hands-on seamanship training simulator
   Inspired by Maple Shield design patterns
   Content drawn from the Phase 1 Sea Cadet Handbook
   ============================================================ */

(function () {
  "use strict";

  // ==========================================================
  // STORAGE KEYS
  // ==========================================================
  const SK = {
    progress: "seaTrainingProgress",
    sitreps: "seaTrainingSitreps",
    readArticles: "seaTrainingReadArticles"
  };

  // ==========================================================
  // RANK LADDER
  // ==========================================================
  const RANKS = [
    { id: 0, name: "Sea Cadet Recruit", icon: "🎖️", xp: 0, callsign: "ROOKIE-1" },
    { id: 1, name: "Sea Cadet", icon: "⚓", xp: 300, callsign: "CADET-1" },
    { id: 2, name: "Able Cadet", icon: "🪝", xp: 700, callsign: "ABLE-1" },
    { id: 3, name: "Leading Cadet", icon: "⭐", xp: 1200, callsign: "LEAD-1" },
    { id: 4, name: "Petty Officer Cadet", icon: "🏅", xp: 1800, callsign: "PO-1" },
    { id: 5, name: "Cadet Boatswain", icon: "🏆", xp: 2500, callsign: "BOSUN-1" }
  ];

  // ==========================================================
  // TOOLS (sea cadet workstations cadets must "open")
  // ==========================================================
  const TOOLS = [
    { id: "chart", icon: "🗺️", label: "Chart Table" },
    { id: "knots", icon: "🪢", label: "Knot Board" },
    { id: "compass", icon: "🧭", label: "Compass" },
    { id: "safety", icon: "🦺", label: "Safety Gear" },
    { id: "helm", icon: "⛵", label: "Helm Station" },
    { id: "rigging", icon: "🔗", label: "Rigging" },
    { id: "radio", icon: "📻", label: "Radio Set" },
    { id: "logbook", icon: "📓", label: "Log Book" }
  ];

  // ==========================================================
  // TRAINING MODULES / MISSIONS
  // Each mission has 4 hands-on tasks.
  // Task types: toggle | select | type | note | slider
  // ==========================================================
  const MISSIONS = [
    {
      id: "sailing_principles",
      order: 1,
      tag: "MODULE 01",
      icon: "⛵",
      title: "Principles of Sailing",
      desc: "Master the points of sail, understand port and starboard, and learn how a sailboat harnesses wind to move through the water.",
      xp: 100,
      brief: "You are at the helm station of a training dinghy alongside the jetty. Your instructor wants you to demonstrate understanding of how a sailboat uses the wind. Open the helm station panel and work through each check.",
      scene: "sailboat",
      chapters: [
        { title: "Points of Sail", desc: "Understand how wind direction determines your course." },
        { title: "Port & Starboard", desc: "Learn the permanent left and right of a vessel." },
        { title: "Tacking & Gybing", desc: "Master the two methods of changing direction." },
        { title: "Helm & Crew Roles", desc: "Understand responsibilities at the helm and as crew." }
      ],
      tasks: [
        {
          type: "select", tool: "helm",
          title: "What Makes a Sailboat Move?",
          prompt: "Your instructor asks what force pushes a sailboat forward when sailing. Which is the correct explanation?",
          options: [
            "The sail acts like an engine, pushing the boat directly downwind at all times",
            "The sail is an aerofoil — wind flows across both sides creating lift that drives the boat forward, even toward the wind",
            "The boat is pushed by ocean currents, not the wind",
            "The hull has a small motor hidden inside"
          ],
          expected: "The sail is an aerofoil — wind flows across both sides creating lift that drives the boat forward, even toward the wind",
          proof: "Sailing principle confirmed — the sail acts as an aerofoil generating lift, not just a wind catcher."
        },
        {
          type: "select", tool: "helm",
          title: "Port and Starboard",
          prompt: "A vessel is facing forward (bow ahead). Which side is 'port' and which is 'starboard'?",
          options: [
            "Port is the right side, starboard is the left side",
            "Port is the left side, starboard is the right side",
            "Port is the front, starboard is the back",
            "Port and starboard change depending on wind direction"
          ],
          expected: "Port is the left side, starboard is the right side",
          proof: "Port and starboard confirmed — port is left (red), starboard is right (green), fixed relative to the vessel."
        },
        {
          type: "select", tool: "helm",
          title: "What is Tacking?",
          prompt: "You need to sail upwind (toward where the wind is coming from). What manoeuvre do you perform?",
          options: [
            "Gybing — turning the bow through the wind",
            "Tacking — turning the bow through the wind so the sail crosses to the other side",
            "Dropping the sail and paddling",
            "Sailing straight — you cannot sail upwind at all"
          ],
          expected: "Tacking — turning the bow through the wind so the sail crosses to the other side",
          proof: "Tacking confirmed — turning the bow through the wind to change tack and sail a zigzag upwind."
        },
        {
          type: "note", tool: "logbook",
          title: "Log the Point of Sail",
          prompt: "Switch to the Log Book. Write a short log entry describing what 'close-hauled' means as a point of sail. Your note must include the keywords 'wind' and 'upwind'.",
          keywords: ["wind", "upwind"],
          proof: "Point of sail logged — close-hauled is sailing as close to the wind (upwind) as possible."
        }
      ]
    },
    {
      id: "knots_ropework",
      order: 2,
      tag: "MODULE 02",
      icon: "🪢",
      title: "Knots & Ropework",
      desc: "Tie essential knots, bends and hitches. Learn the parts of a rope and how whipping prevents a line from unravelling.",
      xp: 100,
      brief: "You are at the knot board in the seamanship classroom. Your boatswain wants you to identify the parts of a line, select the correct knot for a task, and demonstrate ropework knowledge. Use the knot board tools provided.",
      scene: "knotboard",
      chapters: [
        { title: "Parts of a Rope", desc: "Learn the bight, standing end, working end." },
        { title: "The Reef Knot", desc: "Tie the most essential joining knot." },
        { title: "Knot Selection", desc: "Choose the right knot for the task." },
        { title: "Whipping Purpose", desc: "Understand why lines are whipped." }
      ],
      tasks: [
        {
          type: "select", tool: "knots",
          title: "Identify the Working End",
          prompt: "Your instructor points to a rope and asks you to identify the 'working end'. What is the working end?",
          options: [
            "The end of the rope not involved in making the knot",
            "The active end of the line used in making the knot",
            "The curved section or loop between the ends",
            "The section between the knot and the standing end"
          ],
          expected: "The active end of the line used in making the knot",
          proof: "Working end confirmed — the active end used to form the knot. (Standing end is the inactive end.)"
        },
        {
          type: "select", tool: "knots",
          title: "The Reef Knot",
          prompt: "You need to join two ropes of equal thickness. Which knot is the correct choice?",
          options: [
            "Bowline — forms a fixed loop at the end of a line",
            "Reef knot (square knot) — joins two ropes of equal thickness",
            "Clove hitch — secures a line to a spar or post",
            "Figure-eight — a stopper knot"
          ],
          expected: "Reef knot (square knot) — joins two ropes of equal thickness",
          proof: "Knot selection confirmed — the reef knot joins two ropes of equal thickness (left over right, right over left)."
        },
        {
          type: "toggle", tool: "knots",
          title: "Prepare the Knot Board",
          prompt: "Before you demonstrate, confirm the knot board is laid out and the practice lines are ready. Toggle the KNOT BOARD READY indicator to ON.",
          expected: true,
          proof: "Knot board ready — practice lines prepared for demonstration."
        },
        {
          type: "note", tool: "logbook",
          title: "Log the Purpose of Whipping",
          prompt: "Switch to the Log Book. Write a short log entry on why a line is whipped. Your note must include the keyword 'fray' (or 'unravel') and 'end'.",
          keywords: ["fray", "end"],
          altKeywords: ["unravel", "end"],
          proof: "Whipping purpose logged — prevents the end of a line from fraying or unravelling."
        }
      ]
    },
    {
      id: "maritime_navigation",
      order: 3,
      tag: "MODULE 03",
      icon: "🧭",
      title: "Maritime Navigation",
      desc: "Read a nautical chart, plot a course by compass bearing, and account for magnetic variation to find your way at sea.",
      xp: 100,
      brief: "You are at the chart table with a nautical chart spread out. Your task is to read a compass bearing, apply magnetic variation, and plot a safe course to your destination. Use the chart table and compass tools.",
      scene: "charttable",
      chapters: [
        { title: "Chart Plotting", desc: "Mark your course on the nautical chart." },
        { title: "Compass Bearings", desc: "Take and read a magnetic bearing." },
        { title: "Magnetic Variation", desc: "Correct true bearing to magnetic bearing." },
        { title: "Course to Steer", desc: "Calculate the heading to reach your destination." }
      ],
      tasks: [
        {
          type: "toggle", tool: "chart",
          title: "Activate the Chart Plot",
          prompt: "Before plotting, confirm your nautical chart is laid out and the plotting tools are active. Toggle the CHART PLOT to ON.",
          expected: true,
          proof: "Chart plot activated — navigation table ready."
        },
        {
          type: "select", tool: "compass",
          title: "Reading the Compass",
          prompt: "You take a bearing on a lighthouse and read 045° on your compass. What direction is 045°?",
          options: [
            "South",
            "North-East",
            "West",
            "South-West"
          ],
          expected: "North-East",
          proof: "Compass bearing read correctly — 045° is North-East (between North 000° and East 090°)."
        },
        {
          type: "type", tool: "chart",
          title: "Calculate Magnetic Bearing",
          prompt: "Your true bearing to the waypoint is 090° and the local magnetic variation is 7° West. Using the rule 'west is best' (add west variation), type the magnetic bearing as a 3-digit number.",
          expected: "097",
          proof: "Magnetic bearing calculated: 090° + 7°W = 097°. (West variation is added — 'west is best, east is least'.)"
        },
        {
          type: "note", tool: "logbook",
          title: "Log the Navigation Plan",
          prompt: "Switch to the Log Book. Write a brief navigation log entry. Include the bearing '097' and the word 'waypoint'.",
          keywords: ["097", "waypoint"],
          proof: "Navigation plan logged — course 097° magnetic to waypoint."
        }
      ]
    },
    {
      id: "water_safety",
      order: 4,
      tag: "MODULE 04",
      icon: "🦺",
      title: "Water Safety & Survival",
      desc: "Wear the right PFD, understand capsize recovery, recognise hypothermia risk, and execute a man-overboard rescue.",
      xp: 100,
      brief: "You are at the safety gear station preparing for a water exercise. Your instructor needs you to confirm safety equipment, identify the correct PFD, and demonstrate man-overboard awareness. Safety is the highest priority at sea.",
      scene: "safetygear",
      chapters: [
        { title: "Personal Flotation", desc: "Select and fit the correct PFD." },
        { title: "Capsize Recovery", desc: "Understand how to recover from a capsize." },
        { title: "Hypothermia Risk", desc: "Recognise cold water danger." },
        { title: "Man Overboard", desc: "Execute the MOB rescue procedure." }
      ],
      tasks: [
        {
          type: "select", tool: "safety",
          title: "The Personal Flotation Device",
          prompt: "Before going afloat, what is the most important piece of safety equipment every cadet must wear?",
          options: [
            "A wool hat for warmth",
            "A properly fitted personal flotation device (PFD / lifejacket)",
            "A waterproof watch",
            "Sunglasses for glare"
          ],
          expected: "A properly fitted personal flotation device (PFD / lifejacket)",
          proof: "PFD confirmed — a properly fitted personal flotation device is mandatory before going afloat."
        },
        {
          type: "toggle", tool: "safety",
          title: "Confirm Safety Gear Check",
          prompt: "Before launching, all safety equipment must be checked — PFDs fitted, bailer aboard, painter secured. Toggle the SAFETY GEAR CHECK to confirm all items verified.",
          expected: true,
          proof: "Safety gear check complete — PFDs fitted, bailer aboard, painter secured."
        },
        {
          type: "select", tool: "safety",
          title: "Man Overboard Procedure",
          prompt: "A crew member falls overboard. What is the first and most critical action?",
          options: [
            "Sail away and come back later",
            "Shout 'man overboard', throw a buoyant aid, keep the person in sight, and steer to recover",
            "Remove your own PFD to swim faster",
            "Wait for the instructor to notice"
          ],
          expected: "Shout 'man overboard', throw a buoyant aid, keep the person in sight, and steer to recover",
          proof: "MOB procedure confirmed — shout, throw, keep sight, recover. Never lose visual contact."
        },
        {
          type: "note", tool: "logbook",
          title: "Log the Hypothermia Risk",
          prompt: "Switch to the Log Book. Write a short note on why cold water is dangerous. Include the keyword 'hypothermia' and 'heat' (or 'cold').",
          keywords: ["hypothermia", "heat"],
          altKeywords: ["hypothermia", "cold"],
          proof: "Hypothermia risk logged — cold water rapidly drains body heat, causing hypothermia."
        }
      ]
    },
    {
      id: "boat_handling",
      order: 5,
      tag: "MODULE 05",
      icon: "⛵",
      title: "Boat Handling & Helm",
      desc: "Take the helm, steer a steady course, come alongside a jetty, and learn the commands used to handle a small boat.",
      xp: 100,
      brief: "You are at the helm of a sailing dinghy underway in the harbour. Your coxswain needs you to steer a steady course, respond to helm commands correctly, and prepare to come alongside. Use the helm station and rigging tools.",
      scene: "helm",
      chapters: [
        { title: "Steering Commands", desc: "Respond to helm directions correctly." },
        { title: "Helm Orientation", desc: "Understand tiller and rudder action." },
        { title: "Coming Alongside", desc: "Approach a jetty safely under control." },
        { title: "Securing the Boat", desc: "Make fast alongside using correct lines." }
      ],
      tasks: [
        {
          type: "select", tool: "helm",
          title: "How the Tiller Works",
          prompt: "You are holding the tiller. To turn the boat to port (left), which way do you move the tiller?",
          options: [
            "Push the tiller to the left (toward port) — the boat turns to starboard",
            "Push the tiller to the right (toward starboard) — the boat turns to port",
            "Pull the tiller straight back — the boat stops",
            "The tiller does not steer the boat"
          ],
          expected: "Push the tiller to the right (toward starboard) — the boat turns to port",
          proof: "Helm action confirmed — the tiller works in reverse: push right to turn left (port), push left to turn right (starboard)."
        },
        {
          type: "slider", tool: "helm",
          title: "Set the Compass Course",
          prompt: "The coxswain orders a course of 180° (due south). Set the compass heading dial to match the ordered course.",
          expected: 180,
          tolerance: 2,
          proof: "Compass course set to 180° — steering due south as ordered."
        },
        {
          type: "select", tool: "rigging",
          title: "Coming Alongside",
          prompt: "You are approaching the jetty to come alongside. Which approach is correct for a sailing dinghy?",
          options: [
            "Approach at full speed and slam into the jetty",
            "Approach into the wind or current at controlled speed, ready to luff the sail to stop",
            "Approach downwind at maximum speed",
            "Drop all sails far away and drift in"
          ],
          expected: "Approach into the wind or current at controlled speed, ready to luff the sail to stop",
          proof: "Coming alongside confirmed — approach into wind/current at controlled speed, luff to stop."
        },
        {
          type: "note", tool: "logbook",
          title: "Log the Securing Lines",
          prompt: "Switch to the Log Book. Write a note on securing the boat alongside. Include the keyword 'painter' and 'jetty' (or 'berth').",
          keywords: ["painter", "jetty"],
          altKeywords: ["painter", "berth"],
          proof: "Securing logged — painter made fast to the jetty, boat secured alongside."
        }
      ]
    },
    {
      id: "naval_comms",
      order: 6,
      tag: "MODULE 06",
      icon: "📻",
      title: "Naval Communications",
      desc: "Learn naval terminology, boatswain's pipes, the phonetic alphabet, and semaphore — the voice and signal traditions of the sea.",
      xp: 100,
      brief: "You are at the communications desk. Your quartermaster wants you to learn the special language of the sea — naval terms, the boatswain's call, and the phonetic alphabet used for clear radio communication. Pay attention and respond correctly.",
      scene: "radio",
      chapters: [
        { title: "Naval Terminology", desc: "Learn the language used aboard ship." },
        { title: "The Boatswain's Pipe", desc: "Understand the Still, Carry On, and General Call." },
        { title: "Phonetic Alphabet", desc: "Use standard words for clear communication." },
        { title: "Semaphore Signals", desc: "Send messages with hand flags." }
      ],
      tasks: [
        {
          type: "select", tool: "radio",
          title: "Naval Terminology — 'Galley'",
          prompt: "Aboard ship, what does the naval term 'galley' refer to?",
          options: [
            "The ship's kitchen",
            "The toilet",
            "The ceiling",
            "The entrance ramp"
          ],
          expected: "The ship's kitchen",
          proof: "Naval term confirmed — the galley is the ship's kitchen. (The toilet is the 'head', the ceiling is the 'deckhead'.)"
        },
        {
          type: "select", tool: "radio",
          title: "The 'Still' Pipe",
          prompt: "The boatswain pipes the 'Still'. What is the correct response from the ship's company?",
          options: [
            "Continue working and talk normally",
            "Stop what you are doing, come to attention, and await instructions",
            "Go below decks immediately",
            "Start cheering"
          ],
          expected: "Stop what you are doing, come to attention, and await instructions",
          proof: "Still pipe confirmed — all hands stop, come to attention, and await instructions. 'Carry On' resumes normal activity."
        },
        {
          type: "type", tool: "radio",
          title: "Phonetic Alphabet — 'Bravo'",
          prompt: "Type the single letter that the NATO phonetic word 'Bravo' represents.",
          expected: "B",
          proof: "Phonetic alphabet confirmed — Bravo = B."
        },
        {
          type: "note", tool: "logbook",
          title: "Log the Semaphore Report",
          prompt: "Switch to the Log Book. Write a semaphore-style report. Include the word 'flags' and 'signal'.",
          keywords: ["flags", "signal"],
          proof: "Semaphore report logged — hand flags used to signal messages over short daylight distances."
        }
      ]
    },
    {
      id: "seamanship",
      order: 7,
      tag: "MODULE 07",
      icon: "⚓",
      title: "Seamanship Traditions",
      desc: "Coil and heave a line, read the ship's bell, tell time on the 24-hour clock, and belay a rope — the core skills of a seafarer.",
      xp: 100,
      brief: "You are on the seamanship deck for the final phase of your training. Your boatswain will test your line-handling, your knowledge of the ship's bell, and the 24-hour clock used throughout the navy. Demonstrate your seamanship to complete Phase 1.",
      scene: "rigging",
      chapters: [
        { title: "Coiling a Line", desc: "Coil a line for storage and clean throwing." },
        { title: "The Ship's Bell", desc: "Read the bell to tell the watch time." },
        { title: "24-Hour Clock", desc: "Convert conventional time to naval time." },
        { title: "Belaying a Rope", desc: "Make a line fast to a cleat or bollard." }
      ],
      tasks: [
        {
          type: "select", tool: "rigging",
          title: "Why Coil a Line?",
          prompt: "Your boatswain asks why it is important to coil a line properly. Which is the best reason?",
          options: [
            "It looks tidy for inspection only",
            "It ensures ease of use, keeps the line from tangling, and allows it to feed smoothly and be tossed cleanly",
            "Coiling is optional and has no practical purpose",
            "It makes the line longer"
          ],
          expected: "It ensures ease of use, keeps the line from tangling, and allows it to feed smoothly and be tossed cleanly",
          proof: "Coiling purpose confirmed — proper storage, no tangles, smooth feeding, clean tossing."
        },
        {
          type: "type", tool: "logbook",
          title: "Read the 24-Hour Clock",
          prompt: "The duty watch schedule lists a task at 1900 hours. Type the conventional (12-hour) time it represents, including 'pm' (e.g. '7:00 pm').",
          expected: "7:00 PM",
          proof: "24-hour clock read correctly — 1900 hours = 7:00 pm (19 minus 12 = 7)."
        },
        {
          type: "select", tool: "rigging",
          title: "What Does 'Belay' Mean?",
          prompt: "The order 'belay that line' is given. What does 'belay' mean in naval terms?",
          options: [
            "To throw the line overboard",
            "To make fast a rope, or to cancel an order",
            "To cut the line in half",
            "To let the line run freely"
          ],
          expected: "To make fast a rope, or to cancel an order",
          proof: "Belay confirmed — to make a rope fast (secure it), or to cancel/stop an order."
        },
        {
          type: "note", tool: "logbook",
          title: "Log the Ship's Bell",
          prompt: "Switch to the Log Book. Write a short note on the ship's bell tradition. Include the keyword 'watch' and 'bells' (or 'time').",
          keywords: ["watch", "bells"],
          altKeywords: ["watch", "time"],
          proof: "Ship's bell logged — the bell marks the passing of time and the changing of the watches."
        }
      ]
    }
  ];

  // ==========================================================
  // LEARN LIBRARY ARTICLES (from Phase 1 Sea Cadet Handbook)
  // ==========================================================
  // NAVAL TERMINOLOGY — from EO M123.01 (A-CR-CCP-601/PF-001 Chapter 12)
  const NAVAL_TERMS = [
    { term: "Gash / gash can", def: "Garbage or a garbage can." },
    { term: "Stand easy", def: "A break." },
    { term: "Secure", def: "To close up, put away gear." },
    { term: "Head(s)", def: "Toilet(s)." },
    { term: "Duty watch", def: "A division selected on a rotational basis responsible for corps preparation and cleanup." },
    { term: "Out pipes", def: "The commencement of classes or the end of stand easy." },
    { term: "Scran locker", def: "Lost and found." },
    { term: "Pipe", def: "Sound produced from a boatswain's call. The notes played have a specific meaning or message." },
    { term: "Colours", def: "The ceremony of hoisting the national colours, usually in the morning or at the beginning of the training day." },
    { term: "Liberty boat", def: "When all personnel are dismissed for the day and may go ashore." },
    { term: "Bulkhead", def: "A wall." },
    { term: "Deckhead", def: "The ceiling of a ship." },
    { term: "Deck", def: "A floor." },
    { term: "Ship's company", def: "The complement of a ship (includes a sea cadet corps)." },
    { term: "Sunset", def: "The ceremony of lowering the national colours at the end of the training day." },
    { term: "Gangway", def: "Any recognized entrance, passageway, or traffic route within a ship." },
    { term: "Galley", def: "The ship's kitchen." },
    { term: "Boatswain's stores", def: "A storeroom for cleaning gear." },
    { term: "Pipe down", def: "An order meaning to keep quiet." },
    { term: "Kye", def: "A hot chocolate drink or snack." },
    { term: "Coxswain", def: "The senior petty officer on a ship / most senior cadet position." },
    { term: "Belay", def: "To make fast a rope, or to cancel an order." },
    { term: "Aye Aye, Sir / Ma'am", def: "Order understood and will obey — an appropriate response to an order from an officer." },
    { term: "Port", def: "Left side of the ship." },
    { term: "Starboard", def: "Right side of the ship." },
    { term: "Ship's office", def: "Administration office." },
    { term: "Brow", def: "Entrance / exit of ship where personnel must salute as they come aboard or go ashore." },
    { term: "Ship's Log", def: "A logbook that keeps track of the ship's routine." },
    { term: "Quartermaster", def: "At sea, the helmsman. In harbour, the senior member of the gangway staff responsible for supervising the boatswain's mate and the security of the brow." }
  ];

  // PIPES — from EO M123.02 (A-CR-CCP-601/PF-001 Chapter 12)
  const PIPES = [
    { name: "General Call", icon: "\ud83d\udce2", sound: "Quick low-to-high note (1 sec), short pause, then low note followed by 3-sec high note back to low. Total: 4 seconds.", purpose: "Used to gain the attention of the ship's company before passing an order.", response: "Come to attention and listen for the order." },
    { name: "Still", icon: "\ud83d\uded1", sound: "An eight-second high note. Simple but difficult to maintain breath for the full duration.", purpose: "Pipes all hands to attention as a mark of respect, to order silence on occasions such as rounds, colours and sunset, or to stop all work to prevent an accident.", response: "Stand at attention, remain silent, and do not move until the next pipe." },
    { name: "Carry On", icon: "\u2705", sound: "Half a second high note followed by a two-second low note.", purpose: "Piped after the reason for the Still is completed.", response: "Return to previous duties and carry on." }
  ];

  // KNOTS — from EO M121.01 (A-CR-CCP-601/PF-001 Chapter 11)
  const KNOTS_DATA = [
    { name: "Reef Knot", icon: "\u25a6", type: "Knot", use: "Join two lines of equal diameter, or tie off two ends of a line around an object (parcels, sails).", steps: ["Put the left hand working end on top of the right hand working end.", "Bring the left hand working end under the right hand working end.", "Put the working end now on the right on top of the working end now on the left.", "Bring the working end on top over and under the other so the working end comes out of the same space through which it entered."] },
    { name: "Figure of Eight", icon: "8", type: "Stopper Knot", use: "Prevent the ends of sheets of sails from pulling through blocks, eyebolts or fairleads.", steps: ["Hold the standing end in one hand, make a crossing turn with the working end passing under the standing part.", "Bring the working end over the standing part.", "Tuck the working end up through the loop from behind, forming a figure eight.", "Pull tight on the working part."] },
    { name: "Sheet Bend", icon: "\u22b3", type: "Bend", use: "Join two lines of unequal diameter. The smaller line is made fast to the bight of the larger one.", steps: ["Fold an end of the larger line back on itself to form a bight.", "Bring the working end up to form a loop at the bottom, make the loop the required size.", "Take the working end of the smaller line around behind both pieces of the first line.", "Tuck the working end of the smaller line under itself and pull tight."] },
    { name: "Bowline", icon: "\u25ef", type: "Knot", use: "The most useful knot for putting a temporary eye in a line. Can be used as a lifeline around a person's waist.", steps: ["With the standing end in one hand, form a small bight with the working end and lay it over the standing end.", "Bring the working end up to form a loop at the bottom, make the loop the required size.", "Bring the working end up through the bight and around the standing end.", "Bring the working end down through the bight.", "Hold the two sides of the loop and the working end in one hand, the standing end in the other, and pull in opposite directions."] },
    { name: "Clove Hitch", icon: "\u2229", type: "Hitch", use: "Secure a line temporarily to a post or spar, such as securing a small sailboat.", steps: ["With the running end, make a turn around a spar.", "To the left of the first turn, make another turn.", "Pass the running end between the two turns, so it comes up in the opposite direction from the standing part."] },
    { name: "Round Turn & Two Half Hitches", icon: "\u21c2", type: "Hitch", use: "Secure a sailboat to a post or ring. Will never jam and can be untied quickly.", steps: ["Bring the working end around the post or ring two turns, making a full round turn.", "Take the working end around the standing end and tuck it behind itself.", "Bring the working end around the standing end again and tuck to make a second half hitch.", "Pull tight to finish the knot."] }
  ];

  const LEARN_ARTICLES = [
    // === SAILING ===
    { id: "l_points_sail", cat: "Sailing", icon: "\u26f5", title: "Points of Sail", desc: "Close-hauled, beam reach, broad reach, and running — how wind direction sets your course.", xp: 15,
      body: [
        { h: "What Are the Points of Sail?", p: "The points of sail describe the angles at which a sailboat can travel relative to the wind direction. No sailboat can sail directly into the wind — there is a 'no-go zone' of about 45 degrees on either side of the wind direction. The boat must instead sail a zigzag course called tacking to make progress upwind. Understanding these angles is the foundation of all sailing." },
        { h: "The Four Main Points", p: "Close-hauled is sailing as close to the wind as possible, at roughly 45 degrees off the wind direction. Beam reach is sailing with the wind coming directly from the side (abeam), at 90 degrees — this is often the fastest point of sail. Broad reach is sailing with the wind coming from behind and to the side, at about 135 degrees. Running is sailing directly downwind, with the wind pushing from directly behind the boat." }
      ],
      callout: { label: "Key Concept", text: "The 'no-go zone' is the area pointing directly into the wind (about 45\u00b0 either side). A sailboat cannot sail in this zone — it will stop and the sails will flap. You must tack (zigzag) to make upwind progress." },
      iconGrid: [
        { icon: "\u2b06\ufe0f", label: "Close-Hauled", desc: "45\u00b0 to the wind — tightest angle upwind" },
        { icon: "\u2b05\ufe0f", label: "Beam Reach", desc: "90\u00b0 — wind from the side, fastest point" },
        { icon: "\u2199\ufe0f", label: "Broad Reach", desc: "135\u00b0 — wind from behind and to the side" },
        { icon: "\u2b07\ufe0f", label: "Running", desc: "180\u00b0 — wind directly behind, dead downwind" }
      ]
    },
    { id: "l_port_starboard", cat: "Sailing", icon: "\ud83d\udea5", title: "Port & Starboard", desc: "Why left and right at sea are permanent — and the red and green colour code.", xp: 15,
      body: [
        { h: "Why Not Just Left and Right?", p: "On land, left and right depend on which way you are facing. At sea, a vessel has a fixed orientation — the bow (front) and stern (back) are always the same regardless of where you stand on the ship. Port is the left side of the vessel when facing forward (toward the bow). Starboard is the right side when facing forward. These terms never change — port is always port, starboard is always starboard, no matter which way you turn on the boat." },
        { h: "The Colour Code", p: "To help identify port and starboard in the dark or at a distance, vessels use a standard colour code. Port is marked with a red navigation light. Starboard is marked with a green navigation light. This allows mariners to determine another vessel's heading at night and avoid collisions. The mnemonic 'Is there any RED PORT left?' helps remember that port is red (like port wine)." }
      ],
      tip: { label: "Memory Aid", text: "Think 'PORT' and 'LEFT' both have four letters. Port = Left. Starboard = Right. Red light = Port. Green light = Starboard." },
      iconGrid: [
        { icon: "\ud83d\udd34", label: "Port (Left)", desc: "Red navigation light — four letters like 'left'" },
        { icon: "\ud83d\udfe2", label: "Starboard (Right)", desc: "Green navigation light — right side facing forward" }
      ]
    },
    { id: "l_tack_gybe", cat: "Sailing", icon: "\ud83d\udd04", title: "Tacking and Gybing", desc: "The two manoeuvres for changing direction — and why gybing demands extra care.", xp: 15,
      body: [
        { h: "Tacking — Turning Through the Wind", p: "Tacking is the manoeuvre of turning the bow (front) of the boat through the wind, causing the sail to cross from one side to the other. This is how you change direction when sailing upwind or across the wind. The boat turns into the wind, the sail briefly flaps as it crosses the no-go zone, and then fills on the opposite side. Tacking is generally a controlled, safe manoeuvre." },
        { h: "Gybing — Turning Away from the Wind", p: "Gybing is the manoeuvre of turning the stern (back) of the boat through the wind when sailing downwind. The sail swings from one side to the other — but because the wind is behind you, the sail can swing rapidly and with great force. An uncontrolled gybe (accidental gybe) can be dangerous: the boom can swing across the cockpit with enough force to injure crew or damage the rig. Always maintain control of the mainsheet during a gybe." }
      ],
      warning: { label: "Safety Alert", text: "An accidental gybe is one of the most dangerous events in small-boat sailing. The boom swings across with full force. Always warn the crew ('Gybe-ho!'), keep the mainsheet controlled, and never let the boom swing free. Wear a helmet in strong winds." },
      table: { headers: ["Manoeuvre", "Turns Through", "Risk Level", "When Used"], rows: [["Tacking", "Bow through wind", "Low — controlled", "Sailing upwind or across wind"], ["Gybing", "Stern through wind", "High — boom swings hard", "Sailing downwind"]] }
    },
    { id: "l_cansail", cat: "Sailing", icon: "\ud83c\udfc5", title: "CANSail Level 1", desc: "The Sail Canada checklist that frames your first sailing weekend — helm and crew skills.", xp: 15,
      body: [
        { h: "What is CANSail?", p: "CANSail is the national sailing training program developed by Sail Canada (formerly the Canadian Yachting Association). It provides a structured progression of sailing skills from beginner to advanced. Sea cadets work toward CANSail Level 1 as part of PO X24 — Sail a Sailboat IAW Sail Canada CANSail Level 1. The program emphasizes hands-on, on-the-water experience." },
        { h: "Helm and Crew Roles", p: "In a two-person dinghy, there are two roles. The helm (also called the skipper) steers the boat using the tiller and controls the mainsail. The crew manages the jib (front sail), watches for wind shifts, trims the sail, and assists with manoeuvres. Both roles are essential — successful sailing is a team effort. Cadets rotate between helm and crew to learn both positions." },
        { h: "Preparing for Your Sail Weekend", p: "Before going on the water, cadets must prepare properly. This includes checking the weather forecast, wearing appropriate clothing for the conditions (layers for warmth, a waterproof outer layer), wearing a properly fitted PFD (Personal Flotation Device) at all times on the water, and understanding the basic commands and procedures. Footwear must be closed-toe and non-slip — no sandals or bare feet on the dock or in the boat." }
      ],
      callout: { label: "CANSail Standard", text: "PO X24 requires cadets to sail a sailboat in accordance with Sail Canada CANSail Level 1 standards. This includes preparing for a sail weekend, understanding helm and crew roles, proper clothing and footwear, and PFD requirements." },
      tip: { label: "Preparation Checklist", text: "Before your sail weekend: check the weather, dress in layers, bring a waterproof jacket, ensure your PFD fits snugly, wear closed-toe non-slip shoes, bring sunscreen and a water bottle, and review the basic sailing commands." }
    },
    // === ROPEWORK ===
    { id: "l_rope_parts", cat: "Ropework", icon: "\ud83e\udea2", title: "Parts of a Rope", desc: "Bight, standing end, working end, standing part — the vocabulary of ropework.", xp: 15,
      body: [
        { h: "The Language of Ropework", p: "Before learning to tie knots, every cadet must know the parts of a rope. These terms are used in every knot-tying instruction, and knowing them allows you to follow demonstrations and teach others. The Royal Canadian Sea Cadets Phase One instructional guide defines five key terms that form the foundation of all ropework." },
        { h: "The Five Terms", p: "The bight is any curved section, slack part, or loop between the ends of a rope. The standing end is the end of the rope not involved in making the knot — it is the 'inactive' end. The standing part is the section of line between the knot and the standing end. The working end is the active end of a line used in making the knot. The working part is the section of line between the knot and the working end." }
      ],
      iconGrid: [
        { icon: "\u27bf", label: "Bight", desc: "Curved section, slack part, or loop between the ends" },
        { icon: "\u27a1\ufe0f", label: "Working End", desc: "The active end used in making the knot" },
        { icon: "\u2b05\ufe0f", label: "Standing End", desc: "The end not involved in making the knot" },
        { icon: "\ud83d\udccf", label: "Working/Standing Part", desc: "Section between the knot and the respective end" }
      ],
      tip: { label: "Pro Tip", text: "When learning a new knot, always identify the working end and standing end first. This makes following step-by-step instructions much easier." }
    },
    { id: "l_reef_knot", cat: "Ropework", icon: "\u25a6", title: "The Reef Knot", desc: "Left over right, right over left — joining two ropes of equal thickness securely.", xp: 15,
      body: [
        { h: "The Reef Knot", p: "The reef knot (also called a square knot) is commonly used to tie two lines of equal diameter together, or to tie off the two ends of a line around an object such as a parcel or sail. It got its name from being the knot used to tie up or reduce the reefs or panels of sails. It is one of the first knots every sea cadet must master as part of EO M121.01." },
        { h: "How to Tie It", p: "The reef knot is tied by crossing the ends in opposite directions each time they are knotted. The mnemonic is 'left over right, then right over left' (or vice versa). If you cross the same direction both times, you get a 'granny knot' which is insecure and can slip. The finished reef knot has two interlocking loops that lie flat." }
      ],
      steps: ["Put the left hand working end of the line on top of the right hand working end.", "Bring the left hand working end of the line under the right hand working end.", "Put the working end that is now on the right on top of the working end that is now on the left.", "Bring the working end that is on top over and then under the other working end so that the working end in the left hand comes out of the same space through which it entered the knot."],
      warning: { label: "Common Mistake", text: "If you cross the same direction both times (left over right, then left over right again), you get a 'granny knot' — it looks similar but is insecure and will slip. Always cross in opposite directions: left over right, then right over left." }
    },
    { id: "l_bowline", cat: "Ropework", icon: "\u25ef", title: "The Bowline", desc: "The king of knots — a fixed loop that never slips and is easy to untie.", xp: 15,
      body: [
        { h: "The Most Useful Knot", p: "The bowline is the most useful knot for putting a temporary eye (loop) in a line. It can also be used as a lifeline around a person's waist. The bowline is valued because it forms a secure loop that does not slip under load, yet is easy to untie even after being under heavy strain. It is one of the six mandatory knots in EO M121.01." },
        { h: "The RCN Standard", p: "The Royal Canadian Navy encourages every member of a ship's company to be able to tie a bowline around their waist with their eyes closed, and to be able to do it quickly in the dark or under adverse conditions. This is because the bowline may be needed as a rescue knot in an emergency when visibility is poor and speed is critical." }
      ],
      steps: ["With the standing end in one hand, form a small bight with the working end of the line, and lay it over the top of the standing end.", "Bring the working end of the line up to form a loop at the bottom, and make the resulting loop the required size.", "Bring the working end up through the bight and around the standing end.", "Bring the working end down through the bight.", "Hold the two sides of the loop and the working end in one hand, while the other hand holds the standing end of the line, and pull in opposite directions."],
      callout: { label: "RCN Challenge", text: "Every RCN sailor must tie a bowline around their waist with eyes closed, quickly, in the dark or under adverse conditions. Practice until you can do it without looking!" },
      tip: { label: "Memory Story", text: "Think of the bowline as a rabbit coming out of its hole (the bight), going around the tree (the standing end), and going back down into its hole. 'The rabbit comes out of the hole, around the tree, and back down the hole.'" }
    },
    { id: "l_whipping", cat: "Ropework", icon: "\u2702\ufe0f", title: "Whipping a Line", desc: "Common, West Country, and Sailmaker's whippings — preventing a line from fraying.", xp: 15,
      body: [
        { h: "What is Whipping?", p: "Whipping is the process of binding the end of a rope to prevent it from fraying or unravelling. A whip is made by wrapping twine tightly around the end of the line. Without whipping, the end of a natural fibre line will gradually separate and fray, making the line difficult to use and shortening its life. EO M121.02 teaches the common whipping, while complementary EOs teach the West Country and sailmaker's whippings." },
        { h: "Types of Whipping", p: "The common whipping is the simplest — twine is wrapped around the end of the line in a series of tight turns. The West Country whipping uses a slightly different technique with two pieces of twine tied in a series of half hitches. The sailmaker's whipping is the most durable and professional — it involves threading the twine through the strands of the rope with a needle, creating a whipping that will not come off even under hard use." }
      ],
      callout: { label: "Curriculum Reference", text: "EO M121.02 (mandatory) teaches the common whipping. EO C121.01 (complementary) teaches the West Country whipping. EO C121.02 (complementary) teaches the sailmaker's whipping." },
      tip: { label: "Why It Matters", text: "A properly whipped line lasts longer, is easier to handle, and looks professional. A frayed line is difficult to pass through blocks and fairleads, and can cause injury from loose fibres." }
    },
    { id: "l_knots_all", cat: "Ropework", icon: "\ud83d\udccb", title: "All Six Mandatory Knots", desc: "Reef knot, figure eight, sheet bend, bowline, clove hitch, round turn & two half hitches.", xp: 20,
      body: [
        { h: "EO M121.01 — Tie Knots, Bends and Hitches", p: "By the end of this lesson, a Phase One sea cadet shall have tied and know where to use six essential knots, bends, and hitches: the reef knot, figure of eight, sheet bend, bowline, clove hitch, and round turn and two half hitches. Each serves a specific purpose, and knowing when to use each one is as important as knowing how to tie it." },
        { h: "Knots vs Bends vs Hitches", p: "A knot is tied at the end of a line or using the line itself — the term is applied to anything that is not a bend, splice, or hitch. A bend is used to join two lines together temporarily, characterized by making a bend in one of the lines. A hitch is tied around or to something such as a ring, spar, or post — they are generally quick to tie and easy to untie." }
      ],
      table: { headers: ["Name", "Type", "Primary Use"], rows: KNOTS_DATA.map(k => [k.icon + " " + k.name, k.type, k.use]) }
    },
    { id: "l_coil_heave", cat: "Ropework", icon: "\ud83c\udfaf", title: "Coil and Heave a Line", desc: "Coiling for storage and heaving a line to a jetty or another boat.", xp: 15,
      body: [
        { h: "Coiling a Line", p: "Coiling a line is a traditional way of completing line-handling tasks in the navy, as well as being an important skill for safety and organization. A properly coiled line is ready for immediate use, will not tangle, and can be deployed quickly. The coil should be made in the natural direction of the line's lay, with each loop roughly the same size, and secured with a final locking turn." },
        { h: "Heaving a Line", p: "A heaving line is a lightweight, flexible line used to throw to a jetty or another boat, or to transfer equipment or personnel between ships. It must have a heaving knot or weighted device at the end to give it mass for throwing. The technique involves coiling the line in one hand, swinging the weighted end, and releasing at the right moment to send the line to the target." }
      ],
      callout: { label: "Heaving Line Characteristics", text: "A heaving line is lightweight and flexible to facilitate throwing. It must have a heaving knot or weighted device at the end. It is used to throw a line to a jetty or another boat, or to transfer equipment or personnel between ships." },
      tip: { label: "Throwing Technique", text: "Coil most of the line in your throwing hand, leaving a few coils in the other. Swing the weighted end in a smooth underhand or side-arm motion. Aim slightly above the target. Release at the right moment and let the remaining coils pay out smoothly." }
    },
    // === NAVIGATION ===
    { id: "l_chart_reading", cat: "Navigation", icon: "\ud83d\uddfa\ufe0f", title: "Reading a Nautical Chart", desc: "Depths, hazards, landmarks, and symbols — the mariner's map of the sea.", xp: 15,
      body: [
        { h: "The Mariner's Map", p: "A nautical chart is a specialized map designed for safe navigation on water. Unlike a land map, a nautical chart shows the underwater world: depths (soundings), the shape of the seabed, hazards like rocks and wrecks, and the locations of navigational aids such as buoys and lighthouses. Reading a chart is an essential skill for any mariner, from the smallest dinghy to the largest warship." },
        { h: "Key Features", p: "Depths are shown as numbers (soundings) in metres or fathoms, and as contour lines connecting points of equal depth. Hazards such as rocks are marked with specific symbols — a plus sign with dots indicates a dangerous rock. Buoys are shown with their colour, shape, and light characteristic. Land features that are useful for navigation, such as prominent hills, towers, and landmarks, are also marked." }
      ],
      callout: { label: "Chart Datum", text: "Depths on a chart are measured from a reference level called chart datum, which is usually the lowest normal tide level. The actual water depth at any given time may be greater due to tide." },
      tip: { label: "Colour Code", text: "On Canadian charts, shallow water is often shown in blue, land in green or brown, and deep water in white. Rocks that cover and uncover with the tide are shown in green; rocks that are always submerged are shown in blue." }
    },
    { id: "l_compass", cat: "Navigation", icon: "\ud83e\udded", title: "The Marine Compass", desc: "360 degrees of direction — taking bearings and steering a course.", xp: 15,
      body: [
        { h: "How a Compass Works", p: "A marine compass uses a magnetized needle or card that aligns itself with the Earth's magnetic field, always pointing toward magnetic north. The compass card is marked with 360 degrees, with the four cardinal directions at 0\u00b0 (North), 90\u00b0 (East), 180\u00b0 (South), and 270\u00b0 (West). The compass allows a helmsman to steer a specific course and a navigator to take bearings on landmarks." },
        { h: "Taking a Bearing", p: "A bearing is the direction from your position to an object, measured in degrees from north. By taking bearings on two or more known landmarks and plotting them on a chart, a navigator can determine the vessel's position — this is called a position fix. The compass is one of the oldest and most reliable navigation tools, requiring no electricity or satellites." }
      ],
      iconGrid: [
        { icon: "\u2b06\ufe0f", label: "North", desc: "0\u00b0 / 360\u00b0" },
        { icon: "\u27a1\ufe0f", label: "East", desc: "90\u00b0" },
        { icon: "\u2b07\ufe0f", label: "South", desc: "180\u00b0" },
        { icon: "\u2b05\ufe0f", label: "West", desc: "270\u00b0" }
      ]
    },
    { id: "l_mag_var", cat: "Navigation", icon: "\ud83e\uddf2", title: "Magnetic Variation at Sea", desc: "True north vs magnetic north — 'west is best, east is least'.", xp: 15,
      body: [
        { h: "Two Norths", p: "There are two different 'norths' that a navigator must understand. True north is the geographic North Pole — the top of the Earth's axis. Magnetic north is the point where the Earth's magnetic field points downward — and it is not in the same place as true north. The difference between the direction to true north and the direction to magnetic north is called magnetic variation, and it changes depending on where you are on the Earth." },
        { h: "Converting Between True and Magnetic", p: "When a compass reading (magnetic) needs to be converted to a true bearing for chart work, the variation must be applied. The mnemonic 'west is best, east is least' helps: if variation is west, add it to the magnetic bearing to get true. If variation is east, subtract it. For example, if your compass reads 045\u00b0 and variation is 10\u00b0W, the true bearing is 055\u00b0 (045 + 10)." }
      ],
      callout: { label: "Mnemonic", text: "West is Best (add), East is Least (subtract). When converting from magnetic to true: add west variation, subtract east variation." },
      tip: { label: "Where to Find Variation", text: "Magnetic variation is printed on nautical charts, usually in the compass rose. It also includes the annual rate of change, so you can calculate the current variation for your area." }
    },
    // === WATER SAFETY ===
    { id: "l_pfd", cat: "Water Safety", icon: "\ud83e\uddba", title: "Personal Flotation Devices", desc: "Why a fitted PFD is non-negotiable — buoyancy, types, and correct fitting.", xp: 15,
      body: [
        { h: "The Most Important Safety Gear", p: "A Personal Flotation Device (PFD) is the single most important piece of safety equipment for any activity on the water. A PFD provides buoyancy that keeps a person afloat if they enter the water. In Canada, it is legally required that every person on a vessel has a properly fitted, Transport Canada-approved PFD. For sea cadets participating in sailing (PO X24), wearing a PFD at all times on the water is non-negotiable." },
        { h: "Proper Fit", p: "A PFD only works if it fits correctly. A PFD that is too large can ride up over the wearer's head in the water, while one that is too small may not provide enough buoyancy. To check fit, fasten all straps and buckles, then have someone pull up on the shoulder straps — the PFD should not ride up past the ears. The PFD should be snug but allow full range of motion for sailing." }
      ],
      warning: { label: "Critical Safety", text: "A PFD must be worn — not just carried on the boat. In an emergency, there is no time to find and put on a PFD. It must be on your body before you leave the dock. This is a mandatory requirement for all sea cadet on-water activities." },
      tip: { label: "Fit Test", text: "Fasten all straps and buckles. Have someone pull up firmly on the shoulder straps. If the PFD rides up past your ears, it is too large. Get a smaller size." }
    },
    { id: "l_capsize", cat: "Water Safety", icon: "\ud83c\udf0a", title: "Capsize Recovery", desc: "What to do when the boat flips — staying with the boat and righting it.", xp: 15,
      body: [
        { h: "Capsizing is Normal", p: "In small sailing dinghies, capsizing (the boat tipping over) is a normal part of learning to sail. It happens to every sailor, including Olympic champions. The key is knowing how to recover calmly and safely. Panic is the greatest danger — a systematic, practiced recovery is straightforward." },
        { h: "The Recovery Sequence", p: "First, check that all crew are accounted for and okay — stay with the boat. The boat will not sink; it floats even when capsized. Swim to the centreboard (daggerboard), which is now sticking out horizontally from the hull. Pull down on the centreboard to right the boat. As the boat comes upright, climb back in over the side. Bail out any water and resume sailing." }
      ],
      warning: { label: "Golden Rule", text: "ALWAYS stay with the boat. A capsized dinghy floats and is visible to rescuers. Swimming away from the boat to try to reach shore is extremely dangerous — the boat is your best life raft." },
      steps: ["Check that all crew are safe and accounted for — stay calm.", "Stay with the boat — do not swim away from it.", "Swim to the centreboard (daggerboard) sticking out from the hull.", "Pull down on the centreboard to lever the boat upright.", "As the boat comes up, climb back in over the side.", "Bail out water and check for any damage before resuming."]
    },
    { id: "l_hypothermia", cat: "Water Safety", icon: "\ud83e\udd76", title: "Hypothermia & Cold Water", desc: "How cold water drains body heat and what to do to prevent and recognise it.", xp: 15,
      body: [
        { h: "The Canadian Context", p: "In Canada, cold water is a year-round hazard. Even in summer, many Canadian waters are cold enough to cause hypothermia. Cold water drains body heat 25 times faster than cold air. A person in cold water can become incapacitated within minutes and unconscious within 30 minutes, depending on the temperature. Understanding hypothermia is critical for all sea cadets." },
        { h: "Recognising Hypothermia", p: "Early signs include shivering, cold and pale skin, and loss of fine motor control (clumsiness). As it progresses, shivering may stop (a dangerous sign), the person becomes confused or drowsy, speech becomes slurred, and eventually the person loses consciousness. Severe hypothermia is a medical emergency." }
      ],
      warning: { label: "1-10-1 Rule", text: "In cold water: 1 minute to control your breathing (cold shock), 10 minutes of meaningful movement before muscles fail, 1 hour before hypothermia causes unconsciousness. Use your first 10 minutes to self-rescue or get out of the water." },
      tip: { label: "Prevention", text: "Wear a PFD (it keeps you afloat without expending energy), dress in layers including a dry suit or wetsuit if water is very cold, carry emergency signalling equipment, and never go out alone in cold conditions." }
    },
    { id: "l_mob", cat: "Water Safety", icon: "\ud83c\udd98", title: "Man Overboard Drill", desc: "Shout, throw, point, recover — the critical sequence for saving a person in the water.", xp: 15,
      body: [
        { h: "Every Second Counts", p: "A person falling overboard is one of the most serious emergencies at sea. The response must be immediate, practiced, and systematic. The crew must act as a team — one person keeps visual contact with the person in the water at all times, never looking away, because a head in the water is very hard to see from a moving boat." },
        { h: "The Recovery Sequence", p: "The moment someone goes overboard, shout 'Man overboard!' loudly. Throw a lifebuoy or flotation device toward the person immediately. Designate one crew member to point continuously at the person in the water — they must not look away. Turn the boat to approach the person from downwind (so the boat does not blow onto them). Approach slowly, bring the person aboard on the windward side, and provide first aid for hypothermia." }
      ],
      steps: ["SHOUT 'Man overboard!' to alert the entire crew.", "THROW a lifebuoy or flotation device toward the person.", "POINT — one crew member keeps eyes on the person at all times, never looking away.", "TURN the boat to approach from downwind.", "APPROACH slowly and bring the person aboard on the windward side.", "CARE — provide first aid, especially for cold water exposure and hypothermia."],
      warning: { label: "Critical", text: "One crew member must keep their eyes on the person in the water at ALL times. A head in the water is nearly impossible to find again if you lose sight of it. This person's only job is to point and watch." }
    },
    // === NAVAL COMMS ===
    { id: "l_naval_terms", cat: "Naval Comms", icon: "\ud83d\udde3\ufe0f", title: "Naval Terminology", desc: "Galley, head, bulkhead, brow, belay, aye aye — the language of the sea.", xp: 15,
      body: [
        { h: "The Language of the Sea", p: "One of the most pervasive of naval customs is the use of a special language, commonly known as naval terminology. When aboard ship, naval terminology is used by the crew to communicate everything from common items found aboard ship to duties the crew are required to perform. At a sea cadet corps, naval terminology is used to acquaint cadets with terms still in use by the Royal Canadian Navy, and to simulate being aboard ship — the building where training is carried out is referred to as the 'ship', reinforcing a naval environment." },
        { h: "Essential Terms", p: "There are 29 essential naval terms that every Phase One sea cadet must know. These range from everyday objects (galley = kitchen, head = toilet, bulkhead = wall, deck = floor) to commands and responses (aye aye = order understood, belay = make fast or cancel, pipe down = keep quiet). Learning these terms is part of EO M123.01." }
      ],
      callout: { label: "EO M123.01", text: "By the end of this lesson, cadets shall have defined basic naval terminology and recognized the importance of this terminology as a naval custom. The training includes Jargon Jeopardy and Term-inator activities to reinforce learning." },
      table: { headers: ["Term", "Definition"], rows: NAVAL_TERMS.slice(0, 15).map(t => [t.term, t.def]) }
    },
    { id: "l_naval_terms2", cat: "Naval Comms", icon: "\ud83d\udccb", title: "More Naval Terminology", desc: "The complete reference list of all 29 essential naval terms.", xp: 15,
      body: [
        { h: "Complete Reference List", p: "This article contains the full list of naval terminology from EO M123.01. Use it as a reference and study aid. The terms are organized as a complete table for easy review. Try the Jargon Jeopardy game in the Bridge section to test your knowledge!" }
      ],
      table: { headers: ["Term", "Definition"], rows: NAVAL_TERMS.slice(15).map(t => [t.term, t.def]) },
      tip: { label: "Study Tip", text: "Try the 'Jargon Jeopardy' activity: one person reads a definition, and the others must name the naval term. This interactive method from the curriculum guide is an effective way to memorize the terminology." }
    },
    { id: "l_pipes", cat: "Naval Comms", icon: "\ud83d\udce3", title: "The Boatswain's Call", desc: "General Call, Still, and Carry On — pipes that command the ship's company.", xp: 15,
      body: [
        { h: "What is a Pipe?", p: "A pipe is a sound produced from a boatswain's call (also called a bosun's pipe or whistle). The notes played have a specific meaning or message. Pipes have been used for many years aboard naval ships and are still currently in use to gain the attention of a ship's crew or to pass on instructions. Pipes are routinely used at the corps during Colours and Sunset ceremonies, as well as for relaying orders." },
        { h: "High and Low Notes", p: "Pipes from a boatswain's call are made up of high notes and low notes. A high note is achieved by the piper cupping their fingers around the hole and blowing air into the mouthpiece. A low note is achieved by the piper allowing air to flow freely through the hole. Combinations of these low and high notes at different time intervals and pauses make up different pipes, each with specific meanings and required responses." }
      ],
      table: { headers: ["Pipe", "Sound", "Purpose", "Response"], rows: PIPES.map(p => [p.icon + " " + p.name, p.sound, p.purpose, p.response]) },
      callout: { label: "EO M123.02", text: "By the end of this lesson, cadets shall have identified the different pipes and how to respond to each. The three pipes are: General Call, Still, and Carry On." }
    },
    { id: "l_24hour", cat: "Naval Comms", icon: "\ud83d\udd50", title: "The 24-Hour Clock", desc: "How the navy tells time — add 12 for pm, no ambiguity between day and night.", xp: 15,
      body: [
        { h: "Why the 24-Hour Clock?", p: "The navy and military use the 24-hour clock to eliminate any ambiguity between morning and afternoon. In the 12-hour civilian system, '8:00' could mean morning or evening, requiring 'AM' or 'PM' to clarify. In the 24-hour system, 0800 is always morning and 2000 is always evening — there is no confusion. This is critical for shipboard operations where timing is exact and errors can be dangerous." },
        { h: "Converting to 24-Hour Time", p: "For hours from midnight to noon (AM), the 24-hour time is the same as the 12-hour time — just add a leading zero if needed (7 AM = 0700, 10 AM = 1000). For hours from noon to midnight (PM), add 12 to the hour (1 PM = 1300, 3 PM = 1500, 7 PM = 1900). Midnight is 0000 and noon is 1200." }
      ],
      tip: { label: "Quick Conversion", text: "For PM times: just add 12 to the hour. 2 PM = 1400, 5 PM = 1700, 9 PM = 2100. For AM times: keep the same number, add leading zeros (7 AM = 0700)." },
      table: { headers: ["12-Hour", "24-Hour", "Spoken As"], rows: [["12:00 AM", "0000", "Zero-zero-zero-zero / Midnight"], ["6:00 AM", "0600", "Zero-six-hundred"], ["12:00 PM", "1200", "Twelve-hundred / Noon"], ["3:00 PM", "1500", "Fifteen-hundred"], ["6:00 PM", "1800", "Eighteen-hundred"], ["11:00 PM", "2300", "Twenty-three-hundred"]] }
    }
  ];

  // ==========================================================
  // BADGES
  // ==========================================================
  const SEA_BADGES = [
    { id: "b_sail", icon: "⛵", name: "Sailor", xp: 100, mission: "sailing_principles" },
    { id: "b_knots", icon: "🪢", name: "Knot Tier", xp: 100, mission: "knots_ropework" },
    { id: "b_nav", icon: "🧭", name: "Navigator", xp: 100, mission: "maritime_navigation" },
    { id: "b_safety", icon: "🦺", name: "Safety Watch", xp: 100, mission: "water_safety" },
    { id: "b_helm", icon: "⛵", name: "Helmsman", xp: 100, mission: "boat_handling" },
    { id: "b_comms", icon: "📻", name: "Signal Cadet", xp: 100, mission: "naval_comms" },
    { id: "b_seamanship", icon: "⚓", name: "Seaman", xp: 100, mission: "seamanship" }
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

    if (scene === "sailboat") {
      return base + grad("g", "#0a2030", "#04101a") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <path d="M0 130 Q150 120 300 130 T600 130 L600 180 L0 180 Z" fill="#0d4858" opacity="0.6"/>
        <path d="M0 145 Q150 135 300 145 T600 145 L600 180 L0 180 Z" fill="#15384a" opacity="0.5"/>
        <g opacity="0.3" stroke="#2dd4bf" stroke-width="0.5" fill="none">
          <path d="M40 138 Q60 134 80 138 Q100 142 120 138"/><path d="M200 140 Q220 136 240 140 Q260 144 280 140"/>
          <path d="M400 137 Q420 133 440 137 Q460 141 480 137"/>
        </g>
        <polygon points="300,40 300,120 250,120" fill="#e8f1ff" opacity="0.9"/>
        <polygon points="300,55 300,120 345,120" fill="#5eead4" opacity="0.85"/>
        <line x1="300" y1="35" x2="300" y2="130" stroke="#2dd4bf" stroke-width="2"/>
        <polygon points="275,120 325,120 335,135 265,135" fill="#1a4858"/>
        <line x1="290" y1="135" x2="310" y2="135" stroke="#0a2030" stroke-width="2"/>
        <text x="300" y="30" fill="#5eead4" font-size="10" font-family="monospace" text-anchor="middle">TRAINING DINGHY — HELM STATION</text>
        <text x="520" y="160" fill="#6f86a8" font-size="9" font-family="monospace" text-anchor="middle">PORT ⬅ ⬆ BOW</text>
      ` + end;
    }
    if (scene === "knotboard") {
      return base + grad("g", "#1a1410", "#0a0806") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <rect x="40" y="30" width="520" height="120" rx="8" fill="#0c1f2a" stroke="#1a4858"/>
        <g stroke="#c79a3a" stroke-width="3" fill="none" opacity="0.8">
          <path d="M120 60 Q100 80 120 100 Q140 120 120 100 Q100 80 120 60"/>
          <path d="M120 60 L120 100"/>
        </g>
        <text x="120" y="135" fill="#ffd66b" font-size="9" font-family="monospace" text-anchor="middle">FIGURE-EIGHT</text>
        <g stroke="#5eead4" stroke-width="3" fill="none" opacity="0.8">
          <path d="M250 70 L280 70 L280 90 L250 90 L250 110 L280 110"/>
        </g>
        <text x="265" y="135" fill="#5eead4" font-size="9" font-family="monospace" text-anchor="middle">REEF KNOT</text>
        <g stroke="#e8f1ff" stroke-width="2.5" fill="none" opacity="0.7">
          <circle cx="400" cy="85" r="18"/>
          <path d="M400 67 L385 50 M400 67 L415 50 M400 103 L400 130"/>
        </g>
        <text x="400" y="150" fill="#e8f1ff" font-size="9" font-family="monospace" text-anchor="middle">BOWLINE</text>
        <g stroke="#aebfd6" stroke-width="2" fill="none" opacity="0.6">
          <path d="M500 60 Q520 70 510 85 Q500 100 520 110"/>
        </g>
        <text x="510" y="135" fill="#aebfd6" font-size="9" font-family="monospace" text-anchor="middle">CLOVE HITCH</text>
        <text x="300" y="22" fill="#ffd66b" font-size="10" font-family="monospace" text-anchor="middle">KNOT BOARD — SEAMANSHIP CLASSROOM</text>
      ` + end;
    }
    if (scene === "charttable") {
      return base + grad("g", "#0d1f15", "#061008") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <rect x="30" y="30" width="540" height="120" rx="4" fill="#0c1f2a" stroke="#1a4858"/>
        <g opacity="0.15" stroke="#2dd4bf" stroke-width="0.5">
          <line x1="30" y1="60" x2="570" y2="60"/><line x1="30" y1="90" x2="570" y2="90"/><line x1="30" y1="120" x2="570" y2="120"/>
          <line x1="120" y1="30" x2="120" y2="150"/><line x1="240" y1="30" x2="240" y2="150"/><line x1="360" y1="30" x2="360" y2="150"/><line x1="480" y1="30" x2="480" y2="150"/>
        </g>
        <path d="M80 110 Q150 100 200 115 Q260 125 300 110" fill="none" stroke="#15384a" stroke-width="14" opacity="0.7"/>
        <path d="M350 60 Q400 70 450 55" fill="none" stroke="#15384a" stroke-width="10" opacity="0.5"/>
        <circle cx="100" cy="125" r="7" fill="#2dd4bf"/>
        <text x="100" y="145" fill="#5eead4" font-size="8" font-family="monospace" text-anchor="middle">HOME</text>
        <circle cx="500" cy="60" r="7" fill="#ffd66b"/>
        <text x="500" y="48" fill="#ffd66b" font-size="8" font-family="monospace" text-anchor="middle">WAYPOINT</text>
        <line x1="107" y1="120" x2="493" y2="65" stroke="#5eead4" stroke-width="2" stroke-dasharray="6 4"/>
        <text x="300" y="100" fill="#5eead4" font-size="11" font-family="monospace" text-anchor="middle">BRG 090° — VAR 7°W</text>
        <text x="300" y="22" fill="#5eead4" font-size="10" font-family="monospace" text-anchor="middle">CHART TABLE — NAUTICAL PLOT</text>
      ` + end;
    }
    if (scene === "safetygear") {
      return base + grad("g", "#1a1010", "#0a0606") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <rect x="80" y="40" width="100" height="100" rx="8" fill="#0c1f2a" stroke="#ff5a6e" opacity="0.9"/>
        <path d="M100 60 L130 55 L160 60 L160 120 L130 130 L100 120 Z" fill="#ff5a6e" opacity="0.3"/>
        <text x="130" y="95" fill="#ff5a6e" font-size="20" font-family="monospace" text-anchor="middle">🦺</text>
        <text x="130" y="155" fill="#ff5a6e" font-size="9" font-family="monospace" text-anchor="middle">PFD / LIFEJACKET</text>
        <rect x="220" y="40" width="100" height="100" rx="8" fill="#0c1f2a" stroke="#ffb454" opacity="0.9"/>
        <circle cx="270" cy="90" r="28" fill="none" stroke="#ffb454" stroke-width="3" opacity="0.6"/>
        <circle cx="270" cy="90" r="16" fill="#ffb454" opacity="0.2"/>
        <text x="270" y="155" fill="#ffb454" font-size="9" font-family="monospace" text-anchor="middle">LIFEBUOY</text>
        <rect x="360" y="40" width="100" height="100" rx="8" fill="#0c1f2a" stroke="#38d97b" opacity="0.9"/>
        <rect x="380" y="60" width="60" height="40" rx="4" fill="#38d97b" opacity="0.2" stroke="#38d97b"/>
        <text x="410" y="85" fill="#38d97b" font-size="11" font-family="monospace" text-anchor="middle">BAILER</text>
        <text x="410" y="155" fill="#38d97b" font-size="9" font-family="monospace" text-anchor="middle">BAILER</text>
        <rect x="480" y="40" width="100" height="100" rx="8" fill="#0c1f2a" stroke="#5eead4" opacity="0.9"/>
        <text x="530" y="95" fill="#5eead4" font-size="24" font-family="monospace" text-anchor="middle">🆘</text>
        <text x="530" y="155" fill="#5eead4" font-size="9" font-family="monospace" text-anchor="middle">MOB KIT</text>
        <text x="300" y="22" fill="#ff5a6e" font-size="10" font-family="monospace" text-anchor="middle">SAFETY GEAR STATION — CHECK BEFORE LAUNCH</text>
      ` + end;
    }
    if (scene === "helm") {
      return base + grad("g", "#0a2030", "#04101a") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <path d="M0 110 Q150 100 300 110 T600 110 L600 180 L0 180 Z" fill="#0d4858" opacity="0.5"/>
        <circle cx="300" cy="75" r="55" fill="#0c1f2a" stroke="#1a4858" stroke-width="2"/>
        <circle cx="300" cy="75" r="55" fill="none" stroke="#2dd4bf" stroke-width="1" opacity="0.4"/>
        <g stroke="#2dd4bf" stroke-width="1" opacity="0.3">
          <line x1="300" y1="25" x2="300" y2="125"/><line x1="250" y1="75" x2="350" y2="75"/>
        </g>
        <text x="300" y="32" fill="#5eead4" font-size="9" font-family="monospace" text-anchor="middle">N 000</text>
        <text x="300" y="128" fill="#5eead4" font-size="9" font-family="monospace" text-anchor="middle">S 180</text>
        <text x="346" y="78" fill="#5eead4" font-size="9" font-family="monospace" text-anchor="middle">E 090</text>
        <text x="252" y="78" fill="#5eead4" font-size="9" font-family="monospace" text-anchor="middle">W 270</text>
        <polygon points="300,40 307,72 293,72" fill="#ffd66b"/>
        <line x1="300" y1="75" x2="300" y2="160" stroke="#aebfd6" stroke-width="3"/>
        <rect x="285" y="140" width="30" height="20" rx="3" fill="#15384a" stroke="#5eead4"/>
        <text x="300" y="160" fill="#5eead4" font-size="8" font-family="monospace" text-anchor="middle">TILLER</text>
        <text x="300" y="22" fill="#5eead4" font-size="10" font-family="monospace" text-anchor="middle">HELM STATION — COMPASS &amp; TILLER</text>
      ` + end;
    }
    if (scene === "radio") {
      return base + grad("g", "#0a1820", "#040b12") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <rect x="160" y="35" width="280" height="110" rx="10" fill="#0c1f2a" stroke="#1a4858"/>
        <rect x="180" y="55" width="240" height="40" rx="4" fill="#02080d" stroke="#1a4858"/>
        <text x="300" y="80" fill="#38d97b" font-size="13" font-family="monospace" text-anchor="middle">PIPE: THE STILL — ATTENTION</text>
        <circle cx="210" cy="120" r="9" fill="#ff5a6e"/><text x="210" y="138" fill="#6f86a8" font-size="8" font-family="monospace" text-anchor="middle">TX</text>
        <circle cx="250" cy="120" r="9" fill="#38d97b"/><text x="250" y="138" fill="#6f86a8" font-size="8" font-family="monospace" text-anchor="middle">RX</text>
        <circle cx="290" cy="120" r="11" fill="#2dd4bf"/><text x="290" y="138" fill="#6f86a8" font-size="8" font-family="monospace" text-anchor="middle">CALL</text>
        <rect x="320" y="112" width="80" height="16" rx="3" fill="#02080d" stroke="#1a4858"/>
        <text x="360" y="124" fill="#5eead4" font-size="10" font-family="monospace" text-anchor="middle">CH 16</text>
        <text x="300" y="28" fill="#5eead4" font-size="10" font-family="monospace" text-anchor="middle">COMMS DESK — VHF &amp; BOATSWAIN'S CALL</text>
      ` + end;
    }
    if (scene === "rigging") {
      return base + grad("g", "#1a1820", "#0a0810") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <g stroke="#c79a3a" stroke-width="3" fill="none" opacity="0.7">
          <circle cx="120" cy="80" r="35"/>
          <path d="M120 45 Q90 80 120 115 Q150 80 120 45"/>
        </g>
        <text x="120" y="140" fill="#ffd66b" font-size="9" font-family="monospace" text-anchor="middle">COILED LINE</text>
        <g stroke="#aebfd6" stroke-width="2.5" fill="none" opacity="0.6">
          <rect x="280" y="55" width="50" height="40" rx="3"/>
          <line x1="285" y1="62" x2="325" y2="62" stroke-width="1.5"/>
          <line x1="305" y1="55" x2="305" y2="95" stroke-width="2.5"/>
          <path d="M285 75 L305 75 L325 75" stroke-width="1.5"/>
        </g>
        <text x="305" y="115" fill="#aebfd6" font-size="9" font-family="monospace" text-anchor="middle">CLEAT — BELAY</text>
        <circle cx="450" cy="80" r="30" fill="#0c1f2a" stroke="#ffd66b" stroke-width="2"/>
        <text x="450" y="88" fill="#ffd66b" font-size="22" font-family="monospace" text-anchor="middle">🔔</text>
        <text x="450" y="135" fill="#ffd66b" font-size="9" font-family="monospace" text-anchor="middle">SHIP'S BELL</text>
        <text x="300" y="28" fill="#ffd66b" font-size="10" font-family="monospace" text-anchor="middle">SEAMANSHIP DECK — LINE, CLEAT &amp; BELL</text>
      ` + end;
    }
    return base + `<rect width="${W}" height="${H}" fill="#0c1f2a"/>` + end;
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
    SEA_BADGES.forEach(b => {
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
    document.getElementById("topRank").textContent = rank.name.replace("Sea Cadet ", "").replace("Cadet ", "");
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
    document.getElementById("cmdBadgeTotal").textContent = "of " + SEA_BADGES.length;

    // Chapter list
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
      const num = done ? "" : `<span class="n">${m.order}</span>`;
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
      if (done) cls += " done";
      if (!unlocked) cls += " locked";
      return `<div class="${cls}" data-mission="${m.id}">
        <div class="mc-ico">${m.icon}</div>
        <div class="mc-tag">${m.tag}</div>
        <div class="mc-title">${m.title}</div>
        <div class="mc-desc">${m.desc}</div>
        <div class="mc-meta">
          <span>⚡ ${missionXP(m)} XP</span>
          <span>📋 ${prog}/${total}</span>
        </div>
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
  // OPEN A MISSION — show the task console
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
      bindCompleteCardEvents(m);
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
            <button class="btn btn-primary" id="submitTaskBtn" type="button">✓ Submit &amp; Confirm</button>
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
      return `<select class="task-select" id="taskSelect" data-idx="${idx}">
        <option value="">— Select your answer —</option>
        ${task.options.map(o => `<option value="${o}">${o}</option>`).join("")}
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
      return `<input class="task-slider" id="taskSlider" type="range" min="0" max="360" value="${sliderValue[idx]}" data-idx="${idx}" />
        <div class="slider-readout" id="sliderReadout">${sliderValue[idx]}°</div>`;
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
        document.getElementById("sliderReadout").textContent = sliderValue[idx] + "°";
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
      return { ok: false, msg: `The course is set to ${v}°. Adjust the dial to match the ordered bearing of ${task.expected}°.` };
    }
    return { ok: false, msg: "Unknown task type." };
  }

  function showHint(task) {
    const fb = document.getElementById("taskFeedback");
    fb.className = "task-feedback show info";
    let hint = "";
    if (task.type === "select") hint = `The correct answer relates to: ${task.expected.split("—")[0].trim().slice(0, 50)}…`;
    else if (task.type === "type") hint = `The answer has ${task.expected.length} characters and starts with "${task.expected.charAt(0)}".`;
    else if (task.type === "note") hint = `Your note must include: ${task.keywords.join(", ")}${task.altKeywords ? " (or " + task.altKeywords.join(", ") + ")" : ""}.`;
    else if (task.type === "toggle") hint = "Click the toggle row to switch it to the ON (green) position.";
    else if (task.type === "slider") hint = `The target bearing is close to ${task.expected}°.`;
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
      const badge = SEA_BADGES.find(b => b.mission === m.id);
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
    const badge = SEA_BADGES.find(b => b.mission === m.id);
    const mp = missionProgress(m.id);
    return `<div class="task-console">
      <div class="task-body">
        <div class="complete-card">
          <div class="cc-ico">🏆</div>
          <div class="cc-title">Mission Complete: ${m.title}</div>
          <div class="cc-sub">${m.desc} You have successfully completed all ${m.tasks.length} tasks and earned the <strong>${badge ? badge.name : "Sea Cadet"}</strong> badge.</div>
          <div class="cc-stats">
            <div class="cc-stat"><div class="v">+${earned}</div><div class="l">XP Earned</div></div>
            <div class="cc-stat"><div class="v">${mp.tasksDone.length}/${m.tasks.length}</div><div class="l">Tasks Done</div></div>
            <div class="cc-stat"><div class="v">${mp.wrongAttempts || 0}</div><div class="l">Wrong Attempts</div></div>
          </div>
          <div class="task-actions" style="justify-content:center;">
            <button class="btn btn-primary" id="fileSitrepQuickBtn" type="button">📤 File SITREP for this mission</button>
            <button class="btn btn-ghost" id="backToListBtn" type="button">← Back to mission list</button>
            <a class="btn btn-quest" id="backToQuestBtn" href="index.html">🗺️ Back to Cadet Quest Map</a>
          </div>
        </div>
      </div>
    </div>`;
  }

  // Bind buttons on the Mission Complete card (SITREP quick-file, back to list, back to quest map)
  function bindCompleteCardEvents(m) {
    const fsq = document.getElementById("fileSitrepQuickBtn");
    if (fsq) fsq.addEventListener("click", () => {
      switchSection("sitrep");
      const sel = document.getElementById("sitrepMission");
      if (sel) sel.value = m.id;
      const sum = document.getElementById("sitrepSummary");
      if (sum) { sum.focus(); sum.scrollIntoView({ behavior: "smooth", block: "center" }); }
      toast("info", "📋 Mission pre-selected — write your SITREP summary and file it.");
    });
    const btl = document.getElementById("backToListBtn");
    if (btl) btl.addEventListener("click", exitMission);
    // backToQuestBtn is a plain <a href="index.html"> — no handler needed
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
    document.getElementById("ringRankLabel").textContent = rank.name.replace("Sea Cadet ", "").replace("Cadet ", "");
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
          NOMINAL: { cls: "low", text: "NOMINAL" },
          MINOR_HAZARD: { cls: "med", text: "MINOR HAZARD" },
          ABORTED: { cls: "high", text: "ABORTED" }
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
    toast("ok", "📟 SITREP filed! +20 XP");
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
    showArticleModal(a);
    if (!state.readArticles.includes(articleId)) {
      state.readArticles.push(articleId);
      state.xp += a.xp;
      saveState();
      toast("ok", `\ud83d\udcd6 Article read: "${a.title}" \u2014 +${a.xp} XP`);
      renderLearn(); renderSidebar(); renderTopStats(); renderAnalysis();
    } else {
      toast("info", `\ud83d\udcd6 Already read: "${a.title}"`);
    }
  }

  function showArticleModal(a) {
    const existing = document.getElementById("articleModalOverlay");
    if (existing) existing.remove();

    let bodyHTML = "";

    // Body sections (heading + paragraph)
    if (a.body) {
      bodyHTML += a.body.map(s => `<h3>${s.h}</h3><p>${s.p}</p>`).join("");
    }

    // Callout box
    if (a.callout) {
      bodyHTML += `<div class="mm-article-callout"><span class="mm-ac-label">${a.callout.label}</span><p>${a.callout.text}</p></div>`;
    }

    // Tip box
    if (a.tip) {
      bodyHTML += `<div class="mm-article-tip"><span class="mm-at-label">${a.tip.label}</span><p>${a.tip.text}</p></div>`;
    }

    // Warning box
    if (a.warning) {
      bodyHTML += `<div class="mm-article-warning"><span class="mm-aw-label">${a.warning.label}</span><p>${a.warning.text}</p></div>`;
    }

    // Numbered steps
    if (a.steps && a.steps.length) {
      bodyHTML += `<h3>Step-by-Step</h3><ol class="mm-article-steps">`;
      bodyHTML += a.steps.map(s => `<li>${s}</li>`).join("");
      bodyHTML += `</ol>`;
    }

    // Icon grid
    if (a.iconGrid && a.iconGrid.length) {
      bodyHTML += `<h3>Quick Reference</h3><div class="mm-article-icon-grid">`;
      bodyHTML += a.iconGrid.map(g => `<div class="mm-aig-item"><div class="mm-aig-icon">${g.icon}</div><div class="mm-aig-label">${g.label}</div><div class="mm-aig-desc">${g.desc}</div></div>`).join("");
      bodyHTML += `</div>`;
    }

    // Reference table
    if (a.table) {
      bodyHTML += `<h3>Reference Table</h3><div class="table-wrap"><table><thead><tr>${a.table.headers.map(h => `<th>${h}</th>`).join("")}</tr></thead><tbody>`;
      bodyHTML += a.table.rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join("")}</tr>`).join("");
      bodyHTML += `</tbody></table></div>`;
    }

    const overlay = document.createElement("div");
    overlay.className = "article-modal-overlay";
    overlay.id = "articleModalOverlay";
    overlay.innerHTML = `<div class="article-modal">
      <div class="article-modal-head">
        <h2>${a.icon} ${a.title}</h2>
        <button class="sv-modal-close" id="articleModalClose" type="button">\u2715</button>
      </div>
      <div class="article-modal-body">${bodyHTML}</div>
      <div class="article-modal-foot">
        <span class="am-xp">+${a.xp} XP earned for reading</span>
        <button class="btn btn-primary" id="articleModalDone" type="button">Got It</button>
      </div>
    </div>`;
    document.body.appendChild(overlay);

    const close = () => { overlay.remove(); if (window.MultimodalLearning && window.MultimodalLearning.tts) window.MultimodalLearning.tts.stop(); };
    document.getElementById("articleModalClose").addEventListener("click", close);
    document.getElementById("articleModalDone").addEventListener("click", close);
    overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });

    // Enhance with multimodal (read-aloud button, make readable)
    if (window.MultimodalLearning && window.MultimodalLearning.enhanceArticleModals) {
      window.MultimodalLearning.enhanceArticleModals();
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
