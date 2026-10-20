/* ============================================================
   AVATAR-RENDER.JS — Shared Cadet Avatar Rendering Module
   ============================================================
   Contains the pure rendering logic for building a DiceBear
   Adventurer avatar URL and the hand-drawn cadet BUST overlay
   SVG (head + neck + shoulders + uniform).

   The "Illustrated Bust" approach draws a cohesive portrait:
     • DiceBear generates the head/face/hair
     • We draw a skin-toned NECK connecting chin → shoulders
     • We draw SHOULDERS + upper torso (uniform) flowing from neck
     • Uniform details: collar, epaulettes, chest badge, headgear

   Exposes a global `CadetAvatarRender` object with:
     • buildUrl(state)         → DiceBear API URL string
     • overlaySvg(state)       → bust overlay <g> SVG string
     • renderInto(el, state)   → fetch + render full avatar into element
     • renderMini(el, state)   → fetch + render a compact hero avatar
     • BRANCHES, SKIN_TONES, HAIR_COLORS (data arrays)
   ============================================================ */
(function (global) {
  'use strict';

  var DICEBEAR_BASE = 'https://api.dicebear.com/10.x/adventurer/svg';
  var OUTLINE = '#1a1a1a';

  /* CX = face center X in the 762×762 DiceBear canvas.
     DiceBear head is at translate(143.2, 162.9); face silhouette
     spans x=[104..519], so center ≈ 311. Facial features (eyes,
     mouth) center around x≈285-300. We use 300 as the visual
     center for a balanced bust. */
  var CX = 300;
  /* Chin is at y≈560 (face bottom). Neck bridges chin→shoulders.
     Shoulders line at y≈635. Torso fills down to y=762. */
  var CHIN_Y = 560;
  var SHOULDER_Y = 635;

  var BRANCHES = [
    { id: 'army', label: 'Army', sub: 'Green Star', icon: '\u2605', color: '#456534', uniform: '#4a5d3a', uniformDark: '#364428', capColor: '#3d4f2e', capType: 'beret', bg: '#dbe5cd' },
    { id: 'air',  label: 'Air',  sub: 'Level 1', icon: '\u2708', color: '#2f76d2', uniform: '#345f9e', uniformDark: '#243f6e', capColor: '#345f9e', capType: 'flight', bg: '#d6e6f7' },
    { id: 'sea',  label: 'Sea',  sub: 'Phase 1', icon: '\u2693', color: '#1a3a5c', uniform: '#1e2d4a', uniformDark: '#121d33', capColor: '#f8fafc', capType: 'sailor', bg: '#d4e0ec' },
  ];

  var SKIN_TONES = [
    { id: 'fair',   label: 'Fair',   color: '#f4d4b0' },
    { id: 'light',  label: 'Light',  color: '#e8c298' },
    { id: 'medium', label: 'Medium', color: '#d4a574' },
    { id: 'tan',    label: 'Tan',    color: '#c08552' },
    { id: 'deep',   label: 'Deep',   color: '#8b5a2b' },
  ];

  var HAIR_COLORS = [
    { id: 'black',  label: 'Black',  color: '#2a2a2a' },
    { id: 'brown',  label: 'Brown',  color: '#5c3a1e' },
    { id: 'auburn', label: 'Auburn', color: '#8b4513' },
    { id: 'blonde', label: 'Blonde', color: '#d4a84b' },
    { id: 'red',    label: 'Red',    color: '#b5421e' },
    { id: 'gray',   label: 'Silver', color: '#9aa0a6' },
  ];

  var DETAILS_MAP = {
    'none': '', 'freckles': 'freckles', 'blush': 'blush',
    'birthmark': 'birthmark', 'mustache': 'mustache'
  };
  var EARRINGS_MAP = {
    'none': '', 'variant01': 'variant01', 'variant03': 'variant03', 'variant05': 'variant05'
  };
  var GLASSES_MAP = {
    'none': '', 'variant01': 'variant01', 'variant02': 'variant02',
    'variant03': 'variant03', 'variant05': 'variant05'
  };

  /* Element-specific colour/style maps for overlay rendering */
  var BERET_COLORS = {
    'rifleGreen': '#3d4f2e', 'olive': '#5c6e3a', 'khaki': '#a0936b', 'black': '#2a2a2a'
  };
  var TALLY_COLORS = {
    'navyTally': null, 'blackTally': '#1a1a1a', 'whiteTally': '#e8e8e8'
  };
  var SCARF_COLORS = {
    'blackScarf': '#1a1a1a', 'navyScarf': '#1e2d4a', 'whiteScarf': '#e8e8e8'
  };

  function getBranch(id) { return BRANCHES.find(function (b) { return b.id === id; }) || BRANCHES[0]; }
  function getSkin(id) { return SKIN_TONES.find(function (s) { return s.id === id; }) || SKIN_TONES[1]; }
  function getHairColor(id) { return HAIR_COLORS.find(function (h) { return h.id === id; }) || HAIR_COLORS[1]; }

  function shade(hex, percent) {
    var num = parseInt(hex.replace('#', ''), 16);
    var r = (num >> 16) + Math.round(2.55 * percent);
    var g = ((num >> 8) & 0xff) + Math.round(2.55 * percent);
    var b = (num & 0xff) + Math.round(2.55 * percent);
    r = Math.max(0, Math.min(255, r));
    g = Math.max(0, Math.min(255, g));
    b = Math.max(0, Math.min(255, b));
    return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
  }

  /* Build the DiceBear API URL from an avatar state object. */
  function buildUrl(state) {
    state = state || {};
    var skin = getSkin(state.skin || 'light');
    var hc = getHairColor(state.hairColor || 'brown');
    var b = getBranch(state.branch || 'army');
    var detVariant = DETAILS_MAP[state.details] || '';
    var earVariant = EARRINGS_MAP[state.earrings] || '';
    var accVariant = GLASSES_MAP[state.accessory] || '';

    var params = new URLSearchParams();
    params.set('seed', state.name && state.name.trim ? state.name.trim() : 'Cadet');
    params.set('skinColor', skin.color);
    params.set('hairColor', hc.color);
    params.set('hairVariant', state.hair || 'short01');
    params.set('hairProbability', '100');
    params.set('eyesVariant', state.eye || 'variant01');
    params.set('eyesProbability', '100');
    params.set('mouthVariant', state.expression || 'variant01');
    params.set('mouthProbability', '100');
    params.set('eyebrowsVariant', state.eyebrows || 'variant01');
    params.set('eyebrowsProbability', '100');
    if (detVariant) { params.set('detailsVariant', detVariant); params.set('detailsProbability', '100'); }
    if (earVariant) { params.set('earringsVariant', earVariant); params.set('earringsProbability', '100'); }
    if (accVariant) { params.set('glassesVariant', accVariant); params.set('glassesProbability', '100'); }
    params.set('backgroundColor', b.bg);
    params.set('radius', '50');
    return DICEBEAR_BASE + '?' + params.toString();
  }

  /* ============================================================
     BUST OVERLAY — the illustrated bust: neck + shoulders + uniform
     ============================================================ */
  function overlaySvg(state) {
    state = state || {};
    var b = getBranch(state.branch || 'army');
    var skin = getSkin(state.skin || 'light');
    var skinColor = skin.color;
    var skinShadow = shade(skinColor, -12);
    var u = b.uniform, ud = b.uniformDark;
    var uLight = shade(u, 14);
    var cap = b.capColor;
    // Element-specific: Army beret colour override
    if (b.id === 'army' && state.beretColor && BERET_COLORS[state.beretColor]) {
      cap = BERET_COLORS[state.beretColor];
    }
    var capDark = shade(cap, -20);
    var capLight = shade(cap, 16);
    var gold = '#d4af37', goldDark = '#b8962e', goldLight = '#f0d66a';
    var ink = OUTLINE;
    var shirt = shade(u, 28);

    var g = '<g class="cadet-bust">';

    /* ---- 1. NECK (skin-toned, connects chin to shoulders) ---- */
    // The neck is a tapered shape: narrow at chin, widening slightly
    // toward the shoulders. Drawn BEFORE the uniform so the collar
    // can overlap it. Centered on CX.
    var neckTopW = 52;  // half-width at chin
    var neckBotW = 68;  // half-width at shoulders
    g += '<path d="M ' + (CX - neckTopW) + ' ' + (CHIN_Y - 8) +
         ' C ' + (CX - neckTopW - 4) + ' ' + (CHIN_Y + 30) + ' ' +
               (CX - neckBotW) + ' ' + (SHOULDER_Y - 25) + ' ' +
               (CX - neckBotW) + ' ' + (SHOULDER_Y + 5) +
         ' L ' + (CX + neckBotW) + ' ' + (SHOULDER_Y + 5) +
         ' C ' + (CX + neckBotW) + ' ' + (SHOULDER_Y - 25) + ' ' +
               (CX + neckTopW + 4) + ' ' + (CHIN_Y + 30) + ' ' +
               (CX + neckTopW) + ' ' + (CHIN_Y - 8) +
         ' Z" fill="' + skinColor + '" stroke="' + ink + '" stroke-width="7" stroke-linejoin="round"/>';
    // Subtle neck shadow for depth
    g += '<path d="M ' + (CX - neckTopW + 6) + ' ' + (CHIN_Y + 10) +
         ' C ' + (CX - neckTopW + 2) + ' ' + (CHIN_Y + 45) + ' ' +
               (CX - neckBotW + 8) + ' ' + (SHOULDER_Y - 20) + ' ' +
               (CX - neckBotW + 8) + ' ' + (SHOULDER_Y) +
         ' L ' + (CX + neckBotW - 8) + ' ' + (SHOULDER_Y) +
         ' C ' + (CX + neckBotW - 8) + ' ' + (SHOULDER_Y - 20) + ' ' +
               (CX + neckTopW - 2) + ' ' + (CHIN_Y + 45) + ' ' +
               (CX + neckTopW - 6) + ' ' + (CHIN_Y + 10) +
         ' Z" fill="' + skinShadow + '" opacity="0.35"/>';
    // Collarbone shadow lines
    g += '<path d="M ' + (CX - neckBotW + 14) + ' ' + (SHOULDER_Y - 5) +
         ' Q ' + CX + ' ' + (SHOULDER_Y + 2) + ' ' + (CX + neckBotW - 14) + ' ' + (SHOULDER_Y - 5) +
         '" fill="none" stroke="' + skinShadow + '" stroke-width="4" stroke-linecap="round" opacity="0.3"/>';

    /* ---- 2. SHOULDERS + UPPER TORSO (uniform) ---- */
    // A smooth bust silhouette: shoulders curve up from the sides,
    // then the torso fills down to the bottom of the canvas.
    // Wide enough to look like a proper bust portrait.
    var shoulderHalfW = 225; // half-width of shoulders
    var torsoTopY = SHOULDER_Y - 8;
    g += '<path d="M ' + (CX - shoulderHalfW) + ' ' + torsoTopY +
         ' C ' + (CX - shoulderHalfW + 8) + ' ' + (torsoTopY - 35) + ' ' +   // left shoulder peak
               (CX - 120) + ' ' + (torsoTopY - 42) + ' ' +
               (CX - 75) + ' ' + (torsoTopY - 28) +
         ' C ' + (CX - 40) + ' ' + (torsoTopY - 14) + ' ' +
               (CX - neckBotW + 2) + ' ' + (torsoTopY - 4) + ' ' +
               (CX - neckBotW + 2) + ' ' + (torsoTopY + 2) +
         ' L ' + (CX + neckBotW - 2) + ' ' + (torsoTopY + 2) +
         ' C ' + (CX + neckBotW - 2) + ' ' + (torsoTopY - 4) + ' ' +
               (CX + 40) + ' ' + (torsoTopY - 14) + ' ' +
               (CX + 75) + ' ' + (torsoTopY - 28) +
         ' C ' + (CX + 120) + ' ' + (torsoTopY - 42) + ' ' +
               (CX + shoulderHalfW - 8) + ' ' + (torsoTopY - 35) + ' ' +
               (CX + shoulderHalfW) + ' ' + torsoTopY +
         ' L ' + (CX + shoulderHalfW + 30) + ' 762' +
         ' L ' + (CX - shoulderHalfW - 30) + ' 762 Z" fill="' + u + '" stroke="' + ink + '" stroke-width="9" stroke-linejoin="round"/>';
    // Inner shadow for depth (darker uniform)
    g += '<path d="M ' + (CX - shoulderHalfW + 18) + ' ' + (torsoTopY + 5) +
         ' C ' + (CX - shoulderHalfW + 24) + ' ' + (torsoTopY - 22) + ' ' +
               (CX - 115) + ' ' + (torsoTopY - 30) + ' ' +
               (CX - 72) + ' ' + (torsoTopY - 18) +
         ' C ' + (CX - 38) + ' ' + (torsoTopY - 6) + ' ' +
               (CX - neckBotW + 8) + ' ' + (torsoTopY + 2) + ' ' +
               (CX - neckBotW + 8) + ' ' + (torsoTopY + 8) +
         ' L ' + (CX + neckBotW - 8) + ' ' + (torsoTopY + 8) +
         ' C ' + (CX + neckBotW - 8) + ' ' + (torsoTopY + 2) + ' ' +
               (CX + 38) + ' ' + (torsoTopY - 6) + ' ' +
               (CX + 72) + ' ' + (torsoTopY - 18) +
         ' C ' + (CX + 115) + ' ' + (torsoTopY - 30) + ' ' +
               (CX + shoulderHalfW - 24) + ' ' + (torsoTopY - 22) + ' ' +
               (CX + shoulderHalfW - 18) + ' ' + (torsoTopY + 5) +
         ' L ' + (CX + shoulderHalfW + 18) + ' 762' +
         ' L ' + (CX - shoulderHalfW - 18) + ' 762 Z" fill="' + ud + '" opacity="0.45"/>';
    // Highlight across upper chest
    g += '<path d="M ' + (CX - 150) + ' ' + (torsoTopY + 18) +
         ' C ' + (CX - 80) + ' ' + (torsoTopY + 8) + ' ' +
               (CX + 80) + ' ' + (torsoTopY + 8) + ' ' +
               (CX + 150) + ' ' + (torsoTopY + 18) +
         '" fill="none" stroke="' + uLight + '" stroke-width="6" stroke-linecap="round" opacity="0.6"/>';

    /* ---- 3. COLLAR / V-NECK (branch-specific) ---- */
    // The collar opens at the neck base and creates a V or round neck.
    // Drawn ON TOP of the uniform so it frames the neck.
    if (b.id === 'sea') {
      var scarfColor = SCARF_COLORS[state.neckerchief] || '#1a1a1a';
      var isRoundCollar = state.collar === 'roundCollar';
      if (isRoundCollar) {
        // Round sailor collar (flared)
        g += '<path d="M ' + (CX - 80) + ' ' + (torsoTopY - 8) +
             ' C ' + (CX - 30) + ' ' + (torsoTopY + 18) + ' ' +
                   (CX + 30) + ' ' + (torsoTopY + 18) + ' ' +
                   (CX + 80) + ' ' + (torsoTopY - 8) +
             ' C ' + (CX + 70) + ' ' + (torsoTopY + 30) + ' ' +
                   (CX + 30) + ' ' + (torsoTopY + 55) + ' ' +
                   CX + ' ' + (torsoTopY + 62) +
             ' C ' + (CX - 30) + ' ' + (torsoTopY + 55) + ' ' +
                   (CX - 70) + ' ' + (torsoTopY + 30) + ' ' +
                   (CX - 80) + ' ' + (torsoTopY - 8) +
             ' Z" fill="' + cap + '" stroke="' + ink + '" stroke-width="6" stroke-linejoin="round"/>';
      } else {
        // Standard sailor collar with V-neck
        g += '<path d="M ' + (CX - 72) + ' ' + (torsoTopY - 6) +
             ' C ' + (CX - 28) + ' ' + (torsoTopY + 14) + ' ' +
                   (CX - 12) + ' ' + (torsoTopY + 22) + ' ' +
                   (CX - 4) + ' ' + (torsoTopY + 26) +
             ' L ' + CX + ' ' + (torsoTopY + 48) +
             ' L ' + (CX + 4) + ' ' + (torsoTopY + 26) +
             ' C ' + (CX + 12) + ' ' + (torsoTopY + 22) + ' ' +
                   (CX + 28) + ' ' + (torsoTopY + 14) + ' ' +
                   (CX + 72) + ' ' + (torsoTopY - 6) +
             ' C ' + (CX + 65) + ' ' + (torsoTopY + 28) + ' ' +
                   (CX + 28) + ' ' + (torsoTopY + 50) + ' ' +
                   (CX + 4) + ' ' + (torsoTopY + 54) +
             ' L ' + CX + ' ' + (torsoTopY + 72) +
             ' L ' + (CX - 4) + ' ' + (torsoTopY + 54) +
             ' C ' + (CX - 28) + ' ' + (torsoTopY + 50) + ' ' +
                   (CX - 65) + ' ' + (torsoTopY + 28) + ' ' +
                   (CX - 72) + ' ' + (torsoTopY - 6) +
             ' Z" fill="' + cap + '" stroke="' + ink + '" stroke-width="6" stroke-linejoin="round"/>';
      }
      // Neckerchief/scarf in the V
      g += '<path d="M ' + (CX - 18) + ' ' + (torsoTopY + 22) +
           ' C ' + (CX - 8) + ' ' + (torsoTopY + 38) + ' ' +
                 (CX - 2) + ' ' + (torsoTopY + 48) + ' ' +
                 CX + ' ' + (torsoTopY + 52) +
           ' C ' + (CX + 2) + ' ' + (torsoTopY + 48) + ' ' +
                 (CX + 8) + ' ' + (torsoTopY + 38) + ' ' +
                 (CX + 18) + ' ' + (torsoTopY + 22) +
           ' C ' + (CX + 14) + ' ' + (torsoTopY + 56) + ' ' +
                 (CX + 6) + ' ' + (torsoTopY + 66) + ' ' +
                 CX + ' ' + (torsoTopY + 70) +
           ' C ' + (CX - 6) + ' ' + (torsoTopY + 66) + ' ' +
                 (CX - 14) + ' ' + (torsoTopY + 56) + ' ' +
                 (CX - 18) + ' ' + (torsoTopY + 22) +
           ' Z" fill="' + scarfColor + '" opacity="0.9"/>';
    } else if (b.id === 'air') {
      // Air cadet: open-collar shirt with V-neck and tie
      g += '<path d="M ' + (CX - 55) + ' ' + (torsoTopY - 4) +
           ' C ' + (CX - 20) + ' ' + (torsoTopY + 16) + ' ' +
                 (CX - 8) + ' ' + (torsoTopY + 24) + ' ' +
                 (CX - 2) + ' ' + (torsoTopY + 28) +
           ' L ' + CX + ' ' + (torsoTopY + 52) +
           ' L ' + (CX + 2) + ' ' + (torsoTopY + 28) +
           ' C ' + (CX + 8) + ' ' + (torsoTopY + 24) + ' ' +
                 (CX + 20) + ' ' + (torsoTopY + 16) + ' ' +
                 (CX + 55) + ' ' + (torsoTopY - 4) +
           ' Z" fill="' + shirt + '" stroke="' + ink + '" stroke-width="6" stroke-linejoin="round"/>';
      // Tie/knot
      g += '<path d="M ' + (CX - 10) + ' ' + (torsoTopY + 22) +
           ' C ' + (CX - 4) + ' ' + (torsoTopY + 30) + ' ' +
                 (CX - 2) + ' ' + (torsoTopY + 38) + ' ' +
                 CX + ' ' + (torsoTopY + 42) +
           ' C ' + (CX + 2) + ' ' + (torsoTopY + 38) + ' ' +
                 (CX + 4) + ' ' + (torsoTopY + 30) + ' ' +
                 (CX + 10) + ' ' + (torsoTopY + 22) +
           ' C ' + (CX + 8) + ' ' + (torsoTopY + 56) + ' ' +
                 (CX + 4) + ' ' + (torsoTopY + 68) + ' ' +
                 CX + ' ' + (torsoTopY + 74) +
           ' C ' + (CX - 4) + ' ' + (torsoTopY + 68) + ' ' +
                 (CX - 8) + ' ' + (torsoTopY + 56) + ' ' +
                 (CX - 10) + ' ' + (torsoTopY + 22) +
           ' Z" fill="' + ud + '" opacity="0.9"/>';
      // Tie highlight
      g += '<path d="M ' + (CX + 2) + ' ' + (torsoTopY + 30) +
           ' L ' + (CX + 4) + ' ' + (torsoTopY + 62) +
           '" fill="none" stroke="' + shade(ud, 18) + '" stroke-width="3" stroke-linecap="round" opacity="0.5"/>';
    } else {
      // Army cadet: high-collar tunic with V-neck opening
      g += '<path d="M ' + (CX - 48) + ' ' + (torsoTopY - 2) +
           ' C ' + (CX - 18) + ' ' + (torsoTopY + 18) + ' ' +
                 (CX - 6) + ' ' + (torsoTopY + 26) + ' ' +
                 (CX - 2) + ' ' + (torsoTopY + 30) +
           ' L ' + CX + ' ' + (torsoTopY + 54) +
           ' L ' + (CX + 2) + ' ' + (torsoTopY + 30) +
           ' C ' + (CX + 6) + ' ' + (torsoTopY + 26) + ' ' +
                 (CX + 18) + ' ' + (torsoTopY + 18) + ' ' +
                 (CX + 48) + ' ' + (torsoTopY - 2) +
           ' Z" fill="' + ud + '" stroke="' + ink + '" stroke-width="7" stroke-linejoin="round"/>';
      // Inner collar shadow
      g += '<path d="M ' + (CX - 6) + ' ' + (torsoTopY + 24) +
           ' C ' + (CX - 2) + ' ' + (torsoTopY + 34) + ' ' +
                 CX + ' ' + (torsoTopY + 42) + ' ' +
                 CX + ' ' + (torsoTopY + 46) +
           ' C ' + (CX + 2) + ' ' + (torsoTopY + 34) + ' ' +
                 (CX + 6) + ' ' + (torsoTopY + 24) + ' ' +
                 (CX + 6) + ' ' + (torsoTopY + 24) +
           ' Z" fill="' + shade(u, -16) + '" opacity="0.7"/>';
    }

    /* ---- 4. EPAULETTES (shoulder boards) ---- */
    g += _epaulette('left',  gold, goldDark, goldLight, ink, CX, torsoTopY);
    g += _epaulette('right', gold, goldDark, goldLight, ink, CX, torsoTopY);

    /* ---- 5. CHEST BADGE ---- */
    g += _chestBadge(b, gold, goldDark, goldLight, ink, ud, CX, torsoTopY);

    /* ---- 6. Air cadet chest wings ---- */
    if (b.id === 'air' && state.chestWings && state.chestWings !== 'noWings') {
      g += _chestWings(state.chestWings, gold, goldDark, ink, CX, torsoTopY);
    }

    /* ---- 7. HEADGEAR (positioned above the head, on top of hair) ---- */
    g += _headgear(b, cap, capDark, capLight, gold, goldDark, goldLight, ink, u, ud, CX, state);

    g += '</g>';
    return g;
  }

  /* ---- Epaulette (shoulder board) ---- */
  function _epaulette(dir, gold, goldDark, goldLight, ink, CX, torsoTopY) {
    CX = CX || 300;
    torsoTopY = torsoTopY || 627;
    // Position epaulettes on the shoulder peaks
    var cx = dir === 'left' ? CX - 150 : CX + 150;
    var yTop = torsoTopY - 8;
    var s = '';
    s += '<path d="M ' + (cx-48) + ' ' + (yTop+10) +
         ' C ' + (cx-50) + ' ' + (yTop-6) + ' ' + (cx-30) + ' ' + (yTop-14) + ' ' + cx + ' ' + (yTop-14) +
         ' C ' + (cx+30) + ' ' + (yTop-14) + ' ' + (cx+50) + ' ' + (yTop-6) + ' ' + (cx+48) + ' ' + (yTop+10) +
         ' C ' + (cx+44) + ' ' + (yTop+24) + ' ' + (cx+24) + ' ' + (yTop+30) + ' ' + cx + ' ' + (yTop+30) +
         ' C ' + (cx-24) + ' ' + (yTop+30) + ' ' + (cx-44) + ' ' + (yTop+24) + ' ' + (cx-48) + ' ' + (yTop+10) +
         ' Z" fill="' + gold + '" stroke="' + ink + '" stroke-width="5.5" stroke-linejoin="round"/>';
    s += '<path d="M ' + (cx-36) + ' ' + (yTop) +
         ' C ' + (cx-20) + ' ' + (yTop-8) + ' ' + (cx+20) + ' ' + (yTop-8) + ' ' + (cx+36) + ' ' + (yTop) +
         '" fill="none" stroke="' + goldLight + '" stroke-width="3.5" stroke-linecap="round" opacity="0.8"/>';
    s += '<circle cx="' + (cx-14) + '" cy="' + (yTop+12) + '" r="4.5" fill="' + goldDark + '" stroke="' + ink + '" stroke-width="2"/>';
    s += '<circle cx="' + (cx+14) + '" cy="' + (yTop+12) + '" r="4.5" fill="' + goldDark + '" stroke="' + ink + '" stroke-width="2"/>';
    return s;
  }

  /* ---- Chest badge (crest medallion) ---- */
  function _chestBadge(b, gold, goldDark, goldLight, ink, ud, CX, torsoTopY) {
    CX = CX || 300;
    torsoTopY = torsoTopY || 627;
    var cx = CX, cy = torsoTopY + 100;
    var s = '';
    s += '<circle cx="' + cx + '" cy="' + cy + '" r="36" fill="' + gold + '" stroke="' + ink + '" stroke-width="6.5"/>';
    s += '<circle cx="' + cx + '" cy="' + cy + '" r="26" fill="' + ud + '" stroke="' + goldDark + '" stroke-width="3"/>';
    for (var i = 0; i < 8; i++) {
      var a = (i / 8) * Math.PI * 2;
      var dx = cx + Math.cos(a) * 31;
      var dy = cy + Math.sin(a) * 31;
      s += '<circle cx="' + dx.toFixed(1) + '" cy="' + dy.toFixed(1) + '" r="2.2" fill="' + goldDark + '"/>';
    }
    s += '<text x="' + cx + '" y="' + (cy+13) + '" text-anchor="middle" font-size="34" font-weight="bold" fill="' + goldLight + '" style="font-family: ' + "'Russo One'" + ', Arial, sans-serif;">' + b.icon + '</text>';
    s += '<path d="M ' + (cx-27) + ' ' + (cy-7) + ' A 30 30 0 0 1 ' + (cx+7) + ' ' + (cy-30) + '" fill="none" stroke="' + goldLight + '" stroke-width="3.5" stroke-linecap="round" opacity="0.7"/>';
    return s;
  }

  /* ---- Headgear dispatcher ---- */
  function _headgear(b, cap, capDark, capLight, gold, goldDark, goldLight, ink, u, ud, CX, state) {
    CX = CX || 300;
    state = state || {};
    switch (b.capType) {
      case 'beret':  return _beretCap(b, cap, capDark, capLight, gold, goldDark, goldLight, ink, CX, state);
      case 'flight': return _flightCap(b, cap, capDark, capLight, gold, goldDark, goldLight, ink, u, ud, CX, state);
      case 'sailor': return _sailorCap(b, cap, capDark, capLight, gold, goldDark, goldLight, ink, u, ud, CX, state);
      default: return '';
    }
  }

  /* ---- Army beret ---- */
  function _beretCap(b, cap, capDark, capLight, gold, goldDark, goldLight, ink, CX, state) {
    CX = CX || 300;
    state = state || {};
    var s = '';
    // Beret body — sits on top of head, draped to the right.
    // Raised higher so it sits ON the head, not at forehead level.
    s += '<path d="M ' + (CX-135) + ' 250' +
         ' C ' + (CX-131) + ' 175 ' + (CX-68) + ' 130 ' + CX + ' 128' +
         ' C ' + (CX+172) + ' 130 ' + (CX+233) + ' 175 ' + (CX+237) + ' 250' +
         ' C ' + (CX+237) + ' 290 ' + (CX+188) + ' 305 ' + CX + ' 305' +
         ' C ' + (CX-88) + ' 305 ' + (CX-135) + ' 290 ' + (CX-135) + ' 250 Z" fill="' + cap + '" stroke="' + ink + '" stroke-width="9" stroke-linejoin="round"/>';
    // Beret band (darker rim)
    s += '<path d="M ' + (CX-121) + ' 250' +
         ' C ' + (CX-117) + ' 215 ' + (CX-62) + ' 185 ' + CX + ' 183' +
         ' C ' + (CX+166) + ' 185 ' + (CX+221) + ' 215 ' + (CX+225) + ' 250" fill="none" stroke="' + capDark + '" stroke-width="10" stroke-linecap="round"/>';
    // Highlight sweep
    s += '<path d="M ' + (CX+96) + ' 150' +
         ' C ' + (CX+158) + ' 154 ' + (CX+213) + ' 180 ' + (CX+231) + ' 230" fill="none" stroke="' + capLight + '" stroke-width="8" stroke-linecap="round" opacity="0.7"/>';
    // Cap badge
    var bx = CX + 25, by = 218;
    s += '<circle cx="' + bx + '" cy="' + by + '" r="20" fill="' + gold + '" stroke="' + ink + '" stroke-width="4.5"/>';
    s += '<circle cx="' + bx + '" cy="' + by + '" r="14" fill="' + capDark + '" stroke="' + goldDark + '" stroke-width="2"/>';
    var badgeStyle = (state && state.capBadge) ? state.capBadge : 'capBadge';
    var badgeIcon = badgeStyle === 'glengarry' ? '\u2694' : (badgeStyle === 'lyonCrest' ? '\u2693' : b.icon);
    s += '<text x="' + bx + '" y="' + (by+6) + '" text-anchor="middle" font-size="20" font-weight="bold" fill="' + goldLight + '" style="font-family: ' + "'Russo One'" + ', Arial, sans-serif;">' + badgeIcon + '</text>';
    // Bottom rim highlight
    s += '<path d="M ' + (CX-105) + ' 268' +
         ' C ' + (CX-46) + ' 290 ' + (CX+148) + ' 290 ' + (CX+207) + ' 268" fill="none" stroke="' + capLight + '" stroke-width="4" stroke-linecap="round" opacity="0.55"/>';
    return s;
  }

  /* ---- Air cadet wedge cap ---- */
  function _flightCap(b, cap, capDark, capLight, gold, goldDark, goldLight, ink, u, ud, CX, state) {
    CX = CX || 300;
    state = state || {};
    var s = '';
    // Wedge body — angled, peak at top. Raised to sit on head.
    s += '<path d="M ' + (CX-142) + ' 300' +
         ' C ' + (CX-144) + ' 210 ' + (CX-66) + ' 160 ' + CX + ' 156' +
         ' C ' + (CX+172) + ' 160 ' + (CX+248) + ' 210 ' + (CX+246) + ' 300' +
         ' C ' + (CX+246) + ' 314 ' + (CX+230) + ' 318 ' + CX + ' 318' +
         ' C ' + (CX-128) + ' 318 ' + (CX-142) + ' 314 ' + (CX-142) + ' 300 Z" fill="' + cap + '" stroke="' + ink + '" stroke-width="9" stroke-linejoin="round"/>';
    // Top seam highlight
    s += '<path d="M ' + (CX-124) + ' 220' +
         ' C ' + (CX-66) + ' 175 ' + (CX+14) + ' 156 ' + CX + ' 156' +
         ' C ' + (CX+96) + ' 156 ' + (CX+178) + ' 175 ' + (CX+232) + ' 220" fill="none" stroke="' + capLight + '" stroke-width="7" stroke-linecap="round" opacity="0.6"/>';
    // Bottom band
    s += '<path d="M ' + (CX-128) + ' 300' +
         ' C ' + (CX-124) + ' 260 ' + (CX-60) + ' 230 ' + CX + ' 228' +
         ' C ' + (CX+166) + ' 230 ' + (CX+230) + ' 260 ' + (CX+234) + ' 300" fill="none" stroke="' + capDark + '" stroke-width="11" stroke-linecap="round"/>';
    // Center crease
    s += '<path d="M ' + CX + ' 168 C ' + CX + ' 220 ' + CX + ' 268 ' + CX + ' 300" fill="none" stroke="' + capDark + '" stroke-width="5" stroke-linecap="round"/>';
    // Wedge badge
    var cx = CX, cy = 218;
    var wedgeStyle = (state && state.wedgeBadge) ? state.wedgeBadge : 'standard';
    if (wedgeStyle === 'plain') {
      s += '<circle cx="' + cx + '" cy="' + cy + '" r="10" fill="' + capDark + '" stroke="' + ink + '" stroke-width="3"/>';
    } else {
      var badgeIcon = wedgeStyle === 'airCrest' ? '\u2708' : b.icon;
      s += '<circle cx="' + cx + '" cy="' + cy + '" r="20" fill="' + gold + '" stroke="' + ink + '" stroke-width="4.5"/>';
      s += '<circle cx="' + cx + '" cy="' + cy + '" r="14" fill="' + capDark + '" stroke="' + goldDark + '" stroke-width="2"/>';
      s += '<text x="' + cx + '" y="' + (cy+7) + '" text-anchor="middle" font-size="20" font-weight="bold" fill="' + goldLight + '" style="font-family: ' + "'Russo One'" + ', Arial, sans-serif;">' + badgeIcon + '</text>';
    }
    return s;
  }

  /* ---- Sea cadet sailor cap ---- */
  function _sailorCap(b, cap, capDark, capLight, gold, goldDark, goldLight, ink, u, ud, CX, state) {
    CX = CX || 300;
    state = state || {};
    var s = '';
    // Sailor cap — round, wide brim. Raised to sit on head.
    s += '<path d="M ' + (CX-152) + ' 255' +
         ' C ' + (CX-152) + ' 185 ' + (CX-72) + ' 150 ' + CX + ' 148' +
         ' C ' + (CX+172) + ' 150 ' + (CX+252) + ' 185 ' + (CX+252) + ' 255' +
         ' C ' + (CX+252) + ' 290 ' + (CX+188) + ' 306 ' + CX + ' 306' +
         ' C ' + (CX-88) + ' 306 ' + (CX-152) + ' 290 ' + (CX-152) + ' 255 Z" fill="' + cap + '" stroke="' + ink + '" stroke-width="9" stroke-linejoin="round"/>';
    // Cap crown detail
    s += '<path d="M ' + (CX-138) + ' 255' +
         ' C ' + (CX-132) + ' 215 ' + (CX-58) + ' 185 ' + CX + ' 183' +
         ' C ' + (CX+158) + ' 185 ' + (CX+232) + ' 215 ' + (CX+238) + ' 255" fill="none" stroke="' + shade(cap, -8) + '" stroke-width="9" stroke-linecap="round"/>';
    // Top highlight
    s += '<path d="M ' + (CX-82) + ' 195' +
         ' C ' + (CX-10) + ' 170 ' + (CX+110) + ' 170 ' + (CX+182) + ' 195" fill="none" stroke="' + capLight + '" stroke-width="6" stroke-linecap="round" opacity="0.8"/>';
    // Cap tally (band with name)
    var tallyColor = (state && state.capTally && TALLY_COLORS[state.capTally]) ? TALLY_COLORS[state.capTally] : ud;
    var tallyInk = (state && state.capTally === 'whiteTally') ? '#999' : ink;
    s += '<path d="M ' + (CX-142) + ' 268' +
         ' C ' + (CX-72) + ' 292 ' + (CX+172) + ' 292 ' + (CX+242) + ' 268' +
         ' C ' + (CX+242) + ' 282 ' + (CX+172) + ' 302 ' + CX + ' 302' +
         ' C ' + (CX-72) + ' 302 ' + (CX-142) + ' 282 ' + (CX-142) + ' 268 Z" fill="' + tallyColor + '" stroke="' + tallyInk + '" stroke-width="4.5" stroke-linejoin="round"/>';
    s += '<path d="M ' + (CX-132) + ' 272' +
         ' C ' + (CX-68) + ' 290 ' + (CX+168) + ' 290 ' + (CX+232) + ' 272" fill="none" stroke="' + shade(tallyColor, 18) + '" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>';
    // Cap badge centered
    var rx = CX, ry = 258;
    s += '<circle cx="' + rx + '" cy="' + ry + '" r="18" fill="' + gold + '" stroke="' + ink + '" stroke-width="4.5"/>';
    s += '<circle cx="' + rx + '" cy="' + ry + '" r="12" fill="' + ud + '" stroke="' + goldDark + '" stroke-width="2"/>';
    s += '<text x="' + rx + '" y="' + (ry+6) + '" text-anchor="middle" font-size="18" font-weight="bold" fill="' + goldLight + '" style="font-family: ' + "'Russo One'" + ', Arial, sans-serif;">' + b.icon + '</text>';
    return s;
  }

  /* ---- Air cadet chest wings ---- */
  function _chestWings(type, gold, goldDark, ink, CX, torsoTopY) {
    CX = CX || 300;
    torsoTopY = torsoTopY || 627;
    var cx = CX, cy = torsoTopY + 60;
    var s = '';
    if (type === 'cadetWings') {
      s += '<path d="M ' + (cx-42) + ' ' + cy +
           ' Q ' + (cx-22) + ' ' + (cy-10) + ' ' + cx + ' ' + (cy-6) +
           ' Q ' + (cx+22) + ' ' + (cy-10) + ' ' + (cx+42) + ' ' + cy +
           ' Q ' + (cx+22) + ' ' + (cy+4) + ' ' + cx + ' ' + (cy+2) +
           ' Q ' + (cx-22) + ' ' + (cy+4) + ' ' + (cx-42) + ' ' + cy + ' Z" fill="' + gold + '" stroke="' + ink + '" stroke-width="3" stroke-linejoin="round"/>';
      s += '<circle cx="' + cx + '" cy="' + (cy-2) + '" r="6" fill="' + goldDark + '" stroke="' + ink + '" stroke-width="2"/>';
    } else if (type === 'pilotWings') {
      s += '<path d="M ' + (cx-54) + ' ' + cy +
           ' Q ' + (cx-30) + ' ' + (cy-12) + ' ' + cx + ' ' + (cy-8) +
           ' Q ' + (cx+30) + ' ' + (cy-12) + ' ' + (cx+54) + ' ' + cy +
           ' Q ' + (cx+30) + ' ' + (cy+6) + ' ' + cx + ' ' + (cy+3) +
           ' Q ' + (cx-30) + ' ' + (cy+6) + ' ' + (cx-54) + ' ' + cy + ' Z" fill="' + gold + '" stroke="' + ink + '" stroke-width="3" stroke-linejoin="round"/>';
      s += '<path d="M ' + (cx-42) + ' ' + cy + ' L ' + (cx-32) + ' ' + (cy-4) + ' M ' + (cx+42) + ' ' + cy + ' L ' + (cx+32) + ' ' + (cy-4) + '" fill="none" stroke="' + goldDark + '" stroke-width="2" stroke-linecap="round"/>';
      s += '<text x="' + cx + '" y="' + (cy+3) + '" text-anchor="middle" font-size="12" fill="' + ink + '" style="font-family:Arial,sans-serif;">\u2605</text>';
    }
    return s;
  }

  /* ---- Full avatar render into a target element ---- */
  function renderInto(el, state) {
    if (!el) return;
    var url = buildUrl(state);
    var b = getBranch(state.branch);
    el.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:' + b.color + ';font-weight:700;">Loading\u2026</div>';
    fetch(url)
      .then(function (r) { if (!r.ok) throw new Error('fetch'); return r.text(); })
      .then(function (svgText) {
        var closeIdx = svgText.lastIndexOf('</svg>');
        if (closeIdx === -1) { el.innerHTML = svgText; return; }
        var head = svgText.slice(0, closeIdx);
        var merged = head + overlaySvg(state) + '</svg>';
        el.innerHTML = merged;
      })
      .catch(function () {
        var meta = getBranch(state.branch);
        el.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:1.8rem;">' + meta.icon + '</div>';
      });
  }

  /* ---- Mini hero avatar: render the full bust but cropped
       to show head + neck + shoulders, suitable for a small
       circular profile button. ---- */
  function renderMini(el, state) {
    if (!el) return;
    var url = buildUrl(state);
    fetch(url)
      .then(function (r) { if (!r.ok) throw new Error('fetch'); return r.text(); })
      .then(function (svgText) {
        var closeIdx = svgText.lastIndexOf('</svg>');
        if (closeIdx === -1) { el.innerHTML = svgText; return; }
        var head = svgText.slice(0, closeIdx);
        var merged = head + overlaySvg(state) + '</svg>';
        // Extract inner content and wrap in a cropped viewBox.
        // Full canvas is 762×762. We crop to head + neck + top of shoulders.
        // x: 60..540 (480 wide), y: 90..680 (590 tall) — centered on CX=300.
        var innerStart = merged.indexOf('<svg');
        var innerContent = merged.slice(innerStart);
        var tagEnd = innerContent.indexOf('>') + 1;
        var contentOnly = innerContent.slice(tagEnd);
        contentOnly = contentOnly.replace(/<\/svg>\s*$/, '');
        contentOnly = contentOnly.replace(/<metadata[\s\S]*?<\/metadata>/, '');
        var miniSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="60 90 480 590" fill="none" shape-rendering="auto">' + contentOnly + '</svg>';
        el.innerHTML = miniSvg;
      })
      .catch(function () {
        var meta = getBranch(state.branch);
        el.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:1.4rem;">' + meta.icon + '</div>';
      });
  }

  /* ---- Expose the public API ---- */
  global.CadetAvatarRender = {
    BRANCHES: BRANCHES,
    SKIN_TONES: SKIN_TONES,
    HAIR_COLORS: HAIR_COLORS,
    buildUrl: buildUrl,
    overlaySvg: overlaySvg,
    renderInto: renderInto,
    renderMini: renderMini,
    getBranch: getBranch,
    getSkin: getSkin,
    shade: shade
  };
})(window);
