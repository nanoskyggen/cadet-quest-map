/* ============================================================
   MUSIC TRAINING COMMAND — music_training.js
   Operation Harmony: cadet music training simulator
   Split by instrument section: Brass, Woodwind, Percussion, Pipes & Drums
   Maple Defender dashboard architecture
   ============================================================ */

(function () {
  "use strict";

  // ==========================================================
  // STORAGE KEYS
  // ==========================================================
  const SK = {
    progress: "musicTrainingProgress",
    sitreps: "musicTrainingSitreps",
    wrongAttempts: "musicTrainingWrongAttempts",
    streak: "musicTrainingStreak",
    bestStreak: "musicTrainingBestStreak",
    readArticles: "musicTrainingReadArticles"
  };

  // ==========================================================
  // MAP PROGRESS SYNC — Badge 16 = Music
  // ==========================================================
  const MAP_PROGRESS_KEY = "cadetMapDemoCompleted";
  const MUSIC_BADGE_ID = 16;

  // ==========================================================
  // RANK LADDER — Cadet Music Proficiency Levels
  // ==========================================================
  const RANKS = [
    { id: 0, name: "Cadet Musician Trainee", icon: "🎖️", xp: 0, callsign: "ROOKIE-1" },
    { id: 1, name: "Basic Musician", icon: "🎵", xp: 300, callsign: "BASIC-1" },
    { id: 2, name: "Musician Level 1", icon: "🎶", xp: 700, callsign: "LEVEL1-1" },
    { id: 3, name: "Musician Level 2", icon: "🎺", xp: 1200, callsign: "LEVEL2-1" },
    { id: 4, name: "Musician Level 3", icon: "🎷", xp: 1800, callsign: "LEVEL3-1" },
    { id: 5, name: "Musician Level 4", icon: "🥁", xp: 2500, callsign: "LEVEL4-1" },
    { id: 6, name: "Musician Level 5 / Drum Major", icon: "🏆", xp: 3500, callsign: "MAESTRO-1" }
  ];

  // ==========================================================
  // INSTRUMENT SECTIONS
  // ==========================================================
  const INSTRUMENT_SECTIONS = [
    { id: "brass", icon: "🎺", label: "Brass Section", color: "var(--gold)" },
    { id: "woodwind", icon: "🎷", label: "Woodwind Section", color: "var(--music-bright)" },
    { id: "percussion", icon: "🥁", label: "Percussion Section", color: "var(--amber)" },
    { id: "pipes", icon: "🎶", label: "Pipes & Drums Section", color: "var(--green)" }
  ];

  // ==========================================================
  // TOOLS — music workstation tools cadets must "open"
  // ==========================================================
  const TOOLS = [
    { id: "instrument", icon: "🎼", label: "Instrument Reference" },
    { id: "technique", icon: "🎵", label: "Technique Guide" },
    { id: "carekit", icon: "🧰", label: "Care & Maintenance Kit" },
    { id: "tuner", icon: "🎚️", label: "Tuner" },
    { id: "metronome", icon: "⏱️", label: "Metronome" },
    { id: "sheetmusic", icon: "📖", label: "Sheet Music" },
    { id: "musicstand", icon: "📐", label: "Music Stand" },
    { id: "log", icon: "📠", label: "Practice Log" }
  ];

  // ==========================================================
  // MISSIONS — populated via push() in subsequent appends
  // ==========================================================
  const MISSIONS = [];

  // ==========================================================
  // LEARN LIBRARY ARTICLES — populated in subsequent append
  // ==========================================================
  let LEARN_ARTICLES = [];

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
  // SCENE SVG GENERATORS — music-themed scenes
  // ==========================================================
  function sceneSVG(scene) {
    const W = 600, H = 180;
    const base = '<svg viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">';
    const end = '</svg>';
    var grad = function(id, c1, c2) {
      return '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + c1 + '"/><stop offset="1" stop-color="' + c2 + '"/></linearGradient></defs>';
    };

    if (scene === "brass") {
      return base + grad("g", "#1a1030", "#0a0612") +
        '<rect width="' + W + '" height="' + H + '" fill="url(#g)"/>' +
        '<rect x="80" y="85" width="180" height="14" rx="7" fill="#c79a3a" opacity="0.7"/>' +
        '<rect x="240" y="75" width="120" height="34" rx="17" fill="#f5c84c" opacity="0.5" stroke="#c79a3a" stroke-width="1"/>' +
        '<circle cx="380" cy="92" r="26" fill="none" stroke="#f5c84c" stroke-width="3" opacity="0.6"/>' +
        '<circle cx="380" cy="92" r="20" fill="#c79a3a" opacity="0.3"/>' +
        '<rect x="110" y="78" width="8" height="28" rx="3" fill="#a070f0" opacity="0.6"/>' +
        '<rect x="140" y="78" width="8" height="28" rx="3" fill="#a070f0" opacity="0.6"/>' +
        '<rect x="170" y="78" width="8" height="28" rx="3" fill="#a070f0" opacity="0.6"/>' +
        '<text x="300" y="45" fill="#a070f0" font-size="11" font-family="monospace" text-anchor="middle">BRASS INSTRUMENT — TRUMPET</text>' +
        '<text x="115" y="135" fill="#8074a0" font-size="9" font-family="monospace" text-anchor="middle">VALVES</text>' +
        '<text x="300" y="135" fill="#8074a0" font-size="9" font-family="monospace" text-anchor="middle">TUNING SLIDE</text>' +
        '<text x="380" y="135" fill="#8074a0" font-size="9" font-family="monospace" text-anchor="middle">BELL</text>' +
      end;
    }
    if (scene === "woodwind") {
      return base + grad("g", "#141028", "#080410") +
        '<rect width="' + W + '" height="' + H + '" fill="url(#g)"/>' +
        '<rect x="100" y="40" width="16" height="120" rx="3" fill="#7b4fd6" opacity="0.5" stroke="#a070f0" stroke-width="1"/>' +
        '<circle cx="108" cy="55" r="4" fill="#a070f0" opacity="0.7"/>' +
        '<circle cx="108" cy="70" r="4" fill="#a070f0" opacity="0.7"/>' +
        '<circle cx="108" cy="85" r="4" fill="#a070f0" opacity="0.7"/>' +
        '<circle cx="108" cy="100" r="4" fill="#a070f0" opacity="0.7"/>' +
        '<circle cx="108" cy="115" r="4" fill="#a070f0" opacity="0.7"/>' +
        '<circle cx="108" cy="130" r="4" fill="#a070f0" opacity="0.7"/>' +
        '<rect x="260" y="30" width="14" height="140" rx="3" fill="#f5c84c" opacity="0.3" stroke="#c79a3a" stroke-width="1"/>' +
        '<rect x="274" y="50" width="60" height="8" rx="2" fill="#c79a3a" opacity="0.5"/>' +
        '<rect x="274" y="65" width="60" height="8" rx="2" fill="#c79a3a" opacity="0.5"/>' +
        '<rect x="274" y="80" width="60" height="8" rx="2" fill="#c79a3a" opacity="0.5"/>' +
        '<rect x="274" y="95" width="60" height="8" rx="2" fill="#c79a3a" opacity="0.5"/>' +
        '<rect x="430" y="60" width="50" height="12" rx="2" fill="#f5c84c" opacity="0.4" stroke="#c79a3a"/>' +
        '<rect x="445" y="35" width="20" height="30" rx="3" fill="#c79a3a" opacity="0.5"/>' +
        '<text x="300" y="160" fill="#a070f0" font-size="11" font-family="monospace" text-anchor="middle">WOODWIND FAMILY — FLUTE / CLARINET / SAXOPHONE</text>' +
        '<text x="108" y="172" fill="#8074a0" font-size="8" font-family="monospace" text-anchor="middle">FLUTE</text>' +
        '<text x="295" y="172" fill="#8074a0" font-size="8" font-family="monospace" text-anchor="middle">CLARINET</text>' +
        '<text x="455" y="172" fill="#8074a0" font-size="8" font-family="monospace" text-anchor="middle">SAX</text>' +
      end;
    }
    if (scene === "percussion") {
      return base + grad("g", "#1a1410", "#0a0806") +
        '<rect width="' + W + '" height="' + H + '" fill="url(#g)"/>' +
        '<ellipse cx="180" cy="90" rx="55" ry="45" fill="#ffb454" opacity="0.15" stroke="#c47a26" stroke-width="2"/>' +
        '<ellipse cx="180" cy="90" rx="50" ry="40" fill="none" stroke="#c47a26" stroke-width="1" opacity="0.4"/>' +
        '<circle cx="170" cy="82" r="3" fill="#c47a26" opacity="0.6"/>' +
        '<circle cx="195" cy="95" r="3" fill="#c47a26" opacity="0.6"/>' +
        '<circle cx="175" cy="100" r="3" fill="#c47a26" opacity="0.6"/>' +
        '<line x1="180" y1="45" x2="180" y2="20" stroke="#c47a26" stroke-width="1" opacity="0.4"/>' +
        '<rect x="380" y="50" width="100" height="70" rx="4" fill="#ffb454" opacity="0.12" stroke="#c47a26" stroke-width="2"/>' +
        '<rect x="390" y="60" width="80" height="50" rx="2" fill="none" stroke="#c47a26" stroke-width="1" opacity="0.3"/>' +
        '<line x1="430" y1="55" x2="430" y2="115" stroke="#c47a26" stroke-width="0.5" opacity="0.3"/>' +
        '<rect x="510" y="55" width="14" height="60" rx="3" fill="#c47a26" opacity="0.4"/>' +
        '<circle cx="517" cy="52" r="7" fill="#ffb454" opacity="0.4"/>' +
        '<text x="300" y="155" fill="#ffb454" font-size="11" font-family="monospace" text-anchor="middle">PERCUSSION — SNARE / MALLET / BASS DRUM</text>' +
        '<text x="180" y="150" fill="#8074a0" font-size="8" font-family="monospace" text-anchor="middle">SNARE</text>' +
        '<text x="430" y="138" fill="#8074a0" font-size="8" font-family="monospace" text-anchor="middle">XYLOPHONE</text>' +
        '<text x="517" y="138" fill="#8074a0" font-size="8" font-family="monospace" text-anchor="middle">STICKS</text>' +
      end;
    }
    if (scene === "pipes") {
      return base + grad("g", "#0d1f15", "#061008") +
        '<rect width="' + W + '" height="' + H + '" fill="url(#g)"/>' +
        '<ellipse cx="220" cy="80" rx="40" ry="32" fill="#38d97b" opacity="0.12" stroke="#1f9e54" stroke-width="2"/>' +
        '<rect x="210" y="50" width="20" height="35" rx="3" fill="#1f9e54" opacity="0.4"/>' +
        '<line x1="260" y1="75" x2="320" y2="60" stroke="#38d97b" stroke-width="3" opacity="0.5"/>' +
        '<line x1="260" y1="82" x2="340" y2="95" stroke="#38d97b" stroke-width="2" opacity="0.4"/>' +
        '<line x1="260" y1="88" x2="310" y2="110" stroke="#38d97b" stroke-width="2" opacity="0.4"/>' +
        '<rect x="315" y="50" width="8" height="50" rx="2" fill="#1f9e54" opacity="0.5"/>' +
        '<rect x="335" y="88" width="8" height="45" rx="2" fill="#1f9e54" opacity="0.5"/>' +
        '<rect x="400" y="55" width="60" height="14" rx="2" fill="#38d97b" opacity="0.15" stroke="#1f9e54"/>' +
        '<circle cx="405" cy="62" r="3" fill="#38d97b" opacity="0.5"/>' +
        '<circle cx="420" cy="62" r="3" fill="#38d97b" opacity="0.5"/>' +
        '<circle cx="435" cy="62" r="3" fill="#38d97b" opacity="0.5"/>' +
        '<circle cx="450" cy="62" r="3" fill="#38d97b" opacity="0.5"/>' +
        '<text x="300" y="155" fill="#38d97b" font-size="11" font-family="monospace" text-anchor="middle">PIPES &amp; DRUMS — BAGPIPE &amp; PIPE BAND DRUMS</text>' +
        '<text x="220" y="130" fill="#8074a0" font-size="8" font-family="monospace" text-anchor="middle">BAG</text>' +
        '<text x="320" y="45" fill="#8074a0" font-size="8" font-family="monospace" text-anchor="middle">CHANTER</text>' +
        '<text x="430" y="85" fill="#8074a0" font-size="8" font-family="monospace" text-anchor="middle">DRONE</text>' +
      end;
    }
    if (scene === "theory") {
      return base + grad("g", "#141028", "#080410") +
        '<rect width="' + W + '" height="' + H + '" fill="url(#g)"/>' +
        '<g stroke="#7b4fd6" stroke-width="1" opacity="0.4">' +
        '<line x1="50" y1="60" x2="550" y2="60"/>' +
        '<line x1="50" y1="75" x2="550" y2="75"/>' +
        '<line x1="50" y1="90" x2="550" y2="90"/>' +
        '<line x1="50" y1="105" x2="550" y2="105"/>' +
        '<line x1="50" y1="120" x2="550" y2="120"/></g>' +
        '<line x1="50" y1="55" x2="50" y2="125" stroke="#a070f0" stroke-width="2"/>' +
        '<ellipse cx="120" cy="90" rx="8" ry="6" fill="#a070f0" opacity="0.7" transform="rotate(-20 120 90)"/>' +
        '<line x1="127" y1="87" x2="127" y2="55" stroke="#a070f0" stroke-width="2"/>' +
        '<ellipse cx="200" cy="105" rx="8" ry="6" fill="#f5c84c" opacity="0.7" transform="rotate(-20 200 105)"/>' +
        '<line x1="207" y1="102" x2="207" y2="70" stroke="#f5c84c" stroke-width="2"/>' +
        '<ellipse cx="280" cy="75" rx="8" ry="6" fill="#a070f0" opacity="0.7" transform="rotate(-20 280 75)"/>' +
        '<line x1="287" y1="72" x2="287" y2="40" stroke="#a070f0" stroke-width="2"/>' +
        '<ellipse cx="360" cy="90" rx="8" ry="6" fill="#f5c84c" opacity="0.7" transform="rotate(-20 360 90)"/>' +
        '<line x1="367" y1="87" x2="367" y2="55" stroke="#f5c84c" stroke-width="2"/>' +
        '<text x="300" y="155" fill="#a070f0" font-size="11" font-family="monospace" text-anchor="middle">MUSIC THEORY — STAFF &amp; NOTATION</text>' +
      end;
    }
    if (scene === "marching") {
      return base + grad("g", "#1a1428", "#0a0812") +
        '<rect width="' + W + '" height="' + H + '" fill="url(#g)"/>' +
        '<g opacity="0.5">' +
        '<circle cx="120" cy="90" r="12" fill="#7b4fd6"/><line x1="120" y1="102" x2="120" y2="130" stroke="#7b4fd6" stroke-width="2"/>' +
        '<circle cx="180" cy="90" r="12" fill="#a070f0"/><line x1="180" y1="102" x2="180" y2="130" stroke="#a070f0" stroke-width="2"/>' +
        '<circle cx="240" cy="90" r="12" fill="#f5c84c"/><line x1="240" y1="102" x2="240" y2="130" stroke="#f5c84c" stroke-width="2"/>' +
        '<circle cx="300" cy="90" r="12" fill="#7b4fd6"/><line x1="300" y1="102" x2="300" y2="130" stroke="#7b4fd6" stroke-width="2"/>' +
        '<circle cx="360" cy="90" r="12" fill="#a070f0"/><line x1="360" y1="102" x2="360" y2="130" stroke="#a070f0" stroke-width="2"/>' +
        '<circle cx="420" cy="90" r="12" fill="#f5c84c"/><line x1="420" y1="102" x2="420" y2="130" stroke="#f5c84c" stroke-width="2"/>' +
        '<circle cx="480" cy="90" r="12" fill="#7b4fd6"/><line x1="480" y1="102" x2="480" y2="130" stroke="#7b4fd6" stroke-width="2"/></g>' +
        '<line x1="80" y1="140" x2="520" y2="140" stroke="#3a2868" stroke-width="1" stroke-dasharray="8 4"/>' +
        '<text x="300" y="45" fill="#f5c84c" font-size="10" font-family="monospace" text-anchor="middle">PARADE SQUARE</text>' +
        '<text x="300" y="165" fill="#a070f0" font-size="11" font-family="monospace" text-anchor="middle">BAND FORMATION — MARCHING DRILL</text>' +
      end;
    }
    return base + '<rect width="' + W + '" height="' + H + '" fill="#161028"/>' + end;
  }

  // ==========================================================
  // RANK LOGIC
  // ==========================================================
  function currentRank() {
    var r = RANKS[0];
    for (var i = 0; i < RANKS.length; i++) {
      if (state.xp >= RANKS[i].xp) r = RANKS[i];
    }
    return r;
  }
  function nextRank() {
    var cur = currentRank();
    var idx = RANKS.indexOf(cur);
    return RANKS[idx + 1] || null;
  }
  function rankProgressPct() {
    var cur = currentRank();
    var nxt = nextRank();
    if (!nxt) return 100;
    var span = nxt.xp - cur.xp;
    var into = state.xp - cur.xp;
    return Math.max(0, Math.min(100, Math.round((into / span) * 100)));
  }

  // ==========================================================
  // BADGES — auto-generated from MISSIONS
  // ==========================================================
  var MUSIC_BADGES = [];

  function buildBadges() {
    MUSIC_BADGES = MISSIONS.map(function(m) {
      return { id: "b_" + m.id, icon: m.icon, name: m.title, xp: m.xp, mission: m.id, section: m.section };
    });
  }

  function refreshBadges() {
    state.badges = [];
    MUSIC_BADGES.forEach(function(b) {
      if (state.completedMissions.indexOf(b.mission) !== -1) state.badges.push(b.id);
    });
  }

  // ==========================================================
  // MISSION PROGRESS HELPERS
  // ==========================================================
  function missionProgress(missionId) {
    return state.missionProgress[missionId] || { tasksDone: [], wrongAttempts: 0 };
  }
  function missionDone(m) {
    return state.completedMissions.indexOf(m.id) !== -1;
  }
  function missionUnlocked(m) {
    if (m.order === 1) return true;
    var prev = MISSIONS.find(function(x) { return x.order === m.order - 1; });
    return prev ? missionDone(prev) : true;
  }
  function missionXP(m) {
    var mp = missionProgress(m.id);
    var penalty = mp.wrongAttempts * 10;
    return Math.max(40, m.xp - penalty);
  }
  function tasksDoneCount(m) {
    return missionProgress(m.id).tasksDone.length;
  }

  // ==========================================================
  // MAP PROGRESS SYNC — sync Badge 16 to quest map
  // ==========================================================
  function syncMapProgress() {
    try {
      var raw = localStorage.getItem(MAP_PROGRESS_KEY);
      var completed = raw ? JSON.parse(raw) : [];
      if (state.completedMissions.length > 0 && completed.indexOf(MUSIC_BADGE_ID) === -1) {
        completed.push(MUSIC_BADGE_ID);
        localStorage.setItem(MAP_PROGRESS_KEY, JSON.stringify(completed));
      }
    } catch (e) {}
  }

  // ==========================================================
  // ESCAPE HTML
  // ==========================================================
  function escapeHTML(s) {
    return String(s).replace(/[&<>"']/g, function(c) {
      return { "&": String.fromCharCode(38) + "amp;", "<": String.fromCharCode(38) + "lt;", ">": String.fromCharCode(38) + "gt;", '"': String.fromCharCode(38) + "quot;", "'": String.fromCharCode(38) + "#39;" }[c];
    });
  }

  // ==========================================================
  // TOOL LABEL
  // ==========================================================
  function toolLabel(id) {
    var t = TOOLS.find(function(x) { return x.id === id; });
    return t ? t.label : id;
  }


  // ==========================================================
  // MISSIONS — BRASS SECTION
  // ==========================================================
  MISSIONS.push({
    id: "brass_trumpet",
    order: 1,
    tag: "MODULE 01",
    icon: "🎺",
    section: "brass",
    title: "Trumpet & Cornet Fundamentals",
    desc: "Learn the anatomy of the trumpet, how to produce a tone, valve technique, and daily care routines for brass instruments.",
    xp: 100,
    brief: "You are in the brass rehearsal room with your instructor. The trumpet is one of the most common cadet band instruments. Your task is to identify its key components, understand how tone is produced, and complete the daily care routine. Open the Instrument Reference and work through each check.",
    scene: "brass",
    chapters: [
      { title: "Instrument Anatomy", desc: "Identify the key parts of a trumpet." },
      { title: "Tone Production", desc: "Understand how buzzing produces sound." },
      { title: "Valve Technique", desc: "Learn correct finger placement and valve oiling." },
      { title: "Care & Maintenance", desc: "Complete the daily cleaning routine." }
    ],
    tasks: [
      {
        type: "select", tool: "instrument",
        title: "Identify the Tone-Producing Component",
        prompt: "The instructor holds up a trumpet. Which component is directly responsible for producing the sound when a player buzzes their lips?",
        options: [
          "The tuning slide",
          "The mouthpiece and the player's embouchure (lip buzz)",
          "The water keys",
          "The valve caps"
        ],
        expected: "The mouthpiece and the player's embouchure (lip buzz)",
        proof: "Tone production confirmed — the mouthpiece receives the lip buzz, which vibrates the air column."
      },
      {
        type: "select", tool: "technique",
        title: "Valve Oiling Procedure",
        prompt: "During your technique session, the instructor asks about valve maintenance. What is the correct procedure for oiling trumpet valves?",
        options: [
          "Apply oil to the outside of the instrument and wipe it off",
          "Remove the valve, apply a few drops of valve oil to the casing, then reinsert and turn until it clicks into place",
          "Submerge the entire valve in oil overnight",
          "Never oil the valves — they are self-lubricating"
        ],
        expected: "Remove the valve, apply a few drops of valve oil to the casing, then reinsert and turn until it clicks into place",
        proof: "Valve oiling procedure confirmed — remove, oil the casing, reinsert, click into place."
      },
      {
        type: "toggle", tool: "carekit",
        title: "Empty the Water Keys",
        prompt: "After playing, condensation builds up inside the trumpet. Toggle the WATER KEYS EMPTIED indicator to confirm you have drained all water keys.",
        expected: true,
        proof: "Water keys emptied — condensation drained from all slides."
      },
      {
        type: "note", tool: "log",
        title: "Log the Daily Care Routine",
        prompt: "Switch to the PRACTICE LOG. Write a short entry describing the daily care routine for a trumpet. Your note must include the keywords 'mouthpiece' and 'valves'.",
        keywords: ["mouthpiece", "valves"],
        proof: "Daily care routine logged — mouthpiece removed and cleaned, valves oiled."
      }
    ]
  });

  MISSIONS.push({
    id: "brass_frenchhorn",
    order: 2,
    tag: "MODULE 02",
    icon: "🎵",
    section: "brass",
    title: "French Horn Technique",
    desc: "Master the French Horn — its coiled tubing, hand-bell technique, and the unique challenges of playing in the French (F) and B-flat sides.",
    xp: 100,
    brief: "You move to the French Horn station. The French Horn is one of the most challenging brass instruments due to its long coiled tubing and small mouthpiece. Your instructor wants you to understand its unique features, hand-in-bell technique, and tuning. Use the Instrument Reference and Technique Guide to work through the checks.",
    scene: "brass",
    chapters: [
      { title: "Horn Anatomy", desc: "Understand the coiled tubing and rotary valves." },
      { title: "Hand-in-Bell Technique", desc: "Learn how the right hand shapes tone and pitch." },
      { title: "Double Horn Operation", desc: "Understand the F and B-flat sides and the thumb valve." },
      { title: "Care & Maintenance Log", desc: "Record horn-specific care procedures." }
    ],
    tasks: [
      {
        type: "select", tool: "instrument",
        title: "French Horn Valve Type",
        prompt: "Unlike the trumpet which uses piston valves, what type of valves does the French Horn typically use?",
        options: [
          "Rotary valves operated by levers",
          "No valves at all — it is a natural horn",
          "Slide valves like a trombone",
          "Electronic valves"
        ],
        expected: "Rotary valves operated by levers",
        proof: "French Horn valve type confirmed — rotary valves operated by levers."
      },
      {
        type: "select", tool: "technique",
        title: "Hand-in-Bell Technique",
        prompt: "The French Horn is unique among brass instruments for the right-hand technique. What is the purpose of placing the right hand inside the bell?",
        options: [
          "To hold the instrument more securely",
          "To shape the tone and fine-tune the pitch by cupping or opening the hand",
          "To muffle the sound completely",
          "There is no hand-in-bell technique on the horn"
        ],
        expected: "To shape the tone and fine-tune the pitch by cupping or opening the hand",
        proof: "Hand-in-bell technique confirmed — the right hand shapes tone and adjusts pitch."
      },
      {
        type: "toggle", tool: "tuner",
        title: "Confirm Tuning Reference",
        prompt: "Before playing, the horn must be tuned to the band's reference pitch. Toggle the TUNER CHECKED indicator to confirm you have verified the horn's tuning.",
        expected: true,
        proof: "Tuning verified — horn matched to band reference pitch."
      },
      {
        type: "note", tool: "log",
        title: "Log Horn Care Procedures",
        prompt: "Switch to the PRACTICE LOG. Write a brief note on caring for the French Horn, mentioning the rotary valves and the long tubing. Include the keywords 'rotary' and 'tubing'.",
        keywords: ["rotary", "tubing"],
        proof: "Horn care logged — rotary valve maintenance and tubing care noted."
      }
    ]
  });

  MISSIONS.push({
    id: "brass_low_brass",
    order: 3,
    tag: "MODULE 03",
    icon: "🎺",
    section: "brass",
    title: "Trombone, Euphonium & Tuba",
    desc: "Explore the low brass family — the slide mechanism of the trombone, the valved euphonium, and the largest brass instrument, the tuba.",
    xp: 100,
    brief: "You are now at the low brass station. The trombone uses a slide instead of valves, the euphonium is a small tenor tuba with valves, and the tuba provides the bass foundation of the band. Your instructor wants you to understand the slide positions, valve technique, and the role of each in the ensemble.",
    scene: "brass",
    chapters: [
      { title: "Trombone Slide Positions", desc: "Learn the seven slide positions." },
      { title: "Euphonium Valves", desc: "Understand the compensating valve system." },
      { title: "Tuba Role", desc: "Recognise the tuba as the bass foundation." },
      { title: "Low Brass Care Log", desc: "Record care procedures for large brass." }
    ],
    tasks: [
      {
        type: "select", tool: "instrument",
        title: "Trombone Pitch Control",
        prompt: "How does a trombone player change pitch, given that it has no valves like a trumpet?",
        options: [
          "By blowing harder or softer only",
          "By moving the slide to one of seven positions, changing the length of the air column",
          "By pressing keys like a piano",
          "By tightening the mouthpiece"
        ],
        expected: "By moving the slide to one of seven positions, changing the length of the air column",
        proof: "Trombone pitch control confirmed — seven slide positions change the air column length."
      },
      {
        type: "select", tool: "technique",
        title: "Euphonium Description",
        prompt: "The instructor describes the euphonium. Which statement is correct?",
        options: [
          "It is a small high-pitched brass instrument",
          "It is a tenor-voiced valved brass instrument, sometimes called a tenor tuba",
          "It has no valves and uses a slide",
          "It is the same as a French Horn"
        ],
        expected: "It is a tenor-voiced valved brass instrument, sometimes called a tenor tuba",
        proof: "Euphonium confirmed — tenor-voiced valved brass, also called tenor tuba."
      },
      {
        type: "select", tool: "instrument",
        title: "Tuba's Role in the Band",
        prompt: "What is the primary role of the tuba in a military band?",
        options: [
          "Playing the melody line",
          "Providing the bass foundation and harmonic support for the entire ensemble",
          "Acting as a percussion instrument",
          "Conducting the band"
        ],
        expected: "Providing the bass foundation and harmonic support for the entire ensemble",
        proof: "Tuba role confirmed — bass foundation and harmonic support."
      },
      {
        type: "note", tool: "log",
        title: "Log Low Brass Maintenance",
        prompt: "Switch to the PRACTICE LOG. Write a note about caring for low brass instruments. Include the keywords 'slide' and 'valves'.",
        keywords: ["slide", "valves"],
        proof: "Low brass care logged — slide lubrication and valve oiling noted."
      }
    ]
  });

  // ==========================================================
  // MISSIONS — WOODWIND SECTION
  // ==========================================================
  MISSIONS.push({
    id: "woodwind_flute",
    order: 4,
    tag: "MODULE 04",
    icon: "🎷",
    section: "woodwind",
    title: "Flute Fundamentals",
    desc: "Learn the flute — embouchure formation, breath control, fingering, and the care routine for this delicate woodwind.",
    xp: 100,
    brief: "You are at the woodwind rehearsal station. The flute is a side-blown instrument that produces sound when air is directed across the embouchure hole. Your instructor wants you to understand embouchure, breath support, fingering, and proper cleaning. Open the Instrument Reference and work through each check.",
    scene: "woodwind",
    chapters: [
      { title: "Flute Anatomy", desc: "Identify head joint, body, and foot joint." },
      { title: "Embouchure & Breath", desc: "Learn how to direct air across the hole." },
      { title: "Fingering System", desc: "Understand the key mechanism." },
      { title: "Care & Maintenance", desc: "Clean and store the flute properly." }
    ],
    tasks: [
      {
        type: "select", tool: "instrument",
        title: "How the Flute Produces Sound",
        prompt: "Unlike most woodwinds, the flute has no reed. How does it produce sound?",
        options: [
          "By vibrating a single reed",
          "By vibrating a double reed",
          "By directing a stream of air across the embouchure hole, splitting the air to create vibration",
          "By striking the keys"
        ],
        expected: "By directing a stream of air across the embouchure hole, splitting the air to create vibration",
        proof: "Flute sound production confirmed — air directed across the embouchure hole."
      },
      {
        type: "select", tool: "technique",
        title: "Embouchure Formation",
        prompt: "The instructor demonstrates correct flute embouchure. What is the correct approach?",
        options: [
          "Purse the lips tightly and blow hard",
          "Form a small aperture with the lips and direct a focused air stream across the edge of the embouchure hole",
          "Blow directly into the hole like a bottle",
          "Keep the lips fully relaxed and open"
        ],
        expected: "Form a small aperture with the lips and direct a focused air stream across the edge of the embouchure hole",
        proof: "Embouchure confirmed — small aperture, focused air stream across the hole edge."
      },
      {
        type: "toggle", tool: "carekit",
        title: "Clean the Flute After Playing",
        prompt: "Moisture builds up inside the flute during playing. Toggle the FLUTE CLEANED indicator to confirm you have used a cleaning rod and cloth through the head joint and body.",
        expected: true,
        proof: "Flute cleaned — moisture removed with cleaning rod and cloth."
      },
      {
        type: "note", tool: "log",
        title: "Log Flute Care Notes",
        prompt: "Switch to the PRACTICE LOG. Write a short entry about flute maintenance. Include the keywords 'embouchure' and 'cleaning'.",
        keywords: ["embouchure", "cleaning"],
        proof: "Flute care logged — embouchure care and cleaning routine noted."
      }
    ]
  });

  MISSIONS.push({
    id: "woodwind_clarinet",
    order: 5,
    tag: "MODULE 05",
    icon: "🎼",
    section: "woodwind",
    title: "Clarinet Technique",
    desc: "Master the clarinet — single reed assembly, embouchure, the Boehm key system, and reed care and selection.",
    xp: 100,
    brief: "You move to the clarinet station. The clarinet uses a single reed attached to a mouthpiece. It has a wide range and is a cornerstone of the military band woodwind section. Your instructor wants you to understand reed assembly, embouchure, the key system, and reed care.",
    scene: "woodwind",
    chapters: [
      { title: "Reed Assembly", desc: "Learn to mount and position the reed correctly." },
      { title: "Clarinet Embouchure", desc: "Form the correct lip position around the reed." },
      { title: "Boehm Key System", desc: "Understand the ring-key mechanism." },
      { title: "Reed Care", desc: "Select, moisten, and store reeds properly." }
    ],
    tasks: [
      {
        type: "select", tool: "instrument",
        title: "Clarinet Reed Type",
        prompt: "What type of reed does the clarinet use?",
        options: [
          "A double reed like an oboe",
          "A single reed attached to the mouthpiece with a ligature",
          "No reed — it is like a flute",
          "A metal reed"
        ],
        expected: "A single reed attached to the mouthpiece with a ligature",
        proof: "Clarinet reed confirmed — single reed held by a ligature on the mouthpiece."
      },
      {
        type: "select", tool: "technique",
        title: "Correct Reed Position",
        prompt: "When assembling the clarinet mouthpiece, how should the reed be positioned?",
        options: [
          "With the flat side facing out and the tip below the mouthpiece tip",
          "With the flat side against the mouthpiece and the tip aligned with or just below the mouthpiece tip",
          "With the reed upside down",
          "The reed position does not matter"
        ],
        expected: "With the flat side against the mouthpiece and the tip aligned with or just below the mouthpiece tip",
        proof: "Reed position confirmed — flat side against mouthpiece, tip aligned."
      },
      {
        type: "toggle", tool: "carekit",
        title: "Moisten the Reed",
        prompt: "Before playing, the reed must be moistened to vibrate properly. Toggle the REED MOISTENED indicator to confirm you have prepared the reed.",
        expected: true,
        proof: "Reed moistened — ready for proper vibration."
      },
      {
        type: "note", tool: "log",
        title: "Log Reed Care Practices",
        prompt: "Switch to the PRACTICE LOG. Write a note about clarinet reed care and selection. Include the keywords 'reed' and 'ligature'.",
        keywords: ["reed", "ligature"],
        proof: "Reed care logged — reed selection and ligature positioning noted."
      }
    ]
  });

  MISSIONS.push({
    id: "woodwind_saxophone",
    order: 6,
    tag: "MODULE 06",
    icon: "🎷",
    section: "woodwind",
    title: "Saxophone — Eb & Bb",
    desc: "Explore the saxophone family — the Eb alto and Bb tenor saxophones used in cadet bands, their conical bore, reed system, and neck strap setup.",
    xp: 100,
    brief: "You are at the saxophone station. The saxophone, though made of brass, is classified as a woodwind because it uses a single reed. Cadet bands commonly use the Eb alto and Bb tenor saxophones. Your instructor wants you to understand its construction, the reed system, and proper assembly with the neck strap.",
    scene: "woodwind",
    chapters: [
      { title: "Saxophone Classification", desc: "Understand why the sax is a woodwind." },
      { title: "Eb Alto vs Bb Tenor", desc: "Distinguish the two common saxophone types." },
      { title: "Neck Strap & Assembly", desc: "Learn proper setup for comfort and support." },
      { title: "Saxophone Care Log", desc: "Record care and reed maintenance." }
    ],
    tasks: [
      {
        type: "select", tool: "instrument",
        title: "Why is the Saxophone a Woodwind?",
        prompt: "The saxophone is made of brass, yet it is classified as a woodwind instrument. Why?",
        options: [
          "Because it is always played with woodwind players",
          "Because it produces sound using a single reed, like a clarinet",
          "Because it is small enough to be a woodwind",
          "It is actually classified as a brass instrument"
        ],
        expected: "Because it produces sound using a single reed, like a clarinet",
        proof: "Saxophone classification confirmed — single reed makes it a woodwind."
      },
      {
        type: "select", tool: "technique",
        title: "Eb Alto vs Bb Tenor",
        prompt: "The instructor asks you to distinguish between the two saxophones commonly used in cadet bands. Which statement is correct?",
        options: [
          "The alto is in Eb and is smaller; the tenor is in Bb and is larger",
          "Both are in the same key",
          "The tenor is smaller than the alto",
          "The alto is a brass instrument and the tenor is a woodwind"
        ],
        expected: "The alto is in Eb and is smaller; the tenor is in Bb and is larger",
        proof: "Saxophone types confirmed — Eb alto (smaller) and Bb tenor (larger)."
      },
      {
        type: "toggle", tool: "carekit",
        title: "Secure the Neck Strap",
        prompt: "The saxophone is heavy and must be supported by a neck strap before playing. Toggle the NECK STRAP SECURED indicator to confirm the saxophone is properly supported.",
        expected: true,
        proof: "Neck strap secured — saxophone properly supported for playing."
      },
      {
        type: "note", tool: "log",
        title: "Log Saxophone Care",
        prompt: "Switch to the PRACTICE LOG. Write a note about saxophone maintenance. Include the keywords 'reed' and 'neck'.",
        keywords: ["reed", "neck"],
        proof: "Saxophone care logged — reed and neck care noted."
      }
    ]
  });

  // ==========================================================
  // MISSIONS — PERCUSSION SECTION
  // ==========================================================
  MISSIONS.push({
    id: "percussion_snare",
    order: 7,
    tag: "MODULE 07",
    icon: "🥁",
    section: "percussion",
    title: "Snare Drum Fundamentals",
    desc: "Learn the snare drum — grip technique, rudiments, the snare mechanism, and tuning the drumhead.",
    xp: 100,
    brief: "You are at the percussion station. The snare drum is the backbone of the marching band, providing rhythm and drive. Your instructor wants you to understand grip technique, basic rudiments, the snare wire mechanism, and drumhead tuning. Open the Technique Guide and work through each check.",
    scene: "percussion",
    chapters: [
      { title: "Grip Technique", desc: "Learn matched and traditional grip." },
      { title: "Basic Rudiments", desc: "Practice single and double stroke rolls." },
      { title: "Snare Mechanism", desc: "Understand the snare wires and strainer." },
      { title: "Drumhead Tuning", desc: "Learn to tune for crisp response." }
    ],
    tasks: [
      {
        type: "select", tool: "technique",
        title: "Matched Grip Description",
        prompt: "The instructor demonstrates the matched grip for snare drum. Which description is correct?",
        options: [
          "Both hands hold the sticks the same way, palms down, with the thumb and index finger as the fulcrum",
          "The left hand holds the stick differently from the right hand",
          "The sticks are held with the fists closed tightly",
          "The sticks rest on the forearms only"
        ],
        expected: "Both hands hold the sticks the same way, palms down, with the thumb and index finger as the fulcrum",
        proof: "Matched grip confirmed — both hands identical, palms down, fulcrum at thumb and index finger."
      },
      {
        type: "select", tool: "technique",
        title: "The Single Stroke Roll",
        prompt: "Which of the following correctly describes a single stroke roll, one of the most fundamental rudiments?",
        options: [
          "Alternating left-right strokes at an even tempo: L-R-L-R-L-R",
          "Two strokes per hand: L-L-R-R",
          "A continuous buzz on the drum",
          "Only one single hit"
        ],
        expected: "Alternating left-right strokes at an even tempo: L-R-L-R-L-R",
        proof: "Single stroke roll confirmed — alternating L-R strokes at even tempo."
      },
      {
        type: "toggle", tool: "carekit",
        title: "Check the Snare Wires",
        prompt: "The snare wires under the drumhead must be properly tensioned and engaged. Toggle the SNARE WIRES CHECKED indicator to confirm you have inspected and engaged the snare strainer.",
        expected: true,
        proof: "Snare wires checked — strainer engaged and tensioned correctly."
      },
      {
        type: "note", tool: "log",
        title: "Log Snare Drum Care",
        prompt: "Switch to the PRACTICE LOG. Write a short note about snare drum maintenance. Include the keywords 'sticks' and 'snare'.",
        keywords: ["sticks", "snare"],
        proof: "Snare drum care logged — stick care and snare wire inspection noted."
      }
    ]
  });

  MISSIONS.push({
    id: "percussion_mallets",
    order: 8,
    tag: "MODULE 08",
    icon: "🎹",
    section: "percussion",
    title: "Mallet Percussion",
    desc: "Explore mallet instruments — the bell lyre, glockenspiel, and xylophone — including mallet selection, bar layout, and reading pitched percussion music.",
    xp: 100,
    brief: "You move to the mallet percussion station. Mallet instruments like the bell lyre and glockenspiel are essential in marching bands because they are portable and provide pitched melody lines. Your instructor wants you to understand mallet types, bar layout, and how mallet players read music differently from drummers.",
    scene: "percussion",
    chapters: [
      { title: "Mallet Instrument Types", desc: "Distinguish bell lyre, glockenspiel, and xylophone." },
      { title: "Mallet Selection", desc: "Choose the correct mallets for each instrument." },
      { title: "Bar Layout", desc: "Understand the keyboard-style bar arrangement." },
      { title: "Pitched Music Reading", desc: "Learn how mallet players read melodic notation." }
    ],
    tasks: [
      {
        type: "select", tool: "instrument",
        title: "The Bell Lyre in Marching Band",
        prompt: "Which mallet instrument is specifically designed for marching band use, featuring a lyre-shaped frame and metal bars?",
        options: [
          "The timpani",
          "The bell lyre (glockenspiel in lyre form)",
          "The marimba",
          "The vibraphone"
        ],
        expected: "The bell lyre (glockenspiel in lyre form)",
        proof: "Bell lyre confirmed — portable glockenspiel in lyre frame for marching."
      },
      {
        type: "select", tool: "technique",
        title: "Mallet Selection for Metal Bars",
        prompt: "When playing a glockenspiel or bell lyre with metal bars, which type of mallet is most appropriate?",
        options: [
          "Hard yarn mallets designed for marimba",
          "Brass or hard plastic mallets that produce a bright, clear tone on metal bars",
          "Timpani mallets with large felt heads",
          "Drumsticks"
        ],
        expected: "Brass or hard plastic mallets that produce a bright, clear tone on metal bars",
        proof: "Mallet selection confirmed — hard mallets for bright tone on metal bars."
      },
      {
        type: "select", tool: "instrument",
        title: "Bar Layout Arrangement",
        prompt: "How are the bars arranged on a mallet keyboard instrument like a xylophone or glockenspiel?",
        options: [
          "Randomly placed bars of different sizes",
          "Like a piano keyboard — naturals in one row (larger, lower) and sharps/flats in an upper row (smaller, raised)",
          "In a single straight line from lowest to highest",
          "In a circular pattern"
        ],
        expected: "Like a piano keyboard — naturals in one row (larger, lower) and sharps/flats in an upper row (smaller, raised)",
        proof: "Bar layout confirmed — piano-style arrangement with natural and accidental rows."
      },
      {
        type: "note", tool: "log",
        title: "Log Mallet Percussion Notes",
        prompt: "Switch to the PRACTICE LOG. Write a note about mallet percussion. Include the keywords 'mallets' and 'bars'.",
        keywords: ["mallets", "bars"],
        proof: "Mallet percussion logged — mallet selection and bar layout noted."
      }
    ]
  });

  MISSIONS.push({
    id: "percussion_bass_tenor",
    order: 9,
    tag: "MODULE 09",
    icon: "🥁",
    section: "percussion",
    title: "Bass Drum & Tenor Drum",
    desc: "Master the bass drum and tenor drum — the rhythmic heartbeat of the band — including mallet technique, tone control, and marching carriage.",
    xp: 100,
    brief: "You are at the bass drum and tenor drum station. The bass drum provides the deep pulse of the band, while tenor drums add melodic rhythmic voices. In marching bands, these are carried with harnesses. Your instructor wants you to understand mallet technique, tone control, and proper marching carriage.",
    scene: "percussion",
    chapters: [
      { title: "Bass Drum Mallet Technique", desc: "Learn the single mallet and dampening technique." },
      { title: "Tone Control", desc: "Understand where to strike for different tones." },
      { title: "Tenor Drum Voices", desc: "Learn the multi-drum tenor setup." },
      { title: "Marching Carriage", desc: "Master harness fitting and posture." }
    ],
    tasks: [
      {
        type: "select", tool: "technique",
        title: "Bass Drum Striking Position",
        prompt: "Where should you strike a concert bass drum to produce the best, fullest tone?",
        options: [
          "Directly in the centre of the head",
          "Off-centre, about one-third of the way from the edge",
          "On the rim only",
          "On the shell of the drum"
        ],
        expected: "Off-centre, about one-third of the way from the edge",
        proof: "Bass drum striking confirmed — off-centre for fullest tone."
      },
      {
        type: "toggle", tool: "carekit",
        title: "Inspect the Drum Harness",
        prompt: "For marching, the bass and tenor drums are carried on harnesses. Toggle the HARNESS INSPECTED indicator to confirm the harness is fitted and secure.",
        expected: true,
        proof: "Harness inspected — fitted and secure for marching."
      },
      {
        type: "select", tool: "instrument",
        title: "Tenor Drum Setup",
        prompt: "How are tenor drums typically configured in a marching band?",
        options: [
          "A single drum mounted on a stand",
          "A set of multiple drums (commonly 4 to 6) of different sizes mounted together, played by one person",
          "The same as a snare drum",
          "Only one tenor drum per entire band"
        ],
        expected: "A set of multiple drums (commonly 4 to 6) of different sizes mounted together, played by one person",
        proof: "Tenor drum setup confirmed — multi-drum set played by one musician."
      },
      {
        type: "note", tool: "log",
        title: "Log Bass & Tenor Drum Care",
        prompt: "Switch to the PRACTICE LOG. Write a note about bass and tenor drum maintenance. Include the keywords 'harness' and 'head'.",
        keywords: ["harness", "head"],
        proof: "Bass & tenor drum care logged — harness and drumhead maintenance noted."
      }
    ]
  });

  // ==========================================================
  // MISSIONS — PIPES & DRUMS SECTION
  // ==========================================================
  MISSIONS.push({
    id: "pipes_bagpipe",
    order: 10,
    tag: "MODULE 10",
    icon: "🎶",
    section: "pipes",
    title: "Bagpipes & Practice Chanter",
    desc: "Learn the Great Highland Bagpipe — the practice chanter as the learning instrument, the three-drone setup, bag control, and reed management.",
    xp: 100,
    brief: "You are at the pipes & drums station. The Great Highland Bagpipe is the iconic instrument of the pipe band. Pipers begin on the practice chanter — a quieter, reed-based instrument used to learn fingering and tunes before transitioning to the full pipes. Your instructor wants you to understand the chanter, the drone system, bag control, and reed care.",
    scene: "pipes",
    chapters: [
      { title: "The Practice Chanter", desc: "Understand why pipers learn on the chanter first." },
      { title: "Bagpipe Anatomy", desc: "Identify the bag, blowpipe, chanter, and three drones." },
      { title: "Bag Control", desc: "Learn steady pressure for consistent sound." },
      { title: "Reed Care", desc: "Maintain chanter and drone reeds." }
    ],
    tasks: [
      {
        type: "select", tool: "instrument",
        title: "Why Start on the Practice Chanter?",
        prompt: "Beginner pipers do not start on the full bagpipes. Why do they begin with the practice chanter?",
        options: [
          "The practice chanter is louder and easier to hear",
          "The practice chanter is quieter and allows the piper to learn fingering and tunes before managing the bag and drones",
          "The practice chanter is the only instrument allowed in cadets",
          "Pipers start on the full pipes — the chanter is only for advanced players"
        ],
        expected: "The practice chanter is quieter and allows the piper to learn fingering and tunes before managing the bag and drones",
        proof: "Practice chanter confirmed — quieter instrument for learning fingering before the full pipes."
      },
      {
        type: "select", tool: "instrument",
        title: "Bagpipe Drone Count",
        prompt: "How many drones does a Great Highland Bagpipe have, and what are they?",
        options: [
          "One drone only",
          "Two drones — one tenor and one bass",
          "Three drones — two tenors and one bass",
          "Five drones of different pitches"
        ],
        expected: "Three drones — two tenors and one bass",
        proof: "Drone count confirmed — two tenor drones and one bass drone."
      },
      {
        type: "toggle", tool: "technique",
        title: "Steady Bag Pressure",
        prompt: "A consistent sound requires steady pressure on the bag. Toggle the BAG PRESSURE STABLE indicator to confirm you understand the need for constant, even pressure.",
        expected: true,
        proof: "Bag pressure confirmed — steady, even pressure for consistent tone."
      },
      {
        type: "note", tool: "log",
        title: "Log Reed Care Notes",
        prompt: "Switch to the PRACTICE LOG. Write a note about bagpipe reed care. Include the keywords 'reed' and 'chanter'.",
        keywords: ["reed", "chanter"],
        proof: "Reed care logged — chanter and drone reed maintenance noted."
      }
    ]
  });

  MISSIONS.push({
    id: "pipes_pipe_snare",
    order: 11,
    tag: "MODULE 11",
    icon: "🥁",
    section: "pipes",
    title: "Pipe Band Snare Drum",
    desc: "Master the pipe band snare drum — high-tension drumheads, traditional grip, the unique snare sound, and the drum pad practice approach.",
    xp: 100,
    brief: "You move to the pipe band drum station. The pipe band snare drum is distinct from the military band snare — it uses high-tension drumheads and produces a very crisp, bright sound. Drummers begin on a practice pad before moving to the full drum. Your instructor wants you to understand the high-tension system, traditional grip, and pad practice.",
    scene: "pipes",
    chapters: [
      { title: "High-Tension Drumheads", desc: "Understand the distinctive pipe snare sound." },
      { title: "Traditional Grip", desc: "Learn the underhand left-hand grip." },
      { title: "Practice Pad Training", desc: "Start with the pad before the full drum." },
      { title: "Pipe Snare Care Log", desc: "Record high-tension maintenance." }
    ],
    tasks: [
      {
        type: "select", tool: "instrument",
        title: "Pipe Snare vs Military Snare",
        prompt: "What distinguishes a pipe band snare drum from a standard military band snare drum?",
        options: [
          "The pipe snare has no snares at all",
          "The pipe snare uses high-tension Kevlar or similar heads and top and bottom snare wires for a very crisp, bright, cutting sound",
          "The pipe snare is made of wood only",
          "There is no difference between them"
        ],
        expected: "The pipe snare uses high-tension Kevlar or similar heads and top and bottom snare wires for a very crisp, bright, cutting sound",
        proof: "Pipe snare confirmed — high-tension heads and dual snare wires for crisp, bright sound."
      },
      {
        type: "select", tool: "technique",
        title: "Traditional Grip in Pipe Bands",
        prompt: "Pipe band snare drummers typically use which grip style?",
        options: [
          "Matched grip with both palms down",
          "Traditional grip, with the left hand using an underhand position and the right hand using an overhand position",
          "Both hands underhand",
          "No specific grip is required"
        ],
        expected: "Traditional grip, with the left hand using an underhand position and the right hand using an overhand position",
        proof: "Traditional grip confirmed — left hand underhand, right hand overhand."
      },
      {
        type: "toggle", tool: "carekit",
        title: "Practice Pad Session Complete",
        prompt: "Before playing the full drum, drummers practice rudiments on a pad. Toggle the PRACTICE PAD COMPLETE indicator to confirm you have completed your pad session.",
        expected: true,
        proof: "Practice pad session complete — rudiments practiced on pad."
      },
      {
        type: "note", tool: "log",
        title: "Log Pipe Snare Maintenance",
        prompt: "Switch to the PRACTICE LOG. Write a note about pipe band snare drum care. Include the keywords 'tension' and 'sticks'.",
        keywords: ["tension", "sticks"],
        proof: "Pipe snare care logged — high-tension maintenance and stick care noted."
      }
    ]
  });

  MISSIONS.push({
    id: "pipes_tenor_bass",
    order: 12,
    tag: "MODULE 12",
    icon: "🥁",
    section: "pipes",
    title: "Pipe Band Tenor & Bass Drums",
    desc: "Learn the pipe band tenor and bass drums — flourishing technique, the bass drum's timekeeping role, and the unique visual display of tenor drummers.",
    xp: 100,
    brief: "You are at the final station — the pipe band tenor and bass drum area. In a pipe band, the bass drummer sets the tempo for the entire band, while tenor drummers add rhythmic colour and perform visual flourishes with their sticks. Your instructor wants you to understand these roles and the flourishing technique.",
    scene: "pipes",
    chapters: [
      { title: "Bass Drum Timekeeping", desc: "Understand the bass drummer's tempo role." },
      { title: "Tenor Drum Flourishing", desc: "Learn the visual stick-spinning technique." },
      { title: "Drum Harness & Carriage", desc: "Master carrying the drums while marching." },
      { title: "Tenor & Bass Care Log", desc: "Record maintenance procedures." }
    ],
    tasks: [
      {
        type: "select", tool: "technique",
        title: "Bass Drummer's Primary Role",
        prompt: "In a pipe band, what is the bass drummer's most important responsibility?",
        options: [
          "Playing the melody of the tune",
          "Setting and maintaining the tempo for the entire pipe band",
          "Tuning the bagpipes",
          "Conducting from the front of the band"
        ],
        expected: "Setting and maintaining the tempo for the entire pipe band",
        proof: "Bass drummer role confirmed — sets and maintains the band's tempo."
      },
      {
        type: "select", tool: "technique",
        title: "Tenor Drum Flourishing",
        prompt: "What is the distinctive visual technique associated with pipe band tenor drummers?",
        options: [
          "Standing completely still while playing",
          "Flourishing — spinning and twirling the drumsticks in coordinated patterns while playing",
          "Juggling the drums",
          "Playing with their feet only"
        ],
        expected: "Flourishing — spinning and twirling the drumsticks in coordinated patterns while playing",
        proof: "Tenor flourishing confirmed — coordinated stick spinning while playing."
      },
      {
        type: "toggle", tool: "carekit",
        title: "Inspect Drum Harnesses",
        prompt: "The tenor and bass drums are carried on harnesses during marching. Toggle the HARNESS INSPECTED indicator to confirm both harnesses are secure and fitted.",
        expected: true,
        proof: "Harnesses inspected — both tenor and bass drum harnesses secure."
      },
      {
        type: "note", tool: "log",
        title: "Log Tenor & Bass Drum Care",
        prompt: "Switch to the PRACTICE LOG. Write a note about tenor and bass drum maintenance. Include the keywords 'flourishing' and 'tempo'.",
        keywords: ["flourishing", "tempo"],
        proof: "Tenor & bass care logged — flourishing technique and tempo role noted."
      }
    ]
  });

  // ==========================================================
  // LEARN LIBRARY ARTICLES
  // ==========================================================
  LEARN_ARTICLES = [
    { id: "l_staff", cat: "Music Theory", icon: "🎼", title: "The Staff and Notation", desc: "Five lines, four spaces, clefs, and how to read pitch on the musical staff.", xp: 15 },
    { id: "l_rhythm", cat: "Music Theory", icon: "⏱️", title: "Rhythm and Time Signatures", desc: "Notes, rests, beats per measure, and common time signatures like 4/4 and 2/4.", xp: 15 },
    { id: "l_keys", cat: "Music Theory", icon: "🎹", title: "Key Signatures and Scales", desc: "Sharps, flats, major and minor keys, and how key signatures guide the player.", xp: 15 },
    { id: "l_dynamics", cat: "Music Theory", icon: "🔊", title: "Dynamics and Articulation", desc: "From pianissimo to fortissimo — volume marks, accents, and phrasing.", xp: 15 },
    { id: "l_brass_care", cat: "Instrument Care", icon: "🧰", title: "Brass Instrument Care", desc: "Valve oiling, slide grease, water key draining, and mouthpiece cleaning.", xp: 15 },
    { id: "l_woodwind_care", cat: "Instrument Care", icon: "🧰", title: "Woodwind Instrument Care", desc: "Reed selection, swabbing, pad care, and proper assembly and storage.", xp: 15 },
    { id: "l_percussion_care", cat: "Instrument Care", icon: "🧰", title: "Percussion Care", desc: "Drumhead tuning, stick selection, snare wire maintenance, and mallet care.", xp: 15 },
    { id: "l_pipe_care", cat: "Instrument Care", icon: "🧰", title: "Bagpipe & Reed Care", desc: "Moisture control, reed seating, hemping joints, and chanter reed adjustment.", xp: 15 },
    { id: "l_march_drill", cat: "Band Drill", icon: "🚶", title: "Marching and Parade Drill", desc: "Formation, spacing, the step-off, and playing while marching in time.", xp: 15 },
    { id: "l_band_formations", cat: "Band Drill", icon: "📐", title: "Band Formations", desc: "Concert formation, marching formation, and the role of the drum major.", xp: 15 },
    { id: "l_tuning", cat: "Performance", icon: "🎚️", title: "Tuning the Band", desc: "Reference pitch, tuning procedures, and the role of the principal player.", xp: 15 },
    { id: "l_metronome", cat: "Performance", icon: "⏱️", title: "Using a Metronome", desc: "Why tempo matters, practising with a metronome, and building internal rhythm.", xp: 15 },
    { id: "l_marches", cat: "Repertoire", icon: "🎵", title: "Cadet Marches and Calls", desc: "Common cadet marches, bugle calls, and the role of music in ceremonies.", xp: 15 },
    { id: "l_proficiency", cat: "Standards", icon: "🏆", title: "Music Proficiency Levels", desc: "Understanding Basic through Level 5 standards and the assessment process.", xp: 15 },
    { id: "l_drum_major", cat: "Standards", icon: "🎖️", title: "Becoming a Drum Major", desc: "The leadership role, required proficiency, and responsibilities of the drum major.", xp: 15 },
    { id: "l_summer_courses", cat: "Standards", icon: "🌞", title: "Summer Music Courses", desc: "Basic, Intermediate, and Advanced Musician courses offered at summer training centres.", xp: 15 },
    { id: "l_ccto_music", cat: "Standards", icon: "📋", title: "CATO 14-21: The Music Program", desc: "The official policy governing the cadet music training and assessment program.", xp: 15 },
    { id: "l_practice_tips", cat: "Performance", icon: "📚", title: "Effective Practice Habits", desc: "Structured practice, warm-ups, slow practice, and building muscle memory.", xp: 15 }
  ];
  // ==========================================================
  // RENDER: SIDEBAR
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
    document.getElementById("topRank").textContent = rank.name.replace("Musician ", "").replace("Cadet ", "");
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
    document.getElementById("cmdBadgeTotal").textContent = "of " + MUSIC_BADGES.length;

    // Chapter list grouped by section
    const cl = document.getElementById("chapterList");
    let html = "";
    INSTRUMENT_SECTIONS.forEach(function(sec) {
      const sectionMissions = MISSIONS.filter(function(m) { return m.section === sec.id; });
      if (sectionMissions.length === 0) return;
      html += '<div class="section-group-header"><span class="sgh-icon">' + sec.icon + '</span><span class="sgh-label">' + sec.label + '</span></div>';
      sectionMissions.forEach(function(m) {
        const done = missionDone(m);
        const unlocked = missionUnlocked(m);
        const prog = tasksDoneCount(m);
        const total = m.tasks.length;
        const isActive = activeMissionId === m.id && !done;
        let cls = "chapter";
        let status = "";
        if (done) { cls += " done"; status = '<div class="ch-status done">COMPLETE \u2014 ' + prog + '/' + total + '</div>'; }
        else if (isActive) { cls += " active"; status = '<div class="ch-status ready">IN PROGRESS \u2014 ' + prog + '/' + total + '</div>'; }
        else if (unlocked) { status = '<div class="ch-status ready">READY \u2014 ' + prog + '/' + total + '</div>'; }
        else { cls += " locked"; status = '<div class="ch-status locked">LOCKED \u2014 complete Module ' + (m.order - 1) + '</div>'; }
        const num = done ? "" : '<span class="n">' + m.order + '</span>';
        html += '<div class="' + cls + '" data-mission="' + m.id + '"><div class="ch-num">' + num + '</div><div class="ch-body"><div class="ch-title">' + m.title + '</div><div class="ch-desc">' + m.desc + '</div>' + status + '</div></div>';
      });
    });
    cl.innerHTML = html;
    cl.querySelectorAll(".chapter:not(.locked)").forEach(function(el) {
      el.addEventListener("click", function() { openMission(el.dataset.mission); });
    });
  }

  // ==========================================================
  // RENDER: TRAINING GRID (grouped by instrument section)
  // ==========================================================
  function renderTraining() {
    const grid = document.getElementById("trainingGrid");
    let html = "";
    INSTRUMENT_SECTIONS.forEach(function(sec) {
      const sectionMissions = MISSIONS.filter(function(m) { return m.section === sec.id; });
      if (sectionMissions.length === 0) return;
      html += '<div class="section-group-header"><span class="sgh-icon">' + sec.icon + '</span><span class="sgh-label">' + sec.label + '</span></div>';
      sectionMissions.forEach(function(m) {
        const done = missionDone(m);
        const unlocked = missionUnlocked(m);
        const prog = tasksDoneCount(m);
        const total = m.tasks.length;
        const pct = Math.round((prog / total) * 100);
        let cls = "mission-card";
        if (done) cls += " done";
        if (!unlocked) cls += " locked";
        html += '<div class="' + cls + '" data-mission="' + m.id + '"><div class="mc-ico">' + m.icon + '</div><div class="mc-tag">' + m.tag + '</div><div class="mc-section-label sec-' + sec.id + '">' + sec.label + '</div><div class="mc-title">' + m.title + '</div><div class="mc-desc">' + m.desc + '</div><div class="mc-meta"><span>\u26a1 ' + missionXP(m) + ' XP</span><span>\ud83d\udccb ' + prog + '/' + total + '</span></div><div class="mc-prog"><div class="mc-prog-fill" style="width:' + pct + '%"></div></div></div>';
      });
    });
    grid.innerHTML = html;
    grid.querySelectorAll(".mission-card:not(.locked)").forEach(function(el) {
      el.addEventListener("click", function() { openMission(el.dataset.mission); });
    });
  }

  // ==========================================================
  // RENDER: MISSION SELECTOR
  // ==========================================================
  function renderMissionSelector() {
    const sel = document.getElementById("missionSelector");
    let html = "";
    INSTRUMENT_SECTIONS.forEach(function(sec) {
      const sectionMissions = MISSIONS.filter(function(m) { return m.section === sec.id; });
      if (sectionMissions.length === 0) return;
      html += '<div class="section-group-header"><span class="sgh-icon">' + sec.icon + '</span><span class="sgh-label">' + sec.label + '</span></div>';
      sectionMissions.forEach(function(m) {
        const done = missionDone(m);
        const unlocked = missionUnlocked(m);
        const prog = tasksDoneCount(m);
        const total = m.tasks.length;
        const pct = Math.round((prog / total) * 100);
        let cls = "mission-card";
        if (done) cls += " done";
        if (activeMissionId === m.id) cls += " active";
        if (!unlocked) cls += " locked";
        html += '<div class="' + cls + '" data-mission="' + m.id + '"><div class="mc-ico">' + m.icon + '</div><div class="mc-tag">' + m.tag + '</div><div class="mc-section-label sec-' + sec.id + '">' + sec.label + '</div><div class="mc-title">' + m.title + '</div><div class="mc-desc">' + m.desc + '</div><div class="mc-meta"><span>\u26a1 ' + missionXP(m) + ' XP</span><span>\ud83d\udccb ' + prog + '/' + total + '</span></div><div class="mc-prog"><div class="mc-prog-fill" style="width:' + pct + '%"></div></div></div>';
      });
    });
    sel.innerHTML = html;
    sel.querySelectorAll(".mission-card:not(.locked)").forEach(function(el) {
      el.addEventListener("click", function() { openMission(el.dataset.mission); });
    });
  }

  // ==========================================================
  // OPEN A MISSION
  // ==========================================================
  function openMission(missionId) {
    const m = MISSIONS.find(function(x) { return x.id === missionId; });
    if (!m) return;
    if (!missionUnlocked(m)) {
      toast("warn", "\ud83d\udd12 Module " + m.order + " is locked. Complete the previous module first.");
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
    document.getElementById("missionHeaderSub").textContent = m.tag + " \u2014 " + m.desc;

    renderMissionConsole();
    renderMissionSelector();
    renderCommand();
  }

  function renderMissionConsole() {
    const m = MISSIONS.find(function(x) { return x.id === activeMissionId; });
    if (!m) return;
    const mp = missionProgress(m.id);
    const consoleEl = document.getElementById("missionConsole");

    if (missionDone(m)) {
      consoleEl.innerHTML = completedMissionHTML(m);
      const qsb = document.getElementById("fileSitrepQuickBtn");
      if (qsb) qsb.addEventListener("click", function() { switchSection("sitrep"); });
      const blb = document.getElementById("backToListBtn");
      if (blb) blb.addEventListener("click", exitMission);
      return;
    }

    const task = m.tasks[activeTaskIndex];
    const total = m.tasks.length;
    toggleState[activeTaskIndex] = toggleState[activeTaskIndex] || false;

    consoleEl.innerHTML =
      '<div class="task-console">' +
        '<div class="task-header">' +
          '<div class="th-left">' +
            '<div class="th-ico">' + m.icon + '</div>' +
            '<div><div class="th-title">' + m.title + '</div><div class="th-sub">' + m.tag + ' \u2022 ' + mp.tasksDone.length + '/' + total + ' tasks complete</div></div>' +
          '</div>' +
          '<div class="th-right"><span class="task-stage-pill">TASK ' + (activeTaskIndex + 1) + ' / ' + total + '</span><button class="btn btn-ghost" id="exitMissionBtn" type="button">\u2190 Back to list</button></div>' +
        '</div>' +
        '<div class="task-body">' +
          '<div class="scene-visual">' + sceneSVG(m.scene) + '<div class="scene-overlay">' + m.brief.split(".")[0] + '.</div></div>' +
          '<div class="task-brief">' + m.brief + '</div>' +
          '<div class="tool-dock" id="toolDock">' +
            TOOLS.map(function(t) { return '<button class="tool-btn ' + (activeTool === t.id ? "active" : "") + '" data-tool="' + t.id + '" type="button"><span class="tb-ico">' + t.icon + '</span>' + t.label + '</button>'; }).join("") +
          '</div>' +
          '<div class="tool-req" id="toolReq"><span class="tr-ico">\u26a0\ufe0f</span><span class="tr-text">This task requires the <strong>' + toolLabel(task.tool) + '</strong> to be open. Current tool: <span class="tr-now" id="trNow">' + (activeTool ? toolLabel(activeTool) : "NONE") + '</span></span></div>' +
          '<div class="task-step-label"><span class="step-num">STEP ' + (activeTaskIndex + 1) + '</span><span class="step-title">' + task.title + '</span></div>' +
          '<div class="task-instructions">' + task.prompt + '</div>' +
          '<div class="task-control" id="taskControl">' + renderTaskControl(task, activeTaskIndex) + '</div>' +
          '<div class="task-actions"><button class="btn btn-primary" id="submitTaskBtn" type="button">\u2713 Submit ' + String.fromCharCode(38) + 'amp; Confirm</button><button class="btn btn-ghost" id="hintBtn" type="button">\ud83d\udca1 Hint</button></div>' +
          '<div class="terminal" id="terminal"><div class="ln ln-dim">// awaiting input\u2026</div></div>' +
          '<div class="task-feedback" id="taskFeedback"></div>' +
          '<hr class="divider"/>' +
          '<h3 style="margin-bottom:10px;">Mission Checklist</h3>' +
          '<div class="checklist" id="checklist">' +
            m.tasks.map(function(t, i) {
              const done = mp.tasksDone.indexOf(i) !== -1;
              return '<div class="check-item ' + (done ? "done" : "") + '"><div class="ci-box"></div><div>' + t.title + '</div></div>';
            }).join("") +
          '</div>' +
        '</div>' +
      '</div>';

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
      return '<div class="toggle-row ' + (on ? "on" : "") + '" id="toggleRow" data-idx="' + idx + '"><div class="toggle-switch"></div><div class="toggle-label">' + task.title + '</div><div class="toggle-icon">' + (on ? "\u2713" : "\u25cb") + '</div></div>';
    }
    if (task.type === "select") {
      return '<select class="task-select" id="taskSelect" data-idx="' + idx + '"><option value="">\u2014 Select your answer \u2014</option>' + task.options.map(function(o) { return '<option value="' + o + '">' + o + '</option>'; }).join("") + '</select>';
    }
    if (task.type === "type") {
      return '<input class="task-input" id="taskInput" type="text" placeholder="Type your answer\u2026" autocomplete="off" />';
    }
    if (task.type === "note") {
      return '<textarea class="task-note" id="taskNote" placeholder="Write your log entry here\u2026"></textarea>';
    }
    if (task.type === "slider") {
      sliderValue[idx] = sliderValue[idx] !== undefined ? sliderValue[idx] : 0;
      return '<input class="task-slider" id="taskSlider" type="range" min="0" max="30" value="' + sliderValue[idx] + '" data-idx="' + idx + '" /><div class="slider-readout" id="sliderReadout">' + sliderValue[idx] + ' BPM</div>';
    }
    return "";
  }

  function bindConsoleEvents(task) {
    document.querySelectorAll("#toolDock .tool-btn").forEach(function(b) {
      b.addEventListener("click", function() {
        activeTool = b.dataset.tool;
        document.querySelectorAll("#toolDock .tool-btn").forEach(function(x) { x.classList.remove("active"); });
        b.classList.add("active");
        updateToolReq(task);
        termPush("info", "\u25b8 Opened " + toolLabel(activeTool));
      });
    });

    const toggleRow = document.getElementById("toggleRow");
    if (toggleRow) {
      toggleRow.addEventListener("click", function() {
        const idx = parseInt(toggleRow.dataset.idx, 10);
        toggleState[idx] = !toggleState[idx];
        const on = toggleState[idx];
        toggleRow.classList.toggle("on", on);
        toggleRow.querySelector(".toggle-icon").textContent = on ? "\u2713" : "\u25cb";
      });
    }

    const slider = document.getElementById("taskSlider");
    if (slider) {
      slider.addEventListener("input", function() {
        const idx = parseInt(slider.dataset.idx, 10);
        sliderValue[idx] = parseInt(slider.value, 10);
        document.getElementById("sliderReadout").textContent = sliderValue[idx] + " BPM";
      });
    }

    const submitBtn = document.getElementById("submitTaskBtn");
    if (submitBtn) submitBtn.addEventListener("click", function() { submitTask(task); });

    const hintBtn = document.getElementById("hintBtn");
    if (hintBtn) hintBtn.addEventListener("click", function() { showHint(task); });

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
    const m = MISSIONS.find(function(x) { return x.id === activeMissionId; });
    const fb = document.getElementById("taskFeedback");
    fb.className = "task-feedback";

    if (activeTool !== task.tool) {
      state.totalAttempts++;
      state.wrongAttempts++;
      state.streak = 0;
      saveState();
      fb.classList.add("show", "err");
      fb.innerHTML = "\u274c Wrong tool! This task requires <strong>" + toolLabel(task.tool) + '</strong>. You currently have <strong>' + (activeTool ? toolLabel(activeTool) : "no tool") + "</strong> open. Open the correct tool from the dock above.";
      termPush("err", "\u2717 FAILED \u2014 wrong tool. Required: " + toolLabel(task.tool));
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
      fb.innerHTML = "\u274c " + valid.msg;
      termPush("err", "\u2717 " + valid.msg);
      updateAnalysis();
      return;
    }

    // SUCCESS
    state.streak++;
    if (state.streak > state.bestStreak) state.bestStreak = state.streak;
    const mp = missionProgress(m.id);
    if (mp.tasksDone.indexOf(activeTaskIndex) === -1) mp.tasksDone.push(activeTaskIndex);
    state.missionProgress[m.id] = mp;
    saveState();

    fb.classList.add("show", "ok");
    fb.innerHTML = "\u2705 Correct! " + task.proof;
    termPush("ok", "\u2713 " + task.proof);

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
      const val = (inp ? inp.value : "").trim().toUpperCase();
      if (!val) return { ok: false, msg: "Type your answer in the input field." };
      const exp = String(task.expected).toUpperCase();
      return val === exp ? { ok: true } : { ok: false, msg: '"' + val + '" is not correct. Hint: ' + task.expected.length + " characters." };
    }
    if (task.type === "note") {
      const ta = document.getElementById("taskNote");
      const val = (ta ? ta.value : "").trim();
      if (val.length < 10) return { ok: false, msg: "Your log entry is too short. Write a complete sentence." };
      const lower = val.toLowerCase();
      const checkKw = function(kws) { return kws.every(function(k) { return lower.indexOf(k.toLowerCase()) !== -1; }); };
      const mainOk = task.keywords ? checkKw(task.keywords) : true;
      const altOk = task.altKeywords ? checkKw(task.altKeywords) : false;
      if (mainOk || altOk) return { ok: true };
      const missing = task.keywords.filter(function(k) { return lower.indexOf(k.toLowerCase()) === -1; });
      return { ok: false, msg: "Your note is missing required keywords: " + missing.join(", ") + ". Make sure to include them." };
    }
    if (task.type === "slider") {
      const v = sliderValue[activeTaskIndex] || 0;
      const tol = task.tolerance || 1;
      if (Math.abs(v - task.expected) <= tol) return { ok: true };
      return { ok: false, msg: "The tempo is set to " + v + " BPM. Adjust the metronome to match the target tempo." };
    }
    return { ok: false, msg: "Unknown task type." };
  }

  function showHint(task) {
    const fb = document.getElementById("taskFeedback");
    fb.className = "task-feedback show info";
    let hint = "";
    if (task.type === "select") hint = "The correct answer relates to: " + task.expected.split("(")[0].trim().slice(0, 40) + "\u2026";
    else if (task.type === "type") hint = "The answer has " + task.expected.length + ' characters and starts with "' + task.expected.charAt(0) + '".';
    else if (task.type === "note") hint = "Your note must include: " + task.keywords.join(", ") + (task.altKeywords ? " (or " + task.altKeywords.join(", ") + ")" : "") + ".";
    else if (task.type === "toggle") hint = "Click the toggle row to switch it to the ON (green) position.";
    else if (task.type === "slider") hint = "The target tempo is close to " + task.expected + " BPM.";
    fb.textContent = "\ud83d\udca1 " + hint;
  }

  // ==========================================================
  // COMPLETE MISSION
  // ==========================================================
  function completeMission(m) {
    if (state.completedMissions.indexOf(m.id) === -1) {
      state.completedMissions.push(m.id);
      const earned = missionXP(m);
      state.xp += earned;
      saveState();
      refreshBadges();
      syncMapProgress();
      const badge = MUSIC_BADGES.find(function(b) { return b.mission === m.id; });
      toast("ok", "\ud83c\udfc5 Mission complete! +" + earned + " XP earned. Badge unlocked: " + (badge ? badge.name : m.title) + ".");
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
    const badge = MUSIC_BADGES.find(function(b) { return b.mission === m.id; });
    const mp = missionProgress(m.id);
    return '<div class="task-console"><div class="task-body"><div class="complete-card">' +
      '<div class="cc-ico">\ud83c\udfc5</div>' +
      '<div class="cc-title">Mission Complete: ' + m.title + '</div>' +
      '<div class="cc-sub">' + m.desc + ' You have successfully completed all ' + m.tasks.length + ' tasks and earned the <strong>' + (badge ? badge.name : "Cadet Musician") + '</strong> badge.</div>' +
      '<div class="cc-stats">' +
        '<div class="cc-stat"><div class="v">+' + earned + '</div><div class="l">XP Earned</div></div>' +
        '<div class="cc-stat"><div class="v">' + mp.tasksDone.length + '/' + m.tasks.length + '</div><div class="l">Tasks Done</div></div>' +
        '<div class="cc-stat"><div class="v">' + (mp.wrongAttempts || 0) + '</div><div class="l">Wrong Attempts</div></div>' +
      '</div>' +
      '<div class="task-actions" style="justify-content:center;">' +
        '<button class="btn btn-primary" id="fileSitrepQuickBtn" type="button">\ud83d\udce1 File SITREP for this mission</button>' +
        '<button class="btn btn-ghost" id="backToListBtn" type="button">\u2190 Back to mission list</button>' +
      '</div>' +
    '</div></div></div>';
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
    document.getElementById("ringRankLabel").textContent = rank.name.replace("Musician ", "").replace("Cadet ", "");
    document.getElementById("nextRankName").textContent = nxt ? nxt.name : "MAX RANK";
    const pct = rankProgressPct();
    const circ = 314;
    document.getElementById("xpRingFg").style.strokeDashoffset = circ - (circ * pct / 100);
    document.getElementById("ringXPToNext").textContent = nxt ? (state.xp - rank.xp) + " / " + (nxt.xp - rank.xp) + " XP to next rank" : "MAX RANK ACHIEVED";

    const chart = document.getElementById("xpBarChart");
    chart.innerHTML = MISSIONS.map(function(m) {
      const done = missionDone(m);
      const xp = done ? missionXP(m) : 0;
      const h = Math.max(4, (xp / 100) * 140);
      const label = "M" + (m.order < 10 ? "0" : "") + m.order;
      return '<div class="bar" style="height:' + h + 'px;" title="' + m.title + ': ' + xp + ' XP"><div class="bar-val">' + xp + '</div><div class="bar-label">' + label + '</div></div>';
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
    list.innerHTML = RANKS.map(function(r) {
      let cls = "rank-row";
      let tag = "";
      if (r.id === cur.id) { cls += " current"; tag = '<span class="r-tag current">CURRENT</span>'; }
      else if (state.xp >= r.xp) { cls += " achieved"; tag = '<span class="r-tag achieved">ACHIEVED</span>'; }
      else { tag = '<span class="r-tag locked">LOCKED</span>'; }
      return '<div class="' + cls + '"><div class="r-ico">' + r.icon + '</div><div class="r-body"><div class="r-name">' + r.name + '</div><div class="r-xp">' + r.xp + ' XP \u2022 CALLSIGN ' + r.callsign + '</div></div>' + tag + '</div>';
    }).join("");
  }

  // ==========================================================
  // SITREP
  // ==========================================================
  function renderSitrep() {
    const sel = document.getElementById("sitrepMission");
    const completed = MISSIONS.filter(function(m) { return missionDone(m); });
    sel.innerHTML = '<option value="">Select a completed mission\u2026</option>' +
      completed.map(function(m) { return '<option value="' + m.id + '">' + m.tag + " \u2014 " + m.title + '</option>'; }).join("");

    const log = document.getElementById("sitrepLog");
    if (state.sitreps.length === 0) {
      log.innerHTML = '<p class="muted center" style="padding:20px;">No SITREPs filed yet. Complete a mission and file your first report.</p>';
    } else {
      log.innerHTML = state.sitreps.slice().reverse().map(function(s) {
        const statusMap = {
          NOMINAL: { cls: "low", text: "NOMINAL" },
          MINOR_HAZARD: { cls: "med", text: "MINOR HAZARD" },
          ABORTED: { cls: "high", text: "ABORTED" }
        };
        const st = statusMap[s.status] || statusMap.NOMINAL;
        const m = MISSIONS.find(function(x) { return x.id === s.mission; });
        return '<div class="sitrep-entry"><div class="se-head"><span class="se-time">' + s.time + '</span><span class="se-status ti-level ' + st.cls + '">' + st.text + '</span></div><div class="se-body"><strong>' + (m ? m.tag + " \u2014 " + m.title : s.mission) + '</strong><br/>' + escapeHTML(s.summary) + '</div></div>';
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
    showFeedback(fb, "ok", "SITREP filed successfully! +20 XP. Your bandmaster has received your report.");
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
    grid.innerHTML = LEARN_ARTICLES.map(function(a) {
      const read = state.readArticles.indexOf(a.id) !== -1;
      return '<div class="lib-card ' + (read ? "read" : "") + '" data-article="' + a.id + '"><div class="lc-ico">' + a.icon + '</div><div class="lc-cat">' + a.cat + '</div><div class="lc-title">' + a.title + '</div><div class="lc-desc">' + a.desc + '</div><div class="lc-foot"><span>' + (read ? "\u2713 Read" : "Tap to read") + '</span><span>+' + a.xp + ' XP</span></div></div>';
    }).join("");
    grid.querySelectorAll(".lib-card").forEach(function(el) {
      el.addEventListener("click", function() { openArticle(el.dataset.article); });
    });
  }

  function openArticle(articleId) {
    const a = LEARN_ARTICLES.find(function(x) { return x.id === articleId; });
    if (!a) return;
    if (state.readArticles.indexOf(articleId) === -1) {
      state.readArticles.push(articleId);
      state.xp += a.xp;
      saveState();
      toast("ok", '\ud83d\udcd6 Article read: "' + a.title + '" \u2014 +' + a.xp + " XP");
      renderLearn();
      renderSidebar();
      renderTopStats();
      renderAnalysis();
    } else {
      toast("info", '\ud83d\udcd6 Already read: "' + a.title + '"');
    }
  }


  // ==========================================================
  // AUDIO ENGINE — Web Audio API instrument synthesis
  // ==========================================================
  let audioCtx = null;
  let audioMaster = null;

  function ensureAudio() {
    if (!audioCtx) {
      try {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        audioMaster = audioCtx.createGain();
        audioMaster.gain.value = 0.5;
        audioMaster.connect(audioCtx.destination);
      } catch (e) {
        audioCtx = null;
      }
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
  }

  // Note name to frequency (A4 = 440 Hz)
  var NOTE_SEMITONES = { "C": 0, "C#": 1, "Db": 1, "D": 2, "D#": 3, "Eb": 3, "E": 4, "F": 5, "F#": 6, "Gb": 6, "G": 7, "G#": 8, "Ab": 8, "A": 9, "A#": 10, "Bb": 10, "B": 11 };
  function noteToFreq(noteName) {
    // noteName like "C4", "F#5", "Bb3"
    var match = noteName.match(/^([A-G][#b]?)(-?\d+)$/);
    if (!match) return 440;
    var pitch = match[1];
    var octave = parseInt(match[2], 10);
    var semitone = NOTE_SEMITONES[pitch];
    if (semitone === undefined) return 440;
    var midi = (octave + 1) * 12 + semitone;
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  // Instrument voices — each is a synthesis function
  // voice: { id, label, icon, synthesize(ctx, freq, duration, gainNode) }
  var VOICES = [
    {
      id: "trumpet", label: "Trumpet", icon: "\ud83c\udfba",
      synth: function(ctx, freq, dur, out) {
        var t = ctx.currentTime;
        var osc1 = ctx.createOscillator();
        var osc2 = ctx.createOscillator();
        var osc3 = ctx.createOscillator();
        var g = ctx.createGain();
        var filt = ctx.createBiquadFilter();
        osc1.type = "sawtooth"; osc1.frequency.value = freq;
        osc2.type = "square"; osc2.frequency.value = freq * 2;
        osc3.type = "sine"; osc3.frequency.value = freq;
        var g2 = ctx.createGain(); g2.gain.value = 0.15;
        var g3 = ctx.createGain(); g3.gain.value = 0.3;
        filt.type = "bandpass"; filt.frequency.value = freq * 3; filt.Q.value = 2;
        osc1.connect(g); osc2.connect(g2); osc3.connect(g3);
        g.connect(filt); g2.connect(filt); g3.connect(filt);
        filt.connect(out);
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(0.35, t + 0.04);
        g.gain.linearRampToValueAtTime(0.28, t + dur * 0.5);
        g.gain.linearRampToValueAtTime(0, t + dur);
        osc1.start(t); osc2.start(t); osc3.start(t);
        osc1.stop(t + dur + 0.05); osc2.stop(t + dur + 0.05); osc3.stop(t + dur + 0.05);
      }
    },
    {
      id: "clarinet", label: "Clarinet", icon: "\ud83c\udfb7",
      synth: function(ctx, freq, dur, out) {
        var t = ctx.currentTime;
        var osc = ctx.createOscillator();
        var osc2 = ctx.createOscillator();
        var g = ctx.createGain();
        var filt = ctx.createBiquadFilter();
        osc.type = "square"; osc.frequency.value = freq;
        osc2.type = "sine"; osc2.frequency.value = freq * 3;
        var g2 = ctx.createGain(); g2.gain.value = 0.08;
        filt.type = "lowpass"; filt.frequency.value = freq * 4; filt.Q.value = 3;
        osc.connect(g); osc2.connect(g2); g.connect(filt); g2.connect(filt);
        filt.connect(out);
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(0.3, t + 0.06);
        g.gain.setValueAtTime(0.3, t + dur * 0.7);
        g.gain.linearRampToValueAtTime(0, t + dur);
        osc.start(t); osc2.start(t);
        osc.stop(t + dur + 0.05); osc2.stop(t + dur + 0.05);
      }
    },
    {
      id: "flute", label: "Flute", icon: "\ud83c\udfb7",
      synth: function(ctx, freq, dur, out) {
        var t = ctx.currentTime;
        var osc = ctx.createOscillator();
        var lfo = ctx.createOscillator();
        var lfoGain = ctx.createGain();
        var g = ctx.createGain();
        var filt = ctx.createBiquadFilter();
        osc.type = "sine"; osc.frequency.value = freq;
        lfo.type = "sine"; lfo.frequency.value = 5; lfoGain.gain.value = freq * 0.015;
        lfo.connect(lfoGain); lfoGain.connect(osc.frequency);
        filt.type = "highpass"; filt.frequency.value = freq * 0.7;
        osc.connect(filt); filt.connect(g); g.connect(out);
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(0.25, t + 0.08);
        g.gain.setValueAtTime(0.25, t + dur * 0.8);
        g.gain.linearRampToValueAtTime(0, t + dur);
        osc.start(t); lfo.start(t);
        osc.stop(t + dur + 0.05); lfo.stop(t + dur + 0.05);
      }
    },
    {
      id: "saxophone", label: "Saxophone", icon: "\ud83c\udfb7",
      synth: function(ctx, freq, dur, out) {
        var t = ctx.currentTime;
        var osc1 = ctx.createOscillator();
        var osc2 = ctx.createOscillator();
        var g = ctx.createGain();
        var filt = ctx.createBiquadFilter();
        osc1.type = "sawtooth"; osc1.frequency.value = freq;
        osc2.type = "sine"; osc2.frequency.value = freq * 2;
        var g2 = ctx.createGain(); g2.gain.value = 0.1;
        filt.type = "lowpass"; filt.frequency.value = freq * 5; filt.Q.value = 2;
        osc1.connect(g); osc2.connect(g2); g.connect(filt); g2.connect(filt);
        filt.connect(out);
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(0.32, t + 0.05);
        g.gain.linearRampToValueAtTime(0.26, t + dur * 0.6);
        g.gain.linearRampToValueAtTime(0, t + dur);
        osc1.start(t); osc2.start(t);
        osc1.stop(t + dur + 0.05); osc2.stop(t + dur + 0.05);
      }
    },
    {
      id: "frenchhorn", label: "French Horn", icon: "\ud83c\udfba",
      synth: function(ctx, freq, dur, out) {
        var t = ctx.currentTime;
        var osc1 = ctx.createOscillator();
        var osc2 = ctx.createOscillator();
        var g = ctx.createGain();
        var filt = ctx.createBiquadFilter();
        osc1.type = "sawtooth"; osc1.frequency.value = freq;
        osc2.type = "sine"; osc2.frequency.value = freq * 1.005;
        var g2 = ctx.createGain(); g2.gain.value = 0.5;
        filt.type = "lowpass"; filt.frequency.value = freq * 4; filt.Q.value = 4;
        osc1.connect(g); osc2.connect(g2); g.connect(filt); g2.connect(filt);
        filt.connect(out);
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(0.28, t + 0.08);
        g.gain.setValueAtTime(0.28, t + dur * 0.7);
        g.gain.linearRampToValueAtTime(0, t + dur);
        osc1.start(t); osc2.start(t);
        osc1.stop(t + dur + 0.05); osc2.stop(t + dur + 0.05);
      }
    },
    {
      id: "snare", label: "Snare Drum", icon: "\ud83e\udd41",
      synth: function(ctx, freq, dur, out) {
        var t = ctx.currentTime;
        var bufferSize = ctx.sampleRate * dur;
        var buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        var data = buffer.getChannelData(0);
        for (var i = 0; i < bufferSize; i++) { data[i] = Math.random() * 2 - 1; }
        var noise = ctx.createBufferSource(); noise.buffer = buffer;
        var filt = ctx.createBiquadFilter(); filt.type = "highpass"; filt.frequency.value = 1000;
        var g = ctx.createGain();
        noise.connect(filt); filt.connect(g); g.connect(out);
        g.gain.setValueAtTime(0.5, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + dur);
        noise.start(t); noise.stop(t + dur + 0.02);
        // Add a tone component
        var osc = ctx.createOscillator(); osc.type = "triangle"; osc.frequency.value = 180;
        var og = ctx.createGain();
        osc.connect(og); og.connect(out);
        og.gain.setValueAtTime(0.3, t);
        og.gain.exponentialRampToValueAtTime(0.001, t + dur * 0.5);
        osc.start(t); osc.stop(t + dur * 0.5 + 0.02);
      }
    },
    {
      id: "bassdrum", label: "Bass Drum", icon: "\ud83e\udd41",
      synth: function(ctx, freq, dur, out) {
        var t = ctx.currentTime;
        var osc = ctx.createOscillator();
        var g = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(120, t);
        osc.frequency.exponentialRampToValueAtTime(40, t + dur * 0.5);
        osc.connect(g); g.connect(out);
        g.gain.setValueAtTime(0.8, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + dur);
        osc.start(t); osc.stop(t + dur + 0.02);
      }
    },
    {
      id: "bagpipe", label: "Bagpipe", icon: "\ud83c\udfb6",
      synth: function(ctx, freq, dur, out) {
        var t = ctx.currentTime;
        // Drone
        var drone = ctx.createOscillator();
        var droneG = ctx.createGain();
        drone.type = "sawtooth"; drone.frequency.value = freq / 2;
        droneG.gain.value = 0.08;
        drone.connect(droneG); droneG.connect(out);
        // Chanter (melody)
        var osc1 = ctx.createOscillator();
        var osc2 = ctx.createOscillator();
        var g = ctx.createGain();
        var filt = ctx.createBiquadFilter();
        osc1.type = "sawtooth"; osc1.frequency.value = freq;
        osc2.type = "sawtooth"; osc2.frequency.value = freq * 1.003;
        filt.type = "bandpass"; filt.frequency.value = freq * 2.5; filt.Q.value = 3;
        osc1.connect(filt); osc2.connect(filt); filt.connect(g); g.connect(out);
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(0.22, t + 0.1);
        g.gain.setValueAtTime(0.22, t + dur * 0.85);
        g.gain.linearRampToValueAtTime(0, t + dur);
        drone.start(t); osc1.start(t); osc2.start(t);
        drone.stop(t + dur + 0.05); osc1.stop(t + dur + 0.05); osc2.stop(t + dur + 0.05);
      }
    },
    {
      id: "bell", label: "Glockenspiel", icon: "\ud83c\udfb9",
      synth: function(ctx, freq, dur, out) {
        var t = ctx.currentTime;
        var partials = [1, 2.76, 5.4, 8.93];
        var gains = [0.4, 0.2, 0.12, 0.06];
        for (var p = 0; p < partials.length; p++) {
          var osc = ctx.createOscillator();
          var g = ctx.createGain();
          osc.type = "sine"; osc.frequency.value = freq * partials[p];
          osc.connect(g); g.connect(out);
          g.gain.setValueAtTime(gains[p], t);
          g.gain.exponentialRampToValueAtTime(0.001, t + dur);
          osc.start(t); osc.stop(t + dur + 0.02);
        }
      }
    }
  ];

  function getVoice(id) {
    var v = VOICES.find(function(x) { return x.id === id; });
    return v || VOICES[0];
  }

  // Play a single note with a given voice
  function playNote(noteName, voiceId, duration) {
    ensureAudio();
    if (!audioCtx) return;
    var freq = noteToFreq(noteName);
    var voice = getVoice(voiceId);
    var dur = duration || 0.8;
    voice.synth(audioCtx, freq, dur, audioMaster);
  }

  // Play a frequency directly (for keyboard that may not map to note names)
  function playFreq(freq, voiceId, duration) {
    ensureAudio();
    if (!audioCtx) return;
    var voice = getVoice(voiceId);
    var dur = duration || 0.8;
    voice.synth(audioCtx, freq, dur, audioMaster);
  }

  // ==========================================================
  // EAR LAB STATE
  // ==========================================================
  var earState = {
    voice: "trumpet",
    stagedNote: null,
    placedNotes: [],  // array of { note, x, y, staffPos }
    targetMelody: [], // array of note names for ear-training challenge
    challengeActive: false,
    challengeIndex: 0
  };

  // Notes available in the palette (C4 to C6, 2 octaves)
  var EAR_NOTES = [
    "C4","D4","E4","F4","G4","A4","B4",
    "C5","D5","E5","F5","G5","A5","B5","C6"
  ];

  // Staff positions: maps note name to Y position on the staff (treble clef)
  // Staff lines (top to bottom): F5, D5, B4, G4, E4
  // Each line/space is one diatonic step
  var STAFF_TOP_Y = 30;
  var STAFF_LINE_GAP = 14;
  // Diatonic position: C4 = 0, D4 = 1, E4 = 2, ... C5 = 7, etc.
  function noteToDiatonic(noteName) {
    if (!noteName || typeof noteName !== "string") return null;
    var match = noteName.match(/^([A-G])(#|b)?(-?\d+)$/);
    if (!match) return null;
    var letter = match[1];
    var octave = parseInt(match[3], 10);
    var degrees = { "C": 0, "D": 1, "E": 2, "F": 3, "G": 4, "A": 5, "B": 6 };
    return degrees[letter] + (octave - 4) * 7;
  }
  // E4 is the bottom line of the treble staff, diatonic 2
  // Y = STAFF_TOP_Y + (diatonicFromTop) * (STAFF_LINE_GAP/2)
  // diatonicFromTop = (diatonicE4 - noteDiatonic) = (2 - noteDiatonic)
  function noteToStaffY(noteName) {
    var dia = noteToDiatonic(noteName);
    if (dia === null) return STAFF_TOP_Y + 4 * STAFF_LINE_GAP; // default to bottom line
    var fromTop = (2 - dia); // E4=2 is bottom line (y = 30 + 4*14 = 86)
    return STAFF_TOP_Y + (4 - fromTop) * (STAFF_LINE_GAP / 2);
  }

  function renderEarLab() {
    // Voice grid
    var vg = document.getElementById("earVoiceGrid");
    if (vg) {
      vg.innerHTML = VOICES.map(function(v) {
        return '<button class="ear-voice-btn ' + (earState.voice === v.id ? "active" : "") + '" data-voice="' + v.id + '" type="button"><span class="ev-ico">' + v.icon + '</span><span class="ev-label">' + v.label + '</span></button>';
      }).join("");
      vg.querySelectorAll(".ear-voice-btn").forEach(function(btn) {
        btn.addEventListener("click", function() {
          earState.voice = btn.dataset.voice;
          vg.querySelectorAll(".ear-voice-btn").forEach(function(b) { b.classList.remove("active"); });
          btn.classList.add("active");
          playNote("C5", earState.voice, 0.4);
        });
      });
    }

    // Note palette
    var np = document.getElementById("earNotePalette");
    if (np) {
      np.innerHTML = EAR_NOTES.map(function(n) {
        return '<button class="ear-note-btn" data-note="' + n + '" type="button">' + n + '</button>';
      }).join("");
      np.querySelectorAll(".ear-note-btn").forEach(function(btn) {
        btn.addEventListener("click", function() {
          var note = btn.dataset.note;
          playNote(note, earState.voice, 0.6);
          earState.stagedNote = note;
          np.querySelectorAll(".ear-note-btn").forEach(function(b) { b.classList.remove("playing", "staged"); });
          btn.classList.add("playing");
          setTimeout(function() { btn.classList.remove("playing"); btn.classList.add("staged"); }, 300);
          var sn = document.getElementById("earStagedNote");
          if (sn) sn.textContent = note;
        });
      });
    }

    // Clear staff button
    var csb = document.getElementById("earClearStaffBtn");
    if (csb) {
      csb.onclick = function() {
        earState.placedNotes = [];
        renderStaff();
        showEarFeedback("info", "Staff cleared. Place new notes to build a melody.");
      };
    }

    // Action buttons
    var pmb = document.getElementById("earPlayMelodyBtn");
    if (pmb) pmb.onclick = playPlacedMelody;
    var ptb = document.getElementById("earPlayTargetBtn");
    if (ptb) ptb.onclick = playTargetMelody;
    var ckb = document.getElementById("earCheckBtn");
    if (ckb) ckb.onclick = checkEarChallenge;
    var ncb = document.getElementById("earNewChallengeBtn");
    if (ncb) ncb.onclick = newEarChallenge;

    renderStaff();
    renderKeyboard();
    renderEarChallengeInfo();
  }

  function renderStaff() {
    var wrap = document.getElementById("earStaffWrap");
    if (!wrap) return;
    var w = 520;
    var h = 160;
    var clefX = 18;
    var staffStartX = 60;
    var staffEndX = w - 20;
    var numSlots = 16;
    var slotW = (staffEndX - staffStartX) / numSlots;

    var svg = '<svg class="ear-staff-svg" width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '">';
    // Background
    svg += '<rect class="staff-bg" x="0" y="0" width="' + w + '" height="' + h + '" rx="8"/>';
    // Staff lines
    for (var i = 0; i < 5; i++) {
      var ly = STAFF_TOP_Y + i * STAFF_LINE_GAP;
      svg += '<line class="staff-line" x1="' + staffStartX + '" y1="' + ly + '" x2="' + staffEndX + '" y2="' + ly + '"/>';
    }
    // Treble clef
    svg += '<text class="clef-text" x="' + clefX + '" y="82">\u266a</text>';
    // Slot positions (for note placement)
    for (var s = 0; s < numSlots; s++) {
      var sx = staffStartX + s * slotW;
      svg += '<rect class="pos-highlight" x="' + sx + '" y="20" width="' + slotW + '" height="110" data-slot="' + s + '" style="cursor:pointer;"/>';
    }
    // Target notes (if challenge active, show faint target positions)
    if (earState.challengeActive) {
      for (var ti = 0; ti < earState.targetMelody.length; ti++) {
        var tn = earState.targetMelody[ti];
        var ty = noteToStaffY(tn);
        var tx = staffStartX + ti * slotW + slotW / 2;
        svg += '<g class="note-target"><ellipse cx="' + tx + '" cy="' + ty + '" rx="7" ry="5" transform="rotate(-20 ' + tx + ' ' + ty + ')"/></g>';
      }
    }
    // Placed notes
    for (var pi = 0; pi < earState.placedNotes.length; pi++) {
      var pn = earState.placedNotes[pi];
      if (!pn || !pn.note) continue; // skip gap/null slots
      var py = noteToStaffY(pn.note);
      var px = staffStartX + pi * slotW + slotW / 2;
      // Ledger lines if needed
      if (py > STAFF_TOP_Y + 4 * STAFF_LINE_GAP) {
        // Below staff
        for (var ly2 = STAFF_TOP_Y + 5 * STAFF_LINE_GAP; ly2 <= py + 3; ly2 += STAFF_LINE_GAP) {
          svg += '<line class="ledger-line" x1="' + (px - 12) + '" y1="' + ly2 + '" x2="' + (px + 12) + '" y2="' + ly2 + '"/>';
        }
      }
      if (py < STAFF_TOP_Y) {
        // Above staff
        for (var ly3 = STAFF_TOP_Y - STAFF_LINE_GAP; ly3 >= py - 3; ly3 -= STAFF_LINE_GAP) {
          svg += '<line class="ledger-line" x1="' + (px - 12) + '" y1="' + ly3 + '" x2="' + (px + 12) + '" y2="' + ly3 + '"/>';
        }
      }
      svg += '<g class="note-head note-placed" data-idx="' + pi + '" style="cursor:pointer;">';
      svg += '<ellipse cx="' + px + '" cy="' + py + '" rx="7" ry="5" transform="rotate(-20 ' + px + ' ' + py + ')"/>';
      svg += '<line class="note-stem" x1="' + (px + 6) + '" y1="' + py + '" x2="' + (px + 6) + '" y2="' + (py - 30) + '"/>';
      svg += '</g>';
    }
    svg += '</svg>';
    wrap.innerHTML = svg;

    // Click to place staged note
    wrap.querySelectorAll(".pos-highlight").forEach(function(rect) {
      rect.addEventListener("click", function(e) {
        if (!earState.stagedNote) {
          showEarFeedback("info", "Select a note from the palette first, then click on the staff to place it.");
          return;
        }
        var slot = parseInt(rect.dataset.slot, 10);
        // If slot already has a note, replace it; otherwise push
        if (slot < earState.placedNotes.length) {
          earState.placedNotes[slot] = { note: earState.stagedNote };
        } else {
          // Fill gaps
          while (earState.placedNotes.length < slot) {
            earState.placedNotes.push({ note: null });
          }
          earState.placedNotes.push({ note: earState.stagedNote });
        }
        // Play the note as it's placed
        playNote(earState.stagedNote, earState.voice, 0.5);
        renderStaff();
      });
    });

    // Click placed note to play it
    wrap.querySelectorAll(".note-head.note-placed").forEach(function(g) {
      g.addEventListener("click", function(e) {
        e.stopPropagation();
        var idx = parseInt(g.dataset.idx, 10);
        if (earState.placedNotes[idx] && earState.placedNotes[idx].note) {
          playNote(earState.placedNotes[idx].note, earState.voice, 0.6);
        }
      });
    });
  }

  function renderKeyboard() {
    var kb = document.getElementById("earKeyboard");
    if (!kb) return;
    // Build a keyboard from C3 to C6 (3 octaves)
    var whiteNotes = [];
    var blackNotes = [];
    var octaves = [3, 4, 5];
    var whitePattern = ["C", "D", "E", "F", "G", "A", "B"];
    var blackPattern = [
      { after: "C", note: "C#" },
      { after: "D", note: "D#" },
      { after: "F", note: "F#" },
      { after: "G", note: "G#" },
      { after: "A", note: "A#" }
    ];
    octaves.forEach(function(oct) {
      whitePattern.forEach(function(letter) {
        whiteNotes.push(letter + oct);
      });
      blackPattern.forEach(function(bp) {
        blackNotes.push({ note: bp.note + oct, afterWhite: bp.after + oct });
      });
    });

    var html = "";
    whiteNotes.forEach(function(wn) {
      html += '<div class="ear-key" data-note="' + wn + '">' + wn + '</div>';
    });
    // Black keys positioned absolutely
    var whiteWidth = 100 / whiteNotes.length;
    blackNotes.forEach(function(bn) {
      var whiteIdx = whiteNotes.indexOf(bn.afterWhite);
      if (whiteIdx >= 0) {
        var leftPct = (whiteIdx + 1) * whiteWidth - (whiteWidth * 0.3);
        html += '<div class="ear-key black" data-note="' + bn.note + '" style="left:' + leftPct + '%;">' + bn.note + '</div>';
      }
    });
    kb.innerHTML = html;
    kb.querySelectorAll(".ear-key").forEach(function(key) {
      key.addEventListener("click", function() {
        var note = key.dataset.note;
        playNote(note, earState.voice, 0.6);
        key.classList.add("active");
        setTimeout(function() { key.classList.remove("active"); }, 200);
        // Also stage the note
        if (EAR_NOTES.indexOf(note) !== -1) {
          earState.stagedNote = note;
          var sn = document.getElementById("earStagedNote");
          if (sn) sn.textContent = note;
        }
      });
    });
  }

  function playPlacedMelody() {
    var notes = earState.placedNotes.filter(function(n) { return n && n.note; });
    if (notes.length === 0) {
      showEarFeedback("info", "Place some notes on the staff first, then press Play Melody.");
      return;
    }
    notes.forEach(function(n, i) {
      setTimeout(function() { playNote(n.note, earState.voice, 0.5); }, i * 450);
    });
    showEarFeedback("info", "Playing your melody — " + notes.length + " notes with " + getVoice(earState.voice).label + ".");
  }

  function newEarChallenge() {
    // Generate a random 4-note melody from the palette
    var pool = ["C4","D4","E4","F4","G4","A4","B4","C5","D5","E5"];
    earState.targetMelody = [];
    for (var i = 0; i < 4; i++) {
      earState.targetMelody.push(pool[Math.floor(Math.random() * pool.length)]);
    }
    earState.challengeActive = true;
    earState.placedNotes = [];
    renderStaff();
    renderEarChallengeInfo();
    showEarFeedback("info", "New challenge! Press Play Target to hear the melody, then place the notes on the staff to match it.");
    // Auto-play the target
    setTimeout(playTargetMelody, 500);
  }

  function playTargetMelody() {
    if (earState.targetMelody.length === 0) {
      showEarFeedback("info", "No challenge active. Press New Challenge to generate a target melody.");
      return;
    }
    earState.targetMelody.forEach(function(n, i) {
      setTimeout(function() { playNote(n, earState.voice, 0.5); }, i * 450);
    });
    showEarFeedback("info", "Playing the target melody — listen carefully, then place the matching notes on the staff.");
  }

  function checkEarChallenge() {
    if (!earState.challengeActive || earState.targetMelody.length === 0) {
      showEarFeedback("info", "No challenge active. Press New Challenge to start an ear-training exercise.");
      return;
    }
    var placed = earState.placedNotes.filter(function(n) { return n && n.note; });
    if (placed.length === 0) {
      showEarFeedback("err", "You haven't placed any notes yet. Place notes on the staff to match the target melody.");
      return;
    }
    var correct = 0;
    var total = earState.targetMelody.length;
    for (var i = 0; i < total; i++) {
      if (placed[i] && placed[i].note === earState.targetMelody[i]) correct++;
    }
    if (correct === total) {
      showEarFeedback("ok", "Perfect match! All " + total + " notes correct. You have a great ear. +10 XP bonus!");
      state.xp += 10;
      saveState();
      renderSidebar(); renderTopStats(); renderAnalysis();
      earState.challengeActive = false;
      renderEarChallengeInfo();
    } else {
      showEarFeedback("err", "You matched " + correct + " of " + total + " notes. Listen to the target again and adjust your notes on the staff.");
    }
  }

  function renderEarChallengeInfo() {
    var el = document.getElementById("earChallengeInfo");
    if (!el) return;
    if (earState.challengeActive && earState.targetMelody.length > 0) {
      el.className = "ear-challenge-info show";
      el.innerHTML = '<strong>Ear Training Challenge Active</strong><br/>A ' + earState.targetMelody.length + '-note target melody has been generated. Press <strong>Play Target</strong> to hear it, then place the matching notes on the staff in order. Press <strong>Check Match</strong> when done. Earn +10 XP for a perfect match!';
    } else {
      el.className = "ear-challenge-info";
      el.innerHTML = "";
    }
  }

  function showEarFeedback(kind, msg) {
    var fb = document.getElementById("earFeedback");
    if (!fb) return;
    fb.className = "task-feedback show " + kind;
    fb.textContent = (kind === "ok" ? "\u2705 " : kind === "err" ? "\u274c " : "\ud83d\udca1 ") + msg;
    if (kind === "ok") toast("ok", msg);
  }

  // ==========================================================
  // COMPOSER STATE
  // ==========================================================

  // Master instrument catalogue — all 9 instruments with soundfont mappings
  // sfName = General MIDI soundfont name for real samples (null = synth-only)
  var INSTRUMENTS = [
    { id: "trumpet",     name: "Trumpet",       family: "Brass",      icon: "\ud83c\udfba", color: "#a070f0", glow: "rgba(160,112,240,0.35)",  sfName: "trumpet" },
    { id: "clarinet",    name: "Clarinet",      family: "Woodwind",   icon: "\ud83c\udfb7", color: "#f5c84c", glow: "rgba(245,200,76,0.35)",  sfName: "clarinet" },
    { id: "flute",       name: "Flute",         family: "Woodwind",   icon: "\ud83c\udfb7", color: "#38d9d9", glow: "rgba(56,217,217,0.35)",  sfName: "flute" },
    { id: "saxophone",   name: "Saxophone",     family: "Woodwind",   icon: "\ud83c\udfb7", color: "#ff5a6e", glow: "rgba(255,90,110,0.35)",  sfName: "alto_sax" },
    { id: "frenchhorn",  name: "French Horn",   family: "Brass",      icon: "\ud83c\udfba", color: "#7dd3fc", glow: "rgba(125,211,252,0.35)", sfName: "french_horn" },
    { id: "bagpipe",     name: "Bagpipe",       family: "Pipes",      icon: "\ud83c\udfb6", color: "#34d399", glow: "rgba(52,211,153,0.35)",  sfName: "bagpipe" },
    { id: "bell",        name: "Glockenspiel",  family: "Percussion", icon: "\ud83c\udfb9", color: "#fde047", glow: "rgba(253,224,71,0.35)",  sfName: "glockenspiel" },
    { id: "snare",       name: "Snare Drum",    family: "Percussion", icon: "\ud83e\udd41", color: "#f59e0b", glow: "rgba(245,158,11,0.35)",  sfName: null },
    { id: "bassdrum",    name: "Bass Drum",     family: "Percussion", icon: "\ud83e\udd41", color: "#60a5fa", glow: "rgba(96,165,250,0.35)",  sfName: null }
  ];

  function getInstrument(id) {
    return INSTRUMENTS.find(function(x) { return x.id === id; }) || INSTRUMENTS[0];
  }

  var compState = {
    tempo: 120,
    bars: 4,
    beatsPerBar: 4,
    scaleId: "CMajor",
    // Which instruments are enabled (visible in the grid)
    enabledInstruments: ["trumpet", "clarinet", "snare", "bassdrum"],
    // Track data keyed by instrument id
    tracks: {},
    activeTrackId: "trumpet",
    soloedTrackId: null,
    octave: 4,
    isPlaying: false,
    playheadCol: -1,
    playTimer: null
  };

  // Loaded soundfont players (real instrument samples), keyed by instrument id
  var soundfontPlayers = {};
  // Instruments currently loading their samples
  var loadingInstruments = {};

  // Colour palette for dynamically added tracks
  var TRACK_COLORS = [
    "#a070f0", "#f5c84c", "#4ade80", "#f59e0b",
    "#38d9d9", "#ff5a6e", "#7dd3fc", "#c084fc",
    "#fb7185", "#34d399", "#fde047", "#60a5fa"
  ];

  // Scales: root note + interval pattern
  var SCALES = [
    { id: "CMajor", label: "C Major", root: "C", intervals: [0,2,4,5,7,9,11] },
    { id: "Aminor", label: "A Minor", root: "A", intervals: [0,2,3,5,7,8,10] },
    { id: "GMajor", label: "G Major", root: "G", intervals: [0,2,4,5,7,9,11] },
    { id: "Dminor", label: "D Minor", root: "D", intervals: [0,2,3,5,7,8,10] },
    { id: "FMajor", label: "F Major", root: "F", intervals: [0,2,4,5,7,9,11] },
    { id: "pentatonic", label: "C Pentatonic", root: "C", intervals: [0,2,4,7,9] },
    { id: "blues", label: "C Blues", root: "C", intervals: [0,3,5,6,7,10] },
    { id: "chromatic", label: "Chromatic (all)", root: "C", intervals: [0,1,2,3,4,5,6,7,8,9,10,11] }
  ];

  // Build the note rows for the grid based on scale + octave range
  // We show 2 octaves of the selected scale, top to bottom (high to low)
  var COMP_GRID_ROWS = [];
  function buildGridRows() {
    var scale = SCALES.find(function(s) { return s.id === compState.scaleId; }) || SCALES[0];
    var rootSemitone = NOTE_SEMITONES[scale.root] || 0;
    COMP_GRID_ROWS = [];
    // Two octaves: from octave+1 down to octave
    for (var oct = compState.octave + 1; oct >= compState.octave; oct--) {
      for (var si = scale.intervals.length - 1; si >= 0; si--) {
        var semitone = rootSemitone + scale.intervals[si];
        var noteName = semitoneToNoteName(semitone, oct);
        COMP_GRID_ROWS.push(noteName);
      }
    }
  }

  function semitoneToNoteName(semitone, octave) {
    var names = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
    var idx = ((semitone % 12) + 12) % 12;
    return names[idx] + octave;
  }

  function totalCols() {
    return compState.bars * compState.beatsPerBar;
  }

  // Get the track object for an instrument id (create if needed)
  function getTrack(instrId) {
    if (!compState.tracks[instrId]) {
      compState.tracks[instrId] = { muted: false, grid: [] };
    }
    return compState.tracks[instrId];
  }

  function ensureTrackGrid(track) {
    var cols = totalCols();
    if (!track.grid || track.grid.length !== COMP_GRID_ROWS.length) {
      track.grid = [];
      for (var r = 0; r < COMP_GRID_ROWS.length; r++) {
        track.grid.push(new Array(cols).fill(false));
      }
    }
    // Ensure correct number of columns
    for (var r2 = 0; r2 < track.grid.length; r2++) {
      while (track.grid[r2].length < cols) track.grid[r2].push(false);
      while (track.grid[r2].length > cols) track.grid[r2].pop();
    }
  }

  // ==========================================================
  // SOUNDFONT LOADING
  // ==========================================================

  // Load a real instrument soundfont sample set
  function loadInstrumentSample(instrId) {
    var instr = getInstrument(instrId);
    if (!instr.sfName) return; // No soundfont for this instrument (percussion)
    if (soundfontPlayers[instrId]) return; // Already loaded
    if (loadingInstruments[instrId]) return; // Already loading

    loadingInstruments[instrId] = true;
    updateLoadStatus();

    ensureAudio();
    if (typeof Soundfont === "undefined") {
      loadingInstruments[instrId] = false;
      updateLoadStatus();
      return;
    }

    try {
      Soundfont.instrument(audioCtx, instr.sfName, { soundfont: "FluidR3_GM" }).then(function(player) {
        soundfontPlayers[instrId] = player;
        delete loadingInstruments[instrId];
        updateLoadStatus();
        renderInstrumentPicker();
        // Re-render grid so the track header badge updates from "Synth" to "✓ Real"
        if (!compState.isPlaying) renderComposerGrid();
        // Play a preview note
        playNoteWithSample(instrId, "C5", 0.4);
      }).catch(function(err) {
        console.warn("Soundfont load failed for " + instrId + ":", err);
        delete loadingInstruments[instrId];
        updateLoadStatus();
      });
    } catch (e) {
      console.warn("Soundfont error for " + instrId + ":", e);
      delete loadingInstruments[instrId];
      updateLoadStatus();
    }
  }

  // Update the loading status bar
  function updateLoadStatus() {
    var el = document.getElementById("compLoadStatus");
    if (!el) return;
    var loading = Object.keys(loadingInstruments);
    var loaded = Object.keys(soundfontPlayers);
    if (loading.length > 0) {
      var names = loading.map(function(id) { return getInstrument(id).name; });
      el.innerHTML = '<span class="load-bar"></span>Loading real ' + names.join(", ") + " samples\u2026";
    } else if (loaded.length > 0) {
      var loadedNames = loaded.map(function(id) { return getInstrument(id).name; });
      el.innerHTML = '<span style="color:var(--green)">\u2713</span> Real samples loaded: ' + loadedNames.join(", ");
    } else {
      el.innerHTML = "";
    }
  }

  // Play a note using a loaded soundfont sample, or fall back to synth
  function playNoteWithSample(instrId, noteName, duration) {
    var instr = getInstrument(instrId);
    // If we have a real sample loaded, use it
    if (soundfontPlayers[instrId]) {
      ensureAudio();
      try {
        soundfontPlayers[instrId].play(noteName, audioCtx.currentTime, { duration: duration || 0.8, gain: 0.7 });
        return;
      } catch (e) {
        console.warn("Soundfont play failed, falling back to synth:", e);
      }
    }
    // Fall back to synth
    ensureAudio();
    if (!audioCtx) return;
    var freq = noteToFreq(noteName);
    var voice = getVoice(instrId);
    voice.synth(audioCtx, freq, duration || 0.8, audioMaster);
  }

  // Play a percussion hit (always synth-based)
  function playPercussion(instrId, freq, duration) {
    ensureAudio();
    if (!audioCtx) return;
    var voice = getVoice(instrId);
    voice.synth(audioCtx, freq, duration || 0.5, audioMaster);
  }

  function renderComposer() {
    buildGridRows();
    // Ensure all enabled track grids are correct size
    compState.enabledInstruments.forEach(function(id) {
      ensureTrackGrid(getTrack(id));
    });

    // Tempo slider
    var tempoEl = document.getElementById("compTempo");
    var tempoVal = document.getElementById("compTempoVal");
    if (tempoEl) {
      tempoEl.value = compState.tempo;
      tempoVal.textContent = compState.tempo;
      tempoEl.oninput = function() {
        compState.tempo = parseInt(tempoEl.value, 10);
        tempoVal.textContent = compState.tempo;
      };
    }

    // Bars select
    var barsEl = document.getElementById("compBars");
    if (barsEl) {
      barsEl.value = String(compState.bars);
      barsEl.onchange = function() {
        compState.bars = parseInt(barsEl.value, 10);
        compState.enabledInstruments.forEach(function(id) { ensureTrackGrid(getTrack(id)); });
        renderComposerGrid();
      };
    }

    // Scale select
    var scaleEl = document.getElementById("compScale");
    if (scaleEl) {
      scaleEl.innerHTML = SCALES.map(function(s) {
        return '<option value="' + s.id + '"' + (compState.scaleId === s.id ? " selected" : "") + '>' + s.label + '</option>';
      }).join("");
      scaleEl.onchange = function() {
        compState.scaleId = scaleEl.value;
        buildGridRows();
        compState.enabledInstruments.forEach(function(id) { ensureTrackGrid(getTrack(id)); });
        renderComposerGrid();
      };
    }

    // Transport buttons
    var pb = document.getElementById("compPlayBtn");
    if (pb) pb.onclick = compPlay;
    var sb = document.getElementById("compStopBtn");
    if (sb) sb.onclick = compStop;
    var cb = document.getElementById("compClearBtn");
    if (cb) cb.onclick = compClearAll;
    var svb = document.getElementById("compSaveBtn");
    if (svb) svb.onclick = compSave;
    var ldb = document.getElementById("compLoadBtn");
    if (ldb) ldb.onclick = compLoad;

    renderInstrumentPicker();
    renderComposerGrid();
    updateLoadStatus();

    // Kick off sample loading for all enabled instruments (real samples)
    compState.enabledInstruments.forEach(function(id) {
      loadInstrumentSample(id);
    });
  }

  // Render the instrument picker grid (all 9 instruments, toggle on/off)
  function renderInstrumentPicker() {
    var picker = document.getElementById("compInstrumentPicker");
    if (!picker) return;
    var html = INSTRUMENTS.map(function(instr) {
      var isEnabled = compState.enabledInstruments.indexOf(instr.id) >= 0;
      var isLoaded = !!soundfontPlayers[instr.id];
      var isLoading = !!loadingInstruments[instr.id];
      var hasReal = !!instr.sfName;
      var statusText, statusCls;
      if (isEnabled) {
        if (isLoading) { statusText = "Loading"; statusCls = "loading"; }
        else if (isLoaded) { statusText = "Real Sample"; statusCls = "real"; }
        else if (hasReal) { statusText = "Synth"; statusCls = ""; }
        else { statusText = "Synth"; statusCls = ""; }
      } else {
        statusText = hasReal ? "Real Sample" : "Synth";
        statusCls = "";
      }
      return '<div class="comp-instr-card' + (isEnabled ? " selected" : "") + '" data-instr="' + instr.id + '" style="--instr-color:' + instr.color + '; --instr-glow:' + instr.glow + ';">' +
        '<div class="ci-check">\u2713</div>' +
        '<div class="ci-ico">' + instr.icon + '</div>' +
        '<div class="ci-name">' + instr.name + '</div>' +
        '<div class="ci-family">' + instr.family + '</div>' +
        '<div class="ci-status ' + statusCls + '">' + statusText + '</div>' +
      '</div>';
    }).join("");
    picker.innerHTML = html;

    picker.querySelectorAll(".comp-instr-card").forEach(function(card) {
      card.addEventListener("click", function() {
        var instrId = card.dataset.instr;
        toggleInstrument(instrId);
      });
    });

    // Update hint text
    var hint = document.getElementById("compInstrHint");
    if (hint) {
      var count = compState.enabledInstruments.length;
      if (count === 0) {
        hint.textContent = "Tap an instrument to add it to your composition";
      } else if (count === 1) {
        hint.textContent = count + " instrument selected \u2014 tap more to build your band";
      } else {
        hint.textContent = count + " instruments selected \u2014 tap to add or remove";
      }
    }
  }

  // Toggle an instrument on/off
  function toggleInstrument(instrId) {
    var idx = compState.enabledInstruments.indexOf(instrId);
    if (idx >= 0) {
      // Remove instrument
      compState.enabledInstruments.splice(idx, 1);
      if (compState.activeTrackId === instrId) {
        compState.activeTrackId = compState.enabledInstruments[0] || null;
      }
      if (compState.soloedTrackId === instrId) {
        compState.soloedTrackId = null;
      }
    } else {
      // Add instrument
      compState.enabledInstruments.push(instrId);
      if (!compState.activeTrackId) compState.activeTrackId = instrId;
      // Load real sample if available
      loadInstrumentSample(instrId);
    }
    renderInstrumentPicker();
    renderComposerGrid();
  }

  function renderComposerGrid() {
    var wrap = document.getElementById("compGridWrap");
    if (!wrap) return;
    var cols = totalCols();

    if (compState.enabledInstruments.length === 0) {
      wrap.innerHTML = '<div style="text-align:center; padding:40px; color:var(--ink-3); font-size:14px;">No instruments selected. Pick instruments above to start composing.</div>';
      return;
    }

    var html = '<div class="comp-grid-stack">';

    // Render each enabled instrument as its own stacked block
    compState.enabledInstruments.forEach(function(instrId) {
      var instr = getInstrument(instrId);
      var track = getTrack(instrId);
      ensureTrackGrid(track);
      var isActive = (instrId === compState.activeTrackId);
      var isLoaded = !!soundfontPlayers[instrId];
      var badges = '';
      if (compState.soloedTrackId === instrId) badges += ' <span class="comp-tb-badge soloed">SOLO</span>';
      if (track.muted) badges += ' <span class="comp-tb-badge muted">MUTED</span>';

      html += '<div class="comp-track-block' + (isActive ? " active" : "") + '" data-track="' + instrId + '" style="--tb-color:' + instr.color + ';">';

      // Header bar
      html += '<div class="comp-tb-header" data-track="' + instrId + '">';
      html += '<div class="comp-tb-dot"></div>';
      html += '<span class="comp-tb-ico">' + instr.icon + '</span>';
      html += '<span class="comp-tb-name">' + instr.name + '</span>';
      if (instr.sfName && isLoaded) {
        html += '<span class="comp-tb-voice" style="color:var(--green);">\u2713 Real</span>';
      } else if (instr.sfName) {
        html += '<span class="comp-tb-voice">Synth</span>';
      } else {
        html += '<span class="comp-tb-voice">Percussion</span>';
      }
      // Per-track controls
      html += '<div class="comp-tb-controls">';
      html += '<button class="comp-tb-btn solo' + (compState.soloedTrackId === instrId ? " soloed" : "") + '" data-action="solo" data-track="' + instrId + '" type="button">Solo</button>';
      html += '<button class="comp-tb-btn mute' + (track.muted ? " muted" : "") + '" data-action="mute" data-track="' + instrId + '" type="button">' + (track.muted ? "Muted" : "Mute") + '</button>';
      html += '<button class="comp-tb-btn remove" data-action="remove" data-track="' + instrId + '" type="button" title="Remove instrument">\u2715</button>';
      html += '</div>';
      html += '</div>';

      // Per-track beat-number header row
      html += '<div class="comp-tb-beats">';
      for (var c = 0; c < cols; c++) {
        var beatMark = (c % compState.beatsPerBar === 0) ? " beat-mark" : "";
        html += '<div class="comp-grid-header-cell' + beatMark + '">' + (c + 1) + '</div>';
      }
      html += '</div>';

      // Note rows
      for (var r = 0; r < COMP_GRID_ROWS.length; r++) {
        html += '<div class="comp-grid-row">';
        html += '<div class="comp-grid-label">' + COMP_GRID_ROWS[r] + '</div>';
        html += '<div class="comp-grid-cells">';
        for (var c2 = 0; c2 < cols; c2++) {
          var isCellActive = track.grid[r] && track.grid[r][c2];
          var beatMark2 = (c2 % compState.beatsPerBar === 0) ? " beat-mark" : "";
          var playheadCls = (c2 === compState.playheadCol && compState.isPlaying) ? " playhead" : "";
          var inScale = " in-scale";
          var ghostCls = isActive ? "" : " ghost";
          html += '<div class="comp-cell' + beatMark2 + playheadCls + inScale + ghostCls + (isCellActive ? " active" : "") + '" data-track="' + instrId + '" data-row="' + r + '" data-col="' + c2 + '" style="--cell-color:' + instr.color + ';"></div>';
        }
        html += '</div></div>';
      }
      html += '</div>'; // end comp-track-block
    });

    html += '</div>'; // end comp-grid-stack
    wrap.innerHTML = html;

    // Cell click handlers — toggle cells, make active on click
    wrap.querySelectorAll(".comp-cell").forEach(function(cell) {
      cell.addEventListener("click", function() {
        var r = parseInt(cell.dataset.row, 10);
        var c = parseInt(cell.dataset.col, 10);
        var tid = cell.dataset.track;
        var track = getTrack(tid);
        if (!track.grid[r]) return;
        // Clicking a non-active track's cell makes it the active track
        if (compState.activeTrackId !== tid) {
          compState.activeTrackId = tid;
          renderComposerGrid();
          return;
        }
        track.grid[r][c] = !track.grid[r][c];
        cell.classList.toggle("active");
        if (track.grid[r][c]) {
          var instr = getInstrument(tid);
          if (instr.id === "snare" || instr.id === "bassdrum") {
            playPercussion(tid, 100, 0.3);
          } else {
            playNoteWithSample(tid, COMP_GRID_ROWS[r], 0.3);
          }
        }
      });
    });

    // Header click handlers — activate a track
    wrap.querySelectorAll(".comp-tb-header").forEach(function(hdr) {
      hdr.addEventListener("click", function(e) {
        // Don't activate when clicking control buttons
        if (e.target.classList.contains("comp-tb-btn")) return;
        var tid = hdr.dataset.track;
        if (compState.activeTrackId !== tid) {
          compState.activeTrackId = tid;
          renderComposerGrid();
        }
      });
    });

    // Control button handlers (solo, mute, remove)
    wrap.querySelectorAll(".comp-tb-btn").forEach(function(btn) {
      btn.addEventListener("click", function(e) {
        e.stopPropagation();
        var action = btn.dataset.action;
        var tid = btn.dataset.track;
        if (action === "solo") {
          if (compState.soloedTrackId === tid) {
            compState.soloedTrackId = null;
          } else {
            compState.soloedTrackId = tid;
          }
          renderComposerGrid();
        } else if (action === "mute") {
          var track = getTrack(tid);
          track.muted = !track.muted;
          renderComposerGrid();
        } else if (action === "remove") {
          toggleInstrument(tid);
        }
      });
    });
  }

  function compPlay() {
    if (compState.isPlaying) return;
    if (compState.enabledInstruments.length === 0) {
      showCompFeedback("err", "No instruments selected. Pick instruments above first.");
      return;
    }
    ensureAudio();
    compState.isPlaying = true;
    var cols = totalCols();
    var beatDur = 60 / compState.tempo / 2; // eighth notes
    compState.playheadCol = 0;

    // Ensure samples are loaded for all enabled melodic instruments
    compState.enabledInstruments.forEach(function(id) {
      loadInstrumentSample(id);
    });

    function step() {
      if (!compState.isPlaying || compState.playheadCol >= cols) {
        compStop();
        return;
      }
      // Determine which tracks to play: if a solo track is set, only play that one (unless muted)
      var playIds;
      if (compState.soloedTrackId) {
        playIds = compState.enabledInstruments.filter(function(id) { return id === compState.soloedTrackId && !getTrack(id).muted; });
      } else {
        playIds = compState.enabledInstruments.filter(function(id) { return !getTrack(id).muted; });
      }
      // Play all notes in this column across playing tracks
      playIds.forEach(function(instrId) {
        var track = getTrack(instrId);
        var instr = getInstrument(instrId);
        for (var r = 0; r < COMP_GRID_ROWS.length; r++) {
          if (track.grid[r] && track.grid[r][compState.playheadCol]) {
            if (instr.id === "snare" || instr.id === "bassdrum") {
              playPercussion(instrId, 100, beatDur * 0.9);
            } else {
              playNoteWithSample(instrId, COMP_GRID_ROWS[r], beatDur * 1.2);
            }
          }
        }
      });
      // Update now playing display
      var np = document.getElementById("compNowPlaying");
      if (np) {
        np.innerHTML = '<span class="np-pulse">\u25b6</span> Playing \u2014 Bar ' + (Math.floor(compState.playheadCol / compState.beatsPerBar) + 1) + ', Beat ' + ((compState.playheadCol % compState.beatsPerBar) + 1) + ' / ' + cols;
      }
      // Update playhead in grid
      var cells = document.querySelectorAll(".comp-cell");
      cells.forEach(function(c) { c.classList.remove("playhead"); });
      cells.forEach(function(c) {
        if (parseInt(c.dataset.col, 10) === compState.playheadCol) c.classList.add("playhead");
      });

      compState.playheadCol++;
      compState.playTimer = setTimeout(step, beatDur * 1000);
    }
    step();
  }

  function compStop() {
    compState.isPlaying = false;
    compState.playheadCol = -1;
    if (compState.playTimer) { clearTimeout(compState.playTimer); compState.playTimer = null; }
    var np = document.getElementById("compNowPlaying");
    if (np) np.textContent = "";
    var cells = document.querySelectorAll(".comp-cell");
    cells.forEach(function(c) { c.classList.remove("playhead"); });
  }

  function compClearAll() {
    compState.enabledInstruments.forEach(function(id) {
      var track = getTrack(id);
      ensureTrackGrid(track);
      for (var r = 0; r < track.grid.length; r++) {
        for (var c = 0; c < track.grid[r].length; c++) {
          track.grid[r][c] = false;
        }
      }
    });
    renderComposerGrid();
    showCompFeedback("info", "All tracks cleared. Start composing from scratch!");
  }

  function compSave() {
    try {
      var trackData = {};
      compState.enabledInstruments.forEach(function(id) {
        var track = getTrack(id);
        trackData[id] = { muted: track.muted, grid: track.grid };
      });
      var data = {
        tempo: compState.tempo,
        bars: compState.bars,
        scaleId: compState.scaleId,
        enabledInstruments: compState.enabledInstruments,
        soloedTrackId: compState.soloedTrackId,
        tracks: trackData
      };
      localStorage.setItem("musicCompSave", JSON.stringify(data));
      showCompFeedback("ok", "Composition saved! You can load it later with the Load button.");
    } catch (e) {
      showCompFeedback("err", "Could not save composition.");
    }
  }

  function compLoad() {
    try {
      var raw = localStorage.getItem("musicCompSave");
      if (!raw) { showCompFeedback("info", "No saved composition found. Create one and save it first."); return; }
      var data = JSON.parse(raw);
      compState.tempo = data.tempo || 120;
      compState.bars = data.bars || 4;
      compState.scaleId = data.scaleId || "CMajor";
      compState.enabledInstruments = data.enabledInstruments || ["trumpet", "clarinet", "snare", "bassdrum"];
      compState.soloedTrackId = data.soloedTrackId || null;
      if (data.tracks) {
        compState.tracks = {};
        Object.keys(data.tracks).forEach(function(id) {
          compState.tracks[id] = { muted: data.tracks[id].muted || false, grid: data.tracks[id].grid || [] };
        });
      }
      compState.activeTrackId = compState.enabledInstruments[0] || null;
      renderComposer();
      // Load samples for all enabled instruments
      compState.enabledInstruments.forEach(function(id) { loadInstrumentSample(id); });
      showCompFeedback("ok", "Composition loaded! Press Play to hear it.");
    } catch (e) {
      showCompFeedback("err", "Could not load composition.");
    }
  }

  function showCompFeedback(kind, msg) {
    var fb = document.getElementById("compFeedback");
    if (!fb) return;
    fb.className = "task-feedback show " + kind;
    fb.textContent = (kind === "ok" ? "\u2705 " : kind === "err" ? "\u274c " : "\ud83d\udca1 ") + msg;
    if (kind === "ok") toast("ok", msg);
  }

  // ==========================================================
  // NAVIGATION
  // ==========================================================
  function switchSection(name) {
    document.querySelectorAll(".section").forEach(function(s) { s.classList.remove("active"); });
    const target = document.getElementById("section-" + name);
    if (target) target.classList.add("active");
    document.querySelectorAll(".nav-btn").forEach(function(b) { b.classList.toggle("active", b.dataset.section === name); });
    if (name === "command") renderCommand();
    if (name === "training") renderTraining();
    if (name === "missions") { renderMissionSelector(); if (activeMissionId) openMissionRender(); }
    if (name === "analysis") renderAnalysis();
    if (name === "sitrep") renderSitrep();
    if (name === "ranks") renderRanks();
    if (name === "learn") renderLearn();
    if (name === "earlab") renderEarLab();
    if (name === "composer") renderComposer();
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
    toastTimer = setTimeout(function() { t.classList.remove("show"); }, 3500);
  }

  /* ── i18n: translate data arrays in-place ── */
  if (typeof trMutate === "function") {
    try { trMutate(COMP_GRID_ROWS); } catch(e) {}
    try { trMutate(EAR_NOTES); } catch(e) {}
    try { trMutate(INSTRUMENTS); } catch(e) {}
    try { trMutate(INSTRUMENT_SECTIONS); } catch(e) {}
    try { trMutate(LEARN_ARTICLES); } catch(e) {}
    try { trMutate(MISSIONS); } catch(e) {}
    try { trMutate(MUSIC_BADGES); } catch(e) {}
    try { trMutate(NOTE_SEMITONES); } catch(e) {}
    try { trMutate(RANKS); } catch(e) {}
    try { trMutate(SCALES); } catch(e) {}
    try { trMutate(SK); } catch(e) {}
    try { trMutate(TOOLS); } catch(e) {}
    try { trMutate(TRACK_COLORS); } catch(e) {}
    try { trMutate(VOICES); } catch(e) {}
    try { trMutate(blackNotes); } catch(e) {}
    try { trMutate(blackPattern); } catch(e) {}
    try { trMutate(compState); } catch(e) {}
    try { trMutate(degrees); } catch(e) {}
    try { trMutate(earState); } catch(e) {}
    try { trMutate(gains); } catch(e) {}
    try { trMutate(loadingInstruments); } catch(e) {}
    try { trMutate(names); } catch(e) {}
    try { trMutate(octaves); } catch(e) {}
    try { trMutate(partials); } catch(e) {}
    try { trMutate(sliderValue); } catch(e) {}
    try { trMutate(soundfontPlayers); } catch(e) {}
    try { trMutate(statusMap); } catch(e) {}
    try { trMutate(toggleState); } catch(e) {}
    try { trMutate(trackData); } catch(e) {}
    try { trMutate(whiteNotes); } catch(e) {}
    try { trMutate(whitePattern); } catch(e) {}
  }



  // ==========================================================
  // INIT
  // ==========================================================
  function init() {
    buildBadges();

    document.querySelectorAll(".nav-btn").forEach(function(b) {
      b.addEventListener("click", function() { switchSection(b.dataset.section); });
    });

    const mb = document.getElementById("mobileMenuBtn");
    if (mb) mb.addEventListener("click", function() { document.getElementById("sidebar").classList.toggle("open"); });

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
    renderEarLab();
    renderComposer();

    if (deepMission) {
      const m = MISSIONS.find(function(x) { return x.id === deepMission; });
      if (m) setTimeout(function() { openMission(m.id); }, 200);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
