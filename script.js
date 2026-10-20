const lessons = [
  {
    id: 1, map: 'main',
    short: 'Basics',
    title: 'Cadet Basics',
    subtitle: 'Orientation, ranks, values, and how the training program works.',
    badge: 'badge_01_cadet_basics.png',
    theme: ['#2f6fbe', '#35a75a'],
    tags: ['Core', 'Orientation', 'Starter Quest'],
    brief: 'Learners begin at Cadet HQ and review the basic expectations of Green Star (Army), Proficiency Level 1 (Air), and Phase 1 (Sea) training. This lesson introduces how badges are earned, how progress is tracked, and how cadets move through the open campus map. It covers the aim of the Canadian Cadet Program, the rank structure, and the purpose of the training program.',
    objectives: ['Identify the purpose of the cadet training program.', 'Recognise basic rank structure and respectful forms of address.', 'Understand the aim of the Canadian Cadet Program.', 'Understand how completing lessons unlocks badges.'],
    challenge: 'Starter challenge: choose your first training station and explain why that skill matters to a new cadet.',
    x: 36, y: 30
  },
  {
    id: 2, map: 'main',
    short: 'Drill',
    title: 'Drill & Parade',
    subtitle: 'Attention, stand at ease, turnings, marching, halting, and saluting.',
    badge: 'badge_02_drill_and_parade.png',
    theme: ['#476b9f', '#f5c84c'],
    tags: ['Core', 'Drill & Turnout', 'Discipline'],
    brief: 'Cadets learn why drill builds discipline, coordination, and confidence. Green Star / Proficiency Level 1 / Phase 1 drill covers the aim and purpose of drill, attention, stand at ease and stand easy, turnings at the halt, marching and halting in quick time, compliments and saluting to the front. The interactive version lets learners match commands to movements and tap in time with a marching cadence.',
    objectives: ['Define attention, stand at ease, and stand easy.', 'Perform turnings at the halt and marching in quick time.', 'Explain the purpose of compliments and salute correctly.', 'Match basic commands to the correct response.'],
    challenge: 'Mini challenge: select the correct response to "Squad, attention" and complete a three-command sequence without error.',
    x: 35, y: 45
  },
  {
    id: 3, map: 'main',
    short: 'Uniform',
    title: 'Dress & Uniform Standards',
    subtitle: 'Clothing, appearance, care, and inspection-ready turnout.',
    badge: 'badge_03_dress_and_uniform.png',
    theme: ['#10233d', '#6f8fb7'],
    tags: ['Core', 'Drill & Turnout', 'Inspection'],
    brief: 'This lesson covers clothing and appearance standards from the first-year Drill, Turnout and Military Knowledge syllabus. Learners review neatness, placement, care, and presentation before checking off a virtual uniform inspection. The interactive version turns uniform preparation into a visual inspection game.',
    objectives: ['Identify uniform items and their correct placement.', 'Demonstrate basic care and maintenance routines.', 'Spot inspection issues in a visual scenario.', 'Connect personal presentation to teamwork and professionalism.'],
    challenge: 'Inspection challenge: find three uniform issues before the timer ends.',
    x: 44, y: 32
  },
  {
    id: 4, map: 'main',
    short: 'Citizen',
    title: 'Citizenship & Teamwork',
    subtitle: 'Values, standards, community engagement, and supporting the section.',
    badge: 'badge_04_citizenship.png',
    theme: ['#35a75a', '#f5c84c'],
    tags: ['Core', 'Values', 'Community'],
    brief: 'Cadets explore the aim of the Canadian Cadet Program — good citizenship, leadership, physical fitness, and interest in the activities of the Canadian Armed Forces. Respectful participation, community mindset, and group problem-solving are emphasised. This aligns with the Citizenship and Community Service performance objectives of the syllabus. The demo presents branching choices where supportive decisions improve team morale.',
    objectives: ['Describe the aim of the Canadian Cadet Program — good citizenship, leadership, physical fitness, and interest in Canadian Armed Forces activities.', 'Choose teamwork actions during a scenario.', 'Reflect on how community service supports others.'],
    challenge: 'Scenario challenge: a teammate is falling behind during a task. Choose the response that best supports the team.',
    x: 48, y: 52
  },
  {
    id: 5, map: 'main',
    short: 'Parade',
    title: 'Parade Drill',
    subtitle: 'Foot drill, drill rifle movements, and flag party ceremonial drill from the 201.',
    badge: 'badge_05_parade_drill.png',
    theme: ['#1a2b4a', '#d4af37'],
    tags: ['Core', 'Drill & Turnout', 'Ceremonial'],
    brief: 'Parade Drill teaches cadets to perform ceremonial drill with drill rifles and flags, following the Canadian Armed Forces Manual of Drill and Ceremonial (A-DH-201-000/PT-000, known as "the 201"). Cadets build on basic foot drill — attention, stand at ease, turnings, and marching — and progress to arms drill with the drill rifle: shoulder arms, present arms, port arms, and the salute at the shoulder. The lesson then introduces ceremonial rifle movements such as recover arms and reverse arms, along with flag and colour party drill including the carry, slope, let fly, and dip. The interactive version lets learners match drill commands to the correct movement and sequence a full parade compliment.',
    objectives: ['Perform shoulder arms, present arms, and port arms with a drill rifle as detailed in the 201.', 'Execute the salute at the shoulder and describe when compliments are paid on parade.', 'Identify the composition of a colour party and a flag party and explain the duties of each member.', 'Demonstrate colour drill positions: carry, slope, let fly, catch, and dip.', 'Sequence a parade compliment — general salute with present arms, let fly the colour, then shoulder arms.'],
    challenge: 'Parade challenge: call the correct sequence of commands for a general salute — present arms, let fly the colour, catch the colour, and shoulder arms — with every movement matched to the 201 standard pause.',
    x: 32, y: 22
  },
  {
    id: 6, map: 'main',
    short: 'Nav',
    title: 'Navigation Trail',
    subtitle: 'Map care, symbols, features, handrails, and Leave No Trace principles.',
    badge: 'badge_06_navigation.png',
    theme: ['#456534', '#8ee86e'],
    tags: ['Field Skill', 'Navigation', 'Map Reading'],
    brief: 'Cadets follow a forest trail and learn the first-year Navigation and Expedition syllabus: identifying and caring for maps, map symbols and features, handrails to maintain position, and Leave No Trace principles. A full version could include a drag-the-route map puzzle using cardinal directions and checkpoint navigation.',
    objectives: ['Identify and care for a map correctly.', 'Recognise map symbols and features.', 'Use handrails to maintain position on an oriented map.', 'Follow Leave No Trace principles in the field.'],
    challenge: 'Route challenge: pick the safest path from HQ to the campsite using three checkpoints and map symbols.',
    x: 88, y: 85
  },
  {
    id: 7, map: 'specialist',
    short: 'Radio',
    title: 'Radio Communications',
    subtitle: 'Phonetic alphabet, 24-hour clock, and clear voice procedure.',
    badge: 'badge_07_radio_communications.png',
    theme: ['#2f6fbe', '#9ed8ff'],
    tags: ['Communication', 'CIS', 'Procedure'],
    brief: 'Cadets visit the radio tower and learn the Communication and Information Systems (CIS) syllabus: the phonetic alphabet, numbers, the 24-hour clock, and types of communication. The playable version asks learners to assemble a correct radio call from phrase cards using proper voice procedure.',
    objectives: ['Recite the NATO phonetic alphabet.', 'Read and use the 24-hour clock.', 'Build a simple message using correct call order.', 'Confirm received information accurately.'],
    challenge: 'Message challenge: arrange call sign, location, request, and confirmation in the correct order using the phonetic alphabet.',
    x: 22, y: 72
  },
  {
    id: 8, map: 'main',
    short: 'Aid',
    title: 'First Aid Hut',
    subtitle: 'Primary survey, CPR, bleeding, choking, and heart attack response.',
    badge: 'badge_08_first_aid.png',
    theme: ['#d94b4b', '#fff3ce'],
    tags: ['Safety', 'First Aid', 'Scenario'],
    brief: 'This station covers the first-year First Aid syllabus: the primary survey (DRABC), cardiopulmonary resuscitation, and response to heart attack, bleeding, and choking. Learners identify hazards, call for help, and choose basic first-aid actions within their training level.',
    objectives: ['Perform a primary survey using DRABC.', 'Describe when and how to call for emergency help.', 'Demonstrate basic CPR awareness.', 'Respond to bleeding, choking, and heart attack scenarios.'],
    challenge: 'Safety challenge: complete the primary survey and choose the correct first three actions for a casualty scenario.',
    x: 62, y: 55
  },
  {
    id: 9, map: 'main',
    short: 'Fitness',
    title: 'Physical Fitness Course',
    subtitle: 'Warm-up, cool-down, diet, hydration, and keeping active.',
    badge: 'badge_09_physical_fitness.png',
    theme: ['#f08a24', '#f5c84c'],
    tags: ['Fitness', 'Keeping Active', 'Wellness'],
    brief: 'Cadets learn the first-year Physical Fitness syllabus: the importance of diet and hydration, how to warm up and cool down, and building healthy habits through movement and pacing. The game version lets learners pick warmups, pace choices, and recovery steps.',
    objectives: ['Identify safe warmup and cooldown habits.', 'Explain the importance of diet and hydration.', 'Set a personal improvement goal.', 'Explain how teamwork supports fitness activities.'],
    challenge: 'Fitness challenge: build a safe three-part training plan — warmup, activity, and cooldown.',
    x: 52, y: 43
  },
  {
    id: 11, map: 'main',
    short: 'Range',
    title: 'Marksmanship Principles',
    subtitle: 'Marksmanship principles and an interactive firing range simulator.',
    badge: 'badge_18_marksmanship_principles.png',
    theme: ['#d94b4b', '#f5c84c'],
    tags: ['Marksmanship', 'Shooting', 'Range'],
    brief: 'The Firing Range Command module is a hands-on marksmanship principles trainer aligned with the first-year Marksmanship syllabus. Cadets complete 10 missions covering firing position, natural point of aim, sight alignment, breath control, trigger squeeze, follow-through, shot grouping analysis, zeroing, range safety, and qualification. The interactive Firing Range simulator features five skill modes: Sight Alignment, Breath Control, Trigger Squeeze, NPA Adjustment, and Shot Grouping.',
    objectives: ['Master the four marksmanship principles: position, NPA, sight alignment, and shot release.', 'Complete all 10 range training missions with correct tool usage.', 'Qualify on the interactive firing range across all five hands-on modes.', 'Read the knowledge base and climb the ranks from Range Recruit to Master Marksman Cadet.'],
    challenge: 'Range qualification: complete all 10 missions and pass the Exam Mode firing test (4 out of 5 modes) to earn the Marksmanship Principles badge.',
    x: 72, y: 62
  },
  {
    id: 12, map: 'main',
    short: 'Air',
    title: 'Air Cadet Flight Path',
    subtitle: 'Flight basics, weather, navigation, runway safety, and ATC operations.',
    badge: 'badge_13_air_program.png',
    theme: ['#2f76d2', '#9ed8ff'],
    tags: ['Air', 'Branch Pathway', 'Aviation'],
    brief: 'The Air pathway introduces aviation-themed learning aligned with Air Cadet training. Learners inspect a glider area, check weather clues, match aircraft parts, and practise runway safety. The module now includes an interactive Air Traffic Controller simulator where cadets use ICAO radio call signs to direct incoming aircraft to score points.',
    objectives: ['Recognise basic aviation safety concepts.', 'Connect weather awareness to flight activities.', 'Identify simple aircraft or glider features.', 'Practise radio phraseology as an air traffic controller.'],
    challenge: 'Flight path challenge: choose the correct pre-flight weather and runway safety checks, then direct aircraft in the ATC Tower simulator.',
    x: 75, y: 12
  },
  {
    id: 13, map: 'main',
    short: 'Army',
    title: 'Army Cadet Fieldcraft',
    subtitle: 'Introduction to fieldcraft, observation, field signals, and movement.',
    badge: 'badge_14_army_program.png',
    theme: ['#456534', '#9ab36a'],
    tags: ['Army', 'Fieldcraft', 'Branch Pathway'],
    brief: 'The Army pathway covers the first-year Fieldcraft syllabus: introduction to fieldcraft, why things are seen, moving with or without personal weapons, field signals, elementary night movement, and organisation of the section. The demo becomes a field decision scenario with observation and team movement.',
    objectives: ['Explain why things are seen and how to avoid detection.', 'Use field signals to communicate silently.', 'Choose team movement that keeps the group organised.', 'Describe the organisation of a section.'],
    challenge: 'Fieldcraft challenge: command your section through a patrol in the Field Range simulator — use field signals, choose the right movement technique, and reach objectives undetected using the principles of why things are seen.',
    x: 12, y: 12
  },
  {
    id: 14, map: 'main',
    short: 'Sea',
    title: 'Sea Cadet Harbour Skills',
    subtitle: 'Water safety, knots, chart symbols, and boat-part awareness.',
    badge: 'badge_15_sea_program.png',
    theme: ['#081628', '#2f6fbe'],
    tags: ['Sea', 'Branch Pathway', 'Water Safety'],
    brief: 'The Sea pathway uses navy styling with dock and water activities. Learners match knot uses, identify safety gear, and plan a simple harbour skills sequence. The module reinforces water safety awareness and basic seamanship fundamentals.',
    objectives: ['Recognise basic water safety equipment.', 'Match simple knots to their purpose.', 'Identify basic chart or harbour symbols.', 'Plan a safe harbour skills sequence.'],
    challenge: 'Harbour challenge: choose the correct safety gear before launching the canoe station.',
    x: 16, y: 66
  },
  {
    id: 10, map: 'specialist',
    short: 'Survival',
    title: 'Survival Training',
    subtitle: 'Level 1 / Green Star / Phase 1 survival — when lost, aircrew survival, and on-the-water survival.',
    badge: 'badge_10_survival.png',
    theme: ['#456534', '#8ee86e'],
    tags: ['Field Skill', 'Survival', 'Green Star / Level 1 / Phase 1'],
    brief: 'Cadets enter the survival stream of the Level 1 / Green Star / Phase 1 program and master the in-depth survival syllabus: the S.T.O.P. protocol when lost, the Five Elements and Seven Enemies of survival, emergency shelter building, safe fire lighting, ground-to-air signals, and weather prediction. Specialist modules cover aircrew survival after an aircraft emergency and on-the-water cold-water survival using the HELP and Huddle positions and the 1-10-1 rule. Where the core program lacks depth, supplementary sources fill the gaps for a comprehensive survival education. The interactive Bush Survivor simulator drops cadets into six locations across Canada — Arctic tundra, boreal forest, Rocky Mountains, Atlantic coast, Great Lakes, and prairie grassland — where they manage warmth, hydration, energy, and morale through real survival decisions with animated weather, day-night cycles, and environmental sound.',
    objectives: ['Apply the S.T.O.P. protocol (Sit, Think, Observe, Plan) when lost in the field.', 'Identify the Five Elements of Survival and counter the Seven Enemies of Survival.', 'Build emergency shelters from natural and improvised materials suited to the terrain.', 'Demonstrate safe fire lighting using the fire triangle, correct fuel stages, and fire types.', 'Execute aircrew survival priorities: salvage the wreckage, navigate without a map, and signal for rescue.', 'Perform cold-water survival: HELP and Huddle positions, 1-10-1 rule, and PFD discipline.', 'Read ground-to-air visual signals and predict weather from cloud formations.'],
    challenge: 'Survival challenge: drop into the Bush Survivor simulator at a Canadian location of your choice — manage your vitals, build shelter, light a fire, find and purify water, signal rescue, and stay alive until extraction. Every decision has real consequences.',
    x: 72, y: 78
  },
  {
    id: 15, map: 'specialist',
    short: 'Music',
    title: 'Cadet Music Program',
    subtitle: 'Brass, woodwind, percussion, and pipes & drums training.',
    badge: 'badge_16_music_theory.png',
    theme: ['#7b4fd6', '#ff9add'],
    tags: ['Music', 'Elective', 'Performance'],
    brief: 'This elective launches the full Harmony Command training simulator: cadets complete 12 instrument-section missions spanning brass, woodwind, percussion, and pipes & drums, each with interactive tasks, tool enforcement, a terminal console, and an XP-based proficiency ladder from Trainee to Drum Major.',
    objectives: ['Complete instrument-section training missions across all four sections.', 'Use the correct tool for each task and pass the terminal validation.', 'Read learn-library articles on music theory, instrument care, and band drill.', 'File SITREPs and climb the proficiency ranks to Level 5 / Drum Major.'],
    challenge: 'Music training: complete all 12 instrument-section missions and climb the proficiency ladder to earn the music badge.',
    x: 74, y: 22
  },
  {
    id: 16, map: 'specialist',
    short: 'Cyber',
    title: 'Cyber Security Range',
    subtitle: 'Investigate simulated cyber incidents and choose safe defensive actions.',
    badge: 'badge_17_cyber_security.png',
    theme: ['#06101f', '#22f5bf'],
    tags: ['Cyber', 'Elective', 'Digital Safety'],
    brief: 'The cyber security range adds a defensive digital safety pathway to the cadet quest map. Cadets investigate safe simulated evidence for phishing, malware, web logs, ransomware, rogue Wi‑Fi, Linux privilege risk, Active Directory compromise, insider risk, cloud takeover, and command-and-control beaconing.',
    objectives: ['Recognise common cyber incident patterns.', 'Choose safe containment, reporting, and evidence-preservation actions.', 'Complete eleven cyber range modules to unlock the Cyber Security badge.'],
    challenge: 'Cyber range challenge: complete all eleven defensive investigation scenarios and save the Cyber Security badge to the quest map.',
    x: 24, y: 16
  },
  {
    id: 17, map: 'specialist',
    short: 'Escape',
    title: 'Cadet Escape Room',
    subtitle: 'Capstone challenge — escape the bunker using everything you learned in your first year of training.',
    badge: 'badge_19_escape_room.png',
    theme: ['#0a1628', '#f0a830'],
    tags: ['Capstone', 'Escape Room', 'Challenge'],
    brief: 'The ultimate capstone challenge. You are locked inside an abandoned Cadet Training Bunker and must escape by solving five training-room puzzles — each drawn from a different first-year module: Drill & Uniform, Radio Communications, Navigation, First Aid, and Survival & Fieldcraft. Collect a clue fragment from each room, then crack the final master vault lock to escape. The experience features animated room transitions, a 20-minute countdown timer, ambient background music, sound effects, and a limited hint system. Every puzzle tests knowledge from the training program — trust your training and escape before time runs out.',
    objectives: ['Solve the Drill & Uniform sequence puzzle (parade compliment order).', 'Decode a NATO phonetic alphabet message in the Radio room.', 'Answer a navigation bearing question in the Cartography cell.', 'Arrange the DRABC primary survey steps in the First Aid bay.', 'Match knots to their purposes in the Survival bunker.', 'Combine all five clue fragments to crack the master vault and escape.'],
    challenge: 'Escape challenge: solve all five training puzzles and enter the master vault code within 20 minutes to earn the Escape Room capstone badge.',
    x: 50, y: 50
  }
];

