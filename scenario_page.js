const cfg = window.SCENARIO_CONFIG;

/* ── i18n: translate the scenario config in-place ── */
if (typeof trMutate === "function") { try { trMutate(cfg); } catch(e) {} }

const root = document.documentElement;
root.style.setProperty('--theme-a', cfg.theme[0]);
root.style.setProperty('--theme-b', cfg.theme[1]);

document.title = cfg.pageTitle;
document.getElementById('eyebrow').textContent = cfg.eyebrow;
document.getElementById('pageTitle').textContent = cfg.title;
document.getElementById('subtitle').textContent = cfg.subtitle;
document.getElementById('scoreTitle').textContent = cfg.scoreTitle || 'Scenario Score';
document.getElementById('sceneTitle').textContent = cfg.sceneTitle;
document.getElementById('stageLabel').textContent = cfg.stageLabel || 'Click glowing areas';
document.getElementById('missionTitle').textContent = cfg.missionTitle || 'Mission Brief';
document.getElementById('brief').textContent = cfg.brief;
document.getElementById('badgeImage').src = cfg.badge;
document.getElementById('badgeImage').alt = `${cfg.title} badge`;
document.getElementById('badgeText').textContent = cfg.unlockText;

const missionList = document.getElementById('missionList');
const sceneArt = document.getElementById('sceneArt');
const feedback = document.getElementById('feedback');
const challengeCard = document.getElementById('challengeCard');
const challengeTitle = document.getElementById('challengeTitle');
const choiceGrid = document.getElementById('choiceGrid');
const hintBtn = document.getElementById('hintBtn');
const autoDemo = document.getElementById('autoDemo');
const resetGame = document.getElementById('resetGame');
const inventory = document.getElementById('inventory');
const scoreEl = document.getElementById('score');
const foundCountEl = document.getElementById('foundCount');
const progressBar = document.getElementById('progressBar');
const badgeUnlock = document.getElementById('badgeUnlock');

let selectedTask = null;
let completedTasks = new Set(JSON.parse(localStorage.getItem(`${cfg.storageKey}:completed`) || '[]'));
let wrongAttempts = Number(localStorage.getItem(`${cfg.storageKey}:wrong`) || '0');

missionList.innerHTML = cfg.missionSteps.map(step => `<li>${step}</li>`).join('');

function setFeedback(type, title, message) {
  feedback.className = `feedback ${type || ''}`.trim();
  feedback.innerHTML = `<h3>${title}</h3><p>${message}</p>`;
}

function buildScene() {
  sceneArt.innerHTML = '';
  (cfg.sceneObjects || []).forEach(obj => {
    const el = document.createElement('div');
    el.className = `object ${obj.size || 'med'}`;
    el.style.left = obj.x;
    el.style.top = obj.y;
    el.innerHTML = obj.html;
    sceneArt.appendChild(el);
  });
  if (cfg.showPlayer !== false) {
    const player = document.createElement('div');
    player.className = 'player';
    sceneArt.appendChild(player);
  }
  cfg.tasks.forEach(task => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'hotspot';
    btn.dataset.task = task.id;
    btn.textContent = task.marker || '?';
    btn.style.left = task.x;
    btn.style.top = task.y;
    btn.style.width = task.w || '78px';
    btn.style.height = task.h || '62px';
    btn.setAttribute('aria-label', task.label);
    btn.addEventListener('click', () => selectTask(task.id));
    sceneArt.appendChild(btn);
  });
}

function renderInventory() {
  inventory.innerHTML = cfg.tasks.map(task => `
    <div class="find-card ${completedTasks.has(task.id) ? 'done' : ''}">${completedTasks.has(task.id) ? '✓ ' : ''}${task.label}</div>
  `).join('');
}

