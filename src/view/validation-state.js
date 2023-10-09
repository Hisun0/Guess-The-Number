import onChange from 'on-change';
import i18next from 'i18next';
import { errorAnimation } from '../scripts/animation.js';
import elements from '../elements.js';

const watchedValidationState = (state) => onChange(state, (path, value) => {
  const lng = document.documentElement.getAttribute('lang');
  elements.input.value = '';
  elements.input.focus();

  if (value === 'success') {
    elements.feedback.textContent = '';
    elements.input.classList.remove('is-invalid');
  } else if (value.indexOf('warnings') >= 0) {
    elements.feedback.textContent = i18next.t(value, { lng });
    elements.feedback.classList.replace('text-danger', 'text-warning');
  } else {
    elements.feedback.textContent = i18next.t(value, { lng });
    elements.feedback.classList.replace('text-warning', 'text-danger');
    elements.input.classList.add('is-invalid');
    errorAnimation();
  }
});

export default watchedValidationState;