const mapWrapMain = document.getElementById('mapWrapMain');
const mapWrapSpec = document.getElementById('mapWrapSpec');
const mapTabs = document.getElementById('mapTabs');
const heroBadges = document.getElementById('heroBadges');
const heroTotal = document.getElementById('heroTotal');
const heroPct = document.getElementById('heroPct');
const ringFg = document.getElementById('ringFg');
const ringPct = document.getElementById('ringPct');
const mainTabCount = document.getElementById('mainTabCount');
const specTabCount = document.getElementById('specTabCount');
let activeMap = 'main';
const lessonHero = document.getElementById('lessonHero');
const lessonBadge = document.getElementById('lessonBadge');
const lessonTitle = document.getElementById('lessonTitle');
const lessonSubtitle = document.getElementById('lessonSubtitle');
const lessonBrief = document.getElementById('lessonBrief');
const objectiveList = document.getElementById('objectiveList');
const challengeBox = document.getElementById('challengeBox');
const tagRow = document.getElementById('tagRow');
const completeLesson = document.getElementById('completeLesson');
const playScenario = document.getElementById('playScenario');
const progressBar = document.getElementById('progressBar');
const completeCount = document.getElementById('completeCount');
const totalCount = document.getElementById('totalCount');
const badgeGrid = document.getElementById('badgeGrid');
const resetProgress = document.getElementById('resetProgress');
const toast = document.getElementById('toast');
const scenarioPanel = document.getElementById('scenarioPanel');
const branchGate = document.getElementById('branchGate');
const branchLocked = document.getElementById('branchLocked');
const branchLockedText = document.getElementById('branchLockedText');
const branchButtons = document.getElementById('branchButtons');
const armyBranchBtn = document.getElementById('armyBranchBtn');
const airBranchBtn = document.getElementById('airBranchBtn');
const seaBranchBtn = document.getElementById('seaBranchBtn');
const armyUnlockModal = document.getElementById('armyUnlockModal');
const airUnlockModal = document.getElementById('airUnlockModal');
const seaUnlockModal = document.getElementById('seaUnlockModal');
const armyEnter = document.getElementById('armyEnter');
const airEnter = document.getElementById('airEnter');
const seaEnter = document.getElementById('seaEnter');
const armyLater = document.getElementById('armyLater');
const airLater = document.getElementById('airLater');
const seaLater = document.getElementById('seaLater');
const BRANCH_UNLOCK_KEY = 'cadetMapDemoBranchUnlocked';
const BRANCH_UNLOCK_THRESHOLD = 11;
const BRANCH_BADGES = { army: 13, air: 12, sea: 14 };

