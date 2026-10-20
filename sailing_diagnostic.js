/* ============================================================
   CHART YOUR COURSE — sailing_diagnostic.js
   Phase 2 Sea Cadet sailing diagnostic game.

   The cadet sails a harbour course of twelve waypoints. Each
   waypoint presents a practical sailing challenge. Answers are
   scored against six competency strands; the results screen
   builds a radar/bar profile and an ordered recommended training
   path that identifies what should be taught next.

   Built on the shared HTML5 Cadet Shell (cadet-html5.js):
   native <dialog>, DPR-aware <canvas>, Web Audio, template + toast.
   ============================================================ */
(function () {
  "use strict";

  var tr = (typeof window.tr === "function") ? window.tr : function (s) { return s; };
  var CH = window.CadetHTML5;
  var store = CH.store("sailingDiagnostic");

  /* ----------------------------------------------------------
     COMPETENCY STRANDS
     ---------------------------------------------------------- */
  var STRANDS = [
    { id: "pos", label: "Points of Sail", short: "Points", ico: "\u26f5",
      target: "Sailing Fundamentals \u00b7 Chapter 2: The Five Points of Sail", href: "sailing_training.html" },
    { id: "trim", label: "Sail Trim", short: "Trim", ico: "\ud83c\udff3\ufe0f",
      target: "Sailing Fundamentals \u00b7 Chapter 3: Sail Trim & Telltales", href: "sailing_training.html" },
    { id: "man", label: "Manoeuvres", short: "Manoeuvre", ico: "\ud83d\udd04",
      target: "Sailing Fundamentals \u00b7 Chapters 4\u20135: Tacking & Gybing", href: "sailing_training.html" },
    { id: "safety", label: "Safety", short: "Safety", ico: "\ud83e\uddba",
      target: "Sea Survival & Safety (Phase 2 Module 305) + Sailing Chapter 7", href: "sea_year2_map.html" },
    { id: "seamanship", label: "Seamanship", short: "Seamanship", ico: "\ud83e\udea2",
      target: "Ropework (Module 301) & Anchoring (Module 304)", href: "sea_year2_map.html" },
    { id: "wind", label: "Wind Awareness", short: "Wind", ico: "\ud83c\udf2c\ufe0f",
      target: "Meteorology & Tides (Module 309) + Sailing Chapter 1", href: "sea_year2_map.html" }
  ];
  var STRAND_BY = {};
  STRANDS.forEach(function (s) { STRAND_BY[s.id] = s; });

  /* ----------------------------------------------------------
     CHALLENGES — two per strand (12 total)
     ---------------------------------------------------------- */
  var CHALLENGES = [
    /* --- Points of Sail --- */
    { id: "c1", strand: "pos",
      prompt: "The wind is blowing from the north. Your sails are eased and the wind comes over your starboard (right) side at about 90\u00b0. Which point of sail are you on?",
      options: ["Close-hauled", "Beam reach", "Broad reach", "Run"], answer: 1,
      why: "At roughly 90\u00b0 to the wind you are on a beam reach \u2014 the fastest and easiest point of sail, with the wind coming straight across the boat." },
    { id: "c2", strand: "pos",
      prompt: "Which point of sail can a sailboat NOT sail directly?",
      options: ["Close-hauled", "In irons (dead upwind)", "Broad reach", "Run"], answer: 1,
      why: "A boat cannot sail straight into the wind \u2014 that is the \u201cno-go zone\u201d or \u201cin irons\u201d. You sail at an angle to the wind (close-hauled) and tack to make ground upwind." },

    /* --- Sail Trim --- */
    { id: "c3", strand: "trim",
      prompt: "You are sailing close-hauled and the sails begin to luff (flap) and the boat slows. What is the most likely cause?",
      options: ["The sails are sheeted in too tightly", "The boat is pointing too close to the wind (pinching)", "The wind is too strong", "The centreboard is down"], answer: 1,
      why: "Luffing while close-hauled usually means you are pinching \u2014 pointing too high into the wind. Bear away slightly until the sails fill and the telltales stream aft." },
    { id: "c4", strand: "trim",
      prompt: "On a run (wind directly behind), how should the mainsail be trimmed?",
      options: ["Sheeted in tight to the centreline", "Eased out so it is almost at right angles to the boat", "Half-way in", "Furled away"], answer: 1,
      why: "On a run the mainsail is eased right out so it catches the following wind. Many boats \u201cgoose-wing\u201d \u2014 main on one side, jib on the other." },

    /* --- Manoeuvres --- */
    { id: "c5", strand: "man",
      prompt: "You turn the bow through the wind to change from a port tack to a starboard tack. What is this manoeuvre called?",
      options: ["A gybe", "A tack", "A reef", "Heaving-to"], answer: 1,
      why: "Turning the bow through the wind is a tack (coming about). The sails flap and cross to the other side and the crew swaps the jib sheets." },
    { id: "c6", strand: "man",
      prompt: "During a gybe, what is the biggest danger to the crew?",
      options: ["The boom swinging across forcefully", "Running aground", "The sail tearing", "Losing the wind"], answer: 0,
      why: "In a gybe the stern passes through the wind and the boom can swing across with great force. Control the mainsheet and warn the crew before gybing." },

    /* --- Safety --- */
    { id: "c7", strand: "safety",
      prompt: "A sudden gust heels the boat hard. What is the first action to keep the boat upright?",
      options: ["Let the mainsheet run (ease the main)", "Sheet the main in harder", "Jump to the low side", "Push the tiller hard over"], answer: 0,
      why: "Easing the mainsheet \u201cspills\u201d the wind and lets the boat stand back up. Then steer to keep the boat balanced. Never sheet in during a gust." },
    { id: "c8", strand: "safety",
      prompt: "A crew member falls overboard. What is your immediate priority?",
      options: ["Jump in after them", "Keep them in sight and shout \u201cMan overboard!\u201d", "Sail on to fetch help", "Lower all sails first"], answer: 1,
      why: "Keep the person in sight, shout \u201cMan overboard!\u201d, throw flotation, and start the recovery manoeuvre. Losing sight of the casualty is the greatest danger." },

    /* --- Seamanship --- */
    { id: "c9", strand: "seamanship",
      prompt: "Which knot is used to tie a line to a post or ring and can be untied easily even under load?",
      options: ["Bowline", "Round turn and two half hitches", "Reef knot", "Figure of eight"], answer: 1,
      why: "A round turn and two half hitches grips a post or ring securely yet unties easily. A bowline makes a fixed loop; a reef knot joins two lines of equal size." },
    { id: "c10", strand: "seamanship",
      prompt: "When anchoring, what does \u201cscope\u201d mean?",
      options: ["The ratio of anchor rode length to the water depth", "The type of seabed", "The weight of the anchor", "The colour of the buoy"], answer: 0,
      why: "Scope is the ratio of rode (line + chain) to water depth \u2014 typically 5:1 to 7:1. More scope gives a shallower pull angle so the anchor digs in." },

    /* --- Wind Awareness --- */
    { id: "c11", strand: "wind",
      prompt: "How can you best judge the wind direction while sailing?",
      options: ["Only by the sun\u2019s position", "By flags, ripples on the water, and the feel on your face", "Only by the compass", "By the boat\u2019s speed alone"], answer: 1,
      why: "Watch the flags, the ripples (\u201ccat\u2019s paws\u201d) on the water, and feel the wind on your cheeks. A masthead fly or burgee also shows the wind direction." },
    { id: "c12", strand: "wind",
      prompt: "The wind shifts so that you must now point lower to keep the sails full. What is this shift called?",
      options: ["A lift", "A header", "A gust", "A lull"], answer: 1,
      why: "A header is a wind shift that forces you to bear away (point lower). A lift lets you point higher. Sailors tack on headers to gain ground upwind." }
  ];

  var RATINGS = [
    { min: 85, label: "Able Seaman" },
    { min: 65, label: "Helm Hand" },
    { min: 40, label: "Crew" },
    { min: 0, label: "Recruit" }
  ];

  /* ----------------------------------------------------------
     COURSE ROUTE (normalised chart coordinates)
     index 0 = dock, 1..12 = waypoints, 13 = finish
     ---------------------------------------------------------- */
  var ROUTE = [
    { x: 0.10, y: 0.74 }, { x: 0.20, y: 0.56 }, { x: 0.32, y: 0.44 },
    { x: 0.28, y: 0.26 }, { x: 0.44, y: 0.16 }, { x: 0.60, y: 0.24 },
    { x: 0.74, y: 0.16 }, { x: 0.87, y: 0.32 }, { x: 0.83, y: 0.52 },
    { x: 0.68, y: 0.64 }, { x: 0.52, y: 0.58 }, { x: 0.37, y: 0.66 },
    { x: 0.23, y: 0.72 }, { x: 0.09, y: 0.60 }
  ];
  var LAST_LEG = ROUTE.length - 2;   /* leg 12 -> finish */
  var MOVE_DURATION = 1.35;          /* seconds per leg */
  var XP_PER_CORRECT = 15;

  /* ----------------------------------------------------------
     STATE
     ---------------------------------------------------------- */
  var state = {
    phase: "brief",        /* brief | sailing | challenge | done */
    leg: 0,
    moveT: 0,
    moving: false,
    answers: {},           /* challengeId -> {correct, choice} */
    xp: 0,
    best: null,
    attempts: 0,
    startedAt: null,
    finishedAt: null,
    bob: 0
  };
  var lastResult = null;
  var courseView = null;

  /* ----------------------------------------------------------
     DOM
     ---------------------------------------------------------- */
  var $ = function (id) { return document.getElementById(id); };
  var el = {};
  function cacheDom() {
    ["topXP", "bestScore", "coursePct", "courseCount", "courseTotal", "courseBar",
      "xpPill", "ratingChip", "strandList", "courseCanvas", "hudWaypoint", "hudStrand",
      "hudSpeed", "challengePanel", "challengeStrand", "challengeTitle", "challengePrompt",
      "challengeOptions", "challengeFeedback", "nextWaypoint", "resultsPanel", "resultOverall",
      "resultRating", "resultSummary", "radarCanvas", "resultBars", "resultPath",
      "setSail", "resetDiagnostic", "sailAgain", "sendReport", "briefDialog", "briefBody",
      "briefStart", "reportDialog", "reportBody"].forEach(function (id) { el[id] = $(id); });
  }

  /* ----------------------------------------------------------
     PERSISTENCE
     ---------------------------------------------------------- */
  function saveMeta() {
    store.set("best", state.best);
    store.set("attempts", state.attempts);
    if (lastResult) store.set("lastResult", lastResult);
  }
  function loadMeta() {
    var b = store.get("best", null);
    state.best = (b == null ? null : b);
    state.attempts = store.get("attempts", 0) || 0;
    lastResult = store.get("lastResult", null);
  }

  /* ----------------------------------------------------------
     RESULTS MATH
     ---------------------------------------------------------- */
  function computeResults() {
    var per = {};
    STRANDS.forEach(function (s) { per[s.id] = { correct: 0, total: 0 }; });
    CHALLENGES.forEach(function (c) {
      var a = state.answers[c.id];
      per[c.strand].total++;
      if (a && a.correct) per[c.strand].correct++;
    });
    var strands = STRANDS.map(function (s) {
      var p = per[s.id];
      var pct = p.total ? Math.round((p.correct / p.total) * 100) : 0;
      return { id: s.id, label: s.label, short: s.short, ico: s.ico, pct: pct, target: s.target, href: s.href };
    });
    var overall = Math.round(strands.reduce(function (a, s) { return a + s.pct; }, 0) / strands.length);
    var rating = RATINGS.filter(function (r) { return overall >= r.min; })[0].label;
    var path = strands.slice().sort(function (a, b) { return a.pct - b.pct; });
    return { strands: strands, overall: overall, rating: rating, path: path, finishedAt: new Date().toISOString() };
  }

  function ratingFor(pct) {
    return RATINGS.filter(function (r) { return pct >= r.min; })[0].label;
  }

  /* ----------------------------------------------------------
     RAIL / HUD
     ---------------------------------------------------------- */
  function updateRail() {
    var answered = Object.keys(state.answers).length;
    var total = CHALLENGES.length;
    var pct = Math.round((answered / total) * 100);
    if (el.coursePct) el.coursePct.textContent = pct + "%";
    if (el.courseCount) el.courseCount.textContent = answered;
    if (el.courseTotal) el.courseTotal.textContent = total;
    if (el.courseBar) el.courseBar.style.width = pct + "%";
    if (el.xpPill) el.xpPill.textContent = state.xp + " XP";
    if (el.topXP) el.topXP.textContent = state.xp;

    /* running rating */
    var correct = 0;
    CHALLENGES.forEach(function (c) { if (state.answers[c.id] && state.answers[c.id].correct) correct++; });
    var runPct = answered ? Math.round((correct / answered) * 100) : 0;
    if (el.ratingChip) el.ratingChip.textContent = tr(answered ? ratingFor(runPct) : "Recruit");
    if (el.bestScore) el.bestScore.textContent = (state.best == null ? "\u2014" : state.best + "%");

    /* strand list */
    if (el.strandList) {
      el.strandList.innerHTML = STRANDS.map(function (s) {
        var tot = 0, ok = 0;
        CHALLENGES.forEach(function (c) {
          if (c.strand !== s.id) return;
          tot++;
          if (state.answers[c.id] && state.answers[c.id].correct) ok++;
        });
        var p = tot ? Math.round((ok / tot) * 100) : 0;
        var cls = "diag-strand" + (tot && p < 50 ? " is-weak" : (tot && p >= 100 ? " is-strong" : ""));
        return '<li class="' + cls + '">' +
          '<span class="diag-strand__ico" aria-hidden="true">' + s.ico + '</span>' +
          '<span class="diag-strand__lbl">' + CH.esc(tr(s.label)) + '</span>' +
          '<span class="diag-strand__val">' + (tot ? p + "%" : "\u2013") + '</span>' +
          '</li>';
      }).join("");
    }
  }

  /* ----------------------------------------------------------
     CANVAS — COURSE CHART
     ---------------------------------------------------------- */
  function easeInOut(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }
  function nodePos(i, W, H) { var p = ROUTE[i]; return { x: p.x * W, y: p.y * H }; }

  function boatPos(W, H) {
    var a = nodePos(state.leg, W, H);
    var b = nodePos(Math.min(state.leg + 1, ROUTE.length - 1), W, H);
    var t = easeInOut(CH.clamp(state.moveT, 0, 1));
    return {
      x: a.x + (b.x - a.x) * t,
      y: a.y + (b.y - a.y) * t,
      ang: Math.atan2(b.y - a.y, b.x - a.x)
    };
  }

  function drawWater(ctx, W, H) {
    var g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, "#0b2e44");
    g.addColorStop(0.55, "#07222f");
    g.addColorStop(1, "#04141d");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    /* chart grid */
    ctx.strokeStyle = "rgba(120,190,220,.07)";
    ctx.lineWidth = 1;
    var step = Math.max(40, W / 18);
    for (var x = 0; x <= W; x += step) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
    for (var y = 0; y <= H; y += step) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
  }

  function drawLand(ctx, W, H) {
    ctx.fillStyle = "rgba(23,54,44,.85)";
    ctx.strokeStyle = "rgba(90,160,120,.5)";
    ctx.lineWidth = 1.5;
    /* island blobs (decorative) */
    var blobs = [
      [0.02, 0.06, 0.16, 0.10], [0.86, 0.72, 0.20, 0.16],
      [0.40, 0.86, 0.14, 0.10], [0.02, 0.94, 0.12, 0.08]
    ];
    blobs.forEach(function (b) {
      ctx.beginPath();
      ctx.ellipse(b[0] * W, b[1] * H, b[2] * W, b[3] * H, 0, 0, Math.PI * 2);
      ctx.fill(); ctx.stroke();
    });
    /* harbour quay at the dock */
    ctx.fillStyle = "rgba(60,70,80,.9)";
    ctx.fillRect(0, 0.80 * H, 0.09 * W, 0.05 * H);
  }

  function drawCourseLine(ctx, W, H) {
    ctx.beginPath();
    for (var i = 0; i < ROUTE.length; i++) {
      var p = nodePos(i, W, H);
      if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
    }
    ctx.strokeStyle = "rgba(255,214,107,.35)";
    ctx.lineWidth = 2;
    ctx.setLineDash([7, 7]);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  function drawBuoy(ctx, x, y, n, status, t) {
    var done = status === "done", active = status === "active";
    var r = active ? 11 + Math.sin(t * 3) * 1.6 : 9;
    /* glow for active */
    if (active) {
      ctx.beginPath(); ctx.arc(x, y, r + 8, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(45,212,191,.18)"; ctx.fill();
    }
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = done ? "#38d97b" : (active ? "#2dd4bf" : "#ff8a5c");
    ctx.fill();
    ctx.strokeStyle = "rgba(0,0,0,.35)"; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle = "#04141d";
    ctx.font = "800 11px system-ui,Segoe UI,sans-serif";
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText(String(n), x, y + 0.5);
  }

  function drawWind(ctx, W, H, t) {
    /* wind blowing from the top (north) down the chart */
    ctx.save();
    ctx.strokeStyle = "rgba(150,210,240,.35)";
    ctx.fillStyle = "rgba(150,210,240,.35)";
    ctx.lineWidth = 2;
    var cols = 6;
    for (var i = 0; i < cols; i++) {
      var x = (i + 0.5) * (W / cols);
      var off = ((t * 26 + i * 40) % (H + 60)) - 30;
      for (var k = 0; k < 2; k++) {
        var y = off + k * 120;
        if (y < -20 || y > H + 20) continue;
        ctx.beginPath();
        ctx.moveTo(x - 9, y);
        ctx.lineTo(x, y + 12);
        ctx.lineTo(x + 9, y);
        ctx.stroke();
      }
    }
    ctx.restore();
  }

  function drawCompass(ctx, W, H) {
    var cx = W - 46, cy = 46, r = 26;
    ctx.save();
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(4,20,29,.7)"; ctx.fill();
    ctx.strokeStyle = "rgba(150,210,240,.4)"; ctx.lineWidth = 1.5; ctx.stroke();
    /* needle */
    ctx.beginPath(); ctx.moveTo(cx, cy - r + 6); ctx.lineTo(cx - 5, cy + 4); ctx.lineTo(cx + 5, cy + 4); ctx.closePath();
    ctx.fillStyle = "#ff5a6e"; ctx.fill();
    ctx.beginPath(); ctx.moveTo(cx, cy + r - 6); ctx.lineTo(cx - 5, cy - 4); ctx.lineTo(cx + 5, cy - 4); ctx.closePath();
    ctx.fillStyle = "#e8f1ff"; ctx.fill();
    ctx.fillStyle = "#9fb4d6"; ctx.font = "800 10px system-ui,sans-serif";
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText("N", cx, cy - r + 2);
    ctx.restore();
  }

  function drawBoat(ctx, x, y, ang, moving, t) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(ang);
    /* wake */
    if (moving) {
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = "#bfe9ff";
      ctx.beginPath();
      ctx.moveTo(-4, 0); ctx.lineTo(-40, -6); ctx.lineTo(-40, 6); ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 1;
    }
    /* hull (top-down) */
    ctx.beginPath();
    ctx.moveTo(17, 0);
    ctx.quadraticCurveTo(6, -9, -11, -7);
    ctx.lineTo(-14, 0);
    ctx.lineTo(-11, 7);
    ctx.quadraticCurveTo(6, 9, 17, 0);
    ctx.closePath();
    ctx.fillStyle = "#f4f7fb"; ctx.fill();
    ctx.strokeStyle = "#1b3a63"; ctx.lineWidth = 1.6; ctx.stroke();
    /* sail */
    ctx.beginPath();
    ctx.moveTo(2, 0);
    ctx.quadraticCurveTo(-4, -13, -12, -4);
    ctx.lineTo(-2, 0);
    ctx.closePath();
    ctx.fillStyle = "#ffd66b"; ctx.fill();
    ctx.strokeStyle = "rgba(0,0,0,.25)"; ctx.lineWidth = 1; ctx.stroke();
    /* mast */
    ctx.beginPath(); ctx.arc(2, 0, 2.4, 0, Math.PI * 2);
    ctx.fillStyle = "#1b3a63"; ctx.fill();
    ctx.restore();
  }

  function drawCourse(ctx, W, H, dt) {
    /* advance animation */
    if (state.moving) {
      state.moveT += dt / MOVE_DURATION;
      if (state.moveT >= 1) { state.moveT = 1; state.moving = false; onArrive(); }
    }
    state.bob += dt;

    drawWater(ctx, W, H);
    drawLand(ctx, W, H);
    drawCourseLine(ctx, W, H);

    /* buoys */
    for (var i = 1; i <= 12; i++) {
      var p = nodePos(i, W, H);
      var answered = !!state.answers[CHALLENGES[i - 1].id];
      var status = answered ? "done" : (state.phase === "challenge" && state.leg === i - 1 ? "active" : "todo");
      drawBuoy(ctx, p.x, p.y, i, status, state.bob);
    }
    /* dock + finish markers */
    var d = nodePos(0, W, H);
    ctx.fillStyle = "#9fb4d6"; ctx.font = "700 10px system-ui,sans-serif";
    ctx.textAlign = "center"; ctx.fillText(tr("DOCK"), d.x, d.y - 16);
    var f = nodePos(13, W, H);
    ctx.fillStyle = "#9fb4d6"; ctx.fillText(tr("FINISH"), f.x, f.y - 16);

    drawWind(ctx, W, H, state.bob);

    var bp = boatPos(W, H);
    drawBoat(ctx, bp.x, bp.y, bp.ang, state.moving, state.bob);

    drawCompass(ctx, W, H);
  }

  function initCanvas() {
    if (!el.courseCanvas) return;
    courseView = CH.canvas(el.courseCanvas, { draw: drawCourse });
    courseView.start();
  }

  /* ----------------------------------------------------------
     COURSE FLOW
     ---------------------------------------------------------- */
  function onArrive() {
    if (state.leg >= LAST_LEG) { finishCourse(); return; }
    presentChallenge(state.leg);
  }

  function startCourse() {
    state.phase = "sailing";
    state.leg = 0;
    state.moveT = 0;
    state.moving = true;
    state.answers = {};
    state.xp = 0;
    state.startedAt = Date.now();
    state.finishedAt = null;
    state.attempts += 1;
    if (el.resultsPanel) el.resultsPanel.hidden = true;
    if (el.challengePanel) el.challengePanel.hidden = false;
    if (el.nextWaypoint) el.nextWaypoint.disabled = true;
    if (el.challengeStrand) el.challengeStrand.textContent = tr("Under way");
    if (el.challengeTitle) el.challengeTitle.textContent = tr("Sailing to the first waypoint\u2026");
    if (el.challengePrompt) el.challengePrompt.textContent = tr("Watch the chart \u2014 your first challenge appears when you reach the buoy.");
    if (el.challengeOptions) el.challengeOptions.innerHTML = "";
    if (el.challengeFeedback) { el.challengeFeedback.textContent = ""; el.challengeFeedback.className = "diag-feedback"; }
    if (el.hudWaypoint) el.hudWaypoint.textContent = tr("Waypoint") + " 1 / 12";
    if (el.hudStrand) el.hudStrand.textContent = tr("Strand") + " \u2014";
    updateRail();
    saveMeta();
    CH.announce(tr("Set sail. Heading for waypoint 1."));
  }

  function presentChallenge(idx) {
    state.phase = "challenge";
    var c = CHALLENGES[idx];
    var s = STRAND_BY[c.strand];
    if (el.challengeStrand) el.challengeStrand.textContent = tr("Waypoint") + " " + (idx + 1) + " / 12";
    if (el.challengeTitle) el.challengeTitle.textContent = s.ico + " " + tr(s.label);
    if (el.challengePrompt) el.challengePrompt.textContent = tr(c.prompt);
    if (el.hudWaypoint) el.hudWaypoint.textContent = tr("Waypoint") + " " + (idx + 1) + " / 12";
    if (el.hudStrand) el.hudStrand.textContent = tr("Strand") + " " + tr(s.short);
    if (el.challengeFeedback) { el.challengeFeedback.textContent = ""; el.challengeFeedback.className = "diag-feedback"; }
    if (el.nextWaypoint) el.nextWaypoint.disabled = true;

    if (el.challengeOptions) {
      el.challengeOptions.innerHTML = c.options.map(function (o, i) {
        return '<button class="diag-opt" type="button" data-opt="' + i + '">' +
          '<span class="diag-opt__key">' + String.fromCharCode(65 + i) + '</span>' +
          CH.esc(tr(o)) + '</button>';
      }).join("");
      Array.prototype.forEach.call(el.challengeOptions.querySelectorAll(".diag-opt"), function (btn) {
        btn.addEventListener("click", function () { answerChallenge(idx, Number(btn.dataset.opt)); });
      });
    }
    CH.audio.click();
    CH.announce(tr("Challenge at waypoint") + " " + (idx + 1) + ": " + tr(c.prompt));
  }

  function answerChallenge(idx, choice) {
    var c = CHALLENGES[idx];
    if (state.answers[c.id]) return;
    var correct = choice === c.answer;
    state.answers[c.id] = { correct: correct, choice: choice };
    if (correct) { state.xp += XP_PER_CORRECT; CH.audio.correct(); } else { CH.audio.wrong(); }

    var btns = el.challengeOptions ? el.challengeOptions.querySelectorAll(".diag-opt") : [];
    Array.prototype.forEach.call(btns, function (b, i) {
      b.disabled = true;
      if (i === c.answer) b.classList.add("is-correct");
      if (i === choice && !correct) b.classList.add("is-wrong");
    });
    if (el.challengeFeedback) {
      el.challengeFeedback.className = "diag-feedback " + (correct ? "good" : "bad");
      el.challengeFeedback.innerHTML = (correct ? tr("Correct! ") : tr("Not quite. ")) +
        '<span class="diag-why">' + CH.esc(tr(c.why)) + '</span>';
    }
    if (el.nextWaypoint) {
      el.nextWaypoint.disabled = false;
      el.nextWaypoint.textContent = (state.leg >= LAST_LEG) ? tr("Finish \u25b6") : tr("Next waypoint \u25b6");
    }
    updateRail();
    saveMeta();
    CH.announce(correct ? tr("Correct answer recorded.") : tr("Answer recorded. Read the explanation."));
  }

  function nextLeg() {
    if (state.leg >= LAST_LEG) { finishCourse(); return; }
    state.leg += 1;
    state.moveT = 0;
    state.moving = true;
    state.phase = "sailing";
    if (el.nextWaypoint) el.nextWaypoint.disabled = true;
    if (el.challengeStrand) el.challengeStrand.textContent = tr("Under way");
    if (el.challengeTitle) el.challengeTitle.textContent = tr("Sailing to the next waypoint\u2026");
    if (el.challengePrompt) el.challengePrompt.textContent = tr("Steady as she goes \u2014 the next challenge appears at the buoy.");
    if (el.challengeOptions) el.challengeOptions.innerHTML = "";
    if (el.challengeFeedback) { el.challengeFeedback.textContent = ""; el.challengeFeedback.className = "diag-feedback"; }
    if (el.hudWaypoint) el.hudWaypoint.textContent = tr("Waypoint") + " " + Math.min(state.leg + 1, 12) + " / 12";
    CH.audio.click();
  }

  function finishCourse() {
    state.phase = "done";
    state.moving = false;
    state.finishedAt = Date.now();
    lastResult = computeResults();
    if (state.best == null || lastResult.overall > state.best) state.best = lastResult.overall;
    saveMeta();
    renderResults(lastResult);
    if (el.challengePanel) el.challengePanel.hidden = true;
    if (el.resultsPanel) { el.resultsPanel.hidden = false; }
    updateRail();
    CH.audio.win();
    CH.toast(tr("Course complete! Review your recommended training path."), "gold", "\ud83e\udded");
    if (el.resultsPanel && el.resultsPanel.scrollIntoView) {
      el.resultsPanel.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  /* ----------------------------------------------------------
     RESULTS RENDERING
     ---------------------------------------------------------- */
  function summaryFor(overall) {
    if (overall >= 85) return "Outstanding seamanship across the board. You are ready for advanced boat-handling and racing fundamentals \u2014 and to help teach newer cadets.";
    if (overall >= 65) return "A solid, confident sailor. A little polish on your weaker strands and you will be ready for independent command of a dinghy.";
    if (overall >= 40) return "You have the basics afloat. Focus on the strands below and revisit the Sailing Fundamentals chapters before your next practical.";
    return "A good start \u2014 every skipper began here. Work through the recommended path below with an instructor and try the course again.";
  }

  function renderResults(res) {
    if (el.resultOverall) el.resultOverall.innerHTML = res.overall + "<span>%</span>";
    if (el.resultRating) el.resultRating.textContent = tr(res.rating);
    if (el.resultSummary) el.resultSummary.textContent = tr(summaryFor(res.overall));

    /* bars */
    if (el.resultBars) {
      el.resultBars.innerHTML = res.strands.map(function (s) {
        var cls = s.pct >= 85 ? "is-strong" : (s.pct >= 60 ? "" : (s.pct >= 35 ? "is-mid" : "is-weak"));
        return '<div class="diag-bar">' +
          '<span class="diag-bar__lbl">' + s.ico + " " + CH.esc(tr(s.label)) + '</span>' +
          '<span class="diag-bar__track"><span class="diag-bar__fill ' + cls + '" style="width:' + s.pct + '%"></span></span>' +
          '<span class="diag-bar__val">' + s.pct + '%</span>' +
          '</div>';
      }).join("");
    }

    /* recommended path */
    if (el.resultPath) {
      el.resultPath.innerHTML = res.path.map(function (s) {
        return '<li>' +
          '<div><p class="diag-path__title">' + s.ico + " " + CH.esc(tr(s.label)) +
          ' <span>(' + s.pct + '%)</span></p>' +
          '<p class="diag-path__next">' + tr("Next") + ': <a href="' + s.href + '">' + CH.esc(tr(s.target)) + '</a></p></div>' +
          '</li>';
      }).join("");
    }

    drawRadar(res.strands);
  }

  function drawRadar(strands) {
    var cv = el.radarCanvas;
    if (!cv) return;
    var W = 420, H = 340;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = W * dpr; cv.height = H * dpr;
    cv.style.width = W + "px"; cv.style.height = H + "px";
    var ctx = cv.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);

    var n = STRANDS.length;
    var cx = W / 2, cy = H / 2 + 4, R = 104;
    function ang(i) { return -Math.PI / 2 + i * (2 * Math.PI / n); }

    /* rings */
    for (var ring = 1; ring <= 4; ring++) {
      ctx.beginPath();
      for (var i = 0; i <= n; i++) {
        var a = ang(i % n), r = R * ring / 4;
        var x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "rgba(255,255,255,.12)"; ctx.lineWidth = 1; ctx.stroke();
    }
    /* spokes + labels */
    for (var j = 0; j < n; j++) {
      var a2 = ang(j);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(a2) * R, cy + Math.sin(a2) * R);
      ctx.strokeStyle = "rgba(255,255,255,.10)"; ctx.stroke();
      var lx = cx + Math.cos(a2) * (R + 16), ly = cy + Math.sin(a2) * (R + 16);
      ctx.fillStyle = "#9fb4d6";
      ctx.font = "700 11px system-ui,Segoe UI,sans-serif";
      ctx.textAlign = Math.abs(Math.cos(a2)) < 0.3 ? "center" : (Math.cos(a2) > 0 ? "left" : "right");
      ctx.textBaseline = "middle";
      ctx.fillText(tr(strands[j].short), lx, ly);
    }
    /* data polygon */
    ctx.beginPath();
    for (var k = 0; k < n; k++) {
      var a3 = ang(k), r3 = R * (strands[k].pct / 100);
      var x3 = cx + Math.cos(a3) * r3, y3 = cy + Math.sin(a3) * r3;
      if (k === 0) ctx.moveTo(x3, y3); else ctx.lineTo(x3, y3);
    }
    ctx.closePath();
    ctx.fillStyle = "rgba(45,212,191,.25)"; ctx.fill();
    ctx.strokeStyle = "#2dd4bf"; ctx.lineWidth = 2; ctx.stroke();
    /* points */
    for (var m = 0; m < n; m++) {
      var a4 = ang(m), r4 = R * (strands[m].pct / 100);
      ctx.beginPath();
      ctx.arc(cx + Math.cos(a4) * r4, cy + Math.sin(a4) * r4, 3.4, 0, Math.PI * 2);
      ctx.fillStyle = "#ffd66b"; ctx.fill();
    }
  }

  /* ----------------------------------------------------------
     HQ REPORT
     ---------------------------------------------------------- */
  function sendReport() {
    if (!lastResult) return;
    var strands = lastResult.strands.map(function (s) { return { label: s.label, pct: s.pct }; });
    var path = lastResult.path.map(function (s) { return { label: s.label, pct: s.pct, target: s.target }; });
    var ok = false;
    try {
      if (window.CadetHQ && typeof window.CadetHQ.notifyReport === "function") {
        window.CadetHQ.notifyReport({
          key: "sailing-diagnostic",
          title: "Chart Your Course \u2014 Sailing Diagnostic",
          overall: lastResult.overall,
          rating: lastResult.rating,
          strands: strands,
          path: path,
          namespace: "Phase 2 \u00b7 Sea Cadet"
        });
        ok = true;
      }
    } catch (e) { ok = false; }

    if (el.reportBody) {
      el.reportBody.innerHTML =
        '<p>' + tr(ok
          ? "Your competency profile and recommended training path have been sent to your unit email and mirrored in your HQ Mail inbox."
          : "Your report is ready. Open your HQ Mail inbox from any page to view your competency profile and recommended training path.") + '</p>' +
        '<p class="cadet-muted diag-small">' + tr("Overall") + ': <strong>' + lastResult.overall + '%</strong> \u00b7 ' +
        tr("Rating") + ': <strong>' + CH.esc(tr(lastResult.rating)) + '</strong></p>';
    }
    CH.dialog.open(el.reportDialog);
    CH.toast(tr("Assessment report sent to HQ Mail."), "good", "\u2709\ufe0f");
  }

  /* ----------------------------------------------------------
     RESET
     ---------------------------------------------------------- */
  function resetDiagnostic() {
    state.best = null; state.attempts = 0; lastResult = null;
    store.remove("best"); store.remove("attempts"); store.remove("lastResult");
    state.answers = {}; state.xp = 0; state.leg = 0; state.moveT = 0; state.moving = false; state.phase = "brief";
    if (el.resultsPanel) el.resultsPanel.hidden = true;
    if (el.challengePanel) el.challengePanel.hidden = false;
    if (el.challengeStrand) el.challengeStrand.textContent = tr("Awaiting orders");
    if (el.challengeTitle) el.challengeTitle.textContent = tr("Set sail to begin the diagnostic");
    if (el.challengePrompt) el.challengePrompt.textContent = tr("Press \u201cSet Sail\u201d to leave the dock. The boat will sail to the first waypoint and a challenge will appear here.");
    if (el.challengeOptions) el.challengeOptions.innerHTML = "";
    if (el.challengeFeedback) { el.challengeFeedback.textContent = ""; el.challengeFeedback.className = "diag-feedback"; }
    if (el.nextWaypoint) el.nextWaypoint.disabled = true;
    if (el.hudWaypoint) el.hudWaypoint.textContent = tr("Waypoint") + " \u2014";
    if (el.hudStrand) el.hudStrand.textContent = tr("Strand") + " \u2014";
    updateRail();
    CH.toast(tr("Diagnostic reset. Fair winds \u2014 sail again."), "", "\u21ba");
  }

  /* ----------------------------------------------------------
     BRIEF
     ---------------------------------------------------------- */
  function renderBrief() {
    if (!el.briefBody) return;
    el.briefBody.innerHTML =
      '<p>' + tr("You have command of a training dinghy. Sail the harbour course and answer a practical challenge at each of the twelve waypoints.") + '</p>' +
      '<ul class="diag-brief-list">' +
      '<li>' + tr("Each challenge scores one of six competency strands.") + '</li>' +
      '<li>' + tr("There are no time limits \u2014 think like a skipper.") + '</li>' +
      '<li>' + tr("At the end, HQ builds your competency profile and a recommended training path.") + '</li>' +
      '</ul>';
  }

  /* ----------------------------------------------------------
     INIT
     ---------------------------------------------------------- */
  CH.ready(function () {
    cacheDom();

    /* i18n: translate the data arrays in place */
    if (typeof window.trMutate === "function") {
      try { window.trMutate(STRANDS); } catch (e) {}
      try { window.trMutate(CHALLENGES); } catch (e) {}
      try { window.trMutate(RATINGS); } catch (e) {}
    }

    loadMeta();
    renderBrief();
    updateRail();
    initCanvas();

    /* if a previous result exists, show it (returning cadet) */
    if (lastResult && lastResult.strands) {
      renderResults(lastResult);
      if (el.resultsPanel) el.resultsPanel.hidden = false;
      if (el.challengePanel) el.challengePanel.hidden = true;
    }

    /* wire buttons */
    if (el.setSail) el.setSail.addEventListener("click", function () {
      CH.dialog.open(el.briefDialog);
    });
    if (el.briefStart) el.briefStart.addEventListener("click", function () {
      CH.dialog.close(el.briefDialog);
      startCourse();
    });
    if (el.nextWaypoint) el.nextWaypoint.addEventListener("click", nextLeg);
    if (el.sailAgain) el.sailAgain.addEventListener("click", function () {
      if (el.resultsPanel) el.resultsPanel.hidden = true;
      if (el.challengePanel) el.challengePanel.hidden = false;
      startCourse();
    });
    if (el.sendReport) el.sendReport.addEventListener("click", sendReport);
    if (el.resetDiagnostic) el.resetDiagnostic.addEventListener("click", resetDiagnostic);

    /* responsive canvas */
    var rt = null;
    window.addEventListener("resize", function () {
      if (rt) clearTimeout(rt);
      rt = setTimeout(function () { if (courseView) courseView.resize(); }, 120);
    });

    /* keep HUD speed label alive */
    setInterval(function () {
      if (!el.hudSpeed) return;
      var spd = state.moving ? (5.5 + Math.abs(Math.sin(state.bob * 2)) * 1.8) : 0;
      el.hudSpeed.textContent = tr("Speed") + " " + spd.toFixed(1) + " kn";
    }, 250);

    CH.announce(tr("Chart Your Course loaded. Press Set Sail to begin."));
  });
})();