function updateScore() {
  const total = cfg.tasks.length;
  const base = Math.round((completedTasks.size / total) * 100);
  const penalty = Math.min(wrongAttempts * 5, 20);
  const score = completedTasks.size === total ? Math.max(0, 100 - penalty) : base;
  scoreEl.textContent = score;
  foundCountEl.textContent = completedTasks.size;
  document.getElementById('totalCount').textContent = total;
  progressBar.style.width = `${(completedTasks.size / total) * 100}%`;
  document.querySelectorAll('.hotspot').forEach(h => h.classList.toggle('done', completedTasks.has(h.dataset.task)));
  renderInventory();
  localStorage.setItem(`${cfg.storageKey}:completed`, JSON.stringify([...completedTasks]));
  localStorage.setItem(`${cfg.storageKey}:wrong`, String(wrongAttempts));
  if (completedTasks.size === total) unlockBadge(score);
}

function selectTask(id) {
  selectedTask = id;
  const task = cfg.tasks.find(t => t.id === id);
  document.querySelectorAll('.hotspot').forEach(h => h.classList.toggle('selected', h.dataset.task === id));
  setFeedback(completedTasks.has(id) ? 'good' : '', task.label, completedTasks.has(id) ? 'This challenge is already complete. You can replay choices or continue to another station.' : task.clue);
  challengeCard.classList.add('active');
  challengeTitle.textContent = task.question;
  choiceGrid.innerHTML = task.choices.map((choice, index) => `
    <button class="choice-btn" type="button" data-choice="${index}">${choice.text}</button>
  `).join('');
  choiceGrid.querySelectorAll('.choice-btn').forEach(btn => btn.addEventListener('click', () => answerChoice(Number(btn.dataset.choice))));
}

function answerChoice(index) {
  if (!selectedTask) return;
  const task = cfg.tasks.find(t => t.id === selectedTask);
  const choice = task.choices[index];
  choiceGrid.querySelectorAll('.choice-btn').forEach((btn, i) => {
    btn.classList.remove('correct', 'wrong');
    if (i === index) btn.classList.add(choice.correct ? 'correct' : 'wrong');
  });
  if (choice.correct) {
    completedTasks.add(selectedTask);
    setFeedback('good', 'Correct response!', choice.feedback);
  } else {
    wrongAttempts += 1;
    setFeedback('bad', 'Wrong response — try again', choice.feedback);
  }
  updateScore();
}

function showHint() {
  if (!selectedTask) {
    setFeedback('', 'Hint', 'Select a glowing scenario area first, then request a hint for that station.');
    return;
  }
  const task = cfg.tasks.find(t => t.id === selectedTask);
  setFeedback('', `Hint: ${task.label}`, task.hint || 'Look for the choice that best supports safety, teamwork, and the stated mission goal.');
}

function resetScenario() {
  completedTasks = new Set();
  wrongAttempts = 0;
  selectedTask = null;
  localStorage.removeItem(`${cfg.storageKey}:completed`);
  localStorage.removeItem(`${cfg.storageKey}:wrong`);
  challengeCard.classList.remove('active');
  document.querySelectorAll('.hotspot').forEach(h => h.classList.remove('selected', 'done'));
  setFeedback('', 'Awaiting mission action', cfg.startPrompt);
  updateScore();
}

function unlockBadge(score) {
  const mapProgress = new Set(JSON.parse(localStorage.getItem('cadetMapDemoCompleted') || '[]'));
  mapProgress.add(cfg.badgeId);
  localStorage.setItem('cadetMapDemoCompleted', JSON.stringify([...mapProgress]));
  if (!badgeUnlock.classList.contains('show')) {
    badgeUnlock.classList.remove('show');
    void badgeUnlock.offsetWidth;
    badgeUnlock.classList.add('show');
    setFeedback('good', 'Scenario complete!', `${cfg.unlockText} Final score: ${score}/100. Progress has been saved back to the quest map.`);
  }
}

function autoDemoCorrectPath() {
  let delay = 0;
  cfg.tasks.forEach(task => {
    setTimeout(() => {
      selectTask(task.id);
      const correctIndex = task.choices.findIndex(c => c.correct);
      answerChoice(correctIndex);
    }, delay);
    delay += 650;
  });
}

hintBtn.addEventListener('click', showHint);
resetGame.addEventListener('click', resetScenario);
autoDemo.addEventListener('click', autoDemoCorrectPath);

buildScene();
setFeedback('', 'Awaiting mission action', cfg.startPrompt);
updateScore();