// ─────────────────────────────────────────────────────────────
//  SECRET ACHIEVEMENTS SYSTEM
//  Hidden unlockables that trigger when certain conditions are met.
//  Stored in localStorage: cadetMapDemoAchievements (array of keys)
// ─────────────────────────────────────────────────────────────
const ACHIEVEMENTS_KEY = 'cadetMapDemoAchievements';
const GHOST_KEY = 'cadetMapDemoGhostProgress'; // tracks consecutive completions without reset
let unlockedAchievements = new Set(JSON.parse(localStorage.getItem(ACHIEVEMENTS_KEY) || '[]'));

const ACHIEVEMENTS = [
  {
    key: 'triple_threat',
    icon: '⚔️',
    name: 'Triple Threat',
    desc: 'Earned all three branch badges: Army, Air, and Sea in the first-year program.',
    hint: 'Master every element — land, air, and sea.',
    check: function() {
      return completed.has(BRANCH_BADGES.army) && completed.has(BRANCH_BADGES.air) && completed.has(BRANCH_BADGES.sea);
    }
  },
  {
    key: 'full_honours',
    icon: '🏆',
    name: 'Full Honours',
    desc: 'Earned every single first-year badge. 100% completion of the first-year program.',
    hint: 'Collect them all — leave no badge behind.',
    check: function() {
      return completed.size >= lessons.length;
    }
  },
  {
    key: 'cyber_sentinel',
    icon: '🔐',
    name: 'Cyber Sentinel',
    desc: 'Completed the entire Cyber Security Range and earned the Cyber Security badge.',
    hint: 'Defend the digital frontier — close every ticket.',
    check: function() {
      return completed.has(17);
    }
  },
  {
    key: 'ghost_cadet',
    icon: '🕶️',
    name: 'Ghost Cadet',
    desc: 'Earned 5 badges in a row without ever hitting Reset Progress. True persistence.',
    hint: 'Never give up, never reset — push through.',
    check: function() {
      return Number(localStorage.getItem(GHOST_KEY) || '0') >= 5;
    }
  },
  {
    key: 'vanguard',
    icon: '🎓',
    name: 'Vanguard',
    desc: 'Completed an entire second-year branch — all 12 lessons in Red Star (Army), Proficiency Level 2 (Air), or Phase 2 (Sea).',
    hint: 'Push beyond the first year and finish a full branch.',
    check: function() {
      const armyDone = localStorage.getItem('cadetMapDemoYear2PhaseComplete') === 'true';
      const airDone = localStorage.getItem('cadetMapDemoAirYear2PhaseComplete') === 'true';
      const seaDone = localStorage.getItem('cadetMapDemoSeaYear2PhaseComplete') === 'true';
      return armyDone || airDone || seaDone;
    }
  },
  {
    key: 'supreme_commander',
    icon: '⭐',
    name: 'Supreme Commander',
    desc: 'The ultimate secret: completed ALL three second-year branch maps — Red Star (Army), Proficiency Level 2 (Air), and Phase 2 (Sea).',
    hint: 'Conquer every branch, every element, every map.',
    check: function() {
      const armyDone = localStorage.getItem('cadetMapDemoYear2PhaseComplete') === 'true';
      const airDone = localStorage.getItem('cadetMapDemoAirYear2PhaseComplete') === 'true';
      const seaDone = localStorage.getItem('cadetMapDemoSeaYear2PhaseComplete') === 'true';
      return armyDone && airDone && seaDone;
    }
  }
];

