const answers = document.querySelectorAll('[data-answer]');
const result = document.querySelector('#answer-result');
const reset = document.querySelector('.reset-case');
answers.forEach(button => button.addEventListener('click', () => {
  const correct = button.dataset.answer === 'scale';
  answers.forEach(answer => {
    answer.setAttribute('aria-pressed', String(answer === button));
    answer.classList.toggle('selected', answer === button);
    answer.classList.toggle('supported', answer.dataset.answer === 'scale');
  });
  result.hidden = false;
  result.innerHTML = `<strong>${correct ? 'That is the mechanism the later trace supports.' : 'More training misses the first question: is the parameter scale right?'}</strong><p>The generated parameters collapse in scale. The reference answer compares tanh mappings at gain 1 and gain 50, using two shared seeds, and predicts how scale, loss, and accuracy change.</p><a href="https://github.com/AutoResearch-Factory/AgonScientistBench/tree/main/tasks/mapping-networks-001-hard">Read the full case and rubric ↗</a>`;
  reset.hidden = false;
}));
reset.addEventListener('click', () => {
  answers.forEach(answer => { answer.setAttribute('aria-pressed', 'false'); answer.classList.remove('selected', 'supported'); });
  result.hidden = true;
  reset.hidden = true;
  answers[0].focus();
});
document.querySelector('a[href="#pilot-details"]').addEventListener('click', () => { document.querySelector('#pilot-details').open = true; });
