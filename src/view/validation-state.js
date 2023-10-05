import onChange from 'on-change';
import i18next from 'i18next';

const watchedValidationState = (state, lng) =>
  onChange(state, (path, value) => {
    const feedback = document.querySelector('.feedback');
    const input = document.querySelector('.form-control');
    input.value = '';
    input.focus();

    if (value === 'success') {
      feedback.textContent = '';
      input.classList.remove('is-invalid');
    } else {
      feedback.textContent = i18next.t(value, { lng });
      input.classList.add('is-invalid');
    }
  });

export default watchedValidationState;
