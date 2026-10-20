/* ============================================================
   SHIP'S MUSTER — seamanship_diagnostic.js
   Phase 2 Sea Cadet seamanship diagnostic game.

   The cadet musters the ship's company at twelve stations around
   the deck. Each station presents a practical seamanship challenge.
   Answers are scored against six competency strands; the results
   screen builds a radar/bar profile and an ordered recommended
   training path that identifies what should be taught next.

   Built on the shared HTML5 Cadet Shell (cadet-html5.js):
   native <dialog>, DPR-aware <canvas>, Web Audio, template + toast.
   ============================================================ */
(function () {
  "use strict";

  var tr = (typeof window.tr === "function") ? window.tr : function (s) { return s; };
  var CH = window.CadetHTML5;
  var store = CH.store("seamanshipDiagnostic");

  /* ----------------------------------------------------------
     COMPETENCY STRANDS
     ---------------------------------------------------------- */
  var STRANDS = [
    { id: "terms", label: "Nautical Terminology", short: "Terminology", ico: "\ud83e\udded",
      target: "Seamanship & Maritime Foundations \u00b7 Chapter 2: Nautical Terminology", href: "seamanship_training.html" },
    { id: "parts", label: "Parts of a Ship", short: "Ship Parts", ico: "\ud83d\udea2",
      target: "Seamanship & Maritime Foundations \u00b7 Chapter 3: Parts of a Ship", href: "seamanship_training.html" },
    { id: "rank", label: "Rank & Rate", short: "Rank", ico: "\ud83c\udf96\ufe0f",
      target: "Seamanship & Maritime Foundations \u00b7 Chapter 4: Rank & Rate", href: "seamanship_training.html" },
    { id: "customs", label: "Discipline & Customs", short: "Customs", ico: "\ud83e\udd21",
      target: "Seamanship & Maritime Foundations \u00b7 Chapter 5: Discipline & Customs", href: "seamanship_training.html" },
    { id: "traditions", label: "Traditions", short: "Traditions", ico: "\ud83c\udf8c",
      target: "Seamanship & Maritime Foundations \u00b7 Chapter 6: Traditions", href: "seamanship_training.html" },
    { id: "community", label: "The Ship as a Community", short: "Community", ico: "\u2693",
      target: "Seamanship & Maritime Foundations \u00b7 Chapter 7: The Ship as a Community", href: "seamanship_training.html" }
  ];
  var STRAND_BY = {};
  STRANDS.forEach(function (s) { STRAND_BY[s.id] = s; });

  /* ----------------------------------------------------------
     CHALLENGES — two per strand (12 total)
     ---------------------------------------------------------- */
  var CHALLENGES = [
    /* --- Nautical Terminology --- */
    { id: "c1", strand: "terms",
      prompt: "A shipmate tells you the ensign is flying from the stern. Where on the ship is that?",
      options: ["The front (the bow)", "The back of the ship", "The left side", "The right side"], answer: 1,
      why: "The stern is the back of the ship. The bow is the front; port is the left side and starboard the right, always relative to the ship facing the bow." },
    { id: "c2", strand: "terms",
      prompt: "Which side of a ship is 'port'?",
      options: ["The right side when facing the bow", "The left side when facing the bow", "The front of the ship", "The back of the ship"], answer: 1,
      why: "Port is the left-hand side of a ship when you are facing the bow, and it carries a red navigation light. Starboard is the right side, with a green light." },

    /* --- Parts of a Ship --- */
    { id: "c3", strand: "parts",
      prompt: "What is the gunwale of a boat?",
      options: ["The ship's kitchen", "The upper edge of the hull's side", "The toilet", "The engine room"], answer: 1,
      why: "The gunwale (say 'gun-nel') is the upper edge of the hull's side \u2014 the top rim of the boat that you might sit on or rest an oar against." },
    { id: "c4", strand: "parts",
      prompt: "Where would you find the galley?",
      options: ["It is the ship's kitchen", "It is the bridge where the ship is steered", "It is the funnel that carries exhaust", "It is the keel along the bottom"], answer: 0,
      why: "The galley is the ship's kitchen. The bridge is where the ship is commanded, the funnel carries engine exhaust, and the keel is the backbone along the bottom of the hull." },

    /* --- Rank & Rate --- */
    { id: "c5", strand: "rank",
      prompt: "In naval terms, what is a 'rate'?",
      options: ["A level of authority", "A trade or skill a sailor is trained in", "A type of knot", "A watch on deck"], answer: 1,
      why: "A rate is a trade or skill \u2014 the job a person is trained to do, such as boatswain or gunner. A rank, by contrast, is a level of authority." },
    { id: "c6", strand: "rank",
      prompt: "Which of these is the most senior Sea Cadet rank?",
      options: ["Able Cadet", "Leading Cadet", "Chief Petty Officer 1st Class", "Ordinary Cadet"], answer: 2,
      why: "Chief Petty Officer 1st Class is the most senior cadet rank. The ladder runs from Cadet, through Able and Leading Cadet, to Petty Officer and finally Chief Petty Officer." },

    /* --- Discipline & Customs --- */
    { id: "c7", strand: "customs",
      prompt: "When a senior officer comes aboard a ship, what is 'piped'?",
      options: ["The ship's bell is rung continuously", "The boatswain's call pipes the side", "The galley is closed", "The ensign is lowered"], answer: 1,
      why: "The boatswain's call (a whistle) 'pipes the side' to honour a senior officer coming aboard or leaving. It is one of the oldest naval customs." },
    { id: "c8", strand: "customs",
      prompt: "What is the correct action when stepping onto a ship's quarterdeck?",
      options: ["Salute the ensign and request permission to come aboard", "Walk straight to your station", "Shout 'Ahoy!' to announce yourself", "Remove your shoes"], answer: 0,
      why: "The quarterdeck is the ceremonial heart of a ship. You salute the ensign and ask permission before stepping aboard \u2014 a mark of respect for the flag and the ship." },

    /* --- Traditions --- */
    { id: "c9", strand: "traditions",
      prompt: "What is 'Sunset' aboard a ship?",
      options: ["The evening meal", "The ceremony of lowering the flag in the evening", "The end of the watch", "A type of anchor"], answer: 1,
      why: "Sunset is the evening ceremony when the national flag is lowered with care, marking the end of the working day. The morning ceremony, when it is hoisted, is called Colours." },
    { id: "c10", strand: "traditions",
      prompt: "What is the Sea Cadet motto, shared with the Royal Canadian Navy?",
      options: ["Semper Fidelis", "Ready, Aye Ready", "Per Ardua ad Astra", "Nil Sine Labore"], answer: 1,
      why: "'Ready, Aye Ready' is the motto of the Royal Canadian Navy and the Sea Cadets. It means always prepared, always willing, always ready to serve." },

    /* --- The Ship as a Community --- */
    { id: "c11", strand: "community",
      prompt: "Why is a ship's company divided into watches?",
      options: ["To decide who cooks the meals", "So the ship is manned and alert twenty-four hours a day", "To keep cadets apart from one another", "To save fuel on long voyages"], answer: 1,
      why: "The watch system splits the crew into teams that take turns on duty, so the ship is manned and alert around the clock. It is one of the oldest ideas in seamanship." },
    { id: "c12", strand: "community",
      prompt: "Which department is responsible for navigation and communications?",
      options: ["Deck department", "Engineering department", "Operations department", "Supply department"], answer: 2,
      why: "The operations department handles navigation, communications, and sensors. The deck department runs the ship herself, engineering keeps the machinery going, and supply looks after food and stores." }
  ];

  var RATINGS = [
    { min: 85, label: "Coxswain" },
    { min: 65, label: "Petty Officer" },
    { min: 40, label: "Leading Cadet" },
    { min: 0, label: "New Entry" }
  ];

  /* ----------------------------------------------------------
     MUSTER ROUTE (normalised deck coordinates)
     index 0 = dock, 1..12 = stations, 13 = finish
     ---------------------------------------------------------- */
  var ROUTE = [
    { x: 0.12, y: 0.60 }, { x: 0.20, y: 0.44 }, { x: 0.30, y: 0.44 },
    { x: 0.40, y: 0.44 }, { x: 0.50, y: 0.44 }, { x: 0.60, y: 0.44 },
    { x: 0.70, y: 0.44 }, { x: 0.80, y: 0.44 }, { x: 0.80, y: 0.60 },
    { x: 0.70, y: 0.60 }, { x: 0.60, y: 0.60 }, { x: 0.50, y: 0.60 },
    { x: 0.40, y: 0.60 }, { x: 0.24, y: 0.60 }
  ];
  var LAST_LEG = ROUTE.length - 2;   /* leg 12 -> finish */
  var MOVE_DURATION = 1.35;          /* seconds per leg */
  var XP_PER_CORRECT = 15;
  var WATCH_NAMES = ["Forenoon", "Afternoon", "First", "Middle", "Morning", "Dog"];

  /* ----------------------------------------------------------
     STATE
     ---------------------------------------------------------- */
  var state = {
    phase: "brief",        /* brief | moving | challenge | done */
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
  var deckView = null;

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
    if (el.ratingChip) el.ratingChip.textContent = tr(answered ? ratingFor(runPct) : "New Entry");
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
     CANVAS — MUSTER DECK
     ---------------------------------------------------------- */
  function easeInOut(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }
  function nodePos(i, W, H) { var p = ROUTE[i]; return { x: p.x * W, y: p.y * H }; }

  function cadetPos(W, H) {
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

    /* harbour grid */
    ctx.strokeStyle = "rgba(120,190,220,.07)";
    ctx.lineWidth = 1;
    var step = Math.max(40, W / 18);
    for (var x = 0; x <= W; x += step) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
    for (var y = 0; y <= H; y += step) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
  }

  function hullPath(ctx, W, H) {
    var sternX = 0.06 * W;
    ctx.beginPath();
    ctx.moveTo(sternX, 0.34 * H);
    ctx.bezierCurveTo(0.30 * W, 0.17 * H, 0.62 * W, 0.17 * H, 0.85 * W, 0.33 * H);
    ctx.quadraticCurveTo(0.975 * W, 0.42 * H, 0.975 * W, 0.50 * H);
    ctx.quadraticCurveTo(0.975 * W, 0.58 * H, 0.85 * W, 0.67 * H);
    ctx.bezierCurveTo(0.62 * W, 0.83 * H, 0.30 * W, 0.83 * H, sternX, 0.66 * H);
    ctx.quadraticCurveTo(0.012 * W, 0.50 * H, sternX, 0.34 * H);
    ctx.closePath();
  }

  function drawShip(ctx, W, H, t) {
    /* hull shadow */
    ctx.save();
    ctx.translate(0, 8);
    hullPath(ctx, W, H);
    ctx.fillStyle = "rgba(0,0,0,.35)"; ctx.fill();
    ctx.restore();

    /* hull body */
    hullPath(ctx, W, H);
    var hg = ctx.createLinearGradient(0, 0.17 * H, 0, 0.83 * H);
    hg.addColorStop(0, "#dbe6f4"); hg.addColorStop(0.5, "#c2d3e7"); hg.addColorStop(1, "#9fb6d2");
    ctx.fillStyle = hg; ctx.fill();
    ctx.strokeStyle = "rgba(20,44,74,.85)"; ctx.lineWidth = 3; ctx.stroke();

    /* deck planking */
    ctx.save();
    hullPath(ctx, W, H); ctx.clip();
    ctx.strokeStyle = "rgba(27,58,99,.16)"; ctx.lineWidth = 1;
    for (var y = 0.20 * H; y <= 0.80 * H; y += 0.045 * H) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }
    /* centreline */
    ctx.strokeStyle = "rgba(27,58,99,.30)"; ctx.lineWidth = 1.4;
    ctx.setLineDash([8, 8]);
    ctx.beginPath(); ctx.moveTo(0.06 * W, 0.50 * H); ctx.lineTo(0.95 * W, 0.50 * H); ctx.stroke();
    ctx.setLineDash([]);

    /* superstructure: bridge block, funnel, mast */
    ctx.fillStyle = "#8fa8c6"; ctx.strokeStyle = "rgba(20,44,74,.7)"; ctx.lineWidth = 1.4;
    ctx.fillRect(0.10 * W, 0.40 * H, 0.10 * W, 0.20 * H);
    ctx.strokeRect(0.10 * W, 0.40 * H, 0.10 * W, 0.20 * H);
    ctx.beginPath(); ctx.arc(0.27 * W, 0.50 * H, 0.022 * W, 0, Math.PI * 2); ctx.fillStyle = "#7f99ba"; ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.arc(0.90 * W, 0.50 * H, 0.010 * W, 0, Math.PI * 2); ctx.fillStyle = "#14324e"; ctx.fill();
    ctx.restore();

    /* bow & stern labels */
    ctx.fillStyle = "rgba(20,44,74,.7)";
    ctx.font = "800 12px system-ui, Segoe UI, sans-serif";
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText(tr("BOW"), 0.93 * W, 0.50 * H);
    ctx.fillText(tr("STERN"), 0.075 * W, 0.50 * H);

    /* ensign at the stern (small waving flag) */
    var fx = 0.10 * W, fy = 0.26 * H;
    ctx.strokeStyle = "#14324e"; ctx.lineWidth = 1.6;
    ctx.beginPath(); ctx.moveTo(fx, fy); ctx.lineTo(fx, fy + 0.06 * H); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(fx, fy);
    for (var i = 0; i <= 6; i++) {
      var xx = fx + i * 0.012 * W;
      ctx.lineTo(xx, fy + Math.sin(t * 4 + i * 0.9) * 2);
    }
    ctx.lineTo(fx + 0.072 * W, fy + 0.022 * H);
    for (var j = 6; j >= 0; j--) {
      var xx2 = fx + j * 0.012 * W;
      ctx.lineTo(xx2, fy + 0.022 * H + Math.sin(t * 4 + j * 0.9) * 2);
    }
    ctx.closePath();
    ctx.fillStyle = "#ff5a6e"; ctx.fill();
    ctx.strokeStyle = "rgba(0,0,0,.25)"; ctx.lineWidth = 1; ctx.stroke();
  }

  function drawStation(ctx, x, y, n, status, t) {
    var done = status === "done", active = status === "active";
    var r = active ? 12 + Math.sin(t * 3) * 1.6 : 10;
    if (active) {
      ctx.beginPath(); ctx.arc(x, y, r + 9, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(45,212,191,.18)"; ctx.fill();
    }
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = done ? "#38d97b" : (active ? "#2dd4bf" : "#ffb36b");
    ctx.fill();
    ctx.strokeStyle = "rgba(10,30,48,.5)"; ctx.lineWidth = 1.6; ctx.stroke();
    ctx.fillStyle = "#08243a";
    ctx.font = "800 12px system-ui, Segoe UI, sans-serif";
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText(String(n), x, y + 0.5);
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

  function drawCadet(ctx, x, y, ang, moving, t) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(ang);
    if (moving) {
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = "#bfe9ff";
      ctx.beginPath();
      ctx.moveTo(-2, 0); ctx.lineTo(-30, -6); ctx.lineTo(-30, 6); ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 1;
    }
    /* little sailor: body + cap */
    ctx.beginPath(); ctx.arc(0, 0, 9, 0, Math.PI * 2);
    ctx.fillStyle = "#ffd66b"; ctx.fill();
    ctx.strokeStyle = "#14324e"; ctx.lineWidth = 2; ctx.stroke();
    ctx.beginPath(); ctx.arc(0, -2, 4.4, 0, Math.PI * 2);
    ctx.fillStyle = "#14324e"; ctx.fill();
    /* facing chevron */
    ctx.beginPath();
    ctx.moveTo(11, 0); ctx.lineTo(3, -5); ctx.lineTo(3, 5); ctx.closePath();
    ctx.fillStyle = "#ffd66b"; ctx.fill();
    ctx.restore();
  }

  function drawDeck(ctx, W, H, dt) {
    if (state.moving) {
      state.moveT += dt / MOVE_DURATION;
      if (state.moveT >= 1) { state.moveT = 1; state.moving = false; onArrive(); }
    }
    state.bob += dt;

    drawWater(ctx, W, H);
    drawShip(ctx, W, H, state.bob);

    /* stations */
    for (var i = 1; i <= 12; i++) {
      var p = nodePos(i, W, H);
      var answered = !!state.answers[CHALLENGES[i - 1].id];
      var status = answered ? "done" : (state.phase === "challenge" && state.leg === i - 1 ? "active" : "todo");
      drawStation(ctx, p.x, p.y, i, status, state.bob);
    }
    /* dock + finish markers */
    var d = nodePos(0, W, H);
    ctx.fillStyle = "#9fb4d6"; ctx.font = "700 10px system-ui, sans-serif";
    ctx.textAlign = "center"; ctx.fillText(tr("DOCK"), d.x, d.y - 16);
    var f = nodePos(13, W, H);
    ctx.fillStyle = "#9fb4d6"; ctx.fillText(tr("FINISH"), f.x, f.y - 16);

    var cp = cadetPos(W, H);
    drawCadet(ctx, cp.x, cp.y, cp.ang, state.moving, state.bob);

    drawCompass(ctx, W - 46, 46, 24);
  }

  function initCanvas() {
    if (!el.courseCanvas) return;
    deckView = CH.canvas(el.courseCanvas, { draw: drawDeck });
    deckView.start();
  }

  /* ----------------------------------------------------------
     MUSTER FLOW
     ---------------------------------------------------------- */
  function onArrive() {
    if (state.leg >= LAST_LEG) { finishCourse(); return; }
    presentChallenge(state.leg);
  }

  function startCourse() {
    state.phase = "moving";
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
    if (el.challengeStrand) el.challengeStrand.textContent = tr("Mustering");
    if (el.challengeTitle) el.challengeTitle.textContent = tr("Moving to the first station\u2026");
    if (el.challengePrompt) el.challengePrompt.textContent = tr("Watch the deck \u2014 your first challenge appears when the cadet marker reaches the station.");
    if (el.challengeOptions) el.challengeOptions.innerHTML = "";
    if (el.challengeFeedback) { el.challengeFeedback.textContent = ""; el.challengeFeedback.className = "diag-feedback"; }
    if (el.hudWaypoint) el.hudWaypoint.textContent = tr("Station") + " 1 / 12";
    if (el.hudStrand) el.hudStrand.textContent = tr("Strand") + " \u2014";
    updateRail();
    saveMeta();
    CH.announce(tr("Muster the crew. Heading for station 1."));
  }

  function presentChallenge(idx) {
    state.phase = "challenge";
    var c = CHALLENGES[idx];
    var s = STRAND_BY[c.strand];
    if (el.challengeStrand) el.challengeStrand.textContent = tr("Station") + " " + (idx + 1) + " / 12";
    if (el.challengeTitle) el.challengeTitle.textContent = s.ico + " " + tr(s.label);
    if (el.challengePrompt) el.challengePrompt.textContent = tr(c.prompt);
    if (el.hudWaypoint) el.hudWaypoint.textContent = tr("Station") + " " + (idx + 1) + " / 12";
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
    CH.announce(tr("Challenge at station") + " " + (idx + 1) + ": " + tr(c.prompt));
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
      el.nextWaypoint.textContent = (state.leg >= LAST_LEG) ? tr("Finish \u25b6") : tr("Next station \u25b6");
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
    state.phase = "moving";
    if (el.nextWaypoint) el.nextWaypoint.disabled = true;
    if (el.challengeStrand) el.challengeStrand.textContent = tr("Mustering");
    if (el.challengeTitle) el.challengeTitle.textContent = tr("Moving to the next station\u2026");
    if (el.challengePrompt) el.challengePrompt.textContent = tr("Steady on \u2014 the next challenge appears when the cadet marker reaches the station.");
    if (el.challengeOptions) el.challengeOptions.innerHTML = "";
    if (el.challengeFeedback) { el.challengeFeedback.textContent = ""; el.challengeFeedback.className = "diag-feedback"; }
    if (el.hudWaypoint) el.hudWaypoint.textContent = tr("Station") + " " + Math.min(state.leg + 1, 12) + " / 12";
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
    CH.toast(tr("Muster complete! Review your recommended training path."), "gold", "\u2693");
    if (el.resultsPanel && el.resultsPanel.scrollIntoView) {
      el.resultsPanel.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  /* ----------------------------------------------------------
     RESULTS RENDERING
     ---------------------------------------------------------- */
  function summaryFor(overall) {
    if (overall >= 85) return "Outstanding seamanship across the board. You know your ship and your shipmates \u2014 you are ready to lead newer cadets and take on advanced maritime training.";
    if (overall >= 65) return "A confident, capable cadet. A little polish on your weaker strands and you will be ready to lead a division with confidence.";
    if (overall >= 40) return "You have the foundations afloat. Focus on the strands below and revisit the Seamanship chapters before your next muster.";
    return "A good start \u2014 every sailor began here. Work through the recommended path below with an instructor and muster the crew again.";
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

    for (var ring = 1; ring <= 4; ring++) {
      ctx.beginPath();
      for (var i = 0; i <= n; i++) {
        var a = ang(i % n), r = R * ring / 4;
        var x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "rgba(255,255,255,.12)"; ctx.lineWidth = 1; ctx.stroke();
    }
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
    ctx.beginPath();
    for (var k = 0; k < n; k++) {
      var a3 = ang(k), r3 = R * (strands[k].pct / 100);
      var x3 = cx + Math.cos(a3) * r3, y3 = cy + Math.sin(a3) * r3;
      if (k === 0) ctx.moveTo(x3, y3); else ctx.lineTo(x3, y3);
    }
    ctx.closePath();
    ctx.fillStyle = "rgba(45,212,191,.25)"; ctx.fill();
    ctx.strokeStyle = "#2dd4bf"; ctx.lineWidth = 2; ctx.stroke();
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
          key: "seamanship-diagnostic",
          title: "Ship's Muster \u2014 Seamanship Diagnostic",
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
    if (el.challengeTitle) el.challengeTitle.textContent = tr("Muster the crew to begin the diagnostic");
    if (el.challengePrompt) el.challengePrompt.textContent = tr("Press \u201cMuster the Crew\u201d to call the company to stations. The cadet marker will move to the first station and a challenge will appear here.");
    if (el.challengeOptions) el.challengeOptions.innerHTML = "";
    if (el.challengeFeedback) { el.challengeFeedback.textContent = ""; el.challengeFeedback.className = "diag-feedback"; }
    if (el.nextWaypoint) el.nextWaypoint.disabled = true;
    if (el.hudWaypoint) el.hudWaypoint.textContent = tr("Station") + " \u2014";
    if (el.hudStrand) el.hudStrand.textContent = tr("Strand") + " \u2014";
    updateRail();
    CH.toast(tr("Diagnostic reset. Muster the crew again."), "", "\u21ba");
  }

  /* ----------------------------------------------------------
     BRIEF
     ---------------------------------------------------------- */
  function renderBrief() {
    if (!el.briefBody) return;
    el.briefBody.innerHTML =
      '<p>' + tr("You have charge of the ship's company. Muster the crew at each of the twelve stations around the deck and answer a practical seamanship challenge at every one.") + '</p>' +
      '<ul class="diag-brief-list">' +
      '<li>' + tr("Each challenge scores one of six competency strands.") + '</li>' +
      '<li>' + tr("There are no time limits \u2014 think like a sailor.") + '</li>' +
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
      rt = setTimeout(function () { if (deckView) deckView.resize(); }, 120);
    });

    /* keep the watch label alive */
    setInterval(function () {
      if (!el.hudSpeed) return;
      var idx = Math.floor(Date.now() / 4000) % WATCH_NAMES.length;
      el.hudSpeed.textContent = tr("Watch") + " " + tr(WATCH_NAMES[idx]);
    }, 500);

    CH.announce(tr("Ship's Muster loaded. Press Muster the Crew to begin."));
  });
})();
