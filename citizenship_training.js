/* ============================================================
   CITIZENSHIP & TEAMWORK TRAINING COMMAND — citizenship_training.js
   Maple Defender-style dashboard — 6 citizenship/teamwork missions
   + Teamwork Arena interactive game
   ============================================================ */
(function () {
  "use strict";

  // ==========================================================
  // STORAGE KEYS
  // ==========================================================
  const SK = {
    progress: "citizenshipProgress_v1",
    sitreps: "citizenshipSitreps_v1",
    wrongAttempts: "citizenshipWrong_v1",
    streak: "citizenshipStreak_v1",
    bestStreak: "citizenshipBestStreak_v1",
    readArticles: "citizenshipRead_v1",
    arenaGame: "citizenshipArenaGame_v1",
  };
  const MAP_PROGRESS_KEY = "cadetMapDemoCompleted";
  const CITIZENSHIP_BADGE_ID = 4;

  // ==========================================================
  // RANKS — Citizenship & community service cadet rank ladder
  // ==========================================================
  const RANKS = [
    { id: 0, name: "Citizen Recruit",      icon: "🤝", xp: 0,    callsign: "CITIZEN-1" },
    { id: 1, name: "Citizen Cadet",        icon: "🌱", xp: 300,  callsign: "CADCIT-1" },
    { id: 2, name: "Team Cadet",           icon: "👥", xp: 700,  callsign: "TEAM-1" },
    { id: 3, name: "Section Leader",       icon: "📋", xp: 1200, callsign: "SECT-1" },
    { id: 4, name: "Community Cadet",      icon: "🌍", xp: 1800, callsign: "COMMS-1" },
    { id: 5, name: "Service Cadet",        icon: "🏅", xp: 2500, callsign: "SERV-1" },
  ];

  // ==========================================================
  // TOOLS — reference materials cadets "open" during missions
  // ==========================================================
  const TOOLS = [
    { id: "values_handbook",       icon: "📖", label: "Values Handbook" },
    { id: "standards_card",        icon: "⚖️", label: "Standards Card" },
    { id: "teamwork_playbook",     icon: "🤝", label: "Teamwork Playbook" },
    { id: "comms_guide",           icon: "🗣️", label: "Comms Guide" },
    { id: "community_service_guide", icon: "🌍", label: "Community Service Guide" },
    { id: "conflict_resolution",   icon: "🕊️", label: "Conflict Resolution Kit" },
    { id: "leadership_manual",     icon: "📋", label: "Leadership Manual" },
    { id: "resource_tracker",      icon: "⚖️", label: "Resource Tracker" },
    { id: "morale_meter",          icon: "💪", label: "Morale Meter" },
    { id: "reflection_journal",    icon: "📝", label: "Reflection Journal" },
  ];

  // ==========================================================
  // MISSIONS — 6 Citizenship & Teamwork modules
  // ==========================================================
  const MISSIONS = [
    {
      id: "values_standards",
      order: 1,
      tag: "C101",
      icon: "📖",
      title: "Aim of the Canadian Cadet Program",
      desc: "Learn the aim of the Canadian Cadet Program and the values that define a cadet in the community.",
      xp: 100,
      brief: "The aim of the Canadian Cadet Program is to develop in youth the attributes of good citizenship and leadership, to promote physical fitness, and to stimulate the interest of youth in the sea, land, and air activities of the Canadian Armed Forces. Cadets are also guided by the values of respect, dignity, fairness, and inclusion. Understanding these principles is the foundation of citizenship. Learn to recognise them in action and apply them to your daily cadet life.",
      scene: "values_board",
      chapters: ["Identify the aim of the Canadian Cadet Program", "Apply values to scenarios", "Recognise standards in action", "Reflect on personal values"],
      tasks: [
        {
          type: "select",
          tool: "values_handbook",
          title: "The Aim of the Canadian Cadet Program",
          prompt: "Which statement correctly describes the aim of the Canadian Cadet Program?",
          options: [
            "To develop in youth the attributes of good citizenship and leadership, promote physical fitness, and stimulate interest in the sea, land, and air activities of the Canadian Armed Forces",
            "Speed, strength, aggression, dominance, winning, and competition",
            "Looking good, being popular, getting badges, impressing officers, avoiding work, and having fun",
          ],
          expected: "To develop in youth the attributes of good citizenship and leadership, promote physical fitness, and stimulate interest in the sea, land, and air activities of the Canadian Armed Forces",
          proof: "Correct — those six values are the moral foundation every cadet is expected to uphold.",
        },
        {
          type: "select",
          tool: "values_handbook",
          title: "Apply Values to a Scenario",
          prompt: "A teammate is struggling with a task and the section is behind schedule. What does good citizenship and leadership look like here?",
          options: [
            "Pause your own work to help them catch up, even if it means finishing later yourself",
            "Ignore them and focus only on finishing your own part first",
            "Complain to the officer that they are slowing everyone down",
          ],
          expected: "Pause your own work to help them catch up, even if it means finishing later yourself",
          proof: "Selfless commitment means putting the team's success ahead of your own convenience — well done.",
        },
        {
          type: "select",
          tool: "standards_card",
          title: "Recognise Standards in Action",
          prompt: "Which behaviour best demonstrates respect, dignity, fairness, and inclusion in a cadet setting?",
          options: [
            "Listening when a teammate speaks, valuing their input, and treating everyone fairly regardless of background",
            "Talking over people you disagree with to make your point heard",
            "Only being polite to cadets who outrank you",
          ],
          expected: "Listening when a teammate speaks, valuing their input, and treating everyone fairly regardless of background",
          proof: "Respect for others means fairness and active listening for everyone — you captured it perfectly.",
        },
        {
          type: "note",
          tool: "reflection_journal",
          title: "Reflect on Personal Values",
          prompt: "Write a short note about which cadet value you find most important and why. Include the words 'value', 'team', and 'respect'.",
          keywords: ["value", "team", "respect"],
          proof: "You connected a personal value to the team ethos — that is the mark of a thoughtful citizen-cadet.",
        },
      ],
    },
    {
      id: "respectful_participation",
      order: 2,
      tag: "C201",
      icon: "🗣️",
      title: "Respectful Participation & Communication",
      desc: "Practise active listening, inclusive communication, and respectful participation in group settings.",
      xp: 100,
      brief: "Good citizenship starts with how you communicate. Learn to participate respectfully in discussions — listen actively, include everyone, share ideas constructively, and disagree without being disagreeable. These skills make you a better teammate and community member.",
      scene: "discussion_circle",
      chapters: ["Active listening basics", "Inclusive communication", "Constructive disagreement", "Group participation practice"],
      tasks: [
        {
          type: "select",
          tool: "comms_guide",
          title: "Active Listening Basics",
          prompt: "What are the key elements of active listening?",
          options: [
            "Making eye contact, nodding, not interrupting, and summarising what the other person said",
            "Thinking about what you will say next while they are talking",
            "Checking your phone occasionally so you do not seem too intense",
          ],
          expected: "Making eye contact, nodding, not interrupting, and summarising what the other person said",
          proof: "Active listening is about full attention and showing you value the speaker — excellent.",
        },
        {
          type: "type",
          tool: "comms_guide",
          title: "Inclusive Communication",
          prompt: "A quieter cadet has not spoken during a planning discussion. Type the best way to invite their input (start with the word 'We').",
          expected: ["We would love to hear your thoughts", "We would value your input", "We would like to hear your perspective", "We would love your input"],
          proof: "Inviting quieter members in shows inclusive leadership — a key citizenship skill.",
        },
        {
          type: "select",
          tool: "comms_guide",
          title: "Constructive Disagreement",
          prompt: "You disagree with a teammate's plan. What is the most respectful way to handle it?",
          options: [
            "Acknowledge their idea, share your concern clearly, and propose an alternative for the group to consider",
            "Tell everyone their idea is wrong and yours is better",
            "Stay quiet and let a mistake happen so you can say 'I told you so' later",
          ],
          expected: "Acknowledge their idea, share your concern clearly, and propose an alternative for the group to consider",
          proof: "Constructive disagreement respects the person while improving the plan — that is mature communication.",
        },
        {
          type: "note",
          tool: "reflection_journal",
          title: "Group Participation Practice",
          prompt: "Write a short note about a time when respectful communication helped a group you were part of. Include the words 'listen', 'respect', and 'team'.",
          keywords: ["listen", "respect", "team"],
          proof: "You understand that respectful communication builds stronger teams — a true citizen-leader.",
        },
      ],
    },
    {
      id: "teamwork_dynamics",
      order: 3,
      tag: "C301",
      icon: "🤝",
      title: "Teamwork Dynamics & Roles",
      desc: "Understand how teams form, the roles people play, and how to build an effective team.",
      xp: 100,
      brief: "A team is more than a group of people — it is a system of roles, trust, and shared goals. Learn about the stages of team development (forming, storming, norming, performing), the different roles people take on, and how to build trust and cohesion within your section.",
      scene: "team_formation",
      chapters: ["Stages of team development", "Team roles and strengths", "Building trust", "Cohesion exercises"],
      tasks: [
        {
          type: "select",
          tool: "teamwork_playbook",
          title: "Stages of Team Development",
          prompt: "What is the correct order of the four stages of team development?",
          options: [
            "Forming, storming, norming, performing",
            "Performing, norming, storming, forming",
            "Storming, forming, performing, norming",
          ],
          expected: "Forming, storming, norming, performing",
          proof: "Teams grow through forming, storming, norming, and performing — you know the progression.",
        },
        {
          type: "select",
          tool: "teamwork_playbook",
          title: "Team Roles and Strengths",
          prompt: "During the 'storming' stage, disagreements arise. What is the healthiest way to handle this phase?",
          options: [
            "Discuss differences openly, listen to all views, and agree on shared norms so the team can move forward",
            "Avoid all conflict and pretend everyone already agrees",
            "Let the loudest person decide everything to end the arguing",
          ],
          expected: "Discuss differences openly, listen to all views, and agree on shared norms so the team can move forward",
          proof: "Storming is normal — working through it constructively is what turns a group into a team.",
        },
        {
          type: "select",
          tool: "teamwork_playbook",
          title: "Building Trust",
          prompt: "Which action best builds trust within a team?",
          options: [
            "Following through on commitments, being honest, and supporting teammates when they struggle",
            "Only helping people when an officer is watching",
            "Keeping information to yourself so others depend on you",
          ],
          expected: "Following through on commitments, being honest, and supporting teammates when they struggle",
          proof: "Trust is built through reliability, honesty, and mutual support — you understand the foundation.",
        },
        {
          type: "note",
          tool: "reflection_journal",
          title: "Cohesion Reflection",
          prompt: "Write a short note about what makes a team work well together. Include the words 'trust', 'role', and 'goal'.",
          keywords: ["trust", "role", "goal"],
          proof: "You understand that trust, clear roles, and shared goals are the ingredients of a strong team.",
        },
      ],
    },
    {
      id: "community_service",
      order: 4,
      tag: "C401",
      icon: "🌍",
      title: "Community Service Planning",
      desc: "Plan and execute a community service project from start to finish.",
      xp: 100,
      brief: "Community service is a cornerstone of cadet citizenship. Learn to plan a service project — identify a community need, set clear objectives, allocate resources, coordinate volunteers, and measure impact. This module turns good intentions into effective action.",
      scene: "community_project",
      chapters: ["Identify a community need", "Set service objectives", "Allocate resources", "Measure community impact"],
      tasks: [
        {
          type: "select",
          tool: "community_service_guide",
          title: "Identify a Community Need",
          prompt: "Your section wants to run a community service project. What is the best first step?",
          options: [
            "Speak to community members and local organisations to find out what is genuinely needed",
            "Pick whatever sounds most fun for the cadets to do",
            "Copy whatever another unit did last year without checking if it is still relevant",
          ],
          expected: "Speak to community members and local organisations to find out what is genuinely needed",
          proof: "Effective service starts with listening to the community — you got it right.",
        },
        {
          type: "select",
          tool: "community_service_guide",
          title: "Set Service Objectives",
          prompt: "Which is an example of a clear, measurable service objective?",
          options: [
            "Collect and sort 200 food items for the local food bank by Saturday afternoon",
            "Help people somehow if we have time",
            "Do a really good job and make everyone happy",
          ],
          expected: "Collect and sort 200 food items for the local food bank by Saturday afternoon",
          proof: "A good objective is specific, measurable, and time-bound — you set a clear target.",
        },
        {
          type: "select",
          tool: "resource_tracker",
          title: "Allocate Resources",
          prompt: "You have 12 cadets, 3 hours, and limited transport. How should you allocate resources?",
          options: [
            "Assign cadets to roles matching their skills, stagger tasks to fit the time, and share transport fairly across groups",
            "Send everyone to the same task at once and hope it sorts itself out",
            "Let each cadet decide independently with no coordination",
          ],
          expected: "Assign cadets to roles matching their skills, stagger tasks to fit the time, and share transport fairly across groups",
          proof: "Smart resource allocation maximises impact — you planned like a real project leader.",
        },
        {
          type: "note",
          tool: "reflection_journal",
          title: "Measure Community Impact",
          prompt: "Write a short note about how you would measure the impact of a community service project. Include the words 'impact', 'community', and 'measure'.",
          keywords: ["impact", "community", "measure"],
          proof: "Measuring impact proves the service worked and helps improve future projects — excellent thinking.",
        },
      ],
    },
    {
      id: "leadership_community",
      order: 5,
      tag: "C501",
      icon: "📋",
      title: "Leadership in the Community",
      desc: "Develop leadership skills to guide your section and inspire others in community settings.",
      xp: 100,
      brief: "Citizenship and leadership go hand in hand. Learn to lead by example, motivate your section, make ethical decisions under pressure, and represent the cadet organisation with pride in the community. A good leader serves the team — and the community.",
      scene: "leadership_scene",
      chapters: ["Lead by example", "Motivate the section", "Ethical decision-making", "Represent the organisation"],
      tasks: [
        {
          type: "select",
          tool: "leadership_manual",
          title: "Lead by Example",
          prompt: "What does 'leading by example' mean for a cadet in the community?",
          options: [
            "Demonstrating the values and standards you expect from others — doing the hard tasks, being punctual, and showing respect",
            "Giving orders and watching others do the work",
            "Wearing the most badges so everyone knows you are in charge",
          ],
          expected: "Demonstrating the values and standards you expect from others — doing the hard tasks, being punctual, and showing respect",
          proof: "Leading by example is the most powerful form of leadership — you understand it deeply.",
        },
        {
          type: "select",
          tool: "leadership_manual",
          title: "Motivate the Section",
          prompt: "Your section is tired and morale is dropping during a long community project. What is the best approach?",
          options: [
            "Acknowledge the effort, break the remaining work into small wins, and rotate tasks so everyone gets a break",
            "Tell them to stop complaining and push through",
            "Cancel the project because it is taking too long",
          ],
          expected: "Acknowledge the effort, break the remaining work into small wins, and rotate tasks so everyone gets a break",
          proof: "Motivation comes from recognition, achievable goals, and fairness — you led with empathy.",
        },
        {
          type: "toggle",
          tool: "leadership_manual",
          title: "Ethical Decision-Making",
          prompt: "A shortcut would finish the project faster but would mean cutting a corner on safety. Do you pledge to always choose the safe, ethical path even when it takes longer? Toggle to confirm your commitment.",
          expected: true,
          proof: "Your ethical commitment is recorded — a leader who cuts corners on safety endangers the whole team.",
        },
        {
          type: "note",
          tool: "reflection_journal",
          title: "Represent the Organisation",
          prompt: "Write a short note about how a cadet should represent their organisation in the community. Include the words 'pride', 'uniform', and 'community'.",
          keywords: ["pride", "uniform", "community"],
          proof: "You understand that wearing the uniform in public is a responsibility to represent the organisation well.",
        },
      ],
    },
    {
      id: "civic_reflection",
      order: 6,
      tag: "C601",
      icon: "🏅",
      title: "Civic Reflection & Service Review",
      desc: "Reflect on your citizenship journey, review what you have learned, and plan your ongoing service.",
      xp: 100,
      brief: "You have explored values, communication, teamwork, community service, and leadership. Now it is time to reflect on the full citizenship experience, review your knowledge, and commit to ongoing service as a cadet and citizen. Reflection turns experience into wisdom.",
      scene: "reflection_hall",
      chapters: ["Review citizenship concepts", "Reflect on service experience", "Pledge ongoing commitment", "Plan future service"],
      tasks: [
        {
          type: "select",
          tool: "values_handbook",
          title: "Citizenship Review",
          prompt: "Which statement best summarises what you learned in the Citizenship & Teamwork training?",
          options: [
            "Values, respectful communication, teamwork, community service, and leadership form the foundation of cadet citizenship",
            "Citizenship is only about wearing the uniform correctly",
            "Community service is optional and does not really matter",
          ],
          expected: "Values, respectful communication, teamwork, community service, and leadership form the foundation of cadet citizenship",
          proof: "You have a clear understanding of the full citizenship curriculum — excellent review.",
        },
        {
          type: "select",
          tool: "reflection_journal",
          title: "Reflect on Service Experience",
          prompt: "Why is reflection important after a community service project?",
          options: [
            "It connects action to learning, captures what worked, identifies improvements, and reinforces the value of service",
            "It is just paperwork that officers make you do",
            "Reflection is only for cadets who did a bad job",
          ],
          expected: "It connects action to learning, captures what worked, identifies improvements, and reinforces the value of service",
          proof: "Reflection turns experience into wisdom — you understand its true value.",
        },
        {
          type: "toggle",
          tool: "values_handbook",
          title: "Pledge Ongoing Commitment",
          prompt: "Do you pledge to continue serving your community, upholding the cadet values, and being a positive role model as you progress? Toggle to confirm your commitment.",
          expected: true,
          proof: "Your pledge is recorded — a cadet who commits to ongoing service is a cadet who grows. Onward!",
        },
        {
          type: "note",
          tool: "reflection_journal",
          title: "Plan Future Service",
          prompt: "Write a short note about a community service project you would like to lead in the future and why. Include the words 'service', 'goal', and 'community'.",
          keywords: ["service", "goal", "community"],
          proof: "You have a plan for future service — that is how a citizen-cadet keeps growing. Citizenship badge earned!",
        },
      ],
    },
  ];

  // ==========================================================
  // LEARN ARTICLES — Citizenship & teamwork reference library
  // ==========================================================
  const LEARN_ARTICLES = [
    { id: "l_six_values", cat: "Values", icon: "📖", title: "The Aim of the Canadian Cadet Program", desc: "Good citizenship, leadership, physical fitness, and interest in Canadian Armed Forces activities \u2014 plus the values of respect, dignity, fairness, and inclusion.", xp: 15 },
    { id: "l_standards", cat: "Values", icon: "⚖️", title: "Cadet Standards", desc: "The behavioural standards expected of every cadet on and off duty.", xp: 15 },
    { id: "l_integrity", cat: "Values", icon: "🛡️", title: "What Integrity Means", desc: "Doing the right thing even when no one is watching — the heart of trust.", xp: 15 },
    { id: "l_selfless", cat: "Values", icon: "🤲", title: "Selfless Commitment", desc: "Putting the team and mission before personal convenience.", xp: 15 },
    { id: "l_active_listening", cat: "Communication", icon: "👂", title: "Active Listening", desc: "The four skills that show you truly hear and value what others say.", xp: 15 },
    { id: "l_inclusive_comms", cat: "Communication", icon: "🌍", title: "Inclusive Communication", desc: "How to make sure every voice in the team is heard and respected.", xp: 15 },
    { id: "l_disagree_well", cat: "Communication", icon: "🕊️", title: "Disagreeing Constructively", desc: "How to challenge an idea without attacking the person.", xp: 15 },
    { id: "l_body_language", cat: "Communication", icon: "🙋", title: "Body Language Basics", desc: "Eye contact, posture, and gestures that communicate respect.", xp: 15 },
    { id: "l_team_stages", cat: "Teamwork", icon: "📈", title: "Stages of Team Development", desc: "Forming, storming, norming, performing — how groups become teams.", xp: 15 },
    { id: "l_team_roles", cat: "Teamwork", icon: "🎭", title: "Team Roles & Strengths", desc: "Different people bring different strengths — how to balance a team.", xp: 15 },
    { id: "l_trust", cat: "Teamwork", icon: "🤝", title: "Building Trust", desc: "Reliability, honesty, and support — the three pillars of team trust.", xp: 15 },
    { id: "l_cohesion", cat: "Teamwork", icon: "🔗", title: "Team Cohesion", desc: "What binds a team together and how to strengthen the bonds.", xp: 15 },
    { id: "l_service_planning", cat: "Community Service", icon: "📋", title: "Planning a Service Project", desc: "From identifying a need to measuring impact — the full project cycle.", xp: 15 },
    { id: "l_volunteer_coordination", cat: "Community Service", icon: "👥", title: "Coordinating Volunteers", desc: "How to assign roles, manage time, and keep volunteers engaged.", xp: 15 },
    { id: "l_measuring_impact", cat: "Community Service", icon: "📊", title: "Measuring Community Impact", desc: "Why and how to track the real difference your service makes.", xp: 15 },
    { id: "l_food_bank", cat: "Community Service", icon: "🥫", title: "Food Bank Volunteering", desc: "A common cadet service activity — sorting, packing, and distributing.", xp: 15 },
    { id: "l_lead_example", cat: "Leadership", icon: "👨‍✈️", title: "Leading by Example", desc: "The most powerful leadership tool — your own behaviour.", xp: 15 },
    { id: "l_motivation", cat: "Leadership", icon: "💪", title: "Motivating Your Section", desc: "Recognition, achievable goals, and fairness keep a team moving.", xp: 15 },
    { id: "l_ethical_decisions", cat: "Leadership", icon: "🧭", title: "Ethical Decision-Making", desc: "A framework for choosing the right path under pressure.", xp: 15 },
    { id: "l_representation", cat: "Leadership", icon: "🎖️", title: "Representing the Organisation", desc: "Wearing the uniform in public is a responsibility, not just a privilege.", xp: 15 },
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
  // MAP PROGRESS SYNC — badge 4 on the quest map
  // ==========================================================
  function syncMapProgress() {
    try {
      const allDone = MISSIONS.every(m => state.completedMissions.includes(m.id));
      let mapProgress = JSON.parse(localStorage.getItem(MAP_PROGRESS_KEY) || "[]");
      if (allDone && !mapProgress.includes(CITIZENSHIP_BADGE_ID)) {
        mapProgress.push(CITIZENSHIP_BADGE_ID);
        localStorage.setItem(MAP_PROGRESS_KEY, JSON.stringify(mapProgress));
      } else if (!allDone && mapProgress.includes(CITIZENSHIP_BADGE_ID)) {
        mapProgress = mapProgress.filter(id => id !== CITIZENSHIP_BADGE_ID);
        localStorage.setItem(MAP_PROGRESS_KEY, JSON.stringify(mapProgress));
      }
    } catch (e) {}
  }

  // ==========================================================
  // SCENE SVG GENERATORS — Citizenship scenes
  // ==========================================================
  function sceneSVG(scene) {
    const W = 600, H = 180;
    const base = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">`;
    const end = `</svg>`;
    const grad = (id, c1, c2) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>`;

    if (scene === "values_board") {
      return base + grad("g", "#0a1c16", "#040c08") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <rect x="40" y="25" width="520" height="130" rx="6" fill="#0e2820" stroke="#1f7a3a"/>
        <text x="300" y="48" fill="#5cff9b" font-size="11" font-family="monospace" text-anchor="middle" font-weight="bold">VALUES & STANDARDS</text>
        <g font-family="monospace" font-size="8" fill="#4ed97b" text-anchor="middle">
          <rect x="60" y="62" width="85" height="40" rx="4" fill="#06120c" stroke="#1f7a3a"/><text x="102" y="86">COURAGE</text>
          <rect x="155" y="62" width="85" height="40" rx="4" fill="#06120c" stroke="#1f7a3a"/><text x="197" y="86">DISCIPLINE</text>
          <rect x="250" y="62" width="85" height="40" rx="4" fill="#06120c" stroke="#1f7a3a"/><text x="292" y="86">RESPECT</text>
          <rect x="345" y="62" width="85" height="40" rx="4" fill="#06120c" stroke="#1f7a3a"/><text x="387" y="86">INTEGRITY</text>
          <rect x="440" y="62" width="85" height="40" rx="4" fill="#06120c" stroke="#1f7a3a"/><text x="482" y="86">LOYALTY</text>
          <rect x="155" y="110" width="290" height="35" rx="4" fill="#06120c" stroke="#f5c84c"/><text x="300" y="132" fill="#f5c84c">SELFLESS COMMITMENT</text>
        </g>
      ` + end;
    }
    if (scene === "discussion_circle") {
      return base + grad("g", "#0a1c16", "#040c08") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <text x="300" y="35" fill="#5cff9b" font-size="10" font-family="monospace" text-anchor="middle">DISCUSSION CIRCLE</text>
        <g fill="#4ed97b" opacity="0.7">
          <circle cx="300" cy="100" r="22" fill="#133429" stroke="#4ed97b" stroke-width="1.5"/>
          <circle cx="180" cy="80" r="18" fill="#133429" stroke="#4ed97b" stroke-width="1.5"/>
          <circle cx="420" cy="80" r="18" fill="#133429" stroke="#4ed97b" stroke-width="1.5"/>
          <circle cx="140" cy="120" r="16" fill="#133429" stroke="#4ed97b" stroke-width="1.5"/>
          <circle cx="460" cy="120" r="16" fill="#133429" stroke="#4ed97b" stroke-width="1.5"/>
          <circle cx="230" cy="135" r="15" fill="#133429" stroke="#4ed97b" stroke-width="1.5"/>
          <circle cx="370" cy="135" r="15" fill="#133429" stroke="#4ed97b" stroke-width="1.5"/>
        </g>
        <g fill="#5cff9b" font-size="18" text-anchor="middle">
          <text x="300" y="106">🗣️</text>
          <text x="180" y="86">👂</text>
          <text x="420" y="86">👂</text>
        </g>
        <text x="300" y="165" fill="#4ed97b" font-size="8" font-family="monospace" text-anchor="middle">ACTIVE LISTENING • RESPECTFUL DIALOGUE</text>
      ` + end;
    }
    if (scene === "team_formation") {
      return base + grad("g", "#0a1c16", "#040c08") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <text x="300" y="32" fill="#5cff9b" font-size="10" font-family="monospace" text-anchor="middle">TEAM DEVELOPMENT STAGES</text>
        <g font-family="monospace" font-size="9" text-anchor="middle">
          <rect x="50" y="55" width="100" height="50" rx="4" fill="#06120c" stroke="#1f7a3a"/><text x="100" y="78" fill="#4ed97b">FORMING</text><text x="100" y="93" fill="#6a8e7a" font-size="7">getting to know</text>
          <rect x="170" y="55" width="100" height="50" rx="4" fill="#06120c" stroke="#c47a26"/><text x="220" y="78" fill="#ffb454">STORMING</text><text x="220" y="93" fill="#6a8e7a" font-size="7">working through</text>
          <rect x="290" y="55" width="100" height="50" rx="4" fill="#06120c" stroke="#1f7a3a"/><text x="340" y="78" fill="#4ed97b">NORMING</text><text x="340" y="93" fill="#6a8e7a" font-size="7">agreeing rules</text>
          <rect x="410" y="55" width="100" height="50" rx="4" fill="#06120c" stroke="#f5c84c"/><text x="460" y="78" fill="#f5c84c">PERFORMING</text><text x="460" y="93" fill="#6a8e7a" font-size="7">working well</text>
        </g>
        <g stroke="#4ed97b" stroke-width="1.5" opacity="0.4">
          <line x1="150" y1="80" x2="170" y2="80" marker-end="url(#arrow)"/>
          <line x1="270" y1="80" x2="290" y2="80" marker-end="url(#arrow)"/>
          <line x1="390" y1="80" x2="410" y2="80" marker-end="url(#arrow)"/>
        </g>
        <defs><marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="#4ed97b" opacity="0.4"/></marker></defs>
        <text x="300" y="135" fill="#4ed97b" font-size="9" font-family="monospace" text-anchor="middle">TRUST → ROLES → SHARED GOALS → COHESION</text>
      ` + end;
    }
    if (scene === "community_project") {
      return base + grad("g", "#0a1c16", "#040c08") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <rect x="180" y="35" width="240" height="110" rx="6" fill="#0e2820" stroke="#1f7a3a"/>
        <text x="300" y="58" fill="#5cff9b" font-size="11" font-family="monospace" text-anchor="middle" font-weight="bold">COMMUNITY SERVICE</text>
        <g font-size="24" text-anchor="middle">
          <text x="220" y="100">🥫</text>
          <text x="280" y="100">🧹</text>
          <text x="340" y="100">🌱</text>
          <text x="380" y="100">📦</text>
        </g>
        <circle cx="120" cy="90" r="16" fill="#133429" stroke="#4ed97b" stroke-width="1.5"/>
        <circle cx="460" cy="90" r="16" fill="#133429" stroke="#4ed97b" stroke-width="1.5"/>
        <text x="120" y="96" font-size="16" text-anchor="middle">🤝</text>
        <text x="460" y="96" font-size="16" text-anchor="middle">🤝</text>
        <text x="120" y="125" fill="#4ed97b" font-size="8" font-family="monospace" text-anchor="middle">VOLUNTEER</text>
        <text x="460" y="125" fill="#4ed97b" font-size="8" font-family="monospace" text-anchor="middle">VOLUNTEER</text>
        <text x="300" y="135" fill="#f5c84c" font-size="9" font-family="monospace" text-anchor="middle">PLAN • COORDINATE • MEASURE IMPACT</text>
      ` + end;
    }
    if (scene === "leadership_scene") {
      return base + grad("g", "#0a1c16", "#040c08") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <text x="300" y="35" fill="#5cff9b" font-size="10" font-family="monospace" text-anchor="middle">LEADING THE SECTION</text>
        <circle cx="300" cy="95" r="22" fill="#133429" stroke="#f5c84c" stroke-width="2"/>
        <text x="300" y="102" font-size="24" text-anchor="middle">📋</text>
        <g fill="#133429" stroke="#4ed97b" stroke-width="1.5">
          <circle cx="170" cy="90" r="15"/><circle cx="200" cy="115" r="14"/>
          <circle cx="400" cy="90" r="15"/><circle cx="430" cy="115" r="14"/>
          <circle cx="140" cy="115" r="13"/><circle cx="460" cy="115" r="13"/>
        </g>
        <g stroke="#4ed97b" stroke-width="1" opacity="0.3" stroke-dasharray="3,3">
          <line x1="278" y1="95" x2="185" y2="90"/>
          <line x1="278" y1="95" x2="322" y2="90" transform="translate(44,0)"/>
          <line x1="280" y1="105" x2="205" y2="113"/>
          <line x1="320" y1="105" x2="418" y2="113"/>
        </g>
        <text x="300" y="160" fill="#4ed97b" font-size="9" font-family="monospace" text-anchor="middle">LEAD BY EXAMPLE • MOTIVATE • DECIDE ETHICALLY</text>
      ` + end;
    }
    if (scene === "reflection_hall") {
      return base + grad("g", "#0a1c16", "#040c08") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <text x="300" y="40" fill="#f5c84c" font-size="16" text-anchor="middle">🏅</text>
        <rect x="240" y="55" width="120" height="55" rx="6" fill="#0e2820" stroke="#f5c84c" stroke-width="1.5"/>
        <text x="300" y="80" fill="#f5c84c" font-size="11" font-family="monospace" text-anchor="middle" font-weight="bold">CITIZENSHIP</text>
        <text x="300" y="98" fill="#5cff9b" font-size="9" font-family="monospace" text-anchor="middle">BADGE COMPLETE</text>
        <g fill="#4ed97b" opacity="0.5">
          <circle cx="120" cy="95" r="10"/><circle cx="160" cy="95" r="10"/><circle cx="200" cy="95" r="10"/>
          <circle cx="400" cy="95" r="10"/><circle cx="440" cy="95" r="10"/><circle cx="480" cy="95" r="10"/>
        </g>
        <text x="300" y="140" fill="#4ed97b" font-size="11" font-family="monospace" text-anchor="middle">SERVICE • INTEGRITY • RESPECT</text>
        <text x="300" y="158" fill="#6a8e7a" font-size="8" font-family="monospace" text-anchor="middle">CITIZEN-CADET IN THE COMMUNITY</text>
      ` + end;
    }
    return base + `<rect width="${W}" height="${H}" fill="#0e2820"/>` + end;
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
  // BADGES — auto-generated from MISSIONS
  // ==========================================================
  const CITIZENSHIP_BADGES = MISSIONS.map(m => ({
    id: "b_" + m.id,
    icon: m.icon,
    name: m.title,
    xp: m.xp,
    mission: m.id
  }));

  function refreshBadges() {
    state.badges = [];
    CITIZENSHIP_BADGES.forEach(b => {
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
    refreshBadges();
    document.getElementById("topRank").textContent = rank.name.replace("Citizen ", "").replace("Cadet ", "");
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
    document.getElementById("cmdXPNext").textContent = nxt ? "+" + (nxt.xp - state.xp) + " to " + nxt.name : "MAX RANK";
    document.getElementById("cmdSitreps").textContent = state.sitreps.length;
    document.getElementById("cmdBadges").textContent = state.badges.length;
    document.getElementById("cmdBadgeTotal").textContent = "of " + CITIZENSHIP_BADGES.length;

    const cl = document.getElementById("chapterList");
    cl.innerHTML = MISSIONS.map(function (m) {
      const done = missionDone(m);
      const unlocked = missionUnlocked(m);
      const prog = tasksDoneCount(m);
      const total = m.tasks.length;
      const isActive = activeMissionId === m.id && !done;
      let cls = "chapter";
      let status = "";
      if (done) { cls += " done"; status = '<div class="ch-status done">COMPLETE — ' + prog + "/" + total + "</div>"; }
      else if (isActive) { cls += " active"; status = '<div class="ch-status ready">IN PROGRESS — ' + prog + "/" + total + "</div>"; }
      else if (unlocked) { status = '<div class="ch-status ready">READY — ' + prog + "/" + total + "</div>"; }
      else { cls += " locked"; status = '<div class="ch-status locked">LOCKED — complete Module ' + (m.order - 1) + "</div>"; }
      const num = done ? "" : '<span class="n">' + m.order + "</span>";
      return '<div class="' + cls + '" data-mission="' + m.id + '">' +
        '<div class="ch-num">' + num + '</div>' +
        '<div class="ch-body">' +
        '<div class="ch-title">' + escapeHTML(m.title) + "</div>" +
        '<div class="ch-desc">' + escapeHTML(m.desc) + "</div>" +
        status +
        "</div></div>";
    }).join("");
    cl.querySelectorAll(".chapter:not(.locked)").forEach(function (el) {
      el.addEventListener("click", function () { openMission(el.dataset.mission); });
    });
  }

  // ==========================================================
  // RENDER: TRAINING GRID
  // ==========================================================
  function renderTraining() {
    const grid = document.getElementById("trainingGrid");
    grid.innerHTML = MISSIONS.map(function (m) {
      const done = missionDone(m);
      const unlocked = missionUnlocked(m);
      const prog = tasksDoneCount(m);
      const total = m.tasks.length;
      const pct = Math.round((prog / total) * 100);
      let cls = "mission-card";
      if (done) cls += " done";
      if (!unlocked) cls += " locked";
      return '<div class="' + cls + '" data-mission="' + m.id + '">' +
        '<div class="mc-ico">' + m.icon + "</div>" +
        '<div class="mc-tag">' + m.tag + "</div>" +
        '<div class="mc-title">' + escapeHTML(m.title) + "</div>" +
        '<div class="mc-desc">' + escapeHTML(m.desc) + "</div>" +
        '<div class="mc-meta"><span>⚡ ' + missionXP(m) + " XP</span><span>📋 " + prog + "/" + total + "</span></div>" +
        '<div class="mc-prog"><div class="mc-prog-fill" style="width:' + pct + '%"></div></div>' +
        "</div>";
    }).join("");
    grid.querySelectorAll(".mission-card:not(.locked)").forEach(function (el) {
      el.addEventListener("click", function () { openMission(el.dataset.mission); });
    });
  }

  // ==========================================================
  // RENDER: MISSION SELECTOR
  // ==========================================================
  function renderMissionSelector() {
    const sel = document.getElementById("missionSelector");
    sel.innerHTML = MISSIONS.map(function (m) {
      const done = missionDone(m);
      const unlocked = missionUnlocked(m);
      const prog = tasksDoneCount(m);
      const total = m.tasks.length;
      const pct = Math.round((prog / total) * 100);
      let cls = "mission-card";
      if (done) cls += " done";
      if (activeMissionId === m.id) cls += " active";
      if (!unlocked) cls += " locked";
      return '<div class="' + cls + '" data-mission="' + m.id + '">' +
        '<div class="mc-ico">' + m.icon + "</div>" +
        '<div class="mc-tag">' + m.tag + "</div>" +
        '<div class="mc-title">' + escapeHTML(m.title) + "</div>" +
        '<div class="mc-desc">' + escapeHTML(m.desc) + "</div>" +
        '<div class="mc-meta"><span>⚡ ' + missionXP(m) + " XP</span><span>📋 " + prog + "/" + total + "</span></div>" +
        '<div class="mc-prog"><div class="mc-prog-fill" style="width:' + pct + '%"></div></div>' +
        "</div>";
    }).join("");
    sel.querySelectorAll(".mission-card:not(.locked)").forEach(function (el) {
      el.addEventListener("click", function () { openMission(el.dataset.mission); });
    });
  }

  // ==========================================================
  // OPEN MISSION
  // ==========================================================
  function openMission(missionId) {
    const m = MISSIONS.find(function (x) { return x.id === missionId; });
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
    const m = MISSIONS.find(function (x) { return x.id === activeMissionId; });
    if (!m) return;
    const mp = missionProgress(m.id);
    const consoleEl = document.getElementById("missionConsole");

    if (missionDone(m)) {
      consoleEl.innerHTML = completedMissionHTML(m);
      const backBtn = document.getElementById("backToListBtn");
      if (backBtn) backBtn.addEventListener("click", exitMission);
      const sitrepBtn = document.getElementById("fileSitrepQuickBtn");
      if (sitrepBtn) sitrepBtn.addEventListener("click", function () { exitMission(); switchSection("sitrep"); });
      return;
    }

    const task = m.tasks[activeTaskIndex];
    const total = m.tasks.length;
    toggleState[activeTaskIndex] = toggleState[activeTaskIndex] || false;

    consoleEl.innerHTML =
      '<div class="task-console">' +
        '<div class="task-header">' +
          '<div class="th-left">' +
            '<div class="th-ico">' + m.icon + "</div>" +
            "<div>" +
              '<div class="th-title">' + escapeHTML(m.title) + "</div>" +
              '<div class="th-sub">' + m.tag + " • " + mp.tasksDone.length + "/" + total + " tasks complete</div>" +
            "</div>" +
          "</div>" +
          '<div class="th-right">' +
            '<span class="task-stage-pill">TASK ' + (activeTaskIndex + 1) + " / " + total + "</span>" +
            '<button class="btn btn-ghost" id="exitMissionBtn" type="button">← Back to list</button>' +
          "</div>" +
        "</div>" +
        '<div class="task-body">' +
          '<div class="scene-visual">' + sceneSVG(m.scene) + '<div class="scene-overlay">' + escapeHTML(m.brief.split(".")[0]) + ".</div></div>" +
          '<div class="task-brief">' + escapeHTML(m.brief) + "</div>" +
          '<div class="tool-dock" id="toolDock">' +
            TOOLS.map(function (t) {
              return '<button class="tool-btn ' + (activeTool === t.id ? "active" : "") + '" data-tool="' + t.id + '" type="button"><span class="tb-ico">' + t.icon + "</span>" + escapeHTML(t.label) + "</button>";
            }).join("") +
          "</div>" +
          '<div class="tool-req" id="toolReq">' +
            '<span class="tr-ico">⚠️</span>' +
            '<span class="tr-text">This task requires the <strong>' + escapeHTML(toolLabel(task.tool)) + '</strong> to be open. Current tool: <span class="tr-now" id="trNow">' + (activeTool ? escapeHTML(toolLabel(activeTool)) : "NONE") + "</span></span>" +
          "</div>" +
          '<div class="task-step-label">' +
            '<span class="step-num">STEP ' + (activeTaskIndex + 1) + "</span>" +
            '<span class="step-title">' + escapeHTML(task.title) + "</span>" +
          "</div>" +
          '<div class="task-instructions">' + escapeHTML(task.prompt) + "</div>" +
          '<div class="task-control" id="taskControl">' + renderTaskControl(task, activeTaskIndex) + "</div>" +
          '<div class="task-actions">' +
            '<button class="btn btn-primary" id="submitTaskBtn" type="button">✓ Submit & Confirm</button>' +
            '<button class="btn btn-ghost" id="hintBtn" type="button">💡 Hint</button>' +
          "</div>" +
          '<div class="terminal" id="terminal"><div class="ln ln-dim">// awaiting input…</div></div>' +
          '<div class="task-feedback" id="taskFeedback"></div>' +
          '<hr class="divider"/>' +
          '<h3 style="margin-bottom:10px;">Mission Checklist</h3>' +
          '<div class="checklist" id="checklist">' +
            m.tasks.map(function (t, i) {
              const done = mp.tasksDone.includes(i);
              return '<div class="check-item ' + (done ? "done" : "") + '"><div class="ci-box"></div><div>' + escapeHTML(t.title) + "</div></div>";
            }).join("") +
          "</div>" +
        "</div>" +
      "</div>";

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
      return '<div class="toggle-row ' + (on ? "on" : "") + '" id="toggleRow" data-idx="' + idx + '">' +
        '<div class="toggle-switch"></div>' +
        '<div class="toggle-label">' + escapeHTML(task.title) + "</div>" +
        '<div class="toggle-icon">' + (on ? "✓" : "○") + "</div>" +
      "</div>";
    }
    if (task.type === "select") {
      return '<select class="task-select" id="taskSelect" data-idx="' + idx + '">' +
        '<option value="">— Select your answer —</option>' +
        task.options.map(function (o) { return '<option value="' + escapeHTML(o) + '">' + escapeHTML(o) + "</option>"; }).join("") +
      "</select>";
    }
    if (task.type === "type") {
      return '<input class="task-input" id="taskInput" type="text" placeholder="Type your answer…" autocomplete="off" />';
    }
    if (task.type === "note") {
      return '<textarea class="task-note" id="taskNote" placeholder="Write your log entry here…"></textarea>';
    }
    if (task.type === "slider") {
      sliderValue[idx] = sliderValue[idx] !== undefined ? sliderValue[idx] : 0;
      return '<input class="task-slider" id="taskSlider" type="range" min="0" max="30" value="' + sliderValue[idx] + '" data-idx="' + idx + '" />' +
        '<div class="slider-readout" id="sliderReadout">' + sliderValue[idx] + " points</div>";
    }
    return "";
  }

  function bindConsoleEvents(task) {
    document.querySelectorAll("#toolDock .tool-btn").forEach(function (b) {
      b.addEventListener("click", function () {
        activeTool = b.dataset.tool;
        document.querySelectorAll("#toolDock .tool-btn").forEach(function (x) { x.classList.remove("active"); });
        b.classList.add("active");
        updateToolReq(task);
        termPush("info", "▸ Opened " + toolLabel(activeTool));
      });
    });

    const toggleRow = document.getElementById("toggleRow");
    if (toggleRow) {
      toggleRow.addEventListener("click", function () {
        const idx = parseInt(toggleRow.dataset.idx, 10);
        toggleState[idx] = !toggleState[idx];
        const on = toggleState[idx];
        toggleRow.classList.toggle("on", on);
        toggleRow.querySelector(".toggle-icon").textContent = on ? "✓" : "○";
      });
    }

    const slider = document.getElementById("taskSlider");
    if (slider) {
      slider.addEventListener("input", function () {
        const idx = parseInt(slider.dataset.idx, 10);
        sliderValue[idx] = parseInt(slider.value, 10);
        document.getElementById("sliderReadout").textContent = sliderValue[idx] + " points";
      });
    }

    const submitBtn = document.getElementById("submitTaskBtn");
    if (submitBtn) submitBtn.addEventListener("click", function () { submitTask(task); });

    const hintBtn = document.getElementById("hintBtn");
    if (hintBtn) hintBtn.addEventListener("click", function () { showHint(task); });

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
    const t = TOOLS.find(function (x) { return x.id === id; });
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
    const m = MISSIONS.find(function (x) { return x.id === activeMissionId; });
    const fb = document.getElementById("taskFeedback");
    fb.className = "task-feedback";

    if (activeTool !== task.tool) {
      state.totalAttempts++;
      state.wrongAttempts++;
      state.streak = 0;
      saveState();
      fb.classList.add("show", "err");
      fb.innerHTML = "❌ Wrong tool! This task requires <strong>" + escapeHTML(toolLabel(task.tool)) + "</strong>. You currently have <strong>" + (activeTool ? escapeHTML(toolLabel(activeTool)) : "no tool") + "</strong> open. Open the correct tool from the dock above.";
      termPush("err", "✗ FAILED — wrong tool. Required: " + toolLabel(task.tool));
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
      fb.innerHTML = "❌ " + escapeHTML(valid.msg);
      termPush("err", "✗ " + valid.msg);
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
    fb.innerHTML = "✅ Correct! " + escapeHTML(task.proof);
    termPush("ok", "✓ " + task.proof);

    activeTaskIndex++;
    if (activeTaskIndex >= m.tasks.length) {
      completeMission(m);
    } else {
      setTimeout(renderMissionConsole, 1100);
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
      return val === task.expected ? { ok: true } : { ok: false, msg: 'Incorrect. The correct answer is not "' + val + '". Review the options and try again.' };
    }
    if (task.type === "type") {
      const inp = document.getElementById("taskInput");
      const val = (inp ? inp.value : "").trim();
      if (!val) return { ok: false, msg: "Type your answer in the input field." };
      const expArray = Array.isArray(task.expected) ? task.expected : [String(task.expected)];
      const matched = expArray.some(function (e) { return val.toUpperCase() === String(e).toUpperCase(); });
      if (matched) return { ok: true };
      return { ok: false, msg: '"' + val + '" is not quite right. Check your wording and try again.' };
    }
    if (task.type === "note") {
      const ta = document.getElementById("taskNote");
      const val = (ta ? ta.value : "").trim();
      if (val.length < 10) return { ok: false, msg: "Your log entry is too short. Write a complete sentence." };
      const lower = val.toLowerCase();
      const checkKw = function (kws) { return kws.every(function (k) { return lower.includes(k.toLowerCase()); }); };
      const mainOk = task.keywords ? checkKw(task.keywords) : true;
      const altOk = task.altKeywords ? checkKw(task.altKeywords) : false;
      if (mainOk || altOk) return { ok: true };
      const missing = task.keywords.filter(function (k) { return !lower.includes(k.toLowerCase()); });
      return { ok: false, msg: "Your note is missing required keywords: " + missing.join(", ") + ". Make sure to include them." };
    }
    if (task.type === "slider") {
      const v = sliderValue[activeTaskIndex] || 0;
      const tol = task.tolerance || 1;
      if (Math.abs(v - task.expected) <= tol) return { ok: true };
      return { ok: false, msg: "The reading is set to " + v + " points. Adjust the dial to match the target." };
    }
    return { ok: false, msg: "Unknown task type." };
  }

  function showHint(task) {
    const fb = document.getElementById("taskFeedback");
    fb.className = "task-feedback show info";
    let hint = "";
    if (task.type === "select") hint = "The correct answer relates to: " + task.expected.split("(")[0].trim().slice(0, 40) + "…";
    else if (task.type === "type") hint = Array.isArray(task.expected) ? "The answer starts with: " + task.expected[0].slice(0, 12) + "…" : "The answer has " + task.expected.length + " characters and starts with \"" + task.expected.charAt(0) + "\".";
    else if (task.type === "note") hint = "Your note must include: " + task.keywords.join(", ") + (task.altKeywords ? " (or " + task.altKeywords.join(", ") + ")" : "") + ".";
    else if (task.type === "toggle") hint = "Click the toggle row to switch it to the ON (green) position.";
    else if (task.type === "slider") hint = "The target reading is close to " + task.expected + " points.";
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
      const badge = CITIZENSHIP_BADGES.find(function (b) { return b.mission === m.id; });
      toast("ok", "🏆 Mission complete! +" + earned + " XP earned. Badge unlocked: " + (badge ? badge.name : m.title) + ".");
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
    const badge = CITIZENSHIP_BADGES.find(function (b) { return b.mission === m.id; });
    const mp = missionProgress(m.id);
    return '<div class="task-console"><div class="task-body"><div class="complete-card">' +
      '<div class="cc-ico">🏆</div>' +
      '<div class="cc-title">Mission Complete: ' + escapeHTML(m.title) + "</div>" +
      '<div class="cc-sub">' + escapeHTML(m.desc) + " You have successfully completed all " + m.tasks.length + " tasks and earned the <strong>" + escapeHTML(badge ? badge.name : "Cadet") + "</strong> badge.</div>" +
      '<div class="cc-stats">' +
        '<div class="cc-stat"><div class="v">+' + earned + '</div><div class="l">XP Earned</div></div>' +
        '<div class="cc-stat"><div class="v">' + mp.tasksDone.length + "/" + m.tasks.length + '</div><div class="l">Tasks Done</div></div>' +
        '<div class="cc-stat"><div class="v">' + (mp.wrongAttempts || 0) + '</div><div class="l">Wrong Attempts</div></div>' +
      "</div>" +
      '<div class="task-actions" style="justify-content:center;">' +
        '<button class="btn btn-primary" id="fileSitrepQuickBtn" type="button">📡 File SITREP for this mission</button>' +
        '<button class="btn btn-ghost" id="backToListBtn" type="button">← Back to mission list</button>' +
      "</div>" +
    "</div></div></div>";
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
    document.getElementById("ringRankLabel").textContent = rank.name.replace("Citizen ", "").replace("Cadet ", "");
    document.getElementById("nextRankName").textContent = nxt ? nxt.name : "MAX RANK";
    const pct = rankProgressPct();
    const circ = 314;
    document.getElementById("xpRingFg").style.strokeDashoffset = circ - (circ * pct / 100);
    document.getElementById("ringXPToNext").textContent = nxt ? (state.xp - rank.xp) + " / " + (nxt.xp - rank.xp) + " XP to next rank" : "MAX RANK ACHIEVED";

    const chart = document.getElementById("xpBarChart");
    chart.innerHTML = MISSIONS.map(function (m) {
      const done = missionDone(m);
      const xp = done ? missionXP(m) : 0;
      const h = Math.max(4, (xp / 100) * 140);
      return '<div class="bar" style="height:' + h + 'px;" title="' + escapeHTML(m.title) + ": " + xp + ' XP"><div class="bar-val">' + xp + '</div><div class="bar-label">M' + m.order + "</div></div>";
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
    list.innerHTML = RANKS.map(function (r) {
      let cls = "rank-row";
      let tag = "";
      if (r.id === cur.id) { cls += " current"; tag = '<span class="r-tag current">CURRENT</span>'; }
      else if (state.xp >= r.xp) { cls += " achieved"; tag = '<span class="r-tag achieved">ACHIEVED</span>'; }
      else { tag = '<span class="r-tag locked">LOCKED</span>'; }
      return '<div class="' + cls + '">' +
        '<div class="r-ico">' + r.icon + "</div>" +
        '<div class="r-body">' +
          '<div class="r-name">' + escapeHTML(r.name) + "</div>" +
          '<div class="r-xp">' + r.xp + " XP • CALLSIGN " + r.callsign + "</div>" +
        "</div>" +
        tag +
      "</div>";
    }).join("");
  }

  // ==========================================================
  // SITREP
  // ==========================================================
  function renderSitrep() {
    const sel = document.getElementById("sitrepMission");
    const completed = MISSIONS.filter(function (m) { return missionDone(m); });
    sel.innerHTML = '<option value="">Select a completed mission…</option>' +
      completed.map(function (m) { return '<option value="' + m.id + '">' + m.tag + " — " + escapeHTML(m.title) + "</option>"; }).join("");

    const log = document.getElementById("sitrepLog");
    if (state.sitreps.length === 0) {
      log.innerHTML = '<p class="muted center" style="padding:20px;">No SITREPs filed yet. Complete a mission and file your first report.</p>';
    } else {
      log.innerHTML = state.sitreps.slice().reverse().map(function (s) {
        const statusMap = {
          NOMINAL: { cls: "low", text: "NOMINAL", color: "var(--green)" },
          MINOR_HAZARD: { cls: "med", text: "MINOR HAZARD", color: "var(--amber)" },
          ABORTED: { cls: "high", text: "ABORTED", color: "var(--red)" }
        };
        const st = statusMap[s.status] || statusMap.NOMINAL;
        const m = MISSIONS.find(function (x) { return x.id === s.mission; });
        return '<div class="sitrep-entry">' +
          '<div class="se-head">' +
            '<span class="se-time">' + escapeHTML(s.time) + "</span>" +
            '<span class="se-status ti-level ' + st.cls + '">' + st.text + "</span>" +
          "</div>" +
          '<div class="se-body"><strong>' + escapeHTML(m ? m.tag + " — " + m.title : s.mission) + "</strong><br/>" + escapeHTML(s.summary) + "</div>" +
        "</div>";
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
      mission: mission, status: status, summary: summary,
      time: new Date().toLocaleString("en-GB", { hour12: false })
    };
    state.sitreps.push(entry);
    state.xp += 20;
    saveState();
    document.getElementById("sitrepSummary").value = "";
    document.getElementById("sitrepStatus").value = "";
    document.getElementById("sitrepMission").value = "";
    showFeedback(fb, "ok", "SITREP filed successfully! +20 XP. Your commanding officer has received your report.");
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
    grid.innerHTML = LEARN_ARTICLES.map(function (a) {
      const read = state.readArticles.includes(a.id);
      return '<div class="lib-card ' + (read ? "read" : "") + '" data-article="' + a.id + '">' +
        '<div class="lc-ico">' + a.icon + "</div>" +
        '<div class="lc-cat">' + escapeHTML(a.cat) + "</div>" +
        '<div class="lc-title">' + escapeHTML(a.title) + "</div>" +
        '<div class="lc-desc">' + escapeHTML(a.desc) + "</div>" +
        '<div class="lc-foot"><span>' + (read ? "✓ Read" : "Tap to read") + "</span><span>+" + a.xp + " XP</span></div>" +
      "</div>";
    }).join("");
    grid.querySelectorAll(".lib-card").forEach(function (el) {
      el.addEventListener("click", function () { openArticle(el.dataset.article); });
    });
  }

  function openArticle(articleId) {
    const a = LEARN_ARTICLES.find(function (x) { return x.id === articleId; });
    if (!a) return;
    if (!state.readArticles.includes(articleId)) {
      state.readArticles.push(articleId);
      state.xp += a.xp;
      saveState();
      toast("ok", '📖 Article read: "' + a.title + '" — +' + a.xp + " XP");
      renderLearn();
      renderSidebar();
      renderTopStats();
      renderAnalysis();
    } else {
      toast("info", '📖 Already read: "' + a.title + '"');
    }
  }

  // ==========================================================
  // HELPER: addXP, recordAttempt, shuffleArray
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
  // TEAMWORK ARENA — Interactive Teamwork Game Engine
  // ==========================================================
  const ta = {
    active: false,
    examMode: false,
    challengePool: [],
    poolIndex: 0,
    currentMode: null, // "allocate" | "conflict" | "resource" | "morale" | "impact"
    score: 0,
    correct: 0,
    wrong: 0,
    streak: 0,
    bestStreak: 0,
    round: 0,
    totalRounds: 0,
    challengeDone: false,
    // Per-mode transient state
    allocate: { cadets: [], tasks: [], selectedCadet: null, matches: {}, correctMap: {} },
    conflict: { situation: null, options: [], morale: 60, resolved: false },
    resource: { pool: [], teams: [], selected: null, confirmed: false },
    morale: { value: 50, running: false, event: null, fired: false, raf: null, dir: 1, goodZone: [75, 100], lastEvent: 0 },
    impact: { tasks: [], selected: null, correctOrder: [] },
    timer: { raf: null, start: 0, duration: 0, running: false }
  };

  const TA_MODES = [
    { id: "allocate", label: "TASK ALLOCATION", icon: "\u{1F4CB}", type: "type-allocate",
      title: "Match Cadets to Community Tasks",
      tip: "Tap a cadet, then tap the task that fits their skill. Match all four correctly before the timer runs out." },
    { id: "conflict", label: "CONFLICT RESOLUTION", icon: "\u{1F91D}", type: "type-conflict",
      title: "Resolve the Section Disagreement",
      tip: "Two cadets are clashing. Choose the approach that resolves it constructively and preserves morale." },
    { id: "resource", label: "RESOURCE SHARING", icon: "\u2696\uFE0F", type: "type-resource",
      title: "Distribute Supplies Fairly",
      tip: "Each team needs a fair share of the supplies. Tap a supply, then tap the team to assign it. Balance the distribution." },
    { id: "morale", label: "MORALE MANAGEMENT", icon: "\u{1F4AA}", type: "type-morale",
      title: "Respond at the Right Moment",
      tip: "Morale drifts up and down. Tap SUPPORT only when morale is in the green zone (75-100) to lock in the boost." },
    { id: "impact", label: "COMMUNITY IMPACT", icon: "\u{1F30D}", type: "type-impact",
      title: "Choose the Highest-Impact Task",
      tip: "Three service tasks are on offer but you can only take one. Pick the task with the greatest community benefit." }
  ];

  function taLoadStats() {
    try {
      const raw = localStorage.getItem(SK.arenaGame);
      if (raw) {
        const d = JSON.parse(raw);
        ta.bestStreak = d.bestStreak || 0;
        ta.score = d.score || 0;
        ta.correct = d.correct || 0;
        ta.wrong = d.wrong || 0;
        ta.round = d.round || 0;
      }
    } catch (e) {}
  }

  function taSaveStats() {
    try {
      localStorage.setItem(SK.arenaGame, JSON.stringify({
        bestStreak: ta.bestStreak,
        score: ta.score,
        correct: ta.correct,
        wrong: ta.wrong,
        round: ta.round
      }));
    } catch (e) {}
  }

  function taSetFeedback(msg, kind) {
    const fb = document.getElementById("taFeedback");
    if (!fb) return;
    fb.className = "ta-feedback " + (kind || "info");
    fb.innerHTML = msg;
  }

  function taSetModeBadge(modeId, title) {
    const badge = document.getElementById("taModeBadge");
    const titleEl = document.getElementById("taChallengeTitle");
    if (!badge || !titleEl) return;
    if (modeId) {
      const mode = TA_MODES.find(function (m) { return m.id === modeId; });
      if (mode) {
        badge.className = "ta-mode-badge " + mode.type;
        badge.textContent = mode.label;
        titleEl.textContent = mode.title;
        titleEl.classList.remove("flash");
        void titleEl.offsetWidth;
        titleEl.classList.add("flash");
      }
    } else {
      badge.className = "ta-mode-badge idle";
      badge.textContent = "SELECT MODE";
      titleEl.textContent = title || "Ready at the community centre";
    }
  }

  function taUpdateStats() {
    const set = function (id, v) { const el = document.getElementById(id); if (el) el.textContent = v; };
    set("taScore", ta.score);
    set("taCorrect", ta.correct);
    set("taWrong", ta.wrong);
    set("taStreak", ta.streak);
    set("taRound", ta.round);
  }

  function taAddLog(text, ok, score) {
    const list = document.getElementById("taLogList");
    if (!list) return;
    if (list.querySelector(".muted")) list.innerHTML = "";
    const item = document.createElement("div");
    item.className = "ta-log-item " + (ok ? "ok" : "bad");
    const modeLabel = ta.currentMode ? TA_MODES.find(function (m) { return m.id === ta.currentMode; }) : null;
    const ico = ok ? "\u2705" : "\u274C";
    item.innerHTML = '<span class="ta-log-ico">' + ico + '</span>' +
      '<span class="ta-log-text">' + (modeLabel ? modeLabel.label + " \u2014 " : "") +
      escapeHTML(text) + (score !== undefined ? ' <span class="score">[' + score + ']</span>' : '') + '</span>';
    list.insertBefore(item, list.firstChild);
  }

  // ---- Timer ----
  function taStartTimer(durationSec, onTick, onEnd) {
    taStopTimer();
    ta.timer.running = true;
    ta.timer.start = performance.now();
    ta.timer.duration = durationSec * 1000;
    const fill = document.getElementById("taTimerFill");
    const text = document.getElementById("taTimerText");
    function tick() {
      if (!ta.timer.running) return;
      const elapsed = performance.now() - ta.timer.start;
      const remaining = ta.timer.duration - elapsed;
      const pct = Math.max(0, Math.min(100, (elapsed / ta.timer.duration) * 100));
      if (fill) fill.style.width = pct + "%";
      if (text) text.textContent = Math.max(0, (remaining / 1000)).toFixed(1) + "s";
      if (onTick) onTick(elapsed, remaining);
      if (remaining <= 0) {
        ta.timer.running = false;
        if (fill) fill.style.width = "100%";
        if (text) text.textContent = "0.0s";
        if (onEnd) onEnd();
        return;
      }
      ta.timer.raf = requestAnimationFrame(tick);
    }
    ta.timer.raf = requestAnimationFrame(tick);
  }

  function taStopTimer() {
    ta.timer.running = false;
    if (ta.timer.raf) cancelAnimationFrame(ta.timer.raf);
    ta.timer.raf = null;
  }

  function taResetTimerDisplay() {
    const fill = document.getElementById("taTimerFill");
    const text = document.getElementById("taTimerText");
    if (fill) fill.style.width = "0%";
    if (text) text.textContent = "\u2014";
  }

  function taStopAllAnimations() {
    taStopTimer();
    if (ta.morale.raf) { cancelAnimationFrame(ta.morale.raf); ta.morale.raf = null; }
    ta.morale.running = false;
  }

  // ---- Team status SVG ----
  function taRenderTeam() {
    const wrap = document.getElementById("taTeamWrap");
    if (!wrap) return;
    const moralePct = Math.max(0, Math.min(100, Math.round(ta.morale.value || 60)));
    const moraleColor = moralePct >= 75 ? "#5cff9b" : moralePct >= 40 ? "#f5c84c" : "#ff5a6e";
    const cadets = ["JD", "MK", "AS", "LP", "RB"];
    let svg = '<svg viewBox="0 0 220 130" xmlns="http://www.w3.org/2000/svg">';
    // Morale bar background
    svg += '<rect x="10" y="8" width="200" height="10" rx="5" fill="#0e2820" stroke="#1a4030"/>';
    svg += '<rect x="10" y="8" width="' + (moralePct * 2) + '" height="10" rx="5" fill="' + moraleColor + '"/>';
    svg += '<text x="110" y="32" text-anchor="middle" font-size="9" fill="#7a9b88" font-family="monospace">TEAM MORALE</text>';
    // Cadet avatars in a row
    const spacing = 38;
    const startX = 110 - (spacing * (cadets.length - 1)) / 2;
    cadets.forEach(function (c, i) {
      const cx = startX + i * spacing;
      const cy = 75;
      svg += '<g class="ta-team-cadet">';
      svg += '<circle cx="' + cx + '" cy="' + cy + '" r="16" fill="#0e2820" stroke="#35a75a" stroke-width="1.5"/>';
      svg += '<text x="' + cx + '" y="' + (cy + 4) + '" text-anchor="middle" font-size="11" fill="#4ed97b" font-family="monospace" font-weight="700">' + c + '</text>';
      svg += '<text x="' + cx + '" y="' + (cy + 28) + '" text-anchor="middle" font-size="7" fill="#5a8b75">cadet</text>';
      svg += '</g>';
    });
    svg += '<text x="110" y="120" text-anchor="middle" font-size="8" fill="#5a8b75" font-family="monospace">SECTION ' + (ta.active ? 'DEPLOYED' : 'STANDBY') + '</text>';
    svg += '</svg>';
    wrap.innerHTML = svg;
  }

  // ==========================================================
  // MODE 1 — TASK ALLOCATION
  // ==========================================================
  function renderAllocationChallenge() {
    const ALLOC_CADETS = [
      { id: "jd", name: "Cdt James", icon: "\u{1F9D1}\u200D\u{1F33F}", skill: "Gardening & outdoor work" },
      { id: "mk", name: "Cdt Maria", icon: "\u{1F9D1}\u200D\u{1F4BB}", skill: "Computers & organising data" },
      { id: "as", name: "Cdt Alex", icon: "\u{1F9D1}\u200D\u{1F373}", skill: "Cooking & food service" },
      { id: "lp", name: "Cdt Liam", icon: "\u{1F469}\u200D\u{1F3EB}", skill: "Working with children" }
    ];
    const ALLOC_TASKS = [
      { id: "garden", title: "Community Garden Cleanup", icon: "\u{1F33E}", need: "Outdoor / gardening skills", match: "jd" },
      { id: "data", title: "Donation Database Entry", icon: "\u{1F4BB}", need: "Computer & data skills", match: "mk" },
      { id: "kitchen", title: "Soup Kitchen Service", icon: "\u{1F37D}\uFE0F", need: "Cooking & food skills", match: "as" },
      { id: "kids", title: "After-School Tutoring", icon: "\u{1F4D6}", need: "Teaching & child skills", match: "lp" }
    ];
    ta.allocate.cadets = shuffleArray(ALLOC_CADETS.slice());
    ta.allocate.tasks = shuffleArray(ALLOC_TASKS.slice());
    ta.allocate.selectedCadet = null;
    ta.allocate.matches = {};

    const area = document.getElementById("taChallengeArea");
    if (!area) return;
    area.innerHTML =
      '<div class="ta-alloc-wrap">' +
        '<div class="ta-alloc-prompt">Tap a cadet, then tap the matching task. Assign all four correctly before time runs out.</div>' +
        '<div class="ta-alloc-cadets" id="allocCadets">' +
          ta.allocate.cadets.map(function (c) {
            return '<div class="ta-alloc-cadet" data-cadet="' + c.id + '">' +
              '<div class="ac-ico">' + c.icon + '</div>' +
              '<div class="ac-name">' + escapeHTML(c.name) + '</div>' +
              '<div class="ac-skill">' + escapeHTML(c.skill) + '</div>' +
            '</div>';
          }).join("") +
        '</div>' +
        '<div class="ta-alloc-tasks" id="allocTasks">' +
          ta.allocate.tasks.map(function (t) {
            return '<div class="ta-alloc-task" data-task="' + t.id + '">' +
              '<span class="at-ico">' + t.icon + '</span>' +
              '<div class="at-body">' +
                '<div class="at-title">' + escapeHTML(t.title) + '</div>' +
                '<div class="at-need">' + escapeHTML(t.need) + '</div>' +
                '<div class="at-assign" id="assign-' + t.id + '">Unassigned</div>' +
              '</div>' +
            '</div>';
          }).join("") +
        '</div>' +
        '<div class="ta-alloc-instr" id="allocInstr">Select a cadet above to begin.</div>' +
      '</div>';

    function refreshCadetSel() {
      document.querySelectorAll("#allocCadets .ta-alloc-cadet").forEach(function (el) {
        el.classList.toggle("selected", el.dataset.cadet === ta.allocate.selectedCadet);
        if (ta.allocate.matches[el.dataset.cadet]) el.classList.add("matched");
      });
    }
    function refreshTasks() {
      ta.allocate.tasks.forEach(function (t) {
        const el = document.querySelector('#allocTasks .ta-alloc-task[data-task="' + t.id + '"]');
        const assign = document.getElementById("assign-" + t.id);
        if (!el || !assign) return;
        const cadetId = Object.keys(ta.allocate.matches).find(function (k) { return ta.allocate.matches[k] === t.id; });
        if (cadetId) {
          const cadet = ALLOC_CADETS.find(function (c) { return c.id === cadetId; });
          el.classList.add("matched");
          assign.textContent = "\u2192 " + (cadet ? cadet.name : "Assigned");
        } else {
          el.classList.remove("matched");
          assign.textContent = "Unassigned";
        }
      });
    }
    function checkComplete() {
      const allMatched = ta.allocate.tasks.every(function (t) {
        return ta.allocate.matches[t.match] === t.id;
      });
      const count = Object.keys(ta.allocate.matches).length;
      const instr = document.getElementById("allocInstr");
      if (instr) instr.textContent = count + "/4 assigned" + (allMatched ? " \u2014 All correct!" : "");
      if (allMatched) {
        taHandleResult(true, 10, "All four cadets matched to the right community tasks.");
      }
    }

    document.querySelectorAll("#allocCadets .ta-alloc-cadet").forEach(function (el) {
      el.addEventListener("click", function () {
        if (ta.challengeDone) return;
        if (ta.allocate.matches[el.dataset.cadet]) return; // already assigned
        ta.allocate.selectedCadet = el.dataset.cadet;
        refreshCadetSel();
        const instr = document.getElementById("allocInstr");
        if (instr) {
          const c = ALLOC_CADETS.find(function (x) { return x.id === el.dataset.cadet; });
          instr.textContent = c ? "Now tap the task for " + c.name : "Now tap a task.";
        }
      });
    });
    document.querySelectorAll("#allocTasks .ta-alloc-task").forEach(function (el) {
      el.addEventListener("click", function () {
        if (ta.challengeDone) return;
        if (!ta.allocate.selectedCadet) {
          const instr = document.getElementById("allocInstr");
          if (instr) instr.textContent = "Select a cadet first!";
          return;
        }
        const taskId = el.dataset.task;
        // remove any existing assignment to this task
        Object.keys(ta.allocate.matches).forEach(function (k) {
          if (ta.allocate.matches[k] === taskId) delete ta.allocate.matches[k];
        });
        ta.allocate.matches[ta.allocate.selectedCadet] = taskId;
        ta.allocate.selectedCadet = null;
        refreshCadetSel();
        refreshTasks();
        checkComplete();
      });
    });

    taStartTimer(20, null, function () {
      if (!ta.challengeDone) taHandleResult(false, 0, "Time's up! Not all cadets were allocated in time.");
    });
  }

  // ==========================================================
  // MODE 2 — CONFLICT RESOLUTION
  // ==========================================================
  function renderConflictChallenge() {
    const SITUATIONS = [
      {
        text: "Cdt James and Cdt Maria disagree on how to run the donation drive. James wants door-to-door; Maria wants an online campaign. Voices are rising.",
        morale: 55,
        options: [
          { id: "a", text: "Tell them both to stop arguing and do it your way.", correct: false, feedback: "Imposing a solution ignores their input and breeds resentment." },
          { id: "b", text: "Listen to both, find common ground, and combine ideas.", correct: true, feedback: "Active listening and collaboration resolve conflict constructively and lift morale." },
          { id: "c", text: "Let them argue it out \u2014 the strongest opinion wins.", correct: false, feedback: "Unmanaged conflict damages team cohesion and morale." },
          { id: "d", text: "Cancel the donation drive to avoid the conflict.", correct: false, feedback: "Avoiding the task lets the team and community down." }
        ]
      },
      {
        text: "During cleanup, Cdt Alex accuses Cdt Liam of not pulling his weight. Liam is upset \u2014 he was assigned the hardest area.",
        morale: 50,
        options: [
          { id: "a", text: "Side with Alex and tell Liam to work harder.", correct: false, feedback: "Taking sides without facts escalates the conflict." },
          { id: "b", text: "Ask both to explain, redistribute the workload fairly.", correct: true, feedback: "Understanding both sides and fair redistribution resolves the tension." },
          { id: "c", text: "Ignore it \u2014 they'll sort it out themselves.", correct: false, feedback: "Unaddressed conflict festers and hurts the team." },
          { id: "d", text: "Send Liam home for being defensive.", correct: false, feedback: "Punishing someone for being upset destroys trust." }
        ]
      },
      {
        text: "Two cadets both want to lead the community garden project. The rest of the section is watching to see how you handle it.",
        morale: 58,
        options: [
          { id: "a", text: "Pick the louder one to avoid a long discussion.", correct: false, feedback: "Choosing by assertiveness ignores merit and fairness." },
          { id: "b", text: "Split the role into co-leads with shared responsibility.", correct: true, feedback: "Sharing leadership harnesses both cadets' energy and models teamwork." },
          { id: "c", text: "Lead it yourself so neither gets the role.", correct: false, feedback: "Hoarding the role denies cadets growth opportunities." },
          { id: "d", text: "Flip a coin and move on quickly.", correct: false, feedback: "Random decisions skip the reasoning that builds buy-in." }
        ]
      }
    ];
    const sit = SITUATIONS[Math.floor(Math.random() * SITUATIONS.length)];
    ta.conflict.situation = sit;
    ta.conflict.options = sit.options;
    ta.conflict.morale = sit.morale;
    ta.conflict.resolved = false;

    const area = document.getElementById("taChallengeArea");
    if (!area) return;
    area.innerHTML =
      '<div class="ta-conflict-wrap">' +
        '<div class="ta-conflict-scene">' +
          '<div class="cs-icos">\u{1F9D1}\u200D\u2694\uFE0F\u200D\u{1F9D1}\u200D\u2694\uFE0F</div>' +
          '<div class="cs-situation">' + escapeHTML(sit.text) + '</div>' +
          '<div class="cs-morale"><div class="cs-morale-fill" id="csMoraleFill" style="width:' + sit.morale + '%"></div></div>' +
        '</div>' +
        '<div class="ta-conflict-options">' +
          sit.options.map(function (o) {
            return '<button class="ta-conflict-btn" data-opt="' + o.id + '" type="button">' + escapeHTML(o.text) + '</button>';
          }).join("") +
        '</div>' +
      '</div>';

    document.querySelectorAll(".ta-conflict-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (ta.challengeDone || ta.conflict.resolved) return;
        ta.conflict.resolved = true;
        const opt = sit.options.find(function (o) { return o.id === btn.dataset.opt; });
        if (!opt) return;
        if (opt.correct) {
          ta.conflict.morale = Math.min(100, ta.conflict.morale + 25);
          const fill = document.getElementById("csMoraleFill");
          if (fill) fill.style.width = ta.conflict.morale + "%";
          taHandleResult(true, 10, opt.feedback);
        } else {
          ta.conflict.morale = Math.max(0, ta.conflict.morale - 20);
          const fill = document.getElementById("csMoraleFill");
          if (fill) fill.style.width = ta.conflict.morale + "%";
          taHandleResult(false, 0, opt.feedback);
        }
      });
    });

    taStartTimer(15, null, function () {
      if (!ta.challengeDone) taHandleResult(false, 0, "Time's up! The conflict went unresolved.");
    });
  }

  // ==========================================================
  // MODE 3 — RESOURCE SHARING
  // ==========================================================
  function renderResourceChallenge() {
    const SUPPLIES = [
      { id: "s1", icon: "\u{1F9F9}" }, { id: "s2", icon: "\u{1F4E6}" }, { id: "s3", icon: "\u{1F6D2}" },
      { id: "s4", icon: "\u{1F4DA}" }, { id: "s5", icon: "\u{1F35C}" }, { id: "s6", icon: "\u{1F4A7}" }
    ];
    ta.resource.pool = shuffleArray(SUPPLIES.slice());
    ta.resource.teams = [
      { id: "teamA", name: "Team Alpha", need: 2, items: [] },
      { id: "teamB", name: "Team Bravo", need: 2, items: [] },
      { id: "teamC", name: "Team Charlie", need: 2, items: [] }
    ];
    ta.resource.selected = null;
    ta.resource.confirmed = false;

    const area = document.getElementById("taChallengeArea");
    if (!area) return;
    area.innerHTML =
      '<div class="ta-resource-wrap">' +
        '<div class="ta-resource-prompt">6 supplies, 3 teams. Give each team exactly 2 supplies for a fair distribution. Tap a supply, then tap a team.</div>' +
        '<div class="ta-resource-pool" id="resPool">' +
          ta.resource.pool.map(function (s) {
            return '<div class="ta-resource-item" data-supply="' + s.id + '">' + s.icon + '</div>';
          }).join("") +
        '</div>' +
        '<div class="ta-resource-teams" id="resTeams">' +
          ta.resource.teams.map(function (t) {
            return '<div class="ta-resource-team" data-team="' + t.id + '">' +
              '<div class="rt-name">' + escapeHTML(t.name) + '</div>' +
              '<div class="rt-need">Needs 2 supplies</div>' +
              '<div class="rt-slots" id="slots-' + t.id + '"></div>' +
              '<div class="rt-count" id="count-' + t.id + '">0 / 2</div>' +
            '</div>';
          }).join("") +
        '</div>' +
      '</div>';

    function refreshPool() {
      document.querySelectorAll("#resPool .ta-resource-item").forEach(function (el) {
        const assigned = ta.resource.teams.some(function (t) { return t.items.some(function (i) { return i.id === el.dataset.supply; }); });
        el.classList.toggle("assigned", assigned);
        el.classList.toggle("selected", ta.resource.selected === el.dataset.supply);
      });
    }
    function refreshTeams() {
      ta.resource.teams.forEach(function (t) {
        const slots = document.getElementById("slots-" + t.id);
        const count = document.getElementById("count-" + t.id);
        if (slots) {
          slots.innerHTML = "";
          for (let i = 0; i < 2; i++) {
            const item = t.items[i];
            slots.innerHTML += '<div class="rt-slot">' + (item ? item.icon : "") + '</div>';
          }
        }
        if (count) count.textContent = t.items.length + " / 2";
        const teamEl = document.querySelector('#resTeams .ta-resource-team[data-team="' + t.id + '"]');
        if (teamEl) teamEl.classList.toggle("balanced", t.items.length === 2);
      });
    }
    function checkComplete() {
      const allFair = ta.resource.teams.every(function (t) { return t.items.length === 2; });
      if (allFair && !ta.resource.confirmed) {
        ta.resource.confirmed = true;
        taHandleResult(true, 10, "Supplies distributed fairly \u2014 every team has exactly 2.");
      }
    }

    document.querySelectorAll("#resPool .ta-resource-item").forEach(function (el) {
      el.addEventListener("click", function () {
        if (ta.challengeDone) return;
        const assigned = ta.resource.teams.some(function (t) { return t.items.some(function (i) { return i.id === el.dataset.supply; }); });
        if (assigned) return;
        ta.resource.selected = el.dataset.supply;
        refreshPool();
      });
    });
    document.querySelectorAll("#resTeams .ta-resource-team").forEach(function (el) {
      el.addEventListener("click", function () {
        if (ta.challengeDone || !ta.resource.selected) return;
        const team = ta.resource.teams.find(function (t) { return t.id === el.dataset.team; });
        if (!team || team.items.length >= 2) return;
        const supply = ta.resource.pool.find(function (s) { return s.id === ta.resource.selected; });
        if (!supply) return;
        team.items.push(supply);
        ta.resource.selected = null;
        refreshPool();
        refreshTeams();
        checkComplete();
      });
    });

    taStartTimer(25, null, function () {
      if (!ta.challengeDone) taHandleResult(false, 0, "Time's up! Supplies were not distributed fairly.");
    });
  }

  // ==========================================================
  // MODE 4 — MORALE MANAGEMENT
  // ==========================================================
  function renderMoraleChallenge() {
    ta.morale.value = 40 + Math.random() * 15; // start around 40-55
    ta.morale.running = true;
    ta.morale.fired = false;
    ta.morale.dir = 1;
    ta.morale.lastEvent = performance.now();

    const EVENTS = [
      "A cadet completed a tough task \u2014 morale is climbing!",
      "The community thanked the section \u2014 spirits are rising!",
      "Rain started \u2014 morale may dip, watch carefully...",
      "A small setback occurred \u2014 morale is wobbling.",
      "Great teamwork on the last task \u2014 momentum building!"
    ];

    const area = document.getElementById("taChallengeArea");
    if (!area) return;
    area.innerHTML =
      '<div class="ta-morale-wrap">' +
        '<div class="ta-morale-meter-wrap">' +
          '<div class="ta-morale-label">TEAM MORALE \u2014 TAP SUPPORT IN THE GREEN ZONE (75-100)</div>' +
          '<div class="ta-morale-meter">' +
            '<div class="ta-morale-fill" id="moraleFill" style="width:' + ta.morale.value + '%"></div>' +
            '<div class="ta-morale-zone-good"></div>' +
          '</div>' +
          '<div class="ta-morale-value" id="moraleValue">' + Math.round(ta.morale.value) + '%</div>' +
        '</div>' +
        '<div class="ta-morale-event" id="moraleEvent">Morale is steady. Watch the meter...</div>' +
        '<button class="ta-morale-btn" id="moraleSupportBtn" type="button">\u{1F44F} SUPPORT THE TEAM</button>' +
      '</div>';

    const fill = document.getElementById("moraleFill");
    const valEl = document.getElementById("moraleValue");
    const eventEl = document.getElementById("moraleEvent");
    const btn = document.getElementById("moraleSupportBtn");

    function updateDisplay() {
      if (fill) fill.style.width = ta.morale.value + "%";
      if (valEl) valEl.textContent = Math.round(ta.morale.value) + "%";
      taRenderTeam();
    }

    function loop() {
      if (!ta.morale.running) return;
      // drift morale up and down
      ta.morale.value += ta.morale.dir * 0.35;
      if (ta.morale.value >= 95) { ta.morale.dir = -1; }
      if (ta.morale.value <= 20) { ta.morale.dir = 1; }
      // occasional random direction change
      if (Math.random() < 0.01) ta.morale.dir *= -1;
      // occasional event
      if (performance.now() - ta.morale.lastEvent > 4000) {
        ta.morale.lastEvent = performance.now();
        const ev = EVENTS[Math.floor(Math.random() * EVENTS.length)];
        if (eventEl) eventEl.textContent = ev;
        if (Math.random() < 0.5) ta.morale.dir *= -1;
      }
      updateDisplay();
      ta.morale.raf = requestAnimationFrame(loop);
    }
    ta.morale.raf = requestAnimationFrame(loop);

    if (btn) {
      btn.addEventListener("click", function () {
        if (ta.challengeDone || ta.morale.fired) return;
        ta.morale.fired = true;
        ta.morale.running = false;
        if (ta.morale.raf) { cancelAnimationFrame(ta.morale.raf); ta.morale.raf = null; }
        if (ta.morale.value >= 75) {
          taHandleResult(true, 10, "Support delivered at " + Math.round(ta.morale.value) + "% morale \u2014 right in the green zone!");
        } else {
          taHandleResult(false, 0, "Support delivered at " + Math.round(ta.morale.value) + "% \u2014 too low. Wait for the green zone (75-100).");
        }
      });
    }

    taStartTimer(18, null, function () {
      if (!ta.challengeDone) {
        ta.morale.running = false;
        if (ta.morale.raf) { cancelAnimationFrame(ta.morale.raf); ta.morale.raf = null; }
        taHandleResult(false, 0, "Time's up! You never supported the team.");
      }
    });
  }

  // ==========================================================
  // MODE 5 — COMMUNITY IMPACT
  // ==========================================================
  function renderImpactChallenge() {
    const TASK_SETS = [
      [
        { id: "i1", title: "Food bank sorting shift", desc: "2 hours, helps 1 food bank", icon: "\u{1F35E}", impact: 40 },
        { id: "i2", title: "Park cleanup for 200 visitors", desc: "3 hours, benefits a busy public park", icon: "\u{1F3DE}\uFE0F", impact: 85 },
        { id: "i3", title: "Help 1 elderly neighbour", desc: "1 hour, helps one household", icon: "\u{1F9D1}\u200D\u{1F373}", impact: 25 }
      ],
      [
        { id: "i1", title: "Read to 1 classroom", desc: "30 min, helps ~30 children", icon: "\u{1F4D6}", impact: 55 },
        { id: "i2", title: "Beach cleanup protecting marine life", desc: "4 hours, benefits ecosystem & 1000s of visitors", icon: "\u{1F30A}", impact: 95 },
        { id: "i3", title: "Paint 1 park bench", desc: "2 hours, helps passers-by", icon: "\u{1F6C1}", impact: 30 }
      ],
      [
        { id: "i1", title: "Blood donation drive support", desc: "3 hours, helps dozens of patients", icon: "\u{1FA78}", impact: 80 },
        { id: "i2", title: "Literacy tutoring for 1 cadet", desc: "1 hour, helps one person", icon: "\u{1F9D1}\u200D\u{1F4BB}", impact: 35 },
        { id: "i3", title: "Mend 5 community centre chairs", desc: "2 hours, helps centre users", icon: "\u{1FA91}", impact: 45 }
      ]
    ];
    const set = TASK_SETS[Math.floor(Math.random() * TASK_SETS.length)];
    ta.impact.tasks = shuffleArray(set.slice());
    ta.impact.selected = null;
    // The correct task is the one with highest impact
    ta.impact.correctOrder = set.slice().sort(function (a, b) { return b.impact - a.impact; });
    const best = ta.impact.correctOrder[0];

    const area = document.getElementById("taChallengeArea");
    if (!area) return;
    area.innerHTML =
      '<div class="ta-impact-wrap">' +
        '<div class="ta-impact-prompt">Three service tasks are available but your section can only take ONE. Tap the task with the greatest community impact.</div>' +
        '<div class="ta-impact-tasks">' +
          ta.impact.tasks.map(function (t) {
            return '<div class="ta-impact-task" data-task="' + t.id + '">' +
              '<span class="it-ico">' + t.icon + '</span>' +
              '<div class="it-body">' +
                '<div class="it-title">' + escapeHTML(t.title) + '</div>' +
                '<div class="it-desc">' + escapeHTML(t.desc) + '</div>' +
              '</div>' +
              '<div class="it-impact">+' + t.impact + '</div>' +
            '</div>';
          }).join("") +
        '</div>' +
        '<div class="ta-impact-instr">Impact values are hidden until you choose. Think about reach and benefit.</div>' +
      '</div>';

    document.querySelectorAll(".ta-impact-task").forEach(function (el) {
      el.addEventListener("click", function () {
        if (ta.challengeDone) return;
        const task = ta.impact.tasks.find(function (t) { return t.id === el.dataset.task; });
        if (!task) return;
        // reveal all impacts
        document.querySelectorAll(".ta-impact-task").forEach(function (e2) {
          e2.classList.add("selected");
          const t2 = ta.impact.tasks.find(function (t) { return t.id === e2.dataset.task; });
          if (t2) {
            const impEl = e2.querySelector(".it-impact");
            if (impEl) impEl.textContent = "+" + t2.impact;
          }
        });
        el.style.borderColor = "var(--gold)";
        el.style.boxShadow = "0 0 16px rgba(245,200,76,0.4)";
        if (task.id === best.id) {
          taHandleResult(true, 10, "Excellent choice! \"" + task.title + "\" had the highest impact (+" + task.impact + "). Strategic thinking.");
        } else {
          taHandleResult(false, 0, "\"" + task.title + "\" (+" + task.impact + ") was good, but \"" + best.title + "\" (+" + best.impact + ") helped more people.");
        }
      });
    });

    taStartTimer(15, null, function () {
      if (!ta.challengeDone) taHandleResult(false, 0, "Time's up! No task was chosen.");
    });
  }

  // ==========================================================
  // GAME LIFECYCLE
  // ==========================================================
  function taHandleResult(success, scoreVal, detailText) {
    if (ta.challengeDone) return;
    ta.challengeDone = true;
    taStopAllAnimations();
    taStopTimer();
    taResetTimerDisplay();
    if (success) {
      ta.correct++;
      ta.streak++;
      if (ta.streak > ta.bestStreak) ta.bestStreak = ta.streak;
      ta.score += scoreVal || 10;
      taSetFeedback("\u2705 <strong>WELL DONE!</strong> " + detailText + " +" + (scoreVal || 10) + " points.", "ok");
      taAddLog(detailText, true, scoreVal || 10);
    } else {
      ta.wrong++;
      ta.streak = 0;
      taSetFeedback("\u274C <strong>NOT QUITE.</strong> " + detailText, "err");
      taAddLog(detailText, false, 0);
    }
    recordAttempt(success);
    taUpdateStats();
    taSaveStats();
    renderSidebar();
    renderTopStats();
    renderAnalysis();
    document.getElementById("taNextBtn").disabled = false;
  }

  function taStartQualification() {
    taStopAllAnimations();
    ta.active = true;
    ta.examMode = false;
    ta.score = 0;
    ta.correct = 0;
    ta.wrong = 0;
    ta.streak = 0;
    ta.round = 0;
    ta.totalRounds = 0;
    ta.challengePool = shuffleArray(TA_MODES.map(function (m) { return m.id; }));
    ta.poolIndex = 0;
    taUpdateStats();
    taRenderTeam();
    document.getElementById("taStartBtn").disabled = true;
    document.getElementById("taExamBtn").disabled = true;
    document.getElementById("taNextBtn").disabled = true;
    taNextMode();
  }

  function taStartExamMode() {
    taStopAllAnimations();
    ta.active = true;
    ta.examMode = true;
    ta.score = 0;
    ta.correct = 0;
    ta.wrong = 0;
    ta.streak = 0;
    ta.round = 0;
    ta.totalRounds = 5;
    ta.challengePool = [];
    for (let i = 0; i < 5; i++) {
      ta.challengePool.push(TA_MODES[Math.floor(Math.random() * TA_MODES.length)].id);
    }
    ta.poolIndex = 0;
    taUpdateStats();
    taRenderTeam();
    document.getElementById("taStartBtn").disabled = true;
    document.getElementById("taExamBtn").disabled = true;
    document.getElementById("taNextBtn").disabled = true;
    taSetFeedback("<strong>EXAM MODE</strong> \u2014 5 rounds, random teamwork modes. Qualify with 4 out of 5. The community is counting on you!", "info");
    setTimeout(function () { taNextMode(); }, 800);
  }

  function taNextMode() {
    taStopAllAnimations();
    if (ta.poolIndex >= ta.challengePool.length) {
      taFinishQualification();
      return;
    }
    ta.currentMode = ta.challengePool[ta.poolIndex];
    ta.poolIndex++;
    ta.round++;
    ta.challengeDone = false;
    taUpdateStats();
    document.getElementById("taNextBtn").disabled = true;
    taSetModeBadge(ta.currentMode);
    const mode = TA_MODES.find(function (m) { return m.id === ta.currentMode; });
    taSetFeedback("<strong>" + mode.label + "</strong> \u2014 " + mode.tip, "info");

    if (ta.currentMode === "allocate") renderAllocationChallenge();
    else if (ta.currentMode === "conflict") renderConflictChallenge();
    else if (ta.currentMode === "resource") renderResourceChallenge();
    else if (ta.currentMode === "morale") renderMoraleChallenge();
    else if (ta.currentMode === "impact") renderImpactChallenge();
  }

  function taReset() {
    taStopAllAnimations();
    ta.active = false;
    ta.examMode = false;
    ta.currentMode = null;
    ta.score = 0;
    ta.correct = 0;
    ta.wrong = 0;
    ta.streak = 0;
    ta.round = 0;
    ta.challengeDone = false;
    ta.morale.value = 60;
    taResetTimerDisplay();
    taSetModeBadge(null);
    taUpdateStats();
    taRenderTeam();
    const area = document.getElementById("taChallengeArea");
    if (area) area.innerHTML =
      '<div class="ta-idle-prompt">' +
        '<div class="ta-idle-ico">\u{1F3D8}\uFE0F</div>' +
        '<h2>Five Teamwork Qualification Modes</h2>' +
        '<div class="ta-mode-list">' +
          '<div class="ta-mode-item"><span class="ta-mode-ico">\u{1F4CB}</span><div><strong>Task Allocation</strong> \u2014 Match each cadet to the community task that fits their skills.</div></div>' +
          '<div class="ta-mode-item"><span class="ta-mode-ico">\u{1F91D}</span><div><strong>Conflict Resolution</strong> \u2014 Choose the right approach to resolve a disagreement constructively.</div></div>' +
          '<div class="ta-mode-item"><span class="ta-mode-ico">\u2696\uFE0F</span><div><strong>Resource Sharing</strong> \u2014 Distribute limited supplies fairly across all teams.</div></div>' +
          '<div class="ta-mode-item"><span class="ta-mode-ico">\u{1F4AA}</span><div><strong>Morale Management</strong> \u2014 Respond to your team at the right moment to keep spirits high.</div></div>' +
          '<div class="ta-mode-item"><span class="ta-mode-ico">\u{1F30D}</span><div><strong>Community Impact</strong> \u2014 Prioritise the service task with the greatest community benefit.</div></div>' +
        '</div>' +
        '<p class="muted" style="font-size:12px; margin-top:14px;">Press <strong>Start Qualification</strong> to begin. Modes are called one at a time in random order.</p>' +
      '</div>';
    const list = document.getElementById("taLogList");
    if (list) list.innerHTML = '<p class="muted" style="font-size:11px; padding:8px;">No decisions made yet.</p>';
    taSetFeedback("Arena reset. Press <strong>Start Qualification</strong> to begin.", "info");
    document.getElementById("taStartBtn").disabled = false;
    document.getElementById("taExamBtn").disabled = false;
    document.getElementById("taNextBtn").disabled = true;
  }

  function taFinishQualification() {
    ta.active = false;
    taStopAllAnimations();
    ta.currentMode = null;
    taSetModeBadge(null, "Qualification Complete");
    taResetTimerDisplay();
    document.getElementById("taStartBtn").disabled = false;
    document.getElementById("taExamBtn").disabled = false;
    document.getElementById("taNextBtn").disabled = true;
    const total = ta.correct + ta.wrong;
    const pct = total > 0 ? Math.round((ta.correct / total) * 100) : 0;
    let msg = "";
    if (ta.examMode) {
      if (ta.correct >= 4) {
        msg = "<strong>QUALIFIED!</strong> You passed the teamwork exam with " + ta.correct + "/5. Score: " + ta.score + ". You are a true team leader.";
        addXP(50);
        saveState();
        renderSidebar(); renderTopStats(); renderCommand();
        toast("ok", "Teamwork Exam Passed! +50 XP");
      } else {
        msg = "<strong>NOT YET QUALIFIED.</strong> You scored " + ta.correct + "/5. You need 4/5 to pass. Keep practising \u2014 teamwork is a skill that grows with effort.";
      }
    } else {
      if (pct >= 80) {
        msg = "<strong>OUTSTANDING TEAMWORK!</strong> " + ta.correct + "/" + total + " correct (" + pct + "%). Score: " + ta.score + ". Try Exam Mode for formal qualification.";
      } else if (pct >= 50) {
        msg = "<strong>SOLID EFFORT.</strong> " + ta.correct + "/" + total + " correct (" + pct + "%). Score: " + ta.score + ". Review the Learn library and try again.";
      } else {
        msg = "<strong>KEEP TRAINING.</strong> " + ta.correct + "/" + total + " correct (" + pct + "%). Study the Learn library and practise each mode.";
      }
    }
    taSetFeedback(msg, pct >= 50 ? "ok" : "err");
    const area = document.getElementById("taChallengeArea");
    if (area) area.innerHTML =
      '<div class="ta-idle-prompt">' +
        '<div class="ta-idle-ico">\u{1F3D8}\uFE0F</div>' +
        '<h2>Qualification Complete</h2>' +
        '<p style="color:var(--ink-2); font-size:13px; line-height:1.6;">' + msg.replace(/<[^>]+>/g, "") + '</p>' +
        '<p class="muted" style="font-size:12px; margin-top:14px;">Press <strong>Start Qualification</strong> for another round, or <strong>Exam Mode</strong> for the formal test.</p>' +
      '</div>';
  }

  function renderArenaGame() {
    taLoadStats();
    taUpdateStats();
    taRenderTeam();
    taResetTimerDisplay();
    taSetModeBadge(null);

    const startBtn = document.getElementById("taStartBtn");
    const nextBtn = document.getElementById("taNextBtn");
    const examBtn = document.getElementById("taExamBtn");
    const resetBtn = document.getElementById("taResetBtn");
    if (startBtn) startBtn.addEventListener("click", taStartQualification);
    if (nextBtn) nextBtn.addEventListener("click", taNextMode);
    if (examBtn) examBtn.addEventListener("click", taStartExamMode);
    if (resetBtn) resetBtn.addEventListener("click", taReset);
  }

  // ==========================================================
  // SECTION SWITCHING
  // ==========================================================
  function switchSection(name) {
    document.querySelectorAll(".section").forEach(function (s) { s.classList.remove("active"); });
    const target = document.getElementById("section-" + name);
    if (target) target.classList.add("active");
    document.querySelectorAll(".nav-btn").forEach(function (b) {
      b.classList.toggle("active", b.dataset.section === name);
    });
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
    const sel = document.getElementById("missionSelector");
    const con = document.getElementById("missionConsole");
    if (sel) sel.style.display = "none";
    if (con) con.style.display = "block";
    renderMissionConsole();
  }

  // ==========================================================
  // TOAST
  // ==========================================================
  let toastTimer = null;
  function toast(kind, text) {
    const t = document.getElementById("toast");
    if (!t) return;
    const ico = document.getElementById("toastIco");
    const txt = document.getElementById("toastText");
    t.className = "toast " + kind;
    if (ico) ico.textContent = kind === "ok" ? "\u2705" : kind === "warn" ? "\u26a0\ufe0f" : kind === "err" ? "\u274c" : "\u2139\ufe0f";
    if (txt) txt.textContent = text;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("show"); }, 3500);
  }

  // ==========================================================
  // HELPER: escapeHTML
  // ==========================================================
  function escapeHTML(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ── i18n: translate data arrays in-place ── */
  if (typeof trMutate === "function") {
    try { trMutate(ALLOC_CADETS); } catch(e) {}
    try { trMutate(ALLOC_TASKS); } catch(e) {}
    try { trMutate(EVENTS); } catch(e) {}
    try { trMutate(LEARN_ARTICLES); } catch(e) {}
    try { trMutate(MISSIONS); } catch(e) {}
    try { trMutate(RANKS); } catch(e) {}
    try { trMutate(SITUATIONS); } catch(e) {}
    try { trMutate(SK); } catch(e) {}
    try { trMutate(SUPPLIES); } catch(e) {}
    try { trMutate(TASK_SETS); } catch(e) {}
    try { trMutate(TA_MODES); } catch(e) {}
    try { trMutate(TOOLS); } catch(e) {}
    try { trMutate(cadets); } catch(e) {}
    try { trMutate(sliderValue); } catch(e) {}
    try { trMutate(statusMap); } catch(e) {}
    try { trMutate(toggleState); } catch(e) {}
  }



  // ==========================================================
  // INIT
  // ==========================================================
  function init() {
    document.querySelectorAll(".nav-btn").forEach(function (b) {
      b.addEventListener("click", function () { switchSection(b.dataset.section); });
    });

    const mb = document.getElementById("mobileMenuBtn");
    if (mb) mb.addEventListener("click", function () {
      document.getElementById("sidebar").classList.toggle("open");
    });

    const fsb = document.getElementById("fileSitrepBtn");
    if (fsb) fsb.addEventListener("click", fileSitrep);

    const params = new URLSearchParams(window.location.search);
    const deepMission = params.get("mission");

    loadState();
    taLoadStats();
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
      const m = MISSIONS.find(function (x) { return x.id === deepMission; });
      if (m) setTimeout(function () { openMission(m.id); }, 200);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