function checkAchievements() {
  ACHIEVEMENTS.forEach(function(ach) {
    if (!unlockedAchievements.has(ach.key) && ach.check()) {
      unlockedAchievements.add(ach.key);
      localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify([...unlockedAchievements]));
      showAchievementToast(ach);
      renderAchievementsVault();
    }
  });
  renderAchievementsVault();
}

function showAchievementToast(ach) {
  const vaultToast = document.getElementById('achievementToast');
  if (!vaultToast) return;
  vaultToast.querySelector('.ach-toast-icon').textContent = ach.icon;
  vaultToast.querySelector('.ach-toast-title').textContent = 'Secret Unlocked!';
  vaultToast.querySelector('.ach-toast-name').textContent = ach.name;
  vaultToast.querySelector('.ach-toast-desc').textContent = ach.desc;
  vaultToast.classList.remove('show');
  void vaultToast.offsetWidth;
  vaultToast.classList.add('show');
  setTimeout(function() { vaultToast.classList.remove('show'); }, 5000);
}

function renderAchievementsVault() {
  const vault = document.getElementById('achievementsVault');
  if (!vault) return;
  vault.innerHTML = ACHIEVEMENTS.map(function(ach) {
    const unlocked = unlockedAchievements.has(ach.key);
    if (unlocked) {
      return '<div class="ach-card unlocked">' +
        '<div class="ach-icon">' + ach.icon + '</div>' +
        '<div class="ach-info"><div class="ach-name">' + ach.name + '</div>' +
        '<div class="ach-desc">' + ach.desc + '</div></div>' +
        '<div class="ach-badge">UNLOCKED</div></div>';
    }
    return '<div class="ach-card locked">' +
      '<div class="ach-icon">🔒</div>' +
      '<div class="ach-info"><div class="ach-name">???</div>' +
      '<div class="ach-desc">' + ach.hint + '</div></div>' +
      '<div class="ach-badge">LOCKED</div></div>';
  }).join('');
  const counter = document.getElementById('achCounter');
  if (counter) {
    counter.textContent = unlockedAchievements.size + ' / ' + ACHIEVEMENTS.length;
  }
}
const scenarioPages = {
  1: 'cadet_basics_training.html',
  2: 'drill_training.html',
  3: 'dress_uniform_training.html',
  4: 'citizenship_training.html',
  5: 'parade_drill_training.html',
  6: 'navigation_training.html',
  7: 'radio_training.html',
  8: 'first_aid_training.html',
  9: 'physical_fitness_training.html',
  10: 'survival_training.html',
  11: 'marksmanship_training.html',
  12: 'air_training.html',
  13: 'field_training.html',
  14: 'sea_training.html',
  15: 'music_training.html',
  16: 'https://sites.super.myninja.ai/b43e8a29-7aa8-453d-b3c1-12ff8b4d2a0f/3236e507/index.html',
  17: 'escape_room.html'
};

