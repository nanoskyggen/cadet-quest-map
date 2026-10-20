/* ============================================================
   AIR CADET TRAINING COMMAND — air_training.js
   Operation Skyward: hands-on aviation training simulator
   Inspired by Maple Shield design patterns
   ============================================================ */

(function () {
  "use strict";

  // ==========================================================
  // STORAGE KEYS
  // ==========================================================
  const SK = {
    progress: "airTrainingProgress",
    sitreps: "airTrainingSitreps",
    wrongAttempts: "airTrainingWrongAttempts",
    streak: "airTrainingStreak",
    bestStreak: "airTrainingBestStreak",
    readArticles: "airTrainingReadArticles"
  };

  // ==========================================================
  // RANK LADDER
  // ==========================================================
  const RANKS = [
    { id: 0, name: "Air Cadet (Recruit)", icon: "🎖️", xp: 0, callsign: "ROOKIE-1" },
    { id: 1, name: "Air Cadet", icon: "✈️", xp: 300, callsign: "CADET-1" },
    { id: 2, name: "Leading Air Cadet", icon: "🦅", xp: 700, callsign: "LEAD-1" },
    { id: 3, name: "Cadet Corporal", icon: "🛩️", xp: 1200, callsign: "FLIGHT-1" },
    { id: 4, name: "Cadet Flight Corporal", icon: "⭐", xp: 1800, callsign: "SENIOR-1" },
    { id: 5, name: "Cadet Sergeant", icon: "🏅", xp: 2500, callsign: "PILOT-1" }
  ];

  // ==========================================================
  // TRAINING MODULES / MISSIONS
  // Each mission has 4 hands-on tasks like the cyber range.
  // Task types: toggle | select | type | note | slider
  // ==========================================================
  const MISSIONS = [
    {
      id: "flight_principles",
      order: 1,
      tag: "MODULE 01",
      icon: "🪽",
      title: "Principles of Flight",
      desc: "Master the four forces of flight — lift, weight, thrust, and drag — and how an aircraft stays airborne.",
      xp: 100,
      brief: "You are in the ground-school briefing room. Your instructor wants you to demonstrate understanding of how an aircraft generates lift and overcomes the forces acting on it. Open the cockpit instruments panel and work through each check.",
      scene: "cockpit",
      chapters: [
        { title: "The Four Forces", desc: "Identify the forces acting on an aircraft in flight." },
        { title: "Angle of Attack", desc: "Understand how wing angle affects lift." },
        { title: "Lift Equation", desc: "Confirm the factors that increase lift." },
        { title: "Stall Awareness", desc: "Recognise the conditions that lead to a stall." }
      ],
      tasks: [
        {
          type: "toggle", tool: "instruments",
          title: "Enable Lift-Generating Systems",
          prompt: "The aircraft is on the ground. Before we discuss lift, confirm the primary lift-generating component is recognised. Toggle the WING SYSTEMS indicator to ON.",
          expected: true,
          proof: "Wing systems indicator ON — lift surface confirmed."
        },
        {
          type: "select", tool: "instruments",
          title: "Identify the Four Forces",
          prompt: "Which set correctly names the four forces acting on an aircraft in steady flight?",
          options: [
            "Lift, Weight, Thrust, Drag",
            "Speed, Altitude, Heading, Time",
            "Roll, Pitch, Yaw, Torque",
            "Pressure, Temperature, Density, Humidity"
          ],
          expected: "Lift, Weight, Thrust, Drag",
          proof: "Four forces confirmed: Lift, Weight, Thrust, Drag."
        },
        {
          type: "select", tool: "instruments",
          title: "What Increases Lift?",
          prompt: "During your briefing, the instructor asks which factor directly increases the lift produced by a wing.",
          options: [
            "Decreasing airspeed",
            "Increasing angle of attack (up to critical angle)",
            "Lowering altitude only",
            "Reducing wing area"
          ],
          expected: "Increasing angle of attack (up to critical angle)",
          proof: "Lift factor confirmed — increasing angle of attack increases lift (until stall)."
        },
        {
          type: "note", tool: "comms",
          title: "Log the Stall Condition",
          prompt: "Switch to the COMMS panel. Write a short log entry describing what causes an aircraft to stall. Your note must include the keywords 'angle of attack' and 'critical'.",
          keywords: ["angle of attack", "critical"],
          proof: "Stall condition logged via comms — critical angle of attack exceeded."
        }
      ]
    },
    {
      id: "meteorology",
      order: 2,
      tag: "MODULE 02",
      icon: "🌩️",
      title: "Aviation Meteorology",
      desc: "Read weather boards, interpret cloud types, and make safe go/no-go decisions based on conditions.",
      xp: 100,
      brief: "You are stationed at the airfield weather desk. The duty officer needs you to assess current conditions and determine if it is safe to conduct a training flight. Use the weather instruments and file your assessment.",
      scene: "weather",
      chapters: [
        { title: "Cloud Recognition", desc: "Identify cloud types and their aviation significance." },
        { title: "Wind Assessment", desc: "Evaluate wind speed and direction for safety." },
        { title: "Visibility Check", desc: "Confirm minimum visibility for VFR flight." },
        { title: "Go / No-Go Decision", desc: "Make and log the final weather decision." }
      ],
      tasks: [
        {
          type: "select", tool: "weather",
          title: "Identify the Thunderstorm Cloud",
          prompt: "The weather board shows several cloud types. Which cloud signals thunderstorm activity and should be avoided by all aircraft?",
          options: [
            "Cirrus — thin wispy high clouds",
            "Cumulonimbus — tall towering clouds with anvil top",
            "Stratus — flat grey layer clouds",
            "Cumulus — fluffy fair-weather clouds"
          ],
          expected: "Cumulonimbus — tall towering clouds with anvil top",
          proof: "Thunderstorm cloud identified: Cumulonimbus."
        },
        {
          type: "slider", tool: "weather",
          title: "Set the Wind Speed Reading",
          prompt: "The anemometer reads 12 knots of wind. Set the wind speed dial to match the current reading.",
          expected: 12,
          tolerance: 1,
          proof: "Wind speed dial set to 12 knots — matches anemometer reading."
        },
        {
          type: "select", tool: "weather",
          title: "Visibility Decision",
          prompt: "Current visibility is 8 kilometres. Under Visual Flight Rules (VFR), is this acceptable for a basic training flight?",
          options: [
            "Yes — 8 km exceeds the minimum VFR visibility requirement",
            "No — visibility must be at least 20 km",
            "Only at night",
            "Only with special equipment"
          ],
          expected: "Yes — 8 km exceeds the minimum VFR visibility requirement",
          proof: "Visibility check passed — 8 km is acceptable for VFR."
        },
        {
          type: "note", tool: "comms",
          title: "File the Go/No-Go Decision",
          prompt: "Switch to COMMS. Based on your weather assessment, file a decision report. Your note must include the word 'GO' or 'NO-GO' and mention 'visibility'.",
          keywords: ["visibility", "GO"],
          altKeywords: ["visibility", "NO-GO"],
          proof: "Go/No-Go decision filed via comms — weather assessment complete."
        }
      ]
    },
    {
      id: "navigation",
      order: 3,
      tag: "MODULE 03",
      icon: "🧭",
      title: "Air Navigation",
      desc: "Plot a course on a chart, account for magnetic variation, and calculate heading corrections for wind drift.",
      xp: 100,
      brief: "You are at the navigation table with a sectional chart spread out. Your task is to plot a course from the home airfield to a training area, account for magnetic variation, and calculate your heading. Use the navigation tools provided.",
      scene: "navigation",
      chapters: [
        { title: "Chart Plotting", desc: "Mark your course on the sectional chart." },
        { title: "Magnetic Variation", desc: "Apply compass correction for your region." },
        { title: "Drift Calculation", desc: "Calculate heading correction for crosswind." },
        { title: "ETA Estimation", desc: "Estimate time of arrival at the training area." }
      ],
      tasks: [
        {
          type: "toggle", tool: "nav",
          title: "Activate the Chart Plot",
          prompt: "Before plotting, confirm your navigation chart is laid out and the plot tool is active. Toggle the CHART PLOT to ON.",
          expected: true,
          proof: "Chart plot activated — navigation table ready."
        },
        {
          type: "select", tool: "nav",
          title: "Magnetic Variation",
          prompt: "Your chart shows a magnetic variation of 5° West. What is the correct rule to convert true heading to magnetic heading?",
          options: [
            "Add west variation to true heading",
            "Subtract west variation from true heading",
            "Ignore variation for short flights",
            "Multiply heading by the variation"
          ],
          expected: "Subtract west variation from true heading",
          proof: "Magnetic variation applied correctly — west is subtracted ('east is least, west is best')."
        },
        {
          type: "type", tool: "nav",
          title: "Calculate Corrected Heading",
          prompt: "Your true course is 090° and magnetic variation is 5°W. Type the magnetic heading you should fly (as a 3-digit number).",
          expected: "085",
          proof: "Magnetic heading calculated: 090° - 5° = 085°."
        },
        {
          type: "note", tool: "comms",
          title: "Log the Flight Plan",
          prompt: "Switch to COMMS. Write a brief flight plan log entry. Include the heading '085' and the destination 'training area'.",
          keywords: ["085", "training area"],
          proof: "Flight plan logged via comms — heading 085° to training area."
        }
      ]
    },
    {
      id: "airfield_ops",
      order: 4,
      tag: "MODULE 04",
      icon: "🛬",
      title: "Airfield Operations",
      desc: "Learn runway layout, taxiway signage, wind direction indicators, and the correct procedures for movement on the ground.",
      xp: 100,
      brief: "You are at the airfield operations desk. A training flight is preparing to taxi. You must confirm runway configuration, identify the wind direction indicator, and ensure the cadet follows correct ground movement procedures.",
      scene: "airfield",
      chapters: [
        { title: "Runway Designation", desc: "Decode runway numbers and orientation." },
        { title: "Wind Indicator", desc: "Identify the windsock and interpret it." },
        { title: "Taxiway Discipline", desc: "Follow correct taxiway procedures." },
        { title: "Runway Clearance", desc: "Confirm clearance before entering the runway." }
      ],
      tasks: [
        {
          type: "select", tool: "ops",
          title: "Decode the Runway Number",
          prompt: "A runway is marked with a large '27' painted at the threshold. What does this number tell you?",
          options: [
            "The runway is 2700 metres long",
            "The runway heading is approximately 270° (west)",
            "There are 27 runways at this airfield",
            "The runway was built in 1927"
          ],
          expected: "The runway heading is approximately 270° (west)",
          proof: "Runway 27 decoded — heading approximately 270° magnetic."
        },
        {
          type: "toggle", tool: "ops",
          title: "Confirm Windsock Operational",
          prompt: "Before any ground movement, the wind direction indicator must be checked. Toggle the WINDSOCK CHECK to confirm you have read the wind direction.",
          expected: true,
          proof: "Windsock checked — wind direction confirmed before taxi."
        },
        {
          type: "select", tool: "ops",
          title: "Taxiway Procedure",
          prompt: "A cadet is about to taxi to the runway. Which procedure is correct?",
          options: [
            "Taxi without checking — the runway is probably clear",
            "Obtain taxi clearance, follow taxiway lines, and yield to active runway traffic",
            "Drive straight across the runway to save time",
            "Taxi at maximum speed to clear the area quickly"
          ],
          expected: "Obtain taxi clearance, follow taxiway lines, and yield to active runway traffic",
          proof: "Taxiway procedure confirmed — clearance, line-following, and yielding required."
        },
        {
          type: "note", tool: "comms",
          title: "Request Runway Clearance",
          prompt: "Switch to COMMS. Write a radio-style request to enter the active runway. Include the words 'clearance' and 'runway'.",
          keywords: ["clearance", "runway"],
          proof: "Runway clearance requested via comms — proper radio procedure used."
        }
      ]
    },
    {
      id: "gliding",
      order: 5,
      tag: "MODULE 05",
      icon: "🪂",
      title: "Gliding Operations",
      desc: "Understand glider launch methods, pre-flight checks, and the forces that keep a glider flying without an engine.",
      xp: 100,
      brief: "You are at the glider launch point on the airfield. A winch launch is about to take place. Your job is to complete the glider pre-flight checks and confirm the launch is safe to proceed.",
      scene: "glider",
      chapters: [
        { title: "Glider Identification", desc: "Identify the key parts of a glider." },
        { title: "Launch Methods", desc: "Compare winch, aerotow, and self-launch." },
        { title: "Pre-Flight Checks", desc: "Complete the CBICA pre-flight checklist." },
        { title: "Launch Confirmation", desc: "Confirm the glider is ready for launch." }
      ],
      tasks: [
        {
          type: "select", tool: "glider",
          title: "How Does a Glider Climb?",
          prompt: "A glider has no engine. What keeps a glider flying and gaining altitude?",
          options: [
            "An onboard battery provides thrust",
            "Rising air currents (thermals, ridge lift, or wave) and stored energy from the launch",
            "The glider continuously descends and cannot climb",
            "Magnetic levitation from the ground"
          ],
          expected: "Rising air currents (thermals, ridge lift, or wave) and stored energy from the launch",
          proof: "Glider lift source confirmed — rising air currents and launch energy."
        },
        {
          type: "select", tool: "glider",
          title: "Winch Launch Method",
          prompt: "You are at a winch launch point. How does a winch launch work?",
          options: [
            "A powered aircraft tows the glider to altitude",
            "A cable attached to a ground winch rapidly pulls the glider to altitude, then releases",
            "The glider uses its own motor to take off",
            "The glider is catapulted by a rubber band"
          ],
          expected: "A cable attached to a ground winch rapidly pulls the glider to altitude, then releases",
          proof: "Winch launch method confirmed — cable pull then release."
        },
        {
          type: "toggle", tool: "glider",
          title: "Complete Pre-Flight Checks",
          prompt: "The CBICA checklist (Controls, Ballast, Instruments, Cannopy, Airbrakes) must be complete. Toggle the PRE-FLIGHT CHECKS to confirm all items verified.",
          expected: true,
          proof: "Pre-flight checks (CBICA) confirmed complete — glider ready."
        },
        {
          type: "note", tool: "comms",
          title: "Confirm Launch Ready",
          prompt: "Switch to COMMS. Write a launch readiness confirmation. Include the words 'ready' and 'launch'.",
          keywords: ["ready", "launch"],
          proof: "Launch readiness confirmed via comms — glider cleared for winch launch."
        }
      ]
    },
    {
      id: "air_drill",
      order: 6,
      tag: "MODULE 06",
      icon: "🎖️",
      title: "Air Drill & Discipline",
      desc: "Master air cadet drill movements, formations, and the discipline that underpins all air operations.",
      xp: 100,
      brief: "You are on the parade square for air cadet drill training. Your flight sergeant will call drill movements and you must respond correctly. Pay attention to commands and demonstrate proper drill discipline.",
      scene: "drill",
      chapters: [
        { title: "Attention & Stand Easy", desc: "Master the basic positions." },
        { title: "Forming Up", desc: "Understand squad formation and spacing." },
        { title: "Marching Commands", desc: "Respond to marching orders correctly." },
        { title: "Drill Discipline Log", desc: "Record the principles of good drill." }
      ],
      tasks: [
        {
          type: "select", tool: "drill",
          title: "The Position of Attention",
          prompt: "The flight sergeant calls 'ATTENTION'. What is the correct position?",
          options: [
            "Standing relaxed with hands in pockets",
            "Heels together, toes apart at 30°, body upright, arms straight at sides",
            "Sitting down with legs crossed",
            "Walking slowly in a circle"
          ],
          expected: "Heels together, toes apart at 30°, body upright, arms straight at sides",
          proof: "Position of attention confirmed — heels together, toes at 30°, upright."
        },
        {
          type: "toggle", tool: "drill",
          title: "Form the Squad",
          prompt: "The command 'FORM UP' is given. Toggle the SQUAD FORMED indicator to confirm the squad is in proper formation.",
          expected: true,
          proof: "Squad formed — correct formation and spacing achieved."
        },
        {
          type: "select", tool: "drill",
          title: "Marching Command",
          prompt: "The command 'FORWARD, MARCH' is given. When do cadets begin marching?",
          options: [
            "Immediately on hearing 'FORWARD'",
            "On the word 'MARCH' — the executive word of command",
            "Whenever they feel ready",
            "After a 10-second delay"
          ],
          "expected": "On the word 'MARCH' — the executive word of command",
          proof: "Marching timing confirmed — movement begins on the executive word 'MARCH'."
        },
        {
          type: "note", tool: "comms",
          title: "Log Drill Principles",
          prompt: "Switch to COMMS. Write a short note on what makes good drill. Include the words 'discipline' and 'timing'.",
          keywords: ["discipline", "timing"],
          proof: "Drill principles logged via comms — discipline and timing emphasised."
        }
      ]
    },
    {
      id: "radio_procs",
      order: 7,
      tag: "MODULE 07",
      icon: "📻",
      title: "Radio Procedures",
      desc: "Learn the phonetic alphabet, standard radio phraseology, and how to make clear, concise air communications.",
      xp: 100,
      brief: "You are at the radio desk in the control building. You will practice the phonetic alphabet, construct a proper radio call, and confirm a position report using standard phraseology.",
      scene: "radio",
      chapters: [
        { title: "Phonetic Alphabet", desc: "Learn the ICAO phonetic alphabet." },
        { title: "Radio Call Structure", desc: "Build a clear radio transmission." },
        { title: "Position Report", desc: "File a standard position report." },
        { title: "Readback Confirmation", desc: "Confirm instructions with a readback." }
      ],
      tasks: [
        {
          type: "select", tool: "radio",
          title: "Phonetic Alphabet — 'C'",
          prompt: "In the ICAO phonetic alphabet, what word represents the letter 'C'?",
          options: ["Charlie", "Cesar", "Catherine", "Coconut"],
          expected: "Charlie",
          proof: "Phonetic alphabet confirmed — C = Charlie."
        },
        {
          type: "type", tool: "radio",
          title: "Decode 'Sierra'",
          prompt: "Type the single letter that the phonetic word 'Sierra' represents.",
          expected: "S",
          proof: "Phonetic decode confirmed — Sierra = S."
        },
        {
          type: "select", tool: "radio",
          title: "Standard Radio Call Order",
          prompt: "When making a radio call, what is the correct order of information?",
          options: [
            "Message, then who you are, then who you are calling",
            "Who you are calling, who you are, then your message",
            "Your message only — names are unnecessary",
            "Who you are, your message, then who you are calling"
          ],
          expected: "Who you are calling, who you are, then your message",
          proof: "Radio call order confirmed — called station, calling station, message."
        },
        {
          type: "note", tool: "comms",
          title: "File a Position Report",
          prompt: "Switch to COMMS. Write a position report using standard phraseology. Include 'position' and the word 'over' to end the transmission.",
          keywords: ["position", "over"],
          proof: "Position report filed via comms — standard phraseology with 'over' ending."
        }
      ]
    }
  ];

  // ==========================================================
  // LEARN LIBRARY ARTICLES
  // ==========================================================
  const LEARN_ARTICLES = [
    { id: "l_four_forces", cat: "Principles of Flight", icon: "🪽", title: "The Four Forces of Flight", desc: "Lift, weight, thrust, and drag — how they interact to keep an aircraft flying.", xp: 15 },
    { id: "l_lift_gen", cat: "Principles of Flight", icon: "📈", title: "How Lift is Generated", desc: "Bernoulli's principle, Newton's third law, and the role of the wing's shape.", xp: 15 },
    { id: "l_stall", cat: "Principles of Flight", icon: "⚠️", title: "Stalls and Angle of Attack", desc: "What happens when a wing exceeds its critical angle of attack.", xp: 15 },
    { id: "l_clouds", cat: "Meteorology", icon: "☁️", title: "Cloud Types for Aviators", desc: "Cumulus, stratus, cirrus, and cumulonimbus — what each means for flight safety.", xp: 15 },
    { id: "l_wind", cat: "Meteorology", icon: "🌬️", title: "Wind and Its Effects", desc: "Crosswinds, headwinds, tailwinds, and how they affect takeoff and landing.", xp: 15 },
    { id: "l_visibility", cat: "Meteorology", icon: "👁️", title: "Visibility and VFR Minima", desc: "What visual flight rules require and when conditions become unsafe.", xp: 15 },
    { id: "l_mag_var", cat: "Navigation", icon: "🧲", title: "Magnetic Variation Explained", desc: "True north vs magnetic north and how to correct your heading.", xp: 15 },
    { id: "l_drift", cat: "Navigation", icon: "↗️", title: "Calculating Wind Drift", desc: "How crosswind causes drift and how to correct your heading.", xp: 15 },
    { id: "l_chart", cat: "Navigation", icon: "🗺️", title: "Reading a Sectional Chart", desc: "Airspace classes, landmarks, and how to plot a course.", xp: 15 },
    { id: "l_runways", cat: "Airfield Ops", icon: "🛬", title: "Runway Numbers and Layout", desc: "Why runways are numbered and how to interpret their designation.", xp: 15 },
    { id: "l_windsock", cat: "Airfield Ops", icon: "🚩", title: "The Windsock", desc: "How to read wind direction and strength from the airfield windsock.", xp: 15 },
    { id: "l_taxiway", cat: "Airfield Ops", icon: "🚧", title: "Taxiway Signage", desc: "Understanding taxiway markings, holding points, and runway guard lights.", xp: 15 },
    { id: "l_glider_basics", cat: "Gliding", icon: "🪂", title: "How Gliders Fly", desc: "Thermals, ridge lift, and wave lift — soaring without an engine.", xp: 15 },
    { id: "l_launch_methods", cat: "Gliding", icon: "🔗", title: "Glider Launch Methods", desc: "Winch, aerotow, and self-launch — comparing the three methods.", xp: 15 },
    { id: "l_cbica", cat: "Gliding", icon: "✅", title: "The CBICA Checklist", desc: "Controls, Ballast, Instruments, Canopy, Airbrakes — the glider pre-flight sequence.", xp: 15 },
    { id: "l_phonetic", cat: "Radio", icon: "🔤", title: "The ICAO Phonetic Alphabet", desc: "Alpha to Zulu — why aviators use standard phonetic words.", xp: 15 },
    { id: "l_phraseology", cat: "Radio", icon: "📻", title: "Standard Radio Phraseology", desc: "Over, out, roger, wilco — what each term means and when to use it.", xp: 15 },
    { id: "l_drill_basics", cat: "Drill", icon: "🎖️", title: "Drill Fundamentals", desc: "Why drill matters, the position of attention, and basic formations.", xp: 15 }
  ];

  // ==========================================================
  // TOOLS (cockpit instruments cadets must "open")
  // ==========================================================
  const TOOLS = [
    { id: "instruments", icon: "🎚️", label: "Cockpit Instruments" },
    { id: "weather", icon: "🌡️", label: "Weather Board" },
    { id: "nav", icon: "🧭", label: "Navigation Chart" },
    { id: "ops", icon: "🛬", label: "Airfield Ops Desk" },
    { id: "glider", icon: "🪂", label: "Glider Panel" },
    { id: "drill", icon: "🎖️", label: "Drill Square" },
    { id: "radio", icon: "📻", label: "Radio Set" },
    { id: "comms", icon: "📡", label: "Comms Log" }
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
  }

  // ==========================================================
  // SCENE SVG GENERATORS
  // ==========================================================
  function sceneSVG(scene) {
    const W = 600, H = 180;
    const base = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">`;
    const end = `</svg>`;
    const grad = (id, c1, c2) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>`;

    if (scene === "cockpit") {
      return base + grad("g", "#0a1830", "#040a18") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <circle cx="300" cy="90" r="60" fill="none" stroke="#49b6ff" stroke-width="2" opacity="0.5"/>
        <circle cx="300" cy="90" r="45" fill="none" stroke="#2a6c9e" stroke-width="1" opacity="0.4"/>
        <line x1="300" y1="40" x2="300" y2="140" stroke="#234368" stroke-width="1"/>
        <line x1="250" y1="90" x2="350" y2="90" stroke="#234368" stroke-width="1"/>
        <polygon points="300,55 308,90 300,125 292,90" fill="#49b6ff" opacity="0.7"/>
        <rect x="60" y="40" width="90" height="50" rx="6" fill="#0f1c30" stroke="#234368"/>
        <text x="105" y="62" fill="#49b6ff" font-size="11" font-family="monospace" text-anchor="middle">ALT</text>
        <text x="105" y="80" fill="#7ad4ff" font-size="16" font-family="monospace" text-anchor="middle" font-weight="bold">3500</text>
        <rect x="450" y="40" width="90" height="50" rx="6" fill="#0f1c30" stroke="#234368"/>
        <text x="495" y="62" fill="#49b6ff" font-size="11" font-family="monospace" text-anchor="middle">SPD</text>
        <text x="495" y="80" fill="#7ad4ff" font-size="16" font-family="monospace" text-anchor="middle" font-weight="bold">95</text>
        <rect x="180" y="120" width="240" height="30" rx="5" fill="#0f1c30" stroke="#234368"/>
        <text x="300" y="140" fill="#6f86a8" font-size="11" font-family="monospace" text-anchor="middle">FLIGHT DECK — INSTRUMENT PANEL</text>
      ` + end;
    }
    if (scene === "weather") {
      return base + grad("g", "#1a2540", "#0a1424") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <circle cx="120" cy="60" r="35" fill="#234368" opacity="0.6"/>
        <circle cx="120" cy="60" r="35" fill="none" stroke="#49b6ff" stroke-width="1" opacity="0.4"/>
        <path d="M95 60 Q120 35 145 60 Q120 85 95 60" fill="#49b6ff" opacity="0.3"/>
        <path d="M100 70 Q120 50 140 70" fill="none" stroke="#7ad4ff" stroke-width="1.5" opacity="0.6"/>
        <text x="120" y="115" fill="#aebfd6" font-size="10" font-family="monospace" text-anchor="middle">CLOUD TYPE</text>
        <rect x="240" y="35" width="120" height="80" rx="8" fill="#0f1c30" stroke="#234368"/>
        <text x="300" y="55" fill="#49b6ff" font-size="10" font-family="monospace" text-anchor="middle">WIND</text>
        <line x1="300" y1="75" x2="345" y2="75" stroke="#49b6ff" stroke-width="2"/>
        <polygon points="345,75 338,71 338,79" fill="#49b6ff"/>
        <text x="300" y="100" fill="#7ad4ff" font-size="14" font-family="monospace" text-anchor="middle" font-weight="bold">12 KT</text>
        <rect x="410" y="35" width="120" height="80" rx="8" fill="#0f1c30" stroke="#234368"/>
        <text x="470" y="55" fill="#49b6ff" font-size="10" font-family="monospace" text-anchor="middle">VISIBILITY</text>
        <text x="470" y="82" fill="#7ad4ff" font-size="18" font-family="monospace" text-anchor="middle" font-weight="bold">8 KM</text>
        <text x="470" y="102" fill="#38d97b" font-size="9" font-family="monospace" text-anchor="middle">VFR OK</text>
      ` + end;
    }
    if (scene === "navigation") {
      return base + grad("g", "#0d1f15", "#061008") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <g opacity="0.15" stroke="#38d97b" stroke-width="0.5">
          <line x1="0" y1="45" x2="600" y2="45"/><line x1="0" y1="90" x2="600" y2="90"/><line x1="0" y1="135" x2="600" y2="135"/>
          <line x1="150" y1="0" x2="150" y2="180"/><line x1="300" y1="0" x2="300" y2="180"/><line x1="450" y1="0" x2="450" y2="180"/>
        </g>
        <circle cx="100" cy="140" r="8" fill="#49b6ff"/>
        <circle cx="100" cy="140" r="14" fill="none" stroke="#49b6ff" stroke-width="1" opacity="0.5"/>
        <text x="100" y="165" fill="#7ad4ff" font-size="9" font-family="monospace" text-anchor="middle">HOME</text>
        <circle cx="500" cy="50" r="8" fill="#ffd66b"/>
        <circle cx="500" cy="50" r="14" fill="none" stroke="#ffd66b" stroke-width="1" opacity="0.5"/>
        <text x="500" y="35" fill="#ffd66b" font-size="9" font-family="monospace" text-anchor="middle">TRAINING AREA</text>
        <line x1="108" y1="132" x2="492" y2="58" stroke="#49b6ff" stroke-width="2" stroke-dasharray="6 4"/>
        <text x="300" y="100" fill="#7ad4ff" font-size="11" font-family="monospace" text-anchor="middle">CRS 090° — VAR 5°W</text>
      ` + end;
    }
    if (scene === "airfield") {
      return base + grad("g", "#1a1f2e", "#0a0e18") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <rect x="80" y="70" width="440" height="40" rx="3" fill="#2a2a2a" stroke="#444"/>
        <line x1="80" y1="78" x2="520" y2="78" stroke="#fff" stroke-width="1" stroke-dasharray="20 14" opacity="0.4"/>
        <line x1="80" y1="102" x2="520" y2="102" stroke="#fff" stroke-width="1" stroke-dasharray="20 14" opacity="0.4"/>
        <text x="120" y="95" fill="#fff" font-size="22" font-family="monospace" text-anchor="middle" font-weight="bold">27</text>
        <text x="480" y="95" fill="#fff" font-size="22" font-family="monospace" text-anchor="middle" font-weight="bold">09</text>
        <rect x="200" y="120" width="180" height="16" rx="2" fill="#ffd66b" opacity="0.3"/>
        <line x1="200" y1="128" x2="380" y2="128" stroke="#ffd66b" stroke-width="1" stroke-dasharray="6 4"/>
        <text x="290" y="132" fill="#ffd66b" font-size="9" font-family="monospace" text-anchor="middle">TAXIWAY</text>
        <circle cx="540" cy="40" r="6" fill="#ff5a6e"/>
        <text x="540" y="28" fill="#ff5a6e" font-size="8" font-family="monospace" text-anchor="middle">WINDSOCK</text>
      ` + end;
    }
    if (scene === "glider") {
      return base + grad("g", "#1a2e40", "#0a1828") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <polygon points="300,50 380,85 300,120 220,85" fill="#e8f1ff" opacity="0.85"/>
        <line x1="300" y1="50" x2="300" y2="120" stroke="#49b6ff" stroke-width="1.5"/>
        <rect x="292" y="78" width="16" height="20" rx="2" fill="#0a1424" stroke="#49b6ff"/>
        <polygon points="300,120 305,135 300,150 295,135" fill="#49b6ff" opacity="0.7"/>
        <line x1="300" y1="100" x2="300" y2="165" stroke="#49b6ff" stroke-width="1" opacity="0.5"/>
        <line x1="120" y1="90" x2="280" y2="86" stroke="#ffd66b" stroke-width="2" stroke-dasharray="4 3"/>
        <rect x="80" y="80" width="40" height="24" rx="3" fill="#0f1c30" stroke="#ffd66b"/>
        <text x="100" y="96" fill="#ffd66b" font-size="9" font-family="monospace" text-anchor="middle">WINCH</text>
        <text x="300" y="45" fill="#7ad4ff" font-size="10" font-family="monospace" text-anchor="middle">GLIDER — WINCH LAUNCH</text>
      ` + end;
    }
    if (scene === "drill") {
      return base + grad("g", "#202028", "#101018") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <g fill="#49b6ff" opacity="0.6">
          <circle cx="150" cy="90" r="10"/><circle cx="200" cy="90" r="10"/><circle cx="250" cy="90" r="10"/>
          <circle cx="300" cy="90" r="10"/><circle cx="350" cy="90" r="10"/><circle cx="400" cy="90" r="10"/><circle cx="450" cy="90" r="10"/>
        </g>
        <g stroke="#49b6ff" stroke-width="1" opacity="0.3">
          <line x1="150" y1="100" x2="150" y2="120"/><line x1="200" y1="100" x2="200" y2="120"/>
          <line x1="250" y1="100" x2="250" y2="120"/><line x1="300" y1="100" x2="300" y2="120"/>
          <line x1="350" y1="100" x2="350" y2="120"/><line x1="400" y1="100" x2="400" y2="120"/><line x1="450" y1="100" x2="450" y2="120"/>
        </g>
        <text x="300" y="150" fill="#7ad4ff" font-size="11" font-family="monospace" text-anchor="middle">SQUAD — FORMATION LINE</text>
        <text x="300" y="40" fill="#ffd66b" font-size="10" font-family="monospace" text-anchor="middle">PARADE SQUARE</text>
      ` + end;
    }
    if (scene === "radio") {
      return base + grad("g", "#1a1410", "#0a0806") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <rect x="180" y="35" width="240" height="110" rx="10" fill="#0f1c30" stroke="#234368"/>
        <rect x="200" y="55" width="200" height="40" rx="4" fill="#03070f" stroke="#234368"/>
        <text x="300" y="80" fill="#38d97b" font-size="13" font-family="monospace" text-anchor="middle">TOWER — GO AHEAD</text>
        <circle cx="220" cy="120" r="8" fill="#ff5a6e"/><text x="220" y="135" fill="#6f86a8" font-size="8" font-family="monospace" text-anchor="middle">TX</text>
        <circle cx="260" cy="120" r="8" fill="#38d97b"/><text x="260" y="135" fill="#6f86a8" font-size="8" font-family="monospace" text-anchor="middle">RX</text>
        <circle cx="300" cy="120" r="10" fill="#49b6ff"/><text x="300" y="135" fill="#6f86a8" font-size="8" font-family="monospace" text-anchor="middle">PTT</text>
        <rect x="330" y="112" width="50" height="16" rx="3" fill="#03070f" stroke="#234368"/>
        <text x="355" y="124" fill="#7ad4ff" font-size="10" font-family="monospace" text-anchor="middle">122.8</text>
        <text x="300" y="30" fill="#7ad4ff" font-size="10" font-family="monospace" text-anchor="middle">RADIO SET — VHF</text>
      ` + end;
    }
    return base + `<rect width="${W}" height="${H}" fill="#0f1c30"/>` + end;
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
  const AIR_BADGES = [
    { id: "b_flight", icon: "🪽", name: "Principles of Flight", xp: 100, mission: "flight_principles" },
    { id: "b_weather", icon: "🌩️", name: "Meteorology", xp: 100, mission: "meteorology" },
    { id: "b_nav", icon: "🧭", name: "Navigation", xp: 100, mission: "navigation" },
    { id: "b_airfield", icon: "🛬", name: "Airfield Ops", xp: 100, mission: "airfield_ops" },
    { id: "b_glider", icon: "🪂", name: "Glider Pilot", xp: 100, mission: "gliding" },
    { id: "b_drill", icon: "🎖️", name: "Drill Master", xp: 100, mission: "air_drill" },
    { id: "b_radio", icon: "📻", name: "Radio Operator", xp: 100, mission: "radio_procs" }
  ];

  function refreshBadges() {
    state.badges = [];
    AIR_BADGES.forEach(b => {
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
    document.getElementById("topRank").textContent = rank.name.replace("Air Cadet ", "").replace("Cadet ", "");
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
    document.getElementById("cmdBadgeTotal").textContent = "of " + AIR_BADGES.length;

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
      return `<input class="task-slider" id="taskSlider" type="range" min="0" max="30" value="${sliderValue[idx]}" data-idx="${idx}" />
        <div class="slider-readout" id="sliderReadout">${sliderValue[idx]} knots</div>`;
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
        document.getElementById("sliderReadout").textContent = sliderValue[idx] + " knots";
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
      // record per-mission wrong attempts
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
      // Mission complete
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
      return { ok: false, msg: `The reading is set to ${v} knots. Adjust the dial to match the anemometer.` };
    }
    return { ok: false, msg: "Unknown task type." };
  }

  function showHint(task) {
    const fb = document.getElementById("taskFeedback");
    fb.className = "task-feedback show info";
    let hint = "";
    if (task.type === "select") hint = `The correct answer relates to: ${task.expected.split("(")[0].trim().slice(0, 40)}…`;
    else if (task.type === "type") hint = `The answer has ${task.expected.length} characters and starts with "${task.expected.charAt(0)}".`;
    else if (task.type === "note") hint = `Your note must include: ${task.keywords.join(", ")}${task.altKeywords ? " (or " + task.altKeywords.join(", ") + ")" : ""}.`;
    else if (task.type === "toggle") hint = "Click the toggle row to switch it to the ON (green) position.";
    else if (task.type === "slider") hint = `The target reading is close to ${task.expected} knots.`;
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
      const badge = AIR_BADGES.find(b => b.mission === m.id);
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
    const badge = AIR_BADGES.find(b => b.mission === m.id);
    const mp = missionProgress(m.id);
    return `<div class="task-console">
      <div class="task-body">
        <div class="complete-card">
          <div class="cc-ico">🏅</div>
          <div class="cc-title">Mission Complete: ${m.title}</div>
          <div class="cc-sub">${m.desc} You have successfully completed all ${m.tasks.length} tasks and earned the <strong>${badge ? badge.name : "Air Cadet"}</strong> badge.</div>
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
    document.getElementById("ringRankLabel").textContent = rank.name.replace("Air Cadet ", "").replace("Cadet ", "");
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
    toast("ok", "📡 SITREP filed! +20 XP");
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
    if (name === "tower") atcInit();
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
  // AIR TRAFFIC CONTROL GAME
  // ==========================================================
  // ==========================================================
  // AIR TRAFFIC CONTROL GAME ENGINE
  // Inserted into the air_training.js IIFE
  // ==========================================================

  // --- ATC STATE ---
  const ATC = {
    running: false,
    paused: false,
    planes: [],
    selectedId: null,
    score: 0,
    landed: 0,
    missed: 0,
    wave: 1,
    spawnTimer: 0,
    spawnInterval: 220, // frames at ~30fps
    waveTimer: 0,
    rafId: null,
    lastFrame: 0,
    callNumber: 0,
    collisions: 0,
    callParts: { callsign: null, instruction: null, detail: null }
  };

  const ATC_RADAR = { cx: 300, cy: 300, radius: 270 };

  const ATC_PHONETICS = ["ALPHA","BRAVO","CHARLIE","DELTA","ECHO","FOXTROT","GOLF","HOTEL","INDIA","JULIET","KILO","LIMA","MIKE","NOVEMBER","OSCAR","PAPA","QUEBEC","ROMEO","SIERRA","TANGO","UNIFORM","VICTOR","WHISKEY","XRAY","YANKEE","ZULU"];

  const ATC_AIRCRAFT_TYPES = [
    { name: "Cessna 152", short: "C152", speed: 1.1, color: "#7ad4ff", altRange: [2000, 3500] },
    { name: "Grob Tutor", short: "G115", speed: 1.4, color: "#38d97b", altRange: [2500, 4000] },
    { name: "Vigilant Glider", short: "VIG", speed: 0.7, color: "#ffb454", altRange: [1500, 2500] },
    { name: "Hercules", short: "C130", speed: 1.7, color: "#ff8a5a", altRange: [3000, 5000] },
    { name: "Chipmunk", short: "CHIP", speed: 1.0, color: "#b98aff", altRange: [2000, 3000] }
  ];

  // Runways: positioned on radar, each has an approach sector
  const ATC_RUNWAYS = [
    { id: "09", name: "Runway 09", x: 480, y: 300, heading: 90, approachAngle: 270, length: 60 },
    { id: "27", name: "Runway 27", x: 120, y: 300, heading: 270, approachAngle: 90, length: 60 },
    { id: "18", name: "Runway 18", x: 300, y: 480, heading: 180, approachAngle: 0, length: 60 },
    { id: "36", name: "Runway 36", x: 300, y: 120, heading: 360, approachAngle: 180, length: 60 }
  ];

  const ATC_INSTRUCTIONS = ["Cleared to land", "Cleared for runway", "Hold", "Turn heading"];

  // --- RADAR SVG INIT ---
  function atcInitRadarSVG() {
    const svg = document.getElementById("atcRadar");
    if (!svg) return;
    const cx = ATC_RADAR.cx, cy = ATC_RADAR.cy, r = ATC_RADAR.radius;

    let html = "";
    // Background grid circles
    for (let i = 1; i <= 4; i++) {
      const rr = (r / 4) * i;
      html += `<circle cx="${cx}" cy="${cy}" r="${rr}" fill="none" stroke="#11243d" stroke-width="1"/>`;
    }
    // Cross lines
    html += `<line x1="${cx - r}" y1="${cy}" x2="${cx + r}" y2="${cy}" stroke="#11243d" stroke-width="1"/>`;
    html += `<line x1="${cx}" y1="${cy - r}" x2="${cx}" y2="${cy + r}" stroke="#11243d" stroke-width="1"/>`;
    // Diagonal lines
    const d = r * 0.707;
    html += `<line x1="${cx - d}" y1="${cy - d}" x2="${cx + d}" y2="${cy + d}" stroke="#0d1e33" stroke-width="1"/>`;
    html += `<line x1="${cx - d}" y1="${cy + d}" x2="${cx + d}" y2="${cy - d}" stroke="#0d1e33" stroke-width="1"/>`;

    // Outer range ring
    html += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#1a3858" stroke-width="2"/>`;

    // Compass labels
    html += `<text x="${cx}" y="${cy - r + 14}" text-anchor="middle" class="atc-label" fill="#2a6c9e" font-size="11" font-weight="700">N</text>`;
    html += `<text x="${cx + r - 12}" y="${cy + 4}" text-anchor="middle" class="atc-label" fill="#2a6c9e" font-size="11" font-weight="700">E</text>`;
    html += `<text x="${cx}" y="${cy + r - 6}" text-anchor="middle" class="atc-label" fill="#2a6c9e" font-size="11" font-weight="700">S</text>`;
    html += `<text x="${cx - r + 12}" y="${cy + 4}" text-anchor="middle" class="atc-label" fill="#2a6c9e" font-size="11" font-weight="700">W</text>`;

    // Airfield (center)
    html += `<circle cx="${cx}" cy="${cy}" r="8" fill="#1a3858" stroke="#49b6ff" stroke-width="1.5"/>`;
    html += `<circle cx="${cx}" cy="${cy}" r="3" fill="#49b6ff"/>`;
    html += `<text x="${cx}" y="${cy - 14}" text-anchor="middle" class="atc-label" fill="#49b6ff" font-size="9">SKYWARD</text>`;

    // Runways
    ATC_RUNWAYS.forEach(rw => {
      const ax = cx + Math.cos(rw.approachAngle * Math.PI / 180) * 0;
      const dx = Math.cos(rw.heading * Math.PI / 180);
      const dy = Math.sin(rw.heading * Math.PI / 180);
      const sx = rw.x - dx * rw.length / 2;
      const sy = rw.y - dy * rw.length / 2;
      const ex = rw.x + dx * rw.length / 2;
      const ey = rw.y + dy * rw.length / 2;
      html += `<line x1="${sx}" y1="${sy}" x2="${ex}" y2="${ey}" stroke="#49b6ff" stroke-width="6" stroke-linecap="round" opacity="0.5"/>`;
      html += `<line x1="${sx}" y1="${sy}" x2="${ex}" y2="${ey}" stroke="#fff" stroke-width="1" stroke-dasharray="4 4" opacity="0.3"/>`;
      html += `<text x="${rw.x}" y="${rw.y + (dy > 0 ? 16 : -8)}" text-anchor="middle" class="atc-label" fill="#7ad4ff" font-size="10" font-weight="700">RW ${rw.id}</text>`;
      // Approach zone
      html += `<circle class="atc-runway-zone" cx="${rw.x}" cy="${rw.y}" r="35"/>`;
    });

    // Sweep line
    html += `<g class="atc-sweep"><line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - r}" stroke="rgba(73,182,255,0.35)" stroke-width="2"/><path d="M${cx} ${cy} L${cx} ${cy - r} A${r} ${r} 0 0 1 ${cx + r * 0.5} ${cy - r * 0.866} Z" fill="rgba(73,182,255,0.06)"/></g>`;

    // Dynamic layers
    html += `<g id="atcTrailsLayer"></g>`;
    html += `<g id="atcPlanesLayer"></g>`;
    html += `<g id="atcEffectsLayer"></g>`;

    svg.innerHTML = html;
  }

  // --- PLANE FACTORY ---
  function atcSpawnPlane() {
    // Pick edge entry point
    const cx = ATC_RADAR.cx, cy = ATC_RADAR.cy, r = ATC_RADAR.radius;
    const edge = Math.floor(Math.random() * 8) * 45; // 0,45,90...
    const ang = edge * Math.PI / 180;
    const px = cx + Math.cos(ang) * (r + 20);
    const py = cy + Math.sin(ang) * (r + 20);

    // Heading roughly toward center area (with some offset)
    const toCenterAng = Math.atan2(cy - py, cx - px);
    const jitter = (Math.random() - 0.5) * 0.5;
    const heading = toCenterAng + jitter;

    const type = ATC_AIRCRAFT_TYPES[Math.floor(Math.random() * ATC_AIRCRAFT_TYPES.length)];
    const phonetic = ATC_PHONETICS[Math.floor(Math.random() * ATC_PHONETICS.length)];
    ATC.callNumber++;
    const num = (ATC.callNumber % 9) + 1;
    const callsign = phonetic + "-" + num;

    // Assign a target runway (random)
    const runway = ATC_RUNWAYS[Math.floor(Math.random() * ATC_RUNWAYS.length)];

    const plane = {
      id: "p" + Date.now() + Math.floor(Math.random() * 1000),
      callsign: callsign,
      type: type,
      x: px,
      y: py,
      heading: heading, // radians
      speed: type.speed * (0.8 + Math.random() * 0.4),
      altitude: type.altRange[0] + Math.floor(Math.random() * (type.altRange[1] - type.altRange[0])),
      targetRunway: runway,
      state: "inbound", // inbound -> directed -> landing -> landed | lost | holding
      trail: [],
      fuel: 100,
      assignedInstruction: null,
      assignedDetail: null,
      holdingCenter: null,
      holdingAngle: 0,
      turnTarget: null,
      landProgress: 0,
      spawnFrame: ATC.frame || 0
    };
    ATC.planes.push(plane);
    atcLog("info", "◆ " + callsign + " (" + type.short + ") entering airspace, inbound to RW " + runway.id);
    atcUpdateStatus("📡 " + callsign + " inbound — awaiting your instructions.");
  }

  // --- ANIMATION LOOP ---
  function atcLoop(ts) {
    if (!ATC.running || ATC.paused) return;
    if (!ATC.lastFrame) ATC.lastFrame = ts;
    const dt = Math.min(50, ts - ATC.lastFrame);
    ATC.lastFrame = ts;
    if (!ATC.frame) ATC.frame = 0;
    ATC.frame++;

    atcUpdate(dt);
    atcRender();

    ATC.rafId = requestAnimationFrame(atcLoop);
  }

  function atcUpdate(dt) {
    const cx = ATC_RADAR.cx, cy = ATC_RADAR.cy, r = ATC_RADAR.radius;

    // Spawn logic
    ATC.spawnTimer += dt;
    const interval = Math.max(80, ATC.spawnInterval - (ATC.wave - 1) * 25);
    if (ATC.spawnTimer >= interval && ATC.planes.filter(p => p.state === "inbound" || p.state === "directed" || p.state === "holding" || p.state === "landing").length < 3 + Math.floor(ATC.wave / 2)) {
      ATC.spawnTimer = 0;
      atcSpawnPlane();
    }

    // Wave progression: every 6 landings + misseds = wave up
    if (ATC.landed + ATC.missed > 0 && (ATC.landed + ATC.missed) % 6 === 0) {
      if (ATC.wave < Math.floor((ATC.landed + ATC.missed) / 6) + 1) {
        ATC.wave = Math.floor((ATC.landed + ATC.missed) / 6) + 1;
        atcLog("info", "▣ WAVE " + ATC.wave + " — traffic increasing. Stay sharp.");
        atcToast("Wave " + ATC.wave + " — more traffic incoming!");
        atcUpdateScoreboard();
      }
    }

    // Update each plane
    for (let i = ATC.planes.length - 1; i >= 0; i--) {
      const p = ATC.planes[i];
      const speedMul = (dt / 33);

      // Fuel burn
      if (p.state !== "landed" && p.state !== "lost") {
        p.fuel = Math.max(0, p.fuel - 0.04 * speedMul);
      }

      if (p.state === "inbound") {
        // Fly toward center; when close enough, enter a loiter orbit so the
        // controller has time to issue instructions before the plane departs.
        const distC = Math.hypot(p.x - cx, p.y - cy);
        if (distC < 160 && !p.loitering) {
          // Begin orbiting around a holding point near current position
          p.loitering = true;
          p.loiterCenter = { x: p.x, y: p.y };
          p.loiterAngle = Math.atan2(p.y - p.loiterCenter.y, p.x - p.loiterCenter.x);
          p.loiterRadius = 30 + Math.random() * 15;
          atcLog("info", "◯ " + p.callsign + " holding in traffic pattern — awaiting clearance.");
        }
        if (p.loitering) {
          // Orbit the loiter center slowly
          p.loiterAngle += 0.025 * speedMul;
          p.x = p.loiterCenter.x + Math.cos(p.loiterAngle) * p.loiterRadius;
          p.y = p.loiterCenter.y + Math.sin(p.loiterAngle) * p.loiterRadius;
          p.heading = p.loiterAngle + Math.PI / 2;
        } else {
          p.x += Math.cos(p.heading) * p.speed * speedMul;
          p.y += Math.sin(p.heading) * p.speed * speedMul;
        }
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 15) p.trail.shift();
        // Fuel burn while loitering — creates urgency
        // If leaves airspace on far side without being directed
        const dist = Math.hypot(p.x - cx, p.y - cy);
        if (dist > r + 40) {
          p.state = "lost";
          ATC.missed++;
          ATC.score = Math.max(0, ATC.score - 30);
          atcLog("err", "✗ " + p.callsign + " left controlled airspace uncontrolled! −30 pts.");
          atcUpdateStatus("⚠ " + p.callsign + " left airspace — missed approach!");
          atcUpdateScoreboard();
          if (ATC.selectedId === p.id) { ATC.selectedId = null; atcRenderSelected(); }
        }
      } else if (p.state === "directed") {
        // Head toward target runway
        const rw = p.targetRunway;
        const dx = rw.x - p.x;
        const dy = rw.y - p.y;
        const targetAng = Math.atan2(dy, dx);
        // Gradually turn
        let diff = targetAng - p.heading;
        while (diff > Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;
        p.heading += diff * 0.08 * speedMul;
        p.x += Math.cos(p.heading) * p.speed * speedMul;
        p.y += Math.sin(p.heading) * p.speed * speedMul;
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 15) p.trail.shift();

        // Check if close enough to runway to begin landing
        const distRw = Math.hypot(dx, dy);
        if (distRw < 40) {
          p.state = "landing";
          p.landProgress = 0;
          atcLog("info", "→ " + p.callsign + " on final approach to RW " + rw.id);
        }
      } else if (p.state === "landing") {
        // Descend to runway
        const rw = p.targetRunway;
        p.landProgress += 0.02 * speedMul;
        p.x += (rw.x - p.x) * 0.1 * speedMul;
        p.y += (rw.y - p.y) * 0.1 * speedMul;
        p.altitude = Math.max(0, p.altitude - 80 * speedMul);
        if (p.landProgress >= 1 || Math.hypot(p.x - rw.x, p.y - rw.y) < 4) {
          p.state = "landed";
          p.x = rw.x;
          p.y = rw.y;
          const bonus = p.fuel < 30 ? 50 : 0;
          const pts = 100 + bonus;
          ATC.score += pts;
          ATC.landed++;
          atcLog("ok", "✓ " + p.callsign + " LANDED on RW " + rw.id + "! +" + pts + " pts" + (bonus ? " (low-fuel bonus!)" : ""));
          atcUpdateStatus("✅ " + p.callsign + " landed safely on RW " + rw.id + " — +" + pts + " pts");
          atcUpdateScoreboard();
          if (ATC.selectedId === p.id) { ATC.selectedId = null; atcRenderSelected(); }
          // Remove after delay
          setTimeout(() => {
            const idx = ATC.planes.indexOf(p);
            if (idx >= 0) ATC.planes.splice(idx, 1);
            atcRender();
          }, 2000);
        }
      } else if (p.state === "holding") {
        // Orbit around holding center
        if (!p.holdingCenter) {
          // Place holding center at current position offset
          p.holdingCenter = { x: p.x, y: p.y };
          p.holdingAngle = 0;
          p.holdingRadius = 35;
        }
        p.holdingAngle += 0.03 * speedMul;
        p.x = p.holdingCenter.x + Math.cos(p.holdingAngle) * p.holdingRadius;
        p.y = p.holdingCenter.y + Math.sin(p.holdingAngle) * p.holdingRadius;
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 20) p.trail.shift();
      } else if (p.state === "turning") {
        // Turn to assigned heading then resume inbound behavior
        if (p.turnTarget !== null) {
          let diff = p.turnTarget - p.heading;
          while (diff > Math.PI) diff -= Math.PI * 2;
          while (diff < -Math.PI) diff += Math.PI * 2;
          p.heading += diff * 0.1 * speedMul;
          p.x += Math.cos(p.heading) * p.speed * speedMul;
          p.y += Math.sin(p.heading) * p.speed * speedMul;
          p.trail.push({ x: p.x, y: p.y });
          if (p.trail.length > 15) p.trail.shift();
          if (Math.abs(diff) < 0.05) {
            p.state = "inbound";
            p.turnTarget = null;
            atcLog("info", "↻ " + p.callsign + " established on new heading.");
          }
        }
      }

      // Collision detection
      for (let j = i - 1; j >= 0; j--) {
        const q = ATC.planes[j];
        if (q.state === "landed" || q.state === "lost") continue;
        const d = Math.hypot(p.x - q.x, p.y - q.y);
        const altDiff = Math.abs(p.altitude - q.altitude);
        if (d < 22 && altDiff < 500 && p.state !== "landing" && q.state !== "landing") {
          // Collision!
          atcCollision(p, q);
        }
      }
    }

    // Clean up old landed/lost planes
    ATC.planes = ATC.planes.filter(p => {
      if (p.state === "lost") {
        // Keep for 1.5s then remove
        if (!p.lostTime) p.lostTime = Date.now();
        return Date.now() - p.lostTime < 1500;
      }
      return p.state !== "landed" || (p.state === "landed" && Date.now() - (p.landTime || Date.now()) < 2000);
    });
  }

  function atcCollision(a, b) {
    ATC.collisions++;
    ATC.score = Math.max(0, ATC.score - 50);
    a.state = "lost";
    b.state = "lost";
    a.lostTime = Date.now();
    b.lostTime = Date.now();
    atcSpawnEffect(a.x, a.y, "collision");
    atcSpawnEffect(b.x, b.y, "collision");
    atcLog("err", "☠ COLLISION! " + a.callsign + " and " + b.callsign + " — −50 pts!");
    atcUpdateStatus("☠ COLLISION ALERT: " + a.callsign + " / " + b.callsign + "!");
    atcToast("Collision! " + a.callsign + " / " + b.callsign + " −50", "err");
    atcUpdateScoreboard();
    if (ATC.selectedId === a.id || ATC.selectedId === b.id) { ATC.selectedId = null; atcRenderSelected(); }
  }

  function atcSpawnEffect(x, y, kind) {
    const layer = document.getElementById("atcEffectsLayer");
    if (!layer) return;
    if (kind === "collision") {
      const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      c.setAttribute("cx", x);
      c.setAttribute("cy", y);
      c.setAttribute("r", 4);
      c.setAttribute("fill", "#ff5a6e");
      c.setAttribute("class", "atc-collision-burst");
      layer.appendChild(c);
      setTimeout(() => c.remove(), 700);
    }
  }

  // --- RENDER ---
  function atcRender() {
    const layer = document.getElementById("atcPlanesLayer");
    const trailLayer = document.getElementById("atcTrailsLayer");
    if (!layer || !trailLayer) return;

    // Trails
    let trailHTML = "";
    ATC.planes.forEach(p => {
      if (p.trail.length < 2) return;
      const pts = p.trail.map(t => t.x + "," + t.y).join(" ");
      const color = p.state === "landed" ? "#49b6ff" : p.state === "lost" ? "#ff5a6e" : p.type.color;
      trailHTML += `<polyline class="atc-trail" points="${pts}" fill="none" stroke="${color}" stroke-width="1.5" opacity="0.3"/>`;
    });
    trailLayer.innerHTML = trailHTML;

    // Planes
    let planeHTML = "";
    ATC.planes.forEach(p => {
      const isSel = ATC.selectedId === p.id;
      let color, cls;
      if (p.state === "lost") { color = "#ff5a6e"; cls = "atc-alert-pulse"; }
      else if (p.state === "landed") { color = "#49b6ff"; cls = ""; }
      else if (p.fuel < 30 && p.state !== "landing") { color = "#ff5a6e"; cls = "atc-fuel-low"; }
      else if (isSel) { color = "#ffd66b"; cls = "selected"; }
      else if (p.state === "directed" || p.state === "landing") { color = p.type.color; cls = ""; }
      else { color = p.type.color; cls = ""; }

      const selCls = isSel ? " selected" : "";
      planeHTML += `<g class="atc-plane-dot${selCls}" data-pid="${p.id}" style="cursor:pointer">`;
      // Plane marker (triangle pointing in heading direction)
      const h = p.heading;
      const s = 7;
      const p1x = p.x + Math.cos(h) * s;
      const p1y = p.y + Math.sin(h) * s;
      const p2x = p.x + Math.cos(h + 2.5) * s;
      const p2y = p.y + Math.sin(h + 2.5) * s;
      const p3x = p.x + Math.cos(h - 2.5) * s;
      const p3y = p.y + Math.sin(h - 2.5) * s;
      planeHTML += `<polygon points="${p1x},${p1y} ${p2x},${p2y} ${p3x},${p3y}" fill="${color}" class="${cls}"/>`;
      if (p.fuel < 30 && p.state !== "landing" && p.state !== "lost") {
        planeHTML += `<circle cx="${p.x}" cy="${p.y}" r="9" fill="none" stroke="#ff5a6e" stroke-width="1" opacity="0.5" class="atc-alert-pulse"/>`;
      }
      // Label
      const lblCls = isSel ? "atc-label atc-label-selected" : "atc-label";
      const lblY = p.y - 12;
      planeHTML += `<text x="${p.x + 10}" y="${lblY}" class="${lblCls}">${p.callsign}</text>`;
      if (isSel) {
        planeHTML += `<text x="${p.x + 10}" y="${lblY + 10}" class="atc-label" fill="#ffd66b" font-size="8">${p.type.short} ${Math.round(p.altitude)}ft</text>`;
      }
      planeHTML += `</g>`;
    });
    layer.innerHTML = planeHTML;

    // Bind clicks
    layer.querySelectorAll(".atc-plane-dot").forEach(g => {
      g.addEventListener("click", () => atcSelectPlane(g.dataset.pid));
    });
  }

  // --- SELECTION ---
  function atcSelectPlane(pid) {
    const p = ATC.planes.find(x => x.id === pid);
    if (!p) return;
    if (p.state === "landed" || p.state === "lost") {
      atcLog("warn", "⚠ " + p.callsign + " is no longer active.");
      return;
    }
    ATC.selectedId = pid;
    atcRenderSelected();
    atcBuildCallChips();
    atcRender();
    atcLog("info", "◉ Selected " + p.callsign + " — build your transmission.");
    atcUpdateStatus("◉ Tracking " + p.callsign + " — issue instructions via radio.");
  }

  function atcRenderSelected() {
    const empty = document.getElementById("atsEmpty");
    const detail = document.getElementById("atsDetail");
    const p = ATC.planes.find(x => x.id === ATC.selectedId);

    if (!p) {
      if (empty) empty.style.display = "block";
      if (detail) detail.style.display = "none";
      atcClearCall();
      return;
    }
    if (empty) empty.style.display = "none";
    if (detail) detail.style.display = "block";
    document.getElementById("atsCallsign").textContent = p.callsign;
    document.getElementById("atsType").textContent = p.type.name;
    document.getElementById("atsSpeed").textContent = Math.round(p.speed * 60) + " kts";
    const hdgDeg = ((p.heading * 180 / Math.PI) + 360) % 360;
    document.getElementById("atsHeading").textContent = Math.round(hdgDeg).toString().padStart(3, "0") + "°";
    document.getElementById("atsAlt").textContent = Math.round(p.altitude) + " ft";
    const dist = Math.hypot(p.x - ATC_RADAR.cx, p.y - ATC_RADAR.cy);
    document.getElementById("atsDist").textContent = Math.round(dist / 3) + " NM";
    const fuelEl = document.getElementById("atsFuel");
    fuelEl.textContent = Math.round(p.fuel) + "%";
    fuelEl.style.color = p.fuel < 30 ? "var(--red)" : "var(--green)";
  }

  // --- RADIO CALL BUILDER ---
  function atcBuildCallChips() {
    const p = ATC.planes.find(x => x.id === ATC.selectedId);
    // Call sign chips: only show active planes' callsigns, highlight selected
    const callLayer = document.getElementById("atcCallChips");
    if (!callLayer) return;
    let chips = "";
    ATC.planes.forEach(pl => {
      if (pl.state === "landed" || pl.state === "lost") return;
      const sel = ATC.callParts.callsign === pl.callsign ? " selected" : "";
      chips += `<div class="atc-chip${sel}" data-callsign="${pl.callsign}">${pl.callsign}</div>`;
    });
    callLayer.innerHTML = chips || '<span style="font-size:11px;color:var(--ink-3)">No active aircraft.</span>';
    callLayer.querySelectorAll(".atc-chip").forEach(c => {
      c.addEventListener("click", () => {
        ATC.callParts.callsign = c.dataset.callsign;
        atcRefreshCallChips();
        atcUpdateBuiltLine();
      });
    });

    // Instruction chips
    const instrLayer = document.getElementById("atcInstrChips");
    if (instrLayer) {
      instrLayer.innerHTML = ATC_INSTRUCTIONS.map(ins => {
        const sel = ATC.callParts.instruction === ins ? " selected" : "";
        return `<div class="atc-chip${sel}" data-instruction="${ins}">${ins}</div>`;
      }).join("");
      instrLayer.querySelectorAll(".atc-chip").forEach(c => {
        c.addEventListener("click", () => {
          ATC.callParts.instruction = c.dataset.instruction;
          atcRefreshCallChips();
          atcUpdateBuiltLine();
          atcBuildDetailChips();
        });
      });
    }
    atcBuildDetailChips();
  }

  function atcBuildDetailChips() {
    const detailLayer = document.getElementById("atcDetailChips");
    if (!detailLayer) return;
    let chips = "";
    const instr = ATC.callParts.instruction;
    if (instr === "Cleared to land" || instr === "Cleared for runway") {
      ATC_RUNWAYS.forEach(rw => {
        const sel = ATC.callParts.detail === rw.id ? " selected" : "";
        chips += `<div class="atc-chip${sel}" data-detail="${rw.id}">RW ${rw.id}</div>`;
      });
    } else if (instr === "Turn heading") {
      ["N","NE","E","SE","S","SW","W","NW"].forEach(h => {
        const sel = ATC.callParts.detail === h ? " selected" : "";
        chips += `<div class="atc-chip${sel}" data-detail="${h}">${h}</div>`;
      });
    } else if (instr === "Hold") {
      const sel = ATC.callParts.detail === "present position" ? " selected" : "";
      chips += `<div class="atc-chip${sel}" data-detail="present position">present position</div>`;
    }
    detailLayer.innerHTML = chips || '<span style="font-size:11px;color:var(--ink-3)">Select an instruction first.</span>';
    detailLayer.querySelectorAll(".atc-chip").forEach(c => {
      c.addEventListener("click", () => {
        ATC.callParts.detail = c.dataset.detail;
        atcRefreshCallChips();
        atcUpdateBuiltLine();
      });
    });
  }

  function atcRefreshCallChips() {
    document.querySelectorAll("#atcCallChips .atc-chip").forEach(c => {
      c.classList.toggle("selected", c.dataset.callsign === ATC.callParts.callsign);
    });
    document.querySelectorAll("#atcInstrChips .atc-chip").forEach(c => {
      c.classList.toggle("selected", c.dataset.instruction === ATC.callParts.instruction);
    });
    document.querySelectorAll("#atcDetailChips .atc-chip").forEach(c => {
      c.classList.toggle("selected", c.dataset.detail === ATC.callParts.detail);
    });
  }

  function atcUpdateBuiltLine() {
    const txt = document.getElementById("ablText");
    const btn = document.getElementById("atcTransmitBtn");
    if (!txt) return;
    const parts = ATC.callParts;
    let str = "";
    let valid = true;
    if (parts.callsign) str += parts.callsign + ", ";
    else { str += "[callsign], "; valid = false; }
    str += "this is Tower, ";
    if (parts.instruction) {
      str += parts.instruction;
      if (parts.instruction === "Cleared to land" || parts.instruction === "Cleared for runway") {
        if (parts.detail) str += " runway " + parts.detail;
        else { str += " [runway]"; valid = false; }
      } else if (parts.instruction === "Turn heading") {
        if (parts.detail) str += " " + parts.detail;
        else { str += " [heading]"; valid = false; }
      } else if (parts.instruction === "Hold") {
        str += " at present position";
      }
    } else { str += "[instruction]"; valid = false; }
    str += ", over.";
    txt.textContent = str;
    txt.classList.toggle("invalid", !valid);
    if (btn) btn.disabled = !valid;
  }

  function atcClearCall() {
    ATC.callParts = { callsign: null, instruction: null, detail: null };
    atcBuildCallChips();
    atcUpdateBuiltLine();
  }

  // --- TRANSMIT ---
  function atcTransmit() {
    const parts = ATC.callParts;
    if (!parts.callsign || !parts.instruction) return;
    const target = ATC.planes.find(p => p.callsign === parts.callsign && p.state !== "landed" && p.state !== "lost");
    const selPlane = ATC.planes.find(p => p.id === ATC.selectedId);

    const fullCall = parts.callsign + ", this is Tower, " + parts.instruction +
      (parts.detail ? (parts.instruction === "Cleared to land" || parts.instruction === "Cleared for runway" ? " runway " + parts.detail : (parts.instruction === "Turn heading" ? " " + parts.detail : "")) : "") +
      (parts.instruction === "Hold" ? " at present position" : "") + ", over.";

    // Check call sign correctness
    if (selPlane && parts.callsign !== selPlane.callsign) {
      // Called the wrong aircraft
      ATC.score = Math.max(0, ATC.score - 20);
      atcLog("err", "✗ Transmit: \"" + fullCall + "\" — Wrong callsign! You are tracking " + selPlane.callsign + ". −20 pts.");
      atcUpdateStatus("⚠ Wrong callsign! You called " + parts.callsign + " but tracking " + selPlane.callsign + ".");
      atcToast("Wrong call sign! −20 pts", "err");
      atcClearCall();
      atcUpdateScoreboard();
      return;
    }

    if (!target) {
      atcLog("warn", "⚠ " + parts.callsign + " not on frequency or no longer active.");
      atcClearCall();
      return;
    }

    // Execute instruction
    const instr = parts.instruction;
    if (instr === "Cleared to land") {
      const rw = ATC_RUNWAYS.find(r => r.id === parts.detail);
      if (!rw) { atcLog("err", "✗ Invalid runway."); return; }
      target.targetRunway = rw;
      target.state = "directed";
      target.loitering = false;
      target.assignedInstruction = instr;
      ATC.score += 10;
      atcLog("ok", "✓ TX: \"" + fullCall + "\" — " + target.callsign + " cleared to land RW " + rw.id + ". +10");
      atcUpdateStatus("✅ " + target.callsign + " cleared to land RW " + rw.id);
    } else if (instr === "Cleared for runway") {
      const rw = ATC_RUNWAYS.find(r => r.id === parts.detail);
      if (!rw) { atcLog("err", "✗ Invalid runway."); return; }
      target.targetRunway = rw;
      target.state = "directed";
      target.loitering = false;
      target.assignedInstruction = instr;
      ATC.score += 40;
      atcLog("ok", "✓ TX: \"" + fullCall + "\" — " + target.callsign + " heading to RW " + rw.id + ". +40");
      atcUpdateStatus("→ " + target.callsign + " cleared for RW " + rw.id);
    } else if (instr === "Hold") {
      target.state = "holding";
      target.holdingCenter = null;
      target.loitering = false;
      target.assignedInstruction = instr;
      ATC.score += 15;
      atcLog("ok", "✓ TX: \"" + fullCall + "\" — " + target.callsign + " entering hold. +15");
      atcUpdateStatus("⟳ " + target.callsign + " holding at present position");
    } else if (instr === "Turn heading") {
      const compassAngles = { "N": -Math.PI/2, "NE": -Math.PI/4, "E": 0, "SE": Math.PI/4, "S": Math.PI/2, "SW": 3*Math.PI/4, "W": Math.PI, "NW": -3*Math.PI/4 };
      target.turnTarget = compassAngles[parts.detail];
      target.state = "turning";
      target.loitering = false;
      target.assignedInstruction = instr;
      ATC.score += 10;
      atcLog("ok", "✓ TX: \"" + fullCall + "\" — " + target.callsign + " turning " + parts.detail + ". +10");
      atcUpdateStatus("↻ " + target.callsign + " turning to " + parts.detail);
    }

    atcClearCall();
    atcUpdateScoreboard();
    atcRenderSelected();
  }

  // --- HELPERS ---
  function atcLog(kind, text) {
    const term = document.getElementById("atcTerminal");
    if (!term) return;
    const ln = document.createElement("div");
    ln.className = "atc-ln atc-ln-" + kind;
    ln.textContent = text;
    term.appendChild(ln);
    term.scrollTop = term.scrollHeight;
    // Cap log
    while (term.children.length > 60) term.removeChild(term.firstChild);
  }

  function atcUpdateStatus(text) {
    const el = document.getElementById("atcStatusTxt");
    const strip = document.getElementById("atcStatusStrip");
    if (el) el.textContent = text;
    if (strip) {
      strip.classList.remove("alert", "success");
      if (text.includes("⚠") || text.includes("☠")) strip.classList.add("alert");
      else if (text.includes("✅")) strip.classList.add("success");
    }
  }

  function atcUpdateScoreboard() {
    const set = (id, val) => { const e = document.getElementById(id); if (e) e.textContent = val; };
    set("atcScore", ATC.score);
    set("atcLanded", ATC.landed);
    set("atcWave", ATC.wave);
    set("atcMissed", ATC.missed);
  }

  function atcToast(text, kind) {
    if (typeof toast === "function") {
      toast(kind === "err" ? "err" : "ok", text);
    }
  }

  // --- GAME CONTROL ---
  function atcStartGame() {
    if (ATC.running) return;
    ATC.running = true;
    ATC.paused = false;
    ATC.score = 0;
    ATC.landed = 0;
    ATC.missed = 0;
    ATC.wave = 1;
    ATC.planes = [];
    ATC.selectedId = null;
    ATC.spawnTimer = 0;
    ATC.frame = 0;
    ATC.lastFrame = 0;
    ATC.callNumber = 0;
    atcClearLog();
    atcLog("info", "▣ TOWER SHIFT ACTIVE — Operation Skyward ATC. Wave 1 commencing.");
    atcUpdateStatus("📡 Tower active. Inbound traffic appearing on scope.");
    atcUpdateScoreboard();
    atcRenderSelected();
    atcBuildCallChips();

    const startBtn = document.getElementById("atcStartBtn");
    const pauseBtn = document.getElementById("atcPauseBtn");
    if (startBtn) { startBtn.textContent = "▶ Running…"; startBtn.disabled = true; }
    if (pauseBtn) { pauseBtn.disabled = false; }

    ATC.rafId = requestAnimationFrame(atcLoop);
    // Spawn first plane quickly
    setTimeout(() => { if (ATC.running) atcSpawnPlane(); }, 1500);
  }

  function atcPauseGame() {
    ATC.paused = !ATC.paused;
    const btn = document.getElementById("atcPauseBtn");
    if (btn) btn.textContent = ATC.paused ? "▶ Resume" : "⏸ Pause";
    if (ATC.paused) {
      if (ATC.rafId) cancelAnimationFrame(ATC.rafId);
      atcUpdateStatus("⏸ Operations paused.");
    } else {
      ATC.lastFrame = 0;
      ATC.rafId = requestAnimationFrame(atcLoop);
      atcUpdateStatus("📡 Operations resumed.");
    }
  }

  function atcStopGame() {
    ATC.running = false;
    ATC.paused = false;
    if (ATC.rafId) cancelAnimationFrame(ATC.rafId);
    const startBtn = document.getElementById("atcStartBtn");
    const pauseBtn = document.getElementById("atcPauseBtn");
    if (startBtn) { startBtn.textContent = "▶ Start Tower Shift"; startBtn.disabled = false; }
    if (pauseBtn) { pauseBtn.disabled = true; pauseBtn.textContent = "⏸ Pause"; }
  }

  function atcClearLog() {
    const term = document.getElementById("atcTerminal");
    if (term) term.innerHTML = '<div class="atc-ln atc-ln-dim">// radio log will appear here…</div>';
  }

  function atcShowModal() {
    const ov = document.getElementById("atcModalOverlay");
    if (ov) ov.style.display = "flex";
  }
  function atcHideModal() {
    const ov = document.getElementById("atcModalOverlay");
    if (ov) ov.style.display = "none";
  }

  // --- INIT ---
  function atcInit() {
    atcInitRadarSVG();
    atcUpdateScoreboard();
    atcRenderSelected();

    const startBtn = document.getElementById("atcStartBtn");
    const pauseBtn = document.getElementById("atcPauseBtn");
    const howBtn = document.getElementById("atcHowBtn");
    const transmitBtn = document.getElementById("atcTransmitBtn");
    const clearBtn = document.getElementById("atcClearBtn");
    const modalClose = document.getElementById("atcModalClose");
    const modalStart = document.getElementById("atcModalStart");

    if (startBtn) startBtn.addEventListener("click", atcStartGame);
    if (pauseBtn) pauseBtn.addEventListener("click", atcPauseGame);
    if (howBtn) howBtn.addEventListener("click", atcShowModal);
    if (transmitBtn) transmitBtn.addEventListener("click", atcTransmit);
    if (clearBtn) clearBtn.addEventListener("click", atcClearCall);
    if (modalClose) modalClose.addEventListener("click", atcHideModal);
    if (modalStart) modalStart.addEventListener("click", () => { atcHideModal(); atcStartGame(); });

    // Close modal on overlay click
    const ov = document.getElementById("atcModalOverlay");
    if (ov) ov.addEventListener("click", (e) => { if (e.target === ov) atcHideModal(); });
  }

  /* ── i18n: translate data arrays in-place ── */
  if (typeof trMutate === "function") {
    try { trMutate(AIR_BADGES); } catch(e) {}
    try { trMutate(ATC); } catch(e) {}
    try { trMutate(ATC_AIRCRAFT_TYPES); } catch(e) {}
    try { trMutate(ATC_INSTRUCTIONS); } catch(e) {}
    try { trMutate(ATC_PHONETICS); } catch(e) {}
    try { trMutate(ATC_RADAR); } catch(e) {}
    try { trMutate(ATC_RUNWAYS); } catch(e) {}
    try { trMutate(LEARN_ARTICLES); } catch(e) {}
    try { trMutate(MISSIONS); } catch(e) {}
    try { trMutate(RANKS); } catch(e) {}
    try { trMutate(SK); } catch(e) {}
    try { trMutate(TOOLS); } catch(e) {}
    try { trMutate(compassAngles); } catch(e) {}
    try { trMutate(sliderValue); } catch(e) {}
    try { trMutate(statusMap); } catch(e) {}
    try { trMutate(toggleState); } catch(e) {}
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
    atcInit();

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
