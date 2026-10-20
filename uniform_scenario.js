const issues = {
  beret: {
    label: 'Beret Placement',
    clue: 'The beret is sitting too far off angle. The cadet needs a neat, inspection-ready placement.',
    hint: 'Think about neat presentation: secure, shaped, and positioned consistently.',
    choices: [
      { text: 'Leave it loose because it looks more relaxed.', correct: false, feedback: 'Wrong response. Inspection preparation should not look casual or loose.' },
      { text: 'Adjust the beret so it is secure, shaped neatly, and positioned to the unit standard.', correct: true, feedback: 'Correct response. Neat placement shows attention to detail and respect for the standard.' },
      { text: 'Hide the beret in a pocket before inspection.', correct: false, feedback: 'Wrong response. Required uniform items should be worn correctly, not hidden.' }
    ]
  },
  tie: {
    label: 'Tie Alignment',
    clue: 'The tie is not centered. It draws attention away from the clean uniform line.',
    hint: 'Look for symmetry down the centre of the shirt and jacket.',
    choices: [
      { text: 'Center the tie and smooth it so it lines up cleanly with the shirt.', correct: true, feedback: 'Correct response. Centering the tie improves the full inspection appearance.' },
      { text: 'Pull it to one side so it is easier to see.', correct: false, feedback: 'Wrong response. A tie should support a neat centered presentation.' },
      { text: 'Ignore it because small details do not matter.', correct: false, feedback: 'Wrong response. Uniform standards are built from small details done consistently.' }
    ]
  },
  boots: {
    label: 'Boot Presentation',
    clue: 'The boots need attention before inspection. Footwear is part of the overall standard.',
    hint: 'Inspection-ready footwear should look clean, cared for, and deliberately prepared.',
    choices: [
      { text: 'Wipe and polish the boots so they are clean and presentable.', correct: true, feedback: 'Correct response. Clean footwear shows preparation and care.' },
      { text: 'Stand behind someone else so the boots are harder to see.', correct: false, feedback: 'Wrong response. Inspection is about meeting the standard, not hiding issues.' },
      { text: 'Only clean one boot because the other side is less visible.', correct: false, feedback: 'Wrong response. Standards apply to the whole uniform.' }
    ]
  },
  sleeve: {
    label: 'Sleeve & Cuff Check',
    clue: 'One sleeve looks uneven and needs a quick correction before the cadet reports in.',
    hint: 'Compare both sides. Inspection preparation often means checking symmetry.',
    choices: [
      { text: 'Roll one sleeve higher to make it stand out.', correct: false, feedback: 'Wrong response. The goal is consistent, neat presentation.' },
      { text: 'Adjust the sleeve and cuff so both sides are even and tidy.', correct: true, feedback: 'Correct response. Symmetry and neatness are key inspection habits.' },
      { text: 'Cover the sleeve with the other arm during inspection.', correct: false, feedback: 'Wrong response. Cadets should correct issues directly rather than hiding them.' }
    ]
  }
};

const hotspots = [...document.querySelectorAll('.issue-hotspot')];
const feedback = document.getElementById('feedback');
const correctionCard = document.getElementById('correctionCard');
const correctionTitle = document.getElementById('correctionTitle');
const choiceGrid = document.getElementById('choiceGrid');
const scoreEl = document.getElementById('score');
const foundCountEl = document.getElementById('foundCount');
const progressBar = document.getElementById('progressBar');
const inventory = document.getElementById('inventory');
const hintBtn = document.getElementById('hintBtn');
const resetGame = document.getElementById('resetGame');
const autoDemo = document.getElementById('autoDemo');
const badgeUnlock = document.getElementById('badgeUnlock');

let selectedIssue = null;
let corrected = new Set(JSON.parse(localStorage.getItem('uniformScenarioCorrected') || '[]'));
let wrongAttempts = Number(localStorage.getItem('uniformScenarioWrongAttempts') || '0');

function setFeedback(type, title, message) {
  feedback.className = `feedback ${type || ''}`.trim();
  feedback.innerHTML = `<h3>${title}</h3><p>${message}</p>`;
}

function renderInventory() {
  inventory.innerHTML = Object.entries(issues).map(([id, issue]) => `
    <div class="find-card ${corrected.has(id) ? 'done' : ''}">${corrected.has(id) ? '✓ ' : ''}${issue.label}</div>
  `).join('');
}

