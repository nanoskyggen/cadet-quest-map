/* ============================================================
   LEADERSHIP FUNDAMENTALS TRAINING COMMAND — leadership_training.js
   Red Star PO 203 — 8 leadership modules (M203.01–M203.08)
   + Leadership Arena interactive confirmation game
   Based on A-CR-CCP-702/PF-001 instructional guide
   ============================================================ */
(function () {
  "use strict";

  // ==========================================================
  // STORAGE KEYS
  // ==========================================================
  const SK = {
    progress: "leadershipProgress_v1",
    sitreps: "leadershipSitreps_v1",
    wrongAttempts: "leadershipWrong_v1",
    streak: "leadershipStreak_v1",
    bestStreak: "leadershipBestStreak_v1",
    readArticles: "leadershipRead_v1",
    arenaGame: "leadershipArenaGame_v1",
  };
  const MAP_PROGRESS_KEY = "cadetMapDemoYear2Completed";
  const LEADERSHIP_ARENA_BADGE = "leadership_arena";

  // ==========================================================
  // RANKS — Red Star leadership cadet rank ladder
  // ==========================================================
  const RANKS = [
    { id: 0, name: "Red Star Cadet",      icon: "★",  xp: 0,    callsign: "LEADER-1" },
    { id: 1, name: "Peer Leader",         icon: "🤝", xp: 400,  callsign: "PEER-1" },
    { id: 2, name: "Section 2IC",         icon: "📋", xp: 800,  callsign: "2IC-1" },
    { id: 3, name: "Junior Leader",       icon: "🎖️", xp: 1300, callsign: "JR-1" },
    { id: 4, name: "Team Commander",      icon: "⭐", xp: 1900, callsign: "CMDR-1" },
    { id: 5, name: "Leadership Excellence", icon: "🏆", xp: 2600, callsign: "EXCEL-1" },
  ];

  // ==========================================================
  // TOOLS — reference materials cadets "open" during missions
  // ==========================================================
  const TOOLS = [
    { id: "leadership_manual",      icon: "📋", label: "Leadership Manual" },
    { id: "comms_guide",            icon: "🗣️", label: "Communication Guide" },
    { id: "problem_solving_kit",    icon: "🧩", label: "Problem-Solving Toolkit" },
    { id: "integrity_charter",      icon: "⚖️", label: "Integrity Charter" },
    { id: "goal_map_template",      icon: "🎯", label: "Goal Mapping Template" },
    { id: "influence_cards",        icon: "🃏", label: "Influence Behaviour Cards" },
    { id: "team_dynamics_playbook", icon: "👥", label: "Team Dynamics Playbook" },
    { id: "trust_game_guide",       icon: "🤝", label: "Trust Game Guide" },
  ];

  // ==========================================================
  // SCENE SVG GENERATORS — Leadership scenes
  // ==========================================================
  function sceneSVG(scene) {
    const W = 600, H = 180;
    const base = '<svg viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">';
    const end = '</svg>';
    const grad = function (id, c1, c2) {
      return '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + c1 + '"/><stop offset="1" stop-color="' + c2 + '"/></linearGradient></defs>';
    };

    if (scene === "peer_setting") {
      return base + grad("g", "#1f0e0e", "#160a0a") +
        '<rect width="' + W + '" height="' + H + '" fill="url(#g)"/>' +
        '<rect x="40" y="25" width="520" height="130" rx="6" fill="#2a1414" stroke="#d52b1e"/>' +
        '<text x="300" y="48" fill="#ff5a4e" font-size="11" font-family="monospace" text-anchor="middle" font-weight="bold">PEER LEADERSHIP SETTING</text>' +
        '<g font-family="monospace" font-size="8" fill="#f5c84c" text-anchor="middle">' +
          '<circle cx="120" cy="95" r="18" fill="#3a1a1a" stroke="#d52b1e"/><text x="120" y="98">YOU</text>' +
          '<circle cx="200" cy="95" r="14" fill="#3a1a1a" stroke="#f5c84c"/><text x="200" y="98">P1</text>' +
          '<circle cx="270" cy="95" r="14" fill="#3a1a1a" stroke="#f5c84c"/><text x="270" y="98">P2</text>' +
          '<circle cx="340" cy="95" r="14" fill="#3a1a1a" stroke="#f5c84c"/><text x="340" y="98">P3</text>' +
          '<circle cx="410" cy="95" r="14" fill="#3a1a1a" stroke="#f5c84c"/><text x="410" y="98">P4</text>' +
          '<rect x="90" y="125" width="420" height="20" rx="4" fill="#1f0e0e" stroke="#d52b1e"/><text x="300" y="139" fill="#ff5a4e">CHAIN OF COMMAND — FOLLOW — SET THE EXAMPLE</text>' +
        '</g>' + end;
    }
    if (scene === "principles") {
      return base + grad("g", "#1f0e0e", "#160a0a") +
        '<rect width="' + W + '" height="' + H + '" fill="url(#g)"/>' +
        '<rect x="40" y="25" width="520" height="130" rx="6" fill="#2a1414" stroke="#d52b1e"/>' +
        '<text x="300" y="48" fill="#ff5a4e" font-size="11" font-family="monospace" text-anchor="middle" font-weight="bold">THREE PRINCIPLES OF LEADERSHIP</text>' +
        '<g font-family="monospace" font-size="9" fill="#f5c84c" text-anchor="middle">' +
          '<rect x="60" y="65" width="150" height="35" rx="4" fill="#1f0e0e" stroke="#d52b1e"/><text x="135" y="87">1. INFLUENCE</text>' +
          '<rect x="225" y="65" width="150" height="35" rx="4" fill="#1f0e0e" stroke="#d52b1e"/><text x="300" y="87">2. +/− INFLUENCE</text>' +
          '<rect x="390" y="65" width="150" height="35" rx="4" fill="#1f0e0e" stroke="#d52b1e"/><text x="465" y="87">3. OPPORTUNITIES</text>' +
          '<rect x="120" y="115" width="360" height="28" rx="4" fill="#1f0e0e" stroke="#f5c84c"/><text x="300" y="133" fill="#ff5a4e">LEADERSHIP IS A DEMONSTRABLE SKILL</text>' +
        '</g>' + end;
    }
    if (scene === "communication") {
      return base + grad("g", "#1f0e0e", "#160a0a") +
        '<rect width="' + W + '" height="' + H + '" fill="url(#g)"/>' +
        '<rect x="40" y="25" width="520" height="130" rx="6" fill="#2a1414" stroke="#d52b1e"/>' +
        '<text x="300" y="48" fill="#ff5a4e" font-size="11" font-family="monospace" text-anchor="middle" font-weight="bold">EFFECTIVE COMMUNICATION</text>' +
        '<g font-family="monospace" font-size="9" fill="#f5c84c" text-anchor="middle">' +
          '<rect x="70" y="65" width="120" height="30" rx="4" fill="#1f0e0e" stroke="#d52b1e"/><text x="130" y="84">SENDING</text>' +
          '<rect x="240" y="65" width="120" height="30" rx="4" fill="#1f0e0e" stroke="#d52b1e"/><text x="300" y="84">RECEIVING</text>' +
          '<rect x="410" y="65" width="120" height="30" rx="4" fill="#1f0e0e" stroke="#d52b1e"/><text x="470" y="84">RESPONDING</text>' +
          '<text x="300" y="120" fill="#ff5a4e">EYE CONTACT — POSTURE — GESTURES — TONE</text>' +
          '<text x="300" y="140" fill="#f5c84c" font-size="7">NON-VERBAL CUES ARE 70%+ OF COMMUNICATION</text>' +
        '</g>' + end;
    }
    if (scene === "group_dynamics") {
      return base + grad("g", "#1f0e0e", "#160a0a") +
        '<rect width="' + W + '" height="' + H + '" fill="url(#g)"/>' +
        '<rect x="40" y="25" width="520" height="130" rx="6" fill="#2a1414" stroke="#d52b1e"/>' +
        '<text x="300" y="48" fill="#ff5a4e" font-size="11" font-family="monospace" text-anchor="middle" font-weight="bold">POSITIVE GROUP DYNAMICS</text>' +
        '<g font-family="monospace" font-size="8" fill="#f5c84c" text-anchor="middle">' +
          '<rect x="60" y="62" width="110" height="30" rx="4" fill="#1f0e0e" stroke="#d52b1e"/><text x="115" y="81">CLEAR COMMS</text>' +
          '<rect x="180" y="62" width="110" height="30" rx="4" fill="#1f0e0e" stroke="#d52b1e"/><text x="235" y="81">COOPERATION</text>' +
          '<rect x="300" y="62" width="110" height="30" rx="4" fill="#1f0e0e" stroke="#d52b1e"/><text x="355" y="81">SHARED GOAL</text>' +
          '<rect x="420" y="62" width="120" height="30" rx="4" fill="#1f0e0e" stroke="#d52b1e"/><text x="480" y="81">ESPRIT DE CORPS</text>' +
          '<rect x="120" y="110" width="360" height="30" rx="4" fill="#1f0e0e" stroke="#f5c84c"/><text x="300" y="129" fill="#ff5a4e">TRUST — SAFE ENVIRONMENT — APPRECIATE OTHERS</text>' +
        '</g>' + end;
    }
    if (scene === "influence") {
      return base + grad("g", "#1f0e0e", "#160a0a") +
        '<rect width="' + W + '" height="' + H + '" fill="url(#g)"/>' +
        '<rect x="40" y="25" width="520" height="130" rx="6" fill="#2a1414" stroke="#d52b1e"/>' +
        '<text x="300" y="48" fill="#ff5a4e" font-size="11" font-family="monospace" text-anchor="middle" font-weight="bold">THREE INFLUENCE BEHAVIOURS</text>' +
        '<g font-family="monospace" font-size="9" fill="#f5c84c" text-anchor="middle">' +
          '<rect x="60" y="65" width="150" height="35" rx="4" fill="#1f0e0e" stroke="#d52b1e"/><text x="135" y="87">DIRECTIVE</text>' +
          '<rect x="225" y="65" width="150" height="35" rx="4" fill="#1f0e0e" stroke="#d52b1e"/><text x="300" y="87">PERSUASIVE</text>' +
          '<rect x="390" y="65" width="150" height="35" rx="4" fill="#1f0e0e" stroke="#d52b1e"/><text x="465" y="87">PARTICIPATIVE</text>' +
          '<rect x="100" y="115" width="400" height="28" rx="4" fill="#1f0e0e" stroke="#f5c84c"/><text x="300" y="133" fill="#ff5a4e">TELL — CONVINCE — SHARE DECISION-MAKING</text>' +
        '</g>' + end;
    }
    if (scene === "problem_solving") {
      return base + grad("g", "#1f0e0e", "#160a0a") +
        '<rect width="' + W + '" height="' + H + '" fill="url(#g)"/>' +
        '<rect x="40" y="25" width="520" height="130" rx="6" fill="#2a1414" stroke="#d52b1e"/>' +
        '<text x="300" y="48" fill="#ff5a4e" font-size="11" font-family="monospace" text-anchor="middle" font-weight="bold">8-STEP PROBLEM-SOLVING PROCESS</text>' +
        '<g font-family="monospace" font-size="7" fill="#f5c84c" text-anchor="middle">' +
          '<rect x="50" y="60" width="120" height="22" rx="3" fill="#1f0e0e" stroke="#d52b1e"/><text x="110" y="75">1. CONFIRM TASK</text>' +
          '<rect x="180" y="60" width="120" height="22" rx="3" fill="#1f0e0e" stroke="#d52b1e"/><text x="240" y="75">2. IDENTIFY PROBLEM</text>' +
          '<rect x="310" y="60" width="120" height="22" rx="3" fill="#1f0e0e" stroke="#d52b1e"/><text x="370" y="75">3. CRITICAL FACTOR</text>' +
          '<rect x="440" y="60" width="110" height="22" rx="3" fill="#1f0e0e" stroke="#d52b1e"/><text x="495" y="75">4. ALTERNATIVES</text>' +
          '<rect x="50" y="92" width="120" height="22" rx="3" fill="#1f0e0e" stroke="#f5c84c"/><text x="110" y="107">5. COMPARE</text>' +
          '<rect x="180" y="92" width="120" height="22" rx="3" fill="#1f0e0e" stroke="#f5c84c"/><text x="240" y="107">6. BEST SOLUTION</text>' +
          '<rect x="310" y="92" width="120" height="22" rx="3" fill="#1f0e0e" stroke="#f5c84c"/><text x="370" y="107">7. IMPLEMENT</text>' +
          '<rect x="440" y="92" width="110" height="22" rx="3" fill="#1f0e0e" stroke="#f5c84c"/><text x="495" y="107">8. EVALUATE</text>' +
          '<text x="300" y="135" fill="#ff5a4e" font-size="8">LOGICAL ANALYSIS — SIMPLEST — SAFEST — MOST FLEXIBLE</text>' +
        '</g>' + end;
    }
    if (scene === "integrity") {
      return base + grad("g", "#1f0e0e", "#160a0a") +
        '<rect width="' + W + '" height="' + H + '" fill="url(#g)"/>' +
        '<rect x="40" y="25" width="520" height="130" rx="6" fill="#2a1414" stroke="#d52b1e"/>' +
        '<text x="300" y="48" fill="#ff5a4e" font-size="11" font-family="monospace" text-anchor="middle" font-weight="bold">PERSONAL INTEGRITY</text>' +
        '<g font-family="monospace" font-size="8" fill="#f5c84c" text-anchor="middle">' +
          '<rect x="70" y="62" width="100" height="28" rx="4" fill="#1f0e0e" stroke="#d52b1e"/><text x="120" y="80">SAYS</text>' +
          '<rect x="180" y="62" width="100" height="28" rx="4" fill="#1f0e0e" stroke="#d52b1e"/><text x="230" y="80">DOES</text>' +
          '<rect x="290" y="62" width="100" height="28" rx="4" fill="#1f0e0e" stroke="#f5c84c"/><text x="340" y="80">= TRUST</text>' +
          '<text x="300" y="115" fill="#ff5a4e" font-size="8">INTEGRITY → TRUST → CONFIDENCE → RELATIONSHIPS → LEADERSHIP</text>' +
          '<text x="300" y="135" fill="#f5c84c" font-size="7">"WE ARE WHAT WE REPEATEDLY DO. EXCELLENCE IS A HABIT." — ARISTOTLE</text>' +
        '</g>' + end;
    }
    if (scene === "team_building") {
      return base + grad("g", "#1f0e0e", "#160a0a") +
        '<rect width="' + W + '" height="' + H + '" fill="url(#g)"/>' +
        '<rect x="40" y="25" width="520" height="130" rx="6" fill="#2a1414" stroke="#d52b1e"/>' +
        '<text x="300" y="48" fill="#ff5a4e" font-size="11" font-family="monospace" text-anchor="middle" font-weight="bold">TEAM-BUILDING TRUST GAMES</text>' +
        '<g font-family="monospace" font-size="9" fill="#f5c84c" text-anchor="middle">' +
          '<rect x="80" y="65" width="200" height="35" rx="4" fill="#1f0e0e" stroke="#d52b1e"/><text x="180" y="87">ACT 1: PALM BALANCE</text>' +
          '<rect x="320" y="65" width="200" height="35" rx="4" fill="#1f0e0e" stroke="#d52b1e"/><text x="420" y="87">ACT 2: SLICE & DICE</text>' +
          '<text x="300" y="125" fill="#ff5a4e" font-size="8">BUILD MUTUAL TRUST THROUGH SHARED EXPERIENCE</text>' +
        '</g>' + end;
    }
    return base + '<rect width="' + W + '" height="' + H + '" fill="#160a0a"/>' + end;
  }

  // ==========================================================
  // MISSIONS — 8 Red Star Leadership modules (PO 203)
  // ==========================================================
  const MISSIONS = [
    {
      id: "m203_01",
      order: 1,
      tag: "M203.01",
      icon: "⭐",
      title: "Leadership Within a Peer Setting",
      desc: "Discuss the responsibilities of a Red Star cadet leading peers — chain of command, setting the example, and goal mapping.",
      xp: 150,
      brief: "Your section commander has tasked you with leading a peer group for the first time. As a Red Star cadet, you must understand your responsibilities: follow the chain of command, set the example for your peers, be firm fair and friendly, show respect, be aware of safety hazards, display initiative, and set goals. Use the Leadership Manual and Goal Mapping Template to prepare for your first peer leadership assignment.",
      scene: "peer_setting",
      chapters: ["Cadet Responsibilities", "Goal Mapping Activity"],
      tasks: [
        {
          type: "select",
          tool: "leadership_manual",
          title: "Identify the Chain of Command",
          prompt: "As a Red Star cadet leading peers, what is your first responsibility regarding the chain of command?",
          options: [
            "Follow the chain of command at all times",
            "Skip ranks when you disagree with an order",
            "Give orders to cadets above your rank",
            "Ignore the chain of command in peer settings"
          ],
          expected: "Follow the chain of command at all times",
          proof: "Correct! Following the chain of command is a core responsibility of a Red Star cadet. Orders flow through proper channels."
        },
        {
          type: "select",
          tool: "leadership_manual",
          title: "Set the Example",
          prompt: "Which of the following best describes what it means to set the example as a Red Star cadet?",
          options: [
            "Tell your peers what to do while doing something different yourself",
            "Model the behaviour and standards you expect from your peers",
            "Let your peers figure out standards on their own",
            "Only set the example during inspections"
          ],
          expected: "Model the behaviour and standards you expect from your peers",
          proof: "Correct! Setting the example means your actions match your words — your peers will follow what you do, not just what you say."
        },
        {
          type: "select",
          tool: "leadership_manual",
          title: "Firm, Fair, and Friendly",
          prompt: "When leading peers, a Red Star cadet should be firm, fair, and friendly. What does this mean in practice?",
          options: [
            "Be strict with some peers and lenient with others",
            "Be overly friendly and ignore standards to be liked",
            "Maintain standards consistently while treating all peers with respect",
            "Be firm only with cadets you do not know personally"
          ],
          expected: "Maintain standards consistently while treating all peers with respect",
          proof: "Correct! Being firm, fair, and friendly means holding consistent standards while treating everyone with respect — no favourites."
        },
        {
          type: "note",
          tool: "goal_map_template",
          title: "Goal Mapping Activity",
          prompt: "Using the Goal Mapping Template, write a personal leadership goal you want to achieve as a Red Star cadet. Include the goal and one step you will take to reach it.",
          keywords: ["goal", "lead", "step"],
          proof: "Excellent! Goal mapping helps you identify what you want to achieve and plan the steps to get there."
        }
      ]
    },
    {
      id: "m203_02",
      order: 2,
      tag: "M203.02",
      icon: "💡",
      title: "Principles of Leadership",
      desc: "Discuss the three principles of leadership: influence, positive vs negative influence, and leadership creating opportunities.",
      xp: 150,
      brief: "Before you can lead effectively, you must understand the fundamental principles of leadership. Leadership is a demonstrable skill — it can be displayed and observed. There are three core principles: leadership is influence, influence can be positive or negative, and leadership can create opportunities in life. Study the Leadership Manual to master these principles, then apply them to real youth leadership narratives like Simon Jackson and the Spirit Bear.",
      scene: "principles",
      chapters: ["Three Principles of Leadership", "Youth Leadership Narratives"],
      tasks: [
        {
          type: "select",
          tool: "leadership_manual",
          title: "First Principle — Leadership is Influence",
          prompt: "What is the first principle of leadership?",
          options: [
            "Leadership is authority",
            "Leadership is influence",
            "Leadership is rank",
            "Leadership is power"
          ],
          expected: "Leadership is influence",
          proof: "Correct! The first principle is that leadership is influence — the ability to influence others is fundamental to the leadership process."
        },
        {
          type: "select",
          tool: "leadership_manual",
          title: "Second Principle — Positive or Negative",
          prompt: "The second principle states that influence can be positive or negative. How should a leader use their influence?",
          options: [
            "Use influence to benefit themselves only",
            "Use influence to manipulate others for personal gain",
            "Use influence in a positive manner to help their community and team",
            "Use influence however they see fit regardless of consequences"
          ],
          expected: "Use influence in a positive manner to help their community and team",
          proof: "Correct! Positive influence helps the community, school, family, and the world. Negative influence helps no one, not even the leader."
        },
        {
          type: "select",
          tool: "leadership_manual",
          title: "Demonstrable Skill",
          prompt: "What does it mean that leadership is a demonstrable skill?",
          options: [
            "Leadership cannot be learned or improved",
            "Leadership can be displayed and observed, and improved with practice",
            "Leadership is only for people born with it",
            "Leadership is a theory that cannot be shown"
          ],
          expected: "Leadership can be displayed and observed, and improved with practice",
          proof: "Correct! Leadership can be displayed and observed by you and by others. The skills involved can be learned and improved with practice."
        },
        {
          type: "select",
          tool: "leadership_manual",
          title: "Youth Leadership — Simon Jackson",
          prompt: "Simon Jackson is an example of positive youth leadership. What did he do to show leadership?",
          options: [
            "He started a lemonade stand and later built the Spirit Bear Youth Coalition to protect Kermode bears",
            "He became a politician to pass environmental laws",
            "He donated money to save endangered pandas in China",
            "He wrote a book about leadership theory"
          ],
          expected: "He started a lemonade stand and later built the Spirit Bear Youth Coalition to protect Kermode bears",
          proof: "Correct! Simon Jackson used his influence positively — from a lemonade stand to the Spirit Bear Youth Coalition, persuading 700 kids to write letters protecting bear habitat."
        }
      ]
    },
    {
      id: "m203_03",
      order: 3,
      tag: "M203.03",
      icon: "🗣️",
      title: "Effective Communication in a Peer Setting",
      desc: "Discuss communication fundamentals — sending, receiving, responding, and non-verbal cues like eye contact, posture, and tone.",
      xp: 150,
      brief: "Communication is fundamental to influencing others. To lead your peers effectively, you must master both verbal and non-verbal communication. There are three components to every message: sending the message, receiving the message, and responding to the message. Non-verbal communication — eye contact, body posture, gestures, facial expressions, and voice tone and volume — carries the majority of meaning. Use the Communication Guide to prepare for a critical peer briefing.",
      scene: "communication",
      chapters: ["Three Components of Communication", "Non-Verbal Communication"],
      tasks: [
        {
          type: "select",
          tool: "comms_guide",
          title: "Three Components of a Message",
          prompt: "What are the three components of communicating a message?",
          options: [
            "Talking, listening, and writing",
            "Sending the message, receiving the message, and responding to the message",
            "Planning, executing, and reviewing",
            "Thinking, speaking, and acting"
          ],
          expected: "Sending the message, receiving the message, and responding to the message",
          proof: "Correct! Every act of communication has three parts — sending, receiving, and responding. All three must work for communication to be effective."
        },
        {
          type: "select",
          tool: "comms_guide",
          title: "Non-Verbal Communication",
          prompt: "Which of the following are forms of non-verbal communication?",
          options: [
            "Eye contact, body posture, gestures, facial expressions, and voice tone/volume",
            "Only the words you choose to say",
            "Radio messages and written orders",
            "Email and text messages"
          ],
          expected: "Eye contact, body posture, gestures, facial expressions, and voice tone/volume",
          proof: "Correct! Non-verbal communication includes eye contact, body posture, gestures, facial expressions, and voice tone and volume. These often carry more meaning than words."
        },
        {
          type: "select",
          tool: "comms_guide",
          title: "Eye Contact",
          prompt: "When briefing your peers, why is maintaining eye contact important?",
          options: [
            "It intimidates your peers into compliance",
            "It shows you are engaged, confident, and focused on the person you are addressing",
            "It is only important during inspections",
            "Eye contact is disrespectful in a peer setting"
          ],
          expected: "It shows you are engaged, confident, and focused on the person you are addressing",
          proof: "Correct! Eye contact signals engagement and confidence. It helps build trust and ensures your message is received."
        },
        {
          type: "note",
          tool: "comms_guide",
          title: "Plan Your Briefing",
          prompt: "You are about to brief your peer group on a training task. Write a short plan describing how you will use your voice tone and body posture to communicate effectively. Include at least one non-verbal technique.",
          keywords: ["tone", "posture", "communicate"],
          proof: "Excellent! Effective communication combines clear words with confident non-verbal cues. Your peers will respond to both."
        }
      ]
    },
    {
      id: "m203_04",
      order: 4,
      tag: "M203.04",
      icon: "👥",
      title: "Positive Group Dynamics",
      desc: "Demonstrate positive group dynamics — trust, shared goals, esprit de corps, and characteristics of a successful team.",
      xp: 200,
      brief: "A team is more than a group of people — it requires positive group dynamics to function. You must contribute to the group's goal, exhibit trust, create a safe environment, follow the leader, finish the task, display esprit de corps, and appreciate others. A successful team has clear communication, mutual cooperation, a shared common goal, and high esprit de corps. Use the Team Dynamics Playbook to diagnose and improve your section's group dynamics.",
      scene: "group_dynamics",
      chapters: ["What Are Positive Group Dynamics", "Characteristics of a Successful Team"],
      tasks: [
        {
          type: "select",
          tool: "team_dynamics_playbook",
          title: "Contributing to the Group Goal",
          prompt: "What does it mean to contribute to the group's goal?",
          options: [
            "Do only the minimum required and let others handle the rest",
            "Actively work toward the shared objective and support teammates",
            "Pursue your own personal goals instead of the group's",
            "Wait for the leader to assign you every individual task"
          ],
          expected: "Actively work toward the shared objective and support teammates",
          proof: "Correct! Contributing to the group's goal means actively working toward the shared objective and supporting your teammates along the way."
        },
        {
          type: "select",
          tool: "team_dynamics_playbook",
          title: "Characteristics of a Successful Team",
          prompt: "Which set best describes the characteristics of a successful team?",
          options: [
            "Individual competition, secrecy, and personal glory",
            "Clear communication, mutual cooperation, shared common goal, and high esprit de corps",
            "One person does all the work while others watch",
            "No communication and independent action by each member"
          ],
          expected: "Clear communication, mutual cooperation, shared common goal, and high esprit de corps",
          proof: "Correct! A successful team has clear communication, mutual cooperation, a shared common goal, and high esprit de corps."
        },
        {
          type: "select",
          tool: "team_dynamics_playbook",
          title: "Esprit de Corps",
          prompt: "What is esprit de corps?",
          options: [
            "A French cooking term used in the mess hall",
            "A sense of group pride, cohesion, and mutual loyalty among team members",
            "A military drill movement",
            "The rank structure within a cadet corps"
          ],
          expected: "A sense of group pride, cohesion, and mutual loyalty among team members",
          proof: "Correct! Esprit de corps is the team spirit — a sense of pride, cohesion, and mutual loyalty that binds a group together."
        },
        {
          type: "select",
          tool: "team_dynamics_playbook",
          title: "Advantage of Teamwork",
          prompt: "What is an advantage of working in a team with positive group dynamics?",
          options: [
            "Tasks become harder because of too many opinions",
            "Everyone is included, tasks are easier with more people, and communication skills are developed",
            "Only the leader benefits from teamwork",
            "Teams always produce lower-quality results than individuals"
          ],
          expected: "Everyone is included, tasks are easier with more people, and communication skills are developed",
          proof: "Correct! Positive group dynamics mean everyone is included, tasks are easier with more people helping, and communication skills develop naturally."
        }
      ]
    },
    {
      id: "m203_05",
      order: 5,
      tag: "M203.05",
      icon: "🃏",
      title: "Influence Behaviours",
      desc: "Discuss the three influence behaviours — directive, persuasive, and participative — and when to use each.",
      xp: 200,
      brief: "Influence behaviours are the ways a leader influences their team. There are three key behaviours: directive (telling teammates what to do, when, how, and to what standard — used in emergencies and drill), persuasive (explaining and convincing why a course of action is necessary — used in problem-solving, counselling, and teaching), and participative (sharing decision-making with others — used in problem-solving, team-building, and conflict resolution). Use the Influence Behaviour Cards to match the right behaviour to each situation.",
      scene: "influence",
      chapters: ["Directive Behaviour", "Persuasive Behaviour", "Participative Behaviour"],
      tasks: [
        {
          type: "select",
          tool: "influence_cards",
          title: "Directive Behaviour",
          prompt: "What does directive behaviour involve?",
          options: [
            "Sharing decision-making with the entire team",
            "Telling teammates what they are to do, and possibly when, how, and to what standard",
            "Convincing teammates why a course of action is necessary",
            "Letting teammates figure out the task on their own"
          ],
          expected: "Telling teammates what they are to do, and possibly when, how, and to what standard",
          proof: "Correct! Directive behaviour involves telling teammates what to do, when, how, and to what standard. It is used most often in emergencies, drill, and when teammates lack experience."
        },
        {
          type: "select",
          tool: "influence_cards",
          title: "Persuasive Behaviour",
          prompt: "When is persuasive behaviour the appropriate influence behaviour to use?",
          options: [
            "In emergency situations where time and safety are critical",
            "During drill on the parade square",
            "When problem-solving, counselling, or teaching — explaining why a course of action is necessary",
            "When the leader has no opinion and wants the team to decide everything"
          ],
          expected: "When problem-solving, counselling, or teaching — explaining why a course of action is necessary",
          proof: "Correct! Persuasive behaviour is used to influence decision-making and motivate others by explaining and convincing. It is used for problem-solving, counselling, and teaching."
        },
        {
          type: "select",
          tool: "influence_cards",
          title: "Participative Behaviour",
          prompt: "What is the primary characteristic of participative behaviour?",
          options: [
            "Telling teammates exactly what to do and how",
            "Sharing decision-making with others through individual or group consultations and joint decision-making",
            "Ignoring teammate input and deciding alone",
            "Giving orders without explanation"
          ],
          expected: "Sharing decision-making with others through individual or group consultations and joint decision-making",
          proof: "Correct! Participative behaviour involves sharing decision-making with others. It is used for problem-solving, team-building, and conflict resolution."
        },
        {
          type: "select",
          tool: "influence_cards",
          title: "Choose the Right Behaviour",
          prompt: "A cadet in your section has frozen during a range safety incident. Which influence behaviour should you use immediately?",
          options: [
            "Participative — ask the team to vote on what to do",
            "Persuasive — explain why moving is a good idea",
            "Directive — give a clear, immediate order to ensure safety",
            "Wait and see if the cadet figures it out"
          ],
          expected: "Directive — give a clear, immediate order to ensure safety",
          proof: "Correct! In emergencies where time, safety, and control of personnel are critical, directive behaviour is the right choice. There is no time for discussion."
        }
      ]
    },
    {
      id: "m203_06",
      order: 6,
      tag: "M203.06",
      icon: "🧩",
      title: "Employ Problem Solving",
      desc: "Apply the 8-step logical analysis problem-solving process — from confirming the task to evaluating the plan.",
      xp: 250,
      brief: "As a leader, you will face problems that require structured thinking. The logical analysis method has eight steps: (1) Confirm the task, (2) Identify the problem, (3) Determine the critical factor — the one overriding problem, (4) Develop alternate solutions, (5) Compare alternatives using criteria like simplest, safest, most flexible, and most economical, (6) Determine the best solution, (7) Implement the solution, and (8) Evaluate the plan and implementation. Use the Problem-Solving Toolkit to work through a real cadet scenario step by step.",
      scene: "problem_solving",
      chapters: ["8-Step Logical Analysis", "Comparing Alternatives", "Evaluation"],
      tasks: [
        {
          type: "select",
          tool: "problem_solving_kit",
          title: "Step 1 — Confirm the Task",
          prompt: "What is the first step of the logical analysis problem-solving process?",
          options: [
            "Jump straight to a solution",
            "Confirm the task — what must you do?",
            "Evaluate the plan",
            "Compare alternatives"
          ],
          expected: "Confirm the task — what must you do?",
          proof: "Correct! Step 1 is to confirm the task. Before solving any problem, you must clearly understand what you are being asked to do."
        },
        {
          type: "select",
          tool: "problem_solving_kit",
          title: "Step 3 — The Critical Factor",
          prompt: "What is the critical factor in the problem-solving process?",
          options: [
            "The easiest problem to solve first",
            "The one overriding problem on which all other issues depend",
            "The most expensive part of the solution",
            "The person who caused the problem"
          ],
          expected: "The one overriding problem on which all other issues depend",
          proof: "Correct! The critical factor is the one overriding problem. If you solve it, the other issues will fall into place."
        },
        {
          type: "select",
          tool: "problem_solving_kit",
          title: "Step 5 — Compare Alternatives",
          prompt: "When comparing alternative solutions, which criteria should you consider?",
          options: [
            "Only which solution is the cheapest",
            "Simplest, safest, most flexible, best use of resources, and best solution to the critical factor",
            "Only which solution is the fastest",
            "Only which solution your friends prefer"
          ],
          expected: "Simplest, safest, most flexible, best use of resources, and best solution to the critical factor",
          proof: "Correct! When comparing alternatives, evaluate them against multiple criteria: simplest, safest, most flexible, most economical, and which best solves the critical factor."
        },
        {
          type: "select",
          tool: "problem_solving_kit",
          title: "Step 8 — Evaluate",
          prompt: "After implementing a solution, what should you do in Step 8?",
          options: [
            "Move on immediately and never look back",
            "Evaluate the plan and the implementation — was the solution good? Was the plan a success? What to improve? What lessons were learned?",
            "Blame team members if things went wrong",
            "Skip evaluation to save time"
          ],
          expected: "Evaluate the plan and the implementation — was the solution good? Was the plan a success? What to improve? What lessons were learned?",
          proof: "Correct! Step 8 is evaluation. Ask whether the solution was good, whether the plan was a success, what to improve, and what lessons were learned for next time."
        }
      ]
    },
    {
      id: "m203_07",
      order: 7,
      tag: "M203.07",
      icon: "⚖️",
      title: "Personal Integrity as a Quality of Leadership",
      desc: "Discuss personal integrity — the most basic quality of leadership. Doing the right thing, consistency, and building trust.",
      xp: 200,
      brief: "Personal integrity is the most basic quality of leadership. Integrity means moral uprightness and honesty — doing the right thing even if nobody is watching. A leader must be consistent: if what the leader says matches what the leader does, team results will be consistent. If not, results will be inconsistent. Personal integrity builds trust, trust builds confidence, confidence builds relationships, and relationships build leadership. As Aristotle said: We are what we repeatedly do. Excellence, then, is not an act but a habit. Use the Integrity Charter to examine your own leadership consistency.",
      scene: "integrity",
      chapters: ["What Is Personal Integrity", "Leader Consistency", "Trust Builds Leadership"],
      tasks: [
        {
          type: "select",
          tool: "integrity_charter",
          title: "Definition of Personal Integrity",
          prompt: "What does personal integrity mean?",
          options: [
            "Doing the right thing only when someone is watching",
            "Doing the right thing, even if nobody is watching",
            "Following orders without thinking for yourself",
            "Being popular with your peers at all times"
          ],
          expected: "Doing the right thing, even if nobody is watching",
          proof: "Correct! Personal integrity means doing the right thing even if nobody is watching. It is moral uprightness and honesty."
        },
        {
          type: "select",
          tool: "integrity_charter",
          title: "Leader Consistency",
          prompt: "According to John C. Maxwell, what happens when what a leader says and what a leader does is the same?",
          options: [
            "The team results will be inconsistent",
            "The team results will be consistent",
            "The team will ignore the leader",
            "Nothing — it does not matter"
          ],
          expected: "The team results will be consistent",
          proof: "Correct! When what a leader says matches what a leader does, the results by the team will be consistent. Consistency is key to integrity."
        },
        {
          type: "select",
          tool: "integrity_charter",
          title: "The Integrity Chain",
          prompt: "Complete the chain: Personal integrity builds trust. Trust builds confidence. Confidence builds relationships. Relationships build...",
          options: [
            "power",
            "leadership",
            "rank",
            "authority"
          ],
          expected: "leadership",
          proof: "Correct! Personal integrity builds trust, trust builds confidence, confidence builds relationships, and relationships build leadership."
        },
        {
          type: "select",
          tool: "integrity_charter",
          title: "Aristotle on Excellence",
          prompt: "Aristotle said: We are what we repeatedly do. Excellence, then, is not an act but a...",
          options: [
            "gift",
            "habit",
            "talent",
            "miracle"
          ],
          expected: "habit",
          proof: "Correct! Excellence is not an act but a habit. Integrity practiced consistently over time becomes who you are as a leader."
        }
      ]
    },
    {
      id: "m203_08",
      order: 8,
      tag: "M203.08",
      icon: "🤝",
      title: "Participate in Team-Building Activities",
      desc: "Participate in trust-building games — the palm-to-palm balance activity and the Slice and Dice corridor trust activity.",
      xp: 150,
      brief: "Team-building through trust games strengthens the bonds between cadets. In this module, you will learn two trust activities from the Red Star instructional guide. Activity 1 is the palm-to-palm balance: pairs of cadets squat facing each other with palms touching, then attempt to knock their partner off balance using slow motion. Activity 2 is Slice and Dice: cadets form two lines creating a corridor, and each cadet walks down the corridor while others raise and lower their arms in a ripple effect. Use the Trust Game Guide to prepare and lead these activities safely.",
      scene: "team_building",
      chapters: ["Activity 1 — Palm-to-Palm Balance", "Activity 2 — Slice and Dice"],
      tasks: [
        {
          type: "select",
          tool: "trust_game_guide",
          title: "Palm-to-Palm Starting Position",
          prompt: "In the palm-to-palm balance activity, what is the correct starting position?",
          options: [
            "Stand facing away from each other",
            "Assume a squatting position, face each other, with palms touching",
            "Lie on the ground side by side",
            "Stand back-to-back with arms crossed"
          ],
          expected: "Assume a squatting position, face each other, with palms touching",
          proof: "Correct! Both cadets squat facing each other with their palms touching. This is the starting position for the palm-to-palm balance."
        },
        {
          type: "select",
          tool: "trust_game_guide",
          title: "Palm-to-Palm Objective",
          prompt: "What is the objective of the palm-to-palm balance activity?",
          options: [
            "To knock your partner off balance as hard as possible",
            "To attempt to knock your partner off balance using slow motion",
            "To see who can squat the longest",
            "To race to a finish line"
          ],
          expected: "To attempt to knock your partner off balance using slow motion",
          proof: "Correct! Cadets attempt to knock their partner off balance by pushing their palms or withdrawing their palms — all in slow motion. This builds trust and balance awareness."
        },
        {
          type: "select",
          tool: "trust_game_guide",
          title: "Slice and Dice Setup",
          prompt: "How is the Slice and Dice trust activity set up?",
          options: [
            "Cadets form a circle and pass a ball around",
            "Divide the group into two lines facing each other, forming a corridor",
            "Cadets pair up and hold hands",
            "All cadets lie in a row on the ground"
          ],
          expected: "Divide the group into two lines facing each other, forming a corridor",
          proof: "Correct! The group is divided into two lines facing each other, forming a corridor. Each cadet walks down the corridor while others raise and lower their arms in a ripple."
        },
        {
          type: "select",
          tool: "trust_game_guide",
          title: "Purpose of Trust Games",
          prompt: "What is the primary purpose of team-building trust games like these?",
          options: [
            "To compete against each other for the best score",
            "To build mutual trust and strengthen bonds among team members through shared experience",
            "To identify the weakest cadet in the group",
            "To practice drill movements"
          ],
          expected: "To build mutual trust and strengthen bonds among team members through shared experience",
          proof: "Correct! Trust games build mutual trust and strengthen bonds among team members. Trust is the foundation of positive group dynamics and effective teamwork."
        }
      ]
    }
  ];

  // ==========================================================
  // LEARN ARTICLES — 16 reference articles (2 per EO)
  // ==========================================================
  const LEARN_ARTICLES = [
    // M203.01
    { id: "la_01a", cat: "M203.01", icon: "⭐", title: "Responsibilities of a Red Star Cadet", desc: "Follow the chain of command, set the example, be firm fair and friendly, show respect, be aware of safety, display initiative, and set goals.", xp: 25 },
    { id: "la_01b", cat: "M203.01", icon: "🎯", title: "Goal Mapping for Peer Leaders", desc: "Identify what you want to achieve as a leader and map the steps to get there. Goal mapping turns intentions into action plans.", xp: 25 },
    // M203.02
    { id: "la_02a", cat: "M203.02", icon: "💡", title: "The Three Principles of Leadership", desc: "Leadership is influence. Influence can be positive or negative. Leadership can create opportunities in life.", xp: 25 },
    { id: "la_02b", cat: "M203.02", icon: "🐻", title: "Youth Leadership Narratives", desc: "Simon Jackson and the Spirit Bear Youth Coalition, Craig Kielburger and Free The Children, and GreenKids — real examples of youth using positive influence.", xp: 25 },
    // M203.03
    { id: "la_03a", cat: "M203.03", icon: "🗣️", title: "Three Components of Communication", desc: "Every message has three parts: sending the message, receiving the message, and responding to the message. All three must work.", xp: 25 },
    { id: "la_03b", cat: "M203.03", icon: "👁️", title: "Non-Verbal Communication", desc: "Eye contact, body posture, gestures, facial expressions, and voice tone and volume carry the majority of meaning in communication.", xp: 25 },
    // M203.04
    { id: "la_04a", cat: "M203.04", icon: "👥", title: "What Are Positive Group Dynamics", desc: "Contribute to the goal, exhibit trust, create a safe environment, follow the leader, finish the task, display esprit de corps, and appreciate others.", xp: 25 },
    { id: "la_04b", cat: "M203.04", icon: "🤝", title: "Characteristics of a Successful Team", desc: "Clear communication, mutual cooperation, a shared common goal, and high esprit de corps. Advantages: everyone included, easier tasks, communication skills grow.", xp: 25 },
    // M203.05
    { id: "la_05a", cat: "M203.05", icon: "📢", title: "Directive and Persuasive Behaviours", desc: "Directive: telling teammates what to do — used in emergencies, drill, and with inexperienced teammates. Persuasive: explaining and convincing — for problem-solving, counselling, and teaching.", xp: 25 },
    { id: "la_05b", cat: "M203.05", icon: "🤝", title: "Participative Behaviour", desc: "Sharing decision-making with others through individual or group consultations and joint decision-making. Used for problem-solving, team-building, and conflict resolution.", xp: 25 },
    // M203.06
    { id: "la_06a", cat: "M203.06", icon: "🧩", title: "The 8-Step Problem-Solving Process", desc: "Confirm the task, identify the problem, determine the critical factor, develop alternatives, compare them, choose the best, implement, and evaluate.", xp: 30 },
    { id: "la_06b", cat: "M203.06", icon: "⚖️", title: "Comparing Alternatives and Evaluation", desc: "Compare solutions by simplest, safest, most flexible, most economical, and best solution to the critical factor. Evaluate: was it good? What lessons were learned?", xp: 30 },
    // M203.07
    { id: "la_07a", cat: "M203.07", icon: "⚖️", title: "What Is Personal Integrity", desc: "Moral uprightness and honesty — doing the right thing even if nobody is watching. The most basic quality of leadership.", xp: 25 },
    { id: "la_07b", cat: "M203.07", icon: "🔗", title: "The Integrity–Trust–Leadership Chain", desc: "Integrity builds trust, trust builds confidence, confidence builds relationships, relationships build leadership. Aristotle: excellence is a habit.", xp: 25 },
    // M203.08
    { id: "la_08a", cat: "M203.08", icon: "🤝", title: "Palm-to-Palm Balance Activity", desc: "Pairs squat facing each other with palms touching, then attempt to knock their partner off balance in slow motion. Builds trust and balance awareness.", xp: 25 },
    { id: "la_08b", cat: "M203.08", icon: "⚔️", title: "Slice and Dice Corridor Activity", desc: "Two lines form a corridor. Each cadet walks through while others raise and lower arms in a ripple effect. Builds mutual trust through shared experience.", xp: 25 }
  ];

  // ==========================================================
  // ARENA QUESTION POOL — drawn from all 8 EOs
  // ==========================================================
  const ARENA_QUESTIONS = [
    { eo: "M203.01", q: "What is a key responsibility of a Red Star cadet regarding the chain of command?", options: ["Follow the chain of command at all times", "Skip ranks when you disagree", "Give orders to higher ranks", "Ignore it in peer settings"], correct: 0 },
    { eo: "M203.01", q: "What does it mean to set the example as a cadet leader?", options: ["Tell peers what to do while doing otherwise", "Model the behaviour you expect from peers", "Let peers set their own standards", "Only lead during inspections"], correct: 1 },
    { eo: "M203.01", q: "Being firm, fair, and friendly means:", options: ["Being strict with some, lenient with others", "Ignoring standards to be liked", "Maintaining standards while treating all with respect", "Being firm only with strangers"], correct: 2 },
    { eo: "M203.02", q: "What is the first principle of leadership?", options: ["Leadership is authority", "Leadership is influence", "Leadership is rank", "Leadership is power"], correct: 1 },
    { eo: "M203.02", q: "The second principle states that influence can be:", options: ["Only positive", "Only negative", "Positive or negative", "Neither positive nor negative"], correct: 2 },
    { eo: "M203.02", q: "Leadership is a demonstrable skill, which means:", options: ["It cannot be learned", "It can be displayed, observed, and improved with practice", "Only certain people can have it", "It is purely theoretical"], correct: 1 },
    { eo: "M203.02", q: "Simon Jackson showed positive youth leadership by:", options: ["Becoming a politician", "Building the Spirit Bear Youth Coalition to protect Kermode bears", "Donating to save pandas", "Writing a leadership textbook"], correct: 1 },
    { eo: "M203.03", q: "What are the three components of communicating a message?", options: ["Talking, listening, writing", "Sending, receiving, responding", "Planning, executing, reviewing", "Thinking, speaking, acting"], correct: 1 },
    { eo: "M203.03", q: "Which of these is a form of non-verbal communication?", options: ["The words you choose", "Eye contact and body posture", "Radio messages", "Email messages"], correct: 1 },
    { eo: "M203.03", q: "Why is eye contact important when briefing peers?", options: ["It intimidates them", "It shows engagement and confidence", "It is only for inspections", "It is disrespectful"], correct: 1 },
    { eo: "M203.04", q: "What does it mean to contribute to the group's goal?", options: ["Do the minimum and let others work", "Actively work toward the shared objective and support teammates", "Pursue personal goals instead", "Wait for every task to be assigned"], correct: 1 },
    { eo: "M203.04", q: "Which are characteristics of a successful team?", options: ["Individual competition and secrecy", "Clear communication, cooperation, shared goal, esprit de corps", "One person does all the work", "No communication and independent action"], correct: 1 },
    { eo: "M203.04", q: "What is esprit de corps?", options: ["A French cooking term", "Group pride, cohesion, and mutual loyalty", "A drill movement", "The rank structure"], correct: 1 },
    { eo: "M203.05", q: "Directive behaviour involves:", options: ["Sharing decision-making", "Telling teammates what to do, when, how, and to what standard", "Convincing teammates why something is necessary", "Letting teammates figure it out alone"], correct: 1 },
    { eo: "M203.05", q: "Persuasive behaviour is used when:", options: ["In emergencies", "During drill", "Problem-solving, counselling, or teaching", "When the leader has no opinion"], correct: 2 },
    { eo: "M203.05", q: "Participative behaviour means:", options: ["Telling teammates exactly what to do", "Sharing decision-making through consultations and joint decisions", "Ignoring teammate input", "Giving orders without explanation"], correct: 1 },
    { eo: "M203.05", q: "In a range safety emergency, which influence behaviour should you use?", options: ["Participative — vote on what to do", "Persuasive — explain why to move", "Directive — give a clear immediate order", "Wait and see"], correct: 2 },
    { eo: "M203.06", q: "What is the first step of the problem-solving process?", options: ["Jump to a solution", "Confirm the task — what must you do?", "Evaluate the plan", "Compare alternatives"], correct: 1 },
    { eo: "M203.06", q: "What is the critical factor in problem solving?", options: ["The easiest problem", "The one overriding problem all others depend on", "The most expensive part", "The person who caused it"], correct: 1 },
    { eo: "M203.06", q: "When comparing alternatives, you should consider:", options: ["Only cost", "Simplest, safest, most flexible, best use of resources, solves critical factor", "Only speed", "What friends prefer"], correct: 1 },
    { eo: "M203.06", q: "What happens in Step 8 — Evaluate?", options: ["Move on and never look back", "Assess if the solution was good, what to improve, lessons learned", "Blame team members", "Skip to save time"], correct: 1 },
    { eo: "M203.07", q: "Personal integrity means:", options: ["Doing right only when watched", "Doing the right thing even if nobody is watching", "Following orders without thinking", "Being popular at all times"], correct: 1 },
    { eo: "M203.07", q: "When a leader's words match their actions, team results will be:", options: ["Inconsistent", "Consistent", "Ignored", "Unaffected"], correct: 1 },
    { eo: "M203.07", q: "Complete the chain: Integrity builds trust → trust builds confidence → confidence builds relationships → relationships build:", options: ["Power", "Leadership", "Rank", "Authority"], correct: 1 },
    { eo: "M203.07", q: "Aristotle said excellence is not an act but a:", options: ["Gift", "Habit", "Talent", "Miracle"], correct: 1 },
    { eo: "M203.08", q: "In the palm-to-palm balance, the starting position is:", options: ["Standing back-to-back", "Squatting, facing each other, palms touching", "Lying on the ground", "Standing apart"], correct: 1 },
    { eo: "M203.08", q: "The objective of palm-to-palm balance is to:", options: ["Knock your partner as hard as possible", "Attempt to knock your partner off balance in slow motion", "Squat the longest", "Race to a finish line"], correct: 1 },
    { eo: "M203.08", q: "In Slice and Dice, the group forms:", options: ["A circle", "Two lines facing each other forming a corridor", "Pairs holding hands", "A row on the ground"], correct: 1 },
    { eo: "M203.08", q: "The primary purpose of trust games is to:", options: ["Compete for the best score", "Build mutual trust through shared experience", "Identify the weakest cadet", "Practice drill"], correct: 1 }
  ];

  // ==========================================================
  // STATE
  // ==========================================================
  let state = null;
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
  // MAP PROGRESS SYNC — Red Star map
  // ==========================================================
  function syncMapProgress() {
    try {
      const allDone = MISSIONS.every(function (m) { return state.completedMissions.includes(m.id); });
      let mapProgress = JSON.parse(localStorage.getItem(MAP_PROGRESS_KEY) || "[]");
      if (allDone && !mapProgress.includes(101)) {
        mapProgress.push(101);
        localStorage.setItem(MAP_PROGRESS_KEY, JSON.stringify(mapProgress));
      }
    } catch (e) {}
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
  const LEADERSHIP_BADGES = MISSIONS.map(function (m) {
    return { id: "b_" + m.id, icon: m.icon, name: m.title, xp: m.xp, mission: m.id };
  });

  function refreshBadges() {
    state.badges = [];
    LEADERSHIP_BADGES.forEach(function (b) {
      if (state.completedMissions.includes(b.mission)) state.badges.push(b.id);
    });
    if (state.arenaBadgeEarned && !state.badges.includes(LEADERSHIP_ARENA_BADGE)) {
      state.badges.push(LEADERSHIP_ARENA_BADGE);
    }
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
    const prev = MISSIONS.find(function (x) { return x.order === m.order - 1; });
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
    document.getElementById("topRank").textContent = rank.name;
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
    document.getElementById("cmdBadgeTotal").textContent = "of " + (LEADERSHIP_BADGES.length + 1);

    // Update threat meter based on progress
    const done = state.completedMissions.length;
    const total = MISSIONS.length;
    const threatPct = Math.max(10, 80 - Math.round((done / total) * 60));
    const tf = document.getElementById("threatFill");
    if (tf) tf.style.width = threatPct + "%";

    const cl = document.getElementById("chapterList");
    cl.innerHTML = MISSIONS.map(function (m) {
      const doneF = missionDone(m);
      const unlocked = missionUnlocked(m);
      const prog = tasksDoneCount(m);
      const total2 = m.tasks.length;
      const isActive = activeMissionId === m.id && !doneF;
      let cls = "chapter";
      let status = "";
      if (doneF) { cls += " done"; status = '<div class="ch-status done">COMPLETE — ' + prog + "/" + total2 + "</div>"; }
      else if (isActive) { cls += " active"; status = '<div class="ch-status ready">IN PROGRESS — ' + prog + "/" + total2 + "</div>"; }
      else if (unlocked) { status = '<div class="ch-status ready">READY — ' + prog + "/" + total2 + "</div>"; }
      else { cls += " locked"; status = '<div class="ch-status locked">LOCKED — complete Module ' + (m.order - 1) + "</div>"; }
      const num = doneF ? "" : '<span class="n">' + m.order + "</span>";
      return '<div class="' + cls + '" data-mission="' + m.id + '">' +
        '<div class="ch-num">' + num + "</div>" +
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
        '<div class="mc-meta"><span>⚡ ' + missionXP(m) + ' XP</span><span>📋 ' + prog + "/" + total + "</span></div>" +
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
        '<div class="mc-meta"><span>⚡ ' + missionXP(m) + ' XP</span><span>📋 ' + prog + "/" + total + "</span></div>" +
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
            '<button class="btn btn-primary" id="submitTaskBtn" type="button">✓ Submit &amp; Confirm</button>' +
            '<button class="btn btn-ghost" id="hintBtn" type="button">💡 Hint</button>' +
          "</div>" +
          '<div class="terminal" id="terminal"><div class="ln ln-dim">// awaiting input…</div></div>' +
          '<div class="task-feedback" id="taskFeedback"></div>' +
          '<hr class="divider"/>' +
          '<h3 style="margin-bottom:10px;">Mission Checklist</h3>' +
          '<div class="checklist" id="checklist">' +
            m.tasks.map(function (t, i) {
              const done2 = mp.tasksDone.includes(i);
              return '<div class="check-item ' + (done2 ? "done" : "") + '"><div class="ci-box"></div><div>' + escapeHTML(t.title) + "</div></div>";
            }).join("") +
          "</div>" +
        "</div>" +
      "</div>";

    bindConsoleEvents(task);
    // Auto-open the required tool if the current tool doesn't match
    if (activeTool !== task.tool) {
      activeTool = task.tool;
      const btn = document.querySelector('#toolDock .tool-btn[data-tool="' + task.tool + '"]');
      if (btn) btn.classList.add("active");
      document.querySelectorAll("#toolDock .tool-btn").forEach(function (b) { if (b.dataset.tool !== task.tool) b.classList.remove("active"); });
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
    else if (task.type === "type") hint = Array.isArray(task.expected) ? "The answer starts with: " + task.expected[0].slice(0, 12) + "…" : "The answer has " + task.expected.length + ' characters and starts with "' + task.expected.charAt(0) + '".';
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
      const badge = LEADERSHIP_BADGES.find(function (b) { return b.mission === m.id; });
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
    const badge = LEADERSHIP_BADGES.find(function (b) { return b.mission === m.id; });
    const mp = missionProgress(m.id);
    return '<div class="task-console"><div class="task-body"><div class="complete-card">' +
      '<div class="cc-ico">🏆</div>' +
      '<div class="cc-title">Mission Complete: ' + escapeHTML(m.title) + "</div>" +
      '<div class="cc-sub">' + escapeHTML(m.desc) + " You have successfully completed all " + m.tasks.length + ' tasks and earned the <strong>' + escapeHTML(badge ? badge.name : "Cadet") + "</strong> badge.</div>" +
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
    document.getElementById("ringRankLabel").textContent = rank.name;
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
    sel.innerHTML = '<option value="">— Select module —</option>' +
      completed.map(function (m) { return '<option value="' + m.id + '">' + m.tag + " — " + escapeHTML(m.title) + "</option>"; }).join("");

    const log = document.getElementById("sitrepLog");
    if (state.sitreps.length === 0) {
      log.innerHTML = '<p class="muted" style="font-size:12px; color:var(--ink-3);">No SITREPs filed yet.</p>';
    } else {
      log.innerHTML = state.sitreps.slice().reverse().map(function (s) {
        const statusMap = {
          progress: { cls: "med", text: "IN PROGRESS" },
          complete: { cls: "low", text: "COMPLETE" }
        };
        const st = statusMap[s.status] || statusMap.progress;
        const m = MISSIONS.find(function (x) { return x.id === s.mission; });
        return '<div class="sitrep-entry">' +
          '<div class="se-head">' +
            '<span class="se-time">' + escapeHTML(s.time) + "</span>" +
            '<span class="se-status ti-level ' + st.cls + '">' + st.text + "</span>" +
          "</div>" +
          '<div class="se-body"><strong>' + escapeHTML(m ? m.tag + " — " + m.title : s.mission) + "</strong><br/>" +
            (s.learnings ? "<strong>Learnings:</strong> " + escapeHTML(s.learnings) + "<br/>" : "") +
            (s.improve ? "<strong>To improve:</strong> " + escapeHTML(s.improve) : "") +
          "</div>" +
        "</div>";
      }).join("");
    }
  }

  function fileSitrep() {
    const mission = document.getElementById("sitrepMission").value;
    const status = document.getElementById("sitrepStatus").value;
    const learnings = document.getElementById("sitrepLearnings").value.trim();
    const improve = document.getElementById("sitrepImprove").value.trim();

    if (!mission) { toast("err", "Please select a completed module."); return; }
    if (learnings.length < 10) { toast("err", "Your key learnings must be at least 10 characters long."); return; }

    const entry = {
      mission: mission,
      status: status,
      learnings: learnings,
      improve: improve,
      time: new Date().toLocaleString("en-GB", { hour12: false })
    };
    state.sitreps.push(entry);
    state.xp += 20;
    saveState();
    document.getElementById("sitrepLearnings").value = "";
    document.getElementById("sitrepImprove").value = "";
    document.getElementById("sitrepMission").value = "";
    document.getElementById("sitrepStatus").value = "progress";
    toast("ok", "📡 SITREP filed! +20 XP");
    renderSitrep();
    renderSidebar();
    renderTopStats();
    renderCommand();
    renderAnalysis();
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
  // LEADERSHIP ARENA — Interactive Confirmation Game Engine
  // ==========================================================
  const ta = {
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

  function taLoadStats() {
    // Arena stats are tracked alongside global stats
  }

  function taRenderStartScreen() {
    const stage = document.getElementById("arenaStage");
    if (!stage) return;
    stage.innerHTML =
      '<div class="arena-idle">' +
        '<div class="arena-idle-ico">🏟️</div>' +
        '<h2>Leadership Fundamentals Arena</h2>' +
        '<p class="muted" style="font-size:13px; line-height:1.6; max-width:480px; margin:0 auto;">Test your mastery of all eight Red Star leadership modules. The Arena presents randomized questions drawn from every EO — responsibilities, principles, communication, group dynamics, influence behaviours, problem solving, integrity, and team-building. Answer correctly to build your streak and confirm your fundamentals.</p>' +
        '<div class="arena-mode-buttons" style="margin-top:20px;">' +
          '<button class="btn btn-primary" id="taStartBtn" type="button">🎮 Start 10-Question Round</button>' +
          '<button class="btn btn-ghost" id="taExamBtn" type="button" style="margin-left:10px;">📋 Exam Mode (8 to pass)</button>' +
        '</div>' +
        (state.arenaBadgeEarned ?
          '<p class="muted" style="margin-top:14px; font-size:12px;">✅ Leadership Arena badge earned! Keep practising to improve your streak.</p>' :
          '<p class="muted" style="margin-top:14px; font-size:12px;">Complete a 10-question round with 8+ correct to earn the Leadership Arena badge.</p>') +
      '</div>';
    taUpdateSide();

    const startBtn = document.getElementById("taStartBtn");
    const examBtn = document.getElementById("taExamBtn");
    if (startBtn) startBtn.addEventListener("click", function () { taStartRound(false); });
    if (examBtn) examBtn.addEventListener("click", function () { taStartRound(true); });
  }

  function taStartRound(examMode) {
    ta.active = true;
    ta.examMode = !!examMode;
    ta.pool = shuffleArray(ARENA_QUESTIONS.slice());
    ta.poolIndex = 0;
    ta.score = 0;
    ta.correct = 0;
    ta.wrong = 0;
    ta.streak = 0;
    ta.round = 0;
    ta.totalRounds = examMode ? 10 : 10;
    ta.answered = false;
    taRenderQuestion();
  }

  function taRenderQuestion() {
    const stage = document.getElementById("arenaStage");
    if (!stage) return;
    if (ta.poolIndex >= ta.pool.length || ta.round >= ta.totalRounds) {
      taFinishRound();
      return;
    }
    ta.currentQ = ta.pool[ta.poolIndex];
    ta.answered = false;
    const q = ta.currentQ;
    const progressPct = Math.round((ta.round / ta.totalRounds) * 100);

    stage.innerHTML =
      '<div class="arena-active">' +
        '<div class="arena-progress-bar"><div class="arena-progress-fill" style="width:' + progressPct + '%"></div></div>' +
        '<div class="arena-q-meta">' +
          '<span class="arena-eo-tag">' + escapeHTML(q.eo) + "</span>" +
          '<span class="arena-round">Question ' + (ta.round + 1) + " of " + ta.totalRounds + "</span>" +
        "</div>" +
        '<div class="arena-prompt">' + escapeHTML(q.q) + "</div>" +
        '<div class="arena-choices" id="arenaChoices">' +
          q.options.map(function (opt, i) {
            return '<button class="arena-choice" data-idx="' + i + '" type="button"><span class="ac-letter">' + String.fromCharCode(65 + i) + "</span><span>" + escapeHTML(opt) + "</span></button>";
          }).join("") +
        "</div>" +
        '<div class="arena-feedback" id="arenaFeedback"></div>' +
      "</div>";

    taUpdateSide();

    document.querySelectorAll("#arenaChoices .arena-choice").forEach(function (btn) {
      btn.addEventListener("click", function () { taAnswerQuestion(parseInt(btn.dataset.idx, 10)); });
    });
  }

  function taAnswerQuestion(idx) {
    if (ta.answered) return;
    ta.answered = true;
    const q = ta.currentQ;
    const isCorrect = idx === q.correct;
    const fb = document.getElementById("arenaFeedback");
    ta.round++;

    // Highlight choices
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
      ta.correct++;
      ta.streak++;
      if (ta.streak > ta.bestStreak) ta.bestStreak = ta.streak;
      ta.score += 10 + (ta.streak > 1 ? ta.streak * 2 : 0);
      if (fb) { fb.className = "arena-feedback ok"; fb.innerHTML = "✅ Correct! " + escapeHTML(q.options[q.correct]) + (ta.streak > 1 ? ' — 🔥 ' + ta.streak + " streak!" : ""); }
    } else {
      ta.wrong++;
      ta.streak = 0;
      if (fb) { fb.className = "arena-feedback err"; fb.innerHTML = "❌ Incorrect. The correct answer is: <strong>" + escapeHTML(q.options[q.correct]) + "</strong>"; }
    }

    // Record attempt in global stats
    state.totalAttempts++;
    if (!isCorrect) {
      state.wrongAttempts++;
      state.streak = 0;
    } else {
      state.streak++;
      if (state.streak > state.bestStreak) state.bestStreak = state.streak;
    }
    saveState();

    taUpdateSide();
    updateAnalysis();

    // Next question after delay
    setTimeout(function () {
      ta.poolIndex++;
      taRenderQuestion();
    }, 1800);
  }

  function taFinishRound() {
    ta.active = false;
    const stage = document.getElementById("arenaStage");
    if (!stage) return;
    const total = ta.correct + ta.wrong;
    const pct = total > 0 ? Math.round((ta.correct / total) * 100) : 0;
    const passed = ta.correct >= 8;

    // Award badge and XP if passed
    if (passed && !state.arenaBadgeEarned) {
      state.arenaBadgeEarned = true;
      addXP(100);
      refreshBadges();
      renderSidebar();
      renderTopStats();
      renderCommand();
      renderAnalysis();
    }

    let msg = "";
    let badgeText = "";
    if (ta.examMode) {
      if (passed) {
        msg = "<strong>QUALIFIED!</strong> You passed the Leadership Fundamentals exam with " + ta.correct + "/" + total + " correct. Score: " + ta.score + ".";
        badgeText = "Leadership Arena badge unlocked — you have confirmed your leadership fundamentals!";
      } else {
        msg = "<strong>NOT YET QUALIFIED.</strong> You scored " + ta.correct + "/" + total + ". You need 8/10 to pass. Review the Learn library and try again.";
      }
    } else {
      if (pct >= 80) {
        msg = "<strong>OUTSTANDING!</strong> " + ta.correct + "/" + total + " correct (" + pct + "%). Score: " + ta.score + ". Your leadership fundamentals are confirmed.";
        if (passed && state.arenaBadgeEarned) badgeText = "Leadership Arena badge earned!";
      } else if (pct >= 50) {
        msg = "<strong>SOLID EFFORT.</strong> " + ta.correct + "/" + total + " correct (" + pct + "%). Score: " + ta.score + ". Review the Learn library and try again.";
      } else {
        msg = "<strong>KEEP TRAINING.</strong> " + ta.correct + "/" + total + " correct (" + pct + "%). Study the Learn library and practise each module.";
      }
    }

    stage.innerHTML =
      '<div class="arena-complete">' +
        '<div class="arena-complete-ico">' + (passed ? "🏆" : "📊") + "</div>" +
        '<h2>' + (passed ? "Round Complete!" : "Round Complete") + "</h2>" +
        '<div class="arena-score-display">' +
          '<div class="arena-score-item"><div class="as-val">' + ta.correct + "/" + total + '</div><div class="as-lbl">Correct</div></div>' +
          '<div class="arena-score-item"><div class="as-val">' + ta.score + '</div><div class="as-lbl">Score</div></div>' +
          '<div class="arena-score-item"><div class="as-val">' + ta.bestStreak + '</div><div class="as-lbl">Best Streak</div></div>' +
        "</div>" +
        '<p style="color:var(--ink-2); font-size:13px; line-height:1.6; max-width:440px; margin:12px auto;">' + msg.replace(/<[^>]+>/g, "") + "</p>" +
        (badgeText ? '<p style="color:var(--gold); font-size:13px; font-weight:600; margin:10px 0;">🏅 ' + escapeHTML(badgeText) + "</p>" : "") +
        '<div class="arena-mode-buttons" style="margin-top:16px;">' +
          '<button class="btn btn-primary" id="taRetryBtn" type="button">🎮 Play Again</button>' +
          '<button class="btn btn-ghost" id="taExamBtn2" type="button" style="margin-left:10px;">📋 Exam Mode</button>' +
        "</div>" +
      "</div>";

    taUpdateSide();
    if (passed) toast("ok", "🏆 Leadership Arena round passed! " + ta.correct + "/" + total + " correct.");

    const retryBtn = document.getElementById("taRetryBtn");
    const examBtn2 = document.getElementById("taExamBtn2");
    if (retryBtn) retryBtn.addEventListener("click", function () { taStartRound(false); });
    if (examBtn2) examBtn2.addEventListener("click", function () { taStartRound(true); });
  }

  function taUpdateSide() {
    const side = document.getElementById("arenaSide");
    if (!side) return;
    const total = ta.correct + ta.wrong;
    const pct = total > 0 ? Math.round((ta.correct / total) * 100) : 0;
    const arenaBadgeCount = state.arenaBadgeEarned ? 1 : 0;
    side.innerHTML =
      '<div class="arena-stat-block">' +
        '<h3><span class="ico">📊</span> Arena Stats</h3>' +
        '<div class="arena-stat-row"><span>Score</span><strong>' + ta.score + "</strong></div>" +
        '<div class="arena-stat-row"><span>Correct</span><strong>' + ta.correct + "/" + total + "</strong></div>" +
        '<div class="arena-stat-row"><span>Accuracy</span><strong>' + pct + "%</strong></div>" +
        '<div class="arena-stat-row"><span>Current Streak</span><strong>' + ta.streak + "</strong></div>" +
        '<div class="arena-stat-row"><span>Best Streak</span><strong>' + ta.bestStreak + "</strong></div>" +
      "</div>" +
      '<div class="arena-stat-block">' +
        '<h3><span class="ico">🏆</span> Arena Badge</h3>' +
        '<div class="arena-badge-status ' + (state.arenaBadgeEarned ? "earned" : "locked") + '">' +
          (state.arenaBadgeEarned ?
            '<div class="ab-ico">🏅</div><div class="ab-text"><strong>Leadership Arena</strong><br/>Badge Earned!</div>' :
            '<div class="ab-ico">🔒</div><div class="ab-text"><strong>Locked</strong><br/>Score 8/10 to unlock</div>') +
        "</div>" +
      "</div>" +
      '<div class="arena-stat-block">' +
        '<h3><span class="ico">📚</span> Question Pool</h3>' +
        '<div class="arena-stat-row"><span>Total Questions</span><strong>' + ARENA_QUESTIONS.length + "</strong></div>" +
        '<div class="arena-stat-row"><span>EOs Covered</span><strong>8</strong></div>' +
        '<div class="arena-stat-row"><span>Rounds Played</span><strong>' + (state.totalAttempts > 0 ? Math.floor(state.totalAttempts / 10) : 0) + "</strong></div>" +
      "</div>";
  }

  function renderArenaGame() {
    taLoadStats();
    if (!ta.active) {
      taRenderStartScreen();
    } else {
      taRenderQuestion();
    }
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
    const main = document.querySelector(".main");
    if (main) main.scrollTop = 0;
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
    if (ico) ico.textContent = kind === "ok" ? "✅" : kind === "warn" ? "⚠️" : kind === "err" ? "❌" : "ℹ️";
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
    try { trMutate(ARENA_QUESTIONS); } catch (e) {}
    try { trMutate(LEARN_ARTICLES); } catch (e) {}
    try { trMutate(MISSIONS); } catch (e) {}
    try { trMutate(RANKS); } catch (e) {}
    try { trMutate(SK); } catch (e) {}
    try { trMutate(TOOLS); } catch (e) {}
    try { trMutate(toggleState); } catch (e) {}
    try { trMutate(sliderValue); } catch (e) {}
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

    state = loadState();
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
