const targetPattern = ['C', 'E', 'G'];
const frequencies = {
  C: 261.63,
  D: 293.66,
  E: 329.63,
  F: 349.23,
  G: 392.00,
  A: 440.00,
  B: 493.88,
  C2: 523.25
};

const noteBank = document.getElementById('noteBank');
const slots = [...document.querySelectorAll('.drop-slot')];
const playPatternBtn = document.getElementById('playPattern');
const checkAnswerBtn = document.getElementById('checkAnswer');
const resetBtn = document.getElementById('resetBoard');
const loadWrongBtn = document.getElementById('loadWrong');
const loadCorrectBtn = document.getElementById('loadCorrect');
const feedback = document.getElementById('feedback');
const scoreEl = document.getElementById('score');
const speakerWrap = document.getElementById('speakerWrap');
const patternDisplay = document.getElementById('patternDisplay');
const confetti = document.getElementById('confetti');
const badgeUnlock = document.getElementById('badgeUnlock');

let draggedToken = null;
let audioContext = null;
let score = 0;

function ensureAudio() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
}

function playTone(note, startTime, duration = 0.42) {
  const ctx = ensureAudio();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(frequencies[note], startTime);
  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.exponentialRampToValueAtTime(0.22, startTime + 0.025);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(startTime);
  osc.stop(startTime + duration + 0.03);
}

function playPattern(pattern = targetPattern) {
  const ctx = ensureAudio();
  if (ctx.state === 'suspended') ctx.resume();
  const now = ctx.currentTime + 0.08;
  pattern.forEach((note, index) => playTone(note, now + index * 0.55));
  speakerWrap.classList.add('playing');
  patternDisplay.textContent = 'Playing clue: listen for note movement and spacing...';
  setTimeout(() => {
    speakerWrap.classList.remove('playing');
    patternDisplay.textContent = 'Clue complete. Drag notes into the staff slots.';
  }, pattern.length * 560 + 350);
}

function wireToken(token) {
  token.addEventListener('dragstart', event => {
    draggedToken = token;
    event.dataTransfer.setData('text/plain', token.dataset.note);
    event.dataTransfer.effectAllowed = 'move';
    setTimeout(() => token.style.opacity = '0.45', 0);
  });

  token.addEventListener('dragend', () => {
    token.style.opacity = '';
    draggedToken = null;
  });

  token.addEventListener('dblclick', () => {
    if (token.parentElement?.classList.contains('drop-slot')) {
      returnTokenToBank(token);
      setNeutralFeedback('Note returned', 'Double-click another placed note to move it back, or submit your answer when ready.');
    }
  });
}

function returnTokenToBank(token) {
  token.classList.remove('used');
  noteBank.appendChild(token);
}

function clearSlot(slot) {
  const token = slot.querySelector('.note-token');
  if (token) returnTokenToBank(token);
  slot.innerHTML = `Drop<br>Note ${Number(slot.dataset.slot) + 1}`;
}

function placeTokenInSlot(token, slot) {
  const existing = slot.querySelector('.note-token');
  if (existing && existing !== token) returnTokenToBank(existing);
  slot.innerHTML = '';
  slot.appendChild(token);
  token.classList.remove('used');
}

slots.forEach(slot => {
  slot.addEventListener('dragover', event => {
    event.preventDefault();
    slot.classList.add('over');
  });

  slot.addEventListener('dragleave', () => slot.classList.remove('over'));

  slot.addEventListener('drop', event => {
    event.preventDefault();
    slot.classList.remove('over');
    if (!draggedToken) return;
    placeTokenInSlot(draggedToken, slot);
    setNeutralFeedback('Note placed', 'Build the three-note answer, then press Submit Answer.');
  });
});

[...document.querySelectorAll('.note-token')].forEach(wireToken);

function getAnswer() {
  return slots.map(slot => slot.querySelector('.note-token')?.dataset.note || null);
}

function setFeedback(type, title, message, icon) {
  feedback.className = `feedback ${type || ''}`.trim();
  feedback.innerHTML = `
    <div class="feedback-icon">${icon}</div>
    <div>
      <h4>${title}</h4>
      <p>${message}</p>
    </div>
  `;
}

