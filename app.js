const answers = document.querySelectorAll('[data-answer]');
const result = document.querySelector('#answer-result');
const reset = document.querySelector('.reset-case');
answers.forEach(button => button.addEventListener('click', () => {
  const correct = button.dataset.answer === 'validate';
  answers.forEach(answer => {
    answer.setAttribute('aria-pressed', String(answer === button));
    answer.classList.toggle('selected', answer === button);
    answer.classList.toggle('supported', answer.dataset.answer === 'validate');
  });
  result.hidden = false;
  result.innerHTML = `<strong>${correct ? 'B is the reference plan: validate the simulator first.' : 'More poses cannot resolve an unvalidated simulator. The reference plan is B.'}</strong><p>The project is still validating its simulator. A pretrained policy violating joint limits on the rigid reference raises a compatibility problem before a soft-support research claim. Keep the policy frozen, compare joint-limit conventions, contacts, and timestep, then validate the soft-support behavior after resolving the rigid-reference issue.</p><a href="https://github.com/AutoResearch-Factory/AgonBench-site/blob/main/examples/soft-support.md">Read the example and source note ↗</a>`;
  reset.hidden = false;
}));
reset.addEventListener('click', () => {
  answers.forEach(answer => { answer.setAttribute('aria-pressed', 'false'); answer.classList.remove('selected', 'supported'); });
  result.hidden = true;
  reset.hidden = true;
  answers[0].focus();
});
document.querySelector('a[href="#pilot-details"]').addEventListener('click', () => { document.querySelector('#pilot-details').open = true; });
