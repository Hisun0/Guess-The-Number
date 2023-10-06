import onChange from 'on-change';
import i18next from 'i18next';
import { errorAnimation } from '../scripts/animation.js';

const watchedValidationState = (state) =>
  onChange(state, (path, value) => {
    const feedback = document.querySelector('.feedback');
    const input = document.querySelector('.form-control');
    const lng = document.documentElement.getAttribute('lang');
    input.value = '';
    input.focus();

    if (value === 'success') {
      feedback.textContent = '';
      input.classList.remove('is-invalid');
    } else if (value.indexOf('warnings') >= 0) {
      feedback.textContent = i18next.t(value, { lng });
      feedback.classList.replace('text-danger', 'text-warning');
    } else {
      feedback.textContent = i18next.t(value, { lng });
      feedback.classList.replace('text-warning', 'text-danger');
      input.classList.add('is-invalid');
      errorAnimation();
    }
  });

export default watchedValidationState;