let selectedId = 1;
let completed = new Set(JSON.parse(localStorage.getItem('cadetMapDemoCompleted') || '[]'));
totalCount.textContent = lessons.length;

const scenarioData = {
  1: {
    title: 'HQ Orientation: Choose Your First Move',
    intro: 'You have just arrived at Cadet HQ. A new cadet is unsure where to start. Your mission is to choose the action that best shows readiness, respect, and awareness of the training map.',
    steps: ['Read the mission board at Cadet HQ.', 'Check who your section leader is.', 'Choose a first training station and explain your reason.'],
    question: 'What is the best first action for a new cadet starting the quest map?',
    choices: [
      { text: 'Run straight to the hardest activity without checking instructions.', correct: false, feedback: 'Not quite. A good cadet starts by understanding expectations and safety before rushing into an activity.' },
      { text: 'Check in, review the map, learn the rules, and ask where your section should begin.', correct: true, feedback: 'Correct. This shows readiness, respect, and awareness of how the badge journey works.' },
      { text: 'Wait silently and let everyone else decide for you.', correct: false, feedback: 'Try again. Cadets should ask respectful questions and take an active role in learning.' }
    ],
    reward: '+10 Orientation XP • Cadet Basics scenario complete'
  },
  2: {
    title: 'Parade Square Command Sequence',
    intro: 'Your squad is on the parade square. The instructor gives a sequence of commands and you need to choose the response that keeps the team sharp and synchronized.',
    steps: ['Listen for the command.', 'Move only on the executive word.', 'Maintain spacing, posture, and timing.'],
    question: 'The command is “Squad, right turn.” What should the cadet focus on?',
    choices: [
      { text: 'Turn at the same time as the squad, keeping posture and balance.', correct: true, feedback: 'Correct. Drill is about timing, discipline, and moving as one team.' },
      { text: 'Turn early so you can finish before the others.', correct: false, feedback: 'Not quite. Moving early breaks timing and makes the squad look uneven.' },
      { text: 'Look around and copy someone after they move.', correct: false, feedback: 'Try again. Cadets should listen to the command and respond confidently with the squad.' }
    ],
    reward: '+10 Drill XP • Parade timing improved'
  },
  3: {
    title: 'Uniform Inspection Checkpoint',
    intro: 'You are preparing for a uniform inspection. Your task is to identify the best preparation routine before reporting to the inspection line.',
    steps: ['Inspect uniform neatness from head to toe.', 'Check placement and condition of required items.', 'Ask for peer feedback before inspection.'],
    question: 'Which preparation choice best supports uniform standards?',
    choices: [
      { text: 'Only check the front of the uniform because that is what people see first.', correct: false, feedback: 'Not quite. Inspection standards require full preparation, not just the most visible parts.' },
      { text: 'Check fit, cleanliness, details, and ask a teammate to spot anything missed.', correct: true, feedback: 'Correct. A careful self-check plus peer support improves standards and teamwork.' },
      { text: 'Ignore small details because the lesson is only about earning the badge.', correct: false, feedback: 'Try again. The badge represents learning the standard, not skipping it.' }
    ],
    reward: '+10 Standards XP • Uniform readiness confirmed'
  },
  4: {
    title: 'Teamwork Choice: Support the Section',
    intro: 'During a community task, one cadet is falling behind and the group is getting frustrated. Choose the response that best reflects citizenship and teamwork.',
    steps: ['Notice the team problem.', 'Choose a respectful response.', 'Keep the mission moving while supporting others.'],
    question: 'What should you do when a teammate is struggling with their assigned task?',
    choices: [
      { text: 'Make fun of them so they work faster.', correct: false, feedback: 'Incorrect. That damages trust and does not reflect cadet values.' },
      { text: 'Quietly take over everything without explaining anything.', correct: false, feedback: 'Not ideal. Helping is good, but teamwork also means teaching and including others.' },
      { text: 'Offer help, break the task into smaller steps, and encourage the teammate respectfully.', correct: true, feedback: 'Correct. This supports the person, the team, and the community mission.' }
    ],
    reward: '+10 Citizenship XP • Team morale boosted'
  },
  5: {
    title: 'Parade Drill: Arms and Colour Party Drill',
    intro: 'You are on the parade ground preparing for a ceremonial parade. The drill rifles and flags are ready. Following the 201 (A-DH-201-000/PT-000), you must call the correct sequence of commands and match each drill movement. Choose the correct sequence of actions.',
    steps: ['Fall in at attention with the drill rifle at the shoulder arms position.', 'On the command, execute present arms as a ceremonial salute.', 'Coordinate with the colour party — let fly the colour on the first movement of present arms.', 'Catch the colour and return to shoulder arms to complete the compliment.'],
    question: 'The parade commander orders a general salute. What is the correct sequence of movements with the drill rifle and colour?',
    choices: [
      { text: 'Shoulder arms, then let fly the colour, then present arms.', correct: false, feedback: 'Incorrect. The present arms is the salute itself — it comes first. The colour is let fly on the first movement of the present arms, not before.' },
      { text: 'Present arms, let fly the colour on the first movement, catch the colour, then shoulder arms.', correct: true, feedback: 'Correct. Per the 201, on GENERAL SALUTE – PRESENT ARMS the colour is let fly on the first movement of the present arms. The colour is caught on the command to shoulder arms, completing the compliment.' },
      { text: 'Port arms, dip the colour, then recover arms.', correct: false, feedback: 'Try again. Port arms is a tactical carry position, not a salute. The dip is used for a Royal Salute to entitled dignitaries, not a general salute.' }
    ],
    reward: '+10 Parade Drill XP • Compliment executed to 201 standard'
  }
};


