const CASES = {
  simulator: {
    domain: 'ROBOTICS / SIMULATION', title: 'The robot fails. But what failed?',
    context: 'A pretrained robot policy shows joint-limit violations in a new MuJoCo simulator. The project is still validating the environment, including its rigid reference. An early comparison has only eight qualified poses.',
    evidence: [['Policy', 'Pretrained, frozen'], ['Simulator', 'MuJoCo'], ['Qualified poses', '8'], ['Unresolved issue', 'Joint-limit violations']],
    a: ['Expand the pose pool.', 'Repeat the comparison with more poses to increase statistical power for studying the apparent policy degradation.'],
    b: ['Validate the simulator first.', 'Keep the policy frozen. Check joint limits, contacts, and timestep on a rigid reference before interpreting soft-support results.'],
    reference: 'b', explanation: 'The simulator itself is still being validated. More samples cannot resolve a runtime compatibility problem. The reference plan isolates joint-limit, contact, and timestep differences with the frozen policy before interpreting behavior on soft supports.',
    source: 'https://github.com/AutoResearch-Factory/AgonBench-site/blob/main/examples/soft-support.md'
  },
  capacity: {
    domain: 'SCIENTIFIC MACHINE LEARNING', title: 'More data cannot change this limit.',
    context: 'A scientific ML project is preparing pretraining and PDE search experiments. Its 4,780-parameter controller needs 400 distinct occupied decisions per parameter, but the current topology can represent at most 8,748. A smaller, alternative topology has already been authorized.',
    evidence: [['Current parameters', '4,780'], ['Capacity criterion', '400 decisions / parameter'], ['Required decisions', '1,912,000'], ['Current upper bound', '8,748']],
    a: ['Change the representation first.', 'Switch to the authorized feasible topology, rebuild the matched control and data bindings, and meet the data and validation gates before training.'],
    b: ['Proceed with pretraining and search.', 'Use the current roster to train the planned checkpoints and run the paired PDE search experiments at the full step budget.'],
    reference: 'a', explanation: 'The current topology cannot reach the required decision count, regardless of how much data is collected. The reference plan first changes the representation, then rebuilds compatible treatment and control setups and verifies data sufficiency before spending on training and transfer experiments.',
    source: 'https://github.com/AutoResearch-Factory/AgonBench-site/blob/main/examples/model-capacity.md'
  },
  navigation: {
    domain: 'EMBODIED AI / NAVIGATION', title: 'Are we still testing the same idea?',
    context: 'The research question is whether an LLM can navigate by reading a named-place graph and producing a list of place names. An alternative plan puts place recognition at the center, uses BFS/A* as the main planner, and moves LLM routing to the appendix.',
    evidence: [['Research target', 'LLM route planning'], ['Persistent memory', 'Named places + text graph'], ['LLM output', 'A list of place names'], ['Supporting component', 'Visual place linker']],
    a: ['Center the place-recognition study.', 'Calibrate the visual linker, use BFS/A* as the default planner, and retain LLM string routing as a secondary diagnostic.'],
    b: ['Test the LLM routing claim directly.', 'Measure route validity on named graphs with BFS/A* as a control, validate the visual linker, then test the complete navigation pipeline.'],
    reference: 'b', explanation: 'The alternative changes the main research question. The reference plan keeps LLM routing as the object of study, uses graph search as a control, and validates place linking as a supporting component before evaluating the end-to-end system.',
    source: 'https://github.com/AutoResearch-Factory/AgonBench-site/blob/main/examples/research-direction.md'
  }
};
const MODEL_NAMES = ['gpt-6-astra', 'claude-opus-5', 'grok-4.6'];
const PILOT = {
  project: {astra: [20, 9, 10], opus: [20, 16, 14], grok: [19, 14, 8]},
  blind: {astra: [23, 18, 16], opus: [30, 28, 23], grok: [22, 25, 22]}
};
let currentCase = 'simulator';
let selectedAnswer = null;
let revealed = false;
let currentArm = 'project';
const tabs = [...document.querySelectorAll('[data-case]')];
const answers = [...document.querySelectorAll('[data-answer]')];
const result = document.querySelector('#answer-result');
const reveal = document.querySelector('#reveal-answer');
const reset = document.querySelector('#reset-case');

