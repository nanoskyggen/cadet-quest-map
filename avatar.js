/* ============================================================
   AVATAR.JS — Cadet Avatar Customization Engine
   Uses the DiceBear Adventurer style (illustrated cartoon faces,
   CC BY 4.0 — Lisa Wischofsky via DiceBear) for the face/head,
   with a custom hand-drawn cadet uniform + headgear overlay so
   each cadet keeps their Army / Air / Sea branch identity.

   The uniform overlay is drawn in the SAME organic, hand-illustrated
   aesthetic as DiceBear Adventurer (black outline strokes, flat
   colour fills, organic bezier curves) so the cadet looks like one
   cohesive illustrated character.

   Option buttons show live mini DiceBear previews (same art style)
   instead of emoji / plain swatches, so the customizer and the
   avatar share one consistent illustrated look.

   Persists to localStorage and renders the badge inventory from
   the quest map's completed-lessons set.
   ============================================================ */

(function () {
  'use strict';

  /* ---------- LESSON DATA (mirrors script.js) ---------- */
  const LESSONS = [
    { id: 1, title: 'Cadet Basics', badge: 'badge_01_cadet_basics.png' },
    { id: 2, title: 'Drill & Parade', badge: 'badge_02_drill_and_parade.png' },
    { id: 3, title: 'Dress & Uniform', badge: 'badge_03_dress_and_uniform.png' },
    { id: 4, title: 'Citizenship', badge: 'badge_04_citizenship.png' },
    { id: 5, title: 'Parade Drill', badge: 'badge_05_parade_drill.png' },
    { id: 6, title: 'Navigation', badge: 'badge_06_navigation.png' },
    { id: 7, title: 'Radio Comms', badge: 'badge_07_radio_communications.png' },
    { id: 8, title: 'First Aid', badge: 'badge_08_first_aid.png' },
    { id: 9, title: 'Physical Fitness', badge: 'badge_09_physical_fitness.png' },
    { id: 10, title: 'Survival', badge: 'badge_10_survival.png' },
    { id: 11, title: 'Marksmanship', badge: 'badge_18_marksmanship_principles.png' },
    { id: 12, title: 'Air Cadet', badge: 'badge_13_air_program.png' },
    { id: 13, title: 'Army Cadet', badge: 'badge_14_army_program.png' },
    { id: 14, title: 'Sea Cadet', badge: 'badge_15_sea_program.png' },
    { id: 15, title: 'Music Program', badge: 'badge_16_music_theory.png' },
    { id: 16, title: 'Cyber Security', badge: 'badge_17_cyber_security.png' },
    { id: 17, title: 'Escape Room', badge: 'badge_19_escape_room.png' },
  ];

  const STORAGE_KEY = 'cadetAvatar';
  const COMPLETED_KEY = 'cadetMapDemoCompleted';
  const DICEBEAR_BASE = 'https://api.dicebear.com/10.x/adventurer/svg';
  const OUTLINE = '#1a1a1a';     // near-black outline used across the overlay

  /* ============================================================
     OPTION DEFINITIONS
     Each option maps the user's choice to a DiceBear Adventurer
     API parameter value (pinned with probability 100 so the
     choice is guaranteed rather than randomised).

     previewParams lets the option button render a *live* mini
     DiceBear avatar showing only that one feature, so the
     customizer buttons share the exact same illustrated art
     style as the main avatar.
     ============================================================ */

  const BRANCHES = [
    { id: 'army', label: 'Army', sub: 'Green Star', icon: '★', color: '#456534', uniform: '#4a5d3a', uniformDark: '#364428', capColor: '#3d4f2e', capType: 'beret', bg: '#dbe5cd' },
    { id: 'air',  label: 'Air',  sub: 'Level 1', icon: '✈', color: '#2f76d2', uniform: '#345f9e', uniformDark: '#243f6e', capColor: '#345f9e', capType: 'flight', bg: '#d6e6f7' },
    { id: 'sea',  label: 'Sea',  sub: 'Phase 1', icon: '⚓', color: '#1a3a5c', uniform: '#1e2d4a', uniformDark: '#121d33', capColor: '#f8fafc', capType: 'sailor', bg: '#d4e0ec' },
  ];

  /* Skin tones → DiceBear skinColor (custom hex) */
  const SKIN_TONES = [
    { id: 'fair',   label: 'Fair',   color: '#f4d4b0' },
    { id: 'light',  label: 'Light',  color: '#e8c298' },
    { id: 'medium', label: 'Medium', color: '#d4a574' },
    { id: 'tan',    label: 'Tan',    color: '#c08552' },
    { id: 'deep',   label: 'Deep',   color: '#8b5a2b' },
  ];

  /* Hair styles → DiceBear hairVariant (expanded: 4 → 12)
     Long styles are locked behind Physical Fitness (lesson 9)
     to represent grooming / fitness standards. */
  const HAIR_STYLES = [
    { id: 'short01', label: 'Short',  param: 'hairVariant' },
    { id: 'short02', label: 'Tousle', param: 'hairVariant' },
    { id: 'short05', label: 'Spiky',  param: 'hairVariant' },
    { id: 'short07', label: 'Swept',  param: 'hairVariant' },
    { id: 'short10', label: 'Crop',   param: 'hairVariant' },
    { id: 'short13', label: 'Side',   param: 'hairVariant' },
    { id: 'short19', label: 'Buzz',   param: 'hairVariant' },
    { id: 'long04',  label: 'Bob',    param: 'hairVariant', unlock: 9 },
    { id: 'long07',  label: 'Wavy',   param: 'hairVariant', unlock: 9 },
    { id: 'long12',  label: 'Long',   param: 'hairVariant', unlock: 9 },
    { id: 'long16',  label: 'Flow',   param: 'hairVariant', unlock: 9 },
    { id: 'long22',  label: 'Curl',   param: 'hairVariant', unlock: 9 },
  ];

  /* Hair colors → DiceBear hairColor (custom hex) */
  const HAIR_COLORS = [
    { id: 'black',  label: 'Black',  color: '#2a2a2a' },
    { id: 'brown',  label: 'Brown',  color: '#5c3a1e' },
    { id: 'auburn', label: 'Auburn', color: '#8b4513' },
    { id: 'blonde', label: 'Blonde', color: '#d4a84b' },
    { id: 'red',    label: 'Red',    color: '#b5421e' },
    { id: 'gray',   label: 'Silver', color: '#9aa0a6' },
  ];

  /* Eyes → DiceBear eyesVariant (expanded: 5 → 10)
     Bold eyes unlock via Survival training (lesson 10). */
  const EYE_VARIANTS = [
    { id: 'variant01', label: 'Bright', param: 'eyesVariant' },
    { id: 'variant04', label: 'Round',  param: 'eyesVariant' },
    { id: 'variant08', label: 'Soft',   param: 'eyesVariant' },
    { id: 'variant10', label: 'Almond', param: 'eyesVariant' },
    { id: 'variant12', label: 'Calm',   param: 'eyesVariant' },
    { id: 'variant15', label: 'Sharp',  param: 'eyesVariant' },
    { id: 'variant18', label: 'Wide',   param: 'eyesVariant' },
    { id: 'variant20', label: 'Sparkle',param: 'eyesVariant' },
    { id: 'variant23', label: 'Dreamy', param: 'eyesVariant' },
    { id: 'variant26', label: 'Bold',   param: 'eyesVariant', unlock: 10 },
  ];

  /* Expressions → DiceBear mouthVariant (expanded: 4 → 8)
     Cool unlocks via Marksmanship (11); Cheeky via Escape Room (17). */
  const EXPRESSIONS = [
    { id: 'variant01', label: 'Smile',   param: 'mouthVariant' },
    { id: 'variant03', label: 'Grin',    param: 'mouthVariant' },
    { id: 'variant05', label: 'Beam',    param: 'mouthVariant' },
    { id: 'variant09', label: 'Cool',    param: 'mouthVariant', unlock: 11 },
    { id: 'variant12', label: 'Smirk',   param: 'mouthVariant' },
    { id: 'variant17', label: 'Serious', param: 'mouthVariant' },
    { id: 'variant22', label: 'Gasp',    param: 'mouthVariant' },
    { id: 'variant28', label: 'Cheeky',  param: 'mouthVariant', unlock: 17 },
  ];

  /* Eyebrows → DiceBear eyebrowsVariant (NEW category, 6 options) */
  const EYEBROWS = [
    { id: 'variant01', label: 'Soft',   param: 'eyebrowsVariant' },
    { id: 'variant03', label: 'Arch',   param: 'eyebrowsVariant' },
    { id: 'variant06', label: 'Straight',param: 'eyebrowsVariant' },
    { id: 'variant09', label: 'Raise',  param: 'eyebrowsVariant' },
    { id: 'variant12', label: 'Thick',  param: 'eyebrowsVariant' },
    { id: 'variant15', label: 'Angle',  param: 'eyebrowsVariant' },
  ];

  /* Details → DiceBear detailsVariant (NEW category, 5 options incl none)
     Mustache unlocks via Music Program (15) — bandmaster flair. */
  const DETAILS = [
    { id: 'none',      label: 'None',     param: 'detailsVariant', variant: '' },
    { id: 'freckles',  label: 'Freckles', param: 'detailsVariant', variant: 'freckles' },
    { id: 'blush',     label: 'Blush',    param: 'detailsVariant', variant: 'blush' },
    { id: 'birthmark', label: 'Mark',     param: 'detailsVariant', variant: 'birthmark' },
    { id: 'mustache',  label: 'Mustache', param: 'detailsVariant', variant: 'mustache', unlock: 15 },
  ];

  /* Earrings → DiceBear earringsVariant (NEW category, 4 options)
     Hoop and Drop unlock via Citizenship (4) — achievement adornments. */
  const EARRINGS = [
    { id: 'none',      label: 'None',    param: 'earringsVariant', variant: '' },
    { id: 'variant01', label: 'Stud',    param: 'earringsVariant', variant: 'variant01' },
    { id: 'variant03', label: 'Hoop',    param: 'earringsVariant', variant: 'variant03', unlock: 4 },
    { id: 'variant05', label: 'Drop',    param: 'earringsVariant', variant: 'variant05', unlock: 4 },
  ];

  /* Accessories → DiceBear glassesVariant (expanded: 4 → 5)
     Round unlocks via Radio Comms (7); Shades via Cyber Security (16). */
  const ACCESSORIES = [
    { id: 'none',      label: 'None',    param: 'glassesVariant', variant: '' },
    { id: 'variant01', label: 'Square',  param: 'glassesVariant', variant: 'variant01' },
    { id: 'variant02', label: 'Round',   param: 'glassesVariant', variant: 'variant02', unlock: 7 },
    { id: 'variant03', label: 'Oval',    param: 'glassesVariant', variant: 'variant03' },
    { id: 'variant05', label: 'Shades',  param: 'glassesVariant', variant: 'variant05', unlock: 16 },
  ];

  /* ============================================================
     ELEMENT-SPECIFIC OPTIONS (NEW)
     Branch-unique customizations that modify the uniform overlay
     (not DiceBear). Each branch has its own set of gear/extras.
     Options with an `unlock` lesson ID are locked until that
     course is completed.

     All Army options are cadet-friendly — NO weapons, webbing,
     or tactical vests. Focus is on dress uniform variations,
     cap colours, and badge styles.
     ============================================================ */

  /* Army-specific: beret colour + cap badge style */
  const ARMY_OPTS = [
    { group: 'Beret Colour', opts: [
      { id: 'rifleGreen', label: 'Rifle Green', color: '#3d4f2e' },
      { id: 'olive',      label: 'Olive',       color: '#5c6e3a' },
      { id: 'khaki',      label: 'Khaki',       color: '#a0936b' },
      { id: 'black',      label: 'Black',       color: '#2a2a2a' },
    ]},
    { group: 'Cap Badge', opts: [
      { id: 'capBadge',   label: 'Cap Badge' },
      { id: 'glengarry',  label: 'Glengarry Badge', unlock: 3 },
      { id: 'lyonCrest',  label: 'Lyon Crest',     unlock: 13 },
    ]},
  ];

  /* Air-specific: wedge badge + chest wings */
  const AIR_OPTS = [
    { group: 'Wedge Badge', opts: [
      { id: 'standard',   label: 'Standard' },
      { id: 'airCrest',   label: 'Air Cadet Crest', unlock: 12 },
      { id: 'plain',      label: 'Plain' },
    ]},
    { group: 'Chest Wings', opts: [
      { id: 'noWings',    label: 'None' },
      { id: 'cadetWings', label: 'Cadet Wings',     unlock: 12 },
      { id: 'pilotWings', label: 'Glider Wings',    unlock: 12 },
    ]},
  ];

  /* Sea-specific: cap tally + neckerchief + collar style */
  const SEA_OPTS = [
    { group: 'Cap Tally', opts: [
      { id: 'navyTally',  label: 'Navy',   color: '#1e2d4a' },
      { id: 'blackTally', label: 'Black',  color: '#1a1a1a' },
      { id: 'whiteTally', label: 'White',  color: '#e8e8e8' },
    ]},
    { group: 'Neckerchief', opts: [
      { id: 'blackScarf', label: 'Black' },
      { id: 'navyScarf',  label: 'Navy' },
      { id: 'whiteScarf', label: 'White' },
    ]},
    { group: 'Collar', opts: [
      { id: 'squareRig',  label: 'Square Rig' },
      { id: 'roundCollar',label: 'Round Collar', unlock: 14 },
    ]},
  ];

  /* Map branch → element options array */
  const ELEMENT_OPTS = { army: ARMY_OPTS, air: AIR_OPTS, sea: SEA_OPTS };

  /* Default element-specific state per branch */
  const ELEMENT_DEFAULTS = {
    army: { beretColor: 'rifleGreen', capBadge: 'capBadge' },
    air:  { wedgeBadge: 'standard',   chestWings: 'noWings' },
    sea:  { capTally: 'navyTally',    neckerchief: 'blackScarf', collar: 'squareRig' },
  };

  /* Flatten all element opts for lookup */
  const ALL_ELEMENT_OPTS = [];
  Object.keys(ELEMENT_OPTS).forEach(branch => {
    ELEMENT_OPTS[branch].forEach(group => {
      group.opts.forEach(opt => {
        ALL_ELEMENT_OPTS.push(Object.assign({ branch, group: group.group }, opt));
      });
    });
  });

  function getElementOpt(branch, stateKey, id) {
    const groups = ELEMENT_OPTS[branch] || [];
    for (const g of groups) {
      const found = g.opts.find(o => o.id === id);
      if (found) return found;
    }
    return null;
  }

  /* ---------- DEFAULT STATE ---------- */
  const DEFAULT_STATE = {
    name: 'Cadet',
    branch: 'army',
    skin: 'light',
    hair: 'short01',
    hairColor: 'brown',
    eye: 'variant01',
    expression: 'variant01',
    eyebrows: 'variant01',
    details: 'none',
    earrings: 'none',
    accessory: 'none',
    beretColor: 'rifleGreen',
    capBadge: 'capBadge',
    wedgeBadge: 'standard',
    chestWings: 'noWings',
    capTally: 'navyTally',
    neckerchief: 'blackScarf',
    collar: 'squareRig',
  };

  let state = loadState();

  /* ---------- DOM REFS ---------- */
  const $ = (id) => document.getElementById(id);
  const svgWrap = $('avatarSvgWrap');
  const nameInput = $('avatarName');
  const nameDisplay = $('avatarNameDisplay');
  const branchDisplay = $('avatarBranchDisplay');
  const branchIcon = $('avatarBranchIcon');
  const branchText = $('avatarBranchText');

  /* ---------- STORAGE ---------- */
  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        const merged = Object.assign({}, DEFAULT_STATE, parsed);
        // Migrate old hair ids to DiceBear hairVariant ids
        if (!HAIR_STYLES.some(h => h.id === merged.hair)) {
          const legacy = { short: 'short01', spiky: 'short05', buzz: 'short19', bob: 'long04' };
          merged.hair = legacy[merged.hair] || 'short01';
        }
        // Migrate old eye ids
        if (!EYE_VARIANTS.some(e => e.id === merged.eye)) {
          merged.eye = 'variant01';
        }
        // Migrate old expression ids to mouthVariant ids
        if (!EXPRESSIONS.some(e => e.id === merged.expression)) {
          const legacy = { smile: 'variant01', grin: 'variant05', cool: 'variant09', serious: 'variant22' };
          merged.expression = legacy[merged.expression] || 'variant01';
        }
        // Migrate old accessory ids to glassesVariant ids
        if (!ACCESSORIES.some(a => a.id === merged.accessory)) {
          const legacy = { none: 'none', glasses: 'variant01', shades: 'variant05', headphones: 'none' };
          merged.accessory = legacy[merged.accessory] || 'none';
        }
        // New keys default if missing
        if (!EYEBROWS.some(e => e.id === merged.eyebrows)) merged.eyebrows = 'variant01';
        if (!DETAILS.some(d => d.id === merged.details)) merged.details = 'none';
        if (!EARRINGS.some(e => e.id === merged.earrings)) merged.earrings = 'none';
        // Element-specific keys: default if missing or invalid
        const ed = ELEMENT_DEFAULTS[merged.branch] || ELEMENT_DEFAULTS.army;
        Object.keys(ed).forEach(key => {
          if (!merged[key] || !getElementOpt(merged.branch, key, merged[key])) {
            merged[key] = ed[key];
          }
        });
        return merged;
      }
    } catch (e) { /* ignore */ }
    return Object.assign({}, DEFAULT_STATE);
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      return true;
    } catch (e) { return false; }
  }

  /* ---------- LOOKUP HELPERS ---------- */
  function getBranch(id) { return BRANCHES.find(b => b.id === id) || BRANCHES[0]; }
  function getSkin(id) { return SKIN_TONES.find(s => s.id === id) || SKIN_TONES[1]; }
  function getHairColor(id) { return HAIR_COLORS.find(h => h.id === id) || HAIR_COLORS[1]; }

  /* ---------- COURSE-LOCK LOGIC ----------
     Options with an `unlock` property (a lesson ID) are only
     selectable once that lesson appears in the completed set
     (cadetMapDemoCompleted localStorage). Locked options show
     a lock badge + the course name that unlocks them. */
  function unlockLesson(id) {
    return LESSONS.find(l => l.id === id) || null;
  }

  function isUnlocked(opt) {
    if (!opt || !opt.unlock) return true; // no lock → always available
    return getCompleted().has(opt.unlock);
  }

  function unlockHint(opt) {
    const lesson = unlockLesson(opt.unlock);
    if (!lesson) return '';
    return tr('Complete') + ' ' + tr(lesson.title);
  }

  /* ============================================================
     DICEBEAR ADVENTURER INTEGRATION
     Builds the API URL from the cadet state, fetches the SVG,
     and overlays the hand-drawn cadet uniform + headgear so the
     branch identity (Army / Air / Sea) is preserved.
     DiceBear canvas: viewBox 0 0 762 762.
     ============================================================ */

  function buildDiceBearUrl() {
    const skin = getSkin(state.skin);
    const hc = getHairColor(state.hairColor);
    const acc = ACCESSORIES.find(a => a.id === state.accessory) || ACCESSORIES[0];
    const det = DETAILS.find(d => d.id === state.details) || DETAILS[0];
    const ear = EARRINGS.find(e => e.id === state.earrings) || EARRINGS[0];
    const b = getBranch(state.branch);

    const params = new URLSearchParams();
    params.set('seed', state.name && state.name.trim() ? state.name.trim() : 'Cadet');
    params.set('skinColor', skin.color);
    params.set('hairColor', hc.color);
    params.set('hairVariant', state.hair);
    params.set('hairProbability', '100');
    params.set('eyesVariant', state.eye);
    params.set('eyesProbability', '100');
    params.set('mouthVariant', state.expression);
    params.set('mouthProbability', '100');
    params.set('eyebrowsVariant', state.eyebrows);
    params.set('eyebrowsProbability', '100');
    if (det.variant) {
      params.set('detailsVariant', det.variant);
      params.set('detailsProbability', '100');
    }
    if (ear.variant) {
      params.set('earringsVariant', ear.variant);
      params.set('earringsProbability', '100');
    }
    if (acc.variant) {
      params.set('glassesVariant', acc.variant);
      params.set('glassesProbability', '100');
    }
    params.set('backgroundColor', b.bg);
    params.set('radius', '50');

    return DICEBEAR_BASE + '?' + params.toString();
  }

  /* ============================================================
     ILLUSTRATED BUST OVERLAY — delegated to shared module
     ============================================================
     The bust overlay (neck + shoulders + uniform + headgear) is
     rendered by CadetAvatarRender.overlaySvg(state) in
     avatar-render.js. This keeps a single source of truth for the
     bust geometry shared between the customization page and the
     quest map hero profile button.
     ============================================================ */

  function uniformOverlay() {
    return CadetAvatarRender.overlaySvg(state);
  }


  /* ---------- RENDER: fetch DiceBear SVG, inject + overlay ---------- */
  let renderToken = 0;

  function renderAvatar() {
    const myToken = ++renderToken;
    const url = buildDiceBearUrl();

    const b = getBranch(state.branch);
    svgWrap.innerHTML = `<div class="avatar-loading" style="display:flex;align-items:center;justify-content:center;height:100%;color:${b.color};font-weight:700;">Loading cadet…</div>`;

    fetch(url)
      .then(r => {
        if (!r.ok) throw new Error('DiceBear fetch failed: ' + r.status);
        return r.text();
      })
      .then(svgText => {
        if (myToken !== renderToken) return;
        let inner = svgText;
        const closeIdx = inner.lastIndexOf('</svg>');
        if (closeIdx === -1) {
          svgWrap.innerHTML = svgText;
          return;
        }
        const head = inner.slice(0, closeIdx);
        const overlay = uniformOverlay();
        const merged = head + overlay + '</svg>';
        svgWrap.innerHTML = merged;
      })
      .catch(err => {
        if (myToken !== renderToken) return;
        console.error('DiceBear avatar error:', err);
        svgWrap.innerHTML = `<div class="avatar-error" style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;color:#d94b4b;font-weight:700;text-align:center;padding:1rem;">
            <span style="font-size:2rem;">😅</span>
            <span>Couldn't load avatar art.</span>
            <span style="font-weight:400;font-size:.85rem;">Check your connection & try again.</span>
          </div>`;
      });
  }

  /* ---------- COLOUR UTILITY: darken/lighten hex ---------- */
  function shade(hex, percent) {
    const num = parseInt(hex.replace('#', ''), 16);
    let r = (num >> 16) + Math.round(2.55 * percent);
    let g = ((num >> 8) & 0xff) + Math.round(2.55 * percent);
    let b = (num & 0xff) + Math.round(2.55 * percent);
    r = Math.max(0, Math.min(255, r));
    g = Math.max(0, Math.min(255, g));
    b = Math.max(0, Math.min(255, b));
    return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
  }

  /* ============================================================
     MINI DICEBEAR PREVIEW for option buttons
     Each option button for a *shape* category (hair, eyes, mouth,
     eyebrows, details, earrings, glasses) renders a tiny live
     DiceBear avatar that shows only that one feature varied, so
     the customizer shares the exact same illustrated art style.
     ============================================================ */
  const previewCache = new Map();

  function previewUrl(variantParam, variantValue) {
    // Build a URL that isolates ONE feature on a neutral face.
    const params = new URLSearchParams();
    params.set('seed', 'Preview');
    params.set('skinColor', '#f0c8a0');
    params.set('hairColor', '#5c3a1e');
    params.set('backgroundColor', '#fff6e0');
    params.set('radius', '50');
    params.set(variantParam, variantValue);
    params.set(variantParam.replace('Variant', 'Probability'), '100');
    // Pin the *other* features to neutral so the isolated one stands out.
    if (variantParam !== 'hairVariant')       { params.set('hairVariant', 'short01'); params.set('hairProbability', '100'); }
    if (variantParam !== 'eyesVariant')       { params.set('eyesVariant', 'variant01'); params.set('eyesProbability', '100'); }
    if (variantParam !== 'mouthVariant')      { params.set('mouthVariant', 'variant01'); params.set('mouthProbability', '100'); }
    if (variantParam !== 'eyebrowsVariant')   { params.set('eyebrowsVariant', 'variant01'); params.set('eyebrowsProbability', '100'); }
    if (variantParam !== 'glassesVariant' && variantParam !== 'earringsVariant' && variantParam !== 'detailsVariant') {
      params.set('eyebrowsVariant', 'variant01'); params.set('eyebrowsProbability', '100');
    }
    return DICEBEAR_BASE + '?' + params.toString();
  }

  // Fetch + cache a preview SVG; returns a promise resolving to svg string.
  function fetchPreview(url) {
    if (previewCache.has(url)) return Promise.resolve(previewCache.get(url));
    return fetch(url).then(r => { if (!r.ok) throw new Error('preview fetch'); return r.text(); })
      .then(svg => { previewCache.set(url, svg); return svg; });
  }

  // Render a mini preview into a target element. Shows a placeholder
  // until the SVG arrives, then swaps it in.
  function renderPreviewInto(el, variantParam, variantValue) {
    if (!variantValue) {
      // "None" style options get a neutral face with a slash overlay.
      el.innerHTML = `<span class="opt-none-mark">✕</span>`;
      el.classList.add('opt-preview-none');
      return;
    }
    const url = previewUrl(variantParam, variantValue);
    el.classList.add('opt-preview-loading');
    el.innerHTML = '';
    fetchPreview(url)
      .then(svg => {
        // Trim to just the inner content; strip metadata for a lighter mini.
        let inner = svg.replace(/<metadata[\s\S]*?<\/metadata>/, '');
        // Wrap in our own svg so we can control sizing via CSS.
        const start = inner.indexOf('<svg');
        const viewBox = 'viewBox="0 0 762 762"';
        const close = inner.lastIndexOf('</svg>');
        const body = inner.slice(start);
        // Replace the opening svg tag attributes with our own.
        const cleaned = body.replace(/<svg[^>]*>/, `<svg xmlns="http://www.w3.org/2000/svg" ${viewBox} fill="none">`);
        el.innerHTML = cleaned.slice(0, cleaned.lastIndexOf('</svg>') + 6);
        el.classList.remove('opt-preview-loading');
      })
      .catch(() => {
        el.classList.remove('opt-preview-loading');
        el.classList.add('opt-preview-err');
        el.innerHTML = '<span class="opt-none-mark">?</span>';
      });
  }

  /* ============================================================
     OPTION GRID BUILDERS
     ============================================================ */
  function buildBranchGrid() {
    const grid = $('branchGrid');
    grid.innerHTML = '';
    BRANCHES.forEach(b => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `opt-btn branch-btn ${b.id}` + (state.branch === b.id ? ' selected' : '');
      btn.dataset.value = b.id;
      // Branch buttons keep their iconic emoji since they represent
      // the branch crest, not a facial feature.
      btn.innerHTML = `<span class="opt-emoji">${b.icon}</span>
                       <span class="opt-label">${b.label}</span>
                       <span class="opt-sub">${b.sub}</span>`;
      btn.addEventListener('click', () => {
        state.branch = b.id;
        // Apply element-specific defaults for the new branch
        const ed = ELEMENT_DEFAULTS[b.id] || {};
        Object.keys(ed).forEach(key => { state[key] = ed[key]; });
        buildBranchGrid();
        buildElementGrid();
        renderAll();
      });
      grid.appendChild(btn);
    });
  }

  /* Element-Specific grid — renders branch-unique options grouped
     by category (e.g. "Beret Colour", "Cap Badge"). Rebuilds when
     the branch changes. Options with `color` render as swatches;
     others render as labelled buttons. Locked options show a lock
     badge. */
  function buildElementGrid() {
    const grid = $('elementGrid');
    if (!grid) return;
    grid.innerHTML = '';
    const groups = ELEMENT_OPTS[state.branch] || [];
    if (!groups.length) {
      grid.innerHTML = '<div style="grid-column:1/-1;padding:8px 4px;color:#888;font-size:12px;">Select a branch to see element-specific options.</div>';
      return;
    }

    // Determine state key for each group by matching against ELEMENT_DEFAULTS
    const branchDefaults = ELEMENT_DEFAULTS[state.branch] || {};
    const groupStateKeys = {};
    groups.forEach(g => {
      // Find which state key in branchDefaults corresponds to this group's opts
      const optIds = g.opts.map(o => o.id);
      Object.keys(branchDefaults).forEach(key => {
        if (optIds.includes(branchDefaults[key])) groupStateKeys[g.group] = key;
      });
    });

    groups.forEach(g => {
      const stateKey = groupStateKeys[g.group];

      // Group label
      const labelEl = document.createElement('div');
      labelEl.className = 'element-group-label';
      labelEl.textContent = tr(g.group);
      labelEl.style.gridColumn = '1 / -1';
      grid.appendChild(labelEl);

      g.opts.forEach(opt => {
        const locked = !isUnlocked(opt);
        const btn = document.createElement('button');
        btn.type = 'button';
        const hasColor = opt.color !== undefined;
        btn.className = 'opt-btn element-btn' + (stateKey && state[stateKey] === opt.id ? ' selected' : '') + (locked ? ' locked' : '');
        btn.dataset.value = opt.id;
        if (hasColor) {
          btn.innerHTML = `<span class="opt-swatch" style="background:${opt.color}"></span>
                           <span class="opt-label">${tr(opt.label)}</span>
                           ${locked ? '<span class="opt-lock-badge" title="' + unlockHint(opt) + '">&#128274;</span>' : ''}`;
        } else {
          btn.innerHTML = `<span class="opt-emoji element-emoji">${getElementEmoji(opt.id)}</span>
                           <span class="opt-label">${tr(opt.label)}</span>
                           ${locked ? '<span class="opt-lock-badge" title="' + unlockHint(opt) + '">&#128274;</span>' : ''}`;
        }
        btn.addEventListener('click', () => {
          if (locked) { showToast(unlockHint(opt), true); return; }
          if (stateKey) {
            state[stateKey] = opt.id;
            buildElementGrid();
            renderAll();
          }
        });
        grid.appendChild(btn);
      });
    });
  }

  /* Emoji icon for element-specific non-colour options */
  function getElementEmoji(id) {
    const map = {
      capBadge: '⚜', glengarry: '⚜', lyonCrest: '⚜',
      standard: '◈', airCrest: '✈', plain: '○',
      noWings: '✕', cadetWings: '➤', pilotWings: '✈',
      blackScarf: '🧣', navyScarf: '🧣', whiteScarf: '🧣',
      squareRig: '⚓', roundCollar: '⚓',
    };
    return map[id] || '•';
  }

  // Swatch grid for pure-COLOUR options (skin, hair color) —
  // rendered as illustrated colour chips with a soft inner glow.
  // Options with an `unlock` lesson ID are locked until that course
  // is completed.
  function buildSwatchGrid(containerId, options, stateKey) {
    const grid = $(containerId);
    grid.innerHTML = '';
    options.forEach(opt => {
      const locked = !isUnlocked(opt);
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'opt-btn' + (state[stateKey] === opt.id ? ' selected' : '') + (locked ? ' locked' : '');
      btn.dataset.value = opt.id;
      btn.innerHTML = `<span class="opt-swatch" style="background:${opt.color}"></span>
                       <span class="opt-label">${opt.label}</span>
                       ${locked ? '<span class="opt-lock-badge" title="' + unlockHint(opt) + '">&#128274;</span>' : ''}`;
      btn.addEventListener('click', () => {
        if (locked) { showToast(unlockHint(opt), true); return; }
        state[stateKey] = opt.id;
        buildSwatchGrid(containerId, options, stateKey);
        renderAll();
      });
      grid.appendChild(btn);
    });
  }

  // Preview grid for SHAPE options — each button shows a live
  // mini DiceBear avatar with that feature isolated.
  // variantMap: function(opt) => { param, value } | null
  // Options with an `unlock` lesson ID are locked until that course
  // is completed; locked buttons show a lock icon instead of a preview.
  function buildPreviewGrid(containerId, options, stateKey, variantMap) {
    const grid = $(containerId);
    grid.innerHTML = '';
    options.forEach(opt => {
      const locked = !isUnlocked(opt);
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'opt-btn opt-preview-btn' + (state[stateKey] === opt.id ? ' selected' : '') + (locked ? ' locked' : '');
      btn.dataset.value = opt.id;
      const map = variantMap(opt);
      btn.innerHTML = `<span class="opt-preview"></span>
                       <span class="opt-label">${opt.label}</span>
                       ${locked ? '<span class="opt-lock-badge" title="' + unlockHint(opt) + '">&#128274;</span>' : ''}`;
      grid.appendChild(btn);
      const prevEl = btn.querySelector('.opt-preview');
      if (locked) {
        prevEl.classList.add('opt-preview-locked');
        prevEl.innerHTML = '<span class="opt-locked-icon">&#128274;</span>';
      } else if (map) {
        renderPreviewInto(prevEl, map.param, map.value);
      } else {
        prevEl.classList.add('opt-preview-none');
        prevEl.innerHTML = '<span class="opt-none-mark">✕</span>';
      }
      btn.addEventListener('click', () => {
        if (locked) { showToast(unlockHint(opt), true); return; }
        state[stateKey] = opt.id;
        buildPreviewGrid(containerId, options, stateKey, variantMap);
        renderAll();
      });
    });
  }

  /* ============================================================
     BADGE INVENTORY (reads from quest map localStorage)
     ============================================================ */
  function getCompleted() {
    try {
      const raw = localStorage.getItem(COMPLETED_KEY);
      if (raw) return new Set(JSON.parse(raw));
    } catch (e) { /* ignore */ }
    return new Set();
  }

  function renderBadgeInventory() {
    const grid = $('badgeInvGrid');
    const countEl = $('badgeInvCount');
    const statBadges = $('statBadges');
    const statProgress = $('statProgress');
    const completed = getCompleted();
    grid.innerHTML = '';

    let earned = 0;
    LESSONS.forEach(lesson => {
      const isEarned = completed.has(lesson.id);
      if (isEarned) earned++;
      const cell = document.createElement('div');
      cell.className = 'badge-inv-cell' + (isEarned ? ' earned' : '');
      cell.innerHTML = `<img src="assets/badges/${lesson.badge}" alt="${lesson.title} badge" loading="lazy" />
                        <span class="badge-tip">${lesson.title}${isEarned ? ' ✓' : ' — Locked'}</span>
                        ${isEarned ? '' : '<span class="badge-lock">🔒</span>'}`;
      grid.appendChild(cell);
    });

    const total = LESSONS.length;
    const pct = Math.round((earned / total) * 100);
    countEl.textContent = `${earned} / ${total}`;
    statBadges.textContent = earned;
    statProgress.textContent = pct + '%';
  }

  /* ============================================================
     UI UPDATE (name + branch display)
     ============================================================ */
  function updateIdCard() {
    const b = getBranch(state.branch);
    nameDisplay.textContent = state.name || 'Cadet';
    branchIcon.textContent = b.icon;
    branchText.textContent = b.label + ' Cadet';
    branchDisplay.className = 'avatar-id-branch ' + b.id;
  }

  function renderAll() {
    renderAvatar();
    updateIdCard();
  }

  /* ============================================================
     TOAST + CONFETTI
     ============================================================ */
  function showToast(msg, isError) {
    const toast = $('avToast');
    toast.textContent = (isError ? '⚠ ' : '✓ ') + msg;
    toast.className = 'av-toast show' + (isError ? ' error' : '');
    setTimeout(() => { toast.className = 'av-toast' + (isError ? ' error' : ''); }, 2400);
  }

  function confettiBurst() {
    const colors = ['#f5c84c', '#35a75a', '#2f76d2', '#d94b4b', '#7b4fd6', '#d4af37'];
    const wrap = document.body;
    for (let i = 0; i < 40; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = (Math.random() * 100) + '%';
      piece.style.top = '40%';
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDelay = (Math.random() * 0.3) + 's';
      piece.style.animationDuration = (1 + Math.random() * 0.8) + 's';
      if (Math.random() > 0.5) piece.style.borderRadius = '50%';
      wrap.appendChild(piece);
      setTimeout(() => piece.remove(), 2200);
    }
  }

  /* ============================================================
     ACTIONS: Save, Random, Reset
     ============================================================ */
  function doSave() {
    state.name = (nameInput.value || '').trim().slice(0, 20) || 'Cadet';
    nameInput.value = state.name;
    if (saveState()) {
      showToast('Avatar saved!');
      confettiBurst();
      updateIdCard();
      renderAvatar();
    } else {
      showToast('Could not save avatar', true);
    }
  }

  function doRandom() {
    // Only pick from unlocked options (skip course-locked ones).
    const unlocked = (arr) => arr.filter(isUnlocked);
    const pick = (arr) => { const pool = unlocked(arr); return pool[Math.floor(Math.random() * pool.length)]; };
    state.branch = pick(BRANCHES).id;
    state.skin = pick(SKIN_TONES).id;
    state.hair = pick(HAIR_STYLES).id;
    state.hairColor = pick(HAIR_COLORS).id;
    state.eye = pick(EYE_VARIANTS).id;
    state.expression = pick(EXPRESSIONS).id;
    state.eyebrows = pick(EYEBROWS).id;
    state.details = pick(DETAILS).id;
    state.earrings = pick(EARRINGS).id;
    state.accessory = pick(ACCESSORIES).id;
    // Element-specific: pick random unlocked options per group for current branch
    const groups = ELEMENT_OPTS[state.branch] || [];
    const branchDefaults = ELEMENT_DEFAULTS[state.branch] || {};
    groups.forEach(g => {
      const optIds = g.opts.map(o => o.id);
      const stateKey = Object.keys(branchDefaults).find(key => optIds.includes(branchDefaults[key]));
      if (stateKey) {
        const pool = unlocked(g.opts);
        if (pool.length) state[stateKey] = pool[Math.floor(Math.random() * pool.length)].id;
      }
    });
    rebuildAllGrids();
    renderAll();
  }

  function doReset() {
    state = Object.assign({}, DEFAULT_STATE);
    rebuildAllGrids();
    nameInput.value = state.name;
    renderAll();
    showToast('Avatar reset to default');
  }

  /* ============================================================
     INIT
     ============================================================ */
  // variantMap helpers for each preview grid
  const mapParam = (paramKey) => (opt) => {
    const v = opt.variant !== undefined ? opt.variant : opt.id;
    if (!v || v === 'none') return null;
    return { param: paramKey, value: v };
  };

  function rebuildAllGrids() {
    buildBranchGrid();
    buildElementGrid();
    buildSwatchGrid('skinGrid', SKIN_TONES, 'skin');
    buildPreviewGrid('hairGrid', HAIR_STYLES, 'hair', (o) => ({ param: 'hairVariant', value: o.id }));
    buildSwatchGrid('hairColorGrid', HAIR_COLORS, 'hairColor');
    buildPreviewGrid('eyeGrid', EYE_VARIANTS, 'eye', (o) => ({ param: 'eyesVariant', value: o.id }));
    buildPreviewGrid('exprGrid', EXPRESSIONS, 'expression', (o) => ({ param: 'mouthVariant', value: o.id }));
    buildPreviewGrid('eyebrowGrid', EYEBROWS, 'eyebrows', (o) => ({ param: 'eyebrowsVariant', value: o.id }));
    buildPreviewGrid('detailsGrid', DETAILS, 'details', mapParam('detailsVariant'));
    buildPreviewGrid('earringGrid', EARRINGS, 'earrings', mapParam('earringsVariant'));
    buildPreviewGrid('accGrid', ACCESSORIES, 'accessory', mapParam('glassesVariant'));
  }

  /* ── i18n: translate data arrays in-place ── */
  if (typeof trMutate === "function") {
    try { trMutate(ACCESSORIES); } catch(e) {}
    try { trMutate(ARMY_OPTS); } catch(e) {}
    try { trMutate(AIR_OPTS); } catch(e) {}
    try { trMutate(BRANCHES); } catch(e) {}
    try { trMutate(DEFAULT_STATE); } catch(e) {}
    try { trMutate(DETAILS); } catch(e) {}
    try { trMutate(EARRINGS); } catch(e) {}
    try { trMutate(EXPRESSIONS); } catch(e) {}
    try { trMutate(EYEBROWS); } catch(e) {}
    try { trMutate(EYE_VARIANTS); } catch(e) {}
    try { trMutate(HAIR_COLORS); } catch(e) {}
    try { trMutate(HAIR_STYLES); } catch(e) {}
    try { trMutate(LESSONS); } catch(e) {}
    try { trMutate(SEA_OPTS); } catch(e) {}
    try { trMutate(SKIN_TONES); } catch(e) {}
    try { trMutate(colors); } catch(e) {}
  }



  function init() {
    nameInput.value = state.name;
    nameInput.addEventListener('input', () => {
      state.name = nameInput.value;
      updateIdCard();
    });
    nameInput.addEventListener('blur', () => {
      state.name = (nameInput.value || '').trim().slice(0, 20) || 'Cadet';
      nameInput.value = state.name;
      updateIdCard();
    });

    rebuildAllGrids();

    renderAll();
    renderBadgeInventory();

    $('saveBtn').addEventListener('click', doSave);
    $('randomBtn').addEventListener('click', doRandom);
    $('resetBtn').addEventListener('click', doReset);

    window.addEventListener('focus', renderBadgeInventory);
    window.addEventListener('storage', (e) => {
      if (e.key === COMPLETED_KEY) renderBadgeInventory();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