/* ── i18n: translate data arrays in-place ── */
if (typeof trMutate === "function") {
  try { trMutate(lessons); } catch(e) {}
  try { trMutate(ACHIEVEMENTS); } catch(e) {}
  try { trMutate(BRANCH_BADGES); } catch(e) {}
  try { trMutate(BRANCH_META); } catch(e) {}
  try { trMutate(scenarioPages); } catch(e) {}
  try { trMutate(scenarioData); } catch(e) {}
}

function saveProgress() {
  localStorage.setItem('cadetMapDemoCompleted', JSON.stringify([...completed]));
}

function createPins() {
  lessons.forEach(lesson => {
    const btn = document.createElement('button');
    btn.className = 'pin';
    btn.type = 'button';
    btn.style.left = `${lesson.x}%`;
    btn.style.top = `${lesson.y}%`;
    btn.dataset.id = lesson.id;
    btn.dataset.short = lesson.short;
    btn.dataset.map = lesson.map || 'main';
    btn.setAttribute('aria-label', `Open ${lesson.title} lesson`);
    btn.innerHTML = `<img src="assets/badges/${lesson.badge}" alt="${lesson.title}" />`;
    btn.addEventListener('click', () => selectLesson(lesson.id));
    const target = (lesson.map === 'specialist') ? mapWrapSpec : mapWrapMain;
    target.appendChild(btn);
  });
}

function switchMap(mapName) {
  activeMap = mapName;
  document.querySelectorAll('.map-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.map === mapName);
  });
  mapWrapMain.classList.toggle('active', mapName === 'main');
  mapWrapSpec.classList.toggle('active', mapName === 'specialist');
  // Show/hide zone callouts only on main map
  const zc = document.getElementById('zoneCallouts');
  if (zc) zc.style.display = (mapName === 'main') ? 'flex' : 'none';
}

function initMapTabs() {
  if (!mapTabs) return;
  mapTabs.querySelectorAll('.map-tab').forEach(tab => {
    tab.addEventListener('click', () => switchMap(tab.dataset.map));
  });
  // Set badge counts
  const mainCount = lessons.filter(l => (l.map || 'main') === 'main').length;
  const specCount = lessons.filter(l => l.map === 'specialist').length;
  if (mainTabCount) mainTabCount.textContent = mainCount;
  if (specTabCount) specTabCount.textContent = specCount;
}

function createBadgeGrid() {
  lessons.forEach(lesson => {
    const cell = document.createElement('button');
    cell.className = 'badge-cell';
    cell.type = 'button';
    cell.dataset.id = lesson.id;
    cell.setAttribute('aria-label', `${lesson.title} badge`);
    cell.innerHTML = `<img src="assets/badges/${lesson.badge}" alt="${lesson.title} badge" />`;
    cell.addEventListener('click', () => selectLesson(lesson.id));
    badgeGrid.appendChild(cell);
  });
}

function selectLesson(id) {
  selectedId = id;
  const lesson = lessons.find(item => item.id === id);
  lessonHero.style.background = `linear-gradient(145deg, ${lesson.theme[0]}, ${lesson.theme[1]})`;
  lessonBadge.src = `assets/badges/${lesson.badge}`;
  lessonBadge.alt = `${lesson.title} badge`;
  lessonTitle.textContent = lesson.title;
  lessonSubtitle.textContent = lesson.subtitle;
  lessonBrief.textContent = lesson.brief;
  tagRow.innerHTML = lesson.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
  objectiveList.innerHTML = lesson.objectives.map(obj => `<li>${obj}</li>`).join('');
  challengeBox.innerHTML = `<strong>Quest Challenge:</strong> ${lesson.challenge}`;
  completeLesson.textContent = tr(completed.has(id) ? 'Badge Earned ✓ Review Lesson' : 'Complete Lesson + Earn Badge');
  scenarioPanel.classList.remove('active');
  scenarioPanel.innerHTML = '';
  playScenario.textContent = tr(scenarioPages[id] ? 'Play Interactive Scenario' : (scenarioData[id] ? 'Play Interactive Scenario' : 'Play Mini Scenario'));
  document.querySelectorAll('.pin').forEach(pin => pin.classList.toggle('active', Number(pin.dataset.id) === id));
  document.querySelectorAll('.badge-cell').forEach(cell => cell.classList.toggle('active', Number(cell.dataset.id) === id));
}

