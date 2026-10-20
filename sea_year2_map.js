(function () {
  "use strict";

  // ──────────────────────────────────────────────────────────
  //  Phase 2 — Sea Cadet lessons
  //  12 Phase 2 modules building on Phase 1 foundations
  // ──────────────────────────────────────────────────────────
  const lessons = [
    {
      id: 301,
      short: 'Seamanship',
      title: 'Seamanship & Maritime Foundations',
      subtitle: 'Ship terminology, sea discipline, and the culture of the Sea Cadets.',
      badge: 'badge_15_sea_program.png',
      theme: ['#1a3a5c', '#2c5f8a'],
      tags: ['Core', 'Seamanship', 'Phase 2'],
      brief: 'Cadets who earned their Sea Cadet Badge now deepen their understanding of maritime life. This module covers nautical terminology (port, starboard, bow, stern, fore, aft), the parts of a ship, the ranks and rates of the naval cadet structure, sea discipline and customs, and the traditions of the Sea Cadets. Learners explore how a ship functions as a community and the responsibilities of every crew member aboard.',
      objectives: [
        'Define fundamental nautical terms: port, starboard, bow, stern, forward, aft.',
        'Identify the key parts of a ship and their functions.',
        'Describe the rank and rate structure of the Sea Cadets.',
        'Explain the principles of sea discipline and naval customs.'
      ],
      challenge: 'Seamanship challenge: identify the nautical terms for left, right, front, and back of a vessel, and explain their origins.',
      x: 50, y: 18
    },
    {
      id: 302,
      short: 'Rope Work',
      title: 'Rope Work & Knots',
      subtitle: 'Essential knots, bends, hitches, and splicing for maritime use.',
      badge: 'badge_15_sea_program.png',
      theme: ['#6b5b34', '#a08050'],
      tags: ['Practical', 'Rope Work', 'Phase 2'],
      brief: 'Rope work is the foundation of all seamanship. This module teaches cadets to tie the essential maritime knots: the reef knot (square knot), bowline, clove hitch, round turn and two half hitches, figure-of-eight, and sheet bend. Cadets learn when to use each knot, how to coil and stow rope, and the basics of whipping and splicing. The interactive scenario challenges cadets to choose the correct knot for a specific task aboard.',
      objectives: [
        'Tie a bowline and explain its primary use as a secure loop.',
        'Tie a clove hitch and identify when it is appropriate.',
        'Explain the difference between a knot, a bend, and a hitch.',
        'Coil a rope correctly for stowage and demonstrate a simple splice.'
      ],
      challenge: 'Rope work challenge: you need to secure a line to a bollard on the dock. Choose the correct knot or hitch for the job.',
      x: 75, y: 30
    },
    {
      id: 303,
      short: 'Boatwork',
      title: 'Boatwork & Pulling',
      subtitle: 'Rowing commands, boat handling, and crew coordination in pulling boats.',
      badge: 'badge_15_sea_program.png',
      theme: ['#1a3a5c', '#5dade2'],
      tags: ['Practical', 'Boatwork', 'Phase 2'],
      brief: 'Cadets learn to operate pulling boats (rowed boats) as a crew. This module covers the parts of a pulling boat, rowing commands (oars, give way together, hold water, boat your oars), the stroke and timing, boat handling under oars, and crew roles including the coxswain. The module emphasises teamwork, timing, and the coxswain commands that keep a crew pulling in unison. The interactive scenario puts cadets in the coxswain seat during a boat manoeuvre.',
      objectives: [
        'Identify the parts of a pulling boat including thwarts, oars, and rowlocks.',
        'Execute standard rowing commands as both a rower and a coxswain.',
        'Maintain stroke timing and rhythm as part of a four-person crew.',
        'Manoeuvre a pulling boat alongside a jetty using correct commands.'
      ],
      challenge: 'Boatwork challenge: as coxswain, you need to bring your pulling boat alongside the jetty safely. Give the correct sequence of commands.',
      x: 80, y: 15
    },
    {
      id: 304,
      short: 'Sea Nav',
      title: 'Maritime Navigation',
      subtitle: 'Charts, compass, bearings, and position fixing at sea.',
      badge: 'badge_06_navigation.png',
      theme: ['#1b4f72', '#5dade2'],
      tags: ['Navigation', 'Chart Work', 'Advanced'],
      brief: 'Building on Phase 1 navigation, cadets learn maritime-specific navigation. This module covers the nautical chart and its symbols, latitude and longitude, taking compass bearings from landmarks, plotting a position by bearing cross (two or three bearing fix), and dead reckoning. Cadets learn how tides and currents affect navigation and how to plot a course allowing for set and drift. The interactive scenario challenges cadets to fix their position using two bearings.',
      objectives: [
        'Read a nautical chart and identify key symbols and features.',
        'Take a compass bearing on a visible landmark.',
        'Plot a position fix using two or three compass bearings.',
        'Explain how tide and current affect a vessel course and speed.'
      ],
      challenge: 'Navigation challenge: take bearings on two landmarks and plot your position on the chart. Are you where you expected?',
      x: 88, y: 45
    },
    {
      id: 305,
      short: 'Anchoring',
      title: 'Anchoring & Mooring',
      subtitle: 'Anchor types, scope, holding ground, and safe anchoring procedures.',
      badge: 'badge_15_sea_program.png',
      theme: ['#0d2438', '#5dade2'],
      tags: ['Seamanship', 'Anchoring', 'Phase 2'],
      brief: 'Cadets learn the critical skill of anchoring a vessel safely. This module covers anchor types (Danforth, CQR, plough, admiralty), the concept of scope (ratio of anchor rode to water depth), holding ground types (sand, mud, rock, weed), the anchoring procedure, and checking that the anchor is holding. Cadets also learn mooring to buoys and the dangers of anchoring in poor holding ground. The interactive scenario tests anchoring decisions in changing conditions.',
      objectives: [
        'Identify three common anchor types and their best holding ground.',
        'Calculate the correct scope for anchoring in a given depth.',
        'Describe the procedure for letting go an anchor and checking it is holding.',
        'Explain the risks of anchoring in rock, weed, or shifting tide.'
      ],
      challenge: 'Anchoring challenge: you are anchoring in 5 metres of water. Calculate the correct scope and explain how you confirm the anchor is holding.',
      x: 62, y: 65
    },
    {
      id: 306,
      short: 'Sea Safety',
      title: 'Sea Safety & Survival',
      subtitle: 'Lifejackets, liferafts, man overboard, and abandon ship procedures.',
      badge: 'badge_08_first_aid.png',
      theme: ['#d94b4b', '#fff3ce'],
      tags: ['Safety', 'Survival', 'Phase 2'],
      brief: 'Safety at sea is the most important skill for any cadet. This module covers personal flotation devices (PFDs) and when to wear them, liferaft deployment and boarding, the man overboard (MOB) recovery procedure, abandon ship drills, and distress signals including flares and EPIRBs. Cadets learn the survival priorities in cold water and the importance of drills and preparation. The interactive scenario simulates a man overboard emergency.',
      objectives: [
        'Select and correctly fit a personal flotation device for different activities.',
        'Execute the man overboard recovery procedure including the Williamson turn.',
        'Describe the steps for deploying and boarding a liferaft.',
        'Identify the types of distress signals and when to use them.'
      ],
      challenge: 'Sea safety challenge: a crew member falls overboard. Execute the correct MOB recovery procedure and explain each step.',
      x: 20, y: 50
    },
    {
      id: 307,
      short: 'Comms',
      title: 'Maritime Communications',
      subtitle: 'VHF radio, channel usage, distress calls, and phonetic procedures.',
      badge: 'badge_07_radio_communications.png',
      theme: ['#2f6fbe', '#9ed8ff'],
      tags: ['Communication', 'VHF', 'Advanced'],
      brief: 'Cadets learn the radio communication skills essential at sea. This module covers VHF radio operation, channel allocation (Channel 16 for distress and calling, working channels), the phonetic alphabet and standard maritime phraseology, making a distress call (Mayday, Pan-Pan, Sécurité), and radio discipline. Cadets understand the critical importance of Channel 16 and proper procedure. The interactive scenario has cadets making a Mayday call.',
      objectives: [
        'Operate a VHF radio and identify the purpose of Channel 16.',
        'Construct and deliver a standard Mayday distress call.',
        'Explain the difference between Mayday, Pan-Pan, and Sécurité.',
        'Use the phonetic alphabet for clear communication of vessel names and positions.'
      ],
      challenge: 'Communications challenge: your vessel is taking on water and in grave danger. Construct and deliver the correct Mayday call.',
      x: 15, y: 22
    },
    {
      id: 308,
      short: 'Sailing',
      title: 'Sailing Fundamentals',
      subtitle: 'Points of sail, sail trim, tacking, and gybing a dinghy.',
      badge: 'badge_15_sea_program.png',
      theme: ['#2c5f8a', '#85c1e9'],
      tags: ['Sailing', 'Practical', 'Phase 2'],
      brief: 'Cadets learn the fundamentals of sailing a dinghy. This module covers the points of sail (close-hauled, close reach, beam reach, broad reach, run), sail trim and how to read telltales, tacking (turning through the wind), gybing (turning away from the wind), and the roles of helm and crew. Cadets understand how the wind drives a sailboat and how to harness it across all points of sail. The interactive scenario tests sailing decision-making.',
      objectives: [
        'Name and identify the five main points of sail.',
        'Trim a sail correctly for a given point of sail using telltales.',
        'Execute a tack and a gybe safely with correct crew commands.',
        'Explain the roles of helm and crew in a two-person dinghy.'
      ],
      challenge: 'Sailing challenge: you are sailing close-hauled and need to turn through the wind to the opposite tack. Execute the correct manoeuvre.',
      x: 38, y: 10
    },
    {
      id: 309,
      short: 'Tides',
      title: 'Tides & Currents',
      subtitle: 'Tidal ranges, tide tables, current effects, and tidal planning.',
      badge: 'badge_15_sea_program.png',
      theme: ['#1a3a5c', '#aed6f1'],
      tags: ['Meteorology', 'Tides', 'Phase 2'],
      brief: 'Cadets learn to work with the tides, a critical skill for any mariner. This module covers the causes of tides (gravity of the moon and sun), spring and neap tides, reading tide tables, calculating tidal height at a given time, and how tidal currents affect navigation and boat handling. Cadets learn to plan a passage accounting for tide times and heights, including knowing when to enter or leave a harbour with limited water depth.',
      objectives: [
        'Explain the difference between spring and neap tides and their causes.',
        'Read a tide table and determine high and low water times and heights.',
        'Calculate the tidal height at a specific time using the rule of twelfths.',
        'Plan a harbour entry accounting for tidal depth and current direction.'
      ],
      challenge: 'Tides challenge: you need to enter a harbour with a charted depth of 1.0 metre and your boat draws 1.5 metres. Use the tide table to determine when entry is safe.',
      x: 85, y: 62
    },
    {
      id: 310,
      short: 'Sea First Aid',
      title: 'Maritime First Aid',
      subtitle: 'Marine-specific injuries, hypothermia, and casualty handling at sea.',
      badge: 'badge_08_first_aid.png',
      theme: ['#d94b4b', '#f5c84c'],
      tags: ['Safety', 'First Aid', 'Advanced'],
      brief: 'Building on Phase 1 first aid, cadets learn maritime-specific medical skills. This module covers hypothermia and cold water shock (the biggest danger at sea), treating cuts and injuries common aboard (falls, rope burns, crush injuries), seasickness management, casualty handling in a confined or moving vessel, and preparing a casualty for evacuation by lifeboat or helicopter. The interactive scenario tests a cold water rescue.',
      objectives: [
        'Recognise and treat hypothermia using the correct rewarming procedure.',
        'Explain the dangers of cold water shock and how to prevent it.',
        'Manage a casualty in a moving vessel including securing them safely.',
        'Prepare a casualty for helicopter evacuation including correct signals.'
      ],
      challenge: 'First aid challenge: a crew member has fallen into cold water and is showing signs of hypothermia. Apply the correct treatment.',
      x: 30, y: 75
    },
    {
      id: 311,
      short: 'Sea Leadership',
      title: 'Watch Keeping & Ship Leadership',
      subtitle: 'Watch systems, helm duties, and leading a boat crew at sea.',
      badge: 'badge_05_leadership.png',
      theme: ['#0d2438', '#85c1e9'],
      tags: ['Leadership', 'Watch Keeping', 'Advanced'],
      brief: 'Cadets take on leadership roles aboard a vessel. This module covers the watch system (how a crew is organised into watches for continuous operation), the duties of a watch keeper and helmsman, giving clear helm orders, maintaining a navigational watch, and leading a boat crew in varying conditions. Cadets build on Phase 1 leadership to command a small vessel crew, making safety decisions and maintaining morale during long periods at sea.',
      objectives: [
        'Explain the watch system and how a crew is divided into watches.',
        'Give and execute standard helm orders (port, starboard, steady, midships).',
        'Maintain a proper navigational watch including position monitoring.',
        'Lead a boat crew in deteriorating conditions with clear, calm commands.'
      ],
      challenge: 'Leadership challenge: you are the watch keeper and the weather is deteriorating. Decide and communicate the correct actions to keep the vessel and crew safe.',
      x: 50, y: 80
    },
    {
      id: 312,
      short: 'Sea Project',
      title: 'Maritime Community Project',
      subtitle: 'Planning and leading a Sea Cadet community engagement activity.',
      badge: 'badge_12_community_service.png',
      theme: ['#1a3a5c', '#f5c84c'],
      tags: ['Community', 'Leadership', 'Project'],
      brief: 'The capstone module of Phase 2 Sea Cadet training. Cadets plan and lead a maritime community event — such as a boating safety awareness day, a harbour clean-up by boat, a Sea Cadet open day with boat trips, or supporting a local regatta. This module covers project planning, risk assessment for water-based activities, coordinating with harbour authorities, and communicating with civilian organisations. It ties together seamanship, leadership, and citizenship skills from both phases.',
      objectives: [
        'Write a project plan for a maritime community event with tasks and timelines.',
        'Conduct a risk assessment for a water-based public activity.',
        'Coordinate professionally with harbour and coastguard authorities.',
        'Lead a debrief and reflect on the activity impact.'
      ],
      challenge: 'Project challenge: your boating safety open day has a safety gap near the water. Identify the risk and choose the correct mitigation.',
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
  const lessonLaunch = document.getElementById('lessonLaunch');
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
  const STORAGE_KEY = 'cadetMapDemoSeaYear2Completed';
  const PHASE_COMPLETE_KEY = 'cadetMapDemoSeaYear2PhaseComplete';
  let selectedId = 301;
  let completed = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'));
  totalCount.textContent = lessons.length;

  // ──────────────────────────────────────────────────────────
  //  Interactive scenarios (one per lesson)
  // ──────────────────────────────────────────────────────────
  const scenarioData = {
    301: {
      title: 'Seamanship: Know Your Ship',
      intro: 'Your boating instructor points to different parts of the training vessel and asks you to identify them using proper nautical terminology. You need to correctly name the left side, right side, front, and back of the vessel.',
      steps: ['Recall the four fundamental directional terms.', 'Match each term to the correct part of the vessel.', 'Explain the origin of the terms.'],
      question: 'What are the nautical terms for the left side, right side, front, and back of a vessel?',
      choices: [
        { text: 'Port (left), Starboard (right), Bow (front), Stern (back).', correct: true, feedback: 'Correct. Port is the left side (historically the side tied to the dock), starboard is the right (from the steering board side), the bow is the front, and the stern is the back. These terms are universal in maritime operations and prevent the confusion that "left" and "right" can cause when facing different directions.' },
        { text: 'Left, right, front, back — the same as on land.', correct: false, feedback: 'Incorrect. At sea, "left" and "right" are ambiguous because they depend on which way you are facing. The nautical terms port, starboard, bow, and stern are always relative to the vessel itself, preventing confusion.' },
        { text: 'North, South, East, West — directions are always compass-based.', correct: false, feedback: 'Try again. Compass directions describe where the vessel is heading, not parts of the vessel. The correct terms are port, starboard, bow, and stern — relative to the ship.' }
      ],
      reward: '+15 Seamanship XP • Sea Cadet badge earned'
    },
    302: {
      title: 'Rope Work: Secure to the Bollard',
      intro: 'You are bringing your boat alongside the jetty and need to secure a mooring line to a bollard on the dock. You have a rope and need to choose the correct knot or hitch to secure the boat safely and be able to release it quickly when needed.',
      steps: ['Consider what the knot must do: hold under load, be easy to tie and untie.', 'Select the correct knot or hitch for a bollard.', 'Explain why it is the right choice.'],
      question: 'Which knot or hitch is most appropriate for securing a mooring line to a bollard on a jetty?',
      choices: [
        { text: 'A reef knot (square knot) — it joins two ropes together neatly.', correct: false, feedback: 'Incorrect. A reef knot is for joining two ropes of equal thickness, not for securing a line to a fixed object. It can also slip under variable load and is not suitable for mooring.' },
        { text: 'A round turn and two half hitches — it provides a secure hold on a bollard or post, is easy to tie under load, and can be released quickly.', correct: true, feedback: 'Correct. The round turn and two half hitches is the ideal knot for securing a mooring line to a bollard. The round turn takes the load, the two half hitches lock it in place, and it can be tied and released even under tension. It is a fundamental seamanship knot.' },
        { text: 'A bowline — it makes a secure loop that does not slip.', correct: false, feedback: 'Not quite. A bowline is an excellent knot for making a fixed loop, but for securing a line to a bollard, the round turn and two half hitches is more appropriate because it is easier to adjust and release under load.' }
      ],
      reward: '+15 Rope Work XP • Sea Cadet badge earned'
    },
    303: {
      title: 'Boatwork: Coming Alongside',
      intro: 'You are the coxswain of a four-person pulling boat approaching a jetty. You need to bring the boat alongside safely, control your speed, and give the correct commands so your crew rows in unison and the boat arrives gently at the jetty.',
      steps: ['Assess your approach angle and speed.', 'Give the correct commands to slow and stop the boat.', 'Direct the crew to boat their oars and secure the line.'],
      question: 'As you approach the jetty and need to slow the boat, what is the correct sequence of coxswain commands?',
      choices: [
        { text: '"Give way together" (keep rowing at full speed) until you hit the jetty, then jump out.', correct: false, feedback: 'Incorrect. Rowing at full speed into a jetty will cause a collision and potential injury. You must control your approach speed with proper commands well before reaching the jetty.' },
        { text: '"Hold water" to slow the boat, then "oars" to stop rowing, "boat your oars" to stow them, and direct the bowman to secure the line to the jetty.', correct: true, feedback: 'Correct. "Hold water" uses the oars as brakes to slow the boat, "oars" stops the rowing stroke, "boat your oars" stows the oars safely, and the bowman secures the mooring line. This sequence brings the boat alongside safely and under control — textbook coxswainship.' },
        { text: '"Stop!" shouted repeatedly until someone grabs the jetty.', correct: false, feedback: 'Try again. "Stop" is not a standard coxswain command and shouting does not control the boat. Use proper commands: "hold water" to brake, then "oars" and "boat your oars".' }
      ],
      reward: '+15 Boatwork XP • Sea Cadet badge earned'
    },
    304: {
      title: 'Navigation: Fix Your Position',
      intro: 'You are navigating a small vessel along a coastline. You can see two landmarks: a lighthouse bearing 045° from your position and a church spire bearing 310°. You have a chart, a compass, and a pencil. You need to fix your position.',
      steps: ['Take a compass bearing on the lighthouse.', 'Take a compass bearing on the church spire.', 'Plot both bearings on the chart — where they cross is your position.'],
      question: 'What is this navigation technique called, and why is it effective?',
      choices: [
        { text: 'A two-bearing fix (cross bearing fix) — the intersection of two or more position lines on the chart gives your position, and using a third bearing provides a check for accuracy.', correct: true, feedback: 'Correct. A cross-bearing fix is the most common visual navigation method at sea. You take bearings on two or more known landmarks, plot them as position lines on the chart, and their intersection is your position. A third bearing creates a "triangle of error" (small triangle) that shows the accuracy of your fix.' },
        { text: 'Dead reckoning — estimating your position from your last known position, heading, and speed.', correct: false, feedback: 'Not quite. Dead reckoning estimates position by projecting from a known start point using heading and speed. Taking bearings on landmarks to determine your actual position is a fix, not dead reckoning.' },
        { text: 'GPS — using satellite signals to determine position automatically.', correct: false, feedback: 'Try again. While GPS is used at sea, this question describes a visual navigation technique using bearings on landmarks. That is a cross-bearing fix, not GPS.' }
      ],
      reward: '+15 Navigation XP • Sea Cadet badge earned'
    },
    305: {
      title: 'Anchoring: The Right Scope',
      intro: 'You are anchoring your training vessel in a sheltered bay. The water depth is 5 metres. The recommended scope for a chain-and-rope rode in calm conditions is 5:1 (five times the depth). You need to calculate the correct scope and confirm the anchor is holding.',
      steps: ['Calculate the correct scope for the depth.', 'Let out the correct amount of rode.', 'Confirm the anchor is holding by checking for drag.'],
      question: 'What is the correct amount of anchor rode to let out, and how do you confirm the anchor is holding?',
      choices: [
        { text: 'Let out 5 metres of rode — equal to the water depth.', correct: false, feedback: 'Incorrect. Equal scope to depth (1:1) is far too short. The anchor needs a shallow angle to dig in and hold. At 1:1 scope, the anchor will likely drag because the pull is almost vertical.' },
        { text: 'Let out 25 metres of rode (5:1 scope: 5 metres depth × 5 = 25 metres). Confirm the anchor is holding by taking transits (two objects in line) and watching for any change in their alignment, which would indicate dragging.', correct: true, feedback: 'Correct. 5:1 scope means 5 × 5 metres = 25 metres of rode. This gives the anchor the shallow angle it needs to dig in and hold. To confirm it is holding, you take transits — two fixed objects aligned on shore. If they stay aligned, you are holding; if they shift, you are dragging. This is proper seamanship.' },
        { text: 'Let out 100 metres of rode to be absolutely safe.', correct: false, feedback: 'Not quite. While more scope generally means more holding power, 100 metres (20:1 scope) is excessive for 5 metres of water in calm conditions. It creates a large swinging circle and could put you aground or foul other boats. The recommended 5:1 scope (25 metres) is correct.' }
      ],
      reward: '+15 Anchoring XP • Sea Cadet badge earned'
    },
    306: {
      title: 'Sea Safety: Man Overboard',
      intro: 'You are aboard a training vessel when a crew member loses their balance and falls overboard on the starboard side. They are wearing a lifejacket. The helmsman needs to execute the correct recovery procedure immediately.',
      steps: ['Shout "Man overboard!" and throw a lifebuoy.', 'The helmsman executes the recovery turn.', 'Maintain visual contact and recover the casualty.'],
      question: 'What is the correct immediate procedure when a crew member falls overboard?',
      choices: [
        { text: 'Shout "Man overboard, starboard side!", throw a lifebuoy and marker, note the time and position, and the helmsman immediately executes a Williamson turn or crash stop to return to the casualty while a spotter maintains continuous visual contact.', correct: true, feedback: 'Correct. The immediate actions are: shout the alarm with the side, throw a lifebuoy and danbuoy/marker, note time and position for navigation, and the helmsman turns back (Williamson turn for larger vessels, crash stop or quick turn for small boats). A dedicated spotter never takes their eyes off the casualty. Speed and organisation save lives.' },
        { text: 'Jump in after them to help — two people are better than one.', correct: false, feedback: 'Incorrect. Jumping in creates a second casualty and two people to rescue. Never enter the water for a MOB. Throw flotation, alert the crew, and recover from the vessel.' },
        { text: 'Stop the boat and wait for the person to swim back to the vessel.', correct: false, feedback: 'Try again. In cold water, a person quickly loses the ability to swim. You must actively recover them with the vessel — throw flotation, turn back, and recover. Do not rely on them swimming to you.' }
      ],
      reward: '+15 Sea Safety XP • Sea Cadet badge earned'
    },
    307: {
      title: 'Communications: Make the Mayday Call',
      intro: 'Your training vessel is taking on water faster than the bilge pumps can handle. You are in grave and imminent danger. You have a VHF radio and need to make a Mayday distress call on Channel 16. Your vessel name is "Cadet Adventurer", you have 6 persons aboard, and your position is 5 miles south of South Head.',
      steps: ['Set the radio to Channel 16.', 'Transmit the Mayday call in the correct format.', 'Repeat until acknowledged by the coastguard or another vessel.'],
      question: 'What is the correct format for a Mayday distress call?',
      choices: [
        { text: '"Mayday, Mayday, Mayday. This is Cadet Adventurer, Cadet Adventurer, Cadet Adventurer. Mayday. Position: five miles south of South Head. Taking on water. Six persons aboard. Require immediate assistance. Over."', correct: true, feedback: 'Correct. A Mayday call follows a strict format: the distress signal "Mayday" three times, the vessel name three times, "Mayday" again, then your position, the nature of distress, number of persons aboard, and what assistance you need, ending with "Over". This format ensures the coastguard gets all critical information quickly and clearly.' },
        { text: '"Hello, we are sinking, please help, we are somewhere near South Head."', correct: false, feedback: 'Incorrect. This call lacks the Mayday distress signal, the vessel identification, exact position, number of persons, and structured format. The coastguard may not recognise it as a distress call or may not have enough information to respond.' },
        { text: '"Pan-Pan, Pan-Pan, this is Cadet Adventurer, we have a small leak, over."', correct: false, feedback: 'Try again. "Pan-Pan" is an urgency call for a situation that is not yet life-threatening. A vessel taking on water faster than pumps can handle is a grave and imminent danger — that requires a Mayday, not a Pan-Pan.' }
      ],
      reward: '+15 Communications XP • Sea Cadet badge earned'
    },
    308: {
      title: 'Sailing: Tack Through the Wind',
      intro: 'You are the helm of a two-person dinghy sailing close-hauled on a port tack (wind coming over the port side). You need to turn the boat through the wind to change to a starboard tack. Your crew is ready on the jib sheet.',
      steps: ['Check the area is clear and warn the crew.', 'Turn the helm toward the wind (push the tiller away).', 'As the bow crosses the wind, the sails flap and cross over — the crew swaps the jib sheet.'],
      question: 'What is this manoeuvre called, and what is the correct helm action?',
      choices: [
        { text: 'A tack — you push the tiller away from the sail (toward the wind) to turn the bow through the wind, and the crew swaps the jib sheet to the new side as the sails cross over.', correct: true, feedback: 'Correct. Tacking is turning the bow through the wind to change tacks. You push the tiller away (toward the wind), the bow turns through the wind, the sails momentarily flap and cross to the other side, and the crew releases the old jib sheet and pulls in the new one. The boat is now on a starboard tack. Clean, coordinated, and safe.' },
        { text: 'A gybe — you pull the tiller toward you to turn away from the wind.', correct: false, feedback: 'Not quite. A gybe turns the stern through the wind (turning away from the wind), not the bow. You described turning the bow through the wind, which is a tack. Gybes are more dangerous because the sail swings across forcefully.' },
        { text: 'A capsize — you turn too far and the boat tips over.', correct: false, feedback: 'Try again. A capsize is an accident, not a manoeuvre. Turning the bow through the wind to change tack is a controlled manoeuvre called a tack.' }
      ],
      reward: '+15 Sailing XP • Sea Cadet badge earned'
    },
    309: {
      title: 'Tides: Can You Enter the Harbour?',
      intro: 'You need to enter a harbour where the charted depth at the entrance is 1.0 metre. Your training vessel draws 1.5 metres (needs 1.5 metres of water to float). The tide table shows that high water is at 14:00 with a height of 3.2 metres above chart datum, and low water is at 08:00 with a height of 0.4 metres.',
      steps: ['Calculate the minimum water depth you need.', 'Determine the tide height needed at the entrance.', 'Use the tide table to find when the water is deep enough.'],
      question: 'What minimum tide height do you need to safely enter the harbour, and when can you enter?',
      choices: [
        { text: 'You need 1.5 metres total depth. The charted depth is 1.0 metre, so you need at least 0.5 metres of tide height above chart datum. With high water at 3.2 metres, you can enter well before high water — the tide is high enough from mid-tide onwards. The safest entry is around high water at 14:00.', correct: true, feedback: 'Correct. Your boat needs 1.5 metres. The chart shows 1.0 metre at datum, so you need 0.5 metres of tide above datum. Since the tide rises to 3.2 metres at high water, you have plenty of depth. You can enter from when the tide reaches 0.5 metres (well before high water), but the safest and easiest entry is at or near high water (14:00) when there is maximum clearance. Always leave a safety margin.' },
        { text: 'You need 1.0 metres — that is what the chart says, so you can enter at any time.', correct: false, feedback: 'Incorrect. The charted depth of 1.0 metres is at chart datum (lowest astronomical tide). At low water (0.4 metres tide), the actual depth is only 1.4 metres — less than your 1.5 metre draft. You would run aground. You must account for the tide.' },
        { text: 'You need 3.2 metres — wait for high water and enter exactly at 14:00 only.', correct: false, feedback: 'Not quite. While entering at high water is safest, you do not need 3.2 metres of tide — you only need 0.5 metres above datum. You have a window of several hours when the tide is high enough, not just a single moment.' }
      ],
      reward: '+15 Tides XP • Sea Cadet badge earned'
    },
    310: {
      title: 'First Aid: Cold Water Casualty',
      intro: 'A crew member has fallen into cold water (approximately 10°C) and been recovered aboard after 10 minutes. They are conscious but shivering violently, pale, confused, and their hands are clumsy. They were wearing a lifejacket. You need to treat them for hypothermia.',
      steps: ['Recognise the signs of hypothermia.', 'Remove wet clothing and protect from wind.', 'Begin gentle rewarming and monitor the casualty.'],
      question: 'What is the correct treatment for a conscious crew member showing signs of hypothermia after cold water immersion?',
      choices: [
        { text: 'Remove wet clothing, dry them, wrap them in blankets or a survival bag including the head, give warm (not hot) sweet drinks if fully conscious, and monitor breathing. Keep them horizontal and avoid sudden movement.', correct: true, feedback: 'Correct. For a conscious hypothermia casualty: remove wet clothing, dry them, insulate with blankets/survival bag (head included), give warm sweet drinks if fully alert, keep horizontal, and monitor breathing. Gentle rewarming is key — do not warm them too fast. Avoid sudden movement which can trigger dangerous blood pressure drops. Get medical help.' },
        { text: 'Give them a hot shower immediately to warm up fast.', correct: false, feedback: 'Incorrect. Rapid rewarming like a hot shower can cause dangerous blood pressure drops (after-drop) as cold blood from the extremities returns to the core. Hypothermia casualties must be rewarmed gently and gradually.' },
        { text: 'Tell them to do star jumps to generate body heat.', correct: false, feedback: 'Try again. Exercise increases blood flow from cold extremities to the core, causing a dangerous temperature drop. A hypothermia casualty must rest, stay horizontal, and be rewarmed gently. Never exercise them.' }
      ],
      reward: '+15 First Aid XP • Sea Cadet badge earned'
    },
    311: {
      title: 'Leadership: The Deteriorating Watch',
      intro: 'You are the watch keeper aboard a training vessel. The wind has increased from 10 to 25 knots in the last 30 minutes, the sea state is building, visibility is dropping, and some of your junior cadets are looking nervous. You need to make and communicate the right decisions to keep the vessel and crew safe.',
      steps: ['Assess the conditions and the crew state.', 'Make the appropriate safety decisions.', 'Communicate clearly and maintain morale.'],
      question: 'What is the correct sequence of actions as the watch keeper in deteriorating conditions?',
      choices: [
        { text: 'Press on at full speed to reach harbour faster — speed is safety.', correct: false, feedback: 'Incorrect. Increasing speed in building seas and strong wind increases the risk of broaching, crew injury, and equipment failure. The correct response is to reduce speed, secure the vessel, and prioritise safety over schedule.' },
        { text: 'Reduce speed and sail area (reef or change to engine), ensure all crew are wearing lifejackets and are clipped on, brief the crew calmly on what is happening and what to do, call the skipper, and check the vessel is secure for heavy weather. Maintain a calm, confident manner to reassure junior cadets.', correct: true, feedback: 'Correct. As watch keeper you prioritise safety: reduce speed and sail, ensure lifejackets and safety harnesses, brief the crew calmly, alert the skipper, and secure the vessel. Your calm, clear communication maintains morale and ensures junior cadets feel safe. This is exactly what a good watch keeper does in deteriorating conditions.' },
        { text: 'Tell the junior cadets to hide below and deal with it yourself — no need to worry them.', correct: false, feedback: 'Try again. Excluding the crew increases fear and prevents them from helping. A good leader briefs the crew calmly, assigns roles, and keeps everyone informed and involved. Hiding information undermines confidence and safety.' }
      ],
      reward: '+15 Leadership XP • Sea Cadet badge earned'
    },
    312: {
      title: 'Sea Project: Fix the Water Safety Plan',
      intro: 'You have planned a Sea Cadet boating safety open day at the harbour. Activities include free dinghy rides for the public, a knot-tying stand, and a lifejacket demonstration. The dinghy loading area is at the harbour edge with a low wall and no barriers, and members of the public including children will be boarding and disembarking boats throughout the day.',
      steps: ['Review your project plan and risk assessment.', 'Identify the safety gap at the water edge.', 'Choose the correct mitigation.'],
      question: 'What is the most significant safety risk in your boating safety open day plan, and how should you mitigate it?',
      choices: [
        { text: 'The knot-tying stand might run out of rope — bring extra lengths.', correct: false, feedback: 'Not quite. Running out of rope is a minor supply issue. The major safety concern is the public at the water edge during boarding. Think about what could happen near the water.' },
        { text: 'The public boarding dinghies at the harbour edge with no barriers, including children. Put up solid barriers along the water edge, station cadet marshals at the loading point, issue lifejackets to all passengers before boarding, brief each group on boarding procedure, and have a safety boat standing by in the water.', correct: true, feedback: 'Correct. The biggest risk is uncontrolled public access to deep water at the harbour edge — especially children. Solid barriers, trained marshals, mandatory lifejackets, safety briefings, and a dedicated safety boat are the correct mitigations. A water-based public event requires multiple layers of water safety. This is exactly what a maritime risk assessment should catch.' },
        { text: 'The weather might be warm — bring suncream for the visitors.', correct: false, feedback: 'Try again. Sun protection is a minor comfort issue. The major risk is public safety at the water edge during boat boarding — that needs barriers, marshals, lifejackets, and a safety boat.' }
      ],
      reward: '+15 Project XP • Sea Cadet badge earned'
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
    completeLesson.textContent = tr(completed.has(id) ? 'Sea Cadet Badge Earned ✓ Review Lesson' : 'Complete Lesson + Earn Sea Cadet Badge');
    scenarioPanel.classList.remove('active');
    scenarioPanel.innerHTML = '';
    playScenario.textContent = tr('Play Mini Scenario');
    renderLaunchPanel(id);
    document.querySelectorAll('.pin').forEach(function (pin) {
      pin.classList.toggle('active', Number(pin.dataset.id) === id);
    });
    document.querySelectorAll('.badge-cell').forEach(function (cell) {
      cell.classList.toggle('active', Number(cell.dataset.id) === id);
    });
  }

  /* Full-module launch panel (currently for lesson 308 — Sailing Fundamentals).
     Links the map card to the dedicated HTML5 module and the diagnostic game. */
  function renderLaunchPanel(id) {
    if (!lessonLaunch) return;
    if (id === 301) {
      lessonLaunch.innerHTML =
        '<div class="launch-card">' +
          '<div class="launch-head">' +
            '<span class="launch-ico" aria-hidden="true">\u2693</span>' +
            '<div>' +
              '<strong>' + tr('Full Seamanship Module') + '</strong>' +
              '<p>' + tr('Go beyond the mini-scenario: 7 chapters, an interactive deck-orientation trainer, and 6 practical checks \u2014 then test yourself and see what to learn next.') + '</p>' +
            '</div>' +
          '</div>' +
          '<div class="launch-actions">' +
            '<a class="primary-btn" href="seamanship_training.html">' + tr('Launch Seamanship & Maritime Foundations') + '</a>' +
            '<a class="ghost-btn" href="seamanship_diagnostic.html">' + tr("Ship's Muster \u2014 Diagnostic Game") + '</a>' +
          '</div>' +
        '</div>';
    } else if (id === 308) {
      lessonLaunch.innerHTML =
        '<div class="launch-card">' +
          '<div class="launch-head">' +
            '<span class="launch-ico" aria-hidden="true">\u26f5</span>' +
            '<div>' +
              '<strong>' + tr('Full Sailing Module') + '</strong>' +
              '<p>' + tr('Go beyond the mini-scenario: 7 chapters, an interactive points-of-sail simulator, and 6 practical checks \u2014 then test yourself and see what to learn next.') + '</p>' +
            '</div>' +
          '</div>' +
          '<div class="launch-actions">' +
            '<a class="primary-btn" href="sailing_training.html">' + tr('Launch Sailing Fundamentals') + '</a>' +
            '<a class="ghost-btn" href="sailing_diagnostic.html">' + tr('Chart Your Course \u2014 Diagnostic Game') + '</a>' +
          '</div>' +
        '</div>';
    } else {
      lessonLaunch.innerHTML = '';
    }
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
    showToast(wasComplete ? 'Reviewing ' + lesson.title : 'Sea Cadet badge earned: ' + lesson.title + '!');
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
      showToast('Scenario complete: ' + lessons.find(function (item) { return item.id === id; }).title + ' Sea Cadet badge earned!');
    } else {
      showToast('Try again — review the scenario clue.');
    }
  }

  function playSelectedScenario() {
    if (renderInteractiveScenario(selectedId)) return;
    const lesson = lessons.find(function (item) { return item.id === selectedId; });
    showToast(lesson.title + ' scenario: complete the challenge to earn the Sea Cadet badge.');
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
    showToast('Phase 2 progress reset. Start a new Sea Cadet quest run.');
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
  selectLesson(301);
})();