function setNeutralFeedback(title, message) {
  setFeedback('', title, message, '?');
}

function checkAnswer() {
  const answer = getAnswer();
  const empty = answer.some(note => !note);
  if (empty) {
    score = Math.max(0, score - 5);
    scoreEl.textContent = score;
    setFeedback('wrong', 'Incomplete pattern', 'Fill all three staff slots before submitting. Listen again if you need the clue.', '!');
    return;
  }

  const isCorrect = answer.every((note, index) => note === targetPattern[index]);
  if (isCorrect) {
    score = 100;
    scoreEl.textContent = score;
    setFeedback('correct', 'Correct response!', 'You matched C – E – G. Badge unlock animation triggered and Badge 16 progress is saved to the quest map.', '✓');
    const mapProgress = new Set(JSON.parse(localStorage.getItem('cadetMapDemoCompleted') || '[]'));
    mapProgress.add(16);
    localStorage.setItem('cadetMapDemoCompleted', JSON.stringify([...mapProgress]));
    playPattern(targetPattern);
    launchConfetti();
    showBadgeUnlock();
  } else {
    score = Math.max(0, score - 10);
    scoreEl.textContent = score;
    const pretty = answer.join(' – ');
    setFeedback('wrong', 'Wrong response — try again', `You entered ${pretty}. The rhythm is close, but the pitch order does not match the sound clue.`, '×');
    playPattern(answer.filter(Boolean));
  }
}

function resetBoard() {
  slots.forEach(clearSlot);
  score = 0;
  scoreEl.textContent = score;
  patternDisplay.textContent = 'Audio clue ready: match the hidden 3-note pattern.';
  setNeutralFeedback('Awaiting your answer', 'Use the note tokens to build the melody you hear, then submit.');
}

function tokenByNote(note) {
  return [...document.querySelectorAll('.note-token')].find(token => token.dataset.note === note);
}

function loadExample(pattern) {
  slots.forEach(clearSlot);
  pattern.forEach((note, index) => {
    const token = tokenByNote(note);
    if (token) placeTokenInSlot(token, slots[index]);
  });
  setNeutralFeedback('Example loaded', `Loaded ${pattern.join(' – ')}. Press Submit Answer to test the response animation.`);
}

function launchConfetti() {
  confetti.innerHTML = '';
  const colors = ['#f5c84c', '#35a75a', '#2f6fbe', '#7b4fd6', '#ff7aa2', '#ffffff'];
  for (let i = 0; i < 90; i++) {
    const piece = document.createElement('i');
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = `${Math.random() * 0.45}s`;
    piece.style.animationDuration = `${1.1 + Math.random() * 1.2}s`;
    confetti.appendChild(piece);
  }
  setTimeout(() => confetti.innerHTML = '', 2500);
}

function showBadgeUnlock() {
  badgeUnlock.classList.remove('show');
  void badgeUnlock.offsetWidth;
  badgeUnlock.classList.add('show');
}

playPatternBtn.addEventListener('click', () => playPattern(targetPattern));
checkAnswerBtn.addEventListener('click', checkAnswer);
resetBtn.addEventListener('click', resetBoard);
loadWrongBtn.addEventListener('click', () => loadExample(['C', 'D', 'G']));
loadCorrectBtn.addEventListener('click', () => loadExample(['C', 'E', 'G']));

// Keyboard testing shortcuts: P = play, W = wrong example, C = correct example, Enter = submit.
document.addEventListener('keydown', event => {
  if (event.target.tagName === 'BUTTON') return;
  if (event.key.toLowerCase() === 'p') playPattern(targetPattern);
  if (event.key.toLowerCase() === 'w') loadExample(['C', 'D', 'G']);
  if (event.key.toLowerCase() === 'c') loadExample(['C', 'E', 'G']);
  if (event.key === 'Enter') checkAnswer();
});

  /* ── i18n: translate data arrays in-place ── */
  if (typeof trMutate === "function") {
    try { trMutate(colors); } catch(e) {}
    try { trMutate(frequencies); } catch(e) {}
    try { trMutate(slots); } catch(e) {}
    try { trMutate(targetPattern); } catch(e) {}
  }