function updateProgress() {
  const count = completed.size;
  const pct = Math.round((count / lessons.length) * 100);
  completeCount.textContent = count;
  progressBar.style.width = `${(count / lessons.length) * 100}%`;
  // Hero stats
  if (heroBadges) heroBadges.textContent = count;
  if (heroTotal) heroTotal.textContent = lessons.length;
  if (heroPct) heroPct.textContent = pct + '%';
  // Inline inventory summary counts
  const invEarnedInline = document.getElementById('invEarnedInline');
  const invTotalInline = document.getElementById('invTotalInline');
  if (invEarnedInline) invEarnedInline.textContent = count;
  if (invTotalInline) invTotalInline.textContent = lessons.length;
  // Progress ring (circumference of r=52 is ~326.7)
  if (ringPct) ringPct.textContent = pct + '%';
  if (ringFg) {
    const circ = 326.7;
    ringFg.style.strokeDashoffset = circ - (circ * (count / lessons.length));
  }
  document.querySelectorAll('.pin').forEach(pin => {
    pin.classList.toggle('done', completed.has(Number(pin.dataset.id)));
  });
  document.querySelectorAll('.badge-cell').forEach(cell => {
    cell.classList.toggle('done', completed.has(Number(cell.dataset.id)));
  });
  checkBranchUnlocks(count);
}

function checkBranchUnlocks(count) {
  // Determine which branch badges are earned
  const armyDone = completed.has(BRANCH_BADGES.army);
  const airDone = completed.has(BRANCH_BADGES.air);
  const seaDone = completed.has(BRANCH_BADGES.sea);
  const anyBranch = armyDone || airDone || seaDone;
  const meetsCount = count >= BRANCH_UNLOCK_THRESHOLD;

  if (meetsCount && anyBranch) {
    // Show the branch buttons container
    branchLocked.style.display = 'none';
    branchButtons.style.display = 'block';
    // Show each unlocked branch button
    armyBranchBtn.style.display = armyDone ? 'flex' : 'none';
    airBranchBtn.style.display = airDone ? 'flex' : 'none';
    seaBranchBtn.style.display = seaDone ? 'flex' : 'none';
    // Show each newly-unlocked branch modal once
    if (!localStorage.getItem(BRANCH_UNLOCK_KEY + '_army') && armyDone) {
      localStorage.setItem(BRANCH_UNLOCK_KEY + '_army', 'true');
      armyUnlockModal.classList.add('show'); armyUnlockModal.setAttribute('aria-hidden','false');
    }
    if (!localStorage.getItem(BRANCH_UNLOCK_KEY + '_air') && airDone) {
      localStorage.setItem(BRANCH_UNLOCK_KEY + '_air', 'true');
      airUnlockModal.classList.add('show'); airUnlockModal.setAttribute('aria-hidden','false');
    }
    if (!localStorage.getItem(BRANCH_UNLOCK_KEY + '_sea') && seaDone) {
      localStorage.setItem(BRANCH_UNLOCK_KEY + '_sea', 'true');
      seaUnlockModal.classList.add('show'); seaUnlockModal.setAttribute('aria-hidden','false');
    }
  } else {
    // Locked — show appropriate message
    branchLocked.style.display = 'flex';
    branchButtons.style.display = 'none';
    const badgesLeft = BRANCH_UNLOCK_THRESHOLD - count;
    if (!meetsCount && !anyBranch) {
      branchLockedText.innerHTML = 'Complete <strong>' + badgesLeft + '</strong> more badge(s) and earn at least one branch badge (Army ★, Air ✈, or Sea ⚓) to unlock second-year training.';
    } else if (!meetsCount && anyBranch) {
      branchLockedText.innerHTML = 'Great — you have a branch badge! Complete <strong>' + badgesLeft + '</strong> more badge(s) to reach 11 total and unlock second-year training.';
    } else if (meetsCount && !anyBranch) {
      branchLockedText.innerHTML = 'Almost there — you have 11 badges! Now earn a branch badge (Army ★ lesson 13, Air ✈ lesson 12, or Sea ⚓ lesson 14) to unlock second-year training.';
    }
  }
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.remove('show');
  void toast.offsetWidth;
  toast.classList.add('show');
}

function earnSelectedBadge() {
  const lesson = lessons.find(item => item.id === selectedId);
  const wasComplete = completed.has(selectedId);
  completed.add(selectedId);
  saveProgress();
  updateProgress();
  selectLesson(selectedId);
  if (!wasComplete) {
    const ghost = Number(localStorage.getItem(GHOST_KEY) || '0') + 1;
    localStorage.setItem(GHOST_KEY, String(ghost));
  }
  showToast(wasComplete ? `Reviewing ${lesson.title}` : `Badge earned: ${lesson.title}!`);
  checkAchievements();
}

function renderInteractiveScenario(id) {
  const data = scenarioData[id];
  if (!data) return false;
  scenarioPanel.classList.add('active');
  scenarioPanel.innerHTML = `
    <div class="scenario-head">
      <h3>${data.title}</h3>
      <p>${data.intro}</p>
    </div>
    <div class="scenario-body">
      ${data.steps.map((step, index) => `
        <div class="scenario-step"><span class="step-num">${index + 1}</span><span>${step}</span></div>
      `).join('')}
      <div class="challenge-box"><strong>Decision Point:</strong> ${data.question}</div>
      <div class="choice-grid">
        ${data.choices.map((choice, index) => `
          <button class="choice-btn" type="button" data-choice="${index}">${choice.text}</button>
        `).join('')}
      </div>
      <div class="scenario-feedback">Choose the best response to test the scenario.</div>
      <div class="scenario-reward"><span class="xp-pill">${data.reward}</span><span>Correct response can earn the badge.</span></div>
    </div>
  `;
  scenarioPanel.querySelectorAll('.choice-btn').forEach(btn => {
    btn.addEventListener('click', () => handleScenarioChoice(id, Number(btn.dataset.choice)));
  });
  scenarioPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  showToast(`${data.title} loaded.`);
  return true;
}