function updateScore() {
  const base = corrected.size * 25;
  const penalty = Math.min(wrongAttempts * 5, 20);
  const score = Math.max(0, corrected.size === 4 ? 100 - penalty : base);
  scoreEl.textContent = score;
  foundCountEl.textContent = corrected.size;
  progressBar.style.width = `${(corrected.size / 4) * 100}%`;
  hotspots.forEach(h => h.classList.toggle('found', corrected.has(h.dataset.issue)));
  renderInventory();
  localStorage.setItem('uniformScenarioCorrected', JSON.stringify([...corrected]));
  localStorage.setItem('uniformScenarioWrongAttempts', String(wrongAttempts));
  if (corrected.size === 4) unlockBadge(score);
}

function selectIssue(id) {
  selectedIssue = id;
  const issue = issues[id];
  hotspots.forEach(h => h.classList.toggle('selected', h.dataset.issue === id));
  if (corrected.has(id)) {
    setFeedback('good', `${issue.label} already corrected`, 'This item has already been fixed. Select another glowing area or reset the inspection to replay.');
  } else {
    setFeedback('', issue.label, issue.clue);
  }
  correctionCard.classList.add('active');
  correctionTitle.textContent = `Choose correction: ${issue.label}`;
  choiceGrid.innerHTML = issue.choices.map((choice, index) => `
    <button class="choice-btn" type="button" data-choice="${index}">${choice.text}</button>
  `).join('');
  choiceGrid.querySelectorAll('.choice-btn').forEach(btn => {
    btn.addEventListener('click', () => answerChoice(Number(btn.dataset.choice)));
  });
}

function answerChoice(choiceIndex) {
  if (!selectedIssue) return;
  const issue = issues[selectedIssue];
  const choice = issue.choices[choiceIndex];
  const buttons = choiceGrid.querySelectorAll('.choice-btn');
  buttons.forEach((btn, index) => {
    btn.classList.remove('correct', 'wrong');
    if (index === choiceIndex) btn.classList.add(choice.correct ? 'correct' : 'wrong');
  });
  if (choice.correct) {
    corrected.add(selectedIssue);
    setFeedback('good', 'Correct response!', choice.feedback);
    updateScore();
  } else {
    wrongAttempts += 1;
    setFeedback('bad', 'Wrong response — try again', choice.feedback);
    updateScore();
  }
}

function showHint() {
  if (!selectedIssue) {
    setFeedback('', 'Hint', 'Select one glowing uniform area first, then request a hint for that item.');
    return;
  }
  setFeedback('', `Hint: ${issues[selectedIssue].label}`, issues[selectedIssue].hint);
}

function resetInspection() {
  corrected = new Set();
  wrongAttempts = 0;
  selectedIssue = null;
  localStorage.removeItem('uniformScenarioCorrected');
  localStorage.removeItem('uniformScenarioWrongAttempts');
  hotspots.forEach(h => h.classList.remove('selected', 'found'));
  correctionCard.classList.remove('active');
  setFeedback('', 'Awaiting inspection', 'Click a glowing area on the cadet uniform to begin.');
  updateScore();
}

function unlockBadge(score) {
  const mapProgress = new Set(JSON.parse(localStorage.getItem('cadetMapDemoCompleted') || '[]'));
  mapProgress.add(3);
  localStorage.setItem('cadetMapDemoCompleted', JSON.stringify([...mapProgress]));
  if (!badgeUnlock.classList.contains('show')) {
    badgeUnlock.classList.remove('show');
    void badgeUnlock.offsetWidth;
    badgeUnlock.classList.add('show');
    setFeedback('good', 'Inspection complete!', `All four uniform issues were corrected. Final score: ${score}/100. Badge 3 progress has been saved back to the quest map.`);
  }
}

function autoDemoCorrectPath() {
  const order = ['beret', 'tie', 'boots', 'sleeve'];
  let delay = 0;
  order.forEach(id => {
    setTimeout(() => {
      selectIssue(id);
      const correctIndex = issues[id].choices.findIndex(choice => choice.correct);
      answerChoice(correctIndex);
    }, delay);
    delay += 650;
  });
}

hotspots.forEach(h => h.addEventListener('click', () => selectIssue(h.dataset.issue)));
hintBtn.addEventListener('click', showHint);
resetGame.addEventListener('click', resetInspection);
autoDemo.addEventListener('click', autoDemoCorrectPath);

/* ── i18n: translate data arrays in-place ── */
if (typeof trMutate === "function") {
  try { trMutate(issues); } catch(e) {}
}

updateScore();
if (corrected.size > 0 && corrected.size < 4) {
  setFeedback('', 'Inspection resumed', 'Your previous inspection progress was restored. Continue correcting the remaining uniform issues.');
}

