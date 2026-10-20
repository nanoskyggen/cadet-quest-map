(function () {
  "use strict";

  // ──────────────────────────────────────────────────────────
  //  Level 2 — Air Cadet lessons
  //  12 Proficiency Level 2 modules building on Level 1 foundations
  // ──────────────────────────────────────────────────────────
  const lessons = [
    {
      id: 201,
      short: 'Airmanship',
      title: 'Airmanship & Aviation Foundations',
      subtitle: 'The principles of flight, air discipline, and cadet aviation culture.',
      badge: 'badge_13_air_program.png',
      theme: ['#2980b9', '#5dade2'],
      tags: ['Core', 'Airmanship', 'Level 2'],
      brief: 'Cadets who earned their Air Cadet Badge now deepen their understanding of aviation. This module covers the four forces of flight (lift, weight, thrust, drag), the basic principles of how an aircraft flies, air discipline and airmanship, and the culture and traditions of the Air Cadets. Learners explore the parts of an aircraft, the flight environment, and the responsibilities of an air cadet both on the ground and in the air.',
      objectives: [
        'Explain the four forces of flight and how they interact.',
        'Identify the primary flight control surfaces (ailerons, elevator, rudder).',
        'Describe the principles of airmanship and air discipline.',
        'List the key parts of a light aircraft and their functions.'
      ],
      challenge: 'Airmanship challenge: identify the four forces acting on an aircraft in level flight and explain how lift is generated.',
      x: 50, y: 18
    },
    {
      id: 202,
      short: 'Meteorology',
      title: 'Aviation Meteorology',
      subtitle: 'Cloud types, pressure systems, and reading weather for flight safety.',
      badge: 'badge_13_air_program.png',
      theme: ['#5dade2', '#aed6f1'],
      tags: ['Meteorology', 'Safety', 'Level 2'],
      brief: 'Weather is the single most important factor in aviation safety. This module teaches cadets to identify cloud types and their associated weather, understand pressure systems and fronts, read a basic aviation weather chart, and recognise hazardous weather conditions including thunderstorms, fog, and strong winds. The interactive scenario puts cadets in the role of a flight planner deciding whether conditions are safe for a cadet glider sortie.',
      objectives: [
        'Identify the ten main cloud types and their altitude bands.',
        'Explain the difference between high and low pressure systems.',
        'Read a basic aviation weather chart and identify fronts.',
        'Recognise three hazardous weather conditions and their risks to flight.'
      ],
      challenge: 'Meteorology challenge: assess a weather briefing for a planned glider flight and decide whether conditions are safe.',
      x: 75, y: 30
    },
    {
      id: 203,
      short: 'Air Nav',
      title: 'Air Navigation',
      subtitle: 'Chart work, headings, drift, and time-speed-distance calculations.',
      badge: 'badge_06_navigation.png',
      theme: ['#1b4f72', '#5dade2'],
      tags: ['Navigation', 'Chart Work', 'Advanced'],
      brief: 'Building on Proficiency Level 1 map reading, cadets learn aviation-specific navigation. This module covers the aeronautical chart, plotting a true track, converting between true and magnetic headings using variation, calculating headings allowing for drift, and time-speed-distance calculations for fuel planning. The interactive scenario challenges cadets to plan a cross-country navigation leg with a wind correction.',
      objectives: [
        'Plot a true track on an aeronautical chart between two points.',
        'Convert a true heading to a magnetic heading using local variation.',
        'Calculate a heading to maintain track in a crosswind.',
        'Complete a time-speed-distance calculation to estimate flight time.'
      ],
      challenge: 'Navigation challenge: given a wind from the left, calculate the heading correction needed to maintain your planned track.',
      x: 80, y: 15
    },
    {
      id: 204,
      short: 'Principles',
      title: 'Principles of Flight',
      subtitle: 'Aerofoils, angle of attack, stall, and the physics of lift.',
      badge: 'badge_13_air_program.png',
      theme: ['#2980b9', '#85c1e9'],
      tags: ['Theory', 'Principles', 'Level 2'],
      brief: 'Cadets go deeper into the physics of flight. This module covers the aerofoil shape and how it generates lift through pressure differential, the relationship between angle of attack and lift, what causes a stall and how to recover, and the concepts of thrust, drag, and aircraft efficiency. The module includes practical demonstrations using paper aerofoils and wind tunnel concepts.',
      objectives: [
        'Explain how an aerofoil generates lift using Bernoulli and Newton principles.',
        'Describe the relationship between angle of attack and coefficient of lift.',
        'Identify the causes of a stall and demonstrate the recovery procedure.',
        'Explain the difference between induced and parasitic drag.'
      ],
      challenge: 'Principles challenge: an aircraft is approaching a stall. Identify the correct recovery action and explain why the stall occurs.',
      x: 88, y: 45
    },
    {
      id: 205,
      short: 'Propulsion',
      title: 'Aircraft Propulsion Systems',
      subtitle: 'Piston engines, jet engines, and how thrust is produced.',
      badge: 'badge_13_air_program.png',
      theme: ['#143b5c', '#5dade2'],
      tags: ['Engineering', 'Propulsion', 'Level 2'],
      brief: 'This module introduces cadets to the engines that power aircraft. Topics include the four-stroke piston engine cycle (intake, compression, power, exhaust), how a jet engine produces thrust using the Brayton cycle, propeller efficiency, and the basics of electric and hybrid propulsion emerging in modern aviation. Cadets compare engine types and understand which suits which aircraft role.',
      objectives: [
        'Describe the four strokes of a piston engine cycle.',
        'Explain how a turbojet engine produces thrust.',
        'Compare piston, turboprop, and turbofan engines for different aircraft roles.',
        'Explain how a propeller converts engine power into thrust.'
      ],
      challenge: 'Propulsion challenge: match the correct engine type to three different aircraft roles (light trainer, regional transport, high-speed jet).',
      x: 62, y: 65
    },
    {
      id: 206,
      short: 'Air Law',
      title: 'Air Law & Airspace',
      subtitle: 'Airspace classification, rules of the air, and circuit procedures.',
      badge: 'badge_13_air_program.png',
      theme: ['#1b4f72', '#85c1e9'],
      tags: ['Regulation', 'Air Law', 'Level 2'],
      brief: 'Cadets learn the rules that keep the skies safe. This module covers airspace classification (controlled vs uncontrolled), the rules of the air including right-of-way, visual flight rules (VFR) basics, and the standard aerodrome traffic circuit pattern. Cadets understand who has priority, how to communicate intentions, and why disciplined circuit procedures prevent collisions.',
      objectives: [
        'Identify the main classes of airspace and their entry requirements.',
        'Apply right-of-way rules in common encounter scenarios.',
        'Describe the standard aerodrome circuit pattern and its legs.',
        'Explain the basic principles of visual flight rules.'
      ],
      challenge: 'Air law challenge: two aircraft are converging in the circuit. Determine which has right of way and the correct action.',
      x: 20, y: 50
    },
    {
      id: 207,
      short: 'Radio',
      title: 'Aviation Radio Communications',
      subtitle: 'ATC phraseology, phonetic alphabet, and radio discipline.',
      badge: 'badge_07_radio_communications.png',
      theme: ['#2f6fbe', '#9ed8ff'],
      tags: ['Communication', 'ATC', 'Advanced'],
      brief: 'Clear radio communication is critical in aviation. This module covers the NATO phonetic alphabet, standard ATC phraseology, reading back clearances, the structure of a position report, and radio discipline including brevity and listening before transmitting. The interactive scenario has cadets acting as a pilot communicating with a control tower during a circuit.',
      objectives: [
        'Use the NATO phonetic alphabet to spell out callsigns and waypoints.',
        'Construct and deliver a standard radio call to ATC.',
        'Correctly read back a take-off clearance.',
        'Explain radio discipline principles including listen before transmit.'
      ],
      challenge: 'Radio challenge: you are approaching the airfield. Construct the correct initial radio call to the tower using standard phraseology.',
      x: 15, y: 22
    },
    {
      id: 208,
      short: 'Aircraft Ops',
      title: 'Aircraft Operations & Handling',
      subtitle: 'Pre-flight checks, ground handling, and passenger safety.',
      badge: 'badge_13_air_program.png',
      theme: ['#2980b9', '#aed6f1'],
      tags: ['Operations', 'Safety', 'Level 2'],
      brief: 'Cadets learn the practical side of operating aircraft on the ground and in the air. This module covers pre-flight inspection checks (the walkaround), ground handling including towing and marshalling, fuel management, weight and balance basics, and passenger safety briefings. The interactive scenario challenges cadets to conduct a pre-flight inspection and identify a defect.',
      objectives: [
        'Conduct a systematic pre-flight walkaround inspection.',
        'Interpret marshalling signals for directing aircraft on the ground.',
        'Explain the importance of weight and balance in aircraft safety.',
        'Deliver a passenger safety briefing before a cadet air experience flight.'
      ],
      challenge: 'Operations challenge: during your pre-flight walkaround, you notice an issue with the aircraft. Identify the defect and the correct action.',
      x: 38, y: 10
    },
    {
      id: 209,
      short: 'Glider',
      title: 'Gliding & Soaring',
      subtitle: 'Glider types, launch methods, and finding lift.',
      badge: 'badge_13_air_program.png',
      theme: ['#5dade2', '#d6eaf8'],
      tags: ['Gliding', 'Flight Experience', 'Level 2'],
      brief: 'Gliding is the heart of Air Cadet flight experience. This module covers glider types and their characteristics, launch methods (winch launch and aerotow), the principles of soaring using thermals, ridge lift, and wave lift, and the circuit and landing pattern for a glider. Cadets learn how to find and use rising air to extend flight time.',
      objectives: [
        'Compare winch launch and aerotow launch methods and their procedures.',
        'Explain how a thermal creates lift and how to centre in one.',
        'Describe the glider circuit and landing approach.',
        'Identify the signs of lift including cloud formation and bird behaviour.'
      ],
      challenge: 'Gliding challenge: you are at 800 feet after a winch launch with no thermal in sight. Choose the correct course of action.',
      x: 85, y: 62
    },
    {
      id: 210,
      short: 'Flight Sim',
      title: 'Flight Simulation & Instrument Familiarisation',
      subtitle: 'Six-pack instruments, simulator flying, and situational awareness.',
      badge: 'badge_13_air_program.png',
      theme: ['#143b5c', '#85c1e9'],
      tags: ['Simulation', 'Instruments', 'Level 2'],
      brief: 'Cadets use flight simulators to practise skills safely on the ground. This module covers the six basic flight instruments (airspeed indicator, attitude indicator, altimeter, turn coordinator, heading indicator, vertical speed indicator), how to fly straight and level using instrument references, basic simulator operations, and maintaining situational awareness. The interactive scenario tests instrument interpretation.',
      objectives: [
        'Identify all six basic flight instruments and their functions.',
        'Interpret the attitude indicator to maintain straight and level flight.',
        'Demonstrate a level turn using instrument references in a simulator.',
        'Explain the concept of situational awareness and how to maintain it.'
      ],
      challenge: 'Flight sim challenge: read the six-pack instruments and determine whether the aircraft is in straight and level flight.',
      x: 30, y: 75
    },
    {
      id: 211,
      short: 'Aerodrome',
      title: 'Aerodrome Operations & ATC Tower',
      subtitle: 'Runway layout, ground movements, and tower coordination.',
      badge: 'badge_05_leadership.png',
      theme: ['#1b4f72', '#aed6f1'],
      tags: ['Operations', 'ATC', 'Leadership'],
      brief: 'Cadets learn how an aerodrome functions as a coordinated system. This module covers runway and taxiway layout, runway numbering and orientation, wind direction indicators (windsock), ground movement procedures, and the role of the air traffic control tower. Cadets practise coordinating aircraft movements safely on the ground, building on their leadership skills from Proficiency Level 1.',
      objectives: [
        'Explain how runway numbers relate to magnetic heading.',
        'Interpret a windsock to determine the active runway.',
        'Describe the flow of aircraft ground movements from parking to take-off.',
        'Explain the coordination between ground and tower controllers.'
      ],
      challenge: 'Aerodrome challenge: given a wind direction, determine the correct active runway and the circuit direction.',
      x: 50, y: 80
    },
    {
      id: 212,
      short: 'Air Project',
      title: 'Aviation Project & Airshow Support',
      subtitle: 'Planning and leading an air cadet aviation community event.',
      badge: 'badge_12_community_service.png',
      theme: ['#2980b9', '#f5c84c'],
      tags: ['Community', 'Leadership', 'Project'],
      brief: 'The capstone module of Level 2 Air Cadet training. Cadets plan and lead an aviation-themed community event — such as supporting a local airshow, running a cadet open day with a flight simulator stand, or organising an aviation careers evening. This module covers project planning, risk assessment for public events, coordinating with aerodrome authorities, and communicating with civilian organisations. It ties together leadership, communication, and aviation knowledge from both levels.',
      objectives: [
        'Write a project plan for an aviation community event with tasks and timelines.',
        'Conduct a risk assessment for a public event on an active aerodrome.',
        'Coordinate professionally with aerodrome and ATC authorities.',
        'Lead a debrief and reflect on the event impact.'
      ],
      challenge: 'Project challenge: your airshow support plan has a safety gap near the flight line. Identify the risk and choose the correct mitigation.',
      x: 12, y: 60
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
  const phaseCompleteModal = document.getElementById('phaseCompleteModal');
  const pcmClose = document.getElementById('pcmClose');

  // ──────────────────────────────────────────────────────────
  //  State
  // ──────────────────────────────────────────────────────────
  const STORAGE_KEY = 'cadetMapDemoAirYear2Completed';
  const PHASE_COMPLETE_KEY = 'cadetMapDemoAirYear2PhaseComplete';
  let selectedId = 201;
  let completed = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'));
  totalCount.textContent = lessons.length;

  // ──────────────────────────────────────────────────────────
  //  Interactive scenarios (one per lesson)
  // ──────────────────────────────────────────────────────────
  const scenarioData = {
    201: {
      title: 'Airmanship: The Four Forces',
      intro: 'Your instructor asks you to explain the basic physics of flight before your first air experience flight. You need to identify the four forces and how they interact in straight and level flight.',
      steps: ['Recall the four forces of flight.', 'Understand how they balance in level flight.', 'Explain how lift is generated by the aerofoil.'],
      question: 'In straight and level, unaccelerated flight, how do the four forces relate to each other?',
      choices: [
        { text: 'Lift equals weight, and thrust equals drag — the forces are balanced.', correct: true, feedback: 'Correct. In straight and level unaccelerated flight, lift exactly balances weight and thrust exactly balances drag. When these pairs are equal, the aircraft maintains constant altitude and speed. Any imbalance causes a change.' },
        { text: 'Lift must always be greater than weight to stay airborne.', correct: false, feedback: 'Not quite. If lift were always greater than weight, the aircraft would climb continuously. In level flight, lift equals weight exactly.' },
        { text: 'Drag must be greater than thrust to slow the aircraft down for safety.', correct: false, feedback: 'Try again. If drag exceeded thrust, the aircraft would decelerate and eventually stall. In steady flight, thrust equals drag.' }
      ],
      reward: '+15 Airmanship XP • Air Cadet badge earned'
    },
    202: {
      title: 'Meteorology: Go or No-Go',
      intro: 'You are the cadet flight planner for a morning glider sortie. The weather briefing shows: scattered cumulus at 3,000 ft, surface wind 8 knots down the runway, visibility 10 km, but a line of cumulonimbus clouds is approaching from the west, expected to reach the airfield in approximately 90 minutes.',
      steps: ['Assess the current conditions.', 'Identify the approaching hazard.', 'Make the go or no-go decision with reasoning.'],
      question: 'Based on the weather briefing, what is the correct decision for the glider sortie?',
      choices: [
        { text: 'Launch immediately — the current conditions are fine and you have 90 minutes before the CB arrives.', correct: true, feedback: 'Correct. The current conditions are suitable for gliding (good visibility, manageable wind, scattered cloud). Cumulonimbus is extremely hazardous to gliders, but with 90 minutes of lead time you can launch, complete short sorties, and recover before the CB arrives. Brief all pilots on the time limit and have a recovery plan.' },
        { text: 'Cancel all flying — cumulonimbus is in the area and no flight is safe.', correct: false, feedback: 'Not quite. The CB is 90 minutes away, not overhead. Current conditions are flyable. A good planner uses the available window safely with a clear recovery deadline rather than cancelling outright.' },
        { text: 'Launch and fly until the rain starts — you can land in light rain.', correct: false, feedback: 'Try again. Cumulonimbus brings severe turbulence, lightning, and strong downdrafts — not just rain. Gliders must be on the ground well before CB arrival. Never plan to fly through a CB.' }
      ],
      reward: '+15 Meteorology XP • Air Cadet badge earned'
    },
    203: {
      title: 'Navigation: Crosswind Correction',
      intro: 'You are planning a cross-country navigation leg. Your true track is 090° (due east). The wind is from 180° (due south) at 15 knots. Your aircraft cruises at 90 knots true airspeed. You need to calculate the heading to fly to maintain your track.',
      steps: ['Identify the wind direction relative to your track.', 'Determine the direction of drift.', 'Calculate the heading correction into the wind.'],
      question: 'The wind is from the south (180°) and your track is east (090°). The wind will push you north. What heading should you fly to maintain your eastward track?',
      choices: [
        { text: 'Fly heading 090° — straight along the track and let the wind push you.', correct: false, feedback: 'Incorrect. If you fly 090°, the wind from the south will push you north of your intended track. You need to correct into the wind.' },
        { text: 'Fly a heading south of 090° (e.g., 100-110°) — turn into the wind to counteract the northward drift.', correct: true, feedback: 'Wait — let us correct the reasoning. The wind is FROM the south, meaning it blows toward the north. So it pushes you NORTH. To counteract, you must aim SOUTH of track, which means a heading GREATER than 090° (toward the south, e.g., 100°). You correctly identified turning into the wind. Heading correction applied — track maintained.' },
        { text: 'Fly heading 270° — turn around and fly downwind.', correct: false, feedback: 'Try again. That would send you in the opposite direction entirely. You need a small correction into the wind, not a reversal.' }
      ],
      reward: '+15 Navigation XP • Air Cadet badge earned'
    },
    204: {
      title: 'Principles of Flight: Stall Recovery',
      intro: 'You are in a training flight and the instructor deliberately sets up a stall. The aircraft nose drops, the airspeed is below the stall speed, and you feel a buffeting through the controls. You need to execute the correct stall recovery.',
      steps: ['Recognise the stall symptoms.', 'Reduce the angle of attack immediately.', 'Apply full power and level the wings.'],
      question: 'The aircraft has stalled. What is the immediate first action for recovery?',
      choices: [
        { text: 'Pull back on the controls to raise the nose and stop the descent.', correct: false, feedback: 'Incorrect. Pulling back increases the angle of attack further, deepening the stall. This is the worst possible action — it prevents the wing from flying again.' },
        { text: 'Relax back pressure (push forward slightly) to reduce the angle of attack, then apply full power to regain airspeed.', correct: true, feedback: 'Correct. A stall is caused by exceeding the critical angle of attack. The immediate fix is to reduce the angle of attack by relaxing back pressure, then apply full power to regain airspeed and climb back to a safe altitude. Wings level throughout.' },
        { text: 'Apply full rudder to spin out of the stall.', correct: false, feedback: 'Try again. Applying rudder during a stall can cause a spin, which is far more dangerous. The correct action is to reduce angle of attack first.' }
      ],
      reward: '+15 Principles XP • Air Cadet badge earned'
    },
    205: {
      title: 'Propulsion: Match the Engine',
      intro: 'You are studying aircraft propulsion and need to match the correct engine type to three different aircraft roles. The roles are: (A) a light two-seat cadet trainer, (B) a regional transport carrying 70 passengers on short routes, and (C) a high-speed interceptor jet.',
      steps: ['Consider the performance requirements of each role.', 'Match the engine type that suits each mission profile.', 'Explain your reasoning.'],
      question: 'Which engine type best suits each role? Light trainer (A), regional transport (B), high-speed jet (C)?',
      choices: [
        { text: 'A: Piston engine, B: Turboprop, C: Turbofan (or turbojet).', correct: true, feedback: 'Correct. A light trainer needs simplicity and fuel economy — a piston engine is ideal. A regional transport benefits from turboprop efficiency at moderate speeds. A high-speed jet requires the high thrust and speed of a turbofan or turbojet. Each engine type is matched to its mission profile.' },
        { text: 'A: Turbojet, B: Turbojet, C: Piston engine.', correct: false, feedback: 'Not quite. A piston engine is far too slow for a high-speed interceptor, and turbojets are overpowered and inefficient for a light trainer. Think about speed and efficiency requirements.' },
        { text: 'A: Turboprop, B: Piston, C: Turboprop.', correct: false, feedback: 'Try again. A turboprop is too complex for a basic trainer, a piston engine cannot power a 70-seat transport efficiently, and a turboprop cannot achieve high interceptor speeds.' }
      ],
      reward: '+15 Propulsion XP • Air Cadet badge earned'
    },
    206: {
      title: 'Air Law: Right of Way',
      intro: 'You are flying in the circuit pattern at an uncontrolled aerodrome. You are on downwind leg. Another aircraft is joining the circuit on crosswind and will converge with your path. You need to determine who has right of way and what action to take.',
      steps: ['Recall the right-of-way rules for converging aircraft.', 'Determine which aircraft has priority.', 'Take the appropriate action.'],
      question: 'Two aircraft are converging in the circuit. The general rule for converging aircraft at roughly the same level is that the aircraft on the right has right of way. But in the circuit, what takes priority?',
      choices: [
        { text: 'Aircraft already established in the circuit pattern have priority over joining aircraft.', correct: true, feedback: 'Correct. In the aerodrome traffic circuit, aircraft already established in the pattern have priority over joining aircraft. The joining aircraft must integrate without disrupting the flow. Additionally, the general rule applies: give way to aircraft on your right and avoid flying over, under, or ahead of the other aircraft.' },
        { text: 'The joining aircraft always has right of way because they are entering the pattern.', correct: false, feedback: 'Incorrect. Joining aircraft must fit into the existing pattern, not force established traffic to give way. Circuit priority belongs to aircraft already in the pattern.' },
        { text: 'Whoever is faster has right of way and can overtake.', correct: false, feedback: 'Try again. Speed does not determine right of way. In fact, overtaking aircraft must give way to the aircraft being overtaken. Circuit priority goes to established traffic.' }
      ],
      reward: '+15 Air Law XP • Air Cadet badge earned'
    },
    207: {
      title: 'Radio: Initial Call to Tower',
      intro: 'You are approaching the aerodrome for landing in a cadet training aircraft. Your callsign is "Cadet Golf Alpha Bravo" (C-GAB). You are 5 nautical miles to the north at 2,000 feet. You need to make your initial radio call to the control tower.',
      steps: ['Structure the call: who you are calling, who you are, where you are, what you want.', 'Use the correct phraseology and phonetic alphabet.', 'Listen for the tower response and read back any clearance.'],
      question: 'What is the correct structure and content of your initial call to the tower?',
      choices: [
        { text: '"Tower, Cadet Golf Alpha Bravo, five miles north at two thousand feet, request joining instructions for landing."', correct: true, feedback: 'Correct. A proper initial call follows the structure: station called (Tower), your callsign (Cadet Golf Alpha Bravo using phonetics), your position (five miles north at two thousand feet), and your request (joining instructions for landing). Clear, concise, and standard.' },
        { text: '"Hello tower, it is GAB here, I want to land, over."', correct: false, feedback: 'Not quite. This call lacks the station name, uses a truncated callsign instead of the full phonetic version, gives no position information, and uses non-standard phraseology.' },
        { text: '"Mayday Mayday, Cadet GAB, coming in to land, get out of the way."', correct: false, feedback: 'Try again. "Mayday" is a distress call for a life-threatening emergency. Using it for a routine joining call is dangerous and illegal. Use standard phraseology for a normal approach.' }
      ],
      reward: '+15 Radio XP • Air Cadet badge earned'
    },
    208: {
      title: 'Operations: The Pre-Flight Walkaround',
      intro: 'You are assigned to conduct the pre-flight inspection of a cadet training aircraft. You walk around systematically: nose and propeller, right wing and aileron, main landing gear, tail surfaces, left wing and aileron, and cockpit checks.',
      steps: ['Inspect each area systematically in order.', 'Check for damage, fluid leaks, and security of components.', 'Identify any defect and decide whether the aircraft is serviceable.'],
      question: 'During your inspection of the right wing, you notice a small dent in the leading edge and a minor oil leak near the nose. What is the correct action?',
      choices: [
        { text: 'Note both defects in the tech log, do not fly the aircraft, and report to the instructor or maintenance staff immediately.', correct: true, feedback: 'Correct. Any structural damage (dent in the leading edge) or fluid leak (oil leak) makes the aircraft unserviceable until inspected by a qualified person. You correctly grounded the aircraft, documented the defects, and reported them. Safety always comes first.' },
        { text: 'The dent looks small and the oil leak is minor — fly the sortie and report it afterwards.', correct: false, feedback: 'Incorrect. Even small dents in the leading edge can affect aerodynamic performance and structural integrity. Oil leaks can worsen in flight and cause engine failure. Never fly a defective aircraft.' },
        { text: 'Tap the dent with a screwdriver to see if it is serious, then decide.', correct: false, feedback: 'Try again. You are not a qualified maintenance inspector. Attempting to assess structural damage yourself is dangerous. Ground the aircraft and report to a professional.' }
      ],
      reward: '+15 Operations XP • Air Cadet badge earned'
    },
    209: {
      title: 'Gliding: After the Winch Launch',
      intro: 'You have just completed a winch launch in a cadet glider. You released the cable at 800 feet. The sky is clear blue with no cumulus clouds visible — meaning no obvious thermal activity. You are over the airfield.',
      steps: ['Assess your altitude and the soaring conditions.', 'Consider your options: search for lift, plan the circuit, or land.', 'Make a safe decision.'],
      question: 'You are at 800 feet with no visible thermals. What is the safest course of action?',
      choices: [
        { text: 'Fly straight ahead searching for thermals — there might be lift somewhere.', correct: false, feedback: 'Incorrect. At 800 feet you are already in the circuit entry altitude range. Searching for thermals with no visible signs risks descending too low to complete a safe circuit and landing.' },
        { text: 'Join the glider circuit pattern and prepare to land. With no visible lift, plan a safe landing rather than risk descending below circuit height.', correct: true, feedback: 'Correct. At 800 feet with no thermal signs (no cumulus, no lift markers), the safe decision is to join the circuit and land. Gliding discipline says: if you cannot find lift at a safe height, land while you still can. You can always launch again. Safety over duration.' },
        { text: 'Descend rapidly to get to the thermal layer near the ground.', correct: false, feedback: 'Try again. Descending deliberately wastes your hard-won altitude and removes your safety margin. With no lift visible, the correct action is to circuit and land.' }
      ],
      reward: '+15 Gliding XP • Air Cadet badge earned'
    },
    210: {
      title: 'Flight Sim: Read the Six-Pack',
      intro: 'You are flying a simulator exercise. Your instructor covers the outside view and asks you to fly by instruments only. You need to read the six basic flight instruments and report the aircraft attitude.',
      steps: ['Scan all six instruments in sequence.', 'Interpret the attitude indicator for pitch and bank.', 'Cross-check with airspeed, altimeter, and heading.'],
      question: 'The attitude indicator shows wings level with the horizon bar above the aircraft symbol. The altimeter shows 3,000 feet and steady. The airspeed shows 90 knots. What is the aircraft attitude?',
      choices: [
        { text: 'The aircraft is descending — the horizon above the symbol means the nose is below the horizon.', correct: false, feedback: 'Not quite. The attitude indicator shows the aircraft symbol relative to the horizon. If the horizon bar is ABOVE the symbol, the nose is ABOVE the horizon — the aircraft is climbing, not descending.' },
        { text: 'The aircraft is climbing — the horizon bar above the aircraft symbol indicates a nose-up attitude. Wings are level and the altimeter should be increasing.', correct: true, feedback: 'Correct. On the attitude indicator, the horizon bar above the aircraft symbol means the nose is above the horizon — a climb. Wings are level (no bank). The altimeter would show increasing altitude, consistent with a climb. Your instrument scan and interpretation are correct.' },
        { text: 'The aircraft is in a level turn — the offset horizon means bank.', correct: false, feedback: 'Try again. The question states wings are level (no bank indication). The horizon being above the symbol indicates pitch, not bank. Re-read the attitude indicator.' }
      ],
      reward: '+15 Flight Sim XP • Air Cadet badge earned'
    },
    211: {
      title: 'Aerodrome: Select the Active Runway',
      intro: 'You are the cadet duty officer assisting the tower. The windsock shows wind from 350° (just west of due north) at 10 knots. Your aerodrome has two runways: Runway 36 (heading 360°) and Runway 18 (heading 180°). You need to determine the active runway and circuit direction.',
      steps: ['Determine the wind direction from the windsock.', 'Match the wind to the closest runway heading.', 'Confirm the circuit direction for the active runway.'],
      question: 'With wind from 350° at 10 knots, which runway should be active and why?',
      choices: [
        { text: 'Runway 36 — aircraft should always take off and land into wind, and Runway 36 (heading 360°) is closest to the 350° wind direction.', correct: true, feedback: 'Correct. Aircraft always take off and land into wind for maximum lift and minimum ground speed. The wind is from 350°, and Runway 36 (heading 360°) is only 10° off the wind direction — a near-perfect headwind. Runway 18 would be a tailwind, which is dangerous for take-off and landing.' },
        { text: 'Runway 18 — it does not matter which direction, both are fine.', correct: false, feedback: 'Incorrect. Runway 18 means taking off and landing downwind (tailwind from behind), which increases ground speed, extends the landing distance, and is dangerous. Always use the runway closest to the wind direction.' },
        { text: 'Use whichever runway has less traffic, regardless of wind.', correct: false, feedback: 'Try again. Wind direction always determines the active runway, not traffic. Taking off or landing with a tailwind is a serious safety hazard.' }
      ],
      reward: '+15 Aerodrome XP • Air Cadet badge earned'
    },
    212: {
      title: 'Air Project: Fix the Flight Line Plan',
      intro: 'You have planned a cadet open day at the aerodrome with a flight simulator stand, a static aircraft display, and a recruiting tent. The event is open to the public. The static display is positioned next to the active runway, with only a low rope barrier between the public viewing area and the flight line.',
      steps: ['Review your project plan and risk assessment.', 'Identify the safety gap near the flight line.', 'Choose the correct mitigation.'],
      question: 'What is the most significant safety risk in your airshow open day plan, and how should you mitigate it?',
      choices: [
        { text: 'The recruiting tent might blow away in the wind — weigh it down with sandbags.', correct: false, feedback: 'Not quite. Tent stability is a minor logistics issue. The major safety concern is the public near an active runway. Think about what happens when aircraft are moving.' },
        { text: 'The public viewing area is next to the active runway with only a low rope barrier. Put up solid barriers, establish a flight line exclusion zone with cadet marshals, brief the public to stay behind the line, and coordinate with ATC to stop movements during public access.', correct: true, feedback: 'Correct. The biggest risk is uncontrolled public access near an active runway — jet blast, propeller strike, and aircraft movement are all lethal hazards. Solid barriers, a defined exclusion zone, trained marshals, a public safety brief, and ATC coordination are the correct mitigations. This is exactly what an aerodrome risk assessment should catch.' },
        { text: 'The flight simulator might overheat — bring a spare extension cable.', correct: false, feedback: 'Try again. Equipment overheating is a minor technical issue. The major risk is public safety near an active flight line — that needs barriers, marshals, and ATC coordination.' }
      ],
      reward: '+15 Project XP • Air Cadet badge earned'
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
    completeLesson.textContent = tr(completed.has(id) ? 'Air Cadet Badge Earned ✓ Review Lesson' : 'Complete Lesson + Earn Air Cadet Badge');
    scenarioPanel.classList.remove('active');
    scenarioPanel.innerHTML = '';
    playScenario.textContent = tr('Play Mini Scenario');
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
    showToast(wasComplete ? 'Reviewing ' + lesson.title : 'Air Cadet badge earned: ' + lesson.title + '!');
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
      showToast('Scenario complete: ' + lessons.find(function (item) { return item.id === id; }).title + ' Air Cadet badge earned!');
    } else {
      showToast('Try again — review the scenario clue.');
    }
  }

  function playSelectedScenario() {
    if (renderInteractiveScenario(selectedId)) return;
    const lesson = lessons.find(function (item) { return item.id === selectedId; });
    showToast(lesson.title + ' scenario: complete the challenge to earn the Air Cadet badge.');
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
    showToast('Level 2 progress reset. Start a new Air Cadet quest run.');
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
  selectLesson(201);
})();