function handleScenarioChoice(id, choiceIndex) {
  const data = scenarioData[id];
  const choice = data.choices[choiceIndex];
  const buttons = scenarioPanel.querySelectorAll('.choice-btn');
  const feedback = scenarioPanel.querySelector('.scenario-feedback');
  buttons.forEach((btn, index) => {
    btn.classList.remove('correct', 'wrong');
    if (index === choiceIndex) btn.classList.add(choice.correct ? 'correct' : 'wrong');
  });
  feedback.className = `scenario-feedback ${choice.correct ? 'good' : 'bad'}`;
  feedback.textContent = choice.feedback;
  if (choice.correct) {
    completed.add(id);
    saveProgress();
    updateProgress();
    selectLesson(id);
    renderInteractiveScenario(id);
    const refreshedFeedback = scenarioPanel.querySelector('.scenario-feedback');
    refreshedFeedback.className = 'scenario-feedback good';
    refreshedFeedback.textContent = `${choice.feedback} Badge progress updated automatically.`;
    const refreshedButtons = scenarioPanel.querySelectorAll('.choice-btn');
    refreshedButtons[choiceIndex].classList.add('correct');
    showToast(`Scenario complete: ${lessons.find(item => item.id === id).title} badge earned!`);
    const ghost = Number(localStorage.getItem(GHOST_KEY) || '0') + 1;
    localStorage.setItem(GHOST_KEY, String(ghost));
    checkAchievements();
  } else {
    showToast('Try again — review the scenario clue.');
  }
}

function playSelectedScenario() {
  if (scenarioPages[selectedId]) {
    window.location.href = scenarioPages[selectedId];
    return;
  }
  if (renderInteractiveScenario(selectedId)) return;
  const lesson = lessons.find(item => item.id === selectedId);
  const messages = {
    7: 'Radio scenario: Build your call as “Station called, this is station calling, message follows.”',
    12: 'Air scenario: Weather clear, runway checked, glider area ready. Launch the ATC Tower simulator to direct aircraft.',
    13: 'Army scenario: Observation point selected; team route planned through cover and checkpoints.',
    14: 'Sea scenario: PFD check complete; knot and paddle station unlocked.',
    15: 'Music training: launch the Harmony Command simulator and complete instrument-section missions to earn the music badge.',
    16: 'Cyber range: investigate simulated incidents and choose safe defensive response actions.'
  };
  showToast(messages[selectedId] || `${lesson.title} scenario started: complete the challenge prompt to earn the badge.`);
}

completeLesson.addEventListener('click', earnSelectedBadge);
playScenario.addEventListener('click', playSelectedScenario);
resetProgress.addEventListener('click', () => {
  completed = new Set();
  saveProgress();
  localStorage.removeItem(BRANCH_UNLOCK_KEY + '_army');
  localStorage.removeItem(BRANCH_UNLOCK_KEY + '_air');
  localStorage.removeItem(BRANCH_UNLOCK_KEY + '_sea');
  localStorage.removeItem(GHOST_KEY);
  updateProgress();
  selectLesson(selectedId);
  showToast('Progress reset. Start a new cadet quest run.');
  checkAchievements();
});

// Branch unlock button handlers
armyBranchBtn.addEventListener('click', () => { armyUnlockModal.classList.add('show'); armyUnlockModal.setAttribute('aria-hidden','false'); });
airBranchBtn.addEventListener('click', () => { airUnlockModal.classList.add('show'); airUnlockModal.setAttribute('aria-hidden','false'); });
seaBranchBtn.addEventListener('click', () => { seaUnlockModal.classList.add('show'); seaUnlockModal.setAttribute('aria-hidden','false'); });

// Branch modal enter handlers
armyEnter.addEventListener('click', () => { window.location.href = 'year2_map.html'; });
airEnter.addEventListener('click', () => { window.location.href = 'air_year2_map.html'; });
seaEnter.addEventListener('click', () => { window.location.href = 'sea_year2_map.html'; });

// Branch modal "stay" handlers
armyLater.addEventListener('click', () => { armyUnlockModal.classList.remove('show'); armyUnlockModal.setAttribute('aria-hidden','true'); });
airLater.addEventListener('click', () => { airUnlockModal.classList.remove('show'); airUnlockModal.setAttribute('aria-hidden','true'); });
seaLater.addEventListener('click', () => { seaUnlockModal.classList.remove('show'); seaUnlockModal.setAttribute('aria-hidden','true'); });

createPins();
initMapTabs();
createBadgeGrid();
updateProgress();
selectLesson(1);
renderAchievementsVault();
checkAchievements();

/* ============================================================
   HERO AVATAR DISPLAY — shows the cadet's saved avatar
   (name + branch icon) in the quest map header profile button.
   ============================================================ */
const BRANCH_META = {
  army: { icon: '★', label: 'Army Cadet', emoji: '🪖' },
  air:  { icon: '✈', label: 'Air Cadet', emoji: '✈️' },
  sea:  { icon: '⚓', label: 'Sea Cadet', emoji: '⚓' },
};

function updateHeroAvatar() {
  let avatar = null;
  try {
    const raw = localStorage.getItem('cadetAvatar');
    if (raw) avatar = JSON.parse(raw);
  } catch (e) { /* ignore */ }
  const nameEl = document.getElementById('heroAvatarName');
  const svgEl = document.getElementById('heroAvatarSvg');
  const emojiEl = document.getElementById('heroAvatarEmoji');
  if (!nameEl) return;

  if (avatar && avatar.branch && typeof CadetAvatarRender !== 'undefined') {
    // Render the actual customized avatar SVG into the hero button
    const nm = (avatar.name || '').trim();
    nameEl.textContent = nm ? nm + ' — ' + tr('Edit Avatar →') : tr('Customize Avatar →');
    if (svgEl) {
      // Show the SVG container, hide the emoji fallback
      svgEl.style.display = '';
      if (emojiEl) emojiEl.style.display = 'none';
      CadetAvatarRender.renderMini(svgEl, avatar);
    }
  } else {
    // No saved avatar or render module unavailable — show emoji fallback
    const meta = (avatar && avatar.branch) ? (BRANCH_META[avatar.branch] || BRANCH_META.army) : BRANCH_META.army;
    if (svgEl) svgEl.style.display = 'none';
    if (emojiEl) {
      emojiEl.style.display = '';
      emojiEl.textContent = meta.emoji;
    }
    nameEl.textContent = tr('Customize Avatar →');
  }
}
updateHeroAvatar();

