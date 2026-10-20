/* ═══════════════════════════════════════════════════════════════════
   CADET ESCAPE ROOM — Game Engine
   Capstone challenge combining all Year 1 cadet training knowledge.
   ═══════════════════════════════════════════════════════════════════ */

(function () {
'use strict';

// ───────────────────────────────────────────────────────────────────
//  GAME CONFIG
// ───────────────────────────────────────────────────────────────────
const TIME_LIMIT = 20 * 60; // 20 minutes in seconds
const TOTAL_HINTS = 3;
const STORAGE_KEY = 'cadetMapDemoCompleted';
const ESCAPE_KEY = 'cadetEscapeRoomBest';

// ───────────────────────────────────────────────────────────────────
//  ROOM DEFINITIONS
//  Each room: theme, brief, puzzle type, solution, clue fragment, hint
// ───────────────────────────────────────────────────────────────────
const ROOMS = [
  {
    id: 1,
    icon: '🪖',
    title: 'Drill & Uniform Vault',
    subtitle: 'Room 1 · Discipline & Turnout',
    brief: 'A locked footlocker sits against the wall. Taped to its lid is a faded drill manual page. The lock requires you to arrange the drill movements in the <strong>correct order of a full parade compliment</strong>. Get the sequence right and the footlocker opens.',
    puzzleType: 'sequence',
    hint: 'A general salute compliment follows this order: present arms, let fly the colour, catch the colour, then shoulder arms. The standard pause is held between each.',
    items: [
      'Shoulder Arms',
      'Present Arms',
      'Let Fly the Colour',
      'Catch the Colour'
    ],
    // Correct order indices (0-based into items array)
    solution: [1, 2, 3, 0],
    clue: '7',
    clueLabel: 'Fragment A'
  },
  {
    id: 2,
    icon: '📡',
    title: 'Radio Communications Chamber',
    subtitle: 'Room 2 · Voice Procedure',
    brief: 'A military field radio crackles with static. A coded message is pinned to the wall — a <strong>word spelled in the NATO phonetic alphabet</strong>. Decode the phonetic code word to reveal the four-letter answer, then enter it into the radio keypad to unlock the next door.',
    puzzleType: 'phonetic',
    hint: 'The NATO phonetic alphabet: Alfa, Bravo, Charlie, Delta, Echo, Foxtrot, Golf, Hotel, India, Juliett, Kilo, Lima, Mike, November, Oscar, Papa, Quebec, Romeo, Sierra, Tango, Uniform, Victor, Whiskey, X-ray, Yankee, Zulu.',
    codeWord: ['India', 'Delta', 'Echo', 'Alfa'],
    answer: 'IDEA',
    clue: '3',
    clueLabel: 'Fragment B'
  },
  {
    id: 3,
    icon: '🧭',
    title: 'Navigation Cartography Cell',
    subtitle: 'Room 3 · Map Reading',
    brief: 'A navigation table holds a topographic map and a compass. A handwritten note reads: <strong>"The bearing to the rendezvous point is 315°. What cardinal-intercardinal direction is that?"</strong> Select the correct direction to release the map-cache lock.',
    puzzleType: 'choice',
    hint: 'Cardinal directions: North=0°/360°, East=90°, South=180°, West=270°. Intercardinal (half-cardinal) directions: NE=45°, SE=135°, SW=225°, NW=315°.',
    question: 'A bearing of 315° points in which direction?',
    choices: [
      { text: 'North-East (NE)', correct: false },
      { text: 'North-West (NW)', correct: true },
      { text: 'South-West (SW)', correct: false },
      { text: 'South-East (SE)', correct: false }
    ],
    clue: '9',
    clueLabel: 'Fragment C'
  },
  {
    id: 4,
    icon: '⚕️',
    title: 'First Aid Quarantine Bay',
    subtitle: 'Room 4 · Primary Survey',
    brief: 'A medical training dummy lies on a stretcher. The emergency door is sealed until you perform the correct <strong>primary survey sequence (DRABC)</strong>. Arrange the five steps in the proper order to stabilise the casualty and unlock the medical bay door.',
    puzzleType: 'sequence',
    hint: 'DRABC stands for: Danger (check the scene is safe), Response (check for consciousness), Airway (open the airway), Breathing (check for breathing), Circulation (check for severe bleeding / send for help).',
    items: [
      'Airway — Open the casualty\'s airway',
      'Breathing — Check for normal breathing',
      'Circulation — Check for severe bleeding & send for help',
      'Danger — Check the scene is safe',
      'Response — Check for consciousness'
    ],
    solution: [3, 4, 0, 1, 2],
    clue: '1',
    clueLabel: 'Fragment D'
  },
  {
    id: 5,
    icon: '🔥',
    title: 'Survival & Fieldcraft Bunker',
    subtitle: 'Room 5 · Bush Survival',
    brief: 'The final training room before the vault. A survival kit is locked behind a knot-tying station. <strong>Match each knot to its correct purpose</strong> to prove your fieldcraft knowledge. Get all matches right and the survival cache opens, revealing your last clue fragment.',
    puzzleType: 'matching',
    hint: 'Reef (Square) Knot joins two ropes of equal thickness. Bowline forms a secure non-slip loop. Clove Hitch ties a rope to a pole or post. Figure-of-Eight is a strong stopper knot used in climbing and sailing.',
    matchLeft: [
      'Reef (Square) Knot',
      'Bowline',
      'Clove Hitch',
      'Figure-of-Eight'
    ],
    matchRight: [
      'Forms a secure non-slip loop',
      'Strong stopper knot for climbing',
      'Joins two ropes of equal thickness',
      'Ties a rope to a pole or post'
    ],
    // matchRight correct index for each matchLeft item
    matchSolution: [2, 0, 3, 1],
    clue: '5',
    clueLabel: 'Fragment E'
  }
];

const FINAL_CODE = ROOMS.map(function (r) { return r.clue; }).join(''); // '73915'

// ───────────────────────────────────────────────────────────────────
//  GAME STATE
// ───────────────────────────────────────────────────────────────────
let state = {
  currentRoom: 0,
  timeLeft: TIME_LIMIT,
  hintsLeft: TOTAL_HINTS,
  cluesFound: [],
  solved: [],
  timerInterval: null,
  startTime: 0,
  finished: false
};

// ───────────────────────────────────────────────────────────────────
//  DOM REFERENCES
// ───────────────────────────────────────────────────────────────────
const elIntro = document.getElementById('erIntro');
const elHud = document.getElementById('erHud');
const elGame = document.getElementById('erGame');
const elRoom = document.getElementById('erRoom');
const elVictory = document.getElementById('erVictory');
const elStartBtn = document.getElementById('erStartBtn');
const elTimer = document.getElementById('erTimer');
const elTimerWrap = document.getElementById('erTimerWrap');
const elRoomNum = document.getElementById('erRoomNum');
const elHints = document.getElementById('erHints');
const elProgressDots = document.getElementById('erProgressDots');
const elMusicBtn = document.getElementById('erMusicBtn');
const elDoorTransition = document.getElementById('erDoorTransition');
const elDoorText = document.getElementById('erDoorText');
const elToast = document.getElementById('erToast');
const elReplayBtn = document.getElementById('erReplayBtn');

// Puzzle interaction state (reset each room)
let puzzleState = {
  sequenceOrder: [],
  selectedChoice: null,
  codeInputs: [],
  matchSelected: null,
  matchPairs: {}
};

// ═══════════════════════════════════════════════════════════════════
//  WEB AUDIO — Background music & sound effects (no external files)
// ═══════════════════════════════════════════════════════════════════
let audioCtx = null;
let musicNodes = [];
let musicPlaying = false;
let masterGain = null;

function initAudio() {
  if (audioCtx) return;
  try {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = 0.18;
    masterGain.connect(audioCtx.destination);
  } catch (e) {
    audioCtx = null;
  }
}

// Ambient tension background music — slow minor-key pad + pulse
function startMusic() {
  initAudio();
  if (!audioCtx || musicPlaying) return;
  musicPlaying = true;
  musicNodes = [];

  // Base chord frequencies (A minor pad): A2, C3, E3
  var chordFreqs = [110, 130.81, 164.81];
  chordFreqs.forEach(function (freq, i) {
    var osc = audioCtx.createOscillator();
    osc.type = i === 0 ? 'sine' : 'triangle';
    osc.frequency.value = freq;

    var gain = audioCtx.createGain();
    gain.gain.value = 0;
    // slow swell
    gain.gain.setValueAtTime(0, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.12 / (i + 1), audioCtx.currentTime + 3);

    // LFO for subtle tremolo
    var lfo = audioCtx.createOscillator();
    lfo.frequency.value = 0.15 + i * 0.05;
    var lfoGain = audioCtx.createGain();
    lfoGain.gain.value = 0.04;
    lfo.connect(lfoGain);
    lfoGain.connect(gain.gain);

    osc.connect(gain);
    gain.connect(masterGain);
    osc.start();
    lfo.start();
    musicNodes.push(osc, lfo, gain, lfoGain);
  });

  // Low pulse / heartbeat (tension)
  var pulseTimer = setInterval(function () {
    if (!musicPlaying || !audioCtx) return;
    playTone(55, 0.18, 'sine', 0.14);
    setTimeout(function () { if (musicPlaying) playTone(55, 0.12, 'sine', 0.08); }, 220);
  }, 2600);
  musicNodes.push({ stop: function () { clearInterval(pulseTimer); } });
}

function stopMusic() {
  if (!musicPlaying) return;
  musicPlaying = false;
  musicNodes.forEach(function (node) {
    try { if (node.stop) node.stop(); } catch (e) {}
    try { if (node.disconnect) node.disconnect(); } catch (e) {}
  });
  musicNodes = [];
}

function toggleMusic() {
  initAudio();
  if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
  if (musicPlaying) {
    stopMusic();
    elMusicBtn.classList.remove('playing');
    elMusicBtn.querySelector('.er-music-label').textContent = 'Music Off';
    showToast('🔇 Music muted');
  } else {
    startMusic();
    elMusicBtn.classList.add('playing');
    elMusicBtn.querySelector('.er-music-label').textContent = 'Music On';
    showToast('🎵 Ambient music on');
  }
}

// Simple tone helper for SFX
function playTone(freq, duration, type, volume) {
  if (!audioCtx) return;
  type = type || 'sine';
  volume = volume || 0.15;
  var osc = audioCtx.createOscillator();
  var gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0, audioCtx.currentTime);
  gain.gain.linearRampToValueAtTime(volume, audioCtx.currentTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
  osc.connect(gain);
  gain.connect(masterGain || audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + duration + 0.05);
}

// Sound effects
function sfxClick() { playTone(440, 0.06, 'square', 0.08); }
function sfxCorrect() {
  playTone(523, 0.1, 'sine', 0.18);
  setTimeout(function () { playTone(659, 0.1, 'sine', 0.18); }, 90);
  setTimeout(function () { playTone(784, 0.2, 'sine', 0.18); }, 180);
}
function sfxWrong() {
  playTone(200, 0.15, 'sawtooth', 0.12);
  setTimeout(function () { playTone(150, 0.2, 'sawtooth', 0.1); }, 100);
}
function sfxUnlock() {
  playTone(300, 0.08, 'square', 0.15);
  setTimeout(function () { playTone(450, 0.08, 'square', 0.15); }, 80);
  setTimeout(function () { playTone(600, 0.3, 'sine', 0.2); }, 160);
}
function sfxVictory() {
  var notes = [523, 659, 784, 1047];
  notes.forEach(function (n, i) {
    setTimeout(function () { playTone(n, 0.3, 'triangle', 0.2); }, i * 150);
  });
  setTimeout(function () {
    playTone(523, 0.4, 'sine', 0.15);
    playTone(659, 0.4, 'sine', 0.15);
    playTone(784, 0.5, 'sine', 0.15);
  }, 700);
}
function sfxTick() { playTone(880, 0.03, 'square', 0.04); }

// ═══════════════════════════════════════════════════════════════════
//  TOAST
// ═══════════════════════════════════════════════════════════════════
let toastTimer = null;
function showToast(msg) {
  elToast.textContent = msg;
  elToast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () { elToast.classList.remove('show'); }, 2600);
}

// ═══════════════════════════════════════════════════════════════════
//  TIMER
// ═══════════════════════════════════════════════════════════════════
function startTimer() {
  state.startTime = Date.now();
  state.timerInterval = setInterval(function () {
    state.timeLeft--;
    updateTimerDisplay();
    if (state.timeLeft <= 0) {
      clearInterval(state.timerInterval);
      gameOver();
    }
  }, 1000);
}

function stopTimer() {
  if (state.timerInterval) {
    clearInterval(state.timerInterval);
    state.timerInterval = null;
  }
}

function updateTimerDisplay() {
  var m = Math.floor(state.timeLeft / 60);
  var s = state.timeLeft % 60;
  elTimer.textContent = String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
  elTimerWrap.classList.remove('warning', 'danger');
  if (state.timeLeft <= 60) {
    elTimerWrap.classList.add('danger');
    if (state.timeLeft <= 10 && state.timeLeft > 0) sfxTick();
  } else if (state.timeLeft <= 300) {
    elTimerWrap.classList.add('warning');
  }
}

// ═══════════════════════════════════════════════════════════════════
//  PROGRESS DOTS
// ═══════════════════════════════════════════════════════════════════
function renderProgressDots() {
  elProgressDots.innerHTML = '';
  for (var i = 0; i < ROOMS.length; i++) {
    var dot = document.createElement('div');
    dot.className = 'er-dot';
    if (state.solved.indexOf(i) !== -1) dot.classList.add('done');
    if (i === state.currentRoom && state.solved.indexOf(i) === -1) dot.classList.add('current');
    elProgressDots.appendChild(dot);
  }
}

function updateHUD() {
  elRoomNum.textContent = (state.currentRoom + 1) + '/' + ROOMS.length;
  elHints.textContent = state.hintsLeft;
  renderProgressDots();
}

// ═══════════════════════════════════════════════════════════════════
//  ROOM RENDERING
// ═══════════════════════════════════════════════════════════════════
function renderRoom() {
  var room = ROOMS[state.currentRoom];
  var solved = state.solved.indexOf(state.currentRoom) !== -1;
  puzzleState = { sequenceOrder: [], selectedChoice: null, codeInputs: [], matchSelected: null, matchPairs: {} };

  var html = '<div class="er-room-header">' +
    '<div class="er-room-title-block">' +
      '<div class="er-room-number">' + room.id + '</div>' +
      '<div><div class="er-room-title">' + room.title + '</div>' +
      '<div class="er-room-subtitle">' + room.subtitle + '</div></div>' +
    '</div>' +
    '<div class="er-room-theme-icon">' + room.icon + '</div>' +
  '</div>' +
  '<div class="er-room-body">' +
    '<div class="er-room-brief">' + room.brief + '</div>';

  // Render puzzle by type
  if (room.puzzleType === 'sequence') {
    html += renderSequencePuzzle(room);
  } else if (room.puzzleType === 'phonetic') {
    html += renderPhoneticPuzzle(room);
  } else if (room.puzzleType === 'choice') {
    html += renderChoicePuzzle(room);
  } else if (room.puzzleType === 'matching') {
    html += renderMatchingPuzzle(room);
  }

  // Action row + feedback + clue earned
  html += '<div class="er-action-row">' +
    '<button class="er-submit-btn" id="erSubmitBtn" type="button">✓ Submit Answer</button>' +
    '<button class="er-hint-btn" id="erHintBtn" type="button">💡 Hint (' + state.hintsLeft + ' left)</button>' +
  '</div>' +
  '<div class="er-hint-box" id="erHintBox"></div>' +
  '<div class="er-feedback" id="erFeedback"></div>' +
  '<div class="er-clue-earned" id="erClueEarned">' +
    '<span class="er-clue-earned-icon">🔑</span>' +
    '<span class="er-clue-earned-text">Clue fragment found! <strong id="erClueValue"></strong> — ' + room.clueLabel + '</span>' +
  '</div>';

  // If already solved, show the final lock button instead
  html += '</div>'; // close room-body

  elRoom.innerHTML = html;
  attachPuzzleHandlers(room);
  updateHUD();
  elRoom.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ─── Sequence puzzle (drag to reorder) ───
function renderSequencePuzzle(room) {
  // Shuffle items for display
  var indices = room.items.map(function (_, i) { return i; });
  shuffle(indices);
  var html = '<div class="er-clue-card"><h4>📋 Arrange in Correct Order</h4>' +
    '<div class="er-clue-text">Drag the items using the handle to put them in the correct sequence:</div></div>' +
    '<div class="er-sequence-list" id="erSeqList">';
  indices.forEach(function (idx, pos) {
    html += '<div class="er-seq-item" data-orig="' + idx + '" draggable="true">' +
      '<span class="er-seq-handle">⣿</span>' +
      '<span class="er-seq-num">' + (pos + 1) + '</span>' +
      '<span class="er-seq-text">' + room.items[idx] + '</span>' +
    '</div>';
  });
  html += '</div>';
  return html;
}

// ─── Phonetic decode puzzle ───
function renderPhoneticPuzzle(room) {
  var html = '<div class="er-clue-card"><h4>📡 Intercepted Phonetic Message</h4>' +
    '<div class="er-clue-text">The radio is broadcasting: <code>' + room.codeWord.join(' — ') + '</code><br>' +
    'Decode each phonetic code word to its letter, then enter the four-letter word below:</div></div>' +
    '<div class="er-code-input-row" id="erCodeRow">';
  for (var i = 0; i < room.answer.length; i++) {
    html += '<input class="er-code-slot" type="text" maxlength="1" data-pos="' + i + '" autocomplete="off" />';
  }
  html += '</div>';
  return html;
}

// ─── Multiple choice puzzle ───
function renderChoicePuzzle(room) {
  var html = '<div class="er-clue-card"><h4>🧭 Navigation Question</h4>' +
    '<div class="er-clue-text">' + room.question + '</div></div>' +
    '<div class="er-choices" id="erChoices">';
  room.choices.forEach(function (ch, i) {
    html += '<button class="er-choice" data-idx="' + i + '" type="button">' + ch.text + '</button>';
  });
  html += '</div>';
  return html;
}

// ─── Matching puzzle ───
function renderMatchingPuzzle(room) {
  var html = '<div class="er-clue-card"><h4>🔥 Match Each Knot to Its Purpose</h4>' +
    '<div class="er-clue-text">Click a knot on the left, then click its matching purpose on the right. Match all four correctly.</div></div>' +
    '<div class="er-match-grid">' +
      '<div class="er-match-col"><h5>Knots</h5>';
  room.matchLeft.forEach(function (knot, i) {
    html += '<div class="er-match-item" data-side="left" data-idx="' + i + '">' + knot + '</div>';
  });
  html += '</div><div class="er-match-col"><h5>Purpose</h5>';
  var rightOrder = room.matchRight.map(function (_, i) { return i; });
  shuffle(rightOrder);
  rightOrder.forEach(function (ri) {
    html += '<div class="er-match-item" data-side="right" data-idx="' + ri + '">' + room.matchRight[ri] + '</div>';
  });
  html += '</div></div>';
  return html;
}

// ═══════════════════════════════════════════════════════════════════
//  PUZZLE HANDLERS
// ═══════════════════════════════════════════════════════════════════
function attachPuzzleHandlers(room) {
  var submitBtn = document.getElementById('erSubmitBtn');
  var hintBtn = document.getElementById('erHintBtn');
  var hintBox = document.getElementById('erHintBox');

  if (room.puzzleType === 'sequence') attachSequenceHandlers();
  if (room.puzzleType === 'phonetic') attachPhoneticHandlers();
  if (room.puzzleType === 'choice') attachChoiceHandlers();
  if (room.puzzleType === 'matching') attachMatchingHandlers(room);

  submitBtn.addEventListener('click', function () { sfxClick(); checkAnswer(room); });
  hintBtn.addEventListener('click', function () { useHint(room, hintBox, hintBtn); });
}

// ─── Sequence: drag-and-drop reorder ───
function attachSequenceHandlers() {
  var list = document.getElementById('erSeqList');
  var dragEl = null;

  list.querySelectorAll('.er-seq-item').forEach(function (item) {
    item.addEventListener('dragstart', function (e) {
      dragEl = this;
      this.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
    });
    item.addEventListener('dragend', function () {
      this.classList.remove('dragging');
      renumberSequence(list);
    });
    item.addEventListener('dragover', function (e) {
      e.preventDefault();
      var dragging = list.querySelector('.dragging');
      if (!dragging || this === dragging) return;
      var rect = this.getBoundingClientRect();
      var after = e.clientY > rect.top + rect.height / 2;
      if (after) this.parentNode.insertBefore(dragging, this.nextSibling);
      else this.parentNode.insertBefore(dragging, this);
    });
  });
}

function renumberSequence(list) {
  list.querySelectorAll('.er-seq-item').forEach(function (item, i) {
    item.querySelector('.er-seq-num').textContent = (i + 1);
  });
}

function getSequenceOrder() {
  var list = document.getElementById('erSeqList');
  var order = [];
  list.querySelectorAll('.er-seq-item').forEach(function (item) {
    order.push(Number(item.dataset.orig));
  });
  return order;
}

// ─── Phonetic: code input auto-advance ───
function attachPhoneticHandlers() {
  var inputs = document.querySelectorAll('.er-code-slot');
  inputs.forEach(function (inp, i) {
    inp.addEventListener('input', function () {
      this.value = this.value.toUpperCase().replace(/[^A-Z]/g, '');
      if (this.value && i < inputs.length - 1) inputs[i + 1].focus();
      this.classList.toggle('filled', !!this.value);
    });
    inp.addEventListener('keydown', function (e) {
      if (e.key === 'Backspace' && !this.value && i > 0) inputs[i - 1].focus();
      if (e.key === 'Enter') document.getElementById('erSubmitBtn').click();
    });
  });
  if (inputs[0]) inputs[0].focus();
}

function getPhoneticAnswer() {
  var inputs = document.querySelectorAll('.er-code-slot');
  var val = '';
  inputs.forEach(function (inp) { val += inp.value; });
  return val;
}

// ─── Choice: single select ───
function attachChoiceHandlers() {
  document.querySelectorAll('.er-choice').forEach(function (btn) {
    btn.addEventListener('click', function () {
      sfxClick();
      document.querySelectorAll('.er-choice').forEach(function (b) { b.classList.remove('selected'); });
      this.classList.add('selected');
      puzzleState.selectedChoice = Number(this.dataset.idx);
    });
  });
}

// ─── Matching: click pairs ───
function attachMatchingHandlers(room) {
  document.querySelectorAll('.er-match-item').forEach(function (item) {
    item.addEventListener('click', function () {
      if (this.classList.contains('matched')) return;
      sfxClick();
      var side = this.dataset.side;
      var idx = Number(this.dataset.idx);

      if (side === 'left') {
        document.querySelectorAll('.er-match-item[data-side="left"]').forEach(function (i) { i.classList.remove('selected'); });
        this.classList.add('selected');
        puzzleState.matchSelected = idx;
      } else {
        if (puzzleState.matchSelected === null) {
          showToast('Select a knot on the left first');
          return;
        }
        // Attempt match
        var leftIdx = puzzleState.matchSelected;
        var rightIdx = idx;
        var leftEl = document.querySelector('.er-match-item[data-side="left"][data-idx="' + leftIdx + '"]');
        this.classList.add('selected');
        var self = this;
        setTimeout(function () {
          if (room.matchSolution[leftIdx] === rightIdx) {
            leftEl.classList.remove('selected');
            leftEl.classList.add('matched');
            self.classList.remove('selected');
            self.classList.add('matched');
            puzzleState.matchPairs[leftIdx] = rightIdx;
            sfxCorrect();
            if (Object.keys(puzzleState.matchPairs).length === room.matchLeft.length) {
              showToast('All knots matched!');
            }
          } else {
            leftEl.classList.add('wrong');
            self.classList.add('wrong');
            sfxWrong();
            setTimeout(function () {
              leftEl.classList.remove('wrong', 'selected');
              self.classList.remove('wrong', 'selected');
            }, 500);
          }
          puzzleState.matchSelected = null;
        }, 150);
      }
    });
  });
}

function matchingComplete(room) {
  if (Object.keys(puzzleState.matchPairs).length !== room.matchLeft.length) return false;
  for (var i = 0; i < room.matchLeft.length; i++) {
    if (puzzleState.matchPairs[i] !== room.matchSolution[i]) return false;
  }
  return true;
}

// ═══════════════════════════════════════════════════════════════════
//  ANSWER CHECKING
// ═══════════════════════════════════════════════════════════════════
function checkAnswer(room) {
  var correct = false;
  var feedback = document.getElementById('erFeedback');
  feedback.className = 'er-feedback';

  if (room.puzzleType === 'sequence') {
    var order = getSequenceOrder();
    correct = arraysEqual(order, room.solution);
    var items = document.querySelectorAll('.er-seq-item');
    items.forEach(function (it, i) {
      it.classList.remove('correct', 'incorrect');
      if (order[i] === room.solution[i]) it.classList.add('correct');
      else it.classList.add('incorrect');
    });
  } else if (room.puzzleType === 'phonetic') {
    var ans = getPhoneticAnswer();
    correct = ans === room.answer;
    document.querySelectorAll('.er-code-slot').forEach(function (inp, i) {
      inp.classList.remove('correct', 'incorrect');
      inp.classList.add(correct ? 'correct' : 'incorrect');
    });
  } else if (room.puzzleType === 'choice') {
    correct = puzzleState.selectedChoice !== null && room.choices[puzzleState.selectedChoice].correct;
    document.querySelectorAll('.er-choice').forEach(function (btn, i) {
      btn.classList.remove('correct', 'wrong');
      if (i === puzzleState.selectedChoice) btn.classList.add(correct ? 'correct' : 'wrong');
    });
  } else if (room.puzzleType === 'matching') {
    correct = matchingComplete(room);
  }

  if (correct) {
    feedback.className = 'er-feedback good show';
    feedback.textContent = '✓ Correct! The lock clicks open. Your clue fragment is revealed.';
    sfxCorrect();
    onRoomSolved(room);
  } else {
    feedback.className = 'er-feedback bad show';
    feedback.textContent = '✗ Not quite. Review your training and try again.';
    sfxWrong();
  }
}

function arraysEqual(a, b) {
  if (a.length !== b.length) return false;
  for (var i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
  return true;
}

// ═══════════════════════════════════════════════════════════════════
//  HINT SYSTEM
// ═══════════════════════════════════════════════════════════════════
function useHint(room, hintBox, hintBtn) {
  if (state.hintsLeft <= 0) {
    showToast('No hints remaining!');
    return;
  }
  sfxClick();
  state.hintsLeft--;
  hintBox.innerHTML = '<strong>💡 Hint:</strong> ' + room.hint;
  hintBox.classList.add('show');
  hintBtn.textContent = '💡 Hint (' + state.hintsLeft + ' left)';
  if (state.hintsLeft <= 0) hintBtn.disabled = true;
  updateHUD();
}

// ═══════════════════════════════════════════════════════════════════
//  ROOM SOLVED → show clue, door transition, next room
// ═══════════════════════════════════════════════════════════════════
function onRoomSolved(room) {
  state.solved.push(state.currentRoom);
  state.cluesFound.push(room.clue);

  // Show clue earned banner
  var clueEl = document.getElementById('erClueEarned');
  var clueVal = document.getElementById('erClueValue');
  clueVal.textContent = room.clue;
  clueEl.classList.add('show');

  // Disable submit to prevent re-submit
  var submitBtn = document.getElementById('erSubmitBtn');
  if (submitBtn) submitBtn.disabled = true;

  sfxUnlock();
  updateHUD();

  // After a delay, door transition → next room or final lock
  setTimeout(function () {
    if (state.currentRoom < ROOMS.length - 1) {
      doorTransition('Room ' + (state.currentRoom + 2) + ' Unlocked', function () {
        state.currentRoom++;
        renderRoom();
      });
    } else {
      doorTransition('Master Vault Ahead', function () {
        renderFinalLock();
      });
    }
  }, 2200);
}

// ═══════════════════════════════════════════════════════════════════
//  DOOR TRANSITION ANIMATION
// ═══════════════════════════════════════════════════════════════════
function doorTransition(text, callback) {
  elDoorText.textContent = text;
  elDoorTransition.classList.add('show');
  setTimeout(function () {
    elDoorTransition.classList.remove('show');
    if (callback) callback();
  }, 1500);
}

// ═══════════════════════════════════════════════════════════════════
//  FINAL MASTER LOCK
// ═══════════════════════════════════════════════════════════════════
function renderFinalLock() {
  state.currentRoom = ROOMS.length; // "room 6" = final
  elRoomNum.textContent = '★/5';
  updateHUD();

  var html = '<div class="er-room-header">' +
    '<div class="er-room-title-block">' +
      '<div class="er-room-number">★</div>' +
      '<div><div class="er-room-title">Master Vault Lock</div>' +
      '<div class="er-room-subtitle">Final Challenge · Escape Code</div></div>' +
    '</div>' +
    '<div class="er-room-theme-icon">🔓</div>' +
  '</div>' +
  '<div class="er-room-body er-final-lock">' +
    '<div class="er-room-brief">All five clue fragments have been collected. Enter them in order (Room 1 → Room 5) into the master vault to escape the bunker. <strong>One chance. Make it count.</strong></div>' +

    '<div class="er-clue-inventory" id="erClueInventory">';
  ROOMS.forEach(function (r, i) {
    var found = state.cluesFound.indexOf(r.clue) !== -1;
    html += '<div class="er-clue-chip ' + (found ? 'found' : '') + '">' +
      '<span class="er-clue-chip-label">' + r.clueLabel + '</span>' +
      '<span class="er-clue-chip-value">' + (found ? r.clue : '?') + '</span>' +
    '</div>';
  });
  html += '</div>' +

    '<div class="er-final-vault"><div class="er-vault-visual" id="erVaultVisual"><div class="er-vault-handle"></div></div></div>' +
    '<div class="er-vault-label" id="erVaultLabel">LOCKED</div>' +

    '<div class="er-final-code-row" id="erFinalRow">';
  for (var i = 0; i < FINAL_CODE.length; i++) {
    html += '<input class="er-final-slot" type="text" maxlength="1" data-pos="' + i + '" autocomplete="off" />';
  }
  html += '</div>' +

    '<div class="er-action-row" style="justify-content:center;">' +
      '<button class="er-submit-btn" id="erFinalSubmitBtn" type="button">🔓 Enter Code & Escape</button>' +
    '</div>' +
    '<div class="er-feedback" id="erFinalFeedback"></div>' +
  '</div>';

  elRoom.innerHTML = html;
  elRoom.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // Auto-advance inputs
  var inputs = document.querySelectorAll('.er-final-slot');
  inputs.forEach(function (inp, i) {
    inp.addEventListener('input', function () {
      this.value = this.value.replace(/[^0-9]/g, '');
      if (this.value && i < inputs.length - 1) inputs[i + 1].focus();
    });
    inp.addEventListener('keydown', function (e) {
      if (e.key === 'Backspace' && !this.value && i > 0) inputs[i - 1].focus();
      if (e.key === 'Enter') document.getElementById('erFinalSubmitBtn').click();
    });
  });
  if (inputs[0]) inputs[0].focus();

  document.getElementById('erFinalSubmitBtn').addEventListener('click', checkFinalCode);
}

function checkFinalCode() {
  var inputs = document.querySelectorAll('.er-final-slot');
  var entered = '';
  inputs.forEach(function (inp) { entered += inp.value; });
  var feedback = document.getElementById('erFinalFeedback');
  feedback.className = 'er-feedback';

  if (entered === FINAL_CODE) {
    inputs.forEach(function (inp) { inp.classList.add('correct'); });
    var vault = document.getElementById('erVaultVisual');
    vault.classList.add('unlocked');
    document.getElementById('erVaultLabel').textContent = 'UNLOCKED';
    feedback.className = 'er-feedback good show';
    feedback.textContent = '✓ The vault swings open! Daylight floods in — you\'ve escaped!';
    sfxUnlock();
    setTimeout(function () { onEscape(); }, 1800);
  } else {
    inputs.forEach(function (inp) { inp.classList.add('incorrect'); inp.classList.remove('correct'); });
    feedback.className = 'er-feedback bad show';
    feedback.textContent = '✗ Incorrect code. The vault remains sealed. Check your clue fragments and try again.';
    sfxWrong();
    setTimeout(function () {
      inputs.forEach(function (inp) { inp.classList.remove('incorrect'); });
    }, 600);
  }
}

// ═══════════════════════════════════════════════════════════════════
//  ESCAPE / VICTORY
// ═══════════════════════════════════════════════════════════════════
function onEscape() {
  state.finished = true;
  stopTimer();
  stopMusic();

  // Award badge to quest map (id 17)
  awardBadge();

  // Calculate stats
  var elapsed = TIME_LIMIT - state.timeLeft;
  var min = Math.floor(elapsed / 60);
  var sec = elapsed % 60;
  var timeStr = String(min).padStart(2, '0') + ':' + String(sec).padStart(2, '0');

  // Rank based on time + hints
  var rank = 'Cadet';
  if (state.hintsLeft >= 2 && elapsed < 600) rank = 'Elite Cadet';
  else if (state.hintsLeft >= 1 && elapsed < 900) rank = 'Senior Cadet';
  else if (elapsed < 1200) rank = 'Trained Cadet';
  else rank = 'Qualified Cadet';

  document.getElementById('erFinalTime').textContent = timeStr;
  document.getElementById('erFinalHints').textContent = state.hintsLeft;
  document.getElementById('erFinalRank').textContent = rank;

  // Save best time
  try {
    var best = localStorage.getItem(ESCAPE_KEY);
    if (!best || elapsed < Number(best)) localStorage.setItem(ESCAPE_KEY, String(elapsed));
  } catch (e) {}

  elGame.classList.remove('active');
  elVictory.classList.add('show');
  sfxVictory();
  spawnConfetti();
  elVictory.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function awardBadge() {
  try {
    var raw = localStorage.getItem(STORAGE_KEY);
    var completed = new Set(raw ? JSON.parse(raw) : []);
    completed.add(17);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed]));
  } catch (e) {}
}

// ═══════════════════════════════════════════════════════════════════
//  CONFETTI
// ═══════════════════════════════════════════════════════════════════
function spawnConfetti() {
  var colors = ['#f5c84c', '#f0a830', '#35a75a', '#2f6fbe', '#d94b4b', '#fff3ce'];
  var container = elVictory;
  for (var i = 0; i < 60; i++) {
    (function (i) {
      setTimeout(function () {
        var c = document.createElement('div');
        c.className = 'er-confetti';
        c.style.background = colors[i % colors.length];
        c.style.left = Math.random() * 100 + '%';
        c.style.top = '-20px';
        c.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        c.style.width = (6 + Math.random() * 8) + 'px';
        c.style.height = (6 + Math.random() * 8) + 'px';
        container.appendChild(c);
        var dur = 2 + Math.random() * 2;
        var drift = (Math.random() - 0.5) * 200;
        c.animate([
          { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
          { transform: 'translate(' + drift + 'px, 500px) rotate(' + (Math.random() * 720) + 'deg)', opacity: 0 }
        ], { duration: dur * 1000, easing: 'cubic-bezier(.3,.7,.5,1)' });
        setTimeout(function () { c.remove(); }, dur * 1000);
      }, i * 30);
    })(i);
  }
}

// ═══════════════════════════════════════════════════════════════════
//  GAME OVER (time expired)
// ═══════════════════════════════════════════════════════════════════
function gameOver() {
  stopMusic();
  elGame.classList.remove('active');
  elVictory.querySelector('h2').textContent = 'TIME EXPIRED';
  elVictory.querySelector('.er-victory-sub').textContent = 'The bunker has sealed permanently. But a true cadet never quits — reset and try again. Your training will get you through next time.';
  document.getElementById('erFinalTime').textContent = '20:00';
  document.getElementById('erFinalHints').textContent = state.hintsLeft;
  document.getElementById('erFinalRank').textContent = 'Try Again';
  elVictory.classList.add('show');
  elVictory.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ═══════════════════════════════════════════════════════════════════
//  UTILITIES
// ═══════════════════════════════════════════════════════════════════
function shuffle(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
  }
  return arr;
}

// ═══════════════════════════════════════════════════════════════════
//  GAME FLOW
// ═══════════════════════════════════════════════════════════════════
function startGame() {
  initAudio();
  if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();

  state = {
    currentRoom: 0,
    timeLeft: TIME_LIMIT,
    hintsLeft: TOTAL_HINTS,
    cluesFound: [],
    solved: [],
    timerInterval: null,
    startTime: 0,
    finished: false
  };

  elIntro.classList.add('hidden');
  elVictory.classList.remove('show');
  elHud.style.display = 'flex';
  elGame.classList.add('active');

  updateTimerDisplay();
  startTimer();
  renderRoom();

  // Auto-start music
  startMusic();
  elMusicBtn.classList.add('playing');
  elMusicBtn.querySelector('.er-music-label').textContent = 'Music On';
  showToast('🔓 Escape room activated — good luck, Cadet!');
}

function resetGame() {
  stopTimer();
  stopMusic();
  state.finished = false;
  elVictory.classList.remove('show');
  elHud.style.display = 'none';
  elGame.classList.remove('active');
  elIntro.classList.remove('hidden');
  elVictory.querySelector('h2').textContent = 'YOU ESCAPED!';
  elVictory.querySelector('.er-victory-sub').textContent = 'Outstanding work, Cadet. You applied everything you learned across the Year 1 training program to solve every puzzle and crack the master vault. The Escape Room badge has been saved to your Cadet Quest Map.';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ═══════════════════════════════════════════════════════════════════
//  EVENT WIRING
// ═══════════════════════════════════════════════════════════════════
  /* ── i18n: translate data arrays in-place ── */
  if (typeof trMutate === "function") {
    try { trMutate(ROOMS); } catch(e) {}
  }

elStartBtn.addEventListener('click', startGame);
elMusicBtn.addEventListener('click', toggleMusic);
elReplayBtn.addEventListener('click', function () { resetGame(); });

// Resume audio context on first interaction (browser autoplay policy)
document.addEventListener('click', function resumeAudio() {
  if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
}, { once: true });

})();
