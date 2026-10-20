/* ============================================================
   CADET BASICS TRAINING COMMAND — cadet_basics_training.js
   First-year starter training simulator (Green Star / Proficiency Level 1 / Phase 1)
   Maple Defender-style dashboard — 6 orientation missions
   ============================================================ */
(function () {
  "use strict";

  // ==========================================================
  // STORAGE KEYS
  // ==========================================================
  const SK = {
    progress: "cadetBasicsProgress_v1",
    sitreps: "cadetBasicsSitreps_v1",
    wrongAttempts: "cadetBasicsWrong_v1",
    streak: "cadetBasicsStreak_v1",
    bestStreak: "cadetBasicsBestStreak_v1",
    readArticles: "cadetBasicsRead_v1",
    fieldGame: "cadetBasicsFieldGame_v1",
  };
  const MAP_PROGRESS_KEY = "cadetMapDemoCompleted";
  const BASICS_BADGE_ID = 1;

  // ==========================================================
  // RANKS — Phase 1 cadet rank ladder
  // ==========================================================
  const RANKS = [
    { id: 0, name: "Cadet (Recruit)",     icon: "🎖️", xp: 0,    callsign: "ROOKIE-1" },
    { id: 1, name: "Cadet",             icon: "🪖", xp: 300,  callsign: "CADET-1" },
    { id: 2, name: "Cadet Lance-Corporal / Leading Air Cadet / Leading Cadet",     icon: "⬇️", xp: 700,  callsign: "LEAD-1" },
    { id: 3, name: "Cadet Corporal",    icon: "⬇️⬇️", xp: 1200, callsign: "CORP-1" },
    { id: 4, name: "Cadet Master Corporal / Master Cadet",      icon: "⭐", xp: 1800, callsign: "MCPL-1" },
    { id: 5, name: "Cadet Sergeant",    icon: "👑", xp: 2500, callsign: "SGT-1" },
  ];

  // ==========================================================
  // TOOLS — reference materials cadets "open" during missions
  // ==========================================================
  const TOOLS = [
    { id: "orientation_guide",  icon: "📋", label: "Orientation Guide" },
    { id: "rank_chart",         icon: "🎖️", label: "Rank Chart" },
    { id: "drill_manual",       icon: "🚶", label: "Drill Manual" },
    { id: "uniform_guide",      icon: "👔", label: "Uniform Guide" },
    { id: "grooming_standard",  icon: "✂️", label: "Grooming Standard" },
    { id: "citizenship_handbook", icon: "🤝", label: "Citizenship Handbook" },
    { id: "quest_map",          icon: "🗺️", label: "Quest Map" },
    { id: "comms_log",          icon: "📠", label: "Comms Log" },
    { id: "safety_brief",       icon: "⚠️", label: "Safety Brief" },
    { id: "attendance_sheet",   icon: "📝", label: "Attendance Sheet" },
  ];

  // ==========================================================
  // MISSIONS — 6 Phase 1 basics orientation modules
  // ==========================================================
  const MISSIONS = [
    {
      id: "hq_orientation",
      order: 1,
      tag: "ORIENTATION",
      icon: "📋",
      title: "HQ Orientation & Check-In",
      desc: "Arrive at Cadet HQ, check in properly, and learn how the training system works.",
      xp: 100,
      brief: "A new cadet has arrived at headquarters. Complete the orientation stations by choosing actions that show respect, readiness, and awareness. This is the first step in your Phase 1 journey.",
      scene: "hq_plaza",
      chapters: ["Check in at HQ desk", "Review the quest map system", "Meet the section leader", "Choose your first training station"],
      tasks: [
        {
          type: "select",
          tool: "orientation_guide",
          title: "Check in at HQ Desk",
          prompt: "You arrive at Cadet HQ. What is the best first action?",
          options: [
            "Check in, listen for instructions, and ask where your section is forming",
            "Walk past the desk and start exploring alone",
            "Wait outside and hope someone notices you",
          ],
          expected: "Check in, listen for instructions, and ask where your section is forming",
          proof: "You checked in with respect and readiness — a great start to your cadet career.",
        },
        {
          type: "select",
          tool: "quest_map",
          title: "Review the Quest Map System",
          prompt: "The quest map shows open badge locations. How should a cadet use the map?",
          options: [
            "Review available badges, choose a station, and track completion as you learn",
            "Click random badges until everything says complete",
            "Ignore the map because only the final badge matters",
          ],
          expected: "Review available badges, choose a station, and track completion as you learn",
          proof: "You understand that the map supports open exploration with visible progress tracking.",
        },
        {
          type: "select",
          tool: "orientation_guide",
          title: "Meet the Section Leader",
          prompt: "Your section leader gives a welcome and asks if you understand the first task. What response shows readiness?",
          options: [
            "Confirm what you heard and ask a clear question if anything is uncertain",
            "Pretend you understand even if you are confused",
            "Interrupt and demand to pick the most exciting station first",
          ],
          expected: "Confirm what you heard and ask a clear question if anything is uncertain",
          proof: "Clear communication helps the whole team start well — you demonstrated readiness.",
        },
        {
          type: "note",
          tool: "orientation_guide",
          title: "Choose Your First Training Station",
          prompt: "You can start at several stations. Write a short note explaining which station you would choose first and why it helps your learning goal. Include the words 'station', 'learning', and 'ready'.",
          keywords: ["station", "learning", "ready"],
          proof: "You connected your choice with purpose — that is the mark of a thoughtful cadet.",
        },
      ],
    },
    {
      id: "rank_structure",
      order: 2,
      tag: "M107",
      icon: "🎖️",
      title: "Cadet Rank Structure & Forms of Address",
      desc: "Identify cadet ranks from insignia and use the correct forms of address and compliments.",
      xp: 100,
      brief: "Understanding rank structure is essential for discipline and respect. Learn to identify cadet ranks by their insignia and practice the proper compliments — salutes and forms of address.",
      scene: "rank_board",
      chapters: ["Identify rank insignia", "Address officers correctly", "Pay compliments — salute", "Recognise the chain of command"],
      tasks: [
        {
          type: "select",
          tool: "rank_chart",
          title: "Identify Rank Insignia",
          prompt: "A cadet wears a single chevron (V-shape) on their sleeve. What rank is this?",
          options: [
            "Lance Corporal",
            "Sergeant",
            "Private",
            "Captain",
          ],
          expected: "Lance Corporal",
          proof: "Correct — a single chevron denotes the Lance Corporal rank in the cadet system.",
        },
        {
          type: "type",
          tool: "rank_chart",
          title: "Address an Officer",
          prompt: "You need to address an officer with the rank of Captain. Type the correct form of address (the word only, e.g. 'Captain').",
          expected: "Captain",
          proof: "Correct — officers are addressed by their rank, in this case 'Captain'.",
        },
        {
          type: "select",
          tool: "rank_chart",
          title: "Pay Compliments — When to Salute",
          prompt: "When should a cadet salute?",
          options: [
            "When passing a commissioned officer outdoors and when reporting to an officer",
            "Only when you feel like it",
            "When greeting a fellow cadet of the same rank",
            "Never — saluting is optional for cadets",
          ],
          expected: "When passing a commissioned officer outdoors and when reporting to an officer",
          proof: "Correct — saluting is a sign of respect paid to commissioned officers in specific situations.",
        },
        {
          type: "note",
          tool: "rank_chart",
          title: "Recognise the Chain of Command",
          prompt: "Write a short note explaining why the chain of command is important in a cadet unit. Include the words 'command', 'order', and 'respect'.",
          keywords: ["command", "order", "respect"],
          proof: "You understand that the chain of command ensures clear communication and disciplined operations.",
        },
      ],
    },
    {
      id: "drill_basics",
      order: 3,
      tag: "M201",
      icon: "🚶",
      title: "Drill Basics — Attention, Stand at Ease, Marching",
      desc: "Learn the foundational drill movements every cadet must perform correctly.",
      xp: 100,
      brief: "Drill is the foundation of cadet discipline. Master the basic positions — attention, stand at ease, and the march — with correct timing, posture, and sharp execution.",
      scene: "drill_square",
      chapters: ["Position of attention", "Stand at ease", "Basic marching", "Squad timing"],
      tasks: [
        {
          type: "select",
          tool: "drill_manual",
          title: "Position of Attention",
          prompt: "When the command 'ATTENTION' is given, what is the correct body position?",
          options: [
            "Heels together, feet at 45 degrees, body upright, arms straight at sides, chest forward",
            "Feet shoulder-width apart, hands in pockets, relaxed posture",
            "Sitting down with legs crossed",
            "Standing with one hand on hip and the other waving",
          ],
          expected: "Heels together, feet at 45 degrees, body upright, arms straight at sides, chest forward",
          proof: "Correct — the position of attention is the foundation of all drill movements.",
        },
        {
          type: "select",
          tool: "drill_manual",
          title: "Stand at Ease",
          prompt: "From the position of attention, what happens when the command 'STAND AT EASE' is given?",
          options: [
            "Keep the right foot still, move the left foot to the left, clasp hands behind the back",
            "Sit down on the ground immediately",
            "Walk away from the squad freely",
            "Put hands in pockets and look around",
          ],
          expected: "Keep the right foot still, move the left foot to the left, clasp hands behind the back",
          proof: "Correct — stand at ease is a relaxed but disciplined position with hands clasped behind the back.",
        },
        {
          type: "toggle",
          tool: "drill_manual",
          title: "Basic Marching — Timing",
          prompt: "The correct marching pace is 120 steps per minute at a 75cm stride. Toggle to confirm you understand this standard.",
          expected: true,
          proof: "Correct — the standard cadet marching pace is 120 steps per minute with a 75cm stride.",
        },
        {
          type: "note",
          tool: "drill_manual",
          title: "Squad Timing — Why It Matters",
          prompt: "Write a short note explaining why timing and moving as one unit matters in drill. Include the words 'timing', 'team', and 'discipline'.",
          keywords: ["timing", "team", "discipline"],
          proof: "You understand that drill is about moving as one team with precise timing and discipline.",
        },
      ],
    },
    {
      id: "dress_uniform",
      order: 4,
      tag: "M301",
      icon: "👕",
      title: "Dress & Uniform Standards",
      desc: "Learn how to wear, care for, and present your cadet uniform with pride.",
      xp: 100,
      brief: "Your uniform represents your unit and your commitment. Learn the standards for wearing it correctly, keeping it clean, and maintaining proper grooming at all times.",
      scene: "uniform_room",
      chapters: ["Inspect the uniform components", "Learn grooming standards", "Practice proper wear", "Understand uniform care"],
      tasks: [
        {
          type: "select",
          tool: "uniform_guide",
          title: "Uniform Components Check",
          prompt: "Before putting on your uniform, what should you check first?",
          options: [
            "That all components are clean, pressed, and correctly sized for you",
            "That it looks cool and matches your personal style",
            "Nothing — just put it on as fast as possible",
          ],
          expected: "That all components are clean, pressed, and correctly sized for you",
          proof: "A proper uniform starts with preparation — you checked every component before wearing it.",
        },
        {
          type: "select",
          tool: "grooming_standard",
          title: "Grooming Standards",
          prompt: "What grooming standard applies to cadets on parade?",
          options: [
            "Hair neat and off the collar, face clean-shaven or neatly trimmed, no extreme styles",
            "Any hairstyle as long as you feel confident",
            "Grooming is optional for cadets under 16",
          ],
          expected: "Hair neat and off the collar, face clean-shaven or neatly trimmed, no extreme styles",
          proof: "Grooming standards ensure the whole unit looks sharp and uniform — you got it right.",
        },
        {
          type: "toggle",
          tool: "uniform_guide",
          title: "Uniform Care Policy",
          prompt: "The uniform must be kept clean, pressed, and stored properly between parades. Toggle to confirm you understand this policy.",
          expected: true,
          proof: "You confirmed the uniform care policy — a well-kept uniform shows pride in your unit.",
        },
        {
          type: "note",
          tool: "uniform_guide",
          title: "Why the Uniform Matters",
          prompt: "Write a short note explaining why wearing the uniform correctly matters. Include the words 'pride', 'team', and 'standard'.",
          keywords: ["pride", "team", "standard"],
          proof: "You understand that the uniform is a symbol of pride, teamwork, and high standards.",
        },
      ],
    },
    {
      id: "citizenship",
      order: 5,
      tag: "M401",
      icon: "🤝",
      title: "Citizenship & Community Service",
      desc: "Discover the cadet ethos of service, civic responsibility, and giving back to your community.",
      xp: 100,
      brief: "Being a cadet is about more than drills and uniforms — it is about serving your community. Learn about the cadet ethos, community service opportunities, and what it means to be a good citizen.",
      scene: "community_hall",
      chapters: ["Learn the cadet ethos", "Explore community service", "Write the cadet promise", "Reflect on civic duty"],
      tasks: [
        {
          type: "select",
          tool: "citizenship_handbook",
          title: "The Cadet Ethos",
          prompt: "What is the core idea behind the cadet ethos?",
          options: [
            "Serve your community, act with integrity, and strive to improve yourself and others",
            "Win every competition and be the best cadet in the unit",
            "Follow orders without ever asking questions",
          ],
          expected: "Serve your community, act with integrity, and strive to improve yourself and others",
          proof: "The cadet ethos is about service and integrity — you captured it perfectly.",
        },
        {
          type: "select",
          tool: "citizenship_handbook",
          title: "Community Service Options",
          prompt: "Which of these is a valid cadet community service activity?",
          options: [
            "Volunteering at a local food bank, park cleanup, or supporting a charity event",
            "Only activities that earn you a personal award",
            "Nothing — cadets are not expected to do community service",
          ],
          expected: "Volunteering at a local food bank, park cleanup, or supporting a charity event",
          proof: "Community service is a key part of cadet life — you chose a real service activity.",
        },
        {
          type: "type",
          tool: "citizenship_handbook",
          title: "The Cadet Promise",
          prompt: "Type the three core values a cadet promises to uphold (separate them with commas): loyalty, integrity, and courage.",
          expected: ["loyalty, integrity, courage", "loyalty integrity courage", "loyalty, integrity, courage"],
          proof: "You wrote the cadet promise — loyalty, integrity, and courage are the foundation of a cadet.",
        },
        {
          type: "note",
          tool: "citizenship_handbook",
          title: "Reflect on Civic Duty",
          prompt: "Write a short note about why civic responsibility matters for a cadet. Include the words 'community', 'service', and 'respect'.",
          keywords: ["community", "service", "respect"],
          proof: "You understand that a cadet serves the community with respect — a true citizen-leader.",
        },
      ],
    },
    {
      id: "green_star_review",
      order: 6,
      tag: "M501",
      icon: "⭐",
      title: "First-Year Assessment & Graduation",
      desc: "Review everything from your first year and prepare to earn your qualification.",
      xp: 100,
      brief: "You have trained through orientation, ranks, drill, uniform, and citizenship. Now it is time to review your knowledge, confirm your readiness, and earn your first-year qualification — Green Star (Army), Proficiency Level 1 (Air), or Phase 1 (Sea).",
      scene: "graduation_hall",
      chapters: ["Review first-year concepts", "Confirm graduation readiness", "Pledge your commitment", "Plan your next phase"],
      tasks: [
        {
          type: "select",
          tool: "orientation_guide",
          title: "Phase 1 Review",
          prompt: "Which statement best summarizes what you learned in your first year of training?",
          options: [
            "Orientation, rank structure, drill, uniform standards, and citizenship form the foundation of a cadet",
            "Only drill and marching matter in the first year",
            "The first year is just about memorizing ranks",
          ],
          expected: "Orientation, rank structure, drill, uniform standards, and citizenship form the foundation of a cadet",
          proof: "You have a clear understanding of the full first-year curriculum — excellent review.",
        },
        {
          type: "select",
          tool: "rank_chart",
          title: "Graduation Readiness Check",
          prompt: "What does it mean to be ready for first-year graduation?",
          options: [
            "All modules complete, uniform ready, knowledge confirmed, and a commitment to continue learning",
            "You showed up to most parades and that is enough",
            "Graduation is automatic once you join the unit",
          ],
          expected: "All modules complete, uniform ready, knowledge confirmed, and a commitment to continue learning",
          proof: "You understand that graduation is earned through completion and commitment — you are ready.",
        },
        {
          type: "toggle",
          tool: "orientation_guide",
          title: "Pledge Your Commitment",
          prompt: "Do you pledge to uphold the cadet values, continue your training, and serve your community as you move to the next phase? Toggle to confirm.",
          expected: true,
          proof: "Your pledge is recorded — a cadet who commits is a cadet who grows. Onward to Phase 2!",
        },
        {
          type: "note",
          tool: "quest_map",
          title: "Plan Your Next Phase",
          prompt: "Write a short note about which training station you want to explore next and why. Include the words 'next', 'goal', and 'progress'.",
          keywords: ["next", "goal", "progress"],
          proof: "You have a plan for your next goal — that is how a cadet keeps progressing. First-year qualification earned!",
        },
      ],
    },
  ];

  // ==========================================================
  // LEARN ARTICLES \u2014 Phase 1 cadet basics reference library
  // ==========================================================
  const LEARN_ARTICLES = [
    { id: "l_what_is_cadet", cat: "Orientation", icon: "\ud83c\udfe2", title: "What Is a Cadet?", desc: "The purpose of the cadet program and what it means to be a cadet in your unit.", xp: 15 },
    { id: "l_chain_command", cat: "Orientation", icon: "\ud83d\udd17", title: "Chain of Command Basics", desc: "Who leads your section, flight, or division \u2014 and why clear structure matters.", xp: 15 },
    { id: "l_quest_map_guide", cat: "Orientation", icon: "\ud83d\uddfa\ufe0f", title: "Using the Quest Map", desc: "How to find open badges, choose training stations, and track your progress.", xp: 15 },
    { id: "l_rank_overview", cat: "Ranks", icon: "\ud83c\udf96\ufe0f", title: "Cadet Rank Overview", desc: "Every cadet rank across all three elements and how you progress.", xp: 15 },
    { id: "l_addressing", cat: "Ranks", icon: "\ud83d\udde3\ufe0f", title: "Addressing Superiors", desc: "How to properly address officers, NCOs, and senior cadets.", xp: 15 },
    { id: "l_promotion_path", cat: "Ranks", icon: "\ud83d\udcc8", title: "The Promotion Path", desc: "What it takes to earn your next rank \u2014 time, training, and attitude.", xp: 15 },
    { id: "l_attention", cat: "Drill", icon: "\ud83d\ude4e", title: "Position of Attention", desc: "How to stand at attention correctly \u2014 posture, hands, and eyes.", xp: 15 },
    { id: "l_stand_at_ease", cat: "Drill", icon: "\ud83e\uddd1", title: "Stand At Ease & Stand Easy", desc: "The two relaxed positions and when to use each on parade.", xp: 15 },
    { id: "l_marching_pace", cat: "Drill", icon: "\ud83d\udc63", title: "The Marching Pace", desc: "120 steps per minute at 75cm \u2014 the standard cadet marching rhythm.", xp: 15 },
    { id: "l_saluting", cat: "Drill", icon: "\ud83d\udc4b", title: "When and How to Salute", desc: "The salute is a mark of respect \u2014 learn when it is required and how to perform it.", xp: 15 },
    { id: "l_uniform_parts", cat: "Uniform", icon: "\ud83d\udc55", title: "Parts of the Cadet Uniform", desc: "Headwear, tunic, trousers, boots, and accoutrements \u2014 know every component.", xp: 15 },
    { id: "l_grooming", cat: "Uniform", icon: "\u2702\ufe0f", title: "Grooming Standards", desc: "Hair, facial hair, and personal presentation standards for all cadets.", xp: 15 },
    { id: "l_boots", cat: "Uniform", icon: "\ud83d\udc5e", title: "Boot Care and Polishing", desc: "How to clean, polish, and maintain your boots to inspection standard.", xp: 15 },
    { id: "l_uniform_care", cat: "Uniform", icon: "\ud83e\uddf0", title: "Caring for Your Uniform", desc: "Washing, pressing, and storing your uniform between parades.", xp: 15 },
    { id: "l_cadet_ethos", cat: "Citizenship", icon: "\ud83e\udd1d", title: "The Cadet Ethos", desc: "Service, integrity, and self-improvement \u2014 the heart of being a cadet.", xp: 15 },
    { id: "l_community_service", cat: "Citizenship", icon: "\ud83c\udf0d", title: "Community Service for Cadets", desc: "Types of service activities and why giving back is part of cadet life.", xp: 15 },
    { id: "l_cadet_promise", cat: "Citizenship", icon: "\ud83d\udc4d", title: "The Cadet Promise", desc: "Loyalty, integrity, and courage \u2014 the three values you pledge to uphold.", xp: 15 },
    { id: "l_civic_duty", cat: "Citizenship", icon: "\ud83c\udfdb\ufe0f", title: "Civic Responsibility", desc: "What it means to be a good citizen and why cadets lead by example.", xp: 15 },
    { id: "l_green_star", cat: "Graduation", icon: "\u2b50", title: "Earning Your First-Year Qualification", desc: "What the Green Star (Army), Proficiency Level 1 (Air), or Phase 1 (Sea) represents and what you must complete to earn it.", xp: 15 },
    { id: "l_next_phase", cat: "Graduation", icon: "\ud83d\ude80", title: "Planning Your Next Phase", desc: "After your first-year qualification \u2014 how to choose your next training station and keep growing.", xp: 15 }
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
    syncMapProgress();
  }

  // ==========================================================
  // MAP PROGRESS SYNC \u2014 badge 1 on the quest map
  // ==========================================================
  function syncMapProgress() {
    try {
      const allDone = MISSIONS.every(m => state.completedMissions.includes(m.id));
      let mapProgress = JSON.parse(localStorage.getItem(MAP_PROGRESS_KEY) || "[]");
      if (allDone && !mapProgress.includes(BASICS_BADGE_ID)) {
        mapProgress.push(BASICS_BADGE_ID);
        localStorage.setItem(MAP_PROGRESS_KEY, JSON.stringify(mapProgress));
      } else if (!allDone && mapProgress.includes(BASICS_BADGE_ID)) {
        mapProgress = mapProgress.filter(id => id !== BASICS_BADGE_ID);
        localStorage.setItem(MAP_PROGRESS_KEY, JSON.stringify(mapProgress));
      }
    } catch (e) {}
  }

  // ==========================================================
  // SCENE SVG GENERATORS \u2014 Cadet basics scenes
  // ==========================================================
  function sceneSVG(scene) {
    const W = 600, H = 180;
    const base = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">`;
    const end = `</svg>`;
    const grad = (id, c1, c2) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>`;

    if (scene === "hq_plaza") {
      return base + grad("g", "#0a1820", "#040c12") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <rect x="150" y="50" width="300" height="90" rx="6" fill="#0e2128" stroke="#1a8074"/>
        <rect x="180" y="35" width="240" height="28" rx="4" fill="#061018" stroke="#2bc4a4"/>
        <text x="300" y="54" fill="#4ee8c4" font-size="13" font-family="monospace" text-anchor="middle" font-weight="bold">CADET HQ</text>
        <rect x="170" y="70" width="80" height="60" rx="4" fill="#0a1820" stroke="#1a8074"/>
        <rect x="350" y="70" width="80" height="60" rx="4" fill="#0a1820" stroke="#1a8074"/>
        <text x="300" y="110" fill="#2bc4a4" font-size="10" font-family="monospace" text-anchor="middle">CHECK-IN DESK</text>
        <circle cx="300" cy="155" r="6" fill="#4ee8c4" opacity="0.7"/>
        <text x="300" y="172" fill="#2bc4a4" font-size="8" font-family="monospace" text-anchor="middle">CADET ARRIVAL</text>
      ` + end;
    }
    if (scene === "rank_board") {
      return base + grad("g", "#0a1820", "#040c12") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <rect x="40" y="30" width="520" height="120" rx="6" fill="#0e2128" stroke="#1a8074"/>
        <text x="300" y="50" fill="#4ee8c4" font-size="11" font-family="monospace" text-anchor="middle">RANK STRUCTURE BOARD</text>
        <g font-family="monospace" font-size="9" fill="#2bc4a4" text-anchor="middle">
          <rect x="60" y="65" width="70" height="70" rx="4" fill="#061018" stroke="#1a8074"/><text x="95" y="100">RECRUIT</text><text x="95" y="120" fill="#4ee8c4">0 XP</text>
          <rect x="145" y="65" width="70" height="70" rx="4" fill="#061018" stroke="#1a8074"/><text x="180" y="100">CADET</text><text x="180" y="120" fill="#4ee8c4">300</text>
          <rect x="230" y="65" width="70" height="70" rx="4" fill="#061018" stroke="#1a8074"/><text x="265" y="100">LEAD</text><text x="265" y="120" fill="#4ee8c4">700</text>
          <rect x="315" y="65" width="70" height="70" rx="4" fill="#061018" stroke="#1a8074"/><text x="350" y="100">CORP</text><text x="350" y="120" fill="#4ee8c4">1200</text>
          <rect x="400" y="65" width="70" height="70" rx="4" fill="#061018" stroke="#1a8074"/><text x="435" y="100">MCPL</text><text x="435" y="120" fill="#4ee8c4">1800</text>
          <rect x="485" y="65" width="70" height="70" rx="4" fill="#061018" stroke="#1a8074"/><text x="520" y="100">SGT</text><text x="520" y="120" fill="#4ee8c4">2500</text>
        </g>
      ` + end;
    }
    if (scene === "drill_square") {
      return base + grad("g", "#0a1820", "#040c12") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <g fill="#4ee8c4" opacity="0.6">
          <circle cx="150" cy="90" r="10"/><circle cx="200" cy="90" r="10"/><circle cx="250" cy="90" r="10"/>
          <circle cx="300" cy="90" r="10"/><circle cx="350" cy="90" r="10"/><circle cx="400" cy="90" r="10"/><circle cx="450" cy="90" r="10"/>
        </g>
        <g stroke="#4ee8c4" stroke-width="1" opacity="0.3">
          <line x1="150" y1="100" x2="150" y2="120"/><line x1="200" y1="100" x2="200" y2="120"/>
          <line x1="250" y1="100" x2="250" y2="120"/><line x1="300" y1="100" x2="300" y2="120"/>
          <line x1="350" y1="100" x2="350" y2="120"/><line x1="400" y1="100" x2="400" y2="120"/><line x1="450" y1="100" x2="450" y2="120"/>
        </g>
        <text x="300" y="150" fill="#4ee8c4" font-size="11" font-family="monospace" text-anchor="middle">SQUAD \u2014 FORMATION LINE</text>
        <text x="300" y="40" fill="#4ee8c4" font-size="10" font-family="monospace" text-anchor="middle">DRILL SQUARE</text>
      ` + end;
    }
    if (scene === "uniform_room") {
      return base + grad("g", "#0a1820", "#040c12") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <rect x="100" y="30" width="80" height="120" rx="4" fill="#0e2128" stroke="#1a8074"/>
        <circle cx="140" cy="55" r="12" fill="#2bc4a4" opacity="0.5"/>
        <rect x="115" y="70" width="50" height="60" rx="3" fill="#1a8074" opacity="0.4"/>
        <text x="140" y="165" fill="#4ee8c4" font-size="8" font-family="monospace" text-anchor="middle">TUNIC</text>
        <rect x="220" y="30" width="80" height="120" rx="4" fill="#0e2128" stroke="#1a8074"/>
        <rect x="235" y="70" width="50" height="70" rx="3" fill="#1a8074" opacity="0.4"/>
        <text x="260" y="165" fill="#4ee8c4" font-size="8" font-family="monospace" text-anchor="middle">TROUSERS</text>
        <rect x="340" y="30" width="80" height="120" rx="4" fill="#0e2128" stroke="#1a8074"/>
        <ellipse cx="380" cy="80" rx="25" ry="35" fill="#2bc4a4" opacity="0.3"/>
        <text x="380" y="165" fill="#4ee8c4" font-size="8" font-family="monospace" text-anchor="middle">BOOTS</text>
        <rect x="460" y="30" width="80" height="120" rx="4" fill="#0e2128" stroke="#1a8074"/>
        <rect x="480" y="55" width="40" height="25" rx="3" fill="#2bc4a4" opacity="0.4"/>
        <text x="500" y="165" fill="#4ee8c4" font-size="8" font-family="monospace" text-anchor="middle">ACCOUTREMENTS</text>
      ` + end;
    }
    if (scene === "community_hall") {
      return base + grad("g", "#0a1820", "#040c12") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <rect x="200" y="40" width="200" height="100" rx="6" fill="#0e2128" stroke="#1a8074"/>
        <text x="300" y="62" fill="#4ee8c4" font-size="11" font-family="monospace" text-anchor="middle">COMMUNITY HALL</text>
        <circle cx="150" cy="100" r="14" fill="#2bc4a4" opacity="0.5"/>
        <circle cx="450" cy="100" r="14" fill="#2bc4a4" opacity="0.5"/>
        <text x="150" y="135" fill="#4ee8c4" font-size="8" font-family="monospace" text-anchor="middle">VOLUNTEER</text>
        <text x="450" y="135" fill="#4ee8c4" font-size="8" font-family="monospace" text-anchor="middle">VOLUNTEER</text>
        <text x="300" y="90" fill="#4ee8c4" font-size="9" font-family="monospace" text-anchor="middle">SERVICE</text>
        <text x="300" y="110" fill="#4ee8c4" font-size="9" font-family="monospace" text-anchor="middle">INTEGRITY</text>
        <text x="300" y="130" fill="#4ee8c4" font-size="9" font-family="monospace" text-anchor="middle">RESPECT</text>
      ` + end;
    }
    if (scene === "graduation_hall") {
      return base + grad("g", "#0a1820", "#040c12") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <polygon points="280,30 320,30 335,50 265,50" fill="#2bc4a4" opacity="0.6"/>
        <rect x="260" y="50" width="80" height="60" rx="4" fill="#0e2128" stroke="#1a8074"/>
        <text x="300" y="85" fill="#4ee8c4" font-size="16" font-family="monospace" text-anchor="middle" font-weight="bold">\u2b50</text>
        <text x="300" y="105" fill="#4ee8c4" font-size="9" font-family="monospace" text-anchor="middle">GREEN STAR</text>
        <g fill="#2bc4a4" opacity="0.5">
          <circle cx="120" cy="110" r="8"/><circle cx="160" cy="110" r="8"/><circle cx="200" cy="110" r="8"/>
          <circle cx="400" cy="110" r="8"/><circle cx="440" cy="110" r="8"/><circle cx="480" cy="110" r="8"/>
        </g>
        <text x="300" y="140" fill="#4ee8c4" font-size="11" font-family="monospace" text-anchor="middle">PHASE 1 COMPLETE</text>
        <text x="300" y="160" fill="#4ee8c4" font-size="9" font-family="monospace" text-anchor="middle">CADETS IN ATTENDANCE</text>
      ` + end;
    }
    return base + `<rect width="${W}" height="${H}" fill="#0e2128"/>` + end;
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
  // BADGES \u2014 auto-generated from MISSIONS
  // ==========================================================
  const BASICS_BADGES = MISSIONS.map(m => ({
    id: "b_" + m.id,
    icon: m.icon,
    name: m.title,
    xp: m.xp,
    mission: m.id
  }));

  function refreshBadges() {
    state.badges = [];
    BASICS_BADGES.forEach(b => {
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
    document.getElementById("topRank").textContent = rank.name.replace("Cadet ", "");
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
    document.getElementById("cmdBadgeTotal").textContent = "of " + BASICS_BADGES.length;

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
      if (done) { cls += " done"; status = `<div class="ch-status done">COMPLETE \u2014 ${prog}/${total}</div>`; }
      else if (isActive) { cls += " active"; status = `<div class="ch-status ready">IN PROGRESS \u2014 ${prog}/${total}</div>`; }
      else if (unlocked) { cls += ""; status = `<div class="ch-status ready">READY \u2014 ${prog}/${total}</div>`; }
      else { cls += " locked"; status = `<div class="ch-status locked">LOCKED \u2014 complete Module ${m.order - 1}</div>`; }
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
          <span>\u26a1 ${missionXP(m)} XP</span>
          <span>\ud83d\udccb ${prog}/${total}</span>
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
        <div class="mc-meta"><span>\u26a1 ${missionXP(m)} XP</span><span>\ud83d\udccb ${prog}/${total}</span></div>
        <div class="mc-prog"><div class="mc-prog-fill" style="width:${pct}%"></div></div>
      </div>`;
    }).join("");
    sel.querySelectorAll(".mission-card:not(.locked)").forEach(el => {
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
      toast("warn", "\ud83d\udd12 Module " + m.order + " is locked. Complete the previous module first.");
      return;
    }
    activeMissionId = missionId;
    activeTool = "";
    toggleState = {};
    sliderValue = {};

    // Determine task index \u2014 resume if in progress
    const mp = missionProgress(missionId);
    activeTaskIndex = mp.tasksDone.length;
    if (activeTaskIndex >= m.tasks.length) activeTaskIndex = m.tasks.length - 1;

    // Switch to missions section
    switchSection("missions");
    document.getElementById("missionSelector").style.display = "none";
    document.getElementById("missionConsole").style.display = "block";
    document.getElementById("missionHeaderTitle").textContent = m.title;
    document.getElementById("missionHeaderSub").textContent = m.tag + " \u2014 " + m.desc;

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
      const backBtn = document.getElementById("backToListBtn");
      if (backBtn) backBtn.addEventListener("click", exitMission);
      const sitrepBtn = document.getElementById("fileSitrepQuickBtn");
      if (sitrepBtn) sitrepBtn.addEventListener("click", () => { exitMission(); switchSection("sitrep"); });
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
              <div class="th-sub">${m.tag} \u2022 ${mp.tasksDone.length}/${total} tasks complete</div>
            </div>
          </div>
          <div class="th-right">
            <span class="task-stage-pill">TASK ${activeTaskIndex + 1} / ${total}</span>
            <button class="btn btn-ghost" id="exitMissionBtn" type="button">\u2190 Back to list</button>
          </div>
        </div>
        <div class="task-body">
          <div class="scene-visual">${sceneSVG(m.scene)}<div class="scene-overlay">${m.brief.split(".")[0]}.</div></div>
          <div class="task-brief">${m.brief}</div>

          <div class="tool-dock" id="toolDock">
            ${TOOLS.map(t => `<button class="tool-btn ${activeTool === t.id ? "active" : ""}" data-tool="${t.id}" type="button"><span class="tb-ico">${t.icon}</span>${t.label}</button>`).join("")}
          </div>

          <div class="tool-req" id="toolReq">
            <span class="tr-ico">\u26a0\ufe0f</span>
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
            <button class="btn btn-primary" id="submitTaskBtn" type="button">\u2713 Submit & Confirm</button>
            <button class="btn btn-ghost" id="hintBtn" type="button">\ud83d\udca1 Hint</button>
          </div>

          <div class="terminal" id="terminal"><div class="ln ln-dim">// awaiting input\u2026</div></div>
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
        <div class="toggle-icon">${on ? "\u2713" : "\u25cb"}</div>
      </div>`;
    }
    if (task.type === "select") {
      const esc = s => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");
      return `<select class="task-select" id="taskSelect" data-idx="${idx}">
        <option value="">\u2014 Select your answer \u2014</option>
        ${task.options.map(o => `<option value="${esc(o)}">${esc(o)}</option>`).join("")}
      </select>`;
    }
    if (task.type === "type") {
      return `<input class="task-input" id="taskInput" type="text" placeholder="Type your answer\u2026" autocomplete="off" />`;
    }
    if (task.type === "note") {
      return `<textarea class="task-note" id="taskNote" placeholder="Write your log entry here\u2026"></textarea>`;
    }
    if (task.type === "slider") {
      sliderValue[idx] = sliderValue[idx] !== undefined ? sliderValue[idx] : 0;
      return `<input class="task-slider" id="taskSlider" type="range" min="0" max="30" value="${sliderValue[idx]}" data-idx="${idx}" />
        <div class="slider-readout" id="sliderReadout">${sliderValue[idx]} points</div>`;
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
        termPush("info", `\u25b8 Opened ${toolLabel(activeTool)}`);
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
        toggleRow.querySelector(".toggle-icon").textContent = on ? "\u2713" : "\u25cb";
      });
    }

    // Slider
    const slider = document.getElementById("taskSlider");
    if (slider) {
      slider.addEventListener("input", () => {
        const idx = parseInt(slider.dataset.idx, 10);
        sliderValue[idx] = parseInt(slider.value, 10);
        document.getElementById("sliderReadout").textContent = sliderValue[idx] + " points";
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
      ico.textContent = "\u2705";
      now.textContent = toolLabel(activeTool);
    } else {
      ico.textContent = "\u26a0\ufe0f";
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
      fb.innerHTML = `\u274c Wrong tool! This task requires <strong>${toolLabel(task.tool)}</strong>. You currently have <strong>${activeTool ? toolLabel(activeTool) : "no tool"}</strong> open. Open the correct tool from the dock above.`;
      termPush("err", `\u2717 FAILED \u2014 wrong tool. Required: ${toolLabel(task.tool)}`);
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
      fb.innerHTML = `\u274c ${valid.msg}`;
      termPush("err", `\u2717 ${valid.msg}`);
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
    fb.innerHTML = `\u2705 Correct! ${task.proof}`;
    termPush("ok", `\u2713 ${task.proof}`);

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
      const val = (inp ? inp.value : "").trim();
      if (!val) return { ok: false, msg: "Type your answer in the input field." };
      const expArray = Array.isArray(task.expected) ? task.expected : [String(task.expected)];
      const matched = expArray.some(e => val.toUpperCase() === String(e).toUpperCase());
      if (matched) return { ok: true };
      return { ok: false, msg: `"${val}" is not correct. Check your spelling and try again.` };
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
      return { ok: false, msg: `The reading is set to ${v} points. Adjust the dial to match the target.` };
    }
    return { ok: false, msg: "Unknown task type." };
  }

  function showHint(task) {
    const fb = document.getElementById("taskFeedback");
    fb.className = "task-feedback show info";
    let hint = "";
    if (task.type === "select") hint = `The correct answer relates to: ${task.expected.split("(")[0].trim().slice(0, 40)}\u2026`;
    else if (task.type === "type") hint = Array.isArray(task.expected) ? `The answer is: ${task.expected[0]}.` : `The answer has ${task.expected.length} characters and starts with "${task.expected.charAt(0)}".`;
    else if (task.type === "note") hint = `Your note must include: ${task.keywords.join(", ")}${task.altKeywords ? " (or " + task.altKeywords.join(", ") + ")" : ""}.`;
    else if (task.type === "toggle") hint = "Click the toggle row to switch it to the ON (green) position.";
    else if (task.type === "slider") hint = `The target reading is close to ${task.expected} points.`;
    fb.textContent = "\ud83d\udca1 " + hint;
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
      const badge = BASICS_BADGES.find(b => b.mission === m.id);
      toast("ok", `\ud83c\udfc5 Mission complete! +${earned} XP earned. Badge unlocked: ${badge ? badge.name : m.title}.`);
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
    const badge = BASICS_BADGES.find(b => b.mission === m.id);
    const mp = missionProgress(m.id);
    return `<div class="task-console">
      <div class="task-body">
        <div class="complete-card">
          <div class="cc-ico">\ud83c\udfc5</div>
          <div class="cc-title">Mission Complete: ${m.title}</div>
          <div class="cc-sub">${m.desc} You have successfully completed all ${m.tasks.length} tasks and earned the <strong>${badge ? badge.name : "Cadet"}</strong> badge.</div>
          <div class="cc-stats">
            <div class="cc-stat"><div class="v">+${earned}</div><div class="l">XP Earned</div></div>
            <div class="cc-stat"><div class="v">${mp.tasksDone.length}/${m.tasks.length}</div><div class="l">Tasks Done</div></div>
            <div class="cc-stat"><div class="v">${mp.wrongAttempts || 0}</div><div class="l">Wrong Attempts</div></div>
          </div>
          <div class="task-actions" style="justify-content:center;">
            <button class="btn btn-primary" id="fileSitrepQuickBtn" type="button">\ud83d\udce1 File SITREP for this mission</button>
            <button class="btn btn-ghost" id="backToListBtn" type="button">\u2190 Back to mission list</button>
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
    document.getElementById("ringRankLabel").textContent = rank.name.replace("Cadet ", "");
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
          <div class="r-xp">${r.xp} XP \u2022 CALLSIGN ${r.callsign}</div>
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
    sel.innerHTML = `<option value="">Select a completed mission\u2026</option>` +
      completed.map(m => `<option value="${m.id}">${m.tag} \u2014 ${m.title}</option>`).join("");

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
          <div class="se-body"><strong>${m ? m.tag + " \u2014 " + m.title : s.mission}</strong><br/>${escapeHTML(s.summary)}</div>
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
    toast("ok", "\ud83d\udce1 SITREP filed! +20 XP");
    renderSitrep();
    renderSidebar();
    renderTopStats();
    renderCommand();
    renderAnalysis();
  }

  function showFeedback(el, kind, msg) {
    el.className = "task-feedback show " + kind;
    el.textContent = (kind === "ok" ? "\u2705 " : kind === "err" ? "\u274c " : "\ud83d\udca1 ") + msg;
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
        <div class="lc-foot"><span>${read ? "\u2713 Read" : "Tap to read"}</span><span>+${a.xp} XP</span></div>
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
      toast("ok", `\ud83d\udcd6 Article read: "${a.title}" \u2014 +${a.xp} XP`);
      renderLearn();
      renderSidebar();
      renderTopStats();
      renderAnalysis();
    } else {
      toast("info", `\ud83d\udcd6 Already read: "${a.title}"`);
    }
  }

  // ==========================================================
  // HELPER: addXP, recordAttempt, shuffleArray (for game)
  // ==========================================================
  function addXP(amount) {
    state.xp += amount;
    if (state.xp < 0) state.xp = 0;
    saveState();
  }

  function recordAttempt(correct) {
    state.totalAttempts++;
    if (correct) {
      state.streak++;
      if (state.streak > state.bestStreak) state.bestStreak = state.streak;
    } else {
      state.streak = 0;
      state.wrongAttempts++;
    }
    saveState();
  }

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
    return arr;
  }

  // ==========================================================
  // FIELD CHALLENGE — Interactive Cadet Game Engine
  // ==========================================================
  const fc = {
    active: false,
    examMode: false,
    challengePool: [],
    poolIndex: 0,
    currentMode: null, // "rank" | "drill" | "uniform" | "pledge" | "parade"
    score: 0,
    correct: 0,
    wrong: 0,
    streak: 0,
    bestStreak: 0,
    round: 0,
    totalRounds: 0,
    challengeDone: false,
    // Per-mode transient state
    rank: { target: null, options: [] },
    drill: { command: null, options: [] },
    uniform: { scene: null, options: [] },
    pledge: { words: [], built: [], correctOrder: [] },
    parade: { value: 50, running: false, event: null, fired: false, raf: null, dir: 1, lastEvent: 0 },
    timer: { raf: null, start: 0, duration: 0, running: false }
  };

  const FC_MODES = [
    { id: "rank", label: "RANK RECOGNITION", icon: "\u{1F396}\uFE0F", type: "type-rank",
      title: "Identify the Cadet Rank",
      tip: "Look at the insignia shown. Tap the correct rank name before time runs out." },
    { id: "drill", label: "DRILL COMMANDS", icon: "\u{1F6B6}", type: "type-drill",
      title: "Match the Drill Command",
      tip: "A drill command is called. Tap the correct cadet response from the options." },
    { id: "uniform", label: "UNIFORM INSPECTION", icon: "\u{1F454}", type: "type-uniform",
      title: "Spot the Uniform Fault",
      tip: "A cadet is standing inspection. Identify the grooming or dress fault shown." },
    { id: "pledge", label: "CADET PLEDGE", icon: "\u{1F4DC}", type: "type-pledge",
      title: "Complete the Cadet Oath",
      tip: "Tap the words in the correct order to complete the cadet pledge." },
    { id: "parade", label: "PARADE PROTOCOL", icon: "\u{1F393}", type: "type-parade",
      title: "Respond at the Right Moment",
      tip: "Protocol readiness drifts. Tap STAND TO only when readiness is in the green zone (75-100)." }
  ];

  function fcLoadStats() {
    try {
      const raw = localStorage.getItem(SK.fieldGame);
      if (raw) {
        const d = JSON.parse(raw);
        fc.bestStreak = d.bestStreak || 0;
        fc.score = d.score || 0;
        fc.correct = d.correct || 0;
        fc.wrong = d.wrong || 0;
        fc.round = d.round || 0;
      }
    } catch (e) {}
  }

  function fcSaveStats() {
    try {
      localStorage.setItem(SK.fieldGame, JSON.stringify({
        bestStreak: fc.bestStreak,
        score: fc.score,
        correct: fc.correct,
        wrong: fc.wrong,
        round: fc.round
      }));
    } catch (e) {}
  }

  function fcSetFeedback(msg, kind) {
    const fb = document.getElementById("fcFeedback");
    if (!fb) return;
    fb.className = "fc-feedback " + (kind || "info");
    fb.innerHTML = msg;
  }

  function fcSetModeBadge(modeId, title) {
    const badge = document.getElementById("fcModeBadge");
    const titleEl = document.getElementById("fcChallengeTitle");
    if (!badge || !titleEl) return;
    if (modeId) {
      const mode = FC_MODES.find(function (m) { return m.id === modeId; });
      if (mode) {
        badge.className = "fc-mode-badge " + mode.type;
        badge.textContent = mode.label;
        titleEl.textContent = mode.title;
        titleEl.classList.remove("flash");
        void titleEl.offsetWidth;
        titleEl.classList.add("flash");
      }
    } else {
      badge.className = "fc-mode-badge idle";
      badge.textContent = "SELECT MODE";
      titleEl.textContent = title || "Ready on the parade square";
    }
  }

  function fcUpdateStats() {
    const set = function (id, v) { const el = document.getElementById(id); if (el) el.textContent = v; };
    set("fcScore", fc.score);
    set("fcCorrect", fc.correct);
    set("fcWrong", fc.wrong);
    set("fcStreak", fc.streak);
    set("fcRound", fc.round);
  }

  function fcAddLog(text, ok, score) {
    const list = document.getElementById("fcLogList");
    if (!list) return;
    if (list.querySelector(".muted")) list.innerHTML = "";
    const item = document.createElement("div");
    item.className = "fc-log-item " + (ok ? "ok" : "bad");
    const modeLabel = fc.currentMode ? FC_MODES.find(function (m) { return m.id === fc.currentMode; }) : null;
    const ico = ok ? "\u2705" : "\u274C";
    item.innerHTML = '<span class="fc-log-ico">' + ico + '</span>' +
      '<span class="fc-log-text">' + (modeLabel ? modeLabel.label + " \u2014 " : "") +
      escapeHTML(text) + (score !== undefined ? ' <span class="score">[' + score + ']</span>' : '') + '</span>';
    list.insertBefore(item, list.firstChild);
  }

  // ---- Timer ----
  function fcStartTimer(durationSec, onTick, onEnd) {
    fcStopTimer();
    fc.timer.running = true;
    fc.timer.start = performance.now();
    fc.timer.duration = durationSec * 1000;
    const fill = document.getElementById("fcTimerFill");
    const text = document.getElementById("fcTimerText");
    function tick() {
      if (!fc.timer.running) return;
      const elapsed = performance.now() - fc.timer.start;
      const remaining = fc.timer.duration - elapsed;
      const pct = Math.max(0, Math.min(100, (elapsed / fc.timer.duration) * 100));
      if (fill) fill.style.width = pct + "%";
      if (text) text.textContent = Math.max(0, (remaining / 1000)).toFixed(1) + "s";
      if (onTick) onTick(elapsed, remaining);
      if (remaining <= 0) {
        fc.timer.running = false;
        if (fill) fill.style.width = "100%";
        if (text) text.textContent = "0.0s";
        if (onEnd) onEnd();
        return;
      }
      fc.timer.raf = requestAnimationFrame(tick);
    }
    fc.timer.raf = requestAnimationFrame(tick);
  }

  function fcStopTimer() {
    fc.timer.running = false;
    if (fc.timer.raf) cancelAnimationFrame(fc.timer.raf);
    fc.timer.raf = null;
  }

  function fcResetTimerDisplay() {
    const fill = document.getElementById("fcTimerFill");
    const text = document.getElementById("fcTimerText");
    if (fill) fill.style.width = "0%";
    if (text) text.textContent = "\u2014";
  }

  function fcStopAllAnimations() {
    fcStopTimer();
    if (fc.parade.raf) { cancelAnimationFrame(fc.parade.raf); fc.parade.raf = null; }
    fc.parade.running = false;
  }

  // ---- Cadet status SVG ----
  function fcRenderCadet() {
    const wrap = document.getElementById("fcCadetWrap");
    if (!wrap) return;
    const readinessPct = Math.max(0, Math.min(100, Math.round(fc.parade.value || 60)));
    const readColor = readinessPct >= 75 ? "#5cff9b" : readinessPct >= 40 ? "#ffd66b" : "#ff5a6e";
    let svg = '<svg viewBox="0 0 220 130" xmlns="http://www.w3.org/2000/svg">';
    // Readiness bar
    svg += '<rect x="10" y="8" width="200" height="10" rx="5" fill="#0e2128" stroke="#1f4a55"/>';
    svg += '<rect x="10" y="8" width="' + (readinessPct * 2) + '" height="10" rx="5" fill="' + readColor + '"/>';
    svg += '<text x="110" y="32" text-anchor="middle" font-size="9" fill="#6a8e88" font-family="monospace">READINESS</text>';
    // Cadet figure
    const cx = 110;
    svg += '<g class="fc-cadet-circle">';
    // head
    svg += '<circle cx="' + cx + '" cy="62" r="14" fill="#0e2128" stroke="#2bc4a4" stroke-width="1.5"/>';
    svg += '<text x="' + cx + '" y="66" text-anchor="middle" font-size="14" fill="#4ee8c4">' + (fc.active ? "\u{1F392}" : "\u{1F3A8}") + '</text>';
    // body
    svg += '<rect x="' + (cx - 18) + '" y="78" width="36" height="30" rx="6" fill="#0e2128" stroke="#2bc4a4" stroke-width="1.5"/>';
    // insignia
    svg += '<text x="' + cx + '" y="97" text-anchor="middle" font-size="10" fill="#ffd66b" font-family="monospace" font-weight="700">' + (fc.active ? "ON DUTY" : "STANDBY") + '</text>';
    svg += '</g>';
    svg += '<text x="110" y="120" text-anchor="middle" font-size="8" fill="#6a8e88" font-family="monospace">CADET ' + (fc.active ? 'ACTIVE' : 'READY') + '</text>';
    svg += '</svg>';
    wrap.innerHTML = svg;
  }

  // ==========================================================
  // MODE 1 — RANK RECOGNITION
  // ==========================================================
  function renderRankChallenge() {
    const RANK_DATA = [
      { name: "Cadet (Recruit)", insignia: "\u{1F396}\uFE0F", display: "(no badge)" },
      { name: "Cadet", insignia: "\u{26AB}", display: "\u25CF one pip" },
      { name: "Cadet Lance-Corporal / Leading Air Cadet / Leading Cadet", insignia: "\u{26AB}\u{26AB}", display: "\u25CF\u25CF two pips" },
      { name: "Cadet Corporal", insignia: "\u{2696}\uFE0F", display: "\u2696 one chevron" },
      { name: "Cadet Master Corporal / Master Cadet", insignia: "\u{2696}\uFE0F\u{2696}\uFE0F", display: "\u2696\u2696 two chevrons" },
      { name: "Cadet Sergeant", insignia: "\u{1F451}", display: "\u2696\u2696\u2696 crown" }
    ];
    const target = RANK_DATA[Math.floor(Math.random() * RANK_DATA.length)];
    const distractors = shuffleArray(RANK_DATA.filter(function (r) { return r.name !== target.name; })).slice(0, 3);
    const options = shuffleArray([target].concat(distractors));
    fc.rank.target = target;
    fc.rank.options = options;

    const area = document.getElementById("fcChallengeArea");
    if (!area) return;
    area.innerHTML =
      '<div class="fc-rank-wrap">' +
        '<div class="fc-rank-prompt">What rank is shown by this insignia?</div>' +
        '<div class="fc-rank-insignia">' +
          '<div class="ri-display">' + target.insignia + '</div>' +
          '<div class="ri-label">' + escapeHTML(target.display) + '</div>' +
        '</div>' +
        '<div class="fc-rank-options">' +
          options.map(function (o) {
            return '<button class="fc-rank-btn" data-rank="' + escapeHTML(o.name) + '" type="button">' + escapeHTML(o.name) + '</button>';
          }).join("") +
        '</div>' +
      '</div>';

    document.querySelectorAll(".fc-rank-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (fc.challengeDone) return;
        const chosen = btn.dataset.rank;
        document.querySelectorAll(".fc-rank-btn").forEach(function (b) {
          b.disabled = true;
          if (b.dataset.rank === target.name) b.classList.add("correct");
        });
        if (chosen === target.name) {
          fcHandleResult(true, 10, "Correct! That insignia is " + target.name + ".");
        } else {
          btn.classList.add("wrong");
          fcHandleResult(false, 0, "That is " + chosen + ", but the insignia shows " + target.name + ".");
        }
      });
    });

    fcStartTimer(12, null, function () {
      if (!fc.challengeDone) fcHandleResult(false, 0, "Time's up! The insignia was " + target.name + ".");
    });
  }

  // ==========================================================
  // MODE 2 — DRILL COMMANDS
  // ==========================================================
  function renderDrillChallenge() {
    const DRILL_DATA = [
      { cmd: "ATTENTION", correct: "Heels together, body upright, arms straight at sides", wrong: ["March forward at quick march", "Turn 90 degrees to the right", "Take one pace to the rear"] },
      { cmd: "RIGHT TURN", correct: "Pivot 90 degrees right on the right heel", wrong: ["Pivot 180 degrees about", "March forward at double time", "Take one pace to the left"] },
      { cmd: "ABOUT TURN", correct: "Pivot 180 degrees to face the opposite direction", wrong: ["Turn 45 degrees right", "Salute to the front", "Stand at ease"] },
      { cmd: "STAND AT EASE", correct: "Keep right foot in place, move left foot, hands behind back", wrong: ["Sit down on the ground", "March to the right flank", "Dismiss from the parade"] },
      { cmd: "QUICK MARCH", correct: "Step off at a brisk walking pace, arms swinging", wrong: ["Run at full speed", "Stand still and wait", "Turn to face the officer"] },
      { cmd: "HALT", correct: "Stop in two beats, freeze at attention", wrong: ["Take three more paces then sit", "Turn right and march", "Salute and continue marching"] },
      { cmd: "LEFT INCLINE", correct: "Turn 45 degrees to the left", wrong: ["Turn 90 degrees left", "Turn 45 degrees right", "March to the rear"] },
      { cmd: "DISMISS", correct: "Salute, turn right, march off the parade", wrong: ["Stand perfectly still", "Sit down where you are", "Turn 180 and about face"] }
    ];
    const item = DRILL_DATA[Math.floor(Math.random() * DRILL_DATA.length)];
    const options = shuffleArray([
      { text: item.correct, correct: true },
      { text: item.wrong[0], correct: false },
      { text: item.wrong[1], correct: false },
      { text: item.wrong[2], correct: false }
    ]);
    fc.drill.command = item;
    fc.drill.options = options;

    const area = document.getElementById("fcChallengeArea");
    if (!area) return;
    area.innerHTML =
      '<div class="fc-drill-wrap">' +
        '<div class="fc-drill-prompt">The drill command is called. Tap the correct response.</div>' +
        '<div class="fc-drill-command">' +
          '<div class="dc-label">DRILL COMMAND</div>' +
          '<div class="dc-cmd">' + escapeHTML(item.cmd) + '</div>' +
        '</div>' +
        '<div class="fc-drill-options">' +
          options.map(function (o) {
            return '<button class="fc-drill-btn" data-correct="' + o.correct + '" type="button">' + escapeHTML(o.text) + '</button>';
          }).join("") +
        '</div>' +
      '</div>';

    document.querySelectorAll(".fc-drill-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (fc.challengeDone) return;
        document.querySelectorAll(".fc-drill-btn").forEach(function (b) { b.disabled = true; });
        const isCorrect = btn.dataset.correct === "true";
        document.querySelectorAll('.fc-drill-btn[data-correct="true"]').forEach(function (b) { b.classList.add("correct"); });
        if (isCorrect) {
          fcHandleResult(true, 10, "Correct response to \"" + item.cmd + "\".");
        } else {
          btn.classList.add("wrong");
          fcHandleResult(false, 0, "Wrong response to \"" + item.cmd + "\". The correct action: " + item.correct + ".");
        }
      });
    });

    fcStartTimer(14, null, function () {
      if (!fc.challengeDone) fcHandleResult(false, 0, "Time's up! The correct response to \"" + item.cmd + "\" was: " + item.correct + ".");
    });
  }

  // ==========================================================
  // MODE 3 — UNIFORM INSPECTION
  // ==========================================================
  function renderUniformChallenge() {
    const FAULT_DATA = [
      { scene: "\u{1F9D1}\u200D\u{1FA73}\u2696\uFE0F", fault: "Uniform has visible wrinkles and creases", correct: "Wrinkled uniform", wrong: ["Polished boots", "Neatly pressed uniform", "Hair within regulation"] },
      { scene: "\u{1F9D1}\u200D\u2702\uFE0F\u{1F451}", fault: "Hair extends below the collar and is untidy", correct: "Hair too long / untidy", wrong: ["Hair trimmed above collar", "Clean-shaven", "Cap worn correctly"] },
      { scene: "\u{1F9D1}\u200D\u{1F454}\u{1F442}", fault: "Top button undone, collar open on parade", correct: "Top button undone", wrong: ["All buttons fastened", "Tie worn correctly", "Collar clean and closed"] },
      { scene: "\u{1F9D1}\u200D\u{1F45F}\u{1F442}", fault: "Boots unpolished and laces loose", correct: "Unpolished boots / loose laces", wrong: ["Boots mirror-polished", "Laces tucked in", "Trousers bloused correctly"] },
      { scene: "\u{1F9D1}\u200D\u{1F3A3}\u2764\uFE0F", fault: "Wearing a personal earring on parade", correct: "Unauthorized jewellery", wrong: ["No jewellery worn", "ID badge displayed", "Watch within policy"] },
      { scene: "\u{1F9D1}\u200D\u{1F451}\u{1F9F9}", fault: "Cap tilted sideways, not square on the head", correct: "Cap worn at an angle", wrong: ["Cap square and level", "Cap badge centered", "Cap properly sized"] }
    ];
    const item = FAULT_DATA[Math.floor(Math.random() * FAULT_DATA.length)];
    const options = shuffleArray([
      { text: item.correct, correct: true },
      { text: item.wrong[0], correct: false },
      { text: item.wrong[1], correct: false },
      { text: item.wrong[2], correct: false }
    ]);
    fc.uniform.scene = item;
    fc.uniform.options = options;

    const area = document.getElementById("fcChallengeArea");
    if (!area) return;
    area.innerHTML =
      '<div class="fc-uniform-wrap">' +
        '<div class="fc-uniform-prompt">This cadet is on inspection. Spot the fault that needs correcting.</div>' +
        '<div class="fc-uniform-scene">' + item.scene + '</div>' +
        '<div class="fc-uniform-options">' +
          options.map(function (o) {
            return '<button class="fc-uniform-btn" data-correct="' + o.correct + '" type="button">' +
              '<span class="ub-ico">\u{1F50D}</span><span>' + escapeHTML(o.text) + '</span></button>';
          }).join("") +
        '</div>' +
      '</div>';

    document.querySelectorAll(".fc-uniform-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (fc.challengeDone) return;
        document.querySelectorAll(".fc-uniform-btn").forEach(function (b) { b.disabled = true; });
        const isCorrect = btn.dataset.correct === "true";
        document.querySelectorAll('.fc-uniform-btn[data-correct="true"]').forEach(function (b) { b.classList.add("correct"); });
        if (isCorrect) {
          fcHandleResult(true, 10, "Fault identified: " + item.correct + ".");
        } else {
          btn.classList.add("wrong");
          fcHandleResult(false, 0, "Not the fault. The issue was: " + item.correct + ".");
        }
      });
    });

    fcStartTimer(12, null, function () {
      if (!fc.challengeDone) fcHandleResult(false, 0, "Time's up! The fault was: " + item.correct + ".");
    });
  }

  // ==========================================================
  // MODE 4 — CADET PLEDGE
  // ==========================================================
  function renderPledgeChallenge() {
    const PLEDGES = [
      { built: "I pledge to serve my community with honour and integrity as a cadet.", words: ["I", "pledge", "to", "serve", "my", "community", "with", "honour", "and", "integrity", "as", "a", "cadet."] },
      { built: "I will respect my leaders, support my team, and uphold the cadet values at all times.", words: ["I", "will", "respect", "my", "leaders,", "support", "my", "team,", "and", "uphold", "the", "cadet", "values", "at", "all", "times."] },
      { built: "As a cadet I promise to be loyal, courageous, and disciplined in service of others.", words: ["As", "a", "cadet", "I", "promise", "to", "be", "loyal,", "courageous,", "and", "disciplined", "in", "service", "of", "others."] }
    ];
    const pledge = PLEDGES[Math.floor(Math.random() * PLEDGES.length)];
    fc.pledge.words = pledge.words.slice();
    fc.pledge.correctOrder = pledge.words.slice();
    fc.pledge.built = [];

    const area = document.getElementById("fcChallengeArea");
    if (!area) return;
    area.innerHTML =
      '<div class="fc-pledge-wrap">' +
        '<div class="fc-pledge-prompt">Tap the words in order to complete the cadet pledge.</div>' +
        '<div class="fc-pledge-built" id="pledgeBuilt"></div>' +
        '<div class="fc-pledge-pool" id="pledgePool">' +
          shuffleArray(pledge.words.slice()).map(function (w) {
            return '<button class="fc-pledge-word" data-word="' + escapeHTML(w) + '" type="button">' + escapeHTML(w) + '</button>';
          }).join("") +
        '</div>' +
      '</div>';

    function refreshBuilt() {
      const el = document.getElementById("pledgeBuilt");
      if (el) {
        el.innerHTML = fc.pledge.built.length > 0
          ? fc.pledge.built.map(function (w) { return '<span class="pw">' + escapeHTML(w) + '</span>'; }).join(" ")
          : '<span class="muted" style="font-size:12px;">Tap words below to build the pledge...</span>';
      }
    }
    function checkComplete() {
      if (fc.pledge.built.length === fc.pledge.correctOrder.length) {
        const correct = fc.pledge.built.every(function (w, i) { return w === fc.pledge.correctOrder[i]; });
        if (correct) {
          fcHandleResult(true, 10, "Pledge completed correctly in order.");
        } else {
          fcHandleResult(false, 0, "Pledge completed but words were out of order. Read it carefully next time.");
        }
      }
    }
    refreshBuilt();

    document.querySelectorAll(".fc-pledge-word").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (fc.challengeDone) return;
        const word = btn.dataset.word;
        const nextExpected = fc.pledge.correctOrder[fc.pledge.built.length];
        if (word !== nextExpected) {
          btn.classList.add("wrong");
          fcHandleResult(false, 0, "Wrong word order. The next word should be \"" + nextExpected + "\".");
          return;
        }
        btn.classList.add("used");
        fc.pledge.built.push(word);
        refreshBuilt();
        checkComplete();
      });
    });

    fcStartTimer(25, null, function () {
      if (!fc.challengeDone) fcHandleResult(false, 0, "Time's up! The pledge wasn't completed in order.");
    });
  }

  // ==========================================================
  // MODE 5 — PARADE PROTOCOL
  // ==========================================================
  function renderParadeChallenge() {
    fc.parade.value = 40 + Math.random() * 15;
    fc.parade.running = true;
    fc.parade.fired = false;
    fc.parade.dir = 1;
    fc.parade.lastEvent = performance.now();

    const EVENTS = [
      "Officer approaching \u2014 readiness rising, watch the meter!",
      "Flag ceremony begins \u2014 prepare to stand to!",
      "Distracted cadet nearby \u2014 focus may dip, stay sharp...",
      "Parade commander calling \u2014 get ready to respond!",
      "National anthem imminent \u2014 readiness is building!"
    ];

    const area = document.getElementById("fcChallengeArea");
    if (!area) return;
    area.innerHTML =
      '<div class="fc-parade-wrap">' +
        '<div class="fc-parade-meter-wrap">' +
          '<div class="fc-parade-label">READINESS \u2014 TAP STAND TO IN THE GREEN ZONE (75-100)</div>' +
          '<div class="fc-parade-meter">' +
            '<div class="fc-parade-fill" id="paradeFill" style="width:' + fc.parade.value + '%"></div>' +
            '<div class="fc-parade-zone-good"></div>' +
          '</div>' +
          '<div class="fc-parade-value" id="paradeValue">' + Math.round(fc.parade.value) + '%</div>' +
        '</div>' +
        '<div class="fc-parade-event" id="paradeEvent">Readiness is steady. Watch the meter...</div>' +
        '<button class="fc-parade-btn" id="paradeStandBtn" type="button">\u{1F6A9} STAND TO</button>' +
      '</div>';

    const fill = document.getElementById("paradeFill");
    const valEl = document.getElementById("paradeValue");
    const eventEl = document.getElementById("paradeEvent");
    const btn = document.getElementById("paradeStandBtn");

    function updateDisplay() {
      if (fill) fill.style.width = fc.parade.value + "%";
      if (valEl) valEl.textContent = Math.round(fc.parade.value) + "%";
      fcRenderCadet();
    }

    function loop() {
      if (!fc.parade.running) return;
      fc.parade.value += fc.parade.dir * 0.35;
      if (fc.parade.value >= 95) { fc.parade.dir = -1; }
      if (fc.parade.value <= 20) { fc.parade.dir = 1; }
      if (Math.random() < 0.01) fc.parade.dir *= -1;
      if (performance.now() - fc.parade.lastEvent > 4000) {
        fc.parade.lastEvent = performance.now();
        const ev = EVENTS[Math.floor(Math.random() * EVENTS.length)];
        if (eventEl) eventEl.textContent = ev;
        if (Math.random() < 0.5) fc.parade.dir *= -1;
      }
      updateDisplay();
      fc.parade.raf = requestAnimationFrame(loop);
    }
    fc.parade.raf = requestAnimationFrame(loop);

    if (btn) {
      btn.addEventListener("click", function () {
        if (fc.challengeDone || fc.parade.fired) return;
        fc.parade.fired = true;
        fc.parade.running = false;
        if (fc.parade.raf) { cancelAnimationFrame(fc.parade.raf); fc.parade.raf = null; }
        if (fc.parade.value >= 75) {
          fcHandleResult(true, 10, "Stood to at " + Math.round(fc.parade.value) + "% readiness \u2014 perfect timing in the green zone!");
        } else {
          fcHandleResult(false, 0, "Stood to at " + Math.round(fc.parade.value) + "% \u2014 too early. Wait for the green zone (75-100).");
        }
      });
    }

    fcStartTimer(18, null, function () {
      if (!fc.challengeDone) {
        fc.parade.running = false;
        if (fc.parade.raf) { cancelAnimationFrame(fc.parade.raf); fc.parade.raf = null; }
        fcHandleResult(false, 0, "Time's up! You never stood to attention.");
      }
    });
  }

  // ==========================================================
  // GAME LIFECYCLE
  // ==========================================================
  function fcHandleResult(success, scoreVal, detailText) {
    if (fc.challengeDone) return;
    fc.challengeDone = true;
    fcStopAllAnimations();
    fcStopTimer();
    fcResetTimerDisplay();
    if (success) {
      fc.correct++;
      fc.streak++;
      if (fc.streak > fc.bestStreak) fc.bestStreak = fc.streak;
      fc.score += scoreVal || 10;
      fcSetFeedback("\u2705 <strong>CORRECT!</strong> " + detailText + " +" + (scoreVal || 10) + " points.", "ok");
      fcAddLog(detailText, true, scoreVal || 10);
    } else {
      fc.wrong++;
      fc.streak = 0;
      fcSetFeedback("\u274C <strong>INCORRECT.</strong> " + detailText, "err");
      fcAddLog(detailText, false, 0);
    }
    recordAttempt(success);
    fcUpdateStats();
    fcSaveStats();
    renderSidebar();
    renderTopStats();
    renderAnalysis();
    document.getElementById("fcNextBtn").disabled = false;
  }

  function fcStartQualification() {
    fcStopAllAnimations();
    fc.active = true;
    fc.examMode = false;
    fc.score = 0;
    fc.correct = 0;
    fc.wrong = 0;
    fc.streak = 0;
    fc.round = 0;
    fc.totalRounds = 0;
    fc.challengePool = shuffleArray(FC_MODES.map(function (m) { return m.id; }));
    fc.poolIndex = 0;
    fcUpdateStats();
    fcRenderCadet();
    document.getElementById("fcStartBtn").disabled = true;
    document.getElementById("fcExamBtn").disabled = true;
    document.getElementById("fcNextBtn").disabled = true;
    fcNextMode();
  }

  function fcStartExamMode() {
    fcStopAllAnimations();
    fc.active = true;
    fc.examMode = true;
    fc.score = 0;
    fc.correct = 0;
    fc.wrong = 0;
    fc.streak = 0;
    fc.round = 0;
    fc.totalRounds = 5;
    fc.challengePool = [];
    for (let i = 0; i < 5; i++) {
      fc.challengePool.push(FC_MODES[Math.floor(Math.random() * FC_MODES.length)].id);
    }
    fc.poolIndex = 0;
    fcUpdateStats();
    fcRenderCadet();
    document.getElementById("fcStartBtn").disabled = true;
    document.getElementById("fcExamBtn").disabled = true;
    document.getElementById("fcNextBtn").disabled = true;
    fcSetFeedback("<strong>EXAM MODE</strong> \u2014 5 rounds, random cadet challenges. Qualify with 4 out of 5. Stand by!", "info");
    setTimeout(function () { fcNextMode(); }, 800);
  }

  function fcNextMode() {
    fcStopAllAnimations();
    if (fc.poolIndex >= fc.challengePool.length) {
      fcFinishQualification();
      return;
    }
    fc.currentMode = fc.challengePool[fc.poolIndex];
    fc.poolIndex++;
    fc.round++;
    fc.challengeDone = false;
    fcUpdateStats();
    document.getElementById("fcNextBtn").disabled = true;
    fcSetModeBadge(fc.currentMode);
    const mode = FC_MODES.find(function (m) { return m.id === fc.currentMode; });
    fcSetFeedback("<strong>" + mode.label + "</strong> \u2014 " + mode.tip, "info");

    if (fc.currentMode === "rank") renderRankChallenge();
    else if (fc.currentMode === "drill") renderDrillChallenge();
    else if (fc.currentMode === "uniform") renderUniformChallenge();
    else if (fc.currentMode === "pledge") renderPledgeChallenge();
    else if (fc.currentMode === "parade") renderParadeChallenge();
  }

  function fcReset() {
    fcStopAllAnimations();
    fc.active = false;
    fc.examMode = false;
    fc.currentMode = null;
    fc.score = 0;
    fc.correct = 0;
    fc.wrong = 0;
    fc.streak = 0;
    fc.round = 0;
    fc.challengeDone = false;
    fc.parade.value = 60;
    fcResetTimerDisplay();
    fcSetModeBadge(null);
    fcUpdateStats();
    fcRenderCadet();
    const area = document.getElementById("fcChallengeArea");
    if (area) area.innerHTML =
      '<div class="fc-idle-prompt">' +
        '<div class="fc-idle-ico">\U0001F3A8</div>' +
        '<h2>Five Cadet Challenge Modes</h2>' +
        '<div class="fc-mode-list">' +
          '<div class="fc-mode-item"><span class="fc-mode-ico">\u{1F396}\uFE0F</span><div><strong>Rank Recognition</strong> \u2014 Identify the cadet rank from its insignia.</div></div>' +
          '<div class="fc-mode-item"><span class="fc-mode-ico">\u{1F6B6}</span><div><strong>Drill Commands</strong> \u2014 Match each drill command to the correct response.</div></div>' +
          '<div class="fc-mode-item"><span class="fc-mode-ico">\u{1F454}</span><div><strong>Uniform Inspection</strong> \u2014 Spot the grooming or dress fault.</div></div>' +
          '<div class="fc-mode-item"><span class="fc-mode-ico">\u{1F4DC}</span><div><strong>Cadet Pledge</strong> \u2014 Complete the cadet oath in the correct order.</div></div>' +
          '<div class="fc-mode-item"><span class="fc-mode-ico">\u{1F393}</span><div><strong>Parade Protocol</strong> \u2014 Respond to parade situations at the right moment.</div></div>' +
        '</div>' +
        '<p class="muted" style="font-size:12px; margin-top:14px;">Press <strong>Start Qualification</strong> to begin. Modes are called one at a time in random order.</p>' +
      '</div>';
    const list = document.getElementById("fcLogList");
    if (list) list.innerHTML = '<p class="muted" style="font-size:11px; padding:8px;">No challenges completed yet.</p>';
    fcSetFeedback("Challenge reset. Press <strong>Start Qualification</strong> to begin.", "info");
    document.getElementById("fcStartBtn").disabled = false;
    document.getElementById("fcExamBtn").disabled = false;
    document.getElementById("fcNextBtn").disabled = true;
  }

  function fcFinishQualification() {
    fc.active = false;
    fcStopAllAnimations();
    fc.currentMode = null;
    fcSetModeBadge(null, "Qualification Complete");
    fcResetTimerDisplay();
    document.getElementById("fcStartBtn").disabled = false;
    document.getElementById("fcExamBtn").disabled = false;
    document.getElementById("fcNextBtn").disabled = true;
    const total = fc.correct + fc.wrong;
    const pct = total > 0 ? Math.round((fc.correct / total) * 100) : 0;
    let msg = "";
    if (fc.examMode) {
      if (fc.correct >= 4) {
        msg = "<strong>QUALIFIED!</strong> You passed the cadet challenge exam with " + fc.correct + "/5. Score: " + fc.score + ". You have mastered the first-year basics.";
        addXP(50);
        saveState();
        renderSidebar(); renderTopStats(); renderCommand();
        toast("ok", "Cadet Challenge Exam Passed! +50 XP");
      } else {
        msg = "<strong>NOT YET QUALIFIED.</strong> You scored " + fc.correct + "/5. You need 4/5 to pass. Keep practising \u2014 the basics become second nature with repetition.";
      }
    } else {
      if (pct >= 80) {
        msg = "<strong>OUTSTANDING!</strong> " + fc.correct + "/" + total + " correct (" + pct + "%). Score: " + fc.score + ". Try Exam Mode for formal qualification.";
      } else if (pct >= 50) {
        msg = "<strong>SOLID EFFORT.</strong> " + fc.correct + "/" + total + " correct (" + pct + "%). Score: " + fc.score + ". Review the Learn library and try again.";
      } else {
        msg = "<strong>KEEP TRAINING.</strong> " + fc.correct + "/" + total + " correct (" + pct + "%). Study the Learn library and practise each mode.";
      }
    }
    fcSetFeedback(msg, pct >= 50 ? "ok" : "err");
    const area = document.getElementById("fcChallengeArea");
    if (area) area.innerHTML =
      '<div class="fc-idle-prompt">' +
        '<div class="fc-idle-ico">\U0001F3A8</div>' +
        '<h2>Qualification Complete</h2>' +
        '<p style="color:var(--ink-2); font-size:13px; line-height:1.6;">' + msg.replace(/<[^>]+>/g, "") + '</p>' +
        '<p class="muted" style="font-size:12px; margin-top:14px;">Press <strong>Start Qualification</strong> for another round, or <strong>Exam Mode</strong> for the formal test.</p>' +
      '</div>';
  }

  function renderFieldGame() {
    fcLoadStats();
    fcUpdateStats();
    fcRenderCadet();
    fcResetTimerDisplay();
    fcSetModeBadge(null);

    const startBtn = document.getElementById("fcStartBtn");
    const nextBtn = document.getElementById("fcNextBtn");
    const examBtn = document.getElementById("fcExamBtn");
    const resetBtn = document.getElementById("fcResetBtn");
    if (startBtn) startBtn.addEventListener("click", fcStartQualification);
    if (nextBtn) nextBtn.addEventListener("click", fcNextMode);
    if (examBtn) examBtn.addEventListener("click", fcStartExamMode);
    if (resetBtn) resetBtn.addEventListener("click", fcReset);
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
    if (name === "field") renderFieldGame();
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
    ico.textContent = kind === "ok" ? "\u2705" : kind === "warn" ? "\u26a0\ufe0f" : kind === "err" ? "\u274c" : "\u2139\ufe0f";
    txt.textContent = text;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 3500);
  }

  function escapeHTML(s) {
    const AMP = String.fromCharCode(38) + "amp;";
    const LT = String.fromCharCode(38) + "lt;";
    const GT = String.fromCharCode(38) + "gt;";
    const DQ = String.fromCharCode(38) + "quot;";
    const SQ = String.fromCharCode(38) + "#39;";
    return String(s).replace(/[&<>"']/g, function (c) {
      if (c === String.fromCharCode(38)) return AMP;
      if (c === "<") return LT;
      if (c === ">") return GT;
      if (c === '"') return DQ;
      return SQ;
    });
  }

  /* ── i18n: translate data arrays in-place ── */
  if (typeof trMutate === "function") {
    try { trMutate(DRILL_DATA); } catch(e) {}
    try { trMutate(EVENTS); } catch(e) {}
    try { trMutate(FAULT_DATA); } catch(e) {}
    try { trMutate(FC_MODES); } catch(e) {}
    try { trMutate(LEARN_ARTICLES); } catch(e) {}
    try { trMutate(MISSIONS); } catch(e) {}
    try { trMutate(PLEDGES); } catch(e) {}
    try { trMutate(RANKS); } catch(e) {}
    try { trMutate(RANK_DATA); } catch(e) {}
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
    fcLoadStats();
    renderFieldGame();

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
