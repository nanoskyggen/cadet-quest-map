/* ============================================================
   SEAMANSHIP & MARITIME FOUNDATIONS — seamanship_training.js
   Phase 2 Sea Cadet module (301). Built on the HTML5 Cadet Shell.
   7 chapters + interactive Deck Orientation Trainer (HTML5 canvas)
   + 6 knowledge checks + badge award (HQ Mail confirmation).
   ============================================================ */
(function () {
  "use strict";

  var tr = (typeof window.tr === "function") ? window.tr : function (s) { return s; };
  var CH = window.CadetHTML5;
  var store = CH.store("seamanshipFoundations");

  /* ----------------------------------------------------------
     CONTENT — 7 chapters
     body blocks: {t:'p'|'note'|'warn'|'list', text, items}
     ---------------------------------------------------------- */
  var CHAPTERS = [
    {
      id: "c1",
      title: "Why Seamanship",
      subtitle: "The sea keeps no favourites \u2014 seamanship is how sailors survive it together.",
      body: [
        { t: "p", text: "Seamanship is the art and skill of handling a vessel and caring for the people aboard her. It is far more than tying knots or steering a course. It is a way of thinking: being prepared before anything goes wrong, staying calm when it does, and putting the safety of the crew and the ship ahead of yourself." },
        { t: "p", text: "The sea is indifferent. It does not care how strong you are, how clever you are, or how much you meant to do better. Weather changes without warning, gear breaks, and mistakes that would be small on land can become serious afloat. Seamanship is the set of habits that keeps a small problem from becoming a disaster: check the gear, watch the weather, keep a good lookout, and never leave a shipmate to face a job alone." },
        { t: "note", text: "A simple rule of the sea: a boat is only as strong as her crew, and a crew is only as strong as the trust between them." },
        { t: "p", text: "Seamanship is also a code of conduct. Sailors look out for one another, keep their word, and respect the chain of command. When you learn seamanship you are learning to be dependable \u2014 the kind of person a shipmate can count on in a squall. That is why every Sea Cadet begins here: before you can sail, row, or navigate, you must understand the culture of the sea." },
        { t: "list", items: [
          "Preparation \u2014 check the boat, the gear, and the plan before you cast off.",
          "Vigilance \u2014 keep a constant lookout for weather, traffic, and anything that has changed.",
          "Self-reliance \u2014 know your job and be ready to do it without being told twice.",
          "Teamwork \u2014 no one sails a ship alone; every hand matters.",
          "Respect \u2014 for the sea, for the ship, for your shipmates, and for the chain of command."
        ] }
      ],
      keyPoints: [
        "Seamanship is the skill of handling a vessel and caring for her crew.",
        "The sea is unforgiving \u2014 good habits stop small problems becoming disasters.",
        "A boat is only as strong as her crew, and a crew only as strong as their trust.",
        "Seamanship is a code of conduct: preparation, vigilance, self-reliance, teamwork, respect."
      ]
    },
    {
      id: "c2",
      title: "Nautical Terminology",
      subtitle: "Port, starboard, bow, stern \u2014 the language that stops confusion at sea.",
      body: [
        { t: "p", text: "At sea, the words 'left' and 'right' are dangerous. They depend on which way a person is facing, so two shipmates looking in opposite directions would mean opposite things by the same word. To remove that confusion, sailors use terms that are fixed to the ship itself, no matter which way you are facing." },
        { t: "p", text: "The four you must know first are port, starboard, bow, and stern. Port is the left-hand side of a vessel when you are facing the bow. Starboard is the right-hand side. The bow is the front of the vessel, and the stern is the back. Because these words are tied to the ship, they mean the same thing to everyone aboard at all times." },
        { t: "note", text: "Memory aid: 'port' has four letters, just like 'left'. And a port wine is red \u2014 the port side of a ship carries a red light at night." },
        { t: "p", text: "Where do these strange words come from? Long ago, ships were steered with a large paddle called a steering board, carried on the right-hand side \u2014 the 'steer-board' side, which became starboard. The other side was where the ship was tied up to load cargo, the 'larboard' or loading side; because larboard sounded too much like starboard in a gale, sailors renamed it port, after the port side they tied up against. The bow is simply the front, and the stern comes from an old word for the back of a ship." },
        { t: "p", text: "Two more pairs complete the basic vocabulary. Fore and aft mean toward the front and toward the back: 'fore' as in the forecastle (the forward part of the deck), and 'aft' as in the afterdeck. Ahead and astern mean in front of and behind the vessel. You will also hear windward and leeward \u2014 toward the wind and away from the wind \u2014 and amidships, meaning the middle of the ship." },
        { t: "list", items: [
          "Port \u2014 the left side of the ship, facing the bow (red navigation light).",
          "Starboard \u2014 the right side of the ship, facing the bow (green navigation light).",
          "Bow \u2014 the front of the ship. Stern \u2014 the back of the ship.",
          "Fore / aft \u2014 toward the front / toward the back.",
          "Ahead / astern \u2014 in front of / behind the vessel.",
          "Windward / leeward \u2014 toward the wind / away from the wind.",
          "Amidships \u2014 the middle of the ship, between bow and stern."
        ] }
      ],
      keyPoints: [
        "Port = left and starboard = right, always relative to the ship facing the bow.",
        "Bow = front, stern = back; fore/aft mean toward the front/back.",
        "Starboard comes from the old steering-board side; port from the loading side.",
        "Port carries a red light, starboard a green light \u2014 'port wine is red'."
      ]
    },
    {
      id: "c3",
      title: "Parts of a Ship",
      subtitle: "Hull, deck, keel \u2014 the anatomy of a vessel and the words for every part.",
      body: [
        { t: "p", text: "Every ship, from a rowing dinghy to an aircraft carrier, is built from the same basic parts, and a sailor must be able to name them. The hull is the body of the ship \u2014 the watertight shell that keeps the sea out and the crew afloat. The deck is the floor you walk on, and the keel is the strong backbone that runs along the bottom of the hull from bow to stern, giving the ship strength and helping her keep upright." },
        { t: "p", text: "Around the edges of the deck run the gunwale (say 'gun-nel'), the upper edge of the hull's side, and often a bulwark, a low solid wall that stops you and your gear from going overboard. Above the deck sits the superstructure \u2014 the bridge, where the ship is steered and commanded; the funnel or stack, which carries away engine exhaust; and the mast, which carries the antennae, radar, and signal flags." },
        { t: "p", text: "Below and inside, a ship is a small floating town. The galley is the kitchen, the mess is where the crew eats and relaxes, and the head is the toilet. The bilge is the lowest part of the hull, where water that gets aboard collects before it is pumped out. Compartments and watertight doors divide the hull so that damage in one part can be sealed off from the rest." },
        { t: "table", head: ["Term", "Meaning"], rows: [
          ["Hull", "The watertight body of the ship."],
          ["Keel", "The backbone along the bottom of the hull."],
          ["Deck", "The floor of the ship."],
          ["Gunwale", "The upper edge of the hull's side."],
          ["Bulwark", "A low wall around the deck edge."],
          ["Bridge", "Where the ship is steered and commanded."],
          ["Funnel / stack", "The pipe that carries engine exhaust away."],
          ["Galley", "The ship's kitchen."],
          ["Head", "The ship's toilet."],
          ["Bilge", "The lowest part of the hull, where water collects."]
        ] },
        { t: "p", text: "Three measurements describe how a ship sits in the water. Draft is the depth of water she needs to float; beam is her width at the widest point; and freeboard is the height of the deck above the waterline. Load a ship too heavily and her freeboard shrinks and her draft deepens \u2014 a real danger, because a low freeboard means seas can sweep the deck." },
        { t: "note", text: "Learn the parts by walking them. On your next boat, point to the bow, the stern, the gunwale, and the keel, and name each one out loud. Naming a thing is the first step to mastering it." }
      ],
      keyPoints: [
        "The hull is the watertight body; the keel is the backbone along her bottom.",
        "The deck is the floor; the gunwale is the top edge of the side; a bulwark is a low wall.",
        "Bridge, funnel, and mast make up the superstructure; galley, mess, and head are below decks.",
        "Draft = depth needed to float; beam = width; freeboard = height of deck above the waterline."
      ]
    },
    {
      id: "c4",
      title: "Rank & Rate",
      subtitle: "How the naval cadet chain of command is organised \u2014 and why it matters.",
      body: [
        { t: "p", text: "A ship cannot run by everyone doing whatever they please. She needs a clear chain of command, so that in an emergency there is no doubt about who gives the order and who carries it out. That structure is built from two different ideas: rank and rate. A rank is a level of authority \u2014 how senior a person is and how much responsibility they carry. A rate is a trade or skill \u2014 the job a person is trained to do, such as boatswain, gunner, or cook." },
        { t: "p", text: "In the Sea Cadet program, cadets advance through a ladder of ranks as they gain experience, skill, and leadership. Each step brings more responsibility, not just more privilege. A senior cadet is expected to set the example, teach the newer cadets, and take charge when called upon." },
        { t: "list", items: [
          "Cadet \u2014 the newest entry, learning the basics.",
          "Able Cadet \u2014 has shown reliability and basic knowledge.",
          "Leading Cadet \u2014 leads a small team and sets the standard.",
          "Petty Officer 2nd Class \u2014 supervises and instructs.",
          "Petty Officer 1st Class \u2014 a senior leader within the corps.",
          "Chief Petty Officer 2nd Class and 1st Class \u2014 the most senior cadets, who help lead the whole ship's company."
        ] },
        { t: "p", text: "Alongside rank, cadets hold appointments \u2014 specific jobs with specific duties. The coxswain is a senior cadet who helps keep discipline and runs the routine of the corps; divisional leaders look after a group of cadets; and specialists take charge of boats, stores, or signals. An appointment is a job you are trusted to do, and it can be held by a cadet of the appropriate rank." },
        { t: "note", text: "Rank is not about being better than others. It is about being responsible for others. The higher your rank, the more you look after the people below you." },
        { t: "p", text: "The chain of command works in both directions. Orders pass down from the most senior to the most junior, and reports pass back up. If you have a problem, you take it to the person directly above you. This keeps information flowing and stops confusion. Learning to give and receive orders clearly, calmly, and respectfully is one of the most valuable skills a cadet can develop." }
      ],
      keyPoints: [
        "A rank is a level of authority; a rate is a trade or skill.",
        "Sea Cadet ranks run from Cadet, through Able and Leading Cadet, to Petty Officer and Chief Petty Officer.",
        "Appointments (like coxswain or divisional leader) are trusted jobs with specific duties.",
        "The chain of command passes orders down and reports up \u2014 and rank means responsibility, not privilege."
      ]
    },
    {
      id: "c5",
      title: "Discipline & Customs",
      subtitle: "Orders, salutes, and the customs that bind a ship's company together.",
      body: [
        { t: "p", text: "Discipline at sea begins with self-discipline. It is the habit of doing the right thing, the right way, at the right time, whether or not anyone is watching. On a ship, discipline is not about punishment \u2014 it is about safety. When every hand knows their job and does it without being told twice, the ship runs smoothly and everyone stays safe." },
        { t: "p", text: "Customs are the traditions that turn discipline into a shared identity. They may look like ceremony, but each one carries meaning. A ship's company that salutes the ensign, keeps silence on the quarterdeck, and pipes a senior officer aboard is a company that understands respect \u2014 for the flag, for the ship, and for one another." },
        { t: "list", items: [
          "The salute \u2014 a mark of respect. Cadets salute the national flag, the ensign, and officers. It is always given smartly and received smartly.",
          "The quarterdeck \u2014 the ceremonial heart of a ship. You salute the ensign and ask permission before stepping aboard.",
          "Colours \u2014 the ceremony of hoisting the flag in the morning (and lowering it at sunset, called 'Sunset'). The ship comes to attention.",
          "Piping the side \u2014 a boatswain's call (whistle) sounds to honour a senior officer coming aboard or leaving.",
          "The ship's bell \u2014 struck to mark the time and to signal ceremonies; each ship has her own bell, often kept as a treasured relic.",
          "Watches \u2014 the crew is divided into watches so the ship is manned and alert twenty-four hours a day."
        ] },
        { t: "note", text: "Customs are not empty ritual. They are the way a crew reminds itself, every day, that it is part of something larger than any one person." },
        { t: "p", text: "Discipline and customs also build trust. When you know that your shipmates will follow the same rules and keep the same standards, you can rely on them. That reliability is the foundation of everything a ship does \u2014 from a quiet harbour watch to a rescue in a storm." }
      ],
      keyPoints: [
        "Discipline begins with self-discipline \u2014 doing the right thing without being watched.",
        "Customs turn discipline into a shared identity and teach respect.",
        "Key customs: the salute, the quarterdeck, Colours, piping the side, and the ship's bell.",
        "Watches keep the ship manned and alert around the clock."
      ]
    },
    {
      id: "c6",
      title: "Traditions",
      subtitle: "Colours, sunset, the ship's bell, and the spirit of the Sea Cadets.",
      body: [
        { t: "p", text: "Every navy and every cadet corps is built on traditions that stretch back for centuries. These traditions connect today's cadets to the sailors who came before them and give the program its spirit. To be a Sea Cadet is to join a long line of people who have served at sea, and the traditions are how that line is kept alive." },
        { t: "p", text: "The day at sea is framed by two ceremonies. At Colours, held each morning, the national flag is hoisted and the ship's company comes to attention. At Sunset, held in the evening, the flag is lowered with the same care. Together they mark the beginning and the end of the working day and remind everyone aboard of what they serve." },
        { t: "list", items: [
          "Colours and Sunset \u2014 the daily hoisting and lowering of the flag.",
          "The ensign \u2014 the national flag flown by a ship; it is treated with great respect.",
          "The ship's bell \u2014 rung to mark time and ceremonies, and a symbol of the ship herself.",
          "The naval hymn \u2014 'Eternal Father, Strong to Save', sung for those in peril on the sea.",
          "The loyal toast \u2014 a formal toast to the head of state, given at mess dinners.",
          "'Crossing the Line' \u2014 a light-hearted ceremony held when a ship crosses the Equator, marking a sailor's first time 'crossing the line'.",
          "The tot \u2014 the historic daily rum ration, long since ended but still remembered in naval lore."
        ] },
        { t: "note", text: "The Sea Cadet motto is 'Ready, Aye Ready' \u2014 the same motto as the Royal Canadian Navy. It means always prepared, always willing, always ready to serve." },
        { t: "p", text: "Traditions also include the smaller things: the way a boat is piped away, the way a flag is folded, the way a cadet addresses a senior. Each detail is a thread in the fabric of the corps. Learn them, respect them, and pass them on \u2014 that is how a tradition survives." }
      ],
      keyPoints: [
        "Traditions connect today's cadets to the sailors who came before them.",
        "Colours (morning) and Sunset (evening) frame the day aboard ship.",
        "The ensign, the ship's bell, and the naval hymn are treasured naval traditions.",
        "The Sea Cadet motto 'Ready, Aye Ready' means always prepared and willing to serve."
      ]
    },
    {
      id: "c7",
      title: "The Ship as a Community",
      subtitle: "Departments, watches, and the shipmates who keep a vessel alive.",
      body: [
        { t: "p", text: "A ship at sea is a small community that must be completely self-sufficient. There is no corner shop, no fire brigade, and no hospital within reach. Everything the crew needs \u2014 food, water, power, repairs, and medical care \u2014 must be carried aboard and provided by the people on the ship. That is why a ship's company is organised into departments, each with its own job." },
        { t: "list", items: [
          "Deck department \u2014 handles the ship herself: steering, anchoring, boats, and seamanship.",
          "Engineering department \u2014 keeps the engines, generators, and machinery running.",
          "Operations department \u2014 navigation, communications, and sensors.",
          "Supply / logistics \u2014 food, stores, and everything the crew needs to live.",
          "Medical \u2014 the health and welfare of the whole company."
        ] },
        { t: "p", text: "Running a ship around the clock takes more than one crew, so the day is divided into watches. The company is split into watch teams that take turns on duty, so that at any hour of the day or night there are trained people on hand to steer, keep lookout, and respond to anything that happens. The watch system is one of the oldest and most important ideas in seamanship." },
        { t: "note", text: "No job aboard a ship is unimportant. The person who cooks the meals and the person who steers the ship both keep her at sea. A crew that respects every role is a crew that survives." },
        { t: "p", text: "Above all, a ship's company is a family. Sailors look after one another, share the hard jobs, and stand up for their shipmates. Morale \u2014 the spirit of the crew \u2014 is as important as any piece of machinery, because a crew that trusts and supports one another can face almost anything. In the Sea Cadets, your corps is your ship's company: the people you train with, learn from, and rely on. Looking after them is the heart of seamanship." }
      ],
      keyPoints: [
        "A ship is a self-sufficient community that must provide everything the crew needs.",
        "The company is organised into departments: deck, engineering, operations, supply, and medical.",
        "The watch system keeps the ship manned and alert twenty-four hours a day.",
        "Every role matters, and morale \u2014 looking after your shipmates \u2014 is the heart of seamanship."
      ]
    }
  ];

  /* ----------------------------------------------------------
     CONTENT — 6 knowledge checks
     ---------------------------------------------------------- */
  var TASKS = [
    {
      id: "t1", type: "select",
      title: "Port and starboard",
      prompt: "A shipmate calls out 'Look to port!' Which way do you look?",
      options: [
        "To your left, whichever way you happen to be facing.",
        "To the ship's left-hand side when facing the bow \u2014 the side with the red light.",
        "Straight ahead, over the bow.",
        "Behind you, over the stern."
      ],
      answer: 1,
      feedback: "Correct. Port is the left-hand side of the ship when you are facing the bow, and it carries a red navigation light. Because it is fixed to the ship, it means the same thing to everyone aboard."
    },
    {
      id: "t2", type: "select",
      title: "The keel",
      prompt: "What is the keel of a ship?",
      options: [
        "The flat deck you walk on.",
        "The strong backbone running along the bottom of the hull.",
        "The railing around the edge of the deck.",
        "The tall mast that carries the flags."
      ],
      answer: 1,
      feedback: "Correct. The keel is the backbone that runs along the bottom of the hull from bow to stern. It gives the ship strength and helps her stay upright."
    },
    {
      id: "t3", type: "select",
      title: "Rank and rate",
      prompt: "What is the difference between a rank and a rate?",
      options: [
        "They mean exactly the same thing.",
        "A rank is a level of authority; a rate is a trade or skill.",
        "A rate is always more senior than a rank.",
        "Ranks are only held by officers."
      ],
      answer: 1,
      feedback: "Correct. A rank is a level of authority \u2014 how senior you are. A rate is a trade or skill \u2014 the job you are trained to do, such as boatswain or gunner."
    },
    {
      id: "t4", type: "select",
      title: "The quarterdeck custom",
      prompt: "When a cadet steps onto a ship's quarterdeck, what is the custom?",
      options: [
        "Walk straight to their station without stopping.",
        "Salute the ensign and request permission to come aboard.",
        "Shake hands with the captain.",
        "Nothing \u2014 a quarterdeck is just an ordinary deck."
      ],
      answer: 1,
      feedback: "Correct. The quarterdeck is the ceremonial heart of a ship. You salute the ensign and ask permission before stepping aboard \u2014 a mark of respect for the flag and the ship."
    },
    {
      id: "t5", type: "select",
      title: "The Colours ceremony",
      prompt: "What happens at 'Colours'?",
      options: [
        "The crew gathers for breakfast.",
        "The national flag is hoisted in the morning and the ship comes to attention.",
        "The ship's bell is rung to end the working day.",
        "The captain inspects the galley."
      ],
      answer: 1,
      feedback: "Correct. Colours is the morning ceremony when the national flag is hoisted and the ship's company comes to attention. The evening ceremony, when the flag is lowered, is called Sunset."
    },
    {
      id: "t6", type: "type",
      title: "Name the crew",
      prompt: "Type the two-word term for the whole crew of a ship \u2014 the team that runs the vessel together.",
      accept: ["ship's company", "ships company", "ship company", "ship's complement", "company"],
      feedback: "Correct. The whole crew of a ship is called the ship's company \u2014 a self-sufficient community that runs the vessel together, twenty-four hours a day."
    }
  ];

  /* ----------------------------------------------------------
     STATE
     ---------------------------------------------------------- */
  var state = {
    chapters: store.get("chapters", []),
    tasks: store.get("tasks", []),
    badge: store.get("badge", false),
    bestStreak: store.get("bestStreak", 0)
  };
  function saveState() {
    store.set("chapters", state.chapters);
    store.set("tasks", state.tasks);
    store.set("badge", state.badge);
    store.set("bestStreak", state.bestStreak);
  }

  var XP_PER_CHAPTER = 25, XP_PER_TASK = 30, XP_BADGE = 100;
  function totalXP() {
    return state.chapters.length * XP_PER_CHAPTER + state.tasks.length * XP_PER_TASK + (state.badge ? XP_BADGE : 0);
  }
  function maxXP() { return CHAPTERS.length * XP_PER_CHAPTER + TASKS.length * XP_PER_TASK + XP_BADGE; }

  /* ----------------------------------------------------------
     DECK ORIENTATION TRAINER
     ---------------------------------------------------------- */
  var ZONES = {
    bow:       { label: "Bow",       hint: "the front of the ship",       lx: 0,   ly: -70 },
    stern:     { label: "Stern",     hint: "the back of the ship",        lx: 0,   ly: 76 },
    port:      { label: "Port",      hint: "the left side (red light)",   lx: -30, ly: 0 },
    starboard: { label: "Starboard", hint: "the right side (green light)", lx: 30, ly: 0 }
  };
  var ZONE_KEYS = ["bow", "stern", "port", "starboard"];

  var drill = {
    heading: 0,          // degrees, ship rotation
    target: "bow",       // zone the cadet must click
    score: 0,
    streak: 0,
    bestStreak: store.get("bestStreak", 0),
    attempts: 0,
    showLabels: false,
    flashZone: null,
    flashT: 0,
    t: 0,
    locked: false
  };

  var shipCanvas = document.getElementById("shipCanvas");
  var shipView = null;

  function randHeading() { return Math.round((Math.random() * 24)) * 15 % 360; }
  function pickTarget() { return ZONE_KEYS[Math.floor(Math.random() * ZONE_KEYS.length)]; }

  function newDrill() {
    drill.heading = randHeading();
    drill.target = pickTarget();
    drill.flashZone = null;
    drill.locked = false;
    updateDrillHUD();
  }

  function updateDrillHUD() {
    var t = document.getElementById("hudTask");
    var s = document.getElementById("hudScore");
    var st = document.getElementById("hudStreak");
    if (t) t.innerHTML = tr("Click: ") + "<b>" + CH.esc(tr(ZONES[drill.target].label)) + "</b>";
    if (s) s.innerHTML = tr("Score ") + "<b>" + drill.score + "</b> / " + drill.attempts;
    if (st) st.innerHTML = tr("Streak ") + "<b>" + drill.streak + "</b> \u00b7 " + tr("Best ") + drill.bestStreak;
  }

  function setFeedback(msg, cls) {
    var fb = document.getElementById("shipFeedback");
    if (!fb) return;
    fb.className = "ship-sim-feedback" + (cls ? " " + cls : "");
    fb.textContent = msg;
  }

  /* --- geometry: convert a canvas point to ship-local coords --- */
  function shipGeom(W, H) {
    var cx = W * 0.5, cy = H * 0.5;
    var S = Math.min(H * 0.0034, W * 0.0075) * 0.84;
    return { cx: cx, cy: cy, S: S };
  }
  function localToWorld(lx, ly, g) {
    var h = drill.heading * Math.PI / 180;
    var x = lx * g.S, y = ly * g.S;
    return {
      x: g.cx + x * Math.cos(h) - y * Math.sin(h),
      y: g.cy + x * Math.sin(h) + y * Math.cos(h)
    };
  }
  function worldToLocal(px, py, g) {
    var h = drill.heading * Math.PI / 180;
    var dx = px - g.cx, dy = py - g.cy;
    var lx = (dx * Math.cos(h) + dy * Math.sin(h)) / g.S;
    var ly = (-dx * Math.sin(h) + dy * Math.cos(h)) / g.S;
    return { lx: lx, ly: ly };
  }
  function zoneAt(lx, ly) {
    if (Math.abs(lx) > 42 || Math.abs(ly) > 104) return null; // off the ship
    if (ly < -34) return "bow";
    if (ly > 34) return "stern";
    return lx < 0 ? "port" : "starboard";
  }

  function onShipClick(e) {
    if (!shipView || drill.locked) return;
    var rect = shipCanvas.getBoundingClientRect();
    var px = (e.clientX - rect.left) / rect.width * shipView.width;
    var py = (e.clientY - rect.top) / rect.height * shipView.height;
    var g = shipGeom(shipView.width, shipView.height);
    var p = worldToLocal(px, py, g);
    var zone = zoneAt(p.lx, p.ly);
    if (!zone) { setFeedback(tr("Click on the ship itself \u2014 try again."), "warn"); return; }

    drill.attempts++;
    if (zone === drill.target) {
      drill.score++;
      drill.streak++;
      if (drill.streak > drill.bestStreak) { drill.bestStreak = drill.streak; store.set("bestStreak", drill.bestStreak); }
      CH.audio.correct();
      setFeedback(tr("Correct \u2014 ") + tr(ZONES[zone].label) + " (" + tr(ZONES[zone].hint) + ").", "good");
      drill.locked = true;
      updateDrillHUD();
      setTimeout(function () { newDrill(); setFeedback(tr("New heading \u2014 identify the next part."), ""); }, 850);
    } else {
      drill.streak = 0;
      drill.flashZone = drill.target;
      drill.flashT = 1.6;
      CH.audio.wrong();
      setFeedback(tr("Not quite \u2014 you clicked ") + tr(ZONES[zone].label) + tr(". The correct answer is ") + tr(ZONES[drill.target].label) + " (" + tr(ZONES[drill.target].hint) + ").", "bad");
      updateDrillHUD();
    }
  }

  function drawShip(ctx, W, H, dt) {
    drill.t += dt || 0;
    if (drill.flashT > 0) drill.flashT = Math.max(0, drill.flashT - (dt || 0));
    var g = shipGeom(W, H);

    /* --- water background --- */
    var bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, "#08243a"); bg.addColorStop(1, "#04121e");
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

    /* subtle grid */
    ctx.strokeStyle = "rgba(120,190,220,.06)"; ctx.lineWidth = 1;
    var step = Math.max(44, W / 18);
    for (var x = 0; x <= W; x += step) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
    for (var y = 0; y <= H; y += step) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

    /* --- ship (rotated) --- */
    ctx.save();
    ctx.translate(g.cx, g.cy);
    ctx.rotate(drill.heading * Math.PI / 180);
    ctx.scale(g.S, g.S);

    /* hull */
    ctx.beginPath();
    ctx.moveTo(0, -100);
    ctx.quadraticCurveTo(40, -62, 40, 8);
    ctx.quadraticCurveTo(40, 80, 0, 94);
    ctx.quadraticCurveTo(-40, 80, -40, 8);
    ctx.quadraticCurveTo(-40, -62, 0, -100);
    ctx.closePath();
    var hullG = ctx.createLinearGradient(0, -100, 0, 94);
    hullG.addColorStop(0, "#e9f1fb"); hullG.addColorStop(1, "#c3d3e6");
    ctx.fillStyle = hullG; ctx.fill();
    ctx.strokeStyle = "#1b3a63"; ctx.lineWidth = 3; ctx.stroke();

    /* deck planking */
    ctx.strokeStyle = "rgba(27,58,99,.18)"; ctx.lineWidth = 1;
    for (var py = -78; py <= 80; py += 14) {
      ctx.beginPath(); ctx.moveTo(-34, py); ctx.lineTo(34, py); ctx.stroke();
    }
    /* centreline */
    ctx.strokeStyle = "rgba(27,58,99,.35)"; ctx.lineWidth = 1.4;
    ctx.setLineDash([6, 6]);
    ctx.beginPath(); ctx.moveTo(0, -88); ctx.lineTo(0, 86); ctx.stroke();
    ctx.setLineDash([]);

    /* superstructure: bridge block + funnel + mast */
    ctx.fillStyle = "#9fb6d2"; ctx.strokeStyle = "#1b3a63"; ctx.lineWidth = 1.4;
    ctx.fillRect(-22, 34, 44, 30); ctx.strokeRect(-22, 34, 44, 30);   /* bridge */
    ctx.beginPath(); ctx.arc(0, 6, 9, 0, Math.PI * 2); ctx.fillStyle = "#8fa8c6"; ctx.fill(); ctx.stroke(); /* funnel */
    ctx.beginPath(); ctx.arc(0, -40, 4, 0, Math.PI * 2); ctx.fillStyle = "#1b3a63"; ctx.fill(); /* mast */

    /* navigation side lights */
    ctx.beginPath(); ctx.arc(-34, 0, 5, 0, Math.PI * 2); ctx.fillStyle = "#ff5a6e"; ctx.fill();
    ctx.beginPath(); ctx.arc(34, 0, 5, 0, Math.PI * 2); ctx.fillStyle = "#38d97b"; ctx.fill();

    /* flash highlight of the correct zone (on a wrong answer) */
    if (drill.flashT > 0 && drill.flashZone) {
      var a = 0.35 * (0.5 + 0.5 * Math.sin(drill.t * 12));
      ctx.fillStyle = "rgba(255,214,107," + a.toFixed(3) + ")";
      var z = drill.flashZone;
      if (z === "bow") ctx.fillRect(-38, -98, 76, 62);
      else if (z === "stern") ctx.fillRect(-38, 34, 76, 58);
      else if (z === "port") ctx.fillRect(-38, -34, 38, 68);
      else ctx.fillRect(0, -34, 38, 68);
    }
    ctx.restore();

    /* --- labels (drawn upright, in world space) --- */
    if (drill.showLabels) {
      ctx.font = "800 13px Inter, system-ui, sans-serif";
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ZONE_KEYS.forEach(function (k) {
        var z = ZONES[k];
        var w = localToWorld(z.lx, z.ly, g);
        var isTarget = (k === drill.target);
        ctx.fillStyle = isTarget ? "#ffd66b" : "#9fb4d6";
        ctx.fillText(tr(z.label).toUpperCase(), w.x, w.y);
      });
    }

    /* --- compass rose --- */
    drawCompass(ctx, W - 46, 46, 24);
  }

  function drawCompass(ctx, cx, cy, r) {
    ctx.save();
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(4,20,29,.7)"; ctx.fill();
    ctx.strokeStyle = "rgba(150,210,240,.4)"; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, cy - r + 6); ctx.lineTo(cx - 5, cy + 4); ctx.lineTo(cx + 5, cy + 4); ctx.closePath();
    ctx.fillStyle = "#ff5a6e"; ctx.fill();
    ctx.beginPath(); ctx.moveTo(cx, cy + r - 6); ctx.lineTo(cx - 5, cy - 4); ctx.lineTo(cx + 5, cy - 4); ctx.closePath();
    ctx.fillStyle = "#e8f1ff"; ctx.fill();
    ctx.fillStyle = "#9fb4d6"; ctx.font = "800 10px system-ui, sans-serif";
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText("N", cx, cy - r + 2);
    ctx.restore();
  }

  function initTrainer() {
    if (!shipCanvas) return;
    shipView = CH.canvas(shipCanvas, { draw: drawShip });
    shipView.start();
    shipCanvas.addEventListener("click", onShipClick);

    var reveal = document.getElementById("btnReveal");
    var newHead = document.getElementById("btnNewHeading");
    var resetDrill = document.getElementById("btnResetDrill");
    if (reveal) reveal.addEventListener("click", function () {
      drill.showLabels = !drill.showLabels;
      reveal.textContent = drill.showLabels ? tr("Hide labels") : tr("Reveal labels");
      CH.audio.click();
    });
    if (newHead) newHead.addEventListener("click", function () { newDrill(); CH.audio.click(); setFeedback(tr("New heading \u2014 identify the next part."), ""); });
    if (resetDrill) resetDrill.addEventListener("click", function () {
      drill.score = 0; drill.streak = 0; drill.attempts = 0;
      newDrill();
      CH.audio.click();
      setFeedback(tr("Drill reset \u2014 ready when you are, Cadet."), "");
    });

    newDrill();
    setFeedback(tr("Drill set. Click the part of the ship the call sign names \u2014 port shows red, starboard green."), "");
  }

  /* ----------------------------------------------------------
     RENDER: chapters
     ---------------------------------------------------------- */
  function renderChapterList() {
    var list = document.getElementById("chapterList");
    if (!list) return;
    list.innerHTML = CHAPTERS.map(function (c, i) {
      var done = state.chapters.indexOf(c.id) !== -1;
      return '<li><button class="ship-chapter-btn' + (done ? " is-done" : "") + '" type="button" data-chapter="' + c.id + '">' +
        '<span class="num">' + (i + 1) + '</span>' +
        '<span class="txt">' + CH.esc(tr(c.title)) + '</span>' +
        '<span class="tick" aria-hidden="true">\u2713</span></button></li>';
    }).join("");
    list.querySelectorAll("[data-chapter]").forEach(function (btn) {
      btn.addEventListener("click", function () { openChapter(btn.dataset.chapter); });
    });
  }

  function renderReader() {
    var body = document.getElementById("readerBody");
    if (!body) return;
    var next = CHAPTERS.filter(function (c) { return state.chapters.indexOf(c.id) === -1; })[0] || CHAPTERS[0];
    var doneCount = state.chapters.length;
    body.innerHTML =
      '<div class="ship-reader-summary">' +
        '<div class="body">' +
          '<h3>' + CH.esc(doneCount === CHAPTERS.length ? tr("All chapters complete \u2014 well done, Cadet!") : tr("Next chapter: ") + tr(next.title)) + '</h3>' +
          '<p>' + CH.esc(tr(doneCount === CHAPTERS.length ? "You have read every chapter. Finish the knowledge checks below to claim your Sea Cadet badge." : next.subtitle)) + '</p>' +
        '</div>' +
        '<button class="cadet-btn cadet-btn--primary" type="button" id="openNextChapter">\ud83d\udcd6 ' +
          CH.esc(tr(doneCount === CHAPTERS.length ? "Re-read a chapter" : "Open chapter")) + '</button>' +
      '</div>';
    var ob = document.getElementById("openNextChapter");
    if (ob) ob.addEventListener("click", function () { openChapter(next.id); });
  }

  function openChapter(id) {
    var c = CHAPTERS.filter(function (x) { return x.id === id; })[0];
    if (!c) return;
    var dlg = document.getElementById("chapterDialog");
    var title = document.getElementById("chapterDialogTitle");
    var bodyEl = document.getElementById("chapterDialogBody");
    var doneBtn = document.getElementById("chapterDone");
    if (title) title.textContent = tr(c.title);
    if (bodyEl) {
      var html = '<article class="ship-chapter-article"><h3 class="ship-chapter-h">' + CH.esc(tr(c.title)) + '</h3><div class="ship-chapter-body">';
      c.body.forEach(function (b) {
        if (b.t === "p") html += '<p>' + CH.esc(tr(b.text)) + '</p>';
        else if (b.t === "note") html += '<div class="callout">' + CH.esc(tr(b.text)) + '</div>';
        else if (b.t === "warn") html += '<div class="callout warn">' + CH.esc(tr(b.text)) + '</div>';
        else if (b.t === "list") html += '<ul>' + b.items.map(function (it) { return '<li>' + CH.esc(tr(it)) + '</li>'; }).join("") + '</ul>';
        else if (b.t === "table") {
          html += '<table><thead><tr>' + b.head.map(function (h) { return '<th>' + CH.esc(tr(h)) + '</th>'; }).join("") + '</tr></thead><tbody>' +
            b.rows.map(function (r) { return '<tr>' + r.map(function (cell) { return '<td>' + CH.esc(tr(cell)) + '</td>'; }).join("") + '</tr>'; }).join("") + '</tbody></table>';
        }
      });
      html += '</div><div class="ship-keypoints"><h4>' + CH.esc(tr("Key points")) + '</h4><ul>' +
        c.keyPoints.map(function (k) { return '<li>' + CH.esc(tr(k)) + '</li>'; }).join("") + '</ul></div></article>';
      bodyEl.innerHTML = html;
    }
    var isDone = state.chapters.indexOf(id) !== -1;
    if (doneBtn) {
      doneBtn.textContent = isDone ? tr("Chapter complete \u2713") : tr("Mark chapter complete");
      doneBtn.dataset.chapter = id;
      doneBtn.disabled = isDone;
    }
    CH.dialog.open(dlg);
    CH.announce(tr("Opened chapter: ") + tr(c.title));
  }

  function markChapterDone(id) {
    if (state.chapters.indexOf(id) === -1) {
      state.chapters.push(id); saveState();
      CH.audio.correct();
      CH.toast(tr("Chapter complete: ") + tr((CHAPTERS.filter(function (x) { return x.id === id; })[0] || {}).title || ""), "good");
    }
    renderChapterList(); renderReader(); updateProgress();
    var dlg = document.getElementById("chapterDialog");
    if (dlg) CH.dialog.close(dlg);
  }

  /* ----------------------------------------------------------
     RENDER: knowledge checks
     ---------------------------------------------------------- */
  function renderTasks() {
    var wrap = document.getElementById("taskList");
    if (!wrap) return;
    wrap.innerHTML = TASKS.map(function (t, i) {
      var done = state.tasks.indexOf(t.id) !== -1;
      var head = '<div class="ship-task__head"><span class="ship-task__num">' + (i + 1) + '</span><span class="ship-task__title">' + CH.esc(tr(t.title)) + '</span></div>';
      var prompt = '<p class="ship-task__prompt">' + CH.esc(tr(t.prompt)) + '</p>';
      var inner = "";
      if (t.type === "select") {
        inner = '<div class="ship-task__opts">' + t.options.map(function (o, oi) {
          return '<button class="ship-opt" type="button" data-task="' + t.id + '" data-opt="' + oi + '">' + CH.esc(tr(o)) + '</button>';
        }).join("") + '</div>';
      } else {
        inner = '<div class="ship-task__input"><input class="cadet-input" type="text" data-input="' + t.id + '" placeholder="' + CH.esc(tr("Type your answer")) + '" aria-label="' + CH.esc(tr(t.title)) + '" /><button class="cadet-btn cadet-btn--primary cadet-btn--sm" type="button" data-check="' + t.id + '">' + CH.esc(tr("Check")) + '</button></div>';
      }
      var fb = '<p class="ship-task__fb" data-fb="' + t.id + '"></p>';
      return '<div class="ship-task' + (done ? " is-done" : "") + '" data-taskwrap="' + t.id + '">' + head + prompt + inner + fb + '</div>';
    }).join("");

    wrap.querySelectorAll("[data-opt]").forEach(function (btn) {
      btn.addEventListener("click", function () { answerSelect(btn.dataset.task, Number(btn.dataset.opt)); });
    });
    wrap.querySelectorAll("[data-check]").forEach(function (btn) {
      btn.addEventListener("click", function () { answerType(btn.dataset.check); });
    });
    wrap.querySelectorAll("[data-input]").forEach(function (inp) {
      inp.addEventListener("keydown", function (e) { if (e.key === "Enter") answerType(inp.dataset.input); });
    });
  }

  function taskById(id) { return TASKS.filter(function (t) { return t.id === id; })[0]; }

  function answerSelect(id, opt) {
    var t = taskById(id); if (!t) return;
    var wrapEl = document.querySelector('[data-taskwrap="' + id + '"]');
    var fb = document.querySelector('[data-fb="' + id + '"]');
    wrapEl.querySelectorAll("[data-opt]").forEach(function (b, i) {
      b.classList.remove("correct", "wrong");
      if (i === opt) b.classList.add(opt === t.answer ? "correct" : "wrong");
      if (opt !== t.answer && i === t.answer) b.classList.add("correct");
    });
    var ok = opt === t.answer;
    if (fb) { fb.className = "ship-task__fb " + (ok ? "good" : "bad"); fb.textContent = tr(ok ? t.feedback : "Not quite \u2014 review the chapter and try again."); }
    if (ok) { CH.audio.correct(); completeTask(id); } else { CH.audio.wrong(); }
  }

  function normAnswer(s) {
    return (s || "").toLowerCase().trim()
      .replace(/[\u2018\u2019\u02bc`\u00b4]/g, "'")
      .replace(/\s+/g, " ");
  }
  function answerType(id) {
    var t = taskById(id); if (!t) return;
    var inp = document.querySelector('[data-input="' + id + '"]');
    var fb = document.querySelector('[data-fb="' + id + '"]');
    var val = normAnswer(inp.value);
    var ok = t.accept.some(function (a) {
      a = normAnswer(a);
      return val === a || (a.length > 3 && val.indexOf(a) !== -1);
    });
    if (fb) { fb.className = "ship-task__fb " + (ok ? "good" : "bad"); fb.textContent = tr(ok ? t.feedback : "Not quite \u2014 the answer is the ship's company."); }
    if (ok) { CH.audio.correct(); completeTask(id); } else { CH.audio.wrong(); }
  }

  function completeTask(id) {
    if (state.tasks.indexOf(id) === -1) {
      state.tasks.push(id); saveState();
      var wrapEl = document.querySelector('[data-taskwrap="' + id + '"]');
      if (wrapEl) wrapEl.classList.add("is-done");
      CH.toast(tr("Knowledge check complete \u2713"), "good");
    }
    updateProgress();
  }

  /* ----------------------------------------------------------
     PROGRESS + BADGE
     ---------------------------------------------------------- */
  function updateProgress() {
    var chDone = state.chapters.length, chTotal = CHAPTERS.length;
    var tkDone = state.tasks.length, tkTotal = TASKS.length;
    var pct = Math.round(((chDone / chTotal) * 0.6 + (tkDone / tkTotal) * 0.4) * 100);
    var set = function (id, v) { var e = document.getElementById(id); if (e) e.textContent = v; };
    set("progressCount", chDone); set("progressTotal", chTotal);
    set("taskCount", tkDone); set("taskTotal", tkTotal);
    set("progressPct", pct + "%");
    set("topXP", totalXP());
    set("topBadges", state.badge ? 1 : 0);
    var pb = document.getElementById("progressBar"); if (pb) pb.style.width = pct + "%";
    var tb = document.getElementById("taskBar"); if (tb) tb.style.width = (tkDone / tkTotal) * 100 + "%";
    var xpPill = document.getElementById("xpPill"); if (xpPill) xpPill.textContent = totalXP() + " / " + maxXP() + " XP";
    var rank = document.getElementById("rankChip");
    if (rank) rank.textContent = tr(totalXP() >= 300 ? "Petty Officer" : totalXP() >= 180 ? "Leading Cadet" : "Able Cadet");

    var ready = chDone === chTotal && tkDone === tkTotal;
    var claim = document.getElementById("claimBadge");
    var earn = document.querySelector(".ship-earn");
    if (claim) claim.disabled = !ready || state.badge;
    if (earn) earn.classList.toggle("is-ready", ready && !state.badge);
    if (state.badge && claim) claim.innerHTML = "\ud83c\udfc5 <span>" + CH.esc(tr("Sea Cadet Badge earned \u2713")) + "</span>";
  }

  function claimBadge() {
    if (state.badge) return;
    state.badge = true; saveState();
    CH.audio.win();

    /* reflect on the Phase 2 sea map (id 301) */
    try {
      var key = "cadetMapDemoSeaYear2Completed";
      var arr = JSON.parse(localStorage.getItem(key) || "[]");
      if (arr.indexOf(301) === -1) { arr.push(301); localStorage.setItem(key, JSON.stringify(arr)); }
    } catch (e) {}

    /* HQ Mail confirmation (Phase 2 badge) */
    try {
      if (window.CadetHQ && typeof window.CadetHQ.notifyBadge === "function") {
        window.CadetHQ.notifyBadge({
          id: 301,
          title: "Seamanship & Maritime Foundations",
          file: "badge_15_sea_program.png",
          total: 12,
          earnedCount: 1,
          namespace: "Phase 2 \u00b7 Sea Cadet"
        });
      }
    } catch (e) {}

    updateProgress();
    showBadgeDialog();
  }

  function showBadgeDialog() {
    var dlg = document.getElementById("badgeDialog");
    var body = document.getElementById("badgeDialogBody");
    if (body) {
      body.innerHTML =
        '<div class="ship-badge-win">' +
          '<img src="assets/badges/badge_15_sea_program.png" width="140" height="140" alt="' + CH.esc(tr("Seamanship & Maritime Foundations badge")) + '" />' +
          '<h3>' + CH.esc(tr("Seamanship & Maritime Foundations \u2014 Badge Earned")) + '</h3>' +
          '<p>' + CH.esc(tr("Outstanding work, Cadet. You have completed all 7 chapters and all 6 knowledge checks of the Phase 2 Seamanship & Maritime Foundations module. A confirmation has been sent to your unit email and mirrored in your HQ Mail inbox.")) + '</p>' +
        '</div>';
    }
    CH.dialog.open(dlg);
  }

  /* ----------------------------------------------------------
     INIT
     ---------------------------------------------------------- */
  function resetModule() {
    state.chapters = []; state.tasks = []; state.badge = false;
    saveState();
    renderChapterList(); renderReader(); renderTasks(); updateProgress();
    CH.toast(tr("Seamanship module reset. Start again, Cadet."), "", "\u21ba");
  }

  CH.ready(function () {
    /* i18n: translate content arrays in place (FR when active).
       NOTE: the type-in task's `accept` list is matched against the cadet's
       typed answer, so it must accept BOTH the English and the translated
       (French) spellings. We snapshot the English answers first, then merge
       the translated versions back in after trMutate runs. */
    var acceptEn = {};
    TASKS.forEach(function (t) { if (t.accept) acceptEn[t.id] = t.accept.slice(); });
    if (typeof window.trMutate === "function") {
      try { window.trMutate(CHAPTERS); } catch (e) {}
      try { window.trMutate(TASKS); } catch (e) {}
      try { window.trMutate(ZONES); } catch (e) {}
    }
    TASKS.forEach(function (t) {
      if (t.accept && acceptEn[t.id]) {
        acceptEn[t.id].forEach(function (a) { if (t.accept.indexOf(a) === -1) t.accept.push(a); });
      }
    });

    renderChapterList();
    renderReader();
    renderTasks();
    updateProgress();
    initTrainer();

    var doneBtn = document.getElementById("chapterDone");
    if (doneBtn) doneBtn.addEventListener("click", function () { markChapterDone(doneBtn.dataset.chapter); });
    var claim = document.getElementById("claimBadge");
    if (claim) claim.addEventListener("click", claimBadge);
    var reset = document.getElementById("resetModule");
    if (reset) reset.addEventListener("click", resetModule);

    /* responsive canvas */
    var rt = null;
    window.addEventListener("resize", function () {
      if (rt) clearTimeout(rt);
      rt = setTimeout(function () { if (shipView) shipView.resize(); }, 120);
    });
  });
})();
