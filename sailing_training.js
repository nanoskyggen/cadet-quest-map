/* ============================================================
   SAILING FUNDAMENTALS — sailing_training.js
   Phase 2 Sea Cadet module (308). Built on the HTML5 Cadet Shell.
   Chapters + interactive Points-of-Sail canvas simulator +
   practical checks + badge award (HQ Mail confirmation).
   ============================================================ */
(function () {
  "use strict";

  var tr = (typeof window.tr === "function") ? window.tr : function (s) { return s; };
  var CH = window.CadetHTML5;
  var store = CH.store("sailingFundamentals");

  /* ----------------------------------------------------------
     CONTENT — 7 chapters
     body blocks: {t:'p'|'note'|'warn'|'list', text, items}
     ---------------------------------------------------------- */
  var CHAPTERS = [
    {
      id: "c1",
      title: "How a Sailboat Sails",
      subtitle: "Lift, the aerofoil, and the keel — why a boat can sail toward the wind.",
      body: [
        { t: "p", text: "A sail is not a parachute. It is an aerofoil — a curved surface, exactly like an aircraft wing stood on its end. When wind flows across the sail, air travels faster over the curved leeward (outer) side than over the flatter windward (inner) side. Faster air means lower pressure, so the higher pressure on the windward side pushes the sail, and the sail pulls the boat forward." },
        { t: "note", text: "The driving force has two parts: lift, which acts across the airflow, and drag, which acts along it. Together they make the sail pull." },
        { t: "p", text: "If the wind simply pushed the boat downwind, no boat could ever sail toward the wind. The secret is the keel or centreboard. It is a large vertical blade under the hull that resists sideways motion (called leeway). Because the boat cannot slide sideways easily, the sideways part of the sail's force is turned into forward motion. The keel is what lets a sailboat 'sail upwind'." },
        { t: "p", text: "As the boat speeds up, the wind the crew actually feels changes. This is the apparent wind — the combination of the true wind and the wind created by the boat's own motion. Apparent wind always feels stronger and further forward than the true wind, which is why sails are trimmed to the apparent wind, not the true wind." },
        { t: "warn", text: "A boat cannot sail directly into the wind. About 45 degrees either side of the wind is the closest it can point; this dead zone is called the no-go zone or 'in irons'." }
      ],
      keyPoints: [
        "A sail is an aerofoil that generates lift, not a wind catcher.",
        "The keel or centreboard stops sideways drift and turns force into forward drive.",
        "Apparent wind = true wind + boat speed; sails are trimmed to apparent wind.",
        "A boat cannot point closer than about 45 degrees to the wind (the no-go zone)."
      ]
    },
    {
      id: "c2",
      title: "The Five Points of Sail",
      subtitle: "Close-hauled, close reach, beam reach, broad reach, and run.",
      body: [
        { t: "p", text: "A boat's point of sail describes its angle to the wind. There are five you must know, and each one changes how the sails are trimmed and how the boat feels." },
        { t: "list", items: [
          "Close-hauled — about 45 degrees off the wind, the closest you can sail. Sails are sheeted in tight and the boat heels and works hard to windward.",
          "Close reach — about 60 degrees off the wind. Sails eased slightly; a good, powerful course.",
          "Beam reach — about 90 degrees, wind straight across the boat. Often the fastest and most balanced point of sail in a dinghy.",
          "Broad reach — about 135 degrees, wind over the rear quarter. Sails eased well out; fast and comfortable.",
          "Run — about 180 degrees, wind directly astern. Sails eased right out; the boat can be unstable and prone to an accidental gybe."
        ] },
        { t: "note", text: "Sailing 'by the lee' on a run means the wind has crossed to the same side as the boom — a warning sign that an accidental gybe is close." },
        { t: "p", text: "To sail upwind to a destination you cannot reach in one leg, you sail a zig-zag: close-hauled on one tack, tack through the wind, then close-hauled on the other. This is called beating or working to windward." }
      ],
      keyPoints: [
        "The five points of sail: close-hauled, close reach, beam reach, broad reach, run.",
        "Beam reach is usually the fastest point of sail for a dinghy.",
        "On a run the sails are eased fully out and the boat is most at risk of a gybe.",
        "Beating to windward means zig-zagging close-hauled from tack to tack."
      ]
    },
    {
      id: "c3",
      title: "Sail Trim & Telltales",
      subtitle: "Sheeting in and out, reading the wind, and the telltale rule.",
      body: [
        { t: "p", text: "Trimming means adjusting the sail so it works efficiently. The main control is the sheet: pull it in (sheeting in) to bring the sail toward the centreline, or let it out (easing) to let the sail out. A sail that is sheeted too tightly will stall and stop pulling; a sail that is too loose will flap, which is called luffing." },
        { t: "p", text: "Telltales are the small pieces of wool or ribbon sewn onto the sail. They are the crew's window into the airflow. The golden rule is simple: both telltales should stream back smoothly. If the windward telltale lifts or flutters, the sail is starved of air — sheet in a little or head up. If the leeward telltale stalls or curls, the sail is over-sheeted — ease out or bear away." },
        { t: "note", text: "Trim for every point of sail: close-hauled = sheeted in tight; beam reach = about half out; run = eased right out. Match the sail to the angle." },
        { t: "p", text: "Other trim controls include the outhaul (flattens the foot of the sail), the downhaul or cunningham (tensions the luff), and halyard tension (sets how tight the leading edge is). A flatter sail is better in strong wind; a fuller sail gives more power in light air." }
      ],
      keyPoints: [
        "Sheet in to power up, ease out to depower; too tight stalls, too loose luffs.",
        "Both telltales streaming = correct trim.",
        "Windward telltale lifting = sheet in or head up; leeward telltale stalling = ease out or bear away.",
        "Match trim to the point of sail: tight close-hauled, eased on a run."
      ]
    },
    {
      id: "c4",
      title: "Tacking (Coming About)",
      subtitle: "Turning the bow through the wind to change tack.",
      body: [
        { t: "p", text: "Tacking, or coming about, turns the bow of the boat through the wind so the sails cross to the other side. It is how you work upwind. Because the boat must pass through the no-go zone, timing and momentum matter — keep the boat moving so it carries through the turn." },
        { t: "p", text: "The helm pushes the tiller away, toward the sail and the wind. This turns the bow toward the wind. As the bow crosses the eye of the wind the sails flap and then fill on the new side. The crew releases the old jib sheet as it backs, then pulls in the new jib sheet on the other side." },
        { t: "note", text: "Standard commands: helm calls 'Ready about', crew answers 'Ready', helm calls 'Lee-oh' (or 'Tacking') and pushes the tiller away. The crew then swaps the jib sheets as the sails cross." },
        { t: "p", text: "After the tack, the boat is on the opposite tack and you sheet in for close-hauled on the new side. A clean tack is smooth and keeps the boat moving; a slow tack loses speed and can leave you stuck in irons, drifting with flapping sails." }
      ],
      keyPoints: [
        "Tacking turns the bow through the wind to change tack.",
        "Push the tiller away (toward the wind) to turn the bow up.",
        "Commands: 'Ready about' → 'Ready' → 'Lee-oh'; crew swaps the jib sheets.",
        "Keep momentum so the boat carries through the no-go zone."
      ]
    },
    {
      id: "c5",
      title: "Gybing",
      subtitle: "Turning the stern through the wind — and doing it safely.",
      body: [
        { t: "p", text: "A gybe turns the stern of the boat through the wind, changing from one downwind tack to the other. It is the opposite of a tack. The helm pulls the tiller toward them, away from the wind, so the stern swings through and the wind crosses behind the boat." },
        { t: "p", text: "Gybing is the more dangerous manoeuvre because the boom swings across the boat with real force. If the mainsheet is let run, the boom can sweep the crew overboard or break gear. The golden rule is to control the mainsheet: pull the mainsail in toward the centreline first, let the boom cross under control, then ease it out on the new side." },
        { t: "warn", text: "Always shout 'Gybe-oh!' (or 'Ready to gybe') well before the turn so the crew can duck and mind the boom. An uncontrolled gybe in a strong wind can capsize a dinghy." },
        { t: "note", text: "Commands: helm calls 'Ready to gybe', crew answers 'Ready', helm calls 'Gybe-oh', pulls the tiller toward them, and the crew swaps the jib while the main is controlled across." }
      ],
      keyPoints: [
        "Gybing turns the stern through the wind (the opposite of tacking).",
        "Pull the tiller toward you to gybe.",
        "Control the mainsheet so the boom crosses under control.",
        "Always call 'Gybe-oh!' — the boom can sweep the crew overboard."
      ]
    },
    {
      id: "c6",
      title: "Helm & Crew Roles",
      subtitle: "Who does what in a two-person dinghy.",
      body: [
        { t: "p", text: "In a two-person dinghy the two roles are helm and crew. The helm steers with the tiller, calls the manoeuvres, keeps the boat balanced, and watches the wind, the telltales, and other boats. The crew trims the jib and main, hikes out to keep the boat flat, and acts as lookout." },
        { t: "p", text: "Steering is simple once you remember the tiller rule: push the tiller away from you to turn the bow away from you, and pull it toward you to turn the bow toward you. It feels backwards at first — the boat turns opposite to the way you move the tiller." },
        { t: "p", text: "Balance and heel matter as much as steering. The crew sits to windward and hikes out to flatten the boat; a boat that is flat sails faster and points higher. If a gust hits, the helm heads up or eases the sheet while the crew hikes harder. Teamwork, clear calls, and looking after each other are what make a dinghy go fast and stay safe." },
        { t: "note", text: "Good crew communication: the helm calls the manoeuvre, the crew confirms 'Ready', and both keep an eye out for gusts, other boats, and the boom." }
      ],
      keyPoints: [
        "Helm steers, calls manoeuvres, and keeps the boat balanced.",
        "Crew trims the sails, hikes out for balance, and keeps lookout.",
        "Tiller rule: push to turn the bow away, pull to turn the bow toward you.",
        "A flat boat is faster and points higher — hike out and work as a team."
      ]
    },
    {
      id: "c7",
      title: "Safety, Capsize & Recovery",
      subtitle: "PFDs, capsize drill, and staying with the boat.",
      body: [
        { t: "p", text: "Safety starts before you leave the dock: wear a properly fitted personal flotation device (PFD) at all times afloat, check the weather, tell someone your plan, and check your boat and gear. On the water, watch for gusts, keep clear of other craft, and never stand up in a small dinghy." },
        { t: "p", text: "If a dinghy capsizes, the drill is: stay with the boat — never swim away, as the boat is your best liferaft and is far easier to see. Check that your crew is safe and accounted for. Get to the centreboard, climb onto it, and use your weight to right the boat as it comes up into the wind. Then climb back in, bail out the water, check everyone again, and sail on." },
        { t: "warn", text: "Cold water is the real danger. Cold water shock can steal your breath in seconds. Stay with the boat, keep your head out of the water, and get out of the wind as soon as you can." },
        { t: "p", text: "For a man overboard under sail: shout 'Man overboard!', throw flotation, keep the casualty in sight at all times, and sail back on a reach. Approach on a close reach and stop the boat alongside the casualty by heading into the wind and letting the sails luff. Recover the person over the leeward side, low and controlled." }
      ],
      keyPoints: [
        "Wear a fitted PFD, check the weather, and tell someone your plan.",
        "Capsize drill: stay with the boat, check crew, climb the centreboard, right it, bail out.",
        "Cold water shock is the biggest danger — keep your head out of the water.",
        "Man overboard: shout, throw flotation, keep sight, return on a close reach."
      ]
    }
  ];

  /* ----------------------------------------------------------
     CONTENT — 6 practical checks
     ---------------------------------------------------------- */
  var TASKS = [
    {
      id: "t1", type: "select",
      title: "What drives a sailboat forward?",
      prompt: "Your instructor asks what actually pushes a sailboat forward when it is sailing. Which answer is correct?",
      options: [
        "The wind simply pushes the sail from behind like a parachute.",
        "The sail is an aerofoil — airflow across it creates lift, and the keel turns that force into forward drive.",
        "Ocean currents push the hull along.",
        "A hidden motor drives the propeller."
      ],
      answer: 1,
      feedback: "Correct. The sail is an aerofoil generating lift, and the keel or centreboard converts the sideways force into forward motion — that is how a boat sails toward the wind."
    },
    {
      id: "t2", type: "select",
      title: "Name the point of sail",
      prompt: "The wind is blowing straight across the boat, about 90 degrees to your heading. What point of sail are you on?",
      options: ["Close-hauled", "Beam reach", "Broad reach", "Run"],
      answer: 1,
      feedback: "Correct. Wind at about 90 degrees (straight across the boat) is a beam reach — often the fastest point of sail in a dinghy."
    },
    {
      id: "t3", type: "select",
      title: "The tacking helm action",
      prompt: "You are close-hauled and want to tack (come about). Which way do you move the tiller?",
      options: [
        "Pull the tiller toward you to turn the bow through the wind.",
        "Push the tiller away from you, toward the sail and the wind, to turn the bow through the wind.",
        "Hold the tiller still and let the wind turn the boat.",
        "Let go of the tiller and pull the mainsheet."
      ],
      answer: 1,
      feedback: "Correct. To tack you push the tiller away, toward the wind, so the bow turns up and through the eye of the wind. The crew swaps the jib sheets as the sails cross."
    },
    {
      id: "t4", type: "select",
      title: "The gybe warning",
      prompt: "You are about to gybe in a fresh breeze. What must you call first, and why?",
      options: [
        "Nothing — a gybe is silent and safe.",
        "Call 'Gybe-oh!' so the crew can duck, because the boom swings across the boat with force.",
        "Call 'Man overboard!' because someone always falls in.",
        "Call 'Ready about' — it is the same as a tack."
      ],
      answer: 1,
      feedback: "Correct. You always call 'Gybe-oh!' before a gybe so the crew can duck and mind the boom, which sweeps across the boat with real force in a gybe."
    },
    {
      id: "t5", type: "select",
      title: "Reading the telltales",
      prompt: "The windward telltale on your sail is lifting and fluttering. What does this tell you, and what should you do?",
      options: [
        "The sail is over-sheeted — ease the sheet out.",
        "The sail is starved of air — sheet in a little or head up slightly.",
        "The wind has died — stop sailing.",
        "Nothing — telltales are decoration."
      ],
      answer: 1,
      feedback: "Correct. A lifting windward telltale means the airflow is separating because the sail needs more air — sheet in or head up until both telltales stream smoothly."
    },
    {
      id: "t6", type: "type",
      title: "Name the no-go zone",
      prompt: "Type the name of the zone directly into the wind, where a boat cannot sail and the sails luff. (Two words, or the sailing term for being stuck there.)",
      accept: ["no-go", "no go", "no-go zone", "no go zone", "irons", "in irons"],
      feedback: "Correct. Directly into the wind is the no-go zone, and a boat stuck there with flapping sails is said to be 'in irons'."
    }
  ];

  /* ----------------------------------------------------------
     STATE
     ---------------------------------------------------------- */
  var state = {
    chapters: store.get("chapters", []),
    tasks: store.get("tasks", []),
    badge: store.get("badge", false),
    pointsSailed: store.get("pointsSailed", []),
    sim: { wind: 0, heading: 45, trim: 50 }
  };
  function saveState() {
    store.set("chapters", state.chapters);
    store.set("tasks", state.tasks);
    store.set("badge", state.badge);
    store.set("pointsSailed", state.pointsSailed);
  }

  var XP_PER_CHAPTER = 25, XP_PER_TASK = 30, XP_BADGE = 100;
  function totalXP() {
    return state.chapters.length * XP_PER_CHAPTER + state.tasks.length * XP_PER_TASK + (state.badge ? XP_BADGE : 0);
  }
  function maxXP() { return CHAPTERS.length * XP_PER_CHAPTER + TASKS.length * XP_PER_TASK + XP_BADGE; }

  /* ----------------------------------------------------------
     SIMULATOR MATH
     ---------------------------------------------------------- */
  function norm360(d) { return ((d % 360) + 360) % 360; }
  function angDiff(a, b) { var d = Math.abs(norm360(a) - norm360(b)); return d > 180 ? 360 - d : d; }
  function signedRel(windDir, heading) { var d = norm360(windDir - heading); return d > 180 ? d - 360 : d; }

  var POINTS = [
    { key: "irons", min: 0, max: 45, label: "In irons (no-go zone)", opt: null },
    { key: "closehauled", min: 45, max: 60, label: "Close-hauled", opt: 90 },
    { key: "closereach", min: 60, max: 80, label: "Close reach", opt: 72 },
    { key: "beamreach", min: 80, max: 100, label: "Beam reach", opt: 55 },
    { key: "broadreach", min: 100, max: 150, label: "Broad reach", opt: 32 },
    { key: "run", min: 150, max: 180.1, label: "Run", opt: 12 }
  ];
  function pointFor(angle) {
    for (var i = 0; i < POINTS.length; i++) { if (angle >= POINTS[i].min && angle < POINTS[i].max) return POINTS[i]; }
    return POINTS[POINTS.length - 1];
  }

  function simEval() {
    var windAngle = angDiff(state.sim.heading, state.sim.wind);
    var pos = pointFor(windAngle);
    var trim = state.sim.trim;
    var result = { windAngle: windAngle, pos: pos, status: "", cls: "" };
    if (pos.opt == null) {
      result.status = tr("In the no-go zone — sails luff and the boat stalls. Bear away to fill the sails.");
      result.cls = "bad";
      return result;
    }
    var diff = trim - pos.opt;
    if (Math.abs(diff) <= 12) {
      result.status = tr("Well trimmed ✓ — the sail is drawing on a ") + tr(pos.label) + ".";
      result.cls = "good";
      result.good = true;
    } else if (diff > 12) {
      result.status = tr("Over-sheeted — the sail is stalled. Ease the sheet out for a ") + tr(pos.label) + ".";
      result.cls = "warn";
    } else {
      result.status = tr("Under-sheeted — the sail is luffing. Sheet in for a ") + tr(pos.label) + ".";
      result.cls = "warn";
    }
    return result;
  }

  /* ----------------------------------------------------------
     CANVAS DRAW
     ---------------------------------------------------------- */
  var simCanvas = document.getElementById("simCanvas");
  var sim = null;
  var waveT = 0;

  function drawSim(ctx, W, H, dt) {
    waveT += dt || 0;
    var cx = W * 0.5, cy = H * 0.54;
    var R = Math.min(W, H) * 0.30;

    /* water */
    var g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, "#06202e"); g.addColorStop(1, "#041521");
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);

    /* gentle wave lines */
    ctx.strokeStyle = "rgba(94,234,212,0.06)"; ctx.lineWidth = 1;
    for (var i = 0; i < 7; i++) {
      var yy = 24 + i * (H / 7);
      ctx.beginPath();
      for (var x = 0; x <= W; x += 12) {
        var y = yy + Math.sin((x * 0.02) + waveT * 0.8 + i) * 3;
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    var windDir = state.sim.wind;
    var heading = state.sim.heading;
    var windAngle = angDiff(heading, windDir);
    var pos = pointFor(windAngle);

    /* compass ring */
    ctx.save();
    ctx.translate(cx, cy);
    ctx.strokeStyle = "rgba(174,191,214,0.18)"; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(0, 0, R, 0, Math.PI * 2); ctx.stroke();

    /* no-go zone wedge (centered on wind source) */
    var wRad = (windDir - 90) * Math.PI / 180;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, R, wRad - Math.PI / 4, wRad + Math.PI / 4);
    ctx.closePath();
    ctx.fillStyle = "rgba(255,90,110,0.16)";
    ctx.fill();
    ctx.strokeStyle = "rgba(255,90,110,0.35)"; ctx.lineWidth = 1; ctx.stroke();

    /* compass ticks + N */
    ctx.fillStyle = "rgba(174,191,214,0.7)"; ctx.font = "700 12px Inter, sans-serif";
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ["N", "E", "S", "W"].forEach(function (lab, idx) {
      var a = (idx * 90 - 90) * Math.PI / 180;
      ctx.fillText(lab, Math.cos(a) * (R + 14), Math.sin(a) * (R + 14));
    });

    /* wind arrows (pointing TO where wind blows) */
    var toRad = (windDir + 180 - 90) * Math.PI / 180;
    for (var k = 1; k <= 3; k++) {
      var rr = R * (0.55 + k * 0.16);
      var ax = Math.cos(toRad) * rr, ay = Math.sin(toRad) * rr;
      drawArrow(ctx, ax, ay, toRad, 26, "rgba(94,234,212,0.85)");
    }
    ctx.fillStyle = "rgba(94,234,212,0.95)"; ctx.font = "800 12px Inter, sans-serif";
    ctx.fillText("WIND", Math.cos(toRad) * (R + 2), Math.sin(toRad) * (R + 2));

    /* boat */
    ctx.save();
    ctx.rotate(heading * Math.PI / 180);
    drawBoat(ctx, windDir, heading, state.sim.trim);
    ctx.restore();
    ctx.restore();

    /* HUD text handled outside via DOM */
  }

  function drawArrow(ctx, x, y, ang, len, color) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(ang);
    ctx.strokeStyle = color; ctx.lineWidth = 2.4; ctx.lineCap = "round";
    ctx.beginPath(); ctx.moveTo(-len / 2, 0); ctx.lineTo(len / 2, 0); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(len / 2, 0); ctx.lineTo(len / 2 - 8, -5); ctx.lineTo(len / 2 - 8, 5); ctx.closePath();
    ctx.fillStyle = color; ctx.fill();
    ctx.restore();
  }

  function drawBoat(ctx, windDir, heading, trim) {
    var rel = signedRel(windDir, heading); /* + = wind from starboard */
    var boomSide = rel > 0 ? -1 : 1;        /* boom to opposite side of wind */
    var boomAngle = (1 - trim / 100) * 82;  /* degrees from centreline */
    var s = boomSide;

    /* hull */
    ctx.beginPath();
    ctx.moveTo(0, -46);
    ctx.quadraticCurveTo(20, -8, 15, 34);
    ctx.quadraticCurveTo(0, 46, -15, 34);
    ctx.quadraticCurveTo(-20, -8, 0, -46);
    ctx.closePath();
    ctx.fillStyle = "#e8f1ff"; ctx.fill();
    ctx.strokeStyle = "#2dd4bf"; ctx.lineWidth = 2; ctx.stroke();
    /* centreline */
    ctx.strokeStyle = "rgba(16,35,61,0.25)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, -40); ctx.lineTo(0, 40); ctx.stroke();

    /* boom + mainsail */
    var bRad = (boomAngle * Math.PI / 180) * s;
    var bx = Math.sin(bRad) * 40, by = Math.cos(bRad) * 40;
    /* sail (triangle mast->boom end->clew) */
    ctx.beginPath();
    ctx.moveTo(0, -14);              /* mast top area */
    ctx.lineTo(0, 6);                /* tack */
    ctx.lineTo(bx, 6 + by);          /* clew */
    ctx.closePath();
    ctx.fillStyle = "rgba(255,214,107,0.85)";
    ctx.fill();
    ctx.strokeStyle = "#c79a3a"; ctx.lineWidth = 1.5; ctx.stroke();
    /* boom */
    ctx.strokeStyle = "#8a6b2a"; ctx.lineWidth = 3; ctx.lineCap = "round";
    ctx.beginPath(); ctx.moveTo(0, 6); ctx.lineTo(bx, 6 + by); ctx.stroke();

    /* telltales near the luff */
    var ttx = Math.sin(bRad) * 12, tty = 6 + Math.cos(bRad) * 12;
    ctx.strokeStyle = "rgba(56,217,123,0.95)"; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(ttx * 0.4, -6); ctx.lineTo(ttx * 0.4 - 6, -6); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(ttx * 0.4, -2); ctx.lineTo(ttx * 0.4 - 6, -2); ctx.stroke();

    /* mast dot */
    ctx.beginPath(); ctx.arc(0, -14, 3, 0, Math.PI * 2); ctx.fillStyle = "#10233d"; ctx.fill();
  }

  function updateSimHUD() {
    var r = simEval();
    var hudPoint = document.getElementById("hudPoint");
    var hudAngle = document.getElementById("hudAngle");
    var hudTrim = document.getElementById("hudTrim");
    var fb = document.getElementById("simFeedback");
    var rel = signedRel(state.sim.wind, state.sim.heading);
    var tack = rel > 0 ? "Starboard tack" : "Port tack";
    if (r.pos.key === "irons") tack = "In irons";
    if (hudPoint) hudPoint.innerHTML = tr("Point of sail: ") + "<b>" + tr(r.pos.label) + "</b>";
    if (hudAngle) hudAngle.innerHTML = tr("Wind angle: ") + "<b>" + Math.round(r.windAngle) + "°</b> · " + tr(tack);
    if (hudTrim) hudTrim.innerHTML = tr("Trim: ") + "<b>" + Math.round(state.sim.trim) + "%</b> " + (r.pos.opt != null ? tr("(target ") + r.pos.opt + "%)" : "");
    if (fb) { fb.className = "sail-sim-feedback " + r.cls; fb.textContent = tr(r.status); }

    /* record points of sail successfully sailed */
    if (r.good && state.pointsSailed.indexOf(r.pos.key) === -1) {
      state.pointsSailed.push(r.pos.key);
      store.set("pointsSailed", state.pointsSailed);
      if (state.pointsSailed.length === 5) {
        CH.toast(tr("You have sailed all five points of sail! ⛵"), "gold", "⛵");
      }
    }
  }

  function setSim(partial) {
    Object.keys(partial).forEach(function (k) { state.sim[k] = partial[k]; });
    var wr = document.getElementById("windRange"); if (wr) wr.value = state.sim.wind;
    var hr = document.getElementById("headRange"); if (hr) hr.value = state.sim.heading;
    var trr = document.getElementById("trimRange"); if (trr) trr.value = state.sim.trim;
    updateSimHUD();
  }

  function initSimulator() {
    if (!simCanvas) return;
    sim = CH.canvas(simCanvas, { draw: drawSim });
    sim.start();

    var wr = document.getElementById("windRange");
    var hr = document.getElementById("headRange");
    var trr = document.getElementById("trimRange");
    if (wr) wr.addEventListener("input", function () { state.sim.wind = Number(wr.value); updateSimHUD(); });
    if (hr) hr.addEventListener("input", function () { state.sim.heading = Number(hr.value); updateSimHUD(); });
    if (trr) trr.addEventListener("input", function () { state.sim.trim = Number(trr.value); updateSimHUD(); });

    var headUp = document.getElementById("btnHeadUp");
    var bearAway = document.getElementById("btnBearAway");
    var tackBtn = document.getElementById("btnTack");
    var gybeBtn = document.getElementById("btnGybe");
    var autoTrim = document.getElementById("btnAutoTrim");
    if (headUp) headUp.addEventListener("click", function () { setSim({ heading: norm360(state.sim.heading - 10) }); CH.audio.click(); });
    if (bearAway) bearAway.addEventListener("click", function () { setSim({ heading: norm360(state.sim.heading + 10) }); CH.audio.click(); });
    if (tackBtn) tackBtn.addEventListener("click", function () {
      /* turn bow through the wind: rotate heading toward/through windDir by ~90° */
      var target = norm360(state.sim.wind + 45);
      var diff = signedRel(target, state.sim.heading);
      setSim({ heading: norm360(state.sim.heading + (diff > 0 ? 1 : -1) * Math.min(Math.abs(diff), 90)) });
      CH.audio.click(); CH.toast(tr("Tack — bow through the wind. Crew swaps the jib sheets."), "", "⛵");
    });
    if (gybeBtn) gybeBtn.addEventListener("click", function () {
      var target = norm360(state.sim.wind + 135);
      var diff = signedRel(target, state.sim.heading);
      setSim({ heading: norm360(state.sim.heading + (diff > 0 ? 1 : -1) * Math.min(Math.abs(diff), 90)) });
      CH.audio.click(); CH.toast(tr("Gybe-oh! — stern through the wind. Control the mainsheet."), "", "⛵");
    });
    if (autoTrim) autoTrim.addEventListener("click", function () {
      var r = simEval();
      if (r.pos.opt == null) { CH.toast(tr("Bear away out of the no-go zone first."), "bad"); return; }
      setSim({ trim: r.pos.opt });
      CH.audio.correct();
      CH.toast(tr("Sail trimmed for a ") + tr(r.pos.label.toLowerCase()) + " ✓", "good");
    });

    setSim({});
  }

  /* ----------------------------------------------------------
     RENDER: chapters
     ---------------------------------------------------------- */
  function renderChapterList() {
    var list = document.getElementById("chapterList");
    if (!list) return;
    list.innerHTML = CHAPTERS.map(function (c, i) {
      var done = state.chapters.indexOf(c.id) !== -1;
      return '<li><button class="sail-chapter-btn' + (done ? " is-done" : "") + '" type="button" data-chapter="' + c.id + '">' +
        '<span class="num">' + (i + 1) + '</span>' +
        '<span class="txt">' + CH.esc(tr(c.title)) + '</span>' +
        '<span class="tick" aria-hidden="true">✓</span></button></li>';
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
      '<div class="sail-reader-summary">' +
        '<div class="body">' +
          '<h3>' + CH.esc(doneCount === CHAPTERS.length ? tr("All chapters complete — well sailed!") : tr("Next chapter: ") + tr(next.title)) + '</h3>' +
          '<p>' + CH.esc(tr(doneCount === CHAPTERS.length ? "You have read every chapter. Finish the practical checks below to claim your Sailing badge." : next.subtitle)) + '</p>' +
        '</div>' +
        '<button class="cadet-btn cadet-btn--primary" type="button" id="openNextChapter">📖 ' +
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
      var html = '<article class="sail-chapter-article"><h3 class="sail-chapter-h">' + CH.esc(tr(c.title)) + '</h3><div class="sail-chapter-body">';
      c.body.forEach(function (b) {
        if (b.t === "p") html += '<p>' + CH.esc(tr(b.text)) + '</p>';
        else if (b.t === "note") html += '<div class="callout">' + CH.esc(tr(b.text)) + '</div>';
        else if (b.t === "warn") html += '<div class="callout warn">' + CH.esc(tr(b.text)) + '</div>';
        else if (b.t === "list") html += '<ul>' + b.items.map(function (it) { return '<li>' + CH.esc(tr(it)) + '</li>'; }).join("") + '</ul>';
      });
      html += '</div><div class="sail-keypoints"><h4>' + CH.esc(tr("Key points")) + '</h4><ul>' +
        c.keyPoints.map(function (k) { return '<li>' + CH.esc(tr(k)) + '</li>'; }).join("") + '</ul></div></article>';
      bodyEl.innerHTML = html;
    }
    var isDone = state.chapters.indexOf(id) !== -1;
    if (doneBtn) {
      doneBtn.textContent = isDone ? tr("Chapter complete ✓") : tr("Mark chapter complete");
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
     RENDER: practical checks
     ---------------------------------------------------------- */
  function renderTasks() {
    var wrap = document.getElementById("taskList");
    if (!wrap) return;
    wrap.innerHTML = TASKS.map(function (t, i) {
      var done = state.tasks.indexOf(t.id) !== -1;
      var head = '<div class="sail-task__head"><span class="sail-task__num">' + (i + 1) + '</span><span class="sail-task__title">' + CH.esc(tr(t.title)) + '</span></div>';
      var prompt = '<p class="sail-task__prompt">' + CH.esc(tr(t.prompt)) + '</p>';
      var inner = "";
      if (t.type === "select") {
        inner = '<div class="sail-task__opts">' + t.options.map(function (o, oi) {
          return '<button class="sail-opt" type="button" data-task="' + t.id + '" data-opt="' + oi + '">' + CH.esc(tr(o)) + '</button>';
        }).join("") + '</div>';
      } else {
        inner = '<div class="sail-task__input"><input class="cadet-input" type="text" data-input="' + t.id + '" placeholder="' + CH.esc(tr("Type your answer")) + '" aria-label="' + CH.esc(tr(t.title)) + '" /><button class="cadet-btn cadet-btn--primary cadet-btn--sm" type="button" data-check="' + t.id + '">' + CH.esc(tr("Check")) + '</button></div>';
      }
      var fb = '<p class="sail-task__fb" data-fb="' + t.id + '"></p>';
      return '<div class="sail-task' + (done ? " is-done" : "") + '" data-taskwrap="' + t.id + '">' + head + prompt + inner + fb + '</div>';
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
    if (fb) { fb.className = "sail-task__fb " + (ok ? "good" : "bad"); fb.textContent = tr(ok ? t.feedback : "Not quite — review the chapter and try again."); }
    if (ok) { CH.audio.correct(); completeTask(id); } else { CH.audio.wrong(); }
  }

  function answerType(id) {
    var t = taskById(id); if (!t) return;
    var inp = document.querySelector('[data-input="' + id + '"]');
    var fb = document.querySelector('[data-fb="' + id + '"]');
    var val = (inp.value || "").trim().toLowerCase();
    var ok = t.accept.some(function (a) { return val === a || val.indexOf(a) !== -1; });
    if (fb) { fb.className = "sail-task__fb " + (ok ? "good" : "bad"); fb.textContent = tr(ok ? t.feedback : "Not quite — the answer is the no-go zone (or 'in irons')."); }
    if (ok) { CH.audio.correct(); completeTask(id); } else { CH.audio.wrong(); }
  }

  function completeTask(id) {
    if (state.tasks.indexOf(id) === -1) {
      state.tasks.push(id); saveState();
      var wrapEl = document.querySelector('[data-taskwrap="' + id + '"]');
      if (wrapEl) wrapEl.classList.add("is-done");
      CH.toast(tr("Practical check complete ✓"), "good");
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
    if (rank) rank.textContent = tr(totalXP() >= 300 ? "Sailing Skipper" : totalXP() >= 180 ? "Helm Hand" : "Crew");

    var ready = chDone === chTotal && tkDone === tkTotal;
    var claim = document.getElementById("claimBadge");
    var earn = document.querySelector(".sail-earn");
    if (claim) claim.disabled = !ready || state.badge;
    if (earn) earn.classList.toggle("is-ready", ready && !state.badge);
    if (state.badge && claim) claim.innerHTML = "🏅 <span>" + CH.esc(tr("Sailing Badge earned ✓")) + "</span>";
  }

  function claimBadge() {
    if (state.badge) return;
    state.badge = true; saveState();
    CH.audio.win();

    /* reflect on the Phase 2 sea map (id 308) */
    try {
      var key = "cadetMapDemoSeaYear2Completed";
      var arr = JSON.parse(localStorage.getItem(key) || "[]");
      if (arr.indexOf(308) === -1) { arr.push(308); localStorage.setItem(key, JSON.stringify(arr)); }
    } catch (e) {}

    /* HQ Mail confirmation (Phase 2 badge) */
    try {
      if (window.CadetHQ && typeof window.CadetHQ.notifyBadge === "function") {
        window.CadetHQ.notifyBadge({
          id: 308,
          title: "Sailing Fundamentals",
          file: "badge_15_sea_program.png",
          total: 12,
          earnedCount: 1,
          namespace: "Phase 2 · Sea Cadet"
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
        '<div class="sail-badge-win">' +
          '<img src="assets/badges/badge_15_sea_program.png" width="140" height="140" alt="' + CH.esc(tr("Sailing Fundamentals badge")) + '" />' +
          '<h3>' + CH.esc(tr("Sailing Fundamentals — Badge Earned")) + '</h3>' +
          '<p>' + CH.esc(tr("Outstanding work, Cadet. You have completed all 7 chapters and all 6 practical checks of the Phase 2 Sailing Fundamentals module. A confirmation has been sent to your unit email and mirrored in your HQ Mail inbox.")) + '</p>' +
        '</div>';
    }
    CH.dialog.open(dlg);
  }

  /* ----------------------------------------------------------
     INIT
     ---------------------------------------------------------- */
  function resetModule() {
    state.chapters = []; state.tasks = []; state.badge = false; state.pointsSailed = [];
    saveState();
    renderChapterList(); renderReader(); renderTasks(); updateProgress();
    CH.toast(tr("Sailing module reset. Fair winds — start again."), "", "↺");
  }

  CH.ready(function () {
    /* i18n: translate content arrays in place (FR when active) */
    if (typeof window.trMutate === "function") {
      try { window.trMutate(CHAPTERS); } catch (e) {}
      try { window.trMutate(TASKS); } catch (e) {}
    }

    renderChapterList();
    renderReader();
    renderTasks();
    updateProgress();
    initSimulator();

    var doneBtn = document.getElementById("chapterDone");
    if (doneBtn) doneBtn.addEventListener("click", function () { markChapterDone(doneBtn.dataset.chapter); });
    var claim = document.getElementById("claimBadge");
    if (claim) claim.addEventListener("click", claimBadge);
    var reset = document.getElementById("resetModule");
    if (reset) reset.addEventListener("click", resetModule);
  });
})();
