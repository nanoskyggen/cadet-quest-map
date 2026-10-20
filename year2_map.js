(function () {
  "use strict";

  // ──────────────────────────────────────────────────────────
  //  Red Star — Army Cadet lessons
  //  12 Red Star modules building on first-year (Green Star) foundations
  // ──────────────────────────────────────────────────────────
  const lessons = [
    {
      id: 101,
      short: 'Leadership',
      title: 'Leadership Fundamentals',
      subtitle: 'Leading peers within the Red Star cadet corps.',
      badge: 'badge_05_leadership.png',
      theme: ['#2d6a3e', '#f5c84c'],
      tags: ['Core', 'Leadership', 'Red Star'],
      brief: 'As a Red Star cadet you are now expected to lead within a peer setting. This module explores what leadership means at the cadet level — following the chain of command, setting the example for junior cadets, being firm, fair, and friendly with your peers, showing respect to both superiors and subordinates, staying aware of safety hazards, displaying initiative, and setting personal goals. Learners practise identifying their leadership responsibilities and creating a goal map for the training year.',
      objectives: [
        'Describe the responsibilities of a Red Star cadet within a peer setting.',
        'Explain how following the chain of command supports effective leadership.',
        'Identify ways to set the example for junior cadets.',
        'Create a personal goal map for the training year.'
      ],
      challenge: 'Leadership challenge: review your responsibilities as a Red Star cadet, then answer a question on how you would set the example in a peer setting and map a personal goal for the year.',
      trainingLink: { href: 'leadership_training.html', label: '🧭 Launch Leadership Fundamentals' },
      x: 50, y: 22
    },
    {
      id: 102,
      short: 'Expedition',
      title: 'Outdoor Expedition Planning',
      subtitle: 'Route planning, kit lists, camp craft, and Leave No Trace principles.',
      badge: 'badge_10_outdoor_expedition.png',
      theme: ['#6b5b34', '#c9a84c'],
      tags: ['Field Skill', 'Expedition', 'Red Star'],
      brief: 'Building on Green Star fieldcraft and navigation, this module teaches cadets to perform the duties of a section member during a field exercise and overnight trek. Based on PO 221 (Field Training), PO 222 (Navigation), PO 223 (Trekking), and PO 224 (Wilderness Survival) of the Red Star qualification standard, cadets learn bivouac site selection and safety, section equipment and stove types, knots and hoochie shelter construction, field amenities and lashings, map-and-compass navigation, trekking preparation and kit lists, water purification, fire safety, leave-no-trace ethics, and wildlife hazard awareness.',
      objectives: [
        'Select and maintain a safe bivouac site following environmental and animal-hazard considerations.',
        'Identify section equipment including the three types of fuel-burning stoves.',
        'Tie essential knots and construct a hoochie shelter and field amenities using lashings.',
        'Navigate a route using a map and compass with grid references and bearings.',
        'Prepare for trekking with the correct kit list, six essential items, and physical readiness.',
        'Apply leave-no-trace principles and respond to wilderness hazards throughout the expedition.'
      ],
      challenge: 'Expedition challenge: assess a bivouac site for hazards, pack the correct trekking kit, construct a hoochie shelter, and respond to a weather-change scenario with an escape route.',
      trainingLink: { href: 'expedition_training.html', label: '🏔️ Launch Expedition Training' },
      x: 73, y: 35
    },
    {
      id: 103,
      short: 'Advanced Nav',
      title: 'Advanced Navigation',
      subtitle: 'Bearings, compass parts, distance by pacing, and orienting a map with a compass.',
      badge: 'badge_06_navigation.png',
      theme: ['#456534', '#8ee86e'],
      tags: ['Field Skill', 'Navigation', 'Advanced'],
      trainingLink: { href: 'navigation_training.html', label: '🧭 Launch Navigation Training' },
      brief: 'Cadets build on Green Star map reading with practical compass work. This module covers the 16 compass points and the degree and mil systems, identifying all parts of the Silva-style compass, setting magnetic declination, taking and following magnetic bearings point to point, determining distance by pacing along a route, orienting a map with a compass, and putting it all together in a practical navigation exercise with safety procedures and debriefing.',
      objectives: [
        'Describe bearings using the 16 compass points, degrees (360°), and mils (6400).',
        'Identify all parts of the compass and set magnetic declination ("Red in the Bed").',
        'Determine distance along a route using the map scale and pace counting.',
        'Orient a map using a compass and follow a magnetic bearing point to point.',
        'Complete a practical navigation exercise using a map and compass with proper safety procedures.'
      ],
      challenge: 'Navigation challenge: set your declination, take a magnetic bearing to a prominent object, count your paces to measure distance, and orient your map to confirm your position at the checkpoint.',
      x: 78, y: 18
    },
    {
      id: 104,
      short: 'Fieldcraft',
      title: 'Advanced Fieldcraft & Camouflage',
      subtitle: 'Concealment, stalking, observation posts, and field signals.',
      badge: 'badge_14_army_program.png',
      theme: ['#456534', '#6b7a3a'],
      tags: ['Army', 'Fieldcraft', 'Advanced'],
      brief: 'Cadets deepen their fieldcraft knowledge with camouflage and concealment, the art of stalking, setting up and operating an observation post (OP), and advanced field signals for section-level communication. The module reinforces the Green Star principle of "why things are seen" and adds practical concealment techniques including use of natural cover, shadow, and silhouette management.',
      objectives: [
        'Apply personal camouflage using natural materials.',
        'Move using the leopard crawl and stalk into an observation position.',
        'Set up and operate a two-person observation post.',
        'Communicate section movements using silent field signals.'
      ],
      challenge: 'Fieldcraft challenge: stalk to within 20 metres of an observation post without being detected, using cover, shadow, and slow movement.',
      trainingLink: { href: 'fieldcraft_training.html', label: '🌿 Launch Fieldcraft Training' },
      x: 88, y: 50
    },
    {
      id: 105,
      short: 'Obstacle',
      title: 'Obstacle & Confidence Course',
      subtitle: 'Assault course techniques, rope work, and overcoming fear.',
      badge: 'badge_09_physical_fitness.png',
      theme: ['#f08a24', '#f5c84c'],
      tags: ['Fitness', 'Confidence', 'Red Star'],
      brief: 'Cadets tackle the confidence and obstacle course, learning safe techniques for climbing walls, crawling under nets, crossing rope bridges, and scaling cargo nets. The module emphasises teamwork, spotting, and overcoming personal fear in a controlled environment. Physical fitness from Green Star is applied to practical obstacle challenges that require both strength and technique.',
      objectives: [
        'Demonstrate safe technique for scaling a 6-foot wall with a spotter.',
        'Cross a rope bridge using the correct hand and foot placement.',
        'Explain the role of a spotter and when to use one.',
        'Complete a four-obstacle circuit supporting a struggling teammate.'
      ],
      challenge: 'Obstacle challenge: a teammate freezes on the cargo net. Choose the correct response to help them safely complete the obstacle.',
      x: 62, y: 72
    },
    {
      id: 106,
      short: 'Advanced Aid',
      title: 'Advanced First Aid',
      subtitle: 'Secondary survey, splints, slings, and casualty handling.',
      badge: 'badge_08_first_aid.png',
      theme: ['#3a6b4a', '#dcefe0'],
      tags: ['Safety', 'First Aid', 'Advanced'],
      brief: 'Building on the Green Star DRABC primary survey, this module introduces the secondary survey — a head-to-toe check for non-life-threatening injuries. Cadets learn to apply improvised splints for fractures, arm slings, and how to handle and move a casualty when necessary. Scenarios include treating a suspected fractured arm, a sprained ankle in the field, and managing a conscious casualty awaiting evacuation.',
      objectives: [
        'Conduct a secondary survey using the head-to-toe method.',
        'Apply an improvised sling to a suspected forearm fracture.',
        'Immobilise a suspected ankle fracture using available materials.',
        'Explain when and how to move a casualty vs when to wait for help.'
      ],
      challenge: 'First aid challenge: a cadet falls and complains of severe wrist pain. Conduct the correct assessment and apply the right treatment.',
      x: 20, y: 55
    },
    {
      id: 107,
      short: 'Signals',
      title: 'Advanced Signals & Comms',
      subtitle: 'Radio nets, message formatting, and signal security.',
      badge: 'badge_07_radio_communications.png',
      theme: ['#2f6fbe', '#9ed8ff'],
      tags: ['Communication', 'CIS', 'Advanced'],
      brief: 'Cadets advance from basic voice procedure to operating within a radio net. This module covers net discipline, using authentication tables, formatting situation reports over the radio, relay procedures, and basic signal security (SIGSEC) including avoiding frequency compromise. The interactive scenario has cadets managing a net with three stations during a field exercise.',
      objectives: [
        'Establish and maintain a three-station radio net.',
        'Format and transmit a standard SITREP over the radio.',
        'Use an authentication table to verify a suspicious message.',
        'Explain basic signal security and frequency discipline.'
      ],
      challenge: 'Signals challenge: a station requests urgent resupply but cannot authenticate. Choose the correct net procedure.',
      trainingLink: { href: 'signals_training.html', label: '📡 Launch Signals Training' },
      x: 15, y: 25
    },
    {
      id: 108,
      short: 'Advanced Drill',
      title: 'Advanced Drill & Ceremonial',
      subtitle: 'Turns on the march, forming single file, ceremonial drill, and drill with arms.',
      badge: 'badge_05_parade_drill.png',
      theme: ['#1a2b4a', '#d4af37'],
      tags: ['Drill & Turnout', 'Ceremonial', 'Advanced'],
      brief: 'Building on Green Star drill fundamentals, Red Star cadets execute more advanced squad movements on the parade square. This module covers executing left and right turns on the march, forming single file from the halt as a squad in threes and in line, practising ceremonial drill as a review of Green Star movements, and executing drill with arms. Cadets develop discipline, precision, and cohesion as they perform movements together as a squad, with an emphasis on smart, well-rehearsed drill that builds teamwork.',
      objectives: [
        'Execute left and right turns on the march in quick time.',
        'Form single file from the halt as a squad in threes and in line.',
        'Practise ceremonial drill as a review of Green Star mandatory training.',
        'Execute drill with arms following the Sea Cadets Manual of Drill and Ceremonial.'
      ],
      challenge: 'Drill challenge: as a squad member, respond to drill commands for turns on the march and forming single file, maintaining cadence and precision throughout.',
      trainingLink: { href: 'drill_training.html', label: '🎖️ Launch Drill Training' },
      x: 38, y: 12
    },
    {
      id: 109,
      short: 'Bushcraft',
      title: 'Bushcraft & Survival',
      subtitle: 'Shelter building, fire lighting, water purification, and foraging awareness.',
      badge: 'badge_10_outdoor_expedition.png',
      theme: ['#6b5b34', '#a08050'],
      tags: ['Field Skill', 'Survival', 'Red Star'],
      brief: 'Cadets learn essential survival skills for the field: building a natural shelter from available materials, safe fire lighting techniques (flint and steel, friction methods), water sourcing and purification, and awareness of safe vs unsafe foraging. The module includes the survival priorities rule of three and how to signal for rescue. The interactive scenario strands cadets in a simulated survival situation.',
      objectives: [
        'Build a debris shelter using natural materials.',
        'Light and maintain a fire using a flint and steel.',
        'Purify water using boiling and improvised filtration.',
        'List the survival priorities (rule of three) and explain rescue signalling.'
      ],
      challenge: 'Survival challenge: you are stranded overnight. Prioritise your first three actions using the rule of three.',
      trainingLink: { href: 'bushcraft_training.html', label: '🔥 Launch Bushcraft & Survival' },
      x: 85, y: 68
    },
    {
      id: 110,
      short: 'Advanced Range',
      title: 'Advanced Marksmanship',
      subtitle: 'Zeroing, wind adjustment, and qualification shooting.',
      badge: 'badge_18_marksmanship_principles.png',
      theme: ['#1f4a2b', '#f0b834'],
      tags: ['Marksmanship', 'Shooting', 'Advanced'],
      brief: 'Cadets who completed the Green Star marksmanship principles now advance to practical zeroing, reading wind conditions, adjusting sights, and shooting for qualification scores. The module covers grouping analysis at greater distances, the effect of wind on projectile drift, and the mental discipline of competition shooting. The interactive scenario tests wind-reading and sight adjustment decisions.',
      objectives: [
        'Zero a rifle by adjusting sights to centre a shot group.',
        'Read wind speed and direction using the clock face method.',
        'Calculate wind allowance for a 200-metre shot.',
        'Explain the mental routine for a qualification shoot.'
      ],
      challenge: 'Range challenge: your shot group is landing low and left at 200 metres. Choose the correct sight adjustment and wind correction.',
      x: 30, y: 80
    },
    {
      id: 111,
      short: 'PT Instructor',
      title: 'PT Instructor Course',
      subtitle: 'Leading warm-ups, circuit design, and safe exercise coaching.',
      badge: 'badge_09_physical_fitness.png',
      theme: ['#f08a24', '#ffdc73'],
      tags: ['Fitness', 'Leadership', 'Instructor'],
      brief: 'Cadets transition from performing fitness to leading it. This module covers how to deliver a safe warm-up and cool-down, design a balanced circuit training session, demonstrate correct exercise form, and manage a group of varying fitness levels. The emphasis is on safety, inclusion, and clear instruction — the same skills a real PT instructor uses.',
      objectives: [
        'Deliver a four-stage warm-up to a group of six cadets.',
        'Design a balanced circuit with six stations covering strength, cardio, and flexibility.',
        'Demonstrate and correct exercise form for a squat and a press-up.',
        'Modify an exercise for a cadet with a minor injury.'
      ],
      challenge: 'PT challenge: a cadet in your circuit has a sore wrist. Choose the correct exercise modification to keep them safe and included.',
      x: 50, y: 82
    },
    {
      id: 112,
      short: 'Community',
      title: 'Community Service Project',
      subtitle: 'Planning and leading a cadet community engagement activity.',
      badge: 'badge_12_community_service.png',
      theme: ['#35a75a', '#f5c84c'],
      tags: ['Community', 'Citizenship', 'Leadership'],
      brief: 'The capstone leadership module of Red Star. Cadets plan and lead a community service activity — such as a neighbourhood clean-up, assisting at a local event, or running a cadet recruiting stand. This module covers project planning, risk assessment, communicating with civilian organisations, and reflecting on the impact of community engagement. It ties together the leadership, communication, and citizenship skills from both star levels.',
      objectives: [
        'Write a project plan for a community service activity with tasks and timelines.',
        'Conduct a basic risk assessment for an off-base activity.',
        'Communicate professionally with a civilian organisation.',
        'Lead a debrief and reflect on the activity’s impact.'
      ],
      challenge: 'Community challenge: your community service plan has a safety gap. Identify the risk and choose the correct mitigation.',
      trainingLink: { href: 'community_training.html', label: '🤝 Launch Community Service' },
      x: 12, y: 65
    }
  ];

  // ──────────────────────────────────────────────────────────
  //  DOM references
  // ──────────────────────────────────────────────────────────
  const mapWrap = document.getElementById('mapWrap');
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
  const launchTraining = document.getElementById('launchTraining');
  const phaseCompleteModal = document.getElementById('phaseCompleteModal');
  const pcmClose = document.getElementById('pcmClose');

  // ──────────────────────────────────────────────────────────
  //  State
  // ──────────────────────────────────────────────────────────
  const STORAGE_KEY = 'cadetMapDemoYear2Completed';
  const PHASE_COMPLETE_KEY = 'cadetMapDemoYear2PhaseComplete';
  let selectedId = 101;
  let completed = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'));
  totalCount.textContent = lessons.length;

  // ──────────────────────────────────────────────────────────
  //  Interactive scenarios (one per lesson)
  // ──────────────────────────────────────────────────────────
  const scenarioData = {
    101: {
      title: 'Leadership: Your Responsibilities as a Red Star Cadet',
      intro: 'You are a Red Star cadet — a second-year cadet who is now expected to lead within a peer setting. A group of Green Star (first-year) cadets has just arrived at your corps, and your training officer asks you to set the tone for the evening. Before you act, you need to reflect on your leadership responsibilities.',
      steps: ['Review the responsibilities of a Red Star cadet leading peers.', 'Decide how you will set the example for the junior cadets.', 'Map a personal goal for the training year.'],
      question: 'A Green Star cadet is struggling with drill and asks you for help, but your friends are heading to the canteen. What is the best way to set the example as a Red Star cadet?',
      choices: [
        { text: 'Help the Green Star cadet with their drill now — setting the example means putting the team first and showing initiative, even when it is inconvenient.', correct: true, feedback: 'Correct. Setting the example and displaying initiative are core Red Star cadet responsibilities. A leader helps their peers and junior cadets, building trust and respect within the corps.' },
        { text: 'Tell them to ask the training officer later — you are not responsible for junior cadets.', correct: false, feedback: 'Not quite. As a Red Star cadet you are expected to be aware of and responsive to the needs of your peers and subordinates. Helping a struggling cadet is exactly the kind of initiative leadership calls for.' },
        { text: 'Go to the canteen with your friends and promise to help tomorrow.', correct: false, feedback: 'Try again. Putting social convenience ahead of a teammate in need does not set the example. Leadership within a peer setting means being firm, fair, and friendly — and acting when it matters.' }
      ],
      reward: '+15 Leadership XP • Red Star badge earned'
    },
    102: {
      title: 'Expedition: Plan the Weekend Route',
      intro: 'You are leading a six-cadet section on a two-day expedition. You have the map, a route card template, and a weather forecast that mentions possible afternoon rain on Day 1.',
      steps: ['Plot your route with waypoints and timings.', 'Identify an escape route at each leg.', 'Select kit for the group and confirm campsite.'],
      question: 'The weather forecast predicts heavy rain on Day 1 afternoon. What should you add to your expedition plan?',
      choices: [
        { text: 'Nothing — the forecast is just a guess, carry on as planned.', correct: false, feedback: 'Incorrect. Weather changes are a real risk on expedition. A good leader adjusts the plan and builds in contingencies.' },
        { text: 'Add an early escape route at the midpoint, pack waterproofs at the top of the rucksack, and brief the section on the wet-weather plan.', correct: true, feedback: 'Correct. You have identified the risk, added an escape route, adjusted kit access, and communicated the plan — textbook expedition leadership.' },
        { text: 'Cancel the entire expedition immediately.', correct: false, feedback: 'Not necessary. Rain does not automatically mean cancellation. Contingency planning and escape routes are the correct response.' }
      ],
      reward: '+15 Expedition XP • Red Star badge earned'
    },
    103: {
      title: 'Navigation: Find the Hidden Checkpoint',
      intro: 'You are at a known position on the map. A checkpoint is hidden in the forest 400 metres away on a bearing of 45 degrees. You have a compass, a map, and your pacing count (120 paces per 100 metres).',
      steps: ['Take the bearing from your map to the checkpoint.', 'Convert the distance to paces.', 'Walk the bearing counting paces to arrive at the checkpoint.'],
      question: 'Your checkpoint is 400 metres away on a bearing of 45°. How many paces should you count to reach it?',
      choices: [
        { text: '120 paces — one set of your pace count.', correct: false, feedback: 'Not quite. 120 paces is 100 metres. The checkpoint is 400 metres away, so you need four times that.' },
        { text: '480 paces — four sets of your 120-pace per 100m count.', correct: true, feedback: 'Correct. 400 metres × 120 paces per 100 metres = 480 paces. Walk your bearing and count all 480 to reach the checkpoint.' },
        { text: '400 paces — one pace per metre exactly.', correct: false, feedback: 'Try again. Your pace count is 120 per 100 metres, not 1 per metre. Recalculate using your personal pace factor.' }
      ],
      reward: '+15 Navigation XP • Red Star badge earned'
    },
    104: {
      title: 'Fieldcraft: Stalk to the OP',
      intro: 'You must stalk to within 20 metres of an enemy observation post without being detected. You are 60 metres away in light woodland with patches of tall grass, shadows from a tree line, and a small ditch running toward the OP.',
      steps: ['Observe the OP and plan your route using available cover.', 'Move slowly using the leopard crawl through the grass.', 'Use the ditch for final approach and stop in shadow.'],
      question: 'What is the most important factor in remaining concealed during a stalk?',
      choices: [
        { text: 'Moving as fast as possible to minimise exposure time.', correct: false, feedback: 'Incorrect. Speed causes sudden movement, which is the number one reason things are seen. Slow, deliberate movement is key.' },
        { text: 'Moving slowly, using natural cover and shadow, and breaking up your silhouette.', correct: true, feedback: 'Correct. The principle of "why things are seen" tells us that movement, shape, shadow, and silhouette give you away. Slow movement through cover and shadow defeats all of them.' },
        { text: 'Wearing the brightest camouflage so you blend with the flowers.', correct: false, feedback: 'Try again. Camouflage should match the terrain — bright colours would make you stand out, not blend in.' }
      ],
      reward: '+15 Fieldcraft XP • Red Star badge earned'
    },
    105: {
      title: 'Obstacle Course: Help Your Teammate',
      intro: 'You are running the confidence course with your section. A cadet has frozen halfway up the cargo net, gripping tightly and unable to move. They are three metres off the ground.',
      steps: ['Assess the situation calmly — the cadet is not injured, just frightened.', 'Communicate reassurance from below.', 'Guide them down or forward safely with a spotter in position.'],
      question: 'A teammate has frozen on the cargo net from fear. What is the best response?',
      choices: [
        { text: 'Shout at them to hurry up and keep moving.', correct: false, feedback: 'Incorrect. Shouting increases panic. A frozen cadet needs calm, reassuring communication to regain confidence.' },
        { text: 'Climb up beside them, speak calmly, talk them through the next hand and foot placement, and ensure a spotter is ready below.', correct: true, feedback: 'Correct. You assessed the situation (fear, not injury), provided calm coaching, positioned a spotter, and helped your teammate complete the obstacle safely.' },
        { text: 'Leave them and finish the course yourself — they will figure it out.', correct: false, feedback: 'Try again. Abandoning a struggling teammate is the opposite of leadership. Support and coaching is the correct response.' }
      ],
      reward: '+15 Confidence XP • Red Star badge earned'
    },
    106: {
      title: 'First Aid: The Fallen Cadet',
      intro: 'During a field exercise, a cadet trips and lands hard on their outstretched hand. They are conscious and alert but complain of severe pain and swelling in the wrist. The arm looks slightly deformed.',
      steps: ['Conduct a primary survey (DRABC) — the casualty is responsive and breathing.', 'Conduct a secondary survey focusing on the injured wrist.', 'Immobilise the injury and arrange evacuation.'],
      question: 'After confirming the casualty is responsive and breathing, what is the correct treatment for a suspected fractured wrist?',
      choices: [
        { text: 'Tell them to walk it off and keep moving — it is probably just a sprain.', correct: false, feedback: 'Incorrect. You cannot rule out a fracture in the field. Untreated fractures can cause further injury and complications.' },
        { text: 'Apply an improvised sling to support and immobilise the arm, check circulation beyond the injury, and arrange evacuation to a medical point.', correct: true, feedback: 'Correct. You completed the secondary survey, immobilised with a sling, checked distal circulation (fingers), and arranged evacuation — the correct field treatment for a suspected fracture.' },
        { text: 'Try to straighten the wrist to its normal position before splinting.', correct: false, feedback: 'Try again. Never attempt to realign a suspected fracture in the field. Immobilise as found and evacuate.' }
      ],
      reward: '+15 First Aid XP • Red Star badge earned'
    },
    107: {
      title: 'Signals: The Unauthenticated Request',
      intro: 'You are the net control station (NCS) running a three-station radio net during a field exercise. Station 2 requests an urgent resupply of water and rations. When you ask them to authenticate, they give a code that does not match your authentication table.',
      steps: ['Receive the request and note the authentication attempt.', 'Check the authentication table — the code does not match.', 'Apply signal security procedure and respond correctly.'],
      question: 'Station 2 transmits a resupply request but fails authentication. What should you do?',
      choices: [
        { text: 'Send the resupply anyway — it is probably just a mistake and they need water urgently.', correct: false, feedback: 'Incorrect. Failed authentication could mean the frequency has been compromised or an imposter is on the net. You cannot verify the request.' },
        { text: 'Do not action the request. Challenge Station 2 to re-authenticate using the correct challenge procedure. If they fail again, report a possible SIGSEC breach to your commander.', correct: true, feedback: 'Correct. Signal security means you never action an unauthenticated request. You challenge again, and if it fails, you escalate as a potential compromise — exactly the right procedure.' },
        { text: 'Switch to a new frequency immediately without telling anyone.', correct: false, feedback: 'Try again. Changing frequency without coordination would break the net. The correct procedure is to challenge authentication first, then escalate.' }
      ],
      reward: '+15 Signals XP • Red Star badge earned'
    },
    108: {
      title: 'Advanced Drill: Inspect the Squad',
      intro: 'You are the parade commander inspecting your squad of eight cadets before a ceremonial parade. You walk the line and must identify any drill faults and give corrective commands.',
      steps: ['Inspect each cadet from head to toe.', 'Identify faults in dress, posture, and equipment.', 'Give the corrective command clearly.'],
      question: 'During your inspection, you notice a cadet whose rifle is at the wrong angle at the shoulder and whose headdress is tilted. What is the correct approach?',
      choices: [
        { text: 'Ignore it — minor faults do not matter on parade.', correct: false, feedback: 'Incorrect. On a ceremonial parade, standards are everything. Faults must be identified and corrected before the parade begins.' },
        { text: 'Stop in front of the cadet, identify the faults specifically (rifle angle and headdress), have the cadet correct them, then continue the inspection.', correct: true, feedback: 'Correct. A good inspection is specific and corrective. You identified both faults, had the cadet fix them, and maintained the standard before moving on.' },
        { text: 'Shout at the whole squad about general sloppiness.', correct: false, feedback: 'Try again. General criticism without specific correction does not help. Identify and correct the individual faults clearly.' }
      ],
      reward: '+15 Drill XP • Red Star badge earned'
    },
    109: {
      title: 'Survival: Stranded Overnight',
      intro: 'You have become separated from your section during a night exercise. You have a water bottle (half full), a flint and steel, a knife, and the clothes you are wearing. Night is falling and the temperature is dropping.',
      steps: ['Apply the rule of three to prioritise your needs.', 'Choose your first action wisely.', 'Signal for rescue when safe to do so.'],
      question: 'Using the survival rule of three, what should you do first?',
      choices: [
        { text: 'Start searching for food immediately — you might be stranded for days.', correct: false, feedback: 'Incorrect. The rule of three says you can survive 3 minutes without air, 3 hours without shelter in extreme conditions, 3 days without water, and 3 weeks without food. Food is the last priority.' },
        { text: 'Build a shelter to protect against exposure and cold, since you can survive only 3 hours without shelter in extreme conditions.', correct: true, feedback: 'Correct. The rule of three prioritises shelter first in harsh conditions. Exposure kills faster than thirst or hunger. Build your shelter, then address water, fire, and signalling.' },
        { text: 'Run in a random direction to try to find your way back in the dark.', correct: false, feedback: 'Try again. Moving in the dark without direction risks injury and takes you further from help. Stay put, build shelter, and signal.' }
      ],
      reward: '+15 Survival XP • Red Star badge earned'
    },
    110: {
      title: 'Advanced Marksmanship: Correct the Group',
      intro: 'You are on the 200-metre range. You fire a five-round group and it lands low and to the left of the target centre. There is a light wind blowing from 3 o\'clock (right to left) at approximately 5 mph.',
      steps: ['Analyse your shot group position on the target.', 'Assess the wind direction and speed.', 'Determine the correct sight and aim adjustment.'],
      question: 'Your group is landing low and left. The wind is from 3 o\'clock at 5 mph. What adjustments should you make?',
      choices: [
        { text: 'Aim higher and to the right to compensate for both the low group and the left wind drift.', correct: false, feedback: 'Not quite. You are overcomplicating. The wind is pushing your rounds to the LEFT, which means you should aim INTO the wind (to the right) to correct. But the low group needs a sight adjustment, not just aiming higher.' },
        { text: 'Adjust your sights to move the group up and to the right, and aim slightly right (into the wind) to counter the leftward drift.', correct: true, feedback: 'Correct. The group is low and left, so you adjust sights up and right to centre it. The wind from 3 o\'clock pushes rounds left, so you aim right (into the wind) to compensate. Both corrections together will centre your next group.' },
        { text: 'Fire faster to beat the wind before it affects the rounds.', correct: false, feedback: 'Try again. Firing faster does not negate wind. Wind affects every round regardless of speed. You need sight and aim adjustments.' }
      ],
      reward: '+15 Marksmanship XP • Red Star badge earned'
    },
    111: {
      title: 'PT Instructor: The Sore Wrist',
      intro: 'You are leading a circuit training session for six cadets. One cadet approaches you before the session and says they have a sore wrist from a fall yesterday. They still want to take part.',
      steps: ['Assess the cadet\'s situation — they want to participate but have a minor injury.', 'Choose exercises that avoid stressing the wrist.', 'Keep the cadet included and active safely.'],
      question: 'A cadet has a sore wrist but wants to participate in your circuit. What should you do?',
      choices: [
        { text: 'Tell them to sit out the whole session — injured cadets cannot train.', correct: false, feedback: 'Incorrect. A minor sore wrist does not mean the cadet cannot train at all. A good instructor modifies exercises to keep everyone included safely.' },
        { text: 'Modify the exercises: swap press-ups for squats and lunges, swap planks for a standing core hold, and keep them on cardio stations. Check in during the session.', correct: true, feedback: 'Correct. You kept the cadet included, avoided loading the wrist, substituted alternative exercises for the same muscle groups, and monitored them during the session — textbook inclusive instruction.' },
        { text: 'Make them do everything anyway — pushing through pain builds character.', correct: false, feedback: 'Try again. Pushing through injury risks serious harm. An instructor\'s first responsibility is safety. Modify and adapt.' }
      ],
      reward: '+15 PT Instructor XP • Red Star badge earned'
    },
    112: {
      title: 'Community Service: Fix the Plan',
      intro: 'You have planned a cadet stand at a local community fair. Your plan includes setting up a display table, running a mini drill demo, and handing out flyers. The event is outdoors in a public park next to a busy road.',
      steps: ['Review your project plan and risk assessment.', 'Identify the safety gap in the plan.', 'Choose the correct mitigation.'],
      question: 'What is the most significant safety risk in your community fair plan, and how should you mitigate it?',
      choices: [
        { text: 'The flyers might run out — bring extra copies.', correct: false, feedback: 'Not quite. Running out of flyers is a logistics issue, not a safety risk. Think about the location and the activities.' },
        { text: 'The mini drill demo with wooden drill rifles is next to a busy road. Rope off the demo area with visible barriers, station cadets as marshals, and brief the public to stay behind the line.', correct: true, feedback: 'Correct. The biggest risk is the drill demo near traffic — spectators or cadets could step into the road. Barriers, marshals, and a clear safety brief are the correct mitigation. This is exactly what a risk assessment should catch.' },
        { text: 'It might rain — bring an umbrella for the display table.', correct: false, feedback: 'Try again. Rain is a minor weather concern. The major risk is the drill demo near a busy road — that needs barriers and marshals.' }
      ],
      reward: '+15 Community XP • Red Star badge earned'
    }
  };

  // ──────────────────────────────────────────────────────────
  //  Functions
  // ──────────────────────────────────────────────────────────
  function saveProgress() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed]));
  }

  function createPins() {
    lessons.forEach(lesson => {
      const btn = document.createElement('button');
      btn.className = 'pin';
      btn.type = 'button';
      btn.style.left = lesson.x + '%';
      btn.style.top = lesson.y + '%';
      btn.dataset.id = lesson.id;
      btn.dataset.short = lesson.short;
      btn.setAttribute('aria-label', 'Open ' + lesson.title + ' lesson');
      btn.innerHTML = '<img src="assets/badges/' + lesson.badge + '" alt="' + lesson.title + '" />';
      btn.addEventListener('click', function () { selectLesson(lesson.id); });
      mapWrap.appendChild(btn);
    });
  }

  function createBadgeGrid() {
    lessons.forEach(lesson => {
      const cell = document.createElement('button');
      cell.className = 'badge-cell';
      cell.type = 'button';
      cell.dataset.id = lesson.id;
      cell.setAttribute('aria-label', lesson.title + ' badge');
      cell.innerHTML = '<img src="assets/badges/' + lesson.badge + '" alt="' + lesson.title + ' badge" />';
      cell.addEventListener('click', function () { selectLesson(lesson.id); });
      badgeGrid.appendChild(cell);
    });
  }

  function selectLesson(id) {
    selectedId = id;
    const lesson = lessons.find(function (item) { return item.id === id; });
    lessonHero.style.background = 'linear-gradient(145deg, ' + lesson.theme[0] + ', ' + lesson.theme[1] + ')';
    lessonBadge.src = 'assets/badges/' + lesson.badge;
    lessonBadge.alt = lesson.title + ' badge';
    lessonTitle.textContent = lesson.title;
    lessonSubtitle.textContent = lesson.subtitle;
    lessonBrief.textContent = lesson.brief;
    tagRow.innerHTML = lesson.tags.map(function (tag) { return '<span class="tag">' + tag + '</span>'; }).join('');
    objectiveList.innerHTML = lesson.objectives.map(function (obj) { return '<li>' + obj + '</li>'; }).join('');
    challengeBox.innerHTML = '<strong>Quest Challenge:</strong> ' + lesson.challenge;
    completeLesson.textContent = tr(completed.has(id) ? 'Red Star Badge Earned ✓ Review Lesson' : 'Complete Lesson + Earn Red Star Badge');
    scenarioPanel.classList.remove('active');
    scenarioPanel.innerHTML = '';
    playScenario.textContent = tr('Play Mini Scenario');
    // Dynamically update the launch training link based on the selected lesson
    if (launchTraining) {
      if (lesson.trainingLink) {
        launchTraining.style.display = '';
        launchTraining.href = lesson.trainingLink.href;
        launchTraining.textContent = lesson.trainingLink.label;
      } else {
        launchTraining.style.display = 'none';
      }
    }
    document.querySelectorAll('.pin').forEach(function (pin) {
      pin.classList.toggle('active', Number(pin.dataset.id) === id);
    });
    document.querySelectorAll('.badge-cell').forEach(function (cell) {
      cell.classList.toggle('active', Number(cell.dataset.id) === id);
    });
  }

  function updateProgress() {
    const count = completed.size;
    completeCount.textContent = count;
    progressBar.style.width = (count / lessons.length) * 100 + '%';
    document.querySelectorAll('.pin').forEach(function (pin) {
      pin.classList.toggle('done', completed.has(Number(pin.dataset.id)));
    });
    document.querySelectorAll('.badge-cell').forEach(function (cell) {
      cell.classList.toggle('done', completed.has(Number(cell.dataset.id)));
    });
    // Check for phase complete (all 12)
    if (count === lessons.length && !localStorage.getItem(PHASE_COMPLETE_KEY)) {
      localStorage.setItem(PHASE_COMPLETE_KEY, 'true');
      showPhaseCompleteModal();
    }
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.remove('show');
    void toast.offsetWidth;
    toast.classList.add('show');
  }

  function showPhaseCompleteModal() {
    phaseCompleteModal.classList.add('show');
  }

  function earnSelectedBadge() {
    const lesson = lessons.find(function (item) { return item.id === selectedId; });
    const wasComplete = completed.has(selectedId);
    completed.add(selectedId);
    saveProgress();
    updateProgress();
    selectLesson(selectedId);
    showToast(wasComplete ? 'Reviewing ' + lesson.title : 'Red Star badge earned: ' + lesson.title + '!');
  }

  function renderInteractiveScenario(id) {
    const data = scenarioData[id];
    if (!data) return false;
    scenarioPanel.classList.add('active');
    scenarioPanel.innerHTML =
      '<div class="scenario-head">' +
        '<h3>' + data.title + '</h3>' +
        '<p>' + data.intro + '</p>' +
      '</div>' +
      '<div class="scenario-body">' +
        data.steps.map(function (step, index) {
          return '<div class="scenario-step"><span class="step-num">' + (index + 1) + '</span><span>' + step + '</span></div>';
        }).join('') +
        '<div class="challenge-box"><strong>Decision Point:</strong> ' + data.question + '</div>' +
        '<div class="choice-grid">' +
          data.choices.map(function (choice, index) {
            return '<button class="choice-btn" type="button" data-choice="' + index + '">' + choice.text + '</button>';
          }).join('') +
        '</div>' +
        '<div class="scenario-feedback">Choose the best response to test the scenario.</div>' +
        '<div class="scenario-reward"><span class="xp-pill">' + data.reward + '</span><span>Correct response can earn the badge.</span></div>' +
      '</div>';
    scenarioPanel.querySelectorAll('.choice-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { handleScenarioChoice(id, Number(btn.dataset.choice)); });
    });
    scenarioPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    showToast(data.title + ' loaded.');
    return true;
  }

  function handleScenarioChoice(id, choiceIndex) {
    const data = scenarioData[id];
    const choice = data.choices[choiceIndex];
    const buttons = scenarioPanel.querySelectorAll('.choice-btn');
    const feedback = scenarioPanel.querySelector('.scenario-feedback');
    buttons.forEach(function (btn, index) {
      btn.classList.remove('correct', 'wrong');
      if (index === choiceIndex) btn.classList.add(choice.correct ? 'correct' : 'wrong');
    });
    feedback.className = 'scenario-feedback ' + (choice.correct ? 'good' : 'bad');
    feedback.textContent = choice.feedback;
    if (choice.correct) {
      completed.add(id);
      saveProgress();
      updateProgress();
      selectLesson(id);
      renderInteractiveScenario(id);
      const refreshedFeedback = scenarioPanel.querySelector('.scenario-feedback');
      refreshedFeedback.className = 'scenario-feedback good';
      refreshedFeedback.textContent = choice.feedback + ' Badge progress updated automatically.';
      const refreshedButtons = scenarioPanel.querySelectorAll('.choice-btn');
      refreshedButtons[choiceIndex].classList.add('correct');
      showToast('Scenario complete: ' + lessons.find(function (item) { return item.id === id; }).title + ' Red Star badge earned!');
    } else {
      showToast('Try again — review the scenario clue.');
    }
  }

  function playSelectedScenario() {
    if (renderInteractiveScenario(selectedId)) return;
    const lesson = lessons.find(function (item) { return item.id === selectedId; });
    showToast(lesson.title + ' scenario: complete the challenge to earn the Red Star badge.');
  }

  // ──────────────────────────────────────────────────────────
  //  Event listeners + init
  // ──────────────────────────────────────────────────────────
  completeLesson.addEventListener('click', earnSelectedBadge);
  playScenario.addEventListener('click', playSelectedScenario);
  resetProgress.addEventListener('click', function () {
    completed = new Set();
    saveProgress();
    localStorage.removeItem(PHASE_COMPLETE_KEY);
    updateProgress();
    selectLesson(selectedId);
    showToast('Red Star progress reset. Start a new Red Star quest run.');
  });

  pcmClose.addEventListener('click', function () {
    phaseCompleteModal.classList.remove('show');
  });

  /* ── i18n: translate data arrays in-place ── */
  if (typeof trMutate === "function") {
    try { trMutate(lessons); } catch(e) {}
    try { trMutate(scenarioData); } catch(e) {}
  }

  createPins();
  createBadgeGrid();
  updateProgress();
  selectLesson(101);
})();

