/* ============================================================
   BRIDGE WATCH GAME  —  bridge_game.js
   Kingston-Class Maritime Coastal Defence Vessel simulator
   Shares the sea cadet XP/rank system via the same localStorage
   key (seaTrainingProgress) so progress stays unified.
   ============================================================ */

(function () {
  "use strict";

  // ==========================================================
  // SHARED STATE (mirrors sea_training.js state shape)
  // ==========================================================
  const SK = "seaTrainingProgress";
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
      bridgeWatches: [],      // completed watch IDs
      bridgeProgress: {},     // watchId -> { resolved: [], wrongAttempts }
      bridgeMiniBest: {},     // minigame id -> best score
      bridgeMiniPlayed: []    // minigame ids played at least once
    };
  }
  function loadState() {
    try {
      const raw = localStorage.getItem(SK);
      if (raw) return Object.assign(defaultState(), JSON.parse(raw));
    } catch (e) {}
    return defaultState();
  }
  function saveState() {
    try { localStorage.setItem(SK, JSON.stringify(state)); } catch (e) {}
  }
  let state = loadState();

  // Mirror RANKS so bridge UI can render rank locally
  const RANKS = [
    { id: 0, name: "Ordinary Cadet", xp: 0, callsign: "ROOKIE-1" },
    { id: 1, name: "Able Cadet", xp: 300, callsign: "CADET-1" },
    { id: 2, name: "Leading Cadet", xp: 700, callsign: "ABLE-1" },
    { id: 3, name: "Master Cadet", xp: 1200, callsign: "LEAD-1" },
    { id: 4, name: "Petty Officer Cadet 2nd Class", xp: 1800, callsign: "PO-1" },
    { id: 5, name: "Petty Officer Cadet 1st Class", xp: 2500, callsign: "BOSUN-1" }
  ];
  function currentRank() {
    let r = RANKS[0];
    for (const rank of RANKS) if (state.xp >= rank.xp) r = rank;
    return r;
  }

  // ==========================================================
  // BRIDGE BADGES (added on top of sea training badge system)
  // ==========================================================
  const BRIDGE_BADGES = [
    { id: "bb_harbour", icon: "⚓", name: "Harbour Watchkeeper", watch: "harbour_pilotage" },
    { id: "bb_coastal", icon: "🧭", name: "Coastal Navigator", watch: "coastal_transit" },
    { id: "bb_night",   icon: "💡", name: "Night Watch", watch: "night_approach" },
    { id: "bb_weather", icon: "🌧️", name: "Heavy Weather Hand", watch: "heavy_weather" },
    { id: "bb_mob",     icon: "🆘", name: "Man Overboard Responder", watch: "man_overboard" },
    { id: "bb_anchorage", icon: "🛟", name: "Anchorage Master", watch: "anchorage_station" }
  ];

  // ==========================================================
  // STATIONS — clickable panels on the interactive bridge
  // ==========================================================
  const STATIONS = [
    { id: "helm",      icon: "🧭", label: "HELM",      desc: "Steer the ship. Set the course on the gyro compass." },
    { id: "telegraph", icon: "⚙️", label: "ENGINE",    desc: "Ring the engine telegraph to order ahead, astern, or stop." },
    { id: "lookout",   icon: "🔭", label: "LOOKOUT",   desc: "Scan five relative bearing sectors for contacts and hazards." },
    { id: "radar",     icon: "📡", label: "RADAR",     desc: "Read the PPI scope and identify contacts by bearing and range." },
    { id: "lights",    icon: "💡", label: "NAV LITES", desc: "Toggle navigation lights: port, starboard, masthead, stern, anchor." },
    { id: "anchor",    icon: "⚓", label: "ANCHOR",    desc: "Let go or weigh anchor and set the cable scope." },
    { id: "comms",     icon: "📻", label: "COMMS",     desc: "Select VHF channels and transmit standard calls." },
    { id: "logbook",   icon: "📓", label: "LOG",       desc: "Log the current situation in the ship's deck log." }
  ];

  // ==========================================================
  // WATCH SCENARIOS — each is a progression of EVENTS the
  // cadet resolves by using the correct station(s).
  // ==========================================================
  const WATCHES = [
    {
      id: "harbour_pilotage",
      order: 1,
      tag: "WATCH 01",
      icon: "⚓",
      title: "Harbour Pilotage",
      desc: "Get the Kingston-Class under way from a berth and pilot her out of a busy harbour.",
      xp: 120,
      scene: "harbour",
      start: { heading: 0, engine: "stop", lights: { port: false, starboard: false, masthead: false, stern: false, anchor: true }, anchor: "letgo", scope: 5, commsCh: 16, lookoutScanned: [], radarContacts: [] },
      events: [
        {
          id: "ev1",
          icon: "🚢",
          title: "Prepare to get under way",
          brief: "The Officer of the Watch orders: 'Prepare to get under way.' Secure the ship for sea — start by weighing anchor.",
          requires: { station: "anchor", anchor: "aweigh" },
          proof: "Anchor is aweigh. The cable is secured and the ship is free to manoeuvre.",
          orderHint: "Open the ANCHOR station and weigh anchor."
        },
        {
          id: "ev2",
          icon: "💡",
          title: "Show navigation lights",
          brief: "Now in restricted visibility within the harbour. Switch on your navigation lights so other vessels can see you.",
          requires: { station: "lights", lightsOn: ["masthead", "port", "starboard", "stern"] },
          proof: "Navigation lights lit — masthead, port (red), starboard (green) and stern (white).",
          orderHint: "Open NAV LITES and switch on masthead, port, starboard, and stern lights."
        },
        {
          id: "ev3",
          icon: "📻",
          title: "Harbour traffic call",
          brief: "Call Halifax Traffic on VHF Channel 12 to declare your departure and intended movement.",
          requires: { station: "comms", commsCh: 12, sent: "departure" },
          proof: "VHF Ch 12 — departure declared to Halifax Traffic. 'Out.'",
          orderHint: "Open COMMS, select Channel 12, then transmit the departure call."
        },
        {
          id: "ev4",
          icon: "⚙️",
          title: "Stand out — engines ahead",
          brief: "Clear of the berth. Ring the engine telegraph to SLOW AHEAD to stand out into the channel.",
          requires: { station: "telegraph", engine: "slow" },
          proof: "Engine telegraph rung — SLOW AHEAD. The Kingston-Class begins to gather way.",
          orderHint: "Open the ENGINE station and ring SLOW AHEAD."
        },
        {
          id: "ev5",
          icon: "🧭",
          title: "Set the channel course",
          brief: "The channel leads out on course 090° (due east). Put the helm over and steer 090°.",
          requires: { station: "helm", heading: 90 },
          proof: "Helm steady on 090° — the ship is shaped for the channel.",
          orderHint: "Open the HELM station and set the heading to 090°."
        }
      ]
    },
    {
      id: "coastal_transit",
      order: 2,
      tag: "WATCH 02",
      icon: "🧭",
      title: "Coastal Transit",
      desc: "Transit along the coast. Read the radar, scan the lookout, and identify a cardinal mark buoy.",
      xp: 150,
      scene: "coastal",
      start: { heading: 90, engine: "half", lights: { port: true, starboard: true, masthead: true, stern: true, anchor: false }, anchor: "aweigh", scope: 0, commsCh: 16, lookoutScanned: [], radarContacts: [] },
      events: [
        {
          id: "ev1",
          icon: "📡",
          title: "Check the radar",
          brief: "There is shipping ahead. Open the radar and identify the contact on the PPI scope.",
          requires: { station: "radar", radarRead: true },
          proof: "Radar contact plotted — a vessel bearing 095°, range 4 miles, crossing port to starboard.",
          orderHint: "Open the RADAR station and read the contacts."
        },
        {
          id: "ev2",
          icon: "🔭",
          title: "Maintain a sharp lookout",
          brief: "Scan all five lookout sectors. A cardinal mark should be visible on the starboard bow.",
          requires: { station: "lookout", sectorsScanned: 5, contactFound: true },
          proof: "Lookout complete — East Cardinal mark sighted on the starboard bow, marking safe water to the east.",
          orderHint: "Open the LOOKOUT station and scan every sector until you find the contact."
        },
        {
          id: "ev3",
          icon: "🧭",
          title: "Alter course for the buoy",
          brief: "Keep the cardinal mark to starboard and shape a course of 045° to clear the headland.",
          requires: { station: "helm", heading: 45 },
          proof: "Course altered to 045° — the ship clears the headland with the cardinal mark to starboard.",
          orderHint: "Open the HELM station and set the heading to 045°."
        },
        {
          id: "ev4",
          icon: "⚙️",
          title: "Increase speed for the transit",
          brief: "Clear of the inshore traffic. Ring FULL AHEAD to make good the transit speed.",
          requires: { station: "telegraph", engine: "full" },
          proof: "Full ahead — the Kingston-Class makes 12 knots through the water.",
          orderHint: "Open the ENGINE station and ring FULL AHEAD."
        },
        {
          id: "ev5",
          icon: "📓",
          title: "Enter the deck log",
          brief: "Log the course, speed, and the buoy you passed in the ship's deck log.",
          requires: { station: "logbook", logged: true },
          proof: "Deck log entry made: 045°, full ahead, East Cardinal mark passed to starboard.",
          orderHint: "Open the LOG station and confirm the log entry."
        }
      ]
    },
    {
      id: "night_approach",
      order: 3,
      tag: "WATCH 03",
      icon: "💡",
      title: "Night Approach",
      desc: "Approach a harbour at night. Confirm lights are correctly shown and identify vessel lights by colour.",
      xp: 170,
      scene: "night",
      start: { heading: 270, engine: "slow", lights: { port: true, starboard: true, masthead: true, stern: true, anchor: false }, anchor: "aweigh", scope: 0, commsCh: 16, lookoutScanned: [], radarContacts: [] },
      events: [
        {
          id: "ev1",
          icon: "🔭",
          title: "Identify the vessel ahead",
          brief: "A vessel is crossing ahead at night. Scan the lookout — what light do you see? Red means port, green means starboard.",
          requires: { station: "lookout", contactFound: true },
          proof: "A green light is seen fine on the port bow — the other vessel is showing her starboard side; she will pass clear to starboard.",
          orderHint: "Open the LOOKOUT station and scan until you find the contact."
        },
        {
          id: "ev2",
          icon: "💡",
          title: "Confirm nav lights are shown",
          brief: "At night all-round visibility depends on your lights. Make sure masthead, port (red), starboard (green) and stern (white) are all on.",
          requires: { station: "lights", lightsOn: ["masthead", "port", "starboard", "stern"] },
          proof: "All navigation lights confirmed burning brightly in the dark.",
          orderHint: "Open NAV LITES and ensure all four running lights are on."
        },
        {
          id: "ev3",
          icon: "📡",
          title: "Radar confirms the contact",
          brief: "Confirm the crossing vessel on radar. Read the contact bearing and range.",
          requires: { station: "radar", radarRead: true },
          proof: "Radar confirms contact bearing 260°, range 3 miles, CPA 0.5 mile — close-quarters situation.",
          orderHint: "Open the RADAR station and read the contacts."
        },
        {
          id: "ev4",
          icon: "🧭",
          title: "Alter to starboard to open CPA",
          brief: "To increase the closest point of approach, alter course to starboard. Steer 300°.",
          requires: { station: "helm", heading: 300 },
          proof: "Helm to starboard, steady on 300° — the CPA opens to a safe distance.",
          orderHint: "Open the HELM station and set the heading to 300°."
        },
        {
          id: "ev5",
          icon: "📻",
          title: "Sound five short blasts",
          brief: "Five or more short blasts means 'I do not understand your intentions.' Transmit a safety call on VHF Channel 16.",
          requires: { station: "comms", commsCh: 16, sent: "safety" },
          proof: "Five short blasts sounded; VHF Ch 16 safety call transmitted. The other vessel acknowledges and alters.",
          orderHint: "Open COMMS, select Channel 16, and transmit the safety call."
        }
      ]
    },
    {
      id: "heavy_weather",
      order: 4,
      tag: "WATCH 04",
      icon: "🌧️",
      title: "Heavy Weather",
      desc: "A squall hits the transit. Reduce speed, secure the ship, and ride out the weather safely.",
      xp: 190,
      scene: "storm",
      start: { heading: 120, engine: "half", lights: { port: true, starboard: true, masthead: true, stern: true, anchor: false }, anchor: "aweigh", scope: 0, commsCh: 16, lookoutScanned: [], radarContacts: [] },
      events: [
        {
          id: "ev1",
          icon: "🔭",
          title: "Spot the squall line",
          brief: "A dark squall line is approaching from ahead. Scan the lookout to confirm it.",
          requires: { station: "lookout", contactFound: true },
          proof: "Squall line sighted dead ahead — wind veering and seas building rapidly.",
          orderHint: "Open the LOOKOUT station and scan until you find the squall."
        },
        {
          id: "ev2",
          icon: "⚙️",
          title: "Reduce speed for the squall",
          brief: "Do not drive hard into heavy seas. Ring the telegraph to SLOW AHEAD.",
          requires: { station: "telegraph", engine: "slow" },
          proof: "Speed reduced — the bow lifts gently to the swell instead of pounding.",
          orderHint: "Open the ENGINE station and ring SLOW AHEAD."
        },
        {
          id: "ev3",
          icon: "🧭",
          title: "Head into the seas",
          brief: "Keep the bow into the waves to avoid broaching. Steer 150° to take the seas on the bow.",
          requires: { station: "helm", heading: 150 },
          proof: "Bow held into the seas on 150° — the ship rides the swell comfortably.",
          orderHint: "Open the HELM station and set the heading to 150°."
        },
        {
          id: "ev4",
          icon: "💡",
          title: "Show all-round anchor light is NOT it — show riding light",
          brief: "In reduced visibility, ensure the masthead light remains on so others can see you in the spray.",
          requires: { station: "lights", lightsOn: ["masthead", "port", "starboard", "stern"] },
          proof: "Navigation lights confirmed burning despite the spray and rain.",
          orderHint: "Open NAV LITES and keep all running lights on."
        },
        {
          id: "ev5",
          icon: "📻",
          title: "Broadcast a securité call",
          brief: "Warn other vessels of heavy weather in the area. Transmit a SECURITE call on VHF Channel 16.",
          requires: { station: "comms", commsCh: 16, sent: "securite" },
          proof: "SECURITE broadcast on Ch 16 — heavy weather warning issued to all stations.",
          orderHint: "Open COMMS, select Channel 16, and transmit the securite call."
        }
      ]
    },
    {
      id: "man_overboard",
      order: 5,
      tag: "WATCH 05",
      icon: "🆘",
      title: "Man Overboard",
      desc: "A crew member has fallen overboard! Execute the MOB recovery sequence immediately.",
      xp: 220,
      scene: "mob",
      start: { heading: 200, engine: "half", lights: { port: true, starboard: true, masthead: true, stern: true, anchor: false }, anchor: "aweigh", scope: 0, commsCh: 16, lookoutScanned: [], radarContacts: [] },
      events: [
        {
          id: "ev1",
          icon: "📢",
          title: "Raise the alarm",
          brief: "MOB! The first action is to raise the alarm. Transmit a PAN-PAN distress call on VHF Channel 16.",
          requires: { station: "comms", commsCh: 16, sent: "panpan" },
          proof: "PAN-PAN, PAN-PAN, PAN-PAN transmitted on Ch 16 — man overboard alarm raised.",
          orderHint: "Open COMMS, select Channel 16, and transmit the PAN-PAN call."
        },
        {
          id: "ev2",
          icon: "🔭",
          title: "Post a dedicated lookout",
          brief: "Never lose sight of the person in the water. Scan the lookout sectors to keep the MOB in view.",
          requires: { station: "lookout", contactFound: true },
          proof: "Dedicated lookout posted — MOB kept in sight, pointing continuously.",
          orderHint: "Open the LOOKOUT station and scan until you locate the person in the water."
        },
        {
          id: "ev3",
          icon: "🧭",
          title: "Turn hard toward the side",
          brief: "Execute the Williamson turn: put the helm hard over toward the side the person fell. Steer 290° to come back on a reciprocal.",
          requires: { station: "helm", heading: 290 },
          proof: "Williamson turn executed — the ship comes back onto the reciprocal of her original course.",
          orderHint: "Open the HELM station and set the heading to 290°."
        },
        {
          id: "ev4",
          icon: "⚙️",
          title: "Reduce speed for recovery",
          brief: "Approach the person slowly, head to wind. Ring the telegraph to DEAD SLOW AHEAD, then STOP as you close.",
          requires: { station: "telegraph", engine: "stop" },
          proof: "Way taken off — engines stopped to come alongside the person safely.",
          orderHint: "Open the ENGINE station and ring STOP."
        },
        {
          id: "ev5",
          icon: "📓",
          title: "Log the MOB in the deck log",
          brief: "Record the time, position, and actions taken in the ship's deck log for the official report.",
          requires: { station: "logbook", logged: true },
          proof: "MOB entry logged — time, position, Williamson turn, and recovery noted for the report.",
          orderHint: "Open the LOG station and confirm the MOB log entry."
        }
      ]
    },
    {
      id: "anchorage_station",
      order: 6,
      tag: "WATCH 06",
      icon: "🛟",
      title: "Anchorage Station",
      desc: "Arrive at the designated anchorage. Let go the anchor, set the scope, and hoist the anchor ball.",
      xp: 200,
      scene: "anchorage",
      start: { heading: 45, engine: "slow", lights: { port: true, starboard: true, masthead: true, stern: true, anchor: false }, anchor: "aweigh", scope: 0, commsCh: 16, lookoutScanned: [], radarContacts: [] },
      events: [
        {
          id: "ev1",
          icon: "🧭",
          title: "Head into the wind and current",
          brief: "Approach the anchorage heading into the wind. Steer 000° (due north) for the approach.",
          requires: { station: "helm", heading: 0 },
          proof: "Bow headed into the wind on 000° — the ship will lie to her anchor cleanly.",
          orderHint: "Open the HELM station and set the heading to 000°."
        },
        {
          id: "ev2",
          icon: "⚙️",
          title: "Stop way on the engine",
          brief: "As you reach the letting-go position, ring the telegraph to STOP so the ship does not overrun the anchor.",
          requires: { station: "telegraph", engine: "stop" },
          proof: "Engines stopped — way is off the ship at the letting-go position.",
          orderHint: "Open the ENGINE station and ring STOP."
        },
        {
          id: "ev3",
          icon: "⚓",
          title: "Let go the anchor",
          brief: "At the letting-go position, let go the anchor and veer cable.",
          requires: { station: "anchor", anchor: "letgo" },
          proof: "Anchor let go — the cable runs out and the anchor bites the seabed.",
          orderHint: "Open the ANCHOR station and let go the anchor."
        },
        {
          id: "ev4",
          icon: "⚓",
          title: "Set the cable scope",
          brief: "For a moderate depth, a scope of 5 (five times the water depth) is appropriate. Set the scope to 5.",
          requires: { station: "anchor", scope: 5 },
          proof: "Scope set to 5 — enough cable veered to hold the ship in moderate conditions.",
          orderHint: "Open the ANCHOR station and set the cable scope to 5."
        },
        {
          id: "ev5",
          icon: "💡",
          title: "Switch to anchor lights",
          brief: "At anchor by night, turn off the running lights and show the all-round anchor light. Switch on the anchor light.",
          requires: { station: "lights", lightsOn: ["anchor"] },
          proof: "Running lights off, all-round anchor light on — the ship shows she is at anchor.",
          orderHint: "Open NAV LITES and switch on the anchor light."
        }
      ]
    }
  ];

  // ==========================================================
  // MINI-GAMES
  // ==========================================================
  const MINIGAMES = [
    { id: "mg_moor", icon: "🪢", title: "Moor the Ship", desc: "Run mooring lines to the correct bollards in order.", xp: 50 },
    { id: "mg_knot", icon: "🪢", title: "Tie Knots", desc: "Complete the steps of a bowline in the right order.", xp: 50 },
    { id: "mg_flags", icon: "🚩", title: "Naval Flags", desc: "Identify the international maritime signal flags.", xp: 50 },
    { id: "mg_dock", icon: "🚢", title: "Dock the Ship", desc: "Bring the ship alongside without hitting the pier.", xp: 60 },
    { id: "mg_sail", icon: "⛵", title: "Sail Race", desc: "Tack upwind to reach the mark before the timer runs out.", xp: 60 },
    { id: "mg_emerg", icon: "🚨", title: "Emergency Response", desc: "Respond to a fire aboard ship with the correct actions.", xp: 70 }
  ];

  // Mini-game state (transient)
  let mgState = null;
  let activeWatchId = null;
  let activeStation = null;     // currently open station overlay
  let ship = {};                // live ship state for active watch
  let eventsLog = [];           // event log entries
  let activeEventIdx = 0;       // index of the current unresolved event
  let lastCommsSent = null;     // last transmitted call type

  // ==========================================================
  // SHIP STATE HELPERS
  // ==========================================================
  function watch() { return WATCHES.find(w => w.id === activeWatchId); }
  function watchProgress(wid) {
    if (!state.bridgeProgress[wid]) state.bridgeProgress[wid] = { resolved: [], wrongAttempts: 0 };
    return state.bridgeProgress[wid];
  }
  function watchDone(w) { return state.bridgeWatches.includes(w.id); }
  function watchUnlocked(w) {
    if (w.order === 1) return true;
    const prev = WATCHES.find(x => x.order === w.order - 1);
    return prev ? watchDone(prev) : true;
  }
  function currentEvent() {
    const w = watch();
    if (!w) return null;
    return w.events[activeEventIdx] || null;
  }
  function resolveProgressPct() {
    const w = watch();
    if (!w) return 0;
    const done = watchProgress(w.id).resolved.length;
    return Math.round((done / w.events.length) * 100);
  }

  // ==========================================================
  // ENGINE TELEGRAPH POSITIONS
  // ==========================================================
  const TELEGRAPH = [
    { id: "full",  label: "FULL AHEAD",  side: "ahead", ico: "⬆️" },
    { id: "half",  label: "HALF AHEAD",  side: "ahead", ico: "⬆️" },
    { id: "slow",  label: "SLOW AHEAD",  side: "ahead", ico: "⬆️" },
    { id: "dslow", label: "DEAD SLOW AHD", side: "ahead", ico: "⬆️" },
    { id: "stop",  label: "STOP",        side: "stop",  ico: "⏹️" },
    { id: "dslow_a", label: "DEAD SLOW ASTN", side: "astern", ico: "⬇️" },
    { id: "slow_a",  label: "SLOW ASTERN",  side: "astern", ico: "⬇️" },
    { id: "half_a",  label: "HALF ASTERN",  side: "astern", ico: "⬇️" },
    { id: "full_a",  label: "FULL ASTERN",  side: "astern", ico: "⬇️" }
  ];
  function teleLabel(id) {
    const t = TELEGRAPH.find(x => x.id === id);
    return t ? t.label : id;
  }

  // ==========================================================
  // LOOKOUT SECTORS (relative bearings)
  // ==========================================================
  const LOOKOUT_SECTORS = [
    { id: 0, lbl: "PORT BOW", ico: "↖️", brg: "315°" },
    { id: 1, lbl: "AHEAD", ico: "⬆️", brg: "000°" },
    { id: 2, lbl: "STBD BOW", ico: "↗️", brg: "045°" },
    { id: 3, lbl: "PORT BEAM", ico: "⬅️", brg: "270°" },
    { id: 4, lbl: "STBD BEAM", ico: "➡️", brg: "090°" }
  ];

  // Deterministic contact placement per watch (so the "found" sector is stable)
  function contactSectorFor(wid) {
    const map = {
      harbour_pilotage: 1,
      coastal_transit: 2,
      night_approach: 0,
      heavy_weather: 1,
      man_overboard: 3,
      anchorage_station: 1
    };
    return map[wid] !== undefined ? map[wid] : 1;
  }

  // ==========================================================
  // RADAR CONTACTS per watch
  // ==========================================================
  function radarContactsFor(wid) {
    const map = {
      harbour_pilotage: [{ id: "T-01", brg: 90, rng: 2, type: "Ferry", note: "Ferry crossing harbour mouth" }],
      coastal_transit: [{ id: "V-04", brg: 95, rng: 4, type: "Cargo vessel", note: "Crossing port to starboard" }],
      night_approach: [{ id: "F-22", brg: 260, rng: 3, type: "Fishing vessel", note: "Close-quarters, CPA 0.5 nm" }],
      heavy_weather: [{ id: "S-99", brg: 120, rng: 6, type: "Squall cell", note: "Heavy precipitation echo" }],
      man_overboard: [{ id: "P-01", brg: 200, rng: 0.2, type: "Person in water", note: "MOB marker, very close" }],
      anchorage_station: [{ id: "A-07", brg: 0, rng: 1, type: "Anchorage berth", note: "Designated letting-go position" }]
    };
    return map[wid] || [];
  }

  // ==========================================================
  // VHF CHANNELS
  // ==========================================================
  const VHF_CHANNELS = [
    { id: 16, label: "CH 16", desc: "Distress, safety & calling" },
    { id: 12, label: "CH 12", desc: "Port operations" },
    { id: 13, label: "CH 13", desc: "Bridge to bridge (navigation)" },
    { id: 6,  label: "CH 6",  desc: "Intership safety" },
    { id: 70, label: "CH 70", desc: "Digital selective calling" }
  ];

  const COMMS_PRESETS = {
    departure: "Halifax Traffic, Halifax Traffic, this is Kingston-Class MCDV departing harbour, outbound via the main channel. Over.",
    safety: "Securité, securité, all stations, all stations — vessel manoeuvring with restricted visibility. Maintain a sharp lookout. Out.",
    securite: "Securité, securité, securité — all stations. Heavy weather warning, reduced visibility in the transit area. Maintain a safe distance. Out.",
    panpan: "Pan-Pan, Pan-Pan, Pan-Pan — Medico. Man overboard from Kingston-Class MCDV, position as per GPS, require immediate assistance. Over.",
    arrival: "Halifax Traffic, this is Kingston-Class MCDV, inbound for anchorage, requesting berth instructions. Over."
  };

  // ==========================================================
  // TOAST (local, since separate IIFE)
  // ==========================================================
  let toastTimer = null;
  function toast(kind, text) {
    const t = document.getElementById("toast");
    const ico = document.getElementById("toastIco");
    const txt = document.getElementById("toastText");
    if (!t) return;
    t.className = "toast " + (kind === "ok" ? "ok" : kind === "warn" ? "warn" : kind === "err" ? "err" : "info");
    ico.textContent = kind === "ok" ? "✅" : kind === "warn" ? "⚠️" : kind === "err" ? "❌" : "ℹ️";
    txt.textContent = text;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 3500);
  }

  function escapeHTML(s) {
    return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  function pad(n) { return n < 10 ? "0" + n : "" + n; }
  function nowTime() {
    const d = new Date();
    return pad(d.getHours()) + ":" + pad(d.getMinutes()) + ":" + pad(d.getSeconds());
  }

  // ==========================================================
  // RENDER — BRIDGE SECTION (entry point)
  // ==========================================================
  function renderBridge() {
    const el = document.getElementById("bridgeContent");
    if (!el) return;

    if (activeWatchId) {
      renderBridgeConsole(el);
      return;
    }

    refreshBadges();
    const intro = `
      <div class="bridge-wrap">
        <div class="bridge-intro">
          <div class="bi-ship">⚓</div>
          <div class="bi-info">
            <h2>HMCS KINGSTON-CLASS — BRIDGE WING</h2>
            <p>You are the Officer of the Watch. Operate the ship from the bridge — not by answering questions, but by working each station. Complete watches in sequence to earn XP and bridge watchkeeping badges. Later watches introduce tides, weather, night navigation and emergencies.</p>
            <div class="bi-stats">
              <div class="bi-stat"><div class="v">${state.bridgeWatches.length}/${WATCHES.length}</div><div class="l">Watches Done</div></div>
              <div class="bi-stat"><div class="v">${bridgeBadgeCount()}</div><div class="l">Bridge Badges</div></div>
              <div class="bi-stat"><div class="v">${state.bridgeMiniPlayed.length}/${MINIGAMES.length}</div><div class="l">Mini-Games</div></div>
              <div class="bi-stat"><div class="v">${state.xp}</div><div class="l">Total XP</div></div>
            </div>
          </div>
        </div>

        <div class="section-head" style="margin-top:6px;">
          <div class="eyebrow">▸ Bridge Watches</div>
          <h2 style="font-size:18px;">Watch Rotation</h2>
          <p>Each watch is a complete scenario flown from the bridge. Resolve every event by opening the correct station and taking the ordered action.</p>
        </div>
        <div class="watch-grid" id="watchGrid"></div>

        <div class="section-head" style="margin-top:10px;">
          <div class="eyebrow">▸ Mini-Games</div>
          <h2 style="font-size:18px;">Bridge Skills Drills</h2>
          <p>Practice individual seamanship skills. Each mini-game earns XP and is tracked for your best score.</p>
        </div>
        <div class="minigame-grid" id="minigameGrid"></div>
      </div>
    `;
    el.innerHTML = intro;
    renderWatchGrid();
    renderMinigameGrid();
  }

  function bridgeBadgeCount() {
    return BRIDGE_BADGES.filter(b => state.bridgeWatches.includes(b.watch)).length;
  }

  function refreshBadges() {
    // Bridge badges are independent; nothing to merge here (kept on bridgeWatches).
  }

  function renderWatchGrid() {
    const grid = document.getElementById("watchGrid");
    if (!grid) return;
    grid.innerHTML = WATCHES.map(w => {
      const done = watchDone(w);
      const unlocked = watchUnlocked(w);
      const cls = done ? "done" : unlocked ? "" : "locked";
      const statusCls = done ? "done" : unlocked ? "ready" : "locked";
      const statusTxt = done ? "COMPLETE" : unlocked ? "START WATCH" : "LOCKED";
      return `<div class="watch-card ${cls}" data-watch="${w.id}">
        <div class="wc-top">
          <div class="wc-ico">${w.icon}</div>
          <div>
            <div class="wc-tag">${w.tag}</div>
            <div class="wc-title">${w.title}</div>
          </div>
        </div>
        <div class="wc-desc">${w.desc}</div>
        <div class="wc-foot">
          <span class="wc-xp">+${w.xp} XP</span>
          <span class="wc-status ${statusCls}">${statusTxt}</span>
        </div>
      </div>`;
    }).join("");
    grid.querySelectorAll(".watch-card").forEach(card => {
      card.addEventListener("click", () => {
        const wid = card.dataset.watch;
        const w = WATCHES.find(x => x.id === wid);
        if (!w) return;
        if (!watchUnlocked(w)) { toast("warn", "🔒 " + w.tag + " is locked. Complete the previous watch first."); return; }
        if (watchDone(w)) { toast("info", "✓ " + w.title + " already complete. Replaying for practice."); }
        startWatch(wid);
      });
    });
  }

  function renderMinigameGrid() {
    const grid = document.getElementById("minigameGrid");
    if (!grid) return;
    grid.innerHTML = MINIGAMES.map(mg => {
      const played = state.bridgeMiniPlayed.includes(mg.id);
      const best = state.bridgeMiniBest[mg.id] !== undefined ? "Best: " + state.bridgeMiniBest[mg.id] : "";
      return `<div class="mg-card" data-mg="${mg.id}">
        <div class="mg-ico">${mg.icon}</div>
        <div class="mg-title">${mg.title}</div>
        <div class="mg-desc">${mg.desc}</div>
        <div class="mg-best">${played ? best : "Not yet played"} · +${mg.xp} XP</div>
      </div>`;
    }).join("");
    grid.querySelectorAll(".mg-card").forEach(card => {
      card.addEventListener("click", () => openMinigame(card.dataset.mg));
    });
  }

  // ==========================================================
  // START / EXIT A WATCH
  // ==========================================================
  function startWatch(wid) {
    const w = WATCHES.find(x => x.id === wid);
    if (!w) return;
    activeWatchId = wid;
    ship = JSON.parse(JSON.stringify(w.start));
    ship.radarContacts = radarContactsFor(wid);
    eventsLog = [];
    activeEventIdx = 0;
    activeStation = null;
    lastCommsSent = null;
    logEvent("info", "⚓", "Watch commenced — " + w.title + ". Take the bridge, Officer of the Watch.");
    logEvent("alert", w.events[0].icon, w.events[0].title + " — " + w.events[0].brief);
    renderBridge();
  }

  function exitWatch() {
    activeWatchId = null;
    activeStation = null;
    renderBridge();
  }

  // ==========================================================
  // RENDER — ACTIVE BRIDGE CONSOLE
  // ==========================================================
  let bridgePanX = 0;         // pan offset for immersive bridge (0 = centred forward)
  const BRIDGE_PAN_WIDTH = 2400;
  const BRIDGE_VIEW_WIDTH = 800;

  function renderBridgeConsole(el) {
    const w = watch();
    if (!w) { renderBridge(); return; }
    const ev = currentEvent();
    const done = watchDone(w);
    const pct = resolveProgressPct();

    if (done && activeEventIdx >= w.events.length) {
      el.innerHTML = renderWatchComplete(w);
      bindWatchComplete(el, w);
      return;
    }

    const reqStation = ev ? ev.requires.station : "";

    el.innerHTML = `
      <div class="bridge-immersive">
        <div class="bi-topbar">
          <div class="bi-top-left">
            <span class="bi-watch-ico">${w.icon}</span>
            <div>
              <div class="bi-watch-title">${w.title}</div>
              <div class="bi-watch-sub">${w.tag} · Kingston-Class MCDV</div>
            </div>
          </div>
          <div class="bi-top-right">
            <span class="bi-event-pill">EVENT ${activeEventIdx + 1}/${w.events.length}</span>
            <button class="btn btn-ghost" id="exitWatchBtn" type="button">← Leave bridge</button>
          </div>
        </div>

        <div class="bi-order-bar" id="orderBar">
          ${ev ? `<span class="bi-order-icon">${ev.icon}</span><span class="bi-order-title">${ev.title}</span><span class="bi-order-brief">${ev.brief}</span><span class="bi-order-hint">→ ${ev.orderHint || ("Open the " + (STATIONS.find(s=>s.id===reqStation)||{}).label + " station")}</span>` : ""}
        </div>

        <div class="bi-scene-wrap" id="bridgeSceneWrap">
          <div class="bi-scene" id="bridgeScene" style="transform: translateX(${bridgePanX}px)">
            ${bridgeInteriorSVG(reqStation)}
          </div>
          <div class="bi-pan-left" id="panLeft" title="Look left">◀</div>
          <div class="bi-pan-right" id="panRight" title="Look right">▶</div>
          <div class="bi-hud-tl">
            <div class="bi-hud-line">HDG <span class="bi-hud-val">${pad3(ship.heading)}°</span></div>
            <div class="bi-hud-line">ENG <span class="bi-hud-val">${teleLabel(ship.engine)}</span></div>
            <div class="bi-hud-line">VHF <span class="bi-hud-val">CH ${ship.commsCh}</span></div>
          </div>
          <div class="bi-hud-tr">
            <div class="bi-hud-line">ANK <span class="bi-hud-val">${ship.anchor === "letgo" ? "DOWN" : ship.anchor === "aweigh" ? "AWEIGH" : "STOWED"}</span></div>
            <div class="bi-hud-line">LTS <span class="bi-hud-val">${Object.keys(ship.lights).filter(k=>ship.lights[k]).length} ON</span></div>
            <div class="bi-hud-line">LOG <span class="bi-hud-val">${ship.logged ? "✓" : "—"}</span></div>
          </div>
          <div class="bi-minimap" id="bridgeMinimap">${bridgeMinimapSVG()}</div>
        </div>

        <div class="bi-bottom">
          <div class="bi-progress-wrap">
            <div class="watch-progress-bar"><div class="watch-progress-fill" style="width:${pct}%"></div></div>
            <span class="bi-progress-pct">${Math.round(pct)}%</span>
          </div>
          <div class="bi-bottom-grid">
            <div class="bridge-events" id="bridgeEvents">${renderEventsLog()}</div>
            <div class="bridge-status" id="shipStatus">${renderShipStatus()}</div>
          </div>
        </div>
      </div>

      <div class="bi-station-drawer" id="stationDrawer">
        <div class="bi-sd-content" id="stationDrawerContent"></div>
      </div>
    `;
    bindImmersiveConsole();
  }

  function bridgeMinimapSVG() {
    // top-down mini-map showing where you're looking
    const markers = [
      { id: "helm",       x: 50, y: 30, lbl: "H" },
      { id: "telegraph",  x: 30, y: 45, lbl: "E" },
      { id: "comms",      x: 70, y: 45, lbl: "C" },
      { id: "radar",      x: 22, y: 65, lbl: "R" },
      { id: "logbook",    x: 78, y: 65, lbl: "L" },
      { id: "lights",     x: 35, y: 80, lbl: "Lt" },
      { id: "lookout",    x: 50, y: 15, lbl: "Lo" },
      { id: "anchor",     x: 65, y: 80, lbl: "A" }
    ];
    // pan position indicator (0 = centre = forward)
    const lookX = 50 + (bridgePanX / (BRIDGE_PAN_WIDTH / 2)) * 35;
    let dots = markers.map(m =>
      `<circle cx="${m.x}" cy="${m.y}" r="3" fill="${m.id === (currentEvent() ? currentEvent().requires.station : "") ? "#ffb454" : "#2dd4bf"}" opacity="${m.id === (currentEvent() ? currentEvent().requires.station : "") ? 1 : 0.5}"/>`
    ).join("");
    return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="8" fill="#04121f" opacity="0.85"/>
      <path d="M20 25 Q50 10 80 25 L80 85 L20 85 Z" fill="none" stroke="#1a4858" stroke-width="1.5"/>
      <text x="50" y="6" fill="#6f86a8" font-size="6" text-anchor="middle" font-family="monospace">BOW</text>
      ${dots}
      <line x1="${lookX}" y1="0" x2="${lookX}" y2="100" stroke="#ffb454" stroke-width="1" opacity="0.6" stroke-dasharray="3 2"/>
    </svg>`;
  }

  function renderCurrentOrder(ev) {
    return `<div class="task-step-label" style="margin-top:14px;">
        <span class="step-num">CURRENT ORDER</span>
        <span class="step-title">${ev.title}</span>
      </div>
      <div class="task-instructions">${ev.brief}</div>`;
  }

  function renderStationButtons(ev) {
    const requiredStation = ev ? ev.requires.station : "";
    return STATIONS.map(s => {
      const isReq = s.id === requiredStation;
      let stateTxt = "";
      if (s.id === "helm") stateTxt = ship.heading + "°";
      else if (s.id === "telegraph") stateTxt = teleLabel(ship.engine).split(" ")[0];
      else if (s.id === "lookout") stateTxt = ship.lookoutScanned.length + "/5";
      else if (s.id === "radar") stateTxt = ship.radarContacts.length + " ctct";
      else if (s.id === "lights") {
        const on = Object.keys(ship.lights).filter(k => ship.lights[k]);
        stateTxt = on.length + " on";
      }
      else if (s.id === "anchor") stateTxt = ship.anchor === "letgo" ? "DOWN" : ship.anchor === "aweigh" ? "AWEIGH" : "STBD";
      else if (s.id === "comms") stateTxt = "CH " + ship.commsCh;
      else if (s.id === "logbook") stateTxt = ship.logged ? "LOGGED" : "—";
      return `<button class="station-btn ${isReq ? "alert" : ""}" data-station="${s.id}" type="button">
        <div class="sb-ico">${s.icon}</div>
        <div class="sb-label">${s.label}</div>
        <div class="sb-state">${stateTxt}</div>
      </button>`;
    }).join("");
  }

  function renderShipStatus() {
    const onLights = Object.keys(ship.lights).filter(k => ship.lights[k]);
    const engCls = ship.engine === "stop" ? "warn" : "ok";
    const anchorTxt = ship.anchor === "letgo" ? "LET GO" : ship.anchor === "aweigh" ? "AWEIGH" : "STOWED";
    return `
      <h3>Ship's Status</h3>
      <div class="bs-row"><span class="bs-lbl">Heading</span><span class="bs-val">${pad3(ship.heading)}°</span></div>
      <div class="bs-row"><span class="bs-lbl">Engine</span><span class="bs-val ${engCls}">${teleLabel(ship.engine)}</span></div>
      <div class="bs-row"><span class="bs-lbl">Lookout</span><span class="bs-val">${ship.lookoutScanned.length}/5 sectors</span></div>
      <div class="bs-row"><span class="bs-lbl">Radar</span><span class="bs-val">${ship.radarRead ? "READ" : "STBY"}</span></div>
      <div class="bs-row"><span class="bs-lbl">Nav lights</span><span class="bs-val ${onLights.length ? "ok" : "warn"}">${onLights.length} lit</span></div>
      <div class="bs-row"><span class="bs-lbl">Anchor</span><span class="bs-val">${anchorTxt}</span></div>
      <div class="bs-row"><span class="bs-lbl">Scope</span><span class="bs-val">${ship.scope}× depth</span></div>
      <div class="bs-row"><span class="bs-lbl">VHF</span><span class="bs-val">CH ${ship.commsCh}</span></div>
      <div class="bs-row"><span class="bs-lbl">Last call</span><span class="bs-val">${lastCommsSent ? lastCommsSent.toUpperCase() : "—"}</span></div>
      <div class="bs-row"><span class="bs-lbl">Deck log</span><span class="bs-val ${ship.logged ? "ok" : ""}">${ship.logged ? "ENTERED" : "OPEN"}</span></div>
    `;
  }

  function pad3(n) { n = String(n); while (n.length < 3) n = "0" + n; return n; }

  function renderEventsLog() {
    if (eventsLog.length === 0) return `<h3>Bridge Log</h3><p class="muted" style="font-size:12px;">No events yet.</p>`;
    return `<h3>Bridge Log</h3>` + eventsLog.slice().reverse().slice(0, 14).map(e =>
      `<div class="event-item ${e.kind}"><span class="ev-ico">${e.ico}</span><span class="ev-text"><span class="ev-time">${e.time}</span>${escapeHTML(e.text)}</span></div>`
    ).join("");
  }

  function logEvent(kind, ico, text) {
    eventsLog.push({ kind, ico, text, time: nowTime() });
  }

  // ==========================================================
  // BIND IMMERSIVE CONSOLE EVENTS
  // ==========================================================
  function bindImmersiveConsole() {
    // Station hotspot clicks inside the panoramic SVG
    document.querySelectorAll("#bridgeScene .bi-hotspot").forEach(hs => {
      hs.addEventListener("click", (e) => {
        e.stopPropagation();
        openStation(hs.dataset.station);
      });
    });
    // Pan controls
    const panLeft = document.getElementById("panLeft");
    const panRight = document.getElementById("panRight");
    if (panLeft) panLeft.addEventListener("click", () => panBridge(-200));
    if (panRight) panRight.addEventListener("click", () => panBridge(200));

    // Drag-to-pan on the scene
    const wrap = document.getElementById("bridgeSceneWrap");
    if (wrap) {
      let dragging = false, dragStartX = 0, dragStartPan = 0;
      wrap.addEventListener("mousedown", (e) => {
        if (e.target.closest(".bi-hotspot")) return;
        dragging = true; dragStartX = e.clientX; dragStartPan = bridgePanX;
        wrap.style.cursor = "grabbing";
      });
      window.addEventListener("mousemove", (e) => {
        if (!dragging) return;
        let np = dragStartPan + (e.clientX - dragStartX);
        np = Math.max(-(BRIDGE_PAN_WIDTH - BRIDGE_VIEW_WIDTH), Math.min(0, np));
        bridgePanX = np;
        const scene = document.getElementById("bridgeScene");
        if (scene) scene.style.transform = `translateX(${np}px)`;
        updateMinimap();
      });
      window.addEventListener("mouseup", () => { dragging = false; if (wrap) wrap.style.cursor = "grab"; });
      // Touch support
      wrap.addEventListener("touchstart", (e) => {
        if (e.target.closest(".bi-hotspot")) return;
        dragging = true; dragStartX = e.touches[0].clientX; dragStartPan = bridgePanX;
      }, { passive: true });
      wrap.addEventListener("touchmove", (e) => {
        if (!dragging) return;
        let np = dragStartPan + (e.touches[0].clientX - dragStartX);
        np = Math.max(-(BRIDGE_PAN_WIDTH - BRIDGE_VIEW_WIDTH), Math.min(0, np));
        bridgePanX = np;
        const scene = document.getElementById("bridgeScene");
        if (scene) scene.style.transform = `translateX(${np}px)`;
        updateMinimap();
      }, { passive: true });
      wrap.addEventListener("touchend", () => { dragging = false; });
    }

    // Keyboard pan (left/right arrows)
    document.addEventListener("keydown", immersiveKeyHandler);

    const exitBtn = document.getElementById("exitWatchBtn");
    if (exitBtn) exitBtn.addEventListener("click", exitWatch);
  }

  function immersiveKeyHandler(e) {
    if (!activeWatchId) return;
    if (e.key === "ArrowLeft") { panBridge(-200); e.preventDefault(); }
    else if (e.key === "ArrowRight") { panBridge(200); e.preventDefault(); }
  }

  function panBridge(delta) {
    let np = bridgePanX + delta;
    np = Math.max(-(BRIDGE_PAN_WIDTH - BRIDGE_VIEW_WIDTH), Math.min(0, np));
    bridgePanX = np;
    const scene = document.getElementById("bridgeScene");
    if (scene) scene.style.transform = `translateX(${np}px)`;
    updateMinimap();
  }

  function updateMinimap() {
    const mm = document.getElementById("bridgeMinimap");
    if (mm) mm.innerHTML = bridgeMinimapSVG();
  }

  // ==========================================================
  // OPEN STATION — embedded drawer panel
  // ==========================================================
  function openStation(stationId) {
    activeStation = stationId;
    const s = STATIONS.find(x => x.id === stationId);
    if (!s) return;
    const drawer = document.getElementById("stationDrawer");
    const content = document.getElementById("stationDrawerContent");
    if (!drawer || !content) return;
    content.innerHTML = `
      <div class="bi-sd-header">
        <div class="bi-sd-title"><span style="font-size:22px">${s.icon}</span> ${s.label} STATION</div>
        <button class="sp-close" id="spClose" type="button">✕</button>
      </div>
      <div class="bi-sd-body" id="spBody">${renderStationBody(stationId)}</div>
    `;
    drawer.classList.add("open");
    document.getElementById("spClose").addEventListener("click", closeStation);
    bindStation(stationId);
    // Pan the bridge to bring the station into view
    panToStation(stationId);
  }

  function panToStation(stationId) {
    const positions = {
      lookout: 0, helm: 0, telegraph: -250, comms: -500,
      radar: -800, logbook: -1200, lights: -1600, anchor: -1600
    };
    let target = positions[stationId];
    if (target === undefined) return;
    target = Math.max(-(BRIDGE_PAN_WIDTH - BRIDGE_VIEW_WIDTH), Math.min(0, target));
    // smooth pan
    const start = bridgePanX;
    const diff = target - start;
    const steps = 15;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      bridgePanX = start + diff * (step / steps);
      const scene = document.getElementById("bridgeScene");
      if (scene) scene.style.transform = `translateX(${bridgePanX}px)`;
      updateMinimap();
      if (step >= steps) clearInterval(interval);
    }, 20);
  }

  function closeStation() {
    const drawer = document.getElementById("stationDrawer");
    if (drawer) drawer.classList.remove("open");
    activeStation = null;
    if (activeWatchId) {
      // Refresh the immersive console to update station states
      const el = document.getElementById("bridgeContent");
      if (el) renderBridgeConsole(el);
    }
  }

  function refreshStationBody() {
    const body = document.getElementById("spBody");
    if (body && activeStation) {
      body.innerHTML = renderStationBody(activeStation);
      bindStation(activeStation);
    }
  }

  // ==========================================================
  // STATION BODIES
  // ==========================================================
  function renderStationBody(id) {
    switch (id) {
      case "helm": return renderHelm();
      case "telegraph": return renderTelegraph();
      case "lookout": return renderLookout();
      case "radar": return renderRadar();
      case "lights": return renderLights();
      case "anchor": return renderAnchor();
      case "comms": return renderComms();
      case "logbook": return renderLogbook();
      default: return "";
    }
  }

  // ---- HELM ----
  function renderHelm() {
    const h = ship.heading;
    const needle = h;
    return `
      <div class="helm-compass">
        <div class="helm-instruct">Tap a preset or click on the compass rose to set the heading. The ship will turn to the ordered course.</div>
        <div class="helm-dial" id="helmDial">${compassSVG(needle)}</div>
        <div class="helm-readout" id="helmReadout">${pad3(h)}°</div>
        <div class="helm-presets">
          ${[0, 45, 90, 135, 180, 225, 270, 290, 300].map(p => `<button class="helm-preset" data-h="${p}" type="button">${pad3(p)}°</button>`).join("")}
        </div>
      </div>
    `;
  }
  function compassSVG(needle) {
    const cx = 110, cy = 110, r = 92;
    let ticks = "";
    for (let a = 0; a < 360; a += 30) {
      const rad = (a - 90) * Math.PI / 180;
      const x1 = cx + Math.cos(rad) * r;
      const y1 = cy + Math.sin(rad) * r;
      const x2 = cx + Math.cos(rad) * (r - 10);
      const y2 = cy + Math.sin(rad) * (r - 10);
      ticks += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#1a4858" stroke-width="1"/>`;
    }
    const card = [
      { l: "N", a: 0 }, { l: "E", a: 90 }, { l: "S", a: 180 }, { l: "W", a: 270 }
    ];
    const labels = card.map(c => {
      const rad = (c.a - 90) * Math.PI / 180;
      const x = cx + Math.cos(rad) * (r - 22);
      const y = cy + Math.sin(rad) * (r - 22) + 4;
      return `<text x="${x}" y="${y}" fill="#5eead4" font-size="12" font-family="monospace" text-anchor="middle">${c.l}</text>`;
    }).join("");
    const nrad = (needle - 90) * Math.PI / 180;
    const nx = cx + Math.cos(nrad) * (r - 18);
    const ny = cy + Math.sin(nrad) * (r - 18);
    return `<svg viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="#0c1f2a" stroke="#1a4858" stroke-width="2"/>
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#2dd4bf" stroke-width="1" opacity="0.3"/>
      ${ticks}
      ${labels}
      <polygon points="${cx},${cy - (r - 14)} ${cx + 6},${cy} ${cx - 6},${cy}" fill="#ffd66b" transform="rotate(${needle} ${cx} ${cy})"/>
      <line x1="${cx}" y1="${cy}" x2="${nx}" y2="${ny}" stroke="#ffd66b" stroke-width="3" transform="rotate(${needle} ${cx} ${cy})"/>
      <circle cx="${cx}" cy="${cy}" r="5" fill="#ffd66b"/>
      <text x="${cx}" y="${cy + r + 18}" fill="#6f86a8" font-size="9" font-family="monospace" text-anchor="middle">HEADING ${pad3(needle)}°</text>
    </svg>`;
  }
  function bindStation(id) {
    if (id === "helm") bindHelm();
    else if (id === "telegraph") bindTelegraph();
    else if (id === "lookout") bindLookout();
    else if (id === "radar") bindRadar();
    else if (id === "lights") bindLights();
    else if (id === "anchor") bindAnchor();
    else if (id === "comms") bindComms();
    else if (id === "logbook") bindLogbook();
  }
  function bindHelm() {
    document.querySelectorAll(".helm-preset").forEach(b => {
      b.addEventListener("click", () => {
        ship.heading = parseInt(b.dataset.h, 10);
        logEvent("info", "🧭", "Helm — steady on " + pad3(ship.heading) + "°.");
        checkEventResolution();
        refreshStationBody();
      });
    });
    const dial = document.getElementById("helmDial");
    if (dial) {
      dial.addEventListener("click", (e) => {
        const rect = dial.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        let ang = Math.atan2(dy, dx) * 180 / Math.PI + 90;
        if (ang < 0) ang += 360;
        ship.heading = Math.round(ang);
        logEvent("info", "🧭", "Helm — steady on " + pad3(ship.heading) + "°.");
        checkEventResolution();
        refreshStationBody();
      });
    }
  }

  // ---- ENGINE TELEGRAPH ----
  function renderTelegraph() {
    return `<div class="telegraph-dial">
      ${TELEGRAPH.map(t => `<div class="telegraph-pos ${t.side} ${ship.engine === t.id ? "current" : ""}" data-engine="${t.id}" type="button">
        <span class="tp-lbl">${t.label}</span><span class="tp-ico">${t.ico}</span>
      </div>`).join("")}
      <p class="helm-instruct" style="margin-top:12px;">Ring the telegraph to order the engine setting. STOP takes the way off the ship.</p>
    </div>`;
  }
  function bindTelegraph() {
    document.querySelectorAll(".telegraph-pos").forEach(b => {
      b.addEventListener("click", () => {
        ship.engine = b.dataset.engine;
        logEvent("info", "⚙️", "Engine telegraph rung — " + teleLabel(ship.engine) + ".");
        checkEventResolution();
        refreshStationBody();
      });
    });
  }

  // ---- LOOKOUT ----
  function renderLookout() {
    const contactSec = contactSectorFor(activeWatchId);
    return `<div class="lookout-view">
      ${LOOKOUT_SECTORS.map(sec => {
        const scanned = ship.lookoutScanned.includes(sec.id);
        const hasContact = sec.id === contactSec;
        let cls = scanned ? "scanned" : "";
        if (scanned && hasContact) cls = "contact";
        const ico = scanned ? (hasContact ? "⚠️" : "✓") : sec.ico;
        return `<div class="lookout-sector ${cls}" data-sector="${sec.id}" type="button">
          <div class="ls-ico">${ico}</div>
          <div class="ls-lbl">${sec.lbl}<br/>${sec.brg}</div>
        </div>`;
      }).join("")}
    </div>
    <div class="lookout-result">${lookoutResultText()}</div>`;
  }
  function lookoutResultText() {
    const scanned = ship.lookoutScanned.length;
    const contactSec = contactSectorFor(activeWatchId);
    const found = ship.lookoutScanned.includes(contactSec);
    if (found) {
      const w = watch();
      const desc = {
        harbour_pilotage: "Ferry crossing the harbour mouth fine on the bow — maintaining a sharp lookout.",
        coastal_transit: "East Cardinal mark sighted on the starboard bow — two cones point-to-point, safe water to the east.",
        night_approach: "Green light seen on the port bow — the other vessel is showing her starboard side.",
        heavy_weather: "Dark squall line dead ahead — wind veering, seas building.",
        man_overboard: "Person in the water on the port beam — lifebuoy thrown, pointing continuously.",
        anchorage_station: "Designated anchorage berth ahead — other vessels at anchor nearby."
      };
      return "✅ Contact sighted: " + (desc[w.id] || "Contact sighted in this sector.");
    }
    if (scanned === 0) return "No sectors scanned yet. Tap each sector to sweep it.";
    return scanned + "/5 sectors scanned. Keep sweeping — a contact is out there.";
  }
  function bindLookout() {
    document.querySelectorAll(".lookout-sector").forEach(b => {
      b.addEventListener("click", () => {
        const sid = parseInt(b.dataset.sector, 10);
        if (!ship.lookoutScanned.includes(sid)) {
          ship.lookoutScanned.push(sid);
          const sec = LOOKOUT_SECTORS.find(x => x.id === sid);
          logEvent("info", "🔭", "Lookout swept " + sec.lbl + " (" + sec.brg + ").");
        }
        checkEventResolution();
        refreshStationBody();
      });
    });
  }

  // ---- RADAR ----
  function renderRadar() {
    const contacts = ship.radarContacts;
    return `<div class="radar-scope">
      <div class="radar-ppi" id="radarPPI">${radarPPI(ship.heading, contacts)}</div>
      <div class="radar-contacts">${contacts.length} contact(s) on scope</div>
      <div class="radar-contact-list">
        ${contacts.map(c => `<div class="radar-contact-item">
          <span class="rc-id">${c.id}</span><span class="rc-brg">BRG ${pad3(c.brg)}°</span><span class="rc-rng">${c.rng} nm</span>
        </div>`).join("")}
        ${contacts.length ? contacts.map(c => `<div class="radar-contact-item"><span class="rc-brg" style="text-align:left;color:var(--ink-3)">${c.type}</span><span class="rc-rng" style="text-align:left">${c.note}</span></div>`).join("") : ""}
      </div>
      <button class="btn btn-primary" id="radarReadBtn" type="button" ${ship.radarRead ? "disabled" : ""}>${ship.radarRead ? "✓ Contacts Read" : "Confirm Contacts Read"}</button>
    </div>`;
  }
  function radarPPI(heading, contacts) {
    const cx = 130, cy = 130, r = 116;
    let rings = "";
    for (let i = 1; i <= 4; i++) {
      rings += `<circle cx="${cx}" cy="${cy}" r="${r * i / 4}" fill="none" stroke="#1a4858" stroke-width="0.5" opacity="0.5"/>`;
    }
    let cross = "";
    [0, 90, 180, 270].forEach(a => {
      const rad = (a - 90) * Math.PI / 180;
      cross += `<line x1="${cx}" y1="${cy}" x2="${cx + Math.cos(rad) * r}" y2="${cy + Math.sin(rad) * r}" stroke="#1a4858" stroke-width="0.5"/>`;
    });
    const sweep = `<line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - r}" stroke="#2dd4bf" stroke-width="2" opacity="0.7" transform="rotate(${heading} ${cx} ${cy})"/>`;
    let blips = "";
    contacts.forEach(c => {
      const rad = (c.brg - 90) * Math.PI / 180;
      const rr = (c.rng / 8) * r;
      const x = cx + Math.cos(rad) * rr;
      const y = cy + Math.sin(rad) * rr;
      blips += `<circle cx="${x}" cy="${y}" r="4" fill="#ffd66b"/><circle cx="${x}" cy="${y}" r="8" fill="none" stroke="#ffd66b" opacity="0.4"/>`;
    });
    const shipMark = `<polygon points="${cx},${cy - 8} ${cx + 5},${cy + 6} ${cx - 5},${cy + 6}" fill="#5eead4"/>`;
    return `<svg viewBox="0 0 260 260" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="#02080d" stroke="#1a4858"/>
      ${rings}${cross}${sweep}${blips}${shipMark}
      <text x="${cx}" y="${cy - r - 6}" fill="#6f86a8" font-size="8" font-family="monospace" text-anchor="middle">000°</text>
      <text x="${cx + r + 4}" y="${cy + 3}" fill="#6f86a8" font-size="8" font-family="monospace">090°</text>
      <text x="${cx}" y="${cy + r + 12}" fill="#6f86a8" font-size="8" font-family="monospace" text-anchor="middle">180°</text>
      <text x="${cx - r - 14}" y="${cy + 3}" fill="#6f86a8" font-size="8" font-family="monospace">270°</text>
    </svg>`;
  }
  function bindRadar() {
    const rb = document.getElementById("radarReadBtn");
    if (rb) rb.addEventListener("click", () => {
      ship.radarRead = true;
      logEvent("info", "📡", "Radar contacts read and plotted.");
      checkEventResolution();
      refreshStationBody();
    });
  }

  // ---- NAV LIGHTS ----
  function renderLights() {
    const LIGHTS = [
      { id: "masthead", ico: "⚪", lbl: "Masthead", desc: "White — forward, visible ahead" },
      { id: "port", ico: "🔴", lbl: "Port", desc: "Red — port side" },
      { id: "starboard", ico: "🟢", lbl: "Starboard", desc: "Green — starboard side" },
      { id: "stern", ico: "⚪", lbl: "Stern", desc: "White — aft" },
      { id: "anchor", ico: "🟡", lbl: "Anchor", desc: "All-round white — at anchor" }
    ];
    return `<div class="lights-panel">
      ${LIGHTS.map(l => `<div class="light-toggle ${ship.lights[l.id] ? "on" : ""}" data-light="${l.id}" type="button">
        <div class="lt-info"><span class="lt-ico">${l.ico}</span><div><div class="lt-lbl">${l.lbl}</div><div class="lt-desc">${l.desc}</div></div></div>
        <div class="lt-switch"></div>
      </div>`).join("")}
      <p class="helm-instruct">Toggle each light on or off. At night or in restricted visibility show running lights; at anchor show the all-round anchor light.</p>
    </div>`;
  }
  function bindLights() {
    document.querySelectorAll(".light-toggle").forEach(b => {
      b.addEventListener("click", () => {
        const lid = b.dataset.light;
        ship.lights[lid] = !ship.lights[lid];
        logEvent("info", "💡", (ship.lights[lid] ? "On: " : "Off: ") + lid + " light.");
        checkEventResolution();
        refreshStationBody();
      });
    });
  }

  // ---- ANCHOR ----
  function renderAnchor() {
    const down = ship.anchor === "letgo";
    return `<div class="anchor-panel">
      <div class="anchor-state-display">
        <div class="as-ico">${down ? "⚓" : "🔗"}</div>
        <div class="as-state">${down ? "ANCHOR LET GO" : "ANCHOR AWEIGH / STOWED"}</div>
      </div>
      <div class="anchor-controls">
        <button class="anchor-btn" id="anchorLetgo" type="button" ${down ? "disabled" : ""}>⚓ Let Go</button>
        <button class="anchor-btn" id="anchorWeigh" type="button" ${down ? "" : "disabled"}>⬆ Weigh Anchor</button>
      </div>
      <div class="anchor-controls" style="margin-top:4px;">
        <span class="helm-instruct">Cable scope (× water depth):</span>
      </div>
      <div class="scope-control">
        <button class="scope-btn" id="scopeDown" type="button">−</button>
        <span class="sc-val">${ship.scope}</span>
        <button class="scope-btn" id="scopeUp" type="button">+</button>
      </div>
      <p class="helm-instruct">Scope of 5 is standard for moderate conditions; 7+ for rough weather or strong tide.</p>
    </div>`;
  }
  function bindAnchor() {
    const lg = document.getElementById("anchorLetgo");
    if (lg) lg.addEventListener("click", () => {
      ship.anchor = "letgo";
      logEvent("info", "⚓", "Anchor let go — cable veered.");
      checkEventResolution();
      refreshStationBody();
    });
    const wa = document.getElementById("anchorWeigh");
    if (wa) wa.addEventListener("click", () => {
      ship.anchor = "aweigh";
      logEvent("info", "⬆️", "Anchor aweigh — cable secured.");
      checkEventResolution();
      refreshStationBody();
    });
    const sd = document.getElementById("scopeDown");
    if (sd) sd.addEventListener("click", () => {
      ship.scope = Math.max(0, ship.scope - 1);
      logEvent("info", "⚓", "Scope reduced to " + ship.scope + ".");
      checkEventResolution();
      refreshStationBody();
    });
    const su = document.getElementById("scopeUp");
    if (su) su.addEventListener("click", () => {
      ship.scope = Math.min(10, ship.scope + 1);
      logEvent("info", "⚓", "Scope veered to " + ship.scope + ".");
      checkEventResolution();
      refreshStationBody();
    });
  }

  // ---- COMMS ----
  function renderComms() {
    return `<div class="comms-panel">
      <div class="comms-channels">
        ${VHF_CHANNELS.map(ch => `<button class="comms-ch ${ship.commsCh === ch.id ? "active" : ""}" data-ch="${ch.id}" type="button">${ch.label}</button>`).join("")}
      </div>
      <div class="comms-display" id="commsDisplay">${commsDisplayHTML()}</div>
      <div class="comms-presets">
        ${Object.keys(COMMS_PRESETS).map(k => `<button class="comms-preset" data-call="${k}" type="button">▶ Transmit ${k.toUpperCase()} call</button>`).join("")}
      </div>
      <p class="helm-instruct">Select a channel, then transmit the appropriate standard call. Ch 16 is for distress and safety.</p>
    </div>`;
  }
  function commsDisplayHTML() {
    if (lastCommsSent && COMMS_PRESETS[lastCommsSent]) {
      return `<div class="cd-sys">// TX on CH ${ship.commsCh}</div><div class="cd-msg">${escapeHTML(COMMS_PRESETS[lastCommsSent])}</div>`;
    }
    return `<div class="cd-sys">// VHF standby — CH ${ship.commsCh} selected</div><div class="cd-incoming">Awaiting transmission…</div>`;
  }
  function bindComms() {
    document.querySelectorAll(".comms-ch").forEach(b => {
      b.addEventListener("click", () => {
        ship.commsCh = parseInt(b.dataset.ch, 10);
        logEvent("info", "📻", "VHF switched to Channel " + ship.commsCh + ".");
        checkEventResolution();
        refreshStationBody();
      });
    });
    document.querySelectorAll(".comms-preset").forEach(b => {
      b.addEventListener("click", () => {
        lastCommsSent = b.dataset.call;
        logEvent("info", "📻", "Transmitted " + b.dataset.call.toUpperCase() + " call on CH " + ship.commsCh + ".");
        checkEventResolution();
        refreshStationBody();
      });
    });
  }

  // ---- LOGBOOK ----
  function renderLogbook() {
    return `<div class="helm-compass" style="gap:12px;">
      <p class="helm-instruct">Record the current situation in the ship's deck log. Confirm the entry to complete log-dependent orders.</p>
      <div class="comms-display" style="min-height:120px;">
        <div class="cd-sys">// DECK LOG — ${nowTime()}</div>
        <div class="cd-msg">Heading ${pad3(ship.heading)}° · Engine ${teleLabel(ship.engine)} · Lights ${Object.keys(ship.lights).filter(k => ship.lights[k]).length} on · Anchor ${ship.anchor === "letgo" ? "DOWN" : "AWEIGH"} · VHF CH ${ship.commsCh}</div>
        ${lastCommsSent ? `<div class="cd-msg">Last call: ${lastCommsSent.toUpperCase()}</div>` : ""}
        ${ship.lookoutScanned.length ? `<div class="cd-msg">Lookout: ${ship.lookoutScanned.length}/5 sectors swept</div>` : ""}
      </div>
      <button class="btn btn-primary" id="logConfirmBtn" type="button" ${ship.logged ? "disabled" : ""}>${ship.logged ? "✓ Entry Confirmed" : "Confirm Log Entry"}</button>
    </div>`;
  }
  function bindLogbook() {
    const lb = document.getElementById("logConfirmBtn");
    if (lb) lb.addEventListener("click", () => {
      ship.logged = true;
      logEvent("success", "📓", "Deck log entry confirmed and signed.");
      checkEventResolution();
      refreshStationBody();
    });
  }

  // ==========================================================
  // EVENT RESOLUTION
  // ==========================================================
  function checkEventResolution() {
    const ev = currentEvent();
    if (!ev) return;
    const req = ev.requires;
    let met = false;

    if (req.station === "anchor") {
      if (req.anchor !== undefined) met = met || (ship.anchor === req.anchor);
      if (req.scope !== undefined) met = met && false; // scope handled below separately
      if (req.anchor !== undefined && req.scope === undefined) met = (ship.anchor === req.anchor);
      if (req.scope !== undefined) met = (ship.scope === req.scope);
    }
    else if (req.station === "lights") {
      if (req.lightsOn) {
        met = req.lightsOn.every(l => ship.lights[l]);
        // For anchor-only requirement, ensure the listed lights are exactly what's needed
      }
    }
    else if (req.station === "comms") {
      met = ship.commsCh === req.commsCh && lastCommsSent === req.sent;
    }
    else if (req.station === "telegraph") {
      met = ship.engine === req.engine;
    }
    else if (req.station === "helm") {
      met = ship.heading === req.heading;
    }
    else if (req.station === "lookout") {
      const contactSec = contactSectorFor(activeWatchId);
      const allScanned = ship.lookoutScanned.length >= (req.sectorsScanned || 5);
      const found = ship.lookoutScanned.includes(contactSec);
      met = allScanned && found && (req.contactFound ? true : true);
    }
    else if (req.station === "radar") {
      met = !!ship.radarRead;
    }
    else if (req.station === "logbook") {
      met = !!ship.logged;
    }

    if (met) resolveCurrentEvent();
  }

  function resolveCurrentEvent() {
    const w = watch();
    const ev = currentEvent();
    if (!ev || !w) return;
    const wp = watchProgress(w.id);
    if (!wp.resolved.includes(ev.id)) wp.resolved.push(ev.id);
    saveState();
    state.streak++;
    if (state.streak > state.bestStreak) state.bestStreak = state.streak;
    state.totalAttempts++;
    saveState();
    logEvent("success", ev.icon, ev.title + " — " + ev.proof);
    toast("ok", "✓ " + ev.title + " resolved. " + ev.proof);

    activeEventIdx++;
    if (activeEventIdx >= w.events.length) {
      completeWatch(w);
    } else {
      const nextEv = currentEvent();
      if (nextEv) logEvent("alert", nextEv.icon, nextEv.title + " — " + nextEv.brief);
      // refresh console after station is still open
      setTimeout(() => {
        if (activeStation) refreshStationBody();
        if (document.getElementById("bridgeContent")) renderBridge();
      }, 600);
    }
  }

  function completeWatch(w) {
    if (!state.bridgeWatches.includes(w.id)) {
      state.bridgeWatches.push(w.id);
      const wp = watchProgress(w.id);
      const penalty = wp.wrongAttempts * 10;
      const earned = Math.max(60, w.xp - penalty);
      state.xp += earned;
      saveState();
      const badge = BRIDGE_BADGES.find(b => b.watch === w.id);
      toast("ok", "🏆 Watch complete! +" + earned + " XP" + (badge ? " · Badge: " + badge.name : "") + ".");
      logEvent("success", "🏆", w.title + " COMPLETE. +" + earned + " XP awarded.");
    }
    syncOuterRanks();
    setTimeout(() => {
      const el = document.getElementById("bridgeContent");
      if (el) renderBridge();
    }, 700);
  }

  // ==========================================================
  // WATCH COMPLETE CARD
  // ==========================================================
  function renderWatchComplete(w) {
    const badge = BRIDGE_BADGES.find(b => b.watch === w.id);
    const wp = watchProgress(w.id);
    const earned = Math.max(60, w.xp - (wp.wrongAttempts * 10));
    return `<div class="bridge-complete">
      <div class="bc-icon">🏆</div>
      <div class="bc-title">Watch Complete: ${w.title}</div>
      <div class="bc-sub">${w.desc} You resolved all ${w.events.length} bridge events and earned the <strong>${badge ? badge.name : "Watchkeeper"}</strong> badge.</div>
      <div class="bc-stats">
        <div class="bc-stat"><div class="v">+${earned}</div><div class="l">XP Earned</div></div>
        <div class="bc-stat"><div class="v">${w.events.length}</div><div class="l">Events</div></div>
        <div class="bc-stat"><div class="v">${wp.wrongAttempts || 0}</div><div class="l">Retries</div></div>
      </div>
      <div class="task-actions" style="justify-content:center;">
        <button class="btn btn-primary" id="watchNextBtn" type="button">▸ Next Watch</button>
        <button class="btn btn-ghost" id="watchBackBtn" type="button">← Back to bridge</button>
      </div>
    </div>`;
  }
  function bindWatchComplete(el, w) {
    const next = el.querySelector("#watchNextBtn");
    if (next) next.addEventListener("click", () => {
      const nextW = WATCHES.find(x => x.order === w.order + 1);
      if (nextW && watchUnlocked(nextW)) startWatch(nextW.id);
      else exitWatch();
    });
    const back = el.querySelector("#watchBackBtn");
    if (back) back.addEventListener("click", exitWatch);
  }

  // ==========================================================
  // IMMERSIVE BRIDGE INTERIOR SVG (panoramic first-person view)
  // ==========================================================
  function bridgeInteriorSVG(reqStation) {
    const W = BRIDGE_PAN_WIDTH, H = 480;
    const w = watch();
    const scene = w ? w.scene : "harbour";
    const heading = ship.heading;

    let svg = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" style="width:${W}px;height:${H}px;display:block">`;
    svg += bridgeStructureSVG(W, H, scene);
    // Forward windows span the centre of the panorama
    const winX = W * 0.32, winW = W * 0.36, winH = 260, winY = 90;
    svg += seaViewSVG(winX, winY, winW, winH, scene, heading, w);
    // Station equipment
    svg += buildStationEquipment(reqStation, scene, w);
    svg += `</svg>`;
    return svg;
  }

  // Bridge superstructure: ceiling, deck, side walls, window frames, wing doors
  function bridgeStructureSVG(W, H, scene) {
    const night = scene === "night";
    const ceil = night ? "#0a1320" : "#1a2a3a";
    const wall = night ? "#0d1825" : "#22384a";
    const deck = night ? "#06101a" : "#152028";
    const trim = "#2dd4bf";
    let s = "";
    // Ceiling
    s += `<rect x="0" y="0" width="${W}" height="80" fill="${ceil}"/>`;
    s += `<rect x="0" y="78" width="${W}" height="3" fill="${trim}" opacity="0.3"/>`;
    // Overhead light fixtures
    for (let lx = 120; lx < W; lx += 400) {
      s += `<rect x="${lx}" y="20" width="80" height="14" rx="3" fill="${night ? "#1a3a5a" : "#2a4a6a"}" opacity="0.8"/>`;
      s += `<rect x="${lx + 4}" y="24" width="72" height="6" rx="2" fill="${night ? "#1e4a6a" : "#5eead4"}" opacity="0.4"/>`;
    }
    // Side walls (port left, starboard right) - angled to suggest 3D
    s += `<polygon points="0,80 0,${H} 200,${H} 220,80" fill="${wall}" opacity="0.95"/>`;
    s += `<polygon points="${W},80 ${W},${H} ${W - 200},${H} ${W - 220},80" fill="${wall}" opacity="0.95"/>`;
    // Deck floor with perspective lines
    s += `<rect x="0" y="${H - 120}" width="${W}" height="120" fill="${deck}"/>`;
    s += `<polygon points="200,${H - 120} ${W - 200},${H - 120} ${W},${H} 0,${H}" fill="${deck}" opacity="0.6"/>`;
    // Deck perspective lines (vanishing toward centre)
    const cx = W / 2;
    for (let i = -4; i <= 4; i++) {
      if (i === 0) continue;
      const fx = cx + i * 200;
      s += `<line x1="${fx}" y1="${H}" x2="${cx + i * 40}" y2="${H - 120}" stroke="${trim}" stroke-width="0.5" opacity="0.15"/>`;
    }
    // Console/coaming rail across the front (where stations sit)
    s += `<rect x="210" y="${H - 160}" width="${W - 420}" height="50" rx="4" fill="${night ? "#0f1d2a" : "#1a3040"}" stroke="${trim}" stroke-width="1" opacity="0.6"/>`;
    s += `<rect x="210" y="${H - 162}" width="${W - 420}" height="3" fill="${trim}" opacity="0.25"/>`;
    // Window frame structure (forward windows)
    const winY = 90, winH = 260;
    s += `<rect x="${W * 0.31}" y="${winY - 6}" width="${W * 0.38}" height="${winH + 12}" fill="none" stroke="${trim}" stroke-width="2" opacity="0.5"/>`;
    // Window mullions (vertical dividers)
    for (let mx = 1; mx < 4; mx++) {
      const mxp = W * 0.32 + (W * 0.36) * (mx / 4);
      s += `<line x1="${mxp}" y1="${winY}" x2="${mxp}" y2="${winY + winH}" stroke="${night ? "#0a1320" : "#22384a"}" stroke-width="4"/>`;
    }
    // Port wing door (left side)
    s += `<rect x="40" y="100" width="130" height="340" rx="3" fill="${night ? "#091420" : "#1e3242"}" stroke="${trim}" stroke-width="1" opacity="0.7"/>`;
    s += `<text x="105" y="270" fill="${trim}" font-size="11" text-anchor="middle" font-family="monospace" opacity="0.5" transform="rotate(-90 105 270)">PORT WING</text>`;
    s += `<circle cx="155" cy="280" r="4" fill="${trim}" opacity="0.4"/>`;
    // Starboard wing door (right side)
    s += `<rect x="${W - 170}" y="100" width="130" height="340" rx="3" fill="${night ? "#091420" : "#1e3242"}" stroke="${trim}" stroke-width="1" opacity="0.7"/>`;
    s += `<text x="${W - 105}" y="270" fill="${trim}" font-size="11" text-anchor="middle" font-family="monospace" opacity="0.5" transform="rotate(90 ${W - 105} 270)">STBD WING</text>`;
    s += `<circle cx="${W - 155}" cy="280" r="4" fill="${trim}" opacity="0.4"/>`;
    // Ship's name plate above windows
    s += `<rect x="${W / 2 - 110}" y="30" width="220" height="34" rx="3" fill="${night ? "#0a1828" : "#1a3040"}" stroke="${trim}" stroke-width="1"/>`;
    s += `<text x="${W / 2}" y="52" fill="${trim}" font-size="15" text-anchor="middle" font-family="monospace" letter-spacing="2">HMCS KINGSTON</text>`;
    // Heading indicator above windows
    s += `<text x="${W / 2}" y="${winY - 12}" fill="#6f86a8" font-size="10" text-anchor="middle" font-family="monospace">RELATIVE BEARING</text>`;
    // Bearing scale ticks across top of windows
    const brgLabels = ["270", "315", "000", "045", "090"];
    const tickStart = W * 0.32, tickEnd = W * 0.68;
    brgLabels.forEach((brg, i) => {
      const tx = tickStart + (tickEnd - tickStart) * (i / 4);
      s += `<line x1="${tx}" y1="${winY}" x2="${tx}" y2="${winY + 6}" stroke="${trim}" stroke-width="1" opacity="0.4"/>`;
      s += `<text x="${tx}" y="${winY + 18}" fill="#6f86a8" font-size="8" text-anchor="middle" font-family="monospace">${brg}</text>`;
    });
    return s;
  }

  // The sea/sky view visible through the forward windows
  function seaViewSVG(vx, vy, vw, vh, scene, heading, w) {
    let s = "";
    // Clip to window area
    s += `<defs><clipPath id="seaClip"><rect x="${vx}" y="${vy}" width="${vw}" height="${vh}"/></clipPath></defs>`;
    s += `<g clip-path="url(#seaClip)">`;
    // Sky and sea gradients
    const skyTop = scene === "night" ? "#020610" : scene === "storm" ? "#1a2a3a" : "#0a2a4a";
    const skyBot = scene === "night" ? "#06122a" : scene === "storm" ? "#2a3a4a" : "#1a5a8a";
    const seaTop = scene === "night" ? "#041020" : scene === "storm" ? "#0a2030" : "#0d4858";
    const seaBot = scene === "night" ? "#020812" : scene === "storm" ? "#061218" : "#020812";
    const horizonY = vy + vh * 0.45;
    s += `<defs><linearGradient id="skyG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${skyTop}"/><stop offset="1" stop-color="${skyBot}"/></linearGradient></defs>`;
    s += `<defs><linearGradient id="seaG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${seaTop}"/><stop offset="1" stop-color="${seaBot}"/></linearGradient></defs>`;
    s += `<rect x="${vx}" y="${vy}" width="${vw}" height="${vh * 0.45}" fill="url(#skyG)"/>`;
    s += `<rect x="${vx}" y="${horizonY}" width="${vw}" height="${vh * 0.55}" fill="url(#seaG)"/>`;

    // Stars at night
    if (scene === "night") {
      for (let i = 0; i < 30; i++) {
        const sx = vx + (i * 137) % vw;
        const sy = vy + (i * 73) % (vh * 0.4);
        s += `<circle cx="${sx}" cy="${sy}" r="${0.5 + (i % 3) * 0.3}" fill="#fff" opacity="${0.3 + (i % 5) * 0.1}"/>`;
      }
      // Moon
      s += `<circle cx="${vx + vw * 0.75}" cy="${vy + 40}" r="16" fill="#e8e8f0" opacity="0.6"/>`;
      s += `<circle cx="${vx + vw * 0.75 + 5}" cy="${vy + 36}" r="14" fill="${skyBot}" opacity="0.8"/>`;
    }
    // Sun for daytime scenes
    if (scene === "harbour" || scene === "coastal") {
      s += `<circle cx="${vx + vw * 0.7}" cy="${vy + 50}" r="22" fill="#ffd66b" opacity="0.5"/>`;
      s += `<circle cx="${vx + vw * 0.7}" cy="${vy + 50}" r="14" fill="#ffe89a" opacity="0.6"/>`;
    }
    // Clouds
    if (scene !== "night") {
      const cloudCol = scene === "storm" ? "#2a3a4a" : "#3a5a7a";
      for (let ci = 0; ci < 4; ci++) {
        const clx = vx + (ci * 220 + 60) % vw;
        const cly = vy + 30 + (ci % 2) * 40;
        s += `<ellipse cx="${clx}" cy="${cly}" rx="40" ry="10" fill="${cloudCol}" opacity="0.4"/>`;
        s += `<ellipse cx="${clx + 20}" cy="${cly - 5}" rx="30" ry="8" fill="${cloudCol}" opacity="0.3"/>`;
      }
    }
    // Sea waves
    const waveCol = scene === "night" ? "#15384a" : scene === "storm" ? "#1a3848" : "#2a6878";
    for (let wi = 0; wi < 6; wi++) {
      const wy = horizonY + 10 + wi * (vh * 0.55 / 6);
      const amp = scene === "storm" ? 8 : 3;
      s += `<path d="M${vx} ${wy} Q${vx + vw / 4} ${wy - amp} ${vx + vw / 2} ${wy} T${vx + vw} ${wy}" fill="none" stroke="${waveCol}" stroke-width="${scene === "storm" ? 1.5 : 0.8}" opacity="${0.2 + wi * 0.05}"/>`;
    }

    // Scene-specific elements in the sea view
    if (scene === "harbour") {
      // Breakwater / berth markers
      s += `<rect x="${vx}" y="${horizonY - 40}" width="60" height="80" fill="#0a1410" opacity="0.7"/>`;
      s += `<rect x="${vx + vw - 60}" y="${horizonY - 40}" width="60" height="80" fill="#0a1410" opacity="0.7"/>`;
      s += `<text x="${vx + 30}" y="${horizonY + 10}" fill="#38d97b" font-size="9" font-family="monospace" text-anchor="middle">BERTH</text>`;
      // Cranes on shore
      s += `<line x1="${vx + 80}" y1="${horizonY}" x2="${vx + 80}" y2="${horizonY - 50}" stroke="#38d97b" stroke-width="2" opacity="0.4"/>`;
      s += `<line x1="${vx + 80}" y1="${horizonY - 50}" x2="${vx + 120}" y2="${horizonY - 45}" stroke="#38d97b" stroke-width="1" opacity="0.4"/>`;
    } else if (scene === "coastal") {
      // Landmass on port side
      s += `<path d="M${vx} ${horizonY} L${vx} ${horizonY - 60} Q${vx + 80} ${horizonY - 80} ${vx + 150} ${horizonY - 50} L${vx + 150} ${horizonY} Z" fill="#0a1410" opacity="0.7"/>`;
      s += `<text x="${vx + 60}" y="${horizonY - 30}" fill="#38d97b" font-size="8" font-family="monospace">LAND</text>`;
      // Lighthouse
      s += `<rect x="${vx + 100}" y="${horizonY - 75}" width="6" height="20" fill="#ff5a6e" opacity="0.5"/>`;
    } else if (scene === "storm") {
      // Rain/squall lines
      s += `<g stroke="#5eead4" stroke-width="1" opacity="0.3">`;
      for (let ri = 0; ri < 20; ri++) {
        const rx = vx + (ri * 47) % vw;
        const ry = vy + (ri * 31) % (vh * 0.4);
        s += `<line x1="${rx}" y1="${ry}" x2="${rx - 4}" y2="${ry + 12}"/>`;
      }
      s += `</g>`;
      s += `<text x="${vx + vw / 2}" y="${vy + 30}" fill="#ffb454" font-size="13" font-family="monospace" text-anchor="middle">SQUALL WARNING</text>`;
    } else if (scene === "mob") {
      s += `<text x="${vx + vw / 2}" y="${vy + 30}" fill="#ff5a6e" font-size="14" font-family="monospace" text-anchor="middle">MAN OVERBOARD</text>`;
      // Person in water
      s += `<circle cx="${vx + vw / 2}" cy="${horizonY + 60}" r="6" fill="#ff5a6e" opacity="0.7"/>`;
      s += `<circle cx="${vx + vw / 2}" cy="${horizonY + 55}" r="3" fill="#ffd66b" opacity="0.6"/>`;
    } else if (scene === "anchorage") {
      // Other anchored vessels
      s += `<rect x="${vx + 60}" y="${horizonY - 20}" width="24" height="20" fill="#1a4858" stroke="#5eead4" opacity="0.5"/>`;
      s += `<rect x="${vx + vw - 90}" y="${horizonY - 15}" width="20" height="15" fill="#1a4858" stroke="#5eead4" opacity="0.5"/>`;
    }

    // Lookout contacts (if scanned)
    if (scene === "coastal" || scene === "night" || scene === "mob") {
      const contactSec = contactSectorFor(w.id);
      const sec = LOOKOUT_SECTORS[contactSec];
      if (ship.lookoutScanned.includes(contactSec)) {
        const cbrg = sec.brg ? parseInt(sec.brg) : 0;
        // Map bearing to x position in window (270=left, 090=right)
        let brgNorm = cbrg;
        if (brgNorm > 180) brgNorm = brgNorm - 360;
        const cxFrac = (brgNorm + 90) / 180; // -90..90 -> 0..1
        const cx = vx + vw * cxFrac;
        const cy = horizonY + 40;
        const ico = scene === "mob" ? "MOB" : scene === "night" ? "LITE" : "CTC";
        s += `<circle cx="${cx}" cy="${cy}" r="12" fill="none" stroke="#ff5a6e" stroke-width="2" opacity="0.8"/>`;
        s += `<text x="${cx}" y="${cy + 3}" fill="#ff5a6e" font-size="8" text-anchor="middle" font-family="monospace">${ico}</text>`;
      }
    }

    s += `</g>`;
    // Window glass reflection
    s += `<rect x="${vx}" y="${vy}" width="${vw}" height="${vh}" fill="${scene === "night" ? "#0a1830" : "#1a3a5a"}" opacity="0.08"/>`;
    return s;
  }

  // Assemble all 8 station equipment groups across the panorama
  function buildStationEquipment(reqStation, scene, w) {
    let s = "";
    s += stationLookout(reqStation);
    s += stationHelm(reqStation);
    s += stationTelegraph(reqStation);
    s += stationComms(reqStation);
    s += stationRadar(reqStation);
    s += stationLogbook(reqStation);
    s += stationLights(reqStation);
    s += stationAnchor(reqStation);
    return s;
  }

  // Hotspot wrapper: clickable rect group with pulse glow for required station
  function hotspot(stationId, x, y, w, h, isReq, innerSVG, label) {
    const pulse = isReq ? `<rect x="${x - 4}" y="${y - 4}" width="${w + 8}" height="${h + 8}" rx="6" fill="none" stroke="#ffb454" stroke-width="2" opacity="0.6"><animate attributeName="opacity" values="0.2;0.8;0.2" dur="1.5s" repeatCount="indefinite"/></rect>` : "";
    const badge = isReq ? `<circle cx="${x + w - 8}" cy="${y + 8}" r="8" fill="#ffb454"><animate attributeName="r" values="6;10;6" dur="1.5s" repeatCount="indefinite"/></circle><text x="${x + w - 8}" y="${y + 11}" fill="#04121f" font-size="9" text-anchor="middle" font-weight="bold">!</text>` : "";
    return `<g class="bi-hotspot" data-station="${stationId}" style="cursor:pointer">
      ${pulse}
      ${innerSVG}
      ${badge}
      <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="transparent" pointer-events="all"/>
      <text x="${x + w / 2}" y="${y + h + 16}" fill="${isReq ? "#ffb454" : "#6f86a8"}" font-size="10" text-anchor="middle" font-family="monospace" letter-spacing="1">${label}</text>
    </g>`;
  }

  // ---- LOOKOUT station (port bow windows area, x=320) ----
  function stationLookout(reqStation) {
    const isReq = reqStation === "lookout";
    const x = 320, y = 360, w = 110, h = 90;
    const scanned = ship.lookoutScanned.length;
    // Binoculars mounted on stand
    let inner = `<rect x="${x + 25}" y="${y + 50}" width="60" height="6" fill="#1a3040" rx="2"/>`;
    inner += `<rect x="${x + 48}" y="${y + 30}" width="14" height="24" fill="#0d1825"/>`;
    // Binocular barrels
    inner += `<rect x="${x + 38}" y="${y + 14}" width="12" height="20" rx="3" fill="#1a3040" stroke="#2dd4bf" stroke-width="0.5"/>`;
    inner += `<rect x="${x + 60}" y="${y + 14}" width="12" height="20" rx="3" fill="#1a3040" stroke="#2dd4bf" stroke-width="0.5"/>`;
    inner += `<circle cx="${x + 44}" cy="${y + 18}" r="4" fill="#04121f" stroke="#5eead4"/>`;
    inner += `<circle cx="${x + 66}" cy="${y + 18}" r="4" fill="#04121f" stroke="#5eead4"/>`;
    // Sector indicator lights
    for (let i = 0; i < 5; i++) {
      const lit = i < scanned;
      const lx = x + 10 + i * 18;
      inner += `<circle cx="${lx}" cy="${y + 72}" r="4" fill="${lit ? "#38d97b" : "#1a3040"}" stroke="${lit ? "#38d97b" : "#2a4050"}" stroke-width="0.5"/>`;
    }
    inner += `<text x="${x + 55}" y="${y + 84}" fill="#6f86a8" font-size="7" text-anchor="middle" font-family="monospace">${scanned}/5 SEC</text>`;
    return hotspot("lookout", x, y, w, h, isReq, inner, "LOOKOUT");
  }

  // ---- HELM station (centre, x=1100) ----
  function stationHelm(reqStation) {
    const isReq = reqStation === "helm";
    const x = 1100, y = 350, w = 130, h = 110;
    const hdg = ship.heading;
    // Compass binnacle (cylinder)
    let inner = `<ellipse cx="${x + 65}" cy="${y + 18}" rx="28" ry="8" fill="#0d1825" stroke="#2dd4bf" stroke-width="1"/>`;
    inner += `<rect x="${x + 37}" y="${y + 18}" width="56" height="40" fill="#0d1825" stroke="#2dd4bf" stroke-width="0.5"/>`;
    inner += `<ellipse cx="${x + 65}" cy="${y + 58}" rx="28" ry="6" fill="#06101a"/>`;
    // Compass card (rotates with heading)
    const rot = -hdg;
    inner += `<g transform="rotate(${rot} ${x + 65} ${y + 28})">`;
    inner += `<circle cx="${x + 65}" cy="${y + 28}" r="22" fill="#04121f" stroke="#5eead4" stroke-width="1"/>`;
    const cardDirs = [["N", 0], ["E", 90], ["S", 180], ["W", 270]];
    cardDirs.forEach(([dir, ang]) => {
      const rad = (ang - 90) * Math.PI / 180;
      const tx = x + 65 + Math.cos(rad) * 16;
      const ty = y + 28 + Math.sin(rad) * 10;
      inner += `<text x="${tx}" y="${ty + 3}" fill="${dir === "N" ? "#ff5a6e" : "#5eead4"}" font-size="7" text-anchor="middle" font-family="monospace">${dir}</text>`;
    });
    inner += `</g>`;
    // Lubber line
    inner += `<line x1="${x + 65}" y1="${y + 6}" x2="${x + 65}" y2="${y + 12}" stroke="#ffb454" stroke-width="1.5"/>`;
    // Ship's wheel
    const wx = x + 65, wy = y + 85;
    inner += `<circle cx="${wx}" cy="${wy}" r="18" fill="none" stroke="#2dd4bf" stroke-width="2"/>`;
    for (let sp = 0; sp < 8; sp++) {
      const sang = sp * 45 * Math.PI / 180;
      const sx2 = wx + Math.cos(sang) * 22;
      const sy2 = wy + Math.sin(sang) * 22;
      inner += `<line x1="${wx + Math.cos(sang) * 18}" y1="${wy + Math.sin(sang) * 18}" x2="${sx2}" y2="${sy2}" stroke="#2dd4bf" stroke-width="1.5"/>`;
      inner += `<circle cx="${sx2}" cy="${sy2}" r="2" fill="#2dd4bf"/>`;
    }
    inner += `<circle cx="${wx}" cy="${wy}" r="4" fill="#0d1825" stroke="#5eead4"/>`;
    // Heading readout
    inner += `<text x="${x + 65}" y="${y + 108}" fill="#5eead4" font-size="10" text-anchor="middle" font-family="monospace" font-weight="bold">${pad3(hdg)}\u00b0</text>`;
    return hotspot("helm", x, y, w, h, isReq, inner, "HELM");
  }

  // ---- TELEGRAPH station (port side of helm, x=920) ----
  function stationTelegraph(reqStation) {
    const isReq = reqStation === "telegraph";
    const x = 920, y = 355, w = 120, h = 100;
    const eng = ship.engine;
    // Telegraph dial
    let inner = `<circle cx="${x + 60}" cy="${y + 40}" r="30" fill="#04121f" stroke="#2dd4bf" stroke-width="1.5"/>`;
    inner += `<circle cx="${x + 60}" cy="${y + 40}" r="26" fill="#06101a" stroke="#1a3040"/>`;
    // Dial markings (AHEAD FULL, AHEAD, STOP, ASTERN, ASTERN FULL)
    const marks = [
      { lbl: "F", ang: -70, id: "ahead_full" },
      { lbl: "A", ang: -35, id: "ahead" },
      { lbl: "S", ang: 0, id: "stop" },
      { lbl: "A", ang: 35, id: "astern" },
      { lbl: "F", ang: 70, id: "astern_full" }
    ];
    marks.forEach(m => {
      const rad = m.ang * Math.PI / 180;
      const tx = x + 60 + Math.cos(rad - Math.PI / 2) * 20;
      const ty = y + 40 + Math.sin(rad - Math.PI / 2) * 20;
      inner += `<text x="${tx}" y="${ty + 3}" fill="${m.id === eng ? "#ffb454" : "#5eead4"}" font-size="8" text-anchor="middle" font-family="monospace">${m.lbl}</text>`;
    });
    // Pointer (indicates current engine order)
    const engMark = marks.find(m => m.id === eng) || marks[2];
    const ptrad = engMark.ang * Math.PI / 180;
    const px2 = x + 60 + Math.cos(ptrad - Math.PI / 2) * 24;
    const py2 = y + 40 + Math.sin(ptrad - Math.PI / 2) * 24;
    inner += `<line x1="${x + 60}" y1="${y + 40}" x2="${px2}" y2="${py2}" stroke="#ffb454" stroke-width="2"/>`;
    inner += `<circle cx="${x + 60}" cy="${y + 40}" r="3" fill="#ffb454"/>`;
    // Telegraph handle base
    inner += `<rect x="${x + 50}" y="${y + 72}" width="20" height="14" rx="2" fill="#0d1825" stroke="#2dd4bf"/>`;
    inner += `<text x="${x + 60}" y="${y + 96}" fill="#5eead4" font-size="8" text-anchor="middle" font-family="monospace">${teleLabel(eng).split(" ")[0]}</text>`;
    return hotspot("telegraph", x, y, w, h, isReq, inner, "ENGINE");
  }

  // ---- COMMS station (starboard side, x=1480) ----
  function stationComms(reqStation) {
    const isReq = reqStation === "comms";
    const x = 1480, y = 360, w = 120, h = 95;
    const ch = ship.commsCh;
    // VHF radio unit
    let inner = `<rect x="${x + 15}" y="${y + 12}" width="90" height="56" rx="4" fill="#0d1825" stroke="#2dd4bf" stroke-width="1"/>`;
    // Display screen
    inner += `<rect x="${x + 22}" y="${y + 18}" width="76" height="20" rx="2" fill="#020812" stroke="#1a3040"/>`;
    inner += `<text x="${x + 60}" y="${y + 32}" fill="#38d97b" font-size="12" text-anchor="middle" font-family="monospace">CH ${ch}</text>`;
    // Channel selector knob
    inner += `<circle cx="${x + 35}" cy="${y + 54}" r="8" fill="#1a3040" stroke="#5eead4"/>`;
    inner += `<line x1="${x + 35}" y1="${y + 54}" x2="${x + 35}" y2="${y + 48}" stroke="#5eead4" stroke-width="1.5"/>`;
    // TX/RX indicator
    inner += `<circle cx="${x + 60}" cy="${y + 54}" r="5" fill="${lastCommsSent ? "#ff5a6e" : "#1a3040"}" stroke="${lastCommsSent ? "#ff5a6e" : "#2a4050"}"/>`;
    inner += `<text x="${x + 60}" y="${y + 57}" fill="${lastCommsSent ? "#04121f" : "#5eead4"}" font-size="6" text-anchor="middle" font-weight="bold">TX</text>`;
    // Speaker grill
    inner += `<rect x="${x + 78}" y="${y + 48}" width="20" height="14" rx="1" fill="#06101a"/>`;
    for (let gi = 0; gi < 4; gi++) {
      inner += `<line x1="${x + 80}" y1="${y + 51 + gi * 3}" x2="${x + 96}" y2="${y + 51 + gi * 3}" stroke="#1a3040" stroke-width="0.5"/>`;
    }
    // Handset
    inner += `<rect x="${x + 30}" y="${y + 72}" width="50" height="12" rx="6" fill="#1a3040" stroke="#2dd4bf"/>`;
    inner += `<text x="${x + 60}" y="${y + 89}" fill="#5eead4" font-size="7" text-anchor="middle" font-family="monospace">${lastCommsSent ? lastCommsSent.toUpperCase() : "STBY"}</text>`;
    return hotspot("comms", x, y, w, h, isReq, inner, "COMMS");
  }

  // ---- RADAR station (port side, x=520) ----
  function stationRadar(reqStation) {
    const isReq = reqStation === "radar";
    const x = 520, y = 350, w = 120, h = 100;
    // PPI scope (circular radar display)
    let inner = `<rect x="${x + 15}" y="${y + 8}" width="90" height="76" rx="4" fill="#0d1825" stroke="#2dd4bf" stroke-width="1"/>`;
    inner += `<circle cx="${x + 60}" cy="${y + 42}" r="28" fill="#020812" stroke="#1a3040"/>`;
    // Range rings
    for (let r = 9; r <= 27; r += 9) {
      inner += `<circle cx="${x + 60}" cy="${y + 42}" r="${r}" fill="none" stroke="#1a4858" stroke-width="0.5" opacity="0.6"/>`;
    }
    // Cross hairs
    inner += `<line x1="${x + 32}" y1="${y + 42}" x2="${x + 88}" y2="${y + 42}" stroke="#1a4858" stroke-width="0.5"/>`;
    inner += `<line x1="${x + 60}" y1="${y + 14}" x2="${x + 60}" y2="${y + 70}" stroke="#1a4858" stroke-width="0.5"/>`;
    // Sweep line (animated)
    inner += `<line x1="${x + 60}" y1="${y + 42}" x2="${x + 60}" y2="${y + 14}" stroke="#38d97b" stroke-width="1" opacity="0.6"><animateTransform attributeName="transform" type="rotate" from="0 ${x + 60} ${y + 42}" to="360 ${x + 60} ${y + 42}" dur="4s" repeatCount="indefinite"/></line>`;
    // Contacts blips
    if (ship.radarRead) {
      ship.radarContacts.forEach(c => {
        const rad = (c.brg - 90) * Math.PI / 180;
        const range = (c.rng / 10) * 26;
        const cx2 = x + 60 + Math.cos(rad) * range;
        const cy2 = y + 42 + Math.sin(rad) * range;
        inner += `<circle cx="${cx2}" cy="${cy2}" r="2.5" fill="#38d97b"><animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite"/></circle>`;
      });
    }
    // Center (own ship)
    inner += `<circle cx="${x + 60}" cy="${y + 42}" r="2" fill="#ffb454"/>`;
    // Heading flash
    inner += `<text x="${x + 60}" y="${y + 92}" fill="${ship.radarRead ? "#38d97b" : "#6f86a8"}" font-size="7" text-anchor="middle" font-family="monospace">${ship.radarRead ? ship.radarContacts.length + " CONTACTS" : "STANDBY"}</text>`;
    return hotspot("radar", x, y, w, h, isReq, inner, "RADAR");
  }

  // ---- LOGBOOK station (starboard aft, x=1880) ----
  function stationLogbook(reqStation) {
    const isReq = reqStation === "logbook";
    const x = 1880, y = 355, w = 120, h = 95;
    // Chart table with open logbook
    let inner = `<rect x="${x + 12}" y="${y + 35}" width="96" height="44" rx="2" fill="#1a3040" stroke="#2dd4bf" stroke-width="0.5"/>`;
    // Open book
    inner += `<rect x="${x + 20}" y="${y + 28}" width="80" height="44" rx="1" fill="#e8e8f0" opacity="0.85"/>`;
    inner += `<line x1="${x + 60}" y1="${y + 28}" x2="${x + 60}" y2="${y + 72}" stroke="#6f86a8" stroke-width="0.5"/>`;
    // Text lines on left page
    for (let li = 0; li < 5; li++) {
      const ly = y + 34 + li * 7;
      inner += `<line x1="${x + 24}" y1="${ly}" x2="${x + 54}" y2="${ly}" stroke="#6f86a8" stroke-width="0.4" opacity="0.6"/>`;
    }
    // Text lines on right page
    for (let li = 0; li < 5; li++) {
      const ly = y + 34 + li * 7;
      inner += `<line x1="${x + 66}" y1="${ly}" x2="${x + 96}" y2="${ly}" stroke="#6f86a8" stroke-width="0.4" opacity="0.6"/>`;
    }
    // Pen
    inner += `<line x1="${x + 70}" y1="${y + 65}" x2="${x + 90}" y2="${y + 55}" stroke="#2dd4bf" stroke-width="1.5"/>`;
    // Log status
    inner += `<rect x="${x + 30}" y="${y + 14}" width="60" height="12" rx="2" fill="${ship.logged ? "#38d97b" : "#1a3040"}" stroke="${ship.logged ? "#38d97b" : "#2a4050"}"/>`;
    inner += `<text x="${x + 60}" y="${y + 23}" fill="${ship.logged ? "#04121f" : "#6f86a8"}" font-size="7" text-anchor="middle" font-family="monospace" font-weight="bold">${ship.logged ? "LOGGED" : "OPEN"}</text>`;
    inner += `<text x="${x + 60}" y="${y + 90}" fill="#6f86a8" font-size="7" text-anchor="middle" font-family="monospace">DECK LOG</text>`;
    return hotspot("logbook", x, y, w, h, isReq, inner, "LOG");
  }

  // ---- LIGHTS station (port side, x=460) ----
  function stationLights(reqStation) {
    const isReq = reqStation === "lights";
    const x = 460, y = 355, w = 120, h = 100;
    const lt = ship.lights;
    // Switch panel
    let inner = `<rect x="${x + 12}" y="${y + 12}" width="96" height="72" rx="4" fill="#0d1825" stroke="#2dd4bf" stroke-width="1"/>`;
    // 5 light switches with indicator LEDs
    const lights = [
      { k: "masthead", lbl: "MAST", col: "#ffffff" },
      { k: "port", lbl: "PORT", col: "#ff5a6e" },
      { k: "starboard", lbl: "STBD", col: "#38d97b" },
      { k: "stern", lbl: "STERN", col: "#ffffff" },
      { k: "anchor", lbl: "ANKR", col: "#ffd66b" }
    ];
    lights.forEach((l, i) => {
      const on = lt[l.k];
      const ly = y + 20 + i * 12;
      // Switch
      inner += `<rect x="${x + 20}" y="${ly}" width="16" height="8" rx="1" fill="${on ? "#1a3040" : "#06101a"}" stroke="#2a4050"/>`;
      inner += `<rect x="${on ? x + 28 : x + 20}" y="${ly + 1}" width="7" height="6" rx="1" fill="${on ? "#38d97b" : "#1a3040"}"/>`;
      // Label
      inner += `<text x="${x + 42}" y="${ly + 7}" fill="${on ? "#5eead4" : "#6f86a8"}" font-size="7" font-family="monospace">${l.lbl}</text>`;
      // LED
      inner += `<circle cx="${x + 90}" cy="${ly + 4}" r="3" fill="${on ? l.col : "#06101a"}" stroke="${on ? l.col : "#2a4050"}" opacity="${on ? 0.9 : 0.3}"/>`;
    });
    inner += `<text x="${x + 60}" y="${y + 94}" fill="#5eead4" font-size="7" text-anchor="middle" font-family="monospace">${Object.keys(lt).filter(k => lt[k]).length}/5 ON</text>`;
    return hotspot("lights", x, y, w, h, isReq, inner, "NAV LITES");
  }

  // ---- ANCHOR station (starboard, x=1960) ----
  function stationAnchor(reqStation) {
    const isReq = reqStation === "anchor";
    const x = 1960, y = 355, w = 120, h = 100;
    const an = ship.anchor;
    // Windlass console
    let inner = `<rect x="${x + 12}" y="${y + 12}" width="96" height="72" rx="4" fill="#0d1825" stroke="#2dd4bf" stroke-width="1"/>`;
    // Windlass drum
    inner += `<circle cx="${x + 60}" cy="${y + 36}" r="16" fill="#1a3040" stroke="#5eead4" stroke-width="1"/>`;
    inner += `<circle cx="${x + 60}" cy="${y + 36}" r="10" fill="#0d1825"/>`;
    // Cable chain wraps
    for (let ci = 0; ci < 6; ci++) {
      const cang = ci * 60 * Math.PI / 180;
      const ccx = x + 60 + Math.cos(cang) * 13;
      const ccy = y + 36 + Math.sin(cang) * 13;
      inner += `<circle cx="${ccx}" cy="${ccy}" r="2" fill="#5eead4" opacity="0.5"/>`;
    }
    // Anchor status indicator
    const statCol = an === "letgo" ? "#ff5a6e" : an === "aweigh" ? "#ffb454" : "#38d97b";
    const statTxt = an === "letgo" ? "LET GO" : an === "aweigh" ? "AWEIGH" : "STOWED";
    inner += `<rect x="${x + 22}" y="${y + 58}" width="76" height="16" rx="2" fill="#04121f" stroke="${statCol}"/>`;
    inner += `<text x="${x + 60}" y="${y + 69}" fill="${statCol}" font-size="8" text-anchor="middle" font-family="monospace" font-weight="bold">${statTxt}</text>`;
    // Scope readout
    inner += `<text x="${x + 60}" y="${y + 90}" fill="#6f86a8" font-size="7" text-anchor="middle" font-family="monospace">SCOPE ${ship.scope}x</text>`;
    // Anchor symbol on drum
    inner += `<text x="${x + 60}" y="${y + 40}" fill="${statCol}" font-size="10" text-anchor="middle">A</text>`;
    return hotspot("anchor", x, y, w, h, isReq, inner, "ANCHOR");
  }


  // ==========================================================
  // MINI-GAMES
  // ==========================================================
  function openMinigame(mgid) {
    const mg = MINIGAMES.find(x => x.id === mgid);
    if (!mg) return;
    const ov = document.createElement("div");
    ov.className = "minigame-overlay";
    ov.id = "mgOverlay";
    ov.innerHTML = `<div class="minigame-box">
      <div class="mg-header"><div class="mg-h-title"><span style="font-size:20px">${mg.icon}</span> ${mg.title}</div><button class="sp-close" id="mgClose" type="button">×</button></div>
      <div class="mg-body" id="mgBody"></div>
    </div>`;
    document.body.appendChild(ov);
    ov.addEventListener("click", e => { if (e.target === ov) closeMinigame(); });
    document.getElementById("mgClose").addEventListener("click", closeMinigame);
    const body = document.getElementById("mgBody");
    if (mgid === "mg_moor") initMoor(body);
    else if (mgid === "mg_knot") initKnot(body);
    else if (mgid === "mg_flags") initFlags(body);
    else if (mgid === "mg_dock") initDock(body);
    else if (mgid === "mg_sail") initSail(body);
    else if (mgid === "mg_emerg") initEmerg(body);
  }
  function closeMinigame() {
    const ov = document.getElementById("mgOverlay");
    if (ov) ov.remove();
    renderBridge();
  }
  function mgFeedback(body, kind, msg) {
    let fb = body.querySelector(".mg-feedback");
    if (!fb) { fb = document.createElement("div"); fb.className = "mg-feedback task-feedback"; body.appendChild(fb); }
    fb.className = "mg-feedback task-feedback show " + (kind === "ok" ? "ok" : kind === "err" ? "err" : "info");
    fb.textContent = (kind === "ok" ? "✅ " : kind === "err" ? "❌ " : "💡 ") + msg;
  }
  function awardMinigame(mgId, score, xp) {
    if (!state.bridgeMiniPlayed.includes(mgId)) state.bridgeMiniPlayed.push(mgId);
    if (state.bridgeMiniBest[mgId] === undefined || score > state.bridgeMiniBest[mgId]) {
      state.bridgeMiniBest[mgId] = score;
    }
    state.xp += xp;
    state.streak++;
    if (state.streak > state.bestStreak) state.bestStreak = state.streak;
    state.totalAttempts++;
    saveState();
    syncOuterRanks();
    toast("ok", "🎮 Mini-game complete! +" + xp + " XP · Score " + score);
  }

  // ---- MOOR THE SHIP ----
  const MOOR_ORDER = [
    { id: "bow1", lbl: "BOW LINE", desc: "Stops the bow from moving aft" },
    { id: "spring1", lbl: "AFT SPRING", desc: "Stops the bow from moving forward" },
    { id: "stern1", lbl: "STERN LINE", desc: "Holds the stern to the pier" },
    { id: "bow2", lbl: "AFT BOWLINE", desc: "Second bow line for security" }
  ];
  function initMoor(body) {
    mgState = { secured: [], order: MOOR_ORDER.slice(), idx: 0 };
    body.innerHTML = `
      <div class="mg-instruct">Moor the Kingston-Class alongside. Secure the mooring lines to the bollards in the correct order: Bow Line → Aft Spring → Stern Line → Aft Bowline. Tap the highlighted bollard next.</div>
      <div class="mg-score">Lines secured: <span id="moorScore">0</span> / 4</div>
      <div class="moor-ship">🚢</div>
      <div class="moor-pier" id="moorPier">
        ${MOOR_ORDER.map((m, i) => `<div class="moor-bollard ${i === 0 ? "next" : ""}" data-moor="${m.id}" data-idx="${i}" type="button">⚓</div>`).join("")}
      </div>
      <div class="moor-lines" id="moorLines">
        ${MOOR_ORDER.map(m => `<div class="moor-line" data-line="${m.id}"><span>🪢 ${m.lbl}</span><span class="ml-status">PENDING</span></div>`).join("")}
      </div>
    `;
    body.querySelectorAll(".moor-bollard").forEach(b => {
      b.addEventListener("click", () => {
        const idx = parseInt(b.dataset.idx, 10);
        if (idx !== mgState.idx) {
          mgFeedback(body, "err", "Wrong line! Secure the lines in order. The highlighted bollard is next.");
          return;
        }
        const m = mgState.order[idx];
        mgState.secured.push(m.id);
        b.classList.add("secured");
        b.classList.remove("next");
        body.querySelector("#moorScore").textContent = mgState.secured.length;
        const lineEl = body.querySelector(`.moor-line[data-line="${m.id}"]`);
        if (lineEl) { lineEl.classList.add("done"); lineEl.querySelector(".ml-status").textContent = "SECURED"; }
        mgState.idx++;
        const nextB = body.querySelector(`.moor-bollard[data-idx="${mgState.idx}"]`);
        if (nextB) nextB.classList.add("next");
        if (mgState.secured.length === MOOR_ORDER.length) {
          mgFeedback(body, "ok", "All four mooring lines secured! The ship is safely alongside.");
          const mg = MINIGAMES.find(x => x.id === "mg_moor");
          awardMinigame("mg_moor", 100, mg.xp);
          setTimeout(closeMinigame, 1400);
        } else {
          mgFeedback(body, "info", m.lbl + " secured. Next: " + mgState.order[mgState.idx].lbl);
        }
      });
    });
  }

  // ---- TIE KNOTS (bowline steps in order) ----
  const KNOT_STEPS = [
    { id: 1, txt: "Form a small loop (the 'rabbit hole') in the standing part." },
    { id: 2, txt: "Pass the working end up through the loop from underneath." },
    { id: 3, txt: "Take the working end around the back of the standing part." },
    { id: 4, txt: "Pass the working end back down through the loop." },
    { id: 5, txt: "Dress and tighten the knot — the working end should lie inside the loop." }
  ];
  function initKnot(body) {
    mgState = { done: [], idx: 0, knotName: "BOWLINE" };
    body.innerHTML = `
      <div class="mg-instruct">Tie a BOWLINE — the 'king of knots'. Complete the five steps in the correct order. Tap each step as you perform it.</div>
      <div class="knot-display">
        <div class="kd-name">BOWLINE</div>
        <div class="kd-svg">${bowlineSVG()}</div>
      </div>
      <div class="knot-steps" id="knotSteps">
        ${KNOT_STEPS.map((s, i) => `<div class="knot-step ${i === 0 ? "current" : ""}" data-step="${s.id}" data-idx="${i}" type="button">
          <div class="ks-num">${s.id}</div><div>${s.txt}</div>
        </div>`).join("")}
      </div>
    `;
    body.querySelectorAll(".knot-step").forEach(b => {
      b.addEventListener("click", () => {
        const idx = parseInt(b.dataset.idx, 10);
        if (idx !== mgState.idx) {
          mgFeedback(body, "err", "Out of order! Tie the steps in sequence, starting from the top.");
          return;
        }
        mgState.done.push(idx);
        b.classList.add("done");
        b.classList.remove("current");
        mgState.idx++;
        const next = body.querySelector(`.knot-step[data-idx="${mgState.idx}"]`);
        if (next) next.classList.add("current");
        if (mgState.done.length === KNOT_STEPS.length) {
          mgFeedback(body, "ok", "BOWLINE tied correctly! A secure, non-slipping loop at the end of a line.");
          const mg = MINIGAMES.find(x => x.id === "mg_knot");
          awardMinigame("mg_knot", 100, mg.xp);
          setTimeout(closeMinigame, 1400);
        } else {
          mgFeedback(body, "info", "Step " + (idx + 1) + " done. Next: step " + (mgState.idx + 1) + ".");
        }
      });
    });
  }
  function bowlineSVG() {
    return `<svg viewBox="0 0 200 80" width="200" height="80" xmlns="http://www.w3.org/2000/svg">
      <g stroke="#c79a3a" stroke-width="3" fill="none">
        <circle cx="70" cy="40" r="14"/>
        <path d="M70 26 L70 10 L160 10"/>
        <path d="M56 40 L20 60"/>
        <path d="M70 54 L90 40 L110 60"/>
      </g>
      <text x="100" y="75" fill="#6f86a8" font-size="9" font-family="monospace" text-anchor="middle">BOWLINE</text>
    </svg>`;
  }

  // ---- NAVAL FLAGS ----
  const FLAGS = [
    { glyph: "🚩", name: "ALFA", meaning: "I have a diver down; keep well clear at slow speed." },
    { glyph: "🇧", name: "BRAVO", meaning: "I am taking in, or discharging, dangerous goods." },
    { glyph: "🇩", name: "DELTA", meaning: "Keep clear of me; I am manoeuvring with difficulty." },
    { glyph: "🇫", name: "FOXTROT", meaning: "I am disabled; communicate with me." },
    { glyph: "🇭", name: "HOTEL", meaning: "I have a pilot on board." },
    { glyph: "🇴", name: "OSCAR", meaning: "Man overboard." },
    { glyph: "🇵", name: "PAPA", meaning: "In harbour: all persons report on board. At sea: my nets have come fast on an obstruction." },
    { glyph: "🇶", name: "QUEBEC", meaning: "My vessel is healthy and I request free pratique." }
  ];
  function initFlags(body) {
    mgState = { round: 0, correct: 0, total: 5, current: null };
    body.innerHTML = `<div class="mg-instruct">Identify the international maritime signal flag. Choose the correct name. Five rounds.</div>
      <div class="mg-score">Round <span id="flagRound">1</span>/5 · Score <span id="flagScore">0</span></div>
      <div id="flagStage"></div>`;
    nextFlag(body);
  }
  function nextFlag(body) {
    if (mgState.round >= mgState.total) {
      const score = mgState.correct * 20;
      mgFeedback(body, "ok", "Flags round complete! You identified " + mgState.correct + "/5 correctly.");
      const mg = MINIGAMES.find(x => x.id === "mg_flags");
      awardMinigame("mg_flags", score, mg.xp);
      setTimeout(closeMinigame, 1400);
      return;
    }
    mgState.round++;
    body.querySelector("#flagRound").textContent = mgState.round;
    const correct = FLAGS[Math.floor(Math.random() * FLAGS.length)];
    mgState.current = correct;
    // build options: correct + 3 distractors
    const pool = FLAGS.filter(f => f.id !== correct.id);
    const distractors = pool.sort(() => Math.random() - 0.5).slice(0, 3);
    const options = [correct, ...distractors].sort(() => Math.random() - 0.5);
    const stage = body.querySelector("#flagStage");
    stage.innerHTML = `<div class="flags-game">
      <div class="flags-question">
        <div class="fq-prompt">Which flag is this?</div>
        <div class="fq-flag">${correct.glyph}</div>
      </div>
      <div class="flags-options">
        ${options.map(o => `<button class="flags-option" data-flag="${o.name}" type="button">${o.name}</button>`).join("")}
      </div>
    </div>`;
    stage.querySelectorAll(".flags-option").forEach(b => {
      b.addEventListener("click", () => {
        const chosen = b.dataset.flag;
        if (chosen === mgState.current.name) {
          mgState.correct++;
          b.classList.add("correct");
          body.querySelector("#flagScore").textContent = mgState.correct;
          mgFeedback(body, "ok", "Correct! " + mgState.current.name + ": " + mgState.current.meaning);
        } else {
          b.classList.add("wrong");
          mgFeedback(body, "err", "Incorrect. That was " + mgState.current.name + ": " + mgState.current.meaning);
        }
        setTimeout(() => nextFlag(body), 1200);
      });
    });
  }

  // ---- DOCK THE SHIP ----
  function initDock(body) {
    mgState = { x: 120, y: 150, vx: 0, vy: 0, thrust: 0, hits: 0, done: false, time: 0 };
    body.innerHTML = `
      <div class="mg-instruct">Bring the ship alongside the pier (green zone) without hitting it. Use thrust and rudder. Touchdown gently (vx near 0) in the berth to dock.</div>
      <div class="mg-score">Approach speed: <span id="dockSpeed">0.0</span> · Hits: <span id="dockHits">0</span></div>
      <div class="dock-viewport" id="dockViewport">${dockSVG(120, 150, 0)}</div>
      <div class="dock-controls">
        <button class="dock-btn" id="dockLeft" type="button">◀ Rudder L</button>
        <button class="dock-btn" id="dockThrust" type="button">⬆ Thrust</button>
        <button class="dock-btn" id="dockRight" type="button">Rudder R ▶</button>
        <button class="dock-btn" id="dockStop" type="button">⏹ Stop</button>
      </div>
    `;
    const vp = body.querySelector("#dockViewport");
    let rudder = 0;
    const tick = setInterval(() => {
      if (mgState.done) { clearInterval(tick); return; }
      mgState.time++;
      // physics: thrust along facing, rudder turns heading slowly
      mgState.vx += Math.sin(0) * 0; // facing is to the right (0deg)
      if (mgState.thrust) mgState.vx += 0.15;
      mgState.x += mgState.vx;
      mgState.y += rudder * mgState.vx * 0.05;
      // friction
      mgState.vx *= 0.97;
      // pier at x=440..500, y=80..220
      if (mgState.x >= 440 && mgState.x <= 510 && mgState.y > 60 && mgState.y < 240) {
        if (mgState.x >= 470) {
          // in berth zone
          if (Math.abs(mgState.vx) < 0.4 && mgState.thrust === 0) {
            mgState.done = true;
            clearInterval(tick);
            mgFeedback(body, "ok", "Docked safely alongside! Gentle touchdown at the pier.");
            const score = Math.max(20, 100 - mgState.hits * 20);
            const mg = MINIGAMES.find(x => x.id === "mg_dock");
            awardMinigame("mg_dock", score, mg.xp);
            setTimeout(closeMinigame, 1500);
          }
        }
        if (mgState.x >= 510 && mgState.vx > 0.3) {
          mgState.hits++;
          mgState.vx = -mgState.vx * 0.5;
          mgState.x = 508;
          body.querySelector("#dockHits").textContent = mgState.hits;
          mgFeedback(body, "err", "Bumped the pier! " + mgState.hits + " hits so far. Back off and approach slower.");
        }
      }
      if (mgState.x < 20) mgState.x = 20;
      if (mgState.x > 540) { mgState.x = 540; mgState.vx = 0; }
      if (mgState.y < 30) mgState.y = 30;
      if (mgState.y > 250) mgState.y = 250;
      body.querySelector("#dockSpeed").textContent = Math.abs(mgState.vx).toFixed(1);
      vp.innerHTML = dockSVG(mgState.x, mgState.y, mgState.vx);
    }, 80);
    body.querySelector("#dockLeft").addEventListener("click", () => { rudder = -1; });
    body.querySelector("#dockRight").addEventListener("click", () => { rudder = 1; });
    body.querySelector("#dockThrust").addEventListener("click", () => { mgState.thrust = 1; });
    body.querySelector("#dockStop").addEventListener("click", () => { mgState.thrust = 0; rudder = 0; });
    body.dataset.dockTick = tick;
  }
  function dockSVG(x, y, vx) {
    return `<svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="300" fill="#020812"/>
      <rect x="0" y="220" width="600" height="80" fill="#0d4858" opacity="0.4"/>
      <rect x="470" y="60" width="40" height="180" fill="#1a4858"/>
      <rect x="470" y="60" width="40" height="180" fill="none" stroke="#38d97b" stroke-dasharray="4 3" opacity="0.6"/>
      <text x="490" y="50" fill="#38d97b" font-size="9" font-family="monospace" text-anchor="middle">BERTH</text>
      <g transform="translate(${x} ${y})">
        <rect x="-14" y="-24" width="28" height="48" rx="6" fill="#1a4858" stroke="#5eead4"/>
        <polygon points="0,-34 10,-22 -10,-22" fill="#1a4858" stroke="#5eead4"/>
      </g>
      <text x="10" y="20" fill="#6f86a8" font-size="9" font-family="monospace">KINGSTON-CLASS — APPROACH</text>
    </svg>`;
  }

  // ---- SAIL RACE ----
  function initSail(body) {
    mgState = { x: 60, y: 250, vx: 0, vy: 0, tack: 0, wind: -45, time: 60, done: false };
    body.innerHTML = `
      <div class="mg-instruct">Sail race! The wind is from the NW (${mgState.wind}°). Tack upwind to reach the mark (top-left) before the timer hits 0. You can't sail straight into the wind — tack back and forth.</div>
      <div class="sail-wind">⏱ <span id="sailTime">60</span>s · 🧭 Wind ${mgState.wind}° · Distance to mark: <span id="sailDist">—</span></div>
      <div class="sail-viewport" id="sailViewport">${sailSVG(60, 250, 0)}</div>
      <div class="dock-controls">
        <button class="dock-btn" id="sailLeft" type="button">◀ Tack Port</button>
        <button class="dock-btn" id="sailRight" type="button">Stbd Tack ▶</button>
      </div>
    `;
    const vp = body.querySelector("#sailViewport");
    let tack = 1; // 1 = starboard tack (heading up-left), -1 = port tack
    const tick = setInterval(() => {
      if (mgState.done) { clearInterval(tick); return; }
      mgState.time -= 1;
      // sailing physics: on a close-hauled tack, move upwind at angle
      const speed = 1.6;
      if (tack === 1) { mgState.vx = -speed * 0.7; mgState.vy = -speed; }
      else { mgState.vx = speed * 0.7; mgState.vy = -speed; }
      mgState.x += mgState.vx;
      mgState.y += mgState.vy;
      if (mgState.y < 40) { mgState.done = true; clearInterval(tick); mgFeedback(body, "ok", "Mark reached! You tacked upwind to the finish."); const mg = MINIGAMES.find(x => x.id === "mg_sail"); const score = Math.max(30, mgState.time * 2 + 40); awardMinigame("mg_sail", score, mg.xp); setTimeout(closeMinigame, 1500); return; }
      if (mgState.x < 20) mgState.x = 20;
      if (mgState.x > 540) mgState.x = 540;
      if (mgState.y > 270) mgState.y = 270;
      body.querySelector("#sailTime").textContent = mgState.time;
      body.querySelector("#sailDist").textContent = Math.round(mgState.y - 40);
      vp.innerHTML = sailSVG(mgState.x, mgState.y, tack);
      if (mgState.time <= 0) { mgState.done = true; clearInterval(tick); mgFeedback(body, "err", "Time's up! You didn't reach the mark. Try tacking more efficiently."); setTimeout(closeMinigame, 1500); }
    }, 200);
    body.querySelector("#sailLeft").addEventListener("click", () => { tack = -1; });
    body.querySelector("#sailRight").addEventListener("click", () => { tack = 1; });
  }
  function sailSVG(x, y, tack) {
    const sail = tack === 1 ? `<polygon points="0,10 0,-20 14,10" fill="#e8f1ff" opacity="0.9"/>` : `<polygon points="0,10 0,-20 -14,10" fill="#5eead4" opacity="0.9"/>`;
    return `<svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="300" fill="#020812"/>
      <g opacity="0.4" stroke="#5eead4" stroke-width="1"><line x1="480" y1="20" x2="440" y2="60"/><line x1="450" y1="10" x2="410" y2="50"/><line x1="510" y1="10" x2="470" y2="50"/></g>
      <text x="470" y="75" fill="#5eead4" font-size="10" font-family="monospace" text-anchor="middle">WIND NW</text>
      <circle cx="40" cy="40" r="10" fill="none" stroke="#ffd66b" stroke-width="2"/>
      <text x="40" y="44" fill="#ffd66b" font-size="10" text-anchor="middle">🏁</text>
      <g transform="translate(${x} ${y})">
        <polygon points="-12,12 12,12 0,18" fill="#1a4858"/>
        <line x1="0" y1="12" x2="0" y2="-22" stroke="#5eead4" stroke-width="2"/>
        ${sail}
      </g>
    </svg>`;
  }

  // ---- EMERGENCY RESPONSE ----
  const EMERG_SCENARIO = {
    title: "Galley Fire",
    text: "Smoke is reported from the galley! A fire has started in the cooking area. As Officer of the Watch you must respond immediately. Select the actions in the correct order."
  };
  const EMERG_ACTIONS = [
    { id: "alarm", txt: "Raise the alarm — sound the general fire alarm and announce 'Fire in the galley' over the 1MC." },
    { id: "close", txt: "Close the galley doors and hatches to contain the fire and cut off the oxygen supply." },
    { id: "power", txt: "Shut off electrical power and fuel to the galley." },
    { id: "party", txt: "Muster the fire party and attack the fire with the nearest extinguisher / hose." },
    { id: "broadcast", txt: "Inform the commanding officer and broadcast a PAN-PAN if the fire is not quickly controlled." }
  ];
  const EMERG_CORRECT = ["alarm", "close", "power", "party", "broadcast"];
  function initEmerg(body) {
    mgState = { seq: [], done: false };
    body.innerHTML = `
      <div class="emerg-game">
        <div class="emerg-scenario"><strong>${EMERG_SCENARIO.title}</strong><br/>${EMERG_SCENARIO.text}</div>
        <div class="mg-instruct">Tap the actions in the correct sequence. The right order saves the ship.</div>
        <div class="emerg-actions" id="emergActions">
          ${EMERG_ACTIONS.map(a => `<div class="emerg-action" data-act="${a.id}" type="button"><div class="ea-num">${EMERG_ACTIONS.indexOf(a) + 1}</div><div>${a.txt}</div></div>`).join("")}
        </div>
      </div>`;
    body.querySelectorAll(".emerg-action").forEach(b => {
      b.addEventListener("click", () => {
        if (mgState.done) return;
        const aid = b.dataset.act;
        if (mgState.seq.includes(aid)) return;
        const expected = EMERG_CORRECT[mgState.seq.length];
        if (aid === expected) {
          mgState.seq.push(aid);
          b.classList.add("selected");
          if (mgState.seq.length === EMERG_CORRECT.length) {
            mgState.done = true;
            mgFeedback(body, "ok", "Fire under control! Correct emergency response sequence executed. The galley fire is out.");
            const mg = MINIGAMES.find(x => x.id === "mg_emerg");
            awardMinigame("mg_emerg", 100, mg.xp);
            setTimeout(closeMinigame, 1500);
          } else {
            mgFeedback(body, "info", "Correct step " + mgState.seq.length + ". Continue the sequence.");
          }
        } else {
          mgFeedback(body, "err", "Wrong order! Think: alarm first, then contain, then attack, then broadcast.");
          state.streak = 0;
          saveState();
        }
      });
    });
  }

  // ==========================================================
  // SYNC OUTER RANKS (re-render sea_training sidebar/topstats)
  // We dispatch a custom event the outer IIFE can listen for, and
  // also directly update shared DOM elements if present.
  // ==========================================================
  function syncOuterRanks() {
    try { window.dispatchEvent(new CustomEvent("seaTrainingXPChanged")); } catch (e) {}
    // Direct DOM updates for the shared top stats / sidebar
    const rank = currentRank();
    const topRank = document.getElementById("topRank");
    if (topRank) topRank.textContent = rank.name.replace("Sea Cadet ", "").replace("Cadet ", "");
    const topXP = document.getElementById("topXP");
    if (topXP) topXP.textContent = state.xp;
    const pilotRank = document.getElementById("pilotRank");
    if (pilotRank) pilotRank.textContent = rank.name;
  }

  // ==========================================================
  // EXPOSE FOR OUTER HOOK
  // ==========================================================
  window.BridgeGame = {
    render: renderBridge,
    isLoaded: true
  };

  // ==========================================================
  /* ── i18n: translate data arrays in-place ── */
  if (typeof trMutate === "function") {
    try { trMutate(BRIDGE_BADGES); } catch(e) {}
    try { trMutate(COMMS_PRESETS); } catch(e) {}
    try { trMutate(EMERG_ACTIONS); } catch(e) {}
    try { trMutate(EMERG_CORRECT); } catch(e) {}
    try { trMutate(EMERG_SCENARIO); } catch(e) {}
    try { trMutate(FLAGS); } catch(e) {}
    try { trMutate(KNOT_STEPS); } catch(e) {}
    try { trMutate(LIGHTS); } catch(e) {}
    try { trMutate(LOOKOUT_SECTORS); } catch(e) {}
    try { trMutate(MINIGAMES); } catch(e) {}
    try { trMutate(MOOR_ORDER); } catch(e) {}
    try { trMutate(RANKS); } catch(e) {}
    try { trMutate(STATIONS); } catch(e) {}
    try { trMutate(TELEGRAPH); } catch(e) {}
    try { trMutate(VHF_CHANNELS); } catch(e) {}
    try { trMutate(WATCHES); } catch(e) {}
  }

  // ==========================================================
  // NAV HOOK — when the Bridge nav button is clicked, the outer
  // switchSection hides/shows sections; we render our content.
  // We listen for clicks on the bridge nav button directly.
  // ==========================================================
  function init() {
    const navBtn = document.querySelector('.nav-btn[data-section="bridge"]');
    if (navBtn) {
      navBtn.addEventListener("click", () => {
        // outer switchSection already toggles the section; just render
        renderBridge();
      });
    }
    // Also listen for outer XP changes so our grid refreshes
    window.addEventListener("seaTrainingXPChanged", () => {
      state = loadState();
      if (document.getElementById("section-bridge") && document.getElementById("section-bridge").classList.contains("active")) {
        renderBridge();
      }
    });
    // If the bridge section is already active on load, render
    if (document.getElementById("section-bridge") && document.getElementById("section-bridge").classList.contains("active")) {
      renderBridge();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