function resetAnswer() {
  selectedAnswer = null;
  revealed = false;
  answers.forEach(button => {button.setAttribute('aria-pressed', 'false'); button.classList.remove('is-reference');});
  result.hidden = true;
  result.replaceChildren();
  reveal.hidden = false;
  reveal.disabled = true;
  reset.hidden = true;
}
function loadCase(key, updateUrl = false) {
  if (!Object.hasOwn(CASES, key)) return;
  currentCase = key;
  const data = CASES[key];
  tabs.forEach(tab => {const active = tab.dataset.case === key; tab.setAttribute('aria-selected', String(active)); tab.tabIndex = active ? 0 : -1;});
  document.querySelector('#case-panel').setAttribute('aria-labelledby', `tab-${key}`);
  document.querySelector('#case-domain').textContent = data.domain;
  document.querySelector('#case-title').textContent = data.title;
  document.querySelector('#case-context').textContent = data.context;
  const evidence = document.querySelector('#case-evidence');
  evidence.replaceChildren(...data.evidence.map(([label, value]) => {const row = document.createElement('div'); const dt = document.createElement('dt'); const dd = document.createElement('dd'); dt.textContent = label; dd.textContent = value; row.append(dt, dd); return row;}));
  for (const letter of ['a', 'b']) {document.querySelector(`#answer-${letter}-title`).textContent = data[letter][0]; document.querySelector(`#answer-${letter}-body`).textContent = data[letter][1];}
  document.querySelector('#case-source').href = data.source;
  document.querySelector('#copy-feedback').textContent = '';
  resetAnswer();
  if (updateUrl) history.replaceState(null, '', `#case-${key}`);
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => loadCase(tab.dataset.case, true));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) {event.preventDefault(); loadCase(tabs[next].dataset.case, true); tabs[next].focus();}
  });
});
answers.forEach(button => button.addEventListener('click', () => {
  if (revealed) resetAnswer();
  selectedAnswer = button.dataset.answer;
  answers.forEach(answer => answer.setAttribute('aria-pressed', String(answer === button)));
  reveal.disabled = false;
}));
reveal.addEventListener('click', () => {
  if (!selectedAnswer) return;
  const data = CASES[currentCase];
  const heading = document.createElement('strong');
  heading.textContent = `${selectedAnswer === data.reference ? 'Your choice matches the reference.' : 'The reference takes the other direction.'} Answer ${data.reference.toUpperCase()}.`;
  const explanation = document.createElement('p'); explanation.textContent = data.explanation;
  result.replaceChildren(heading, explanation); result.hidden = false;
  answers.forEach(button => button.classList.toggle('is-reference', button.dataset.answer === data.reference));
  revealed = true; reveal.hidden = true; reset.hidden = false; reset.focus({preventScroll: true});
});
reset.addEventListener('click', () => {resetAnswer(); answers[0].focus();});
function openCaseHash(scroll = true) {
  const key = location.hash.replace(/^#case-/, '');
  if (Object.hasOwn(CASES, key)) {loadCase(key); if (scroll) document.querySelector('#examples').scrollIntoView({behavior: 'instant'});}
}
document.querySelectorAll('[data-preview]').forEach(link => link.addEventListener('click', event => {
  event.preventDefault(); history.pushState(null, '', link.getAttribute('href')); loadCase(link.dataset.preview);
  document.querySelector('#examples').scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
}));
window.addEventListener('hashchange', () => openCaseHash());
window.addEventListener('popstate', () => openCaseHash());
openCaseHash();
document.querySelector('.copy-case').addEventListener('click', async () => {
  const url = new URL(location.href); url.hash = `case-${currentCase}`; url.search = '';
  const feedback = document.querySelector('#copy-feedback');
  try {await navigator.clipboard.writeText(url.href); feedback.textContent = 'Case link copied.';}
  catch {feedback.textContent = `Case link: ${url.href}`;}
});
function renderResults() {
  const writer = document.querySelector('#writer-filter').value;
  const writers = writer === 'all' ? ['astra', 'opus', 'grok'] : [writer];
  const runs = writers.length * 40;
  const counts = MODEL_NAMES.map((_, i) => writers.reduce((sum, key) => sum + PILOT[currentArm][key][i], 0));
  const rows = counts.map((count, i) => {
    const tr = document.createElement('tr');
    const th = document.createElement('th'); th.scope = 'row';
    const symbol = document.createElement('span'); symbol.className = 'model-symbol'; symbol.textContent = ['G', 'C', 'X'][i]; symbol.setAttribute('aria-hidden', 'true');
    th.append(symbol, MODEL_NAMES[i]);
    const score = document.createElement('td'); const cell = document.createElement('div'); cell.className = 'accuracy-cell';
    const value = document.createElement('strong'); value.textContent = `${(count / runs * 100).toFixed(1)}%`;
    const track = document.createElement('span'); track.className = 'score-track'; track.setAttribute('aria-hidden', 'true');
    const fill = document.createElement('span'); fill.style.width = `${count / runs * 100}%`; track.append(fill); cell.append(value, track); score.append(cell);
    const raw = document.createElement('td'); raw.textContent = `${count} / ${runs}`; tr.append(th, score, raw); return tr;
  });
  document.querySelector('#result-rows').replaceChildren(...rows);
  document.querySelector('.results-table').dataset.arm = currentArm;
  const total = counts.reduce((a, b) => a + b, 0); const n = runs * 3;
  const writerName = writer === 'all' ? 'all case writers' : MODEL_NAMES[['astra', 'opus', 'grok'].indexOf(writer)];
  document.querySelector('#result-summary').textContent = `${currentArm === 'project' ? 'With project' : 'Options only'} · ${writerName} · pooled accuracy ${(total / n * 100).toFixed(1)}% (${total} / ${n}).`;
}
document.querySelectorAll('button[data-arm]').forEach(button => button.addEventListener('click', () => {
  currentArm = button.dataset.arm;
  document.querySelectorAll('button[data-arm]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
  renderResults();
}));
document.querySelector('#writer-filter').addEventListener('change', renderResults);
const menu = document.querySelector('.menu-toggle'); const nav = document.querySelector('#main-nav');
function closeMenu() {menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Open navigation'); nav.classList.remove('is-open');}
menu.addEventListener('click', () => {const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); nav.classList.toggle('is-open', open);});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {closeMenu(); menu.focus();}});
